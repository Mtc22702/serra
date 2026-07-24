/**
 * Impedisce che nuovi sorgenti dell'interfaccia perdano il loro contesto.
 *
 * Non giudica il contenuto dei commenti: richiede soltanto un'intestazione
 * descrittiva vicino all'inizio di ogni file modificabile a mano.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoots = ["assets/js", "assets/css"];
const hasSourceHeader = (file, content) => {
  const opening = content.split("\n").slice(0, 12).join("\n");
  return file.endsWith(".js") ? /\/\/|\/\*/.test(opening) : /\/\*/.test(opening);
};

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? collect(file) : [file];
    })
  );
  return nested.flat();
}

const sources = (
  await Promise.all(sourceRoots.map((directory) => collect(path.join(root, directory))))
)
  .flat()
  .filter((file) => /\.(?:js|css)$/.test(file));

for (const source of sources) {
  if (!hasSourceHeader(source, await readFile(source, "utf8"))) {
    throw new Error(`${path.relative(root, source)}: intestazione descrittiva mancante.`);
  }
}

for (const page of ["index.html", "configuratore.html", "account.html", "guida.html", "ordine-confermato.html"]) {
  const html = await readFile(path.join(root, page), "utf8");
  if (!html.includes("<!--")) {
    throw new Error(`${page}: commenti di orientamento mancanti.`);
  }
}
