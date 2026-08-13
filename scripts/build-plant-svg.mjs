/**
 * Disegna le illustrazioni SVG mancanti del catavolgo piante.
 *
 * Nel repository convivono due tipi di file in assets/img/svg: le
 * illustrazioni vere (rosette di foglie, radici, frutti, generate a suo tempo
 * pianta per pianta) e un segnaposto — la stessa foglia bianca di leaf.svg
 * copiata quarantacinque volte. Su una foto chiara il segnaposto sparisce, ed
 * è il motivo per cui alcune schede sembravano senza disegno.
 *
 * Questo script rigenera SOLO i file ancora identici al segnaposto: le
 * illustrazioni esistenti non vengono mai toccate. Il disegno è deterministico
 * (il caso è pilotato da un seme derivato dall'identificativo della pianta),
 * così due esecuzioni producono byte identici e il numero di versione non
 * cambia senza motivo.
 *
 * Uso: npm run build:svg  [--force id1,id2]
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cartella = path.join(root, "assets", "img", "svg");
const SEGNAPOSTO = path.join(cartella, "leaf.svg");

/* ---------- caso riproducibile ---------- */

// Generatore lineare congruenziale: stessa sequenza a parità di seme.
function casuale(seme) {
  let stato = [...seme].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => {
    stato = (stato * 1664525 + 1013904223) >>> 0;
    return stato / 4294967296;
  };
}

const arrotonda = (n) => Math.round(n * 100) / 100;

/* ---------- mattoni del disegno ---------- */

// Terra e ombra: la base comune a tutte le illustrazioni esistenti.
const base = (raggio = 38.64) =>
  `<circle cx="0" cy="0" r="46" fill="#6b4e2a" opacity="0.18"/>\n` +
  `<ellipse cx="3.36" cy="4.2" rx="${arrotonda(raggio)}" ry="${arrotonda(
    raggio * 0.89,
  )}" fill="rgba(0,0,0,.15)"/>`;

// Foglia liscia: due curve che si chiudono a punta, come nelle solanacee.
const fogliaLiscia = (lunghezza, larghezza) =>
  `M0 0 C ${arrotonda(larghezza)} ${arrotonda(-lunghezza * 0.17)}, ${arrotonda(
    larghezza * 0.55,
  )} ${arrotonda(-lunghezza * 0.85)}, 0 ${arrotonda(-lunghezza)} C ${arrotonda(
    -larghezza * 0.55,
  )} ${arrotonda(-lunghezza * 0.85)}, ${arrotonda(-larghezza)} ${arrotonda(
    -lunghezza * 0.17,
  )}, 0 0 Z`;

// Foglia frastagliata: il profilo a zig-zag delle crucifere da taglio.
function fogliaDentata(lunghezza, larghezza) {
  const passi = 4;
  const destra = [];
  const sinistra = [];
  for (let i = 1; i <= passi; i++) {
    const q = i / passi;
    const puntaX = larghezza * (1 - q * 0.45);
    const puntaY = -lunghezza * (q * 0.72);
    const rientroX = larghezza * 0.32 * (1 - q * 0.4);
    const rientroY = -lunghezza * (q * 0.72 + 0.09);
    destra.push(
      `Q ${arrotonda(puntaX)} ${arrotonda(puntaY)} ${arrotonda(
        rientroX,
      )} ${arrotonda(rientroY)}`,
    );
    sinistra.unshift(
      `Q ${arrotonda(-puntaX)} ${arrotonda(puntaY)} ${arrotonda(0)} ${arrotonda(
        i === passi ? 0 : rientroY,
      )}`.replace("Q 0 0 0 0", ""),
    );
  }
  // Il lato sinistro è lo specchio del destro, percorso al contrario.
  const specchio = [];
  for (let i = passi; i >= 1; i--) {
    const q = i / passi;
    const puntaX = -larghezza * (1 - q * 0.45);
    const puntaY = -lunghezza * (q * 0.72);
    const rientroX = -larghezza * 0.32 * (1 - q * 0.4);
    const rientroY = -lunghezza * (q * 0.72 - 0.09);
    specchio.push(
      `Q ${arrotonda(puntaX)} ${arrotonda(puntaY)} ${arrotonda(
        i === 1 ? 0 : rientroX,
      )} ${arrotonda(i === 1 ? 0 : rientroY)}`,
    );
  }
  return `M0 0 ${destra.join(" ")} L 0 ${arrotonda(
    -lunghezza,
  )} ${specchio.join(" ")} Z`;
}

