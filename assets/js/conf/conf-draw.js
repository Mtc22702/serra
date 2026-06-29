/* =========================================================================
   SEZIONE 07 - Disegno SVG delle piante
   -------------------------------------------------------------------------
   Genera forme vegetali dall'alto con un casuale deterministico: a parita di
   pianta/layout il disegno resta stabile, ma non appare troppo ripetitivo.
   ========================================================================= */

/* Casuale deterministico: varietà grafica stabile a parità di pianta/layout. */
function rngFrom(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Disegno piantine: SVG dall'alto, centrato in (0,0), raggio in cm. */
function leafPath(len, wid) {
  return `M0 0 C ${wid} ${-len * 0.16}, ${wid * 0.55} ${-len * 0.85}, 0 ${-len} C ${-wid * 0.55} ${-len * 0.85}, ${-wid} ${-len * 0.16}, 0 0 Z`;
}
function lobedLeafPath(len, wid) {
  // foglia frastagliata (rucola, tarassaco)
  return `M0 0 Q ${wid * 0.4} ${-len * 0.1} ${wid * 0.5} ${-len * 0.25}
          Q ${wid * 0.15} ${-len * 0.3} ${wid * 0.55} ${-len * 0.45}
          Q ${wid * 0.1} ${-len * 0.5} ${wid * 0.45} ${-len * 0.7}
          Q ${wid * 0.05} ${-len * 0.75} 0 ${-len}
          Q ${-wid * 0.05} ${-len * 0.75} ${-wid * 0.45} ${-len * 0.7}
          Q ${-wid * 0.1} ${-len * 0.5} ${-wid * 0.55} ${-len * 0.45}
          Q ${-wid * 0.15} ${-len * 0.3} ${-wid * 0.5} ${-len * 0.25}
          Q ${-wid * 0.4} ${-len * 0.1} 0 0 Z`;
}
function palmatePath(r) {
  // foglia di cucurbita, 5 lobi
  const L = r;
  let d = `M0 0 `;
  for (let k = -2; k <= 2; k++) {
    const a = k * 0.5;
    const lx = Math.sin(a) * L,
      ly = -Math.cos(a) * L;
    d += `Q ${Math.sin(a - 0.2) * L * 0.6} ${-Math.cos(a - 0.2) * L * 0.6} ${lx} ${ly} Q ${Math.sin(a + 0.2) * L * 0.6} ${-Math.cos(a + 0.2) * L * 0.6} 0 0 `;
  }
  return d + "Z";
}
const shade = "rgba(0,0,0,.13)";

function shouldShowHarvestVector(plant) {
  if (["frutto", "radice", "legume"].includes(plant.tipo)) return true;
  return new Set([
    "broccolo",
    "cavolfiore",
    "cavolo",
    "verza",
    "cavolorapa",
    "cavoletti",
    "cavolo_rosso",
    "cavolo_navone",
    "carciofo",
    "asparago",
    "finocchio",
    "broccolo_romanesco",
    "catalogna"
  ]).has(plant.id);
}

const LATER_PLANT_SVG_IDS = new Set([
  "broccolo_romanesco",
  "friggitello",
  "agretti",
  "borragine",
  "catalogna",
  "acetosa",
  "leurda",
  "melissa",
  "cerfoglio",
  "cimbru"
]);

function glyph(plant, r, rng) {
  if (LATER_PLANT_SVG_IDS.has(plant?.id)) {
    const size = r * 2;
    const src = window.serraAsset(`assets/img/svg/${plant.id}.svg`);
    return `<image href="${src}" x="${-r}" y="${-r}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>`;
  }
  const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
  const sh = `<ellipse cx="${r * 0.08}" cy="${r * 0.12}" rx="${r * 0.95}" ry="${r * 0.85}" fill="${shade}"/>`;
  let s = "";
  switch (plant.arch) {
    case "rosetta": {
      s += sh;
      const N = 10 + Math.floor(rng() * 4);
      for (let ring = 0; ring < 2; ring++) {
        const f = ring ? 0.62 : 1,
          n = ring ? 7 : N;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * 360 + (ring ? 20 : 0) + rng() * 14;
          const len = r * f * (0.85 + rng() * 0.25),
            wid = len * 0.5;
          const col = ring ? c.l1 : i % 2 ? c.l2 : c.l1;
          s += `<g transform="rotate(${a})"><path d="${leafPath(len, wid)}" fill="${col}"/><path d="M0 0 L0 ${-len * 0.9}" stroke="rgba(0,0,0,.10)" stroke-width="${len * 0.03}" fill="none"/></g>`;
        }
      }
      const heart = c.fr || c.l1;
      s += `<circle r="${r * 0.16}" fill="${heart}"/>`;
      break;
    }
    case "frastagliata": {
      s += sh;
      const N = 9 + Math.floor(rng() * 4);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 360 + rng() * 20;
        const len = r * (0.8 + rng() * 0.3),
          wid = len * 0.45;
        s += `<g transform="rotate(${a})"><path d="${lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
      }
      s += `<circle r="${r * 0.1}" fill="${c.l2}"/>`;
      break;
    }
    case "cespuglio": {
      // foglie ovali a coppie, cespuglio compatto
      s += sh;
      const N = 14 + Math.floor(rng() * 6);
      for (let i = 0; i < N; i++) {
        const a = rng() * 360;
        const dist = rng() * r * 0.55;
        const len = r * (0.4 + rng() * 0.3),
          wid = len * 0.62;
        const x = Math.cos((a * Math.PI) / 180) * dist,
          y = Math.sin((a * Math.PI) / 180) * dist;
        s += `<g transform="translate(${x} ${y}) rotate(${rng() * 360})"><path d="${leafPath(len, wid)}" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
      }
      break;
    }
    case "frutto": {
      // rosetta verde + frutti colorati
      s += sh;
      const N = 8 + Math.floor(rng() * 3);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 360 + rng() * 16;
        const len = r * (0.9 + rng() * 0.2),
          wid = len * 0.5;
        s += `<g transform="rotate(${a})"><path d="${lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
      }
      const fr = c.fr || "#e2452f",
        nf = 2 + Math.floor(rng() * 3);
      for (let i = 0; i < nf; i++) {
        const a = rng() * 360,
          dist = r * (0.2 + rng() * 0.4);
        const x = Math.cos(a) * dist,
          y = Math.sin(a) * dist;
        const fr2 = r * 0.17 * (0.8 + rng() * 0.4);
        s += `<circle cx="${x}" cy="${y}" r="${fr2}" fill="${fr}"/><circle cx="${x - fr2 * 0.3}" cy="${y - fr2 * 0.3}" r="${fr2 * 0.35}" fill="rgba(255,255,255,.5)"/>`;
      }
      break;
    }
    case "cucurbita": {
      // grandi foglie palmate espanse + fiore
      s += `<ellipse cx="${r * 0.1}" cy="${r * 0.14}" rx="${r}" ry="${r * 0.9}" fill="${shade}"/>`;
      const N = 5 + Math.floor(rng() * 2);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 360 + rng() * 22;
        const sc = 0.55 + rng() * 0.35;
        s += `<g transform="rotate(${a}) translate(0 ${-r * 0.15})"><path d="${palmatePath(r * sc)}" fill="${i % 2 ? c.l1 : c.l2}" stroke="rgba(0,0,0,.08)" stroke-width="${r * 0.02}"/></g>`;
      }
      if (c.fl) {
        const fx = r * 0.1,
          fy = -r * 0.1,
          fr = r * 0.22;
        s += `<g transform="translate(${fx} ${fy})">`;
        for (let k = 0; k < 5; k++)
          s += `<ellipse rx="${fr * 0.5}" ry="${fr}" fill="${c.fl}" transform="rotate(${k * 72}) translate(0 ${-fr * 0.6})"/>`;
        s += `<circle r="${fr * 0.35}" fill="#e0902a"/></g>`;
      }
      break;
    }
    case "rampicante": {
      // foglie cuoriformi su tralcio
      s += sh;
      const N = 10 + Math.floor(rng() * 5);
      for (let i = 0; i < N; i++) {
        const a = rng() * 360,
          dist = rng() * r * 0.7;
        const len = r * (0.45 + rng() * 0.3),
          wid = len * 0.8;
        const x = Math.cos((a * Math.PI) / 180) * dist,
          y = Math.sin((a * Math.PI) / 180) * dist;
        s += `<g transform="translate(${x} ${y}) rotate(${rng() * 360})"><path d="${leafPath(len, wid)}" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
      }
      // viticcio
      s += `<path d="M0 0 q ${r * 0.4} ${-r * 0.4} ${r * 0.1} ${-r * 0.7}" stroke="${c.l2}" stroke-width="${r * 0.04}" fill="none"/>`;
      break;
    }
    case "piumosa": {
      // fogliame piumoso (carota, finocchio, aneto)
      s += `<ellipse cx="${r * 0.06}" cy="${r * 0.1}" rx="${r * 0.8}" ry="${r * 0.75}" fill="${shade}"/>`;
      const N = 7 + Math.floor(rng() * 4);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 360 + rng() * 20;
        const len = r * (0.8 + rng() * 0.3);
        let frond = `<path d="M0 0 L0 ${-len}" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.05}" fill="none"/>`;
        const segs = 4 + Math.floor(rng() * 3);
        for (let j = 1; j <= segs; j++) {
          const yy = (-len * j) / (segs + 1),
            ll = len * 0.22 * (1 - j / (segs + 2));
          frond += `<path d="M0 ${yy} l ${ll} ${-ll * 0.5}" stroke="${c.l1}" stroke-width="${r * 0.03}"/><path d="M0 ${yy} l ${-ll} ${-ll * 0.5}" stroke="${c.l1}" stroke-width="${r * 0.03}"/>`;
        }
        s += `<g transform="rotate(${a})">${frond}</g>`;
      }
      if (c.fr) s += `<circle r="${r * 0.12}" fill="${c.fr}"/>`;
      break;
    }
    case "bulbo": {
      // lame tubolari verdi-azzurre dritte
      s += `<ellipse cx="0" cy="${r * 0.1}" rx="${r * 0.5}" ry="${r * 0.4}" fill="${shade}"/>`;
      const N = 5 + Math.floor(rng() * 3);
      for (let i = 0; i < N; i++) {
        const a = (i - N / 2) * 12 + rng() * 8;
        const len = r * (1.0 + rng() * 0.25),
          wid = r * 0.14;
        s += `<g transform="rotate(${a})"><path d="M ${-wid} 0 Q 0 ${-len} ${wid} 0 Z" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
      }
      s += `<ellipse rx="${r * 0.28}" ry="${r * 0.22}" fill="${c.l2}"/>`;
      break;
    }
    case "brassica": {
      // grandi foglie tonde blu-verdi + testa centrale
      s += `<ellipse cx="${r * 0.08}" cy="${r * 0.12}" rx="${r}" ry="${r * 0.9}" fill="${shade}"/>`;
      const N = 7 + Math.floor(rng() * 2);
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 360 + rng() * 14;
        const len = r * (0.95 + rng() * 0.15),
          wid = len * 0.72;
        s += `<g transform="rotate(${a})"><path d="${leafPath(len, wid)}" fill="${i % 2 ? c.l1 : c.l2}"/><path d="M0 0 L0 ${-len * 0.85}" stroke="rgba(255,255,255,.18)" stroke-width="${len * 0.04}"/></g>`;
      }
      const head = c.head || "#bcd6a0";
      s += `<circle r="${r * 0.4}" fill="${head}"/><circle cx="${-r * 0.12}" cy="${-r * 0.12}" r="${r * 0.16}" fill="rgba(255,255,255,.3)"/>`;
      if (plant.id === "broccolo" || plant.id === "cavolfiore") {
        for (let k = 0; k < 7; k++) {
          const a = (k / 7) * Math.PI * 2;
          s += `<circle cx="${Math.cos(a) * r * 0.22}" cy="${Math.sin(a) * r * 0.22}" r="${r * 0.1}" fill="${head}" stroke="rgba(0,0,0,.06)"/>`;
        }
      }
      break;
    }
    case "fragola": {
      s += sh;
      const N = 8 + Math.floor(rng() * 3);
      for (let i = 0; i < N; i++) {
        const a = rng() * 360,
          dist = rng() * r * 0.55;
        const len = r * 0.4 * (0.8 + rng() * 0.3);
        const x = Math.cos((a * Math.PI) / 180) * dist,
          y = Math.sin((a * Math.PI) / 180) * dist;
        // foglia trilobata
        s += `<g transform="translate(${x} ${y}) rotate(${rng() * 360})">
            <path d="${leafPath(len, len * 0.55)}" fill="${c.l1}"/>
            <g transform="rotate(40)"><path d="${leafPath(len * 0.8, len * 0.45)}" fill="${c.l2}"/></g>
            <g transform="rotate(-40)"><path d="${leafPath(len * 0.8, len * 0.45)}" fill="${c.l2}"/></g></g>`;
      }
      const nb = 1 + Math.floor(rng() * 3);
      for (let i = 0; i < nb; i++) {
        const a = rng() * 360,
          dist = r * (0.2 + rng() * 0.4);
        const x = Math.cos(a) * dist,
          y = Math.sin(a) * dist;
        s += `<circle cx="${x}" cy="${y}" r="${r * 0.13}" fill="${c.fr || "#e23b3b"}"/>`;
      }
      // fiorellini bianchi
      for (let i = 0; i < 2; i++) {
        const a = rng() * 360,
          dist = r * 0.4;
        const x = Math.cos(a) * dist,
          y = Math.sin(a) * dist;
        s += `<circle cx="${x}" cy="${y}" r="${r * 0.07}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${r * 0.03}" fill="#f3c43b"/>`;
      }
      break;
    }
    case "erbafine": {
      // cespuglietto fitto di foglioline (rosmarino/timo/origano)
      s += sh;
      const N = 40 + Math.floor(rng() * 20);
      for (let i = 0; i < N; i++) {
        const a = rng() * Math.PI * 2,
          dist = rng() * r * 0.85;
        const x = Math.cos(a) * dist,
          y = Math.sin(a) * dist;
        const len = r * (0.12 + rng() * 0.12);
        s += `<path d="M${x} ${y} l ${Math.cos(a) * len} ${Math.sin(a) * len}" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.06}" stroke-linecap="round"/>`;
      }
      break;
    }
    default: {
      s += sh + `<circle r="${r * 0.7}" fill="${c.l1}"/>`;
    }
  }
  return s;
}

