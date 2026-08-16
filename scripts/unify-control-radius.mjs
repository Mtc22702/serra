/**
 * Uniforma il raggio dei controlli secondo la regola «la forma dice il ruolo»
 * documentata in assets/css/base.css.
 *
 *   pillola  → si preme o si attiva: CTA, chip, filtri, tab, toggle, segmenti
 *   10 px    → ci si scrive o si sceglie da un elenco, più i comandi di
 *              servizio: input, select, campi di ricerca, pulsanti icona
 *   tondo    → comandi icona quadrati (± quantità, chiudi): restano 50%
 *   16/22 px → contenitori: schede e pannelli, non toccati
 *
 * Lo script è una tantum ma resta nel repo come documentazione eseguibile
 * della classificazione: se domani nasce un controllo nuovo, qui si vede a
 * quale famiglia appartiene e perché.
 *
 * Uso: node scripts/unify-control-radius.mjs [--dry]
 */
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dry = process.argv.includes("--dry");

/* Bersagli da premere: la pillola. L'ordine conta, vince la prima che matcha. */
const PILL = [
  // azioni primarie e secondarie
  /\.btn(\b|-small|\.)/,
  /\.conf-btn\b/,
  /-cta\b/,
  /\.cta\b/,
  /-add-btn\b/,
  /\.cart-(checkout|edit|conf-link|btn)\b/,
  /\.cart-nudge button/,
  /\.confirmation-action\b/,
  /\.crop-action-btn\b/,
  /\.back-home-(btn|link)\b/,
  /\.projects-(new|open)-btn\b/,
  /\.order-(cancel-button|compact-action)$/,
  /\.calendar-month-btn$/,
  /\.cal-empty-state button/,
  /\.novice-crops-note button/,
  /\.project-export-menu button/,
  /\.catalog-search-suggestions button/,
  /\.(preset-seasonal|catalog-reset|yield-edit-crops|saph-print|conf-cart-export)-btn\b/,
  /\.cookie-(accept|reject)-btn\b/,
  /\.crops-fill-main-btn\b/,
  /\.hero-zone-btn\b/,
  /\.hero-cfg-catalog-link\b/,
  /\.kit-plan-link\b/,
  /\.persona-pick-action\b/,
  /\.stage-context-action\b/,
  /\.guided-setup-(gear|summary)-action\b/,
  // chip, filtri, distintivi
  /-chip\b/,
  /\.chip-count\b/,
  /\.tab-count\b/,
  /-badge\b/,
  /-pill\b/,
  /\.btn-month-tag\b/,
  /\.guided-plant-chips span/,
  /\.catalog-filter-step\b/,
  // tab, segmenti, interruttori
  /-tab$/,
  /-tab\b(?!-ic|-icon)/,
  /\.orto-seg button/,
  /\.lang-switch-opt\b/,
  /-toggle$/,
  /-toggle\b(?!-badge)/,
  /\.nav-link\b/,
  /\.confirmation-lang button/,
  /\.count-ctl button/,
];

/* Campi e comandi di servizio: il rettangolo morbido. */
const CONTROL = [
  /\binput\b/,
  /\bselect\b/,
  /\btextarea\b/,
  /-search$/,
  /-search-box\b/,
  /-search-wrapper\b/,
  /-field\b/,
  /#pathField/,
  /-close$/,
  /-clear$/,
  /\.orto-icon-btn\b/,
  /\.modal-close-button\b/,
];

/* Contenitori, decorazioni e raggruppamenti: non sono controlli.
   In particolare le piastrelle icona (`-ico`, `-icon`) sono ornamenti dentro
   ad altri elementi, non bersagli: alcune sono tonde apposta (.category-ico,
   .contatti-icon) e trattarle come comandi le avrebbe squadrate. */
const SKIP = [
  /-ico$/,
  /-icon$/,
  /-check-box$/,
  /\.checkline\b/,
  /-group\b/,
  /-groups\b/,
  /\.nav-links\b/,
  /-shell\b/,
  /-panel\b/,
  /-card\b/,
  /-wrap\b/,
  /-menu\b/,
  /-suggestions\b/,
  /\.veg-filters\b/,
  /\.lang-switch$/,
  /-tabs\b/,
  /\[open\]/,
  /-selector\b/,
  /::(before|after)/,
];

const PILL_TOKEN = "var(--control-radius-pill)";
const CONTROL_TOKEN = "var(--control-radius)";

/* Solo i raggi a valore singolo e già "generici". Le forme composte
   (`x x 0 0` di una tab attaccata al pannello) e i 50% dei comandi tondi
   restano come sono: dicono già una cosa precisa. */
const REWRITABLE =
  /^(var\(--radius-(sm|md|lg|xl|pill)(,[^)]*)?\)|var\(--raggio(,[^)]*)?\)|var\(--orto-r(-lg)?(,[^)]*)?\)|var\(--button-radius\)|\d+px)$/;

function classify(selector) {
  if (SKIP.some((r) => r.test(selector))) return null;
  if (CONTROL.some((r) => r.test(selector))) return CONTROL_TOKEN;
  if (PILL.some((r) => r.test(selector))) return PILL_TOKEN;
  return null;
}

/** Percorre il file tenendo traccia del selettore della regola corrente. */
function rewrite(source) {
  const out = [];
  let i = 0;
  let depth = 0;
  const selectorStack = [];
  let changed = 0;
  const decisions = [];

  const declRe = /border-radius:\s*([^;]+);/g;

  // Taglia il sorgente sui delimitatori di blocco, così ogni dichiarazione
  // sa dentro quale selettore si trova.
  const tokenRe = /([{}])/g;
  let m;
  let last = 0;
  while ((m = tokenRe.exec(source))) {
    const chunk = source.slice(last, m.index);
    const brace = m[1];

    if (depth > 0) {
      // dichiarazioni dentro un blocco: riscrivi se il ruolo lo richiede
      const selector = selectorStack[selectorStack.length - 1] || "";
      const role = classify(selector);
      out.push(
        chunk.replace(declRe, (full, value) => {
          const v = value.trim();
          if (!role || !REWRITABLE.test(v) || v === role) return full;
          changed += 1;
          decisions.push({ selector: selector.slice(0, 60), from: v, to: role });
          return `border-radius: ${role};`;
        }),
      );
    } else {
      out.push(chunk);
    }

    if (brace === "{") {
      const raw = chunk
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .pop();
      selectorStack.push(" ".repeat(0) + raw.trim().replace(/\s+/g, " "));
      depth += 1;
    } else {
      selectorStack.pop();
      depth -= 1;
    }
    out.push(brace);
    last = m.index + 1;
  }
  out.push(source.slice(last));
  return { text: out.join(""), changed, decisions };
}

const files = [];
for await (const f of glob(path.join(root, "assets/css/pages/*.css")))
  files.push(f);
files.push(path.join(root, "assets/css/base.css"));

let total = 0;
const allDecisions = [];
for (const file of files.sort()) {
  const source = await readFile(file, "utf8");
  const { text, changed, decisions } = rewrite(source);
  if (changed) {
    total += changed;
    allDecisions.push(...decisions.map((d) => ({ ...d, file: path.basename(file) })));
    if (!dry) await writeFile(file, text, "utf8");
  }
}

for (const d of allDecisions)
  console.log(
    `${d.file.padEnd(24)} ${d.selector.padEnd(52)} ${d.from} → ${d.to}`,
  );
console.log(`\n${total} dichiarazioni ${dry ? "da riscrivere" : "riscritte"}.`);