// Filo: lo stelo cavo di cipolle ed erba cipollina. Serve una larghezza vera,
// altrimenti la lente si chiude su sé stessa e sulla foto non si vede nulla.
const filo = (lunghezza, curva, spessore = 3.2) =>
  `M0 0 C ${arrotonda(spessore)} ${arrotonda(-lunghezza * 0.35)}, ${arrotonda(
    curva + spessore,
  )} ${arrotonda(-lunghezza * 0.75)}, ${arrotonda(curva)} ${arrotonda(
    -lunghezza,
  )} C ${arrotonda(curva - spessore)} ${arrotonda(
    -lunghezza * 0.75,
  )}, ${arrotonda(-spessore)} ${arrotonda(-lunghezza * 0.35)}, 0 0 Z`;

// Rosetta: foglie disposte a raggiera con angoli irregolari ma stabili.
function rosetta({ rnd, n, colori, forma, lunghezza, larghezza }) {
  const pezzi = [];
  const passo = 360 / n;
  for (let i = 0; i < n; i++) {
    const angolo = i * passo + (rnd() - 0.5) * passo * 0.55;
    const scala = 0.85 + rnd() * 0.3;
    const l = lunghezza * scala;
    const w = larghezza * scala;
    const d =
      forma === "dentata"
        ? fogliaDentata(l, w)
        : forma === "filo"
          ? filo(l, (rnd() - 0.5) * 12, 3.4)
          : fogliaLiscia(l, w);
    pezzi.push(
      `<g transform="rotate(${arrotonda(angolo)})"><path d="${d}" fill="${
        colori[i % colori.length]
      }"/></g>`,
    );
  }
  return pezzi.join("");
}

// Cespuglio: foglie piccole sparse, come basilico e menta.
function cespuglio({ rnd, n, colori, lunghezza, larghezza }) {
  const pezzi = [];
  for (let i = 0; i < n; i++) {
    const x = (rnd() - 0.5) * 46;
    const y = (rnd() - 0.5) * 40 + 4;
    const rot = (rnd() - 0.5) * 90;
    const scala = 0.6 + rnd() * 0.5;
    pezzi.push(
      `<g transform="translate(${arrotonda(x)} ${arrotonda(y)}) rotate(${arrotonda(
        rot,
      )})"><path d="${fogliaLiscia(
        lunghezza * scala,
        larghezza * scala,
      )}" fill="${colori[i % colori.length]}"/></g>`,
    );
  }
  return pezzi.join("");
}

// Testa compatta al centro della rosetta (cavoli, sedano rapa, carciofo).
const testa = (r, colore, luce = "rgba(255,255,255,.3)") =>
  `<circle cx="0" cy="1" r="${arrotonda(r)}" fill="${colore}"/>` +
  `<circle cx="${arrotonda(-r * 0.3)}" cy="${arrotonda(-r * 0.35)}" r="${arrotonda(
    r * 0.34,
  )}" fill="${luce}"/>`;

