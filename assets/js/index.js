/* =========================================================
   JS pagina home: catalogo semi, sezione hero stagionale, carrello e traduzioni.
   Le funzioni restano globali per i gestori inline presenti nell'HTML.
   ========================================================= */

/* Dati piante: catalogo base usato da card, dettaglio e carrello. */
const PLANTS = [
  {
    id: "pomodoro",
    nome: "Pomodoro",
    mesi: [2, 3, 4],
    gg: 90,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 3,
    amiche: [
      "basilico",
      "cipolla",
      "carota",
      "prezzemolo",
      "lattuga",
      "sedano"
    ],
    nemiche: [
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa",
      "finocchio"
    ],
    nota: "Vuole sostegno e pieno sole. Togli le femminelle."
  },
  {
    id: "peperone",
    nome: "Peperone",
    mesi: [2, 3, 4],
    gg: 90,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 1,
    amiche: ["basilico", "pomodoro"],
    nemiche: ["fagiolino", "fagiolo"],
    nota: "Ama il caldo. Concima quando inizia a fruttificare."
  },
  {
    id: "peperoncino",
    nome: "Peperoncino",
    mesi: [2, 3, 4],
    gg: 95,
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.5,
    amiche: ["basilico"],
    nemiche: [],
    nota: "Rustico e generoso. Sopporta bene la siccità."
  },
  {
    id: "melanzana",
    nome: "Melanzana",
    mesi: [2, 3, 4],
    gg: 100,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 1.5,
    amiche: ["fagiolino"],
    nemiche: [],
    nota: "Vuole molto caldo e annaffiature regolari."
  },
  {
    id: "zucchina",
    nome: "Zucchina",
    mesi: [3, 4, 5, 6],
    gg: 50,
    h: "media",
    sole: "pieno",
    acqua: "alta",
    resa: 2.5,
    amiche: ["fagiolino", "ravanello"],
    nemiche: [],
    nota: "Cresce in fretta. Raccogli spesso."
  },
  {
    id: "zucca",
    nome: "Zucca",
    mesi: [4, 5],
    gg: 120,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 4,
    amiche: ["fagiolo"],
    nemiche: [],
    nota: "Si allarga molto: lascia spazio o falla arrampicare."
  },
  {
    id: "cetriolo",
    nome: "Cetriolo",
    mesi: [3, 4, 5, 6],
    gg: 60,
    h: "alta",
    sole: "pieno",
    acqua: "alta",
    resa: 2,
    amiche: ["fagiolino", "lattuga", "aneto"],
    nemiche: ["salvia", "pomodoro"],
    nota: "Falla arrampicare su una rete: frutti più puliti."
  },
  {
    id: "melone",
    nome: "Melone",
    mesi: [3, 4, 5],
    gg: 110,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 2,
    amiche: [],
    nemiche: [],
    nota: "Vuole tanto sole e poca acqua a fine maturazione."
  },
  {
    id: "anguria",
    nome: "Anguria",
    mesi: [3, 4, 5],
    gg: 120,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 6,
    amiche: [],
    nemiche: [],
    nota: "Enorme: una pianta riempie mezza serra piccola."
  },
  {
    id: "lattuga",
    nome: "Lattuga",
    mesi: [1, 2, 3, 4, 8, 9, 10],
    gg: 55,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.35,
    amiche: ["carota", "ravanello", "fragola", "cetriolo", "cipolla"],
    nemiche: [],
    nota: "Facilissima e veloce. Semina poche piante per volta."
  },
  {
    id: "radicchio",
    nome: "Radicchio",
    mesi: [6, 7, 8],
    gg: 80,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.3,
    amiche: ["finocchio"],
    nemiche: [],
    nota: "Il freddo lo rende rosso e dolce."
  },
  {
    id: "rucola",
    nome: "Rucola",
    mesi: [2, 3, 4, 5, 8, 9, 10],
    gg: 35,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.1,
    amiche: ["lattuga"],
    nemiche: [],
    nota: "Pronta in poche settimane. Si ritaglia e ricresce."
  },
  {
    id: "spinaci",
    nome: "Spinaci",
    mesi: [1, 2, 3, 9, 10, 11],
    gg: 45,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.15,
    amiche: ["fragola", "cavolo"],
    nemiche: [],
    nota: "Ama il fresco; in estate va in fiore subito."
  },
  {
    id: "bietola",
    nome: "Bietola da coste",
    mesi: [2, 3, 4, 5, 8, 9],
    gg: 60,
    h: "media",
    sole: "mezz",
    acqua: "media",
    resa: 0.5,
    amiche: ["cavolo", "cipolla"],
    nemiche: [],
    nota: "Generosa: raccogli le foglie esterne a mano a mano."
  },
  {
    id: "cavolo",
    nome: "Cavolo cappuccio",
    mesi: [2, 3, 6, 7],
    gg: 90,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 1.2,
    amiche: ["sedano", "aneto", "cipolla", "bietola"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Vuole spazio e terreno ricco."
  },
  {
    id: "verza",
    nome: "Verza",
    mesi: [2, 3, 6, 7],
    gg: 100,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 1.2,
    amiche: ["sedano", "aneto", "cipolla"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Resiste al gelo; più buona dopo le prime brinate."
  },
  {
    id: "broccolo",
    nome: "Broccolo",
    mesi: [2, 3, 6, 7],
    gg: 85,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 0.6,
    amiche: ["sedano", "cipolla"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Dopo la testa centrale dà tanti getti laterali."
  },
  {
    id: "cavolfiore",
    nome: "Cavolfiore",
    mesi: [2, 3, 6, 7],
    gg: 95,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 0.8,
    amiche: ["sedano", "aneto"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Piega le foglie sulla testa per tenerla bianca."
  },
  {
    id: "cavolonero",
    nome: "Cavolo nero",
    mesi: [2, 3, 6, 7],
    gg: 80,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 0.5,
    amiche: ["cipolla", "bietola"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Rustico toscano: si raccoglie a foglie per mesi."
  },
  {
    id: "cavolorapa",
    nome: "Cavolo rapa",
    mesi: [2, 3, 8, 9],
    gg: 60,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.3,
    amiche: ["cipolla", "bietola"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Si mangia il fusto ingrossato: raccogli da giovane."
  },
  {
    id: "carota",
    nome: "Carota",
    mesi: [2, 3, 4, 5, 6, 7, 8],
    gg: 90,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.1,
    amiche: ["cipolla", "porro", "lattuga", "ravanello", "pomodoro"],
    nemiche: ["aneto", "finocchio"],
    nota: "Semina fitta e dirada. Terreno sciolto, senza sassi."
  },
  {
    id: "finocchio",
    nome: "Finocchio",
    mesi: [6, 7, 8],
    gg: 100,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 0.3,
    amiche: [],
    nemiche: [
      "pomodoro",
      "fagiolino",
      "fagiolo",
      "pisello",
      "cetriolo",
      "spinaci"
    ],
    nota: "Tienilo in disparte: non va d'accordo con molti."
  },
  {
    id: "prezzemolo",
    nome: "Prezzemolo",
    mesi: [2, 3, 4, 5, 8, 9],
    gg: 75,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.05,
    amiche: ["pomodoro"],
    nemiche: [],
    nota: "Lento a partire; poi taglia di continuo per mesi."
  },
  {
    id: "basilico",
    nome: "Basilico",
    mesi: [3, 4, 5, 6],
    gg: 60,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.05,
    amiche: ["pomodoro", "peperone", "peperoncino"],
    nemiche: [],
    nota: "Cima i fiori per avere foglie sempre tenere."
  },
  {
    id: "coriandolo",
    nome: "Coriandolo",
    mesi: [3, 4, 5, 8, 9],
    gg: 50,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.03,
    amiche: [],
    nemiche: [],
    nota: "Va a fiore col caldo: semina ogni 2 settimane."
  },
  {
    id: "aneto",
    nome: "Aneto",
    mesi: [3, 4, 5, 8],
    gg: 70,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 0.05,
    amiche: ["cavolo", "cetriolo"],
    nemiche: ["carota"],
    nota: "Aiuta i cavoli e attira insetti utili."
  },
  {
    id: "cipolla",
    nome: "Cipolla",
    mesi: [1, 2, 3, 9, 10],
    gg: 120,
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.15,
    amiche: ["carota", "lattuga", "barbabietola", "pomodoro", "fragola"],
    nemiche: ["fagiolino", "fagiolo", "pisello"],
    nota: "Poca acqua a fine ciclo. Tiene lontani i parassiti."
  },
  {
    id: "aglio",
    nome: "Aglio",
    mesi: [10, 11, 12, 1],
    gg: 240,
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.05,
    amiche: ["carota", "fragola", "pomodoro"],
    nemiche: ["fagiolino", "fagiolo", "pisello"],
    nota: "Si pianta a spicchi in autunno, si raccoglie in estate."
  },
  {
    id: "porro",
    nome: "Porro",
    mesi: [2, 3, 4],
    gg: 150,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 0.2,
    amiche: ["carota"],
    nemiche: ["fagiolino", "fagiolo", "pisello"],
    nota: "Rincalza la terra per avere il fusto bianco lungo."
  },
  {
    id: "scalogno",
    nome: "Scalogno",
    mesi: [1, 2, 9, 10],
    gg: 100,
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.1,
    amiche: ["carota", "fragola"],
    nemiche: ["fagiolino", "fagiolo", "pisello"],
    nota: "Come la cipolla ma più delicato; ottimo per principianti."
  },
  {
    id: "fagiolino",
    nome: "Fagiolino nano",
    mesi: [4, 5, 6, 7],
    gg: 65,
    h: "media",
    sole: "pieno",
    acqua: "media",
    resa: 0.15,
    amiche: ["carota", "cetriolo", "lattuga", "zucchina"],
    nemiche: ["cipolla", "aglio", "porro", "scalogno"],
    nota: "Non serve sostegno. Migliora il terreno con l'azoto."
  },
  {
    id: "fagiolo",
    nome: "Fagiolo rampicante",
    mesi: [4, 5, 6],
    gg: 75,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 0.25,
    amiche: ["carota", "cetriolo", "zucchina"],
    nemiche: ["cipolla", "aglio", "porro", "scalogno"],
    nota: "Vuole canne o rete: sale anche 2 metri."
  },
  {
    id: "pisello",
    nome: "Pisello",
    mesi: [10, 11, 1, 2],
    gg: 80,
    h: "media",
    sole: "mezz",
    acqua: "media",
    resa: 0.1,
    amiche: ["carota", "lattuga"],
    nemiche: ["cipolla", "aglio", "porro", "scalogno"],
    nota: "Ama il fresco: si semina in autunno o fine inverno."
  },
  {
    id: "fragola",
    nome: "Fragola",
    mesi: [3, 4, 8, 9],
    gg: 90,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.25,
    amiche: ["lattuga", "spinaci", "cipolla", "aglio"],
    nemiche: [
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa"
    ],
    nota: "Perenne: produce per più anni e fa stoloni."
  },
  {
    id: "sedano",
    nome: "Sedano",
    mesi: [2, 3, 4],
    gg: 120,
    h: "media",
    sole: "mezz",
    acqua: "alta",
    resa: 0.5,
    amiche: ["cavolo", "pomodoro"],
    nemiche: [],
    nota: "Vuole tanta acqua e terreno ricco."
  },
  {
    id: "ravanello",
    nome: "Ravanello",
    mesi: [1, 2, 3, 4, 8, 9, 10],
    gg: 28,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.03,
    amiche: ["lattuga", "carota", "cetriolo"],
    nemiche: [],
    nota: "Il più veloce: pronto in 3–4 settimane."
  },
  {
    id: "barbabietola",
    nome: "Barbabietola",
    mesi: [3, 4, 5, 6, 7],
    gg: 80,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.2,
    amiche: ["cipolla", "lattuga"],
    nemiche: [],
    nota: "Si mangiano radice e foglie. Dirada le piantine."
  },
  {
    id: "cicoria",
    nome: "Cicoria",
    mesi: [2, 3, 4, 7, 8, 9],
    gg: 70,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.25,
    amiche: ["carota", "cipolla", "lattuga"],
    nemiche: [],
    nota: "Rustica e saporita. Raccogli le foglie esterne."
  },
  {
    id: "indivia",
    nome: "Indivia / Scarola",
    mesi: [2, 3, 4, 7, 8, 9],
    gg: 75,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.35,
    amiche: ["lattuga", "ravanello", "finocchio"],
    nemiche: [],
    nota: "Ama il fresco. Lega il cespo per foglie più chiare."
  },
  {
    id: "pakchoi",
    nome: "Pak choi",
    mesi: [2, 3, 4, 8, 9, 10],
    gg: 45,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.25,
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: ["fragola"],
    nota: "Cresce veloce in clima fresco."
  },
  {
    id: "cavoletti",
    nome: "Cavoletti di Bruxelles",
    mesi: [3, 4, 5, 6],
    gg: 120,
    h: "alta",
    sole: "pieno",
    acqua: "media",
    resa: 0.7,
    amiche: ["sedano", "cipolla", "timo"],
    nemiche: ["pomodoro", "fragola"],
    nota: "Vuole tempo e fresco: cima la punta a metà ciclo."
  },
  {
    id: "rapa",
    nome: "Rapa",
    mesi: [2, 3, 4, 8, 9, 10],
    gg: 55,
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    resa: 0.15,
    amiche: ["pisello", "lattuga"],
    nemiche: [],
    nota: "Fresca e rapida: dirada presto per ingrossare la radice."
  },
  {
    id: "valerianella",
    nome: "Valerianella",
    mesi: [1, 2, 9, 10, 11],
    gg: 50,
    h: "bassa",
    sole: "mezz",
    acqua: "media",
    resa: 0.08,
    amiche: ["lattuga", "ravanello", "cipolla"],
    nemiche: [],
    nota: "Perfetta per la serra fredda: ciuffi teneri in inverno."
  },
  {
    id: "rosmarino",
    nome: "Rosmarino",
    mesi: [3, 4, 5],
    gg: 0,
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.1,
    amiche: [],
    nemiche: [],
    nota: "Perenne e rustico: pochissima acqua, vive anni."
  },
  {
    id: "timo",
    nome: "Timo",
    mesi: [3, 4, 5],
    gg: 0,
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.05,
    amiche: ["cavolo"],
    nemiche: [],
    nota: "Tappezzante e profumato; ama il secco."
  },
  {
    id: "origano",
    nome: "Origano",
    mesi: [3, 4, 5],
    gg: 0,
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.05,
    amiche: [],
    nemiche: [],
    nota: "Perenne: si secca benissimo per l'inverno."
  },
  {
    id: "salvia",
    nome: "Salvia",
    mesi: [3, 4, 5],
    gg: 0,
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    resa: 0.05,
    amiche: ["cavolo"],
    nemiche: ["cetriolo"],
    nota: "Cespuglio perenne dalle foglie vellutate."
  },
  {
    id: "pastinaca",
    nome: "Pastinaca",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 120,
    mesi: [3, 4, 8, 9],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 1.0,
    nota: "Dolce dopo il freddo; semina diretta e terreno profondo."
  },
  {
    id: "radice_prezemolo",
    nome: "Prezzemolo da radice",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 100,
    mesi: [3, 4, 8],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.7,
    nota: "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe."
  },
  {
    id: "sedano_rapa",
    nome: "Sedano rapa",
    h: "media",
    sole: "pieno",
    acqua: "alta",
    gg: 120,
    mesi: [2, 3, 4, 5],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 1.2,
    nota: "Radice globosa e profumata; vuole acqua costante e suolo ricco."
  },
  {
    id: "rafano",
    nome: "Rafano",
    h: "media",
    sole: "mezzombra",
    acqua: "media",
    gg: 180,
    mesi: [3, 4, 9, 10],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.8,
    nota: "Radice piccante molto usata in Romania; contenila perché è vigorosa."
  },
  {
    id: "patata",
    nome: "Patata",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 100,
    mesi: [3, 4, 5],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 1.8,
    nota: "In serra anticipa il raccolto; rincalza quando gli steli crescono."
  },
  {
    id: "patata_dolce",
    nome: "Patata dolce",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 120,
    mesi: [4, 5, 6],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 1.5,
    nota: "Ama caldo stabile e suolo leggero; ideale in serra lunga."
  },
  {
    id: "cipolla_rossa",
    nome: "Cipolla rossa",
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    gg: 120,
    mesi: [2, 3, 8, 9, 10],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.25,
    nota: "Bulbo dolce e colorato; ottima per raccolti scalari."
  },
  {
    id: "cipollotto",
    nome: "Cipollotto",
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    gg: 60,
    mesi: [2, 3, 4, 5, 8, 9],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.08,
    nota: "Pronto rapidamente; raccogli giovane prima che ingrossi troppo."
  },
  {
    id: "erba_cipollina",
    nome: "Erba cipollina",
    h: "bassa",
    sole: "pieno",
    acqua: "media",
    gg: 75,
    mesi: [3, 4, 5, 8, 9],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.05,
    nota: "Aromatica perenne; taglia spesso per foglie tenere."
  },
  {
    id: "loboda",
    nome: "Loboda",
    h: "media",
    sole: "mezzombra",
    acqua: "media",
    gg: 45,
    mesi: [3, 4, 5, 8, 9],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.25,
    nota: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco."
  },
  {
    id: "stevia_dolce",
    nome: "Stevia rumena",
    h: "media",
    sole: "mezzombra",
    acqua: "media",
    gg: 50,
    mesi: [3, 4, 8, 9],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.3,
    nota: "Acetosa per minestre primaverili; raccogli foglie giovani."
  },
  {
    id: "leustean",
    nome: "Levistico",
    h: "alta",
    sole: "mezzombra",
    acqua: "media",
    gg: 90,
    mesi: [3, 4, 5, 9],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.15,
    nota: "Il profumo classico delle ciorbe rumene; perenne e vigoroso."
  },
  {
    id: "dragoncello",
    nome: "Dragoncello",
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    gg: 90,
    mesi: [3, 4, 5],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.08,
    nota: "Aromatica fine per aceti e conserve; evita ristagni."
  },
  {
    id: "menta",
    nome: "Menta",
    h: "media",
    sole: "mezzombra",
    acqua: "alta",
    gg: 60,
    mesi: [3, 4, 5, 8],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.1,
    nota: "Molto vigorosa: meglio in vaso o area controllata."
  },
  {
    id: "maggiorana",
    nome: "Maggiorana",
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    gg: 75,
    mesi: [3, 4, 5],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.05,
    nota: "Aromatica delicata; ama caldo, luce e terreno drenato."
  },
  {
    id: "camomilla",
    nome: "Camomilla",
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    gg: 70,
    mesi: [3, 4, 9],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.04,
    nota: "Fiori per tisane; attira insetti utili e profuma la serra."
  },
  {
    id: "calendula",
    nome: "Calendula",
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    gg: 65,
    mesi: [3, 4, 5, 9],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.05,
    nota: "Fiore utile nell’orto: attira impollinatori e colora le aiuole."
  },
  {
    id: "nasturzio",
    nome: "Nasturzio",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 60,
    mesi: [4, 5, 6],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.08,
    nota: "Fiori e foglie commestibili; utile come pianta esca per afidi."
  },
  {
    id: "mais_dolce",
    nome: "Mais dolce",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 90,
    mesi: [4, 5, 6],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: [],
    resa: 1.0,
    nota: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi."
  },
  {
    id: "gombo",
    nome: "Gombo",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 80,
    mesi: [4, 5, 6],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: ["finocchio"],
    resa: 0.7,
    nota: "Ama molto caldo; raccogli i baccelli piccoli e teneri."
  },
  {
    id: "tomatillo",
    nome: "Tomatillo",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 95,
    mesi: [3, 4, 5],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: ["finocchio"],
    resa: 1.5,
    nota: "Serve almeno due piante per fruttificare bene; ottimo per salse."
  },
  {
    id: "physalis",
    nome: "Alchechengi",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 100,
    mesi: [3, 4, 5],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: ["finocchio"],
    resa: 0.5,
    nota: "Frutti dolci in lanterna; in serra matura meglio."
  },
  {
    id: "kiwano",
    nome: "Kiwano",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 120,
    mesi: [4, 5],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: ["finocchio"],
    resa: 1.5,
    nota: "Cucurbitacea esotica per serre calde; falla arrampicare."
  },
  {
    id: "cucamelon",
    nome: "Cucamelon",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 75,
    mesi: [4, 5, 6],
    amiche: ["basilico", "cipolla", "prezzemolo"],
    nemiche: ["finocchio"],
    resa: 0.5,
    nota: "Piccoli frutti croccanti; produttivo su rete in serra."
  },
  {
    id: "asparago",
    nome: "Asparago",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 730,
    mesi: [3, 4],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.5,
    nota: "Perenne: richiede pazienza, ma produce per molti anni."
  },
  {
    id: "carciofo",
    nome: "Carciofo",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 180,
    mesi: [2, 3, 4],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 1.2,
    nota: "Coltura grande e decorativa; proteggi dal gelo intenso."
  },
  {
    id: "cardo",
    nome: "Cardo",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 150,
    mesi: [3, 4, 5],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 1.0,
    nota: "Parente del carciofo; imbianchisci le coste prima del raccolto."
  },
  {
    id: "crescione",
    nome: "Crescione",
    h: "bassa",
    sole: "mezzombra",
    acqua: "alta",
    gg: 30,
    mesi: [3, 4, 5, 9, 10],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.1,
    nota: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti."
  },
  {
    id: "mizuna",
    nome: "Mizuna",
    h: "bassa",
    sole: "mezzombra",
    acqua: "media",
    gg: 35,
    mesi: [3, 4, 5, 8, 9, 10],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.18,
    nota: "Senape giapponese facile; foglie frastagliate per mix insalata."
  },
  {
    id: "senape_foglia",
    nome: "Senape da foglia",
    h: "media",
    sole: "mezzombra",
    acqua: "media",
    gg: 40,
    mesi: [3, 4, 8, 9, 10],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.25,
    nota: "Foglie piccanti; semina in fresco per evitare fioritura precoce."
  },
  {
    id: "tatsoi",
    nome: "Tatsoi",
    h: "bassa",
    sole: "mezzombra",
    acqua: "media",
    gg: 45,
    mesi: [3, 4, 8, 9, 10],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.2,
    nota: "Rosetta compatta, molto resistente al freddo."
  },
  {
    id: "cavolo_cinese",
    nome: "Cavolo cinese",
    h: "media",
    sole: "mezzombra",
    acqua: "alta",
    gg: 65,
    mesi: [3, 4, 8, 9],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.9,
    nota: "Forma un cespo tenero; proteggi da caldo e stress idrico."
  },
  {
    id: "daikon",
    nome: "Daikon",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 60,
    mesi: [3, 4, 8, 9, 10],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.5,
    nota: "Ravanello lungo: terreno profondo e raccolta prima che lignifichi."
  },
  {
    id: "scorzonera",
    nome: "Scorzonera",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 150,
    mesi: [3, 4],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 0.5,
    nota: "Radice nera lunga; richiede suolo leggero e profondo."
  },
  {
    id: "topinambur",
    nome: "Topinambur",
    h: "alta",
    sole: "pieno",
    acqua: "bassa",
    gg: 180,
    mesi: [3, 4, 5],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 2.0,
    nota: "Tubero rustico e produttivo; delimita lo spazio perché si espande."
  },
  {
    id: "fava",
    nome: "Fava",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 90,
    mesi: [2, 3, 10, 11],
    amiche: ["carota", "cetriolo", "mais_dolce"],
    nemiche: ["cipolla", "aglio"],
    resa: 0.7,
    nota: "Legume precoce e resistente al fresco; migliora il terreno."
  },
  {
    id: "soia_edamame",
    nome: "Soia edamame",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 90,
    mesi: [4, 5, 6],
    amiche: ["carota", "cetriolo", "mais_dolce"],
    nemiche: ["cipolla", "aglio"],
    resa: 0.6,
    nota: "Raccogli i baccelli verdi quando i semi sono pieni ma teneri."
  },
  {
    id: "cece",
    nome: "Cece",
    h: "media",
    sole: "pieno",
    acqua: "bassa",
    gg: 100,
    mesi: [3, 4, 5],
    amiche: ["carota", "cetriolo", "mais_dolce"],
    nemiche: ["cipolla", "aglio"],
    resa: 0.35,
    nota: "Ama asciutto e caldo; non eccedere con acqua in serra."
  },
  {
    id: "lenticchia",
    nome: "Lenticchia",
    h: "bassa",
    sole: "pieno",
    acqua: "bassa",
    gg: 95,
    mesi: [3, 4],
    amiche: ["carota", "cetriolo", "mais_dolce"],
    nemiche: ["cipolla", "aglio"],
    resa: 0.25,
    nota: "Piccolo legume rustico; adatto a bordure asciutte."
  },
  {
    id: "fagiolo_borlotto",
    nome: "Fagiolo borlotto",
    h: "alta",
    sole: "pieno",
    acqua: "media",
    gg: 95,
    mesi: [4, 5, 6],
    amiche: ["carota", "cetriolo", "mais_dolce"],
    nemiche: ["cipolla", "aglio"],
    resa: 0.8,
    nota: "Per baccelli freschi o granella; usa tutori robusti."
  },
  {
    id: "cavolo_rosso",
    nome: "Cavolo rosso",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 110,
    mesi: [2, 3, 4, 7, 8],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 1.5,
    nota: "Cespo compatto e colorato; ottimo per raccolti autunnali."
  },
  {
    id: "cavolo_navone",
    nome: "Navone",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 100,
    mesi: [3, 4, 7, 8],
    amiche: ["lattuga", "cipolla", "pisello"],
    nemiche: [],
    resa: 1.0,
    nota: "Radice grande e rustica; utile per autunno e inverno."
  },
  {
    id: "broccolo_rapa",
    nome: "Cime di rapa",
    h: "media",
    sole: "pieno",
    acqua: "media",
    gg: 55,
    mesi: [3, 4, 8, 9, 10],
    amiche: ["carota", "cipolla", "ravanello"],
    nemiche: [],
    resa: 0.35,
    nota: "Raccogli cime e foglie prima della piena fioritura."
  },
  {
    id: "shiso",
    nome: "Shiso",
    h: "media",
    sole: "mezzombra",
    acqua: "media",
    gg: 70,
    mesi: [3, 4, 5],
    amiche: ["pomodoro", "cavolo", "carota"],
    nemiche: [],
    resa: 0.08,
    nota: "Aromatica asiatica profumata; bella anche in vaso in serra."
  }
];

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
  lattuga:1, rucola:1, ravanello:1, fagiolino:1, basilico:1,
  prezzemolo:1, carota:1, cipolla:1, spinaci:1, bietola:1,
  valerianella:1, zucchina:1, scalogno:1, cicoria:1, pakchoi:1,
  rapa:1, aglio:1,
  pomodoro:2, peperone:2, cetriolo:2, fragola:2, finocchio:2,
  pisello:2, porro:2, indivia:2, barbabietola:2, aneto:2,
  coriandolo:2, timo:2, origano:2, salvia:2, rosmarino:2,
  radicchio:2, fagiolo:2,
  peperoncino:3, melanzana:3, zucca:3, melone:3, anguria:3,
  cavolo:3, verza:3, broccolo:3, cavolfiore:3, cavolonero:3,
  cavolorapa:3, cavoletti:3, sedano:3
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

const SOWING_GUIDE = {
  pomodoro:    { method: "Semina in vasetto o alveolo al caldo; trapianta in serra una piantina robusta con 4-6 foglie vere.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 80 cm tra le file.", tip: "Interra leggermente il fusto fino alle foglie e prepara subito un tutore o filo verticale." },
  peperone:    { method: "Semina protetta in alveolo; meglio trapiantare piante già formate quando le notti sono miti.", depth: "0,5 cm", thin: "40 cm sulla fila, 60 cm tra le file.", tip: "Germina lentamente: serve caldo costante (20-25 °C) e terreno mai zuppo." },
  peperoncino: { method: "Semina protetta in alveolo con molto calore iniziale (25-28 °C).", depth: "0,5 cm", thin: "35 cm sulla fila, 50 cm tra le file.", tip: "Lascia asciugare leggermente tra un'annaffiatura e l'altra: radica meglio." },
  melanzana:   { method: "Semina in semenzaio caldo; in serra è più pratico trapiantare piantine acquistate.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 80 cm tra le file.", tip: "Ama il substrato caldo: evita trapianti anticipati in terra ancora fredda." },
  zucchina:    { method: "Semina diretta a postarella (2 semi per buca) o in vasetto da trapiantare con pane di terra integro.", depth: "2–3 cm", thin: "80 cm sulla fila, 100 cm tra le file. Tieni la piantina più vigorosa.", tip: "Cresce rapidissima: copri il suolo con pacciame e raccogli i frutti ogni 2-3 giorni." },
  zucca:       { method: "Semina diretta a postarella o in vaso grande; trapianto delicato con pane integro.", depth: "2–3 cm", thin: "100 cm sulla fila, 130 cm tra le file.", tip: "Dalle spazio fin dall'inizio: soffre se compressa. Orienta i tralci verso l'esterno." },
  cetriolo:    { method: "Semina diretta o in vasetto; in serra rende benissimo su rete verticale.", depth: "1,5–2 cm", thin: "40 cm sulla fila, 100 cm tra le file o i sostegni.", tip: "Trapianta senza rompere le radici e lega presto i tralci alla rete." },
  melone:      { method: "Semina a postarella o in vasetto caldo; trapianta con pane integro quando le notti superano i 15 °C.", depth: "2 cm", thin: "90 cm sulla fila, 120 cm tra le file.", tip: "Pacciama e bagna al piede; riduci l'acqua quando i frutti iniziano a maturare." },
  anguria:     { method: "Semina a postarella o in vaso grande solo con terreno ben caldo (min. 22 °C).", depth: "2–3 cm", thin: "120 cm sulla fila, 150 cm tra le file.", tip: "In serra piccola usa 1-2 piante al massimo: ogni esemplare occupa molto volume." },
  lattuga:     { method: "Semina in alveolo o a spaglio leggero; il trapianto produce cespi più ordinati e uniformi.", depth: "0,3–0,5 cm", thin: "25 cm sulla fila, 30 cm tra le file.", tip: "Semina poco e spesso (ogni 2-3 settimane) per raccolte scalari senza interruzioni." },
  radicchio:   { method: "Semina in alveolo o semenzaio, poi trapianto.", depth: "0,5 cm", thin: "30 cm sulla fila, 35 cm tra le file.", tip: "Per cespi compatti evita l'eccesso di azoto e il caldo intenso; il freddo intensifica il colore." },
  rucola:      { method: "Semina diretta a file o a spaglio fitto; non ama il trapianto.", depth: "0,5 cm", thin: "15 cm sulla fila, 20 cm tra le file (più fitta per baby leaf).", tip: "Taglia a 5 cm dal suolo per far ricrescere; con il caldo monta a seme in pochi giorni." },
  spinaci:     { method: "Semina diretta a file nel letto ben preparato e fine.", depth: "1–2 cm", thin: "20 cm sulla fila, 25 cm tra le file.", tip: "Ama il fresco e l'umidità costante; col caldo supera i 15 °C monta a seme rapidamente." },
  bietola:     { method: "Semina diretta o in alveolo; ogni seme è un glomerulo che può produrre 2-4 piantine.", depth: "1–2 cm", thin: "30 cm sulla fila, 40 cm tra le file (dirada presto).", tip: "Raccogli le foglie esterne senza tagliare il cuore centrale per prolungare la produzione." },
  cavolo:      { method: "Semina in semenzaio o alveolo, poi trapianta piantine robuste.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 70 cm tra le file.", tip: "Interra bene il colletto e mantieni umidità regolare; proteggi dai lepidotteri con rete." },
  verza:       { method: "Semina in semenzaio o alveolo; trapianta piantine robuste.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 70 cm tra le file.", tip: "Resiste bene al freddo: programma raccolte autunnali/invernali; il gelo ne migliora il sapore." },
  broccolo:    { method: "Semina in alveolo o semenzaio; poi trapianto.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 70 cm tra le file.", tip: "Non far asciugare durante la formazione del corimbo; dopo il taglio dà getti laterali per settimane." },
  cavolfiore:  { method: "Semina in alveolo; trapianta senza stress idrico.", depth: "0,5–1 cm", thin: "50 cm sulla fila, 70 cm tra le file.", tip: "Richiede crescita continua: evita sbalzi di acqua e nutrienti; copri la testa per mantenerla bianca." },
  cavolonero:  { method: "Semina in alveolo o semenzaio, poi trapianto.", depth: "0,5–1 cm", thin: "45 cm sulla fila, 60 cm tra le file.", tip: "Raccogli foglia per foglia dal basso: la pianta continua a produrre per mesi durante l'inverno." },
  cavolorapa:  { method: "Semina diretta o in alveolo; poi trapianto precoce.", depth: "0,5–1 cm", thin: "30 cm sulla fila, 40 cm tra le file.", tip: "Raccogli giovane (5-7 cm di diametro): se resta troppo a lungo si indurisce e diventa legnoso." },
  carota:      { method: "Semina diretta a file nel terreno fine e profondo (almeno 30 cm); non tollera il trapianto.", depth: "0,5–1 cm", thin: "Dirada progressivamente fino a 8 cm sulla fila, 25 cm tra le file.", tip: "Tieni il letto umido fino alla germinazione (10-20 giorni); sassi nel suolo causano radici biforcute." },
  finocchio:   { method: "Semina in alveolo o diretta; trapianto delicato da giovane.", depth: "1 cm", thin: "25 cm sulla fila, 35 cm tra le file.", tip: "Rincalza leggermente la base per imbianchire il grumolo; evita stress idrici che causano fioritura precoce." },
  prezzemolo:  { method: "Semina diretta o in vasetto; ammollo 24h dei semi in acqua tiepida accelera la germinazione.", depth: "0,5 cm", thin: "20 cm sulla fila; raccogli a taglio lasciando ricrescere.", tip: "Germina molto lentamente (15-28 giorni): non lasciare seccare il letto di semina in questo periodo." },
  basilico:    { method: "Semina in vasetto/alveolo o diretta solo con temperature stabili oltre i 18 °C.", depth: "0,3–0,5 cm", thin: "25 cm tra le piante.", tip: "Cima i fiori non appena appaiono per ottenere foglie più grandi e prolungare la produzione." },
  coriandolo:  { method: "Semina diretta a file; il trapianto lo fa andare a fiore prematuramente.", depth: "1 cm", thin: "15 cm sulla fila (più fitto per foglie young, più rado per semi).", tip: "Esegui semine scalari ogni 3 settimane: col caldo monta rapidamente. Usa sia foglie che semi." },
  aneto:       { method: "Semina diretta a file; non ama il trapianto.", depth: "0,5–1 cm", thin: "25 cm tra le piante.", tip: "Lascia qualche pianta fiorire: i fiori attirano insetti impollinatori e utili come la Syrphidae." },
  cipolla:     { method: "Semina in semenzaio (trapianto a matita) o pianta bulbilli direttamente in file.", depth: "0,5–1 cm (seme); 3 cm (bulbillo)", thin: "12 cm sulla fila, 25 cm tra le file.", tip: "Non interrare troppo il bulbo: deve ingrossare vicino alla superficie. Riduci l'acqua dopo la piegatura." },
  aglio:       { method: "Pianta spicchi sani con la punta verso l'alto, preferibilmente in autunno.", depth: "3–5 cm", thin: "12 cm sulla fila, 25 cm tra le file.", tip: "Usa gli spicchi esterni più grandi delle teste migliori: danno bulbi più grossi. Asporta gli scapi." },
  porro:       { method: "Semina in semenzaio; trapianta quando ha lo spessore di una matita (6-8 mm).", depth: "0,5–1 cm", thin: "15 cm sulla fila, 30 cm tra le file.", tip: "Trapianta in buche profonde e rincalza progressivamente per ottenere fusti bianchi e lunghi." },
  scalogno:    { method: "Pianta bulbilli o semina in semenzaio.", depth: "2–3 cm con punta appena coperta", thin: "12 cm sulla fila, 20 cm tra le file.", tip: "Evita ristagni idrici: i bulbi marciscono in terreno troppo bagnato. Conserva in luogo asciutto." },
  fagiolino:   { method: "Semina diretta a file quando il terreno supera i 15 °C.", depth: "2–3 cm", thin: "20 cm sulla fila, 40 cm tra le file.", tip: "Come leguminosa fissa l'azoto nel suolo: non concimare troppo o produce foglie a scapito dei baccelli." },
  fagiolo:     { method: "Semina diretta alla base di canne o rete già montata.", depth: "2–4 cm", thin: "25 cm sulla fila, 50 cm tra i sostegni.", tip: "Monta la struttura prima di seminare per non disturbare le radici. Sale fino a 2-3 metri." },
  pisello:     { method: "Semina diretta a file doppie o vicino a una rete bassa.", depth: "3–5 cm", thin: "15 cm sulla fila, 30 cm tra le file.", tip: "Ama il fresco (10-18 °C): in serra semina in autunno o fine inverno; il caldo estivo lo uccide." },
  fragola:     { method: "Meglio trapiantare piantine certificate o stoloni radicati; da seme è lento e variabile.", depth: "Colletto a livello del terreno", thin: "30 cm sulla fila, 40 cm tra le file.", tip: "Non coprire mai il cuore della pianta; pacciama con paglia per frutti puliti e contenere l'umidità." },
  sedano:      { method: "Semina in alveolo; i semi sono finissimi e vanno coperti pochissimo o lasciati alla luce.", depth: "0,2–0,3 cm", thin: "30 cm sulla fila, 40 cm tra le file.", tip: "Richiede acqua costante: anche una breve siccità lo rende fibroso e amaro." },
  ravanello:   { method: "Semina diretta a file, in modo scalare ogni 7-10 giorni.", depth: "0,5–1 cm", thin: "8 cm sulla fila, 15 cm tra le file.", tip: "Se resta troppo fitto produce foglie rigogliose ma radici piccole. Pronto in soli 3-4 settimane!" },
  barbabietola:{ method: "Semina diretta; ogni seme è un glomerulo che può generare 2-4 piantine da diradare.", depth: "1–2 cm", thin: "12 cm sulla fila, 25 cm tra le file.", tip: "Usa i diradamenti giovani come foglie da insalata: sono teneri e saporiti." },
  cicoria:     { method: "Semina diretta o in alveolo, poi trapianto.", depth: "0,5–1 cm", thin: "25 cm sulla fila, 30 cm tra le file.", tip: "Raccogli a cespo giovane o taglia le foglie esterne; il sapore amaro si attenua col freddo." },
  indivia:     { method: "Semina in alveolo o semenzaio, poi trapianto.", depth: "0,5 cm", thin: "30 cm sulla fila, 40 cm tra le file.", tip: "Per foglie più chiare e tenere lega il cespo (asciutto) 7-10 giorni prima del raccolto." },
  pakchoi:     { method: "Semina diretta o in alveolo; cresce molto veloce.", depth: "0,5–1 cm", thin: "25 cm sulla fila, 30 cm tra le file.", tip: "Semina in clima fresco (max 22 °C): con caldo o stress idrico monta a fiore in pochissimo tempo." },
  cavoletti:   { method: "Semina in semenzaio o alveolo; trapianta presto.", depth: "0,5–1 cm", thin: "60 cm sulla fila, 80 cm tra le file.", tip: "Coltura lunga (4-6 mesi): occupa spazio a lungo. Cima la punta quando i cavoletti iniziano a formarsi." },
  rapa:        { method: "Semina diretta a file nel periodo fresco.", depth: "1 cm", thin: "12 cm sulla fila, 25 cm tra le file.", tip: "Dirada presto per far ingrossare radici regolari; raccoglie da giovane prima che diventino legnose." },
  valerianella:{ method: "Semina diretta a spaglio o file fitte.", depth: "0,5 cm", thin: "10 cm sulla fila, 15 cm tra le file.", tip: "Copri appena il seme e mantieni umido nei primi giorni. Perfetta per la serra fredda autunnale." },
  rosmarino:   { method: "Meglio trapiantare talea o piantina; da seme è molto lento.", depth: "Colletto a livello del terreno", thin: "60 cm sulla fila, 80 cm tra le file.", tip: "Pochissima acqua e terreno ben drenante: teme il ristagno idrico più di qualsiasi altra condizione." },
  timo:        { method: "Semina superficiale o trapianto di piccole piantine.", depth: "Superficiale, copertura leggerissima", thin: "30 cm tra le piante.", tip: "Ama il sole diretto e il terreno asciutto; non coprirlo con colture più alte." },
  origano:     { method: "Semina superficiale o trapianto; germina meglio con luce diretta.", depth: "Superficiale, copertura leggerissima", thin: "30 cm tra le piante.", tip: "Cima regolarmente per farlo accestire e raccogli sempre prima della piena fioritura per massimo aroma." },
  salvia:      { method: "Semina in alveolo o trapianto di piantina giovane.", depth: "0,5 cm", thin: "40 cm sulla fila, 50 cm tra le file.", tip: "Non eccedere con l'acqua: le foglie sono più aromatiche in terreno drenante e leggermente asciutto." }
,
  pastinaca: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 35 cm sulla fila e 45 cm tra file.",
  tip: "Dolce dopo il freddo; semina diretta e terreno profondo."
  },
  radice_prezemolo: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
  tip: "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe."
  },
  sedano_rapa: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
  tip: "Radice globosa e profumata; vuole acqua costante e suolo ricco."
  },
  rafano: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
  tip: "Radice piccante molto usata in Romania; contenila perché è vigorosa."
  },
  patata: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 35 cm sulla fila e 60 cm tra file.",
  tip: "In serra anticipa il raccolto; rincalza quando gli steli crescono."
  },
  patata_dolce: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 90 cm tra file.",
  tip: "Ama caldo stabile e suolo leggero; ideale in serra lunga."
  },
  cipolla_rossa: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 15 cm sulla fila e 30 cm tra file.",
  tip: "Bulbo dolce e colorato; ottima per raccolti scalari."
  },
  cipollotto: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 8 cm sulla fila e 20 cm tra file.",
  tip: "Pronto rapidamente; raccogli giovane prima che ingrossi troppo."
  },
  erba_cipollina: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 20 cm sulla fila e 25 cm tra file.",
  tip: "Aromatica perenne; taglia spesso per foglie tenere."
  },
  loboda: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
  tip: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco."
  },
  stevia_dolce: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
  tip: "Acetosa per minestre primaverili; raccogli foglie giovani."
  },
  leustean: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
  tip: "Il profumo classico delle ciorbe rumene; perenne e vigoroso."
  },
  dragoncello: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
  tip: "Aromatica fine per aceti e conserve; evita ristagni."
  },
  menta: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
  tip: "Molto vigorosa: meglio in vaso o area controllata."
  },
  maggiorana: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
  tip: "Aromatica delicata; ama caldo, luce e terreno drenato."
  },
  camomilla: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
  tip: "Fiori per tisane; attira insetti utili e profuma la serra."
  },
  calendula: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
  tip: "Fiore utile nell’orto: attira impollinatori e colora le aiuole."
  },
  nasturzio: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
  tip: "Fiori e foglie commestibili; utile come pianta esca per afidi."
  },
  mais_dolce: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 70 cm tra file.",
  tip: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi."
  },
  gombo: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
  tip: "Ama molto caldo; raccogli i baccelli piccoli e teneri."
  },
  tomatillo: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 50 cm sulla fila e 80 cm tra file.",
  tip: "Serve almeno due piante per fruttificare bene; ottimo per salse."
  },
  physalis: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
  tip: "Frutti dolci in lanterna; in serra matura meglio."
  },
  kiwano: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 60 cm sulla fila e 100 cm tra file.",
  tip: "Cucurbitacea esotica per serre calde; falla arrampicare."
  },
  cucamelon: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
  tip: "Piccoli frutti croccanti; produttivo su rete in serra."
  },
  asparago: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 40 cm sulla fila e 80 cm tra file.",
  tip: "Perenne: richiede pazienza, ma produce per molti anni."
  },
  carciofo: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 80 cm sulla fila e 100 cm tra file.",
  tip: "Coltura grande e decorativa; proteggi dal gelo intenso."
  },
  cardo: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 60 cm sulla fila e 90 cm tra file.",
  tip: "Parente del carciofo; imbianchisci le coste prima del raccolto."
  },
  crescione: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 15 cm sulla fila e 20 cm tra file.",
  tip: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti."
  },
  mizuna: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
  tip: "Senape giapponese facile; foglie frastagliate per mix insalata."
  },
  senape_foglia: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
  tip: "Foglie piccanti; semina in fresco per evitare fioritura precoce."
  },
  tatsoi: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
  tip: "Rosetta compatta, molto resistente al freddo."
  },
  cavolo_cinese: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
  tip: "Forma un cespo tenero; proteggi da caldo e stress idrico."
  },
  daikon: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
  tip: "Ravanello lungo: terreno profondo e raccolta prima che lignifichi."
  },
  scorzonera: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
  tip: "Radice nera lunga; richiede suolo leggero e profondo."
  },
  topinambur: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 50 cm sulla fila e 90 cm tra file.",
  tip: "Tubero rustico e produttivo; delimita lo spazio perché si espande."
  },
  fava: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
  tip: "Legume precoce e resistente al fresco; migliora il terreno."
  },
  soia_edamame: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
  tip: "Raccogli i baccelli verdi quando i semi sono pieni ma teneri."
  },
  cece: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
  tip: "Ama asciutto e caldo; non eccedere con acqua in serra."
  },
  lenticchia: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 20 cm sulla fila e 35 cm tra file.",
  tip: "Piccolo legume rustico; adatto a bordure asciutte."
  },
  fagiolo_borlotto: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
  tip: "Per baccelli freschi o granella; usa tutori robusti."
  },
  cavolo_rosso: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
  tip: "Cespo compatto e colorato; ottimo per raccolti autunnali."
  },
  cavolo_navone: {
  method: "Semina diretta a file nel terreno ben preparato.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
  tip: "Radice grande e rustica; utile per autunno e inverno."
  },
  broccolo_rapa: {
  method: "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
  tip: "Raccogli cime e foglie prima della piena fioritura."
  },
  shiso: {
  method: "Semina superficiale o trapianto di piantina giovane.",
  depth: "0,5-1 cm",
  thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
  tip: "Aromatica asiatica profumata; bella anche in vaso in serra."
  }
};

