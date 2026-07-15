import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectories = ["assets/js", "assets/css"];
const sourceFiles = ["index.html", "configuratore.html", "account.html", "guida.html"];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(fullPath);
      return [fullPath];
    })
  );
  return nested.flat();
}

for (const directory of sourceDirectories) {
  const files = await collectFiles(path.join(root, directory));
  sourceFiles.push(
    ...files.filter(
      (file) =>
        /\.(?:js|css)$/.test(file) && !path.basename(file).startsWith("serra-")
    )
  );
}

const source = await Promise.all(
  sourceFiles.map(async (file) => readFile(path.resolve(root, file), "utf8"))
);
const referencedPhotos = new Set(
  [...source.join("\n").matchAll(/assets\/img\/photo\/([\w-]+\.(?:webp|jpe?g|png))/gi)].map(
    (match) => match[1]
  )
);
const photoDirectory = path.join(root, "assets/img/photo");
const photos = (await readdir(photoDirectory)).filter((file) =>
  /\.(?:webp|jpe?g|png)$/i.test(file)
);
const candidates = photos.filter((file) => !referencedPhotos.has(file));

console.log(`Foto catalogo: ${photos.length}`);
console.log(`Riferimenti statici: ${referencedPhotos.size}`);
console.log(`Candidati da verificare: ${candidates.length}`);
if (candidates.length) {
  console.log(candidates.join("\n"));
}
console.log("Nessun file viene eliminato automaticamente.");