// Frutti: due o tre bacche con il riflesso, come nel pomodoro.
function frutti({ rnd, n, r, colore }) {
  const pezzi = [];
  for (let i = 0; i < n; i++) {
    const x = (rnd() - 0.5) * 30;
    const y = (rnd() - 0.5) * 22 + 6;
    pezzi.push(
      `<circle cx="${arrotonda(x)}" cy="${arrotonda(y)}" r="${arrotonda(
        r,
      )}" fill="${colore}"/>` +
        `<circle cx="${arrotonda(x - r * 0.32)}" cy="${arrotonda(
          y - r * 0.36,
        )}" r="${arrotonda(r * 0.28)}" fill="rgba(255,255,255,.5)"/>`,
    );
  }
  return pezzi.join("");
}

// Baccelli: legumi appesi, con i semi in rilievo.
function baccelli({ rnd, n, colore, semi = 3 }) {
  const pezzi = [];
  for (let i = 0; i < n; i++) {
    const x = (rnd() - 0.5) * 34;
    const y = (rnd() - 0.5) * 16 + 8;
    const rot = -20 + rnd() * 40;
    const bolle = Array.from(
      { length: semi },
      (_, k) =>
        `<circle cx="0" cy="${arrotonda(-8 + k * 8)}" r="3.1" fill="rgba(255,255,255,.28)"/>`,
    ).join("");
    pezzi.push(
      `<g transform="translate(${arrotonda(x)} ${arrotonda(y)}) rotate(${arrotonda(
        rot,
      )})"><rect x="-5" y="-14" width="10" height="28" rx="5" fill="${colore}"/>${bolle}</g>`,
    );
  }
  return pezzi.join("");
}

// Radice: il fittone sotto la rosetta, con le radichette.
const radice = (lunghezza, larghezza, colore) =>
  `<path d="M${arrotonda(-larghezza)} 2 L ${arrotonda(larghezza)} 2 L 0 ${arrotonda(
    lunghezza,
  )} Z" fill="${colore}"/>` +
  `<g stroke="${colore}" stroke-width="1.6" stroke-linecap="round" opacity=".75">` +
  `<path d="M-6 14 q-7 5 -9 12"/><path d="M6 16 q7 5 9 12"/></g>`;

// Bulbo: cipolle e cipollotti, con le tuniche accennate.
const bulbo = (r, colore) =>
  `<ellipse cx="0" cy="${arrotonda(r * 0.45)}" rx="${arrotonda(r)}" ry="${arrotonda(
    r * 0.92,
  )}" fill="${colore}"/>` +
  `<path d="M0 ${arrotonda(r * 0.45 - r * 0.9)} V ${arrotonda(
    r * 0.45 + r * 0.9,
  )}" stroke="rgba(255,255,255,.28)" stroke-width="1.6"/>`;

// Fiore: petali attorno al bottone centrale (calendula, camomilla, nasturzio).
function fiore({ rnd, petali, colore, cuore }) {
  const pezzi = [];
  for (let i = 0; i < petali; i++) {
    const angolo = (360 / petali) * i + (rnd() - 0.5) * 8;
    pezzi.push(
      `<g transform="rotate(${arrotonda(angolo)})"><ellipse cx="0" cy="-13" rx="4.6" ry="10" fill="${colore}"/></g>`,
    );
  }
  return `<g transform="translate(0 2)">${pezzi.join(
    "",
  )}<circle cx="0" cy="0" r="5.4" fill="${cuore}"/></g>`;
}

/* ---------- ricette, una per pianta ---------- */

const VERDE = ["#4e8f3c", "#3a6f2c"];
const VERDE_CHIARO = ["#6cae4c", "#4f8c39"];
const VERDE_SCURO = ["#2f5e2c", "#24492480"];
const VERDE_BLU = ["#3d7a52", "#2c5b3d"];

