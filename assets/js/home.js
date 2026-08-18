/* Home: catalogo, filtri, carrello, hero animata e passaggio al configuratore. */

// Catalogo condiviso
const PLANTS = window.PLANTS;

const NOMI_MESI = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];
const ABBR_MESI = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];
const SOLE_ICON = { pieno: "☀️", mezz: "🌤️" };
const ACQUA_ICON = { alta: "💧💧💧", media: "💧💧", bassa: "💧" };

const DIFFICULTY = {
  lattuga: 1,
  rucola: 1,
  ravanello: 1,
  fagiolino: 1,
  basilico: 1,
  prezzemolo: 1,
  carota: 1,
  cipolla: 1,
  cipolla_rossa: 1,
  cipollotto: 1,
  spinaci: 1,
  bietola: 1,
  valerianella: 1,
  zucchina: 1,
  scalogno: 1,
  cicoria: 1,
  pakchoi: 1,
  rapa: 1,
  aglio: 1,
  erba_cipollina: 1,
  menta: 1,
  maggiorana: 1,
  crescione: 1,
  mizuna: 1,
  senape_foglia: 1,
  tatsoi: 1,
  loboda: 1,
  broccolo_rapa: 1,
  agretti: 1,
  borragine: 1,
  acetosa: 1,
  melissa: 1,
  cerfoglio: 1,
  cimbru: 1,

  pomodoro: 2,
  peperone: 2,
  cetriolo: 2,
  fragola: 2,
  finocchio: 2,
  pisello: 2,
  porro: 2,
  indivia: 2,
  barbabietola: 2,
  aneto: 2,
  coriandolo: 2,
  timo: 2,
  origano: 2,
  salvia: 2,
  rosmarino: 2,
  radicchio: 2,
  fagiolo: 2,
  fagiolo_borlotto: 2,
  fava: 2,
  cece: 2,
  lenticchia: 2,
  soia_edamame: 2,
  patata: 2,
  pastinaca: 2,
  radice_prezemolo: 2,
  daikon: 2,
  cavolo_cinese: 2,
  leustean: 2,
  dragoncello: 2,
  camomilla: 2,

  peperoncino: 3,
  melanzana: 3,
  zucca: 3,
  melone: 3,
  anguria: 3,
  cavolo: 3,
  verza: 3,
  broccolo: 3,
  cavolfiore: 3,
  cavolonero: 3,
  cavolorapa: 3,
  cavoletti: 3,
  sedano: 3,
  cavolo_rosso: 3,
  cavolo_navone: 3,
  sedano_rapa: 3,
  rafano: 3,
  patata_dolce: 3,
  scorzonera: 3,
  topinambur: 3,
  asparago: 3,
  carciofo: 3,
  cardo: 3,
  mais_dolce: 3,
  tomatillo: 3,
  physalis: 3,
  cucamelon: 3,
  stevia_dolce: 3,
  shiso: 3,
  broccolo_romanesco: 2,
  friggitello: 2,
  catalogna: 2,
  leurda: 2,
};

// Metadati tecnici
const PLANT_HEIGHT_CM = {
  pomodoro: "100–200",
  peperone: "50–100",
  peperoncino: "40–70",
  melanzana: "60–120",
  zucchina: "40–80",
  zucca: "30–50",
  cetriolo: "100–200",
  melone: "30–50",
  anguria: "30–50",
  lattuga: "20–35",
  radicchio: "20–30",
  rucola: "15–30",
  spinaci: "20–30",
  bietola: "30–60",
  cavolo: "40–60",
  verza: "35–55",
  broccolo: "60–100",
  cavolfiore: "40–70",
  cavolonero: "60–100",
  cavolorapa: "20–40",
  carota: "20–35",
  finocchio: "40–70",
  prezzemolo: "20–40",
  basilico: "20–50",
  coriandolo: "20–50",
  aneto: "40–100",
  cipolla: "30–50",
  aglio: "30–50",
  porro: "40–70",
  scalogno: "20–40",
  fagiolino: "30–50",
  fagiolo: "150–250",
  pisello: "60–150",
  fragola: "15–30",
  sedano: "40–80",
  ravanello: "10–20",
  barbabietola: "20–35",
  cicoria: "20–40",
  indivia: "20–35",
  pakchoi: "20–40",
  cavoletti: "60–120",
  rapa: "15–30",
  valerianella: "10–20",
  rosmarino: "50–150",
  timo: "15–30",
  origano: "30–60",
  salvia: "40–80",
};

const PLANT_SPACING = {
  pomodoro: { d: 50, dr: 80 },
  peperone: { d: 40, dr: 60 },
  peperoncino: { d: 35, dr: 50 },
  melanzana: { d: 50, dr: 80 },
  zucchina: { d: 80, dr: 100 },
  zucca: { d: 100, dr: 130 },
  cetriolo: { d: 40, dr: 100 },
  melone: { d: 90, dr: 120 },
  anguria: { d: 120, dr: 150 },
  lattuga: { d: 25, dr: 30 },
  radicchio: { d: 30, dr: 35 },
  rucola: { d: 15, dr: 20 },
  spinaci: { d: 20, dr: 25 },
  bietola: { d: 30, dr: 40 },
  cavolo: { d: 50, dr: 70 },
  verza: { d: 50, dr: 70 },
  broccolo: { d: 50, dr: 70 },
  cavolfiore: { d: 50, dr: 70 },
  cavolonero: { d: 45, dr: 60 },
  cavolorapa: { d: 30, dr: 40 },
  carota: { d: 8, dr: 25 },
  finocchio: { d: 25, dr: 35 },
  prezzemolo: { d: 20 },
  basilico: { d: 25 },
  coriandolo: { d: 15 },
  aneto: { d: 25 },
  cipolla: { d: 12, dr: 25 },
  aglio: { d: 12, dr: 25 },
  porro: { d: 15, dr: 30 },
  scalogno: { d: 12, dr: 20 },
  fagiolino: { d: 20, dr: 40 },
  fagiolo: { d: 25, dr: 50 },
  pisello: { d: 15, dr: 30 },
  fragola: { d: 30, dr: 40 },
  sedano: { d: 30, dr: 40 },
  ravanello: { d: 8, dr: 15 },
  barbabietola: { d: 12, dr: 25 },
  cicoria: { d: 25, dr: 30 },
  indivia: { d: 30, dr: 40 },
  pakchoi: { d: 25, dr: 30 },
  cavoletti: { d: 60, dr: 80 },
  rapa: { d: 12, dr: 25 },
  valerianella: { d: 10, dr: 15 },
  rosmarino: { d: 60, dr: 80 },
  timo: { d: 30 },
  origano: { d: 30 },
  salvia: { d: 40, dr: 50 },
  pastinaca: { d: 35, dr: 45 },
  radice_prezemolo: { d: 30, dr: 40 },
  sedano_rapa: { d: 35, dr: 50 },
  rafano: { d: 45, dr: 60 },
  patata: { d: 35, dr: 60 },
  patata_dolce: { d: 45, dr: 90 },
  cipolla_rossa: { d: 15, dr: 30 },
  cipollotto: { d: 8, dr: 20 },
  erba_cipollina: { d: 20, dr: 25 },
  loboda: { d: 25, dr: 35 },
  stevia_dolce: { d: 30, dr: 40 },
  leustean: { d: 45, dr: 70 },
  dragoncello: { d: 30, dr: 45 },
  menta: { d: 30, dr: 50 },
  maggiorana: { d: 25, dr: 35 },
  camomilla: { d: 25, dr: 35 },
  mais_dolce: { d: 30, dr: 70 },
  tomatillo: { d: 50, dr: 80 },
  physalis: { d: 45, dr: 70 },
  cucamelon: { d: 30, dr: 60 },
  asparago: { d: 40, dr: 80 },
  carciofo: { d: 80, dr: 100 },
  cardo: { d: 60, dr: 90 },
  crescione: { d: 15, dr: 20 },
  mizuna: { d: 20, dr: 30 },
  senape_foglia: { d: 25, dr: 35 },
  tatsoi: { d: 20, dr: 30 },
  cavolo_cinese: { d: 35, dr: 50 },
  daikon: { d: 25, dr: 40 },
  scorzonera: { d: 25, dr: 35 },
  topinambur: { d: 50, dr: 90 },
  fava: { d: 30, dr: 50 },
  soia_edamame: { d: 30, dr: 50 },
  cece: { d: 25, dr: 40 },
  lenticchia: { d: 20, dr: 35 },
  fagiolo_borlotto: { d: 30, dr: 60 },
  cavolo_rosso: { d: 45, dr: 60 },
  cavolo_navone: { d: 35, dr: 50 },
  broccolo_rapa: { d: 25, dr: 40 },
  shiso: { d: 30, dr: 45 },
  broccolo_romanesco: { d: 50, dr: 60 },
  friggitello: { d: 40, dr: 50 },
  agretti: { d: 15, dr: 25 },
  borragine: { d: 30, dr: 40 },
  catalogna: { d: 25, dr: 35 },
  acetosa: { d: 30, dr: 40 },
  leurda: { d: 20, dr: 25 },
  melissa: { d: 40, dr: 50 },
  cerfoglio: { d: 15, dr: 20 },
  cimbru: { d: 25, dr: 30 },
};

const SOWING_GUIDE = window.SOWING_GUIDE;

const SOWING_GUIDE_RO = window.SOWING_GUIDE_RO;

const TIPO = window.TIPO;
const TIPO_STYLE = {
  frutto:
    "background:var(--badge-frutto-bg, rgba(231,111,81,.18));color:var(--badge-frutto-color, #a03820)",
  foglia:
    "background:var(--badge-foglia-bg, rgba(45,106,79,.16));color:var(--badge-foglia-color, #1b4332)",
  radice:
    "background:var(--badge-radice-bg, rgba(107,66,38,.16));color:var(--badge-radice-color, #5c3618)",
  legume:
    "background:var(--badge-legume-bg, rgba(82,183,136,.2));color:var(--badge-legume-color, #1b4332)",
  aromatica:
    "background:var(--badge-aromatica-bg, rgba(116,198,157,.22));color:var(--badge-aromatica-color, #1b5438)",
};
// Risorse visive con risoluzione della foto condivisa: vedi assets/js/shared/plant-photo.js.
function photoSrc(id) {
  const p = (window.PLANTS || []).find((x) => x.id === id);
  return window.resolvePlantPhoto(p, id);
}
const FRUIT_EMOJI = {
  pomodoro: "🍅",
  peperone: "🫑",
  peperoncino: "🌶️",
  melanzana: "🍆",
  zucchina: "🥒",
  zucca: "🎃",
  cetriolo: "🥒",
  melone: "🍈",
  anguria: "🍉",
  lattuga: "🥬",
  radicchio: "🥬",
  rucola: "🥬",
  spinaci: "🥬",
  bietola: "🥬",
  cavolo: "🥬",
  verza: "🥬",
  broccolo: "🥦",
  cavolfiore: "🥦",
  cavolonero: "🥬",
  cavolorapa: "🥦",
  carota: "🥕",
  finocchio: "🌿",
  prezzemolo: "🌿",
  basilico: "🌿",
  coriandolo: "🌿",
  aneto: "🌿",
  cipolla: "🧅",
  aglio: "🧄",
  porro: "🧅",
  scalogno: "🧅",
  fagiolino: "🫘",
  fagiolo: "🫘",
  pisello: "🫛",
  fragola: "🍓",
  sedano: "🌿",
  ravanello: "🥬",
  barbabietola: "🌿",
  cicoria: "🥬",
  indivia: "🥬",
  pakchoi: "🥬",
  cavoletti: "🥬",
  rapa: "🌿",
  valerianella: "🥬",
  rosmarino: "🌿",
  timo: "🌿",
  origano: "🌿",
  salvia: "🌿",
  pastinaca: "🥕",
  radice_prezemolo: "🌿",
  sedano_rapa: "🌿",
  rafano: "🌿",
  patata: "🥔",
  patata_dolce: "🍠",
  cipolla_rossa: "🧅",
  cipollotto: "🧅",
  erba_cipollina: "🌿",
  loboda: "🥬",
  stevia_dolce: "🥬",
  leustean: "🌿",
  dragoncello: "🌿",
  menta: "🌿",
  maggiorana: "🌿",
  camomilla: "🌼",
  mais_dolce: "🌽",
  tomatillo: "🍅",
  physalis: "🍒",
  cucamelon: "🥒",
  asparago: "🌿",
  carciofo: "🌿",
  cardo: "🥬",
  crescione: "🥬",
  mizuna: "🥬",
  senape_foglia: "🥬",
  tatsoi: "🥬",
  cavolo_cinese: "🥬",
  daikon: "🥬",
  scorzonera: "🌿",
  topinambur: "🌻",
  fava: "🫘",
  soia_edamame: "🫘",
  cece: "🫘",
  lenticchia: "🫘",
  fagiolo_borlotto: "🫘",
  cavolo_rosso: "🥬",
  cavolo_navone: "🌿",
  broccolo_rapa: "🥬",
  shiso: "🌿",
  broccolo_romanesco: "🥦",
  friggitello: "🫑",
  agretti: "🌿",
  borragine: "🌸",
  catalogna: "🥬",
  acetosa: "🌿",
  leurda: "🧄",
  melissa: "🌿",
  cerfoglio: "🌿",
  cimbru: "🌿",
};
// Restituisce il percorso SVG della pianta
function plantSvgSrc(id) {
  return `assets/img/svg/${id}.svg`;
}
// Restituisce l'emoji della pianta
function fruitEmoji(id) {
  return FRUIT_EMOJI[id] || "🌱";
}
// Genera la visuale mista della pianta
function mixedPlantVisual(p, className, index, previousEmoji = "") {
  const emoji = fruitEmoji(p.id);
  const useSvg = index % 3 === 1 || emoji === previousEmoji;
  if (useSvg) {
    return `<img class="${className} ${className}--svg" src="${plantSvgSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" />`;
  }
  return `<span class="${className} ${className}--emoji" role="img" aria-label="${plantName(p.id)}">${emoji}</span>`;
}
// Seleziona piante visivamente diverse
function diversePlants(plants, count) {
  const firstPass = [];
  const usedEmoji = new Set();
  plants.forEach((p) => {
    const emoji = fruitEmoji(p.id);
    if (!usedEmoji.has(emoji) && firstPass.length < count) {
      firstPass.push(p);
      usedEmoji.add(emoji);
    }
  });
  plants.forEach((p) => {
    if (firstPass.length < count && !firstPass.includes(p)) firstPass.push(p);
  });
  return firstPass.slice(0, count);
}
// Ordina evitando ripetizioni visive
function nonRepeatingPlantOrder(plants) {
  const groups = new Map();
  plants.forEach((p) => {
    const emoji = fruitEmoji(p.id);
    if (!groups.has(emoji)) groups.set(emoji, []);
    groups.get(emoji).push(p);
  });
  const ordered = [];
  let lastEmoji = "";
  while (ordered.length < plants.length) {
    const nextEntry = [...groups.entries()]
      .filter(([, items]) => items.length)
      .sort((a, b) => {
        const aPenalty = a[0] === lastEmoji ? -1000 : 0;
        const bPenalty = b[0] === lastEmoji ? -1000 : 0;
        return b[1].length + bPenalty - (a[1].length + aPenalty);
      })[0];
    if (!nextEntry) break;
    const [emoji, items] = nextEntry;
    ordered.push(items.shift());
    lastEmoji = emoji;
  }
  return ordered;
}

// Kit mensili
const KITS = {
  1: {
    titolo: "Kit Invernale",
    ids: [
      "spinaci",
      "lattuga",
      "ravanello",
      "valerianella",
      "cicoria",
      "cipolla",
    ],
  },
  2: {
    titolo: "Kit Primaverile Precoce",
    ids: ["lattuga", "ravanello", "spinaci", "pisello", "rucola", "cipolla"],
  },
  3: {
    titolo: "Kit di Primavera",
    ids: ["lattuga", "carota", "ravanello", "basilico", "cetriolo", "fragola"],
  },
  4: {
    titolo: "Kit di Primavera",
    ids: ["cetriolo", "basilico", "fagiolino", "carota", "zucchina", "fragola"],
  },
  5: {
    titolo: "Kit di Maggio",
    ids: [
      "cetriolo",
      "basilico",
      "fagiolino",
      "carota",
      "zucchina",
      "barbabietola",
    ],
  },
  6: {
    titolo: "Kit Estivo in Serra",
    ids: [
      "cetriolo",
      "basilico",
      "fagiolino",
      "carota",
      "zucchina",
      "radicchio",
    ],
  },
  7: {
    titolo: "Kit d'Estate",
    ids: [
      "carota",
      "fagiolino",
      "barbabietola",
      "radicchio",
      "finocchio",
      "cetriolo",
    ],
  },
  8: {
    titolo: "Kit Fine Estate",
    ids: ["lattuga", "rucola", "carota", "cicoria", "barbabietola", "bietola"],
  },
  9: {
    titolo: "Kit Autunnale",
    ids: ["lattuga", "rucola", "ravanello", "indivia", "cicoria", "spinaci"],
  },
  10: {
    titolo: "Kit d'Autunno",
    ids: [
      "spinaci",
      "ravanello",
      "valerianella",
      "lattuga",
      "indivia",
      "scalogno",
    ],
  },
  11: {
    titolo: "Kit Autunno-Inverno",
    ids: [
      "spinaci",
      "valerianella",
      "lattuga",
      "cicoria",
      "radicchio",
      "indivia",
    ],
  },
  12: {
    titolo: "Kit Invernale",
    ids: [
      "valerianella",
      "spinaci",
      "lattuga",
      "cicoria",
      "indivia",
      "radicchio",
    ],
  },
};

// Testi stagionali
const STAGIONE_QUOTE = {
  1: "Pianifica con cura, la terra aspetta paziente.",
  2: "Febbraio inganna: dentro la serra la vita riprende.",
  3: "Marzo vola — semina ora, raccogli tra mesi.",
  4: "Aprile è il cuore dell'orto: tutto può partire.",
  5: "Maggio abbondante: fai spazio a tutto ciò che cresce.",
  6: "L'estate è qui. Innaffia, taglia, assapora.",
  7: "Luglio brucia — l'ombra della serra è un dono.",
  8: "Fine estate: inizia già a pensare all'autunno.",
  9: "Settembre è il nuovo marzo: il ciclo ricomincia.",
  10: "Ottobre dolce: radici e bulbi prendono forma.",
  11: "Novembre rallenta tutto — ma la serra no.",
  12: "Dicembre freddo, ma dentro cresce ancora qualcosa.",
};
const TIP_MESE = {
  1: "Prepara il terriccio e controlla le coperture: è il momento di pianificare.",
  2: "Inizia a seminare in semenzaio i pomodori per trapiantarli ad aprile.",
  3: "Tratta preventivamente con rame liquido contro le malattie fungine.",
  4: "Installa le reti anti-afide: prevenire è meglio che curare.",
  5: "Togli le femminelle ai pomodori ogni settimana per frutti più grandi.",
  6: "Annaffia alla base, mai sulle foglie: previeni l'oidio.",
  7: "Fai pacciamatura con paglia per trattenere l'umidità del suolo.",
  8: "Semina subito cicorie e lattughe per avere raccolti autunnali.",
  9: "Pianta gli spicchi d'aglio: saranno pronti a giugno.",
  10: "Rimuovi le piante esaurite e aggiungi compost per il prossimo anno.",
  11: "Proteggi le aromatiche perenni con un po' di mulch.",
  12: "Pianifica la rotazione colturale: non mettere la stessa famiglia nello stesso posto.",
};

const HERO_BG = {
  inverno:
    "linear-gradient(160deg,#cfe8e5 0%,#e0eff0 30%,#eceae4 65%,#f4f0e8 100%)",
  primavera:
    "linear-gradient(160deg,#d4ede1 0%,#e8f5ee 30%,#f0ebe0 65%,#f5f0e8 100%)",
  estate:
    "linear-gradient(160deg,#e8f0c8 0%,#eef5d4 30%,#f4ead8 65%,#f5ede0 100%)",
  autunno:
    "linear-gradient(160deg,#f0e8d0 0%,#f5eacc 30%,#f0e0cc 65%,#f5ede0 100%)",
};

const HERO_KICKER = {
  inverno: "❄️ Serra fredda in attività",
  primavera: "🌸 Stagione in fioritura",
  estate: "🌞 Piena estate in serra",
  autunno: "🍂 Raccolto d'autunno",
};

// Stagioni
function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}

// Stato della pagina
let state = {
  zona: "temperato",
  riscaldata: false,
  mese: new Date().getMonth() + 1,
};
// Dimensione iniziale e incremento della paginazione del catalogo.
const CATALOG_PAGE_SIZE = 12;
const CATALOG_PAGE_STEP = 12;
let catalog = {
  search: "",
  type: "",
  seasonOnly: false,
  easyOnly: false,
  easyOnlyTouched: false,
  // Il riscaldamento parte sempre spento; viene ripristinato solo dopo una scelta esplicita dell'utente in questa pagina.
  climatePreferenceTouched: false,
  sort: "season",
  layout: localStorage.getItem("serra.catalog.layout") || "grid",
  visibleCount: CATALOG_PAGE_SIZE,
  _lastFilterSignature: null,
};
let cart = [];
let currentDetail = null;
let detailScrollY = 0;
let detailTouchY = null;
const BYID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));
const EASY_IDS = new Set([
  "lattuga",
  "rucola",
  "ravanello",
  "basilico",
  "zucchina",
  "fagiolino",
  "carota",
  "spinaci",
  "prezzemolo",
  "valerianella",
]);
const PACK_DATA = {
  pomodoro: { seeds: 20, price: 3.5 },
  peperone: { seeds: 15, price: 3.2 },
  peperoncino: { seeds: 15, price: 3.2 },
  melanzana: { seeds: 20, price: 3.5 },
  zucchina: { seeds: 10, price: 3.8 },
  zucca: { seeds: 8, price: 3.8 },
  cetriolo: { seeds: 15, price: 3.2 },
  melone: { seeds: 12, price: 3.5 },
  anguria: { seeds: 10, price: 3.8 },
  lattuga: { seeds: 400, price: 2.4 },
  radicchio: { seeds: 300, price: 2.5 },
  rucola: { seeds: 500, price: 2.2 },
  spinaci: { seeds: 200, price: 2.4 },
  bietola: { seeds: 150, price: 2.6 },
  cavolo: { seeds: 100, price: 2.8 },
  verza: { seeds: 100, price: 2.8 },
  broccolo: { seeds: 100, price: 2.8 },
  cavolfiore: { seeds: 100, price: 2.8 },
  cavolonero: { seeds: 100, price: 2.8 },
  cavolorapa: { seeds: 100, price: 2.8 },
  carota: { seeds: 300, price: 2.3 },
  finocchio: { seeds: 200, price: 2.5 },
  prezzemolo: { seeds: 200, price: 2.6 },
  basilico: { seeds: 300, price: 2.6 },
  coriandolo: { seeds: 200, price: 2.6 },
  aneto: { seeds: 200, price: 2.6 },
  cipolla: { seeds: 200, price: 2.3 },
  aglio: { seeds: 50, price: 3.0 },
  porro: { seeds: 200, price: 2.4 },
  scalogno: { seeds: 100, price: 2.8 },
  fagiolino: { seeds: 40, price: 2.8 },
  fagiolo: { seeds: 30, price: 3.0 },
  pisello: { seeds: 50, price: 2.8 },
  fragola: { seeds: 100, price: 3.2 },
  sedano: { seeds: 300, price: 2.6 },
  ravanello: { seeds: 300, price: 2.2 },
  barbabietola: { seeds: 100, price: 2.4 },
  cicoria: { seeds: 300, price: 2.4 },
  indivia: { seeds: 300, price: 2.5 },
  pakchoi: { seeds: 200, price: 2.6 },
  cavoletti: { seeds: 100, price: 2.8 },
  rapa: { seeds: 200, price: 2.3 },
  valerianella: { seeds: 300, price: 2.4 },
  rosmarino: { seeds: 100, price: 3.0 },
  timo: { seeds: 200, price: 2.8 },
  origano: { seeds: 300, price: 2.8 },
  salvia: { seeds: 100, price: 2.8 },
};

