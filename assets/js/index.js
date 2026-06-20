/* =========================================================
   JS pagina home: catalogo semi, sezione hero stagionale, carrello e traduzioni.
   Le funzioni restano globali per i gestori inline presenti nell'HTML.
   ---------------------------------------------------------
   MAPPA DEL FILE (in ordine):
     1. Catalogo colture (PLANTS) e indice per id (BYID)
     2. Mappa difficoltà colture (DIFFICULTY)
     3. Dati ausiliari (prezzi, foto, traduzioni piante)
     4. Stato pagina (filtri catalogo, carrello)
     5. Helper catalogo (filtri, ordinamento, prezzi, etichette)
     6. Rendering (hero, calendario, catalogo, abbinamenti, kit, footer)
     7. Carrello e dettaglio pianta
     8. Preferenze, persistenza e lingua
     9. Avvio (boot)
   ========================================================= */

/* Dati piante: catalogo base usato da card, dettaglio e carrello. */
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
  "Dicembre"
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
  "Dic"
];
const SOLE_ICON = { pieno: "☀️", mezz: "🌤️" };
const ACQUA_ICON = { alta: "💧💧💧", media: "💧💧", bassa: "💧" };
// Difficoltà di coltivazione: 1 = facile, 2 = media, 3 = difficile/esotica.
// Mappa completa su tutte le colture del catalogo (allineata a script.js).
const DIFFICULTY = {
  // Facili: rapide, tolleranti, ideali per chi inizia.
  lattuga:1, rucola:1, ravanello:1, fagiolino:1, basilico:1,
  prezzemolo:1, carota:1, cipolla:1, cipolla_rossa:1, cipollotto:1,
  spinaci:1, bietola:1, valerianella:1, zucchina:1, scalogno:1,
  cicoria:1, pakchoi:1, rapa:1, aglio:1, erba_cipollina:1,
  menta:1, maggiorana:1, calendula:1, nasturzio:1, crescione:1,
  mizuna:1, senape_foglia:1, tatsoi:1, loboda:1, broccolo_rapa:1,
  // Medie: richiedono un po' di attenzione o tempi più lunghi.
  pomodoro:2, peperone:2, cetriolo:2, fragola:2, finocchio:2,
  pisello:2, porro:2, indivia:2, barbabietola:2, aneto:2,
  coriandolo:2, timo:2, origano:2, salvia:2, rosmarino:2,
  radicchio:2, fagiolo:2, fagiolo_borlotto:2, fava:2, cece:2,
  lenticchia:2, soia_edamame:2, patata:2, pastinaca:2, radice_prezemolo:2,
  daikon:2, cavolo_cinese:2, leustean:2, dragoncello:2, camomilla:2,
  // Difficili o esotiche: lente, delicate, perenni o poco comuni.
  peperoncino:3, melanzana:3, zucca:3, melone:3, anguria:3,
  cavolo:3, verza:3, broccolo:3, cavolfiore:3, cavolonero:3,
  cavolorapa:3, cavoletti:3, sedano:3, cavolo_rosso:3, cavolo_navone:3,
  sedano_rapa:3, rafano:3, patata_dolce:3, scorzonera:3, topinambur:3,
  asparago:3, carciofo:3, cardo:3, mais_dolce:3, gombo:3,
  tomatillo:3, physalis:3, kiwano:3, cucamelon:3, stevia_dolce:3,
  shiso:3
};

/* Metadati piante: altezze, spaziature e guide di semina. */
const PLANT_HEIGHT_CM = {
  pomodoro: "100–200",  peperone: "50–100",  peperoncino: "40–70",
  melanzana: "60–120",  zucchina: "40–80",   zucca: "30–50",
  cetriolo: "100–200",  melone: "30–50",      anguria: "30–50",
  lattuga: "20–35",     radicchio: "20–30",   rucola: "15–30",
  spinaci: "20–30",     bietola: "30–60",     cavolo: "40–60",
  verza: "35–55",       broccolo: "60–100",   cavolfiore: "40–70",
  cavolonero: "60–100", cavolorapa: "20–40",  carota: "20–35",
  finocchio: "40–70",   prezzemolo: "20–40",  basilico: "20–50",
  coriandolo: "20–50",  aneto: "40–100",      cipolla: "30–50",
  aglio: "30–50",       porro: "40–70",       scalogno: "20–40",
  fagiolino: "30–50",   fagiolo: "150–250",   pisello: "60–150",
  fragola: "15–30",     sedano: "40–80",      ravanello: "10–20",
  barbabietola: "20–35",cicoria: "20–40",     indivia: "20–35",
  pakchoi: "20–40",     cavoletti: "60–120",  rapa: "15–30",
  valerianella: "10–20",rosmarino: "50–150",  timo: "15–30",
  origano: "30–60",     salvia: "40–80"
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
  salvia: { d: 40, dr: 50 }
,
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
  calendula: { d: 30, dr: 40 },
  nasturzio: { d: 30, dr: 50 },
  mais_dolce: { d: 30, dr: 70 },
  gombo: { d: 45, dr: 70 },
  tomatillo: { d: 50, dr: 80 },
  physalis: { d: 45, dr: 70 },
  kiwano: { d: 60, dr: 100 },
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
  shiso: { d: 30, dr: 45 }
};

const SOWING_GUIDE = window.SOWING_GUIDE;

const SOWING_GUIDE_RO = window.SOWING_GUIDE_RO;

const TIPO = window.TIPO;
const TIPO_STYLE = {
  frutto: "background:rgba(231,111,81,.18);color:#a03820",
  foglia: "background:rgba(45,106,79,.16);color:#1b4332",
  radice: "background:rgba(107,66,38,.16);color:#5c3618",
  legume: "background:rgba(82,183,136,.2);color:#1b4332",
  aromatica: "background:rgba(116,198,157,.22);color:#1b5438"
};
const PHOTO_MAP = {
  bietola: "bietola_coste.jpg",
  cavolo: "cavolo_cappuccio.jpg",
  cavolonero: "cavolo_nero.jpg",
  cavolorapa: "cavolo_rapa.jpg",
  cavoletti: "cavoletti_bruxelles.jpg",
  coriandolo: "coriandolo.jpeg",
  fagiolino: "fagiolino_nano.jpg",
  fagiolo: "fagiolo_rampicante.jpg",
  indivia: "indivia_scarola.jpg",
  origano: "origano.jpeg",
  pakchoi: "pak_choi.jpg"
};
function photoSrc(id) {
  return `assets/img/photo/${PHOTO_MAP[id] || id + ".jpg"}`;
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
  calendula: "🌼",
  nasturzio: "🌼",
  mais_dolce: "🌽",
  gombo: "🌶️",
  tomatillo: "🍅",
  physalis: "🍒",
  kiwano: "🥒",
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
  shiso: "🌿"
};
function plantSvgSrc(id) {
  return `assets/img/svg/${id}.svg`;
}
function fruitEmoji(id) {
  return FRUIT_EMOJI[id] || "🌱";
}
function mixedPlantVisual(p, className, index, previousEmoji = "") {
  const emoji = fruitEmoji(p.id);
  const useSvg = index % 3 === 1 || emoji === previousEmoji;
  if (useSvg) {
    return `<img class="${className} ${className}--svg" src="${plantSvgSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" />`;
  }
  return `<span class="${className} ${className}--emoji" role="img" aria-label="${plantName(p.id)}">${emoji}</span>`;
}
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

const KITS = {
  1: {
    titolo: "Kit Invernale",
    ids: [
      "spinaci",
      "lattuga",
      "ravanello",
      "valerianella",
      "cicoria",
      "cipolla"
    ]
  },
  2: {
    titolo: "Kit Primaverile Precoce",
    ids: ["lattuga", "ravanello", "spinaci", "pisello", "rucola", "cipolla"]
  },
  3: {
    titolo: "Kit di Primavera",
    ids: ["lattuga", "carota", "ravanello", "basilico", "cetriolo", "fragola"]
  },
  4: {
    titolo: "Kit di Primavera",
    ids: ["cetriolo", "basilico", "fagiolino", "carota", "zucchina", "fragola"]
  },
  5: {
    titolo: "Kit di Maggio",
    ids: [
      "cetriolo",
      "basilico",
      "fagiolino",
      "carota",
      "zucchina",
      "barbabietola"
    ]
  },
  6: {
    titolo: "Kit Estivo in Serra",
    ids: [
      "cetriolo",
      "basilico",
      "fagiolino",
      "carota",
      "zucchina",
      "radicchio"
    ]
  },
  7: {
    titolo: "Kit d'Estate",
    ids: [
      "carota",
      "fagiolino",
      "barbabietola",
      "radicchio",
      "finocchio",
      "cetriolo"
    ]
  },
  8: {
    titolo: "Kit Fine Estate",
    ids: ["lattuga", "rucola", "carota", "cicoria", "barbabietola", "bietola"]
  },
  9: {
    titolo: "Kit Autunnale",
    ids: ["lattuga", "rucola", "ravanello", "indivia", "cicoria", "spinaci"]
  },
  10: {
    titolo: "Kit d'Autunno",
    ids: [
      "spinaci",
      "ravanello",
      "valerianella",
      "lattuga",
      "indivia",
      "scalogno"
    ]
  },
  11: {
    titolo: "Kit Autunno-Inverno",
    ids: [
      "spinaci",
      "valerianella",
      "lattuga",
      "cicoria",
      "radicchio",
      "indivia"
    ]
  },
  12: {
    titolo: "Kit Invernale",
    ids: [
      "valerianella",
      "spinaci",
      "lattuga",
      "cicoria",
      "indivia",
      "radicchio"
    ]
  }
};

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
  12: "Dicembre freddo, ma dentro cresce ancora qualcosa."
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
  12: "Pianifica la rotazione colturale: non mettere la stessa famiglia nello stesso posto."
};

const HERO_BG = {
  inverno:
    "linear-gradient(160deg,#cfe8e5 0%,#e0eff0 30%,#eceae4 65%,#f4f0e8 100%)",
  primavera:
    "linear-gradient(160deg,#d4ede1 0%,#e8f5ee 30%,#f0ebe0 65%,#f5f0e8 100%)",
  estate:
    "linear-gradient(160deg,#e8f0c8 0%,#eef5d4 30%,#f4ead8 65%,#f5ede0 100%)",
  autunno:
    "linear-gradient(160deg,#f0e8d0 0%,#f5eacc 30%,#f0e0cc 65%,#f5ede0 100%)"
};

const HERO_KICKER = {
  inverno: "❄️ Serra fredda in attività",
  primavera: "🌸 Stagione in fioritura",
  estate: "🌞 Piena estate in serra",
  autunno: "🍂 Raccolto d'autunno"
};

function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}

/* Stato pagina: filtri correnti, catalogo, carrello e dettaglio aperto. */
let state = {
  zona: "temperato",
  riscaldata: false,
  mese: new Date().getMonth() + 1
};
let catalog = {
  search: "",
  type: "",
  seasonOnly: false,
  easyOnly: false,
  sort: "season"
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
  "valerianella"
]);
const PACK_DATA = {
  pomodoro:    { seeds: 20,  price: 3.50 },
  peperone:    { seeds: 15,  price: 3.20 },
  peperoncino: { seeds: 15,  price: 3.20 },
  melanzana:   { seeds: 20,  price: 3.50 },
  zucchina:    { seeds: 10,  price: 3.80 },
  zucca:       { seeds: 8,   price: 3.80 },
  cetriolo:    { seeds: 15,  price: 3.20 },
  melone:      { seeds: 12,  price: 3.50 },
  anguria:     { seeds: 10,  price: 3.80 },
  lattuga:     { seeds: 400, price: 2.40 },
  radicchio:   { seeds: 300, price: 2.50 },
  rucola:      { seeds: 500, price: 2.20 },
  spinaci:     { seeds: 200, price: 2.40 },
  bietola:     { seeds: 150, price: 2.60 },
  cavolo:      { seeds: 100, price: 2.80 },
  verza:       { seeds: 100, price: 2.80 },
  broccolo:    { seeds: 100, price: 2.80 },
  cavolfiore:  { seeds: 100, price: 2.80 },
  cavolonero:  { seeds: 100, price: 2.80 },
  cavolorapa:  { seeds: 100, price: 2.80 },
  carota:      { seeds: 300, price: 2.30 },
  finocchio:   { seeds: 200, price: 2.50 },
  prezzemolo:  { seeds: 200, price: 2.60 },
  basilico:    { seeds: 300, price: 2.60 },
  coriandolo:  { seeds: 200, price: 2.60 },
  aneto:       { seeds: 200, price: 2.60 },
  cipolla:     { seeds: 200, price: 2.30 },
  aglio:       { seeds: 50,  price: 3.00 },
  porro:       { seeds: 200, price: 2.40 },
  scalogno:    { seeds: 100, price: 2.80 },
  fagiolino:   { seeds: 40,  price: 2.80 },
  fagiolo:     { seeds: 30,  price: 3.00 },
  pisello:     { seeds: 50,  price: 2.80 },
  fragola:     { seeds: 100, price: 3.20 },
  sedano:      { seeds: 300, price: 2.60 },
  ravanello:   { seeds: 300, price: 2.20 },
  barbabietola:{ seeds: 100, price: 2.40 },
  cicoria:     { seeds: 300, price: 2.40 },
  indivia:     { seeds: 300, price: 2.50 },
  pakchoi:     { seeds: 200, price: 2.60 },
  cavoletti:   { seeds: 100, price: 2.80 },
  rapa:        { seeds: 200, price: 2.30 },
  valerianella:{ seeds: 300, price: 2.40 },
  rosmarino:   { seeds: 100, price: 3.00 },
  timo:        { seeds: 200, price: 2.80 },
  origano:     { seeds: 300, price: 2.80 },
  salvia:      { seeds: 100, price: 2.80 },
};