// forma: rosetta | cespuglio | filo ; extra: disegno del centro.
const RICETTE = {
  // --- da foglia ---
  asparago: { forma: "speciale", colori: ["#5c8f45", "#456f34"] },
  broccolo_rapa: {
    forma: "rosetta",
    dentata: true,
    colori: VERDE,
    centro: (r) => frutti({ rnd: r, n: 3, r: 6, colore: "#4f8c39" }),
  },
  carciofo: { forma: "rosetta", colori: VERDE_BLU, centro: () => testa(12, "#6f7f9a") },
  cardo: { forma: "rosetta", dentata: true, colori: ["#7fa06a", "#5c7c4c"] },
  cavolo_cinese: {
    forma: "rosetta",
    n: 7,
    colori: ["#8fb96a", "#6f9c4c"],
    centro: () => testa(11, "#d8e6b4", "rgba(255,255,255,.55)"),
  },
  cavolo_rosso: {
    forma: "rosetta",
    colori: ["#6d4d84", "#4e3560"],
    centro: () => testa(12, "#7b4f96", "rgba(255,255,255,.28)"),
  },
  crescione: { forma: "cespuglio", n: 16, colori: VERDE_CHIARO, lunghezza: 13, larghezza: 8 },
  loboda: { forma: "rosetta", colori: ["#7a6a8c", "#5d5470"] },
  mizuna: { forma: "rosetta", dentata: true, n: 9, colori: VERDE_CHIARO },
  senape_foglia: { forma: "rosetta", dentata: true, n: 8, colori: ["#69a83f", "#4a7c2c"] },
  stevia_dolce: { forma: "cespuglio", n: 15, colori: VERDE_CHIARO, lunghezza: 15, larghezza: 7 },
  tatsoi: { forma: "rosetta", n: 10, colori: VERDE_SCURO, lunghezza: 30, larghezza: 16 },

  // --- aromatiche ---
  camomilla: { forma: "cespuglio", n: 12, colori: VERDE_CHIARO, lunghezza: 12, larghezza: 5, centro: (r) => fiore({ rnd: r, petali: 9, colore: "#ffffff", cuore: "#f2c744" }) },
  dragoncello: { forma: "rosetta", n: 11, colori: VERDE_CHIARO, lunghezza: 33, larghezza: 6 },
  erba_cipollina: { forma: "rosetta", forzaFilo: true, n: 13, colori: ["#4f9a4a", "#3d7c39"], centro: (r) => fiore({ rnd: r, petali: 8, colore: "#b489c9", cuore: "#8d61a6" }) },
  leustean: { forma: "cespuglio", n: 13, colori: VERDE, lunghezza: 16, larghezza: 9 },
  maggiorana: { forma: "cespuglio", n: 18, colori: ["#7fa86a", "#5f8a4c"], lunghezza: 10, larghezza: 6 },
  menta: { forma: "cespuglio", n: 15, colori: ["#3f8f5a", "#2d6b42"], lunghezza: 16, larghezza: 9 },
  shiso: { forma: "cespuglio", n: 14, colori: ["#7a4a72", "#57345a"], lunghezza: 16, larghezza: 10 },

  // --- da radice ---
  cavolo_navone: { forma: "rosetta", colori: VERDE, centro: () => bulbo(13, "#c9a45e") },
  cipolla_rossa: { forma: "rosetta", forzaFilo: true, n: 9, colori: VERDE, centro: () => bulbo(13, "#8e4470") },
  cipollotto: { forma: "rosetta", forzaFilo: true, n: 9, colori: VERDE_CHIARO, centro: () => bulbo(10, "#eef1e2") },
  daikon: { forma: "rosetta", dentata: true, n: 7, colori: VERDE, centro: () => radice(34, 9, "#f0f0e4") },
  pastinaca: { forma: "rosetta", n: 7, colori: VERDE, centro: () => radice(32, 10, "#e8dcb4") },
  patata: { forma: "cespuglio", n: 12, colori: VERDE, lunghezza: 16, larghezza: 9, centro: (r) => frutti({ rnd: r, n: 3, r: 8, colore: "#c19a5b" }) },
  patata_dolce: { forma: "cespuglio", n: 12, colori: VERDE_CHIARO, lunghezza: 16, larghezza: 10, centro: (r) => frutti({ rnd: r, n: 3, r: 8, colore: "#c8703f" }) },
  radice_prezemolo: { forma: "rosetta", dentata: true, n: 7, colori: VERDE_CHIARO, centro: () => radice(32, 9, "#eee6c8") },
  rafano: { forma: "rosetta", n: 6, colori: VERDE, centro: () => radice(34, 9, "#f2efe1") },
  scorzonera: { forma: "rosetta", forzaFilo: true, n: 8, colori: VERDE, centro: () => radice(34, 7, "#4a3b2c") },
  sedano_rapa: { forma: "rosetta", n: 8, colori: VERDE, centro: () => testa(13, "#ddd7bd", "rgba(255,255,255,.5)") },
  topinambur: { forma: "cespuglio", n: 12, colori: VERDE, lunghezza: 17, larghezza: 8, centro: (r) => frutti({ rnd: r, n: 3, r: 7.5, colore: "#b58a55" }) },

  // --- legumi ---
  cece: { forma: "cespuglio", n: 14, colori: VERDE_CHIARO, lunghezza: 11, larghezza: 6, centro: (r) => baccelli({ rnd: r, n: 2, colore: "#8fae52", semi: 2 }) },
  fagiolo_borlotto: { forma: "cespuglio", n: 10, colori: VERDE, lunghezza: 17, larghezza: 11, centro: (r) => baccelli({ rnd: r, n: 3, colore: "#c2664f" }) },
  fava: { forma: "cespuglio", n: 9, colori: ["#5f8f5a", "#456f42"], lunghezza: 18, larghezza: 12, centro: (r) => baccelli({ rnd: r, n: 2, colore: "#7fa051" }) },
  lenticchia: { forma: "cespuglio", n: 16, colori: VERDE_CHIARO, lunghezza: 10, larghezza: 5, centro: (r) => baccelli({ rnd: r, n: 2, colore: "#a8b06a", semi: 2 }) },
  soia_edamame: { forma: "cespuglio", n: 11, colori: VERDE, lunghezza: 16, larghezza: 11, centro: (r) => baccelli({ rnd: r, n: 3, colore: "#8fb457" }) },

  // --- da frutto ---
  cucamelon: { forma: "cespuglio", n: 12, colori: VERDE_CHIARO, lunghezza: 15, larghezza: 9, centro: (r) => frutti({ rnd: r, n: 3, r: 6.5, colore: "#5f9b45" }) },
  gombo: { forma: "rosetta", n: 6, colori: VERDE, centro: (r) => baccelli({ rnd: r, n: 3, colore: "#5f9b45", semi: 0 }) },
  kiwano: { forma: "cespuglio", n: 10, colori: VERDE, lunghezza: 15, larghezza: 10, centro: (r) => frutti({ rnd: r, n: 2, r: 11, colore: "#e0a52f" }) },
  mais_dolce: { forma: "speciale", colori: ["#5f9b45", "#487a34"] },
  physalis: { forma: "cespuglio", n: 11, colori: VERDE, lunghezza: 15, larghezza: 10, centro: (r) => frutti({ rnd: r, n: 2, r: 10, colore: "#e29a33" }) },
  tomatillo: { forma: "cespuglio", n: 11, colori: VERDE, lunghezza: 15, larghezza: 10, centro: (r) => frutti({ rnd: r, n: 2, r: 10, colore: "#8fb43f" }) },

  // --- fiori commestibili ---
  calendula: { forma: "cespuglio", n: 11, colori: VERDE_CHIARO, lunghezza: 14, larghezza: 7, centro: (r) => fiore({ rnd: r, petali: 12, colore: "#f0932b", cuore: "#b5651d" }) },
  nasturzio: { forma: "cespuglio", n: 9, colori: VERDE_CHIARO, lunghezza: 13, larghezza: 13, centro: (r) => fiore({ rnd: r, petali: 5, colore: "#e8702a", cuore: "#f6c445" }) },
};