// Logica catalogo
function effectiveMonths(plant) {
  const set = new Set(plant.mesi);
  if (state.riscaldata || state.zona === "caldo") {
    plant.mesi.forEach((m) => {
      set.add(m === 1 ? 12 : m - 1);
      set.add(m === 12 ? 1 : m + 1);
    });
  } else if (state.zona === "freddo") {
    set.clear();
    plant.mesi.forEach((m) => {
      if (m >= 2 && m <= 11) set.add(m);
    });
  }
  return set;
}
// Filtra le piante seminabili nel mese corrente
function seminabili() {
  return PLANTS.filter((p) => effectiveMonths(p).has(state.mese));
}
// Recupera il tipo della pianta
function typeOfPlant(p) {
  return (
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia"
  );
}
// Recupera la distanza di coltivazione
function plantDistanceValue(p) {
  const spacing = PLANT_SPACING[p.id] || {};
  return Number(spacing.d || spacing.dr || 999);
}
// Calcola il punteggio di ordinamento catalogo
function catalogSortScore(p) {
  const seasonal = effectiveMonths(p).has(state.mese) ? 0 : 1;
  const easy = EASY_IDS.has(p.id) ? 0 : 1;
  return seasonal * 10000 + easy * 1000 + (p.gg || 365);
}
// Ordina le piante del catalogo
function sortCatalogPlants(plants) {
  const list = [...plants];
  const byName = (a, b) =>
    plantName(a.id).localeCompare(
      plantName(b.id),
      currentLang === "ro" ? "ro" : "it",
      { sensitivity: "base" },
    );
  if (catalog.sort === "name") return list.sort(byName);
  if (catalog.sort === "fast")
    return list.sort((a, b) => (a.gg || 9999) - (b.gg || 9999) || byName(a, b));
  if (catalog.sort === "yield")
    return list.sort((a, b) => (b.resa || 0) - (a.resa || 0) || byName(a, b));
  if (catalog.sort === "distance")
    return list.sort(
      (a, b) => plantDistanceValue(a) - plantDistanceValue(b) || byName(a, b),
    );
  if (catalog.sort === "price")
    return list.sort(
      (a, b) => packPrice(a.id) - packPrice(b.id) || byName(a, b),
    );
  return list.sort(
    (a, b) => catalogSortScore(a) - catalogSortScore(b) || byName(a, b),
  );
}
// Conta le piante per tipo
function catalogTypeCounts(base) {
  return ["frutto", "foglia", "radice", "legume", "aromatica"].map((type) => ({
    type,
    count: base.filter((p) => typeOfPlant(p) === type).length,
  }));
}
// Normalizza il testo di ricerca
function normalizeSearch(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
// Filtra le piante del catalogo
function filteredCatalogPlants() {
  const term = normalizeSearch(catalog.search);
  const base = catalog.seasonOnly ? seminabili() : PLANTS;
  const filtered = base.filter((p) => {
    const tipo = typeOfPlant(p);
    if (catalog.type && tipo !== catalog.type) return false;
    if (catalog.easyOnly && !EASY_IDS.has(p.id)) return false;
    if (!term) return true;
    const haystack = normalizeSearch(
      [plantName(p.id), p.nome, typeLabel(tipo), plantNote(p)].join(" "),
    );
    return haystack.includes(term);
  });
  return sortCatalogPlants(filtered);
}
// Restituisce il nome localizzato della pianta
function plantName(id) {
  return PLANT_RO[id]?.nome && currentLang === "ro"
    ? PLANT_RO[id].nome
    : BYID[id]?.nome || id;
}
// Restituisce la nota localizzata della pianta
function plantNote(p) {
  return PLANT_RO[p.id]?.nota && currentLang === "ro"
    ? PLANT_RO[p.id].nota
    : p.nota;
}
// Restituisce la descrizione editoriale breve, separata dai consigli tecnici.
function plantCompactDescription(p) {
  return window.SERRA_PLANT_CONTENT?.compactDescription(p, currentLang) || "";
}
// Restituisce la guida di semina localizzata
function localizedSowingGuide(plant) {
  if (currentLang !== "ro") return SOWING_GUIDE[plant.id];
  if (SOWING_GUIDE_RO[plant.id]) return SOWING_GUIDE_RO[plant.id];

  const spacing = PLANT_SPACING[plant.id] || {};
  const row = spacing.d || plant.d || 30;
  const between = spacing.dr || plant.dr || row;
  const direct = new Set([
    "carota",
    "rucola",
    "spinaci",
    "coriandolo",
    "aneto",
    "fagiolino",
    "fagiolo",
    "pisello",
    "ravanello",
    "barbabietola",
    "rapa",
    "valerianella",
    "daikon",
    "scorzonera",
    "fava",
    "soia_edamame",
    "cece",
    "lenticchia",
    "fagiolo_borlotto",
    "crescione",
  ]);
  const bulbs = new Set([
    "aglio",
    "scalogno",
    "cipolla",
    "cipolla_rossa",
    "cipollotto",
  ]);
  const aromatics = new Set([
    "rosmarino",
    "timo",
    "origano",
    "salvia",
    "erba_cipollina",
    "leustean",
    "dragoncello",
    "menta",
    "maggiorana",
    "camomilla",
    "shiso",
  ]);
  const warm = new Set([
    "pomodoro",
    "peperone",
    "peperoncino",
    "melanzana",
    "zucchina",
    "zucca",
    "cetriolo",
    "melone",
    "anguria",
    "basilico",
    "tomatillo",
    "physalis",
    "cucamelon",
    "mais_dolce",
    "patata_dolce",
    "friggitello",
  ]);

  let method =
    "Seamănă în alveole sau răsadniță, apoi transplantează plante viguroase în parcelă.";
  if (direct.has(plant.id))
    method = "Seamănă direct în rânduri, în sol fin și ușor umed.";
  if (bulbs.has(plant.id))
    method =
      "Plantează bulbili sau căței sănătoși, apoi păstrează rândurile curate.";
  if (aromatics.has(plant.id))
    method =
      "Cel mai sigur este transplantul de plăntuțe; semănarea este posibilă, dar mai lentă.";
  if (warm.has(plant.id))
    method =
      "Seamănă protejat la cald; în seră transplantează o plăntuță bine formată.";
  if (plant.id === "fragola")
    method =
      "Transplantează plăntuțe sau stoloni înrădăcinați; semănarea din sămânță este lentă.";
  if (plant.id === "patata")
    method =
      "Plantează tuberculi sănătoși și mușuroiește când tulpinile cresc.";
  if (plant.id === "asparago")
    method =
      "Pornește de la coroane sau plăntuțe; cultura este perenă și cere răbdare.";

  let depth = "0,5-1 cm";
  if (bulbs.has(plant.id) || plant.id === "patata") depth = "3-5 cm";
  if (warm.has(plant.id)) depth = "1-2 cm";
  if (aromatics.has(plant.id))
    depth = "superficial, cu acoperire foarte ușoară";

  const thin =
    spacing.dr && spacing.dr !== spacing.d
      ? `Lasă ${row} cm pe rând și ${between} cm între rânduri.`
      : `Lasă ${row} cm între plante.`;
  const tip =
    plantNote(plant) ||
    "Menține umiditatea constantă la pornire și evită aglomerarea plantelor.";

  return { method, depth, thin, tip };
}
// Restituisce il titolo del kit
function kitTitle(month) {
  return currentLang === "ro"
    ? t(`kit.title_${month}`) || KITS[month].titolo
    : KITS[month].titolo;
}
// Restituisce l'etichetta del tipo
function typeLabel(type) {
  return t(`type.${type}`);
}
// Traduce una chiave con variabili
function tv(key, vars = {}) {
  let value = t(key);
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}
// Restituisce il prezzo della bustina
function packPrice(id) {
  return PACK_DATA[id]?.price ?? 2.5;
}
// Restituisce i semi per bustina
function seedsPerPack(id) {
  return PACK_DATA[id]?.seeds ?? 100;
}
// Il carrello è unico: la riga può essere una bustina di semi o un lotto di piantine comprato nel vivaio.
const isPiantinaItem = (i) => !!i && i.variante === "piantina";
const itemQty = (i) =>
  isPiantinaItem(i)
    ? Number(i.qta) || Number(i.bustine) || 0
    : Number(i.bustine) || 0;
const itemUnitPrice = (i) =>
  isPiantinaItem(i) ? Number(i.prezzo) || 0 : packPrice(i.id);
const cartTotal = () =>
  Math.round(
    cart.reduce((sum, i) => sum + itemUnitPrice(i) * itemQty(i), 0) * 100,
  ) / 100;

// "Nel carrello" per il catalogo semi significa: c'è la bustina, non la piantina.
function inCart(id) {
  return cart.some((i) => i.id === id && !isPiantinaItem(i));
}
// Formatta il valore in euro
function money(value) {
  return new Intl.NumberFormat(currentLang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
// Restituisce l'etichetta della zona
function zoneLabel(zone) {
  return t(`zone.${zone}`);
}
// Restituisce l'etichetta della serra
function greenhouseLabel() {
  return state.riscaldata ? t("greenhouse.heated") : t("greenhouse.cold");
}
// Restituisce l'etichetta azione carrello
function cartActionLabel(inCart) {
  return inCart ? t("cart.in_cart") : t("cart.add");
}
// Restituisce l'etichetta carrello dettaglio
function detailCartLabel(inCart) {
  return inCart ? t("cart.remove_from_cart") : t("cart.add_to_cart");
}
// Restituisce l'etichetta dei giorni
function daysLabel(plant, full = false) {
  if (plant.gg === 0) return t("plant.perennial");
  return full
    ? t("plant.days_harvest").replace("{days}", plant.gg)
    : `${plant.gg} ${t("plant.days_short")}`;
}
// Restituisce l'etichetta delle distanze
function spacingLabel(plant) {
  const spacing = PLANT_SPACING[plant.id];
  if (!spacing) return "—";
  return spacing.dr && spacing.dr !== spacing.d
    ? `${spacing.d}×${spacing.dr} cm`
    : `${spacing.d} cm`;
}
// Restituisce l'etichetta della resa
function yieldLabel(plant) {
  return plant.resa >= 1
    ? `${plant.resa} kg`
    : `${Math.round(plant.resa * 1000)} g`;
}
// Restituisce l'etichetta esposizione
function sunLabel(plant) {
  return plant.sole === "pieno" ? t("plant.full_sun") : t("plant.half_shade");
}
// Genera l'infografica delle distanze
function spacingInfographic(p) {
  const sp = PLANT_SPACING[p.id] || {};
  const d = sp.d;
  const dr = sp.dr || sp.d;
  if (!d) return "";
  const W = 224;
  const H = 118;
  const R = 7;
  const cx = [34, 78, 122, 166];
  const cy = [45, 89];
  const pid = p.id.replace(/[^a-z]/g, "");
  const rLbl = t("detail.in_row");
  const bLbl = t("detail.between_rows");

  let seedlings = "";
  for (let r = 0; r < 2; r++) {
    const y = cy[r];
    for (let c = 0; c < 4; c++) {
      const x = cx[c];
      const scale = r ? 0.92 : 1;
      const leaf = r ? "#52b788" : "#2d6a4f";
      const leafDark = r ? "#2f8f5d" : "#1b5e3a";
      seedlings += `<g transform="translate(${x} ${y}) scale(${scale})">
        <ellipse cx="0" cy="9" rx="11" ry="3.2" fill="#1b4332" opacity=".11"/>
        <path d="M0 8 C0 2 0 -3 0 -9" stroke="#2d6a4f" stroke-width="2.1" stroke-linecap="round"/>
        <path d="M0 -5 C-13 -13 -17 -2 -5 1 C-2 0 0 -2 0 -5Z" fill="${leaf}" stroke="${leafDark}" stroke-width=".6"/>
        <path d="M1 -6 C14 -14 18 -2 5 2 C2 0 1 -2 1 -6Z" fill="${leaf}" stroke="${leafDark}" stroke-width=".6"/>
        <path d="M0 -1 C-8 -6 -10 0 -3 3" fill="none" stroke="rgba(255,255,255,.36)" stroke-width=".8" stroke-linecap="round"/>
      </g>`;
    }
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    class="spacing-svg" aria-hidden="true">
  <defs>
    <marker id="sH${pid}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,1 L7,4 L0,7 Z" fill="#1b5e3a"/></marker>
    <marker id="sV${pid}" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M1,0 L4,7 L7,0 Z" fill="#40916c"/></marker>
  </defs>
  <rect x="8" y="23" width="176" height="86" rx="12" fill="var(--spacing-diagram-bg,#f7fbf5)" stroke="rgba(45,106,79,.16)"/>
  <path d="M24 45 H176 M24 89 H176 M34 31 V103 M78 31 V103 M122 31 V103 M166 31 V103" stroke="var(--spacing-diagram-grid,rgba(45,106,79,.14))" stroke-width="1"/>
  ${seedlings}
  <line x1="${cx[0] + R + 3}" y1="${cy[0] - 15}" x2="${cx[1] - R - 3}" y2="${cy[0] - 15}" stroke="#1b5e3a" stroke-width="1.7" marker-start="url(#sH${pid})" marker-end="url(#sH${pid})"/>
  <text x="97" y="8" font-size="8" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="var(--spacing-diagram-text,#16251b)">${rLbl}</text>
  <rect x="67" y="11" width="60" height="18" rx="9" fill="#1b5e3a"/>
  <text x="97" y="24" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${d} cm</text>
  <line x1="198" y1="${cy[0] + R + 3}" x2="198" y2="${cy[1] - R - 3}" stroke="#40916c" stroke-width="1.7" marker-start="url(#sV${pid})" marker-end="url(#sV${pid})"/>
  <text x="206" y="49" font-size="7.5" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="var(--spacing-diagram-text,#16251b)">${bLbl}</text>
  <rect x="184" y="59" width="44" height="18" rx="9" fill="#40916c"/>
  <text x="206" y="72" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${dr} cm</text>
</svg>`;
}
// Applica dynamic static text
function applyDynamicStaticText() {
  const heatedBtn = document.getElementById("heroHeatedBtn");
  const heatedLabel = document.getElementById("heroHeatedLabel");
  if (heatedLabel)
    heatedLabel.textContent = state.riscaldata
      ? t("hero.heated_on")
      : t("hero.heated_off");
  if (heatedBtn)
    heatedBtn.setAttribute("aria-pressed", String(state.riscaldata));
  const catalogHeatedLabel = document.getElementById("catalogHeatedLabel");
  const catalogHeatedBtn = document.getElementById("catalogHeatedBtn");
  if (catalogHeatedLabel)
    catalogHeatedLabel.textContent = state.riscaldata
      ? t("hero.heated_on")
      : t("hero.heated_off");
  if (catalogHeatedBtn)
    catalogHeatedBtn.setAttribute("aria-pressed", String(state.riscaldata));
  const zoneNote = {
    freddo: "hero.filter_note_zone_cold",
    temperato: "hero.filter_note_zone_temp",
    caldo: "hero.filter_note_zone_warm",
  }[state.zona];
  const noteText = state.riscaldata
    ? t("hero.filter_note_heated")
    : t(zoneNote);
  const note = document.getElementById("heroFilterNote");
  if (note) note.textContent = noteText;
  const catalogNote = document.getElementById("catalogFilterNote");
  if (catalogNote) catalogNote.textContent = noteText;
}

// Aggiorna il contenuto della sezione iniziale del catalogo.
function renderHero() {
  const stag = getStagione(state.mese);

  document.getElementById("hero").style.setProperty("--hero-bg", HERO_BG[stag]);
  const heroCfgMonth = document.getElementById("heroCfgMonth");
  if (heroCfgMonth) {
    heroCfgMonth.textContent = NOMI_MESI[state.mese - 1];
  }
  document.querySelectorAll(".hero-zone-btn").forEach((b) => {
    const selected = b.dataset.zone === state.zona;
    b.classList.toggle("active", selected);
    b.setAttribute("aria-pressed", String(selected));
  });
  document
    .getElementById("heroHeatedBtn")
    ?.classList.toggle("active", state.riscaldata);
  document
    .getElementById("catalogHeatedBtn")
    ?.classList.toggle("active", state.riscaldata);
  applyDynamicStaticText();

  /* Piante di sfondo: sono un margine botanico, non un motivo sparso. */
  const plants = diversePlants(seminabili(), 5);
  const positions = [
    { top: "-5%", left: "-4%", size: 215, opacity: 0.42, dur: 8, delay: 0 },
    { top: "36%", left: "-6%", size: 152, opacity: 0.34, dur: 6.5, delay: 1.6 },
    { top: "74%", left: "0%", size: 124, opacity: 0.3, dur: 9, delay: 3.1 },
    { top: "4%", right: "-5%", size: 196, opacity: 0.38, dur: 7.5, delay: 0.8 },
    { top: "60%", right: "-3%", size: 168, opacity: 0.32, dur: 6, delay: 2.4 },
  ];
  const wrap = document.getElementById("heroBgPlants");
  let previousEmoji = "";
  wrap.innerHTML = plants
    .map((p, i) => {
      const pos = positions[i] || positions[0];
      const posStyle = pos.right
        ? `top:${pos.top};right:${pos.right}`
        : `top:${pos.top};left:${pos.left}`;
      const visual = mixedPlantVisual(
        p,
        "hero-bg-plant-visual",
        i,
        previousEmoji,
      );
      previousEmoji = fruitEmoji(p.id);
      return `<span class="hero-bg-plant" aria-hidden="true"
      style="${posStyle};font-size:${pos.size}px;opacity:${pos.opacity};--dur:${pos.dur}s;--delay:${pos.delay}s;">${visual}</span>`;
    })
    .join("");
}

// Genera la fascia dei mesi usata per filtrare le colture stagionali.
function renderCalendarStrip() {
  const strip = document.getElementById("monthStrip");
  const help = document.getElementById("monthStripHelp");
  if (!strip) return;
  const planteLabel = currentLang === "ro" ? "plante" : "piante";
  const sowingLabel = currentLang === "ro" ? "de semănat" : "seminabili";
  const chooseLabel = currentLang === "ro" ? "alege luna" : "scegli mese";
  const selectedLabel =
    currentLang === "ro" ? "lună selectată" : "mese selezionato";
  const selectedCount = PLANTS.filter((p) =>
    effectiveMonths(p).has(state.mese),
  ).length;
  if (help) {
    help.textContent =
      currentLang === "ro"
        ? `${NOMI_MESI[state.mese - 1]} · ${selectedCount} plante potrivite`
        : `${NOMI_MESI[state.mese - 1]} · ${selectedCount} piante adatte`;
  }
  strip.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const count = PLANTS.filter((p) => effectiveMonths(p).has(m)).length;
    const active = m === state.mese ? " active" : "";
    return `<button class="month-tile${active}" data-home-action="set-month" data-month="${m}" aria-label="${NOMI_MESI[i]}: ${count} ${planteLabel} ${sowingLabel}" aria-pressed="${m === state.mese}">
      <span class="month-tile-name">${NOMI_MESI[i]}</span>
      <span class="month-tile-meta"><span class="month-tile-count">${count}</span> <span class="month-tile-label">${planteLabel} ${sowingLabel}</span></span>
      <span class="month-tile-action">${m === state.mese ? selectedLabel : chooseLabel}</span>
    </button>`;
  }).join("");
  centerActiveMonth(strip);
}

// Centra il mese attivo
function centerActiveMonth(strip) {
  const activeMonth = strip?.querySelector(".month-tile.active");
  if (!activeMonth) return;
  requestAnimationFrame(() => {
    const target =
      activeMonth.offsetLeft -
      (strip.clientWidth - activeMonth.offsetWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, target),
      behavior: "auto",
    });
  });
}

// Pannello filtri compatto per mobile.
function updateCatalogFilterToggle() {
  const toggle = document.getElementById("catalogFilterToggle");
  const summary = document.getElementById("catalogFilterToggleSummary");
  if (!toggle || !summary) return;
  const count =
    (catalog.seasonOnly ? 1 : 0) +
    (catalog.type ? 1 : 0) +
    (catalog.easyOnly ? 1 : 0);
  const ro = currentLang === "ro";
  summary.textContent = ro
    ? `${count} ${count === 1 ? "filtru activ" : "filtre active"}`
    : `${count} ${count === 1 ? "filtro attivo" : "filtri attivi"}`;
}

function syncMobileCatalogDock() {
  const section = document.getElementById("stagione");
  if (!section) return;
  const mobile = window.matchMedia("(max-width: 660px)").matches;
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
      "62",
    10,
  );
  const rect = section.getBoundingClientRect();
  const shouldDock =
    mobile && rect.top < navHeight && rect.bottom > navHeight + 150;
  document.body.classList.toggle("catalog-mobile-docked", shouldDock);
}

function toggleCatalogFilters() {
  const toggle = document.getElementById("catalogFilterToggle");
  const tools = document.getElementById("catalogFilterTools");
  if (!toggle || !tools) return;
  const open = !tools.classList.contains("is-mobile-open");
  tools.classList.toggle("is-mobile-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  const action = toggle.querySelector(".catalog-mobile-filter-action");
  if (action) {
    const ro = currentLang === "ro";
    action.firstChild.textContent = open
      ? ro
        ? "Închide "
        : "Chiudi "
      : ro
        ? "Deschide "
        : "Apri ";
  }
  syncMobileCatalogDock();
}

// Genera l'elenco delle piante in base a filtri, vista e paginazione.
function renderEditorialPlants() {
  const seasonal = seminabili();
  const plants = filteredCatalogPlants();
  const filtersActive =
    Boolean(catalog.search || catalog.type || catalog.easyOnly) ||
    catalog.seasonOnly;

  // Reimposta la paginazione dopo una modifica ai filtri.
  const filterSignature = JSON.stringify([
    catalog.search,
    catalog.type,
    catalog.easyOnly,
    catalog.seasonOnly,
    catalog.sort,
    catalog.layout,
  ]);
  if (catalog._lastFilterSignature !== filterSignature) {
    catalog.visibleCount = CATALOG_PAGE_SIZE;
    catalog._lastFilterSignature = filterSignature;
  }

  syncCatalogControls();
  updateCatalogFilterToggle();
  const catalogStatus = document.getElementById("catalogStatus");
  if (catalogStatus) {
    const pills = [];
    if (catalog.search)
      pills.push({ kind: "search", label: `"${catalog.search}"` });
    if (catalog.type)
      pills.push({ kind: "type", label: typeLabel(catalog.type) });
    if (catalog.easyOnly)
      pills.push({ kind: "easy", label: t("catalog.easy_only") });
    if (catalog.sort && catalog.sort !== "season")
      pills.push({ kind: "sort", label: t(`catalog.sort_${catalog.sort}`) });
    // L'ambito è scelto esclusivamente dai tre pulsanti nel gruppo “Tipo”.
    catalogStatus.hidden = !pills.length;
    if (!catalogStatus.hidden) {
      const remove = t("catalog.remove_filter");
      catalogStatus.innerHTML =
        `<span class="catalog-status-count">${plants.length} ${t("catalog.results")}</span>` +
        `<span class="catalog-status-pills">` +
        pills
          .map(
            (p) =>
              `<button class="catalog-filter-pill" type="button" data-home-action="remove-catalog-filter" data-filter-kind="${p.kind}" aria-label="${remove}: ${p.label}"><span class="pill-text">${p.label}</span><span class="pill-x" aria-hidden="true">✕</span></button>`,
          )
          .join("") +
        `</span>`;
    }
  }
  if (catalog.seasonOnly) {
    document.getElementById("stagioneTitle").innerHTML = t("season.title")
      .replace(
        "{count}",
        `<span class="stagione-count">${plants.length}</span>`,
      )
      .replace("{month}", NOMI_MESI[state.mese - 1]);
  } else {
    document.getElementById("stagioneTitle").innerHTML = tv(
      "catalog.count_all",
      {
        count: `<span class="stagione-count">${plants.length}</span>`,
      },
    );
  }
  const baseMeta = t("season.meta")
    .replace("{zone}", zoneLabel(state.zona))
    .replace("{greenhouse}", greenhouseLabel());
  document.getElementById("stagioneMeta").textContent = filtersActive
    ? `${baseMeta} · ${tv("catalog.count_filtered", {
        shown: plants.length,
        total: catalog.seasonOnly ? seasonal.length : PLANTS.length,
      })}`
    : baseMeta;

  renderCatalogCategoryRail(catalog.seasonOnly ? seasonal : PLANTS);
  renderCatalogInsights(plants, catalog.seasonOnly ? seasonal : PLANTS);

  if (!plants.length) {
    document.getElementById("editorialPlants").innerHTML =
      `<div class="empty-state"><div class="empty-icon">🌱</div><p>${filtersActive ? t("catalog.empty") : t("season.empty")}</p>${filtersActive ? `<button class="empty-cta" type="button" data-home-action="show-full-catalog">${t("catalog.show_all")}</button>` : ""}</div>`;
    document.getElementById("compactPlants").innerHTML = "";
    return;
  }

  const btnGrid = document.getElementById("layoutBtnGrid");
  const btnCompact = document.getElementById("layoutBtnCompact");
  if (btnGrid && btnCompact) {
    if (catalog.layout === "compact") {
      btnGrid.classList.remove("active");
      btnGrid.setAttribute("aria-pressed", "false");
      btnCompact.classList.add("active");
      btnCompact.setAttribute("aria-pressed", "true");
    } else {
      btnGrid.classList.add("active");
      btnGrid.setAttribute("aria-pressed", "true");
      btnCompact.classList.remove("active");
      btnCompact.setAttribute("aria-pressed", "false");
    }
  }

  const seasonSet = new Set(seasonal.map((p) => p.id));
  const offSeasonBadge = `<span class="off-season-badge">${t("catalog.off_season")}</span>`;

  if (catalog.layout === "compact") {
    document.getElementById("editorialPlants").innerHTML = "";
    document.getElementById("compactPlants").classList.add("compact-list-view");
    const visiblePlants = plants.slice(0, catalog.visibleCount);
    document.getElementById("compactPlants").innerHTML =
      visiblePlants
        .map((p) => {
          const tipo = typeOfPlant(p);
          const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
          const inC = inCart(p.id);
          const emoji = fruitEmoji(p.id);
          const waterIcon = ACQUA_ICON[p.acqua] || "💧";
          const sunIcon = p.sole === "pieno" ? "☀️" : "🌤️";
          return `<div class="plant-card-super-compact${inC ? " in-cart" : ""}" id="card-${p.id}" data-home-action="open-detail" data-plant-id="${p.id}">
          <span class="super-compact-thumb" aria-hidden="true">
            <img src="${photoSrc(p.id)}" alt="" loading="lazy" data-catalog-photo-fallback />
            <span class="super-compact-thumb-emoji">${emoji}</span>
          </span>
          <span class="super-compact-body">
            <span class="super-compact-top">
              <span class="super-compact-name">${plantName(p.id)}</span>
              <span class="super-compact-price">${money(packPrice(p.id))}</span>
            </span>
            <span class="super-compact-bottom">
              <span class="super-compact-badge" data-plant-type="${tipo}" style="${ts}">${typeLabel(tipo)}</span>
              <span class="super-compact-fact">⏱&nbsp;${daysLabel(p)}</span>
              <span class="super-compact-yield">⚖&nbsp;${yieldLabel(p)}</span>
              <span class="super-compact-meta" aria-hidden="true">${waterIcon}&thinsp;${sunIcon}</span>
              ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
            </span>
          </span>
          <button class="super-compact-add-btn${inC ? " added" : ""}" data-home-action="toggle-cart" data-plant-id="${p.id}" title="${inC ? t("cart.remove") : t("cart.add_plain")}" aria-label="${inC ? t("cart.remove") : t("cart.add_plain")} ${plantName(p.id)}">${inC ? "✓" : "+"}</button>
        </div>`;
        })
        .join("") + catalogLoadMoreHTML(plants.length - visiblePlants.length);
  } else {
    // Griglia catalogo uniforme a due colonne.
    document
      .getElementById("compactPlants")
      .classList.remove("compact-list-view");
    document.getElementById("editorialPlants").innerHTML = "";
    const visiblePlants = plants.slice(0, catalog.visibleCount);

    document.getElementById("compactPlants").innerHTML =
      visiblePlants
        .map((p) => {
          const tipo = typeOfPlant(p);
          const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
          const inC = inCart(p.id);
          return `<div class="plant-card-compact${inC ? " in-cart" : ""}" id="card-${p.id}" data-home-action="open-detail" data-plant-id="${p.id}">
          <div class="compact-thumb"><img src="${photoSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" /></div>
          <div class="compact-info">
            <div class="compact-name-row">
              <span class="compact-name">${plantName(p.id)}</span>
              <span class="compact-badge" data-plant-type="${tipo}" style="${ts}">${typeLabel(tipo)}</span>
              ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
            </div>
            <p class="compact-note">${plantCompactDescription(p)}</p>
            <div class="compact-facts-row compact-facts-row--pro">
              <span>⏱&nbsp;${daysLabel(p)}</span>
              <span>↔&nbsp;${spacingLabel(p)}</span>
              <span>⚖&nbsp;${yieldLabel(p)}</span>
            </div>
          </div>
          <div class="compact-buy">
            <span class="compact-price">${money(packPrice(p.id))}</span>
            <button class="compact-add-btn${inC ? " added" : ""}" data-home-action="toggle-cart" data-plant-id="${p.id}" title="${inC ? t("cart.remove") : t("cart.add_plain")}" aria-label="${inC ? t("cart.remove") : t("cart.add_plain")} ${plantName(p.id)}">${inC ? "✓" : "+"}</button>
          </div>
        </div>`;
        })
        .join("") + catalogLoadMoreHTML(plants.length - visiblePlants.length);
  }
}

// Pulsante per il caricamento progressivo dei risultati.
function catalogLoadMoreHTML(remainingCount) {
  if (remainingCount <= 0) return "";
  const label = tv("catalog.load_more", {
    count: Math.min(remainingCount, CATALOG_PAGE_STEP),
  });
  return `<div class="catalog-load-more-wrap">
    <button class="catalog-load-more-btn" type="button" data-home-action="load-more-catalog">
      <span>${label}</span>
      <span class="catalog-load-more-icon" aria-hidden="true">↓</span>
    </button>
  </div>`;
}

// Mostra la pagina successiva di risultati del catalogo
function loadMoreCatalogPlants() {
  catalog.visibleCount += CATALOG_PAGE_STEP;
  renderEditorialPlants();
}

// Applica la vista a griglia o elenco selezionata per il catalogo.
function setCatalogLayout(layout) {
  catalog.layout = layout;
  localStorage.setItem("serra.catalog.layout", layout);
  renderEditorialPlants();
}

// Abbinamenti
function renderAbbinamenti() {
  const available = new Set(seminabili().map((p) => p.id));
  const pairs = [];
  const seen = new Set();
  for (const plant of seminabili()) {
    for (const fid of plant.amiche) {
      if (!available.has(fid)) continue;
      const key = [plant.id, fid].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([plant.id, fid]);
      if (pairs.length >= 3) break;
    }
    if (pairs.length >= 3) break;
  }
  const summary = document.getElementById("companionsSummary");
  if (summary) {
    summary.textContent = tv("companions.summary", {
      count: pairs.length,
      month: NOMI_MESI[state.mese - 1],
    });
  }
  if (!pairs.length) {
    document.getElementById("abbinamenti-grid").innerHTML =
      `<div class="abbinamenti-empty" style="grid-column:1/-1">${t("companions.empty")}</div>`;
    const toggle = document.getElementById("companionsToggle");
    if (toggle) toggle.hidden = true;
    return;
  }
  const ABBINAMENTO_REASONS = [
    [t("companions.reason_1"), t("companions.badge_1")],
    [t("companions.reason_2"), t("companions.badge_2")],
    [t("companions.reason_3"), t("companions.badge_3")],
  ];
  document.getElementById("abbinamenti-grid").innerHTML = pairs
    .map(([aId, bId], i) => {
      const a = BYID[aId];
      const b = BYID[bId];
      const [reason, badge] = ABBINAMENTO_REASONS[i] || ABBINAMENTO_REASONS[0];
      const pairInCart = inCart(aId) && inCart(bId);
      return `<div class="abbinamento-card${pairInCart ? " in-cart" : ""}">
      <div class="abbin-card-topline"><span>${tv("companions.pair_number", { number: i + 1 })}</span><span>${badge}</span></div>
      <div class="abbinamento-photos">
        <div class="abbin-photo"><img src="${photoSrc(aId)}" alt="${plantName(aId)}" /></div>
        <div class="abbin-heart">💚</div>
        <div class="abbin-photo"><img src="${photoSrc(bId)}" alt="${plantName(bId)}" /></div>
      </div>
      <div class="abbin-names">${plantName(aId)} + ${plantName(bId)}</div>
      <div class="abbin-reason">${reason}</div>
      <div class="abbin-badge">${badge}</div>
      <button class="abbin-add-btn${pairInCart ? " added" : ""}" data-home-action="add-pair-to-cart" data-first-plant-id="${aId}" data-second-plant-id="${bId}">
        ${pairInCart ? t("companions.in_cart_pair") : t("companions.add_pair")}
      </button>
    </div>`;
    })
    .join("");
  const toggle = document.getElementById("companionsToggle");
  if (toggle) {
    const expanded = document
      .getElementById("abbinamenti")
      ?.classList.contains("is-expanded");
    toggle.hidden = pairs.length <= 1;
    toggle.setAttribute("aria-expanded", String(Boolean(expanded)));
    const label = toggle.querySelector("span:first-child");
    if (label) {
      label.textContent = expanded
        ? t("companions.show_less")
        : tv("companions.show_more", { count: Math.max(0, pairs.length - 1) });
    }
  }
}

function toggleCompanions() {
  const section = document.getElementById("abbinamenti");
  const toggle = document.getElementById("companionsToggle");
  if (!section || !toggle) return;
  const expanded = section.classList.toggle("is-expanded");
  toggle.setAttribute("aria-expanded", String(expanded));
  const label = toggle.querySelector("span:first-child");
  if (label) {
    const hiddenCount = Math.max(
      0,
      document.querySelectorAll("#abbinamenti-grid .abbinamento-card").length -
        1,
    );
    label.textContent = expanded
      ? t("companions.show_less")
      : tv("companions.show_more", { count: hiddenCount });
  }
}

// Kit del mese
function renderKit() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const avail = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese),
  );
  if (!avail.length) return;
  document.getElementById("kitHeading").textContent = t("kit.heading").replace(
    "{month}",
    NOMI_MESI[state.mese - 1],
  );
  document.getElementById("kitTitle").textContent = kitTitle(state.mese);
  document.getElementById("kitDesc").textContent = t("kit.desc").replace(
    "{count}",
    avail.length,
  );
  const kitMetaRow = document.getElementById("kitMetaRow");
  if (kitMetaRow) {
    const fastCount = avail.filter(
      (id) => BYID[id]?.gg && BYID[id].gg <= 45,
    ).length;
    const easyCount = avail.filter((id) => EASY_IDS.has(id)).length;
    kitMetaRow.innerHTML = `
      <span><b>${avail.length}</b> ${t("catalog.seeds")}</span>
      <span><b>${easyCount}</b> ${t("catalog.easy_only")}</span>
      <span><b>${fastCount}</b> ${t("catalog.insight_fast")}</span>
    `;
  }
  document.getElementById("kitCompatText").textContent = t("kit.compat");
  document.getElementById("kitPhotos").innerHTML = avail
    .map((id) => {
      const p = BYID[id];
      return `<div class="kit-photo">
      <img src="${photoSrc(id)}" alt="${plantName(id)}" loading="lazy" />
      <div class="kit-photo-lbl">${plantName(id)}</div>
    </div>`;
    })
    .join("");
}

// Il ponte dopo il catalogo mostra un assaggio reale del vivaio del mese corrente.
function renderVivaioBridge() {
  const list = document.getElementById("bridgeVivaioList");
  if (!list) return;

  const month = new Date().getMonth() + 1;
  const available = PLANTS.filter((plant) => {
    const type = typeOfPlant(plant);
    if (plant.gg <= 0 || type === "radice" || type === "legume") return false;
    return (plant.mesi || []).some(
      (sowingMonth) =>
        sowingMonth === month || (sowingMonth % 12) + 1 === month,
    );
  }).slice(0, 3);

  list.innerHTML = available
    .map(
      (plant) => `
        <div class="bridge-vivaio-plant">
          <img src="${photoSrc(plant.id)}" alt="" width="72" height="72" loading="lazy" decoding="async" />
          <span>
            <b>${plantName(plant.id)}</b>
            <small>${t("bridge.vivaio_plant_note")}</small>
          </span>
        </div>`,
    )
    .join("");
}

// Footer
function renderFooter() {
  document.getElementById("footerTip").textContent = TIP_MESE[state.mese];
  const stag = getStagione(state.mese);
  const stagLabel = {
    inverno: t("season_name.winter"),
    primavera: t("season_name.spring"),
    estate: t("season_name.summer"),
    autunno: t("season_name.autumn"),
  }[stag];
  const footerSeasonTag = document.getElementById("footerSeasonTag");
  if (footerSeasonTag) footerSeasonTag.innerHTML = stagLabel;

  let previousEmoji = "";
  const icons = nonRepeatingPlantOrder(PLANTS)
    .map((p, i) => {
      const visual = mixedPlantVisual(
        p,
        "footer-plant-icon-visual",
        i,
        previousEmoji,
      );
      previousEmoji = fruitEmoji(p.id);
      return `<span class="footer-plant-icon">${visual}</span>`;
    })
    .join("");
  document.getElementById("footerPlantRow").innerHTML = icons + icons;
}

// Aggiornamento generale
function render() {
  renderHero();
  renderCalendarStrip();
  renderEditorialPlants();
  renderVivaioBridge();
  renderAbbinamenti();
  renderKit();
  renderFooter();
  updateCartUI();
  savePrefs();
}

// Operazioni carrello
function toggleCart(e, id) {
  e.stopPropagation();
  const added = !inCart(id);
  // Si toglie solo la bustina: la piantina omonima comprata in vivaio è un'altra riga e non deve sparire insieme a questa.
  cart = added
    ? [...cart, { id, bustine: 1 }]
    : cart.filter((i) => !(i.id === id && !isPiantinaItem(i)));
  if (added) window.preloadPlantPhoto?.(BYID[id], id);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(id, added);
  const c = document.getElementById("cartCount");
  c.classList.add("bump");
  setTimeout(() => c.classList.remove("bump"), 250);
}
// Aggiunge entrambe le colture di un abbinamento al carrello della pagina.
function addPairToCart(e, aId, bId) {
  e.stopPropagation();
  [aId, bId].forEach((id) => {
    if (BYID[id] && !inCart(id)) {
      cart.push({ id, bustine: 1 });
      window.preloadPlantPhoto?.(BYID[id], id);
    }
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(bId, true);
  const c = document.getElementById("cartCount");
  c.classList.add("bump");
  setTimeout(() => c.classList.remove("bump"), 250);
}
// Aggiunge al carrello tutte le colture incluse nel kit selezionato.
function addKitToCart() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese),
  );
  availableIds.forEach((id) => {
    if (!inCart(id)) {
      cart.push({ id, bustine: 1 });
      window.preloadPlantPhoto?.(BYID[id], id);
    }
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) showCartNudge(availableIds[0], true);
  openCart();
}
// Aggiunge il kit al carrello e avvia il passaggio alla pianificazione della serra.
function addKitAndPlan() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese),
  );
  availableIds.forEach((id) => {
    if (!inCart(id)) {
      cart.push({ id, bustine: 1 });
      window.preloadPlantPhoto?.(BYID[id], id);
    }
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) {
    if (typeof syncCatalogClimateToSharedConfig === "function") {
      syncCatalogClimateToSharedConfig();
    }
    window.location.href = "configuratore.html?import=cart&source=index";
  }
}
// Rimuove dal carrello la coltura identificata dall'azione dell'utente.
function removeFromCart(id, variante) {
  // Con il carrello unico la stessa pianta può esserci due volte: come bustina e come piantina. Si toglie solo la riga richiesta.
  const piantina = variante === "piantina";
  const prima = cart.slice();
  cart = window.SerraCart
    ? window.SerraCart.rimuovi(cart, id, piantina)
    : cart.filter((i) => !(i.id === id && isPiantinaItem(i) === piantina));
  refreshCartViews();
  showCartNudge(id, false);
  offriAnnullaCarrello("undo.removed", { nome: plantName(id) }, prima);
}

/* L'annulla dopo una rimozione. */
function offriAnnullaCarrello(chiave, valori, prima) {
  const UI = window.SerraCartUI;
  if (!UI || !UI.annullabile) return;
  const lang = currentLang === "ro" ? "ro" : "it";
  UI.annullabile({
    testo: UI.testo(lang, chiave, valori),
    etichetta: UI.testo(lang, "undo.action"),
    // `refreshCartViews` chiama già `savePrefs`, che scrive il carrello e avvisa le altre schede aperte: qui basta rimettere l'array.
    onAnnulla: () => {
      cart = prima.slice();
      refreshCartViews();
    }
  });
}
function changeCartQty(id, variante, direzione) {
  if (!window.SerraCart) return;
  const piantina = variante === "piantina";
  const riga = window.SerraCart.trova(cart, id, piantina);
  if (!riga) return;
  const passo = window.SerraCart.passo(riga);
  cart = window.SerraCart.varia(cart, id, piantina, direzione * passo);
  refreshCartViews();
}
// Svuota il carrello. È l'unico carrello dell'app: se ne va tutto, semi e piantine, esattamente come dalle altre sezioni.
function clearCart() {
  const prima = cart.slice();
  cart = window.SerraCart ? window.SerraCart.svuota() : [];
  refreshCartViews();
  if (prima.length) offriAnnullaCarrello("undo.cleared", null, prima);
}
// Le tre viste che dipendono dal carrello si aggiornano sempre insieme.
function refreshCartViews() {
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
}
function cartDrawerHtml() {
  if (!window.SerraCartUI) return "";
  return window.SerraCartUI.corpo({
    righe: cart,
    lang: currentLang,
    attr: "data-home-action",
    nome: (id) => (BYID[id] ? plantName(id) : ""),
    foto: (id) => photoSrc(id),
    nota: (id) => (BYID[id] ? plantNote(BYID[id]) : ""),
    prezzoBustina: (id) => packPrice(id),
    semiPerBustina: (id) => seedsPerPack(id),
    soldi: money,
    // Il catalogo semi è in questa stessa pagina: basta l'ancora.
    hrefSemi: "#stagione",
    hrefPiantine: "vivaio.html",
  });
}
// Sincronizza contatore, righe e totale del carrello con i dati correnti.
function updateCartUI() {
  document.getElementById("cartCount").textContent = cart.length;
  const speciesLine = document.getElementById("cartSpeciesLine");
  if (speciesLine) {
    if (cart.length > 0) {
      speciesLine.textContent =
        cart.length === 1
          ? t("cart.species_one")
          : tv("cart.species_many", { count: cart.length });
      speciesLine.hidden = false;
    } else {
      speciesLine.hidden = true;
    }
  }

  const confHint = document.getElementById("confCartHint");
  const confHintText = document.getElementById("confCartHintText");
  const confImportBtn = document.getElementById("confImportBtn");
  if (confImportBtn) {
    const hasSeeds = cart.length > 0;
    confImportBtn.classList.toggle("disabled", !hasSeeds);
    confImportBtn.setAttribute("aria-disabled", String(!hasSeeds));
    confImportBtn.tabIndex = hasSeeds ? 0 : -1;
    if (hasSeeds) {
      confImportBtn.href = "configuratore.html?import=cart&source=index";
    } else {
      confImportBtn.removeAttribute("href");
    }
  }
  if (confHint && confHintText) {
    if (cart.length > 0) {
      const label =
        cart.length === 1
          ? t("conf.cart_hint_one")
          : tv("conf.cart_hint_many", { count: cart.length });
      confHintText.textContent = label;
      confHint.hidden = false;
    } else {
      confHintText.textContent = t("conf.cart_hint_empty");
      confHint.hidden = false;
    }
  }
  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");
  const foot = document.getElementById("cartFooter");
  const clearBtn = document.getElementById("cartClearBtn");
  if (!cart.length) {
    empty.hidden = false;
    items.hidden = true;
    foot.hidden = true;
    if (clearBtn) clearBtn.hidden = true;
  } else {
    empty.hidden = true;
    items.hidden = false;
    foot.hidden = false;
    if (clearBtn) clearBtn.hidden = false;
    // Il cassetto è lo stesso di vivaio e configuratore: vedi assets/js/serra-cart-ui.js. Qui si passano solo i dati della home.
    items.innerHTML = cartDrawerHtml();
  }
  if (currentDetail) {
    const btn = document.getElementById("detailAddBtn");
    if (btn) {
      const inC = inCart(currentDetail);
      btn.textContent = detailCartLabel(inC);
      btn.classList.toggle("added", inC);
    }
  }
}

// Mostra un suggerimento temporaneo per richiamare l'attenzione sul carrello.
function showCartNudge(id, added = true) {
  const nudge = document.getElementById("cartNudge");
  const title = document.getElementById("cartNudgeTitle");
  const meta = document.getElementById("cartNudgeMeta");
  if (!nudge || !title || !meta || !BYID[id]) return;
  title.textContent = tv(added ? "cart.added_title" : "cart.removed_title", {
    name: plantName(id),
  });
  meta.textContent = tv(added ? "cart.added_meta" : "cart.removed_meta", {
    count: cart.length,
  });
  nudge.classList.add("visible");
  clearTimeout(showCartNudge._timer);
  showCartNudge._timer = setTimeout(() => {
    nudge.classList.remove("visible");
  }, 3800);
}
let scrollLockCount = 0;
let bodyScrollY = 0;

// Blocca lo scroll della pagina
function lockBodyScroll() {
  if (scrollLockCount === 0) {
    bodyScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${bodyScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }
  scrollLockCount++;
}

// Ripristina lo scroll della pagina
function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo({ top: bodyScrollY, behavior: "instant" });
  }
}

// Apertura e chiusura
function openCart() {
  document.getElementById("cartNudge")?.classList.remove("visible");
  lockBodyScroll();
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}
// Chiude il carrello
function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
  unlockBodyScroll();
}
// Prepara la richiesta checkout
function alertCheckout() {
  if (!cart.length) {
    openCart();
    return;
  }

  // Controlla se l'utente è autenticato
  const user = window.SerraAPI && window.SerraAPI.getCurrentUser();
  if (!user) {
    alert(t("cart.checkout_login_required"));
    window.location.href = "account.html";
    return;
  }

  const orderItems = cart.map((item) => {
    const riga = {
      id: item.id,
      nome: plantName(item.id),
      bustine: itemQty(item),
      prezzo: itemUnitPrice(item),
    };
    if (isPiantinaItem(item)) {
      riga.variante = "piantina";
      riga.unita = item.unita || "vaso ø7";
    }
    return riga;
  });
  const totalVal = cartTotal();

  window.SerraAPI.getOrders().then((orders) => {
    const newOrder = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      email: user.email,
      date: new Date().toISOString(),
      items: orderItems,
      total: totalVal,
      status: "In elaborazione",
      billing: {
        accountType: user.accountType || "private",
        name: user.ragioneSociale || user.nome,
        address: user.billingIndirizzo || user.indirizzo || "",
        city: user.billingCitta || user.citta || "",
        cap: user.billingCap || user.cap || "",
        country:
          user.billingPaese ||
          ((document.documentElement.lang || "it").startsWith("ro")
            ? "România"
            : "Italia"),
        vatNumber: user.partitaIva || "",
        taxCode: user.codiceFiscale || "",
      },
      shipping: {
        name: user.nome,
        phone: user.telefono || "",
        address: user.shippingIndirizzo || user.indirizzo || "",
        city: user.shippingCitta || user.citta || "",
        cap: user.shippingCap || user.cap || "",
        country:
          user.shippingPaese ||
          user.billingPaese ||
          ((document.documentElement.lang || "it").startsWith("ro")
            ? "România"
            : "Italia"),
      },
    };
    orders.push(newOrder);
    window.SerraAPI.saveOrders(orders).then(() => {
      // Svuota il carrello dopo l'acquisto
      cart = [];
      savePrefs();
      updateCartUI();
      closeCart();

      try {
        sessionStorage.setItem(
          "ois.order_confirmation",
          JSON.stringify({ ...newOrder, source: "catalog" }),
        );
      } catch (error) {
        // Il numero ordine nell'URL mantiene disponibile la conferma anche quando il browser non consente l'uso di sessionStorage.
      }
      window.location.href = `ordine-confermato.html?order=${encodeURIComponent(newOrder.id)}`;
    });
  });
}

// Blocca lo scroll durante il dettaglio
function lockDetailPageScroll() {
  lockBodyScroll();
  document.body.classList.add("detail-open");
}
// Ripristina lo scroll dopo il dettaglio
function unlockDetailPageScroll() {
  document.body.classList.remove("detail-open");
  unlockBodyScroll();
}

const DETAIL_TAB_ORDER = ["overview", "cultivation", "care", "harvest"];

// Imposta la tab dettaglio
function setDetailTab(tab, moveFocus = false) {
  if (!DETAIL_TAB_ORDER.includes(tab)) tab = "overview";
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    const active = button.dataset.detailTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && moveFocus) button.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
    const active = panel.dataset.detailPanel === tab;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
    if (active) panel.scrollTo({ top: 0, behavior: "instant" });
  });
  const detailPanel = document.getElementById("detailPanel");
  if (detailPanel) {
    detailPanel.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (window.matchMedia("(max-width: 660px)").matches) {
      detailPanel
        .querySelector(".detail-scroll")
        ?.scrollTo({ top: 0, behavior: "instant" });
    }
  }
}

// Gestisce la tastiera nelle tab dettaglio
function handleDetailTabKey(event, control) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = DETAIL_TAB_ORDER.indexOf(control.dataset.detailTab);
  let next = current;
  if (event.key === "ArrowRight")
    next = (current + 1) % DETAIL_TAB_ORDER.length;
  if (event.key === "ArrowLeft")
    next = (current - 1 + DETAIL_TAB_ORDER.length) % DETAIL_TAB_ORDER.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = DETAIL_TAB_ORDER.length - 1;
  setDetailTab(DETAIL_TAB_ORDER[next], true);
}

// Profilo tecnico
function technicalProfile(p, guide) {
  const type = typeOfPlant(p);
  const name = plantName(p.id);
  const note = plantNote(p) || "";
  const ro = currentLang === "ro";
  const shared = window.SERRA_PLANT_CONTENT?.detailProfile(
    p,
    guide,
    currentLang,
  );
  if (shared) {
    return {
      description: shared.description,
      cultivation: [
        [t("detail.tech_soil"), shared.soil],
        [t("detail.tech_exposure"), shared.exposure || sunLabel(p)],
        [t("detail.tech_irrigation"), shared.irrigation],
        [t("detail.tech_feeding"), shared.feeding],
      ],
      care: [
        [t("detail.tech_maintenance"), shared.maintenance],
        [t("detail.tech_prevention"), shared.prevention],
      ],
      harvest: [
        [
          t("detail.tech_maturity"),
          ro
            ? `În medie ${daysLabel(p, true).toLowerCase()}, în funcție de soi, temperatură și lumină.`
            : `In media ${daysLabel(p, true).toLowerCase()}, in base a varietà, temperatura e luce.`,
        ],
        [t("detail.tech_harvest_method"), shared.harvestMethod],
        [t("detail.tech_yield"), yieldLabel(p)],
        [t("detail.tech_storage"), shared.storage],
        [t("detail.tech_rotation"), shared.rotation],
      ],
    };
  }
  const data = ro
    ? {
        soil: {
          frutto:
            "Sol profund, fertil și bine drenat, îmbogățit cu compost matur. Evită stagnarea apei în zona rădăcinilor.",
          foglia:
            "Sol afânat, bogat în materie organică și capabil să rămână uniform umed, fără băltire.",
          radice:
            "Sol fin, afânat și fără pietre. Evită gunoiul de grajd proaspăt, care poate deforma rădăcinile.",
          aromatica:
            "Substrat aerat și drenat. Pentru aromele mediteraneene este preferabil un sol mai slab și mai uscat.",
          legume:
            "Sol drenat și moderat fertil. Nu exagera cu azotul: favorizează frunzele în detrimentul păstăilor.",
        },
        feed: {
          frutto:
            "Încorporează compost înainte de plantare; de la înflorire folosește un fertilizant echilibrat, mai bogat în potasiu.",
          foglia:
            "Compost matur înainte de semănat și aporturi ușoare de azot doar dacă creșterea încetinește.",
          radice:
            "Fertilizare moderată, cu puțin azot și suficient potasiu. Excesul produce multe frunze și rădăcini slabe.",
          aromatica:
            "Fertilizare redusă: excesul de azot diluează aroma și face țesuturile mai fragile.",
          legume:
            "De obicei compostul matur este suficient; leguminoasele fixează azot și nu cer fertilizări puternice.",
        },
        maintain: {
          frutto:
            "Leagă plantele înalte, aerisește frunzișul și îndepărtează frunzele bolnave. Recoltarea regulată stimulează producția.",
          foglia:
            "Rărește la timp, menține solul curat și recoltează frunzele exterioare fără a răni centrul plantei.",
          radice:
            "Rărește devreme, elimină buruienile manual și evită lucrările adânci care pot răni rădăcinile.",
          aromatica:
            "Ciupirea vârfurilor menține planta compactă. Îndepărtează florile dacă urmărești producția de frunze.",
          legume:
            "Oferă suport soiurilor cățărătoare, menține baza aerisită și recoltează păstăile frecvent.",
        },
        problems: {
          frutto:
            "În seră pot apărea afide, musculița albă, acarieni și boli foliare. Căldura excesivă poate reduce legarea fructelor.",
          foglia:
            "Urmărește afidele, limacșii și mucegaiurile. Umiditatea stagnantă favorizează putregaiurile și mana.",
          radice:
            "Muștele rădăcinilor, viermii și putregaiurile sunt riscurile principale. Solul compact provoacă rădăcini deformate.",
          aromatica:
            "Cele mai frecvente probleme sunt afidele, făinarea și putrezirea coletului din cauza excesului de apă.",
          legume:
            "Afidele, acarienii și făinarea sunt frecvente. Umiditatea neregulată poate opri formarea păstăilor.",
        },
        prevent:
          "Aerisește sera zilnic, udă dimineața la baza plantei, nu înghesui culturile și îndepărtează imediat țesuturile bolnave. Rotește familiile botanice între cicluri.",
        harvest: {
          frutto:
            "Recoltează fructele când au atins culoarea și consistența tipice soiului, folosind o foarfecă curată pentru a nu rupe ramurile.",
          foglia:
            "Taie dimineața frunzele fragede și turgescente. Recoltează progresiv sau taie întreaga rozetă deasupra coletului.",
          radice:
            "Verifică dimensiunea la colet și extrage pe sol ușor umed. Nu aștepta prea mult: rădăcinile pot deveni fibroase.",
          aromatica:
            "Taie vârfurile înainte de înflorirea completă, dimineața după uscarea rouei, pentru aromă maximă.",
          legume:
            "Culege păstăile tinere și ferme la intervale scurte. Recoltarea continuă încurajează apariția altor flori.",
        },
        storage: {
          frutto:
            "Păstrează doar exemplarele sănătoase și uscate. Consumă rapid fructele delicate; cele mature se țin la răcoare și aerisit.",
          foglia:
            "Răcește imediat după recoltare și păstrează în frigider, într-un recipient aerisit cu hârtie ușor umedă.",
          radice:
            "Îndepărtează frunzele, nu spăla înainte de depozitare și păstrează la rece, întuneric și umiditate controlată.",
          aromatica:
            "Folosește proaspătă, congelează frunzele curate sau usucă lent la umbră, într-un spațiu ventilat.",
          legume:
            "Consumă păstăile proaspete repede; pentru păstrare mai lungă opărește și congelează sau lasă semințele să se usuce complet.",
        },
        rotation:
          "După recoltare, îndepărtează resturile și evită să replantezi aceeași familie în același loc în ciclul următor.",
      }
    : {
        soil: {
          frutto:
            "Terreno profondo, fertile e ben drenato, arricchito con compost maturo. Evita ristagni nella zona delle radici.",
          foglia:
            "Terreno soffice, ricco di sostanza organica e capace di restare uniformemente umido senza ristagni.",
          radice:
            "Terreno fine, sciolto e privo di sassi. Evita letame fresco, che può deformare o biforcare le radici.",
          aromatica:
            "Substrato arioso e drenante. Per le aromatiche mediterranee è preferibile un terreno non troppo ricco e più asciutto.",
          legume:
            "Terreno drenato e moderatamente fertile. Non eccedere con l'azoto: favorisce le foglie a scapito dei baccelli.",
        },
        feed: {
          frutto:
            "Incorpora compost prima del trapianto; dalla fioritura usa una concimazione equilibrata, con maggiore disponibilità di potassio.",
          foglia:
            "Compost maturo prima della semina e piccoli apporti azotati solo se la crescita rallenta o le foglie impallidiscono.",
          radice:
            "Concimazione moderata, con poco azoto e buon apporto di potassio. Gli eccessi producono molte foglie e radici deboli.",
          aromatica:
            "Concima poco: troppo azoto diluisce aroma e oli essenziali e rende i tessuti più fragili.",
          legume:
            "Di norma basta il compost maturo; le leguminose fissano azoto e non richiedono concimazioni spinte.",
        },
        maintain: {
          frutto:
            "Sostieni le piante alte, arieggia la chioma e rimuovi le foglie malate. Raccogliere con regolarità mantiene produttiva la pianta.",
          foglia:
            "Dirada per tempo, mantieni il terreno pulito e raccogli le foglie esterne senza danneggiare il cuore della pianta.",
          radice:
            "Dirada presto, elimina le infestanti a mano ed evita lavorazioni profonde che possano ferire le radici.",
          aromatica:
            "Cimare gli apici mantiene la pianta compatta. Elimina i fiori se vuoi prolungare la produzione di foglie.",
          legume:
            "Predisponi sostegni per le varietà rampicanti, mantieni arieggiata la base e raccogli spesso i baccelli.",
        },
        problems: {
          frutto:
            "In serra controlla afidi, mosca bianca, ragnetto rosso e malattie fogliari. Il caldo eccessivo può ridurre l'allegagione.",
          foglia:
            "Controlla afidi, limacce e muffe. Umidità stagnante e foglie sempre bagnate favoriscono marciumi e peronospora.",
          radice:
            "Mosche delle radici, larve terricole e marciumi sono i rischi principali. Il suolo compatto provoca radici deformate.",
          aromatica:
            "I problemi più comuni sono afidi, oidio e marciume del colletto causato da irrigazioni eccessive.",
          legume:
            "Afidi, ragnetto e oidio sono frequenti. Sbalzi idrici e caldo eccessivo possono bloccare la formazione dei baccelli.",
        },
        prevent:
          "Arieggia la serra ogni giorno, irriga al mattino alla base, non affollare le colture e rimuovi subito i tessuti malati. Alterna le famiglie botaniche tra un ciclo e l'altro.",
        harvest: {
          frutto:
            "Raccogli quando il frutto ha raggiunto colore e consistenza tipici della varietà, usando forbici pulite per non strappare i rami.",
          foglia:
            "Taglia al mattino foglie giovani e turgide. Raccogli progressivamente oppure recidi l'intera rosetta appena sopra il colletto.",
          radice:
            "Controlla il diametro al colletto ed estrai con terreno leggermente umido. Non aspettare troppo: le radici possono diventare fibrose.",
          aromatica:
            "Taglia gli apici prima della piena fioritura, al mattino dopo che la rugiada è asciutta, per conservare il massimo aroma.",
          legume:
            "Raccogli baccelli giovani e sodi a intervalli brevi. La raccolta continua stimola la formazione di nuovi fiori.",
        },
        storage: {
          frutto:
            "Conserva solo frutti sani e asciutti. Consuma presto quelli delicati; quelli maturi vanno tenuti in luogo fresco e ventilato.",
          foglia:
            "Raffredda subito dopo la raccolta e conserva in frigorifero, in un contenitore aerato con carta appena umida.",
          radice:
            "Elimina le foglie, non lavare prima dello stoccaggio e conserva al fresco, al buio e con umidità controllata.",
          aromatica:
            "Usa fresca, congela le foglie pulite oppure essicca lentamente all'ombra in un luogo ben ventilato.",
          legume:
            "Consuma rapidamente i baccelli freschi; per conservarli più a lungo sbollenta e congela, oppure lascia seccare completamente i semi.",
        },
        rotation:
          "Dopo la raccolta elimina i residui e non ripiantare la stessa famiglia botanica nello stesso spazio nel ciclo successivo.",
      };

  const water =
    guide?.annaffiatura ||
    (ro
      ? "Udă regulat, verificând umiditatea sub stratul superficial."
      : "Irriga con regolarità controllando l'umidità sotto lo strato superficiale.");
  const exposure = guide?.esposizione || sunLabel(p);
  const description = [
    note,
    ro
      ? `${name} se cultivă în seră cu expunere ${exposure.toLowerCase()} și necesar de apă ${t(`water.${p.acqua}`).toLowerCase()}. Ciclul orientativ până la recoltare este de ${daysLabel(p, true).toLowerCase()}.`
      : `${name} si coltiva in serra con esposizione ${exposure.toLowerCase()} e fabbisogno idrico ${t(`water.${p.acqua}`).toLowerCase()}. Il ciclo indicativo fino alla raccolta è di ${daysLabel(p, true).toLowerCase()}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    description,
    cultivation: [
      [t("detail.tech_soil"), data.soil[type]],
      [t("detail.tech_exposure"), exposure],
      [t("detail.tech_irrigation"), water],
      [t("detail.tech_feeding"), data.feed[type]],
    ],
    care: [
      [t("detail.tech_maintenance"), data.maintain[type]],
      [t("detail.tech_problems"), data.problems[type]],
      [t("detail.tech_prevention"), data.prevent],
      [t("detail.tech_rotation"), data.rotation],
    ],
    harvest: [
      [
        t("detail.tech_maturity"),
        ro
          ? `În medie ${daysLabel(p, true).toLowerCase()}, în funcție de soi, temperatură și lumină.`
          : `In media ${daysLabel(p, true).toLowerCase()}, secondo varietà, temperatura e luce.`,
      ],
      [t("detail.tech_harvest_method"), data.harvest[type]],
      [
        t("detail.tech_yield"),
        ro
          ? `Producție orientativă: ${yieldLabel(p)}. Recoltarea regulată îmbunătățește continuitatea.`
          : `Produzione indicativa: ${yieldLabel(p)}. Una raccolta regolare migliora la continuità.`,
      ],
      [t("detail.tech_storage"), data.storage[type]],
    ],
  };
}

// Genera le schede tecniche con informazioni di coltivazione e cura della pianta.
function renderTechnicalCards(items) {
  return items
    .map(
      ([title, text], index) =>
        `<article class="detail-tech-card${index === items.length - 1 && items.length % 2 ? " detail-tech-card--wide" : ""}"><h4>${title}</h4><p>${text}</p></article>`,
    )
    .join("");
}

const DISEASE_GROUPS = {
  solanaceae: ["late_blight", "alternaria", "botrytis"],
  cucurbitaceae: ["powdery", "downy", "botrytis"],
  brassicaceae: ["downy", "alternaria", "clubroot"],
  allium: ["downy", "white_rot", "rust"],
  apiaceae: ["cercospora", "sclerotinia", "powdery"],
  leafy: ["downy", "botrytis", "sclerotinia"],
  chenopods: ["downy", "cercospora", "damping_off"],
  legumes: ["anthracnose", "rust", "powdery"],
  herbs: ["powdery", "root_rot", "rust"],
  basil: ["basil_downy", "fusarium", "botrytis"],
  strawberry: ["botrytis", "powdery", "root_rot"],
  corn: ["fusarium", "rust", "leaf_spot"],
  asparagus: ["rust", "fusarium", "leaf_spot"],
  artichoke: ["botrytis", "powdery", "verticillium"],
  okra: ["powdery", "verticillium", "botrytis"],
  flowers: ["powdery", "botrytis", "root_rot"],
  sweet_potato: ["black_rot", "fusarium", "root_rot"],
  watercress: ["downy", "root_rot", "leaf_spot"],
  topinambur: ["sclerotinia", "powdery", "botrytis"],
};

const DISEASE_PLANT_GROUP = {};

// Assegna il gruppo malattie alla pianta
function assignDiseaseGroup(group, ids) {
  ids.forEach((id) => {
    DISEASE_PLANT_GROUP[id] = group;
  });
}
assignDiseaseGroup("solanaceae", [
  "pomodoro",
  "peperone",
  "peperoncino",
  "melanzana",
  "patata",
  "tomatillo",
  "physalis",
  "friggitello",
]);
assignDiseaseGroup("cucurbitaceae", [
  "zucchina",
  "zucca",
  "cetriolo",
  "melone",
  "anguria",
  "cucamelon",
]);
assignDiseaseGroup("brassicaceae", [
  "rucola",
  "cavolo",
  "verza",
  "broccolo",
  "cavolfiore",
  "cavolonero",
  "cavolorapa",
  "ravanello",
  "rafano",
  "pakchoi",
  "cavoletti",
  "rapa",
  "mizuna",
  "senape_foglia",
  "tatsoi",
  "cavolo_cinese",
  "daikon",
  "cavolo_rosso",
  "cavolo_navone",
  "broccolo_rapa",
  "broccolo_romanesco",
]);
assignDiseaseGroup("allium", [
  "cipolla",
  "aglio",
  "porro",
  "scalogno",
  "cipolla_rossa",
  "cipollotto",
  "erba_cipollina",
]);
assignDiseaseGroup("apiaceae", [
  "carota",
  "finocchio",
  "prezzemolo",
  "coriandolo",
  "aneto",
  "sedano",
  "pastinaca",
  "radice_prezemolo",
  "sedano_rapa",
  "leustean",
]);
assignDiseaseGroup("leafy", [
  "lattuga",
  "radicchio",
  "cicoria",
  "indivia",
  "valerianella",
  "cardo",
  "scorzonera",
  "catalogna",
  "agretti",
  "acetosa",
]);
assignDiseaseGroup("chenopods", [
  "spinaci",
  "bietola",
  "barbabietola",
  "loboda",
]);
assignDiseaseGroup("legumes", [
  "fagiolino",
  "fagiolo",
  "pisello",
  "fava",
  "soia_edamame",
  "cece",
  "lenticchia",
  "fagiolo_borlotto",
]);
assignDiseaseGroup("herbs", [
  "rosmarino",
  "timo",
  "origano",
  "salvia",
  "stevia_dolce",
  "dragoncello",
  "menta",
  "maggiorana",
  "shiso",
  "melissa",
  "cerfoglio",
  "cimbru",
]);
assignDiseaseGroup("basil", ["basilico"]);
assignDiseaseGroup("strawberry", ["fragola"]);
assignDiseaseGroup("corn", ["mais_dolce"]);
assignDiseaseGroup("asparagus", ["asparago"]);
assignDiseaseGroup("artichoke", ["carciofo"]);
assignDiseaseGroup("flowers", ["camomilla", "borragine"]);
assignDiseaseGroup("allium_wild", ["leurda"]);
assignDiseaseGroup("sweet_potato", ["patata_dolce"]);
assignDiseaseGroup("watercress", ["crescione"]);
assignDiseaseGroup("topinambur", ["topinambur"]);

// Restituisce il catalogo malattie
function diseaseCatalog() {
  const ro = currentLang === "ro";
  const it = {
    late_blight: [
      "Peronospora delle solanacee",
      "Macchie scure e irregolari su foglie e fusti; con forte umidità compare una muffa chiara sotto la foglia e i frutti possono imbrunire.",
      "Rimuovi subito le parti colpite, riduci la bagnatura fogliare e aumenta il ricambio d'aria. Nei casi iniziali valuta un prodotto rameico autorizzato per coltura e avversità.",
    ],
    alternaria: [
      "Alternariosi",
      "Macchie brune concentriche, spesso simili a un bersaglio, che partono dalle foglie più vecchie e possono raggiungere fusti o frutti.",
      "Elimina foglie e residui infetti, irriga alla base e pratica la rotazione. Proteggi preventivamente solo con prodotti autorizzati se il problema si ripete.",
    ],
    botrytis: [
      "Muffa grigia (Botrite)",
      "Tessuti molli e bruniti ricoperti da una polvere grigia, soprattutto su fiori, frutti o foglie ferite.",
      "Asporta le parti colpite senza scuotere le spore, arieggia e dirada la chioma. Evita condensa, ristagni e irrigazioni serali.",
    ],
    powdery: [
      "Oidio o mal bianco",
      "Patina bianca farinosa sulle foglie, deformazioni e progressivo ingiallimento; favorito da aria ferma e forti sbalzi termici.",
      "Rimuovi le foglie più colpite, migliora ventilazione e distanza tra piante. Intervieni precocemente con zolfo o altro prodotto autorizzato e compatibile con la coltura.",
    ],
    downy: [
      "Peronospora",
      "Chiazze gialle o traslucide sulla pagina superiore e muffa grigiastra o violacea sotto le foglie; sviluppo rapido con elevata umidità.",
      "Togli le foglie malate, irriga al mattino senza bagnare la vegetazione e arieggia. Nei periodi a rischio usa solo prodotti preventivi autorizzati.",
    ],
    clubroot: [
      "Ernia delle crucifere",
      "Piante stentate che appassiscono nelle ore calde; le radici presentano rigonfiamenti e deformazioni evidenti.",
      "Non esiste una cura sulla pianta colpita: rimuovila con le radici. Correggi i terreni troppo acidi, migliora il drenaggio e sospendi le brassicacee nello stesso spazio per diversi cicli.",
    ],
    white_rot: [
      "Marciume bianco degli alli",
      "Ingiallimento dall'apice, crescita debole e marciume alla base con feltro bianco e piccoli corpuscoli scuri.",
      "Elimina pianta e terreno aderente, non compostare i residui e disinfetta gli attrezzi. Evita di coltivare alli nello stesso suolo per più anni.",
    ],
    rust: [
      "Ruggine",
      "Pustole arancioni, brune o scure sulla pagina inferiore delle foglie, seguite da ingiallimento e disseccamento.",
      "Rimuovi le foglie molto colpite, migliora l'aria e non eccedere con azoto. Se necessario usa un fungicida autorizzato intervenendo ai primi sintomi.",
    ],
    cercospora: [
      "Cercosporiosi",
      "Numerose macchie piccole, tonde, con centro chiaro e margine scuro; nei casi gravi le foglie seccano prematuramente.",
      "Elimina i residui infetti, evita di bagnare le foglie e aumenta la distanza. Ruota le colture e proteggi solo con prodotti registrati quando le condizioni restano favorevoli.",
    ],
    sclerotinia: [
      "Marciume da Sclerotinia",
      "Avvizzimento improvviso, marciume acquoso al colletto e muffa bianca cotonosa con corpi scuri all'interno.",
      "Rimuovi completamente piante e residui, riduci umidità e densità della coltura. Non interrare il materiale infetto e alterna con colture meno sensibili.",
    ],
    damping_off: [
      "Moria delle piantine",
      "Le giovani piantine collassano al livello del terreno; il colletto diventa sottile, scuro o acquoso.",
      "Non recuperare le piantine collassate. Usa substrato pulito, contenitori disinfettati, semina meno fitta e bagna senza saturare il terriccio.",
    ],
    anthracnose: [
      "Antracnosi",
      "Lesioni scure e infossate su foglie, steli o baccelli; con umidità possono comparire masse di spore rosate.",
      "Rimuovi le parti infette, usa seme sano e non lavorare le piante bagnate. Ruota le leguminose e valuta un prodotto autorizzato ai primi sintomi.",
    ],
    root_rot: [
      "Marciume radicale",
      "Crescita lenta, foglie pallide e appassimento nonostante il terreno umido; le radici diventano brune e molli.",
      "Riduci l'acqua, migliora drenaggio e aerazione del substrato. Elimina le piante gravemente colpite e rinnova il terriccio contaminato.",
    ],
    basil_downy: [
      "Peronospora del basilico",
      "Ingiallimento tra le nervature e muffa grigio-violacea sotto le foglie; il profumo e la qualità calano rapidamente.",
      "Elimina subito le piante colpite, irriga solo alla base e arieggia. Usa varietà tolleranti e non conservare seme da piante malate.",
    ],
    fusarium: [
      "Fusariosi",
      "Ingiallimento progressivo, appassimento e imbrunimento dei vasi interni; spesso un lato della pianta deperisce prima dell'altro.",
      "Non esiste una cura affidabile sulla pianta infetta: rimuovila. Usa substrato sano, varietà resistenti quando disponibili e una lunga rotazione.",
    ],
    leaf_spot: [
      "Maculatura fogliare",
      "Macchie brune o grigiastre con bordo definito, che aumentano e confluiscono fino a seccare porzioni di foglia.",
      "Rimuovi le foglie malate, riduci umidità e spruzzi sulla chioma, disinfetta gli attrezzi. Tratta soltanto se necessario con un prodotto specificamente autorizzato.",
    ],
    verticillium: [
      "Verticilliosi",
      "Avvizzimento graduale, ingiallimenti spesso asimmetrici e vasi interni bruni, mentre il terreno resta umido.",
      "Rimuovi le piante colpite e il maggior numero possibile di radici. Evita di riutilizzare il substrato e scegli colture non sensibili nei cicli successivi.",
    ],
    black_rot: [
      "Marciume nero",
      "Lesioni scure e depresse su fusti o organi di riserva, con tessuti interni anneriti e sapore amaro.",
      "Elimina il materiale infetto, usa solo propagazione sana e disinfetta cassette e attrezzi. Conserva in ambiente asciutto e non ferire gli organi durante la raccolta.",
    ],
  };
  if (!ro) return it;
  return {
    late_blight: [
      "Mana solanaceelor",
      "Pete întunecate neregulate pe frunze și tulpini; la umiditate ridicată apare un puf deschis pe dosul frunzei, iar fructele se brunifică.",
      "Îndepărtează imediat părțile afectate, nu uda frunzișul și aerisește. La debut se poate folosi un produs cupric autorizat pentru cultură și boală.",
    ],
    alternaria: [
      "Alternarioză",
      "Pete brune concentrice, ca o țintă, pornind de pe frunzele bătrâne și uneori extinzându-se pe tulpini sau fructe.",
      "Elimină frunzele și resturile bolnave, udă la bază și rotește culturile. Folosește preventiv numai produse autorizate dacă problema reapare.",
    ],
    botrytis: [
      "Putregai cenușiu (Botrytis)",
      "Țesuturi moi, brunificate, acoperite cu pulbere cenușie, mai ales pe flori, fructe sau răni.",
      "Îndepărtează părțile bolnave fără a răspândi sporii, aerisește și rărește frunzișul. Evită condensul și udarea seara.",
    ],
    powdery: [
      "Făinare",
      "Depunere albă făinoasă pe frunze, deformări și îngălbenire treptată; este favorizată de aer stagnant și variații termice.",
      "Îndepărtează frunzele foarte afectate și îmbunătățește aerisirea. Intervino devreme cu sulf sau alt produs autorizat și compatibil cu cultura.",
    ],
    downy: [
      "Mană",
      "Pete galbene sau translucide deasupra și puf cenușiu-violaceu pe dosul frunzelor; evoluează rapid la umiditate ridicată.",
      "Elimină frunzele bolnave, udă dimineața la bază și aerisește. În perioadele de risc folosește numai produse preventive autorizate.",
    ],
    clubroot: [
      "Hernia rădăcinilor la crucifere",
      "Plante pipernicite care se ofilesc la căldură; rădăcinile au umflături și deformări evidente.",
      "Planta bolnavă nu se vindecă: scoate-o cu rădăcină. Corectează solul prea acid, îmbunătățește drenajul și evită cruciferele mai multe cicluri.",
    ],
    white_rot: [
      "Putregaiul alb al cepei",
      "Îngălbenire de la vârf, creștere slabă și putregai la bază cu pâslă albă și mici corpuri negre.",
      "Elimină planta și solul lipit, nu composta resturile și dezinfectează uneltele. Nu cultiva plante din genul Allium în același sol mai mulți ani.",
    ],
    rust: [
      "Rugină",
      "Pustule portocalii, brune sau negre pe dosul frunzelor, urmate de îngălbenire și uscare.",
      "Îndepărtează frunzele afectate, aerisește și nu exagera cu azotul. Dacă este necesar, aplică devreme un fungicid autorizat.",
    ],
    cercospora: [
      "Cercosporioză",
      "Multe pete mici, rotunde, cu centru deschis și margine închisă; atacul puternic usucă frunzele prematur.",
      "Elimină resturile infectate, nu uda frunzișul și mărește distanța. Rotește culturile și folosește numai produse înregistrate.",
    ],
    sclerotinia: [
      "Putregai alb produs de Sclerotinia",
      "Ofilire bruscă, putregai apos la colet și mucegai alb vată cu formațiuni negre.",
      "Scoate complet plantele și resturile, reduce umiditatea și densitatea. Nu îngropa materialul infectat și alternează cu plante mai puțin sensibile.",
    ],
    damping_off: [
      "Căderea plăntuțelor",
      "Plăntuțele se prăbușesc la nivelul solului; coletul devine subțire, închis sau apos.",
      "Plăntuțele căzute nu se recuperează. Folosește substrat curat, recipiente dezinfectate, seamănă mai rar și nu îmbiba solul.",
    ],
    anthracnose: [
      "Antracnoză",
      "Leziuni întunecate și adâncite pe frunze, tulpini sau păstăi; la umezeală apar mase rozalii de spori.",
      "Îndepărtează părțile bolnave, folosește sămânță sănătoasă și nu lucra plantele ude. Rotește leguminoasele și tratează numai cu produse autorizate.",
    ],
    root_rot: [
      "Putregai radicular",
      "Creștere lentă, frunze palide și ofilire deși solul este umed; rădăcinile devin brune și moi.",
      "Redu udarea și îmbunătățește drenajul și aerarea. Elimină plantele grav afectate și schimbă substratul contaminat.",
    ],
    basil_downy: [
      "Mana busuiocului",
      "Îngălbenire între nervuri și puf cenușiu-violet sub frunze; aroma și calitatea scad rapid.",
      "Elimină imediat plantele bolnave, udă doar la bază și aerisește. Folosește soiuri tolerante și nu păstra semințe de la plante afectate.",
    ],
    fusarium: [
      "Fuzarioză",
      "Îngălbenire progresivă, ofilire și brunificarea vaselor interne; uneori o parte a plantei moare prima.",
      "Planta infectată nu are tratament sigur: elimin-o. Folosește substrat sănătos, soiuri rezistente și rotație lungă.",
    ],
    leaf_spot: [
      "Pătarea frunzelor",
      "Pete brune sau cenușii cu margine clară, care cresc și se unesc până usucă porțiuni din frunză.",
      "Îndepărtează frunzele bolnave, reduce umiditatea pe frunziș și dezinfectează uneltele. Tratează numai cu un produs autorizat specific.",
    ],
    verticillium: [
      "Verticilioză",
      "Ofilire lentă, îngălbenire adesea asimetrică și vase interne brune, deși solul rămâne umed.",
      "Elimină plantele și cât mai multe rădăcini. Nu reutiliza substratul și alege culturi nesensibile în ciclurile următoare.",
    ],
    black_rot: [
      "Putregai negru",
      "Leziuni închise și adâncite pe tulpini sau organe de rezervă, cu țesut intern negru și gust amar.",
      "Elimină materialul bolnav, folosește numai material de înmulțire sănătos și dezinfectează uneltele. Păstrează uscat și evită rănirea la recoltare.",
    ],
  };
}

// Malattie e parassiti
function diseasesForPlant(p) {
  const group =
    DISEASE_PLANT_GROUP[p.id] ||
    {
      frutto: "solanaceae",
      foglia: "leafy",
      radice: "chenopods",
      aromatica: "herbs",
      legume: "legumes",
    }[typeOfPlant(p)];
  const catalog = diseaseCatalog();
  return (DISEASE_GROUPS[group] || DISEASE_GROUPS.leafy)
    .map((key) => catalog[key])
    .filter(Boolean)
    .map(([name, symptoms, action]) => ({ name, symptoms, action }));
}

// Genera la sezione con malattie, sintomi e rimedi della pianta selezionata.
function renderPlantDiseases(p) {
  const diseases = diseasesForPlant(p);
  const count = document.getElementById("detailDiseasesCount");
  const list = document.getElementById("detailDiseaseList");
  if (count)
    count.textContent = tv("detail.diseases_count", { count: diseases.length });
  if (!list) return;
  list.innerHTML = diseases
    .map(
      (disease) =>
        `<details class="detail-disease-card">
      <summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${disease.name}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary>
      <div class="detail-disease-body">
        <div class="detail-disease-info"><b>${t("detail.disease_symptoms")}</b><p>${disease.symptoms}</p></div>
        <div class="detail-disease-info detail-disease-info--action"><b>${t("detail.disease_action")}</b><p>${disease.action}</p></div>
      </div>
    </details>`,
    )
    .join("");
}

const PEST_GROUPS = {
  solanaceae: ["aphids", "whiteflies", "spider_mites"],
  cucurbitaceae: ["aphids", "whiteflies", "spider_mites"],
  brassicaceae: ["flea_beetles", "caterpillars", "aphids"],
  allium: ["thrips", "onion_fly", "leafminers"],
  apiaceae: ["carrot_fly", "aphids", "leafminers"],
  leafy: ["flea_beetles", "slugs", "aphids"],
  chenopods: ["leafminers", "aphids", "flea_beetles"],
  legumes: ["aphids", "weevils", "spider_mites"],
  herbs: ["aphids", "whiteflies", "spider_mites"],
  basil: ["aphids", "thrips", "slugs"],
  strawberry: ["spider_mites", "aphids", "slugs"],
  other: ["aphids", "slugs", "thrips"],
};

// Restituisce il catalogo parassiti
function pestCatalog() {
  if (currentLang === "ro")
    return {
      aphids: [
        "Afide",
        "Colonii de insecte mici pe lăstari și sub frunze, frunze răsucite și secreții lipicioase.",
        "Îndepărtează jeturile mici cu apă, taie vârfurile foarte atacate și favorizează buburuzele. Dacă persistă, folosește săpun moale autorizat.",
      ],
      whiteflies: [
        "Musculița albă",
        "Nori de insecte albe la atingerea plantei, frunze lipicioase și îngălbenite.",
        "Folosește capcane galbene pentru monitorizare, aspiră adulții dimineața și îndepărtează frunzele puternic infestate.",
      ],
      spider_mites: [
        "Acarianul roșu",
        "Puncte galbene fine, aspect bronzat și pânze subțiri sub frunze, mai ales în aer cald și uscat.",
        "Mărește umiditatea fără a crea condens, spală dosul frunzelor și elimină focarele; introdu acarieni prădători dacă sunt disponibili.",
      ],
      flea_beetles: [
        "Purici de pământ (altice)",
        "Gândăcei mici, adesea negri, care sar și lasă multe găuri rotunde mici în frunze.",
        "Protejează plantele tinere cu plasă fină, elimină buruienile crucifere, menține solul uniform umed și intervino devreme.",
      ],
      caterpillars: [
        "Omizi",
        "Găuri neregulate, margini roase și granule întunecate pe frunze; omizile se ascund adesea pe dos.",
        "Inspectează și îndepărtează manual, folosește plasă anti-insecte și, la atac confirmat, un produs cu Bacillus thuringiensis autorizat.",
      ],
      thrips: [
        "Trips",
        "Dungi argintii, puncte negre și frunze deformate; insecte foarte subțiri ascunse în pliuri.",
        "Folosește capcane albastre pentru monitorizare, îndepărtează părțile atacate și evită aerul foarte uscat.",
      ],
      onion_fly: [
        "Musca cepei",
        "Plante care se îngălbenesc și se desprind ușor; larve albe în bulb sau la bază.",
        "Scoate plantele atacate, folosește plasă fină și rotește culturile de Allium; nu lăsa bulbi bolnavi în sol.",
      ],
      leafminers: [
        "Minatori foliari",
        "Galerii deschise și șerpuitoare în interiorul frunzei.",
        "Îndepărtează frunzele cu galerii înainte ca larva să iasă, folosește plasă fină și capcane adezive pentru monitorizare.",
      ],
      carrot_fly: [
        "Musca morcovului",
        "Frunziș roșiatic și galerii ruginii în rădăcini, uneori cu gust amar.",
        "Protejează cu plasă fină, rărește fără a lăsa resturi lângă cultură și rotește plantele umbelifere.",
      ],
      slugs: [
        "Limacși și melci",
        "Găuri mari neregulate, margini roase și urme lucioase de mucus.",
        "Culege seara, elimină ascunzătorile umede și folosește bariere sau momeli autorizate pe bază de fosfat feric.",
      ],
      weevils: [
        "Gărgărițe",
        "Margini frunzelor ciupite și semințe sau păstăi perforate; adulți mici și închiși la culoare.",
        "Îndepărtează adulții, resturile și semințele infestate, rotește cultura și folosește plasă în perioadele de zbor.",
      ],
    };
  return {
    aphids: [
      "Afidi",
      "Colonie di piccoli insetti su germogli e pagina inferiore, foglie arricciate e melata appiccicosa.",
      "Rimuovi piccoli focolai con acqua, taglia gli apici molto infestati e favorisci le coccinelle. Se persistono, usa sapone molle autorizzato.",
    ],
    whiteflies: [
      "Mosca bianca",
      "Nuvole di insetti bianchi quando tocchi la pianta, foglie appiccicose e ingiallite.",
      "Usa trappole gialle per monitorare, aspira gli adulti al mattino e rimuovi le foglie molto infestate.",
    ],
    spider_mites: [
      "Ragnetto rosso",
      "Puntinatura gialla, aspetto bronzeo e sottili ragnatele sotto le foglie, soprattutto con caldo secco.",
      "Aumenta l'umidità senza creare condensa, lava la pagina inferiore e rimuovi i focolai; introduci acari predatori se disponibili.",
    ],
    flea_beetles: [
      "Altiche",
      "Piccoli coleotteri spesso neri che saltano e lasciano molti forellini rotondi sulle foglie.",
      "Proteggi le piante giovani con rete fine, elimina le infestanti crucifere, mantieni il terreno uniformemente umido e intervieni presto.",
    ],
    caterpillars: [
      "Bruchi e cavolaie",
      "Fori irregolari, margini rosicchiati ed escrementi scuri; i bruchi spesso sono nascosti sotto la foglia.",
      "Ispeziona e rimuovi a mano, usa rete anti-insetto e, con attacco confermato, un prodotto autorizzato a base di Bacillus thuringiensis.",
    ],
    thrips: [
      "Tripidi",
      "Striature argentate, puntini neri e foglie deformate; insetti sottilissimi nascosti nelle pieghe.",
      "Usa trappole blu per monitorare, elimina le parti colpite ed evita aria eccessivamente secca.",
    ],
    onion_fly: [
      "Mosca della cipolla",
      "Piante che ingialliscono e si sfilano facilmente; larve bianche nel bulbo o alla base.",
      "Rimuovi le piante colpite, usa rete fine e ruota gli alli; non lasciare bulbi malati nel terreno.",
    ],
    leafminers: [
      "Minatori fogliari",
      "Gallerie chiare e sinuose scavate all'interno della foglia.",
      "Rimuovi le foglie con mine prima che la larva esca, usa rete fine e trappole adesive per monitorare.",
    ],
    carrot_fly: [
      "Mosca della carota",
      "Foglie rossastre e gallerie color ruggine nelle radici, talvolta amare.",
      "Proteggi con rete fine, dirada senza lasciare residui vicino alla coltura e ruota le ombrellifere.",
    ],
    slugs: [
      "Limacce e chiocciole",
      "Grandi fori irregolari, bordi mangiati e tracce lucide di bava.",
      "Raccogli la sera, elimina i rifugi umidi e usa barriere o esche autorizzate a base di fosfato ferrico.",
    ],
    weevils: [
      "Tonchi e oziorrinchi",
      "Margini fogliari intaccati e semi o baccelli perforati; piccoli adulti scuri.",
      "Rimuovi adulti, residui e semi infestati, ruota la coltura e usa rete nei periodi di volo.",
    ],
  };
}

// Restituisce i parassiti per pianta
function pestsForPlant(p) {
  const diseaseGroup = DISEASE_PLANT_GROUP[p.id] || "other";
  const group = PEST_GROUPS[diseaseGroup] ? diseaseGroup : "other";
  const catalog = pestCatalog();
  return PEST_GROUPS[group]
    .map((key) => {
      const entry = catalog[key];
      return entry
        ? { key, name: entry[0], signs: entry[1], action: entry[2] }
        : null;
    })
    .filter(Boolean);
}

// Suggerisce prodotti per parassiti
function targetedPestProducts(p) {
  const group = PEST_GROUPS[DISEASE_PLANT_GROUP[p.id]]
    ? DISEASE_PLANT_GROUP[p.id]
    : "other";
  const ro = currentLang === "ro";
  const plans = ro
    ? {
        solanaceae: {
          aphids:
            "Săpun potasic pe colonii tinere; la atac puternic, flonicamid. Aplică sub frunze și pe vârfurile plantei.",
          whiteflies:
            "Beauveria bassiana pe nimfe și adulți; pyriproxyfen pe ouă și nimfe pentru întreruperea ciclului.",
          spider_mites:
            "Abamectin pe forme mobile și hexythiazox pe ouă; biologic, Phytoseiulus persimilis.",
        },
        cucurbitaceae: {
          aphids:
            "Flonicamid pentru oprirea hrănirii; săpun potasic pentru focare mici, cu acoperire sub frunze.",
          whiteflies:
            "Beauveria bassiana la umiditate controlată și săpun potasic pe nimfele expuse.",
          spider_mites:
            "Hexythiazox pe ouă urmat de abamectin pe forme mobile; alternativ Phytoseiulus persimilis.",
        },
        brassicaceae: {
          flea_beetles:
            "Spinosad sau piretrine naturale pe adulții activi, aplicate devreme pe plantele tinere.",
          caterpillars:
            "Bacillus thuringiensis var. kurstaki pe larve mici; spinosad pe larve mai dezvoltate.",
          aphids:
            "Flonicamid pentru coloniile ascunse în rozetă; săpun potasic pe coloniile expuse.",
        },
        allium: {
          thrips:
            "Spinosad în teaca frunzelor; Beauveria bassiana cu umiditate adecvată pentru a reduce adulții și nimfele.",
          onion_fly:
            "Steinernema feltiae în sol umed contra larvelor; spinosad numai în tratamente specifice culturii.",
          leafminers:
            "Spinosad la apariția primelor galerii; cyromazine pe larvele tinere unde este prevăzută pentru cultură.",
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae în sol contra larvelor; piretrine pe adulți în perioada de zbor.",
          aphids:
            "Săpun potasic pe coloniile expuse; flonicamid dacă frunzele sunt deja răsucite.",
          leafminers:
            "Spinosad la începutul galeriilor; îndepărtează frunzele minate înainte de repetarea tratamentului.",
        },
        leafy: {
          flea_beetles:
            "Piretrine naturale pentru reducerea rapidă a adulților; spinosad dacă paguba continuă pe frunzele noi.",
          slugs:
            "Fosfat feric granular în jurul parcelei, reînnoit după udări abundente.",
          aphids:
            "Săpun potasic pe ambele fețe ale frunzei; piretrine numai pentru colonii persistente.",
        },
        chenopods: {
          leafminers:
            "Spinosad pe larve tinere, imediat ce apar primele galerii.",
          aphids:
            "Săpun potasic pe colonii; flonicamid dacă frunzele se deformează.",
          flea_beetles:
            "Piretrine naturale pe adulți; spinosad dacă paguba crește pe frunzele tinere.",
        },
        legumes: {
          aphids:
            "Flonicamid pentru afidele din vârfuri și flori; săpun potasic pentru focare localizate.",
          weevils:
            "Piretrine pe adulți; Heterorhabditis bacteriophora în sol contra larvelor.",
          spider_mites:
            "Abamectin pe forme mobile; biologic, Phytoseiulus persimilis.",
        },
        herbs: {
          aphids:
            "Săpun potasic, cu spălarea atentă a frunzelor înainte de recoltare; piretrine numai la atac puternic.",
          whiteflies:
            "Beauveria bassiana și capcane galbene; săpun potasic pe nimfele expuse.",
          spider_mites:
            "Phytoseiulus persimilis sau ulei horticol ușor pe dosul frunzei; evită tratamentele care afectează aroma.",
        },
        basil: {
          aphids:
            "Săpun potasic pe vârfuri și sub frunze, apoi clătirea frunzelor înainte de consum.",
          thrips:
            "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică.",
          slugs:
            "Fosfat feric granular pe sol, fără contact direct cu frunzele de recoltat.",
        },
        strawberry: {
          spider_mites:
            "Phytoseiulus persimilis la începutul atacului; bifenazate pe forme mobile dacă populația crește.",
          aphids:
            "Săpun potasic înainte de înflorire; flonicamid dacă apar colonii persistente.",
          slugs: "Fosfat feric între plante, fără a pune granulele pe fructe.",
        },
        other: {
          aphids: "Săpun potasic pe colonii; flonicamid la atac persistent.",
          slugs: "Fosfat feric granular distribuit uniform pe sol.",
          thrips:
            "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică.",
        },
      }
    : {
        solanaceae: {
          aphids:
            "Sapone molle potassico sulle colonie giovani; con attacco forte, flonicamid. Bagna bene pagina inferiore e germogli.",
          whiteflies:
            "Beauveria bassiana su neanidi e adulti; pyriproxyfen su uova e neanidi per interrompere il ciclo.",
          spider_mites:
            "Abamectina sulle forme mobili ed hexythiazox sulle uova; nel biologico, Phytoseiulus persimilis.",
        },
        cucurbitaceae: {
          aphids:
            "Flonicamid per bloccare l'alimentazione; sapone molle sui piccoli focolai, coprendo la pagina inferiore.",
          whiteflies:
            "Beauveria bassiana con umidità controllata e sapone molle sulle neanidi esposte.",
          spider_mites:
            "Hexythiazox sulle uova seguito da abamectina sulle forme mobili; alternativa biologica: Phytoseiulus persimilis.",
        },
        brassicaceae: {
          flea_beetles:
            "Spinosad o piretrine naturali sugli adulti attivi, applicati presto sulle piante giovani.",
          caterpillars:
            "Bacillus thuringiensis var. kurstaki sui bruchi piccoli; spinosad sulle larve più sviluppate.",
          aphids:
            "Flonicamid per le colonie nascoste nella rosetta; sapone molle sulle colonie esposte.",
        },
        allium: {
          thrips:
            "Spinosad nella guaina delle foglie; Beauveria bassiana con umidità adeguata contro adulti e neanidi.",
          onion_fly:
            "Steinernema feltiae nel suolo umido contro le larve; spinosad soltanto nei trattamenti specifici per la coltura.",
          leafminers:
            "Spinosad alla comparsa delle prime mine; cyromazine sulle larve giovani dove prevista per la coltura.",
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae nel suolo contro le larve; piretrine sugli adulti durante il periodo di volo.",
          aphids:
            "Sapone molle sulle colonie esposte; flonicamid quando le foglie sono già arricciate.",
          leafminers:
            "Spinosad all'inizio delle gallerie; rimuovi le foglie minate prima di ripetere il trattamento.",
        },
        leafy: {
          flea_beetles:
            "Piretrine naturali per abbattere rapidamente gli adulti; spinosad se il danno continua sulle foglie nuove.",
          slugs:
            "Fosfato ferrico granulare attorno all'aiuola, rinnovato dopo irrigazioni abbondanti.",
          aphids:
            "Sapone molle su entrambe le pagine fogliari; piretrine solo per colonie persistenti.",
        },
        chenopods: {
          leafminers:
            "Spinosad sulle larve giovani, appena compaiono le prime gallerie.",
          aphids:
            "Sapone molle sulle colonie; flonicamid se le foglie iniziano a deformarsi.",
          flea_beetles:
            "Piretrine naturali sugli adulti; spinosad se il danno aumenta sulle foglie giovani.",
        },
        legumes: {
          aphids:
            "Flonicamid per gli afidi su apici e fiori; sapone molle per focolai localizzati.",
          weevils:
            "Piretrine sugli adulti; Heterorhabditis bacteriophora nel terreno contro le larve.",
          spider_mites:
            "Abamectina sulle forme mobili; nel biologico, Phytoseiulus persimilis.",
        },
        herbs: {
          aphids:
            "Sapone molle, lavando con cura le foglie prima della raccolta; piretrine solo con attacco forte.",
          whiteflies:
            "Beauveria bassiana e trappole gialle; sapone molle sulle neanidi esposte.",
          spider_mites:
            "Phytoseiulus persimilis oppure olio orticolo leggero sotto le foglie; evita trattamenti che alterano l'aroma.",
        },
        basil: {
          aphids:
            "Sapone molle su germogli e pagina inferiore, poi risciacquo accurato prima del consumo.",
          thrips:
            "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica.",
          slugs:
            "Fosfato ferrico granulare sul terreno, senza contatto diretto con le foglie da raccogliere.",
        },
        strawberry: {
          spider_mites:
            "Phytoseiulus persimilis all'inizio dell'attacco; bifenazate sulle forme mobili se la popolazione cresce.",
          aphids:
            "Sapone molle prima della fioritura; flonicamid se compaiono colonie persistenti.",
          slugs:
            "Fosfato ferrico tra le piante, evitando il contatto dei granuli con i frutti.",
        },
        other: {
          aphids:
            "Sapone molle sulle colonie; flonicamid con attacco persistente.",
          slugs:
            "Fosfato ferrico granulare distribuito uniformemente sul terreno.",
          thrips:
            "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica.",
        },
      };
  const specific = {
    rucola: {
      flea_beetles: ro
        ? "Pentru rucola: ulei de neem/azadiractină ca repelent și inhibitor al hrănirii; spinosad dacă puricii continuă să perforeze frunzele noi."
        : "Per la rucola: olio di neem/azadiractina come repellente e antialimentare; spinosad se le altiche continuano a perforare le foglie nuove.",
    },
    pomodoro: {
      whiteflies: ro
        ? "Pentru tomate: Beauveria bassiana pe nimfe, apoi Encarsia formosa pentru control biologic continuu; pyriproxyfen dacă ciclul nu se întrerupe."
        : "Per il pomodoro: Beauveria bassiana sulle neanidi, poi Encarsia formosa per il controllo biologico continuo; pyriproxyfen se il ciclo non si interrompe.",
    },
    basilico: {
      thrips: ro
        ? "Pentru busuioc: Beauveria bassiana sau spinosad în vârfurile tinere; evită uleiurile aproape de recoltare pentru a nu altera frunzele."
        : "Per il basilico: Beauveria bassiana o spinosad nei germogli giovani; evita oli vicino alla raccolta per non alterare le foglie.",
    },
    cavolo: {
      caterpillars: ro
        ? "Pentru varză: Bacillus thuringiensis kurstaki seara pe omizile mici; spinosad dacă larvele sunt deja mari și ascunse în frunze."
        : "Per il cavolo: Bacillus thuringiensis kurstaki la sera sui bruchi piccoli; spinosad se le larve sono già grandi e nascoste nelle foglie.",
    },
    fragola: {
      spider_mites: ro
        ? "Pentru căpșun: Phytoseiulus persimilis înainte de înflorirea intensă; bifenazate dacă apar pânze și bronzarea frunzelor."
        : "Per la fragola: Phytoseiulus persimilis prima della piena fioritura; bifenazate se compaiono ragnatele e bronzatura fogliare.",
    },
    carota: {
      carrot_fly: ro
        ? "Pentru morcov: Steinernema feltiae în sol umed la eclozarea larvelor; piretrine doar pe adulți în perioada de zbor."
        : "Per la carota: Steinernema feltiae nel terreno umido alla schiusa delle larve; piretrine solo sugli adulti durante il volo.",
    },
    cipolla: {
      onion_fly: ro
        ? "Pentru ceapă: Steinernema feltiae în sol umed, repetat pe generațiile larvare; elimină bulbii atacați înainte de orice nou tratament."
        : "Per la cipolla: Steinernema feltiae nel terreno umido, ripetuto sulle generazioni larvali; elimina i bulbi colpiti prima di ogni nuovo trattamento.",
    },
  };
  return {
    ...(plans.other || {}),
    ...(plans[group] || {}),
    ...(specific[p.id] || {}),
  };
}

// Genera la sezione con parassiti e prodotti consigliati per la pianta selezionata.
function renderPlantPests(p) {
  const pests = pestsForPlant(p);
  const products = targetedPestProducts(p);
  const count = document.getElementById("detailPestsCount");
  const list = document.getElementById("detailPestList");
  if (count)
    count.textContent = tv("detail.pests_count", { count: pests.length });
  if (!list) return;
  list.innerHTML = pests
    .map(
      (pest) =>
        `<details class="detail-disease-card"><summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${pest.name}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${t("detail.pest_signs")}</b><p>${pest.signs}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${t("detail.pest_action")}</b><p>${pest.action}</p></div><div class="detail-disease-info detail-disease-info--products"><b>${t("detail.pest_products")} · ${plantName(p.id)}</b><p>${products[pest.key]}</p></div></div></details>`,
    )
    .join("");
}

// Scheda pianta
function openDetail(id, preserveTab = false) {
  const p = BYID[id];
  if (!p) return;
  const overlay = document.getElementById("detailOverlay");
  const wasOpen = overlay.classList.contains("open");
  const previousTab =
    document.querySelector("[data-detail-tab].active")?.dataset.detailTab ||
    "overview";
  currentDetail = id;
  const guide = localizedSowingGuide(p);
  const profile = technicalProfile(p, guide);

  // Usa la versione ad alta risoluzione per la foto di dettaglio.
  const smallPhotoSrc = photoSrc(id);
  const heroMatch = /^assets\/img\/photo\/([^/]+)$/.exec(smallPhotoSrc);
  const detailPhotoEl = document.getElementById("detailPhoto");
  let heroFallbackTried = false;
  detailPhotoEl.onerror = function () {
    if (heroFallbackTried) return;
    heroFallbackTried = true;
    this.src = smallPhotoSrc;
  };
  detailPhotoEl.src = heroMatch
    ? `assets/img/photo/large/${heroMatch[1]}`
    : smallPhotoSrc;
  detailPhotoEl.alt = plantName(id);
  document.getElementById("detailName").textContent = plantName(id);

  const tipo =
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia";
  const diffLevel = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diffLevel === 1
      ? t("detail.diff_easy")
      : diffLevel === 2
        ? t("detail.diff_medium")
        : t("detail.diff_hard");
  const diffClass =
    diffLevel === 1
      ? "diff-easy"
      : diffLevel === 2
        ? "diff-medium"
        : "diff-hard";
  document.getElementById("detailTypeBadge").textContent = typeLabel(tipo);
  const diffEl = document.getElementById("detailDiff");
  diffEl.textContent = diffLabel;
  diffEl.className = `detail-hero-diff ${diffClass}`;

  document.getElementById("detailBadges").innerHTML =
    `<span class="badge badge--sun">${SOLE_ICON[p.sole]} ${sunLabel(p)}</span>
     <span class="badge badge--water">${ACQUA_ICON[p.acqua]} ${t("plant.water")} ${t(`water.${p.acqua}`)}</span>`;

  const nota = plantNote(p);
  const notaEl = document.getElementById("detailNota");
  notaEl.textContent = profile.description;
  notaEl.hidden = !profile.description;

  const sp = PLANT_SPACING[p.id] || {};
  const svgDiagram = spacingInfographic(p);
  const spacingValStr = spacingLabel(p);
  document.getElementById("detailSpacing").innerHTML = sp.d
    ? `<div class="detail-spacing-header">
         <span class="detail-tile-label">${window.SERRA_PLANT_CONTENT?.spacingLabel(p, currentLang) || t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">${spacingValStr}</b>
       </div>
       <div class="detail-spacing-diagram">${svgDiagram}</div>`
    : `<div class="detail-spacing-header">
         <span class="detail-tile-label">${t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">—</b>
       </div>`;

  const hcm = PLANT_HEIGHT_CM[p.id] ? ` · ${PLANT_HEIGHT_CM[p.id]} cm` : "";
  const price = packPrice(id);
  const spp = seedsPerPack(id);
  document.getElementById("detailStats").innerHTML =
    `<div class="detail-tile detail-tile--harvest">
       <div class="detail-tile-icon">⏱</div>
       <div class="detail-tile-label">${t("plant.harvest_days")}</div>
       <div class="detail-tile-value">${daysLabel(p, true)}</div>
     </div>
     <div class="detail-tile detail-tile--yield">
       <div class="detail-tile-icon">⚖</div>
       <div class="detail-tile-label">${t("plant.yield")}</div>
       <div class="detail-tile-value">${yieldLabel(p)}</div>
     </div>
     <div class="detail-tile detail-tile--height">
       <div class="detail-tile-icon">↕</div>
       <div class="detail-tile-label">${t("detail.height_range")}</div>
       <div class="detail-tile-value">${t(`height.${p.h}`)}${hcm}</div>
     </div>
     <div class="detail-tile detail-tile--price">
       <div class="detail-tile-icon">🏷</div>
       <div class="detail-tile-label">${t("detail.price_pack")}</div>
       <div class="detail-tile-value">${money(price)}</div>
       <div class="detail-tile-sub">${tv("cart.seeds_per_pack", { count: spp })}</div>
     </div>`;

  document.getElementById("detailCultivationExtra").innerHTML =
    renderTechnicalCards(profile.cultivation);
  document.getElementById("detailCareGuide").innerHTML = renderTechnicalCards(
    profile.care,
  );
  renderPlantDiseases(p);
  renderPlantPests(p);
  document.getElementById("detailHarvestGuide").innerHTML =
    renderTechnicalCards(profile.harvest);

  const activeMonths = Array.from(effectiveMonths(p))
    .sort((a, b) => a - b)
    .map((m) => ABBR_MESI[m - 1])
    .join(", ");
  const monthLegend = {
    available: t("detail.month_available"),
    selected: t("detail.month_selected"),
    outside: t("detail.month_outside"),
  };
  const monthSegments = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    const title = `${NOMI_MESI[i]} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
    return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}">
      <span class="month-seg-abbr">${ABBR_MESI[i]}</span>
    </div>`;
  }).join("");
  document.getElementById("detailMonthBar").innerHTML =
    `<div class="month-bar-head">
       <span>${t("detail.sowing_months")}</span>
       <b>${activeMonths}</b>
     </div>
     <div class="month-segments" aria-label="${t("detail.sowing_months")}">${monthSegments}</div>
     <div class="month-bar-legend" aria-hidden="true">
       <span><i class="month-legend-dot month-legend-dot--active"></i>${monthLegend.available}</span>
       <span><i class="month-legend-dot month-legend-dot--current"></i>${monthLegend.selected}</span>
     </div>`;

  let comp = "";
  if (p.amiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label">💚 ${t("detail.friends")}</div>
      <div class="companion-list">${p.amiche
        .map(
          (aid) =>
            `<span class="companion-chip friend">${fruitEmoji(aid)} ${plantName(aid)}</span>`,
        )
        .join("")}</div>
    </div>`;
  if (p.nemiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label detail-companions-label--foe">⚠️ ${t("detail.enemies")}</div>
      <div class="companion-list">${p.nemiche
        .map(
          (eid) =>
            `<span class="companion-chip foe">${fruitEmoji(eid)} ${plantName(eid)}</span>`,
        )
        .join("")}</div>
    </div>`;
  const compEl = document.getElementById("detailCompanions");
  compEl.innerHTML = comp;
  compEl.hidden = !comp;

  const sowEl = document.getElementById("detailSow");
  const sowBodyEl = document.getElementById("detailSowBody");
  const sowRow = (icon, label, value) =>
    `<div class="detail-sow-row"><span class="detail-sow-row-icon" aria-hidden="true">${icon}</span><span class="detail-sow-row-copy"><b>${label}</b> — ${value}</span></div>`;
  const sowTip = (value) =>
    `<blockquote class="detail-sow-tip"><span class="detail-sow-row-icon" aria-hidden="true">💡</span><span class="detail-sow-row-copy">${value}</span></blockquote>`;
  let sowHtml = "";
  if (guide) {
    if (guide.method)
      sowHtml += sowRow("🌱", t("detail.sow_method"), guide.method);
    if (guide.periodo)
      sowHtml += sowRow("📅", t("detail.sow_period"), guide.periodo);
    if (guide.depth)
      sowHtml += sowRow("📏", t("detail.sow_depth"), guide.depth);
    if (guide.tempGerm && guide.tempGerm !== "—")
      sowHtml += sowRow("🌡️", t("detail.sow_temp"), guide.tempGerm);
    if (guide.giorniGerm && guide.giorniGerm !== "—")
      sowHtml += sowRow("⏳", t("detail.sow_germ"), guide.giorniGerm);
    if (guide.tip || nota) sowHtml += sowTip(guide.tip || nota);
  } else if (nota) {
    sowHtml += sowTip(nota);
  }
  sowBodyEl.innerHTML = sowHtml;
  sowEl.hidden = !sowHtml;

  const inC = inCart(id);
  const btn = document.getElementById("detailAddBtn");
  btn.textContent = detailCartLabel(inC);
  btn.classList.toggle("added", inC);

  overlay.classList.add("open");
  const detailPanel = document.getElementById("detailPanel");
  if (detailPanel && !wasOpen) detailPanel.scrollTop = 0;
  setDetailTab(preserveTab ? previousTab : "overview");
  if (!wasOpen) lockDetailPageScroll();
}
// Aggiunge il dettaglio al carrello
function detailAddToCart() {
  if (!currentDetail) return;
  const added = !inCart(currentDetail);
  cart = added
    ? [...cart, { id: currentDetail, bustine: 1 }]
    : cart.filter((i) => i.id !== currentDetail);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(currentDetail, added);
  const btn = document.getElementById("detailAddBtn");
  if (btn) {
    btn.textContent = detailCartLabel(added);
    btn.classList.toggle("added", added);
  }
}
// Chiude il pannello dettaglio e ripristina lo stato di navigazione della pagina.
function closeDetail(e) {
  if (e && e.target !== document.getElementById("detailOverlay")) return;
  document.getElementById("detailOverlay").classList.remove("open");
  unlockDetailPageScroll();
  currentDetail = null;
}
// Le azioni della scheda sono gestite con delega sul documento.
document.getElementById("detailOverlay")?.addEventListener(
  "touchmove",
  (e) => {
    const panel = document.getElementById("detailPanel");
    if (!panel || !panel.contains(e.target)) e.preventDefault();
  },
  { passive: false },
);
document.getElementById("detailPanel")?.addEventListener(
  "touchstart",
  (e) => {
    detailTouchY = e.touches?.[0]?.clientY ?? null;
  },
  { passive: true },
);
document.getElementById("detailPanel")?.addEventListener(
  "touchmove",
  (e) => {
    const panel = document.getElementById("detailPanel");
    if (!panel) return;

    const scroller =
      panel.querySelector(".detail-scroll") &&
      window.matchMedia("(max-width: 660px)").matches
        ? panel.querySelector(".detail-scroll")
        : panel.querySelector(".detail-tab-panel.active") || panel;
    const y = e.touches?.[0]?.clientY;
    if (y == null || detailTouchY == null) return;
    const deltaY = y - detailTouchY;
    const atTop = scroller.scrollTop <= 0;
    const atBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) e.preventDefault();
    detailTouchY = y;
  },
  { passive: false },
);

// File generato con npm run build:js: modificare i moduli in home/app/.

// -----------------------------------------------------------------------------
// Home — Eventi e filtri del catalogo, preferenze e clima. Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

// Controlli catalogo
function bindHomeStaticActions() {
  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-home-action]");
    if (!control) return;

    switch (control.dataset.homeAction) {
      case "set-language":
        // Il selettore desktop usa l'evento `change`: trattarlo anche al primo tap forza un render e chiude la tendina nativa su iPhone.
        if (control.tagName !== "SELECT") setLang(control.dataset.lang);
        break;
      case "open-cart":
        openCart();
        break;
      case "back-to-top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "accept-cookies":
        acceptCookies();
        break;
      case "reject-cookies":
        rejectCookies();
        break;
      case "clear-catalog-search":
        clearCatalogSearch();
        break;
      case "set-zone":
        setZone(control.dataset.zone);
        break;
      case "toggle-heated":
        toggleHeated();
        break;
      case "toggle-season-only":
        toggleCatalogSeasonOnly();
        break;
      case "toggle-full-catalog":
        toggleCatalogFull();
        break;
      case "toggle-easy-only":
        toggleCatalogEasyOnly();
        break;
      case "reset-catalog-filters":
        resetCatalogFilters();
        break;
      case "set-catalog-layout":
        setCatalogLayout(control.dataset.layout);
        break;
      case "add-kit":
        addKitToCart();
        break;
      case "add-kit-and-plan":
        addKitAndPlan();
        break;
      case "close-detail":
        closeDetail(control.id === "detailOverlay" ? event : undefined);
        break;
      case "set-detail-tab":
        setDetailTab(control.dataset.tab);
        break;
      case "detail-add-to-cart":
        detailAddToCart();
        break;
      case "close-cart":
        closeCart();
        break;
      case "cross-sell":
        closeCart();
        break;
      case "clear-cart":
        clearCart();
        break;
      case "prepare-cart-import":
        syncCatalogClimateToSharedConfig();
        closeCart();
        break;
      case "checkout":
        alertCheckout();
        break;
      case "set-catalog-category":
        setCatalogCategory(control.dataset.category);
        break;
      case "set-month":
        setMese(Number(control.dataset.month));
        break;
      case "remove-catalog-filter":
        removeCatalogFilter(control.dataset.filterKind);
        break;
      case "show-full-catalog":
        showFullCatalog();
        break;
      case "open-detail":
        openDetail(control.dataset.plantId);
        break;
      case "toggle-cart":
        toggleCart(event, control.dataset.plantId);
        break;
      case "remove-from-cart":
        removeFromCart(control.dataset.plantId, control.dataset.variante);
        break;
      case "cart-qty-more":
        changeCartQty(control.dataset.plantId, control.dataset.variante, 1);
        break;
      case "cart-qty-less":
        changeCartQty(control.dataset.plantId, control.dataset.variante, -1);
        break;
      case "load-more-catalog":
        loadMoreCatalogPlants();
        break;
      case "add-pair-to-cart":
        addPairToCart(
          event,
          control.dataset.firstPlantId,
          control.dataset.secondPlantId,
        );
        break;
      case "toggle-companions":
        toggleCompanions();
        break;
    }
  });

  document.addEventListener("change", (event) => {
    const control = event.target.closest("[data-home-action]");
    if (!control) return;
    if (control.dataset.homeAction === "set-language") setLang(control.value);
    if (control.dataset.homeAction === "set-catalog-type")
      setCatalogType(control.value);
    if (control.dataset.homeAction === "set-catalog-sort")
      setCatalogSort(control.value);
  });

  document.addEventListener("input", (event) => {
    const control = event.target.closest(
      '[data-home-action="set-catalog-search"]',
    );
    if (control) setCatalogSearch(control.value);
  });

  document.addEventListener("keydown", (event) => {
    const control = event.target.closest('[data-home-action="set-detail-tab"]');
    if (control) handleDetailTabKey(event, control);
  });

  document.addEventListener(
    "error",
    (event) => {
      const image = event.target.closest?.("[data-catalog-photo-fallback]");
      if (!image) return;
      image.parentElement.dataset.fallback = "1";
      image.style.display = "none";
    },
    true,
  );
}