const SOWING_GUIDE_RO = {
  pomodoro:    { method: "Seamănă în ghiveci sau alveolă la cald; transplantează în seră un răsad robust cu 4-6 frunze adevărate.", depth: "0,5–1 cm", thin: "50 cm pe rând, 80 cm între rânduri.", tip: "Îngroapă ușor tulpina până la frunze și pregătește imediat un tutore sau sfoară verticală." },
  peperone:    { method: "Seamănă protejat în alveolă; mai bine transplantează plante deja formate când nopțile sunt blânde.", depth: "0,5 cm", thin: "40 cm pe rând, 60 cm între rânduri.", tip: "Încolțește lent: necesită căldură constantă (20-25 °C) și sol niciodată îmbibat." },
  peperoncino: { method: "Seamănă protejat în alveolă cu multă căldură inițială (25-28 °C).", depth: "0,5 cm", thin: "35 cm pe rând, 50 cm între rânduri.", tip: "Lasă să se usuce ușor între udări: prinde rădăcini mai bine." },
  melanzana:   { method: "Seamănă în semănătoare caldă; în seră e mai practic să transplantezi răsaduri cumpărate.", depth: "0,5–1 cm", thin: "50 cm pe rând, 80 cm între rânduri.", tip: "Iubește substratul cald: evită transplantul timpuriu în pământ încă rece." },
  zucchina:    { method: "Seamănă direct la cuib (2 semințe per gaură) sau în ghiveci pentru transplant cu bulgărele integru.", depth: "2–3 cm", thin: "80 cm pe rând, 100 cm între rânduri. Păstrează răsadul mai viguros.", tip: "Crește foarte rapid: acoperă solul cu mulci și recoltează fructele la fiecare 2-3 zile." },
  zucca:       { method: "Seamănă direct la cuib sau în ghiveci mare; transplant delicat cu bulgărele integru.", depth: "2–3 cm", thin: "100 cm pe rând, 130 cm între rânduri.", tip: "Oferă-i spațiu de la început: suferă dacă e comprimată. Dirijează corzile spre exterior." },
  cetriolo:    { method: "Seamănă direct sau în ghiveci; în seră dă rezultate excelente pe plasă verticală.", depth: "1,5–2 cm", thin: "40 cm pe rând, 100 cm între rânduri sau suporturi.", tip: "Transplantează fără să rupi rădăcinile și leagă devreme corzile de plasă." },
  melone:      { method: "Seamănă la cuib sau în ghiveci cald; transplantează cu bulgărele integru când nopțile depășesc 15 °C.", depth: "2 cm", thin: "90 cm pe rând, 120 cm între rânduri.", tip: "Mulcește și udă la bază; reduce apa când fructele încep să se coacă." },
  anguria:     { method: "Seamănă la cuib sau în ghiveci mare doar cu pământ bine cald (min. 22 °C).", depth: "2–3 cm", thin: "120 cm pe rând, 150 cm între rânduri.", tip: "În seră mică folosește 1-2 plante maxim: fiecare exemplar ocupă mult volum." },
  lattuga:     { method: "Seamănă în alveolă sau dispersat ușor; transplantul produce căpățâni mai ordonate și uniforme.", depth: "0,3–0,5 cm", thin: "25 cm pe rând, 30 cm între rânduri.", tip: "Seamănă puțin și des (la 2-3 săptămâni) pentru recoltă eșalonată fără întreruperi." },
  radicchio:   { method: "Seamănă în alveolă sau semănătoare, apoi transplant.", depth: "0,5 cm", thin: "30 cm pe rând, 35 cm între rânduri.", tip: "Pentru căpățâni compacte evită excesul de azot și căldura intensă; frigul intensifică culoarea." },
  rucola:      { method: "Seamănă direct în rânduri sau dispersat des; nu place transplantul.", depth: "0,5 cm", thin: "15 cm pe rând, 20 cm între rânduri (mai des pentru baby leaf).", tip: "Taie la 5 cm de sol pentru recreștere; pe timp cald intră repede în floare." },
  spinaci:     { method: "Seamănă direct în rânduri în patul bine pregătit și fin.", depth: "1–2 cm", thin: "20 cm pe rând, 25 cm între rânduri.", tip: "Iubește răcoarea și umiditatea constantă; la căldură peste 15 °C intră rapid în floare." },
  bietola:     { method: "Seamănă direct sau în alveolă; fiecare sămânță este un glomerul care poate produce 2-4 răsaduri.", depth: "1–2 cm", thin: "30 cm pe rând, 40 cm între rânduri (rărește devreme).", tip: "Recoltează frunzele exterioare fără a tăia centrul pentru a prelungi producția." },
  cavolo:      { method: "Seamănă în semănătoare sau alveolă, apoi transplantează răsaduri robuste.", depth: "0,5–1 cm", thin: "50 cm pe rând, 70 cm între rânduri.", tip: "Îngroapă bine coletul și menține umiditate regulată; protejează de lepidoptere cu plasă." },
  verza:       { method: "Seamănă în semănătoare sau alveolă; transplantează răsaduri robuste.", depth: "0,5–1 cm", thin: "50 cm pe rând, 70 cm între rânduri.", tip: "Rezistă bine la frig: planifică recoltele toamna/iarna; îngețul îi îmbunătățește gustul." },
  broccolo:    { method: "Seamănă în alveolă sau semănătoare; apoi transplant.", depth: "0,5–1 cm", thin: "50 cm pe rând, 70 cm între rânduri.", tip: "Nu lăsa să se usuce în timpul formării coriumbului; după tăiere dă lăstari laterali săptămâni întregi." },
  cavolfiore:  { method: "Seamănă în alveolă; transplantează fără stres hidric.", depth: "0,5–1 cm", thin: "50 cm pe rând, 70 cm între rânduri.", tip: "Necesită creștere continuă: evită variații de apă și nutrienți; acoperă capul pentru a rămâne alb." },
  cavolonero:  { method: "Seamănă în alveolă sau semănătoare, apoi transplant.", depth: "0,5–1 cm", thin: "45 cm pe rând, 60 cm între rânduri.", tip: "Recoltează frunză cu frunză de jos: planta continuă să producă luni întregi iarna." },
  cavolorapa:  { method: "Seamănă direct sau în alveolă; apoi transplant timpuriu.", depth: "0,5–1 cm", thin: "30 cm pe rând, 40 cm între rânduri.", tip: "Recoltează tânăr (5-7 cm diametru): dacă stă prea mult se întărește și devine lemnos." },
  carota:      { method: "Seamănă direct în rânduri în pământ fin și adânc (min. 30 cm); nu tolerează transplantul.", depth: "0,5–1 cm", thin: "Rărește progresiv până la 8 cm pe rând, 25 cm între rânduri.", tip: "Menține patul umed până la germinare (10-20 zile); pietrele din sol cauzează rădăcini bifurcate." },
  finocchio:   { method: "Seamănă în alveolă sau direct; transplant delicat când e tânăr.", depth: "1 cm", thin: "25 cm pe rând, 35 cm între rânduri.", tip: "Mușuroiește ușor baza pentru a albi bulbul; evită stresul hidric care cauzează înflorire prematură." },
  prezzemolo:  { method: "Seamănă direct sau în ghiveci; înmuierea semințelor 24h în apă caldă accelerează germinarea.", depth: "0,5 cm", thin: "20 cm pe rând; recoltează prin tăiere lăsând să recrescă.", tip: "Germinează foarte lent (15-28 zile): nu lăsa patul de semănat să se usuce în această perioadă." },
  basilico:    { method: "Seamănă în ghiveci/alveolă sau direct doar la temperaturi stabile peste 18 °C.", depth: "0,3–0,5 cm", thin: "25 cm între plante.", tip: "Ciupește florile imediat ce apar pentru frunze mai mari și producție prelungită." },
  coriandolo:  { method: "Seamănă direct în rânduri; transplantul îl face să înflorească prematur.", depth: "1 cm", thin: "15 cm pe rând (mai des pentru frunze tinere, mai rar pentru semințe).", tip: "Seamănă eșalonat la fiecare 3 săptămâni: la căldură intră rapid în floare. Folosește atât frunzele cât și semințele." },
  aneto:       { method: "Seamănă direct în rânduri; nu place transplantul.", depth: "0,5–1 cm", thin: "25 cm între plante.", tip: "Lasă câteva plante să înflorească: florile atrag insecte polenizatoare și benefice." },
  cipolla:     { method: "Seamănă în semănătoare (transplant la grosimea unui creion) sau plantează bulbili direct în rânduri.", depth: "0,5–1 cm (sămânță); 3 cm (bulbil)", thin: "12 cm pe rând, 25 cm între rânduri.", tip: "Nu îngropa prea adânc bulbul: trebuie să se îngroașe aproape de suprafață. Reduce apa după îndoire." },
  aglio:       { method: "Plantează căței sănătoși cu vârful în sus, preferabil toamna.", depth: "3–5 cm", thin: "12 cm pe rând, 25 cm între rânduri.", tip: "Folosește cei mai mari căței din capetele cele mai bune: dau bulbi mai mari. Îndepărtează scapele." },
  porro:       { method: "Seamănă în semănătoare; transplantează când are grosimea unui creion (6-8 mm).", depth: "0,5–1 cm", thin: "15 cm pe rând, 30 cm între rânduri.", tip: "Transplantează în gropi adânci și mușuroiește progresiv pentru tulpini albe și lungi." },
  scalogno:    { method: "Plantează bulbili sau seamănă în semănătoare.", depth: "2–3 cm cu vârful abia acoperit", thin: "12 cm pe rând, 20 cm între rânduri.", tip: "Evită stagnarea apei: bulbii putrezesc în pământ prea umed. Păstrează în loc uscat." },
  fagiolino:   { method: "Seamănă direct în rânduri când pământul depășește 15 °C.", depth: "2–3 cm", thin: "20 cm pe rând, 40 cm între rânduri.", tip: "Ca leguminoasă fixează azotul în sol: nu fertiliza prea mult sau produce frunze în detrimentul păstăilor." },
  fagiolo:     { method: "Seamănă direct la baza araci-lor sau plaselor deja montate.", depth: "2–4 cm", thin: "25 cm pe rând, 50 cm între suporturi.", tip: "Montează structura înainte de semănat pentru a nu deranja rădăcinile. Urcă până la 2-3 metri." },
  pisello:     { method: "Seamănă direct în rânduri duble sau lângă o plasă joasă.", depth: "3–5 cm", thin: "15 cm pe rând, 30 cm între rânduri.", tip: "Iubește răcoarea (10-18 °C): în seră seamănă toamna sau la sfârșitul iernii; căldura estivală îl ucide." },
  fragola:     { method: "Mai bine transplantează răsaduri certificate sau stoloni înrădăcinați; din sămânță e lent și variabil.", depth: "Coletul la nivelul solului", thin: "30 cm pe rând, 40 cm între rânduri.", tip: "Nu acoperi niciodată inima plantei; mulcește cu paie pentru fructe curate și menținerea umidității." },
  sedano:      { method: "Seamănă în alveolă; semințele sunt fine și se acoperă foarte puțin sau se lasă la lumină.", depth: "0,2–0,3 cm", thin: "30 cm pe rând, 40 cm între rânduri.", tip: "Necesită apă constantă: chiar și o scurtă secetă îl face fibros și amar." },
  ravanello:   { method: "Seamănă direct în rânduri, eșalonat la fiecare 7-10 zile.", depth: "0,5–1 cm", thin: "8 cm pe rând, 15 cm între rânduri.", tip: "Dacă rămâne prea des produce frunze bogate dar rădăcini mici. Gata în doar 3-4 săptămâni!" },
  barbabietola:{ method: "Seamănă direct; fiecare sămânță este un glomerul care poate genera 2-4 răsaduri de rărit.", depth: "1–2 cm", thin: "12 cm pe rând, 25 cm între rânduri.", tip: "Folosește răriturile tinere ca frunze de salată: sunt fragede și gustoase." },
  cicoria:     { method: "Seamănă direct sau în alveolă, apoi transplant.", depth: "0,5–1 cm", thin: "25 cm pe rând, 30 cm între rânduri.", tip: "Recoltează căpățâna tânără sau taie frunzele exterioare; gustul amar se atenuează cu frigul." },
  indivia:     { method: "Seamănă în alveolă sau semănătoare, apoi transplant.", depth: "0,5 cm", thin: "30 cm pe rând, 40 cm între rânduri.", tip: "Pentru frunze mai deschise și fragede, leagă căpățâna (uscată) cu 7-10 zile înainte de recoltă." },
  pakchoi:     { method: "Seamănă direct sau în alveolă; crește foarte rapid.", depth: "0,5–1 cm", thin: "25 cm pe rând, 30 cm între rânduri.", tip: "Seamănă în climat răcoros (max 22 °C): la căldură sau stres hidric intră în floare foarte repede." },
  cavoletti:   { method: "Seamănă în semănătoare sau alveolă; transplantează devreme.", depth: "0,5–1 cm", thin: "60 cm pe rând, 80 cm între rânduri.", tip: "Cultură lungă (4-6 luni): ocupă spațiu mult timp. Ciupește vârful când mugurii încep să se formeze." },
  rapa:        { method: "Seamănă direct în rânduri în perioada răcoroasă.", depth: "1 cm", thin: "12 cm pe rând, 25 cm între rânduri.", tip: "Rărește devreme pentru rădăcini regulate; recoltează tânăr înainte de a deveni lemnos." },
  valerianella:{ method: "Seamănă direct dispersat sau în rânduri dese.", depth: "0,5 cm", thin: "10 cm pe rând, 15 cm între rânduri.", tip: "Acoperă abia sămânța și menține umed în primele zile. Perfectă pentru sera rece de toamnă." },
  rosmarino:   { method: "Mai bine transplantează butaș sau răsad; din sămânță e foarte lent.", depth: "Coletul la nivelul solului", thin: "60 cm pe rând, 80 cm între rânduri.", tip: "Foarte puțină apă și sol bine drenat: se teme de stagnarea apei mai mult decât orice." },
  timo:        { method: "Seamănă la suprafață sau transplantează răsaduri mici.", depth: "Superficial, acoperire foarte ușoară", thin: "30 cm între plante.", tip: "Iubește soarele direct și solul uscat; nu-l acoperi cu culturi mai înalte." },
  origano:     { method: "Seamănă la suprafață sau transplantează; germinează mai bine cu lumină directă.", depth: "Superficial, acoperire foarte ușoară", thin: "30 cm între plante.", tip: "Ciupește regulat pentru a-l face să se îndesească și recoltează întotdeauna înaintea înfloririi complete." },
  salvia:      { method: "Seamănă în alveolă sau transplantează răsad tânăr.", depth: "0,5 cm", thin: "40 cm pe rând, 50 cm între rânduri.", tip: "Nu exagera cu apa: frunzele sunt mai aromatice în sol drenat și ușor uscat." }
};