// Asparago e mais non sono rosette: hanno un disegno tutto loro.
function speciale(id, colori) {
  if (id === "asparago") {
    const turioni = [-14, -4, 6, 16].map(
      (x, i) =>
        `<g transform="translate(${x} 6) rotate(${i * 4 - 6})">` +
        `<path d="M0 18 L0 -20 q4 -6 0 -12 q-4 6 0 12 Z" stroke="${
          colori[i % 2]
        }" stroke-width="7" stroke-linecap="round" fill="none"/>` +
        `<path d="M0 -22 q5 -4 3 -10 q-3 4 -3 10 Z" fill="${colori[(i + 1) % 2]}"/></g>`,
    );
    return turioni.join("");
  }
  // mais: pannocchia con le brattee
  return (
    `<path d="M-20 20 Q -26 -10 -8 -26" stroke="${colori[1]}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<path d="M20 20 Q 26 -8 10 -24" stroke="${colori[1]}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="0" cy="2" rx="12" ry="24" fill="#e8c141"/>` +
    `<g fill="rgba(0,0,0,.12)">` +
    [-14, -6, 2, 10, 18]
      .map((y) => `<rect x="-11" y="${y}" width="22" height="3" rx="1.5"/>`)
      .join("") +
    `</g>` +
    `<path d="M-12 -18 Q 0 -34 12 -18" stroke="${colori[0]}" stroke-width="5" fill="none" stroke-linecap="round"/>`
  );
}