bindHomeStaticActions();

function setZone(z) {
  state.zona = z;
  render();
}
// Alterna la serra riscaldata
function toggleHeated() {
  state.riscaldata = !state.riscaldata;
  catalog.climatePreferenceTouched = true;
  render();
}
// Imposta il mese attivo
function setMese(m) {
  state.mese = m;
  render();
}
// Allinea i controlli del catalogo
function syncCatalogControls() {
  const search = document.getElementById("catalogSearch");
  const hint = document.getElementById("catalogHint");
  const filterToggle = document.getElementById("catalogFilterToggle");
  const filterTools = document.getElementById("catalogFilterTools");
  const type = document.getElementById("catalogType");
  const sort = document.getElementById("catalogSort");
  const season = document.getElementById("catalogSeasonOnly");
  const allToggle = document.getElementById("catalogAllToggle");
  const easy = document.getElementById("catalogEasyOnly");
  if (search && search !== document.activeElement)
    search.value = catalog.search;
  const hasSearchTerm = Boolean(catalog.search.trim());
  if (hint)
    hint.classList.toggle(
      "catalog-mobile-hidden-while-searching",
      hasSearchTerm,
    );
  if (filterToggle) {
    filterToggle.classList.toggle(
      "catalog-mobile-hidden-while-searching",
      hasSearchTerm,
    );
    filterToggle.hidden = hasSearchTerm;
  }
  if (filterTools) {
    filterTools.classList.toggle(
      "catalog-mobile-hidden-while-searching",
      hasSearchTerm,
    );
    filterTools.hidden = hasSearchTerm;
  }
  if (type && type !== document.activeElement) type.value = catalog.type;
  if (sort && sort !== document.activeElement) sort.value = catalog.sort;
  if (season) {
    season.classList.toggle("active", catalog.seasonOnly);
    season.setAttribute("aria-pressed", String(catalog.seasonOnly));
    const semCount = seminabili().length;
    const seasonCountEl = season.querySelector(".chip-count");
    if (seasonCountEl) seasonCountEl.textContent = semCount;
  }
  if (allToggle) {
    allToggle.classList.toggle("active", !catalog.seasonOnly);
    allToggle.setAttribute("aria-pressed", String(!catalog.seasonOnly));
    const allCountEl = allToggle.querySelector(".chip-count");
    if (allCountEl) allCountEl.textContent = PLANTS.length;
  }
  if (easy) {
    easy.classList.toggle("active", catalog.easyOnly);
    easy.setAttribute("aria-pressed", String(catalog.easyOnly));
    const easyBase = catalog.seasonOnly ? seminabili() : PLANTS;
    const easyCount = easyBase.filter((p) => EASY_IDS.has(p.id)).length;
    const easyCountEl = easy.querySelector(".chip-count");
    if (easyCountEl) easyCountEl.textContent = easyCount;
  }
  const anyExtra =
    catalog.search ||
    catalog.type ||
    catalog.easyOnly ||
    !catalog.seasonOnly ||
    catalog.sort !== "season";
  const resetBtn = document.getElementById("catalogReset");
  if (resetBtn) resetBtn.hidden = !anyExtra;
}
// Aggiorna il testo di ricerca usato per filtrare le colture del catalogo.
function setCatalogSearch(value) {
  catalog.search = value;
  render();
  updateCatalogSearchSuggestions();
}
// Nasconde i suggerimenti della ricerca quando il campo non è più attivo.
function hideCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (list) {
    list.hidden = true;
    list.innerHTML = "";
  }
  if (input) input.setAttribute("aria-expanded", "false");
}
// Applica un suggerimento selezionato al campo di ricerca del catalogo.
function selectCatalogSearchSuggestion(name) {
  catalog.search = name;
  const input = document.getElementById("catalogSearch");
  if (input) input.value = name;
  render();
  hideCatalogSearchSuggestions();
}
// Genera i suggerimenti coerenti con il testo inserito nella ricerca catalogo.
function updateCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (!list || !input) return;
  const term = normalizeSearch(catalog.search);
  if (!term) {
    hideCatalogSearchSuggestions();
    return;
  }
  const seen = new Set();
  const names = [];
  for (const p of PLANTS) {
    const name = plantName(p.id);
    const key = normalizeSearch(name);
    if (!key.includes(term) || seen.has(key)) continue;
    seen.add(key);
    names.push(name);
    if (names.length >= 8) break;
  }
  if (!names.length) {
    hideCatalogSearchSuggestions();
    return;
  }
  list.innerHTML = names
    .map(
      (name) =>
        `<li role="option"><button type="button" data-name="${escapeHtml(name)}">${escapeHtml(name)}</button></li>`,
    )
    .join("");
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
}
(function setupCatalogSearchSuggestionsClick() {
  document.addEventListener("mousedown", (e) => {
    const btn = e.target.closest("#catalogSearchSuggestions button[data-name]");
    if (!btn) return;
    selectCatalogSearchSuggestion(btn.dataset.name);
  });
})();
(function setupDisabledImportGuard() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("#confImportBtn.disabled");
    if (!link) return;
    e.preventDefault();
  });
})();
// Cancella il testo di ricerca e ripristina i risultati del catalogo.
function clearCatalogSearch() {
  catalog.search = "";
  const input = document.getElementById("catalogSearch");
  if (input) {
    input.value = "";
    input.focus({ preventScroll: true });
  }
  render();
}
// Rimuove un filtro attivo dal catalogo e aggiorna l'elenco risultante.
function removeCatalogFilter(kind) {
  if (kind === "scope") catalog.seasonOnly = true;
  else if (kind === "search") {
    catalog.search = "";
    const input = document.getElementById("catalogSearch");
    if (input) input.value = "";
  } else if (kind === "type") catalog.type = "";
  else if (kind === "easy") catalog.easyOnly = false;
  else if (kind === "sort") catalog.sort = "season";
  render();
}
// Imposta la categoria di colture usata come filtro del catalogo.
function setCatalogType(value) {
  catalog.type = value;
  render();
}
// Attiva o disattiva il filtro delle colture adatte al mese selezionato.
function toggleCatalogSeasonOnly() {
  catalog.seasonOnly = !catalog.seasonOnly;
  render();
}
// Attiva o disattiva la visualizzazione completa delle colture disponibili.
function toggleCatalogFull() {
  catalog.seasonOnly = false;
  render();
}
// Attiva o disattiva il filtro delle colture consigliate ai principianti.
function toggleCatalogEasyOnly() {
  catalog.easyOnly = !catalog.easyOnly;
  catalog.easyOnlyTouched = true;
  render();
}
// Imposta il criterio con cui ordinare le colture mostrate nel catalogo.
function setCatalogSort(value) {
  catalog.sort = value || "season";
  render();
}
// Imposta la categoria evidenziata nella barra rapida del catalogo.
function setCatalogCategory(type) {
  catalog.type = type || "";
  render();
}
// Genera la barra orizzontale delle categorie disponibili nel catalogo.
function renderCatalogCategoryRail(base) {
  const rail = document.getElementById("catalogCategoryRail");
  if (!rail) return;
  const categories = [
    { type: "", count: base.length, icon: "🌿", label: t("catalog.type_all") },
  ].concat(
    catalogTypeCounts(base).map(({ type, count }) => ({
      type,
      count,
      icon:
        {
          frutto: "🍅",
          foglia: "🥬",
          radice: "🥕",
          legume: "🫘",
          aromatica: "🌿",
        }[type] || "🌱",
      label: typeLabel(type),
    })),
  );
  rail.innerHTML = categories
    .map(
      (
        cat,
      ) => `<button class="catalog-category-chip${catalog.type === cat.type ? " active" : ""}" type="button" data-home-action="set-catalog-category" data-category="${cat.type}" aria-pressed="${catalog.type === cat.type}">
    <span class="category-ico" aria-hidden="true">${cat.icon}</span>
    <span class="category-label">${cat.label}</span>
    <span class="category-count">${cat.count}</span>
  </button>`,
    )
    .join("");
}
// Aggiorna i dati di sintesi relativi ai risultati del catalogo filtrato.
function renderCatalogInsights(plants, base) {
  const box = document.getElementById("catalogInsights");
  if (!box) return;
  const cartCount = cart.length;
  const fastCount = plants.filter((p) => p.gg && p.gg <= 45).length;
  const compactCount = plants.filter((p) => plantDistanceValue(p) <= 25).length;
  const seasonalCount = base.filter((p) =>
    effectiveMonths(p).has(state.mese),
  ).length;
  box.innerHTML = `
    <span><b>${plants.length}</b> ${t("catalog.results")}</span>
    <span><b>${seasonalCount}</b> ${t("catalog.insight_seasonal")}</span>
    <span><b>${fastCount}</b> ${t("catalog.insight_fast")}</span>
    <span><b>${compactCount}</b> ${t("catalog.insight_compact")}</span>
    <span><b>${cartCount}</b> ${t("catalog.insight_cart")}</span>`;
}
// Passa alla visualizzazione completa del catalogo rimuovendo i limiti iniziali.
function showFullCatalog() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.seasonOnly = false;
  catalog.sort = "season";
  const input = document.getElementById("catalogSearch");
  if (input) input.value = "";
  hideCatalogSearchSuggestions();
  render();
}
// Ripristina il catalogo consigliato, senza lasciare filtri nascosti.
function resetCatalogFilters() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.easyOnlyTouched = false;
  catalog.seasonOnly = true;
  catalog.sort = "season";
  const input = document.getElementById("catalogSearch");
  if (input) input.value = "";
  hideCatalogSearchSuggestions();
  render();
}

