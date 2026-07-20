// Raccoglie costanti, dizionari e dati statici necessari al configuratore.
const WALL = 7;
// Bordo libero tra pareti e terreno: compatto, ma sufficiente a mantenere
// leggibile il perimetro della serra senza sottrarre troppo spazio coltivabile.
const MARGIN = 7;
const PATH = 34;
const BED_GAP = 6;
const BEDPAD = 9;
const MIN_VISUAL_GLYPH_R = 8;

const MESI = [
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
const MONTHS = window.SERRA_I18N?.months || { it: MESI, ro: MESI };
const I18N = window.SERRA_I18N?.configurator || { it: {}, ro: {} };
const SITE_I18N = window.SERRA_I18N?.index || { it: {}, ro: {} };

// Definisce le colture disponibili con caratteristiche agronomiche e commerciali.
const PLANTS = window.PLANTS;
const BYID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));

// Associa a ogni coltura un livello di difficoltà mostrato nei percorsi guidati.
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

const EXOTIC_PLANTS = new Set([
  "mais_dolce",
  "tomatillo",
  "physalis",
  "cucamelon",
  "stevia_dolce",
  "shiso"
]);
const CAT_ORDER = [
  {
    key: "frutti",
    ids: [
      "pomodoro",
      "peperone",
      "peperoncino",
      "melanzana",
      "zucchina",
      "zucca",
      "cetriolo",
      "melone",
      "anguria",
      "fragola",
      "mais_dolce",
      "tomatillo",
      "physalis",
      "cucamelon",
      "friggitello"
    ]
  },
  {
    key: "foglie",
    ids: [
      "lattuga",
      "rucola",
      "spinaci",
      "bietola",
      "cicoria",
      "indivia",
      "pakchoi",
      "valerianella",
      "radicchio",
      "loboda",
      "stevia_dolce",
      "asparago",
      "carciofo",
      "cardo",
      "crescione",
      "mizuna",
      "senape_foglia",
      "tatsoi",
      "cavolo_cinese",
      "cavolo_rosso",
      "broccolo_rapa",
      "agretti",
      "catalogna",
      "acetosa"
    ]
  },
  {
    key: "radici",
    ids: [
      "carota",
      "ravanello",
      "barbabietola",
      "rapa",
      "finocchio",
      "cipolla",
      "aglio",
      "porro",
      "scalogno",
      "pastinaca",
      "radice_prezemolo",
      "sedano_rapa",
      "rafano",
      "patata",
      "patata_dolce",
      "cipolla_rossa",
      "cipollotto",
      "daikon",
      "scorzonera",
      "topinambur",
      "cavolo_navone"
    ]
  },
  {
    key: "aromatiche",
    ids: [
      "basilico",
      "prezzemolo",
      "aneto",
      "coriandolo",
      "timo",
      "origano",
      "salvia",
      "rosmarino",
      "erba_cipollina",
      "leustean",
      "dragoncello",
      "menta",
      "maggiorana",
      "camomilla",
      "shiso",
      "borragine",
      "leurda",
      "melissa",
      "cerfoglio",
      "cimbru"
    ]
  },
  {
    key: "legumi",
    ids: [
      "fagiolino",
      "fagiolo",
      "pisello",
      "fava",
      "soia_edamame",
      "cece",
      "lenticchia",
      "fagiolo_borlotto"
    ]
  },
  {
    key: "cavoli",
    ids: [
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa",
      "cavoletti",
      "sedano",
      "broccolo_romanesco"
    ]
  }
];

// Mappa colture e categorie alle rappresentazioni visive usate nell'interfaccia.
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
const PLANT_RO = window.SERRA_I18N?.plants?.ro || {};