/* =========================================================================
   SEZIONE 08 - Geometria della serra e costruzione scena
   -------------------------------------------------------------------------
   Calcola mesi effettivi, compatibilita, colonne, dimensioni aiuole e SVG
   principale della vista dall'alto.
   ========================================================================= */
function effectiveMonths(plant) {
  const set = new Set(plant.mesi);
  const expand = state.riscaldata || state.zona === "caldo";
  if (expand) {
    plant.mesi.forEach((m) => {
      set.add(m === 1 ? 12 : m - 1);
      set.add(m === 12 ? 1 : m + 1);
    });
  } else if (state.zona === "freddo") {
    // Zona fredda non riscaldata: niente semine nel cuore dell'inverno (dicembre
    // e gennaio). La finestra utile si restringe a febbraio-novembre; i mesi
    // originali della pianta che cadono fuori da questa finestra vengono esclusi.
    // E' sempre un sottoinsieme dei mesi temperati, quindi non puo' mai produrre
    // piu colture di una serra temperata ne lasciare "mesi fantasma" irraggiungibili.
    // Attivando il riscaldamento si rientra nel ramo "expand" qui sopra e la
    // finestra torna ad allargarsi.
    set.clear();
    plant.mesi.forEach((m) => {
      if (m >= 2 && m <= 11) set.add(m);
    });
  }
  return set;
}
function seminabili() {
  return PLANTS.filter((p) => effectiveMonths(p).has(state.mese));
}
const H_RANK = { bassa: 0, media: 1, alta: 2 };