// Preferenze utente
function savePrefs() {
  if (window.SerraCart) window.SerraCart.scrivi(cart);
  else localStorage.setItem("ois.cart", JSON.stringify(cart));
  localStorage.setItem(
    "ois.prefs",
    JSON.stringify({
      zona: state.zona,
      riscaldata: state.riscaldata,
      climatePreferenceTouched: catalog.climatePreferenceTouched,
      mese: state.mese,
      easyOnly: catalog.easyOnly,
      easyOnlyTouched: catalog.easyOnlyTouched,
    }),
  );
}
// Trasferisce le preferenze del catalogo alla configurazione condivisa.
function syncCatalogClimateToSharedConfig() {
  try {
    const existing =
      JSON.parse(localStorage.getItem("serra.config.v1") || "{}") || {};
    localStorage.setItem(
      "serra.config.v1",
      JSON.stringify({
        ...existing,
        zona: state.zona,
        riscaldata: state.riscaldata,
      }),
    );
  } catch (_) {}
}

// Carica le preferenze di catalogo e configurazione salvate nel browser.
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem("ois.prefs") || "{}");
    if (p.zona) state.zona = p.zona;
    // Le preferenze delle versioni precedenti non possono accendere il riscaldamento di default.
    if (p.climatePreferenceTouched === true) {
      state.riscaldata = Boolean(p.riscaldata);
      catalog.climatePreferenceTouched = true;
    }
    // La configurazione condivisa non imposta più il filtro iniziale del catalogo: il comportamento predefinito resta sempre “spento”.
    try {
      const shared = JSON.parse(
        localStorage.getItem("serra.config.v1") || "null",
      );
      if (shared?.zona) state.zona = shared.zona;
      // Mantiene disattivato il filtro iniziale delle colture facili.
      if (p.easyOnlyTouched) {
        catalog.easyOnly = Boolean(p.easyOnly);
      }
    } catch (_) {}
    cart = window.SerraCart
      ? window.SerraCart.leggi()
      : JSON.parse(localStorage.getItem("ois.cart") || "[]").map((i) =>
          typeof i === "string" ? { id: i, bustine: 1 } : i,
        );
  } catch (_) {}
}

