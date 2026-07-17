// Aggiorna automaticamente SERRA_APP_VERSION (nelle 4 pagine) e CACHE_VERSION
// (in sw.js) in base a un hash degli asset e dell'HTML. I riferimenti alla
// versione vengono normalizzati prima dell'hash, evitando cicli di versioning.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const HTML_PAGES = [
  "index.html",
  "configuratore.html",
  "account.html",
  "guida.html"
];
const SW_FILE = "sw.js";

async function readText(relPath) {
  return readFile(path.join(root, relPath), "utf8");
}

async function collectFiles(relativeDir) {
  const entries = await readdir(path.join(root, relativeDir), {
    withFileTypes: true
  });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDir, entry.name);
      if (entry.isDirectory()) return collectFiles(relativePath);
      return [relativePath];
    })
  );
  return nested.flat();
}

async function computeContentHash() {
  const hash = createHash("sha256");
  const files = (
    await Promise.all(
      ["assets/css", "assets/js", "assets/img"].map(collectFiles)
    )
  )
    .flat()
    .concat("manifest.json")
    .sort();

  for (const rel of files) {
    hash.update(rel);
    hash.update(await readFile(path.join(root, rel)));
  }

  for (const page of HTML_PAGES) {
    const normalized = (await readText(page))
      .replace(
        /SERRA_APP_VERSION\s*=\s*"[^"]+"/g,
        'SERRA_APP_VERSION = "<version>"'
      )
      .replace(/\?v=[^"'\s)]+/g, "?v=<version>");
    hash.update(page);
    hash.update(normalized);
  }

  const normalizedWorker = (await readText(SW_FILE)).replace(
    /CACHE_VERSION\s*=\s*"[^"]+"/,
    'CACHE_VERSION = "<version>"'
  );
  hash.update(SW_FILE);
  hash.update(normalizedWorker);

  return hash.digest("hex").slice(0, 12);
}

function todayStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

async function currentVersion() {
  const swSource = await readText(SW_FILE);
  return swSource.match(/CACHE_VERSION\s*=\s*"([^"]+)"/)?.[1];
}

async function main() {
  const contentHash = await computeContentHash();
  const existing = await currentVersion();
  const existingHash = existing?.split("-").pop();

  if (existingHash === contentHash) {
    console.log(
      `[bump-version] Nessuna modifica rilevata, versione invariata (${existing}).`
    );
    return;
  }

  const newVersion = `${todayStamp()}-${contentHash}`;
  const files = [...HTML_PAGES, SW_FILE];

  for (const file of files) {
    const filePath = path.join(root, file);
    const text = await readFile(filePath, "utf8");
    const updated = existing ? text.split(existing).join(newVersion) : text;
    await writeFile(filePath, updated);
  }

  console.log(
    `[bump-version] Versione aggiornata: ${existing ?? "(nessuna)"} → ${newVersion}`
  );
}

main().catch((err) => {
  console.error("[bump-version]", err.message);
  process.exitCode = 1;
});