/* Logica catalogo: filtri, testi localizzati, prezzi e micro-dati. */
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
function seminabili() {
  return PLANTS.filter((p) => effectiveMonths(p).has(state.mese));
}
function typeOfPlant(p) {
  return TIPO[p.id] || "foglia";
}
function plantDistanceValue(p) {
  const spacing = PLANT_SPACING[p.id] || {};
  return Number(spacing.d || spacing.dr || 999);
}
function catalogSortScore(p) {
  const seasonal = effectiveMonths(p).has(state.mese) ? 0 : 1;
  const easy = EASY_IDS.has(p.id) ? 0 : 1;
  return seasonal * 10000 + easy * 1000 + (p.gg || 365);
}
function sortCatalogPlants(plants) {
  const list = [...plants];
  const byName = (a, b) => plantName(a.id).localeCompare(plantName(b.id), currentLang === "ro" ? "ro" : "it", { sensitivity: "base" });
  if (catalog.sort === "name") return list.sort(byName);
  if (catalog.sort === "fast") return list.sort((a, b) => (a.gg || 9999) - (b.gg || 9999) || byName(a, b));
  if (catalog.sort === "yield") return list.sort((a, b) => (b.resa || 0) - (a.resa || 0) || byName(a, b));
  if (catalog.sort === "distance") return list.sort((a, b) => plantDistanceValue(a) - plantDistanceValue(b) || byName(a, b));
  if (catalog.sort === "price") return list.sort((a, b) => packPrice(a.id) - packPrice(b.id) || byName(a, b));
  return list.sort((a, b) => catalogSortScore(a) - catalogSortScore(b) || byName(a, b));
}
function catalogTypeCounts(base) {
  return ["frutto", "foglia", "radice", "legume", "aromatica"].map((type) => ({
    type,
    count: base.filter((p) => typeOfPlant(p) === type).length
  }));
}
function normalizeSearch(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
function filteredCatalogPlants() {
  const term = normalizeSearch(catalog.search);
  const base = catalog.seasonOnly ? seminabili() : PLANTS;
  const filtered = base.filter((p) => {
    const tipo = typeOfPlant(p);
    if (catalog.type && tipo !== catalog.type) return false;
    if (catalog.easyOnly && !EASY_IDS.has(p.id)) return false;
    if (!term) return true;
    const haystack = normalizeSearch(
      [plantName(p.id), p.nome, typeLabel(tipo), plantNote(p)].join(" ")
    );
    return haystack.includes(term);
  });
  return sortCatalogPlants(filtered);
}
function plantName(id) {
  return PLANT_RO[id]?.nome && currentLang === "ro"
    ? PLANT_RO[id].nome
    : BYID[id]?.nome || id;
}
function plantNote(p) {
  return PLANT_RO[p.id]?.nota && currentLang === "ro"
    ? PLANT_RO[p.id].nota
    : p.nota;
}
function localizedSowingGuide(plant) {
  if (currentLang !== "ro") return SOWING_GUIDE[plant.id];
  if (SOWING_GUIDE_RO[plant.id]) return SOWING_GUIDE_RO[plant.id];

  const spacing = PLANT_SPACING[plant.id] || {};
  const row = spacing.d || plant.d || 30;
  const between = spacing.dr || plant.dr || row;
  const direct = new Set([
    "carota", "rucola", "spinaci", "coriandolo", "aneto", "fagiolino",
    "fagiolo", "pisello", "ravanello", "barbabietola", "rapa",
    "valerianella", "daikon", "scorzonera", "fava", "soia_edamame",
    "cece", "lenticchia", "fagiolo_borlotto", "crescione"
  ]);
  const bulbs = new Set([
    "aglio", "scalogno", "cipolla", "cipolla_rossa", "cipollotto"
  ]);
  const aromatics = new Set([
    "rosmarino", "timo", "origano", "salvia", "erba_cipollina",
    "leustean", "dragoncello", "menta", "maggiorana", "camomilla",
    "calendula", "nasturzio", "shiso"
  ]);
  const warm = new Set([
    "pomodoro", "peperone", "peperoncino", "melanzana", "zucchina",
    "zucca", "cetriolo", "melone", "anguria", "basilico", "gombo",
    "tomatillo", "physalis", "kiwano", "cucamelon", "mais_dolce",
    "patata_dolce"
  ]);

  let method = "Seamănă în alveole sau răsadniță, apoi transplantează plante viguroase în strat.";
  if (direct.has(plant.id)) method = "Seamănă direct în rânduri, în sol fin și ușor umed.";
  if (bulbs.has(plant.id)) method = "Plantează bulbili sau căței sănătoși, apoi păstrează rândurile curate.";
  if (aromatics.has(plant.id)) method = "Cel mai sigur este transplantul de plăntuțe; semănarea este posibilă, dar mai lentă.";
  if (warm.has(plant.id)) method = "Seamănă protejat la cald; în seră transplantează o plăntuță bine formată.";
  if (plant.id === "fragola") method = "Transplantează plăntuțe sau stoloni înrădăcinați; semănarea din sămânță este lentă.";
  if (plant.id === "patata") method = "Plantează tuberculi sănătoși și mușuroiește când tulpinile cresc.";
  if (plant.id === "asparago") method = "Pornește de la coroane sau plăntuțe; cultura este perenă și cere răbdare.";

  let depth = "0,5-1 cm";
  if (bulbs.has(plant.id) || plant.id === "patata") depth = "3-5 cm";
  if (warm.has(plant.id)) depth = "1-2 cm";
  if (aromatics.has(plant.id)) depth = "superficial, cu acoperire foarte ușoară";

  const thin = spacing.dr && spacing.dr !== spacing.d
    ? `Lasă ${row} cm pe rând și ${between} cm între rânduri.`
    : `Lasă ${row} cm între plante.`;
  const tip = plantNote(plant) || "Menține umiditatea constantă la pornire și evită aglomerarea plantelor.";

  return { method, depth, thin, tip };
}
function kitTitle(month) {
  return currentLang === "ro"
    ? t(`kit.title_${month}`) || KITS[month].titolo
    : KITS[month].titolo;
}
function typeLabel(type) {
  return t(`type.${type}`);
}
function tv(key, vars = {}) {
  let value = t(key);
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}
function packPrice(id) {
  return PACK_DATA[id]?.price ?? 2.50;
}
function seedsPerPack(id) {
  return PACK_DATA[id]?.seeds ?? 100;
}
function inCart(id) {
  return cart.some(i => i.id === id);
}
function money(value) {
  return new Intl.NumberFormat(currentLang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
function zoneLabel(zone) {
  return t(`zone.${zone}`);
}
function greenhouseLabel() {
  return state.riscaldata ? t("greenhouse.heated") : t("greenhouse.cold");
}
function cartActionLabel(inCart) {
  return inCart ? t("cart.in_cart") : t("cart.add");
}
function detailCartLabel(inCart) {
  return inCart ? t("cart.remove_from_cart") : t("cart.add_to_cart");
}
function daysLabel(plant, full = false) {
  if (plant.gg === 0) return t("plant.perennial");
  return full
    ? t("plant.days_harvest").replace("{days}", plant.gg)
    : `${plant.gg} ${t("plant.days_short")}`;
}
function spacingLabel(plant) {
  const spacing = PLANT_SPACING[plant.id];
  if (!spacing) return "—";
  return spacing.dr && spacing.dr !== spacing.d
    ? `${spacing.d}×${spacing.dr} cm`
    : `${spacing.d} cm`;
}
function yieldLabel(plant) {
  return plant.resa >= 1
    ? `${plant.resa} kg`
    : `${Math.round(plant.resa * 1000)} g`;
}
function sunLabel(plant) {
  return plant.sole === "pieno" ? t("plant.full_sun") : t("plant.half_shade");
}
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
  <rect x="8" y="23" width="176" height="86" rx="12" fill="#f7fbf5" stroke="rgba(45,106,79,.16)"/>
  <path d="M24 45 H176 M24 89 H176 M34 31 V103 M78 31 V103 M122 31 V103 M166 31 V103" stroke="rgba(45,106,79,.14)" stroke-width="1"/>
  ${seedlings}
  <line x1="${cx[0] + R + 3}" y1="${cy[0] - 15}" x2="${cx[1] - R - 3}" y2="${cy[0] - 15}" stroke="#1b5e3a" stroke-width="1.7" marker-start="url(#sH${pid})" marker-end="url(#sH${pid})"/>
  <text x="97" y="8" font-size="8" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#16251b">${rLbl}</text>
  <rect x="67" y="11" width="60" height="18" rx="9" fill="#1b5e3a"/>
  <text x="97" y="24" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${d} cm</text>
  <line x1="198" y1="${cy[0] + R + 3}" x2="198" y2="${cy[1] - R - 3}" stroke="#40916c" stroke-width="1.7" marker-start="url(#sV${pid})" marker-end="url(#sV${pid})"/>
  <text x="206" y="49" font-size="7.5" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#16251b">${bLbl}</text>
  <rect x="184" y="59" width="44" height="18" rx="9" fill="#40916c"/>
  <text x="206" y="72" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${dr} cm</text>
</svg>`;
}
function applyDynamicStaticText() {
  const heatedBtn = document.getElementById("heroHeatedBtn");
  const heatedLabel = document.getElementById("heroHeatedLabel");
  if (heatedLabel)
    heatedLabel.textContent = state.riscaldata
      ? t("hero.heated_on")
      : t("hero.heated_off");
  if (heatedBtn)
    heatedBtn.setAttribute("aria-pressed", String(state.riscaldata));
  const note = document.getElementById("heroFilterNote");
  if (note) {
    const zoneNote = {
      freddo: "hero.filter_note_zone_cold",
      temperato: "hero.filter_note_zone_temp",
      caldo: "hero.filter_note_zone_warm"
    }[state.zona];
    note.textContent = state.riscaldata
      ? t("hero.filter_note_heated")
      : t(zoneNote);
  }
}

/* Sezione hero: aggiorna mese, frase guida, clima e piante decorative. */
function renderHero() {
  const stag = getStagione(state.mese);
  document.getElementById("hero").style.background = HERO_BG[stag];
  document.getElementById("heroKicker").textContent = HERO_KICKER[stag];
  document.getElementById("heroMonth").textContent = NOMI_MESI[state.mese - 1];
  document.getElementById("heroTagline").textContent =
    STAGIONE_QUOTE[state.mese];
  document
    .querySelectorAll(".hero-zone-btn")
    .forEach((b) => {
      const selected = b.dataset.zone === state.zona;
      b.classList.toggle("active", selected);
      b.setAttribute("aria-pressed", String(selected));
    });
  document
    .getElementById("heroHeatedBtn")
    .classList.toggle("active", state.riscaldata);
  applyDynamicStaticText();

  /* Piante fluttuanti decorative. */
  const plants = diversePlants(seminabili(), 8);
  const positions = [
    { top: "8%", right: "3%", size: 160, opacity: 0.2, dur: 7, delay: 0 },
    { top: "22%", right: "15%", size: 92, opacity: 0.16, dur: 5.5, delay: 1.4 },
    { top: "62%", right: "2%", size: 118, opacity: 0.18, dur: 8, delay: 2.7 },
    { top: "80%", right: "20%", size: 78, opacity: 0.15, dur: 6, delay: 0.6 },
    { top: "10%", left: "2%", size: 78, opacity: 0.16, dur: 5, delay: 3.3 },
    { top: "48%", left: "5%", size: 104, opacity: 0.18, dur: 7.5, delay: 1.1 },
    { top: "78%", left: "12%", size: 86, opacity: 0.16, dur: 6.5, delay: 4.1 },
    { top: "30%", left: "22%", size: 66, opacity: 0.14, dur: 9, delay: 2.0 }
  ];
  const wrap = document.getElementById("heroBgPlants");
  let previousEmoji = "";
  wrap.innerHTML = plants
    .map((p, i) => {
      const pos = positions[i] || positions[0];
      const posStyle = pos.right
        ? `top:${pos.top};right:${pos.right}`
        : `top:${pos.top};left:${pos.left}`;
      const visual = mixedPlantVisual(p, "hero-bg-plant-visual", i, previousEmoji);
      previousEmoji = fruitEmoji(p.id);
      return `<span class="hero-bg-plant" aria-hidden="true"
      style="${posStyle};font-size:${pos.size}px;opacity:${pos.opacity};--dur:${pos.dur}s;--delay:${pos.delay}s;">${visual}</span>`;
    })
    .join("");
}

/* Calendario: strip mensile con conteggio delle piante seminabili. */
function renderCalendarStrip() {
  const strip = document.getElementById("monthStrip");
  const help = document.getElementById("monthStripHelp");
  if (!strip) return;
  const planteLabel = currentLang === "ro" ? "plante" : "piante";
  const sowingLabel = currentLang === "ro" ? "de semănat" : "seminabili";
  const chooseLabel = currentLang === "ro" ? "alege luna" : "scegli mese";
  const selectedLabel = currentLang === "ro" ? "lună selectată" : "mese selezionato";
  const selectedCount = PLANTS.filter((p) => effectiveMonths(p).has(state.mese)).length;
  if (help) {
    help.textContent =
      currentLang === "ro"
        ? `${NOMI_MESI[state.mese - 1]} · ${selectedCount} plante potrivite`
        : `${NOMI_MESI[state.mese - 1]} · ${selectedCount} piante adatte`;
  }
  strip.innerHTML = Array.from(
    { length: 12 },
    (_, i) => {
      const m = i + 1;
      const count = PLANTS.filter((p) => effectiveMonths(p).has(m)).length;
      const active = m === state.mese ? " active" : "";
      return `<button class="month-tile${active}" onclick="setMese(${m})" aria-label="${NOMI_MESI[i]}: ${count} ${planteLabel} ${sowingLabel}" aria-pressed="${m === state.mese}">
      <span class="month-tile-name">${NOMI_MESI[i]}</span>
      <span class="month-tile-meta"><span class="month-tile-count">${count}</span> <span class="month-tile-label">${planteLabel} ${sowingLabel}</span></span>
      <span class="month-tile-action">${m === state.mese ? selectedLabel : chooseLabel}</span>
    </button>`;
    }
  ).join("");
  centerActiveMonth(strip);
}

function centerActiveMonth(strip) {
  const activeMonth = strip?.querySelector(".month-tile.active");
  if (!activeMonth) return;
  requestAnimationFrame(() => {
    const target =
      activeMonth.offsetLeft -
      (strip.clientWidth - activeMonth.offsetWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, target),
      behavior: "auto"
    });
  });
}

/* Hero: apre/chiude la scelta del livello dentro "Apri il configuratore". */
function toggleCfgLevels() {
  const panel = document.getElementById("cfgLevels");
  const btn = document.getElementById("cfgOpenBtn");
  if (!panel || !btn) return;
  const willOpen = panel.hasAttribute("hidden");
  if (willOpen) {
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", "true");
    const first = panel.querySelector(".hero-cfg-level");
    if (first) first.focus({ preventScroll: true });
    // Scroll all'inizio della card configuratore
    requestAnimationFrame(() => {
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 66;
      const card = document.querySelector(".hero-cfg");
      const target = card || btn;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  } else {
    panel.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
  }
}

/* Catalogo: render delle piante in evidenza e lista compatta. */
function renderEditorialPlants() {
  const seasonal = seminabili();
  const plants = filteredCatalogPlants();
  const filtersActive =
    Boolean(catalog.search || catalog.type || catalog.easyOnly) ||
    catalog.seasonOnly;
  syncCatalogControls();
  const catalogStatus = document.getElementById("catalogStatus");
  if (catalogStatus) {
    const pills = [];
    if (!catalog.seasonOnly) pills.push({ kind: "scope", label: t("catalog.filter_all_plants") });
    if (catalog.search) pills.push({ kind: "search", label: `"${catalog.search}"` });
    if (catalog.type) pills.push({ kind: "type", label: typeLabel(catalog.type) });
    if (catalog.easyOnly) pills.push({ kind: "easy", label: t("catalog.easy_only") });
    if (catalog.sort && catalog.sort !== "season") pills.push({ kind: "sort", label: t(`catalog.sort_${catalog.sort}`) });
    catalogStatus.hidden = !pills.length;
    if (pills.length) {
      const remove = t("catalog.remove_filter");
      catalogStatus.innerHTML =
        `<span class="catalog-status-count">${plants.length} ${t("catalog.results")}</span>` +
        `<span class="catalog-status-pills">` +
        pills
          .map(
            (p) =>
              `<button class="catalog-filter-pill" type="button" onclick="removeCatalogFilter('${p.kind}')" aria-label="${remove}: ${p.label}"><span class="pill-text">${p.label}</span><span class="pill-x" aria-hidden="true">✕</span></button>`
          )
          .join("") +
        `</span>` +
        `<button class="catalog-clear-all" type="button" onclick="showFullCatalog()">${t("catalog.reset_short")}</button>`;
    }
  }
  if (catalog.seasonOnly) {
    document.getElementById("stagioneTitle").innerHTML = t("season.title")
      .replace("{count}", `<span class="stagione-count">${plants.length}</span>`)
      .replace("{month}", NOMI_MESI[state.mese - 1]);
  } else {
    document.getElementById("stagioneTitle").innerHTML = tv(
      "catalog.count_all",
      {
        count: `<span class="stagione-count">${plants.length}</span>`
      }
    );
  }
  const baseMeta = t("season.meta")
    .replace("{zone}", zoneLabel(state.zona))
    .replace("{greenhouse}", greenhouseLabel());
  document.getElementById("stagioneMeta").textContent = filtersActive
    ? `${baseMeta} · ${tv("catalog.count_filtered", {
        shown: plants.length,
        total: catalog.seasonOnly ? seasonal.length : PLANTS.length
      })}`
    : baseMeta;

  renderCatalogCategoryRail(catalog.seasonOnly ? seasonal : PLANTS);
  renderCatalogInsights(plants, catalog.seasonOnly ? seasonal : PLANTS);

  if (!plants.length) {
    document.getElementById("editorialPlants").innerHTML =
      `<div class="empty-state"><div class="empty-icon">🌱</div><p>${filtersActive ? t("catalog.empty") : t("season.empty")}</p>${filtersActive ? `<button class="empty-cta" type="button" onclick="showFullCatalog()">${t("catalog.show_all")}</button>` : ""}</div>`;
    document.getElementById("compactPlants").innerHTML = "";
    return;
  }

  const featured = plants.slice(0, 3);
  const rest = plants.slice(3);
  const seasonSet = new Set(seasonal.map((p) => p.id));
  const offSeasonBadge = `<span class="off-season-badge">${t("catalog.off_season")}</span>`;

  /* In evidenza: 3 card uguali nella griglia catalogo. */
  const editHTML = `<div class="plant-catalog-top">
    ${featured.map((p) => {
      const tipo = typeOfPlant(p);
      const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
      const inC = inCart(p.id);
      return `<div class="plant-card-top${inC ? " in-cart" : ""}" id="card-${p.id}" onclick="openDetail('${p.id}')">
        <div class="top-photo">
          <img src="${photoSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" />
          <span class="photo-type-tag" style="${ts}">${typeLabel(tipo)}</span>
          <span class="photo-cart-check">✓</span>
        </div>
        <div class="top-body">
          <div class="top-nameline">
            <div class="top-name">${plantName(p.id)}</div>
            ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
          </div>
          <div class="top-facts-row">
            <span class="top-fact">⏱&nbsp;${daysLabel(p)}</span>
            <span class="top-fact">↔&nbsp;${spacingLabel(p)}</span>
            <span class="top-fact">⚖&nbsp;${yieldLabel(p)}</span>
          </div>
          <div class="top-buy-row">
            <span class="top-price">
              <b>${money(packPrice(p.id))}</b>
              <small>${seedsPerPack(p.id)} ${t("catalog.seeds")}</small>
            </span>
            <button class="top-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')">
              ${cartActionLabel(inC)}
            </button>
          </div>
        </div>
      </div>`;
    }).join("")}
  </div>`;
  document.getElementById("editorialPlants").innerHTML = editHTML;

  /* Lista densa per le piante rimanenti. */
  document.getElementById("compactPlants").innerHTML = rest
    .map((p) => {
      const tipo = typeOfPlant(p);
      const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
      const inC = inCart(p.id);
      return `<div class="plant-card-compact${inC ? " in-cart" : ""}" id="card-${p.id}" onclick="openDetail('${p.id}')">
        <div class="compact-thumb"><img src="${photoSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" /></div>
        <div class="compact-info">
          <div class="compact-name-row">
            <span class="compact-name">${plantName(p.id)}</span>
            <span class="compact-badge" style="${ts}">${typeLabel(tipo)}</span>
            ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
          </div>
          <p class="compact-note">${plantNote(p)}</p>
          <div class="compact-facts-row compact-facts-row--pro">
            <span>⏱&nbsp;${daysLabel(p)}</span>
            <span>↔&nbsp;${spacingLabel(p)}</span>
            <span>⚖&nbsp;${yieldLabel(p)}</span>
          </div>
        </div>
        <div class="compact-buy">
          <span class="compact-price">${money(packPrice(p.id))}</span>
          <button class="compact-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')" title="${inC ? t("cart.remove") : t("cart.add_plain")}">${inC ? "✓" : "+"}</button>
        </div>
      </div>`;
    })
    .join("");
}

/* Abbinamenti: coppie di colture amiche con azioni carrello. */
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
      month: NOMI_MESI[state.mese - 1]
    });
  }
  if (!pairs.length) {
    document.getElementById("abbinamenti-grid").innerHTML =
      `<div class="abbinamenti-empty" style="grid-column:1/-1">${t("companions.empty")}</div>`;
    return;
  }
  const ABBINAMENTO_REASONS = [
    [t("companions.reason_1"), t("companions.badge_1")],
    [t("companions.reason_2"), t("companions.badge_2")],
    [t("companions.reason_3"), t("companions.badge_3")]
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
      <button class="abbin-add-btn${pairInCart ? " added" : ""}" onclick="addPairToCart(event,'${aId}','${bId}')">
        ${pairInCart ? t("companions.in_cart_pair") : t("companions.add_pair")}
      </button>
    </div>`;
    })
    .join("");
}

