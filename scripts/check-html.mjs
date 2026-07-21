import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = {
  "index.html": "serra-home.css",
  "configuratore.html": "serra-configuratore.css",
  "account.html": "serra-account.css",
  "guida.html": "serra-guida.css",
  "ordine-confermato.html": "serra-order-confirmation.css"
};

for (const [page, bundle] of Object.entries(pages)) {
  const html = await readFile(path.join(root, page), "utf8");
  if (!html.includes(`assets/css/${bundle}`)) {
    throw new Error(`${page}: bundle CSS mancante (${bundle}).`);
  }
  if (html.includes("document.write(")) {
    throw new Error(`${page}: document.write non consentito.`);
  }
}

const pageVersions = await Promise.all(
  Object.keys(pages).map(async (page) => {
    const html = await readFile(path.join(root, page), "utf8");
    const match = html.match(/SERRA_APP_VERSION\s*=\s*"([^"]+)"/);
    if (!match) throw new Error(`${page}: versione applicazione mancante.`);
    return match[1];
  })
);
const uniqueVersions = [...new Set(pageVersions)];
if (uniqueVersions.length !== 1) {
  throw new Error(
    `Versioni applicazione non allineate: ${uniqueVersions.join(", ")}.`
  );
}

const serviceWorker = await readFile(path.join(root, "sw.js"), "utf8");
const cacheVersion = serviceWorker.match(/CACHE_VERSION\s*=\s*"([^"]+)"/)?.[1];
if (cacheVersion !== uniqueVersions[0]) {
  throw new Error(
    "Versione cache del service worker non allineata alle pagine."
  );
}

const home = await readFile(path.join(root, "index.html"), "utf8");
const config = await readFile(path.join(root, "configuratore.html"), "utf8");
const account = await readFile(path.join(root, "account.html"), "utf8");

const requiredLanguageBindings = [
  [home, 'data-home-action="set-language"', "home: selettore lingua"],
  [
    config,
    'data-conf-action="set-language"',
    "configuratore: selettore lingua"
  ],
  [account, 'data-account-action="set-language"', "account: selettore lingua"],
  [
    await readFile(path.join(root, "ordine-confermato.html"), "utf8"),
    'data-confirm-action="set-language"',
    "conferma ordine: selettore lingua"
  ]
];

for (const [html, marker, label] of requiredLanguageBindings) {
  if (!html.includes(marker))
    throw new Error(`${label}: binding lingua mancante.`);
}
