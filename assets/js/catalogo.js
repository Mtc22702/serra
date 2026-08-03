/** Risorse catalogo: piante, foto, contenuti editoriali, sicurezza HTML e manuali. */
// Archivio piante — gruppo 1 di 9.

// Archivio condiviso delle piante
const DATA_EXPORT = (function (root) {
  // Anagrafica colture
  const PLANTS = [
    {
      id: "pomodoro",
      nome: "Pomodoro",
      arch: "frutto",
      d: 50,
      dr: 80,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [2, 3, 4],
      amiche: [
        "basilico",
        "cipolla",
        "carota",
        "prezzemolo",
        "lattuga",
        "sedano",
        "borragine"
      ],
      nemiche: [
        "cavolo",
        "verza",
        "broccolo",
        "cavolfiore",
        "cavolonero",
        "cavolorapa",
        "broccolo_romanesco",
        "finocchio",
        "cetriolo",
        "cavoletti"
      ],
      resa: 3,
      nota: "Vuole sostegno e pieno sole. Togli le femminelle.",
      col: {
        l1: "#3f7a3a",
        l2: "#2f5e2c",
        fr: "#e2452f"
      },
      tipo: "frutto"
    },
    {
      id: "peperone",
      nome: "Peperone",
      arch: "frutto",
      d: 40,
      dr: 60,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [2, 3, 4],
      amiche: ["basilico", "pomodoro"],
      nemiche: ["fagiolino", "fagiolo", "broccolo_romanesco"],
      resa: 1,
      nota: "Ama il caldo. Concima quando inizia a fruttificare.",
      col: {
        l1: "#3c7d3a",
        l2: "#2c5e2b",
        fr: "#37a13a"
      },
      tipo: "frutto"
    },
    {
      id: "peperoncino",
      nome: "Peperoncino",
      arch: "frutto",
      d: 35,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 95,
      mesi: [2, 3, 4],
      amiche: ["basilico"],
      nemiche: [],
      resa: 0.5,
      nota: "Rustico e generoso. Sopporta bene la siccità.",
      col: {
        l1: "#3c7d3a",
        l2: "#2c5e2b",
        fr: "#d22f22"
      },
      tipo: "frutto"
    },
    {
      id: "melanzana",
      nome: "Melanzana",
      arch: "frutto",
      d: 50,
      dr: 80,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [2, 3, 4],
      amiche: ["fagiolino"],
      nemiche: [],
      resa: 1.5,
      nota: "Vuole molto caldo e annaffiature regolari.",
      col: {
        l1: "#46743f",
        l2: "#345633",
        fr: "#5b2a7a"
      },
      tipo: "frutto"
    },
    {
      id: "zucchina",
      nome: "Zucchina",
      arch: "cucurbita",
      d: 80,
      dr: 100,
      h: "media",
      sole: "pieno",
      acqua: "alta",
      gg: 50,
      mesi: [3, 4, 5, 6],
      amiche: ["fagiolino", "ravanello"],
      nemiche: [],
      resa: 2.5,
      nota: "Cresce in fretta e occupa tanto spazio. Raccogli spesso.",
      col: {
        l1: "#3f7e3f",
        l2: "#2e5e2e",
        fl: "#f3c43b"
      },
      tipo: "frutto",
      notaBreve: "Cresce in fretta. Raccogli spesso."
    },
    {
      id: "zucca",
      nome: "Zucca",
      arch: "cucurbita",
      d: 100,
      dr: 130,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 120,
      mesi: [4, 5],
      amiche: ["fagiolo"],
      nemiche: [],
      resa: 4,
      nota: "Si allarga molto: lasciale spazio o falla arrampicare.",
      col: {
        l1: "#477e3a",
        l2: "#345a2c",
        fl: "#f0b93a"
      },
      tipo: "frutto",
      notaBreve: "Si allarga molto: lascia spazio o falla arrampicare."
    },
    {
      id: "cetriolo",
      nome: "Cetriolo",
      arch: "rampicante",
      d: 40,
      dr: 100,
      h: "alta",
      sole: "pieno",
      acqua: "alta",
      gg: 60,
      mesi: [3, 4, 5, 6],
      amiche: ["fagiolino", "lattuga", "aneto"],
      nemiche: ["salvia", "pomodoro", "finocchio"],
      resa: 2,
      nota: "Falla arrampicare su una rete: frutti più puliti e dritti.",
      col: {
        l1: "#3f863f",
        l2: "#2c5f2c"
      },
      tipo: "frutto",
      notaBreve: "Falla arrampicare su una rete: frutti più puliti."
    },
    {
      id: "melone",
      nome: "Melone",
      arch: "cucurbita",
      d: 90,
      dr: 120,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 110,
      mesi: [3, 4, 5],
      amiche: [],
      nemiche: [],
      resa: 2,
      nota: "Vuole tanto sole e poca acqua a fine maturazione.",
      col: {
        l1: "#4c8240",
        l2: "#385f2f",
        fl: "#f3d23b"
      },
      tipo: "frutto"
    },
    {
      id: "anguria",
      nome: "Anguria",
      arch: "cucurbita",
      d: 120,
      dr: 150,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 120,
      mesi: [3, 4, 5],
      amiche: [],
      nemiche: [],
      resa: 6,
      nota: "Enorme footprint: una pianta riempie mezza serra piccola.",
      col: {
        l1: "#3f7a3a",
        l2: "#2c5a29",
        fl: "#f1cf3b"
      },
      tipo: "frutto",
      notaBreve: "Enorme: una pianta riempie mezza serra piccola."
    },
    {
      id: "lattuga",
      nome: "Lattuga",
      arch: "rosetta",
      d: 25,
      dr: 30,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 55,
      mesi: [1, 2, 3, 4, 8, 9, 10],
      amiche: ["carota", "ravanello", "fragola", "cetriolo", "cipolla"],
      nemiche: [],
      resa: 0.35,
      nota: "Facilissima e veloce. Semina poche piante per volta.",
      col: {
        l1: "#8cc85d",
        l2: "#6fae45"
      },
      tipo: "foglia"
    },
    {
      id: "radicchio",
      nome: "Radicchio",
      arch: "rosetta",
      d: 30,
      dr: 35,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 80,
      mesi: [6, 7, 8],
      amiche: ["finocchio"],
      nemiche: [],
      resa: 0.3,
      nota: "Il freddo lo rende rosso e dolce.",
      col: {
        l1: "#9c4f6a",
        l2: "#6f3550",
        fr: "#b85a78"
      },
      tipo: "foglia"
    },
    {
      id: "rucola",
      nome: "Rucola",
      arch: "frastagliata",
      d: 15,
      dr: 20,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 35,
      mesi: [2, 3, 4, 5, 8, 9, 10],
      amiche: ["lattuga"],
      nemiche: [],
      resa: 0.1,
      nota: "Pronta in poche settimane. Si ritaglia e ricresce.",
      col: {
        l1: "#5fa23a",
        l2: "#477e2b"
      },
      tipo: "foglia"
    },

    // Archivio piante — gruppo 2 di 9.

    {
      id: "spinaci",
      nome: "Spinaci",
      arch: "rosetta",
      d: 20,
      dr: 25,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 45,
      mesi: [1, 2, 3, 9, 10, 11],
      amiche: ["fragola", "cavolo"],
      nemiche: ["finocchio"],
      resa: 0.15,
      nota: "Ama il fresco; in estate va in fiore subito.",
      col: {
        l1: "#2f6f2f",
        l2: "#234f24"
      },
      tipo: "foglia"
    },
    {
      id: "bietola",
      nome: "Bietola da coste",
      arch: "rosetta",
      d: 30,
      dr: 40,
      h: "media",
      sole: "mezz",
      acqua: "media",
      gg: 60,
      mesi: [2, 3, 4, 5, 8, 9],
      amiche: ["cavolo", "cipolla"],
      nemiche: [],
      resa: 0.5,
      nota: "Generosa: si raccolgono le foglie esterne a mano a mano.",
      col: {
        l1: "#3a7e3a",
        l2: "#2a5d2a",
        fr: "#d8d4c0"
      },
      tipo: "foglia",
      notaBreve: "Generosa: raccogli le foglie esterne a mano a mano."
    },
    {
      id: "cavolo",
      nome: "Cavolo cappuccio",
      arch: "brassica",
      d: 50,
      dr: 70,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [2, 3, 6, 7],
      amiche: ["sedano", "aneto", "cipolla", "bietola"],
      nemiche: ["pomodoro", "fragola"],
      resa: 1.2,
      nota: "Vuole spazio e terreno ricco. Attento ai bruchi.",
      col: {
        l1: "#7fa37e",
        l2: "#5f8060",
        head: "#bcd6a0"
      },
      tipo: "foglia",
      notaBreve: "Vuole spazio e terreno ricco."
    },
    {
      id: "verza",
      nome: "Verza",
      arch: "brassica",
      d: 50,
      dr: 70,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [2, 3, 6, 7],
      amiche: ["sedano", "aneto", "cipolla"],
      nemiche: ["pomodoro", "fragola"],
      resa: 1.2,
      nota: "Resiste al gelo; più buona dopo le prime brinate.",
      col: {
        l1: "#5f8a5f",
        l2: "#456545",
        head: "#9cc07e"
      },
      tipo: "foglia"
    },
    {
      id: "broccolo",
      nome: "Broccolo",
      arch: "brassica",
      d: 50,
      dr: 70,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 85,
      mesi: [2, 3, 6, 7],
      amiche: ["sedano", "cipolla"],
      nemiche: ["pomodoro", "fragola"],
      resa: 0.6,
      nota: "Dopo la testa centrale dà tanti getti laterali.",
      col: {
        l1: "#6f9466",
        l2: "#4f704a",
        head: "#3c6e3a"
      },
      tipo: "foglia"
    },
    {
      id: "cavolfiore",
      nome: "Cavolfiore",
      arch: "brassica",
      d: 50,
      dr: 70,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 95,
      mesi: [2, 3, 6, 7],
      amiche: ["sedano", "aneto"],
      nemiche: ["pomodoro", "fragola"],
      resa: 0.8,
      nota: "Piega le foglie sulla testa per tenerla bianca.",
      col: {
        l1: "#7fa178",
        l2: "#5d7d58",
        head: "#eef0d8"
      },
      tipo: "foglia"
    },
    {
      id: "cavolonero",
      nome: "Cavolo nero",
      arch: "brassica",
      d: 45,
      dr: 60,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 80,
      mesi: [2, 3, 6, 7],
      amiche: ["cipolla", "bietola"],
      nemiche: ["pomodoro", "fragola"],
      resa: 0.5,
      nota: "Rustico toscano: si raccoglie a foglie per mesi.",
      col: {
        l1: "#2b4f33",
        l2: "#1d3a26",
        head: "#34563a"
      },
      tipo: "foglia"
    },
    {
      id: "cavolorapa",
      nome: "Cavolo rapa",
      arch: "brassica",
      d: 30,
      dr: 40,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 60,
      mesi: [2, 3, 8, 9],
      amiche: ["cipolla", "bietola"],
      nemiche: ["pomodoro", "fragola"],
      resa: 0.3,
      nota: "Si mangia il fusto ingrossato: raccogli da giovane.",
      col: {
        l1: "#7fa37e",
        l2: "#5f8060",
        head: "#b6cda0"
      },
      tipo: "foglia"
    },
    {
      id: "carota",
      nome: "Carota",
      arch: "piumosa",
      d: 8,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [2, 3, 4, 5, 6, 7, 8],
      amiche: ["cipolla", "porro", "lattuga", "ravanello", "pomodoro"],
      nemiche: ["aneto", "finocchio"],
      resa: 0.1,
      nota: "Semina fitta e dirada. Terreno sciolto, senza sassi.",
      col: {
        l1: "#5fae4a",
        l2: "#458035"
      },
      tipo: "radice"
    },
    {
      id: "finocchio",
      nome: "Finocchio",
      arch: "piumosa",
      d: 25,
      dr: 35,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [6, 7, 8],
      amiche: [],
      nemiche: [
        "pomodoro",
        "fagiolino",
        "fagiolo",
        "pisello",
        "cetriolo",
        "spinaci",
        "carota",
        "tomatillo",
        "physalis",
        "cucamelon"
      ],
      resa: 0.3,
      nota: 'È "antipatico" a molte piante: tienilo in disparte.',
      col: {
        l1: "#6db04a",
        l2: "#4f8235",
        fr: "#dfe6c0"
      },
      tipo: "aromatica",
      notaBreve: "Tienilo in disparte: non va d'accordo con molti."
    },
    {
      id: "prezzemolo",
      nome: "Prezzemolo",
      arch: "cespuglio",
      d: 20,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 75,
      mesi: [2, 3, 4, 5, 8, 9],
      amiche: ["pomodoro"],
      nemiche: [],
      resa: 0.05,
      nota: "Lento a partire; poi taglia di continuo per tutto l'anno.",
      col: {
        l1: "#3f8a3f",
        l2: "#2e6630"
      },
      tipo: "aromatica",
      notaBreve: "Lento a partire; poi taglia di continuo per mesi."
    },
    {
      id: "basilico",
      nome: "Basilico",
      arch: "cespuglio",
      d: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 60,
      mesi: [3, 4, 5, 6],
      amiche: ["pomodoro", "peperone", "peperoncino"],
      nemiche: [],
      resa: 0.05,
      nota: "Cima i fiori per avere foglie sempre tenere.",
      col: {
        l1: "#46a046",
        l2: "#347e34"
      },
      tipo: "aromatica"
    },

    // Archivio piante — gruppo 3 di 9.

    {
      id: "coriandolo",
      nome: "Coriandolo",
      arch: "cespuglio",
      d: 15,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 50,
      mesi: [3, 4, 5, 8, 9],
      amiche: [],
      nemiche: [],
      resa: 0.03,
      nota: "Va a fiore col caldo: semina scalare ogni 2 settimane.",
      col: {
        l1: "#5aa24a",
        l2: "#427e35"
      },
      tipo: "aromatica",
      notaBreve: "Va a fiore col caldo: semina ogni 2 settimane."
    },
    {
      id: "aneto",
      nome: "Aneto",
      arch: "piumosa",
      d: 25,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 70,
      mesi: [3, 4, 5, 8],
      amiche: ["cavolo", "cetriolo"],
      nemiche: ["carota"],
      resa: 0.05,
      nota: "Aiuta i cavoli e attira insetti utili.",
      col: {
        l1: "#6aa84a",
        l2: "#4d7e36"
      },
      tipo: "aromatica"
    },
    {
      id: "cipolla",
      nome: "Cipolla",
      arch: "bulbo",
      d: 12,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 120,
      mesi: [1, 2, 3, 9, 10],
      amiche: ["carota", "lattuga", "barbabietola", "pomodoro", "fragola"],
      nemiche: [
        "fagiolino",
        "fagiolo",
        "pisello",
        "fava",
        "soia_edamame",
        "cece",
        "lenticchia",
        "fagiolo_borlotto"
      ],
      resa: 0.15,
      nota: "Poca acqua a fine ciclo. Tiene lontani molti parassiti.",
      col: {
        l1: "#6f9e7a",
        l2: "#527e5d"
      },
      tipo: "radice",
      notaBreve: "Poca acqua a fine ciclo. Tiene lontani i parassiti."
    },
    {
      id: "aglio",
      nome: "Aglio",
      arch: "bulbo",
      d: 12,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 240,
      mesi: [10, 11, 12, 1],
      amiche: ["carota", "fragola", "pomodoro"],
      nemiche: [
        "fagiolino",
        "fagiolo",
        "pisello",
        "fava",
        "soia_edamame",
        "cece",
        "lenticchia",
        "fagiolo_borlotto"
      ],
      resa: 0.05,
      nota: "Si pianta a spicchi in autunno, si raccoglie in estate.",
      col: {
        l1: "#7aa884",
        l2: "#5c8866"
      },
      tipo: "radice"
    },
    {
      id: "porro",
      nome: "Porro",
      arch: "bulbo",
      d: 15,
      dr: 30,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 150,
      mesi: [2, 3, 4],
      amiche: ["carota"],
      nemiche: ["fagiolino", "fagiolo", "pisello"],
      resa: 0.2,
      nota: "Rincalza la terra attorno per avere il fusto bianco lungo.",
      col: {
        l1: "#6f9e84",
        l2: "#507a62"
      },
      tipo: "radice",
      notaBreve: "Rincalza la terra per avere il fusto bianco lungo."
    },
    {
      id: "scalogno",
      nome: "Scalogno",
      arch: "bulbo",
      d: 12,
      dr: 20,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 100,
      mesi: [1, 2, 9, 10],
      amiche: ["carota", "fragola"],
      nemiche: ["fagiolino", "fagiolo", "pisello"],
      resa: 0.1,
      nota: "Come la cipolla ma più delicato; ottimo per principianti.",
      col: {
        l1: "#74a37e",
        l2: "#557d60"
      },
      tipo: "radice"
    },
    {
      id: "fagiolino",
      nome: "Fagiolino nano",
      arch: "rampicante",
      d: 20,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 65,
      mesi: [4, 5, 6, 7],
      amiche: ["carota", "cetriolo", "lattuga", "zucchina", "cimbru"],
      nemiche: [
        "cipolla",
        "aglio",
        "porro",
        "scalogno",
        "leurda",
        "peperone",
        "finocchio"
      ],
      resa: 0.15,
      nota: "Non serve sostegno. Migliora il terreno con l'azoto.",
      col: {
        l1: "#4f9a3f",
        l2: "#3a7530"
      },
      tipo: "legume"
    },
    {
      id: "fagiolo",
      nome: "Fagiolo rampicante",
      arch: "rampicante",
      d: 25,
      dr: 50,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 75,
      mesi: [4, 5, 6],
      amiche: ["carota", "cetriolo", "zucchina", "cimbru"],
      nemiche: [
        "cipolla",
        "aglio",
        "porro",
        "scalogno",
        "leurda",
        "peperone",
        "finocchio"
      ],
      resa: 0.25,
      nota: "Vuole canne o rete: sale anche 2 metri.",
      col: {
        l1: "#4a943a",
        l2: "#36702c"
      },
      tipo: "legume"
    },
    {
      id: "pisello",
      nome: "Pisello",
      arch: "rampicante",
      d: 15,
      dr: 30,
      h: "media",
      sole: "mezz",
      acqua: "media",
      gg: 80,
      mesi: [10, 11, 1, 2],
      amiche: ["carota", "lattuga"],
      nemiche: ["cipolla", "aglio", "porro", "scalogno", "finocchio"],
      resa: 0.1,
      nota: "Ama il fresco: si semina in autunno o fine inverno.",
      col: {
        l1: "#5fa84a",
        l2: "#458035"
      },
      tipo: "legume"
    },
    {
      id: "fragola",
      nome: "Fragola",
      arch: "fragola",
      d: 30,
      dr: 40,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [3, 4, 8, 9],
      amiche: ["lattuga", "spinaci", "cipolla", "aglio"],
      nemiche: [
        "cavolo",
        "verza",
        "broccolo",
        "cavolfiore",
        "cavolonero",
        "cavolorapa",
        "pakchoi",
        "cavoletti"
      ],
      resa: 0.25,
      nota: "Perenne: produce per più anni e fa stoloni.",
      col: {
        l1: "#3f8a3f",
        l2: "#2e6630",
        fr: "#e23b3b",
        fl: "#fff"
      },
      tipo: "frutto"
    },
    {
      id: "sedano",
      nome: "Sedano",
      arch: "rosetta",
      d: 30,
      dr: 40,
      h: "media",
      sole: "mezz",
      acqua: "alta",
      gg: 120,
      mesi: [2, 3, 4],
      amiche: ["cavolo", "pomodoro"],
      nemiche: [],
      resa: 0.5,
      nota: "Vuole tanta acqua e terreno ricco.",
      col: {
        l1: "#6aa84a",
        l2: "#4d7e36",
        fr: "#cfe0a8"
      },
      tipo: "radice"
    },
    {
      id: "ravanello",
      nome: "Ravanello",
      arch: "rosetta",
      d: 8,
      dr: 15,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 28,
      mesi: [1, 2, 3, 4, 8, 9, 10],
      amiche: ["lattuga", "carota", "cetriolo"],
      nemiche: [],
      resa: 0.03,
      nota: "Il più veloce: pronto in 3-4 settimane. Ideale coi bimbi.",
      col: {
        l1: "#6fab46",
        l2: "#507f33",
        fr: "#d23a4a"
      },
      tipo: "radice",
      notaBreve: "Il più veloce: pronto in 3–4 settimane."
    },

    // Archivio piante — gruppo 4 di 9.

    {
      id: "barbabietola",
      nome: "Barbabietola",
      arch: "rosetta",
      d: 12,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 80,
      mesi: [3, 4, 5, 6, 7],
      amiche: ["cipolla", "lattuga"],
      nemiche: [],
      resa: 0.2,
      nota: "Si mangiano radice e foglie. Dirada le piantine.",
      col: {
        l1: "#6b4f6e",
        l2: "#4d3850",
        fr: "#8a3a6a"
      },
      tipo: "radice"
    },
    {
      id: "cicoria",
      nome: "Cicoria",
      arch: "frastagliata",
      d: 25,
      dr: 30,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 70,
      mesi: [2, 3, 4, 7, 8, 9],
      amiche: ["carota", "cipolla", "lattuga"],
      nemiche: [],
      resa: 0.25,
      nota: "Rustica e saporita. Raccogli le foglie esterne o il cespo giovane.",
      col: {
        l1: "#4f8f3a",
        l2: "#2f6f2f"
      },
      tipo: "foglia",
      notaBreve: "Rustica e saporita. Raccogli le foglie esterne."
    },
    {
      id: "indivia",
      nome: "Indivia / Scarola",
      arch: "rosetta",
      d: 30,
      dr: 40,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 75,
      mesi: [2, 3, 4, 7, 8, 9],
      amiche: ["lattuga", "ravanello", "finocchio"],
      nemiche: [],
      resa: 0.35,
      nota: "Ama il fresco. Lega il cespo se vuoi foglie interne più chiare.",
      col: {
        l1: "#9bc86b",
        l2: "#6fa84a",
        fr: "#f1e9b5"
      },
      tipo: "foglia",
      notaBreve: "Ama il fresco. Lega il cespo per foglie più chiare."
    },
    {
      id: "pakchoi",
      nome: "Pak choi",
      arch: "rosetta",
      d: 25,
      dr: 30,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 45,
      mesi: [2, 3, 4, 8, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: ["fragola"],
      resa: 0.25,
      nota: "Cresce veloce in clima fresco. Raccogli da baby leaf o a piccolo cespo.",
      col: {
        l1: "#72b34f",
        l2: "#3f823a",
        fr: "#eef0d8"
      },
      tipo: "foglia",
      notaBreve: "Cresce veloce in clima fresco."
    },
    {
      id: "cavoletti",
      nome: "Cavoletti di Bruxelles",
      arch: "brassica",
      d: 60,
      dr: 80,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 120,
      mesi: [3, 4, 5, 6],
      amiche: ["sedano", "cipolla", "timo"],
      nemiche: ["pomodoro", "fragola"],
      resa: 0.7,
      nota: "Vuole tempo e fresco: cima la punta quando i cavoletti iniziano a formarsi.",
      col: {
        l1: "#6f9466",
        l2: "#4f704a",
        head: "#7fb36a"
      },
      tipo: "foglia",
      notaBreve: "Vuole tempo e fresco: cima la punta a metà ciclo."
    },
    {
      id: "rapa",
      nome: "Rapa",
      arch: "rosetta",
      d: 12,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 55,
      mesi: [2, 3, 4, 8, 9, 10],
      amiche: ["pisello", "lattuga"],
      nemiche: [],
      resa: 0.15,
      nota: "Fresca e rapida: dirada presto per far ingrossare la radice.",
      col: {
        l1: "#6fab46",
        l2: "#507f33",
        fr: "#f2f0df"
      },
      tipo: "radice",
      notaBreve: "Fresca e rapida: dirada presto per ingrossare la radice."
    },
    {
      id: "valerianella",
      nome: "Valerianella",
      arch: "rosetta",
      d: 10,
      dr: 15,
      h: "bassa",
      sole: "mezz",
      acqua: "media",
      gg: 50,
      mesi: [1, 2, 9, 10, 11],
      amiche: ["lattuga", "ravanello", "cipolla"],
      nemiche: [],
      resa: 0.08,
      nota: "Perfetta per la serra fredda: forma piccoli ciuffi teneri in autunno e inverno.",
      col: {
        l1: "#6fb24f",
        l2: "#4b8a38"
      },
      tipo: "foglia",
      notaBreve: "Perfetta per la serra fredda: ciuffi teneri in inverno."
    },
    {
      id: "rosmarino",
      nome: "Rosmarino",
      arch: "erbafine",
      d: 60,
      dr: 80,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 0,
      mesi: [3, 4, 5],
      amiche: [],
      nemiche: [],
      resa: 0.1,
      nota: "Perenne e rustico: pochissima acqua, vive anni.",
      col: {
        l1: "#3f6e4a",
        l2: "#2c5037"
      },
      tipo: "aromatica"
    },
    {
      id: "timo",
      nome: "Timo",
      arch: "erbafine",
      d: 30,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 0,
      mesi: [3, 4, 5],
      amiche: ["cavolo"],
      nemiche: [],
      resa: 0.05,
      nota: "Tappezzante e profumato; ama il secco.",
      col: {
        l1: "#5a7e4a",
        l2: "#446035"
      },
      tipo: "aromatica"
    },
    {
      id: "origano",
      nome: "Origano",
      arch: "erbafine",
      d: 30,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 0,
      mesi: [3, 4, 5],
      amiche: [],
      nemiche: [],
      resa: 0.05,
      nota: "Perenne: si secca benissimo per l'inverno.",
      col: {
        l1: "#5e8a4f",
        l2: "#476838"
      },
      tipo: "aromatica"
    },
    {
      id: "salvia",
      nome: "Salvia",
      arch: "cespuglio",
      d: 40,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 0,
      mesi: [3, 4, 5],
      amiche: ["cavolo"],
      nemiche: ["cetriolo"],
      resa: 0.05,
      nota: "Cespuglio perenne dalle foglie vellutate.",
      col: {
        l1: "#7e9a78",
        l2: "#5e7a5a"
      },
      tipo: "aromatica"
    },
    {
      id: "pastinaca",
      nome: "Pastinaca",
      arch: "piumosa",
      d: 35,
      dr: 45,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 120,
      mesi: [3, 4, 8, 9],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 1,
      nota: "Dolce dopo il freddo; semina diretta e terreno profondo.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },

    // Archivio piante — gruppo 5 di 9.

    {
      id: "radice_prezemolo",
      nome: "Prezzemolo da radice",
      arch: "piumosa",
      d: 30,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [3, 4, 8],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.7,
      nota: "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "sedano_rapa",
      nome: "Sedano rapa",
      arch: "piumosa",
      d: 35,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "alta",
      gg: 120,
      mesi: [2, 3, 4, 5],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 1.2,
      nota: "Radice globosa e profumata; vuole acqua costante e suolo ricco.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "rafano",
      nome: "Rafano",
      arch: "rosetta",
      d: 45,
      dr: 60,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 180,
      mesi: [3, 4, 9, 10],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.8,
      nota: "Radice piccante molto usata in Romania; contenila perché è vigorosa.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "patata",
      nome: "Patata",
      arch: "cespuglio",
      d: 35,
      dr: 60,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [3, 4, 5],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 1.8,
      nota: "In serra anticipa il raccolto; rincalza quando gli steli crescono.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "patata_dolce",
      nome: "Patata dolce",
      arch: "rampicante",
      d: 45,
      dr: 90,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 120,
      mesi: [4, 5, 6],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 1.5,
      nota: "Ama caldo stabile e suolo leggero; ideale in serra lunga.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "cipolla_rossa",
      nome: "Cipolla rossa",
      arch: "bulbo",
      d: 15,
      dr: 30,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 120,
      mesi: [2, 3, 8, 9, 10],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.25,
      nota: "Bulbo dolce e colorato; ottima per raccolti scalari.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "cipollotto",
      nome: "Cipollotto",
      arch: "bulbo",
      d: 8,
      dr: 20,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 60,
      mesi: [2, 3, 4, 5, 8, 9],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.08,
      nota: "Pronto rapidamente; raccogli giovane prima che ingrossi troppo.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "erba_cipollina",
      nome: "Erba cipollina",
      arch: "erbafine",
      d: 20,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 75,
      mesi: [3, 4, 5, 8, 9],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.05,
      nota: "Aromatica perenne; taglia spesso per foglie tenere.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "loboda",
      nome: "Loboda",
      arch: "rosetta",
      d: 25,
      dr: 35,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 45,
      mesi: [3, 4, 5, 8, 9],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.25,
      nota: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "stevia_dolce",
      nome: "Stevia rumena",
      arch: "rosetta",
      d: 30,
      dr: 40,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 50,
      mesi: [3, 4, 8, 9],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.3,
      nota: "Acetosa per minestre primaverili; raccogli foglie giovani.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "leustean",
      nome: "Levistico",
      arch: "cespuglio",
      d: 45,
      dr: 70,
      h: "alta",
      sole: "mezzombra",
      acqua: "media",
      gg: 90,
      mesi: [3, 4, 5, 9],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.15,
      nota: "Il profumo classico delle ciorbe rumene; perenne e vigoroso.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "dragoncello",
      nome: "Dragoncello",
      arch: "erbafine",
      d: 30,
      dr: 45,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 90,
      mesi: [3, 4, 5],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.08,
      nota: "Aromatica fine per aceti e conserve; evita ristagni.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },

    // Archivio piante — gruppo 6 di 9.

    {
      id: "menta",
      nome: "Menta",
      arch: "erbafine",
      d: 30,
      dr: 50,
      h: "media",
      sole: "mezzombra",
      acqua: "alta",
      gg: 60,
      mesi: [3, 4, 5, 8],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.1,
      nota: "Molto vigorosa: meglio in vaso o area controllata.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "maggiorana",
      nome: "Maggiorana",
      arch: "erbafine",
      d: 25,
      dr: 35,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 75,
      mesi: [3, 4, 5],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.05,
      nota: "Aromatica delicata; ama caldo, luce e terreno drenato.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "camomilla",
      nome: "Camomilla",
      arch: "erbafine",
      d: 25,
      dr: 35,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 70,
      mesi: [3, 4, 9],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.04,
      nota: "Fiori per tisane; attira insetti utili e profuma la serra.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "mais_dolce",
      nome: "Mais dolce",
      arch: "frutto",
      d: 30,
      dr: 70,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [4, 5, 6],
      amiche: ["basilico", "cipolla", "prezzemolo"],
      nemiche: [],
      resa: 1,
      nota: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi.",
      col: {
        l1: "#3f7a3a",
        l2: "#2f5e2c",
        fr: "#e07a2f"
      },
      tipo: "frutto"
    },
    {
      id: "tomatillo",
      nome: "Tomatillo",
      arch: "frutto",
      d: 50,
      dr: 80,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 95,
      mesi: [3, 4, 5],
      amiche: ["basilico", "cipolla", "prezzemolo"],
      nemiche: ["finocchio"],
      resa: 1.5,
      nota: "Serve almeno due piante per fruttificare bene; ottimo per salse.",
      col: {
        l1: "#3f7a3a",
        l2: "#2f5e2c",
        fr: "#e07a2f"
      },
      tipo: "frutto"
    },
    {
      id: "physalis",
      nome: "Alchechengi",
      arch: "frutto",
      d: 45,
      dr: 70,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [3, 4, 5],
      amiche: ["basilico", "cipolla", "prezzemolo"],
      nemiche: ["finocchio"],
      resa: 0.5,
      nota: "Frutti dolci in lanterna; in serra matura meglio.",
      col: {
        l1: "#3f7a3a",
        l2: "#2f5e2c",
        fr: "#e07a2f"
      },
      tipo: "frutto"
    },
    {
      id: "cucamelon",
      nome: "Cucamelon",
      arch: "rampicante",
      d: 30,
      dr: 60,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 75,
      mesi: [4, 5, 6],
      amiche: ["basilico", "cipolla", "prezzemolo"],
      nemiche: ["finocchio"],
      resa: 0.5,
      nota: "Piccoli frutti croccanti; produttivo su rete in serra.",
      col: {
        l1: "#3f7a3a",
        l2: "#2f5e2c",
        fr: "#e07a2f"
      },
      tipo: "frutto"
    },
    {
      id: "asparago",
      nome: "Asparago",
      arch: "piumosa",
      d: 40,
      dr: 80,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 730,
      mesi: [3, 4],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.5,
      nota: "Perenne: richiede pazienza, ma produce per molti anni.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "carciofo",
      nome: "Carciofo",
      arch: "cespuglio",
      d: 80,
      dr: 100,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 180,
      mesi: [2, 3, 4],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 1.2,
      nota: "Coltura grande e decorativa; proteggi dal gelo intenso.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "cardo",
      nome: "Cardo",
      arch: "rosetta",
      d: 60,
      dr: 90,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 150,
      mesi: [3, 4, 5],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 1,
      nota: "Parente del carciofo; imbianchisci le coste prima del raccolto.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "crescione",
      nome: "Crescione",
      arch: "rosetta",
      d: 15,
      dr: 20,
      h: "bassa",
      sole: "mezzombra",
      acqua: "alta",
      gg: 30,
      mesi: [3, 4, 5, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.1,
      nota: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "mizuna",
      nome: "Mizuna",
      arch: "frastagliata",
      d: 20,
      dr: 30,
      h: "bassa",
      sole: "mezzombra",
      acqua: "media",
      gg: 35,
      mesi: [3, 4, 5, 8, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.18,
      nota: "Senape giapponese facile; foglie frastagliate per mix insalata.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },

    // Archivio piante — gruppo 7 di 9.

    {
      id: "senape_foglia",
      nome: "Senape da foglia",
      arch: "frastagliata",
      d: 25,
      dr: 35,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 40,
      mesi: [3, 4, 8, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.25,
      nota: "Foglie piccanti; semina in fresco per evitare fioritura precoce.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "tatsoi",
      nome: "Tatsoi",
      arch: "rosetta",
      d: 20,
      dr: 30,
      h: "bassa",
      sole: "mezzombra",
      acqua: "media",
      gg: 45,
      mesi: [3, 4, 8, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.2,
      nota: "Rosetta compatta, molto resistente al freddo.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "cavolo_cinese",
      nome: "Cavolo cinese",
      arch: "brassica",
      d: 35,
      dr: 50,
      h: "media",
      sole: "mezzombra",
      acqua: "alta",
      gg: 65,
      mesi: [3, 4, 8, 9],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.9,
      nota: "Forma un cespo tenero; proteggi da caldo e stress idrico.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "daikon",
      nome: "Daikon",
      arch: "rosetta",
      d: 25,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 60,
      mesi: [3, 4, 8, 9, 10],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.5,
      nota: "Ravanello lungo: terreno profondo e raccolta prima che lignifichi.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "scorzonera",
      nome: "Scorzonera",
      arch: "rosetta",
      d: 25,
      dr: 35,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 150,
      mesi: [3, 4],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 0.5,
      nota: "Radice nera lunga; richiede suolo leggero e profondo.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "topinambur",
      nome: "Topinambur",
      arch: "cespuglio",
      d: 50,
      dr: 90,
      h: "alta",
      sole: "pieno",
      acqua: "bassa",
      gg: 180,
      mesi: [3, 4, 5],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 2,
      nota: "Tubero rustico e produttivo; delimita lo spazio perché si espande.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "fava",
      nome: "Fava",
      arch: "cespuglio",
      d: 30,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [2, 3, 10, 11],
      amiche: ["carota", "cetriolo", "mais_dolce"],
      nemiche: ["cipolla", "aglio"],
      resa: 0.7,
      nota: "Legume precoce e resistente al fresco; migliora il terreno.",
      col: {
        l1: "#4f8a45",
        l2: "#2f6b3a",
        fl: "#f1d27a"
      },
      tipo: "legume"
    },
    {
      id: "soia_edamame",
      nome: "Soia edamame",
      arch: "cespuglio",
      d: 30,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 90,
      mesi: [4, 5, 6],
      amiche: ["carota", "cetriolo", "mais_dolce"],
      nemiche: ["cipolla", "aglio"],
      resa: 0.6,
      nota: "Raccogli i baccelli verdi quando i semi sono pieni ma teneri.",
      col: {
        l1: "#4f8a45",
        l2: "#2f6b3a",
        fl: "#f1d27a"
      },
      tipo: "legume"
    },
    {
      id: "cece",
      nome: "Cece",
      arch: "cespuglio",
      d: 25,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 100,
      mesi: [3, 4, 5],
      amiche: ["carota", "cetriolo", "mais_dolce"],
      nemiche: ["cipolla", "aglio"],
      resa: 0.35,
      nota: "Ama asciutto e caldo; non eccedere con acqua in serra.",
      col: {
        l1: "#4f8a45",
        l2: "#2f6b3a",
        fl: "#f1d27a"
      },
      tipo: "legume"
    },
    {
      id: "lenticchia",
      nome: "Lenticchia",
      arch: "cespuglio",
      d: 20,
      dr: 35,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 95,
      mesi: [3, 4],
      amiche: ["carota", "cetriolo", "mais_dolce"],
      nemiche: ["cipolla", "aglio"],
      resa: 0.25,
      nota: "Piccolo legume rustico; adatto a bordure asciutte.",
      col: {
        l1: "#4f8a45",
        l2: "#2f6b3a",
        fl: "#f1d27a"
      },
      tipo: "legume"
    },
    {
      id: "fagiolo_borlotto",
      nome: "Fagiolo borlotto",
      arch: "rampicante",
      d: 30,
      dr: 60,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 95,
      mesi: [4, 5, 6],
      amiche: ["carota", "cetriolo", "mais_dolce"],
      nemiche: ["cipolla", "aglio"],
      resa: 0.8,
      nota: "Per baccelli freschi o granella; usa tutori robusti.",
      col: {
        l1: "#4f8a45",
        l2: "#2f6b3a",
        fl: "#f1d27a"
      },
      tipo: "legume"
    },
    {
      id: "cavolo_rosso",
      nome: "Cavolo rosso",
      arch: "brassica",
      d: 45,
      dr: 60,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 110,
      mesi: [2, 3, 4, 7, 8],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 1.5,
      nota: "Cespo compatto e colorato; ottimo per raccolti autunnali.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },

    // Archivio piante — gruppo 8 di 9.

    {
      id: "cavolo_navone",
      nome: "Navone",
      arch: "brassica",
      d: 35,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 100,
      mesi: [3, 4, 7, 8],
      amiche: ["lattuga", "cipolla", "pisello"],
      nemiche: [],
      resa: 1,
      nota: "Radice grande e rustica; utile per autunno e inverno.",
      col: {
        l1: "#5f8b46",
        l2: "#3f6533",
        fr: "#c98242"
      },
      tipo: "radice"
    },
    {
      id: "broccolo_rapa",
      nome: "Cime di rapa",
      arch: "frastagliata",
      d: 25,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 55,
      mesi: [3, 4, 8, 9, 10],
      amiche: ["carota", "cipolla", "ravanello"],
      nemiche: [],
      resa: 0.35,
      nota: "Raccogli cime e foglie prima della piena fioritura.",
      col: {
        l1: "#4f8a45",
        l2: "#376b34"
      },
      tipo: "foglia"
    },
    {
      id: "shiso",
      nome: "Shiso",
      arch: "cespuglio",
      d: 30,
      dr: 45,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 70,
      mesi: [3, 4, 5],
      amiche: ["pomodoro", "cavolo", "carota"],
      nemiche: [],
      resa: 0.08,
      nota: "Aromatica asiatica profumata; bella anche in vaso in serra.",
      col: {
        l1: "#5a8a4f",
        l2: "#416b39"
      },
      tipo: "aromatica"
    },
    {
      id: "broccolo_romanesco",
      nome: "Broccolo romanesco",
      arch: "foglia",
      d: 50,
      dr: 60,
      h: "alta",
      sole: "pieno",
      acqua: "media",
      gg: 75,
      mesi: [2, 3, 7, 8],
      amiche: ["carota", "cipolla", "sedano", "lattuga"],
      nemiche: ["pomodoro", "peperone"],
      resa: 0.6,
      nota: "Varietà ornamentale di broccolo con testa a spirale. Sapore delicato.",
      col: { l1: "#7a9a6a", l2: "#5c7a4a" },
      tipo: "foglia"
    },
    {
      id: "friggitello",
      nome: "Friggitello",
      arch: "frutto",
      d: 40,
      dr: 50,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 70,
      mesi: [2, 3, 4],
      amiche: ["basilico", "carota", "cipolla"],
      nemiche: ["finocchio"],
      resa: 0.8,
      nota: "Peperone dolce allungato tipico dell'Italia meridionale. Ottimo fritto.",
      col: { l1: "#4a8a3a", l2: "#366a28", fr: "#a8c850" },
      tipo: "frutto"
    },
    {
      id: "agretti",
      nome: "Agretti",
      arch: "cespuglio",
      d: 15,
      dr: 25,
      h: "bassa",
      sole: "pieno",
      acqua: "media",
      gg: 45,
      mesi: [2, 3, 4],
      amiche: ["lattuga", "spinaci", "ravanello"],
      nemiche: [],
      resa: 0.15,
      nota: "Ortaggio primaverile tipico italiano. Si consuma lessato con olio.",
      col: { l1: "#4a7a3a", l2: "#366028" },
      tipo: "foglia"
    },
    {
      id: "borragine",
      nome: "Borragine",
      arch: "cespuglio",
      d: 30,
      dr: 40,
      h: "media",
      sole: "pieno",
      acqua: "bassa",
      gg: 55,
      mesi: [3, 4, 5, 9],
      amiche: ["pomodoro", "zucchina", "fragola"],
      nemiche: [],
      resa: 0.1,
      nota: "Fiori e foglie commestibili. Attira api e insetti utili. Ottima pianta companion.",
      col: { l1: "#4a7a54", l2: "#345a3c" },
      tipo: "aromatica"
    },
    {
      id: "catalogna",
      nome: "Catalogna",
      arch: "rosetta",
      d: 25,
      dr: 35,
      h: "media",
      sole: "pieno",
      acqua: "media",
      gg: 60,
      mesi: [7, 8, 9],
      amiche: ["carota", "lattuga", "cipolla"],
      nemiche: [],
      resa: 0.35,
      nota: "Cicoria tipica romana. Le puntarelle (germogli centrali) si mangiano crude con acciughe.",
      col: { l1: "#6a8a5a", l2: "#4e6842" },
      tipo: "foglia"
    },
    {
      id: "acetosa",
      nome: "Acetosa",
      arch: "rosetta",
      d: 30,
      dr: 40,
      h: "bassa",
      sole: "mezzombra",
      acqua: "media",
      gg: 55,
      mesi: [2, 3, 9],
      amiche: ["fragola", "cipolla", "erba_cipollina"],
      nemiche: [],
      resa: 0.2,
      nota: "Foglie acidule usate in zuppe primaverili (borș cu macriș). Perenne.",
      col: { l1: "#5a8a4a", l2: "#426636" },
      tipo: "foglia"
    },
    {
      id: "leurda",
      nome: "Leurda",
      arch: "cespuglio",
      d: 20,
      dr: 25,
      h: "bassa",
      sole: "mezzombra",
      acqua: "media",
      gg: 60,
      mesi: [8, 9, 10],
      amiche: ["carota", "barbabietola", "fragola"],
      nemiche: ["fagiolino", "fagiolo"],
      resa: 0.15,
      nota: "Aglio selvatico con foglie commestibili. Tipico della cucina primaverile rumena.",
      col: { l1: "#4a8040", l2: "#346030" },
      tipo: "aromatica"
    },
    {
      id: "melissa",
      nome: "Melissa",
      arch: "cespuglio",
      d: 40,
      dr: 50,
      h: "media",
      sole: "mezzombra",
      acqua: "media",
      gg: 60,
      mesi: [3, 4, 5],
      amiche: ["pomodoro", "zucchina", "cetriolo"],
      nemiche: [],
      resa: 0.15,
      nota: "Aromatica perenne al profumo di limone. Ottima per tisane e in cucina.",
      col: { l1: "#7a9a5a", l2: "#5c7842" },
      tipo: "aromatica"
    },
    {
      id: "cerfoglio",
      nome: "Cerfoglio",
      arch: "frastagliata",
      d: 15,
      dr: 20,
      h: "bassa",
      sole: "mezzombra",
      acqua: "media",
      gg: 40,
      mesi: [2, 3, 8, 9],
      amiche: ["carota", "ravanello", "lattuga"],
      nemiche: [],
      resa: 0.1,
      nota: "Aromatica delicata dal sapore erbaceo-aniceto. Si usa fresca, mai cotta.",
      col: { l1: "#6a9a5a", l2: "#4e7642" },
      tipo: "aromatica"
    },

    // Archivio piante — gruppo 9 di 9.

    {
      id: "cimbru",
      nome: "Cimbru",
      arch: "cespuglio",
      d: 25,
      dr: 30,
      h: "bassa",
      sole: "pieno",
      acqua: "bassa",
      gg: 65,
      mesi: [3, 4, 5],
      amiche: ["fagiolino", "fagiolo", "cipolla", "carota"],
      nemiche: [],
      resa: 0.1,
      nota: "L'erba aromatica più usata in Romania: indispensabile per fagioli, sottaceti e sarmale.",
      col: { l1: "#6a9050", l2: "#4e6e3c" },
      tipo: "aromatica"
    }
  ];

  // Guide alla semina
  const SOWING_GUIDE = {
    pomodoro: {
      method:
        "Semina in vasetto o alveolo al caldo; trapianta in serra una piantina robusta con 4-6 foglie vere.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 80 cm tra le file.",
      tip: "Interra leggermente il fusto fino alle foglie e prepara subito un tutore o filo verticale.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    peperone: {
      method:
        "Semina protetta in alveolo; meglio trapiantare piante già formate quando le notti sono miti.",
      depth: "0,5 cm",
      thin: "40 cm sulla fila, 60 cm tra le file.",
      tip: "Germina lentamente: serve caldo costante (20-25 °C) e terreno mai zuppo.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    peperoncino: {
      method:
        "Semina protetta in alveolo con molto calore iniziale (25-28 °C).",
      depth: "0,5 cm",
      thin: "35 cm sulla fila, 50 cm tra le file.",
      tip: "Lascia asciugare leggermente tra un'annaffiatura e l'altra: radica meglio.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    melanzana: {
      method:
        "Semina in semenzaio caldo; in serra è più pratico trapiantare piantine acquistate.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 80 cm tra le file.",
      tip: "Ama il substrato caldo: evita trapianti anticipati in terra ancora fredda.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    zucchina: {
      method:
        "Semina diretta a postarella (2 semi per buca) o in vasetto da trapiantare con pane di terra integro.",
      depth: "2–3 cm",
      thin: "80 cm sulla fila, 100 cm tra le file. Tieni la piantina più vigorosa.",
      tip: "Cresce rapidissima: copri il suolo con pacciame e raccogli i frutti ogni 2-3 giorni.",
      periodo: "Aprile, Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    zucca: {
      method:
        "Semina diretta a postarella o in vaso grande; trapianto delicato con pane integro.",
      depth: "2–3 cm",
      thin: "100 cm sulla fila, 130 cm tra le file.",
      tip: "Dalle spazio fin dall'inizio: soffre se compressa. Orienta i tralci verso l'esterno.",
      periodo: "Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    cetriolo: {
      method:
        "Semina diretta o in vasetto; in serra rende benissimo su rete verticale.",
      depth: "1,5–2 cm",
      thin: "40 cm sulla fila, 100 cm tra le file o i sostegni.",
      tip: "Trapianta senza rompere le radici e lega presto i tralci alla rete.",
      periodo: "Aprile, Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    melone: {
      method:
        "Semina a postarella o in vasetto caldo; trapianta con pane integro quando le notti superano i 15 °C.",
      depth: "2 cm",
      thin: "90 cm sulla fila, 120 cm tra le file.",
      tip: "Pacciama e bagna al piede; riduci l'acqua quando i frutti iniziano a maturare.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    anguria: {
      method:
        "Semina a postarella o in vaso grande solo con terreno ben caldo (min. 22 °C).",
      depth: "2–3 cm",
      thin: "120 cm sulla fila, 150 cm tra le file.",
      tip: "In serra piccola usa 1-2 piante al massimo: ogni esemplare occupa molto volume.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    lattuga: {
      method:
        "Semina in alveolo o a spaglio leggero; il trapianto produce cespi più ordinati e uniformi.",
      depth: "0,3–0,5 cm",
      thin: "25 cm sulla fila, 30 cm tra le file.",
      tip: "Semina poco e spesso (ogni 2-3 settimane) per raccolte scalari senza interruzioni.",
      periodo: "Febbraio, Marzo, Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    radicchio: {
      method: "Semina in alveolo o semenzaio, poi trapianto.",
      depth: "0,5 cm",
      thin: "30 cm sulla fila, 35 cm tra le file.",
      tip: "Per cespi compatti evita l'eccesso di azoto e il caldo intenso; il freddo intensifica il colore.",
      periodo: "Luglio, Agosto, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    rucola: {
      method: "Semina diretta a file o a spaglio fitto; non ama il trapianto.",
      depth: "0,5 cm",
      thin: "15 cm sulla fila, 20 cm tra le file (più fitta per baby leaf).",
      tip: "Taglia a 5 cm dal suolo per far ricrescere; con il caldo monta a seme in pochi giorni.",
      periodo: "Marzo, Aprile, Maggio, Giugno, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–20 °C",
      giorniGerm: "4–8 giorni"
    },
    spinaci: {
      method: "Semina diretta a file nel letto ben preparato e fine.",
      depth: "1–2 cm",
      thin: "20 cm sulla fila, 25 cm tra le file.",
      tip: "Ama il fresco e l'umidità costante; col caldo supera i 15 °C monta a seme rapidamente.",
      periodo: "Febbraio, Marzo, Aprile, Ottobre, Novembre, Dicembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "7–14 giorni"
    },
    bietola: {
      method:
        "Semina diretta o in alveolo; ogni seme è un glomerulo che può produrre 2-4 piantine.",
      depth: "1–2 cm",
      thin: "30 cm sulla fila, 40 cm tra le file (dirada presto).",
      tip: "Raccogli le foglie esterne senza tagliare il cuore centrale per prolungare la produzione.",
      periodo: "Marzo, Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolo: {
      method: "Semina in semenzaio o alveolo, poi trapianta piantine robuste.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 70 cm tra le file.",
      tip: "Interra bene il colletto e mantieni umidità regolare; proteggi dai lepidotteri con rete.",
      periodo: "Marzo, Aprile, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    verza: {
      method: "Semina in semenzaio o alveolo; trapianta piantine robuste.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 70 cm tra le file.",
      tip: "Resiste bene al freddo: programma raccolte autunnali/invernali; il gelo ne migliora il sapore.",
      periodo: "Marzo, Aprile, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    broccolo: {
      method: "Semina in alveolo o semenzaio; poi trapianto.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 70 cm tra le file.",
      tip: "Non far asciugare durante la formazione del corimbo; dopo il taglio dà getti laterali per settimane.",
      periodo: "Marzo, Aprile, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolfiore: {
      method: "Semina in alveolo; trapianta senza stress idrico.",
      depth: "0,5–1 cm",
      thin: "50 cm sulla fila, 70 cm tra le file.",
      tip: "Richiede crescita continua: evita sbalzi di acqua e nutrienti; copri la testa per mantenerla bianca.",
      periodo: "Marzo, Aprile, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolonero: {
      method: "Semina in alveolo o semenzaio, poi trapianto.",
      depth: "0,5–1 cm",
      thin: "45 cm sulla fila, 60 cm tra le file.",
      tip: "Raccogli foglia per foglia dal basso: la pianta continua a produrre per mesi durante l'inverno.",
      periodo: "Marzo, Aprile, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolorapa: {
      method: "Semina diretta o in alveolo; poi trapianto precoce.",
      depth: "0,5–1 cm",
      thin: "30 cm sulla fila, 40 cm tra le file.",
      tip: "Raccogli giovane (5-7 cm di diametro): se resta troppo a lungo si indurisce e diventa legnoso.",
      periodo: "Marzo, Aprile, Settembre, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    carota: {
      method:
        "Semina diretta a file nel terreno fine e profondo (almeno 30 cm); non tollera il trapianto.",
      depth: "0,5–1 cm",
      thin: "Dirada progressivamente fino a 8 cm sulla fila, 25 cm tra le file.",
      tip: "Tieni il letto umido fino alla germinazione (10-20 giorni); sassi nel suolo causano radici biforcute.",
      periodo: "Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–20 °C",
      giorniGerm: "14–21 giorni"
    },
    finocchio: {
      method: "Semina in alveolo o diretta; trapianto delicato da giovane.",
      depth: "1 cm",
      thin: "25 cm sulla fila, 35 cm tra le file.",
      tip: "Rincalza leggermente la base per imbianchire il grumolo; evita stress idrici che causano fioritura precoce.",
      periodo: "Luglio, Agosto, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    prezzemolo: {
      method:
        "Semina diretta o in vasetto; ammollo 24h dei semi in acqua tiepida accelera la germinazione.",
      depth: "0,5 cm",
      thin: "20 cm sulla fila; raccogli a taglio lasciando ricrescere.",
      tip: "Germina molto lentamente (15-28 giorni): non lasciare seccare il letto di semina in questo periodo.",
      periodo: "Marzo, Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "15–28 giorni"
    },
    basilico: {
      method:
        "Semina in vasetto/alveolo o diretta solo con temperature stabili oltre i 18 °C.",
      depth: "0,3–0,5 cm",
      thin: "25 cm tra le piante.",
      tip: "Cima i fiori non appena appaiono per ottenere foglie più grandi e prolungare la produzione.",
      periodo: "Aprile, Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "5–10 giorni"
    },
    coriandolo: {
      method:
        "Semina diretta a file; il trapianto lo fa andare a fiore prematuramente.",
      depth: "1 cm",
      thin: "15 cm sulla fila (più fitto per foglie young, più rado per semi).",
      tip: "Esegui semine scalari ogni 3 settimane: col caldo monta rapidamente. Usa sia foglie che semi.",
      periodo: "Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "10–15 giorni"
    },
    aneto: {
      method: "Semina diretta a file; non ama il trapianto.",
      depth: "0,5–1 cm",
      thin: "25 cm tra le piante.",
      tip: "Lascia qualche pianta fiorire: i fiori attirano insetti impollinatori e utili come la Syrphidae.",
      periodo: "Aprile, Maggio, Giugno, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "10–20 giorni"
    },
    cipolla: {
      method:
        "Semina in semenzaio (trapianto a matita) o pianta bulbilli direttamente in file.",
      depth: "0,5–1 cm (seme); 3 cm (bulbillo)",
      thin: "12 cm sulla fila, 25 cm tra le file.",
      tip: "Non interrare troppo il bulbo: deve ingrossare vicino alla superficie. Riduci l'acqua dopo la piegatura.",
      periodo: "Febbraio, Marzo, Aprile, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "12–20 °C",
      giorniGerm: "10–18 giorni"
    },
    aglio: {
      method:
        "Pianta spicchi sani con la punta verso l'alto, preferibilmente in autunno.",
      depth: "3–5 cm",
      thin: "12 cm sulla fila, 25 cm tra le file.",
      tip: "Usa gli spicchi esterni più grandi delle teste migliori: danno bulbi più grossi. Asporta gli scapi.",
      periodo: "Novembre, Dicembre, , Febbraio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "8–15 °C",
      giorniGerm: "—"
    },
    porro: {
      method:
        "Semina in semenzaio; trapianta quando ha lo spessore di una matita (6-8 mm).",
      depth: "0,5–1 cm",
      thin: "15 cm sulla fila, 30 cm tra le file.",
      tip: "Trapianta in buche profonde e rincalza progressivamente per ottenere fusti bianchi e lunghi.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "12–20 °C",
      giorniGerm: "10–18 giorni"
    },
    scalogno: {
      method: "Pianta bulbilli o semina in semenzaio.",
      depth: "2–3 cm con punta appena coperta",
      thin: "12 cm sulla fila, 20 cm tra le file.",
      tip: "Evita ristagni idrici: i bulbi marciscono in terreno troppo bagnato. Conserva in luogo asciutto.",
      periodo: "Febbraio, Marzo, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "12–20 °C",
      giorniGerm: "10–18 giorni"
    },
    fagiolino: {
      method: "Semina diretta a file quando il terreno supera i 15 °C.",
      depth: "2–3 cm",
      thin: "20 cm sulla fila, 40 cm tra le file.",
      tip: "Come leguminosa fissa l'azoto nel suolo: non concimare troppo o produce foglie a scapito dei baccelli.",
      periodo: "Maggio, Giugno, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    fagiolo: {
      method: "Semina diretta alla base di canne o rete già montata.",
      depth: "2–4 cm",
      thin: "25 cm sulla fila, 50 cm tra i sostegni.",
      tip: "Monta la struttura prima di seminare per non disturbare le radici. Sale fino a 2-3 metri.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    pisello: {
      method: "Semina diretta a file doppie o vicino a una rete bassa.",
      depth: "3–5 cm",
      thin: "15 cm sulla fila, 30 cm tra le file.",
      tip: "Ama il fresco (10-18 °C): in serra semina in autunno o fine inverno; il caldo estivo lo uccide.",
      periodo: "Novembre, Dicembre, Febbraio, Marzo",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "8–15 °C",
      giorniGerm: "7–14 giorni"
    },
    fragola: {
      method:
        "Meglio trapiantare piantine certificate o stoloni radicati; da seme è lento e variabile.",
      depth: "Colletto a livello del terreno",
      thin: "30 cm sulla fila, 40 cm tra le file.",
      tip: "Non coprire mai il cuore della pianta; pacciama con paglia per frutti puliti e contenere l'umidità.",
      periodo: "Aprile, Maggio, Settembre, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "—",
      giorniGerm: "—"
    },
    sedano: {
      method:
        "Semina in alveolo; i semi sono finissimi e vanno coperti pochissimo o lasciati alla luce.",
      depth: "0,2–0,3 cm",
      thin: "30 cm sulla fila, 40 cm tra le file.",
      tip: "Richiede acqua costante: anche una breve siccità lo rende fibroso e amaro.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "18–22 °C",
      giorniGerm: "14–21 giorni"
    },
    ravanello: {
      method: "Semina diretta a file, in modo scalare ogni 7-10 giorni.",
      depth: "0,5–1 cm",
      thin: "8 cm sulla fila, 15 cm tra le file.",
      tip: "Se resta troppo fitto produce foglie rigogliose ma radici piccole. Pronto in soli 3-4 settimane!",
      periodo: "Febbraio, Marzo, Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "3–6 giorni"
    },
    barbabietola: {
      method:
        "Semina diretta; ogni seme è un glomerulo che può generare 2-4 piantine da diradare.",
      depth: "1–2 cm",
      thin: "12 cm sulla fila, 25 cm tra le file.",
      tip: "Usa i diradamenti giovani come foglie da insalata: sono teneri e saporiti.",
      periodo: "Aprile, Maggio, Giugno, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    cicoria: {
      method: "Semina diretta o in alveolo, poi trapianto.",
      depth: "0,5–1 cm",
      thin: "25 cm sulla fila, 30 cm tra le file.",
      tip: "Raccogli a cespo giovane o taglia le foglie esterne; il sapore amaro si attenua col freddo.",
      periodo: "Marzo, Aprile, Maggio, Agosto, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    indivia: {
      method: "Semina in alveolo o semenzaio, poi trapianto.",
      depth: "0,5 cm",
      thin: "30 cm sulla fila, 40 cm tra le file.",
      tip: "Per foglie più chiare e tenere lega il cespo (asciutto) 7-10 giorni prima del raccolto.",
      periodo: "Marzo, Aprile, Maggio, Agosto, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    pakchoi: {
      method: "Semina diretta o in alveolo; cresce molto veloce.",
      depth: "0,5–1 cm",
      thin: "25 cm sulla fila, 30 cm tra le file.",
      tip: "Semina in clima fresco (max 22 °C): con caldo o stress idrico monta a fiore in pochissimo tempo.",
      periodo: "Marzo, Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavoletti: {
      method: "Semina in semenzaio o alveolo; trapianta presto.",
      depth: "0,5–1 cm",
      thin: "60 cm sulla fila, 80 cm tra le file.",
      tip: "Coltura lunga (4-6 mesi): occupa spazio a lungo. Cima la punta quando i cavoletti iniziano a formarsi.",
      periodo: "Aprile, Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    rapa: {
      method: "Semina diretta a file nel periodo fresco.",
      depth: "1 cm",
      thin: "12 cm sulla fila, 25 cm tra le file.",
      tip: "Dirada presto per far ingrossare radici regolari; raccoglie da giovane prima che diventino legnose.",
      periodo: "Marzo, Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "5–10 giorni"
    },
    valerianella: {
      method: "Semina diretta a spaglio o file fitte.",
      depth: "0,5 cm",
      thin: "10 cm sulla fila, 15 cm tra le file.",
      tip: "Copri appena il seme e mantieni umido nei primi giorni. Perfetta per la serra fredda autunnale.",
      periodo: "Febbraio, Marzo, Ottobre, Novembre, Dicembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–15 giorni"
    },
    rosmarino: {
      method: "Meglio trapiantare talea o piantina; da seme è molto lento.",
      depth: "Colletto a livello del terreno",
      thin: "60 cm sulla fila, 80 cm tra le file.",
      tip: "Pochissima acqua e terreno ben drenante: teme il ristagno idrico più di qualsiasi altra condizione.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "—",
      giorniGerm: "—"
    },
    timo: {
      method: "Semina superficiale o trapianto di piccole piantine.",
      depth: "Superficiale, copertura leggerissima",
      thin: "30 cm tra le piante.",
      tip: "Ama il sole diretto e il terreno asciutto; non coprirlo con colture più alte.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    origano: {
      method:
        "Semina superficiale o trapianto; germina meglio con luce diretta.",
      depth: "Superficiale, copertura leggerissima",
      thin: "30 cm tra le piante.",
      tip: "Cima regolarmente per farlo accestire e raccogli sempre prima della piena fioritura per massimo aroma.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    salvia: {
      method: "Semina in alveolo o trapianto di piantina giovane.",
      depth: "0,5 cm",
      thin: "40 cm sulla fila, 50 cm tra le file.",
      tip: "Non eccedere con l'acqua: le foglie sono più aromatiche in terreno drenante e leggermente asciutto.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    pastinaca: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 35 cm sulla fila e 45 cm tra file.",
      tip: "Dolce dopo il freddo; semina diretta e terreno profondo.",
      periodo: "Aprile, Maggio, Settembre, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "14–28 giorni"
    },
    radice_prezemolo: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
      tip: "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe.",
      periodo: "Aprile, Maggio, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "15–28 giorni"
    },
    sedano_rapa: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
      tip: "Radice globosa e profumata; vuole acqua costante e suolo ricco.",
      periodo: "Marzo, Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "18–22 °C",
      giorniGerm: "14–21 giorni"
    },
    rafano: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
      tip: "Radice piccante molto usata in Romania; contenila perché è vigorosa.",
      periodo: "Aprile, Maggio, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    patata: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 35 cm sulla fila e 60 cm tra file.",
      tip: "In serra anticipa il raccolto; rincalza quando gli steli crescono.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "—",
      giorniGerm: "—"
    },
    patata_dolce: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 45 cm sulla fila e 90 cm tra file.",
      tip: "Ama caldo stabile e suolo leggero; ideale in serra lunga.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "—",
      giorniGerm: "—"
    },
    cipolla_rossa: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 15 cm sulla fila e 30 cm tra file.",
      tip: "Bulbo dolce e colorato; ottima per raccolti scalari.",
      periodo: "Marzo, Aprile, Settembre, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    cipollotto: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 8 cm sulla fila e 20 cm tra file.",
      tip: "Pronto rapidamente; raccogli giovane prima che ingrossi troppo.",
      periodo: "Marzo, Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    erba_cipollina: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 20 cm sulla fila e 25 cm tra file.",
      tip: "Aromatica perenne; taglia spesso per foglie tenere.",
      periodo: "Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    loboda: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
      tip: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco.",
      periodo: "Aprile, Maggio, Giugno, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    stevia_dolce: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
      tip: "Acetosa per minestre primaverili; raccogli foglie giovani.",
      periodo: "Aprile, Maggio, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    leustean: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
      tip: "Il profumo classico delle ciorbe rumene; perenne e vigoroso.",
      periodo: "Aprile, Maggio, Giugno, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    dragoncello: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
      tip: "Aromatica fine per aceti e conserve; evita ristagni.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    menta: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
      tip: "Molto vigorosa: meglio in vaso o area controllata.",
      periodo: "Aprile, Maggio, Giugno, Settembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    maggiorana: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
      tip: "Aromatica delicata; ama caldo, luce e terreno drenato.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    camomilla: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
      tip: "Fiori per tisane; attira insetti utili e profuma la serra.",
      periodo: "Aprile, Maggio, Ottobre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    mais_dolce: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 70 cm tra file.",
      tip: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    tomatillo: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 50 cm sulla fila e 80 cm tra file.",
      tip: "Serve almeno due piante per fruttificare bene; ottimo per salse.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    physalis: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
      tip: "Frutti dolci in lanterna; in serra matura meglio.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    cucamelon: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
      tip: "Piccoli frutti croccanti; produttivo su rete in serra.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "7–14 giorni"
    },
    asparago: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 40 cm sulla fila e 80 cm tra file.",
      tip: "Perenne: richiede pazienza, ma produce per molti anni.",
      periodo: "Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "20–25 °C",
      giorniGerm: "14–21 giorni"
    },
    carciofo: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 80 cm sulla fila e 100 cm tra file.",
      tip: "Coltura grande e decorativa; proteggi dal gelo intenso.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cardo: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 60 cm sulla fila e 90 cm tra file.",
      tip: "Parente del carciofo; imbianchisci le coste prima del raccolto.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    crescione: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 15 cm sulla fila e 20 cm tra file.",
      tip: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti.",
      periodo: "Aprile, Maggio, Giugno, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    mizuna: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
      tip: "Senape giapponese facile; foglie frastagliate per mix insalata.",
      periodo: "Aprile, Maggio, Giugno, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    senape_foglia: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
      tip: "Foglie piccanti; semina in fresco per evitare fioritura precoce.",
      periodo: "Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    tatsoi: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
      tip: "Rosetta compatta, molto resistente al freddo.",
      periodo: "Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolo_cinese: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
      tip: "Forma un cespo tenero; proteggi da caldo e stress idrico.",
      periodo: "Aprile, Maggio, Settembre, Ottobre",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature frequenti: mantieni il terreno sempre umido, mai a secco.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    daikon: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
      tip: "Ravanello lungo: terreno profondo e raccolta prima che lignifichi.",
      periodo: "Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    scorzonera: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
      tip: "Radice nera lunga; richiede suolo leggero e profondo.",
      periodo: "Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    topinambur: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 50 cm sulla fila e 90 cm tra file.",
      tip: "Tubero rustico e produttivo; delimita lo spazio perché si espande.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "—",
      giorniGerm: "—"
    },
    fava: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
      tip: "Legume precoce e resistente al fresco; migliora il terreno.",
      periodo: "Marzo, Aprile, Novembre, Dicembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "8–15 °C",
      giorniGerm: "7–14 giorni"
    },
    soia_edamame: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
      tip: "Raccogli i baccelli verdi quando i semi sono pieni ma teneri.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    cece: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
      tip: "Ama asciutto e caldo; non eccedere con acqua in serra.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    lenticchia: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 20 cm sulla fila e 35 cm tra file.",
      tip: "Piccolo legume rustico; adatto a bordure asciutte.",
      periodo: "Aprile, Maggio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature moderate: tollera bene brevi periodi di siccità, evita ristagni.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    fagiolo_borlotto: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
      tip: "Per baccelli freschi o granella; usa tutori robusti.",
      periodo: "Maggio, Giugno, Luglio",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "12–20 °C",
      giorniGerm: "6–12 giorni"
    },
    cavolo_rosso: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
      tip: "Cespo compatto e colorato; ottimo per raccolti autunnali.",
      periodo: "Marzo, Aprile, Maggio, Agosto, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    cavolo_navone: {
      method: "Semina diretta a file nel terreno ben preparato.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
      tip: "Radice grande e rustica; utile per autunno e inverno.",
      periodo: "Aprile, Maggio, Agosto, Settembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–21 giorni"
    },
    broccolo_rapa: {
      method:
        "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
      tip: "Raccogli cime e foglie prima della piena fioritura.",
      periodo: "Aprile, Maggio, Settembre, Ottobre, Novembre",
      esposizione: "Pieno sole (almeno 6 ore di luce diretta).",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "15–20 °C",
      giorniGerm: "5–10 giorni"
    },
    shiso: {
      method: "Semina superficiale o trapianto di piantina giovane.",
      depth: "0,5-1 cm",
      thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
      tip: "Aromatica asiatica profumata; bella anche in vaso in serra.",
      periodo: "Aprile, Maggio, Giugno",
      esposizione:
        "Mezz'ombra: tollera ombreggiatura parziale nelle ore più calde.",
      annaffiatura:
        "Annaffiature regolari: lascia asciugare leggermente la superficie tra un'irrigazione e l'altra.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–20 giorni"
    },
    broccolo_romanesco: {
      method:
        "Semina in alveolo a febbraio-marzo o luglio-agosto per raccolta autunnale.",
      depth: "1 cm",
      thin: "Trapianta a 50 cm sulla fila e 60 cm tra file.",
      tip: "Testa a spirale unica; raccogli quando la testa è compatta e verde-gialla.",
      periodo: "Febbraio, Marzo, Luglio, Agosto",
      esposizione: "Pieno sole (almeno 6 ore).",
      annaffiatura: "Regolare e costante; non lasciare asciugare.",
      tempGerm: "15–20 °C",
      giorniGerm: "7–10 giorni"
    },
    friggitello: {
      method:
        "Semina in alveolo a febbraio, trapianto dopo le gelate primaverili.",
      depth: "0.5-1 cm",
      thin: "Trapianta a 40 cm sulla fila e 50 cm tra file.",
      tip: "Raccogli verde per friggere o lascia ingiallire per gusto più dolce.",
      periodo: "Febbraio, Marzo, Aprile",
      esposizione: "Pieno sole.",
      annaffiatura: "Regolare; evita ristagni.",
      tempGerm: "22–26 °C",
      giorniGerm: "10–15 giorni"
    },
    agretti: {
      method:
        "Semina diretta in file a febbraio-aprile. Semi a breve germinabilità: usa semi freschi.",
      depth: "1-2 cm",
      thin: "Dirada a 10-15 cm sulla fila.",
      tip: "Usa semi freschissimi (max 1 anno): la germinabilità cala rapidamente.",
      periodo: "Febbraio, Marzo, Aprile",
      esposizione: "Pieno sole.",
      annaffiatura: "Regolare; tollera terreni leggermente salini.",
      tempGerm: "10–18 °C",
      giorniGerm: "10–20 giorni"
    },
    borragine: {
      method: "Semina diretta o in alveolo. Si autosemina facilmente.",
      depth: "1 cm",
      thin: "Dirada a 30 cm sulla fila.",
      tip: "Raccogli i fiori azzurri per insalate; foglie giovani in zuppe e frittate.",
      periodo: "Marzo, Aprile, Maggio, Settembre",
      esposizione: "Pieno sole o mezza ombra.",
      annaffiatura: "Moderata; tollera la siccità una volta radicata.",
      tempGerm: "15–20 °C",
      giorniGerm: "7–14 giorni"
    },
    catalogna: {
      method:
        "Semina diretta o in alveolo da luglio ad agosto per raccolta autunnale-invernale.",
      depth: "0.5-1 cm",
      thin: "Dirada o trapianta a 25 cm sulla fila e 35 cm tra file.",
      tip: "Raccogli le puntarelle centrali prima che vadano a fiore; usa le foglie esterne come cicoria.",
      periodo: "Luglio, Agosto, Settembre",
      esposizione: "Pieno sole.",
      annaffiatura: "Regolare; non lasciare asciugare durante la germinazione.",
      tempGerm: "15–20 °C",
      giorniGerm: "7–12 giorni"
    },
    acetosa: {
      method:
        "Semina in alveolo o divisione di cespo. Perenne: un impianto dura anni.",
      depth: "0.5 cm",
      thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
      tip: "Raccoglie foglie giovani in primavera. Taglia le infiorescenze per prolungare la produzione.",
      periodo: "Febbraio, Marzo, Settembre",
      esposizione: "Sole o mezza ombra.",
      annaffiatura: "Moderata; tollera periodi di siccità.",
      tempGerm: "15–20 °C",
      giorniGerm: "10–14 giorni"
    },
    leurda: {
      method:
        "Si propaga per divisione di bulbi in autunno o da semi (lenti a germinare).",
      depth: "3-5 cm per i bulbi",
      thin: "Pianta bulbi a 15-20 cm di distanza.",
      tip: "Raccogli le foglie in primavera prima della fioritura; fortissimo aroma agliaceo.",
      periodo: "Agosto, Settembre, Ottobre (bulbi)",
      esposizione: "Ombra o mezza ombra.",
      annaffiatura: "Regolare; non tolera la siccità.",
      tempGerm: "10–15 °C",
      giorniGerm: "20–30 giorni (semi lenti)"
    },
    melissa: {
      method:
        "Semina in superficie o divisione di cespo (si propaga facilmente).",
      depth: "0-0.5 cm (semi superficiali)",
      thin: "Trapianta o dirada a 40 cm.",
      tip: "Perenne vigorosa: meglio in vaso o area controllata. Taglia spesso per foglie tenere.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole o mezza ombra.",
      annaffiatura: "Regolare; soffre il ristagno.",
      tempGerm: "15–20 °C",
      giorniGerm: "14–21 giorni"
    },
    cerfoglio: {
      method:
        "Semina diretta in file, non ama il trapianto. Semina scalare ogni 3 settimane.",
      depth: "0.5-1 cm",
      thin: "Dirada a 10-15 cm sulla fila.",
      tip: "Non esporre al caldo diretto: va a seme rapidamente. Preferisce mezza ombra in estate.",
      periodo: "Febbraio, Marzo, Agosto, Settembre",
      esposizione: "Mezza ombra in estate, pieno sole in primavera/autunno.",
      annaffiatura: "Regolare; mantieni il terreno umido.",
      tempGerm: "10–15 °C",
      giorniGerm: "10–15 giorni"
    },
    cimbru: {
      method: "Semina in superficie o divisione di pianta.",
      depth: "0-0.5 cm (semi superficiali)",
      thin: "Dirada o trapianta a 20-25 cm.",
      tip: "Essenziale nella cucina rumena per fagioli, sottaceti e carne. Raccoglila prima della fioritura.",
      periodo: "Marzo, Aprile, Maggio",
      esposizione: "Pieno sole.",
      annaffiatura: "Scarsa; tollera la siccità. Evita ristagni.",
      tempGerm: "18–22 °C",
      giorniGerm: "10–14 giorni"
    }
  };

  // Guide alla semina in romeno
  const SOWING_GUIDE_RO = {
    pomodoro: {
      method:
        "Seamănă în ghiveci sau alveolă la cald; transplantează în seră un răsad robust cu 4-6 frunze adevărate.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 80 cm între rânduri.",
      tip: "Îngroapă ușor tulpina până la frunze și pregătește imediat un tutore sau sfoară verticală."
    },
    peperone: {
      method:
        "Seamănă protejat în alveolă; mai bine transplantează plante deja formate când nopțile sunt blânde.",
      depth: "0,5 cm",
      thin: "40 cm pe rând, 60 cm între rânduri.",
      tip: "Încolțește lent: necesită căldură constantă (20-25 °C) și sol niciodată îmbibat."
    },
    peperoncino: {
      method:
        "Seamănă protejat în alveolă cu multă căldură inițială (25-28 °C).",
      depth: "0,5 cm",
      thin: "35 cm pe rând, 50 cm între rânduri.",
      tip: "Lasă să se usuce ușor între udări: prinde rădăcini mai bine."
    },
    melanzana: {
      method:
        "Seamănă în semănătoare caldă; în seră e mai practic să transplantezi răsaduri cumpărate.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 80 cm între rânduri.",
      tip: "Iubește substratul cald: evită transplantul timpuriu în pământ încă rece."
    },
    zucchina: {
      method:
        "Seamănă direct la cuib (2 semințe per gaură) sau în ghiveci pentru transplant cu bulgărele integru.",
      depth: "2–3 cm",
      thin: "80 cm pe rând, 100 cm între rânduri. Păstrează răsadul mai viguros.",
      tip: "Crește foarte rapid: acoperă solul cu mulci și recoltează fructele la fiecare 2-3 zile."
    },
    zucca: {
      method:
        "Seamănă direct la cuib sau în ghiveci mare; transplant delicat cu bulgărele integru.",
      depth: "2–3 cm",
      thin: "100 cm pe rând, 130 cm între rânduri.",
      tip: "Oferă-i spațiu de la început: suferă dacă e comprimată. Dirijează corzile spre exterior."
    },
    cetriolo: {
      method:
        "Seamănă direct sau în ghiveci; în seră dă rezultate excelente pe plasă verticală.",
      depth: "1,5–2 cm",
      thin: "40 cm pe rând, 100 cm între rânduri sau suporturi.",
      tip: "Transplantează fără să rupi rădăcinile și leagă devreme corzile de plasă."
    },
    melone: {
      method:
        "Seamănă la cuib sau în ghiveci cald; transplantează cu bulgărele integru când nopțile depășesc 15 °C.",
      depth: "2 cm",
      thin: "90 cm pe rând, 120 cm între rânduri.",
      tip: "Mulcește și udă la bază; reduce apa când fructele încep să se coacă."
    },
    anguria: {
      method:
        "Seamănă la cuib sau în ghiveci mare doar cu pământ bine cald (min. 22 °C).",
      depth: "2–3 cm",
      thin: "120 cm pe rând, 150 cm între rânduri.",
      tip: "În seră mică folosește 1-2 plante maxim: fiecare exemplar ocupă mult volum."
    },
    lattuga: {
      method:
        "Seamănă în alveolă sau dispersat ușor; transplantul produce căpățâni mai ordonate și uniforme.",
      depth: "0,3–0,5 cm",
      thin: "25 cm pe rând, 30 cm între rânduri.",
      tip: "Seamănă puțin și des (la 2-3 săptămâni) pentru recoltă eșalonată fără întreruperi."
    },
    radicchio: {
      method: "Seamănă în alveolă sau semănătoare, apoi transplant.",
      depth: "0,5 cm",
      thin: "30 cm pe rând, 35 cm între rânduri.",
      tip: "Pentru căpățâni compacte evită excesul de azot și căldura intensă; frigul intensifică culoarea."
    },
    rucola: {
      method:
        "Seamănă direct în rânduri sau dispersat des; nu place transplantul.",
      depth: "0,5 cm",
      thin: "15 cm pe rând, 20 cm între rânduri (mai des pentru baby leaf).",
      tip: "Taie la 5 cm de sol pentru recreștere; pe timp cald intră repede în floare."
    },
    spinaci: {
      method: "Seamănă direct în rânduri în patul bine pregătit și fin.",
      depth: "1–2 cm",
      thin: "20 cm pe rând, 25 cm între rânduri.",
      tip: "Iubește răcoarea și umiditatea constantă; la căldură peste 15 °C intră rapid în floare."
    },
    bietola: {
      method:
        "Seamănă direct sau în alveolă; fiecare sămânță este un glomerul care poate produce 2-4 răsaduri.",
      depth: "1–2 cm",
      thin: "30 cm pe rând, 40 cm între rânduri (rărește devreme).",
      tip: "Recoltează frunzele exterioare fără a tăia centrul pentru a prelungi producția."
    },
    cavolo: {
      method:
        "Seamănă în semănătoare sau alveolă, apoi transplantează răsaduri robuste.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 70 cm între rânduri.",
      tip: "Îngroapă bine coletul și menține umiditate regulată; protejează de lepidoptere cu plasă."
    },
    verza: {
      method:
        "Seamănă în semănătoare sau alveolă; transplantează răsaduri robuste.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 70 cm între rânduri.",
      tip: "Rezistă bine la frig: planifică recoltele toamna/iarna; îngețul îi îmbunătățește gustul."
    },
    broccolo: {
      method: "Seamănă în alveolă sau semănătoare; apoi transplant.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 70 cm între rânduri.",
      tip: "Nu lăsa să se usuce în timpul formării coriumbului; după tăiere dă lăstari laterali săptămâni întregi."
    },
    cavolfiore: {
      method: "Seamănă în alveolă; transplantează fără stres hidric.",
      depth: "0,5–1 cm",
      thin: "50 cm pe rând, 70 cm între rânduri.",
      tip: "Necesită creștere continuă: evită variații de apă și nutrienți; acoperă capul pentru a rămâne alb."
    },
    cavolonero: {
      method: "Seamănă în alveolă sau semănătoare, apoi transplant.",
      depth: "0,5–1 cm",
      thin: "45 cm pe rând, 60 cm între rânduri.",
      tip: "Recoltează frunză cu frunză de jos: planta continuă să producă luni întregi iarna."
    },
    cavolorapa: {
      method: "Seamănă direct sau în alveolă; apoi transplant timpuriu.",
      depth: "0,5–1 cm",
      thin: "30 cm pe rând, 40 cm între rânduri.",
      tip: "Recoltează tânăr (5-7 cm diametru): dacă stă prea mult se întărește și devine lemnos."
    },
    carota: {
      method:
        "Seamănă direct în rânduri în pământ fin și adânc (min. 30 cm); nu tolerează transplantul.",
      depth: "0,5–1 cm",
      thin: "Rărește progresiv până la 8 cm pe rând, 25 cm între rânduri.",
      tip: "Menține patul umed până la germinare (10-20 zile); pietrele din sol cauzează rădăcini bifurcate."
    },
    finocchio: {
      method: "Seamănă în alveolă sau direct; transplant delicat când e tânăr.",
      depth: "1 cm",
      thin: "25 cm pe rând, 35 cm între rânduri.",
      tip: "Mușuroiește ușor baza pentru a albi bulbul; evită stresul hidric care cauzează înflorire prematură."
    },
    prezzemolo: {
      method:
        "Seamănă direct sau în ghiveci; înmuierea semințelor 24h în apă caldă accelerează germinarea.",
      depth: "0,5 cm",
      thin: "20 cm pe rând; recoltează prin tăiere lăsând să recrescă.",
      tip: "Germinează foarte lent (15-28 zile): nu lăsa patul de semănat să se usuce în această perioadă."
    },
    basilico: {
      method:
        "Seamănă în ghiveci/alveolă sau direct doar la temperaturi stabile peste 18 °C.",
      depth: "0,3–0,5 cm",
      thin: "25 cm între plante.",
      tip: "Ciupește florile imediat ce apar pentru frunze mai mari și producție prelungită."
    },
    coriandolo: {
      method:
        "Seamănă direct în rânduri; transplantul îl face să înflorească prematur.",
      depth: "1 cm",
      thin: "15 cm pe rând (mai des pentru frunze tinere, mai rar pentru semințe).",
      tip: "Seamănă eșalonat la fiecare 3 săptămâni: la căldură intră rapid în floare. Folosește atât frunzele cât și semințele."
    },
    aneto: {
      method: "Seamănă direct în rânduri; nu place transplantul.",
      depth: "0,5–1 cm",
      thin: "25 cm între plante.",
      tip: "Lasă câteva plante să înflorească: florile atrag insecte polenizatoare și benefice."
    },
    cipolla: {
      method:
        "Seamănă în semănătoare (transplant la grosimea unui creion) sau plantează bulbili direct în rânduri.",
      depth: "0,5–1 cm (sămânță); 3 cm (bulbil)",
      thin: "12 cm pe rând, 25 cm între rânduri.",
      tip: "Nu îngropa prea adânc bulbul: trebuie să se îngroașe aproape de suprafață. Reduce apa după îndoire."
    },
    aglio: {
      method: "Plantează căței sănătoși cu vârful în sus, preferabil toamna.",
      depth: "3–5 cm",
      thin: "12 cm pe rând, 25 cm între rânduri.",
      tip: "Folosește cei mai mari căței din capetele cele mai bune: dau bulbi mai mari. Îndepărtează scapele."
    },
    porro: {
      method:
        "Seamănă în semănătoare; transplantează când are grosimea unui creion (6-8 mm).",
      depth: "0,5–1 cm",
      thin: "15 cm pe rând, 30 cm între rânduri.",
      tip: "Transplantează în gropi adânci și mușuroiește progresiv pentru tulpini albe și lungi."
    },
    scalogno: {
      method: "Plantează bulbili sau seamănă în semănătoare.",
      depth: "2–3 cm cu vârful abia acoperit",
      thin: "12 cm pe rând, 20 cm între rânduri.",
      tip: "Evită stagnarea apei: bulbii putrezesc în pământ prea umed. Păstrează în loc uscat."
    },
    fagiolino: {
      method: "Seamănă direct în rânduri când pământul depășește 15 °C.",
      depth: "2–3 cm",
      thin: "20 cm pe rând, 40 cm între rânduri.",
      tip: "Ca leguminoasă fixează azotul în sol: nu fertiliza prea mult sau produce frunze în detrimentul păstăilor."
    },
    fagiolo: {
      method: "Seamănă direct la baza araci-lor sau plaselor deja montate.",
      depth: "2–4 cm",
      thin: "25 cm pe rând, 50 cm între suporturi.",
      tip: "Montează structura înainte de semănat pentru a nu deranja rădăcinile. Urcă până la 2-3 metri."
    },
    pisello: {
      method: "Seamănă direct în rânduri duble sau lângă o plasă joasă.",
      depth: "3–5 cm",
      thin: "15 cm pe rând, 30 cm între rânduri.",
      tip: "Iubește răcoarea (10-18 °C): în seră seamănă toamna sau la sfârșitul iernii; căldura estivală îl ucide."
    },
    fragola: {
      method:
        "Mai bine transplantează răsaduri certificate sau stoloni înrădăcinați; din sămânță e lent și variabil.",
      depth: "Coletul la nivelul solului",
      thin: "30 cm pe rând, 40 cm între rânduri.",
      tip: "Nu acoperi niciodată inima plantei; mulcește cu paie pentru fructe curate și menținerea umidității."
    },
    sedano: {
      method:
        "Seamănă în alveolă; semințele sunt fine și se acoperă foarte puțin sau se lasă la lumină.",
      depth: "0,2–0,3 cm",
      thin: "30 cm pe rând, 40 cm între rânduri.",
      tip: "Necesită apă constantă: chiar și o scurtă secetă îl face fibros și amar."
    },
    ravanello: {
      method: "Seamănă direct în rânduri, eșalonat la fiecare 7-10 zile.",
      depth: "0,5–1 cm",
      thin: "8 cm pe rând, 15 cm între rânduri.",
      tip: "Dacă rămâne prea des produce frunze bogate dar rădăcini mici. Gata în doar 3-4 săptămâni!"
    },
    barbabietola: {
      method:
        "Seamănă direct; fiecare sămânță este un glomerul care poate genera 2-4 răsaduri de rărit.",
      depth: "1–2 cm",
      thin: "12 cm pe rând, 25 cm între rânduri.",
      tip: "Folosește răriturile tinere ca frunze de salată: sunt fragede și gustoase."
    },
    cicoria: {
      method: "Seamănă direct sau în alveolă, apoi transplant.",
      depth: "0,5–1 cm",
      thin: "25 cm pe rând, 30 cm între rânduri.",
      tip: "Recoltează căpățâna tânără sau taie frunzele exterioare; gustul amar se atenuează cu frigul."
    },
    indivia: {
      method: "Seamănă în alveolă sau semănătoare, apoi transplant.",
      depth: "0,5 cm",
      thin: "30 cm pe rând, 40 cm între rânduri.",
      tip: "Pentru frunze mai deschise și fragede, leagă căpățâna (uscată) cu 7-10 zile înainte de recoltă."
    },
    pakchoi: {
      method: "Seamănă direct sau în alveolă; crește foarte rapid.",
      depth: "0,5–1 cm",
      thin: "25 cm pe rând, 30 cm între rânduri.",
      tip: "Seamănă în climat răcoros (max 22 °C): la căldură sau stres hidric intră în floare foarte repede."
    },
    cavoletti: {
      method: "Seamănă în semănătoare sau alveolă; transplantează devreme.",
      depth: "0,5–1 cm",
      thin: "60 cm pe rând, 80 cm între rânduri.",
      tip: "Cultură lungă (4-6 luni): ocupă spațiu mult timp. Ciupește vârful când mugurii încep să se formeze."
    },
    rapa: {
      method: "Seamănă direct în rânduri în perioada răcoroasă.",
      depth: "1 cm",
      thin: "12 cm pe rând, 25 cm între rânduri.",
      tip: "Rărește devreme pentru rădăcini regulate; recoltează tânăr înainte de a deveni lemnos."
    },
    valerianella: {
      method: "Seamănă direct dispersat sau în rânduri dese.",
      depth: "0,5 cm",
      thin: "10 cm pe rând, 15 cm între rânduri.",
      tip: "Acoperă abia sămânța și menține umed în primele zile. Perfectă pentru sera rece de toamnă."
    },
    rosmarino: {
      method:
        "Mai bine transplantează butaș sau răsad; din sămânță e foarte lent.",
      depth: "Coletul la nivelul solului",
      thin: "60 cm pe rând, 80 cm între rânduri.",
      tip: "Foarte puțină apă și sol bine drenat: se teme de stagnarea apei mai mult decât orice."
    },
    timo: {
      method: "Seamănă la suprafață sau transplantează răsaduri mici.",
      depth: "Superficial, acoperire foarte ușoară",
      thin: "30 cm între plante.",
      tip: "Iubește soarele direct și solul uscat; nu-l acoperi cu culturi mai înalte."
    },
    origano: {
      method:
        "Seamănă la suprafață sau transplantează; germinează mai bine cu lumină directă.",
      depth: "Superficial, acoperire foarte ușoară",
      thin: "30 cm între plante.",
      tip: "Ciupește regulat pentru a-l face să se îndesească și recoltează întotdeauna înaintea înfloririi complete."
    },
    salvia: {
      method: "Seamănă în alveolă sau transplantează răsad tânăr.",
      depth: "0,5 cm",
      thin: "40 cm pe rând, 50 cm între rânduri.",
      tip: "Nu exagera cu apa: frunzele sunt mai aromatice în sol drenat și ușor uscat."
    },
    pastinaca: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 35 cm pe rând și 45 cm între rânduri.",
      tip: "Devine dulce după frig; semănat direct în sol adânc."
    },
    radice_prezemolo: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 40 cm între rânduri.",
      tip: "Cultură tradițională românească: rădăcină albă aromată pentru supe și ciorbe."
    },
    sedano_rapa: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 35 cm pe rând și 50 cm între rânduri.",
      tip: "Rădăcină globulară și parfumată; are nevoie de apă constantă și sol bogat."
    },
    rafano: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 45 cm pe rând și 60 cm între rânduri.",
      tip: "Rădăcină picantă foarte folosită în România; ține-o sub control fiindcă este viguroasă."
    },
    patata: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 35 cm pe rând și 60 cm între rânduri.",
      tip: "În seră grăbește recolta; mușuroiește pe măsură ce tulpinile cresc."
    },
    patata_dolce: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 45 cm pe rând și 90 cm între rânduri.",
      tip: "Iubește căldura constantă și solul ușor; ideal într-o seră lungă."
    },
    cipolla_rossa: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 15 cm pe rând și 30 cm între rânduri.",
      tip: "Bulb dulce și colorat; excelent pentru recolte eșalonate."
    },
    cipollotto: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 8 cm pe rând și 20 cm între rânduri.",
      tip: "Gata rapid; recoltează tânără înainte să se îngroașe prea mult."
    },
    erba_cipollina: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 20 cm pe rând și 25 cm între rânduri.",
      tip: "Aromatică perenă; taie des pentru frunze fragede."
    },
    loboda: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 35 cm între rânduri.",
      tip: "Frunză tradițională pentru ciorbe românești; crește bine pe vreme răcoroasă."
    },
    stevia_dolce: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 40 cm între rânduri.",
      tip: "Măcriș pentru supe de primăvară; recoltează frunzele tinere."
    },
    leustean: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 45 cm pe rând și 70 cm între rânduri.",
      tip: "Aroma clasică a ciorbelor românești; perenă și viguroasă."
    },
    dragoncello: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 45 cm între rânduri.",
      tip: "Aromatică fină pentru oțeturi și conserve; evită băltirea apei."
    },
    menta: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 50 cm între rânduri.",
      tip: "Foarte viguroasă: mai bine în ghiveci sau într-o zonă delimitată."
    },
    maggiorana: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 35 cm între rânduri.",
      tip: "Aromatică delicată; iubește căldura, lumina și solul drenat."
    },
    camomilla: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 35 cm între rânduri.",
      tip: "Flori pentru ceaiuri; atrage insecte utile și parfumează sera."
    },
    mais_dolce: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 70 cm între rânduri.",
      tip: "Are nevoie de grupuri de plante pentru o polenizare bună; ideal la margini."
    },
    tomatillo: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 50 cm pe rând și 80 cm între rânduri.",
      tip: "Sunt necesare cel puțin două plante pentru o fructificare bună; excelent pentru sosuri."
    },
    physalis: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 45 cm pe rând și 70 cm între rânduri.",
      tip: "Fructe dulci în «lampion»; se coc mai bine în seră."
    },
    cucamelon: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 60 cm între rânduri.",
      tip: "Fructe mici și crocante; productiv pe plasă, în seră."
    },
    asparago: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 40 cm pe rând și 80 cm între rânduri.",
      tip: "Plantă perenă: cere răbdare, dar produce mulți ani la rând."
    },
    carciofo: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 80 cm pe rând și 100 cm între rânduri.",
      tip: "Cultură mare și decorativă; protejeaz-o de înghețul puternic."
    },
    cardo: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 60 cm pe rând și 90 cm între rânduri.",
      tip: "Rudă a anghinarei; albește codițele înainte de recoltare."
    },
    crescione: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 15 cm pe rând și 20 cm între rânduri.",
      tip: "Crește repede și are nevoie de umiditate constantă; perfect pentru tăieri repetate."
    },
    mizuna: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 20 cm pe rând și 30 cm între rânduri.",
      tip: "Muștar japonez ușor de cultivat; frunze zimțate pentru saalate mixte."
    },
    senape_foglia: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 35 cm între rânduri.",
      tip: "Frunze picante; seamănă pe vreme răcoroasă pentru a evita înflorirea timpurie."
    },
    tatsoi: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 20 cm pe rând și 30 cm între rânduri.",
      tip: "Rozetă compactă, foarte rezistentă la frig."
    },
    cavolo_cinese: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 35 cm pe rând și 50 cm între rânduri.",
      tip: "Formează o căpățână fragedă; protejeaz-o de căldură și de stresul hidric."
    },
    daikon: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 40 cm între rânduri.",
      tip: "Ridiche lungă: ai nevoie de sol adânc; recoltează înainte să se lemnifice."
    },
    scorzonera: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 35 cm între rânduri.",
      tip: "Rădăcină neagră lungă; necesită sol ușor și adânc."
    },
    topinambur: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 50 cm pe rând și 90 cm între rânduri.",
      tip: "Tubercul rustic și productiv; delimitează spațiul fiindcă se extinde mult."
    },
    fava: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 50 cm între rânduri.",
      tip: "Leguminoasă timpurie, rezistentă la frig; îmbunătățește solul."
    },
    soia_edamame: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 50 cm între rânduri.",
      tip: "Recoltează păstăile verzi când boabele sunt pline, dar fragede."
    },
    cece: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 40 cm între rânduri.",
      tip: "Iubește uscăciunea și căldura; nu uda excesiv în seră."
    },
    lenticchia: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 20 cm pe rând și 35 cm între rânduri.",
      tip: "Leguminoasă mică și rustică; potrivită pentru margini uscate."
    },
    fagiolo_borlotto: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 60 cm între rânduri.",
      tip: "Pentru păstăi proaspete sau boabe; folosește araci robuști."
    },
    cavolo_rosso: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 45 cm pe rând și 60 cm între rânduri.",
      tip: "Căpățână compactă și colorată; excelentă pentru recolte de toamnă."
    },
    cavolo_navone: {
      method: "Seamănă direct în rânduri, în sol bine pregătit.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 35 cm pe rând și 50 cm între rânduri.",
      tip: "Rădăcină mare și rustică; utilă pentru toamnă și iarnă."
    },
    broccolo_rapa: {
      method:
        "Seamănă direct sau în alveolă, apoi transplantează când răsadul este robust.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 25 cm pe rând și 40 cm între rânduri.",
      tip: "Recoltează vârfurile și frunzele înainte de înflorirea completă."
    },
    shiso: {
      method: "Seamănă superficial sau transplantează un răsad tânăr.",
      depth: "0,5-1 cm",
      thin: "Rărește sau transplantează la aproximativ 30 cm pe rând și 45 cm între rânduri.",
      tip: "Aromatică asiatică parfumată; arată bine și în ghiveci, în seră."
    },
    broccolo_romanesco: {
      method:
        "Seamănă în ghiveci feb-mar sau iul-aug pentru recoltă de toamnă.",
      depth: "1 cm",
      thin: "Transplantează la 50 cm pe rând și 60 cm între rânduri.",
      tip: "Capul spiralat unic; recoltează când este compact și galben-verde."
    },
    friggitello: {
      method: "Seamănă în alveolă în feb, transplant după înghețuri.",
      depth: "0.5-1 cm",
      thin: "Transplantează la 40 cm pe rând și 50 cm între rânduri.",
      tip: "Recoltează verde pentru prăjit sau lasă să îngălbenească pentru gust mai dulce."
    },
    agretti: {
      method:
        "Seamănă direct în rânduri feb-apr. Semințe cu germinabilitate scurtă: folosește semințe proaspete.",
      depth: "1-2 cm",
      thin: "Rărește la 10-15 cm pe rând.",
      tip: "Folosește semințe proaspete (max 1 an): germinabilitatea scade rapid."
    },
    borragine: {
      method: "Seamănă direct sau în alveolă. Se autoînsămânțează ușor.",
      depth: "1 cm",
      thin: "Rărește la 30 cm pe rând.",
      tip: "Recoltează florile albastre pentru salate; frunzele tinere în supe."
    },
    catalogna: {
      method:
        "Seamănă direct sau în alveolă iulie-august pentru recoltă de toamnă-iarnă.",
      depth: "0.5-1 cm",
      thin: "Rărește sau transplantează la 25 cm pe rând și 35 cm între rânduri.",
      tip: "Recoltează puntarellele centrale înainte să înflorească; folosește frunzele externe ca cicoare."
    },
    acetosa: {
      method:
        "Seamănă în alveolă sau împarte tufele. Perenă: o plantare durează ani.",
      depth: "0.5 cm",
      thin: "Transplantează la 30 cm pe rând și 40 cm între rânduri.",
      tip: "Culege frunzele tinere primăvara. Taie inflorescențele pentru a prelungi producția."
    },
    leurda: {
      method:
        "Se înmulțește prin divizarea bulbilor toamna sau din semințe (germinare lentă).",
      depth: "3-5 cm pentru bulbi",
      thin: "Plantează bulbii la 15-20 cm distanță.",
      tip: "Culege frunzele primăvara înainte de înflorire; aromă puternică de usturoi."
    },
    melissa: {
      method: "Seamănă la suprafață sau împarte tufe (se propagă ușor).",
      depth: "0-0.5 cm",
      thin: "Transplantează sau rărește la 40 cm.",
      tip: "Perenă viguroasă: mai bine în ghiveci. Taie des pentru frunze fragede."
    },
    cerfoglio: {
      method:
        "Seamănă direct în rânduri, nu suportă transplantul. Seamănă eșalonat la 3 săpt.",
      depth: "0.5-1 cm",
      thin: "Rărește la 10-15 cm pe rând.",
      tip: "Nu expune la căldură directă: bolțează rapid. Preferă semi-umbra vara."
    },
    cimbru: {
      method: "Seamănă la suprafață sau împarte tufele.",
      depth: "0-0.5 cm",
      thin: "Rărește sau transplantează la 20-25 cm.",
      tip: "Esențial în bucătăria românească pentru fasole, murături și carne. Culege înainte de înflorire."
    }
  };

  // Categorie botaniche
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
    mais_dolce: "frutto",
    tomatillo: "frutto",
    physalis: "frutto",
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
    shiso: "aromatica",
    broccolo_romanesco: "foglia",
    friggitello: "frutto",
    agretti: "foglia",
    borragine: "aromatica",
    catalogna: "foglia",
    acetosa: "foglia",
    leurda: "aromatica",
    melissa: "aromatica",
    cerfoglio: "aromatica",
    cimbru: "aromatica"
  };

  const DATA = { PLANTS, SOWING_GUIDE, SOWING_GUIDE_RO, TIPO };
  // Esportazione
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DATA;
  }
  if (typeof root !== "undefined") {
    root.PLANTS = PLANTS;
    root.SOWING_GUIDE = SOWING_GUIDE;
    root.SOWING_GUIDE_RO = SOWING_GUIDE_RO;
    root.TIPO = TIPO;
  }
  return DATA;
})(typeof window !== "undefined" ? window : globalThis);