// Contiene descrizioni localizzate per la scheda informativa delle piante.
const PLANT_DESC = {
  it: {
    pomodoro:
      "Ortaggio estivo della famiglia delle Solanacee, declinato in centinaia di varietà: ciliegino, costoluto, da sugo. Ricco di licopene e vitamina C.",
    peperone:
      "Frutto dolce delle Solanacee, disponibile in rosso, giallo e verde. Ricco di vitamina C, ottimo crudo, arrostito o ripieno.",
    peperoncino:
      "Varietà piccante del genere Capsicum, con intensità dal delicato al fuoco puro. Contiene capsaicina con proprietà antiossidanti.",
    melanzana:
      "Ortaggio viola dalla polpa morbida e spugnosa. Versatile in cucina: parmigiana, grigliate e ripieni.",
    zucchina:
      "Frutto estivo che si raccoglie giovane a 15-20 cm; cresce velocissima. Saltata, grigliata, in pasta e i fiori si friggono.",
    zucca:
      "Cucurbita autunnale dalle dimensioni generose; si conserva per mesi in luogo fresco. Usata in zuppe, risotti e gnocchi.",
    cetriolo:
      "Frutto fresco e idratante, oltre il 95% acqua. Cresce su sostegni e si consuma crudo in insalata o in conserva sottaceto.",
    melone:
      "Frutto estivo dolce e profumato; varietà retate, lisce e invernali. Ricco di betacarotene e vitamina A.",
    anguria:
      "Frutto estivo famoso per la polpa rossa ricca d'acqua. Una delle colture più vistose: può superare i 10 kg a pianta.",
    lattuga:
      "Insalata a cespo rapidissima da coltivare in quasi tutte le stagioni. Disponibile in versione iceberg, romana, a foglie spezzate e rossa.",
    radicchio:
      "Cicoria a cespo rosso-bordeaux con nervature bianche. Il gusto amarognolo si attenua col freddo invernale.",
    rucola:
      "Insalata a foglia piccante e aromatica; cresce in poche settimane e si può raccogliere più volte tagliando dall'esterno.",
    spinaci:
      "Foglia verde ricca di ferro, folati e vitamina K; pronta in 35-45 giorni. Predilige il fresco e va in fiore d'estate.",
    bietola:
      "Pianta dalle grandi foglie con coste colorate in bianco, rosso o giallo. Si raccoglie progressivamente per mesi interi.",
    cavolo:
      "Brassicacea invernale a testa compatta, ricca di vitamina C. Predilige temperature fresche e suoli fertili.",
    verza:
      "Cavolo con foglie bollose e crespute, più tenere rispetto al cappuccio. Più saporita dopo le prime brinate.",
    broccolo:
      "Brassicacea dal capolino verde composto da tanti fioretti. Dopo il taglio principale continua a produrre getti laterali.",
    cavolfiore:
      "Testa bianca e compatta formata da fioretti. Si piegano le foglie esterne sulla testa per mantenerla candida.",
    cavolonero:
      "Kale toscano dalle foglie scure e bollose, ricco di antiossidanti. Si raccoglie foglia per foglia per tutta la stagione fredda.",
    cavolorapa:
      "Brassicacea dal fusto ingrossato a forma di sfera, sapore tra cavolo e rapa. Si raccoglie giovane, quando è ancora tenero.",
    carota:
      "Radice dolce e croccante in arancio, viola e gialla. Richiede suolo profondo e soffice per crescere dritta e lunga.",
    finocchio:
      "Bulbo bianco-verde dal caratteristico sapore di anice. Si usa crudo in pinzimonio, brasato o in insalata.",
    prezzemolo:
      "Erba aromatica indispensabile nella cucina italiana. Lenta a partire, poi produce foglie per mesi interi.",
    basilico:
      "Re delle erbe aromatiche italiane, con aroma intenso e fresco. Protagonista del pesto genovese, si abbina perfettamente al pomodoro.",
    coriandolo:
      "Erba aromatica dai semi speziati e foglie fresche. Usata nella cucina asiatica, messicana e mediorientale.",
    aneto:
      "Pianta aromatica piumosa dal profumo simile all'anice. Alleata dei cavoli in orto, si abbina al pesce e ai sottaceti.",
    cipolla:
      "Bulbo indispensabile nella cucina mondiale, in bianco, giallo e rosso. Sapore che va dal dolce al pungente a seconda della varietà.",
    aglio:
      "Bulbo composto da spicchi, con proprietà antibatteriche e aromatizzanti. Si conserva facilmente per mesi in luogo asciutto.",
    porro:
      "Parente della cipolla dal fusto bianco allungato e sapore delicato. Ideale in zuppe, torte salate e risotti.",
    scalogno:
      "Bulbo simile alla cipolla ma più piccolo e raffinato. Sapore dolce e delicato, perfetto crudo o in soffritti.",
    fagiolino:
      "Legume nano dal baccello verde croccante, senza bisogno di sostegno. Come tutti i legumi, arricchisce il terreno di azoto.",
    fagiolo:
      "Legume rampicante che può superare i 2 metri. Consumato fresco o secco, è una delle colture più nutrienti dell'orto.",
    pisello:
      "Legume dal gusto dolce, seminato in autunno-inverno nelle zone miti. Si raccoglie in baccelli o sgranato.",
    fragola:
      "Piccolo frutto rosso profumato; pianta perenne che produce per più anni. Si moltiplica naturalmente via stoloni.",
    sedano:
      "Ortaggio dalle coste croccanti e dal profumo intenso. Usato crudo, in soffritto o come aromatizzante per brodi.",
    ravanello:
      "Radice piccante e croccante in rosso, bianco e rosa. La coltura più rapida dell'orto: pronta in soli 3-4 settimane.",
    barbabietola:
      "Radice ricca di pigmenti antiossidanti (betalaine) e zuccheri. Cotta in insalate, al forno, in succo o fermentata.",
    cicoria:
      "Foglia amarognola della famiglia delle Asteracee. Rustica e versatile: cruda in insalata, ripassata in padella o lessata.",
    indivia:
      "Insalata a cespo compatto (scarola) o riccio. Il sapore amaro si attenua legando il cespo prima del raccolto.",
    pakchoi:
      "Cavolo cinese tenero e veloce; pronto in 45 giorni. Si salta in padella o si usa crudo in insalata.",
    cavoletti:
      "Piccoli cavolini che crescono lungo uno stelo alto. Maturano lentamente e sono più saporiti dopo il gelo.",
    rapa: "Radice brassicacea bianca con cima viola, tenera e veloce in stagione fredda. Cotta, saltata o in stufati.",
    valerianella:
      "Piccola insalata invernale a rosetta di foglie tondeggianti. Tenera, leggera, con delicato sapore di nocciola.",
    rosmarino:
      "Arbusto sempreverde aromatico del Mediterraneo. In cucina con carne, patate e pane; si conserva fresco per settimane.",
    timo: "Erba perenne aromatica dal profumo intenso e terroso. Usata con carni, legumi e formaggi; tappezzante in giardino.",
    origano:
      "Erba aromatica caratteristica della cucina mediterranea. Protagonista sulla pizza e nei sughi; si secca perfettamente.",
    salvia:
      "Pianta aromatica perenne dalle foglie vellutate grigio-verdi. Usata con carne, burro e pasta fresca.",
    pastinaca: "Dolce dopo il freddo; semina diretta e terreno profondo.",
    radice_prezemolo:
      "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe.",
    sedano_rapa:
      "Radice globosa e profumata; vuole acqua costante e suolo ricco.",
    rafano:
      "Radice piccante molto usata in Romania; contenila perché è vigorosa.",
    patata:
      "In serra anticipa il raccolto; rincalza quando gli steli crescono.",
    patata_dolce: "Ama caldo stabile e suolo leggero; ideale in serra lunga.",
    cipolla_rossa: "Bulbo dolce e colorato; ottima per raccolti scalari.",
    cipollotto:
      "Pronto rapidamente; raccogli giovane prima che ingrossi troppo.",
    erba_cipollina: "Aromatica perenne; taglia spesso per foglie tenere.",
    loboda:
      "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco.",
    stevia_dolce: "Acetosa per minestre primaverili; raccogli foglie giovani.",
    leustean: "Il profumo classico delle ciorbe rumene; perenne e vigoroso.",
    dragoncello: "Aromatica fine per aceti e conserve; evita ristagni.",
    menta: "Molto vigorosa: meglio in vaso o area controllata.",
    maggiorana: "Aromatica delicata; ama caldo, luce e terreno drenato.",
    camomilla: "Fiori per tisane; attira insetti utili e profuma la serra.",
    mais_dolce:
      "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi.",
    tomatillo:
      "Serve almeno due piante per fruttificare bene; ottimo per salse.",
    physalis: "Frutti dolci in lanterna; in serra matura meglio.",
    cucamelon: "Piccoli frutti croccanti; produttivo su rete in serra.",
    asparago: "Perenne: richiede pazienza, ma produce per molti anni.",
    carciofo: "Coltura grande e decorativa; proteggi dal gelo intenso.",
    cardo: "Parente del carciofo; imbianchisci le coste prima del raccolto.",
    crescione:
      "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti.",
    mizuna: "Senape giapponese facile; foglie frastagliate per mix insalata.",
    senape_foglia:
      "Foglie piccanti; semina in fresco per evitare fioritura precoce.",
    tatsoi: "Rosetta compatta, molto resistente al freddo.",
    cavolo_cinese: "Forma un cespo tenero; proteggi da caldo e stress idrico.",
    daikon:
      "Ravanello lungo: terreno profondo e raccolta prima che lignifichi.",
    scorzonera: "Radice nera lunga; richiede suolo leggero e profondo.",
    topinambur:
      "Tubero rustico e produttivo; delimita lo spazio perché si espande.",
    fava: "Legume precoce e resistente al fresco; migliora il terreno.",
    soia_edamame:
      "Raccogli i baccelli verdi quando i semi sono pieni ma teneri.",
    cece: "Ama asciutto e caldo; non eccedere con acqua in serra.",
    lenticchia: "Piccolo legume rustico; adatto a bordure asciutte.",
    fagiolo_borlotto: "Per baccelli freschi o granella; usa tutori robusti.",
    cavolo_rosso: "Cespo compatto e colorato; ottimo per raccolti autunnali.",
    cavolo_navone: "Radice grande e rustica; utile per autunno e inverno.",
    broccolo_rapa: "Raccogli cime e foglie prima della piena fioritura.",
    shiso: "Aromatica asiatica profumata; bella anche in vaso in serra.",
    broccolo_romanesco:
      "Varietà di broccolo con caratteristica testa conico-spiralata. Saborita e ornamentale.",
    friggitello:
      "Peperone dolce allungato tipico del centro-sud Italia. Ottimo fritto o in padella.",
    agretti:
      "Ortaggio primaverile a steli sottili carnosi. Si consuma lessato con olio d'oliva e limone.",
    borragine:
      "Foglie e fiori azzurri commestibili. Attira impollinatori; ottima vicino a pomodori e cetrioli.",
    catalogna:
      "Cicoria romana: le puntarelle centrali si gustano crude con acciughe e aglio.",
    acetosa:
      "Foglie acidule dalle note di limone, ottime nelle zuppe. Perenne: torna ogni anno.",
    leurda:
      "Aglio selvatico dai sapori delicati; foglie usate in pesto, zuppe e frittate primaverili.",
    melissa:
      "Perenne profumata al limone. Tienila in zona controllata: si diffonde rapidamente.",
    cerfoglio:
      "Aromatica primaverile dal sapore delicato tra prezzemolo e anice. Va usata solo fresca.",
    cimbru:
      "Santoreggia estiva dall'aroma intenso simile al timo. Fondamentale in Romania per fagioli e sottaceti."
  },
  ro: {
    pomodoro:
      "Legumă estivală din familia Solanaceae, în sute de soiuri. Bogată în licopen și vitamina C.",
    peperone:
      "Fruct dulce disponibil în roșu, galben și verde. Bogat în vitamina C, excelent crud, copt sau umplut.",
    peperoncino:
      "Soi picant din genul Capsicum, de la ușor la foarte iute. Conține capsaicină cu proprietăți antioxidante.",
    melanzana:
      "Legumă violet cu miez moale și spongios. Versatilă: parmigiana, grătar, umpluturi.",
    zucchina:
      "Fruct de vară cules tânăr, la 15-20 cm; crește rapid. Sotat, la grătar, în paste și flori prăjite.",
    zucca:
      "Cucurbitacee de toamnă; se conservă luni întregi. Folosită în supe, risotto și gnocchi.",
    cetriolo:
      "Fruct proaspăt, peste 95% apă. Crește pe suporturi și se folosește crud sau murat.",
    melone:
      "Fruct estival dulce și parfumat în soiuri retate, netede și de iarnă. Bogat în betacaroten.",
    anguria:
      "Fruct de vară cu miez roșu plin de apă. Una dintre cele mai impresionante culturi, peste 10 kg.",
    lattuga:
      "Salată rapidă, cultivabilă aproape în orice sezon. Soiuri iceberg, romane, frunze și roșii.",
    radicchio:
      "Cicoare cu căpățână roșu-bordeaux și nervuri albe. Gustul amar se atenuează cu frigul.",
    rucola:
      "Frunze picante și aromatice; gata în câteva săptămâni, se recoltează de mai multe ori.",
    spinaci:
      "Frunze bogate în fier și vitamina K; gata în 35-45 zile. Preferă răcoarea.",
    bietola:
      "Plantă cu frunze mari și cozi colorate. Se recoltează treptat luni întregi.",
    cavolo:
      "Brasicacee de iarnă cu căpățână compactă, bogată în vitamina C. Preferă frigul.",
    verza:
      "Varză cu frunze bulbucate și crestate, mai fragedă. Mai gustoasă după brume.",
    broccolo:
      "Brasicacee cu inflorescență verde din mulți muguri. Produce lăstari laterali după recoltare.",
    cavolfiore:
      "Căpățână albă compactă formată din muguri. Frunzele se îndoaie peste ea pentru albire.",
    cavolonero:
      "Kale toscan cu frunze întunecate, bogat în antioxidanți. Recoltat frunză cu frunză toamna-iarna.",
    cavolorapa:
      "Brasicacee cu tulpina îngroșată sferic, gust delicat. Se recoltează tânără.",
    carota:
      "Rădăcină dulce și crocantă în portocaliu, violet și galben. Necesită sol adânc și afânat.",
    finocchio:
      "Bulb alb-verde cu gust caracteristic de anason. Crud, braizat sau în salate.",
    prezzemolo:
      "Plantă aromatică indispensabilă în bucătăria italiană. Pornește lent, dar produce luni întregi.",
    basilico:
      "Regina plantelor aromatice italiene, aromă intensă. Vedeta pesto-ului, perfect cu roșiile.",
    coriandolo:
      "Plantă aromatică cu semințe condimentate și frunze proaspete. Folosită în bucătăria asiatică și mexicană.",
    aneto:
      "Plantă aromatică cu miros de anason. Aliată a verzelor, se folosește cu pește și murături.",
    cipolla:
      "Bulb indispensabil în bucătăria mondială, în alb, galben și roșu. Gust de la dulce la înțepător.",
    aglio:
      "Bulb compus din căței cu proprietăți antibacteriene. Se conservă ușor luni întregi.",
    porro:
      "Rudă a cepei cu tulpina albă alungită și aromă delicată. Ideală în supe și tarte sărate.",
    scalogno:
      "Bulb mic și rafinat, asemănător cepei. Aromă dulce și delicată, perfect crud sau sotat.",
    fagiolino:
      "Fasole pitică fără nevoie de suport. Ca leguminoasă, îmbogățește solul cu azot.",
    fagiolo:
      "Fasole urcătoare peste 2 metri. Consumată proaspătă sau uscată, foarte hrănitoare.",
    pisello:
      "Leguminoasă dulce, semănată toamna-iarna. Se recoltează în păstăi sau boabe.",
    fragola:
      "Fruct mic roșu parfumat; plantă perenă ce produce mai mulți ani. Se înmulțește prin stoloni.",
    sedano:
      "Legumă cu coaste crocante și miros intens. Crud, în sofrito sau în supe.",
    ravanello:
      "Rădăcină picantă și crocantă, roșie, albă sau roz. Cea mai rapidă cultură: gata în 3-4 săptămâni.",
    barbabietola:
      "Rădăcină bogată în pigmenți antioxidanți și zaharuri. Coaptă, la cuptor, ca suc sau fermentată.",
    cicoria:
      "Frunze amare din familia Asteraceae. Rustică: crudă, sotată sau fiartă.",
    indivia:
      "Salată cu căpățână compactă sau creațe. Gustul amar se atenuează legând căpățâna.",
    pakchoi:
      "Varză chinezească fragedă și rapidă; gata în 45 zile. Sotată sau crudă în salate.",
    cavoletti:
      "Muguri mici de-a lungul unui tulpin înalt. Se maturizează lent și sunt mai buni după îngheț.",
    rapa: "Rădăcină brasicacee albă cu vârf violet. Rapidă în sezonul rece; fiartă sau sotată.",
    valerianella:
      "Salată mică de iarnă cu frunze rotunde. Fragedă, ușoară, cu gust de alune.",
    rosmarino:
      "Arbust sempervirescent aromatic din Mediterana. Cu carne, cartofi și pâine.",
    timo: "Plantă perenă aromatică cu miros intens. Cu carne, leguminoase și brânzeturi.",
    origano:
      "Plantă aromatică mediteraneeană. Vedeta pizzei și sosurilor; se usucă perfect.",
    salvia:
      "Plantă perenă cu frunze catifelate cenușiu-verzi. Cu carne, unt și paste proaspete.",
    pastinaca: "Păstârnac",
    radice_prezemolo: "Pătrunjel rădăcină",
    sedano_rapa: "Țelină rădăcină",
    rafano: "Hrean",
    patata: "Cartof",
    patata_dolce: "Cartof dulce",
    cipolla_rossa: "Ceapă roșie",
    cipollotto: "Ceapă verde",
    erba_cipollina: "Chives / Cepșoară",
    loboda: "Lobodă",
    stevia_dolce: "Ștevie",
    leustean: "Leuștean",
    dragoncello: "Tarhon",
    menta: "Mentă",
    maggiorana: "Măghiran",
    camomilla: "Mușețel",
    mais_dolce: "Porumb dulce",
    tomatillo: "Tomatillo",
    physalis: "Physalis",
    cucamelon: "Cucamelon",
    asparago: "Sparanghel",
    carciofo: "Anghinare",
    cardo: "Cardon",
    crescione: "Năsturel",
    mizuna: "Mizuna",
    senape_foglia: "Muștar frunze",
    tatsoi: "Tatsoi",
    cavolo_cinese: "Varză chinezească",
    daikon: "Daikon",
    scorzonera: "Scorțonera",
    topinambur: "Topinambur",
    fava: "Bob",
    soia_edamame: "Soia edamame",
    cece: "Năut",
    lenticchia: "Linte",
    fagiolo_borlotto: "Fasole pestriță",
    cavolo_rosso: "Varză roșie",
    cavolo_navone: "Gulie furajeră / Nap",
    broccolo_rapa: "Rapini",
    shiso: "Shiso",
    broccolo_romanesco: "Broccoli romanesc",
    friggitello: "Ardei friggitello",
    agretti: "Agretti",
    borragine: "Borago",
    catalogna: "Catalogna / Puntarelle",
    acetosa: "Macriș",
    leurda: "Leurdă",
    melissa: "Melisă",
    cerfoglio: "Hasmațuchi",
    cimbru: "Cimbru"
  }
};