// Testi localizzati

// -----------------------------------------------------------------------------
// Home — Traduzioni della home, selezione lingua e consenso cookie. Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

const NOMI_MESI_RO = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];
const ABBR_MESI_RO = [
  "Ian",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Iun",
  "Iul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const STAGIONE_QUOTE_RO = {
  1: "Planifică cu grijă, pământul așteaptă răbdător.",
  2: "Februarie înșală: înăuntrul serei viața renaște.",
  3: "Martie zboară — seamănă acum, culege peste luni.",
  4: "Aprilie e inima grădinii: totul poate porni.",
  5: "Mai abundent: fă loc pentru tot ce crește.",
  6: "Vara a sosit. Udă, taie, savurează.",
  7: "Iulie arde — umbra serei e un dar.",
  8: "Sfârșitul verii: gândește-te deja la toamnă.",
  9: "Septembrie e noul martie: ciclul reîncepe.",
  10: "Octombrie dulce: rădăcinile și bulbii prind formă.",
  11: "Noiembrie încetinește totul — dar nu și sera.",
  12: "Decembrie rece, dar înăuntru crește încă ceva.",
};
const HERO_KICKER_RO = {
  inverno: "❄️ Seră rece activă",
  primavera: "🌸 Sezon în floare",
  estate: "🌞 Vară deplină în seră",
  autunno: "🍂 Recoltă de toamnă",
};
const TIP_MESE_RO = {
  1: "Pregătește solul și verifică acoperișul: e momentul de planificat.",
  2: "Începe să semeni roșii în răsadniță pentru a le transplanta în aprilie.",
  3: "Tratează preventiv cu cupru lichid împotriva bolilor fungice.",
  4: "Instalează plase anti-afide: prevenția e mai bună decât tratamentul.",
  5: "Elimină lăstarii laterali de la roșii în fiecare săptămână.",
  6: "Udă la bază, niciodată pe frunze: previne oidiumul.",
  7: "Mulcește cu paie pentru a reține umiditatea solului.",
  8: "Seamănă imediat cicoarea și salata pentru recoltele de toamnă.",
  9: "Plantează căței de usturoi: vor fi gata în iunie.",
  10: "Scoate plantele epuizate și adaugă compost pentru anul următor.",
  11: "Protejează aromaticele perene cu un strat de mulci.",
  12: "Planifică rotația culturilor: nu pune aceeași familie în același loc.",
};

