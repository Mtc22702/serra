/**
 * Controlla che i comandi siano abbastanza grandi da centrare col dito e che
 * quelli distruttivi stiano abbastanza lontani da quelli frequenti.
 *
 * Il motivo per cui esiste: nel carrello la ✕ che cancellava una pianta era
 * 18 × 24 px e stava sette pixel sotto al «+» che si preme per aumentare la
 * quantità. I loro centri distavano 41 px — meno di quanto sia largo il
 * polpastrello che tocca lo schermo — quindi un tocco solo li copriva
 * entrambi e quale dei due vincesse lo decideva il caso. Non era una svista
 * isolata: la stessa forma comparve nel vassoio del vivaio, nell'intestazione
 * del cassetto e nelle azioni degli ordini.
 *
 * ── Cosa questo controllo vede e cosa no ──────────────────────────────────
 * Da un foglio di stile si vede la misura dichiarata di un comando, non la
 * distanza a cui finisce sullo schermo: quella dipende dal contenuto, dal
 * punto di rottura e dalla cascata. Quindi qui si verificano le due cose
 * che *sono* statiche:
 *
 *   1. ogni comando distruttivo dichiara un'altezza della scala (mai un px
 *      sciolto sotto la soglia comoda);
 *   2. ogni contenitore che raggruppa un comando distruttivo usa
 *      `--control-gap-danger` come spaziatura.
 *
 * La distanza vera si misura nel browser: in fondo al file c'è la funzione
 * che ho usato per farlo, da incollare nella console. Il registro qui sotto
 * è la parte che va tenuta aggiornata a mano — se nasce un comando
 * distruttivo nuovo, si aggiunge lì.
 *
 * Uso: node scripts/check-control-targets.mjs
 */
import { readFile, glob } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* I comandi che cancellano qualcosa. */
const DISTRUTTIVI =
  /\.(cart-item-remove|viv-remove|orto-remove-btn|cart-clear-btn|order-cancel-button|btn-danger|crop-action-btn--danger|crops-clear-btn|catalog-reset-btn|projects-close)\b/;

/* I gruppi che ne contengono almeno uno: la loro spaziatura dev'essere quella
   maggiorata. Aggiungere qui i gruppi nuovi. */
const GRUPPI_A_RISCHIO = [
  ".cart-header-actions",
  ".order-cancel-zone",
  ".order-actions-panel",
  ".admin-order-secondary-actions",
  ".viv-card-foot",
  ".orto-card-actions",
  ".orto-stock-actions",
  ".orto-harvest-history-item",
];

const ALTEZZE_AMMESSE = new Set([
  "var(--control-h-sm)",
  "var(--control-h-md)",
  "var(--control-h-lg)",
  "var(--button-min-height)",
]);

const GAP_AMMESSO = "var(--control-gap-danger)";
const SOGLIA_PX = 40;

const files = [];
for await (const f of glob(path.join(root, "assets/css/pages/*.css")))
  files.push(f);
files.push(path.join(root, "assets/css/base.css"));

const problemi = [];

