import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssDir = path.join(root, "assets/css");
const bundles = {
  // La hero e i percorsi sono stati rifatti da zero: stanno in un file a
  // parte, concatenato dopo, così non si sedimentano sopra home.css.
  "serra-home.css": ["pages/home.css", "pages/home-hero.css"],
  "serra-configuratore.css": "pages/configuratore.css",
  "serra-account.css": "pages/account.css",
  "serra-guida.css": "pages/guida.css",
  "serra-order-confirmation.css": "pages/ordine-confermato.css",
  // Un bundle può indicare più sorgenti: vengono concatenate nell'ordine dato.
  // I bundle storici restano a sorgente singola, con lo stesso risultato di prima.
  // Qui c'era anche pages/orto-v2.css, uno strato che riscriveva orto.css
  // sovrapponendosi: i due file sono stati fusi in pages/orto.css, dove ogni
  // selettore compare una volta sola.
  "serra-orto.css": ["pages/_fondazioni.css", "pages/orto.css"],
  // Il vivaio riusa i componenti della sezione orto (schede, pulsanti,
  // dialoghi) e aggiunge il vassoio: stessa base, un file in più in coda.
  "serra-vivaio.css": [
    "pages/_fondazioni.css",
    "pages/orto.css",
    "pages/vivaio.css",
  ],
};

const isExternalUrl = (value) =>
  /^(?:[a-z]+:|\/\/|#|data:)/i.test(value.trim());

async function inlineCss(file, outputFile) {
  const source = await readFile(file, "utf8");
  const withoutLayerDeclaration = source.replace(
    /^\s*@layer\s+base\s*,\s*dark-theme\s*;\s*$/gm,
    "",
  );
  const withImports = await replaceAsync(
    withoutLayerDeclaration,
    /@import\s+url\((['"]?)([^'")]+)\1\)\s*;/g,
    async (_match, _quote, imported) => {
      const importedPath = imported.split("?")[0];
      return inlineCss(
        path.resolve(path.dirname(file), importedPath),
        outputFile,
      );
    },
  );

  return withImports.replace(
    /url\((['"]?)([^'")]+)\1\)/g,
    (_match, quote, rawUrl) => {
      if (isExternalUrl(rawUrl)) return `url(${quote}${rawUrl}${quote})`;
      const absoluteUrl = path.resolve(path.dirname(file), rawUrl);
      const relativeUrl = path
        .relative(path.dirname(outputFile), absoluteUrl)
        .split(path.sep)
        .join("/");
      return `url(${quote}${relativeUrl}${quote})`;
    },
  );
}

async function replaceAsync(value, expression, callback) {
  const matches = [...value.matchAll(expression)];
  const replacements = await Promise.all(
    matches.map((match) => callback(...match)),
  );
  let offset = 0;
  return matches.reduce((result, match, index) => {
    const start = match.index + offset;
    const replacement = replacements[index];
    offset += replacement.length - match[0].length;
    return (
      result.slice(0, start) +
      replacement +
      result.slice(start + match[0].length)
    );
  }, value);
}

await mkdir(cssDir, { recursive: true });
for (const [bundleName, entry] of Object.entries(bundles)) {
  const outputFile = path.join(cssDir, bundleName);
  const sources = Array.isArray(entry) ? entry : [entry];
  const parts = await Promise.all(
    sources.map((source) => readFile(path.join(cssDir, source), "utf8")),
  );
  await writeFile(
    outputFile,
    `/* File generato con npm run build:css: modificare il CSS completo in pages/. */\n${parts.join("\n")}`,
  );
}