const NOMI_MESI_IT = [...NOMI_MESI];
const ABBR_MESI_IT = [...ABBR_MESI];
const STAGIONE_QUOTE_IT = { ...STAGIONE_QUOTE };
const HERO_KICKER_IT = { ...HERO_KICKER };
const TIP_MESE_IT = { ...TIP_MESE };

const PLANT_RO = window.SERRA_I18N?.plants?.ro || {};
const T = window.SERRA_I18N?.index || { it: {}, ro: {} };

let currentLang = "it";

function normalizeLang(lang) {
  return lang === "ro" || lang === "it" ? lang : "it";
}

// Gestisce t
function t(key) {
  return (T[currentLang] || {})[key] || T.it[key] || key;
}

// Applicazione lingua
function applyLang(lang) {
  lang = normalizeLang(lang);
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t("page.title");
  document.querySelectorAll("[data-lang-select]").forEach((sel) => {
    sel.value = lang;
  });

  if (lang === "ro") {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_RO);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_RO);
    Object.keys(STAGIONE_QUOTE_RO).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_RO[k]),
    );
    Object.keys(HERO_KICKER_RO).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_RO[k]),
    );
    Object.keys(TIP_MESE_RO).forEach((k) => (TIP_MESE[k] = TIP_MESE_RO[k]));
  } else {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_IT);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_IT);
    Object.keys(STAGIONE_QUOTE_IT).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_IT[k]),
    );
    Object.keys(HERO_KICKER_IT).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_IT[k]),
    );
    Object.keys(TIP_MESE_IT).forEach((k) => (TIP_MESE[k] = TIP_MESE_IT[k]));
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val.includes("<") || val.includes("&")) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });

  localStorage.setItem("ois.lang", lang);
  // Il pulsante profilo mostra lo stato di accesso, non una voce tradotta.
  window.SerraAPI?.updateNavbarUser?.();
  render();
  if (
    currentDetail &&
    document.getElementById("detailOverlay")?.classList.contains("open")
  ) {
    openDetail(currentDetail, true);
  }
}