// Mappa condivisa delle foto del catalogo.
const PLANT_PHOTO_MAP = {
  pomodoro: "assets/img/photo/pomodoro.webp",
  peperone: "assets/img/photo/peperone.webp",
  peperoncino: "assets/img/photo/peperoncino.webp",
  melanzana: "assets/img/photo/melanzana.webp",
  zucchina: "assets/img/photo/zucchina.webp",
  zucca: "assets/img/photo/zucca.webp",
  cetriolo: "assets/img/photo/cetriolo.webp",
  melone: "assets/img/photo/melone.webp",
  anguria: "assets/img/photo/anguria.webp",
  lattuga: "assets/img/photo/lattuga.webp",
  radicchio: "assets/img/photo/radicchio.webp",
  rucola: "assets/img/photo/rucola.webp",
  spinaci: "assets/img/photo/spinaci.webp",
  bietola: "assets/img/photo/bietola_coste.webp",
  cavolo: "assets/img/photo/cavolo_cappuccio.webp",
  verza: "assets/img/photo/verza.webp",
  broccolo: "assets/img/photo/broccolo.webp",
  cavolfiore: "assets/img/photo/cavolfiore.webp",
  cavolonero: "assets/img/photo/cavolo_nero.webp",
  cavolorapa: "assets/img/photo/cavolo_rapa.webp",
  carota: "assets/img/photo/carota.webp",
  finocchio: "assets/img/photo/finocchio.webp",
  prezzemolo: "assets/img/photo/prezzemolo.webp",
  basilico: "assets/img/photo/basilico.webp",
  coriandolo: "assets/img/photo/coriandolo.webp",
  aneto: "assets/img/photo/aneto.webp",
  cipolla: "assets/img/photo/cipolla.webp",
  aglio: "assets/img/photo/aglio.webp",
  porro: "assets/img/photo/porro.webp",
  scalogno: "assets/img/photo/scalogno.webp",
  fagiolino: "assets/img/photo/fagiolino_nano.webp",
  fagiolo: "assets/img/photo/fagiolo_rampicante.webp",
  pisello: "assets/img/photo/pisello.webp",
  fragola: "assets/img/photo/fragola.webp",
  sedano: "assets/img/photo/sedano.webp",
  ravanello: "assets/img/photo/ravanello.webp",
  barbabietola: "assets/img/photo/barbabietola.webp",
  cicoria: "assets/img/photo/cicoria.webp",
  indivia: "assets/img/photo/indivia_scarola.webp",
  pakchoi: "assets/img/photo/pak_choi.webp",
  cavoletti: "assets/img/photo/cavoletti_bruxelles.webp",
  rapa: "assets/img/photo/rapa.webp",
  valerianella: "assets/img/photo/valerianella.webp",
  rosmarino: "assets/img/photo/rosmarino.webp",
  timo: "assets/img/photo/timo.webp",
  origano: "assets/img/photo/origano.webp",
  salvia: "assets/img/photo/salvia.webp",
  pastinaca: "assets/img/photo/pastinaca.webp",
  radice_prezemolo: "assets/img/photo/radice_prezemolo.webp",
  sedano_rapa: "assets/img/photo/sedano_rapa.webp",
  rafano: "assets/img/photo/rafano.webp",
  patata: "assets/img/photo/patata.webp",
  patata_dolce: "assets/img/photo/patata_dolce.webp",
  cipolla_rossa: "assets/img/photo/cipolla_rossa.webp",
  cipollotto: "assets/img/photo/cipollotto.webp",
  erba_cipollina: "assets/img/photo/erba_cipollina.webp",
  loboda: "assets/img/photo/loboda.webp",
  stevia_dolce: "assets/img/photo/stevia_dolce.webp",
  leustean: "assets/img/photo/leustean.webp",
  dragoncello: "assets/img/photo/dragoncello.webp",
  menta: "assets/img/photo/menta.webp",
  maggiorana: "assets/img/photo/maggiorana.webp",
  camomilla: "assets/img/photo/camomilla.webp",
  mais_dolce: "assets/img/photo/mais_dolce.webp",
  tomatillo: "assets/img/photo/tomatillo.webp",
  physalis: "assets/img/photo/physalis.webp",
  cucamelon: "assets/img/photo/cucamelon.webp",
  asparago: "assets/img/photo/asparago.webp",
  carciofo: "assets/img/photo/carciofo.webp",
  cardo: "assets/img/photo/cardo.webp",
  crescione: "assets/img/photo/crescione.webp",
  mizuna: "assets/img/photo/mizuna.webp",
  senape_foglia: "assets/img/photo/senape_foglia.webp",
  tatsoi: "assets/img/photo/tatsoi.webp",
  cavolo_cinese: "assets/img/photo/cavolo_cinese.webp",
  daikon: "assets/img/photo/daikon.webp",
  scorzonera: "assets/img/photo/scorzonera.webp",
  topinambur: "assets/img/photo/topinambur.webp",
  fava: "assets/img/photo/fava.webp",
  soia_edamame: "assets/img/photo/soia_edamame.webp",
  cece: "assets/img/photo/cece.webp",
  lenticchia: "assets/img/photo/lenticchia.webp",
  fagiolo_borlotto: "assets/img/photo/fagiolo_borlotto.webp",
  cavolo_rosso: "assets/img/photo/cavolo_rosso.webp",
  cavolo_navone: "assets/img/photo/cavolo_navone.webp",
  broccolo_rapa: "assets/img/photo/broccolo_rapa.webp",
  shiso: "assets/img/photo/shiso.webp",
  broccolo_romanesco: "assets/img/photo/broccolo_romanesco.webp",
  friggitello: "assets/img/photo/friggitello.webp",
  agretti: "assets/img/photo/agretti.webp",
  borragine: "assets/img/photo/borragine.webp",
  catalogna: "assets/img/photo/catalogna.webp",
  acetosa: "assets/img/photo/acetosa.webp",
  leurda: "assets/img/photo/leurda.webp",
  melissa: "assets/img/photo/melissa.webp",
  cerfoglio: "assets/img/photo/cerfoglio.webp",
  cimbru: "assets/img/photo/cimbru.webp"
};
const preloadedPlantPhotos = new Set();