// Contiene istruzioni localizzate per semina, trapianto e raccolta delle colture.
const SOWING_GUIDE = {
  pomodoro: {
    method:
      "Semina in vasetto o alveolo al caldo; in serra si trapianta una piantina robusta.",
    depth: "0,5-1 cm",
    thin: "Trapianta quando ha 4-6 foglie vere, lasciando 50 cm sulla fila e 80 cm tra file.",
    tip: "Interra leggermente il fusto e prepara subito tutore o filo verticale."
  },
  peperone: {
    method:
      "Semina protetta in alveolo; meglio trapiantare piante già formate.",
    depth: "0,5 cm",
    thin: "Trapianta a 40 cm sulla fila e 60 cm tra file quando le notti sono miti.",
    tip: "Germina lentamente: serve caldo costante e terreno mai zuppo."
  },
  peperoncino: {
    method: "Semina protetta in alveolo, con molto calore iniziale.",
    depth: "0,5 cm",
    thin: "Trapianta a 35 cm sulla fila e 50 cm tra file.",
    tip: "Mantieni asciutto tra un'annaffiatura e l'altra: radica meglio."
  },
  melanzana: {
    method: "Semina in semenzaio caldo; in serra conviene trapiantare.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 80 cm tra file.",
    tip: "Ama terreno caldo: evita trapianti anticipati in substrato freddo."
  },
  zucchina: {
    method:
      "Semina diretta a postarella o in vasetto da trapiantare con pane integro.",
    depth: "2-3 cm",
    thin: "Lascia 1 pianta ogni 80 cm sulla fila e 100 cm tra file.",
    tip: "Metti 2 semi per buca e tieni la piantina più vigorosa."
  },
  zucca: {
    method:
      "Semina diretta a postarella o in vaso grande, poi trapianto delicato.",
    depth: "2-3 cm",
    thin: "Lascia 1 pianta ogni 100 cm sulla fila e 130 cm tra file.",
    tip: "Dalle spazio fin dall'inizio: soffre se viene compressa."
  },
  cetriolo: {
    method:
      "Semina diretta o in vasetto; in serra rende bene su rete verticale.",
    depth: "1,5-2 cm",
    thin: "Lascia 40 cm sulla fila e 100 cm tra file o sostegni.",
    tip: "Trapianta senza rompere le radici e lega presto i tralci."
  },
  melone: {
    method:
      "Semina a postarella o in vasetto caldo, poi trapianto con pane integro.",
    depth: "2 cm",
    thin: "Lascia 90 cm sulla fila e 120 cm tra file.",
    tip: "Pacciama e bagna al piede; riduci l'acqua quando i frutti maturano."
  },
  anguria: {
    method: "Semina a postarella o in vaso grande, solo con terreno ben caldo.",
    depth: "2-3 cm",
    thin: "Lascia 120 cm sulla fila e 150 cm tra file.",
    tip: "In serra piccola usa poche piante: ogni pianta occupa molto volume."
  },
  lattuga: {
    method:
      "Semina in alveolo o a spaglio leggero; trapianto consigliato per cespi ordinati.",
    depth: "0,3-0,5 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 30 cm tra file.",
    tip: "Semina poco e spesso per raccolte scalari."
  },
  radicchio: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5 cm",
    thin: "Trapianta a 30 cm sulla fila e 35 cm tra file.",
    tip: "Per cespi compatti evita eccesso di azoto e caldo intenso."
  },
  rucola: {
    method: "Semina diretta a file o a spaglio fitto.",
    depth: "0,5 cm",
    thin: "Dirada a 15 cm sulla fila e 20 cm tra file se vuoi piante grandi.",
    tip: "Per baby leaf puoi tenerla più fitta e tagliare giovane."
  },
  spinaci: {
    method: "Semina diretta a file nel letto ben fine.",
    depth: "1-2 cm",
    thin: "Dirada a 20 cm sulla fila e 25 cm tra file.",
    tip: "Ama fresco e umidità costante; col caldo monta a seme."
  },
  bietola: {
    method:
      "Semina diretta o in alveolo; i semi sono glomeruli con più piantine.",
    depth: "1-2 cm",
    thin: "Dirada a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli foglie esterne senza tagliare il cuore."
  },
  cavolo: {
    method: "Semina in semenzaio o alveolo, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Interra bene il colletto e mantieni umidità regolare."
  },
  verza: {
    method: "Semina in semenzaio o alveolo e trapianta piante robuste.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Tiene bene il fresco: programma raccolte autunnali/invernali."
  },
  broccolo: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Non far asciugare durante formazione del corimbo."
  },
  cavolfiore: {
    method: "Semina in alveolo e trapianta senza stress idrico.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Richiede crescita continua: evita sbalzi di acqua e nutrienti."
  },
  cavolonero: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 45 cm sulla fila e 60 cm tra file.",
    tip: "Raccogli foglia per foglia dal basso verso l'alto."
  },
  cavolorapa: {
    method: "Semina diretta o in alveolo, poi trapianto precoce.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli giovane: se resta troppo ingrossa e indurisce."
  },
  carota: {
    method:
      "Semina diretta a file nel terreno fine e profondo; non ama il trapianto.",
    depth: "0,5-1 cm",
    thin: "Dirada progressivamente a 8 cm sulla fila e 25 cm tra file.",
    tip: "Tieni umido fino alla germinazione, che può essere lenta."
  },
  finocchio: {
    method: "Semina in alveolo o diretta; trapianto delicato quando è giovane.",
    depth: "1 cm",
    thin: "Lascia 25 cm sulla fila e 35 cm tra file.",
    tip: "Rincalza leggermente per imbianchire il grumolo."
  },
  prezzemolo: {
    method:
      "Semina diretta o in vasetto; ammollo dei semi utile per partire meglio.",
    depth: "0,5 cm",
    thin: "Dirada a 20 cm; raccogli a taglio lasciando ricacciare.",
    tip: "Germina lentamente: non lasciare seccare il letto di semina."
  },
  basilico: {
    method: "Semina in vasetto/alveolo o diretta solo con caldo stabile.",
    depth: "0,3-0,5 cm",
    thin: "Dirada o trapianta a 25 cm.",
    tip: "Cima spesso prima della fioritura per produrre più foglie."
  },
  coriandolo: {
    method: "Semina diretta a file; il trapianto lo fa andare presto a fiore.",
    depth: "1 cm",
    thin: "Dirada a 15 cm per foglie, più fitto per raccolto giovane.",
    tip: "Semine scalari: col caldo monta rapidamente."
  },
  aneto: {
    method: "Semina diretta a file, perché non ama il trapianto.",
    depth: "0,5-1 cm",
    thin: "Dirada a 25 cm.",
    tip: "Lascia qualche pianta fiorire se vuoi semi e insetti utili."
  },
  cipolla: {
    method: "Semina in semenzaio o usa bulbilli; poi trapianto in file.",
    depth: "0,5-1 cm",
    thin: "Lascia 12 cm sulla fila e 25 cm tra file.",
    tip: "Non interrare troppo il bulbo: deve ingrossare vicino alla superficie."
  },
  aglio: {
    method: "Pianta spicchi sani con la punta verso l'alto.",
    depth: "3-5 cm",
    thin: "Lascia 12 cm sulla fila e 25 cm tra file.",
    tip: "Usa spicchi esterni grandi: danno teste migliori."
  },
  porro: {
    method:
      "Semina in semenzaio, poi trapianta quando ha lo spessore di una matita.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 15 cm sulla fila e 30 cm tra file.",
    tip: "Trapianta in solchi e rincalza per fusti più bianchi."
  },
  scalogno: {
    method: "Pianta bulbilli o semina in semenzaio.",
    depth: "2-3 cm con punta appena coperta",
    thin: "Lascia 12 cm sulla fila e 20 cm tra file.",
    tip: "Evita ristagni: i bulbi marciscono in terreno troppo bagnato."
  },
  fagiolino: {
    method: "Semina diretta a file quando il terreno è caldo.",
    depth: "2-3 cm",
    thin: "Lascia 20 cm sulla fila e 40 cm tra file.",
    tip: "Non concimare troppo con azoto: produce foglie a scapito dei baccelli."
  },
  fagiolo: {
    method: "Semina diretta alla base di canne o rete.",
    depth: "2-4 cm",
    thin: "Lascia 25 cm sulla fila e 50 cm tra file/sostegni.",
    tip: "Monta il sostegno prima della semina per non disturbare le radici."
  },
  pisello: {
    method: "Semina diretta a file doppie o vicino a una rete bassa.",
    depth: "3-5 cm",
    thin: "Lascia 15 cm sulla fila e 30 cm tra file.",
    tip: "Ama fresco: in serra meglio autunno o fine inverno."
  },
  fragola: {
    method:
      "Meglio trapiantare piantine o stoloni radicati; seme lento e variabile.",
    depth: "Colletto a livello del terreno",
    thin: "Lascia 30 cm sulla fila e 40 cm tra file.",
    tip: "Non coprire il cuore della pianta e pacciama per frutti puliti."
  },
  sedano: {
    method: "Semina in alveolo; i semi sono fini e vanno coperti pochissimo.",
    depth: "0,2-0,3 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Richiede acqua costante: siccità e caldo lo rendono fibroso."
  },
  ravanello: {
    method: "Semina diretta a file, molto scalare.",
    depth: "0,5-1 cm",
    thin: "Dirada a 8 cm sulla fila e 15 cm tra file.",
    tip: "Se resta troppo fitto fa foglie e radici piccole."
  },
  barbabietola: {
    method: "Semina diretta; ogni seme può generare più piantine.",
    depth: "1-2 cm",
    thin: "Dirada a 12 cm sulla fila e 25 cm tra file.",
    tip: "Usa i diradamenti giovani come foglie da insalata."
  },
  cicoria: {
    method: "Semina diretta o in alveolo, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Lascia 25 cm sulla fila e 30 cm tra file.",
    tip: "Raccogli a cespo giovane o taglia foglie esterne."
  },
  indivia: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Per foglie più chiare puoi legare il cespo asciutto prima del raccolto."
  },
  pakchoi: {
    method: "Semina diretta o in alveolo; cresce veloce.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 30 cm tra file.",
    tip: "Semina in fresco: con caldo e stress monta a fiore."
  },
  cavoletti: {
    method: "Semina in semenzaio o alveolo e trapianta presto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 60 cm sulla fila e 80 cm tra file.",
    tip: "Coltura lunga: occupa spazio per molti mesi."
  },
  rapa: {
    method: "Semina diretta a file nel periodo fresco.",
    depth: "1 cm",
    thin: "Dirada a 12 cm sulla fila e 25 cm tra file.",
    tip: "Dirada presto per far ingrossare radici regolari."
  },
  valerianella: {
    method: "Semina diretta a spaglio o file fitte.",
    depth: "0,5 cm",
    thin: "Dirada a 10 cm sulla fila e 15 cm tra file per rosette grandi.",
    tip: "Copri appena il seme e mantieni umido nei primi giorni."
  },
  rosmarino: {
    method: "Meglio trapiantare talea o piantina; da seme è lento.",
    depth: "Colletto a livello del terreno",
    thin: "Lascia 60 cm sulla fila e 80 cm tra file.",
    tip: "Poca acqua e terreno drenante: in serra evita ristagni."
  },
  timo: {
    method: "Semina superficiale o trapianto di piccole piantine.",
    depth: "Superficiale, copertura leggerissima",
    thin: "Lascia 30 cm tra piante.",
    tip: "Ama asciutto e luce: non coprirlo con colture alte."
  },
  origano: {
    method: "Semina superficiale o trapianto; germina meglio con luce.",
    depth: "Superficiale, copertura leggerissima",
    thin: "Lascia 30 cm tra piante.",
    tip: "Cima per farlo accestire e raccogli prima della piena fioritura."
  },
  salvia: {
    method: "Semina in alveolo o trapianto di piantina giovane.",
    depth: "0,5 cm",
    thin: "Lascia 40 cm sulla fila e 50 cm tra file.",
    tip: "Non eccedere con acqua: le foglie aromatiche migliorano in terreno drenante."
  },
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
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco."
  },
  stevia_dolce: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
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
  mais_dolce: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 70 cm tra file.",
    tip: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi."
  },
  tomatillo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 50 cm sulla fila e 80 cm tra file.",
    tip: "Serve almeno due piante per fruttificare bene; ottimo per salse."
  },
  physalis: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
    tip: "Frutti dolci in lanterna; in serra matura meglio."
  },
  cucamelon: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
    tip: "Piccoli frutti croccanti; produttivo su rete in serra."
  },
  asparago: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 40 cm sulla fila e 80 cm tra file.",
    tip: "Perenne: richiede pazienza, ma produce per molti anni."
  },
  carciofo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 80 cm sulla fila e 100 cm tra file.",
    tip: "Coltura grande e decorativa; proteggi dal gelo intenso."
  },
  cardo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 60 cm sulla fila e 90 cm tra file.",
    tip: "Parente del carciofo; imbianchisci le coste prima del raccolto."
  },
  crescione: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 15 cm sulla fila e 20 cm tra file.",
    tip: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti."
  },
  mizuna: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
    tip: "Senape giapponese facile; foglie frastagliate per mix insalata."
  },
  senape_foglia: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Foglie piccanti; semina in fresco per evitare fioritura precoce."
  },
  tatsoi: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
    tip: "Rosetta compatta, molto resistente al freddo."
  },
  cavolo_cinese: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
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
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
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
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli cime e foglie prima della piena fioritura."
  },
  shiso: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
    tip: "Aromatica asiatica profumata; bella anche in vaso in serra."
  },
  broccolo_romanesco: {
    method:
      "Semina in alveolo a febbraio-marzo o luglio-agosto per raccolta autunnale.",
    depth: "1 cm",
    thin: "Trapianta a 50 cm sulla fila e 60 cm tra file.",
    tip: "Testa a spirale unica; raccogli quando la testa è compatta e verde-gialla."
  },
  friggitello: {
    method:
      "Semina in alveolo a febbraio, trapianto dopo le gelate primaverili.",
    depth: "0.5-1 cm",
    thin: "Trapianta a 40 cm sulla fila e 50 cm tra file.",
    tip: "Raccogli verde per friggere o lascia ingiallire per gusto più dolce."
  },
  agretti: {
    method:
      "Semina diretta in file a febbraio-aprile. Semi a breve germinabilità: usa semi freschi.",
    depth: "1-2 cm",
    thin: "Dirada a 10-15 cm sulla fila.",
    tip: "Usa semi freschissimi (max 1 anno): la germinabilità cala rapidamente."
  },
  borragine: {
    method: "Semina diretta o in alveolo. Si autosemina facilmente.",
    depth: "1 cm",
    thin: "Dirada a 30 cm sulla fila.",
    tip: "Raccogli i fiori azzurri per insalate; foglie giovani in zuppe e frittate."
  },
  catalogna: {
    method:
      "Semina diretta o in alveolo da luglio ad agosto per raccolta autunnale-invernale.",
    depth: "0.5-1 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 35 cm tra file.",
    tip: "Raccogli le puntarelle centrali prima che vadano a fiore."
  },
  acetosa: {
    method:
      "Semina in alveolo o divisione di cespo. Perenne: un impianto dura anni.",
    depth: "0.5 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccoglie foglie giovani in primavera. Taglia le infiorescenze per prolungare la produzione."
  },
  leurda: {
    method:
      "Si propaga per divisione di bulbi in autunno o da semi (lenti a germinare).",
    depth: "3-5 cm per i bulbi",
    thin: "Pianta bulbi a 15-20 cm di distanza.",
    tip: "Raccogli le foglie in primavera prima della fioritura; fortissimo aroma agliaceo."
  },
  melissa: {
    method:
      "Semina in superficie o divisione di cespo (si propaga facilmente).",
    depth: "0-0.5 cm (semi superficiali)",
    thin: "Trapianta o dirada a 40 cm.",
    tip: "Perenne vigorosa: meglio in vaso o area controllata. Taglia spesso per foglie tenere."
  },
  cerfoglio: {
    method:
      "Semina diretta in file, non ama il trapianto. Semina scalare ogni 3 settimane.",
    depth: "0.5-1 cm",
    thin: "Dirada a 10-15 cm sulla fila.",
    tip: "Non esporre al caldo diretto: va a seme rapidamente. Preferisce mezza ombra in estate."
  },
  cimbru: {
    method: "Semina in superficie o divisione di pianta.",
    depth: "0-0.5 cm (semi superficiali)",
    thin: "Dirada o trapianta a 20-25 cm.",
    tip: "Essenziale nella cucina rumena per fagioli, sottaceti e carne. Raccoglila prima della fioritura."
  }
};

