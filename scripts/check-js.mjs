import { execFileSync } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function collectJavaScript(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectJavaScript(fullPath);
      if (entry.name.endsWith(".part.js")) return [];
      return entry.name.endsWith(".js") ? [fullPath] : [];
    })
  );
  return nested.flat();
}

const files = [
  ...(await collectJavaScript(path.join(root, "assets/js"))),
  path.join(root, "server.js"),
  path.join(root, "sw.js")
];

for (const file of files) execFileSync(process.execPath, ["--check", file]);