function layoutColumns(Wi) {
  if (Wi >= 420) return 3;
  if (Wi >= 260) return 2;
  return 1;
}

function maxSlotsForSpan(span, spacing) {
  const usable = Math.max(0, span);
  const step = Math.max(1, spacing || 1);
  return Math.max(1, Math.floor(usable / step));
}

function centeredSlots(start, span, count, spacing) {
  const safeCount = Math.max(1, count);
  if (safeCount === 1) return [start + span / 2];
  const step = Math.max(1, spacing || 1);
  const used = (safeCount - 1) * step;
  const first = start + Math.max(0, (span - used) / 2);
  return Array.from({ length: safeCount }, (_, i) => first + i * step);
}

function areIncompatible(a, b) {
  if (!a || !b) return false;
  return a.nemiche.includes(b.id) || b.nemiche.includes(a.id);
}

function areCompanions(a, b) {
  if (!a || !b) return false;
  return a.amiche.includes(b.id) || b.amiche.includes(a.id);
}

function usableBedWidth() {
  const Wi = state.larghezza * 100;
  const n = Math.min(layoutColumns(Wi), state.beds.length || 1);
  return Math.max(40, (Wi - 2 * MARGIN - (n - 1) * state.path) / n);
}

/* Ancoraggio colonne: registra su ogni aiuola la colonna assegnata dall'ultimo
   layout, così le operazioni successive (modifica quantità, riempi spazi) restano
   stabili invece di far rimescolare la disposizione dal packer greedy. */
function commitColumnAssignment() {
  const L = computeLayout();
  L.beds.forEach((lb) => {
    if (state.beds[lb.idx]) state.beds[lb.idx].col = lb.columnIndex;
  });
}
/* Rimuove l'ancoraggio (es. al cambio dimensioni/stagione) per far ridecidere
   le colonne da zero. */
function clearColumnAssignment() {
  state.beds.forEach((bed) => {
    delete bed.col;
  });
}
/* Ricalcola da zero una disposizione greedy bilanciata delle colonne e la fissa:
   usato all'interno del ribilanciamento così lo spazio liberato (es. dopo una
   riduzione manuale) viene ridistribuito tra le colonne, ma poi l'espansione che
   segue lavora su colonne ancorate e stabili senza rimescolare tutto. */
function rebalanceColumnsFresh() {
  clearColumnAssignment();
  commitColumnAssignment();
}

function computeLayout() {
  const Wi = state.larghezza * 100,
    Li = state.lunghezza * 100; // interno cm
  const columnCount = Math.min(layoutColumns(Wi), state.beds.length || 1);
  const bedW = usableBedWidth();
  const columns = Array.from({ length: columnCount }, (_, i) => ({
    index: i,
    x: MARGIN + i * (bedW + state.path),
    y: MARGIN,
    lastPlant: null,
    lastY: MARGIN
  }));
  let beds = [],
    overflow = false;
  state.beds.forEach((b, idx) => {
    const p = BYID[b.plantId];
    const S = p.d; // distanza sulla fila (tra piante nella stessa fila)
    const Sc = p.dr || p.d; // distanza tra file (tra file adiacenti, usata nella larghezza)
    const isFila = b.layout === "fila" && Li >= 480 && columnCount > 1;
    // Le file corrono in senso Y (lunghezza), la distanza TRA file (Sc) va in X (larghezza)
    // e la distanza SULLA fila (S) va in Y (altezza del letto).
    // In modalità fila si usano comunque tante file affiancate quante ne entra nella larghezza
    // dell'aiuola (ad es. cetriolo dr=100cm in aiuola da 200cm → 2 file affiancate).
    const Sr = S; // passo Y: distanza sulla fila (p.d)
    const innerW = bedW - 2 * BEDPAD;
    const cols = maxSlotsForSpan(innerW, Sc); // file in larghezza, sia per blocco che per fila
    const rows = isFila
      ? maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, S)
      : Math.max(1, Math.ceil(b.count / cols));
    const naturalBedH = isFila
      ? Li - 2 * MARGIN
      : 2 * BEDPAD + Math.max(1, rows) * Sr;
    const minVisualBedH = Math.max(46, visualPlantRadius(p) * 3 + 18);
    const bedH = isFila ? naturalBedH : Math.max(naturalBedH, minVisualBedH);
    // Colonna "ancorata": se l'aiuola ha una colonna assegnata (e ancora valida)
    // la rispettiamo, così modificare una quantità non rimescola tutta la serra.
    // Senza ancoraggio si usa il greedy (colonna più bassa, con penalità/bonus
    // di compatibilità) — usato dal piano automatico che decide da zero.
    let col;
    if (Number.isInteger(b.col) && b.col >= 0 && b.col < columnCount) {
      col = columns[b.col];
    } else {
      col = columns.reduce((best, current) => {
        const score = (column) => {
          const conflictPenalty = areIncompatible(p, column.lastPlant)
            ? state.path * 3
            : 0;
          const companionBonus = areCompanions(p, column.lastPlant)
            ? state.path * 0.35
            : 0;
          return column.y + conflictPenalty - companionBonus;
        };
        return score(current) < score(best) ? current : best;
      });
    }
    const y = col.y;
    const positions = [];
    let placed = 0;
    const xSlots = centeredSlots(col.x + BEDPAD, innerW, cols, Sc);
    const rowOffset = isFila ? 0 : Math.max(0, (bedH - naturalBedH) / 2);
    const ySlots = centeredSlots(
      y + BEDPAD + rowOffset,
      Math.max(0, naturalBedH - 2 * BEDPAD),
      rows,
      Sr
    );
    for (let row = 0; row < rows && placed < b.count; row++) {
      for (let plantCol = 0; plantCol < cols && placed < b.count; plantCol++) {
        positions.push({
          x: xSlots[plantCol],
          y: ySlots[row]
        });
        placed++;
      }
    }
    if (placed < b.count) overflow = true;
    if (y + bedH > Li - MARGIN + 1) overflow = true;
    beds.push({
      idx,
      plant: p,
      count: b.count,
      columnIndex: col.index,
      x: col.x,
      y,
      w: bedW,
      h: bedH,
      cols,
      rows,
      layout: isFila ? "fila" : "blocco",
      positions
    });
    col.y += bedH + BED_GAP;
    col.lastPlant = p;
    col.lastY = y;
  });
  // Overflow orizzontale: quando il camminamento e' troppo largo per la serra,
  // usableBedWidth() viene clampato a 40 e le colonne sforano il muro destro.
  // Senza questo controllo le aiuole verrebbero disegnate oltre il bordo senza
  // che il motore se ne accorga (l'overflow verticale da solo non lo intercetta).
  if (columnCount > 0) {
    const rightEdge = columns[columnCount - 1].x + bedW;
    if (rightEdge > Wi - MARGIN + 1) overflow = true;
  }
  const usedH = beds.length
    ? Math.max(...columns.map((col) => col.y - BED_GAP))
    : 0;
  const columnHeights = columns.map((col) => Math.max(0, col.y - BED_GAP));
  return { Wi, Li, bedW, beds, usedH, columnHeights, overflow, columnCount };
}