// Applica la lingua scelta alla pagina e la memorizza nelle preferenze locali.
function setLang(lang) {
  applyLang(normalizeLang(lang));
}

window.addEventListener("storage", (event) => {
  if (event.key !== "ois.lang") return;
  const nextLang = normalizeLang(event.newValue);
  if (nextLang === currentLang) return;
  applyLang(nextLang);
});

// Cookie e navigazione
function initCookieBanner() {
  if (localStorage.getItem("ois.cookie")) return;
  setTimeout(() => {
    const b = document.getElementById("cookieBanner");
    if (b) b.classList.add("visible");
  }, 1400);
}
// Accetta i cookie
function acceptCookies() {
  localStorage.setItem("ois.cookie", "accepted");
  document.getElementById("cookieBanner").classList.remove("visible");
}
// Rifiuta i cookie
function rejectCookies() {
  localStorage.setItem("ois.cookie", "essential");
  document.getElementById("cookieBanner").classList.remove("visible");
}

window.addEventListener(
  "scroll",

  // -----------------------------------------------------------------------------
  // Home — Animazione della serra dimostrativa e ciclo visivo dell'hero. Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
  // -----------------------------------------------------------------------------

  function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    const mobile = window.matchMedia("(max-width: 660px)").matches;
    btn.classList.toggle("visible", window.scrollY > (mobile ? 1800 : 420));
    syncMobileCatalogDock();
  },
  { passive: true },
);

(async () => {
  // Bootstrap del catalogo piante: logica condivisa in assets/js/api.js
  await window.SerraAPI.bootstrapPlants();

  loadPrefs();
  if (new URLSearchParams(window.location.search).get("catalog") === "all") {
    toggleCatalogFull();
  }
  if (
    new URLSearchParams(window.location.search).get("from") === "configuratore"
  ) {
    history.replaceState(null, "", window.location.pathname);
    setTimeout(openCart, 320);
  }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) window.scrollTo(0, 0);
  const _initLang = localStorage.getItem("ois.lang") || "it";
  if (_initLang !== "it") {
    applyLang(_initLang);
  } else {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val.includes("<") || val.includes("&")) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute(
        "placeholder",
        t(el.getAttribute("data-i18n-placeholder")),
      );
    });
    render();
  }
  initCookieBanner();
  // Mostra il contenuto dopo la sincronizzazione della lingua.
  document.documentElement.classList.remove("serra-i18n-pending");
})();

/* Apertura diretta del carrello da un'altra pagina: le sezioni senza pannello proprio (Il mio orto) rimandano qui con ?cart=open. */
(() => {
  if (new URLSearchParams(location.search).get("cart") !== "open") return;
  const apri = () => {
    if (typeof openCart === "function") openCart();
    history.replaceState(null, "", location.pathname + location.hash);
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => setTimeout(apri, 300));
  else setTimeout(apri, 300);
})();

// Scroll con offset
function scrollElementBelowNav(target, behavior = "smooth") {
  if (!target) return;
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
      "76",
    10,
  );
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - navH - 28,
  );
  const partenza = window.scrollY;
  window.scrollTo({ top, behavior });

  window.setTimeout(() => {
    const fermo = Math.abs(window.scrollY - partenza) < 2;
    const nonArrivato = Math.abs(window.scrollY - top) > 2;
    if (!fermo || !nonArrivato) return;
    try {
      window.scrollTo({ top, behavior: "instant" });
    } catch (_) {
      document.documentElement.scrollTop = top;
    }
    if (Math.abs(window.scrollY - top) > 2) {
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    }
  }, 260);
}

// Scorrimento morbido generico per tutti i link di navigazione della homepage
document
  .querySelectorAll(
    'a[href^="#"]:not([href="#"]):not([href="#catalogSearch"]), a[href^="index.html#"]:not([href="index.html#"])',
  )
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (!hash) return;
      let target = document.getElementById(hash.slice(1));
      if (!target) return;
      const kicker = target.querySelector(".section-kicker, .stagione-kicker");
      if (kicker) target = kicker;
      e.preventDefault();
      history.replaceState(null, "", hash);
      scrollElementBelowNav(target);
    });
  });

(function () {
  const searchLabel = document.querySelector(".catalog-search--pro");
  const searchInput = document.getElementById("catalogSearch");
  if (!searchLabel || !searchInput) return;

  // Richiama l'attenzione sulla ricerca
  function triggerSearchAttention(focus) {
    searchLabel.classList.add("catalog-search--attention");
    searchLabel.addEventListener("animationend", function handler() {
      searchLabel.classList.remove("catalog-search--attention");
      searchLabel.removeEventListener("animationend", handler);
    });
    if (focus && window.innerWidth > 660) {
      searchInput.focus({ preventScroll: true });
    }
  }

  var searchObserver = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        setTimeout(function () {
          triggerSearchAttention(true);
        }, 300);
        searchObserver.disconnect();
      }
    },
    { threshold: 0.85 },
  );

  searchObserver.observe(searchLabel);

  var catalogLink = document.querySelector(".hero-cfg-catalog-link");
  if (catalogLink) {
    catalogLink.addEventListener("click", function () {
      setTimeout(function () {
        triggerSearchAttention(true);
      }, 600);
    });
  }
})();

const initialSectionHash = window.location.hash;
const initialSectionTargets = {
  "#stagione":
    document.querySelector("#stagione .stagione-kicker") ||
    document.getElementById("stagione"),
  "#abbinamenti": document.getElementById("abbinamenti"),
  "#kit": document.getElementById("kit"),
  "#contatti": document.getElementById("contatti"),
};
const initialSectionTarget = initialSectionTargets[initialSectionHash];
if (initialSectionTarget) {
  window.setTimeout(() => {
    scrollElementBelowNav(initialSectionTarget, "auto");
  }, 80);
}

const catalogSearchLink = document.querySelector(
  '.catalog-pro-primary-action[href="#catalogSearch"]',
);
if (catalogSearchLink) {
  catalogSearchLink.addEventListener("click", (e) => {
    const input = document.getElementById("catalogSearch");
    const target = input?.closest(".catalog-search--pro") || input;
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, "", "#catalogSearch");
    scrollElementBelowNav(target);
    window.setTimeout(() => input?.focus({ preventScroll: true }), 350);
  });
}

// Animazione serra
(function initGreenhouseAnim() {
  const svg = document.getElementById("hcgSvg");
  const peek = document.getElementById("hcgPeek");
  const inner = document.getElementById("hcgPeekInner");
  if (!svg || !peek || !inner) return;

  const EMOJI_MAP = {
    pomodoro: "🍅",
    carota: "🥕",
    lattuga: "🥬",
    basilico: "🌿",
  };
  const QTY_MAP = { pomodoro: 4, carota: 6, lattuga: 6, basilico: 12 };
  const PLANT_IDS = ["pomodoro", "carota", "lattuga", "basilico"];
  const plantById = Object.fromEntries(
    (window.PLANTS || []).map((p) => [p.id, p]),
  );
  const PLANTS = PLANT_IDS.map((id) => ({
    ...plantById[id],
    emoji: EMOJI_MAP[id],
    qty: QTY_MAP[id],
  })).filter((p) => p.id);

  const BEDS = [
    { p: PLANTS[0], x: 20, y: 19, w: 75, h: 56, cols: 2, rows: 2, r: 11 },
    { p: PLANTS[1], x: 20, y: 82, w: 75, h: 59, cols: 2, rows: 3, r: 9 },
    { p: PLANTS[2], x: 111, y: 19, w: 89, h: 43, cols: 3, rows: 2, r: 8 },
    { p: PLANTS[3], x: 111, y: 69, w: 89, h: 72, cols: 3, rows: 4, r: 7 },
  ];

  // Calcola le posizioni delle piante nell'aiuola
  function bedPlantPositions(bed) {
    const pts = [];
    const insetX = Math.min(12, bed.w * 0.16);
    const insetY = Math.min(11, bed.h * 0.17);
    const usableW = Math.max(0, bed.w - insetX * 2);
    const usableH = Math.max(0, bed.h - insetY * 2);
    const spacingBoost = 0.35;
    for (let row = 0; row < bed.rows; row++) {
      for (let col = 0; col < bed.cols; col++) {
        const baseX = (bed.w * (col + 1)) / (bed.cols + 1);
        const baseY = (bed.h * (row + 1)) / (bed.rows + 1);
        const expandedX =
          bed.cols === 1
            ? bed.w / 2
            : insetX + (usableW * col) / (bed.cols - 1);
        const expandedY =
          bed.rows === 1
            ? bed.h / 2
            : insetY + (usableH * row) / (bed.rows - 1);
        pts.push({
          cx: bed.x + baseX + (expandedX - baseX) * spacingBoost,
          cy: bed.y + baseY + (expandedY - baseY) * spacingBoost,
        });
      }
    }
    return pts;
  }

  // Genera numeri casuali deterministici
  function makeRng(seed) {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    };
  }
  const _shade = "rgba(0,0,0,.13)";
  const _laterPlantSvgIds = new Set([
    "broccolo_romanesco",
    "friggitello",
    "agretti",
    "borragine",
    "catalogna",
    "acetosa",
    "leurda",
    "melissa",
    "cerfoglio",
    "cimbru",
  ]);
  // Verifica se mostrare l'icona di raccolta
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
    ]).has(plant.id);
  }
  // Genera la forma foglia semplice
  function _leafPath(len, wid) {
    return `M0 0 C ${wid} ${-len * 0.16},${wid * 0.55} ${-len * 0.85},0 ${-len} C ${-wid * 0.55} ${-len * 0.85},${-wid} ${-len * 0.16},0 0 Z`;
  }
  // Genera la forma foglia lobata
  function _lobedLeafPath(len, wid) {
    return `M0 0 Q ${wid * 0.4} ${-len * 0.1} ${wid * 0.5} ${-len * 0.25} Q ${wid * 0.15} ${-len * 0.3} ${wid * 0.55} ${-len * 0.45} Q ${wid * 0.1} ${-len * 0.5} ${wid * 0.45} ${-len * 0.7} Q ${wid * 0.05} ${-len * 0.75} 0 ${-len} Q ${-wid * 0.05} ${-len * 0.75} ${-wid * 0.45} ${-len * 0.7} Q ${-wid * 0.1} ${-len * 0.5} ${-wid * 0.55} ${-len * 0.45} Q ${-wid * 0.15} ${-len * 0.3} ${-wid * 0.5} ${-len * 0.25} Q ${-wid * 0.4} ${-len * 0.1} 0 0 Z`;
  }
  // Disegna il glifo vegetale
  function glyph(plant, r, rng) {
    if (_laterPlantSvgIds.has(plant?.id)) {
      const size = r * 2;
      const src = window.serraAsset(`assets/img/svg/${plant.id}.svg`);
      return `<image href="${src}" x="${-r}" y="${-r}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>`;
    }
    const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
    const sh = `<ellipse cx="${r * 0.08}" cy="${r * 0.12}" rx="${r * 0.95}" ry="${r * 0.85}" fill="${_shade}"/>`;
    let s = "";
    switch (plant.arch) {
      case "rosetta": {
        s += sh;
        const N = 10 + Math.floor(rng() * 4);
        for (let ring = 0; ring < 2; ring++) {
          const f = ring ? 0.62 : 1,
            n = ring ? 7 : N;
          for (let i = 0; i < n; i++) {
            const a = (i / n) * 360 + (ring ? 20 : 0) + rng() * 14,
              len = r * f * (0.85 + rng() * 0.25),
              wid = len * 0.5;
            const col = ring ? c.l1 : i % 2 ? c.l2 : c.l1;
            s += `<g transform="rotate(${a})"><path d="${_leafPath(len, wid)}" fill="${col}"/><path d="M0 0 L0 ${-len * 0.9}" stroke="rgba(0,0,0,.10)" stroke-width="${len * 0.03}" fill="none"/></g>`;
          }
        }
        s += `<circle r="${r * 0.16}" fill="${c.fr || c.l1}"/>`;
        break;
      }
      case "frastagliata": {
        s += sh;
        const N = 9 + Math.floor(rng() * 4);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 20,
            len = r * (0.8 + rng() * 0.3),
            wid = len * 0.45;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        s += `<circle r="${r * 0.1}" fill="${c.l2}"/>`;
        break;
      }
      case "cespuglio": {
        s += sh;
        const N = 14 + Math.floor(rng() * 6);
        for (let i = 0; i < N; i++) {
          const a = rng() * 360,
            dist = rng() * r * 0.55,
            len = r * (0.4 + rng() * 0.3),
            wid = len * 0.62;
          const x = Math.cos((a * Math.PI) / 180) * dist,
            y = Math.sin((a * Math.PI) / 180) * dist;
          s += `<g transform="translate(${x} ${y}) rotate(${rng() * 360})"><path d="${_leafPath(len, wid)}" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
        }
        break;
      }
      case "frutto": {
        s += sh;
        const N = 8 + Math.floor(rng() * 3);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 16,
            len = r * (0.9 + rng() * 0.2),
            wid = len * 0.5;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        const fr = c.fr || "#e2452f",
          nf = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < nf; i++) {
          const a = rng() * 360,
            dist = r * (0.2 + rng() * 0.4),
            x = Math.cos(a) * dist,
            y = Math.sin(a) * dist,
            fr2 = r * 0.17 * (0.8 + rng() * 0.4);
          s += `<circle cx="${x}" cy="${y}" r="${fr2}" fill="${fr}"/><circle cx="${x - fr2 * 0.3}" cy="${y - fr2 * 0.3}" r="${fr2 * 0.35}" fill="rgba(255,255,255,.5)"/>`;
        }
        break;
      }
      case "piumosa": {
        s += `<ellipse cx="${r * 0.06}" cy="${r * 0.1}" rx="${r * 0.8}" ry="${r * 0.75}" fill="${_shade}"/>`;
        const N = 7 + Math.floor(rng() * 4);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 20,
            len = r * (0.8 + rng() * 0.3);
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
      default: {
        s += sh;
        const N = 9 + Math.floor(rng() * 3);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 14,
            len = r * (0.82 + rng() * 0.22),
            wid = len * 0.52;
          s += `<g transform="rotate(${a})"><path d="${_leafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        s += `<circle r="${r * 0.13}" fill="${c.l1}"/>`;
      }
    }
    return `<g>${s}</g>`;
  }

  // Costruisce la mappa dimostrativa
  function buildMap() {
    let defs = `<defs>
      <radialGradient id="harvestRed" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ff9a82"/><stop offset=".28" stop-color="#e84e3d"/><stop offset=".72" stop-color="#b52e2b"/><stop offset="1" stop-color="#651f25"/></radialGradient>
      <radialGradient id="harvestGreen" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#b9db75"/><stop offset=".3" stop-color="#6fa34d"/><stop offset=".72" stop-color="#3f743b"/><stop offset="1" stop-color="#21472d"/></radialGradient>
      <radialGradient id="harvestOrange" cx="30%" cy="22%" r="80%"><stop offset="0" stop-color="#ffd06c"/><stop offset=".32" stop-color="#ed8a35"/><stop offset=".74" stop-color="#bd5528"/><stop offset="1" stop-color="#74301f"/></radialGradient>
      <linearGradient id="hcgSoil" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#795b3e"/><stop offset=".62" stop-color="#5d422d"/><stop offset="1" stop-color="#442d1e"/></linearGradient>
      <linearGradient id="hcgDirt" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9a7446"/><stop offset="1" stop-color="#684827"/></linearGradient>
      <linearGradient id="hcgPathBase" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#817866"/><stop offset=".16" stop-color="#c9c0a7"/><stop offset=".52" stop-color="#e0d7bd"/><stop offset=".84" stop-color="#b8af97"/><stop offset="1" stop-color="#756c5a"/></linearGradient>
      <clipPath id="hcgInteriorClip"><rect x="14" y="12" width="192" height="136" rx="5.5"/></clipPath>
      <pattern id="hcgGrass" width="15" height="15" patternUnits="userSpaceOnUse"><rect width="15" height="15" fill="#1d4d30"/><path d="M2 14L4 8M9 14l1-5M13 14l-2-3" stroke="#4f843c" stroke-width=".7" opacity=".7"/></pattern>
      <pattern id="hcgGravel" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#aaa28d"/><circle cx="3" cy="3" r="1.2" fill="#ded7c2"/><circle cx="9" cy="7" r="1.3" fill="#817967"/><circle cx="5" cy="10" r=".9" fill="#c3bba4"/></pattern>
      <pattern id="hcgSoilSpecks" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r=".9" fill="rgba(230,202,158,.2)"/><circle cx="12" cy="9" r="1.15" fill="rgba(31,20,12,.22)"/><circle cx="8" cy="15" r=".65" fill="rgba(238,214,170,.14)"/></pattern>`;
    defs += `</defs>`;
    let s = `<rect width="220" height="160" fill="url(#hcgGrass)"/>`;
    s += `<rect x="13" y="14" width="194" height="137" rx="10" fill="#102719" opacity=".3"/>`;
    s += `<rect x="10" y="8" width="200" height="144" rx="10" fill="#657779" stroke="#183b3e" stroke-width="3.4"/>`;
    s += `<rect x="11.6" y="9.6" width="196.8" height="140.8" rx="8.4" fill="none" stroke="rgba(244,253,252,.9)" stroke-width="1.15"/>`;
    s += `<rect x="13.5" y="11.5" width="193" height="137" rx="6.5" fill="#3a2710" stroke="rgba(35,66,67,.88)" stroke-width="1.2"/>`;
    s += `<g clip-path="url(#hcgInteriorClip)">`;
    s += `<rect x="14" y="12" width="192" height="136" fill="url(#hcgDirt)"/>`;
    // Camminamento: bordo leggermente incassato, ghiaia con profondità e ciottoli irregolari, distinto dal terreno senza creare recinti.
    s += `<rect x="95.8" y="12" width="14.4" height="136" fill="rgba(47,33,19,.3)"/>`;
    s += `<rect x="97" y="12" width="12" height="136" fill="url(#hcgPathBase)"/>`;
    s += `<rect x="97.7" y="12" width="10.6" height="136" fill="url(#hcgGravel)" opacity=".8"/>`;
    s += `<path d="M98.2 13V147 M107.8 13V147" fill="none" stroke="rgba(255,255,242,.42)" stroke-width=".55"/>`;
    BEDS.forEach((b) => {
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#hcgSoil)"/>`;
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#hcgSoilSpecks)" opacity=".62"/>`;
      s += bedDimensions(b);
    });
    s += `</g>`;
    svg.innerHTML = defs + s;
  }

  const CM_PER_UNIT = 2;
  const roundTen = (units) => Math.round((units * CM_PER_UNIT) / 10) * 10;

  function bedDimensions(bed) {
    const inset = 3.4;
    /* Le quote sono un dettaglio, non un contenuto: chi guarda deve capire che la serra è misurata, non leggere i numeri. */
    const size = Math.max(5.4, Math.min(7.2, Math.min(bed.w, bed.h) * 0.105));
    const line = "rgba(243,247,236,.34)";
    const fill = "rgba(240,246,232,.62)";
    const halo = 'stroke="rgba(24,43,29,.34)" stroke-width="1.2"';
    const font = `font-family="DM Sans,sans-serif" font-size="${size}" font-weight="800" fill="${fill}" paint-order="stroke" ${halo} stroke-linejoin="round"`;

    const x1 = bed.x + inset;
    const x2 = bed.x + bed.w - inset;
    const yBase = bed.y + bed.h - inset;
    const cx = bed.x + bed.w / 2;

    const vx = bed.x + bed.w - inset;
    const y1 = bed.y + inset;
    const y2 = bed.y + bed.h - inset;
    const cy = bed.y + bed.h / 2;

    let g = `<g pointer-events="none">`;
    // Larghezza, sul lato orizzontale.
    g += `<line x1="${x1}" y1="${yBase}" x2="${x2}" y2="${yBase}" stroke="${line}" stroke-width=".55"/>`;
    g += `<line x1="${x1}" y1="${yBase - 2.6}" x2="${x1}" y2="${yBase + 2.6}" stroke="${line}" stroke-width=".55"/>`;
    g += `<line x1="${x2}" y1="${yBase - 2.6}" x2="${x2}" y2="${yBase + 2.6}" stroke="${line}" stroke-width=".55"/>`;
    g += `<text x="${cx}" y="${yBase - 2.2}" text-anchor="middle" ${font}>${roundTen(bed.w)} cm</text>`;
    // Profondità, sul lato verticale.
    g += `<line x1="${vx}" y1="${y1}" x2="${vx}" y2="${y2}" stroke="${line}" stroke-width=".55"/>`;
    g += `<line x1="${vx - 2.6}" y1="${y1}" x2="${vx + 2.6}" y2="${y1}" stroke="${line}" stroke-width=".55"/>`;
    g += `<line x1="${vx - 2.6}" y1="${y2}" x2="${vx + 2.6}" y2="${y2}" stroke="${line}" stroke-width=".55"/>`;
    g += `<text x="${vx - 2.2}" y="${cy}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${vx - 2.2} ${cy})" ${font}>${roundTen(bed.h)} cm</text>`;
    g += `</g>`;
    return g;
  }

  // Aggiunge una pianta alla mappa
  function addPlant(cx, cy, plant, r, seed, immediate = false) {
    const rng = makeRng(seed);
    const visualR = r;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    // Il punto resta fissato nello spazio della serra: a crescere è soltanto il contenuto interno, mai la posizione della pianta.
    g.setAttribute("transform", `translate(${cx} ${cy})`);
    g.style.opacity = immediate ? "1" : "0";
    g.style.transition = immediate ? "none" : "opacity 0.22s ease";
    const label =
      r >= 9 && shouldShowHarvestVector(plant)
        ? `<text class="hcg-harvest-reveal" y="${-visualR * 0.28}" text-anchor="middle" dominant-baseline="central" font-size="${Math.max(visualR * 1.2, 8) * 0.8}" style="pointer-events:none;user-select:none;font-family:system-ui">${plant.emoji}</text>`
        : "";
    g.innerHTML = `<g class="hcg-plant-grow">
      <ellipse class="hcg-plant-soil-bloom" cx="0" cy="${visualR * 0.1}" rx="${visualR * 0.64}" ry="${visualR * 0.24}"/>
      ${glyph(plant, visualR, rng)}
      <path class="hcg-plant-leaf-sheen" d="M${-visualR * 0.3} ${-visualR * 0.08} Q0 ${-visualR * 0.42} ${visualR * 0.28} ${-visualR * 0.2}" stroke-width="${Math.max(0.45, visualR * 0.04)}"/>
      ${label}
    </g>`;
    svg.appendChild(g);
    if (immediate) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        g.style.opacity = "1";
      }),
    );
  }

  // Costruisce il pannello riepilogo
  function buildPanel() {
    inner.innerHTML = PLANTS.map(
      (p) =>
        `<div class="hcg-card">
        <span class="hcg-card-ico">${p.emoji}</span>
        <div class="hcg-card-info">
          <span class="hcg-card-name">${p.nome || p.name}</span>
          <span class="hcg-card-meta">${p.sole === "pieno" ? "☀️" : "🌤️"} · ${p.gg} gg</span>
        </div>
        <span class="hcg-card-qty">${p.qty} pz</span>
      </div>`,
    ).join("");
  }

  let timers = [];
  // Registra un timer animazione
  function t(fn, ms) {
    timers.push(setTimeout(fn, ms));
  }
  // Pulisce i timer animazione
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  // Avvia il ciclo animato
  function runCycle() {
    clearTimers();
    buildMap();
    peek.classList.remove("hcg-peek--in");
    inner
      .querySelectorAll(".hcg-card")
      .forEach((c) => c.classList.remove("hcg-card--in"));

    let delay = 120;
    BEDS.forEach((bed, bi) => {
      const pts = bedPlantPositions(bed);

      const step = bed.p.id === "basilico" ? 75 : 120;
      pts.forEach((pt, pi) => {
        const d = delay;
        t(() => addPlant(pt.cx, pt.cy, bed.p, bed.r, bi * 100 + pi), d);
        delay += step;
      });
      delay += 60;
    });

    const panelIn = delay + 180;
    t(() => {
      peek.classList.add("hcg-peek--in");
      inner
        .querySelectorAll(".hcg-card")
        .forEach((c, i) =>
          setTimeout(() => c.classList.add("hcg-card--in"), i * 110),
        );
    }, panelIn);

    t(
      () => {
        peek.classList.remove("hcg-peek--in");
        inner
          .querySelectorAll(".hcg-card")
          .forEach((c) => c.classList.remove("hcg-card--in"));
        t(runCycle, 500);
      },
      panelIn + 600 + 2600,
    );
  }

  buildPanel();
  buildMap();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        runCycle();
      }
    },
    { threshold: 0.2 },
  );
  const container = document.querySelector(".hcg");
  if (container) observer.observe(container);
})();

