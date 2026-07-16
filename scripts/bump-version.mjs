// Aggiorna automaticamente SERRA_APP_VERSION (nelle 4 pagine) e CACHE_VERSION
// (in sw.js) in base a un hash del contenuto reale dei file precaricati
// (CSS compilati, script, immagini). Se nulla di sostanziale è cambiato dalla
// versione già scritta nei file, non tocca nulla.
//
// Volutamente NON include le pagine .html nell'hash: contengono loro stesse la
// stringa di versione che questo script scrive, quindi includerle
// creerebbe un riferimento circolare (l'hash cambierebbe ad ogni esecuzione
// anche senza modifiche reali, perché il testo appena scritto farebbe parte
// del prossimo calcolo).
import { readFile, writeFile } from "node:fs/promises";
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

async function computeContentHash() {
  const swSource = await readText(SW_FILE);
  const match = swSource.match(/const PRECACHE = \[([\s\S]*?)\];/);
  if (!match) throw new Error("PRECACHE non trovato in sw.js");
  const urls = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

  const hash = createHash("sha256");
  for (const url of [...urls].sort()) {
    const rel = url.replace(/^\.\//, "");
    if (rel === "" || rel.endsWith(".html")) continue;
    try {
      const buf = await readFile(path.join(root, rel));
      hash.update(rel);
      hash.update(buf);
    } catch {
      // File mancante: lo segnala già il service worker in console
      // all'installazione, qui non blocchiamo il calcolo della versione.
    }
  }
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