function visualPlantRadius(plant) {
  return Math.max(plant.d * 0.55, MIN_VISUAL_GLYPH_R);
}

function visualItemsForBed(bed, maxItems) {
  if (bed.positions.length <= maxItems) {
    return bed.positions.map((pos, sourceIndex) => ({ pos, sourceIndex }));
  }
  // Quando le piante superano il budget di glifi (limite di performance) bisogna
  // mostrarne solo una parte. Riduciamo il NUMERO DI FILE, non i singoli posti
  // sparsi: scegliamo quante file mostrare in base al budget e le distribuiamo
  // uniformemente sull'altezza dell'aiuola, disegnando tutte le colonne di ogni
  // fila mostrata. Cosi le piante restano in griglia ordinata e allineata invece
  // di apparire disposte a caso (le posizioni vere sono gia su griglia regolare,
  // qui si scelgono solo quali file rendere visibili).
  const cols = Math.max(1, bed.cols);
  const totalRows = Math.max(1, Math.ceil(bed.positions.length / cols));
  const showRows = Math.max(
    1,
    Math.min(totalRows, Math.floor(maxItems / cols))
  );
  const items = [];
  for (let s = 0; s < showRows; s++) {
    const row =
      showRows === 1 ? 0 : Math.round((s * (totalRows - 1)) / (showRows - 1));
    for (let c = 0; c < cols; c++) {
      const sourceIndex = row * cols + c;
      if (sourceIndex < bed.positions.length) {
        items.push({ pos: bed.positions[sourceIndex], sourceIndex });
      }
    }
  }
  return items;
}

function fitLabelSize(text, width, height, sceneWidth, sceneHeight) {
  const greenhouseScale = Math.min(sceneWidth, sceneHeight) * 0.016;
  const maxByWidth = (width - 28) / Math.max(text.length * 0.56, 1);
  const maxByHeight = height * 0.14;
  return Math.max(
    5.76,
    Math.min(11.4, greenhouseScale * 1.2, maxByWidth * 1.2, maxByHeight * 1.2)
  );
}