// Restituisce la foto della pianta usando il percorso salvato o il nome derivato dall'ID.
function resolvePlantPhoto(plant, id) {
  const p = plant || {};
  if (p.foto) {
    if (
      p.foto.startsWith("http://") ||
      p.foto.startsWith("https://") ||
      p.foto.startsWith("data:")
    ) {
      return p.foto;
    }
    if (p.foto.includes("/")) return p.foto;
    return `assets/img/photo/${p.foto}`;
  }
  if (PLANT_PHOTO_MAP[id]) return PLANT_PHOTO_MAP[id];
  return `assets/img/photo/${id}.webp`;
}

// Avvia il download di una miniatura prima che il pannello che la usa diventi
// visibile. Il browser riutilizza poi la stessa risorsa per catalogo e carrello.
function preloadPlantPhoto(plant, id) {
  const src = resolvePlantPhoto(plant, id);
  if (!src || preloadedPlantPhotos.has(src) || typeof Image === "undefined")
    return;

  preloadedPlantPhotos.add(src);
  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

if (typeof window !== "undefined") {
  window.resolvePlantPhoto = resolvePlantPhoto;
  window.preloadPlantPhoto = preloadPlantPhoto;
}

// Testi editoriali brevi e note agronomiche condivisi tra catalogo,
// configuratore e manuali post-acquisto.
(function (root) {
  const GROUPS = {
    it: {
      frutto:
        "Ortaggio da frutto, colorato e versatile nelle preparazioni fresche e cotte.",
      foglia:
        "Ortaggio da foglia fresco e versatile, adatto a raccolte e ricette di stagione.",
      radice:
        "Ortaggio da radice o bulbo, apprezzato per il gusto deciso e la grande versatilità.",
      legume:
        "Legume nutriente e saporito, protagonista di piatti semplici e completi.",
      aromatica:
        "Pianta aromatica dal profumo riconoscibile, ideale per dare carattere alle ricette."
    },
    ro: {
      frutto:
        "Legumă cu fructe colorate și versatile, potrivită pentru preparate proaspete sau gătite.",
      foglia:
        "Legumă cu frunze fragede și versatile, potrivită pentru recolte și rețete de sezon.",
      radice:
        "Legumă cu rădăcină sau bulb, apreciată pentru gustul distinct și versatilitate.",
      legume:
        "Leguminoasă hrănitoare și gustoasă, potrivită pentru preparate simple și consistente.",
      aromatica:
        "Plantă aromatică cu parfum distinct, ideală pentru a da personalitate rețetelor."
    }
  };

  const SPECIAL = {
    it: {
      pomodoro:
        "Frutto estivo succoso e aromatico, disponibile in molte varietà da insalata e da salsa.",
      peperone:
        "Frutto dolce e croccante, disponibile in colori e forme diverse.",
      peperoncino:
        "Capsicum dal carattere piccante, con intensità, colori e forme molto diverse.",
      melanzana:
        "Ortaggio estivo dalla polpa morbida, protagonista di molti piatti mediterranei.",
      zucchina:
        "Ortaggio estivo delicato e versatile, apprezzato anche per i suoi fiori commestibili.",
      zucca:
        "Frutto autunnale dalla polpa dolce e vellutata, ottimo in ricette dolci e salate.",
      cetriolo:
        "Frutto fresco, croccante e ricco d'acqua, ideale per insalate e conserve.",
      melone:
        "Frutto estivo dolce e profumato, disponibile in numerose varietà.",
      anguria:
        "Grande frutto estivo dalla polpa dolce, fresca e ricca d'acqua.",
      fragola:
        "Piccolo frutto rosso, profumato e dolce, tra i più amati della bella stagione.",
      lattuga:
        "Insalata tenera e leggera, disponibile in cespi, colori e consistenze differenti.",
      rucola: "Foglia dal gusto vivace e leggermente piccante, ottima fresca.",
      spinaci:
        "Foglia verde tenera e nutriente, versatile sia cruda sia cotta.",
      radicchio: "Cicoria dal colore intenso e dal piacevole gusto amarognolo.",
      cavolonero:
        "Kale toscano dalle foglie scure e bollose, dal sapore intenso.",
      broccolo_romanesco:
        "Brassicacea dalla caratteristica testa verde a spirale, scenografica e saporita.",
      carota:
        "Radice dolce e croccante, disponibile in diverse forme e colori.",
      ravanello:
        "Piccola radice croccante dal gusto fresco e leggermente piccante.",
      aglio:
        "Bulbo aromatico composto da spicchi, essenziale in moltissime cucine.",
      patata:
        "Tubero nutriente e versatile, base di innumerevoli ricette tradizionali.",
      patata_dolce:
        "Tubero dalla polpa dolce e colorata, morbido e versatile in cucina.",
      fagiolo: "Legume ricco e sostanzioso, consumato fresco oppure secco.",
      fagiolino: "Legume dal baccello tenero e croccante, dal sapore delicato.",
      pisello:
        "Legume dolce e tenero, apprezzato fresco e in numerose ricette.",
      basilico:
        "Aromatica mediterranea dal profumo fresco e inconfondibile, simbolo della cucina italiana.",
      rosmarino:
        "Arbusto mediterraneo sempreverde dal profumo intenso e resinoso.",
      menta:
        "Aromatica fresca e balsamica, ideale in bevande, salse e piatti estivi.",
      camomilla:
        "Pianta dai piccoli fiori profumati, tradizionalmente usati per infusi delicati.",
      borragine:
        "Pianta dalle foglie morbide e dai fiori azzurri commestibili.",
      physalis:
        "Piccolo frutto dorato racchiuso in un calice simile a una lanterna.",
      cucamelon:
        "Minuscolo frutto croccante, simile a un'anguria e dal gusto agrumato.",
      tomatillo:
        "Frutto verde avvolto in un calice cartaceo, tipico della cucina messicana.",
      shiso:
        "Aromatica asiatica dalle foglie decorative e dal profumo complesso.",
      topinambur:
        "Pianta vigorosa dai fiori gialli e dai tuberi dal gusto delicato.",
      asparago:
        "Ortaggio perenne dai giovani germogli teneri e dal sapore raffinato.",
      carciofo:
        "Grande pianta mediterranea con capolini carnosi e un gusto inconfondibile."
    },
    ro: {
      pomodoro:
        "Fruct de vară suculent și aromat, disponibil în multe soiuri pentru salate și sosuri.",
      peperone:
        "Fruct dulce și crocant, disponibil în culori și forme variate.",
      peperoncino:
        "Capsicum cu gust picant, în intensități, culori și forme foarte diferite.",
      melanzana:
        "Legumă de vară cu miez fin, prezentă în multe preparate mediteraneene.",
      zucchina:
        "Legumă de vară delicată și versatilă, apreciată inclusiv pentru florile comestibile.",
      zucca:
        "Fruct de toamnă cu miez dulce și catifelat, potrivit pentru rețete dulci și sărate.",
      cetriolo:
        "Fruct proaspăt, crocant și bogat în apă, ideal pentru salate și murături.",
      melone:
        "Fruct de vară dulce și parfumat, disponibil în numeroase soiuri.",
      anguria: "Fruct mare de vară, cu miez dulce, răcoritor și bogat în apă.",
      fragola:
        "Fruct mic, roșu, parfumat și dulce, foarte iubit în sezonul cald.",
      lattuga:
        "Salată fragedă și ușoară, disponibilă în forme, culori și texturi diferite.",
      rucola:
        "Frunză cu gust vioi și ușor picant, excelentă consumată proaspătă.",
      spinaci:
        "Frunză verde, fragedă și hrănitoare, versatilă crudă sau gătită.",
      radicchio: "Cicoare cu o culoare intensă și un gust plăcut, ușor amărui.",
      cavolonero:
        "Kale toscan cu frunze întunecate și reliefate, cu gust intens.",
      broccolo_romanesco:
        "Brasicacee cu inflorescență verde spiralată, spectaculoasă și gustoasă.",
      carota:
        "Rădăcină dulce și crocantă, disponibilă în forme și culori diferite.",
      ravanello: "Rădăcină mică și crocantă, cu gust proaspăt și ușor picant.",
      aglio: "Bulb aromatic format din căței, esențial în numeroase bucătării.",
      patata: "Tubercul hrănitor și versatil, baza multor rețete tradiționale.",
      patata_dolce:
        "Tubercul cu miez dulce și colorat, fin și versatil în bucătărie.",
      fagiolo:
        "Leguminoasă consistentă și hrănitoare, consumată proaspătă sau uscată.",
      fagiolino: "Leguminoasă cu păstaie fragedă și crocantă, cu gust delicat.",
      pisello:
        "Leguminoasă dulce și fragedă, apreciată proaspătă și în multe rețete.",
      basilico:
        "Aromatică mediteraneeană cu parfum proaspăt și inconfundabil, simbol al bucătăriei italiene.",
      rosmarino:
        "Arbust mediteraneean veșnic verde, cu parfum intens și rășinos.",
      menta:
        "Aromatică proaspătă și balsamică, ideală în băuturi, sosuri și preparate de vară.",
      camomilla:
        "Plantă cu flori mici și parfumate, folosite tradițional pentru infuzii delicate.",
      borragine: "Plantă cu frunze moi și flori albastre comestibile.",
      physalis:
        "Fruct mic și auriu, învelit într-un caliciu asemănător unui felinar.",
      cucamelon:
        "Fruct minuscul și crocant, asemănător unui pepene verde, cu gust citric.",
      tomatillo:
        "Fruct verde învelit într-un caliciu fin, specific bucătăriei mexicane.",
      shiso: "Aromatică asiatică cu frunze decorative și parfum complex.",
      topinambur:
        "Plantă viguroasă cu flori galbene și tuberculi cu gust delicat.",
      asparago: "Legumă perenă cu lăstari fragezi și gust rafinat.",
      carciofo:
        "Plantă mediteraneeană mare, cu inflorescențe cărnoase și gust inconfundabil."
    }
  };

  const CROP_GROUPS = {
    fruitVine: [
      "pomodoro",
      "peperone",
      "peperoncino",
      "melanzana",
      "tomatillo",
      "physalis",
      "friggitello"
    ],
    cucurbit: [
      "zucchina",
      "zucca",
      "cetriolo",
      "melone",
      "anguria",
      "cucamelon"
    ],
    leafyCut: [
      "lattuga",
      "rucola",
      "spinaci",
      "bietola",
      "cicoria",
      "indivia",
      "valerianella",
      "loboda",
      "crescione",
      "mizuna",
      "senape_foglia",
      "tatsoi",
      "catalogna",
      "acetosa",
      "agretti"
    ],
    brassica: [
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa",
      "pakchoi",
      "cavoletti",
      "cavolo_cinese",
      "cavolo_rosso",
      "cavolo_navone",
      "broccolo_rapa",
      "broccolo_romanesco"
    ],
    directRoot: [
      "carota",
      "ravanello",
      "barbabietola",
      "rapa",
      "pastinaca",
      "radice_prezemolo",
      "sedano_rapa",
      "rafano",
      "daikon",
      "scorzonera"
    ],
    allium: [
      "cipolla",
      "aglio",
      "porro",
      "scalogno",
      "cipolla_rossa",
      "cipollotto",
      "erba_cipollina",
      "leurda"
    ],
    tuber: ["patata", "patata_dolce", "topinambur"],
    climbingLegume: ["fagiolo", "pisello", "fagiolo_borlotto"],
    bushLegume: ["fagiolino", "fava", "soia_edamame", "cece", "lenticchia"],
    woodyHerb: [
      "rosmarino",
      "timo",
      "origano",
      "salvia",
      "dragoncello",
      "maggiorana",
      "menta",
      "melissa",
      "cimbru"
    ],
    annualHerb: [
      "prezzemolo",
      "basilico",
      "coriandolo",
      "aneto",
      "stevia_dolce",
      "leustean",
      "shiso",
      "cerfoglio"
    ],
    flowerHerb: ["camomilla", "borragine"],
    perennial: ["asparago", "carciofo", "cardo"]
  };

  const GROUP_BY_ID = Object.entries(CROP_GROUPS).reduce(
    (result, [group, ids]) => {
      ids.forEach((id) => {
        result[id] = group;
      });
      return result;
    },
    {}
  );

  const DETAIL = {
    it: {
      defaults: {
        frutto: [
          "Terreno profondo, fertile e ben drenato, arricchito con compost maturo.",
          "Irriga a fondo e alla base, lasciando asciugare leggermente la superficie tra un intervento e l'altro.",
          "Incorpora compost prima dell'impianto; dalla fioritura evita eccessi di azoto.",
          "Mantieni la chioma ariosa, elimina le parti danneggiate e controlla i sostegni."
        ],
        foglia: [
          "Terreno soffice, ricco di sostanza organica e uniformemente umido, senza ristagni.",
          "Irriga con regolarità alla base: gli sbalzi idrici rendono le foglie meno tenere.",
          "Usa compost maturo prima della semina; aggiungi azoto solo se la crescita rallenta.",
          "Mantieni il terreno pulito e raccogli senza danneggiare il punto di crescita."
        ],
        radice: [
          "Terreno fine, sciolto e privo di sassi; evita letame fresco e ristagni.",
          "Mantieni un'umidità regolare, senza saturare il terreno né alternare secco e bagnato.",
          "Fertilizza con moderazione: troppo azoto favorisce le foglie a scapito della parte raccolta.",
          "Tieni il suolo libero dalle infestanti ed evita lavorazioni profonde vicino alla pianta."
        ],
        aromatica: [
          "Substrato arioso e drenante; per le aromatiche mediterranee evita terreni troppo ricchi.",
          "Bagna alla base quando lo strato superficiale è asciutto, senza lasciare ristagni.",
          "Concima poco: un eccesso di azoto riduce aroma e robustezza dei tessuti.",
          "Raccogli con tagli puliti e rispetta il portamento naturale della pianta."
        ],
        legume: [
          "Terreno drenato e moderatamente fertile; evita concimazioni ricche di azoto.",
          "Mantieni l'umidità costante soprattutto durante fioritura e formazione dei baccelli.",
          "Di norma basta compost maturo: le leguminose non richiedono molto azoto.",
          "Mantieni la base ariosa e raccogli al momento adatto alla varietà."
        ]
      },
      groups: {
        fruitVine: {
          care: "Lega le varietà alte, arieggia la chioma e rimuovi le foglie malate; raccogli con regolarità.",
          harvest:
            "Stacca i frutti quando hanno colore e consistenza tipici della varietà, usando forbici pulite se il peduncolo è tenace."
        },
        cucurbit: {
          care: "Guida i tralci senza piegarli, lascia spazio alle foglie e controlla l'allegagione dei primi fiori.",
          water:
            "Bagna in profondità alla base, evitando foglie e colletto; aumenta gradualmente durante l'ingrossamento dei frutti.",
          harvest:
            "Raccogli i frutti teneri con taglio netto; per zucche e meloni attendi i segnali di piena maturazione della varietà."
        },
        leafyCut: {
          care: "Raccogli le foglie esterne o effettua tagli puliti, lasciando integro il centro per favorire la ricrescita.",
          harvest:
            "Raccogli al mattino le foglie turgide, con tagli puliti e senza danneggiare il centro della pianta.",
          storage:
            "Raffredda subito le foglie e conservale in frigorifero in un contenitore aerato."
        },
        brassica: {
          care: "Proteggi il cuore e le infiorescenze, elimina le foglie danneggiate e controlla la pagina inferiore.",
          soil: "Terreno fertile, profondo e ben drenato, con compost maturo e umidità uniforme.",
          harvest:
            "Taglia cespo, testa o infiorescenza quando è ben formata e ancora compatta, lasciando integre le parti utili a eventuali ricacci."
        },
        directRoot: {
          care: "Dirada solo se necessario, quando le piantine sono giovani, e non lavorare in profondità vicino alle radici.",
          harvest:
            "Estrai con terreno leggermente umido quando la radice ha raggiunto il diametro desiderato, senza attendere che diventi fibrosa.",
          storage:
            "Elimina le foglie e conserva le radici sane, non lavate, al fresco e al buio."
        },
        allium: {
          care: "Controlla le infestanti con lavorazioni superficiali e mantieni il colletto asciutto e aerato.",
          soil: "Terreno sciolto e drenante; evita letame fresco e ristagni vicino ai bulbi.",
          water:
            "Bagna con moderazione alla base e riduci l'acqua quando bulbi o spicchi si avvicinano alla maturazione.",
          harvest:
            "Estrai i bulbi quando le foglie iniziano a ingiallire e piegarsi, lavorando con terreno asciutto.",
          storage:
            "Lascia asciugare bulbi e tuniche in un luogo ombreggiato e ventilato, poi conserva al fresco e all'asciutto."
        },
        tuber: {
          care: "Rincalza quando necessario, proteggi i tuberi dalla luce ed evita lavorazioni che possano danneggiarli.",
          soil: "Terreno profondo, soffice e drenante, privo di zolle compatte.",
          harvest:
            "Solleva i tuberi con terreno asciutto, partendo lontano dal fusto per non ferirli.",
          storage:
            "Fai asciugare la superficie e conserva soltanto tuberi integri, al buio e in ambiente ventilato."
        },
        climbingLegume: {
          care: "Predisponi sostegni solidi prima che i tralci si allunghino e raccogli i baccelli con delicatezza.",
          harvest:
            "Raccogli spesso i baccelli giovani; per il seme secco attendi che siano completamente maturi."
        },
        bushLegume: {
          care: "Mantieni la base libera e ariosa; non servono sostegni salvo varietà molto vigorose.",
          harvest:
            "Raccogli i baccelli senza tirare i rami; per ceci e lenticchie attendi la completa maturazione del seme."
        },
        woodyHerb: {
          care: "Esegui tagli leggeri sopra la parte verde, evitando potature drastiche sul legno vecchio.",
          harvest:
            "Preleva rametti sani con tagli leggeri, preferibilmente al mattino e prima della piena fioritura.",
          storage:
            "Usa fresca oppure essicca lentamente all'ombra in un luogo ventilato."
        },
        annualHerb: {
          care: "Raccogli gli apici con tagli puliti; elimina i fiori solo per prolungare la produzione di foglie.",
          harvest:
            "Taglia foglie e apici sani al mattino, senza asportare più di un terzo della pianta alla volta.",
          storage:
            "Usa fresca, congela le foglie pulite oppure essiccale all'ombra se la specie lo consente."
        },
        flowerHerb: {
          care: "Lascia sviluppare i fiori e raccoglili asciutti, appena aperti, senza cimare gli steli produttivi.",
          harvest:
            "Raccogli i fiori asciutti, appena aperti, nelle ore fresche della mattina.",
          storage:
            "Essicca i fiori in strato sottile, all'ombra, e conservali asciutti al riparo dalla luce."
        },
        perennial: {
          care: "Non forzare la raccolta sulle piante giovani; elimina le parti secche e lascia spazio allo sviluppo pluriennale."
        }
      },
      prevention:
        "Arieggia ogni giorno, irriga al mattino alla base e rimuovi subito i tessuti malati.",
      harvest:
        "Raccogli a maturazione con utensili puliti, senza ferire la pianta o la parte destinata al consumo.",
      storage:
        "Conserva soltanto prodotti sani e asciutti; raffredda rapidamente quelli deperibili.",
      rotation:
        "Dopo la raccolta elimina i residui e non ripiantare la stessa famiglia botanica nello stesso spazio nel ciclo successivo.",
      labels: [
        "Distanze dopo il diradamento",
        "Distanze di trapianto",
        "Distanze d'impianto"
      ]
    },
    ro: {
      defaults: {
        frutto: [
          "Sol profund, fertil și bine drenat, îmbogățit cu compost matur.",
          "Udă profund la bază, lăsând suprafața să se usuce ușor între udări.",
          "Încorporează compost înainte de plantare; după înflorire evită excesul de azot.",
          "Menține frunzișul aerisit, elimină părțile deteriorate și verifică susținerile."
        ],
        foglia: [
          "Sol afânat, bogat în materie organică și uniform umed, fără băltire.",
          "Udă regulat la bază: variațiile mari de umiditate reduc frăgezimea frunzelor.",
          "Folosește compost matur înainte de semănat; adaugă azot doar dacă dezvoltarea încetinește.",
          "Menține solul curat și recoltează fără a răni punctul de creștere."
        ],
        radice: [
          "Sol fin, afânat și fără pietre; evită gunoiul de grajd proaspăt și băltirea.",
          "Menține umiditatea constantă, fără să saturezi solul și fără alternanțe bruște.",
          "Fertilizează moderat: prea mult azot favorizează frunzele în detrimentul părții recoltate.",
          "Îndepărtează buruienile și evită lucrările adânci lângă plantă."
        ],
        aromatica: [
          "Substrat aerat și drenat; pentru aromaticele mediteraneene evită solul prea bogat.",
          "Udă la bază când stratul superficial s-a uscat, fără apă stagnantă.",
          "Fertilizează puțin: excesul de azot reduce aroma și rezistența țesuturilor.",
          "Recoltează prin tăieri curate, respectând forma naturală a plantei."
        ],
        legume: [
          "Sol drenat și moderat fertil; evită îngrășămintele bogate în azot.",
          "Menține umiditatea constantă mai ales în timpul înfloririi și formării păstăilor.",
          "De regulă este suficient compostul matur; leguminoasele nu cer mult azot.",
          "Menține baza aerisită și recoltează la momentul potrivit soiului."
        ]
      },
      groups: {
        fruitVine: {
          care: "Leagă soiurile înalte, aerisește frunzișul și elimină frunzele bolnave; recoltează regulat.",
          harvest:
            "Culege fructele când au culoarea și consistența tipice soiului; folosește foarfecă dacă pedunculul este tare."
        },
        cucurbit: {
          care: "Ghidează vrejurile fără să le îndoi, lasă spațiu frunzelor și urmărește legarea primelor flori.",
          water:
            "Udă profund la bază, evitând frunzele și coletul; mărește treptat cantitatea când fructele cresc.",
          harvest:
            "Culege fructele fragede printr-o tăiere curată; pentru dovleci și pepeni așteaptă semnele maturității depline."
        },
        leafyCut: {
          care: "Recoltează frunzele exterioare sau taie curat, păstrând centrul intact pentru regenerare.",
          harvest:
            "Recoltează dimineața frunzele turgescente, fără a răni centrul plantei.",
          storage:
            "Răcește imediat frunzele și păstrează-le la frigider într-un recipient aerisit."
        },
        brassica: {
          care: "Protejează centrul și inflorescențele, elimină frunzele deteriorate și verifică dosul frunzelor.",
          soil: "Sol fertil, profund și bine drenat, cu compost matur și umiditate uniformă.",
          harvest:
            "Taie căpățâna sau inflorescența când este bine formată și încă compactă."
        },
        directRoot: {
          care: "Rărește numai dacă este necesar, cât plantele sunt tinere, și evită lucrările adânci lângă rădăcini.",
          harvest:
            "Extrage din sol ușor umed când rădăcina a ajuns la dimensiunea dorită, înainte să devină fibroasă.",
          storage:
            "Îndepărtează frunzele și păstrează rădăcinile sănătoase, nespălate, la rece și întuneric."
        },
        allium: {
          care: "Controlează buruienile superficial și menține coletul uscat și bine aerisit.",
          soil: "Sol afânat și drenat, fără gunoi de grajd proaspăt; evită băltirea lângă bulbi.",
          water:
            "Udă moderat la bază și redu apa când bulbii sau cățeii se apropie de maturitate.",
          harvest:
            "Scoate bulbii când frunzele încep să se îngălbenească și să se aplece, pe sol uscat.",
          storage:
            "Lasă bulbii să se usuce la umbră, într-un loc aerisit, apoi păstrează-i la rece și uscat."
        },
        tuber: {
          care: "Mușuroiește când este necesar, protejează tuberculii de lumină și evită să-i rănești.",
          soil: "Sol profund, afânat și drenat, fără bulgări compacți.",
          harvest:
            "Ridică tuberculii din sol uscat, începând la distanță de tulpină pentru a nu-i răni.",
          storage:
            "Lasă suprafața să se usuce și păstrează doar tuberculii integri, la întuneric și aerisit."
        },
        climbingLegume: {
          care: "Instalează susțineri solide înainte ca lăstarii să se alungească și recoltează cu grijă.",
          harvest:
            "Culege des păstăile tinere; pentru semințe uscate așteaptă maturitatea completă."
        },
        bushLegume: {
          care: "Menține baza curată și aerisită; susținerea nu este necesară decât la soiurile viguroase.",
          harvest:
            "Culege păstăile fără a trage ramurile; pentru năut și linte așteaptă maturarea completă a semințelor."
        },
        woodyHerb: {
          care: "Taie ușor deasupra părții verzi și evită tăierile drastice în lemnul bătrân.",
          harvest:
            "Taie ușor ramuri sănătoase, preferabil dimineața și înainte de înflorirea deplină.",
          storage:
            "Folosește proaspătă sau usucă lent la umbră, într-un loc aerisit."
        },
        annualHerb: {
          care: "Recoltează vârfurile curat; elimină florile doar pentru a prelungi producția de frunze.",
          harvest:
            "Taie dimineața frunze și vârfuri sănătoase, fără a lua mai mult de o treime din plantă.",
          storage:
            "Folosește proaspătă, congelează frunzele sau usucă-le la umbră dacă specia permite."
        },
        flowerHerb: {
          care: "Lasă florile să se dezvolte și recoltează-le uscate, imediat după deschidere, fără să ciupești tulpinile.",
          harvest:
            "Culege florile uscate, imediat după deschidere, în orele răcoroase ale dimineții.",
          storage:
            "Usucă florile într-un strat subțire, la umbră, și păstrează-le ferite de lumină."
        },
        perennial: {
          care: "Nu forța recoltarea plantelor tinere; elimină părțile uscate și lasă loc dezvoltării perene."
        }
      },
      prevention:
        "Aerisește zilnic, udă dimineața la bază și îndepărtează imediat țesuturile bolnave.",
      harvest:
        "Recoltează la maturitate cu unelte curate, fără a răni planta sau partea destinată consumului.",
      storage:
        "Păstrează doar produse sănătoase și uscate; răcește rapid produsele perisabile.",
      rotation:
        "După recoltare elimină resturile și nu replanta aceeași familie în același loc în ciclul următor.",
      labels: [
        "Distanțe după rărire",
        "Distanțe de transplantare",
        "Distanțe de plantare"
      ]
    }
  };

  function language(lang) {
    return lang === "ro" ? "ro" : "it";
  }

  function compactDescription(plant, lang) {
    if (!plant) return "";
    const code = language(lang);
    const type = plant.tipo || plant.arch || "foglia";
    return SPECIAL[code][plant.id] || GROUPS[code][type] || GROUPS[code].foglia;
  }

  function localizedName(plant, lang) {
    if (!plant) return "";
    const code = language(lang);
    return code === "ro"
      ? root.SERRA_I18N?.plants?.ro?.[plant.id]?.nome || plant.nome || plant.id
      : plant.nome || plant.id;
  }

  function cultivationNote(plant, lang) {
    if (!plant) return "";
    const code = language(lang);
    const note =
      code === "ro"
        ? root.SERRA_I18N?.plants?.ro?.[plant.id]?.nota || plant.nota || ""
        : plant.nota || "";
    const name = localizedName(plant, code).trim().toLocaleLowerCase(code);
    const separator = note.indexOf(":");
    if (
      separator > 0 &&
      note.slice(0, separator).trim().toLocaleLowerCase(code) === name
    ) {
      const clean = note.slice(separator + 1).trim();
      return clean ? clean[0].toLocaleUpperCase(code) + clean.slice(1) : "";
    }
    return note;
  }

  function cropGroup(plant) {
    return GROUP_BY_ID[plant?.id] || plant?.tipo || plant?.arch || "foglia";
  }

  function detailProfile(plant, guide, lang) {
    if (!plant) return null;
    const code = language(lang);
    const copy = DETAIL[code];
    const type = plant.tipo || plant.arch || "foglia";
    const values = copy.defaults[type] || copy.defaults.foglia;
    const overrides = copy.groups[cropGroup(plant)] || {};
    return {
      description: compactDescription(plant, code),
      soil: overrides.soil || values[0],
      exposure: guide?.esposizione || "",
      irrigation: overrides.water || guide?.annaffiatura || values[1],
      feeding: overrides.feed || values[2],
      maintenance: overrides.care || values[3],
      prevention: copy.prevention,
      harvestMethod: overrides.harvest || copy.harvest,
      storage: overrides.storage || copy.storage,
      rotation: copy.rotation
    };
  }

  function spacingLabel(plant, lang) {
    const copy = DETAIL[language(lang)];
    const group = cropGroup(plant);
    if (["directRoot", "leafyCut"].includes(group)) return copy.labels[0];
    if (["fruitVine", "cucurbit", "brassica"].includes(group))
      return copy.labels[1];
    return copy.labels[2];
  }

  root.SERRA_PLANT_CONTENT = {
    compactDescription,
    cultivationNote,
    localizedName,
    detailProfile,
    spacingLabel
  };
})(window);

// Escape HTML condiviso per i contenuti interpolati.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
}

