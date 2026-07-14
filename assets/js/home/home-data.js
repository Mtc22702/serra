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
  leurda: 2
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
  salvia: "40–80"
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
  cimbru: { d: 25, dr: 30 }
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
    "background:var(--badge-aromatica-bg, rgba(116,198,157,.22));color:var(--badge-aromatica-color, #1b5438)"
};
// Risorse visive. Logica di fallback condivisa: vedi assets/js/shared/plant-photo.js
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
  cimbru: "🌿"
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

// Stagioni
function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}