function buildScene() {
  const nightMode = document.documentElement.dataset.theme === "dark";
  const L = computeLayout();
  const Wi = L.Wi,
    Li = L.Li;
  const totW = Wi + 2 * WALL,
    totH = Li + 2 * WALL; // serra esterna
  const PAD = 26; // prato attorno
  const vbW = totW + 2 * PAD,
    vbH = totH + 2 * PAD;
  const ox = PAD + WALL,
    oy = PAD + WALL; // origine interno
  let g = "";

  // --- definizioni SVG: motivi terra, ghiaia, prato, riflessi vetro ---
  g += `<defs>
    <radialGradient id="harvestRed" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ff9a82"/><stop offset=".28" stop-color="#e84e3d"/><stop offset=".72" stop-color="#b52e2b"/><stop offset="1" stop-color="#651f25"/></radialGradient>
    <radialGradient id="harvestGreen" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#b9db75"/><stop offset=".3" stop-color="#6fa34d"/><stop offset=".72" stop-color="#3f743b"/><stop offset="1" stop-color="#21472d"/></radialGradient>
    <radialGradient id="harvestOrange" cx="30%" cy="22%" r="80%"><stop offset="0" stop-color="#ffd06c"/><stop offset=".32" stop-color="#ed8a35"/><stop offset=".74" stop-color="#bd5528"/><stop offset="1" stop-color="#74301f"/></radialGradient>
    <radialGradient id="harvestPurple" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#c292c9"/><stop offset=".3" stop-color="#754b83"/><stop offset=".72" stop-color="#4c2d61"/><stop offset="1" stop-color="#281b3d"/></radialGradient>
    <radialGradient id="harvestCream" cx="30%" cy="22%" r="82%"><stop offset="0" stop-color="#fffdf1"/><stop offset=".36" stop-color="#eadfb9"/><stop offset=".76" stop-color="#b8a36f"/><stop offset="1" stop-color="#74633f"/></radialGradient>
    <pattern id="soil" width="46" height="46" patternUnits="userSpaceOnUse">
      <rect width="46" height="46" fill="#5e4632"/>
      <rect width="46" height="46" fill="url(#soilGrad)"/>
      ${soilSpecks()}
    </pattern>
    <radialGradient id="soilGrad" cx="40%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#6f553d"/><stop offset="100%" stop-color="#4a3829"/>
    </radialGradient>
    <pattern id="gravel" width="34" height="34" patternUnits="userSpaceOnUse">
      <rect width="34" height="34" fill="#d8d0bd"/>
      <rect width="34" height="34" fill="url(#gravelLight)" opacity=".72"/>
      ${gravelSpecks()}
    </pattern>
    <linearGradient id="gravelLight" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1ebdb"/><stop offset=".52" stop-color="#d5cab4"/><stop offset="1" stop-color="#b7aa91"/></linearGradient>
    <pattern id="grass" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="${nightMode ? "#243b2c" : "#9fb083"}"/>${grassSpecks()}
    </pattern>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b47b45"/><stop offset="35%" stop-color="#936039"/><stop offset="72%" stop-color="#714628"/><stop offset="100%" stop-color="#4d2e1b"/>
    </linearGradient>
    <pattern id="woodGrain" width="72" height="18" patternUnits="userSpaceOnUse">
      <rect width="72" height="18" fill="url(#wood)"/>
      <path d="M0 4 C14 1 23 8 38 4 S59 1 72 5 M0 12 C18 8 29 16 47 11 S62 9 72 13" fill="none" stroke="rgba(55,29,14,.3)" stroke-width="1"/>
      <path d="M8 7 C18 4 25 10 34 7" fill="none" stroke="rgba(255,220,166,.18)" stroke-width=".8"/>
    </pattern>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#dff5f7" stop-opacity=".02"/>
      <stop offset="30%" stop-color="#ffffff" stop-opacity=".06"/>
      <stop offset="44%" stop-color="#ffffff" stop-opacity=".01"/>
      <stop offset="76%" stop-color="#b7d8df" stop-opacity=".025"/>
      <stop offset="100%" stop-color="#7eabb5" stop-opacity=".035"/>
    </linearGradient>
    <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="32%" stop-color="#e8eeee"/><stop offset="62%" stop-color="#aebbbb"/><stop offset="100%" stop-color="#758585"/>
    </linearGradient>
    ${
      nightMode
        ? `<radialGradient id="daylight" cx="48%" cy="38%" r="78%"><stop stop-color="#315842" stop-opacity=".04"/><stop offset=".55" stop-color="#071812" stop-opacity=".14"/><stop offset="1" stop-color="#020907" stop-opacity=".38"/></radialGradient>`
        : `<radialGradient id="daylight" cx="25%" cy="12%" r="92%"><stop stop-color="#fff9d9" stop-opacity=".16"/><stop offset=".48" stop-color="#d9edc8" stop-opacity=".04"/><stop offset="1" stop-color="#183d28" stop-opacity=".11"/></radialGradient>`
    }
    <linearGradient id="nightGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071a20" stop-opacity=".16"/><stop offset=".5" stop-color="#0b2021" stop-opacity=".09"/><stop offset="1" stop-color="#020b0d" stop-opacity=".2"/></linearGradient>
    <radialGradient id="lampPool"><stop offset="0" stop-color="#fff4b0" stop-opacity=".72"/><stop offset=".25" stop-color="#ffe58a" stop-opacity=".42"/><stop offset=".62" stop-color="#e9d272" stop-opacity=".16"/><stop offset="1" stop-color="#d5bf62" stop-opacity="0"/></radialGradient>
    <radialGradient id="lampBulb"><stop offset="0" stop-color="#fffde5"/><stop offset=".45" stop-color="#fff3a4"/><stop offset="1" stop-color="#e7b942"/></radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="9" flood-color="#102b1a" flood-opacity=".34"/></filter>
    <filter id="bedLift" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#241408" flood-opacity=".38"/></filter>
    <filter id="lampBloom" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="4.5"/></filter>
    <pattern id="dirtPath" width="36" height="36" patternUnits="userSpaceOnUse">
      <rect width="36" height="36" fill="#c4a55e"/>
      ${dirtPathSpecks()}
    </pattern>
    <clipPath id="interiorClip"><rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="6"/></clipPath>
    <linearGradient id="mapSunFull" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff2a6" stop-opacity=".92"/><stop offset="55%" stop-color="#f5bd2d" stop-opacity=".76"/><stop offset="100%" stop-color="#df7f1b" stop-opacity=".66"/>
    </linearGradient>
    <linearGradient id="mapSunShade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d9edf5" stop-opacity=".88"/><stop offset="62%" stop-color="#8fb5d1" stop-opacity=".72"/><stop offset="100%" stop-color="#5d7fa4" stop-opacity=".62"/>
    </linearGradient>
    <linearGradient id="mapWaterHigh" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8ee8ff" stop-opacity=".9"/><stop offset="55%" stop-color="#238bd4" stop-opacity=".76"/><stop offset="100%" stop-color="#075aa3" stop-opacity=".68"/>
    </linearGradient>
    <linearGradient id="mapWaterMedium" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c8f0ff" stop-opacity=".82"/><stop offset="60%" stop-color="#78bfe6" stop-opacity=".7"/><stop offset="100%" stop-color="#3f92c9" stop-opacity=".58"/>
    </linearGradient>
    <linearGradient id="mapWaterLow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef5e4" stop-opacity=".86"/><stop offset="60%" stop-color="#cfdba5" stop-opacity=".68"/><stop offset="100%" stop-color="#a8b46d" stop-opacity=".58"/>
    </linearGradient>
    <linearGradient id="mapHeightHigh" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#275827" stop-opacity=".64"/><stop offset="100%" stop-color="#0d3d22" stop-opacity=".9"/>
    </linearGradient>
    <linearGradient id="mapHeightMedium" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#8fca61" stop-opacity=".64"/><stop offset="100%" stop-color="#3f8f45" stop-opacity=".82"/>
    </linearGradient>
    <linearGradient id="mapHeightLow" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#ecf6b5" stop-opacity=".72"/><stop offset="100%" stop-color="#a9d870" stop-opacity=".68"/>
    </linearGradient>
    <pattern id="mapWaterRipple" width="24" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 7 Q6 2 12 7 T24 7" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="1.2"/>
    </pattern>
    <pattern id="mapSunRays" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <path d="M0 13 H26" stroke="rgba(255,255,255,.36)" stroke-width="1.4"/>
    </pattern>
    <pattern id="mapHeightLines" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M2 15 L9 5 L16 15" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.1"/>
    </pattern>
  </defs>`;

  // --- prato attorno ---
  g += `<rect x="0" y="0" width="${vbW}" height="${vbH}" fill="url(#grass)"/>`;
  g += `<rect x="0" y="0" width="${vbW}" height="${vbH}" fill="url(#daylight)" pointer-events="none"/>`;
  // --- ombra serra ---
  g += `<rect x="${PAD + 5}" y="${PAD + 8}" width="${totW}" height="${totH}" rx="11" fill="#102719" opacity=".26" filter="url(#soft)"/>`;
  // --- telaio esterno ---
  g += `<rect x="${PAD}" y="${PAD}" width="${totW}" height="${totH}" rx="10" fill="#657779" stroke="#42575a" stroke-width="1.3"/>`;
  g += `<rect x="${PAD + 1.5}" y="${PAD + 1.5}" width="${totW - 3}" height="${totH - 3}" rx="8.5" fill="none" stroke="rgba(240,248,248,.72)" stroke-width=".9" pointer-events="none"/>`;
  // --- interno: terra scura di base ---
  g += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="6" fill="#3a2710"/>`;

  // --- AIUOLE E CAMMINAMENTI (dentro clip) ---
  g += `<g clip-path="url(#interiorClip)">`;

  // --- camminamenti con piastrelle ---
  // margini laterali
  g += `<rect x="${ox}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#gravel)"/>`;
  g += `<rect x="${ox + Wi - MARGIN}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#gravel)"/>`;
  // margini superiore e inferiore
  g += `<rect x="${ox + MARGIN}" y="${oy}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#gravel)"/>`;
  g += `<rect x="${ox + MARGIN}" y="${oy + Li - MARGIN}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#gravel)"/>`;
  // corridoi verticali tra colonne
  for (let i = 0; i < L.columnCount - 1; i++) {
    const pX = MARGIN + (i + 1) * L.bedW + i * state.path;
    g += `<rect x="${ox + pX}" y="${oy}" width="${state.path}" height="${Li}" fill="url(#gravel)"/>`;
  }
  // corridoi orizzontali tra file di aiuole nella stessa colonna
  const colMap = {};
  L.beds.forEach((bed) => {
    const k = bed.x;
    if (!colMap[k]) colMap[k] = [];
    colMap[k].push(bed);
  });
  Object.values(colMap).forEach((beds) => {
    const sorted = [...beds].sort((a, b) => a.y - b.y);
    for (let i = 0; i < sorted.length - 1; i++) {
      const gapY = sorted[i].y + sorted[i].h;
      const gapH = sorted[i + 1].y - gapY;
      if (gapH > 0)
        g += `<rect x="${ox + sorted[i].x}" y="${oy + gapY}" width="${sorted[i].w}" height="${gapH}" fill="url(#gravel)"/>`;
    }
  });

  if (L.beds.length === 0) {
    g += `<text x="${ox + Wi / 2}" y="${oy + Li / 2}" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${Math.min(Wi, Li) * 0.06}" fill="#8c8470">${tx("emptyGreenhouse")}</text>`;
  }
  let drawn = 0;
  // Piante totali da disegnare nell'intera serra: se stanno sotto il tetto
  // globale (MAX_GLYPH) le disegniamo TUTTE alla loro spaziatura reale (d e dr
  // della scheda). Solo quando il totale supera il tetto distribuiamo il budget
  // in proporzione alla dimensione di ogni aiuola, evitando di penalizzare le
  // aiuole numerose con un limite per-aiuola fisso (che faceva sembrare le file
  // piu distanti del vero passo).
  const totalPlants = L.beds.reduce((sum, b) => sum + b.count, 0);
  L.beds.forEach((bed) => {
    const bx = ox + bed.x,
      by = oy + bed.y;
    // bordo legno aiuola rialzata
    g += `<g class="bedhit" data-bed="${bed.idx}">`;
    g += `<rect class="bed-border" x="${bx - 6}" y="${by - 6}" width="${bed.w + 12}" height="${bed.h + 12}" rx="7" fill="url(#woodGrain)" stroke="rgba(42,22,10,.55)" stroke-width="2" filter="url(#bedLift)"/>`;
    g += `<rect x="${bx}" y="${by}" width="${bed.w}" height="${bed.h}" rx="3" fill="url(#soil)" stroke="rgba(255,221,169,.16)" stroke-width="1.2"/>`;
    g += `<rect x="${bx + 2}" y="${by + 2}" width="${Math.max(0, bed.w - 4)}" height="${Math.max(0, bed.h - 4)}" rx="2" fill="none" stroke="rgba(30,15,7,.3)" stroke-width="1" pointer-events="none"/>`;
    // piantine
    const r = visualPlantRadius(bed.plant);
    const bedGlyphBudget =
      totalPlants <= MAX_GLYPH
        ? bed.count
        : Math.max(6, Math.floor((bed.count * MAX_GLYPH) / totalPlants));
    const bedItems = visualItemsForBed(bed, bedGlyphBudget);
    const emojiCount = Math.min(
      Math.max(1, Math.round(Math.sqrt(bed.count) * 1.3)),
      bedItems.length
    );
    const emojiIndexes = emojiSpreadIndexes(
      bedItems.length,
      bed.cols,
      emojiCount
    );
    const pendingEmoji = [];
    bedItems.forEach(({ pos, sourceIndex }, i) => {
      if (drawn >= MAX_GLYPH) return;
      drawn++;
      const rng = rngFrom((bed.idx + 1) * 7919 + sourceIndex * 131);
      const rr = r * (0.92 + rng() * 0.16);
      const rot = Math.floor(rng() * 360);
      g += `<g transform="translate(${ox + pos.x} ${oy + pos.y}) rotate(${rot})">${glyph(bed.plant, rr, rng)}</g>`;
      const fe = FRUIT_EMOJI[bed.plant.id];
      if (fe && emojiIndexes.has(i) && shouldShowHarvestVector(bed.plant)) {
        const fs = Math.max(rr * 1.2, 8) * 0.8;
        pendingEmoji.push(
          `<text x="${ox + pos.x}" y="${oy + pos.y}" text-anchor="middle" dominant-baseline="central" font-size="${fs}" style="pointer-events:none;user-select:none">${fe}</text>`
        );
      }
    });
    const label = plantText(bed.plant, "nome");
    const labelSize = fitLabelSize(label, bed.w, bed.h, vbW, vbH);
    const labelReserve = bed.w >= 70 && bed.h >= 55 ? 17 : 0;
    const labelCenterX = bx + bed.w / 2;
    const labelMaxW = Math.max(24, bed.w - labelReserve * 2 - 8);
    const labelH = labelSize + 5;
    const labelTop = by + 4;
    const labelW = Math.min(
      labelMaxW,
      Math.max(28, label.length * labelSize * 0.56 + 8)
    );
    const naturalLabelTextW = label.length * labelSize * 0.56;
    const labelTextFit =
      naturalLabelTextW > labelW - 6
        ? ` textLength="${Math.max(18, labelW - 6)}" lengthAdjust="spacingAndGlyphs"`
        : "";
    // quote tecniche (stile disegno tecnico)
    const wM = `${(bed.w / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")} m`;
    const hM = `${(bed.h / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")} m`;
    const STRIP = 17; // spessore striscia quota
    const dimFs = 10; // dimensione testo quota
    const qBg = "rgba(20,40,20,.52)";
    const qLine = "rgba(255,255,255,.78)";
    const qText =
      'font-family="Outfit,sans-serif" font-size="' +
      dimFs +
      '" font-weight="700" fill="rgba(255,255,255,.97)" stroke="rgba(0,0,0,.55)" stroke-width="2.5" paint-order="stroke" pointer-events="none"';
    if (bed.w >= 70 && bed.h >= 55) {
      const sy = by + bed.h - STRIP; // y superiore della striscia orizzontale
      const sx = bx + bed.w - STRIP; // x sinistra della striscia verticale
      const vertH = bed.h - STRIP; // altezza striscia verticale (evita angolo)
      // --- striscia orizzontale (larghezza) ---
      g += `<rect x="${bx}" y="${sy}" width="${bed.w}" height="${STRIP}" rx="0" fill="${qBg}" pointer-events="none"/>`;
      g += `<line x1="${bx + 7}" y1="${sy + STRIP / 2}" x2="${bx + bed.w - 7}" y2="${sy + STRIP / 2}" stroke="${qLine}" stroke-width="1" pointer-events="none"/>`;
      // tacche
      g += `<line x1="${bx + 7}" y1="${sy + 3}" x2="${bx + 7}" y2="${sy + STRIP - 3}" stroke="${qLine}" stroke-width="1.8" pointer-events="none"/>`;
      g += `<line x1="${bx + bed.w - 7}" y1="${sy + 3}" x2="${bx + bed.w - 7}" y2="${sy + STRIP - 3}" stroke="${qLine}" stroke-width="1.8" pointer-events="none"/>`;
      // testo larghezza
      g += `<text x="${bx + bed.w / 2}" y="${sy + STRIP - 3}" text-anchor="middle" ${qText}>${wM}</text>`;
      // --- striscia verticale (altezza) ---
      g += `<rect x="${sx}" y="${by}" width="${STRIP}" height="${vertH}" rx="0" fill="${qBg}" pointer-events="none"/>`;
      const cx = sx + STRIP / 2,
        cy = by + vertH / 2;
      g += `<line x1="${cx}" y1="${by + 7}" x2="${cx}" y2="${by + vertH - 7}" stroke="${qLine}" stroke-width="1" pointer-events="none"/>`;
      // tacche
      g += `<line x1="${sx + 3}" y1="${by + 7}" x2="${sx + STRIP - 3}" y2="${by + 7}" stroke="${qLine}" stroke-width="1.8" pointer-events="none"/>`;
      g += `<line x1="${sx + 3}" y1="${by + vertH - 7}" x2="${sx + STRIP - 3}" y2="${by + vertH - 7}" stroke="${qLine}" stroke-width="1.8" pointer-events="none"/>`;
      // testo altezza (ruotato)
      g += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" ${qText} transform="rotate(-90 ${cx} ${cy})">${hM}</text>`;
    } else {
      // aiuole piccole: badge unico ma più grande
      const dimText = `${wM} × ${hM}`;
      const dimFs2 = Math.max(9, Math.min(11, bed.w * 0.055));
      const dimBW = dimText.length * dimFs2 * 0.56 + 12;
      const dimBH = dimFs2 + 8;
      const dimBX = bx + bed.w / 2 - dimBW / 2;
      const dimBY = by + bed.h - dimBH - 4;
      g += `<rect x="${dimBX}" y="${dimBY}" width="${dimBW}" height="${dimBH}" rx="3" fill="${qBg}" pointer-events="none"/>`;
      g += `<text x="${bx + bed.w / 2}" y="${dimBY + dimFs2 + 1}" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${dimFs2}" font-weight="700" fill="rgba(255,255,255,.97)" pointer-events="none">${dimText}</text>`;
    }
    g += `</g>`;
    g += pendingEmoji.join("");
    g += `<g pointer-events="none">`;
    g += `<rect x="${labelCenterX - labelW / 2}" y="${labelTop}" width="${labelW}" height="${labelH}" rx="${Math.min(5, labelH / 2)}" fill="${nightMode ? "rgba(20,43,32,.68)" : "rgba(249,251,245,.62)"}" stroke="${nightMode ? "rgba(176,221,190,.3)" : "rgba(31,80,49,.24)"}" stroke-width=".6"/>`;
    g += `<text x="${labelCenterX}" y="${labelTop + labelH / 2}" dominant-baseline="middle" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${labelSize}" font-weight="750" fill="${nightMode ? "#e8f4eb" : "#254331"}"${labelTextFit}>${label}</text>`;
    g += `</g>`;
    // sovrapposizione analitica
    if (state.overlay) {
      g += overlayShape(bed, bx, by);
    }
  });
  g += `</g>`; // fine clip

  // --- notte e illuminazione artificiale interna ---
  const lampX = ox + Wi / 2;
  const lampYs = [oy + Li * 0.19, oy + Li * 0.5, oy + Li * 0.81];
  const poolRx = Math.max(38, Math.min(Wi * 0.46, 118));
  const poolRy = Math.max(42, Math.min(Li * 0.19, 94));
  if (nightMode) {
    g += `<g clip-path="url(#interiorClip)" pointer-events="none">`;
    g += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="url(#nightGlass)"/>`;
    lampYs.forEach((lampY) => {
      g += `<ellipse cx="${lampX}" cy="${lampY}" rx="${poolRx}" ry="${poolRy}" fill="url(#lampPool)" style="mix-blend-mode:screen"/>`;
    });
    g += `</g>`;
  }

  // --- linea "fine serra" se c'è sforamento ---
  if (L.overflow) {
    g += `<line x1="${ox}" y1="${oy + Li}" x2="${ox + Wi}" y2="${oy + Li}" stroke="#b4452c" stroke-width="4" stroke-dasharray="14 8"/>`;
  }

  // --- STRUTTURA SERRA sovrapposta (vetri + telaio) ---
  g += glassStructure(ox, oy, Wi, Li, PAD, totW, totH);

  // --- tre lampade centrali accese soltanto nella scena notturna ---
  if (nightMode) {
    lampYs.forEach((lampY) => {
      g += `<g transform="translate(${lampX} ${lampY})" pointer-events="none">`;
      g += `<circle r="14" fill="#ffe37a" opacity=".24" filter="url(#lampBloom)"/>`;
      g += `<circle r="7.2" fill="#34413d" stroke="#aab5ae" stroke-width="1.3"/>`;
      g += `<circle r="4.6" fill="url(#lampBulb)" stroke="#fff8ce" stroke-width=".8"/>`;
      g += `<circle cx="-1.4" cy="-1.5" r="1.4" fill="#fff" opacity=".92"/>`;
      g += `</g>`;
    });
  }

  // --- indicatore giorno/notte coerente con il tema; posizionato sul lato
  //     soleggiato (sud) secondo l'orientamento scelto: in alto di default,
  //     in basso quando l'utente imposta il sole in basso. ---
  const sunY = state.sudInBasso ? vbH - PAD - 30 : PAD + 18;
  const sunLabelY = state.sudInBasso ? -22 : 30;
  g += `<g transform="translate(${vbW - PAD - 2} ${sunY})" opacity="0.9">
        <circle r="15" fill="${nightMode ? "#10231f" : "#fff"}" stroke="${nightMode ? "#e7d98d" : "#d9a441"}" stroke-width="${nightMode ? "1.5" : "2"}"/>
        <text x="0" y="5" text-anchor="middle" font-size="16">${nightMode ? "🌙" : "☀️"}</text>
        <text x="0" y="${sunLabelY}" text-anchor="middle" font-family="Outfit" font-size="9" font-weight="800" fill="${nightMode ? "#e9dfaa" : "#7b6a3a"}">${nightMode ? tx("nightLabel") : tx("compassSouth")}</text>
      </g>`;

  return {
    svg: `<svg viewBox="0 0 ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${tx("svgLabel")}">${g}</svg>`,
    layout: L
  };
}

function glassStructure(ox, oy, Wi, Li, PAD, totW, totH) {
  let s = "";
  // riflesso vetro generale
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="url(#glass)" pointer-events="none"/>`;
  // pannelli del tetto: giunti e montanti in alluminio
  const bars = Math.max(2, Math.round(Wi / 60));
  for (let i = 1; i < bars; i++) {
    const x = ox + (Wi * i) / bars;
    s += `<line x1="${x + 0.7}" y1="${oy}" x2="${x + 0.7}" y2="${oy + Li}" stroke="rgba(25,57,62,.075)" stroke-width="1.25" pointer-events="none"/>`;
    s += `<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy + Li}" stroke="rgba(255,255,255,.3)" stroke-width=".7" pointer-events="none"/>`;
  }
  // traversi orizzontali
  const cross = Math.max(2, Math.round(Li / 60));
  for (let i = 1; i < cross; i++) {
    const y = oy + (Li * i) / cross;
    s += `<line x1="${ox}" y1="${y + 0.7}" x2="${ox + Wi}" y2="${y + 0.7}" stroke="rgba(21,50,55,.065)" stroke-width="1.2" pointer-events="none"/>`;
    s += `<line x1="${ox}" y1="${y}" x2="${ox + Wi}" y2="${y}" stroke="rgba(255,255,255,.25)" stroke-width=".65" pointer-events="none"/>`;
  }
  // riflessi lunghi del vetro, senza colmo centrale
  const ridgeX = ox + Wi / 2;
  s += `<polygon points="${ox + 5},${oy + 5} ${ridgeX - 7},${oy + 5} ${ridgeX - 30},${oy + Li - 5} ${ox + 5},${oy + Li - 5}" fill="rgba(224,249,252,.035)" pointer-events="none"/>`;
  s += `<polygon points="${ox + Wi * 0.08},${oy + 5} ${ox + Wi * 0.24},${oy + 5} ${ox + Wi * 0.12},${oy + Li - 5} ${ox + Wi * 0.02},${oy + Li - 5}" fill="rgba(255,255,255,.085)" pointer-events="none"/>`;
  s += `<polygon points="${ridgeX + Wi * 0.09},${oy + 5} ${ridgeX + Wi * 0.2},${oy + 5} ${ridgeX + Wi * 0.33},${oy + Li - 5} ${ridgeX + Wi * 0.22},${oy + Li - 5}" fill="rgba(255,255,255,.05)" pointer-events="none"/>`;
  // controventi agli angoli
  const brace = Math.min(25, Wi * 0.1, Li * 0.1);
  s += `<path d="M${ox + 3} ${oy + brace} L${ox + brace} ${oy + 3} M${ox + Wi - 3} ${oy + brace} L${ox + Wi - brace} ${oy + 3} M${ox + 3} ${oy + Li - brace} L${ox + brace} ${oy + Li - 3} M${ox + Wi - 3} ${oy + Li - brace} L${ox + Wi - brace} ${oy + Li - 3}" fill="none" stroke="rgba(80,101,103,.72)" stroke-width="1.6" pointer-events="none"/>`;
  // profilato perimetrale sottile: ombra, alluminio e filo di luce
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="4" fill="none" stroke="rgba(37,58,61,.58)" stroke-width="5.5" pointer-events="none"/>`;
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="4" fill="none" stroke="url(#frame)" stroke-width="3.8" pointer-events="none"/>`;
  s += `<rect x="${ox - 0.45}" y="${oy - 0.45}" width="${Wi + 0.9}" height="${Li + 0.9}" rx="4.5" fill="none" stroke="rgba(246,252,252,.8)" stroke-width=".75" pointer-events="none"/>`;
  s += `<rect x="${ox + 2.4}" y="${oy + 2.4}" width="${Wi - 4.8}" height="${Li - 4.8}" rx="2.5" fill="none" stroke="rgba(48,70,72,.62)" stroke-width=".8" pointer-events="none"/>`;
  // porta in basso al centro
  const doorX = ox + Wi / 2;
  const dw = Math.min(Wi * 0.34, 90);
  const doorH = 12;
  const doorY = oy + Li - doorH / 2;
  s += `<rect x="${doorX - dw / 2}" y="${doorY}" width="${dw}" height="${doorH}" rx="2.5" fill="rgba(213,238,241,.9)" stroke="#60787a" stroke-width="1.4" pointer-events="none"/>`;
  s += `<line x1="${doorX}" y1="${doorY + 2}" x2="${doorX}" y2="${doorY + doorH - 2}" stroke="rgba(91,111,112,.72)" stroke-width="1.5" pointer-events="none"/>`;
  s += `<rect x="${doorX - dw / 2 + 4}" y="${doorY + 3}" width="${dw - 8}" height="${doorH - 6}" rx="2" fill="url(#glass)" stroke="rgba(255,255,255,.62)" stroke-width=".8" pointer-events="none"/>`;
  s += `<circle cx="${doorX + dw * 0.18}" cy="${doorY + doorH / 2}" r="1.45" fill="#9a7138" stroke="rgba(255,255,255,.7)" stroke-width=".45" pointer-events="none"/>`;
  s += `<text x="${doorX}" y="${doorY + doorH + 12}" text-anchor="middle" font-family="Outfit" font-size="9" font-weight="800" fill="#4b5d5e" stroke="rgba(255,255,255,.82)" stroke-width="2" paint-order="stroke" pointer-events="none">${tx("greenhouseEntrance")}</text>`;
  return s;
}

