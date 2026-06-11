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
  const cy = [32, 76];
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
  <rect x="8" y="10" width="176" height="86" rx="12" fill="#f7fbf5" stroke="rgba(45,106,79,.16)"/>
  <path d="M24 32 H176 M24 76 H176 M34 18 V90 M78 18 V90 M122 18 V90 M166 18 V90" stroke="rgba(45,106,79,.14)" stroke-width="1"/>
  ${seedlings}
  <line x1="${cx[0] + R + 3}" y1="${cy[0] - 15}" x2="${cx[1] - R - 3}" y2="${cy[0] - 15}" stroke="#1b5e3a" stroke-width="1.7" marker-start="url(#sH${pid})" marker-end="url(#sH${pid})"/>
  <rect x="67" y="2" width="60" height="18" rx="9" fill="#1b5e3a"/>
  <text x="97" y="15" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${d} cm</text>
  <text x="97" y="109" font-size="8" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="750" fill="#1b5e3a">${rLbl}</text>
  <line x1="198" y1="${cy[0] + R + 3}" x2="198" y2="${cy[1] - R - 3}" stroke="#40916c" stroke-width="1.7" marker-start="url(#sV${pid})" marker-end="url(#sV${pid})"/>
  <rect x="184" y="45" width="44" height="18" rx="9" fill="#40916c"/>
  <text x="206" y="58" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${dr} cm</text>
  <text x="206" y="109" font-size="8" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="750" fill="#40916c">${bLbl}</text>
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
  if (note)
    note.textContent = state.riscaldata
      ? t("hero.filter_note_heated")
      : t("hero.filter_note_cold");
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
    .forEach((b) =>
      b.classList.toggle("active", b.dataset.zone === state.zona)
    );
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
  const planteLabel = currentLang === "ro" ? "plante" : "piante";
  const sowingLabel = currentLang === "ro" ? "de semănat" : "seminabili";
  const chooseLabel = currentLang === "ro" ? "alege luna" : "scegli mese";
  const selectedLabel = currentLang === "ro" ? "lună selectată" : "mese selezionato";
  if (help) help.textContent = currentLang === "ro" ? "Derulează și alege luna" : "Scorri e scegli un mese";
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
    if (catalog.seasonOnly) pills.push({ kind: "scope", label: t("catalog.season_only") });
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
  document.getElementById("footerSeasonTag").innerHTML = stagLabel;

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
  if (confHint && confHintText) {
    if (cart.length > 0) {
      const label = cart.length === 1 ? t("conf.cart_hint_one") : tv("conf.cart_hint_many", { count: cart.length });
      confHintText.textContent = label;
      confHint.hidden = false;
    } else {
      confHint.hidden = true;
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
function openDetail(id) {
  const p = BYID[id];
  if (!p) return;
  currentDetail = id;

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
  notaEl.textContent = nota;
  notaEl.hidden = !nota;

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
  const guide = localizedSowingGuide(p);
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

  document.getElementById("detailOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
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
  document.body.style.overflow = "";
  currentDetail = null;
}
document
  .getElementById("detailPanel")
  .addEventListener("click", (e) => e.stopPropagation());

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
  const anyExtra = catalog.search || catalog.type || catalog.easyOnly || catalog.seasonOnly || catalog.sort !== "season";
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
  if (kind === "scope") catalog.seasonOnly = false;
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

/* Contatti: simulazione invio form senza backend. */
function submitContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".contatti-form-btn");
  const orig = btn.textContent;
  btn.textContent = currentLang === "ro" ? "✓ Trimis!" : "✓ Inviato!";
  btn.style.background = "var(--green-lt)";
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = "";
  }, 3000);
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
    target.getBoundingClientRect().top + window.scrollY - navH - 12;
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