/* Kit del mese: composizione stagionale e CTA carrello. */
function renderKit() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const avail = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  if (!avail.length) return;
  document.getElementById("kitHeading").textContent = t("kit.heading").replace(
    "{month}",
    NOMI_MESI[state.mese - 1]
  );
  document.getElementById("kitTitle").textContent = kitTitle(state.mese);
  document.getElementById("kitDesc").textContent = t("kit.desc").replace(
    "{count}",
    avail.length
  );
  const kitMetaRow = document.getElementById("kitMetaRow");
  if (kitMetaRow) {
    const fastCount = avail.filter((id) => BYID[id]?.gg && BYID[id].gg <= 45).length;
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

/* Footer: consiglio mensile, piante decorative e stagione corrente. */
function renderFooter() {
  document.getElementById("footerTip").textContent = TIP_MESE[state.mese];
  const stag = getStagione(state.mese);
  const stagLabel = {
    inverno: t("season_name.winter"),
    primavera: t("season_name.spring"),
    estate: t("season_name.summer"),
    autunno: t("season_name.autumn")
  }[stag];
  const footerSeasonTag = document.getElementById("footerSeasonTag");
  if (footerSeasonTag) footerSeasonTag.innerHTML = stagLabel;

  /* Striscia infinita di piante. */
  let previousEmoji = "";
  const icons = nonRepeatingPlantOrder(PLANTS)
    .map((p, i) => {
      const visual = mixedPlantVisual(p, "footer-plant-icon-visual", i, previousEmoji);
      previousEmoji = fruitEmoji(p.id);
      return `<span class="footer-plant-icon">${visual}</span>`;
    })
    .join("");
  document.getElementById("footerPlantRow").innerHTML =
    icons + icons; /* Duplicato per un ciclo continuo senza stacchi. */
}

/* Render generale: riallinea tutte le sezioni dopo ogni cambio stato. */
function render() {
  renderHero();
  renderCalendarStrip();
  renderEditorialPlants();
  renderAbbinamenti();
  renderKit();
  renderFooter();
  updateCartUI();
  savePrefs();
}

/* Carrello: aggiunta/rimozione semi, drawer e notifica rapida. */
function toggleCart(e, id) {
  e.stopPropagation();
  const added = !inCart(id);
  cart = added ? [...cart, { id, bustine: 1 }] : cart.filter(i => i.id !== id);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(id, added);
  const c = document.getElementById("cartCount");
  c.classList.add("bump");
  setTimeout(() => c.classList.remove("bump"), 250);
}
function addPairToCart(e, aId, bId) {
  e.stopPropagation();
  [aId, bId].forEach((id) => {
    if (BYID[id] && !inCart(id)) cart.push({ id, bustine: 1 });
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
function addKitToCart() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  availableIds.forEach((id) => {
      if (!inCart(id)) cart.push({ id, bustine: 1 });
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) showCartNudge(availableIds[0], true);
  openCart();
}
function addKitAndPlan() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const availableIds = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  availableIds.forEach((id) => {
    if (!inCart(id)) cart.push({ id, bustine: 1 });
  });
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  if (availableIds.length) {
    window.location.href = "configuratore.html?import=cart";
  }
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
  showCartNudge(id, false);
}
function clearCart() {
  cart = [];
  updateCartUI();
  renderEditorialPlants();
  renderAbbinamenti();
  savePrefs();
}
function updateCartUI() {
  document.getElementById("cartCount").textContent = cart.length;
  // Sezione configuratore: mostra suggerimento carrello se ci sono semi da importare.
  const confHint = document.getElementById("confCartHint");
  const confHintText = document.getElementById("confCartHintText");
  const confImportBtn = document.getElementById("confImportBtn");
  if (confImportBtn) {
    const hasSeeds = cart.length > 0;
    confImportBtn.classList.toggle("disabled", !hasSeeds);
    confImportBtn.setAttribute("aria-disabled", String(!hasSeeds));
    confImportBtn.tabIndex = hasSeeds ? 0 : -1;
    if (hasSeeds) {
      confImportBtn.href = "configuratore.html?import=cart";
    } else {
      confImportBtn.removeAttribute("href");
    }
  }
  if (confHint && confHintText) {
    if (cart.length > 0) {
      const label = cart.length === 1 ? t("conf.cart_hint_one") : tv("conf.cart_hint_many", { count: cart.length });
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
    items.innerHTML = cart
      .map(({ id, bustine }) => {
        const p = BYID[id];
        if (!p) return "";
        const spp = seedsPerPack(id);
        const price = packPrice(id);
        const bustLabel = bustine === 1 ? t("cart.pack") : tv("cart.pack_many", { count: bustine });
        return `<div class="cart-item">
        <img src="${photoSrc(id)}" alt="${plantName(id)}" />
        <span class="cart-item-copy">
          <span class="cart-item-name">${plantName(id)}</span>
          <span class="cart-item-meta">${plantNote(p)}</span>
          <span class="cart-item-pack">
            <span>${bustLabel} · ${tv("cart.seeds_per_pack", { count: spp })}</span>
            <b>${money(price)}${t("cart.per_pack")}</b>
          </span>
        </span>
        <button class="cart-item-remove" onclick="removeFromCart('${id}')" title="${t("cart.remove")}">✕</button>
      </div>`;
      })
      .join("") +
      `<div class="cart-total-row">
        <span>${t("cart.estimate")}</span>
        <b>${money(cart.reduce((sum, { id, bustine }) => sum + packPrice(id) * bustine, 0))}</b>
      </div>`;
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
function showCartNudge(id, added = true) {
  const nudge = document.getElementById("cartNudge");
  const title = document.getElementById("cartNudgeTitle");
  const meta = document.getElementById("cartNudgeMeta");
  if (!nudge || !title || !meta || !BYID[id]) return;
  title.textContent = tv(added ? "cart.added_title" : "cart.removed_title", {
    name: plantName(id)
  });
  meta.textContent = tv(added ? "cart.added_meta" : "cart.removed_meta", {
    count: cart.length
  });
  nudge.classList.add("visible");
  clearTimeout(showCartNudge._timer);
  showCartNudge._timer = setTimeout(() => {
    nudge.classList.remove("visible");
  }, 3800);
}
function openCart() {
  document.getElementById("cartNudge")?.classList.remove("visible");
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
}
function alertCheckout() {
  if (!cart.length) {
    openCart();
    return;
  }
  const lines = cart
    .map(({ id, bustine }) => {
      const bustLine = bustine === 1 ? t("cart.pack") : tv("cart.pack_many", { count: bustine });
      return `- ${plantName(id)}: ${bustLine} × ${money(packPrice(id))} = ${money(bustine * packPrice(id))}`;
    })
    .join("\n");
  const total = money(cart.reduce((sum, { id, bustine }) => sum + packPrice(id) * bustine, 0));
  const body = `${t("cart.alert")}\n\n${lines}\n\n${t("cart.estimate")}: ${total}`;
  window.location.href = `mailto:info@ortoinserra.it?subject=${encodeURIComponent(
    t("cart.mail_subject")
  )}&body=${encodeURIComponent(body)}`;
}

/* Dettaglio pianta: pannello sovrapposto con foto, semina, metriche e compatibilità. */
function lockDetailPageScroll() {
  detailScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.classList.add("detail-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${detailScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}
function unlockDetailPageScroll() {
  document.body.classList.remove("detail-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo({ top: detailScrollY, behavior: "instant" });
}

const DETAIL_TAB_ORDER = ["overview", "cultivation", "calendar", "care", "harvest"];

function setDetailTab(tab, moveFocus = false) {
  if (!DETAIL_TAB_ORDER.includes(tab)) tab = "overview";
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    const active = button.dataset.detailTab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && moveFocus) button.focus();
  });
  document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
    const active = panel.dataset.detailPanel === tab;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  const detailPanel = document.getElementById("detailPanel");
  if (detailPanel) detailPanel.scrollTo({ top: Math.max(0, document.querySelector(".detail-tabs")?.offsetTop || 0), behavior: "smooth" });
}

function handleDetailTabKey(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = DETAIL_TAB_ORDER.indexOf(event.currentTarget.dataset.detailTab);
  let next = current;
  if (event.key === "ArrowRight") next = (current + 1) % DETAIL_TAB_ORDER.length;
  if (event.key === "ArrowLeft") next = (current - 1 + DETAIL_TAB_ORDER.length) % DETAIL_TAB_ORDER.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = DETAIL_TAB_ORDER.length - 1;
  setDetailTab(DETAIL_TAB_ORDER[next], true);
}

function technicalProfile(p, guide) {
  const type = typeOfPlant(p);
  const name = plantName(p.id);
  const note = plantNote(p) || "";
  const ro = currentLang === "ro";
  const data = ro ? {
    soil: {
      frutto: "Sol profund, fertil și bine drenat, îmbogățit cu compost matur. Evită stagnarea apei în zona rădăcinilor.",
      foglia: "Sol afânat, bogat în materie organică și capabil să rămână uniform umed, fără băltire.",
      radice: "Sol fin, afânat și fără pietre. Evită gunoiul de grajd proaspăt, care poate deforma rădăcinile.",
      aromatica: "Substrat aerat și drenat. Pentru aromele mediteraneene este preferabil un sol mai slab și mai uscat.",
      legume: "Sol drenat și moderat fertil. Nu exagera cu azotul: favorizează frunzele în detrimentul păstăilor."
    },
    feed: {
      frutto: "Încorporează compost înainte de plantare; de la înflorire folosește un fertilizant echilibrat, mai bogat în potasiu.",
      foglia: "Compost matur înainte de semănat și aporturi ușoare de azot doar dacă creșterea încetinește.",
      radice: "Fertilizare moderată, cu puțin azot și suficient potasiu. Excesul produce multe frunze și rădăcini slabe.",
      aromatica: "Fertilizare redusă: excesul de azot diluează aroma și face țesuturile mai fragile.",
      legume: "De obicei compostul matur este suficient; leguminoasele fixează azot și nu cer fertilizări puternice."
    },
    maintain: {
      frutto: "Leagă plantele înalte, aerisește frunzișul și îndepărtează frunzele bolnave. Recoltarea regulată stimulează producția.",
      foglia: "Rărește la timp, menține solul curat și recoltează frunzele exterioare fără a răni centrul plantei.",
      radice: "Rărește devreme, elimină buruienile manual și evită lucrările adânci care pot răni rădăcinile.",
      aromatica: "Ciupirea vârfurilor menține planta compactă. Îndepărtează florile dacă urmărești producția de frunze.",
      legume: "Oferă suport soiurilor cățărătoare, menține baza aerisită și recoltează păstăile frecvent."
    },
    problems: {
      frutto: "În seră pot apărea afide, musculița albă, acarieni și boli foliare. Căldura excesivă poate reduce legarea fructelor.",
      foglia: "Urmărește afidele, limacșii și mucegaiurile. Umiditatea stagnantă favorizează putregaiurile și mana.",
      radice: "Muștele rădăcinilor, viermii și putregaiurile sunt riscurile principale. Solul compact provoacă rădăcini deformate.",
      aromatica: "Cele mai frecvente probleme sunt afidele, făinarea și putrezirea coletului din cauza excesului de apă.",
      legume: "Afidele, acarienii și făinarea sunt frecvente. Umiditatea neregulată poate opri formarea păstăilor."
    },
    prevent: "Aerisește sera zilnic, udă dimineața la baza plantei, nu înghesui culturile și îndepărtează imediat țesuturile bolnave. Rotește familiile botanice între cicluri.",
    harvest: {
      frutto: "Recoltează fructele când au atins culoarea și consistența tipice soiului, folosind o foarfecă curată pentru a nu rupe ramurile.",
      foglia: "Taie dimineața frunzele fragede și turgescente. Recoltează progresiv sau taie întreaga rozetă deasupra coletului.",
      radice: "Verifică dimensiunea la colet și extrage pe sol ușor umed. Nu aștepta prea mult: rădăcinile pot deveni fibroase.",
      aromatica: "Taie vârfurile înainte de înflorirea completă, dimineața după uscarea rouei, pentru aromă maximă.",
      legume: "Culege păstăile tinere și ferme la intervale scurte. Recoltarea continuă încurajează apariția altor flori."
    },
    storage: {
      frutto: "Păstrează doar exemplarele sănătoase și uscate. Consumă rapid fructele delicate; cele mature se țin la răcoare și aerisit.",
      foglia: "Răcește imediat după recoltare și păstrează în frigider, într-un recipient aerisit cu hârtie ușor umedă.",
      radice: "Îndepărtează frunzele, nu spăla înainte de depozitare și păstrează la rece, întuneric și umiditate controlată.",
      aromatica: "Folosește proaspătă, congelează frunzele curate sau usucă lent la umbră, într-un spațiu ventilat.",
      legume: "Consumă păstăile proaspete repede; pentru păstrare mai lungă opărește și congelează sau lasă semințele să se usuce complet."
    },
    rotation: "După recoltare, îndepărtează resturile și evită să replantezi aceeași familie în același loc în ciclul următor."
  } : {
    soil: {
      frutto: "Terreno profondo, fertile e ben drenato, arricchito con compost maturo. Evita ristagni nella zona delle radici.",
      foglia: "Terreno soffice, ricco di sostanza organica e capace di restare uniformemente umido senza ristagni.",
      radice: "Terreno fine, sciolto e privo di sassi. Evita letame fresco, che può deformare o biforcare le radici.",
      aromatica: "Substrato arioso e drenante. Per le aromatiche mediterranee è preferibile un terreno non troppo ricco e più asciutto.",
      legume: "Terreno drenato e moderatamente fertile. Non eccedere con l'azoto: favorisce le foglie a scapito dei baccelli."
    },
    feed: {
      frutto: "Incorpora compost prima del trapianto; dalla fioritura usa una concimazione equilibrata, con maggiore disponibilità di potassio.",
      foglia: "Compost maturo prima della semina e piccoli apporti azotati solo se la crescita rallenta o le foglie impallidiscono.",
      radice: "Concimazione moderata, con poco azoto e buon apporto di potassio. Gli eccessi producono molte foglie e radici deboli.",
      aromatica: "Concima poco: troppo azoto diluisce aroma e oli essenziali e rende i tessuti più fragili.",
      legume: "Di norma basta il compost maturo; le leguminose fissano azoto e non richiedono concimazioni spinte."
    },
    maintain: {
      frutto: "Sostieni le piante alte, arieggia la chioma e rimuovi le foglie malate. Raccogliere con regolarità mantiene produttiva la pianta.",
      foglia: "Dirada per tempo, mantieni il terreno pulito e raccogli le foglie esterne senza danneggiare il cuore della pianta.",
      radice: "Dirada presto, elimina le infestanti a mano ed evita lavorazioni profonde che possano ferire le radici.",
      aromatica: "Cimare gli apici mantiene la pianta compatta. Elimina i fiori se vuoi prolungare la produzione di foglie.",
      legume: "Predisponi sostegni per le varietà rampicanti, mantieni arieggiata la base e raccogli spesso i baccelli."
    },
    problems: {
      frutto: "In serra controlla afidi, mosca bianca, ragnetto rosso e malattie fogliari. Il caldo eccessivo può ridurre l'allegagione.",
      foglia: "Controlla afidi, limacce e muffe. Umidità stagnante e foglie sempre bagnate favoriscono marciumi e peronospora.",
      radice: "Mosche delle radici, larve terricole e marciumi sono i rischi principali. Il suolo compatto provoca radici deformate.",
      aromatica: "I problemi più comuni sono afidi, oidio e marciume del colletto causato da irrigazioni eccessive.",
      legume: "Afidi, ragnetto e oidio sono frequenti. Sbalzi idrici e caldo eccessivo possono bloccare la formazione dei baccelli."
    },
    prevent: "Arieggia la serra ogni giorno, irriga al mattino alla base, non affollare le colture e rimuovi subito i tessuti malati. Alterna le famiglie botaniche tra un ciclo e l'altro.",
    harvest: {
      frutto: "Raccogli quando il frutto ha raggiunto colore e consistenza tipici della varietà, usando forbici pulite per non strappare i rami.",
      foglia: "Taglia al mattino foglie giovani e turgide. Raccogli progressivamente oppure recidi l'intera rosetta appena sopra il colletto.",
      radice: "Controlla il diametro al colletto ed estrai con terreno leggermente umido. Non aspettare troppo: le radici possono diventare fibrose.",
      aromatica: "Taglia gli apici prima della piena fioritura, al mattino dopo che la rugiada è asciutta, per conservare il massimo aroma.",
      legume: "Raccogli baccelli giovani e sodi a intervalli brevi. La raccolta continua stimola la formazione di nuovi fiori."
    },
    storage: {
      frutto: "Conserva solo frutti sani e asciutti. Consuma presto quelli delicati; quelli maturi vanno tenuti in luogo fresco e ventilato.",
      foglia: "Raffredda subito dopo la raccolta e conserva in frigorifero, in un contenitore aerato con carta appena umida.",
      radice: "Elimina le foglie, non lavare prima dello stoccaggio e conserva al fresco, al buio e con umidità controllata.",
      aromatica: "Usa fresca, congela le foglie pulite oppure essicca lentamente all'ombra in un luogo ben ventilato.",
      legume: "Consuma rapidamente i baccelli freschi; per conservarli più a lungo sbollenta e congela, oppure lascia seccare completamente i semi."
    },
    rotation: "Dopo la raccolta elimina i residui e non ripiantare la stessa famiglia botanica nello stesso spazio nel ciclo successivo."
  };

  const water = guide?.annaffiatura || (ro ? "Udă regulat, verificând umiditatea sub stratul superficial." : "Irriga con regolarità controllando l'umidità sotto lo strato superficiale.");
  const exposure = guide?.esposizione || sunLabel(p);
  const description = [note, ro
    ? `${name} se cultivă în seră cu expunere ${exposure.toLowerCase()} și necesar de apă ${t(`water.${p.acqua}`).toLowerCase()}. Ciclul orientativ până la recoltare este de ${daysLabel(p, true).toLowerCase()}.`
    : `${name} si coltiva in serra con esposizione ${exposure.toLowerCase()} e fabbisogno idrico ${t(`water.${p.acqua}`).toLowerCase()}. Il ciclo indicativo fino alla raccolta è di ${daysLabel(p, true).toLowerCase()}.`
  ].filter(Boolean).join(" ");

  return {
    description,
    cultivation: [
      [t("detail.tech_soil"), data.soil[type]],
      [t("detail.tech_exposure"), exposure],
      [t("detail.tech_irrigation"), water],
      [t("detail.tech_feeding"), data.feed[type]]
    ],
    care: [
      [t("detail.tech_maintenance"), data.maintain[type]],
      [t("detail.tech_problems"), data.problems[type]],
      [t("detail.tech_prevention"), data.prevent],
      [t("detail.tech_rotation"), data.rotation]
    ],
    harvest: [
      [t("detail.tech_maturity"), ro ? `În medie ${daysLabel(p, true).toLowerCase()}, în funcție de soi, temperatură și lumină.` : `In media ${daysLabel(p, true).toLowerCase()}, secondo varietà, temperatura e luce.`],
      [t("detail.tech_harvest_method"), data.harvest[type]],
      [t("detail.tech_yield"), ro ? `Producție orientativă: ${yieldLabel(p)}. Recoltarea regulată îmbunătățește continuitatea.` : `Produzione indicativa: ${yieldLabel(p)}. Una raccolta regolare migliora la continuità.`],
      [t("detail.tech_storage"), data.storage[type]]
    ]
  };
}

function renderTechnicalCards(items) {
  return items.map(([title, text], index) =>
    `<article class="detail-tech-card${index === items.length - 1 && items.length % 2 ? " detail-tech-card--wide" : ""}"><h4>${title}</h4><p>${text}</p></article>`
  ).join("");
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
  topinambur: ["sclerotinia", "powdery", "botrytis"]
};

const DISEASE_PLANT_GROUP = {};
function assignDiseaseGroup(group, ids) {
  ids.forEach((id) => { DISEASE_PLANT_GROUP[id] = group; });
}
assignDiseaseGroup("solanaceae", ["pomodoro", "peperone", "peperoncino", "melanzana", "patata", "tomatillo", "physalis"]);
assignDiseaseGroup("cucurbitaceae", ["zucchina", "zucca", "cetriolo", "melone", "anguria", "kiwano", "cucamelon"]);
assignDiseaseGroup("brassicaceae", ["rucola", "cavolo", "verza", "broccolo", "cavolfiore", "cavolonero", "cavolorapa", "ravanello", "rafano", "pakchoi", "cavoletti", "rapa", "mizuna", "senape_foglia", "tatsoi", "cavolo_cinese", "daikon", "cavolo_rosso", "cavolo_navone", "broccolo_rapa"]);
assignDiseaseGroup("allium", ["cipolla", "aglio", "porro", "scalogno", "cipolla_rossa", "cipollotto", "erba_cipollina"]);
assignDiseaseGroup("apiaceae", ["carota", "finocchio", "prezzemolo", "coriandolo", "aneto", "sedano", "pastinaca", "radice_prezemolo", "sedano_rapa", "leustean"]);
assignDiseaseGroup("leafy", ["lattuga", "radicchio", "cicoria", "indivia", "valerianella", "cardo", "scorzonera"]);
assignDiseaseGroup("chenopods", ["spinaci", "bietola", "barbabietola", "loboda"]);
assignDiseaseGroup("legumes", ["fagiolino", "fagiolo", "pisello", "fava", "soia_edamame", "cece", "lenticchia", "fagiolo_borlotto"]);
assignDiseaseGroup("herbs", ["rosmarino", "timo", "origano", "salvia", "stevia_dolce", "dragoncello", "menta", "maggiorana", "shiso"]);
assignDiseaseGroup("basil", ["basilico"]);
assignDiseaseGroup("strawberry", ["fragola"]);
assignDiseaseGroup("corn", ["mais_dolce"]);
assignDiseaseGroup("asparagus", ["asparago"]);
assignDiseaseGroup("artichoke", ["carciofo"]);
assignDiseaseGroup("flowers", ["camomilla", "calendula", "nasturzio"]);
assignDiseaseGroup("sweet_potato", ["patata_dolce"]);
assignDiseaseGroup("watercress", ["crescione"]);
assignDiseaseGroup("topinambur", ["topinambur"]);
assignDiseaseGroup("okra", ["gombo"]);

function diseaseCatalog() {
  const ro = currentLang === "ro";
  const it = {
    late_blight: ["Peronospora delle solanacee", "Macchie scure e irregolari su foglie e fusti; con forte umidità compare una muffa chiara sotto la foglia e i frutti possono imbrunire.", "Rimuovi subito le parti colpite, riduci la bagnatura fogliare e aumenta il ricambio d'aria. Nei casi iniziali valuta un prodotto rameico autorizzato per coltura e avversità."],
    alternaria: ["Alternariosi", "Macchie brune concentriche, spesso simili a un bersaglio, che partono dalle foglie più vecchie e possono raggiungere fusti o frutti.", "Elimina foglie e residui infetti, irriga alla base e pratica la rotazione. Proteggi preventivamente solo con prodotti autorizzati se il problema si ripete."],
    botrytis: ["Muffa grigia (Botrite)", "Tessuti molli e bruniti ricoperti da una polvere grigia, soprattutto su fiori, frutti o foglie ferite.", "Asporta le parti colpite senza scuotere le spore, arieggia e dirada la chioma. Evita condensa, ristagni e irrigazioni serali."],
    powdery: ["Oidio o mal bianco", "Patina bianca farinosa sulle foglie, deformazioni e progressivo ingiallimento; favorito da aria ferma e forti sbalzi termici.", "Rimuovi le foglie più colpite, migliora ventilazione e distanza tra piante. Intervieni precocemente con zolfo o altro prodotto autorizzato e compatibile con la coltura."],
    downy: ["Peronospora", "Chiazze gialle o traslucide sulla pagina superiore e muffa grigiastra o violacea sotto le foglie; sviluppo rapido con elevata umidità.", "Togli le foglie malate, irriga al mattino senza bagnare la vegetazione e arieggia. Nei periodi a rischio usa solo prodotti preventivi autorizzati."],
    clubroot: ["Ernia delle crucifere", "Piante stentate che appassiscono nelle ore calde; le radici presentano rigonfiamenti e deformazioni evidenti.", "Non esiste una cura sulla pianta colpita: rimuovila con le radici. Correggi i terreni troppo acidi, migliora il drenaggio e sospendi le brassicacee nello stesso spazio per diversi cicli."],
    white_rot: ["Marciume bianco degli alli", "Ingiallimento dall'apice, crescita debole e marciume alla base con feltro bianco e piccoli corpuscoli scuri.", "Elimina pianta e terreno aderente, non compostare i residui e disinfetta gli attrezzi. Evita di coltivare alli nello stesso suolo per più anni."],
    rust: ["Ruggine", "Pustole arancioni, brune o scure sulla pagina inferiore delle foglie, seguite da ingiallimento e disseccamento.", "Rimuovi le foglie molto colpite, migliora l'aria e non eccedere con azoto. Se necessario usa un fungicida autorizzato intervenendo ai primi sintomi."],
    cercospora: ["Cercosporiosi", "Numerose macchie piccole, tonde, con centro chiaro e margine scuro; nei casi gravi le foglie seccano prematuramente.", "Elimina i residui infetti, evita di bagnare le foglie e aumenta la distanza. Ruota le colture e proteggi solo con prodotti registrati quando le condizioni restano favorevoli."],
    sclerotinia: ["Marciume da Sclerotinia", "Avvizzimento improvviso, marciume acquoso al colletto e muffa bianca cotonosa con corpi scuri all'interno.", "Rimuovi completamente piante e residui, riduci umidità e densità della coltura. Non interrare il materiale infetto e alterna con colture meno sensibili."],
    damping_off: ["Moria delle piantine", "Le giovani piantine collassano al livello del terreno; il colletto diventa sottile, scuro o acquoso.", "Non recuperare le piantine collassate. Usa substrato pulito, contenitori disinfettati, semina meno fitta e bagna senza saturare il terriccio."],
    anthracnose: ["Antracnosi", "Lesioni scure e infossate su foglie, steli o baccelli; con umidità possono comparire masse di spore rosate.", "Rimuovi le parti infette, usa seme sano e non lavorare le piante bagnate. Ruota le leguminose e valuta un prodotto autorizzato ai primi sintomi."],
    root_rot: ["Marciume radicale", "Crescita lenta, foglie pallide e appassimento nonostante il terreno umido; le radici diventano brune e molli.", "Riduci l'acqua, migliora drenaggio e aerazione del substrato. Elimina le piante gravemente colpite e rinnova il terriccio contaminato."],
    basil_downy: ["Peronospora del basilico", "Ingiallimento tra le nervature e muffa grigio-violacea sotto le foglie; il profumo e la qualità calano rapidamente.", "Elimina subito le piante colpite, irriga solo alla base e arieggia. Usa varietà tolleranti e non conservare seme da piante malate."],
    fusarium: ["Fusariosi", "Ingiallimento progressivo, appassimento e imbrunimento dei vasi interni; spesso un lato della pianta deperisce prima dell'altro.", "Non esiste una cura affidabile sulla pianta infetta: rimuovila. Usa substrato sano, varietà resistenti quando disponibili e una lunga rotazione."],
    leaf_spot: ["Maculatura fogliare", "Macchie brune o grigiastre con bordo definito, che aumentano e confluiscono fino a seccare porzioni di foglia.", "Rimuovi le foglie malate, riduci umidità e spruzzi sulla chioma, disinfetta gli attrezzi. Tratta soltanto se necessario con un prodotto specificamente autorizzato."],
    verticillium: ["Verticilliosi", "Avvizzimento graduale, ingiallimenti spesso asimmetrici e vasi interni bruni, mentre il terreno resta umido.", "Rimuovi le piante colpite e il maggior numero possibile di radici. Evita di riutilizzare il substrato e scegli colture non sensibili nei cicli successivi."],
    black_rot: ["Marciume nero", "Lesioni scure e depresse su fusti o organi di riserva, con tessuti interni anneriti e sapore amaro.", "Elimina il materiale infetto, usa solo propagazione sana e disinfetta cassette e attrezzi. Conserva in ambiente asciutto e non ferire gli organi durante la raccolta."]
  };
  if (!ro) return it;
  return {
    late_blight: ["Mana solanaceelor", "Pete întunecate neregulate pe frunze și tulpini; la umiditate ridicată apare un puf deschis pe dosul frunzei, iar fructele se brunifică.", "Îndepărtează imediat părțile afectate, nu uda frunzișul și aerisește. La debut se poate folosi un produs cupric autorizat pentru cultură și boală."],
    alternaria: ["Alternarioză", "Pete brune concentrice, ca o țintă, pornind de pe frunzele bătrâne și uneori extinzându-se pe tulpini sau fructe.", "Elimină frunzele și resturile bolnave, udă la bază și rotește culturile. Folosește preventiv numai produse autorizate dacă problema reapare."],
    botrytis: ["Putregai cenușiu (Botrytis)", "Țesuturi moi, brunificate, acoperite cu pulbere cenușie, mai ales pe flori, fructe sau răni.", "Îndepărtează părțile bolnave fără a răspândi sporii, aerisește și rărește frunzișul. Evită condensul și udarea seara."],
    powdery: ["Făinare", "Depunere albă făinoasă pe frunze, deformări și îngălbenire treptată; este favorizată de aer stagnant și variații termice.", "Îndepărtează frunzele foarte afectate și îmbunătățește aerisirea. Intervino devreme cu sulf sau alt produs autorizat și compatibil cu cultura."],
    downy: ["Mană", "Pete galbene sau translucide deasupra și puf cenușiu-violaceu pe dosul frunzelor; evoluează rapid la umiditate ridicată.", "Elimină frunzele bolnave, udă dimineața la bază și aerisește. În perioadele de risc folosește numai produse preventive autorizate."],
    clubroot: ["Hernia rădăcinilor la crucifere", "Plante pipernicite care se ofilesc la căldură; rădăcinile au umflături și deformări evidente.", "Planta bolnavă nu se vindecă: scoate-o cu rădăcină. Corectează solul prea acid, îmbunătățește drenajul și evită cruciferele mai multe cicluri."],
    white_rot: ["Putregaiul alb al cepei", "Îngălbenire de la vârf, creștere slabă și putregai la bază cu pâslă albă și mici corpuri negre.", "Elimină planta și solul lipit, nu composta resturile și dezinfectează uneltele. Nu cultiva plante din genul Allium în același sol mai mulți ani."],
    rust: ["Rugină", "Pustule portocalii, brune sau negre pe dosul frunzelor, urmate de îngălbenire și uscare.", "Îndepărtează frunzele afectate, aerisește și nu exagera cu azotul. Dacă este necesar, aplică devreme un fungicid autorizat."],
    cercospora: ["Cercosporioză", "Multe pete mici, rotunde, cu centru deschis și margine închisă; atacul puternic usucă frunzele prematur.", "Elimină resturile infectate, nu uda frunzișul și mărește distanța. Rotește culturile și folosește numai produse înregistrate."],
    sclerotinia: ["Putregai alb produs de Sclerotinia", "Ofilire bruscă, putregai apos la colet și mucegai alb vată cu formațiuni negre.", "Scoate complet plantele și resturile, reduce umiditatea și densitatea. Nu îngropa materialul infectat și alternează cu plante mai puțin sensibile."],
    damping_off: ["Căderea plăntuțelor", "Plăntuțele se prăbușesc la nivelul solului; coletul devine subțire, închis sau apos.", "Plăntuțele căzute nu se recuperează. Folosește substrat curat, recipiente dezinfectate, seamănă mai rar și nu îmbiba solul."],
    anthracnose: ["Antracnoză", "Leziuni întunecate și adâncite pe frunze, tulpini sau păstăi; la umezeală apar mase rozalii de spori.", "Îndepărtează părțile bolnave, folosește sămânță sănătoasă și nu lucra plantele ude. Rotește leguminoasele și tratează numai cu produse autorizate."],
    root_rot: ["Putregai radicular", "Creștere lentă, frunze palide și ofilire deși solul este umed; rădăcinile devin brune și moi.", "Redu udarea și îmbunătățește drenajul și aerarea. Elimină plantele grav afectate și schimbă substratul contaminat."],
    basil_downy: ["Mana busuiocului", "Îngălbenire între nervuri și puf cenușiu-violet sub frunze; aroma și calitatea scad rapid.", "Elimină imediat plantele bolnave, udă doar la bază și aerisește. Folosește soiuri tolerante și nu păstra semințe de la plante afectate."],
    fusarium: ["Fuzarioză", "Îngălbenire progresivă, ofilire și brunificarea vaselor interne; uneori o parte a plantei moare prima.", "Planta infectată nu are tratament sigur: elimin-o. Folosește substrat sănătos, soiuri rezistente și rotație lungă."],
    leaf_spot: ["Pătarea frunzelor", "Pete brune sau cenușii cu margine clară, care cresc și se unesc până usucă porțiuni din frunză.", "Îndepărtează frunzele bolnave, reduce umiditatea pe frunziș și dezinfectează uneltele. Tratează numai cu un produs autorizat specific."],
    verticillium: ["Verticilioză", "Ofilire lentă, îngălbenire adesea asimetrică și vase interne brune, deși solul rămâne umed.", "Elimină plantele și cât mai multe rădăcini. Nu reutiliza substratul și alege culturi nesensibile în ciclurile următoare."],
    black_rot: ["Putregai negru", "Leziuni închise și adâncite pe tulpini sau organe de rezervă, cu țesut intern negru și gust amar.", "Elimină materialul bolnav, folosește numai material de înmulțire sănătos și dezinfectează uneltele. Păstrează uscat și evită rănirea la recoltare."]
  };
}

function diseasesForPlant(p) {
  const group = DISEASE_PLANT_GROUP[p.id] || ({
    frutto: "solanaceae",
    foglia: "leafy",
    radice: "chenopods",
    aromatica: "herbs",
    legume: "legumes"
  }[typeOfPlant(p)]);
  const catalog = diseaseCatalog();
  return (DISEASE_GROUPS[group] || DISEASE_GROUPS.leafy)
    .map((key) => catalog[key])
    .filter(Boolean)
    .map(([name, symptoms, action]) => ({ name, symptoms, action }));
}

function renderPlantDiseases(p) {
  const diseases = diseasesForPlant(p);
  const count = document.getElementById("detailDiseasesCount");
  const list = document.getElementById("detailDiseaseList");
  if (count) count.textContent = tv("detail.diseases_count", { count: diseases.length });
  if (!list) return;
  list.innerHTML = diseases.map((disease) =>
    `<details class="detail-disease-card">
      <summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${disease.name}</span><span class="detail-disease-toggle" aria-hidden="true">+</span></summary>
      <div class="detail-disease-body">
        <div class="detail-disease-info"><b>${t("detail.disease_symptoms")}</b><p>${disease.symptoms}</p></div>
        <div class="detail-disease-info detail-disease-info--action"><b>${t("detail.disease_action")}</b><p>${disease.action}</p></div>
      </div>
    </details>`
  ).join("");
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
  other: ["aphids", "slugs", "thrips"]
};

function pestCatalog() {
  if (currentLang === "ro") return {
    aphids: ["Afide", "Colonii de insecte mici pe lăstari și sub frunze, frunze răsucite și secreții lipicioase.", "Îndepărtează jeturile mici cu apă, taie vârfurile foarte atacate și favorizează buburuzele. Dacă persistă, folosește săpun moale autorizat."],
    whiteflies: ["Musculița albă", "Nori de insecte albe la atingerea plantei, frunze lipicioase și îngălbenite.", "Folosește capcane galbene pentru monitorizare, aspiră adulții dimineața și îndepărtează frunzele puternic infestate."],
    spider_mites: ["Acarianul roșu", "Puncte galbene fine, aspect bronzat și pânze subțiri sub frunze, mai ales în aer cald și uscat.", "Mărește umiditatea fără a crea condens, spală dosul frunzelor și elimină focarele; introdu acarieni prădători dacă sunt disponibili."],
    flea_beetles: ["Purici de pământ (altice)", "Gândăcei mici, adesea negri, care sar și lasă multe găuri rotunde mici în frunze.", "Protejează plantele tinere cu plasă fină, elimină buruienile crucifere, menține solul uniform umed și intervino devreme."],
    caterpillars: ["Omizi", "Găuri neregulate, margini roase și granule întunecate pe frunze; omizile se ascund adesea pe dos.", "Inspectează și îndepărtează manual, folosește plasă anti-insecte și, la atac confirmat, un produs cu Bacillus thuringiensis autorizat."],
    thrips: ["Trips", "Dungi argintii, puncte negre și frunze deformate; insecte foarte subțiri ascunse în pliuri.", "Folosește capcane albastre pentru monitorizare, îndepărtează părțile atacate și evită aerul foarte uscat."],
    onion_fly: ["Musca cepei", "Plante care se îngălbenesc și se desprind ușor; larve albe în bulb sau la bază.", "Scoate plantele atacate, folosește plasă fină și rotește culturile de Allium; nu lăsa bulbi bolnavi în sol."],
    leafminers: ["Minatori foliari", "Galerii deschise și șerpuitoare în interiorul frunzei.", "Îndepărtează frunzele cu galerii înainte ca larva să iasă, folosește plasă fină și capcane adezive pentru monitorizare."],
    carrot_fly: ["Musca morcovului", "Frunziș roșiatic și galerii ruginii în rădăcini, uneori cu gust amar.", "Protejează cu plasă fină, rărește fără a lăsa resturi lângă cultură și rotește plantele umbelifere."],
    slugs: ["Limacși și melci", "Găuri mari neregulate, margini roase și urme lucioase de mucus.", "Culege seara, elimină ascunzătorile umede și folosește bariere sau momeli autorizate pe bază de fosfat feric."],
    weevils: ["Gărgărițe", "Margini frunzelor ciupite și semințe sau păstăi perforate; adulți mici și închiși la culoare.", "Îndepărtează adulții, resturile și semințele infestate, rotește cultura și folosește plasă în perioadele de zbor."]
  };
  return {
    aphids: ["Afidi", "Colonie di piccoli insetti su germogli e pagina inferiore, foglie arricciate e melata appiccicosa.", "Rimuovi piccoli focolai con acqua, taglia gli apici molto infestati e favorisci le coccinelle. Se persistono, usa sapone molle autorizzato."],
    whiteflies: ["Mosca bianca", "Nuvole di insetti bianchi quando tocchi la pianta, foglie appiccicose e ingiallite.", "Usa trappole gialle per monitorare, aspira gli adulti al mattino e rimuovi le foglie molto infestate."],
    spider_mites: ["Ragnetto rosso", "Puntinatura gialla, aspetto bronzeo e sottili ragnatele sotto le foglie, soprattutto con caldo secco.", "Aumenta l'umidità senza creare condensa, lava la pagina inferiore e rimuovi i focolai; introduci acari predatori se disponibili."],
    flea_beetles: ["Altiche", "Piccoli coleotteri spesso neri che saltano e lasciano molti forellini rotondi sulle foglie.", "Proteggi le piante giovani con rete fine, elimina le infestanti crucifere, mantieni il terreno uniformemente umido e intervieni presto."],
    caterpillars: ["Bruchi e cavolaie", "Fori irregolari, margini rosicchiati ed escrementi scuri; i bruchi spesso sono nascosti sotto la foglia.", "Ispeziona e rimuovi a mano, usa rete anti-insetto e, con attacco confermato, un prodotto autorizzato a base di Bacillus thuringiensis."],
    thrips: ["Tripidi", "Striature argentate, puntini neri e foglie deformate; insetti sottilissimi nascosti nelle pieghe.", "Usa trappole blu per monitorare, elimina le parti colpite ed evita aria eccessivamente secca."],
    onion_fly: ["Mosca della cipolla", "Piante che ingialliscono e si sfilano facilmente; larve bianche nel bulbo o alla base.", "Rimuovi le piante colpite, usa rete fine e ruota gli alli; non lasciare bulbi malati nel terreno."],
    leafminers: ["Minatori fogliari", "Gallerie chiare e sinuose scavate all'interno della foglia.", "Rimuovi le foglie con mine prima che la larva esca, usa rete fine e trappole adesive per monitorare."],
    carrot_fly: ["Mosca della carota", "Foglie rossastre e gallerie color ruggine nelle radici, talvolta amare.", "Proteggi con rete fine, dirada senza lasciare residui vicino alla coltura e ruota le ombrellifere."],
    slugs: ["Limacce e chiocciole", "Grandi fori irregolari, bordi mangiati e tracce lucide di bava.", "Raccogli la sera, elimina i rifugi umidi e usa barriere o esche autorizzate a base di fosfato ferrico."],
    weevils: ["Tonchi e oziorrinchi", "Margini fogliari intaccati e semi o baccelli perforati; piccoli adulti scuri.", "Rimuovi adulti, residui e semi infestati, ruota la coltura e usa rete nei periodi di volo."]
  };
}

function pestsForPlant(p) {
  const diseaseGroup = DISEASE_PLANT_GROUP[p.id] || "other";
  const group = PEST_GROUPS[diseaseGroup] ? diseaseGroup : "other";
  const catalog = pestCatalog();
  return PEST_GROUPS[group].map((key) => {
    const entry = catalog[key];
    return entry ? { key, name: entry[0], signs: entry[1], action: entry[2] } : null;
  }).filter(Boolean);
}

function pestProductsCatalog() {
  if (currentLang === "ro") return {
    aphids: "Săpun potasic sau ulei de neem direct pe colonii și sub frunze; pentru atac puternic, piretrine naturale.",
    whiteflies: "Ulei de neem ori ulei horticol pe ouă și nimfe, săpun potasic pe stadiile mobile; Beauveria bassiana la umiditate adecvată.",
    spider_mites: "Ulei de neem sau horticol sub frunze, apoi acaricid specific dacă atacul continuă; biologic, Phytoseiulus persimilis.",
    flea_beetles: "Ulei de neem/azadiractină pe frunzele tinere ca repelent și inhibitor al hrănirii; spinosad ori piretrine contra adulților. Aplică devreme și seara.",
    caterpillars: "Bacillus thuringiensis var. kurstaki pe omizi mici; spinosad pe larve mai dificile, evitând florile vizitate de albine.",
    thrips: "Spinosad în zonele ascunse; alternativ ulei de neem/azadiractină sau săpun potasic cu acoperire completă.",
    onion_fly: "Nematozi Steinernema feltiae în sol umed contra larvelor; spinosad numai dacă eticheta include cultura Allium și musca țintă.",
    leafminers: "Spinosad pe larvele tinere; azadiractină/ulei de neem la începutul galeriilor pentru a reduce hrănirea și dezvoltarea.",
    carrot_fly: "Nematozi Steinernema feltiae în sol contra larvelor; piretrine pe adulți numai dacă eticheta include morcovul.",
    slugs: "Momeli granulare cu fosfat feric, împrăștiate uniform și reînnoite după ploaie sau udare conform etichetei.",
    weevils: "Ulei de neem/azadiractină ori piretrine pe adulți; Steinernema kraussei sau Heterorhabditis bacteriophora contra larvelor din sol."
  };
  return {
    aphids: "Sapone molle potassico o olio di neem sulle colonie, bagnando bene la pagina inferiore; per infestazioni forti, piretrine naturali. Ripeti solo secondo etichetta.",
    whiteflies: "Olio di neem o olio orticolo su uova e neanidi, sapone molle sugli stadi mobili; Beauveria bassiana funziona meglio con umidità adeguata.",
    spider_mites: "Olio di neem o olio orticolo sulla pagina inferiore, poi un acaricida specifico se l'attacco continua; nel biologico usa Phytoseiulus persimilis.",
    flea_beetles: "Olio di neem/azadiractina sulle foglie giovani come repellente e antialimentare; spinosad o piretrine per abbattere gli adulti. Tratta presto e la sera.",
    caterpillars: "Bacillus thuringiensis var. kurstaki quando i bruchi sono piccoli e stanno mangiando; spinosad per larve più difficili, evitando i fiori visitati dalle api.",
    thrips: "Spinosad sulle parti giovani e nei punti nascosti; in alternativa olio di neem/azadiractina o sapone molle con copertura accurata. Alterna i principi attivi.",
    onion_fly: "Nematodi Steinernema feltiae nel terreno umido contro le larve; spinosad solo se l'etichetta comprende l'allio e la mosca bersaglio.",
    leafminers: "Spinosad penetra parzialmente nella foglia ed è adatto alle larve giovani; azadiractina/olio di neem riduce alimentazione e sviluppo se applicata all'inizio delle mine.",
    carrot_fly: "Nematodi Steinernema feltiae nel suolo contro le larve; piretrine solo sugli adulti e solo se l'etichetta include carota e mosca della carota.",
    slugs: "Esche granulari a base di fosfato ferrico, sparse uniformemente e rinnovate dopo pioggia o irrigazione secondo etichetta; evita mucchietti vicino alle piante.",
    weevils: "Olio di neem/azadiractina o piretrine sugli adulti; nematodi Steinernema kraussei o Heterorhabditis bacteriophora nel terreno contro le larve."
  };
}

function targetedPestProducts(p) {
  const group = PEST_GROUPS[DISEASE_PLANT_GROUP[p.id]] ? DISEASE_PLANT_GROUP[p.id] : "other";
  const ro = currentLang === "ro";
  const plans = ro ? {
    solanaceae: {
      aphids: "Săpun potasic pe colonii tinere; la atac puternic, flonicamid. Aplică sub frunze și pe vârfurile plantei.",
      whiteflies: "Beauveria bassiana pe nimfe și adulți; pyriproxyfen pe ouă și nimfe pentru întreruperea ciclului.",
      spider_mites: "Abamectin pe forme mobile și hexythiazox pe ouă; biologic, Phytoseiulus persimilis."
    },
    cucurbitaceae: {
      aphids: "Flonicamid pentru oprirea hrănirii; săpun potasic pentru focare mici, cu acoperire sub frunze.",
      whiteflies: "Beauveria bassiana la umiditate controlată și săpun potasic pe nimfele expuse.",
      spider_mites: "Hexythiazox pe ouă urmat de abamectin pe forme mobile; alternativ Phytoseiulus persimilis."
    },
    brassicaceae: {
      flea_beetles: "Spinosad sau piretrine naturale pe adulții activi, aplicate devreme pe plantele tinere.",
      caterpillars: "Bacillus thuringiensis var. kurstaki pe larve mici; spinosad pe larve mai dezvoltate.",
      aphids: "Flonicamid pentru coloniile ascunse în rozetă; săpun potasic pe coloniile expuse."
    },
    allium: {
      thrips: "Spinosad în teaca frunzelor; Beauveria bassiana cu umiditate adecvată pentru a reduce adulții și nimfele.",
      onion_fly: "Steinernema feltiae în sol umed contra larvelor; spinosad numai în tratamente specifice culturii.",
      leafminers: "Spinosad la apariția primelor galerii; cyromazine pe larvele tinere unde este prevăzută pentru cultură."
    },
    apiaceae: {
      carrot_fly: "Steinernema feltiae în sol contra larvelor; piretrine pe adulți în perioada de zbor.",
      aphids: "Săpun potasic pe coloniile expuse; flonicamid dacă frunzele sunt deja răsucite.",
      leafminers: "Spinosad la începutul galeriilor; îndepărtează frunzele minate înainte de repetarea tratamentului."
    },
    leafy: {
      flea_beetles: "Piretrine naturale pentru reducerea rapidă a adulților; spinosad dacă paguba continuă pe frunzele noi.",
      slugs: "Fosfat feric granular în jurul stratului, reînnoit după udări abundente.",
      aphids: "Săpun potasic pe ambele fețe ale frunzei; piretrine numai pentru colonii persistente."
    },
    chenopods: {
      leafminers: "Spinosad pe larve tinere, imediat ce apar primele galerii.",
      aphids: "Săpun potasic pe colonii; flonicamid dacă frunzele se deformează.",
      flea_beetles: "Piretrine naturale pe adulți; spinosad dacă paguba crește pe frunzele tinere."
    },
    legumes: {
      aphids: "Flonicamid pentru afidele din vârfuri și flori; săpun potasic pentru focare localizate.",
      weevils: "Piretrine pe adulți; Heterorhabditis bacteriophora în sol contra larvelor.",
      spider_mites: "Abamectin pe forme mobile; biologic, Phytoseiulus persimilis."
    },
    herbs: {
      aphids: "Săpun potasic, cu spălarea atentă a frunzelor înainte de recoltare; piretrine numai la atac puternic.",
      whiteflies: "Beauveria bassiana și capcane galbene; săpun potasic pe nimfele expuse.",
      spider_mites: "Phytoseiulus persimilis sau ulei horticol ușor pe dosul frunzei; evită tratamentele care afectează aroma."
    },
    basil: {
      aphids: "Săpun potasic pe vârfuri și sub frunze, apoi clătirea frunzelor înainte de consum.",
      thrips: "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică.",
      slugs: "Fosfat feric granular pe sol, fără contact direct cu frunzele de recoltat."
    },
    strawberry: {
      spider_mites: "Phytoseiulus persimilis la începutul atacului; bifenazate pe forme mobile dacă populația crește.",
      aphids: "Săpun potasic înainte de înflorire; flonicamid dacă apar colonii persistente.",
      slugs: "Fosfat feric între plante, fără a pune granulele pe fructe."
    },
    other: {
      aphids: "Săpun potasic pe colonii; flonicamid la atac persistent.",
      slugs: "Fosfat feric granular distribuit uniform pe sol.",
      thrips: "Spinosad în punctele de creștere; Beauveria bassiana ca alternativă biologică."
    }
  } : {
    solanaceae: {
      aphids: "Sapone molle potassico sulle colonie giovani; con attacco forte, flonicamid. Bagna bene pagina inferiore e germogli.",
      whiteflies: "Beauveria bassiana su neanidi e adulti; pyriproxyfen su uova e neanidi per interrompere il ciclo.",
      spider_mites: "Abamectina sulle forme mobili ed hexythiazox sulle uova; nel biologico, Phytoseiulus persimilis."
    },
    cucurbitaceae: {
      aphids: "Flonicamid per bloccare l'alimentazione; sapone molle sui piccoli focolai, coprendo la pagina inferiore.",
      whiteflies: "Beauveria bassiana con umidità controllata e sapone molle sulle neanidi esposte.",
      spider_mites: "Hexythiazox sulle uova seguito da abamectina sulle forme mobili; alternativa biologica: Phytoseiulus persimilis."
    },
    brassicaceae: {
      flea_beetles: "Spinosad o piretrine naturali sugli adulti attivi, applicati presto sulle piante giovani.",
      caterpillars: "Bacillus thuringiensis var. kurstaki sui bruchi piccoli; spinosad sulle larve più sviluppate.",
      aphids: "Flonicamid per le colonie nascoste nella rosetta; sapone molle sulle colonie esposte."
    },
    allium: {
      thrips: "Spinosad nella guaina delle foglie; Beauveria bassiana con umidità adeguata contro adulti e neanidi.",
      onion_fly: "Steinernema feltiae nel suolo umido contro le larve; spinosad soltanto nei trattamenti specifici per la coltura.",
      leafminers: "Spinosad alla comparsa delle prime mine; cyromazine sulle larve giovani dove prevista per la coltura."
    },
    apiaceae: {
      carrot_fly: "Steinernema feltiae nel suolo contro le larve; piretrine sugli adulti durante il periodo di volo.",
      aphids: "Sapone molle sulle colonie esposte; flonicamid quando le foglie sono già arricciate.",
      leafminers: "Spinosad all'inizio delle gallerie; rimuovi le foglie minate prima di ripetere il trattamento."
    },
    leafy: {
      flea_beetles: "Piretrine naturali per abbattere rapidamente gli adulti; spinosad se il danno continua sulle foglie nuove.",
      slugs: "Fosfato ferrico granulare attorno all'aiuola, rinnovato dopo irrigazioni abbondanti.",
      aphids: "Sapone molle su entrambe le pagine fogliari; piretrine solo per colonie persistenti."
    },
    chenopods: {
      leafminers: "Spinosad sulle larve giovani, appena compaiono le prime gallerie.",
      aphids: "Sapone molle sulle colonie; flonicamid se le foglie iniziano a deformarsi.",
      flea_beetles: "Piretrine naturali sugli adulti; spinosad se il danno aumenta sulle foglie giovani."
    },
    legumes: {
      aphids: "Flonicamid per gli afidi su apici e fiori; sapone molle per focolai localizzati.",
      weevils: "Piretrine sugli adulti; Heterorhabditis bacteriophora nel terreno contro le larve.",
      spider_mites: "Abamectina sulle forme mobili; nel biologico, Phytoseiulus persimilis."
    },
    herbs: {
      aphids: "Sapone molle, lavando con cura le foglie prima della raccolta; piretrine solo con attacco forte.",
      whiteflies: "Beauveria bassiana e trappole gialle; sapone molle sulle neanidi esposte.",
      spider_mites: "Phytoseiulus persimilis oppure olio orticolo leggero sotto le foglie; evita trattamenti che alterano l'aroma."
    },
    basil: {
      aphids: "Sapone molle su germogli e pagina inferiore, poi risciacquo accurato prima del consumo.",
      thrips: "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica.",
      slugs: "Fosfato ferrico granulare sul terreno, senza contatto diretto con le foglie da raccogliere."
    },
    strawberry: {
      spider_mites: "Phytoseiulus persimilis all'inizio dell'attacco; bifenazate sulle forme mobili se la popolazione cresce.",
      aphids: "Sapone molle prima della fioritura; flonicamid se compaiono colonie persistenti.",
      slugs: "Fosfato ferrico tra le piante, evitando il contatto dei granuli con i frutti."
    },
    other: {
      aphids: "Sapone molle sulle colonie; flonicamid con attacco persistente.",
      slugs: "Fosfato ferrico granulare distribuito uniformemente sul terreno.",
      thrips: "Spinosad nei punti di crescita; Beauveria bassiana come alternativa biologica."
    }
  };
  const specific = {
    rucola: {
      flea_beetles: ro
        ? "Pentru rucola: ulei de neem/azadiractină ca repelent și inhibitor al hrănirii; spinosad dacă puricii continuă să perforeze frunzele noi."
        : "Per la rucola: olio di neem/azadiractina come repellente e antialimentare; spinosad se le altiche continuano a perforare le foglie nuove."
    },
    pomodoro: { whiteflies: ro ? "Pentru tomate: Beauveria bassiana pe nimfe, apoi Encarsia formosa pentru control biologic continuu; pyriproxyfen dacă ciclul nu se întrerupe." : "Per il pomodoro: Beauveria bassiana sulle neanidi, poi Encarsia formosa per il controllo biologico continuo; pyriproxyfen se il ciclo non si interrompe." },
    basilico: { thrips: ro ? "Pentru busuioc: Beauveria bassiana sau spinosad în vârfurile tinere; evită uleiurile aproape de recoltare pentru a nu altera frunzele." : "Per il basilico: Beauveria bassiana o spinosad nei germogli giovani; evita oli vicino alla raccolta per non alterare le foglie." },
    cavolo: { caterpillars: ro ? "Pentru varză: Bacillus thuringiensis kurstaki seara pe omizile mici; spinosad dacă larvele sunt deja mari și ascunse în frunze." : "Per il cavolo: Bacillus thuringiensis kurstaki la sera sui bruchi piccoli; spinosad se le larve sono già grandi e nascoste nelle foglie." },
    fragola: { spider_mites: ro ? "Pentru căpșun: Phytoseiulus persimilis înainte de înflorirea intensă; bifenazate dacă apar pânze și bronzarea frunzelor." : "Per la fragola: Phytoseiulus persimilis prima della piena fioritura; bifenazate se compaiono ragnatele e bronzatura fogliare." },
    carota: { carrot_fly: ro ? "Pentru morcov: Steinernema feltiae în sol umed la eclozarea larvelor; piretrine doar pe adulți în perioada de zbor." : "Per la carota: Steinernema feltiae nel terreno umido alla schiusa delle larve; piretrine solo sugli adulti durante il volo." },
    cipolla: { onion_fly: ro ? "Pentru ceapă: Steinernema feltiae în sol umed, repetat pe generațiile larvare; elimină bulbii atacați înainte de orice nou tratament." : "Per la cipolla: Steinernema feltiae nel terreno umido, ripetuto sulle generazioni larvali; elimina i bulbi colpiti prima di ogni nuovo trattamento." }
  };
  return { ...(plans.other || {}), ...(plans[group] || {}), ...(specific[p.id] || {}) };
}

function renderPlantPests(p) {
  const pests = pestsForPlant(p);
  const products = targetedPestProducts(p);
  const count = document.getElementById("detailPestsCount");
  const list = document.getElementById("detailPestList");
  if (count) count.textContent = tv("detail.pests_count", { count: pests.length });
  if (!list) return;
  list.innerHTML = pests.map((pest) => `<details class="detail-disease-card"><summary><span class="detail-disease-marker" aria-hidden="true"></span><span>${pest.name}</span><span class="detail-disease-toggle" aria-hidden="true">+</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${t("detail.pest_signs")}</b><p>${pest.signs}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${t("detail.pest_action")}</b><p>${pest.action}</p></div><div class="detail-disease-info detail-disease-info--products"><b>${t("detail.pest_products")} · ${plantName(p.id)}</b><p>${products[pest.key]}</p></div></div></details>`).join("");
}

function openDetail(id, preserveTab = false) {
  const p = BYID[id];
  if (!p) return;
  const overlay = document.getElementById("detailOverlay");
  const wasOpen = overlay.classList.contains("open");
  const previousTab = document.querySelector("[data-detail-tab].active")?.dataset.detailTab || "overview";
  currentDetail = id;
  const guide = localizedSowingGuide(p);
  const profile = technicalProfile(p, guide);

  // Foto principale.
  document.getElementById("detailPhoto").src = photoSrc(id);
  document.getElementById("detailPhoto").alt = plantName(id);
  document.getElementById("detailName").textContent = plantName(id);

  // Tipo e difficoltà nella sezione hero: usa le chiavi traduzione corrette.
  const tipo = TIPO[p.id] || "foglia";
  const diffLevel = DIFFICULTY[p.id] || 2;
  const diffLabel = diffLevel === 1
    ? t("detail.diff_easy")
    : diffLevel === 2
    ? t("detail.diff_medium")
    : t("detail.diff_hard");
  const diffClass = diffLevel === 1 ? "diff-easy" : diffLevel === 2 ? "diff-medium" : "diff-hard";
  document.getElementById("detailTypeBadge").textContent = typeLabel(tipo);
  const diffEl = document.getElementById("detailDiff");
  diffEl.textContent = diffLabel;
  diffEl.className = `detail-hero-diff ${diffClass}`;

  // Badge rapidi: sole e acqua nella parte alta del contenuto.
  document.getElementById("detailBadges").innerHTML =
    `<span class="badge badge--sun">${SOLE_ICON[p.sole]} ${sunLabel(p)}</span>
     <span class="badge badge--water">${ACQUA_ICON[p.acqua]} ${t("plant.water")} ${t(`water.${p.acqua}`)}</span>
     <span class="badge badge--type" style="${TIPO_STYLE[tipo] || ''}">${typeLabel(tipo)}</span>`;

  // Nota pratica.
  const nota = plantNote(p);
  const notaEl = document.getElementById("detailNota");
  notaEl.textContent = profile.description;
  notaEl.hidden = !profile.description;

  // Infografica distanze.
  const sp = PLANT_SPACING[p.id] || {};
  const svgDiagram = spacingInfographic(p);
  const spacingValStr = spacingLabel(p);
  document.getElementById("detailSpacing").innerHTML = sp.d
    ? `<div class="detail-spacing-header">
         <span class="detail-tile-label">${t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">${spacingValStr}</b>
       </div>
       <div class="detail-spacing-diagram">${svgDiagram}</div>`
    : `<div class="detail-spacing-header">
         <span class="detail-tile-label">${t("detail.spacing_label")}</span>
         <b class="detail-spacing-val">—</b>
       </div>`;

  // Tessere statistiche 2x2: raccolta, resa, altezza in cm, prezzo/bustina.
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
  document.getElementById("detailCareGuide").innerHTML =
    renderTechnicalCards(profile.care);
  renderPlantDiseases(p);
  renderPlantPests(p);
  document.getElementById("detailHarvestGuide").innerHTML =
    renderTechnicalCards(profile.harvest);

  // Barra mesi con abbreviazioni.
  const activeMonths = Array.from(effectiveMonths(p))
    .sort((a, b) => a - b)
    .map((m) => ABBR_MESI[m - 1])
    .join(", ");
  const monthLegend = {
    available: t("detail.month_available"),
    selected: t("detail.month_selected"),
    outside: t("detail.month_outside")
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

  // Abbinamenti: piante amiche e nemiche.
  let comp = "";
  if (p.amiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label">💚 ${t("detail.friends")}</div>
      <div class="companion-list">${p.amiche.map(aid =>
        `<span class="companion-chip friend">${fruitEmoji(aid)} ${plantName(aid)}</span>`
      ).join("")}</div>
    </div>`;
  if (p.nemiche.length)
    comp += `<div class="detail-companions-group">
      <div class="detail-companions-label detail-companions-label--foe">⚠️ ${t("detail.enemies")}</div>
      <div class="companion-list">${p.nemiche.map(eid =>
        `<span class="companion-chip foe">${fruitEmoji(eid)} ${plantName(eid)}</span>`
      ).join("")}</div>
    </div>`;
  const compEl = document.getElementById("detailCompanions");
  compEl.innerHTML = comp;
  compEl.hidden = !comp;

  // Guida alla semina.
  const sowEl = document.getElementById("detailSow");
  const sowBodyEl = document.getElementById("detailSowBody");
  let sowHtml = "";
  if (guide) {
    if (guide.method)      sowHtml += `<div class="detail-sow-row"><b>🌱 ${t("detail.sow_method")}</b> — ${guide.method}</div>`;
    if (guide.periodo)     sowHtml += `<div class="detail-sow-row"><b>📅 ${t("detail.sow_period")}</b> — ${guide.periodo}</div>`;
    if (guide.depth)       sowHtml += `<div class="detail-sow-row"><b>📏 ${t("detail.sow_depth")}</b> — ${guide.depth}</div>`;
    if (guide.thin)        sowHtml += `<div class="detail-sow-row"><b>📐 ${t("detail.sow_thin")}</b> — ${guide.thin}</div>`;
    if (guide.tempGerm && guide.tempGerm !== "—")     sowHtml += `<div class="detail-sow-row"><b>🌡️ ${t("detail.sow_temp")}</b> — ${guide.tempGerm}</div>`;
    if (guide.giorniGerm && guide.giorniGerm !== "—") sowHtml += `<div class="detail-sow-row"><b>⏳ ${t("detail.sow_germ")}</b> — ${guide.giorniGerm}</div>`;
    if (guide.esposizione) sowHtml += `<div class="detail-sow-row"><b>☀️ ${t("detail.sow_exposure")}</b> — ${guide.esposizione}</div>`;
    if (guide.annaffiatura) sowHtml += `<div class="detail-sow-row"><b>💧 ${t("detail.sow_water")}</b> — ${guide.annaffiatura}</div>`;
    if (guide.tip || nota) sowHtml += `<blockquote class="detail-sow-tip">💡&nbsp;${guide.tip || nota}</blockquote>`;
  } else if (nota) {
    sowHtml += `<blockquote class="detail-sow-tip">💡&nbsp;${nota}</blockquote>`;
  }
  sowBodyEl.innerHTML = sowHtml;
  sowEl.hidden = !sowHtml;

  // Pulsante carrello.
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
function detailAddToCart() {
  if (!currentDetail) return;
  const added = !inCart(currentDetail);
  cart = added
    ? [...cart, { id: currentDetail, bustine: 1 }]
    : cart.filter(i => i.id !== currentDetail);
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
function closeDetail(e) {
  if (e && e.target !== document.getElementById("detailOverlay")) return;
  document.getElementById("detailOverlay").classList.remove("open");
  unlockDetailPageScroll();
  currentDetail = null;
}
document
  .getElementById("detailPanel")
  .addEventListener("click", (e) => e.stopPropagation());
document.getElementById("detailOverlay")?.addEventListener("touchmove", (e) => {
  const panel = document.getElementById("detailPanel");
  if (!panel || !panel.contains(e.target)) e.preventDefault();
}, { passive: false });
document.getElementById("detailPanel")?.addEventListener("touchstart", (e) => {
  detailTouchY = e.touches?.[0]?.clientY ?? null;
}, { passive: true });
document.getElementById("detailPanel")?.addEventListener("touchmove", (e) => {
  const panel = document.getElementById("detailPanel");
  const y = e.touches?.[0]?.clientY;
  if (!panel || y == null || detailTouchY == null) return;
  const deltaY = y - detailTouchY;
  const atTop = panel.scrollTop <= 0;
  const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
  if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) e.preventDefault();
  detailTouchY = y;
}, { passive: false });

/* Controlli interfaccia: clima, mese e filtri catalogo. */
function setZone(z) {
  state.zona = z;
  render();
}
function toggleHeated() {
  state.riscaldata = !state.riscaldata;
  render();
}
function setMese(m) {
  state.mese = m;
  render();
}
function syncCatalogControls() {
  const search = document.getElementById("catalogSearch");
  const type = document.getElementById("catalogType");
  const sort = document.getElementById("catalogSort");
  const season = document.getElementById("catalogSeasonOnly");
  const allToggle = document.getElementById("catalogAllToggle");
  const easy = document.getElementById("catalogEasyOnly");
  if (search && search !== document.activeElement) search.value = catalog.search;
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
    const easyCount = easyBase.filter(p => EASY_IDS.has(p.id)).length;
    const easyCountEl = easy.querySelector(".chip-count");
    if (easyCountEl) easyCountEl.textContent = easyCount;
  }
  const anyExtra = catalog.search || catalog.type || catalog.easyOnly || !catalog.seasonOnly || catalog.sort !== "season";
  const resetBtn = document.getElementById("catalogReset");
  if (resetBtn) resetBtn.hidden = !anyExtra;
}
function setCatalogSearch(value) {
  catalog.search = value;
  render();
  updateCatalogSearchSuggestions();
}
function hideCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (list) {
    list.hidden = true;
    list.innerHTML = "";
  }
  if (input) input.setAttribute("aria-expanded", "false");
}
function selectCatalogSearchSuggestion(name) {
  catalog.search = name;
  const input = document.getElementById("catalogSearch");
  if (input) input.value = name;
  render();
  hideCatalogSearchSuggestions();
}
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
        `<li role="option"><button type="button" data-name="${escapeHtml(name)}">${escapeHtml(name)}</button></li>`
    )
    .join("");
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
}
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
function clearCatalogSearch() {
  catalog.search = "";
  const input = document.getElementById("catalogSearch");
  if (input) {
    input.value = "";
    input.focus();
  }
  render();
}
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
function setCatalogType(value) {
  catalog.type = value;
  render();
}
function toggleCatalogSeasonOnly() {
  catalog.seasonOnly = true;
  render();
}
function toggleCatalogFull() {
  catalog.seasonOnly = false;
  render();
}
function toggleCatalogEasyOnly() {
  catalog.easyOnly = !catalog.easyOnly;
  render();
}
function setCatalogSort(value) {
  catalog.sort = value || "season";
  render();
}
function setCatalogCategory(type) {
  catalog.type = type || "";
  render();
}
function renderCatalogCategoryRail(base) {
  const rail = document.getElementById("catalogCategoryRail");
  if (!rail) return;
  const categories = [{ type: "", count: base.length, icon: "🌿", label: t("catalog.type_all") }].concat(
    catalogTypeCounts(base).map(({ type, count }) => ({
      type,
      count,
      icon: ({ frutto: "🍅", foglia: "🥬", radice: "🥕", legume: "🫘", aromatica: "🌿" })[type] || "🌱",
      label: typeLabel(type)
    }))
  );
  rail.innerHTML = categories.map((cat) => `<button class="catalog-category-chip${catalog.type === cat.type ? " active" : ""}" type="button" onclick="setCatalogCategory('${cat.type}')" aria-pressed="${catalog.type === cat.type}">
    <span class="category-ico" aria-hidden="true">${cat.icon}</span>
    <span class="category-label">${cat.label}</span>
    <span class="category-count">${cat.count}</span>
  </button>`).join("");
}
function renderCatalogInsights(plants, base) {
  const box = document.getElementById("catalogInsights");
  if (!box) return;
  const cartCount = cart.length;
  const fastCount = plants.filter((p) => p.gg && p.gg <= 45).length;
  const compactCount = plants.filter((p) => plantDistanceValue(p) <= 25).length;
  const seasonalCount = base.filter((p) => effectiveMonths(p).has(state.mese)).length;
  box.innerHTML = `
    <span><b>${plants.length}</b> ${t("catalog.results")}</span>
    <span><b>${seasonalCount}</b> ${t("catalog.insight_seasonal")}</span>
    <span><b>${fastCount}</b> ${t("catalog.insight_fast")}</span>
    <span><b>${compactCount}</b> ${t("catalog.insight_compact")}</span>
    <span><b>${cartCount}</b> ${t("catalog.insight_cart")}</span>`;
}
function showFullCatalog() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.seasonOnly = false;
  catalog.sort = "season";
  render();
}

/* Persistenza: preferenze utente salvate in localStorage. */
function savePrefs() {
  localStorage.setItem("ois.cart", JSON.stringify(cart));
  localStorage.setItem(
    "ois.prefs",
    JSON.stringify({
      zona: state.zona,
      riscaldata: state.riscaldata,
      mese: state.mese
    })
  );
}
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem("ois.prefs") || "{}");
    if (p.zona) state.zona = p.zona;
    if (p.riscaldata !== undefined) state.riscaldata = p.riscaldata;
    if (p.mese) state.mese = p.mese;
    const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
    cart = raw.map(i => typeof i === "string" ? { id: i, bustine: 1 } : i);
  } catch (_) {}
}

/* Lingua: cambio IT/RO, testi statici e nomi piante localizzati. */
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
  "Decembrie"
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
  "Dec"
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
  12: "Decembrie rece, dar înăuntru crește încă ceva."
};
const HERO_KICKER_RO = {
  inverno: "❄️ Seră rece activă",
  primavera: "🌸 Sezon în floare",
  estate: "🌞 Vară deplină în seră",
  autunno: "🍂 Recoltă de toamnă"
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
  12: "Planifică rotația culturilor: nu pune aceeași familie în același loc."
};

/* Copie IT: base di ripristino quando si torna alla lingua italiana. */
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

function t(key) {
  return (T[currentLang] || {})[key] || T.it[key] || key;
}

function applyLang(lang) {
  lang = normalizeLang(lang);
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t("page.title");
  const sel = document.getElementById("langSelect");
  if (sel) sel.value = lang;

  if (lang === "ro") {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_RO);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_RO);
    Object.keys(STAGIONE_QUOTE_RO).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_RO[k])
    );
    Object.keys(HERO_KICKER_RO).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_RO[k])
    );
    Object.keys(TIP_MESE_RO).forEach((k) => (TIP_MESE[k] = TIP_MESE_RO[k]));
  } else {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_IT);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_IT);
    Object.keys(STAGIONE_QUOTE_IT).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_IT[k])
    );
    Object.keys(HERO_KICKER_IT).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_IT[k])
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

  localStorage.setItem("ois.lang", lang);
  render();
  if (currentDetail && document.getElementById("detailOverlay")?.classList.contains("open")) {
    openDetail(currentDetail, true);
  }
}

function setLang(lang) {
  applyLang(normalizeLang(lang));
}

window.addEventListener("storage", (event) => {
  if (event.key !== "ois.lang") return;
  const nextLang = normalizeLang(event.newValue);
  if (nextLang === currentLang) return;
  applyLang(nextLang);
});

/* Banner cookie: preferenza essenziale/completa salvata localmente. */
function initCookieBanner() {
  if (localStorage.getItem("ois.cookie")) return;
  setTimeout(() => {
    const b = document.getElementById("cookieBanner");
    if (b) b.classList.add("visible");
  }, 1400);
}
function acceptCookies() {
  localStorage.setItem("ois.cookie", "accepted");
  document.getElementById("cookieBanner").classList.remove("visible");
}
function rejectCookies() {
  localStorage.setItem("ois.cookie", "essential");
  document.getElementById("cookieBanner").classList.remove("visible");
}

/* Torna su: mostra il pulsante dopo lo scroll. */
window.addEventListener(
  "scroll",
  function () {
    const btn = document.getElementById("backToTop");
    if (btn) btn.classList.toggle("visible", window.scrollY > 420);
  },
  { passive: true }
);

loadPrefs();
if (new URLSearchParams(window.location.search).get("catalog") === "all") {
  toggleCatalogFull();
}
if (new URLSearchParams(window.location.search).get("from") === "configuratore") {
  history.replaceState(null, "", window.location.pathname);
  setTimeout(openCart, 320);
}
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!window.location.hash) window.scrollTo(0, 0);
const _initLang = localStorage.getItem("ois.lang") || "it";
if (_initLang !== "it") {
  applyLang(_initLang);
} else {
  render();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val.includes("<") || val.includes("&")) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}
initCookieBanner();

/* Scroll con offset per l'header fisso: porta `target` appena sotto la nav
   invece di farlo finire nascosto dietro di essa. */
function scrollElementBelowNav(target, behavior = "smooth") {
  if (!target) return;
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
      "76",
    10
  );
  const top =
    target.getBoundingClientRect().top + window.scrollY - navH - 28;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/* "...oppure sfoglia il catalogo semi": porta all'inizio della card "Cosa
   piantare adesso" invece che a metà sezione. */
const heroCatalogLink = document.querySelector(".hero-cfg-catalog-link");
if (heroCatalogLink) {
  heroCatalogLink.addEventListener("click", (e) => {
    const target =
      document.querySelector("#stagione .stagione-kicker") ||
      document.getElementById("stagione");
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, "", "#stagione");
    scrollElementBelowNav(target);
  });
}

/* Link menu "Catalogo completo": usa lo stesso offset, così il titolo
   "Cosa piantare" non finisce sotto l'header fisso su mobile. */
document.querySelectorAll('a[href="#stagione"], a[href="index.html#stagione"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target =
      document.querySelector("#stagione .stagione-kicker") ||
      document.getElementById("stagione");
    if (!target || !document.getElementById("stagione")) return;
    e.preventDefault();
    history.replaceState(null, "", "#stagione");
    scrollElementBelowNav(target);
  });
});

if (window.location.hash === "#stagione") {
  window.setTimeout(() => {
    scrollElementBelowNav(
      document.querySelector("#stagione .stagione-kicker") ||
        document.getElementById("stagione"),
      "auto"
    );
  }, 80);
}

/* "Cerca una coltura": porta all'inizio della card di ricerca e mette subito
   il focus sul campo, pronto per scrivere. */
const catalogSearchLink = document.querySelector(
  '.catalog-pro-primary-action[href="#catalogSearch"]'
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

/* Animazione serra: mappa SVG con aiuole + glyphs + pannello colture laterale. */
(function initGreenhouseAnim() {
  const svg    = document.getElementById("hcgSvg");
  const peek   = document.getElementById("hcgPeek");
  const inner  = document.getElementById("hcgPeekInner");
  if (!svg || !peek || !inner) return;

  /* ── Piante: dati reali da plants-data.js ───────────────────────────── */
  const EMOJI_MAP = { pomodoro:"🍅", carota:"🥕", lattuga:"🥬", basilico:"🌿" };
  const QTY_MAP   = { pomodoro: 4,   carota:  6,  lattuga:  6,  basilico: 12  };
  const PLANT_IDS = ["pomodoro", "carota", "lattuga", "basilico"];
  const plantById = Object.fromEntries((window.PLANTS || []).map(p => [p.id, p]));
  const PLANTS = PLANT_IDS.map(id => ({
    ...plantById[id],
    emoji: EMOJI_MAP[id],
    qty:   QTY_MAP[id]
  })).filter(p => p.id);

  /* ── Layout: 2 colonne, aiuole di altezza variabile ─────────────────── */
  // Colonna 1 (x=5, w=92): Pomodoro + Carota  |  Colonna 2 (x=105, w=110): Lattuga + Basilico
  const BEDS = [
    { p: PLANTS[0], x:   5, y:  5, w:  92, h:  68, cols: 2, rows: 2, r: 11 }, // Pomodoro 4 piante
    { p: PLANTS[1], x:   5, y:  81, w:  92, h:  74, cols: 2, rows: 3, r:  9 }, // Carota 6 piante
    { p: PLANTS[2], x: 105, y:  5, w: 110, h:  50, cols: 3, rows: 2, r:  8 }, // Lattuga 6 piante
    { p: PLANTS[3], x: 105, y:  63, w: 110, h:  92, cols: 3, rows: 4, r:  7 }, // Basilico 12 piante
  ];

  /* ── Posizioni piante in un'aiuola ──────────────────────────────────── */
  function bedPlantPositions(bed) {
    const pts = [];
    for (let row = 0; row < bed.rows; row++) {
      for (let col = 0; col < bed.cols; col++) {
        pts.push({
          cx: bed.x + (bed.w / (bed.cols + 1)) * (col + 1),
          cy: bed.y + (bed.h / (bed.rows + 1)) * (row + 1)
        });
      }
    }
    return pts;
  }

  /* ── Glyph reale (portato da script.js) ────────────────────────────── */
  function makeRng(seed) {
    let s = seed;
    return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0x100000000; };
  }
  const _shade = "rgba(0,0,0,.13)";
  function _leafPath(len, wid) {
    return `M0 0 C ${wid} ${-len*.16},${wid*.55} ${-len*.85},0 ${-len} C ${-wid*.55} ${-len*.85},${-wid} ${-len*.16},0 0 Z`;
  }
  function _lobedLeafPath(len, wid) {
    return `M0 0 Q ${wid*.4} ${-len*.1} ${wid*.5} ${-len*.25} Q ${wid*.15} ${-len*.3} ${wid*.55} ${-len*.45} Q ${wid*.1} ${-len*.5} ${wid*.45} ${-len*.7} Q ${wid*.05} ${-len*.75} 0 ${-len} Q ${-wid*.05} ${-len*.75} ${-wid*.45} ${-len*.7} Q ${-wid*.1} ${-len*.5} ${-wid*.55} ${-len*.45} Q ${-wid*.15} ${-len*.3} ${-wid*.5} ${-len*.25} Q ${-wid*.4} ${-len*.1} 0 0 Z`;
  }
  function _palmatePath(r) {
    let d = "M0 0 ";
    for (let k = -2; k <= 2; k++) {
      const a = k * 0.5, lx = Math.sin(a)*r, ly = -Math.cos(a)*r;
      d += `Q ${Math.sin(a-.2)*r*.6} ${-Math.cos(a-.2)*r*.6} ${lx} ${ly} Q ${Math.sin(a+.2)*r*.6} ${-Math.cos(a+.2)*r*.6} 0 0 `;
    }
    return d + "Z";
  }
  function glyph(plant, r, rng) {
    const c = plant.col || { l1:"#4f8f3a", l2:"#3d7a2c" };
    const sh = `<ellipse cx="${r*.08}" cy="${r*.12}" rx="${r*.95}" ry="${r*.85}" fill="${_shade}"/>`;
    let s = "";
    switch (plant.arch) {
      case "rosetta": {
        s += sh;
        const N = 10 + Math.floor(rng()*4);
        for (let ring = 0; ring < 2; ring++) {
          const f = ring ? .62 : 1, n = ring ? 7 : N;
          for (let i = 0; i < n; i++) {
            const a = (i/n)*360+(ring?20:0)+rng()*14, len=r*f*(.85+rng()*.25), wid=len*.5;
            const col = ring ? c.l1 : i%2 ? c.l2 : c.l1;
            s += `<g transform="rotate(${a})"><path d="${_leafPath(len,wid)}" fill="${col}"/><path d="M0 0 L0 ${-len*.9}" stroke="rgba(0,0,0,.10)" stroke-width="${len*.03}" fill="none"/></g>`;
          }
        }
        s += `<circle r="${r*.16}" fill="${c.fr||c.l1}"/>`;
        break;
      }
      case "frastagliata": {
        s += sh;
        const N = 9+Math.floor(rng()*4);
        for (let i=0;i<N;i++) {
          const a=(i/N)*360+rng()*20, len=r*(.8+rng()*.3), wid=len*.45;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len,wid)}" fill="${i%2?c.l2:c.l1}"/></g>`;
        }
        s += `<circle r="${r*.1}" fill="${c.l2}"/>`;
        break;
      }
      case "cespuglio": {
        s += sh;
        const N = 14+Math.floor(rng()*6);
        for (let i=0;i<N;i++) {
          const a=rng()*360, dist=rng()*r*.55, len=r*(.4+rng()*.3), wid=len*.62;
          const x=Math.cos(a*Math.PI/180)*dist, y=Math.sin(a*Math.PI/180)*dist;
          s += `<g transform="translate(${x} ${y}) rotate(${rng()*360})"><path d="${_leafPath(len,wid)}" fill="${i%2?c.l1:c.l2}"/></g>`;
        }
        break;
      }
      case "frutto": {
        s += sh;
        const N = 8+Math.floor(rng()*3);
        for (let i=0;i<N;i++) {
          const a=(i/N)*360+rng()*16, len=r*(.9+rng()*.2), wid=len*.5;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len,wid)}" fill="${i%2?c.l2:c.l1}"/></g>`;
        }
        const fr=c.fr||"#e2452f", nf=2+Math.floor(rng()*3);
        for (let i=0;i<nf;i++) {
          const a=rng()*360, dist=r*(.2+rng()*.4), x=Math.cos(a)*dist, y=Math.sin(a)*dist, fr2=r*.17*(.8+rng()*.4);
          s += `<circle cx="${x}" cy="${y}" r="${fr2}" fill="${fr}"/><circle cx="${x-fr2*.3}" cy="${y-fr2*.3}" r="${fr2*.35}" fill="rgba(255,255,255,.5)"/>`;
        }
        break;
      }
      case "piumosa": {
        s += `<ellipse cx="${r*.06}" cy="${r*.1}" rx="${r*.8}" ry="${r*.75}" fill="${_shade}"/>`;
        const N = 7+Math.floor(rng()*4);
        for (let i=0;i<N;i++) {
          const a=(i/N)*360+rng()*20, len=r*(.8+rng()*.3);
          let frond=`<path d="M0 0 L0 ${-len}" stroke="${i%2?c.l1:c.l2}" stroke-width="${r*.05}" fill="none"/>`;
          const segs=4+Math.floor(rng()*3);
          for (let j=1;j<=segs;j++) {
            const yy=-len*j/(segs+1), ll=len*.22*(1-j/(segs+2));
            frond += `<path d="M0 ${yy} l ${ll} ${-ll*.5}" stroke="${c.l1}" stroke-width="${r*.03}"/><path d="M0 ${yy} l ${-ll} ${-ll*.5}" stroke="${c.l1}" stroke-width="${r*.03}"/>`;
          }
          s += `<g transform="rotate(${a})">${frond}</g>`;
        }
        if (c.fr) s += `<circle r="${r*.12}" fill="${c.fr}"/>`;
        break;
      }
      default: {
        s += sh;
        const N = 9+Math.floor(rng()*3);
        for (let i=0;i<N;i++) {
          const a=(i/N)*360+rng()*14, len=r*(.82+rng()*.22), wid=len*.52;
          s += `<g transform="rotate(${a})"><path d="${_leafPath(len,wid)}" fill="${i%2?c.l2:c.l1}"/></g>`;
        }
        s += `<circle r="${r*.13}" fill="${c.l1}"/>`;
      }
    }
    return `<g>${s}</g>`;
  }

  /* ── Costruisce la mappa (aiuole statiche, piante aggiunte dopo) ─────── */
  function buildMap() {
    let defs = `<defs>`;
    BEDS.forEach((_, i) => {
      defs += `<linearGradient id="hbg${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="rgba(98,74,52,0.58)"/>
        <stop offset="65%"  stop-color="rgba(78,58,40,0.84)"/>
        <stop offset="100%" stop-color="rgba(58,43,28,0.94)"/>
      </linearGradient>`;
    });
    defs += `</defs>`;
    let s = "";
    // piccolo corridoio tra le due colonne
    s += `<rect x="100" y="5" width="5" height="150" rx="2" fill="rgba(210,200,180,0.18)"/>`;
    BEDS.forEach((b, i) => {
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="7"
              fill="url(#hbg${i})" stroke="rgba(255,255,255,0.17)" stroke-width="0.8"/>`;
    });
    svg.innerHTML = defs + s;
  }

  /* ── Aggiunge una piantina animata ──────────────────────────────────── */
  function addPlant(cx, cy, plant, r, seed) {
    const rng = makeRng(seed);
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.opacity = "0";
    g.style.transition = "opacity 0.4s ease, transform 0.48s cubic-bezier(0.34,1.56,0.64,1)";
    g.style.transformOrigin = "center";
    g.style.transform = `translate(${cx}px,${cy}px) scale(0)`;
    const label = r >= 9
      ? `<text y="0" text-anchor="middle" dominant-baseline="central" font-size="${Math.max(r*1.2,8)}" style="pointer-events:none;user-select:none;font-family:system-ui">${plant.emoji}</text>`
      : "";
    g.innerHTML = glyph(plant, r, rng) + label;
    svg.appendChild(g);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      g.style.opacity = "1";
      g.style.transform = `translate(${cx}px,${cy}px) scale(1)`;
    }));
  }

  /* ── Pannello colture laterale ──────────────────────────────────────── */
  function buildPanel() {
    inner.innerHTML = PLANTS.map(p =>
      `<div class="hcg-card">
        <span class="hcg-card-ico">${p.emoji}</span>
        <div class="hcg-card-info">
          <span class="hcg-card-name">${p.nome || p.name}</span>
          <span class="hcg-card-meta">${p.sole==="pieno"?"☀️":"🌤️"} · ${p.gg} gg</span>
        </div>
        <span class="hcg-card-qty">${p.qty} pz</span>
      </div>`
    ).join("");
  }

  /* ── Ciclo animazione ───────────────────────────────────────────────── */
  let timers = [];
  function t(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function runCycle() {
    clearTimers();
    buildMap();
    peek.classList.remove("hcg-peek--in");
    inner.querySelectorAll(".hcg-card").forEach(c => c.classList.remove("hcg-card--in"));

    // piante in sequenza: aiuola per aiuola
    let delay = 180;
    BEDS.forEach((bed, bi) => {
      const pts = bedPlantPositions(bed);
      // basilico (ultimo) appare più veloce per il numero alto
      const step = bed.p.name === "Basilico" ? 140 : 260;
      pts.forEach((pt, pi) => {
        const d = delay;
        t(() => addPlant(pt.cx, pt.cy, bed.p, bed.r, bi * 100 + pi), d);
        delay += step;
      });
      delay += 100; // piccola pausa tra aiuole
    });

    // pannello scivola dentro
    const panelIn = delay + 300;
    t(() => {
      peek.classList.add("hcg-peek--in");
      inner.querySelectorAll(".hcg-card").forEach((c, i) =>
        setTimeout(() => c.classList.add("hcg-card--in"), i * 110));
    }, panelIn);

    // pausa → reset → loop
    t(() => {
      peek.classList.remove("hcg-peek--in");
      inner.querySelectorAll(".hcg-card").forEach(c => c.classList.remove("hcg-card--in"));
      t(runCycle, 500);
    }, panelIn + 600 + 2600);
  }

  buildPanel();
  buildMap();

  const observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) { observer.disconnect(); runCycle(); } },
    { threshold: 0.2 }
  );
  const container = document.querySelector(".hcg");
  if (container) observer.observe(container);
}());