// Restituisce la foto della pianta usando il percorso salvato o il nome derivato dall'ID.
function plantPhotoSrc(plant, id) {
  return window.resolvePlantPhoto(plant, id);
}

// Definisce i piani precompilati selezionabili per avviare rapidamente una serra.
const PRESETS = {
  insalate: [
    ["lattuga", 12],
    ["rucola", 24],
    ["spinaci", 18],
    ["ravanello", 30]
  ],
  salsa: [
    ["pomodoro", 6],
    ["basilico", 8],
    ["cipolla", 24],
    ["aglio", 24]
  ],
  principiante: [
    ["lattuga", 8],
    ["zucchina", 2],
    ["fagiolino", 16],
    ["basilico", 6],
    ["carota", 40]
  ],
  aromatiche: [
    ["basilico", 6],
    ["prezzemolo", 9],
    ["rosmarino", 1],
    ["timo", 4],
    ["origano", 4]
  ],
  estivo: [
    ["pomodoro", 6],
    ["zucchina", 2],
    ["melanzana", 3],
    ["fagiolino", 16],
    ["basilico", 8],
    ["lattuga", 8]
  ],
  invernale: [
    ["valerianella", 36],
    ["spinaci", 18],
    ["indivia", 8],
    ["pakchoi", 10],
    ["ravanello", 30]
  ],
  radici: [
    ["carota", 48],
    ["rapa", 30],
    ["ravanello", 36],
    ["barbabietola", 24],
    ["cipolla", 24]
  ],
  foglie: [
    ["lattuga", 10],
    ["rucola", 24],
    ["cicoria", 10],
    ["indivia", 8],
    ["valerianella", 30],
    ["bietola", 8]
  ],
  brassicacee: [
    ["cavoletti", 3],
    ["cavolonero", 4],
    ["pakchoi", 10],
    ["cavolorapa", 12],
    ["timo", 4]
  ],
  primaverile: [
    ["lattuga", 10],
    ["ravanello", 30],
    ["pisello", 24],
    ["spinaci", 18],
    ["carota", 40],
    ["rucola", 24]
  ],
  autunnale: [
    ["spinaci", 18],
    ["valerianella", 30],
    ["indivia", 8],
    ["porro", 16],
    ["bietola", 8],
    ["ravanello", 30]
  ],
  legumi: [
    ["fagiolino", 16],
    ["fagiolo", 12],
    ["pisello", 24]
  ],
  frutti: [
    ["pomodoro", 6],
    ["peperone", 6],
    ["melanzana", 3],
    ["zucchina", 2]
  ],
  cucurbitacee: [
    ["zucchina", 2],
    ["zucca", 1],
    ["cetriolo", 4],
    ["melone", 2],
    ["anguria", 1]
  ],
  soffritto: [
    ["cipolla", 24],
    ["sedano", 9],
    ["carota", 40],
    ["prezzemolo", 9]
  ],
  grigliata: [
    ["melanzana", 3],
    ["zucchina", 2],
    ["peperone", 6],
    ["cipolla", 18],
    ["pomodoro", 6]
  ],
  famiglia: [
    ["fragola", 12],
    ["pomodoro", 6],
    ["carota", 30],
    ["lattuga", 8],
    ["zucchina", 2]
  ]
};