function dirtPathSpecks() {
  let s = "";
  const r = rngFrom(54321);
  for (let i = 0; i < 28; i++) {
    const light = r() > 0.5;
    const col = light ? `rgba(220,185,110,.45)` : `rgba(90,58,18,.38)`;
    s += `<circle cx="${r() * 36}" cy="${r() * 36}" r="${0.4 + r() * 1.8}" fill="${col}"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const x = r() * 34,
      y = r() * 34;
    const len = 2 + r() * 5;
    const angle = r() * 180;
    const rad = (angle * Math.PI) / 180;
    s += `<line x1="${x}" y1="${y}" x2="${x + Math.cos(rad) * len}" y2="${y + Math.sin(rad) * len}" stroke="rgba(78,48,14,.22)" stroke-width="1" stroke-linecap="round"/>`;
  }
  return s;
}
function soilSpecks() {
  let s = "";
  const r = rngFrom(12345);
  for (let i = 0; i < 16; i++) {
    s += `<circle cx="${r() * 46}" cy="${r() * 46}" r="${1 + r() * 2.4}" fill="rgba(${r() > 0.5 ? "40,28,18" : "120,96,68"},.5)"/>`;
  }
  return s;
}
function gravelSpecks() {
  let s = "";
  const r = rngFrom(777);
  for (let i = 0; i < 18; i++) {
    const g = 170 + Math.floor(r() * 60);
    const x = r() * 34;
    const y = r() * 34;
    const rx = 1.4 + r() * 2.4;
    const ry = 0.8 + r() * 1.5;
    const angle = -28 + r() * 56;
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${angle} ${x} ${y})" fill="rgb(${g},${g - 8},${g - 22})" stroke="rgba(78,72,58,.3)" stroke-width=".45"/>`;
    s += `<ellipse cx="${x - 0.45}" cy="${y - 0.35}" rx="${Math.max(0.45, rx * 0.42)}" ry="${Math.max(0.3, ry * 0.28)}" fill="rgba(255,255,255,.38)"/>`;
  }
  return s;
}
function grassSpecks() {
  let s = "";
  const r = rngFrom(303);
  for (let i = 0; i < 20; i++) {
    const x = r() * 40,
      y = r() * 40;
    s += `<line x1="${x}" y1="${y}" x2="${x + (r() - 0.5) * 3}" y2="${y - 2 - r() * 3}" stroke="rgba(${(70 + r() * 40) | 0},${(110 + r() * 40) | 0},60,.6)" stroke-width="1"/>`;
  }
  return s;
}