// Genera nel browser un manuale PDF personalizzato per le colture di un ordine.
(function (root) {
  const PAGE_W = 1240;
  const PAGE_H = 1754;
  const MARGIN = 92;
  const GREEN = "#245b36";
  const GREEN_DARK = "#153d27";
  const GREEN_SOFT = "#e9f4e9";
  const CREAM = "#f8f4e9";
  const INK = "#203127";
  const MUTED = "#637167";

  const COPY = {
    it: {
      title: "Manuale di semina e coltivazione",
      eyebrow: "IL TUO ORTO, PASSO DOPO PASSO",
      intro:
        "Una guida personale con le indicazioni essenziali per iniziare, curare e raccogliere le varietà del tuo ordine.",
      order: "Ordine",
      preparedFor: "Preparato per",
      varieties: "varietà",
      pack: "confezione",
      packs: "confezioni",
      index: "Le colture del tuo ordine",
      sowing: "Periodo di semina",
      spacing: "Distanze consigliate",
      light: "Esposizione",
      water: "Acqua",
      harvest: "Primo raccolto",
      yield: "Resa indicativa",
      start: "Come iniziare",
      care: "Cura della coltura",
      companions: "Buone vicine",
      noCompanions: "Nessuna associazione specifica indicata.",
      disclaimer:
        "Le indicazioni sono orientative: clima locale, varietà e condizioni della serra possono modificare tempi e fabbisogni.",
      days: "giorni circa",
      kg: "kg per pianta",
      row: "sulla fila",
      rows: "tra le file",
      full: "Pieno sole",
      half: "Mezz'ombra",
      low: "Bassa",
      medium: "Media",
      high: "Alta",
      direct:
        "Prepara un letto fine e drenante, semina direttamente alla profondità indicata sulla confezione e mantieni il terreno appena umido fino alla germinazione.",
      transplant:
        "Avvia in vasetto o usa giovani piantine robuste. Trapianta con il pane di terra integro, rispettando le distanze e annaffiando subito al piede.",
      bulbs:
        "Sistema bulbi, spicchi o tuberi in terreno soffice e drenante, con germoglio o punta rivolti verso l'alto, poi compatta leggermente.",
      perennial:
        "Dedica una posizione stabile e ben preparata: è una coltura che può restare produttiva per più stagioni.",
      careLow:
        "Lascia asciugare leggermente lo strato superficiale tra le bagnature ed evita ristagni.",
      careMedium:
        "Mantieni un'umidità regolare, bagnando al piede quando il primo strato di terreno inizia ad asciugarsi.",
      careHigh:
        "Controlla spesso l'umidità e mantienila costante, senza lasciare acqua stagnante attorno alle radici.",
      footer: "Orto in Serra · Manuale personale di coltivazione"
    },
    ro: {
      title: "Manual de semănare și cultivare",
      eyebrow: "GRĂDINA TA, PAS CU PAS",
      intro:
        "Un ghid personal cu indicațiile esențiale pentru pornirea, îngrijirea și recoltarea soiurilor din comanda ta.",
      order: "Comanda",
      preparedFor: "Pregătit pentru",
      varieties: "soiuri",
      pack: "pachet",
      packs: "pachete",
      index: "Culturile din comanda ta",
      sowing: "Perioada de semănare",
      spacing: "Distanțe recomandate",
      light: "Expunere",
      water: "Apă",
      harvest: "Prima recoltă",
      yield: "Producție orientativă",
      start: "Cum începi",
      care: "Îngrijirea culturii",
      companions: "Vecine bune",
      noCompanions: "Nu este indicată o asociere specifică.",
      disclaimer:
        "Indicațiile sunt orientative: clima locală, soiul și condițiile din seră pot modifica perioadele și necesarul plantelor.",
      days: "zile aproximativ",
      kg: "kg per plantă",
      row: "pe rând",
      rows: "între rânduri",
      full: "Soare direct",
      half: "Semiumbră",
      low: "Redusă",
      medium: "Medie",
      high: "Ridicată",
      direct:
        "Pregătește un strat fin și bine drenat, seamănă direct la adâncimea de pe ambalaj și păstrează solul ușor umed până la germinare.",
      transplant:
        "Pornește în ghiveci sau folosește răsaduri viguroase. Transplantează cu balotul intact, respectă distanțele și udă imediat la bază.",
      bulbs:
        "Așază bulbii, cățeii sau tuberculii într-un sol afânat și drenat, cu mugurele orientat în sus, apoi tasează ușor.",
      perennial:
        "Alege un loc stabil și bine pregătit: această cultură poate rămâne productivă mai multe sezoane.",
      careLow:
        "Lasă stratul de la suprafață să se usuce ușor între udări și evită apa stagnantă.",
      careMedium:
        "Menține umiditatea constantă și udă la bază când primul strat al solului începe să se usuce.",
      careHigh:
        "Verifică des umiditatea și păstreaz-o constantă, fără apă stagnantă în jurul rădăcinilor.",
      footer: "Orto in Serra · Manual personal de cultivare"
    }
  };

  const DIRECT_IDS = new Set([
    "carota",
    "ravanello",
    "barbabietola",
    "rapa",
    "pastinaca",
    "radice_prezemolo",
    "daikon",
    "scorzonera",
    "rucola",
    "spinaci",
    "coriandolo",
    "aneto",
    "fagiolino",
    "fagiolo",
    "fava",
    "cece",
    "lenticchia",
    "pisello",
    "soia_edamame",
    "mais_dolce"
  ]);
  const BULB_IDS = new Set([
    "aglio",
    "cipolla",
    "cipolla_rossa",
    "cipollotto",
    "scalogno",
    "patata",
    "patata_dolce",
    "topinambur"
  ]);
  const PERENNIAL_IDS = new Set([
    "asparago",
    "carciofo",
    "fragola",
    "rosmarino",
    "salvia",
    "timo",
    "origano",
    "menta",
    "melissa",
    "erba_cipollina",
    "leustean"
  ]);

  function langCode(lang) {
    return lang === "ro" ? "ro" : "it";
  }

  function font(ctx, weight, size, family) {
    ctx.font = `${weight} ${size}px ${family || "DM Sans, Arial, sans-serif"}`;
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function wrapLines(ctx, text, maxWidth) {
    const words = String(text || "")
      .split(/\s+/)
      .filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth || !line)
        line = candidate;
      else {
        lines.push(line);
        line = word;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    let lines = wrapLines(ctx, text, maxWidth);
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      let last = lines[maxLines - 1];
      while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 1) {
        last = last.slice(0, -1);
      }
      lines[maxLines - 1] = `${last.trim()}…`;
    }
    lines.forEach((line, index) =>
      ctx.fillText(line, x, y + index * lineHeight)
    );
    return y + lines.length * lineHeight;
  }

  function newCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = PAGE_W;
    canvas.height = PAGE_H;
    return canvas;
  }

  function paintBackground(ctx) {
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);
    ctx.fillStyle = GREEN_DARK;
    ctx.fillRect(0, 0, 22, PAGE_H);
    ctx.fillStyle = "rgba(73, 122, 74, .07)";
    ctx.beginPath();
    ctx.arc(PAGE_W - 35, 45, 250, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLogo(ctx, logo, x, y, size) {
    if (logo) ctx.drawImage(logo, x, y, size, size);
    else {
      ctx.fillStyle = GREEN;
      roundedRect(ctx, x, y, size, size, 22);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      font(ctx, 700, size * 0.48);
      ctx.fillText("O", x + size / 2, y + size * 0.69);
      ctx.textAlign = "left";
    }
  }

  function drawBrand(ctx, logo, compact) {
    const size = compact ? 58 : 82;
    drawLogo(ctx, logo, MARGIN, compact ? 58 : 74, size);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, compact ? 27 : 34, "Fraunces, Georgia, serif");
    ctx.fillText(
      "Orto in Serra",
      MARGIN + size + 20,
      (compact ? 58 : 74) + size * 0.63
    );
  }

  // Ritaglia la fotografia senza deformarla e la inserisce in una cornice
  // coerente con le schede del manuale.
  function drawPhotoCover(ctx, image, x, y, w, h, radius) {
    ctx.save();
    roundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
    ctx.fillStyle = GREEN_SOFT;
    ctx.fillRect(x, y, w, h);
    if (image) {
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const drawW = image.naturalWidth * scale;
      const drawH = image.naturalHeight * scale;
      ctx.drawImage(
        image,
        x + (w - drawW) / 2,
        y + (h - drawH) / 2,
        drawW,
        drawH
      );
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(36, 91, 54, .18)";
    ctx.lineWidth = 3;
    roundedRect(ctx, x, y, w, h, radius);
    ctx.stroke();
  }

  function drawFooter(ctx, c, orderId, page, total) {
    const y = PAGE_H - 65;
    ctx.strokeStyle = "rgba(36, 91, 54, .2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(MARGIN, y - 30);
    ctx.lineTo(PAGE_W - MARGIN, y - 30);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    font(ctx, 500, 20);
    ctx.fillText(c.footer, MARGIN, y);
    ctx.textAlign = "right";
    ctx.fillText(`${orderId}  ·  ${page}/${total}`, PAGE_W - MARGIN, y);
    ctx.textAlign = "left";
  }

  function formatDate(value, lang) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString(lang === "ro" ? "ro-RO" : "it-IT", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
  }

  function getStartText(plant, c) {
    if (BULB_IDS.has(plant.id)) return c.bulbs;
    if (PERENNIAL_IDS.has(plant.id)) return c.perennial;
    if (DIRECT_IDS.has(plant.id)) return c.direct;
    return c.transplant;
  }

  function waterText(plant, c) {
    if (plant.acqua === "alta") return c.careHigh;
    if (plant.acqua === "bassa") return c.careLow;
    return c.careMedium;
  }

  function valueLabel(value, c) {
    if (value === "alta") return c.high;
    if (value === "bassa") return c.low;
    if (value === "mezzombra" || value === "mezza") return c.half;
    if (value === "pieno") return c.full;
    return c.medium;
  }

  function monthsLabel(plant, lang) {
    const months = root.SERRA_I18N?.months?.[lang] || [];
    return (
      (plant.mesi || []).map((m) => months[m - 1] || String(m)).join(" · ") ||
      "-"
    );
  }

  function localizedName(plant, lang) {
    return (
      root.SERRA_PLANT_CONTENT?.localizedName(plant, lang) ||
      plant.nome ||
      plant.id
    );
  }

  function fullUserName(user) {
    const firstName = String(user?.nome || "").trim();
    const lastName = String(user?.cognome || "").trim();
    if (lastName || !firstName)
      return [firstName, lastName].filter(Boolean).join(" ");
    return firstName;
  }

  function drawCover(ctx, logo, data, c, totalPages) {
    paintBackground(ctx);
    drawBrand(ctx, logo, false);
    ctx.fillStyle = GREEN;
    font(ctx, 700, 21);
    ctx.fillText(c.eyebrow, MARGIN, 305);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 79, "Fraunces, Georgia, serif");
    let y = drawWrapped(ctx, c.title, MARGIN, 395, 920, 88, 3);
    ctx.fillStyle = MUTED;
    font(ctx, 400, 32);
    y = drawWrapped(ctx, c.intro, MARGIN, y + 36, 930, 47, 4);

    ctx.fillStyle = "#fff";
    roundedRect(ctx, MARGIN, y + 60, PAGE_W - MARGIN * 2, 260, 30);
    ctx.fill();
    const metaY = y + 125;
    ctx.fillStyle = MUTED;
    font(ctx, 700, 19);
    ctx.fillText(c.order.toUpperCase(), MARGIN + 42, metaY);
    ctx.fillText(c.preparedFor.toUpperCase(), MARGIN + 440, metaY);
    ctx.fillStyle = INK;
    font(ctx, 700, 29);
    ctx.fillText(data.order.id || "-", MARGIN + 42, metaY + 43);
    ctx.fillText(
      fullUserName(data.user) || data.order.email || "-",
      MARGIN + 440,
      metaY + 43
    );
    ctx.fillStyle = MUTED;
    font(ctx, 500, 21);
    ctx.fillText(
      formatDate(data.order.date, data.lang),
      MARGIN + 42,
      metaY + 82
    );

    const countY = y + 390;
    ctx.fillStyle = GREEN_SOFT;
    roundedRect(ctx, MARGIN, countY, 360, 142, 24);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 48, "Fraunces, Georgia, serif");
    ctx.fillText(String(data.items.length), MARGIN + 35, countY + 62);
    font(ctx, 600, 22);
    ctx.fillText(c.varieties, MARGIN + 35, countY + 101);
    ctx.fillStyle = "#eef0e9";
    roundedRect(ctx, MARGIN + 390, countY, 360, 142, 24);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 48, "Fraunces, Georgia, serif");
    ctx.fillText(
      String(data.items.reduce((sum, item) => sum + item.quantity, 0)),
      MARGIN + 425,
      countY + 62
    );
    font(ctx, 600, 22);
    ctx.fillText(c.packs, MARGIN + 425, countY + 101);
    drawFooter(ctx, c, data.order.id || "-", 1, totalPages);
  }

  function drawFact(ctx, x, y, w, title, value) {
    ctx.fillStyle = "#fff";
    roundedRect(ctx, x, y, w, 126, 20);
    ctx.fill();
    ctx.fillStyle = MUTED;
    font(ctx, 700, 17);
    ctx.fillText(title.toUpperCase(), x + 24, y + 36);
    ctx.fillStyle = INK;
    font(ctx, 650, 23);
    drawWrapped(ctx, value, x + 24, y + 75, w - 48, 29, 2);
  }

  function drawPlantPage(ctx, logo, data, item, c, page, total) {
    paintBackground(ctx);
    drawBrand(ctx, logo, true);
    const plant = item.plant;
    const name = localizedName(plant, data.lang);
    ctx.fillStyle = GREEN;
    font(ctx, 700, 20);
    ctx.fillText(
      `${String(page - 1).padStart(2, "0")}  ·  ${item.quantity} ${item.quantity === 1 ? c.pack : c.packs}`,
      MARGIN,
      210
    );
    const photoSize = 210;
    const photoX = PAGE_W - MARGIN - photoSize;
    drawPhotoCover(ctx, item.photo, photoX, 214, photoSize, photoSize, 34);
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 64, "Fraunces, Georgia, serif");
    let y = drawWrapped(ctx, name, MARGIN, 286, photoX - MARGIN - 34, 72, 2);
    ctx.fillStyle = MUTED;
    font(ctx, 400, 27);
    const desc =
      root.SERRA_PLANT_CONTENT?.compactDescription(plant, data.lang) || "";
    y =
      drawWrapped(ctx, desc, MARGIN, y + 20, photoX - MARGIN - 34, 39, 3) + 30;

    const gap = 18;
    const factW = (PAGE_W - MARGIN * 2 - gap * 2) / 3;
    drawFact(ctx, MARGIN, y, factW, c.sowing, monthsLabel(plant, data.lang));
    drawFact(
      ctx,
      MARGIN + factW + gap,
      y,
      factW,
      c.spacing,
      `${plant.d || "-"} cm ${c.row} · ${plant.dr || plant.d || "-"} cm ${c.rows}`
    );
    drawFact(
      ctx,
      MARGIN + (factW + gap) * 2,
      y,
      factW,
      c.light,
      valueLabel(plant.sole, c)
    );
    y += 144;
    drawFact(ctx, MARGIN, y, factW, c.water, valueLabel(plant.acqua, c));
    drawFact(
      ctx,
      MARGIN + factW + gap,
      y,
      factW,
      c.harvest,
      `${plant.gg || "-"} ${c.days}`
    );
    drawFact(
      ctx,
      MARGIN + (factW + gap) * 2,
      y,
      factW,
      c.yield,
      `${plant.resa || "-"} ${c.kg}`
    );
    y += 184;

    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 31, "Fraunces, Georgia, serif");
    ctx.fillText(c.start, MARGIN, y);
    ctx.fillStyle = INK;
    font(ctx, 400, 24);
    y =
      drawWrapped(
        ctx,
        getStartText(plant, c),
        MARGIN,
        y + 43,
        PAGE_W - MARGIN * 2,
        35,
        4
      ) + 45;

    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 31, "Fraunces, Georgia, serif");
    ctx.fillText(c.care, MARGIN, y);
    const localizedNote =
      root.SERRA_PLANT_CONTENT?.cultivationNote(plant, data.lang) || "";
    ctx.fillStyle = INK;
    font(ctx, 400, 24);
    y =
      drawWrapped(
        ctx,
        `${waterText(plant, c)} ${localizedNote}`,
        MARGIN,
        y + 43,
        PAGE_W - MARGIN * 2,
        35,
        5
      ) + 44;

    ctx.fillStyle = GREEN_SOFT;
    roundedRect(ctx, MARGIN, y, PAGE_W - MARGIN * 2, 112, 22);
    ctx.fill();
    ctx.fillStyle = GREEN_DARK;
    font(ctx, 700, 19);
    ctx.fillText(c.companions.toUpperCase(), MARGIN + 28, y + 36);
    ctx.fillStyle = INK;
    font(ctx, 500, 22);
    const friends = (plant.amiche || [])
      .map((id) => data.byId[id])
      .filter(Boolean)
      .slice(0, 6)
      .map((friend) => localizedName(friend, data.lang));
    drawWrapped(
      ctx,
      friends.join(" · ") || c.noCompanions,
      MARGIN + 28,
      y + 76,
      PAGE_W - MARGIN * 2 - 56,
      28,
      1
    );

    ctx.fillStyle = MUTED;
    font(ctx, 400, 18);
    drawWrapped(
      ctx,
      c.disclaimer,
      MARGIN,
      PAGE_H - 142,
      PAGE_W - MARGIN * 2,
      26,
      2
    );
    drawFooter(ctx, c, data.order.id || "-", page, total);
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      if (/^https?:/i.test(src || "")) image.crossOrigin = "anonymous";
      image.src = src;
    });
  }

  function photoSource(plant) {
    if (typeof root.resolvePlantPhoto === "function") {
      return root.resolvePlantPhoto(plant, plant.id);
    }
    if (plant.foto) return plant.foto;
    return `assets/img/photo/${plant.id}.webp`;
  }

  function dataUrlBytes(url) {
    const binary = atob(url.split(",")[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function makePdf(jpegs) {
    const encoder = new TextEncoder();
    const chunks = [];
    const offsets = [0];
    let length = 0;
    const add = (value) => {
      const bytes = typeof value === "string" ? encoder.encode(value) : value;
      chunks.push(bytes);
      length += bytes.length;
    };
    const objectCount = 2 + jpegs.length * 3;
    const pageIds = jpegs.map((_, index) => 3 + index * 3 + 2);
    add("%PDF-1.4\n%OrtoInSerra\n");
    const addObject = (id, bodyParts) => {
      offsets[id] = length;
      add(`${id} 0 obj\n`);
      bodyParts.forEach(add);
      add("\nendobj\n");
    };
    addObject(1, [`<< /Type /Catalog /Pages 2 0 R >>`]);
    addObject(2, [
      `<< /Type /Pages /Count ${jpegs.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`
    ]);
    jpegs.forEach((jpeg, index) => {
      const imageId = 3 + index * 3;
      const contentId = imageId + 1;
      const pageId = imageId + 2;
      const stream = "q\n595 0 0 842 0 0 cm\n/Im0 Do\nQ\n";
      addObject(imageId, [
        `<< /Type /XObject /Subtype /Image /Width ${PAGE_W} /Height ${PAGE_H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
        jpeg,
        "\nendstream"
      ]);
      addObject(contentId, [
        `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}endstream`
      ]);
      addObject(pageId, [
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`
      ]);
    });
    const xrefOffset = length;
    add(`xref\n0 ${objectCount + 1}\n`);
    add("0000000000 65535 f \n");
    for (let id = 1; id <= objectCount; id += 1) {
      add(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
    }
    add(
      `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
    );
    return new Blob(chunks, { type: "application/pdf" });
  }

  function cleanFilename(value) {
    return String(value || "ordine")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function create(options) {
    const lang = langCode(options.lang);
    const c = COPY[lang];
    const byId = Object.fromEntries(
      (options.plants || []).map((plant) => [plant.id, plant])
    );
    const merged = new Map();
    (options.order.items || []).forEach((orderItem) => {
      const plant = byId[orderItem.id];
      if (!plant) return;
      const current = merged.get(plant.id) || { plant, quantity: 0 };
      current.quantity += Number(orderItem.bustine || orderItem.quantity || 1);
      merged.set(plant.id, current);
    });
    const items = [...merged.values()].sort((a, b) =>
      localizedName(a.plant, lang).localeCompare(
        localizedName(b.plant, lang),
        lang === "ro" ? "ro" : "it"
      )
    );
    if (!items.length) throw new Error("No plants in order");
    const itemsWithPhotos = await Promise.all(
      items.map(async (item) => ({
        ...item,
        photo: await loadImage(photoSource(item.plant))
      }))
    );
    const data = { ...options, lang, items: itemsWithPhotos, byId };
    const logo = await loadImage("assets/img/svg/logo.svg");
    const canvases = [];
    const cover = newCanvas();
    drawCover(
      cover.getContext("2d"),
      logo,
      data,
      c,
      itemsWithPhotos.length + 1
    );
    canvases.push(cover);
    itemsWithPhotos.forEach((item, index) => {
      const canvas = newCanvas();
      drawPlantPage(
        canvas.getContext("2d"),
        logo,
        data,
        item,
        c,
        index + 2,
        itemsWithPhotos.length + 1
      );
      canvases.push(canvas);
    });
    const jpegs = canvases.map((canvas) =>
      dataUrlBytes(canvas.toDataURL("image/jpeg", 0.88))
    );
    return makePdf(jpegs);
  }

  root.SERRA_PLANT_MANUAL = {
    async download(options) {
      const blob = await create(options);
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `manuale-coltivazione-${cleanFilename(options.order.id)}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(href), 3000);
      return blob;
    },
    create
  };
})(window);