function disegna(id, ricetta) {
  const rnd = casuale(id);
  const corpo = [];
  corpo.push(base());
  if (ricetta.forma === "speciale") {
    corpo.push(speciale(id, ricetta.colori));
  } else if (ricetta.forma === "cespuglio") {
    corpo.push(
      cespuglio({
        rnd,
        n: ricetta.n || 12,
        colori: ricetta.colori,
        lunghezza: ricetta.lunghezza || 15,
        larghezza: ricetta.larghezza || 9,
      }),
    );
  } else {
    corpo.push(
      rosetta({
        rnd,
        n: ricetta.n || 8,
        colori: ricetta.colori,
        forma: ricetta.forzaFilo ? "filo" : ricetta.dentata ? "dentata" : "liscia",
        lunghezza: ricetta.lunghezza || 34,
        larghezza: ricetta.larghezza || 15,
      }),
    );
  }
  if (ricetta.centro) corpo.push(ricetta.centro(rnd));
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" width="100" height="100" role="img" aria-label="${id}">\n` +
    corpo.join("\n") +
    `\n</svg>\n`
  );
}

/* ---------- esecuzione ---------- */

const forzati = (process.argv.find((a) => a.startsWith("--force="))?.slice(8) || "")
  .split(",")
  .filter(Boolean);

const segnaposto = await readFile(SEGNAPOSTO, "utf8");
const file = (await readdir(cartella)).filter((f) => f.endsWith(".svg"));
let scritti = 0;
let saltati = 0;

for (const nome of file) {
  const id = nome.replace(/\.svg$/, "");
  if (id === "leaf") continue;
  const percorso = path.join(cartella, nome);
  const attuale = await readFile(percorso, "utf8");
  const eSegnaposto = attuale.trim() === segnaposto.trim();
  if (!eSegnaposto && !forzati.includes(id)) continue;
  const ricetta = RICETTE[id];
  if (!ricetta) {
    saltati++;
    console.warn(`[build-plant-svg] nessuna ricetta per "${id}": resta il segnaposto.`);
    continue;
  }
  await writeFile(percorso, disegna(id, ricetta), "utf8");
  scritti++;
}

// Controllo finale: nessun file deve restare vuoto o troppo piccolo.
for (const nome of file) {
  const info = await stat(path.join(cartella, nome));
  if (info.size < 120) throw new Error(`${nome}: file sospetto (${info.size} byte).`);
}

console.log(
  `[build-plant-svg] illustrazioni generate: ${scritti}` +
    (saltati ? ` · senza ricetta: ${saltati}` : ""),
);