const TIPO = {
  pomodoro: "frutto",
  peperone: "frutto",
  peperoncino: "frutto",
  melanzana: "frutto",
  zucchina: "frutto",
  zucca: "frutto",
  cetriolo: "frutto",
  melone: "frutto",
  anguria: "frutto",
  fragola: "frutto",
  fagiolino: "legume",
  fagiolo: "legume",
  pisello: "legume",
  lattuga: "foglia",
  radicchio: "foglia",
  rucola: "foglia",
  spinaci: "foglia",
  bietola: "foglia",
  cavolo: "foglia",
  verza: "foglia",
  broccolo: "foglia",
  cavolfiore: "foglia",
  cavolonero: "foglia",
  cavolorapa: "foglia",
  cicoria: "foglia",
  indivia: "foglia",
  pakchoi: "foglia",
  cavoletti: "foglia",
  valerianella: "foglia",
  carota: "radice",
  cipolla: "radice",
  aglio: "radice",
  porro: "radice",
  scalogno: "radice",
  ravanello: "radice",
  barbabietola: "radice",
  rapa: "radice",
  sedano: "radice",
  basilico: "aromatica",
  prezzemolo: "aromatica",
  coriandolo: "aromatica",
  aneto: "aromatica",
  rosmarino: "aromatica",
  timo: "aromatica",
  origano: "aromatica",
  salvia: "aromatica",
  finocchio: "aromatica",
  pastinaca: "radice",
  radice_prezemolo: "radice",
  sedano_rapa: "radice",
  rafano: "radice",
  patata: "radice",
  patata_dolce: "radice",
  cipolla_rossa: "radice",
  cipollotto: "radice",
  erba_cipollina: "aromatica",
  loboda: "foglia",
  stevia_dolce: "foglia",
  leustean: "aromatica",
  dragoncello: "aromatica",
  menta: "aromatica",
  maggiorana: "aromatica",
  camomilla: "aromatica",
  calendula: "aromatica",
  nasturzio: "aromatica",
  mais_dolce: "frutto",
  gombo: "frutto",
  tomatillo: "frutto",
  physalis: "frutto",
  kiwano: "frutto",
  cucamelon: "frutto",
  asparago: "foglia",
  carciofo: "foglia",
  cardo: "foglia",
  crescione: "foglia",
  mizuna: "foglia",
  senape_foglia: "foglia",
  tatsoi: "foglia",
  cavolo_cinese: "foglia",
  daikon: "radice",
  scorzonera: "radice",
  topinambur: "radice",
  fava: "legume",
  soia_edamame: "legume",
  cece: "legume",
  lenticchia: "legume",
  fagiolo_borlotto: "legume",
  cavolo_rosso: "foglia",
  cavolo_navone: "radice",
  broccolo_rapa: "foglia",
  shiso: "aromatica"
};
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
  seasonOnly: true,
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
function plantFactItems(plant, compact = false) {
  const base = [
    ["↔", t("plant.distance"), spacingLabel(plant)],
    ["⏱", t("plant.harvest_days"), daysLabel(plant)],
    ["⚖", t("plant.yield"), yieldLabel(plant)]
  ];
  if (compact) return base;
  return base.concat([
    [SOLE_ICON[plant.sole] || "☀️", t("plant.sun"), sunLabel(plant)],
    [ACQUA_ICON[plant.acqua] || "💧", t("plant.water"), t(`water.${plant.acqua}`)],
    ["↕", t("plant.height"), t(`height.${plant.h}`)]
  ]);
}
function plantFacts(plant, variant = "") {
  const compact = variant === "compact";
  return `<div class="plant-facts ${variant}">
    ${plantFactItems(plant, compact)
      .map(
        ([icon, label, value]) => `<span class="plant-fact">
          <span class="fact-icon" aria-hidden="true">${icon}</span>
          <span class="fact-copy"><span class="fact-label">${label}</span><b>${value}</b></span>
        </span>`
      )
      .join("")}
  </div>`;
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

/* Catalogo: render delle piante in evidenza e lista compatta. */
function renderEditorialPlants() {
  const seasonal = seminabili();
  const plants = filteredCatalogPlants();
  const filtersActive =
    Boolean(catalog.search || catalog.type || catalog.easyOnly) ||
    !catalog.seasonOnly;
  syncCatalogControls();
  const catalogStatus = document.getElementById("catalogStatus");
  if (catalogStatus) {
    const parts = [];
    if (!catalog.seasonOnly) parts.push(t("catalog.filter_all_plants"));
    if (catalog.search) parts.push(`"${catalog.search}"`);
    if (catalog.type) parts.push(typeLabel(catalog.type));
    if (catalog.easyOnly) parts.push(t("catalog.easy_only"));
    if (catalog.sort && catalog.sort !== "season") parts.push(t(`catalog.sort_${catalog.sort}`));
    catalogStatus.hidden = !parts.length;
    if (parts.length) {
      catalogStatus.innerHTML = `<span class="catalog-status-ico">🔍</span> ${parts.join(" · ")} <span class="catalog-status-count">${plants.length} ${t("catalog.results")}</span>`;
    }
  }
  if (catalog.seasonOnly && !filtersActive) {
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
      `<div class="empty-state"><div class="empty-icon">🌱</div><p>${filtersActive ? t("catalog.empty") : t("season.empty")}</p></div>`;
    document.getElementById("compactPlants").innerHTML = "";
    return;
  }

  const featured = plants.slice(0, 3);
  const rest = plants.slice(3);

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
          <div class="top-name">${plantName(p.id)}</div>
          <div class="top-facts-row">
            <span class="top-fact">⏱&nbsp;${daysLabel(p)}</span>
            <span class="top-fact">↔&nbsp;${spacingLabel(p)}</span>
            <span class="top-fact">⚖&nbsp;${yieldLabel(p)}</span>
          </div>
          <button class="top-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')">
            ${cartActionLabel(inC)}
          </button>
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
          </div>
          <p class="compact-note">${plantNote(p)}</p>
          <div class="compact-facts-row compact-facts-row--pro">
            <span>⏱&nbsp;${daysLabel(p)}</span>
            <span>↔&nbsp;${spacingLabel(p)}</span>
            <span>⚖&nbsp;${yieldLabel(p)}</span>
          </div>
        </div>
        <button class="compact-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')" title="${inC ? t("cart.remove") : t("cart.add_plain")}">${inC ? "✓" : "+"}</button>
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
  const monthSegments = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${NOMI_MESI[i]}">
      <span class="month-seg-abbr">${ABBR_MESI[i]}</span>
    </div>`;
  }).join("");
  document.getElementById("detailMonthBar").innerHTML =
    `<div class="month-bar-head">
       <span>${t("detail.sowing_months")}</span>
       <b>${activeMonths}</b>
     </div>
     <div class="month-segments">${monthSegments}</div>`;

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
  const guide = (currentLang === "ro" ? SOWING_GUIDE_RO[id] : null) || SOWING_GUIDE[id];
  let sowHtml = "";
  if (guide) {
    if (guide.method) sowHtml += `<div class="detail-sow-row"><b>🌱 ${t("detail.sow_method")}</b> — ${guide.method}</div>`;
    if (guide.depth)  sowHtml += `<div class="detail-sow-row"><b>📏 ${t("detail.sow_depth")}</b> — ${guide.depth}</div>`;
    if (guide.thin)   sowHtml += `<div class="detail-sow-row"><b>📐 ${t("detail.sow_thin")}</b> — ${guide.thin}</div>`;
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
  const anyExtra = catalog.search || catalog.type || catalog.easyOnly || !catalog.seasonOnly || catalog.sort !== "season";
  const resetBtn = document.getElementById("catalogReset");
  if (resetBtn) resetBtn.hidden = !anyExtra;
}
function setCatalogSearch(value) {
  catalog.search = value;
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
  catalog.seasonOnly = true;
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
initCookieBanner();function catalogBuyLabel() {
  return currentLang === "ro" ? "Catalog profesional · cumpărare rapidă" : "Catalog professionale · acquisto rapido";
}
function catalogSpacingText(p) {
  const spacing = spacingLabel(p);
  return currentLang === "ro" ? `Distanțe ${spacing}` : `Distanze ${spacing}`;
}
function catalogTechLine(p) {
  const parts = [daysLabel(p), spacingLabel(p), yieldLabel(p)];
  return parts.filter(Boolean).join(" · ");
}

