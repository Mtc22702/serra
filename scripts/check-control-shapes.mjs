/**
 * Controlla che la regola «la forma dice il ruolo» — documentata in
 * assets/css/base.css — non si sfaldi di nuovo.
 *
 * L'incoerenza dei pulsanti non è nata da una decisione sbagliata: è nata da
 * sette pagine scritte in momenti diversi, ognuna delle quali ha aggiunto un
 * raggio «quasi uguale» agli altri. Un token condiviso non basta a impedirlo,
 * perché nulla obbliga la regola successiva a citarlo. Questo controllo sì.
 *
 * Fallisce se un selettore di controllo (pulsante, chip, tab, campo, toggle)
 * usa un raggio che non sia uno dei quattro ammessi, o se ne inventa uno in px.
 *
 * Uso: node scripts/check-control-shapes.mjs
 */
import { readFile, glob } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* I quattro valori ammessi su un controllo, più le forme composte legittime
   (una tab attaccata al pannello arrotonda solo gli angoli alti) e lo zero
   di chi sta dentro a un guscio già arrotondato. */
const ALLOWED = new Set([
  "var(--control-radius)",
  "var(--control-radius-pill)",
  "var(--control-radius-round)",
  "50%",
  "0",
  "inherit",
  /* le righe-azione ricche: vedi l'eccezione documentata in base.css */
  "var(--radius-lg)",
]);

const ALLOWED_COMPOSITE =
  /^(var\(--control-radius\)|0)(\s+(var\(--control-radius\)|0)){1,3}$/;

/* Le schede di scelta non sono controlli: sono riquadri con illustrazione e
   due righe di testo, e prendono il raggio delle schede (vedi la geometria
   `--choice-card-*` in base.css). `.guide-tab` si chiama «tab» per ragioni
   storiche — è un `role="tab"` — ma a schermo è la stessa scheda che il
   configuratore mostra nella modale delle impostazioni. */
const SCHEDE_DI_SCELTA = /\.(guide-tab|pc-persona-card|journey-pick)\b/;

/* Selettori che sono controlli.
   Limite noto: da un foglio di stile non si vede il tag dell'elemento, quindi
   una `<select>` con una classe che non dice «select» sfugge — è successo con
   `.viv-sort`, rimasta a pillola in mezzo alle chip dei filtri. I nomi tipici
   dei campi sono elencati qui sotto; per il resto la rete di sicurezza è
   l'ispezione nel browser, dove il tag si vede. */
const CONTROL =
  /(^|[.\s>+~])[\w-]*(btn|button|cta|chip|tab|toggle|seg|sort|search)\b|\b(input|select|textarea)\b/i;

/* Cose che il nome fa sembrare controlli ma non lo sono: gusci, gruppi,
   piastrelle icona, distintivi non cliccabili. */
const NOT_CONTROL =
  /-ico$|-icon$|-icons$|-count$|-badge$|-label$|-lbl$|-group$|-groups$|-wrap$|-wrapper$|-panel$|-card$|-shell$|-tabs$|-menu$|-links$|-list$|-suggestions$|-selector$|-bar$|-rail$|-note$|-copy$|-text$|::(before|after)|\[open\]|\s(span|b|small|img|svg|i|em)$/;

const files = [];
for await (const f of glob(path.join(root, "assets/css/pages/*.css")))
  files.push(f);
files.push(path.join(root, "assets/css/base.css"));

const problems = [];

for (const file of files.sort()) {
  const source = await readFile(file, "utf8");
  let depth = 0;
  let selector = "";
  let last = 0;

  for (const m of source.matchAll(/([{}])/g)) {
    const chunk = source.slice(last, m.index);

    if (
      depth > 0 &&
      CONTROL.test(selector) &&
      !NOT_CONTROL.test(selector) &&
      !SCHEDE_DI_SCELTA.test(selector)
    ) {
      for (const d of chunk.matchAll(/border-radius:\s*([^;]+);/g)) {
        const value = d[1].trim();
        if (ALLOWED.has(value) || ALLOWED_COMPOSITE.test(value)) continue;
        problems.push({
          file: path.relative(root, file),
          line: source.slice(0, last + d.index).split("\n").length,
          selector: selector.slice(0, 58),
          value,
        });
      }
    }

    if (m[1] === "{") {
      selector = chunk
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .pop()
        .trim()
        .replace(/\s+/g, " ");
      depth += 1;
    } else {
      depth -= 1;
    }
    last = m.index + 1;
  }
}

if (problems.length) {
  console.error(
    `\nForma dei controlli: ${problems.length} regole fuori sistema.\n` +
      `Ammessi su un controllo: --control-radius, --control-radius-pill,\n` +
      `--control-radius-round / 50%, 0. Le righe-azione alte oltre 64 px\n` +
      `usano --radius-lg (eccezione documentata in base.css).\n`,
  );
  for (const p of problems)
    console.error(`  ${p.file}:${p.line}  ${p.selector}  →  ${p.value}`);
  process.exit(1);
}

console.log("Forma dei controlli: coerente.");