function overlayStyleForPlant(p, kind) {
  if (kind === "sole") {
    return p.sole === "pieno"
      ? {
          fill: "url(#mapSunFull)",
          pattern: "url(#mapSunRays)",
          stroke: "#d98316"
        }
      : { fill: "url(#mapSunShade)", pattern: "", stroke: "#5e83aa" };
  }
  if (kind === "acqua") {
    if (p.acqua === "alta")
      return {
        fill: "url(#mapWaterHigh)",
        pattern: "url(#mapWaterRipple)",
        stroke: "#0e73ba"
      };
    if (p.acqua === "media")
      return {
        fill: "url(#mapWaterMedium)",
        pattern: "url(#mapWaterRipple)",
        stroke: "#3e9ed0"
      };
    return { fill: "url(#mapWaterLow)", pattern: "", stroke: "#99a95f" };
  }
  if (kind === "altezza") {
    if (p.h === "alta")
      return {
        fill: "url(#mapHeightHigh)",
        pattern: "url(#mapHeightLines)",
        stroke: "#123f23"
      };
    if (p.h === "media")
      return {
        fill: "url(#mapHeightMedium)",
        pattern: "url(#mapHeightLines)",
        stroke: "#3f8f45"
      };
    return { fill: "url(#mapHeightLow)", pattern: "", stroke: "#9bc86c" };
  }
  return null;
}

function overlayShape(bed, bx, by) {
  const style = overlayStyleForPlant(bed.plant, state.overlay);
  if (!style) return "";
  let s = `<rect x="${bx + 1}" y="${by + 1}" width="${Math.max(0, bed.w - 2)}" height="${Math.max(0, bed.h - 2)}" rx="3" fill="${style.fill}" pointer-events="none"/>`;
  if (style.pattern) {
    s += `<rect x="${bx + 1}" y="${by + 1}" width="${Math.max(0, bed.w - 2)}" height="${Math.max(0, bed.h - 2)}" rx="3" fill="${style.pattern}" pointer-events="none"/>`;
  }
  s += `<rect x="${bx + 1.5}" y="${by + 1.5}" width="${Math.max(0, bed.w - 3)}" height="${Math.max(0, bed.h - 3)}" rx="3" fill="none" stroke="${style.stroke}" stroke-width="2" stroke-opacity=".78" pointer-events="none"/>`;
  return s;
}