for (const file of files.sort()) {
  const source = await readFile(file, "utf8");
  let depth = 0;
  let selettore = "";
  let last = 0;

  for (const m of source.matchAll(/([{}])/g)) {
    const blocco = source.slice(last, m.index);
    const riga = () => source.slice(0, last).split("\n").length;

    if (depth > 0) {
      // 1 — misura dei comandi distruttivi
      if (DISTRUTTIVI.test(selettore)) {
        for (const d of blocco.matchAll(
          /(min-height|height|width):\s*([^;]+);/g,
        )) {
          const [, prop, valore] = d;
          const v = valore.trim();
          if (ALTEZZE_AMMESSE.has(v) || v === "auto" || v === "100%") continue;
          const px = /^(\d+(?:\.\d+)?)px$/.exec(v);
          if (px && Number(px[1]) >= SOGLIA_PX) continue;
          if (!px) continue;
          problemi.push({
            file: path.relative(root, file),
            riga: riga(),
            selettore: selettore.slice(0, 46),
            dettaglio: `${prop}: ${v} — sotto ${SOGLIA_PX}px`,
          });
        }
      }

      // 2 — spaziatura dei gruppi che contengono un comando distruttivo
      if (
        GRUPPI_A_RISCHIO.some((g) =>
          selettore.split(",").some((parte) => parte.trim() === g),
        )
      ) {
        for (const d of blocco.matchAll(/(?:^|[\s;])gap:\s*([^;]+);/g)) {
          const v = d[1].trim();
          if (v === GAP_AMMESSO) continue;
          problemi.push({
            file: path.relative(root, file),
            riga: riga(),
            selettore: selettore.slice(0, 46),
            dettaglio: `gap: ${v} — atteso ${GAP_AMMESSO}`,
          });
        }
      }
    }

    if (m[1] === "{") {
      selettore = blocco
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

if (problemi.length) {
  console.error(
    `\nBersagli e distanze: ${problemi.length} regole fuori sistema.\n` +
      `I comandi distruttivi usano la scala di altezze; i gruppi che li\n` +
      `contengono usano --control-gap-danger. Vedi la nota in base.css.\n`,
  );
  for (const p of problemi)
    console.error(`  ${p.file}:${p.riga}  ${p.selettore}  →  ${p.dettaglio}`);
  process.exit(1);
}

console.log("Bersagli e distanze: coerenti.");

/**
 * Da incollare nella console del browser per misurare le distanze vere.
 * Elenca le coppie di comandi i cui centri stanno più vicini della larghezza
 * di un polpastrello, dando la precedenza a quelle in cui uno dei due cancella
 * qualcosa. È il controllo che il foglio di stile da solo non può fare.
 *
 * Il dettaglio che lo rende attendibile è `elementFromPoint`: senza, ogni
 * pannello aperto sopra la pagina produce decine di falsi allarmi, perché i
 * comandi che stanno *dietro* al cassetto risultano geometricamente vicini a
 * quelli davanti pur non essendo raggiungibili. Contano solo i comandi che
 * riceverebbero davvero il tocco.
 *
 * In cambio vede solo ciò che è nella finestra: va scorsa la pagina.
 */
export const MISURA_NEL_BROWSER = String.raw`
(() => {
  const DISTR = /remove|delete|elimina|cancel|annull|clear|svuota|rimuov|✕|×/i;
  const POLPASTRELLO = 48;

  const colpibile = (el, r) => {
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
    const sopra = document.elementFromPoint(x, y);
    return !!sopra && (sopra === el || el.contains(sopra) || sopra.contains(el));
  };

  const nodi = [...document.querySelectorAll(
    'button,a[href],select,input:not([type=hidden]),[role=button]'
  )].map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ el, r }) =>
      r.width > 4 && r.height > 4 &&
      getComputedStyle(el).visibility !== 'hidden' &&
      colpibile(el, r))
    .map(({ el, r }) => {
      const nome = (el.className || '').toString() || el.getAttribute('aria-label') || el.textContent.trim();
      return { r, nome: nome.slice(0, 34), distr: DISTR.test(nome + ' ' + (el.dataset.action || '')) };
    });

  const out = [];
  for (let i = 0; i < nodi.length; i++) for (let j = i + 1; j < nodi.length; j++) {
    const a = nodi[i], b = nodi[j];
    if (!a.distr && !b.distr) continue;
    const d = Math.hypot(
      (a.r.left + a.r.width / 2) - (b.r.left + b.r.width / 2),
      (a.r.top + a.r.height / 2) - (b.r.top + b.r.height / 2)
    );
    if (d >= POLPASTRELLO) continue;
    out.push({ centri: Math.round(d), a: (a.distr ? '⚠ ' : '') + a.nome, b: (b.distr ? '⚠ ' : '') + b.nome });
  }
  return out.sort((x, y) => x.centri - y.centri);
})()
`;