// Pre-configurazione
(function () {
  // -----------------------------------------------------------------------------
  // Home — Pannello di preconfigurazione e trasferimento al configuratore. Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
  // -----------------------------------------------------------------------------

  const CONFIG_KEY = "serra.config.v1";

  // Legge la configurazione salvata
  function readSavedCfg() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
    } catch {
      return null;
    }
  }

  // Salva la pre-configurazione
  function savePreconfigToStorage() {
    const w = Math.min(
      12,
      Math.max(1, parseFloat(document.getElementById("pcW")?.value) || 3),
    );
    const l = Math.min(
      30,
      Math.max(1, parseFloat(document.getElementById("pcL")?.value) || 5),
    );
    const path = Math.min(
      120,
      Math.max(30, parseInt(document.getElementById("pcPathNum")?.value) || 60),
    );
    const zona = document.getElementById("pcZona")?.value ?? "temperato";
    const riscaldata = document.getElementById("pcRisc")?.value === "si";
    const mese =
      parseInt(document.getElementById("pcMese")?.value) ||
      new Date().getMonth() + 1;
    const existing = readSavedCfg() || {};
    const activePersona = document.querySelector(
      "#preconfigPersonaSection .pc-persona-card.is-active",
    );
    try {
      localStorage.setItem(
        CONFIG_KEY,
        JSON.stringify({
          ...existing,
          larghezza: w,
          lunghezza: l,
          path,
          zona,
          riscaldata,
          mese,
          livello:
            activePersona?.dataset.livello || existing.livello || "novizio",
        }),
      );
    } catch {}
    return { w, l, path, zona, riscaldata, mese };
  }

  // Inserisce la pre-configurazione anche nell'URL di ingresso.
  function buildPreconfigTargetUrl(targetUrl, config) {
    const url = new URL(targetUrl, location.href);
    url.searchParams.set("preconfig", "1");
    url.searchParams.set("w", String(config.w));
    url.searchParams.set("l", String(config.l));
    url.searchParams.set("path", String(config.path));
    url.searchParams.set("zona", config.zona);
    url.searchParams.set("risc", config.riscaldata ? "1" : "0");
    url.searchParams.set("mese", String(config.mese));
    return url.href;
  }

  // Allinea lo slider della pre-configurazione
  function syncPcSlider(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    if (input && slider) slider.value = input.value;
  }

  // Allinea l'input dallo slider
  function syncPcInputFromSlider(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);
    if (slider && input) input.value = slider.value;
  }

  // Allinea il camminamento pre-configurato
  function syncPcPath(source) {
    const slider = document.getElementById("pcPath");
    const num = document.getElementById("pcPathNum");
    if (!slider || !num) return;
    const raw = parseInt(source === "slider" ? slider.value : num.value) || 60;
    const snapped = Math.round(Math.min(120, Math.max(30, raw)) / 5) * 5;
    slider.value = snapped;
    num.value = snapped;
    updatePreconfigSummary();
  }

  // Aggiorna il riepilogo pre-configurazione
  function updatePreconfigSummary() {
    const el = document.getElementById("preconfigSummary");
    if (!el) return;
    const w = parseFloat(document.getElementById("pcW")?.value) || 3;
    const l = parseFloat(document.getElementById("pcL")?.value) || 5;
    const path = parseInt(document.getElementById("pcPathNum")?.value) || 60;
    const zona = document.getElementById("pcZona")?.value ?? "temperato";
    const heated = document.getElementById("pcRisc")?.value === "si";
    const mese =
      parseInt(document.getElementById("pcMese")?.value) ||
      new Date().getMonth() + 1;
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    const months =
      (window.SERRA_I18N &&
        window.SERRA_I18N.months &&
        window.SERRA_I18N.months[lang]) ||
      [];
    const monthName = months[mese - 1] || mese;
    const zonaLabel =
      pcT(
        "hero.zone_" +
          (zona === "freddo"
            ? "cold"
            : zona === "temperato"
              ? "temp"
              : "warm") +
          "_label",
      ) || zona;
    const heatedLabel = pcT("preconfig.serra_heated") || "🔥";
    const pathAbbr = pcT("preconfig.path_abbr");
    /* Il riepilogo elencava solo i quattro campi che hanno un valore di partenza, tacendo l'unico che manca davvero. */
    const scelto = document.querySelector(
      "#preconfigPersonaSection .pc-persona-card.is-active",
    );
    const livelloLabel = scelto
      ? scelto.querySelector(".pc-persona-body b")?.textContent.trim() || ""
      : pcT("preconfig.summary_missing") || "livello da scegliere";
    el.textContent = `${livelloLabel} · ${w}×${l} m · ${pathAbbr} ${path} cm · ${zonaLabel}${heated ? " · " + heatedLabel : ""} · ${monthName}`;
    el.classList.toggle("preconfig-summary--incompleto", !scelto);
  }

  // Allinea il selettore serra riscaldata
  function syncPcRiscSelect(heated) {
    const sel = document.getElementById("pcRisc");
    if (!sel) return;
    sel.value = heated ? "si" : "no";
    sel.classList.toggle("is-heated", Boolean(heated));
  }

  var PC_MONTHS = {
    it: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    ro: [
      "Ianuarie",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octombrie",
      "Noiembrie",
      "Decembrie",
    ],
  };

  // Popola i mesi della pre-configurazione
  function populatePcMonths() {
    const sel = document.getElementById("pcMese");
    if (!sel) return;
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    const months = PC_MONTHS[lang] || PC_MONTHS.it;
    const currentVal = sel.value;
    sel.innerHTML = "";
    months.forEach(function (m, i) {
      const opt = document.createElement("option");
      opt.value = i + 1;
      opt.textContent = m;
      sel.appendChild(opt);
    });
    if (currentVal) sel.value = currentVal;
  }

  var PC_TR = {
    it: {
      "preconfig.title": "La tua serra",
      "preconfig.tag": "Imposta i parametri",
      "preconfig.intro_note":
        "Un avvio rapido: bastano pochi dati per aprire il configuratore già pronto. Nulla è definitivo, potrai cambiare tutto in qualsiasi momento nella pagina successiva.",
      "preconfig.persona_label": "1. Che tipo di coltivatore sei?",
      "preconfig.summary_missing": "livello da scegliere",
      "preconfig.persona_badge": "Obbligatorio",
      "preconfig.sizes_label": "2. Misure interne",
      "preconfig.sizes_note":
        "Le dimensioni determinano quante aiuole e piante puoi coltivare.",
      "preconfig.width": "Larghezza",
      "preconfig.length": "Lunghezza",
      "preconfig.path_label": "Camminamento tra aiuole",
      "preconfig.path_label_short": "Camminamento",
      "preconfig.path_abbr": "cam.",
      "preconfig.climate_label": "3. Clima",
      "preconfig.zona_label": "Zona",
      "preconfig.serra_label": "Serra",
      "preconfig.serra_cold": "Fredda",
      "preconfig.serra_heated": "Riscaldata",
      "preconfig.month_label": "4. Mese di semina",
      "preconfig.cta": "Vai al configuratore",
      "preconfig.account_choice_title":
        "Vuoi riprendere la tua configurazione?",
      "preconfig.account_choice_text":
        "La configurazione attuale è già al sicuro. Puoi continuare senza modifiche oppure aggiornare i parametri della serra.",
      "preconfig.account_choice_continue": "Riprendi configurazione",
      "preconfig.account_choice_edit": "Modifica i parametri",
      "preconfig.cta_hint": "Scegli il tuo livello per continuare",
      "preconfig.cta_hint_sizes": "Controlla le misure della serra: ora {n}",
      "preconfig.sizes_badge_check": "Da controllare",
      "hero.cfg_levels_title": "Che tipo di coltivatore sei?",
      "hero.cfg_novizio": "Principiante",
      "hero.cfg_nov_hint": "Ti guido dalla prima scelta fino all'acquisto",
      "hero.cfg_intermedio": "Intermedio",
      "hero.cfg_int_hint": "Parti da un piano pronto e personalizzalo",
      "hero.cfg_esperto": "Esperto",
      "hero.cfg_exp_hint": "Scegli un layout pronto oppure componi liberamente",
      "hero.zone_cold_label": "Fredda",
      "hero.zone_temp_label": "Temperata",
      "hero.zone_warm_label": "Calda",
    },
    ro: {
      "preconfig.title": "Sera ta",
      "preconfig.tag": "Setează parametrii",
      "preconfig.intro_note":
        "Un început rapid: e nevoie doar de câteva date pentru a deschide configuratorul deja pregătit. Nimic nu este definitiv, poți schimba totul oricând pe pagina următoare.",
      "preconfig.persona_label": "1. Ce fel de cultivator ești?",
      "preconfig.summary_missing": "nivel de ales",
      "preconfig.persona_badge": "Obligatoriu",
      "preconfig.sizes_label": "2. Dimensiuni interne",
      "preconfig.sizes_note":
        "Dimensiunile determină câte parcele și plante poți cultiva.",
      "preconfig.width": "Lățime",
      "preconfig.length": "Lungime",
      "preconfig.path_label": "Cărare între parcele",
      "preconfig.path_label_short": "Cărare",
      "preconfig.path_abbr": "căr.",
      "preconfig.climate_label": "3. Climă",
      "preconfig.zona_label": "Zonă",
      "preconfig.serra_label": "Seră",
      "preconfig.serra_cold": "Rece",
      "preconfig.serra_heated": "Încălzită",
      "preconfig.month_label": "4. Luna de semănat",
      "preconfig.cta": "Mergi la configurator",
      "preconfig.account_choice_title": "Vrei să reiei configurarea?",
      "preconfig.account_choice_text":
        "Configurarea actuală este deja în siguranță. Poți continua fără modificări sau poți actualiza parametrii serei.",
      "preconfig.account_choice_continue": "Reia configurarea",
      "preconfig.account_choice_edit": "Modifică parametrii",
      "preconfig.cta_hint": "Alege-ți nivelul pentru a continua",
      "preconfig.cta_hint_sizes": "Verifică dimensiunile serei: acum {n}",
      "preconfig.sizes_badge_check": "De verificat",
      "hero.cfg_levels_title": "Ce fel de cultivator ești?",
      "hero.cfg_novizio": "Începător",
      "hero.cfg_nov_hint": "Te ghidez de la prima alegere până la cumpărare",
      "hero.cfg_intermedio": "Intermediar",
      "hero.cfg_int_hint": "Pornești de la un plan gata și îl personalizezi",
      "hero.cfg_esperto": "Expert",
      "hero.cfg_exp_hint": "Alege un plan gata sau compune liber",
      "hero.zone_cold_label": "Rece",
      "hero.zone_temp_label": "Temperată",
      "hero.zone_warm_label": "Caldă",
    },
  };

  // Traduce una chiave della pre-configurazione
  function pcT(key) {
    var lang = document.documentElement.lang === "ro" ? "ro" : "it";
    return (
      (PC_TR[lang] && PC_TR[lang][key]) || (PC_TR.it && PC_TR.it[key]) || key
    );
  }

  // Applica la lingua alla pre-configurazione
  function applyPreconfigLang() {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    overlay.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const val = pcT(key);
      if (val && val !== key) {
        if (val.indexOf("<") !== -1 || val.indexOf("&") !== -1)
          el.innerHTML = val;
        else el.textContent = val;
      }
    });
    populatePcMonths();
  }

  /* Vero solo quando le misure a schermo sono ancora il ripiego del pannello e l'utente non le ha toccate in questa sessione. */
  let misureToccate = false;
  function misureDaControllare() {
    if (misureToccate) return false;
    return !readSavedCfg();
  }
  function segnaMisureToccate() {
    if (misureToccate) return;
    misureToccate = true;
    updatePreconfigCta();
  }

  /* Porta lo sguardo sul passo 2 e lo fa notare una volta. */
  function richiamaMisure() {
    const campo = document.getElementById("preconfigSizesField");
    if (!campo) return;
    try {
      campo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } catch (_) {}
    campo.classList.remove("preconfig-persona-shake");
    void campo.offsetWidth;
    campo.classList.add("preconfig-persona-shake");
    campo.addEventListener(
      "animationend",
      () => campo.classList.remove("preconfig-persona-shake"),
      { once: true },
    );
  }

  // Aggiorna la CTA pre-configurazione
  function updatePreconfigCta() {
    const active = document.querySelector(
      "#preconfigPersonaSection .pc-persona-card.is-active",
    );
    const cta = document.getElementById("preconfigCta");
    if (!cta) return;

    const daControllare = misureDaControllare();
    const badge = document.getElementById("preconfigSizesBadge");
    if (badge) badge.hidden = !daControllare;

    const hint = document.getElementById("preconfigCtaHint");
    if (hint) {
      if (!active) {
        hint.textContent = pcT("preconfig.cta_hint") || "";
        hint.hidden = false;
      } else if (daControllare) {
        const w = document.getElementById("pcW")?.value ?? "";
        const l = document.getElementById("pcL")?.value ?? "";
        hint.textContent = (
          pcT("preconfig.cta_hint_sizes") || "Controlla le misure: ora {n}"
        ).replace("{n}", `${w}×${l} m`);
        hint.hidden = false;
      } else {
        hint.hidden = true;
      }
    }
    if (active) {
      const target = new URL(active.dataset.url, location.href);
      const source =
        document.getElementById("preconfigOverlay")?.dataset.source;
      if (source) target.searchParams.set("source", source);
      cta.href = target.href;
      cta.classList.remove("preconfig-cta--disabled");
      cta.removeAttribute("aria-disabled");
    } else {
      cta.href = "#";
      cta.classList.add("preconfig-cta--disabled");
      cta.setAttribute("aria-disabled", "true");
    }
  }

  // Apre la scheda pre-configurazione
  function openPreconfigSheet(targetUrl) {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    applyPreconfigLang();

    const saved = readSavedCfg();
    const w = saved?.larghezza ?? 3;
    const l = saved?.lunghezza ?? 5;
    const zona = saved?.zona ?? "temperato";
    const riscaldata = Boolean(saved?.riscaldata);
    // Ripristina il mese salvato o usa quello corrente.
    const mese = saved?.mese ?? new Date().getMonth() + 1;

    const path = saved?.path ?? 60;
    const pcW = document.getElementById("pcW");
    const pcL = document.getElementById("pcL");
    if (pcW) pcW.value = w;
    if (pcL) pcL.value = l;
    syncPcSlider("pcW", "pcWSlider");
    syncPcSlider("pcL", "pcLSlider");
    const pcPath = document.getElementById("pcPath");
    const pcPathNum = document.getElementById("pcPathNum");
    if (pcPath) pcPath.value = path;
    if (pcPathNum) pcPathNum.value = path;
    const pcZona = document.getElementById("pcZona");
    if (pcZona) pcZona.value = zona;
    syncPcRiscSelect(riscaldata);
    const pcMese = document.getElementById("pcMese");
    if (pcMese) pcMese.value = mese;
    updatePreconfigSummary();

    const target = new URL(targetUrl, location.href);
    const urlParams = target.searchParams;
    // Il pannello può essere aperto anche dall'area personale: conserva la provenienza senza duplicare la UI della home.
    overlay.dataset.source = urlParams.get("source") || "index";
    const isSafeResumeEntry =
      overlay.dataset.source === "account" || urlParams.get("resume") === "1";
    const accountChoice = document.getElementById("preconfigAccountChoice");
    const preconfigBody = overlay.querySelector(".preconfig-body");
    const preconfigFooter = overlay.querySelector(".preconfig-footer");
    if (accountChoice) accountChoice.hidden = !isSafeResumeEntry;
    if (preconfigBody) preconfigBody.hidden = isSafeResumeEntry;
    if (preconfigFooter) preconfigFooter.hidden = isSafeResumeEntry;
    const continueLink = document.getElementById("preconfigAccountContinue");
    if (continueLink) {
      continueLink.href = `configuratore.html?source=${encodeURIComponent(overlay.dataset.source)}`;
    }
    const livello = urlParams.get("livello");
    const validLevels = ["novizio", "intermedio", "esperto"];
    const selectedLivello = validLevels.includes(livello) ? livello : null;
    const personaSection = document.getElementById("preconfigPersonaSection");
    const hasLivello = Boolean(livello);

    if (personaSection) personaSection.hidden = hasLivello;

    document
      .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
      .forEach((btn) => {
        const isActive = btn.dataset.livello === selectedLivello;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

    const cta = document.getElementById("preconfigCta");
    if (cta && hasLivello) {
      cta.href = target.href;
      cta.classList.remove("preconfig-cta--disabled");
      cta.removeAttribute("aria-disabled");
    } else {
      updatePreconfigCta();
    }

    overlay.removeAttribute("hidden");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("is-open");

        setTimeout(function () {
          const dimsCard = overlay.querySelector(".preconfig-vfield--primary");
          if (!dimsCard) return;
          dimsCard.classList.remove("dims-attention");
          void dimsCard.offsetWidth;
          dimsCard.classList.add("dims-attention");
          dimsCard.addEventListener(
            "animationend",
            function () {
              dimsCard.classList.remove("dims-attention");
            },
            { once: true },
          );
        }, 280);
      });
    });
    document.documentElement.classList.add("preconfig-open");
    document.body.classList.add("preconfig-open");
  }

  // Chiude la scheda pre-configurazione
  function closePreconfigSheet() {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    let closed = false;
    const onEnd = () => {
      if (closed) return;
      closed = true;
      overlay.setAttribute("hidden", "");
      document.documentElement.classList.remove("preconfig-open");
      document.body.classList.remove("preconfig-open");
    };
    overlay.addEventListener("transitionend", onEnd, { once: true });
    window.setTimeout(onEnd, 450);
  }

  // -----------------------------------------------------------------------------
  // Home — Avvio pagina, parametri URL e caricamento differito della mappa. Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
  // -----------------------------------------------------------------------------

  function initHomeApp() {
    document
      .getElementById("catalogFilterToggle")
      ?.addEventListener("click", toggleCatalogFilters);

    document
      .querySelectorAll(".hero-cfg-open-preconfig, .nav-link--configuratore")
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          openPreconfigSheet(this.href);
        });
      });

    document
      .getElementById("preconfigBackdrop")
      ?.addEventListener("click", closePreconfigSheet);
    document
      .getElementById("preconfigClose")
      ?.addEventListener("click", closePreconfigSheet);

    document
      .getElementById("preconfigAccountEdit")
      ?.addEventListener("click", () => {
        const overlay = document.getElementById("preconfigOverlay");
        if (!overlay) return;
        document
          .getElementById("preconfigAccountChoice")
          ?.setAttribute("hidden", "");
        overlay.querySelector(".preconfig-body")?.removeAttribute("hidden");
        overlay.querySelector(".preconfig-footer")?.removeAttribute("hidden");
        overlay.dataset.source = "account";
        updatePreconfigSummary();
      });

    document
      .getElementById("preconfigSheet")
      ?.addEventListener("click", (event) => event.stopPropagation());

    document
      .getElementById("pcZona")
      ?.addEventListener("change", updatePreconfigSummary);
    document.getElementById("pcRisc")?.addEventListener("change", (event) => {
      event.currentTarget.classList.toggle(
        "is-heated",
        event.currentTarget.value === "si",
      );
      updatePreconfigSummary();
    });

    document
      .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          document
            .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
            .forEach((b) => {
              b.classList.remove("is-active");
              b.setAttribute("aria-pressed", "false");
            });
          this.classList.add("is-active");
          this.setAttribute("aria-pressed", "true");
          updatePreconfigCta();
          // Il riepilogo apre col livello: va rifatto anche qui.
          updatePreconfigSummary();
          if (misureDaControllare()) richiamaMisure();
        });
      });

    document.querySelectorAll(".preconfig-step-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = document.getElementById(this.dataset.target);
        if (!input) return;
        const step = parseFloat(this.dataset.step);
        const min = parseFloat(input.min) || 1;
        const max = parseFloat(input.max) || 40;
        const val =
          Math.round(
            Math.min(
              max,
              Math.max(min, (parseFloat(input.value) || 0) + step),
            ) * 10,
          ) / 10;
        input.value = val;
        // Toccare larghezza o lunghezza vale come "le ho guardate".
        if (input.id === "pcW" || input.id === "pcL") segnaMisureToccate();
        if (input.id === "pcPathNum") syncPcPath("num");
        else updatePreconfigSummary();
      });
    });

    // Vale anche scrivere il valore a mano, non solo premere i pulsanti.
    ["pcW", "pcL"].forEach((id) => {
      document
        .getElementById(id)
        ?.addEventListener("input", segnaMisureToccate);
    });

    document.getElementById("pcWSlider")?.addEventListener("input", () => {
      syncPcInputFromSlider("pcWSlider", "pcW");
      updatePreconfigSummary();
    });
    document.getElementById("pcLSlider")?.addEventListener("input", () => {
      syncPcInputFromSlider("pcLSlider", "pcL");
      updatePreconfigSummary();
    });
    document
      .getElementById("pcW")
      ?.addEventListener("input", () => syncPcSlider("pcW", "pcWSlider"));
    document
      .getElementById("pcL")
      ?.addEventListener("input", () => syncPcSlider("pcL", "pcLSlider"));

    document
      .getElementById("pcPath")
      ?.addEventListener("input", () => syncPcPath("slider"));
    document
      .getElementById("pcPathNum")
      ?.addEventListener("change", () => syncPcPath("num"));

    ["pcW", "pcL", "pcMese"].forEach((id) => {
      document
        .getElementById(id)
        ?.addEventListener("change", updatePreconfigSummary);
    });

    document
      .getElementById("preconfigCta")
      ?.addEventListener("click", function (event) {
        if (this.classList.contains("preconfig-cta--disabled")) {
          event.preventDefault();
          const sezione = document.getElementById("preconfigPersonaSection");
          if (!sezione) return;
          // Lo scorrimento è un di più: se il browser non lo offre, il richiamo visivo deve partire lo stesso.
          try {
            sezione.scrollIntoView({ block: "nearest", behavior: "smooth" });
          } catch (_) {}
          sezione.classList.remove("preconfig-persona-shake");
          // Riavvia l'animazione anche se il pulsante viene premuto due volte.
          void sezione.offsetWidth;
          sezione.classList.add("preconfig-persona-shake");
          sezione.addEventListener(
            "animationend",
            () => sezione.classList.remove("preconfig-persona-shake"),
            { once: true },
          );
          document
            .querySelector("#preconfigPersonaSection .pc-persona-card")
            ?.focus({ preventScroll: true });
          return;
        }
        const config = savePreconfigToStorage();
        this.href = buildPreconfigTargetUrl(this.href, config);
      });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !document.getElementById("preconfigOverlay")?.hasAttribute("hidden")
      ) {
        closePreconfigSheet();
      }
    });

    new MutationObserver(() => {
      applyPreconfigLang();
      updatePreconfigSummary();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const requestedPreconfig = new URLSearchParams(location.search).get(
      "preconfig",
    );
    const guidePreconfigTargets = {
      novizio: "configuratore.html?livello=novizio&guided=1&source=index",
      intermedio: "configuratore.html?livello=intermedio&guided=1&source=index",
      esperto:
        "configuratore.html?livello=esperto&mode=expert&empty=1&source=index",
    };
    const guidePreconfigTarget =
      guidePreconfigTargets[requestedPreconfig] ||
      (requestedPreconfig === "account"
        ? "configuratore.html?source=account"
        : null);
    if (guidePreconfigTarget) {
      history.replaceState(null, "", location.pathname);
      requestAnimationFrame(() => openPreconfigSheet(guidePreconfigTarget));
    }

    setupLazyContactMap();
  }

  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (window.__serraLeafletPromise) return window.__serraLeafletPromise;

    window.__serraLeafletPromise = new Promise((resolve, reject) => {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

      let stylesheetReady = false;
      let scriptReady = false;
      const finish = () => {
        if (!stylesheetReady || !scriptReady) return;
        if (window.L) resolve();
        else reject(new Error("Leaflet non disponibile"));
      };
      stylesheet.onload = () => {
        stylesheetReady = true;
        finish();
      };
      stylesheet.onerror = reject;
      script.onload = () => {
        scriptReady = true;
        finish();
      };
      script.onerror = reject;

      document.head.append(stylesheet);
      document.head.append(script);
    });
    return window.__serraLeafletPromise;
  }

  function setupLazyContactMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const createMap = () => {
      if (mapElement.dataset.leafletReady) return;
      mapElement.dataset.leafletReady = "true";
      loadLeaflet()
        .then(() => {
          const map = L.map(mapElement, { scrollWheelZoom: false }).setView(
            [43.6853, 11.2547],
            15,
          );
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
          L.marker([43.6853, 11.2547])
            .addTo(map)
            .bindPopup(
              "<b>Orto in Serra</b><br>Via delle Serre, 42<br>50023 Impruneta (FI)",
            )
            .openPopup();
        })
        .catch((err) => {
          mapElement.dataset.leafletReady = "";
          console.error("Errore nel caricamento della mappa Leaflet:", err);
        });
    };

    if (!("IntersectionObserver" in window)) {
      createMap();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        createMap();
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(mapElement);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeApp);
  } else {
    initHomeApp();
  }
})();
