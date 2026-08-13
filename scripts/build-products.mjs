/**
 * Genera db/products.json a partire dalle due fonti di verità già esistenti:
 * il listino semi (PACK_DATA, dentro assets/js/home.js) e il catalogo piante
 * (db/plants.json).
 *
 * Perché generato e non scritto a mano: il listino semi resta dove sta oggi e
 * nessuna pagina esistente va modificata. La variante "piantina" viene invece
 * conservata tra un'esecuzione e l'altra, così le correzioni editoriali
 * (prezzi, mesi di disponibilità, scorte) non vengono mai sovrascritte.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const VANTAGGIO_GIORNI = {
  frutto: 30,
  foglia: 20,
  aromatica: 25,
  legume: 0,
  radice: 0
};
// Radici a fittone e legumi non tollerano il trapianto.
const SENZA_PIANTINA = new Set(["radice", "legume"]);
const PACK_FALLBACK = { seeds: 100, price: 2.5 };

// Estrae il listino semi dal sorgente della home senza eseguirlo.
async function readPackData() {
  const source = await readFile(path.join(root, "assets/js/home.js"), "utf8");
  const match = source.match(/const PACK_DATA\s*=\s*(\{[\s\S]*?\n\};)/);
  if (!match) throw new Error("PACK_DATA non trovato in assets/js/home.js.");
  const literal = match[1].replace(/;$/, "");
  return Function(`"use strict";return (${literal});`)();
}

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

const packData = await readPackData();
const plants = await readJson("db/plants.json", []);
const previous = await readJson("db/products.json", { items: {} });
const previousItems = previous?.items || {};

const items = {};
for (const plant of plants) {
  const pack = packData[plant.id] || PACK_FALLBACK;
  const mesi = [
    ...new Set((plant.mesi || []).flatMap((m) => [m, (m % 12) + 1]))
  ].sort((a, b) => a - b);

  const derivata =
    SENZA_PIANTINA.has(plant.tipo) || !plant.gg
      ? null
      : {
          prezzo: Math.round((pack.price / 2) * 10) / 10,
          unita: "vaso ø7",
          lotto: 6,
          mesiDisponibili: mesi,
          vantaggioGiorni: VANTAGGIO_GIORNI[plant.tipo] ?? 20,
          // null = scorta non ancora gestita; l'interfaccia non la mostra.
          stock: null
        };

  items[plant.id] = {
    // Rigenerato a ogni build: la fonte resta PACK_DATA.
    semi: { prezzo: pack.price, semiPerBustina: pack.seeds },
    // Conservato: qui vivono le correzioni editoriali.
    piantina: previousItems[plant.id]?.piantina ?? derivata
  };
}

await writeFile(
  path.join(root, "db/products.json"),
  JSON.stringify(
    {
      _nota:
        "Generato da npm run build:products. Il blocco 'semi' viene rigenerato da PACK_DATA (assets/js/home.js); il blocco 'piantina' è modificabile a mano e viene conservato.",
      generato: new Date().toISOString().slice(0, 10),
      items
    },
    null,
    2
  ) + "\n",
  "utf8"
);

const conPiantina = Object.values(items).filter((i) => i.piantina).length;
console.log(
  `[build-products] ${Object.keys(items).length} prodotti · ${conPiantina} con variante piantina`
);
