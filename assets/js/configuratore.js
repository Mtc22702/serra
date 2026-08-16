/**
 * Configuratore: dati agronomici, stato persistente, calcoli, rendering e wizard.
 * Dipende da base.js e catalogo.js per traduzioni, API, strumenti e dati condivisi.
 * L'ordine delle sezioni è intenzionale: costanti → stato → dominio → UI → avvio.
 * Le modifiche allo stato devono passare dalle funzioni di persistenza per non
 * perdere progetti, carrello e storico salvati nel browser.
 */

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
  "Dicembre",
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
  leurda: 2,
};

const EXOTIC_PLANTS = new Set([
  "mais_dolce",
  "tomatillo",
  "physalis",
  "cucamelon",
  "stevia_dolce",
  "shiso",
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
      "friggitello",
    ],
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
      "acetosa",
    ],
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
      "cavolo_navone",
    ],
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
      "cimbru",
    ],
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
      "fagiolo_borlotto",
    ],
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
      "broccolo_romanesco",
    ],
  },
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
  cimbru: "🌿",
};
const PLANT_RO = window.SERRA_I18N?.plants?.ro || {};

// Contiene descrizioni localizzate per la scheda informativa delle piante.

// -----------------------------------------------------------------------------
// Dati e costanti del configuratore — sezione 2 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

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
      "Santoreggia estiva dall'aroma intenso simile al timo. Fondamentale in Romania per fagioli e sottaceti.",
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
    cimbru: "Cimbru",
  },
};

// Contiene istruzioni localizzate per semina, trapianto e raccolta delle colture.

// -----------------------------------------------------------------------------
// Dati e costanti del configuratore — sezione 3 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

const SOWING_GUIDE = {
  pomodoro: {
    method:
      "Semina in vasetto o alveolo al caldo; in serra si trapianta una piantina robusta.",
    depth: "0,5-1 cm",
    thin: "Trapianta quando ha 4-6 foglie vere, lasciando 50 cm sulla fila e 80 cm tra file.",
    tip: "Interra leggermente il fusto e prepara subito tutore o filo verticale.",
  },
  peperone: {
    method:
      "Semina protetta in alveolo; meglio trapiantare piante già formate.",
    depth: "0,5 cm",
    thin: "Trapianta a 40 cm sulla fila e 60 cm tra file quando le notti sono miti.",
    tip: "Germina lentamente: serve caldo costante e terreno mai zuppo.",
  },
  peperoncino: {
    method: "Semina protetta in alveolo, con molto calore iniziale.",
    depth: "0,5 cm",
    thin: "Trapianta a 35 cm sulla fila e 50 cm tra file.",
    tip: "Mantieni asciutto tra un'annaffiatura e l'altra: radica meglio.",
  },
  melanzana: {
    method: "Semina in semenzaio caldo; in serra conviene trapiantare.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 80 cm tra file.",
    tip: "Ama terreno caldo: evita trapianti anticipati in substrato freddo.",
  },
  zucchina: {
    method:
      "Semina diretta a postarella o in vasetto da trapiantare con pane integro.",
    depth: "2-3 cm",
    thin: "Lascia 1 pianta ogni 80 cm sulla fila e 100 cm tra file.",
    tip: "Metti 2 semi per buca e tieni la piantina più vigorosa.",
  },
  zucca: {
    method:
      "Semina diretta a postarella o in vaso grande, poi trapianto delicato.",
    depth: "2-3 cm",
    thin: "Lascia 1 pianta ogni 100 cm sulla fila e 130 cm tra file.",
    tip: "Dalle spazio fin dall'inizio: soffre se viene compressa.",
  },
  cetriolo: {
    method:
      "Semina diretta o in vasetto; in serra rende bene su rete verticale.",
    depth: "1,5-2 cm",
    thin: "Lascia 40 cm sulla fila e 100 cm tra file o sostegni.",
    tip: "Trapianta senza rompere le radici e lega presto i tralci.",
  },
  melone: {
    method:
      "Semina a postarella o in vasetto caldo, poi trapianto con pane integro.",
    depth: "2 cm",
    thin: "Lascia 90 cm sulla fila e 120 cm tra file.",
    tip: "Pacciama e bagna al piede; riduci l'acqua quando i frutti maturano.",
  },
  anguria: {
    method: "Semina a postarella o in vaso grande, solo con terreno ben caldo.",
    depth: "2-3 cm",
    thin: "Lascia 120 cm sulla fila e 150 cm tra file.",
    tip: "In serra piccola usa poche piante: ogni pianta occupa molto volume.",
  },
  lattuga: {
    method:
      "Semina in alveolo o a spaglio leggero; trapianto consigliato per cespi ordinati.",
    depth: "0,3-0,5 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 30 cm tra file.",
    tip: "Semina poco e spesso per raccolte scalari.",
  },
  radicchio: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5 cm",
    thin: "Trapianta a 30 cm sulla fila e 35 cm tra file.",
    tip: "Per cespi compatti evita eccesso di azoto e caldo intenso.",
  },
  rucola: {
    method: "Semina diretta a file o a spaglio fitto.",
    depth: "0,5 cm",
    thin: "Dirada a 15 cm sulla fila e 20 cm tra file se vuoi piante grandi.",
    tip: "Per baby leaf puoi tenerla più fitta e tagliare giovane.",
  },
  spinaci: {
    method: "Semina diretta a file nel letto ben fine.",
    depth: "1-2 cm",
    thin: "Dirada a 20 cm sulla fila e 25 cm tra file.",
    tip: "Ama fresco e umidità costante; col caldo monta a seme.",
  },
  bietola: {
    method:
      "Semina diretta o in alveolo; i semi sono glomeruli con più piantine.",
    depth: "1-2 cm",
    thin: "Dirada a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli foglie esterne senza tagliare il cuore.",
  },
  cavolo: {
    method: "Semina in semenzaio o alveolo, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Interra bene il colletto e mantieni umidità regolare.",
  },
  verza: {
    method: "Semina in semenzaio o alveolo e trapianta piante robuste.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Tiene bene il fresco: programma raccolte autunnali/invernali.",
  },
  broccolo: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Non far asciugare durante formazione del corimbo.",
  },
  cavolfiore: {
    method: "Semina in alveolo e trapianta senza stress idrico.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 50 cm sulla fila e 70 cm tra file.",
    tip: "Richiede crescita continua: evita sbalzi di acqua e nutrienti.",
  },
  cavolonero: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 45 cm sulla fila e 60 cm tra file.",
    tip: "Raccogli foglia per foglia dal basso verso l'alto.",
  },
  cavolorapa: {
    method: "Semina diretta o in alveolo, poi trapianto precoce.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli giovane: se resta troppo ingrossa e indurisce.",
  },
  carota: {
    method:
      "Semina diretta a file nel terreno fine e profondo; non ama il trapianto.",
    depth: "0,5-1 cm",
    thin: "Dirada progressivamente a 8 cm sulla fila e 25 cm tra file.",
    tip: "Tieni umido fino alla germinazione, che può essere lenta.",
  },
  finocchio: {
    method: "Semina in alveolo o diretta; trapianto delicato quando è giovane.",
    depth: "1 cm",
    thin: "Lascia 25 cm sulla fila e 35 cm tra file.",
    tip: "Rincalza leggermente per imbianchire il grumolo.",
  },
  prezzemolo: {
    method:
      "Semina diretta o in vasetto; ammollo dei semi utile per partire meglio.",
    depth: "0,5 cm",
    thin: "Dirada a 20 cm; raccogli a taglio lasciando ricacciare.",
    tip: "Germina lentamente: non lasciare seccare il letto di semina.",
  },
  basilico: {
    method: "Semina in vasetto/alveolo o diretta solo con caldo stabile.",
    depth: "0,3-0,5 cm",
    thin: "Dirada o trapianta a 25 cm.",
    tip: "Cima spesso prima della fioritura per produrre più foglie.",
  },
  coriandolo: {
    method: "Semina diretta a file; il trapianto lo fa andare presto a fiore.",
    depth: "1 cm",
    thin: "Dirada a 15 cm per foglie, più fitto per raccolto giovane.",
    tip: "Semine scalari: col caldo monta rapidamente.",
  },
  aneto: {
    method: "Semina diretta a file, perché non ama il trapianto.",
    depth: "0,5-1 cm",
    thin: "Dirada a 25 cm.",
    tip: "Lascia qualche pianta fiorire se vuoi semi e insetti utili.",
  },
  cipolla: {
    method: "Semina in semenzaio o usa bulbilli; poi trapianto in file.",
    depth: "0,5-1 cm",
    thin: "Lascia 12 cm sulla fila e 25 cm tra file.",
    tip: "Non interrare troppo il bulbo: deve ingrossare vicino alla superficie.",
  },
  aglio: {
    method: "Pianta spicchi sani con la punta verso l'alto.",
    depth: "3-5 cm",
    thin: "Lascia 12 cm sulla fila e 25 cm tra file.",
    tip: "Usa spicchi esterni grandi: danno teste migliori.",
  },
  porro: {
    method:
      "Semina in semenzaio, poi trapianta quando ha lo spessore di una matita.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 15 cm sulla fila e 30 cm tra file.",
    tip: "Trapianta in solchi e rincalza per fusti più bianchi.",
  },
  scalogno: {
    method: "Pianta bulbilli o semina in semenzaio.",
    depth: "2-3 cm con punta appena coperta",
    thin: "Lascia 12 cm sulla fila e 20 cm tra file.",
    tip: "Evita ristagni: i bulbi marciscono in terreno troppo bagnato.",
  },
  fagiolino: {
    method: "Semina diretta a file quando il terreno è caldo.",
    depth: "2-3 cm",
    thin: "Lascia 20 cm sulla fila e 40 cm tra file.",
    tip: "Non concimare troppo con azoto: produce foglie a scapito dei baccelli.",
  },
  fagiolo: {
    method: "Semina diretta alla base di canne o rete.",
    depth: "2-4 cm",
    thin: "Lascia 25 cm sulla fila e 50 cm tra file/sostegni.",
    tip: "Monta il sostegno prima della semina per non disturbare le radici.",
  },
  pisello: {
    method: "Semina diretta a file doppie o vicino a una rete bassa.",
    depth: "3-5 cm",
    thin: "Lascia 15 cm sulla fila e 30 cm tra file.",
    tip: "Ama fresco: in serra meglio autunno o fine inverno.",
  },
  fragola: {
    method:
      "Meglio trapiantare piantine o stoloni radicati; seme lento e variabile.",
    depth: "Colletto a livello del terreno",
    thin: "Lascia 30 cm sulla fila e 40 cm tra file.",
    tip: "Non coprire il cuore della pianta e pacciama per frutti puliti.",
  },
  sedano: {
    method: "Semina in alveolo; i semi sono fini e vanno coperti pochissimo.",
    depth: "0,2-0,3 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Richiede acqua costante: siccità e caldo lo rendono fibroso.",
  },
  ravanello: {
    method: "Semina diretta a file, molto scalare.",
    depth: "0,5-1 cm",
    thin: "Dirada a 8 cm sulla fila e 15 cm tra file.",
    tip: "Se resta troppo fitto fa foglie e radici piccole.",
  },
  barbabietola: {
    method: "Semina diretta; ogni seme può generare più piantine.",
    depth: "1-2 cm",
    thin: "Dirada a 12 cm sulla fila e 25 cm tra file.",
    tip: "Usa i diradamenti giovani come foglie da insalata.",
  },
  cicoria: {
    method: "Semina diretta o in alveolo, poi trapianto.",
    depth: "0,5-1 cm",
    thin: "Lascia 25 cm sulla fila e 30 cm tra file.",
    tip: "Raccogli a cespo giovane o taglia foglie esterne.",
  },
  indivia: {
    method: "Semina in alveolo o semenzaio, poi trapianto.",
    depth: "0,5 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Per foglie più chiare puoi legare il cespo asciutto prima del raccolto.",
  },
  pakchoi: {
    method: "Semina diretta o in alveolo; cresce veloce.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 30 cm tra file.",
    tip: "Semina in fresco: con caldo e stress monta a fiore.",
  },
  cavoletti: {
    method: "Semina in semenzaio o alveolo e trapianta presto.",
    depth: "0,5-1 cm",
    thin: "Trapianta a 60 cm sulla fila e 80 cm tra file.",
    tip: "Coltura lunga: occupa spazio per molti mesi.",
  },
  rapa: {
    method: "Semina diretta a file nel periodo fresco.",
    depth: "1 cm",
    thin: "Dirada a 12 cm sulla fila e 25 cm tra file.",
    tip: "Dirada presto per far ingrossare radici regolari.",
  },
  valerianella: {
    method: "Semina diretta a spaglio o file fitte.",
    depth: "0,5 cm",
    thin: "Dirada a 10 cm sulla fila e 15 cm tra file per rosette grandi.",
    tip: "Copri appena il seme e mantieni umido nei primi giorni.",
  },
  rosmarino: {
    method: "Meglio trapiantare talea o piantina; da seme è lento.",
    depth: "Colletto a livello del terreno",
    thin: "Lascia 60 cm sulla fila e 80 cm tra file.",
    tip: "Poca acqua e terreno drenante: in serra evita ristagni.",
  },
  timo: {
    method: "Semina superficiale o trapianto di piccole piantine.",
    depth: "Superficiale, copertura leggerissima",
    thin: "Lascia 30 cm tra piante.",
    tip: "Ama asciutto e luce: non coprirlo con colture alte.",
  },
  origano: {
    method: "Semina superficiale o trapianto; germina meglio con luce.",
    depth: "Superficiale, copertura leggerissima",
    thin: "Lascia 30 cm tra piante.",
    tip: "Cima per farlo accestire e raccogli prima della piena fioritura.",
  },
  salvia: {
    method: "Semina in alveolo o trapianto di piantina giovane.",
    depth: "0,5 cm",
    thin: "Lascia 40 cm sulla fila e 50 cm tra file.",
    tip: "Non eccedere con acqua: le foglie aromatiche migliorano in terreno drenante.",
  },
  pastinaca: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 35 cm sulla fila e 45 cm tra file.",
    tip: "Dolce dopo il freddo; semina diretta e terreno profondo.",
  },
  radice_prezemolo: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
    tip: "Coltura tradizionale rumena: radice bianca aromatica per zuppe e ciorbe.",
  },
  sedano_rapa: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
    tip: "Radice globosa e profumata; vuole acqua costante e suolo ricco.",
  },
  rafano: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
    tip: "Radice piccante molto usata in Romania; contenila perché è vigorosa.",
  },
  patata: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 35 cm sulla fila e 60 cm tra file.",
    tip: "In serra anticipa il raccolto; rincalza quando gli steli crescono.",
  },
  patata_dolce: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 90 cm tra file.",
    tip: "Ama caldo stabile e suolo leggero; ideale in serra lunga.",
  },
  cipolla_rossa: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 15 cm sulla fila e 30 cm tra file.",
    tip: "Bulbo dolce e colorato; ottima per raccolti scalari.",
  },
  cipollotto: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 8 cm sulla fila e 20 cm tra file.",
    tip: "Pronto rapidamente; raccogli giovane prima che ingrossi troppo.",
  },
  erba_cipollina: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 25 cm tra file.",
    tip: "Aromatica perenne; taglia spesso per foglie tenere.",
  },
  loboda: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Foglia tradizionale per zuppe rumene; cresce bene con clima fresco.",
  },
  stevia_dolce: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 40 cm tra file.",
    tip: "Acetosa per minestre primaverili; raccogli foglie giovani.",
  },
  leustean: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
    tip: "Il profumo classico delle ciorbe rumene; perenne e vigoroso.",
  },
  dragoncello: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
    tip: "Aromatica fine per aceti e conserve; evita ristagni.",
  },
  menta: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
    tip: "Molto vigorosa: meglio in vaso o area controllata.",
  },
  maggiorana: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Aromatica delicata; ama caldo, luce e terreno drenato.",
  },
  camomilla: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Fiori per tisane; attira insetti utili e profuma la serra.",
  },
  mais_dolce: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 70 cm tra file.",
    tip: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi.",
  },
  tomatillo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 50 cm sulla fila e 80 cm tra file.",
    tip: "Serve almeno due piante per fruttificare bene; ottimo per salse.",
  },
  physalis: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
    tip: "Frutti dolci in lanterna; in serra matura meglio.",
  },
  cucamelon: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
    tip: "Piccoli frutti croccanti; produttivo su rete in serra.",
  },
  asparago: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 40 cm sulla fila e 80 cm tra file.",
    tip: "Perenne: richiede pazienza, ma produce per molti anni.",
  },
  carciofo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 80 cm sulla fila e 100 cm tra file.",
    tip: "Coltura grande e decorativa; proteggi dal gelo intenso.",
  },
  cardo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 60 cm sulla fila e 90 cm tra file.",
    tip: "Parente del carciofo; imbianchisci le coste prima del raccolto.",
  },
  crescione: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 15 cm sulla fila e 20 cm tra file.",
    tip: "Cresce veloce e vuole umidità costante; perfetto per tagli ripetuti.",
  },
  mizuna: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
    tip: "Senape giapponese facile; foglie frastagliate per mix insalata.",
  },
  senape_foglia: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Foglie piccanti; semina in fresco per evitare fioritura precoce.",
  },
  tatsoi: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 30 cm tra file.",
    tip: "Rosetta compatta, molto resistente al freddo.",
  },
  cavolo_cinese: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
    tip: "Forma un cespo tenero; proteggi da caldo e stress idrico.",
  },
  daikon: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
    tip: "Ravanello lungo: terreno profondo e raccolta prima che lignifichi.",
  },
  scorzonera: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 35 cm tra file.",
    tip: "Radice nera lunga; richiede suolo leggero e profondo.",
  },
  topinambur: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 50 cm sulla fila e 90 cm tra file.",
    tip: "Tubero rustico e produttivo; delimita lo spazio perché si espande.",
  },
  fava: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
    tip: "Legume precoce e resistente al fresco; migliora il terreno.",
  },
  soia_edamame: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 50 cm tra file.",
    tip: "Raccogli i baccelli verdi quando i semi sono pieni ma teneri.",
  },
  cece: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
    tip: "Ama asciutto e caldo; non eccedere con acqua in serra.",
  },
  lenticchia: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 20 cm sulla fila e 35 cm tra file.",
    tip: "Piccolo legume rustico; adatto a bordure asciutte.",
  },
  fagiolo_borlotto: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 60 cm tra file.",
    tip: "Per baccelli freschi o granella; usa tutori robusti.",
  },
  cavolo_rosso: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 60 cm tra file.",
    tip: "Cespo compatto e colorato; ottimo per raccolti autunnali.",
  },
  cavolo_navone: {
    method: "Semina diretta a file nel terreno ben preparato.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 35 cm sulla fila e 50 cm tra file.",
    tip: "Radice grande e rustica; utile per autunno e inverno.",
  },
  broccolo_rapa: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 25 cm sulla fila e 40 cm tra file.",
    tip: "Raccogli cime e foglie prima della piena fioritura.",
  },
  shiso: {
    method: "Semina superficiale o trapianto di piantina giovane.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 45 cm tra file.",
    tip: "Aromatica asiatica profumata; bella anche in vaso in serra.",
  },
  broccolo_romanesco: {
    method:
      "Semina in alveolo a febbraio-marzo o luglio-agosto per raccolta autunnale.",
    depth: "1 cm",
    thin: "Trapianta a 50 cm sulla fila e 60 cm tra file.",
    tip: "Testa a spirale unica; raccogli quando la testa è compatta e verde-gialla.",
  },
  friggitello: {
    method:
      "Semina in alveolo a febbraio, trapianto dopo le gelate primaverili.",
    depth: "0.5-1 cm",
    thin: "Trapianta a 40 cm sulla fila e 50 cm tra file.",
    tip: "Raccogli verde per friggere o lascia ingiallire per gusto più dolce.",
  },
  agretti: {
    method:
      "Semina diretta in file a febbraio-aprile. Semi a breve germinabilità: usa semi freschi.",
    depth: "1-2 cm",
    thin: "Dirada a 10-15 cm sulla fila.",
    tip: "Usa semi freschissimi (max 1 anno): la germinabilità cala rapidamente.",
  },
  borragine: {
    method: "Semina diretta o in alveolo. Si autosemina facilmente.",
    depth: "1 cm",
    thin: "Dirada a 30 cm sulla fila.",
    tip: "Raccogli i fiori azzurri per insalate; foglie giovani in zuppe e frittate.",
  },
  catalogna: {
    method:
      "Semina diretta o in alveolo da luglio ad agosto per raccolta autunnale-invernale.",
    depth: "0.5-1 cm",
    thin: "Dirada o trapianta a 25 cm sulla fila e 35 cm tra file.",
    tip: "Raccogli le puntarelle centrali prima che vadano a fiore.",
  },
  acetosa: {
    method:
      "Semina in alveolo o divisione di cespo. Perenne: un impianto dura anni.",
    depth: "0.5 cm",
    thin: "Trapianta a 30 cm sulla fila e 40 cm tra file.",
    tip: "Raccoglie foglie giovani in primavera. Taglia le infiorescenze per prolungare la produzione.",
  },
  leurda: {
    method:
      "Si propaga per divisione di bulbi in autunno o da semi (lenti a germinare).",
    depth: "3-5 cm per i bulbi",
    thin: "Pianta bulbi a 15-20 cm di distanza.",
    tip: "Raccogli le foglie in primavera prima della fioritura; fortissimo aroma agliaceo.",
  },
  melissa: {
    method:
      "Semina in superficie o divisione di cespo (si propaga facilmente).",
    depth: "0-0.5 cm (semi superficiali)",
    thin: "Trapianta o dirada a 40 cm.",
    tip: "Perenne vigorosa: meglio in vaso o area controllata. Taglia spesso per foglie tenere.",
  },
  cerfoglio: {
    method:
      "Semina diretta in file, non ama il trapianto. Semina scalare ogni 3 settimane.",
    depth: "0.5-1 cm",
    thin: "Dirada a 10-15 cm sulla fila.",
    tip: "Non esporre al caldo diretto: va a seme rapidamente. Preferisce mezza ombra in estate.",
  },
  cimbru: {
    method: "Semina in superficie o divisione di pianta.",
    depth: "0-0.5 cm (semi superficiali)",
    thin: "Dirada o trapianta a 20-25 cm.",
    tip: "Essenziale nella cucina rumena per fagioli, sottaceti e carne. Raccoglila prima della fioritura.",
  },
};

// Restituisce la foto della pianta usando il percorso salvato o il nome derivato dall'ID.

// -----------------------------------------------------------------------------
// Dati e costanti del configuratore — sezione 4 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function plantPhotoSrc(plant, id) {
  return window.resolvePlantPhoto(plant, id);
}

// Definisce i piani precompilati selezionabili per avviare rapidamente una serra.

// -----------------------------------------------------------------------------
// Dati e costanti del configuratore — sezione 5 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

const PRESETS = {
  insalate: [
    ["lattuga", 12],
    ["rucola", 24],
    ["spinaci", 18],
    ["ravanello", 30],
  ],
  salsa: [
    ["pomodoro", 6],
    ["basilico", 8],
    ["cipolla", 24],
    ["aglio", 24],
  ],
  principiante: [
    ["lattuga", 8],
    ["zucchina", 2],
    ["fagiolino", 16],
    ["basilico", 6],
    ["carota", 40],
  ],
  aromatiche: [
    ["basilico", 6],
    ["prezzemolo", 9],
    ["rosmarino", 1],
    ["timo", 4],
    ["origano", 4],
  ],
  estivo: [
    ["pomodoro", 6],
    ["zucchina", 2],
    ["melanzana", 3],
    ["fagiolino", 16],
    ["basilico", 8],
    ["lattuga", 8],
  ],
  invernale: [
    ["valerianella", 36],
    ["spinaci", 18],
    ["indivia", 8],
    ["pakchoi", 10],
    ["ravanello", 30],
  ],
  radici: [
    ["carota", 48],
    ["rapa", 30],
    ["ravanello", 36],
    ["barbabietola", 24],
    ["cipolla", 24],
  ],
  foglie: [
    ["lattuga", 10],
    ["rucola", 24],
    ["cicoria", 10],
    ["indivia", 8],
    ["valerianella", 30],
    ["bietola", 8],
  ],
  brassicacee: [
    ["cavoletti", 3],
    ["cavolonero", 4],
    ["pakchoi", 10],
    ["cavolorapa", 12],
    ["timo", 4],
  ],
  primaverile: [
    ["lattuga", 10],
    ["ravanello", 30],
    ["pisello", 24],
    ["spinaci", 18],
    ["carota", 40],
    ["rucola", 24],
  ],
  autunnale: [
    ["spinaci", 18],
    ["valerianella", 30],
    ["indivia", 8],
    ["porro", 16],
    ["bietola", 8],
    ["ravanello", 30],
  ],
  legumi: [
    ["fagiolino", 16],
    ["fagiolo", 12],
    ["pisello", 24],
  ],
  frutti: [
    ["pomodoro", 6],
    ["peperone", 6],
    ["melanzana", 3],
    ["zucchina", 2],
  ],
  cucurbitacee: [
    ["zucchina", 2],
    ["zucca", 1],
    ["cetriolo", 4],
    ["melone", 2],
    ["anguria", 1],
  ],
  soffritto: [
    ["cipolla", 24],
    ["sedano", 9],
    ["carota", 40],
    ["prezzemolo", 9],
  ],
  grigliata: [
    ["melanzana", 3],
    ["zucchina", 2],
    ["peperone", 6],
    ["cipolla", 18],
    ["pomodoro", 6],
  ],
  famiglia: [
    ["fragola", 12],
    ["pomodoro", 6],
    ["carota", 30],
    ["lattuga", 8],
    ["zucchina", 2],
  ],
};

// Definisce lo stato condiviso della serra, del profilo e dell'interfaccia configuratore.
const state = {
  lang: "it",
  zona: "temperato",
  riscaldata: false,
  larghezza: 3,
  lunghezza: 5,
  path: 60,
  mese: new Date().getMonth() + 1,
  beds: [],
  autoPlan: true,
  activePreset: "",
  overlay: "",
  selected: -1,
  autoPlanNotice: "",
  manualPlanNotice: "",

  livello: "intermedio",

  sudInBasso: false,
};
const LIVELLI = new Set(["novizio", "intermedio", "esperto"]);
let vegFilter = "all";
let vegSearchQuery = "";
const CONFIG_KEY = "serra.config.v1";
const BOOT_PARAMS = new URLSearchParams(window.location.search);

// Normalizzazione del codice lingua.
function normalizeLang(lang) {
  return lang === "ro" || lang === "it" ? lang : "it";
}

// Legge la configurazione salvata nel localStorage
function readSavedConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
  } catch {
    return null;
  }
}

// Applica i valori consegnati direttamente dalla pre-configurazione della
// home. Sono un fallback di navigazione: hanno precedenza sul salvataggio
// locale soltanto quando l'URL dichiara esplicitamente preconfig=1.
function applyBootPreconfigToState() {
  if (BOOT_PARAMS.get("preconfig") !== "1") return false;

  const boundedNumber = (name, min, max) => {
    const raw = BOOT_PARAMS.get(name);
    if (raw === null || raw.trim() === "") return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= min && value <= max
      ? value
      : null;
  };

  const width = boundedNumber("w", 1, 12);
  const length = boundedNumber("l", 1, 30);
  const path = boundedNumber("path", 30, 120);
  const month = boundedNumber("mese", 1, 12);
  const zone = BOOT_PARAMS.get("zona");
  const heated = BOOT_PARAMS.get("risc");

  let applied = false;
  if (width !== null) {
    state.larghezza = width;
    applied = true;
  }
  if (length !== null) {
    state.lunghezza = length;
    applied = true;
  }
  if (path !== null) {
    state.path = Math.round(path / 5) * 5;
    applied = true;
  }
  if (Number.isInteger(month)) {
    state.mese = month;
    applied = true;
  }
  if (["freddo", "temperato", "caldo"].includes(zone)) {
    state.zona = zone;
    applied = true;
  }
  if (heated === "1" || heated === "0") {
    state.riscaldata = heated === "1";
    applied = true;
  }

  return applied;
}

// Costruisce l'oggetto da salvare nel localStorage
function buildConfigPayload(done = true) {
  return {
    lang: state.lang,
    zona: state.zona,
    riscaldata: state.riscaldata,
    larghezza: state.larghezza,
    lunghezza: state.lunghezza,
    path: state.path,
    mese: state.mese,
    autoPlan: state.autoPlan,
    activePreset: state.activePreset,
    livello: state.livello,
    sudInBasso: state.sudInBasso,
    beds: state.beds.map((bed) => ({
      plantId: bed.plantId,
      count: bed.count,
      layout: bed.layout || "blocco",
      countLocked: Boolean(bed.countLocked),
      // I tappabuchi dipendono dalla colonna scelta dal motore: senza questo
      // dato un refresh può ricomporre le stesse quantità lasciando dei vuoti.
      col: Number.isInteger(bed.col) ? bed.col : undefined,
    })),
    done,
  };
}

// Persiste lo stato corrente nel localStorage
function saveConfig(done = true) {
  const payload = buildConfigPayload(done);
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(payload));
  } catch {}

  if (typeof syncActiveProjectConfig === "function") {
    syncActiveProjectConfig(payload);
  }
}

// Allinea tutti i selettori della lingua al valore memorizzato nello stato.
function syncLanguageControls() {
  const main = document.getElementById("inLang");
  const modal = document.getElementById("startLang");
  const nav = document.getElementById("navLang");
  if (main) main.value = state.lang;
  if (modal) modal.value = state.lang;
  if (nav) nav.value = state.lang;
}

// Allinea i controlli clima al valore dello stato
function syncClimateControls() {
  const zone = document.getElementById("inZona");
  const heated = document.getElementById("inRisc");
  const modalHeated = document.getElementById("heatedChk");
  if (zone) zone.value = state.zona;
  if (heated) {
    heated.value = state.riscaldata ? "si" : "no";
    heated.classList.toggle("is-heated", state.riscaldata);
    heated.dataset.heated = String(state.riscaldata);
  }
  if (modalHeated) modalHeated.checked = state.riscaldata;
  document.querySelectorAll("#zoneOpts .opt").forEach((opt) => {
    opt.classList.toggle("on", opt.dataset.zone === state.zona);
  });
  const sun = document.getElementById("inSole");
  if (sun) sun.value = state.sudInBasso ? "basso" : "alto";
}

// Allinea gli input di dimensione al valore dello stato
function syncSizeControls() {
  const mainW = document.getElementById("inW");
  const mainL = document.getElementById("inL");
  const wSlider = document.getElementById("inWSlider");
  const lSlider = document.getElementById("inLSlider");
  const startW = document.getElementById("startW");
  const startL = document.getElementById("startL");
  const pathSlider = document.getElementById("inPath");
  const pathNum = document.getElementById("inPathNum");
  const active = document.activeElement;
  if (mainW && mainW !== active) mainW.value = state.larghezza;
  if (mainL && mainL !== active) mainL.value = state.lunghezza;
  if (wSlider && wSlider !== active) wSlider.value = state.larghezza;
  if (lSlider && lSlider !== active) lSlider.value = state.lunghezza;
  if (startW && startW !== active) startW.value = state.larghezza;
  if (startL && startL !== active) startL.value = state.lunghezza;
  if (pathSlider) pathSlider.value = state.path;
  if (pathNum) pathNum.value = state.path;
}

// Mostra o nasconde la modale di configurazione iniziale
function setStartModalVisible(visible) {
  const modal = document.getElementById("startModal");
  if (modal) modal.style.display = visible ? "flex" : "none";
}

// Legge il preset richiesto dai parametri URL
function requestedBootPreset() {
  const preset = BOOT_PARAMS.get("preset") || "";
  return PRESETS[preset] ? preset : "";
}

// Verifica se il boot prevede importazione carrello
function shouldImportCart() {
  return BOOT_PARAMS.get("import") === "cart";
}

// Verifica se il boot è in modalità guidata
function isGuidedBoot() {
  return (
    BOOT_PARAMS.get("guided") === "1" ||
    requestedBootPreset() === "principiante"
  );
}

// Verifica se il boot è per un progetto vuoto libero
function isFreeProjectBoot() {
  return (
    BOOT_PARAMS.get("mode") === "expert" &&
    (BOOT_PARAMS.get("empty") === "1" || BOOT_PARAMS.get("free") === "1")
  );
}

// Rimuove i parametri di boot dall'URL
function clearBootParams() {
  if (!window.history?.replaceState) return;
  const currentHistoryState =
    window.history.state && typeof window.history.state === "object"
      ? window.history.state
      : {};
  const livello = BOOT_PARAMS.get("livello") || "";
  const source = BOOT_PARAMS.get("source") || "";
  const guided = BOOT_PARAMS.get("guided") === "1";
  const nextHistoryState =
    LIVELLI.has(livello) || source || guided
      ? {
          ...currentHistoryState,
          serraConfiguratorBoot: { livello, source, guided },
        }
      : currentHistoryState;
  window.history.replaceState(
    nextHistoryState,
    document.title,
    window.location.pathname + window.location.hash,
  );
}

// Aggiorna la pillola mese/zona nell'intro guidata
function updateGuidedIntroDynamic() {
  const months = MONTHS[state.lang] || MONTHS.it;
  const monthName = months[state.mese - 1] || "";
  const zoneLabel =
    { freddo: tx("cold"), temperato: tx("temperate"), caldo: tx("warm") }[
      state.zona
    ] || tx("temperate");
  const pill = document.getElementById("guidedMonthPill");
  if (pill)
    pill.textContent = `📅 ${monthName} · ${tx("tagZone")} ${zoneLabel}`;
  updateJourneyContext();
}

// Determina la sezione iniziale da mostrare in base al profilo scelto.
function updateJourneyContext() {
  const root = document.getElementById("journeyContext");
  const level = document.getElementById("journeyContextLevel");
  const title = document.getElementById("journeyContextTitle");
  const desc = document.getElementById("journeyContextDesc");
  if (!root || !level || !title || !desc) return;
  const ro = state.lang === "ro";
  const content =
    {
      novizio: ro
        ? {
            level: "Traseu Începător",
            title: "Grădina ta este deja pregătită",
            desc: "Verifică planul de sus; când ești gata, mergi la lista de semințe.",
            steps: ["1 · Verifică alegerile", "2 · Verifică", "3 · Cumpără"],
          }
        : {
            level: "Percorso Principiante",
            title: "Il tuo orto è già pronto",
            desc: "Controlla il piano dall'alto; quando sei pronto, passa alla lista dei semi.",
            steps: ["1 · Ricontrolla scelta", "2 · Controlla", "3 · Acquista"],
          },
      intermedio: ro
        ? {
            level: "Traseu Intermediar",
            title: "Planul este gata: acum fă-l al tău",
            desc: "Sera rămâne în centru; modifică plantele și cantitățile.",
            steps: ["1 · Verifică alegerile", "2 · Proiectează", "3 · Cumpără"],
          }
        : {
            level: "Percorso Intermedio",
            title: "Il piano è pronto: ora fallo tuo",
            desc: "La serra resta al centro; modifica colture e quantità quando vuoi.",
            steps: ["1 · Ricontrolla scelta", "2 · Progetta", "3 · Acquista"],
          },
      esperto: ro
        ? {
            level: "Traseu Expert",
            title: "Sera este goală: compune-o liber",
            desc: "Alege din catalogul complet și așază culturile manual.",
            steps: ["1 · Verifică alegerile", "2 · Compune", "3 · Cumpără"],
          }
        : {
            level: "Percorso Esperto",
            title: "La serra è vuota: componila liberamente",
            desc: "Scegli dal catalogo completo e disponi le colture a mano.",
            steps: ["1 · Ricontrolla scelta", "2 · Componi", "3 · Acquista"],
          },
    }[state.livello] || null;
  if (!content) return;
  root.classList.remove(
    "journey-context--novizio",
    "journey-context--intermedio",
    "journey-context--esperto",
  );
  root.classList.add(`journey-context--${state.livello}`);
  level.textContent = content.level;
  title.textContent = content.title;
  desc.textContent = content.desc;
  root.querySelectorAll(".journey-context-step").forEach((step, i) => {
    step.textContent = content.steps[i] || "";
  });
}

// Aggiorna il riepilogo compatto del selettore profilo
function syncPersonaPickerSummary() {
  const active = document.querySelector(".persona-card.is-active");
  const name = document.getElementById("personaCurrentName");
  const desc = document.getElementById("personaCurrentDesc");
  if (!active || !name || !desc) return;
  const activeTitle = active.querySelector(".persona-card-body b");
  const activeLevel = active.querySelector(".persona-level-label");
  const activeDesc = active.querySelector(".persona-card-body small");
  const levelText = (activeLevel?.textContent || "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const titleText = (activeTitle?.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
  name.textContent = levelText || titleText;
  desc.textContent = (activeDesc?.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
}

// Allinea il selettore profilo: chiuso di default su ogni viewport
function syncPersonaPickerDisclosure() {
  const picker = document.getElementById("personaPickDetails");
  if (!picker) return;
  picker.open = false;
  const panel = document.getElementById("guidedIntro");
  const trigger = document.getElementById("personaPickerTrigger");
  if (panel) panel.hidden = true;
  if (trigger) {
    trigger.setAttribute("aria-expanded", "false");
    trigger.classList.remove("is-open");
  }
}

// Applica le regole di interfaccia specifiche per ciascun livello di esperienza.
function setMode(mode, scroll = false) {
  const allowed = new Set(["fit", "expert"]);
  const next = allowed.has(mode) ? mode : "fit";
  document.body.classList.toggle("mode-fit", next === "fit");
  document.body.classList.toggle("mode-expert", next === "expert");
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const active = tab.dataset.mode === next;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".auto-plan-control").forEach((el) => {
    el.hidden = next === "expert";
  });
  document.querySelectorAll("[data-mode-section]").forEach((section) => {
    const sectionMode = section.dataset.modeSection;
    const showGuidedCustomize =
      next === "fit" &&
      (state.livello === "novizio" || state.livello === "intermedio") &&
      sectionMode === "expert";
    section.classList.toggle(
      "is-active",
      sectionMode === next ||
        showGuidedCustomize ||
        (next === "expert" && sectionMode === "fit"),
    );
  });
  const yieldPanel = document.getElementById("panelYield");
  if (yieldPanel) setPanelCollapsed(yieldPanel, true);
  const fillBtn = document.querySelector(".crops-fill-main-btn");
  if (fillBtn) fillBtn.hidden = next === "expert";

  if (scroll) {
    const guidedIntro = document.getElementById("guidedIntro");
    if (typeof scrollElementBelowHeader === "function") {
      scrollElementBelowHeader(guidedIntro, "smooth");
    } else {
      guidedIntro?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}

// Applicazione del profilo utente all'interfaccia.
function setLivello(liv, { mapMode = true } = {}) {
  const next = LIVELLI.has(liv) ? liv : "intermedio";
  state.livello = next;
  document.body.classList.toggle("livello-novizio", next === "novizio");
  document.body.classList.toggle("livello-intermedio", next === "intermedio");
  document.body.classList.toggle("livello-esperto", next === "esperto");
  updateVegSearchUI();
  syncCustomizePanelForLivello();
  document.querySelectorAll(".persona-card").forEach((card) => {
    const on = card.dataset.livello === next;
    card.classList.toggle("is-active", on);
    card.setAttribute("aria-selected", String(on));
  });
  syncPersonaPickerSummary();
  updateJourneyContext();
  if (mapMode) setMode(next === "esperto" ? "expert" : "fit", false);
  if (typeof syncQuickGuide === "function") syncQuickGuide();
  if (typeof syncColLeftLayout === "function") syncColLeftLayout();
}

// Cambia il livello utente con conferma se necessario
function chooseLivello(liv) {
  const prev = state.livello;
  // Riporta all'inizio dopo il cambio di profilo.
  const returnToConfiguratorStart = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  };

  // Richiede conferma prima di sostituire il piano esistente.
  if (
    liv === "novizio" &&
    prev !== "novizio" &&
    state.beds.length > 0 &&
    !confirm(tx("confirmNoviceReset"))
  ) {
    return;
  }
  setLivello(liv);

  if (typeof resetHistory === "function") resetHistory();
  if (liv === "esperto") {
    vegFilter = "all-beds";
    state.autoPlan = false;
    syncVegFilterTabs();
    render();
    setPanelCollapsed("panelSettings", true);
    openCustomizePanelAndFocus({ scroll: false });
  } else if (liv === "intermedio") {
    vegFilter = "all";
    const keepsExpertPlan = prev === "esperto" && state.beds.length > 0;
    state.autoPlan = !keepsExpertPlan;
    state.manualPlanNotice = keepsExpertPlan
      ? "manualPlanKeptIntermediate"
      : "";
    if (!state.beds.length) autoFill();
    else render();
    syncVegFilterTabs();
    // Apriamo comunque le colture, senza cambiare la posizione dell'utente.
    openCustomizePanelAndFocus({ scroll: false });
  } else {
    vegFilter = "in";
    state.autoPlan = true;
    resetNoviceAdvancedOptions();
    autoFill({ compactPaths: false });
    syncVegFilterTabs();
    collapseSettingsPanelAfterAutoPlan({ scroll: false });
    setCustomizePanelCollapsed(true);
  }
  saveConfig(true);
  if (prev !== liv) updateGuidedIntroDynamic();
  const picker = document.getElementById("personaPickDetails");
  if (picker) picker.open = false;
  const pickerPanel = document.getElementById("guidedIntro");
  const pickerTrigger = document.getElementById("personaPickerTrigger");
  if (pickerPanel) pickerPanel.hidden = true;
  if (pickerTrigger) {
    pickerTrigger.setAttribute("aria-expanded", "false");
    pickerTrigger.classList.remove("is-open");
  }
  returnToConfiguratorStart();
}

// Allinea le tab filtro colture al filtro attivo
function syncVegFilterTabs() {
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === vegFilter);
  });
}

// Azzera le opzioni avanzate non disponibili al novizio
function resetNoviceAdvancedOptions() {
  state.overlay = "";
  syncSizeControls();
  syncOverlaySelectLabel();
}

// Normalizza il testo per la ricerca (lowercase, senza accenti)
function normalizeVegSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Aggiorna visibilità e testo del campo ricerca colture
function updateVegSearchUI() {
  const wrap = document.getElementById("vegSearchWrap");
  const input = document.getElementById("vegSearchInput");
  const clear = document.getElementById("vegSearchClear");
  const visible = state.livello === "intermedio" || state.livello === "esperto";
  if (wrap) wrap.hidden = !visible;
  if (!visible) vegSearchQuery = "";
  if (input) {
    input.value = vegSearchQuery;
    input.placeholder = tx("vegSearchPlaceholder");
  }
  const label = document.querySelector('label[for="vegSearchInput"]');
  if (label) {
    label.textContent = tx("vegSearchLabel");
    document.documentElement.style.setProperty(
      "--veg-search-badge",
      tx("vegSearchBadge"),
    );
  }
  if (clear) {
    clear.hidden = !vegSearchQuery;
    clear.title = tx("vegSearchClear");
    clear.setAttribute("aria-label", clear.title);
  }
}

// Scrolla fino alla scena della serra
function scrollToLivelloLanding(livello = state.livello, options = {}) {
  const { behavior = "smooth", delay = 120, waitForFonts = true } = options;
  const resolveTarget = () => {
    // Mostra i layout pronti come punto di ingresso esperto.
    if (livello === "esperto") {
      return (
        document.getElementById("presetBar") ||
        document.getElementById("panelCustomize") ||
        document.getElementById("journeyContext") ||
        document.querySelector(".stage")
      );
    }
    if (livello === "intermedio") {
      return (
        document.getElementById("presetBar") ||
        document.getElementById("journeyContext") ||
        document.querySelector(".stage")
      );
    }
    return (
      document.getElementById("journeyContext") ||
      document.querySelector(".stage")
    );
  };
  if (typeof scheduleElementBelowHeader === "function") {
    scheduleElementBelowHeader(resolveTarget, behavior, {
      delay,
      waitForFonts,
    });
    return;
  }
  window.setTimeout(() => {
    const target = resolveTarget();
    if (!target) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
        "66",
      10,
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior });
  }, delay);
}

// Mantiene la compatibilità delle azioni che usano la destinazione contestuale.
function scrollToScene() {
  scrollToLivelloLanding(state.livello);
}

// Gestisce lo store locale che contiene configurazioni e progetto attivo.
const PROJECTS_KEY = "serra.projects.v1";

// Legge lo store progetti dal localStorage
function readProjectsStore() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || "null");
  } catch {
    return null;
  }
}

// Persiste lo store progetti nel localStorage
function writeProjectsStore(store) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(store));
  } catch {}
}

// Genera un ID univoco per un nuovo progetto
function genProjectId() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Recupera una stringa tradotta per i progetti
function projectsText(key, vars) {
  return typeof tx === "function" ? tx(key, vars) : key;
}

// Genera il nome predefinito per il progetto numero n
function projectsDefaultName(n) {
  return projectsText("projects.default_name", { n });
}

// Delega all'unica implementazione condivisa: vedi assets/js/shared/escape-html.js
function escapeHtmlProjects(s) {
  return window.escapeHtml(s);
}

// Restituisce la configurazione di default per un nuovo progetto
function defaultProjectConfig() {
  return {
    lang: state.lang,
    zona: "temperato",
    riscaldata: false,
    larghezza: 3,
    lunghezza: 5,
    path: 60,
    mese: new Date().getMonth() + 1,
    autoPlan: false,
    activePreset: "",
    livello: state.livello,
    beds: [],
    done: true,
  };
}

// Normalizza, aggiorna e sincronizza la struttura dei progetti salvati.
function ensureProjectsStore() {
  let store = readProjectsStore();
  if (store && Array.isArray(store.projects) && store.projects.length) {
    if (!store.projects.some((p) => p.id === store.activeId)) {
      store.activeId = store.projects[0].id;
      writeProjectsStore(store);
    }
    return store;
  }
  const existing = readSavedConfig();
  const id = genProjectId();
  const now = Date.now();
  store = {
    activeId: id,
    projects: [
      {
        id,
        name: projectsDefaultName(1),
        createdAt: now,
        updatedAt: now,
        config: existing || null,
      },
    ],
  };
  writeProjectsStore(store);
  return store;
}

// Restituisce il progetto attivo dallo store
function getActiveProject(store) {
  store = store || ensureProjectsStore();
  return (
    store.projects.find((p) => p.id === store.activeId) || store.projects[0]
  );
}

// Sincronizza la configurazione del progetto attivo
function syncActiveProjectConfig(payload) {
  const store = readProjectsStore();
  if (!store || !Array.isArray(store.projects)) return;
  const active = store.projects.find((p) => p.id === store.activeId);
  if (!active) return;
  active.config = payload;
  active.updatedAt = Date.now();
  writeProjectsStore(store);
}

// Carica il progetto selezionato nello stato corrente e aggiorna l'interfaccia.
function switchToProject(id) {
  const store = ensureProjectsStore();
  const target = store.projects.find((p) => p.id === id);
  if (!target) return;
  store.activeId = id;
  writeProjectsStore(store);
  const cfg = target.config || defaultProjectConfig();
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch {}
  applyConfigToState(cfg);
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  render();
  renderProjectsModal();
}

// Crea un nuovo progetto vuoto e lo attiva
function createProject() {
  saveConfig(true);
  const store = ensureProjectsStore();
  const id = genProjectId();
  const now = Date.now();
  const n = store.projects.length + 1;
  store.projects.push({
    id,
    name: projectsDefaultName(n),
    createdAt: now,
    updatedAt: now,
    config: defaultProjectConfig(),
  });
  writeProjectsStore(store);
  switchToProject(id);
}

// Crea una copia del progetto specificato
function duplicateProject(id) {
  saveConfig(true);
  const store = ensureProjectsStore();
  const src = store.projects.find((p) => p.id === id);
  if (!src) return;
  const now = Date.now();
  store.projects.push({
    id: genProjectId(),
    name: (src.name + " " + projectsText("projects.copy_suffix")).slice(0, 60),
    createdAt: now,
    updatedAt: now,
    config: src.config
      ? JSON.parse(JSON.stringify(src.config))
      : defaultProjectConfig(),
  });
  writeProjectsStore(store);
  renderProjectsModal();
}

// Rinomina il progetto tramite prompt utente
function renameProject(id) {
  const store = ensureProjectsStore();
  const p = store.projects.find((x) => x.id === id);
  if (!p) return;
  const name = window.prompt(projectsText("projects.rename_prompt"), p.name);
  if (name == null) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  p.name = trimmed.slice(0, 60);
  p.updatedAt = Date.now();
  writeProjectsStore(store);
  renderProjectsModal();
}

// Elimina il progetto dopo conferma utente
function deleteProject(id) {
  const store = ensureProjectsStore();
  if (store.projects.length <= 1) {
    window.alert(projectsText("projects.cannot_delete_last"));
    return;
  }
  if (!window.confirm(projectsText("projects.delete_confirm"))) return;
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx < 0) return;
  const wasActive = store.activeId === id;
  store.projects.splice(idx, 1);
  if (wasActive) store.activeId = store.projects[0].id;
  writeProjectsStore(store);
  if (wasActive) switchToProject(store.activeId);
  else renderProjectsModal();
}

// Apre la modale progetti e prepara elenco, pulsanti e stato di selezione.
function openProjectsModal() {
  ensureProjectsStore();
  renderProjectsModal();
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = false;
    document.body.classList.add("projects-open");
  }
}

// Chiude la modale di gestione progetti
function closeProjectsModal() {
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = true;
    document.body.classList.remove("projects-open");
  }
}

// Genera l'HTML della lista progetti nella modale
function renderProjectsModal() {
  const list = document.getElementById("projectsList");
  if (!list) return;
  const store = ensureProjectsStore();
  const fmtDate = (ts) => {
    try {
      return new Date(ts).toLocaleDateString(
        state.lang === "ro" ? "ro-RO" : "it-IT",
        { day: "2-digit", month: "short", year: "numeric" },
      );
    } catch {
      return "";
    }
  };
  const actionButtons = (project, compact = false) => `
    <span class="projects-item-actions${compact ? " projects-item-actions--compact" : ""}">
      <button type="button" class="projects-act" title="${projectsText(
        "projects.rename",
      )}" aria-label="${projectsText("projects.rename")}" data-conf-action="rename-project" data-project-id="${project.id}">✎</button>
      <button type="button" class="projects-act" title="${projectsText(
        "projects.duplicate",
      )}" aria-label="${projectsText("projects.duplicate")}" data-conf-action="duplicate-project" data-project-id="${project.id}">⧉</button>
      <button type="button" class="projects-act projects-act--danger" title="${projectsText(
        "projects.delete",
      )}" aria-label="${projectsText("projects.delete")}" data-conf-action="delete-project" data-project-id="${project.id}">🗑</button>
    </span>`;
  const summary = (project) => {
    const count = project.config?.beds?.length || 0;
    return `${projectsText("projects.varieties", { n: count })} · ${projectsText(
      "projects.updated",
      { date: fmtDate(project.updatedAt) },
    )}`;
  };
  const active = store.projects.find(
    (project) => project.id === store.activeId,
  );
  const others = store.projects.filter(
    (project) => project.id !== store.activeId,
  );
  const activeMarkup = active
    ? `<li class="projects-active-card">
        <span class="projects-badge">${projectsText("projects.current")}</span>
        <div class="projects-active-content">
          <div class="projects-active-copy">
            <b>${escapeHtmlProjects(active.name)}</b>
            <small>${summary(active)}</small>
          </div>
          <button type="button" class="projects-open-main" data-conf-action="switch-project" data-project-id="${active.id}">${projectsText("projects.open")}</button>
        </div>
        <div class="projects-active-actions">${actionButtons(active)}</div>
      </li>`
    : "";
  const otherMarkup = others.length
    ? `<li class="projects-list-heading">${projectsText("projects.others")}</li>${others
        .map(
          (project) => `<li class="projects-item">
            <button type="button" class="projects-open-btn" data-conf-action="switch-project" data-project-id="${project.id}">
              <span class="projects-item-name">${escapeHtmlProjects(project.name)}</span>
              <small class="projects-item-meta">${summary(project)}</small>
            </button>
            <button type="button" class="projects-open-secondary" data-conf-action="switch-project" data-project-id="${project.id}">${projectsText("projects.open")}</button>
            ${actionButtons(project, true)}
          </li>`,
        )
        .join("")}`
    : "";
  list.innerHTML = activeMarkup + otherMarkup;
}

// Traduce le chiavi del configuratore sostituendo le variabili dinamiche richieste.
function tx(key, vars = {}) {
  const dict = I18N[state.lang] || I18N.it;
  let value = dict[key] || I18N.it[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

// Restituisce il testo localizzato di un campo pianta
function plantText(plant, field = "nome") {
  if (state.lang === "ro" && PLANT_RO[plant.id]?.[field]) {
    return PLANT_RO[plant.id][field];
  }
  return plant[field];
}

// Restituisce il nome localizzato della pianta per ID
function plantNameById(id) {
  return BYID[id] ? plantText(BYID[id], "nome") : null;
}

// Traduce il livello idrico in etichetta
function waterLabel(value) {
  if (value === "alta") return tx("waterHigh");
  if (value === "bassa") return tx("waterLow");
  return tx("waterMedium");
}

// Traduce l'altezza in etichetta
function heightLabel(value) {
  if (value === "alta") return tx("heightHigh");
  if (value === "bassa") return tx("heightLow");
  return tx("heightMedium");
}

// Formatta la resa in grammi o chilogrammi
function yieldLabel(value) {
  return value < 1
    ? `${(value * 1000).toFixed(0)} g`
    : `${value.toFixed(1)} kg`;
}

// Restituisce la stringa delle distanze di semina
function spacingValue(plant) {
  return plant.dr && plant.dr !== plant.d
    ? `${plant.d}×${plant.dr} cm`
    : `${plant.d} cm`;
}

// Genera un diagramma SVG che visualizza le distanze di semina consigliate.
function spacingInfographicSvg(p) {
  const d = p.d;
  const dr = p.dr || p.d;
  if (!d) return "";
  const W = 224;
  const H = 118;
  const R = 7;
  const cx = [34, 78, 122, 166];
  const cy = [45, 89];
  const pid = p.id.replace(/[^a-z]/g, "");
  const rLbl = tx("distanceInRow");
  const bLbl = tx("distanceBetweenRows");
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

// Restituisce la stringa del ciclo di raccolta
function harvestValue(plant) {
  if (!plant.gg) return tx("perennial");
  return `${tx("about")} ${plant.gg} ${tx("daysShort")}`;
}

// Restituisce la guida di semina nella lingua corrente
function localizedSowingGuide(plant) {
  const sow = SOWING_GUIDE[plant.id];
  if (!sow || state.lang !== "ro") return sow;
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
  const name = plantText(plant, "nome").toLowerCase();
  const row = plant.d;
  const between = plant.dr || plant.d;
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

  let depth = sow.depth
    .replace("Colletto a livello del terreno", "Coletul la nivelul solului")
    .replace(
      "Superficiale, copertura leggerissima",
      "Superficial, acoperire foarte ușoară",
    );
  let thin = `Lasă ${row} cm pe rând și ${between} cm între rânduri.`;
  if (plant.dr === plant.d || !plant.dr) thin = `Lasă ${row} cm între plante.`;

  let tip =
    "Menține umiditatea constantă la pornire și evită aglomerarea plantelor.";
  if (plant.acqua === "alta")
    tip = "Udă regulat, mai ales după transplantare și în zilele calde.";
  if (plant.acqua === "bassa")
    tip = "Evită excesul de apă: are nevoie de sol drenat și aerisit.";
  if (warm.has(plant.id))
    tip = "Așteaptă nopți blânde și evită substratul rece la transplantare.";
  if (direct.has(plant.id))
    tip = "Rărește devreme, ca fiecare plantă să aibă spațiul ei real.";
  if (aromatics.has(plant.id))
    tip = "Ține-o la lumină și nu o acoperi cu culturi mai înalte.";
  if (plant.id === "lattuga")
    tip = "Seamănă puțin și des pentru recolte eșalonate.";
  if (plant.id === "fragola")
    tip = "Nu acoperi inima plantei și mulcește pentru fructe curate.";

  return { method, depth, thin, tip: `${name}: ${tip}` };
}

// Restituisce il nome del mese per l'indice dato
function monthName(index) {
  return (MONTHS[state.lang] || MONTHS.it)[index - 1];
}

// Aggiorna testo e visibilità della barra che indica il preset applicato.
function updatePresetAppliedUI() {
  const box = document.getElementById("presetApplied");
  if (!box) return;
  const active = Boolean(state.activePreset && PRESETS[state.activePreset]);
  box.hidden = !active;
  document.getElementById("presetBar")?.classList.toggle("is-applied", active);
  if (!active) return;

  const option = document.querySelector(
    `#inPreset option[value="${state.activePreset}"]`,
  );
  const presetName = option?.textContent?.trim() || state.activePreset;
  const title = document.getElementById("presetAppliedTitle");
  const hint = document.getElementById("presetAppliedHint");
  const button = document.getElementById("btnPresetSeasonal");
  if (title) title.textContent = tx("presetApplied", { name: presetName });
  if (hint) hint.textContent = tx("presetAppliedHint");
  if (button) {
    const label = tx("returnSeasonalPlan", { month: monthName(state.mese) });
    button.textContent = label;
    button.setAttribute("aria-label", label);
  }
}

// Imposta il testo tradotto in un elemento DOM
function setText(selector, key) {
  const el = document.querySelector(selector);
  if (el) el.textContent = tx(key);
}

// Imposta il testo tradotto in un'opzione select
function setOptionText(selectId, value, key) {
  const opt = document.querySelector(`#${selectId} option[value="${value}"]`);
  if (opt) opt.textContent = tx(key);
}

// Sincronizza il label della select vista mappa
function syncOverlaySelectLabel() {
  const select = document.getElementById("inOverlay");
  const label = document.getElementById("viewModeValue");
  if (!select || !label) return;
  select.value = state.overlay || "";
  label.textContent =
    select.options[select.selectedIndex]?.textContent || tx("viewNatural");
}

// Aggiorna label e icona del pulsante di apertura pannello
function updatePanelToggle(btn) {
  const panel = btn.closest(".panel");
  const isCollapsed = panel?.classList.contains("is-collapsed");
  const label = btn.querySelector(".panel-toggle-label");
  const icon = btn.querySelector(".panel-toggle-icon");
  const isYield = btn.classList.contains("panel-toggle--yield");
  let labelText;
  if (isYield && isCollapsed) {
    labelText = tx("seedListCollapsed");
  } else {
    const openKey = btn.dataset.openKey || "openPanel";
    labelText = isCollapsed ? tx(openKey) : tx("closePanel");
  }
  if (label) label.textContent = labelText;
  if (icon) icon.textContent = "⌃";
  btn.setAttribute("aria-expanded", String(!isCollapsed));
  btn.setAttribute(
    "aria-label",
    isCollapsed ? tx("openPanelLabel") : tx("closePanelLabel"),
  );
}

// Aggiorna tutti i pulsanti pannello in pagina
function updateAllPanelToggles() {
  document.querySelectorAll(".panel-toggle").forEach(updatePanelToggle);
}

// Applica la lingua selezionata ai testi, attributi e controlli del configuratore.
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = tx("title");
  document.querySelectorAll("[data-i18n-conf]").forEach((el) => {
    const key = el.dataset.i18nConf;
    // Cerca la chiave nei dizionari locale e condiviso.
    const translated = I18N[state.lang]?.[key] ?? SITE_I18N[state.lang]?.[key];
    if (!translated) return;
    if (translated.includes("<") || translated.includes("&"))
      el.innerHTML = translated;
    else el.textContent = translated;
  });
  document.querySelectorAll("[data-i18n-conf-aria]").forEach((el) => {
    const translated =
      I18N[state.lang]?.[el.dataset.i18nConfAria] ??
      SITE_I18N[state.lang]?.[el.dataset.i18nConfAria];
    if (translated) el.setAttribute("aria-label", translated);
  });
  document.querySelectorAll("[data-i18n-conf-title]").forEach((el) => {
    const translated = SITE_I18N[state.lang]?.[el.dataset.i18nConfTitle];
    if (translated) el.setAttribute("title", translated);
  });
  // Il pulsante profilo mostra lo stato di accesso, non una voce tradotta.
  window.SerraAPI?.updateNavbarUser?.();
  syncLanguageControls();
  setText("#mainLangLabel", "language");
  setText("#modalLangLabel", "language");
  setText(".brand h1", "brandTitle");
  setText(".brand p", "brandSub");
  setText("#guidedAppTitle", "guidedAppTitle");
  setText("#guidedAppSub", "guidedAppSub");
  setText(
    ".modal-kicker",
    isGuidedBoot() ? "guidedModalKicker" : "modalKicker",
  );
  setText(
    ".modal .hero h2",
    isGuidedBoot() ? "guidedModalTitle" : "modalTitle",
  );
  setText(".modal .hero p", isGuidedBoot() ? "guidedModalCopy" : "modalCopy");
  setText("#personaPickLabel", "personaPickLabel");
  setText("#personaPickHint", "personaPickHint");
  setText("#personaPickAction", "personaPickAction");
  setText("#personaNovTitle", "personaNovTitle");
  setText("#personaNovLevel", "personaNovLevel");
  setText("#personaNovDesc", "personaNovDesc");
  setText("#personaIntTitle", "personaIntTitle");
  setText("#personaIntLevel", "personaIntLevel");
  setText("#personaIntDesc", "personaIntDesc");
  setText("#personaExpTitle", "personaExpTitle");
  setText("#personaExpLevel", "personaExpLevel");
  setText("#personaExpDesc", "personaExpDesc");
  if (typeof syncPersonaPickerSummary === "function")
    syncPersonaPickerSummary();
  if (typeof syncQuickGuide === "function") syncQuickGuide();
  if (typeof updateJourneyContext === "function") updateJourneyContext();
  setText("#vegScrollHint span:first-child", "vegScrollHint");

  const filterIconMap = { all: "🌿", in: "✓", "all-beds": "⌕" };
  const filterLblMap = {
    all: { it: "Seminabili ora", ro: "De semănat acum" },
    in: { it: "Già aggiunte", ro: "Deja adăugate" },
    "all-beds": { it: "Tutti i semi", ro: "Toate semințele" },
  };
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    const f = tab.dataset.filter;
    const ico = filterIconMap[f] || "🌿";
    const lbl =
      (filterLblMap[f] || filterLblMap.all)[state.lang] ||
      (filterLblMap[f] || filterLblMap.all).it;
    tab.innerHTML = `<span class="tab-ico" aria-hidden="true">${ico}</span><span class="tab-lbl">${lbl}</span><span class="tab-count">—</span>`;
  });
  updateVegSearchUI();
  const modalSteps = document.querySelectorAll(".modal-step");
  if (modalSteps[0]) {
    modalSteps[0].querySelector("b").textContent = tx("modalSizeTitle");
    modalSteps[0].querySelector("small").textContent = tx("modalSizeCopy");
  }
  const modalSizeLabels = document.querySelectorAll(".modal-size-row .fld");
  if (modalSizeLabels[0]) modalSizeLabels[0].textContent = tx("width");
  if (modalSizeLabels[1]) modalSizeLabels[1].textContent = tx("length");
  if (modalSteps[1]) {
    modalSteps[1].querySelector("b").textContent = tx("modalZoneTitle");
    modalSteps[1].querySelector("small").textContent = tx("modalZoneCopy");
  }
  setText('#zoneOpts [data-zone="freddo"] b', "zoneColdTitle");
  setText('#zoneOpts [data-zone="freddo"] small', "zoneColdCopy");
  setText('#zoneOpts [data-zone="temperato"] b', "zoneTempTitle");
  setText('#zoneOpts [data-zone="temperato"] small', "zoneTempCopy");
  setText('#zoneOpts [data-zone="caldo"] b', "zoneWarmTitle");
  setText('#zoneOpts [data-zone="caldo"] small', "zoneWarmCopy");
  document.querySelectorAll("#zoneOpts .opt").forEach((opt) => {
    opt.dataset.selectedLabel = tx("selected");
  });
  if (modalSteps[2]) {
    modalSteps[2].querySelector("b").textContent = tx("modalGreenhouseTitle");
    modalSteps[2].querySelector("small").textContent = tx(
      "modalGreenhouseCopy",
    );
  }
  setText(".checkline span", "heated");
  setText("#startBtn", isGuidedBoot() ? "guidedStart" : "start");
  setText(".disclaimer", "disclaimer");
  setText(".panel-head h2", "settingsTitle");
  setText(".panel-head-tag", "settingsTag");
  setText("#sizesSectionLabel", "sizes");
  setText("#climateSectionLabel", "climate");
  setText("#autoPlanSectionLabel", "quickStart");
  const fld = document.querySelectorAll("#panelSettings .fld");
  if (fld[0]) fld[0].textContent = tx("width");
  if (fld[1]) fld[1].textContent = tx("length");
  if (fld[2]) fld[2].textContent = tx("pathWidth");
  if (fld[3]) fld[3].textContent = tx("zone");
  if (fld[4]) fld[4].textContent = tx("greenhouse");
  setText("#presetBar .fld", "readyLayouts");
  setText("#presetBarHint", "readyLayoutsHint");
  setOptionText("inZona", "freddo", "zoneColdOption");
  setOptionText("inZona", "temperato", "zoneTempOption");
  setOptionText("inZona", "caldo", "zoneWarmOption");
  setOptionText("inRisc", "no", "unheated");
  setOptionText("inRisc", "si", "heatedOption");
  setText("#orientLabel", "sunSide");
  setOptionText("inSole", "alto", "sunTop");
  setOptionText("inSole", "basso", "sunBottom");
  setOptionText("inPreset", "", "presetDefault");
  setOptionText("inPreset", "insalate", "presetInsalate");
  setOptionText("inPreset", "salsa", "presetSalsa");
  setOptionText("inPreset", "principiante", "presetPrincipiante");
  setOptionText("inPreset", "aromatiche", "presetAromatiche");
  setOptionText("inPreset", "estivo", "presetEstivo");
  setOptionText("inPreset", "invernale", "presetInvernale");
  setOptionText("inPreset", "radici", "presetRadici");
  setOptionText("inPreset", "foglie", "presetFoglie");
  setOptionText("inPreset", "brassicacee", "presetBrassicacee");
  setOptionText("inPreset", "primaverile", "presetPrimaverile");
  setOptionText("inPreset", "autunnale", "presetAutunnale");
  setOptionText("inPreset", "legumi", "presetLegumi");
  setOptionText("inPreset", "frutti", "presetFrutti");
  setOptionText("inPreset", "cucurbitacee", "presetCucurbitacee");
  setOptionText("inPreset", "soffritto", "presetSoffritto");
  setOptionText("inPreset", "grigliata", "presetGrigliata");
  setOptionText("inPreset", "famiglia", "presetFamiglia");
  document
    .querySelectorAll("#inPreset optgroup[data-i18n-optgroup]")
    .forEach((og) => {
      og.label = tx(og.dataset.i18nOptgroup);
    });
  updatePresetAppliedUI();
  setText("#btnOpenSetup", "openSetup");
  setText("#sowAtLabel", "sowAt");
  const sowMonthSelect = document.getElementById("inMese");
  if (sowMonthSelect) sowMonthSelect.setAttribute("aria-label", tx("sowMonth"));
  setText(".stage-title", "stageTitle");
  setText(".stage-subtitle", "stageSub");
  setText("#viewModeLabel", "viewMode");
  setOptionText("inOverlay", "", "viewNatural");
  setOptionText("inOverlay", "sole", "sunMap");
  setOptionText("inOverlay", "acqua", "waterMap");
  setOptionText("inOverlay", "altezza", "heightMap");
  syncOverlaySelectLabel();
  setText(".crops-customize-summary-text", "cropsSectionCustomize");
  setText("#panelCustomize h2", "customizeTitle");
  setText("#cropActionsTitle", "cropActionsTitle");
  setText("#cropActionsHint", "cropActionsHint");
  setText("#btnArrangeSelected .btn-label", "arrangeSelected");
  setText("#btnArrangeSelected .btn-hint", "arrangeSelectedHint");
  const arrangeSelectedBtn = document.getElementById("btnArrangeSelected");
  if (arrangeSelectedBtn) arrangeSelectedBtn.title = tx("arrangeSelectedTitle");
  setText("#btnFillSelected .btn-label", "fillSelected");
  setText("#btnFillSelected .btn-hint", "fillSelectedHint");
  const fillSelectedBtn = document.getElementById("btnFillSelected");
  if (fillSelectedBtn) fillSelectedBtn.title = tx("fillSelectedTitle");
  setText("#btnStampa .btn-label", "export");
  const printBtn = document.getElementById("btnStampa");
  if (printBtn) printBtn.title = tx("printTitle");
  const mobilePrintBtn = document.getElementById("btnStampaMobile");
  if (mobilePrintBtn) {
    mobilePrintBtn.title = tx("printTitle");
    mobilePrintBtn.setAttribute("aria-label", tx("printTitle"));
  }
  const exportMenu = document.getElementById("projectExportMenu");
  if (exportMenu) exportMenu.setAttribute("aria-label", tx("exportMenuAria"));
  setText("#exportPdfLabel", "exportPdf");
  setText("#exportPdfHint", "exportPdfHint");
  setText("#exportPrintLabel", "exportPrint");
  setText("#exportPrintHint", "exportPrintHint");
  setText("#exportPngLabel", "exportPng");
  setText("#exportPngHint", "exportPngHint");
  setText(".pdp-header-title", "plantSheetTitle");
  setText("#pdpBackBtn span", "closePlantSheet");
  const pdpBackBtn = document.getElementById("pdpBackBtn");
  if (pdpBackBtn)
    pdpBackBtn.setAttribute("aria-label", tx("closePlantSheetAria"));
  setText(".mobile-go-to-scene span", "goToGreenhouse");
  const mobileGoToScene = document.querySelector(".mobile-go-to-scene");
  if (mobileGoToScene)
    mobileGoToScene.setAttribute("aria-label", tx("goToGreenhouseAria"));
  setText("#btnRipristina .btn-label", "restoreAutoFill");
  setText("#btnClear .btn-label", "clearGreenhouse");
  setText("#btnUndoLabel", "undoAction");
  setText("#btnRedoLabel", "redoAction");
  setText("#btnNoviceRestartLabel", "noviceRestart");
  setText("#btnExpertSeasonalLabel", "expertSeasonal");
  updateClearGreenhouseCopy();
  setText("#panelYield h2", "yieldCost");
  setText("#yieldSub", "yieldSub");
  setText("#yieldEditCropsLabel", "yieldEditCropsLabel");
  setText("#yieldEditCropsHint", "yieldEditCropsHint");
  const yieldEditBtn = document.getElementById("btnEditCropsFromYield");
  if (yieldEditBtn)
    yieldEditBtn.setAttribute("aria-label", tx("yieldEditCropsAria"));
  setText("#modeFitTitle", "modeFitTitle");
  setText("#modeFitHint", "modeFitHint");
  setText("#modeExpertTitle", "modeExpertTitle");
  setText("#modeExpertHint", "modeExpertHint");
  updateAllPanelToggles();
  fillMonths();
  // Le voci dei progetti sono generate dinamicamente: riallineale anche se
  // la lingua cambia mentre la modale è già aperta.
  renderProjectsModal();
}

// File generato con npm run build:js: modificare i moduli in conf/draw/.

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 1 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

// Dimensioni tile dei pattern SVG di sfondo
const PAT = {
  soil: { w: 46, h: 46 },
  gravel: { w: 34, h: 34 },
  grass: { w: 40, h: 40 },
  woodGrain: { w: 72, h: 18 },
  dirtPath: { w: 36, h: 36 },
  waterRipple: { w: 24, h: 12 },
  sunRays: { w: 26, h: 26 },
  heightLines: { w: 18, h: 18 },
};

// Casuale deterministico
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

// Forme vegetali SVG
function leafPath(len, wid) {
  return `M0 0 C ${wid} ${-len * 0.16}, ${wid * 0.55} ${-len * 0.85}, 0 ${-len} C ${-wid * 0.55} ${-len * 0.85}, ${-wid} ${-len * 0.16}, 0 0 Z`;
}
// Genera la forma foglia lobata
function lobedLeafPath(len, wid) {
  return `M0 0 Q ${wid * 0.4} ${-len * 0.1} ${wid * 0.5} ${-len * 0.25}
          Q ${wid * 0.15} ${-len * 0.3} ${wid * 0.55} ${-len * 0.45}
          Q ${wid * 0.1} ${-len * 0.5} ${wid * 0.45} ${-len * 0.7}
          Q ${wid * 0.05} ${-len * 0.75} 0 ${-len}
          Q ${-wid * 0.05} ${-len * 0.75} ${-wid * 0.45} ${-len * 0.7}
          Q ${-wid * 0.1} ${-len * 0.5} ${-wid * 0.55} ${-len * 0.45}
          Q ${-wid * 0.15} ${-len * 0.3} ${-wid * 0.5} ${-len * 0.25}
          Q ${-wid * 0.4} ${-len * 0.1} 0 0 Z`;
}
// Genera la forma foglia palmata
function palmatePath(r) {
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
  "cimbru",
]);

// Escape minimale per testo e attributi nel markup SVG generato.
function escapeSvg(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Disegna un glifo semplificato per mantenere leggibili le aiuole molto dense.
function compactGlyph(plant, r, rng) {
  const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
  const shadow = `<ellipse cy="${r * 0.16}" rx="${r * 0.76}" ry="${r * 0.48}" fill="${shade}"/>`;
  const leaf = (len, wid, color, rotation = 0) =>
    `<g transform="rotate(${rotation})"><path d="${leafPath(len, wid)}" fill="${color}"/></g>`;
  const lobed = (len, wid, color, rotation = 0) =>
    `<g transform="rotate(${rotation})"><path d="${lobedLeafPath(len, wid)}" fill="${color}"/></g>`;
  const fruit = c.fr || "#e2452f";
  let s = shadow;

  switch (plant.arch) {
    case "cucurbita": {
      for (let i = 0; i < 5; i++) {
        const angle = i * 72 + rng() * 8;
        s += `<g transform="rotate(${angle})"><path d="${palmatePath(
          r * (0.54 + (i % 2) * 0.06),
        )}" fill="${i % 2 ? c.l1 : c.l2}" stroke="rgba(20,50,20,.14)" stroke-width="${r * 0.025}"/></g>`;
      }
      if (c.fl) {
        for (let i = 0; i < 5; i++)
          s += `<ellipse rx="${r * 0.09}" ry="${r * 0.18}" fill="${c.fl}" transform="rotate(${i * 72}) translate(0 ${-r * 0.13})"/>`;
        s += `<circle r="${r * 0.07}" fill="#e0902a"/>`;
      }
      break;
    }
    case "rampicante": {
      for (let i = 0; i < 4; i++) {
        const angle = i * 90 + rng() * 12;
        const isPea = plant.id === "pisello";
        s += isPea
          ? leaf(r * 0.62, r * 0.34, i % 2 ? c.l1 : c.l2, angle)
          : lobed(r * 0.58, r * 0.4, i % 2 ? c.l1 : c.l2, angle);
      }
      s += `<path d="M${-r * 0.5} ${r * 0.34} Q0 ${-r * 0.62} ${r * 0.5} ${r * 0.12}" fill="none" stroke="${c.l2}" stroke-width="${r * 0.055}" stroke-linecap="round"/><path d="M${r * 0.36} ${-r * 0.18} q${r * 0.22} ${-r * 0.1} ${r * 0.12} ${r * 0.16}" fill="none" stroke="${c.l1}" stroke-width="${r * 0.04}"/>`;
      break;
    }
    case "piumosa": {
      for (let i = 0; i < 6; i++) {
        const angle = i * 60 + rng() * 8;
        const len = r * 0.7;
        s += `<g transform="rotate(${angle})"><path d="M0 0 L0 ${-len}" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.06}" stroke-linecap="round"/><path d="M0 ${-len * 0.35} l${r * 0.17} ${-r * 0.12} M0 ${-len * 0.35} l${-r * 0.17} ${-r * 0.12} M0 ${-len * 0.64} l${r * 0.12} ${-r * 0.1} M0 ${-len * 0.64} l${-r * 0.12} ${-r * 0.1}" stroke="${c.l1}" stroke-width="${r * 0.034}" stroke-linecap="round"/></g>`;
      }
      break;
    }
    case "bulbo": {
      for (let i = -3; i <= 3; i++) {
        const lean = i * r * 0.12;
        s += `<path d="M0 ${r * 0.2} Q${lean} ${-r * 0.32} ${lean * 1.35} ${-r * 0.78}" fill="none" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.11}" stroke-linecap="round"/>`;
      }
      s += `<ellipse cy="${r * 0.18}" rx="${r * 0.26}" ry="${r * 0.18}" fill="${c.fr || c.l2}" opacity=".82"/>`;
      break;
    }
    case "brassica":
    case "foglia": {
      for (let i = 0; i < 6; i++)
        s += lobed(r * 0.72, r * 0.48, i % 2 ? c.l1 : c.l2, i * 60);
      const head =
        c.head || (plant.id.includes("broccolo") ? "#86ad5e" : "#bed6a0");
      s += `<circle r="${r * 0.31}" fill="${head}"/>`;
      if (plant.id.includes("broccolo") || plant.id === "cavolfiore") {
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          s += `<circle cx="${Math.cos(angle) * r * 0.17}" cy="${Math.sin(angle) * r * 0.17}" r="${r * 0.12}" fill="${head}" stroke="rgba(25,55,25,.12)" stroke-width="${r * 0.018}"/>`;
        }
      }
      break;
    }
    case "fragola": {
      for (let i = 0; i < 3; i++) {
        const angle = i * 120 + rng() * 10;
        s += `<g transform="rotate(${angle})">${leaf(r * 0.48, r * 0.29, c.l1)}<g transform="rotate(35)">${leaf(r * 0.36, r * 0.22, c.l2)}</g><g transform="rotate(-35)">${leaf(r * 0.36, r * 0.22, c.l2)}</g></g>`;
      }
      s += `<path d="M${-r * 0.16} ${r * 0.06} q${r * 0.16} ${r * 0.38} ${r * 0.32} 0 q${-r * 0.16} ${r * 0.28} ${-r * 0.32} 0Z" fill="${fruit}"/><circle cx="0" cy="${r * 0.2}" r="${r * 0.035}" fill="#f7d469"/>`;
      break;
    }
    case "erbafine": {
      for (let i = 0; i < 13; i++) {
        const angle = (i / 13) * Math.PI * 2 + rng() * 0.16;
        const len = r * (0.45 + rng() * 0.22);
        s += `<path d="M0 ${r * 0.12} L${Math.cos(angle) * len} ${Math.sin(angle) * len}" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.065}" stroke-linecap="round"/>`;
      }
      break;
    }
    case "frastagliata": {
      for (let i = 0; i < 7; i++)
        s += lobed(r * 0.7, r * 0.4, i % 2 ? c.l1 : c.l2, i * (360 / 7));
      s += `<circle r="${r * 0.12}" fill="${c.l2}"/>`;
      break;
    }
    case "frutto": {
      const pepperFamily = [
        "peperone",
        "peperoncino",
        "friggitello",
        "melanzana",
      ].includes(plant.id);
      for (let i = 0; i < 5; i++) {
        const angle = i * 72 + rng() * 9;
        s += pepperFamily
          ? leaf(r * 0.61, r * 0.32, i % 2 ? c.l1 : c.l2, angle)
          : lobed(r * 0.62, r * 0.36, i % 2 ? c.l1 : c.l2, angle);
      }
      const fruitCount = pepperFamily ? 2 : 3;
      for (let i = 0; i < fruitCount; i++) {
        const angle = (i / fruitCount) * Math.PI * 2 + 0.35;
        const x = Math.cos(angle) * r * 0.28;
        const y = Math.sin(angle) * r * 0.28;
        const rx = pepperFamily ? r * 0.11 : r * 0.13;
        const ry = pepperFamily ? r * 0.2 : r * 0.13;
        s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fruit}" transform="rotate(${pepperFamily ? angle * 57.3 : 0} ${x} ${y})"/>`;
      }
      break;
    }
    case "cespuglio": {
      for (let i = 0; i < 7; i++) {
        const angle = i * (360 / 7) + rng() * 10;
        s += leaf(r * 0.52, r * 0.34, i % 2 ? c.l1 : c.l2, angle);
      }
      s += `<circle r="${r * 0.11}" fill="${c.fl || c.fr || c.l1}"/>`;
      break;
    }
    case "rosetta":
    default: {
      for (let i = 0; i < 8; i++)
        s += leaf(
          r * (i % 2 ? 0.58 : 0.7),
          r * 0.3,
          i % 2 ? c.l1 : c.l2,
          i * 45,
        );
      s += `<circle r="${r * 0.12}" fill="${c.fr || c.l1}"/>`;
    }
  }
  return s;
}

// Mostra il glifo nativo quando la risorsa SVG esterna non è disponibile.
function assetFallbackGlyph(plant, r) {
  const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
  return `<g data-asset-fallback hidden pointer-events="none"><ellipse cy="${r * 0.16}" rx="${r * 0.72}" ry="${r * 0.42}" fill="${shade}"/><path d="${leafPath(r * 0.9, r * 0.34)}" fill="${c.l1}" transform="rotate(-42)"/><path d="${leafPath(r * 0.9, r * 0.34)}" fill="${c.l2}" transform="rotate(42)"/><circle r="${r * 0.18}" fill="${c.fr || c.l1}"/></g>`;
}

// Aggiunge dettagli visivi della specie senza alterare dimensioni e spaziature.
function speciesAccent(plant, r, rng) {
  const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
  const id = plant.id;
  const fruit = c.fr || "#e2452f";
  let s = "";
  const compoundLeaf = (angle, color) => {
    const len = r * 0.62;
    return `<g transform="rotate(${angle})"><path d="M0 0 L0 ${-len}" stroke="${color}" stroke-width="${r * 0.045}" stroke-linecap="round"/><ellipse cx="${r * 0.14}" cy="${-len * 0.34}" rx="${r * 0.1}" ry="${r * 0.22}" fill="${color}" transform="rotate(36 ${r * 0.14} ${-len * 0.34})"/><ellipse cx="${-r * 0.14}" cy="${-len * 0.34}" rx="${r * 0.1}" ry="${r * 0.22}" fill="${color}" transform="rotate(-36 ${-r * 0.14} ${-len * 0.34})"/><ellipse cx="${r * 0.11}" cy="${-len * 0.62}" rx="${r * 0.085}" ry="${r * 0.18}" fill="${color}" transform="rotate(32 ${r * 0.11} ${-len * 0.62})"/><ellipse cx="${-r * 0.11}" cy="${-len * 0.62}" rx="${r * 0.085}" ry="${r * 0.18}" fill="${color}" transform="rotate(-32 ${-r * 0.11} ${-len * 0.62})"/></g>`;
  };

  if (["pomodoro", "tomatillo", "physalis", "patata"].includes(id)) {
    for (let i = 0; i < 3; i++)
      s += compoundLeaf(i * 120 + rng() * 10, i % 2 ? c.l1 : c.l2);
    if (id === "pomodoro") {
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI * 2) / 3 + 0.25;
        s += `<circle cx="${Math.cos(angle) * r * 0.31}" cy="${Math.sin(angle) * r * 0.31}" r="${r * 0.105}" fill="${fruit}"/><path d="M${Math.cos(angle) * r * 0.31} ${Math.sin(angle) * r * 0.31} l${r * 0.05} ${-r * 0.09} l${-r * 0.1} 0Z" fill="${c.l2}"/>`;
      }
    }
    return s;
  }

  if (["peperone", "peperoncino", "melanzana"].includes(id)) {
    const elongated = id !== "melanzana";
    for (let i = 0; i < 3; i++) {
      const angle = i * 120 + 15;
      s += `<g transform="rotate(${angle})"><path d="${leafPath(r * 0.58, r * 0.28)}" fill="${i % 2 ? c.l1 : c.l2}"/><path d="M0 0 L0 ${-r * 0.48}" stroke="rgba(245,255,232,.3)" stroke-width="${r * 0.025}"/></g>`;
    }
    for (let i = 0; i < 2; i++) {
      const x = (i ? 0.22 : -0.22) * r;
      const y = (i ? -0.12 : 0.2) * r;
      s += `<ellipse cx="${x}" cy="${y}" rx="${r * (elongated ? 0.095 : 0.14)}" ry="${r * (elongated ? 0.24 : 0.18)}" fill="${fruit}" transform="rotate(${elongated ? i * 36 - 18 : 0} ${x} ${y})"/><path d="M${x} ${y - r * (elongated ? 0.24 : 0.18)} l${r * 0.06} ${-r * 0.08}" stroke="${c.l2}" stroke-width="${r * 0.04}"/>`;
    }
    return s;
  }

  if (["mais_dolce", "asparago"].includes(id)) {
    const count = id === "mais_dolce" ? 7 : 9;
    for (let i = 0; i < count; i++) {
      const angle = (i - (count - 1) / 2) * (id === "mais_dolce" ? 12 : 18);
      s += `<g transform="rotate(${angle})"><path d="M0 ${r * 0.2} Q${r * 0.13} ${-r * 0.36} 0 ${-r * 0.78} Q${-r * 0.13} ${-r * 0.36} 0 ${r * 0.2}Z" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
    }
    if (id === "mais_dolce")
      s += `<ellipse cy="${-r * 0.06}" rx="${r * 0.12}" ry="${r * 0.29}" fill="#d8b64b"/><path d="M0 ${-r * 0.34} q${r * 0.13} ${-r * 0.1} ${r * 0.22} ${-r * 0.02}" stroke="#916f27" stroke-width="${r * 0.035}" fill="none"/>`;
    return s;
  }

  if (
    [
      "cipolla",
      "cipolla_rossa",
      "cipollotto",
      "porro",
      "aglio",
      "scalogno",
    ].includes(id)
  ) {
    const blades = id === "porro" ? 6 : 5;
    for (let i = 0; i < blades; i++) {
      const spread = (i - (blades - 1) / 2) * r * 0.14;
      const height = r * (id === "porro" ? 0.84 : 0.67);
      s += `<path d="M0 ${r * 0.19} Q${spread} ${-r * 0.18} ${spread * 1.25} ${-height}" fill="none" stroke="${i % 2 ? c.l1 : c.l2}" stroke-width="${r * 0.105}" stroke-linecap="round"/>`;
    }
    if (id === "cipolla_rossa" || id === "scalogno")
      s += `<ellipse cy="${r * 0.17}" rx="${r * 0.22}" ry="${r * 0.16}" fill="${c.fr || "#a64d68"}" opacity=".9"/>`;
    return s;
  }

  if (
    [
      "basilico",
      "menta",
      "melissa",
      "salvia",
      "origano",
      "maggiorana",
      "stevia_dolce",
    ].includes(id)
  ) {
    for (let i = 0; i < 4; i++) {
      const angle = i * 90 + rng() * 8;
      s += `<g transform="rotate(${angle})"><path d="${leafPath(r * 0.52, r * (id === "salvia" ? 0.32 : 0.24))}" fill="${i % 2 ? c.l1 : c.l2}"/><path d="M0 0 L0 ${-r * 0.43}" stroke="rgba(255,255,235,.22)" stroke-width="${r * 0.025}"/></g>`;
    }
    if (["origano", "maggiorana"].includes(id))
      s += `<circle r="${r * 0.11}" fill="#e4c58c" opacity=".85"/>`;
    return s;
  }

  if (["bietola", "barbabietola", "radicchio"].includes(id)) {
    const vein = id === "radicchio" ? "#f0d7d2" : c.fr || "#c76a62";
    for (let i = 0; i < 5; i++) {
      const angle = i * 72;
      s += `<g transform="rotate(${angle})"><path d="M0 0 L0 ${-r * 0.65}" stroke="${vein}" stroke-opacity=".72" stroke-width="${r * 0.045}"/><path d="M0 ${-r * 0.34} l${r * 0.15} ${-r * 0.12} M0 ${-r * 0.34} l${-r * 0.15} ${-r * 0.12}" stroke="${vein}" stroke-opacity=".45" stroke-width="${r * 0.025}"/></g>`;
    }
    return s;
  }

  if (
    [
      "fagiolo",
      "fagiolino",
      "fava",
      "soia_edamame",
      "cece",
      "lenticchia",
      "fagiolo_borlotto",
    ].includes(id)
  ) {
    for (let i = 0; i < 3; i++) {
      const angle = i * 120;
      s += `<g transform="rotate(${angle})"><ellipse cx="${r * 0.13}" cy="${-r * 0.31}" rx="${r * 0.13}" ry="${r * 0.23}" fill="${c.l1}" transform="rotate(34 ${r * 0.13} ${-r * 0.31})"/><ellipse cx="${-r * 0.13}" cy="${-r * 0.31}" rx="${r * 0.13}" ry="${r * 0.23}" fill="${c.l2}" transform="rotate(-34 ${-r * 0.13} ${-r * 0.31})"/><path d="M0 0 L0 ${-r * 0.53}" stroke="${c.l2}" stroke-width="${r * 0.04}"/></g>`;
    }
    return s;
  }

  if (id === "carciofo") {
    for (let i = 0; i < 7; i++)
      s += `<path d="M0 0 Q${r * 0.22} ${-r * 0.32} 0 ${-r * 0.68} Q${-r * 0.22} ${-r * 0.32} 0 0Z" fill="${i % 2 ? c.l1 : c.l2}" transform="rotate(${i * (360 / 7)})"/>`;
    s += `<circle r="${r * 0.2}" fill="#8a9c62"/>`;
  }
  return s;
}

// Disegno piantine

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 2 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function glyph(plant, r, rng, detail = "full") {
  if (detail === "compact") return compactGlyph(plant, r, rng);
  if (LATER_PLANT_SVG_IDS.has(plant?.id)) {
    const size = r * 2;
    const src = window.serraAsset(`assets/img/svg/${plant.id}.svg`);
    return `${assetFallbackGlyph(plant, r)}<image data-plant-asset="${escapeSvg(plant.id)}" href="${src}" x="${-r}" y="${-r}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>`;
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

      s += `<path d="M0 0 q ${r * 0.4} ${-r * 0.4} ${r * 0.1} ${-r * 0.7}" stroke="${c.l2}" stroke-width="${r * 0.04}" fill="none"/>`;
      break;
    }
    case "piumosa": {
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
  return s + speciesAccent(plant, r, rng);
}

// Geometria della serra
function effectiveMonths(plant) {
  const set = new Set(plant.mesi);
  const expand = state.riscaldata || state.zona === "caldo";
  if (expand) {
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
const H_RANK = { bassa: 0, media: 1, alta: 2 };

// Determina il numero di colonne in base alla larghezza
function layoutColumns(Wi) {
  if (Wi >= 420) return 3;
  if (Wi >= 260) return 2;
  return 1;
}

// Calcola il numero massimo di piante in uno spazio
function maxSlotsForSpan(span, spacing) {
  const usable = Math.max(0, span);
  const step = Math.max(1, spacing || 1);
  return Math.max(1, Math.floor(usable / step));
}

// Distribuisce le posizioni centrate nello spazio
function centeredSlots(start, span, count, spacing) {
  const safeCount = Math.max(1, count);
  if (safeCount === 1) return [start + span / 2];
  const step = Math.max(1, spacing || 1);
  const used = (safeCount - 1) * step;
  const first = start + Math.max(0, (span - used) / 2);
  return Array.from({ length: safeCount }, (_, i) => first + i * step);
}

// Verifica se due piante sono incompatibili tra loro
function areIncompatible(a, b) {
  if (!a || !b) return false;
  return a.nemiche.includes(b.id) || b.nemiche.includes(a.id);
}

// Verifica se due piante sono consociate positive
function areCompanions(a, b) {
  if (!a || !b) return false;
  return a.amiche.includes(b.id) || b.amiche.includes(a.id);
}

// Calcola la larghezza utile di un'aiuola
function usableBedWidth() {
  const Wi = state.larghezza * 100;
  const n = Math.min(layoutColumns(Wi), state.beds.length || 1);
  return Math.max(40, (Wi - 2 * MARGIN - (n - 1) * state.path) / n);
}

// Salva l'assegnazione colonna in ogni aiuola
function commitColumnAssignment() {
  const L = computeLayout();
  L.beds.forEach((lb) => {
    if (state.beds[lb.idx]) state.beds[lb.idx].col = lb.columnIndex;
  });
}

// Rimuove l'assegnazione colonna da tutte le aiuole
function clearColumnAssignment() {
  state.beds.forEach((bed) => {
    delete bed.col;
  });
}

// Azzera e ricalcola l'assegnazione delle colonne
function rebalanceColumnsFresh() {
  clearColumnAssignment();
  commitColumnAssignment();
}

// Calcola la struttura geometrica di aiuole, camminamenti e spazi della serra.
function computeLayout() {
  const Wi = state.larghezza * 100,
    Li = state.lunghezza * 100;
  const columnCount = Math.min(layoutColumns(Wi), state.beds.length || 1);
  const bedW = usableBedWidth();
  const columns = Array.from({ length: columnCount }, (_, i) => ({
    index: i,
    x: MARGIN + i * (bedW + state.path),
    y: MARGIN,
    lastPlant: null,
    lastY: MARGIN,
  }));
  let beds = [],
    overflow = false;
  state.beds.forEach((b, idx) => {
    const p = BYID[b.plantId];
    const S = p.d;
    const Sc = p.dr || p.d;
    const isFila = b.layout === "fila" && Li >= 480 && columnCount > 1;

    const Sr = S;
    const innerW = bedW - 2 * BEDPAD;
    const cols = maxSlotsForSpan(innerW, Sc);
    const rows = isFila
      ? maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, S)
      : Math.max(1, Math.ceil(b.count / cols));
    const naturalBedH = isFila
      ? Li - 2 * MARGIN
      : 2 * BEDPAD + Math.max(1, rows) * Sr;
    const minVisualBedH = Math.max(46, visualPlantRadius(p) * 3 + 18);
    const bedH = isFila ? naturalBedH : Math.max(naturalBedH, minVisualBedH);

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
      Sr,
    );
    for (let row = 0; row < rows && placed < b.count; row++) {
      for (let plantCol = 0; plantCol < cols && placed < b.count; plantCol++) {
        positions.push({
          x: xSlots[plantCol],
          y: ySlots[row],
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
      slotHeight: Math.max(10, (naturalBedH - 2 * BEDPAD) / rows),
      layout: isFila ? "fila" : "blocco",
      positions,
    });
    col.y += bedH + BED_GAP;
    col.lastPlant = p;
    col.lastY = y;
  });

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

// Calcola il raggio visivo del glifo vegetale
function visualPlantRadius(plant) {
  return Math.max(plant.d * 0.55, MIN_VISUAL_GLYPH_R);
}

// Riduce soltanto il disegno, mai le distanze agronomiche o i calcoli del piano.
function fittedPlantRadius(plant, bed) {
  const slotW = Math.max(10, (bed.w - 2 * BEDPAD) / Math.max(1, bed.cols));
  const slotH = Math.max(10, bed.slotHeight || slotW);
  const maxRadius = Math.max(4.5, Math.min(slotW, slotH) * 0.43);
  return Math.min(visualPlantRadius(plant), maxRadius);
}

// Distribuisce gli indici emoji lungo le aiuole a serpente.

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 3 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function emojiSpreadIndexes(itemCount, cols, targetCount) {
  if (!targetCount) return new Set();
  if (itemCount <= targetCount)
    return new Set(Array.from({ length: itemCount }, (_, i) => i));
  const safeCols = Math.max(1, cols);
  const rows = Math.ceil(itemCount / safeCols);
  const snake = [];
  for (let row = 0; row < rows; row++) {
    const start = row * safeCols;
    const end = Math.min(start + safeCols, itemCount);
    if (row % 2 === 0) {
      for (let index = start; index < end; index++) snake.push(index);
    } else {
      for (let index = end - 1; index >= start; index--) snake.push(index);
    }
  }
  const result = new Set();
  for (let index = 0; index < targetCount; index++) {
    result.add(snake[Math.floor(((index + 0.5) * snake.length) / targetCount)]);
  }
  return result;
}

// Distribuisce le emoji in base alle coordinate reali delle piante. La scelta
// progressiva del punto più lontano evita concentrazioni sulla stessa fila o
// colonna e funziona anche con ultime righe incomplete.
function spatialEmojiIndexes(items, targetCount) {
  const count = items.length;
  if (!targetCount || count === 0) return new Set();
  if (count <= targetCount)
    return new Set(Array.from({ length: count }, (_, index) => index));

  const xs = items.map((item) => item.pos.x);
  const ys = items.map((item) => item.pos.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);
  const points = items.map((item, index) => ({
    index,
    x: (item.pos.x - minX) / spanX,
    y: (item.pos.y - minY) / spanY,
  }));

  // Un solo simbolo resta centrale; con più simboli partiamo da un estremo e
  // copriamo progressivamente gli altri quadranti dell'aiuola.
  if (targetCount === 1) {
    const center = points.reduce((best, point) => {
      const distance = (point.x - 0.5) ** 2 + (point.y - 0.5) ** 2;
      return !best || distance < best.distance
        ? { index: point.index, distance }
        : best;
    }, null);
    return new Set([center.index]);
  }

  const selected = [points[0]];
  const selectedIds = new Set([points[0].index]);
  while (selected.length < Math.min(targetCount, count)) {
    let best = null;
    points.forEach((point) => {
      if (selectedIds.has(point.index)) return;
      const nearest = Math.min(
        ...selected.map(
          (chosen) => (point.x - chosen.x) ** 2 + (point.y - chosen.y) ** 2,
        ),
      );
      if (
        !best ||
        nearest > best.nearest + 1e-9 ||
        (Math.abs(nearest - best.nearest) <= 1e-9 &&
          point.index < best.point.index)
      ) {
        best = { point, nearest };
      }
    });
    if (!best) break;
    selected.push(best.point);
    selectedIds.add(best.point.index);
  }
  return selectedIds;
}

// Calcola la dimensione ottimale del testo etichetta
function fitLabelSize(text, width, height, sceneWidth, sceneHeight) {
  const greenhouseScale = Math.min(sceneWidth, sceneHeight) * 0.016;
  const maxByWidth = (width - 28) / Math.max(text.length * 0.56, 1);
  const maxByHeight = height * 0.14;
  return Math.max(
    5.76,
    Math.min(11.4, greenhouseScale * 1.2, maxByWidth * 1.2, maxByHeight * 1.2),
  );
}

// Costruzione scena

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 4 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function buildScene({ animatePlants = false, staggerPlants = true } = {}) {
  const harvestRevealDuration = 320;
  // Il numero di glifi resta sempre identico alle piante reali. Limitiamo
  // soltanto le animazioni simultanee, che aggiungono particelle, keyframe e
  // trasformazioni SVG e possono saturare la memoria nelle grandi monoculture.
  const compactDevice =
    window.matchMedia?.("(max-width: 760px), (pointer: coarse)")?.matches ===
    true;
  // Su smartphone la crescita resta ben leggibile ma leggermente piu lenta;
  // il movimento continuo delle singole piante viene invece disattivato.
  const plantGrowthDuration = compactDevice ? 1540 : 1400;
  const maxAnimatedPlantsPerBed = compactDevice ? 220 : 400;
  const maxAnimatedPlantsPerScene = compactDevice ? 800 : 1600;
  const nightMode = document.documentElement.dataset.theme === "dark";
  // Safari iOS può ignorare le animazioni CSS applicate ai gruppi SVG. In quel
  // caso usiamo animateTransform, nativo SVG, per mantenere viva la scena.
  const platform = navigator.platform || "";
  const reduceMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;
  const useSvgMotionFallback =
    !reduceMotion &&
    (/iP(ad|hone|od)/.test(navigator.userAgent) ||
      (platform === "MacIntel" && navigator.maxTouchPoints > 1));
  const L = computeLayout();
  const Wi = L.Wi,
    Li = L.Li;
  const totW = Wi + 2 * WALL,
    totH = Li + 2 * WALL;
  const PAD = 26;
  const vbW = totW + 2 * PAD,
    vbH = totH + 2 * PAD;
  const ox = PAD + WALL,
    oy = PAD + WALL;
  let g = "";

  g += `<defs>
    <radialGradient id="harvestRed" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ff9a82"/><stop offset=".28" stop-color="#e84e3d"/><stop offset=".72" stop-color="#b52e2b"/><stop offset="1" stop-color="#651f25"/></radialGradient>
    <radialGradient id="harvestGreen" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#b9db75"/><stop offset=".3" stop-color="#6fa34d"/><stop offset=".72" stop-color="#3f743b"/><stop offset="1" stop-color="#21472d"/></radialGradient>
    <radialGradient id="harvestOrange" cx="30%" cy="22%" r="80%"><stop offset="0" stop-color="#ffd06c"/><stop offset=".32" stop-color="#ed8a35"/><stop offset=".74" stop-color="#bd5528"/><stop offset="1" stop-color="#74301f"/></radialGradient>
    <radialGradient id="harvestPurple" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#c292c9"/><stop offset=".3" stop-color="#754b83"/><stop offset=".72" stop-color="#4c2d61"/><stop offset="1" stop-color="#281b3d"/></radialGradient>
    <radialGradient id="harvestCream" cx="30%" cy="22%" r="82%"><stop offset="0" stop-color="#fffdf1"/><stop offset=".36" stop-color="#eadfb9"/><stop offset=".76" stop-color="#b8a36f"/><stop offset="1" stop-color="#74633f"/></radialGradient>
    <pattern id="soil" width="${PAT.soil.w}" height="${PAT.soil.h}" patternUnits="userSpaceOnUse">
      <rect width="${PAT.soil.w}" height="${PAT.soil.h}" fill="#5e4632"/>
      <rect width="${PAT.soil.w}" height="${PAT.soil.h}" fill="url(#soilGrad)"/>
      ${soilSpecks()}
    </pattern>
    <radialGradient id="soilGrad" cx="40%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#6f553d"/><stop offset="100%" stop-color="#4a3829"/>
    </radialGradient>
    <pattern id="gravel" width="${PAT.gravel.w}" height="${PAT.gravel.h}" patternUnits="userSpaceOnUse">
      <rect width="${PAT.gravel.w}" height="${PAT.gravel.h}" fill="#d8d0bd"/>
      <rect width="${PAT.gravel.w}" height="${PAT.gravel.h}" fill="url(#gravelLight)" opacity=".72"/>
      ${gravelSpecks()}
    </pattern>
    <linearGradient id="gravelLight" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1ebdb"/><stop offset=".52" stop-color="#d5cab4"/><stop offset="1" stop-color="#b7aa91"/></linearGradient>
    <pattern id="grass" width="${PAT.grass.w}" height="${PAT.grass.h}" patternUnits="userSpaceOnUse">
      <rect width="${PAT.grass.w}" height="${PAT.grass.h}" fill="${nightMode ? "#243b2c" : "#9fb083"}"/>${grassSpecks()}
    </pattern>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b47b45"/><stop offset="35%" stop-color="#936039"/><stop offset="72%" stop-color="#714628"/><stop offset="100%" stop-color="#4d2e1b"/>
    </linearGradient>
    <pattern id="woodGrain" width="${PAT.woodGrain.w}" height="${PAT.woodGrain.h}" patternUnits="userSpaceOnUse">
      <rect width="${PAT.woodGrain.w}" height="${PAT.woodGrain.h}" fill="url(#wood)"/>
      <path d="M0 4 C14 1 23 8 38 4 S59 1 72 5 M0 12 C18 8 29 16 47 11 S62 9 72 13" fill="none" stroke="rgba(55,29,14,.3)" stroke-width="1"/>
      <path d="M8 7 C18 4 25 10 34 7" fill="none" stroke="rgba(255,220,166,.18)" stroke-width=".8"/>
    </pattern>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#dff5f7" stop-opacity=".01"/>
      <stop offset="30%" stop-color="#ffffff" stop-opacity=".03"/>
      <stop offset="44%" stop-color="#ffffff" stop-opacity=".006"/>
      <stop offset="76%" stop-color="#b7d8df" stop-opacity=".012"/>
      <stop offset="100%" stop-color="#7eabb5" stop-opacity=".018"/>
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
    <pattern id="dirtPath" width="${PAT.dirtPath.w}" height="${PAT.dirtPath.h}" patternUnits="userSpaceOnUse">
      <rect width="${PAT.dirtPath.w}" height="${PAT.dirtPath.h}" fill="#c4a55e"/>
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
    <pattern id="mapWaterRipple" width="${PAT.waterRipple.w}" height="${PAT.waterRipple.h}" patternUnits="userSpaceOnUse">
      <path d="M0 7 Q6 2 12 7 T24 7" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="1.2"/>
    </pattern>
    <pattern id="mapSunRays" width="${PAT.sunRays.w}" height="${PAT.sunRays.h}" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <path d="M0 13 H26" stroke="rgba(255,255,255,.36)" stroke-width="1.4"/>
    </pattern>
    <pattern id="mapHeightLines" width="${PAT.heightLines.w}" height="${PAT.heightLines.h}" patternUnits="userSpaceOnUse">
      <path d="M2 15 L9 5 L16 15" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.1"/>
    </pattern>
  </defs>`;

  g += `<rect x="0" y="0" width="${vbW}" height="${vbH}" fill="url(#grass)"/>`;
  g += `<rect x="0" y="0" width="${vbW}" height="${vbH}" fill="url(#daylight)" pointer-events="none"/>`;

  g += `<rect x="${PAD + 5}" y="${PAD + 8}" width="${totW}" height="${totH}" rx="11" fill="#102719" opacity=".26" filter="url(#soft)"/>`;

  g += `<rect x="${PAD}" y="${PAD}" width="${totW}" height="${totH}" rx="10" fill="#657779" stroke="#42575a" stroke-width="1.3"/>`;
  g += `<rect x="${PAD + 1.5}" y="${PAD + 1.5}" width="${totW - 3}" height="${totH - 3}" rx="8.5" fill="none" stroke="rgba(240,248,248,.72)" stroke-width=".9" pointer-events="none"/>`;

  g += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="6" fill="#3a2710"/>`;

  g += `<g clip-path="url(#interiorClip)">`;

  // Perimetro in terra battuta: naturale e distinto dai camminamenti interni.
  g += `<rect x="${ox}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#dirtPath)"/>`;
  g += `<rect x="${ox + Wi - MARGIN}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#dirtPath)"/>`;

  g += `<rect x="${ox + MARGIN}" y="${oy}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#dirtPath)"/>`;
  g += `<rect x="${ox + MARGIN}" y="${oy + Li - MARGIN}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#dirtPath)"/>`;

  for (let i = 0; i < L.columnCount - 1; i++) {
    const pX = MARGIN + (i + 1) * L.bedW + i * state.path;
    g += `<rect x="${ox + pX}" y="${oy}" width="${state.path}" height="${Li}" fill="url(#gravel)"/>`;
  }

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
        g += `<rect x="${ox + sorted[i].x}" y="${oy + gapY}" width="${sorted[i].w}" height="${gapH}" fill="url(#soil)"/>`;
    }
  });

  // Piccoli punti di luce esclusivamente sui camminamenti laterali: decorativi,
  // dietro alle aiuole e senza alcun legame con la disposizione delle piante.
  const pathMoteRng = rngFrom(4781);
  for (let moteIndex = 0; moteIndex < 6; moteIndex++) {
    const onLeft = moteIndex % 2 === 0;
    const moteX = onLeft
      ? ox + MARGIN * (0.24 + pathMoteRng() * 0.42)
      : ox + Wi - MARGIN * (0.24 + pathMoteRng() * 0.42);
    const moteY = oy + Li * (0.12 + pathMoteRng() * 0.76);
    const moteR = 0.9 + pathMoteRng() * 0.9;
    const moteDuration = (5.8 + pathMoteRng() * 3.4).toFixed(2);
    const moteDelay = (-pathMoteRng() * 6).toFixed(2);
    g += `<circle class="scene-path-mote" cx="${moteX}" cy="${moteY}" r="${moteR}" style="--mote-duration:${moteDuration}s;--mote-delay:${moteDelay}s" pointer-events="none"/>`;
  }

  if (L.beds.length === 0) {
    g += `<text x="${ox + Wi / 2}" y="${oy + Li / 2}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="${Math.min(Wi, Li) * 0.06}" fill="#8c8470">${tx("emptyGreenhouse")}</text>`;
  }
  const totalPlants = L.beds.reduce((sum, b) => sum + b.count, 0);
  let animatedPlantTotal = 0;
  L.beds.forEach((bed) => {
    const bx = ox + bed.x,
      by = oy + bed.y;
    const plantLabel = plantText(bed.plant, "nome");
    const bedActionLabel = tx("bedActionAria", {
      plant: plantLabel,
      count: bed.count,
    });

    g += `<g class="bedhit" data-bed="${bed.idx}" role="button" tabindex="0" aria-label="${escapeSvg(bedActionLabel)}"><title>${escapeSvg(bedActionLabel)}</title>`;
    // Terreno aperto: le aiuole sono delimitate naturalmente dai camminamenti,
    // senza assi o contorni che simulino un recinto.
    g += `<rect class="bed-soil" x="${bx}" y="${by}" width="${bed.w}" height="${bed.h}" fill="url(#soil)"/>`;

    // Overlay sotto a piante ed etichette: i dettagli restano sempre leggibili.
    if (state.overlay) g += overlayShape(bed, bx, by);

    const r = fittedPlantRadius(bed.plant, bed);
    // Ogni posizione calcolata dal motore corrisponde a una pianta disegnata.
    const bedItems = bed.positions.map((pos, sourceIndex) => ({
      pos,
      sourceIndex,
    }));
    const glyphDetail =
      totalPlants > 360 || bedItems.length > 60 ? "compact" : "full";
    const emojiCount = Math.min(
      Math.max(1, Math.round(Math.sqrt(bed.count) * 1.3)),
      bedItems.length,
    );
    const emojiIndexes = spatialEmojiIndexes(bedItems, emojiCount);
    const animateThisBed =
      animatePlants &&
      totalPlants <= maxAnimatedPlantsPerScene &&
      bedItems.length <= maxAnimatedPlantsPerBed;
    // Ogni pianta parte da zero e raggiunge esclusivamente la dimensione finale
    // già calcolata dal motore di riempimento per il proprio slot.
    const denseSceneLimit = Math.max(
      1,
      Math.round((bedItems.length / Math.max(1, totalPlants)) * 36),
    );
    const growthIndexes = animateThisBed
      ? new Set(bedItems.map((_, index) => index))
      : new Set();
    animatedPlantTotal += growthIndexes.size;
    // Il movimento ambientale è distribuito e limitato nelle serre molto dense.
    // La trasformazione resta sempre più piccola dell'ingombro finale del glifo.
    const aliveIndexes =
      animateThisBed && !compactDevice
        ? emojiSpreadIndexes(
            bedItems.length,
            bed.cols,
            Math.min(bedItems.length, totalPlants > 120 ? denseSceneLimit : 90),
          )
        : new Set();
    const pendingEmoji = [];
    bedItems.forEach(({ pos, sourceIndex }, i) => {
      const rng = rngFrom((bed.idx + 1) * 7919 + sourceIndex * 131);
      const rr = r * (0.92 + rng() * 0.16);
      const rot = Math.floor(rng() * 360);
      const animateGlyph = growthIndexes.has(i);
      const isAlive = aliveIndexes.has(i);
      const usesNativeGrowth = animateGlyph && useSvgMotionFallback;
      const usesNativeSway = isAlive && useSvgMotionFallback;
      const delay = staggerPlants ? Math.min(420, i * 28) : 0;
      // Tutti i valori restano entro il raggio grafico già calcolato per lo slot.
      // Il terreno pulsa sotto la pianta, senza influenzare geometria o riempimento.
      const particleRng = rngFrom(
        (bed.idx + 1) * 12983 + sourceIndex * 271 + 17,
      );
      const swayRng = rngFrom((bed.idx + 1) * 16127 + sourceIndex * 389 + 31);
      const swayDuration = (2.8 + swayRng() * 1.1).toFixed(2);
      const swayDelay = (-swayRng() * 2.8).toFixed(2);
      const soilParticles = animateGlyph
        ? Array.from({ length: 3 }, (_, particleIndex) => {
            const px = (particleRng() - 0.5) * rr * 0.62;
            const py = rr * (0.08 + particleRng() * 0.3);
            const pr = rr * (0.028 + particleRng() * 0.018);
            return `<circle class="plant-soil-particle" cx="${px}" cy="${py}" r="${pr}" style="--plant-growth-delay:${delay + particleIndex * 42}ms"/>`;
          }).join("")
        : "";
      const soilBloom = animateGlyph
        ? `<ellipse class="plant-soil-bloom" cx="0" cy="${rr * 0.1}" rx="${rr * 0.64}" ry="${rr * 0.24}" style="--plant-growth-delay:${delay}ms"/>`
        : "";
      const leafSheen = animateGlyph
        ? `<path class="plant-leaf-sheen" d="M${-rr * 0.3} ${-rr * 0.08} Q0 ${-rr * 0.42} ${rr * 0.28} ${-rr * 0.2}" stroke-width="${rr * 0.04}" style="--plant-growth-delay:${delay}ms"/>`
        : "";
      const nativeSway = usesNativeSway
        ? `<animateTransform attributeName="transform" type="rotate" values="-2.5 0 0;2.5 0 0;-2.5 0 0" dur="${swayDuration}s" begin="${swayDelay}s" repeatCount="indefinite"/>`
        : "";
      const nativeGrowth = usesNativeGrowth
        ? `<animateTransform attributeName="transform" type="scale" values="0.001;0.86;1" keyTimes="0;.72;1" dur="${plantGrowthDuration}ms" begin="${delay}ms" fill="freeze"/>`
        : "";
      g += `<g transform="translate(${ox + pos.x} ${oy + pos.y}) rotate(${rot})"><g class="plant-glyph-shell${
        isAlive && !usesNativeSway ? " plant-glyph-shell--alive" : ""
      }"${
        isAlive && !usesNativeSway
          ? ` style="--plant-sway-duration:${swayDuration}s;--plant-sway-delay:${swayDelay}s"`
          : ""
      }>${nativeSway}${soilParticles}${soilBloom}<g class="plant-glyph${
        animateGlyph && !usesNativeGrowth ? " plant-glyph--growing" : ""
      }"${
        usesNativeGrowth
          ? ` transform="scale(0.001)"`
          : animateGlyph
            ? ` style="--plant-growth-delay:${delay}ms"`
            : ""
      }>${nativeGrowth}${glyph(bed.plant, rr, rng, glyphDetail)}</g>${leafSheen}</g></g>`;
      const fe = FRUIT_EMOJI[bed.plant.id];
      if (fe && emojiIndexes.has(i)) {
        // Posizionamento e animazione vivono in due gruppi SVG distinti. In
        // questo modo Safari iOS non può ricalcolare la trasformazione rispetto
        // all'intera serra e spingere l'emoji da fuori scena.
        const fs = Math.max(rr * 0.72, 6);
        const emojiY = oy + pos.y - rr * 0.28;
        const emojiDelay = delay + plantGrowthDuration;
        const nativeEmojiReveal = usesNativeGrowth
          ? `<animate attributeName="opacity" values="0;1" dur="${harvestRevealDuration}ms" begin="${emojiDelay}ms" fill="freeze"/><animateTransform attributeName="transform" type="scale" values="0.001;1" dur="${harvestRevealDuration}ms" begin="${emojiDelay}ms" fill="freeze"/>`
          : "";
        pendingEmoji.push(
          `<g transform="translate(${ox + pos.x} ${emojiY})"><g class="plant-harvest-anchor${
            animateGlyph && !usesNativeGrowth
              ? " plant-harvest-anchor--reveal"
              : ""
          }"${usesNativeGrowth ? ` transform="scale(0.001)" opacity="0"` : ""} style="pointer-events:none;user-select:none${
            animateGlyph && !usesNativeGrowth
              ? `;--plant-growth-delay:${delay}ms`
              : ""
          }">${nativeEmojiReveal}<text class="plant-harvest-emoji" x="0" y="0" text-anchor="middle" dominant-baseline="central" font-size="${fs}">${fe}</text></g></g>`,
        );
      }
    });
    const wM = `${(bed.w / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")} m`;
    const hM = `${(bed.h / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")} m`;
    // Il nome resta separato dalle quote: ogni misura segue il lato reale
    // dell'aiuola, con righelli fini appoggiati sul bordo e non sulle piante.
    const label = plantLabel;
    const labelSize = fitLabelSize(label, bed.w, bed.h, vbW, vbH);
    const labelCenterX = bx + bed.w / 2;
    const labelMaxW = Math.max(24, bed.w - 8);
    const labelH = labelSize + 5;
    const labelTop = by + 4;
    const labelW = Math.min(
      labelMaxW,
      Math.max(28, label.length * labelSize * 0.56 + 8),
    );
    const naturalLabelTextW = label.length * labelSize * 0.56;
    const labelTextFit =
      naturalLabelTextW > labelW - 6
        ? ` textLength="${Math.max(18, labelW - 6)}" lengthAdjust="spacingAndGlyphs"`
        : "";
    const dimensionSize = Math.max(
      5.6,
      Math.min(8.6, Math.min(bed.w, bed.h) * 0.115),
    );
    const dimensionStroke = nightMode
      ? "rgba(233,244,235,.78)"
      : "rgba(246,249,241,.8)";
    const dimensionText = nightMode ? "#f0f8ef" : "#f8fbf2";
    const horizontalY = by + bed.h - 3.5;
    const horizontalX1 = bx + 3.5;
    const horizontalX2 = bx + bed.w - 3.5;
    const verticalX = bx + bed.w - 3.5;
    const verticalY1 = by + 3.5;
    const verticalY2 = by + bed.h - 3.5;

    g += `</g>`;
    g += pendingEmoji.join("");
    g += `<g pointer-events="none">`;
    g += `<rect x="${labelCenterX - labelW / 2}" y="${labelTop}" width="${labelW}" height="${labelH}" rx="${Math.min(5, labelH / 2)}" fill="${nightMode ? "rgba(20,43,32,.68)" : "rgba(249,251,245,.62)"}" stroke="${nightMode ? "rgba(176,221,190,.3)" : "rgba(31,80,49,.24)"}" stroke-width=".6"/>`;
    g += `<text x="${labelCenterX}" y="${labelTop + labelH / 2}" dominant-baseline="middle" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="${labelSize}" font-weight="750" fill="${nightMode ? "#e8f4eb" : "#254331"}"${labelTextFit}>${label}</text>`;
    // Larghezza: quota orizzontale sul lato orizzontale dell'aiuola.
    g += `<line x1="${horizontalX1}" y1="${horizontalY}" x2="${horizontalX2}" y2="${horizontalY}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<line x1="${horizontalX1}" y1="${horizontalY - 2.7}" x2="${horizontalX1}" y2="${horizontalY + 2.7}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<line x1="${horizontalX2}" y1="${horizontalY - 2.7}" x2="${horizontalX2}" y2="${horizontalY + 2.7}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<text x="${labelCenterX}" y="${horizontalY - 2.1}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="${dimensionSize}" font-weight="800" fill="${dimensionText}" paint-order="stroke" stroke="rgba(24,43,29,.55)" stroke-width="1.8" stroke-linejoin="round">${wM}</text>`;
    // Lunghezza: quota verticale sul lato verticale dell'aiuola.
    g += `<line x1="${verticalX}" y1="${verticalY1}" x2="${verticalX}" y2="${verticalY2}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<line x1="${verticalX - 2.7}" y1="${verticalY1}" x2="${verticalX + 2.7}" y2="${verticalY1}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<line x1="${verticalX - 2.7}" y1="${verticalY2}" x2="${verticalX + 2.7}" y2="${verticalY2}" stroke="${dimensionStroke}" stroke-width=".7"/>`;
    g += `<text x="${verticalX - 2.1}" y="${by + bed.h / 2}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${verticalX - 2.1} ${by + bed.h / 2})" font-family="DM Sans,sans-serif" font-size="${dimensionSize}" font-weight="800" fill="${dimensionText}" paint-order="stroke" stroke="rgba(24,43,29,.55)" stroke-width="1.8" stroke-linejoin="round">${hM}</text>`;
    g += `</g>`;
  });
  g += `</g>`;

  const lampX = ox + Wi / 2;
  const lampYs = [oy + Li * 0.19, oy + Li * 0.5, oy + Li * 0.81];
  const poolRx = Math.max(38, Math.min(Wi * 0.46, 118));
  const poolRy = Math.max(42, Math.min(Li * 0.19, 94));
  if (nightMode) {
    g += `<g clip-path="url(#interiorClip)" pointer-events="none">`;
    g += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="url(#nightGlass)"/>`;
    lampYs.forEach((lampY) => {
      g += `<ellipse class="scene-lamp-pool" cx="${lampX}" cy="${lampY}" rx="${poolRx}" ry="${poolRy}" fill="url(#lampPool)" style="mix-blend-mode:screen"/>`;
    });
    g += `</g>`;
  }

  if (L.overflow) {
    g += `<line x1="${ox}" y1="${oy + Li}" x2="${ox + Wi}" y2="${oy + Li}" stroke="#b4452c" stroke-width="4" stroke-dasharray="14 8"/>`;
  }

  g += glassStructure(ox, oy, Wi, Li, PAD, totW, totH);

  if (nightMode) {
    lampYs.forEach((lampY) => {
      g += `<g transform="translate(${lampX} ${lampY})" pointer-events="none">`;
      g += `<circle class="scene-lamp-bloom" r="14" fill="#ffe37a" opacity=".24" filter="url(#lampBloom)"/>`;
      g += `<circle r="7.2" fill="#34413d" stroke="#aab5ae" stroke-width="1.3"/>`;
      g += `<circle class="scene-lamp-bulb" r="4.6" fill="url(#lampBulb)" stroke="#fff8ce" stroke-width=".8"/>`;
      g += `<circle cx="-1.4" cy="-1.5" r="1.4" fill="#fff" opacity=".92"/>`;
      g += `</g>`;
    });
  }

  const sunY = state.sudInBasso ? vbH - PAD - 30 : PAD + 18;
  const sunLabelY = state.sudInBasso ? -22 : 30;
  g += `<g transform="translate(${vbW - PAD - 2} ${sunY})" opacity="0.9">
        <circle r="15" fill="${nightMode ? "#10231f" : "#fff"}" stroke="${nightMode ? "#e7d98d" : "#d9a441"}" stroke-width="${nightMode ? "1.5" : "2"}"/>
        <text x="0" y="5" text-anchor="middle" font-size="16">${nightMode ? "🌙" : "☀️"}</text>
        <text x="0" y="${sunLabelY}" text-anchor="middle" font-family="DM Sans" font-size="9" font-weight="800" fill="${nightMode ? "#e9dfaa" : "#7b6a3a"}">${nightMode ? tx("nightLabel") : tx("compassSouth")}</text>
      </g>`;

  const sceneLabel = tx("sceneAria", {
    width: state.larghezza,
    length: state.lunghezza,
    beds: L.beds.length,
  });
  return {
    svg: `<svg viewBox="0 0 ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sceneTitle"><title id="sceneTitle">${escapeSvg(sceneLabel)}</title>${g}</svg>`,
    layout: L,
    plantAnimationSuppressed:
      animatePlants && totalPlants > 0 && animatedPlantTotal < totalPlants,
  };
}

// Genera il vetro e la struttura della serra

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 5 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function glassStructure(ox, oy, Wi, Li, PAD, totW, totH) {
  let s = "";

  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="url(#glass)" pointer-events="none"/>`;
  s += `<g clip-path="url(#interiorClip)" pointer-events="none"><g transform="rotate(-18 ${ox + Wi / 2} ${oy + Li / 2})"><rect class="scene-glass-glint" x="${ox - Wi * 0.34}" y="${oy - Li * 0.1}" width="${Wi * 0.42}" height="${Li * 1.24}" rx="${Math.max(10, Wi * 0.06)}" fill="rgba(255,255,235,.075)"/></g></g>`;

  const bars = Math.max(2, Math.round(Wi / 60));
  for (let i = 1; i < bars; i++) {
    const x = ox + (Wi * i) / bars;
    s += `<line x1="${x + 0.7}" y1="${oy}" x2="${x + 0.7}" y2="${oy + Li}" stroke="rgba(25,57,62,.075)" stroke-width="1.25" pointer-events="none"/>`;
    s += `<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy + Li}" stroke="rgba(255,255,255,.3)" stroke-width=".7" pointer-events="none"/>`;
  }

  const cross = Math.max(2, Math.round(Li / 60));
  for (let i = 1; i < cross; i++) {
    const y = oy + (Li * i) / cross;
    s += `<line x1="${ox}" y1="${y + 0.7}" x2="${ox + Wi}" y2="${y + 0.7}" stroke="rgba(21,50,55,.065)" stroke-width="1.2" pointer-events="none"/>`;
    s += `<line x1="${ox}" y1="${y}" x2="${ox + Wi}" y2="${y}" stroke="rgba(255,255,255,.25)" stroke-width=".65" pointer-events="none"/>`;
  }

  const ridgeX = ox + Wi / 2;
  s += `<polygon points="${ox + 5},${oy + 5} ${ridgeX - 7},${oy + 5} ${ridgeX - 30},${oy + Li - 5} ${ox + 5},${oy + Li - 5}" fill="rgba(224,249,252,.018)" pointer-events="none"/>`;
  s += `<polygon points="${ox + Wi * 0.08},${oy + 5} ${ox + Wi * 0.24},${oy + 5} ${ox + Wi * 0.12},${oy + Li - 5} ${ox + Wi * 0.02},${oy + Li - 5}" fill="rgba(255,255,255,.04)" pointer-events="none"/>`;
  s += `<polygon points="${ridgeX + Wi * 0.09},${oy + 5} ${ridgeX + Wi * 0.2},${oy + 5} ${ridgeX + Wi * 0.33},${oy + Li - 5} ${ridgeX + Wi * 0.22},${oy + Li - 5}" fill="rgba(255,255,255,.025)" pointer-events="none"/>`;

  const brace = Math.min(25, Wi * 0.1, Li * 0.1);
  s += `<path d="M${ox + 3} ${oy + brace} L${ox + brace} ${oy + 3} M${ox + Wi - 3} ${oy + brace} L${ox + Wi - brace} ${oy + 3} M${ox + 3} ${oy + Li - brace} L${ox + brace} ${oy + Li - 3} M${ox + Wi - 3} ${oy + Li - brace} L${ox + Wi - brace} ${oy + Li - 3}" fill="none" stroke="rgba(80,101,103,.72)" stroke-width="1.6" pointer-events="none"/>`;

  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="4" fill="none" stroke="rgba(37,58,61,.58)" stroke-width="5.5" pointer-events="none"/>`;
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="4" fill="none" stroke="url(#frame)" stroke-width="3.8" pointer-events="none"/>`;
  s += `<rect x="${ox - 0.45}" y="${oy - 0.45}" width="${Wi + 0.9}" height="${Li + 0.9}" rx="4.5" fill="none" stroke="rgba(246,252,252,.8)" stroke-width=".75" pointer-events="none"/>`;
  s += `<rect x="${ox + 2.4}" y="${oy + 2.4}" width="${Wi - 4.8}" height="${Li - 4.8}" rx="2.5" fill="none" stroke="rgba(48,70,72,.62)" stroke-width=".8" pointer-events="none"/>`;

  const doorX = ox + Wi / 2;
  const dw = Math.min(Wi * 0.34, 90);
  const doorH = 12;
  const doorY = oy + Li - doorH / 2;
  s += `<rect x="${doorX - dw / 2}" y="${doorY}" width="${dw}" height="${doorH}" rx="2.5" fill="rgba(213,238,241,.9)" stroke="#60787a" stroke-width="1.4" pointer-events="none"/>`;
  s += `<line x1="${doorX}" y1="${doorY + 2}" x2="${doorX}" y2="${doorY + doorH - 2}" stroke="rgba(91,111,112,.72)" stroke-width="1.5" pointer-events="none"/>`;
  s += `<rect x="${doorX - dw / 2 + 4}" y="${doorY + 3}" width="${dw - 8}" height="${doorH - 6}" rx="2" fill="url(#glass)" stroke="rgba(255,255,255,.62)" stroke-width=".8" pointer-events="none"/>`;
  s += `<circle cx="${doorX + dw * 0.18}" cy="${doorY + doorH / 2}" r="1.45" fill="#9a7138" stroke="rgba(255,255,255,.7)" stroke-width=".45" pointer-events="none"/>`;
  s += `<text x="${doorX}" y="${doorY + doorH + 12}" text-anchor="middle" font-family="DM Sans" font-size="9" font-weight="800" fill="#4b5d5e" stroke="rgba(255,255,255,.82)" stroke-width="2" paint-order="stroke" pointer-events="none">${tx("greenhouseEntrance")}</text>`;
  return s;
}

// Genera i dettagli del camminamento in terra
function dirtPathSpecks() {
  let s = "";
  const r = rngFrom(54321);
  for (let i = 0; i < 28; i++) {
    const light = r() > 0.5;
    const col = light ? `rgba(220,185,110,.45)` : `rgba(90,58,18,.38)`;
    s += `<circle cx="${r() * PAT.dirtPath.w}" cy="${r() * PAT.dirtPath.h}" r="${0.4 + r() * 1.8}" fill="${col}"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const x = r() * PAT.dirtPath.w,
      y = r() * PAT.dirtPath.h;
    const len = 2 + r() * 5;
    const angle = r() * 180;
    const rad = (angle * Math.PI) / 180;
    s += `<line x1="${x}" y1="${y}" x2="${x + Math.cos(rad) * len}" y2="${y + Math.sin(rad) * len}" stroke="rgba(78,48,14,.22)" stroke-width="1" stroke-linecap="round"/>`;
  }
  return s;
}
// Genera le macchie texture del terreno
function soilSpecks() {
  let s = "";
  const r = rngFrom(12345);
  for (let i = 0; i < 16; i++) {
    s += `<circle cx="${r() * PAT.soil.w}" cy="${r() * PAT.soil.h}" r="${1 + r() * 2.4}" fill="rgba(${r() > 0.5 ? "40,28,18" : "120,96,68"},.5)"/>`;
  }
  return s;
}
// Genera le pietre texture della ghiaia
function gravelSpecks() {
  let s = "";
  const r = rngFrom(777);
  for (let i = 0; i < 18; i++) {
    const g = 170 + Math.floor(r() * 60);
    const x = r() * PAT.gravel.w;
    const y = r() * PAT.gravel.h;
    const rx = 1.4 + r() * 2.4;
    const ry = 0.8 + r() * 1.5;
    const angle = -28 + r() * 56;
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${angle} ${x} ${y})" fill="rgb(${g},${g - 8},${g - 22})" stroke="rgba(78,72,58,.3)" stroke-width=".45"/>`;
    s += `<ellipse cx="${x - 0.45}" cy="${y - 0.35}" rx="${Math.max(0.45, rx * 0.42)}" ry="${Math.max(0.3, ry * 0.28)}" fill="rgba(255,255,255,.38)"/>`;
  }
  return s;
}
// Genera i fili d'erba del prato esterno
function grassSpecks() {
  let s = "";
  const r = rngFrom(303);
  for (let i = 0; i < 20; i++) {
    const x = r() * PAT.grass.w,
      y = r() * PAT.grass.h;
    s += `<line x1="${x}" y1="${y}" x2="${x + (r() - 0.5) * 3}" y2="${y - 2 - r() * 3}" stroke="rgba(${(70 + r() * 40) | 0},${(110 + r() * 40) | 0},60,.6)" stroke-width="1"/>`;
  }
  return s;
}

// Stile colore dell'overlay analitico.
function overlayStyleForPlant(p, kind) {
  if (kind === "sole") {
    return p.sole === "pieno"
      ? {
          fill: "url(#mapSunFull)",
          pattern: "url(#mapSunRays)",
          stroke: "#d98316",
        }
      : { fill: "url(#mapSunShade)", pattern: "", stroke: "#5e83aa" };
  }
  if (kind === "acqua") {
    if (p.acqua === "alta")
      return {
        fill: "url(#mapWaterHigh)",
        pattern: "url(#mapWaterRipple)",
        stroke: "#0e73ba",
      };
    if (p.acqua === "media")
      return {
        fill: "url(#mapWaterMedium)",
        pattern: "url(#mapWaterRipple)",
        stroke: "#3e9ed0",
      };
    return { fill: "url(#mapWaterLow)", pattern: "", stroke: "#99a95f" };
  }
  if (kind === "altezza") {
    if (p.h === "alta")
      return {
        fill: "url(#mapHeightHigh)",
        pattern: "url(#mapHeightLines)",
        stroke: "#123f23",
      };
    if (p.h === "media")
      return {
        fill: "url(#mapHeightMedium)",
        pattern: "url(#mapHeightLines)",
        stroke: "#3f8f45",
      };
    return { fill: "url(#mapHeightLow)", pattern: "", stroke: "#9bc86c" };
  }
  return null;
}

// Disegna il rettangolo colorato dell'overlay sull'aiuola

// -----------------------------------------------------------------------------
// Disegno della scena e delle aiuole — sezione 6 di 6
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function overlayShape(bed, bx, by) {
  const style = overlayStyleForPlant(bed.plant, state.overlay);
  if (!style) return "";
  let s = `<rect x="${bx + 1}" y="${by + 1}" width="${Math.max(0, bed.w - 2)}" height="${Math.max(0, bed.h - 2)}" rx="3" fill="${style.fill}" pointer-events="none"/>`;
  if (style.pattern) {
    s += `<rect x="${bx + 1}" y="${by + 1}" width="${Math.max(0, bed.w - 2)}" height="${Math.max(0, bed.h - 2)}" rx="3" fill="${style.pattern}" pointer-events="none"/>`;
  }
  if (state.overlay === "acqua" && style.pattern) {
    const rippleRx = Math.max(4, Math.min(bed.w * 0.14, 16));
    const rippleRy = rippleRx * 0.32;
    const rippleX = bx + bed.w * 0.48;
    const rippleY = by + bed.h * 0.54;
    s += `<g transform="translate(${rippleX} ${rippleY})" pointer-events="none"><g class="water-overlay-ripple"><ellipse rx="${rippleRx}" ry="${rippleRy}"/><ellipse rx="${rippleRx * 0.56}" ry="${rippleRy * 0.56}"/></g></g>`;
  }
  s += `<rect x="${bx + 1.5}" y="${by + 1.5}" width="${Math.max(0, bed.w - 3)}" height="${Math.max(0, bed.h - 3)}" rx="3" fill="none" stroke="${style.stroke}" stroke-width="2" stroke-opacity=".78" pointer-events="none"/>`;
  return s;
}

// File generato con npm run build:js: modificare i moduli in conf/ui/.

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 1 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

// Genera le card delle colture con stato, quantità e azioni disponibili.
function vegCardHTML(p, inb, outOfSeason = false, inConflict = false) {
  const diff = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diff === 1
      ? tx("diffEasy")
      : diff === 2
        ? tx("diffMedium")
        : tx("diffHard");
  const diffClass =
    diff === 1 ? "diff-easy" : diff === 2 ? "diff-medium" : "diff-hard";
  const soleIco = p.sole === "pieno" ? "☀️" : "🌤️";
  const harvestTag = p.gg
    ? `⏱ ${p.gg} ${tx("daysShort")}`
    : `∞ ${tx("perennial")}`;
  const offSeasonBadge = outOfSeason
    ? `<span class="veg-offseason">${tx("offSeason")}</span>`
    : "";
  if (inb) {
    const bed = state.beds.find((b) => b.plantId === p.id);
    const count = bed ? bed.count : 0;
    const locked = Boolean(bed?.countLocked);
    const lockBadge = locked
      ? `<span class="veg-lock-badge">${tx("qtyLocked")}</span>`
      : `<span class="veg-auto-badge">${tx("qtyAuto")}</span>`;
    const conflictBadge = inConflict
      ? `<span class="veg-conflict" title="${tx("companion.conflict_badge")}" aria-label="${tx("companion.conflict_badge")}">⚠️</span>`
      : "";
    return `<div class="veg in ${locked ? "qty-locked" : ""}${inConflict ? " veg--conflict" : ""}">
    <div class="veg-in-main">
      <span class="ico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
      <div class="nm">
        <div class="veg-nameline">
          <span class="veg-name">${plantText(p, "nome")}</span>${offSeasonBadge}${conflictBadge}
        </div>
        <div class="veg-tags">
          <span class="vtag">${soleIco}</span>
          <span class="vtag">${harvestTag}</span>
        </div>
        <span class="veg-diff ${diffClass}">${diffLabel}</span>
      </div>
    </div>
    <div class="veg-qty-panel">
      <div class="veg-qty-topline">
        <span>${tx("qtyLabel")}</span>
        ${lockBadge}
      </div>
      <div class="veg-qty-ctl">
        <button class="veg-step" data-veg-cnt="-1" data-veg-plant="${p.id}" aria-label="${tx("qtyDecrease")}">−</button>
        <input class="veg-qty-input" type="number" min="1" step="1" inputmode="numeric" value="${count}" data-veg-count-input="${p.id}" aria-label="${tx("qtyInputAria")} ${plantText(p, "nome")}">
        <button class="veg-step" data-veg-cnt="1" data-veg-plant="${p.id}" aria-label="${tx("qtyIncrease")}">+</button>
      </div>
    </div>
    <button class="add remove-from-seed" data-remove-plant="${p.id}" title="${tx("remove")}">×</button>
  </div>`;
  }
  return `<div class="veg">
    <span class="ico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
    <div class="nm">
      <div class="veg-nameline">
        <span class="veg-name">${plantText(p, "nome")}</span>${offSeasonBadge}
      </div>
      <div class="veg-tags">
        <span class="vtag">${soleIco}</span>
        <span class="vtag">${harvestTag}</span>
      </div>
      <span class="veg-diff ${diffClass}">${diffLabel}</span>
    </div>
    <button class="add" data-add="${p.id}">+</button>
  </div>`;
}

// Aggiorna la lista colture con filtri e ricerca
function renderVegList() {
  updateVegSearchUI();
  if (state.livello === "novizio" && vegFilter !== "in") {
    vegFilter = "in";
  }
  const sem = seminabili();
  const present = new Set(state.beds.map((b) => b.plantId));

  const subEl = document.getElementById("seminabiliSub");
  const semSet = new Set(sem.map((p) => p.id));
  if (vegFilter === "in") {
    const n = state.beds.length;
    const label = n === 1 ? tx("cropSingular") : tx("cropPlural");
    subEl.innerHTML = tx("filterDescIn", { count: n, label });
  } else if (vegFilter === "all-beds") {
    subEl.innerHTML = tx("filterDescAllBeds", {
      count: PLANTS.length,
      seasonal: sem.length,
    });
  } else {
    subEl.innerHTML = tx("filterDescAll", { count: sem.length });
  }

  const countMap = {
    all: sem.length,
    in: state.beds.length,
    "all-beds": PLANTS.length,
  };
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === vegFilter);
    const countEl = tab.querySelector(".tab-count");
    if (countEl) countEl.textContent = countMap[tab.dataset.filter] ?? "—";
  });

  let filtered;
  if (vegFilter === "in") {
    filtered = PLANTS.filter((p) => present.has(p.id));
  } else if (vegFilter === "all-beds") {
    filtered = PLANTS;
  } else {
    filtered = sem;
  }

  const totalBeforeSearch = filtered.length;
  const searchNeedle = normalizeVegSearchText(vegSearchQuery);
  if (searchNeedle && state.livello !== "novizio") {
    filtered = filtered.filter((p) => {
      const haystack = [
        plantText(p, "nome"),
        p.id,
        p.nome,
        p.nome_ro,
        p.categoria,
        p.category,
      ]
        .map(normalizeVegSearchText)
        .join(" ");
      return haystack.includes(searchNeedle);
    });
    if (subEl) {
      const shown = filtered.length;
      const base = subEl.innerHTML;
      const searchMsg =
        state.lang === "ro"
          ? ` · afisate ${shown} din ${totalBeforeSearch}`
          : ` · mostrate ${shown} di ${totalBeforeSearch}`;
      subEl.innerHTML = `${base}<span class="search-count-note">${searchMsg}</span>`;
    }
  }

  const vl = document.getElementById("vegList");
  if (!filtered.length) {
    const msg =
      searchNeedle && state.livello !== "novizio"
        ? `<div class="empty-note">${tx("vegSearchEmpty")}</div>`
        : vegFilter === "in" || vegFilter === "all-beds"
          ? `<div class="empty-note">${tx("vegNoMore")}</div>`
          : `<div class="empty-note">${tx("noCrops", { month: monthName(state.mese) })}</div>`;
    vl.innerHTML = msg;
    updateVegListScrollAffordance();
    return;
  }

  const locale = state.lang === "ro" ? "ro" : "it";
  filtered.sort((a, b) => {
    if (vegFilter === "all-beds" || vegFilter === "in") {
      const aOut = !semSet.has(a.id);
      const bOut = !semSet.has(b.id);
      if (aOut !== bOut) return aOut ? 1 : -1;
    }
    return plantText(a, "nome").localeCompare(plantText(b, "nome"), locale);
  });
  const noviceUpgrade =
    state.livello === "novizio"
      ? `<div class="novice-crops-note">
          <div>
            <b>${tx("noviceCropsNoteTitle")}</b>
            <span>${tx("noviceCropsNoteText")}</span>
          </div>
          <button type="button" data-upgrade-level="intermedio">${tx("noviceCropsUpgrade")}</button>
        </div>`
      : "";
  const conflictIds = analyzeCompanions().conflictIds;
  vl.innerHTML =
    noviceUpgrade +
    filtered
      .map((p) =>
        vegCardHTML(
          p,
          present.has(p.id),
          !semSet.has(p.id),
          conflictIds.has(p.id),
        ),
      )
      .join("");
  updateVegListScrollAffordance();
}

// Mostra o nasconde il suggerimento di scorrimento lista
function updateVegListScrollAffordance() {
  const list = document.getElementById("vegList");
  const wrap = document.getElementById("vegListScrollWrap");
  const hint = document.getElementById("vegScrollHint");
  if (!list || !wrap || !hint) return;
  requestAnimationFrame(() => {
    const scrollable = list.scrollHeight > list.clientHeight + 2;
    const atEnd =
      !scrollable ||
      list.scrollTop + list.clientHeight >= list.scrollHeight - 6;
    hint.hidden = !scrollable;
    wrap.classList.toggle("has-overflow", scrollable);
    wrap.classList.toggle("is-at-end", atEnd);
  });
}

// Abilita o disabilita i pulsanti azione colture
function updateCropActionControls() {
  const hasCrops = state.beds.length > 0;
  const noviceLocked = state.livello === "novizio";
  const arrangeBtn = document.getElementById("btnArrangeSelected");
  const fillBtn = document.getElementById("btnFillSelected");
  const clearBtn = document.getElementById("btnClear");
  if (arrangeBtn) arrangeBtn.disabled = !hasCrops;
  if (fillBtn) fillBtn.disabled = !hasCrops;
  if (clearBtn) {
    clearBtn.disabled = !hasCrops || noviceLocked;
    clearBtn.classList.toggle("is-level-locked", noviceLocked);
    clearBtn.setAttribute("aria-disabled", String(!hasCrops || noviceLocked));
  }
  updateClearGreenhouseCopy();
}

// Aggiorna il testo del pulsante svuota serra
function updateClearGreenhouseCopy() {
  const clearBtn = document.getElementById("btnClear");
  if (!clearBtn) return;
  const noviceLocked = state.livello === "novizio";
  const hint = clearBtn.querySelector(".btn-hint");
  if (hint)
    hint.innerHTML = noviceLocked
      ? tx("clearGreenhouseLockedHint")
      : tx("clearGreenhouseHint");
  clearBtn.title = noviceLocked
    ? tx("clearGreenhouseLockedTitle")
    : tx("clearGreenhouseTitle");
}

// Restituisce la stagione per un dato mese
function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}

// Aggiorna il tag stagione e le icone del footer
function renderFooter() {
  const stag = getStagione(state.mese);
  const sharedDict =
    window.SERRA_I18N?.index?.[state.lang] ||
    window.SERRA_I18N?.index?.it ||
    {};
  const seasonKey = {
    inverno: "winter",
    primavera: "spring",
    estate: "summer",
    autunno: "autumn",
  }[stag];
  const stagLabel = sharedDict["season_name." + seasonKey] || stag;
  const tagEl = document.getElementById("footerSeasonTag");
  if (tagEl) tagEl.innerHTML = stagLabel;

  const rowEl = document.getElementById("footerPlantRow");
  if (rowEl && !rowEl.dataset.built) {
    const icons = PLANTS.map((p) => {
      const emoji = FRUIT_EMOJI[p.id] || "🌱";
      return `<span class="footer-plant-icon"><span class="footer-plant-icon-visual footer-plant-icon-visual--emoji" role="img" aria-label="${p.nome}">${emoji}</span></span>`;
    }).join("");
    rowEl.innerHTML = icons + icons;
    rowEl.dataset.built = "1";
  }
}

// Aggiorna scena, pannelli e riepilogo in base allo stato della configurazione.
let lastRenderedCropSignature = null;
let renderGeneration = 0;
// La prima scena coltivata deve crescere indipendentemente dal punto di
// ingresso: su mobile spesso il configuratore viene riaperto direttamente.
const animateInitialCrops = true;

function cropSignature() {
  return state.beds
    .map((bed) => `${bed.plantId}:${bed.count}`)
    .sort()
    .join("|");
}

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 2 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function render() {
  const currentRenderGeneration = ++renderGeneration;
  const zoneNames = {
    freddo: tx("cold"),
    temperato: tx("temperate"),
    caldo: tx("warm"),
  };
  const zoneValue =
    zoneNames[state.zona] + (state.riscaldata ? ` · ${tx("heatedShort")}` : "");
  const monthValue = monthName(state.mese);
  const areaValue = `${state.larghezza}×${state.lunghezza} m`;
  const tagZonaValue = document.getElementById("tagZonaValue");
  const tagMeseValue = document.getElementById("tagMeseValue");
  const tagAreaValue = document.getElementById("tagAreaValue");
  if (tagZonaValue) tagZonaValue.textContent = zoneValue;
  if (tagMeseValue) tagMeseValue.textContent = monthValue;
  if (tagAreaValue) tagAreaValue.textContent = areaValue;
  const guidedSetupCurrent = document.getElementById("guidedSetupCurrent");
  if (guidedSetupCurrent) {
    guidedSetupCurrent.textContent = `${areaValue} · ${zoneValue} · ${monthValue}`;
  }

  const bmt = document.getElementById("btnMonthTag");
  if (bmt) bmt.textContent = monthName(state.mese);
  updatePresetAppliedUI();

  const currentCropSignature = cropSignature();
  const isInitialPlantRender = lastRenderedCropSignature === null;
  const animatePlantGrowth =
    (isInitialPlantRender && animateInitialCrops && state.beds.length > 0) ||
    (!isInitialPlantRender &&
      currentCropSignature !== lastRenderedCropSignature);
  lastRenderedCropSignature = currentCropSignature;

  const built = buildScene({
    animatePlants: animatePlantGrowth,
    // All'ingresso tutte le piante iniziano subito a crescere: lo stagger resta
    // soltanto per le modifiche successive, quando rende leggibile il cambiamento.
    staggerPlants: !isInitialPlantRender,
  });
  const scene = document.getElementById("scene");
  scene.classList.toggle("scene--dense-reveal", built.plantAnimationSuppressed);
  scene.innerHTML = built.svg;
  bindPlantAssetFallbacks();
  const L = built.layout;
  const used = (L.usedH / 100).toFixed(1);
  const status = L.overflow
    ? tx("tooFull")
    : state.beds.length
      ? tx("organized")
      : tx("emptyStatus");
  document.getElementById("scaleNote").innerHTML = tx("scale", {
    w: state.larghezza,
    l: state.lunghezza,
    used,
    status,
  });

  const lg = document.getElementById("legend");
  if (state.overlay === "sole")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#fff2a6,#f5bd2d,#df7f1b)", tx("fullSun")],
      ["linear-gradient(135deg,#d9edf5,#8fb5d1,#5d7fa4)", tx("halfShade")],
    ]);
  else if (state.overlay === "acqua")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#8ee8ff,#238bd4,#075aa3)", tx("waterHigh")],
      ["linear-gradient(135deg,#c8f0ff,#78bfe6,#3f92c9)", tx("waterMedium")],
      ["linear-gradient(135deg,#eef5e4,#cfdba5,#a8b46d)", tx("waterLow")],
    ]);
  else if (state.overlay === "altezza")
    lg.innerHTML = legend([
      ["linear-gradient(180deg,#0d3d22,#275827)", tx("heightHigh")],
      ["linear-gradient(180deg,#3f8f45,#8fca61)", tx("heightMedium")],
      ["linear-gradient(180deg,#a9d870,#ecf6b5)", tx("heightLow")],
    ]);
  else lg.innerHTML = "";

  const emptyBanner = document.getElementById("stageEmptyBanner");
  document.body.classList.toggle("serra-empty", state.beds.length === 0);
  if (emptyBanner) {
    const b = emptyBanner.querySelector(".seb-copy b");
    const s = emptyBanner.querySelector(".seb-copy span");
    if (b) b.textContent = tx("emptyBannerTitle");

    if (s)
      s.innerHTML = tx(
        state.livello === "novizio"
          ? "emptyBannerCopyNovice"
          : "emptyBannerCopy",
      );
    emptyBanner.hidden = state.beds.length > 0;
  }

  const renderSecondaryInterface = () => {
    if (currentRenderGeneration !== renderGeneration) return;
    renderVegList();
    updateCropActionControls();
    renderBeds();
    renderWarnings(L);
    renderSummary();
    renderFooter();

    // Se la scheda pianta e aperta, riallinea anche i suoi contenuti dinamici.
    // Serve in particolare al cambio lingua, perche le etichette della scheda
    // non fanno parte dei nodi statici aggiornati da applyLanguage().
    const plantDetailPanelElement = document.getElementById("panelPlantDetail");
    if (
      plantDetailPanelElement &&
      !plantDetailPanelElement.hidden &&
      state.selected >= 0
    ) {
      const activeDetailTab =
        document.querySelector("#pdpContent [data-detail-tab].active")?.dataset
          .detailTab || "overview";
      renderPlantDetailPanel(activeDetailTab);
    }
  };

  if (isInitialPlantRender) {
    // La prima immagine della serra deve arrivare al browser prima dei pannelli
    // non essenziali. Il timer dentro requestAnimationFrame lascia avvenire un
    // paint completo e riprende subito dopo con catalogo, riepilogo e footer.
    window.requestAnimationFrame(() =>
      window.setTimeout(renderSecondaryInterface, 0),
    );
  } else {
    renderSecondaryInterface();
  }

  document.querySelectorAll(".bedhit").forEach((el) => {
    const openBedDetail = () => {
      const idx = parseInt(el.dataset.bed);
      if (state.selected === idx) {
        state.selected = -1;
        closePlantDetailPanel();
      } else {
        const detailReturnScroll = isResponsiveConfiguratorLayout()
          ? null
          : { left: window.scrollX, top: window.scrollY };
        state.selected = idx;
        render();
        openPlantDetailPanel(detailReturnScroll);
      }
    };
    el.addEventListener("click", openBedDetail);
    el.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openBedDetail();
    });
  });
}

// Attiva il glifo nativo solo se un file SVG esterno non è disponibile.
function bindPlantAssetFallbacks() {
  document
    .querySelectorAll("#scene image[data-plant-asset]")
    .forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          image.previousElementSibling?.removeAttribute("hidden");
          image.remove();
        },
        { once: true },
      );
    });
}
// Genera l'HTML della legenda overlay
function legend(items) {
  return items
    .map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`)
    .join("");
}

// Genera la lista chip delle aiuole
function renderBeds() {
  const bl = document.getElementById("bedsList");
  if (!bl) return;
  if (state.beds.length === 0) {
    bl.innerHTML = `<div class="empty-note">${tx("noBeds")}</div>`;
    return;
  }
  const semSet = new Set(seminabili().map((p) => p.id));
  bl.innerHTML = state.beds
    .map((b, i) => {
      const p = BYID[b.plantId];
      const diff = DIFFICULTY[p.id] || 2;
      const diffLabel =
        diff === 1
          ? tx("diffEasy")
          : diff === 2
            ? tx("diffMedium")
            : tx("diffHard");
      const diffClass =
        diff === 1 ? "diff-easy" : diff === 2 ? "diff-medium" : "diff-hard";
      const offSeasonBadge = !semSet.has(p.id)
        ? `<span class="veg-offseason">${tx("offSeason")}</span>`
        : "";
      return `<div class="bedchip ${i === state.selected ? "sel" : ""}" data-sel="${i}">
      <span class="bedico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
      <div class="bedchip-body">
        <div class="t">${plantText(p, "nome")}${offSeasonBadge}</div>
        <div class="bedchip-sub">
          <span class="c">${b.count}&nbsp;${tx("piecesShort")}</span>
          <span class="bedchip-dot" aria-hidden="true">·</span>
          <span class="bedchip-gg">${p.gg}&nbsp;${tx("daysShort")}</span>
          <span class="bedchip-dot" aria-hidden="true">·</span>
          <span class="bedchip-diff ${diffClass}">${diffLabel}</span>
        </div>
      </div>
      <button class="del" data-del="${i}" title="${tx("remove")}">✕</button>
    </div>`;
    })
    .join("");
  bl.querySelectorAll("[data-sel]").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target.dataset.del !== undefined) return;
      state.selected = parseInt(el.dataset.sel);
      render();
    }),
  );
  bl.querySelectorAll("[data-del]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const i = parseInt(el.dataset.del);
      const plantId = state.beds[i]?.plantId;
      if (plantId) removePlantById(plantId);
    }),
  );
}

// Calcola l'offset dello scroll per l'header fisso
function headerScrollOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-h")
    .trim();
  const navHeight = parseFloat(raw) || 66;
  return navHeight + 12;
}

let pendingPageScrollTimer = 0;
let pendingPageScrollFrame = 0;
let pendingPageScrollToken = 0;
let pendingPageScrollFontsTimer = 0;
let plantDetailScrollFrame = 0;
let plantDetailReturnScrollFrame = 0;
let plantDetailReturnScrollTimer = 0;

// Annulla eventuali scroll pagina programmati ma non ancora eseguiti
function cancelPendingPageScroll() {
  pendingPageScrollToken++;
  if (pendingPageScrollTimer) {
    window.clearTimeout(pendingPageScrollTimer);
    pendingPageScrollTimer = 0;
  }
  if (pendingPageScrollFrame) {
    window.cancelAnimationFrame(pendingPageScrollFrame);
    pendingPageScrollFrame = 0;
  }
  if (pendingPageScrollFontsTimer) {
    window.clearTimeout(pendingPageScrollFontsTimer);
    pendingPageScrollFontsTimer = 0;
  }
}

// Esegue lo scroll sotto l'header usando la posizione più aggiornata
function scrollElementBelowHeaderNow(target, behavior = "smooth") {
  if (!target) return;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerScrollOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}

// Programma un solo scroll pagina alla volta, evitando scroll concorrenti
function scheduleElementBelowHeader(
  targetOrResolver,
  behavior = "smooth",
  options = {},
) {
  const delay = Math.max(0, options.delay || 0);
  cancelPendingPageScroll();
  const token = ++pendingPageScrollToken;
  const run = () => {
    pendingPageScrollTimer = 0;
    pendingPageScrollFrame = window.requestAnimationFrame(() => {
      pendingPageScrollFrame = 0;
      if (token !== pendingPageScrollToken) return;
      const target =
        typeof targetOrResolver === "function"
          ? targetOrResolver()
          : targetOrResolver;
      scrollElementBelowHeaderNow(target, behavior);
      if (target && typeof options.after === "function") options.after(target);
    });
  };
  const start = () => {
    if (token !== pendingPageScrollToken) return;
    if (delay) pendingPageScrollTimer = window.setTimeout(run, delay);
    else run();
  };
  // Attende i font prima di calcolare la posizione di scroll.
  if (
    options.waitForFonts !== false &&
    document.fonts &&
    document.fonts.ready &&
    document.fonts.status !== "loaded"
  ) {
    let started = false;
    const kick = () => {
      if (started) return;
      started = true;
      pendingPageScrollFontsTimer = 0;
      start();
    };
    document.fonts.ready.then(kick).catch(kick);
    pendingPageScrollFontsTimer = window.setTimeout(kick, 400);
  } else {
    start();
  }
}

// Scrolla un elemento sotto l'header con offset corretto
function scrollElementBelowHeader(target, behavior = "smooth") {
  cancelPendingPageScroll();
  scrollElementBelowHeaderNow(target, behavior);
}

// Verifica se il layout è in modalità mobile
function isResponsiveConfiguratorLayout() {
  return window.matchMedia("(max-width: 1100px)").matches;
}

// Porta in vista il pannello dettaglio pianta
function scrollPlantDetailPanelIntoView(behavior = "smooth") {
  if (plantDetailScrollFrame) {
    window.cancelAnimationFrame(plantDetailScrollFrame);
  }
  plantDetailScrollFrame = window.requestAnimationFrame(() => {
    plantDetailScrollFrame = 0;
    scrollElementBelowHeader(
      document.getElementById("panelPlantDetail"),
      behavior,
    );
  });
}

function cancelPlantDetailScroll() {
  if (!plantDetailScrollFrame) return;
  window.cancelAnimationFrame(plantDetailScrollFrame);
  plantDetailScrollFrame = 0;
}

function cancelPlantDetailReturnScroll() {
  if (plantDetailReturnScrollFrame) {
    window.cancelAnimationFrame(plantDetailReturnScrollFrame);
    plantDetailReturnScrollFrame = 0;
  }
  if (!plantDetailReturnScrollTimer) return;
  window.clearTimeout(plantDetailReturnScrollTimer);
  plantDetailReturnScrollTimer = 0;
}

function restorePlantDetailScroll(position) {
  if (!position) return;
  cancelPlantDetailReturnScroll();
  plantDetailReturnScrollFrame = window.requestAnimationFrame(() => {
    plantDetailReturnScrollFrame = window.requestAnimationFrame(() => {
      plantDetailReturnScrollFrame = 0;
      plantDetailReturnScrollTimer = window.setTimeout(() => {
        plantDetailReturnScrollTimer = 0;
        window.scrollTo({
          left: position.left,
          top: position.top,
          behavior: "auto",
        });
        document.documentElement.style.removeProperty("overflow-anchor");
      }, 120);
    });
  });
}

// Porta in vista l'immagine SVG della serra
function scrollGreenhouseImageIntoView(behavior = "auto") {
  const target =
    document.querySelector(".stage .scene-wrap") ||
    document.getElementById("scene") ||
    document.querySelector(".stage");
  scrollElementBelowHeader(target, behavior);
}

// Destinazione di scroll dell'area di lavoro.
function scrollStageIntoView(behavior = "auto") {
  const target =
    document.querySelector(".stage") ||
    document.querySelector(".stage .scene-wrap") ||
    document.getElementById("scene");
  scrollElementBelowHeader(target, behavior);
}

// Chiude il pannello impostazioni dopo l'autocompletamento

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 3 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function collapseSettingsPanelAfterAutoPlan(options = {}) {
  const { scroll = true } = options;
  const panel = document.getElementById("panelSettings");
  // Esperto non usa autoPlan: non collassare e non scrollare
  if (!panel || !state.autoPlan) return;
  setPanelCollapsed(panel, true);
  // Gestisce lo scroll in base al contesto dell'azione.
  if (!scroll) return;
  scheduleElementBelowHeader(
    () =>
      document.getElementById("journeyContext") ||
      document.querySelector(".stage .scene-wrap") ||
      document.getElementById("scene") ||
      document.querySelector(".stage"),
    "smooth",
  );
}

// Imposta lo stato aperto/chiuso di un pannello
function setPanelCollapsed(panelOrId, collapsed) {
  const panel =
    typeof panelOrId === "string"
      ? document.getElementById(panelOrId)
      : panelOrId;
  if (!panel) return;
  panel.classList.toggle("is-collapsed", Boolean(collapsed));
  const toggle = panel.querySelector(".panel-toggle");
  if (toggle) updatePanelToggle(toggle);
  syncColLeftLayout();
}

// Sincronizza la colonna sinistra con il profilo e i pannelli visibili.
function syncColLeftLayout() {
  const app = document.querySelector(".app");
  if (!app) return;
  const panelSettings = document.getElementById("panelSettings");
  const presetBar = document.getElementById("presetBar");
  const noviceGuide = document.getElementById("noviceGuidePanel");
  const modeSection = panelSettings
    ? panelSettings.closest(".mode-section")
    : null;
  const settingsOpen = Boolean(
    panelSettings && !panelSettings.classList.contains("is-collapsed"),
  );
  const presetVisible = Boolean(
    presetBar && getComputedStyle(presetBar).display !== "none",
  );
  const colEmpty = !settingsOpen && !presetVisible;
  const isNovice = state.livello === "novizio";
  const isIntermediate = state.livello === "intermedio";
  const isExpert = state.livello === "esperto";
  // Posiziona la guida in base al profilo.
  const showGuide = (isNovice && colEmpty) || isIntermediate || isExpert;
  if (noviceGuide) noviceGuide.hidden = !showGuide;
  // Esclude dal layout le sezioni vuote del profilo guidato.
  if (modeSection)
    modeSection.style.display = isNovice && showGuide ? "none" : "";
  app.classList.toggle("col-left-collapsed", colEmpty && !showGuide);
}

// Ricrea la guida rapida quando cambiano profilo utente o lingua attiva.
function syncQuickGuide() {
  const prefix =
    state.livello === "esperto"
      ? "expertGuide"
      : state.livello === "intermedio"
        ? "intermediateGuide"
        : "noviceGuide";
  const keys = ["Title", "Tag", "Step1", "Step2", "Step3", "Step4", "Step5"];
  keys.forEach((suffix) => {
    const element = document.getElementById(`quickGuide${suffix}`);
    if (element) element.textContent = tx(`${prefix}${suffix}`);
  });
}

// Apre o chiude il pannello personalizzazione colture
function setCustomizePanelCollapsed(collapsed) {
  setPanelCollapsed("panelCustomize", collapsed);
  updateVegListScrollAffordance();
}

// Adatta il pannello di personalizzazione al profilo utente.
function syncCustomizePanelForLivello() {
  setCustomizePanelCollapsed(state.livello !== "esperto");
}

// Apre il pannello colture e scrolla con evidenziazione
function openCustomizePanelAndFocus(options = {}) {
  const { scroll = true } = options;
  const crops = document.getElementById("panelCustomize");
  if (!crops) return;
  setCustomizePanelCollapsed(false);
  if (!isResponsiveConfiguratorLayout() || !scroll) {
    crops.classList.add("is-focus-pulse");
    window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    return;
  }
  scheduleElementBelowHeader(crops, "smooth", {
    after: () => {
      crops.classList.add("is-focus-pulse");
      window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    },
  });
}

// Apre il pannello impostazioni e mette a fuoco le dimensioni
function openSettingsPanelAndFocusDimensions() {
  const panel = document.getElementById("panelSettings");
  if (!panel) return;
  setPanelCollapsed(panel, false);
  const focusAndHighlight = () => {
    const inW = document.getElementById("inW");
    if (inW) {
      inW.focus({ preventScroll: true });
      panel.classList.add("guided-highlight");
      window.setTimeout(() => panel.classList.remove("guided-highlight"), 1600);
    }
  };
  if (!isResponsiveConfiguratorLayout()) {
    focusAndHighlight();
    return;
  }
  scheduleElementBelowHeader(panel, "smooth", {
    after: focusAndHighlight,
  });
}

const CONFIG_DETAIL_TABS = ["overview", "cultivation", "care", "harvest"];

// Recupera una stringa dalla i18n della home
function detailText(key, vars = {}) {
  const dict = window.SERRA_I18N?.index || {};
  let value = dict[state.lang]?.[key] || dict.it?.[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });
  return value;
}

// Attiva una tab nel pannello dettaglio pianta
function setConfigDetailTab(tab, moveFocus = false) {
  if (!CONFIG_DETAIL_TABS.includes(tab)) tab = "overview";
  document
    .querySelectorAll("#pdpContent [data-detail-tab]")
    .forEach((button) => {
      const active = button.dataset.detailTab === tab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && moveFocus) button.focus({ preventScroll: true });
    });
  document
    .querySelectorAll("#pdpContent [data-detail-panel]")
    .forEach((panel) => {
      const active = panel.dataset.detailPanel === tab;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
      if (active) panel.scrollTo({ top: 0, behavior: "instant" });
    });
}

// Gestisce la navigazione da tastiera tra le tab dettaglio
function handleConfigDetailTabKey(event, control) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = CONFIG_DETAIL_TABS.indexOf(control.dataset.detailTab);
  let next = current;
  if (event.key === "ArrowRight")
    next = (current + 1) % CONFIG_DETAIL_TABS.length;
  if (event.key === "ArrowLeft")
    next =
      (current - 1 + CONFIG_DETAIL_TABS.length) % CONFIG_DETAIL_TABS.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = CONFIG_DETAIL_TABS.length - 1;
  setConfigDetailTab(CONFIG_DETAIL_TABS[next], true);
}

// Genera il SVG dell'icona per una tab dettaglio
function configDetailTabIcon(tab) {
  const paths = {
    overview:
      '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    cultivation:
      '<path d="M12 22V12M12 12C8 12 5 9 5 5c4 0 7 3 7 7zM12 12c4 0 7-3 7-7-4 0-7 3-7 7z"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
    care: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11zM9 12l2 2 4-5"/>',
    harvest: '<path d="M4 10h16l-2 10H6zM8 10l4-7 4 7M9 14v2M15 14v2"/>',
  };
  return `<span class="detail-tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${paths[tab]}</svg></span>`;
}

// Costruisce il profilo tecnico per le schede coltivazione e cura
function configDetailProfile(p, sow) {
  const ro = state.lang === "ro";
  const shared = window.SERRA_PLANT_CONTENT?.detailProfile(p, sow, state.lang);
  if (shared) {
    return {
      cultivation: [
        [detailText("detail.tech_soil"), shared.soil],
        [
          detailText("detail.tech_exposure"),
          shared.exposure ||
            (p.sole === "pieno" ? tx("fullSun") : tx("halfShade")),
        ],
        [detailText("detail.tech_irrigation"), shared.irrigation],
        [detailText("detail.tech_feeding"), shared.feeding],
      ],
      care: [
        [detailText("detail.tech_maintenance"), shared.maintenance],
        [detailText("detail.tech_prevention"), shared.prevention],
      ],
      harvest: [
        [detailText("detail.tech_maturity"), harvestValue(p)],
        [detailText("detail.tech_harvest_method"), shared.harvestMethod],
        [detailText("detail.tech_yield"), yieldLabel(p.resa)],
        [detailText("detail.tech_storage"), shared.storage],
        [detailText("detail.tech_rotation"), shared.rotation],
      ],
    };
  }
  const type =
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia";
  const soil = ro
    ? {
        frutto:
          "Sol profund, fertil și bine drenat, îmbogățit cu compost matur.",
        foglia:
          "Sol afânat, bogat în materie organică și uniform umed, fără băltire.",
        radice:
          "Sol fin, afânat și fără pietre; evită gunoiul de grajd proaspăt.",
        aromatica:
          "Substrat aerat și drenat; fertilizarea excesivă reduce aroma.",
        legume: "Sol drenat și moderat fertil, fără exces de azot.",
      }
    : {
        frutto:
          "Terreno profondo, fertile e ben drenato, arricchito con compost maturo.",
        foglia:
          "Terreno soffice, ricco di sostanza organica e uniformemente umido, senza ristagni.",
        radice: "Terreno fine, sciolto e privo di sassi; evita letame fresco.",
        aromatica:
          "Substrato arioso e drenante; concimazioni eccessive riducono l'aroma.",
        legume:
          "Terreno drenato e moderatamente fertile, senza eccessi di azoto.",
      };
  const care = ro
    ? {
        frutto:
          "Susține plantele înalte, aerisește frunzișul și elimină frunzele bolnave.",
        foglia:
          "Rărește la timp, menține solul curat și recoltează fără a răni centrul plantei.",
        radice:
          "Rărește devreme și evită lucrările adânci care pot răni rădăcinile.",
        aromatica:
          "Ciupirea vârfurilor menține planta compactă și prelungește producția.",
        legume:
          "Oferă suport soiurilor cățărătoare și recoltează păstăile frecvent.",
      }
    : {
        frutto:
          "Sostieni le piante alte, arieggia la chioma e rimuovi le foglie malate.",
        foglia:
          "Dirada per tempo, mantieni il suolo pulito e raccogli senza ferire il cuore.",
        radice:
          "Dirada presto ed evita lavorazioni profonde che possano ferire le radici.",
        aromatica:
          "Cimare gli apici mantiene la pianta compatta e prolunga la produzione.",
        legume:
          "Predisponi sostegni per le varietà rampicanti e raccogli spesso i baccelli.",
      };
  const prevention = ro
    ? "Aerisește zilnic, udă dimineața la bază și îndepărtează imediat țesuturile bolnave."
    : "Arieggia ogni giorno, irriga al mattino alla base e rimuovi subito i tessuti malati.";
  const harvest = ro
    ? "Recoltează la maturitate, cu unelte curate, fără a răni planta. Consumă sau răcește produsul cât mai repede."
    : "Raccogli a maturazione con utensili puliti, senza ferire la pianta. Consuma o raffredda il prodotto rapidamente.";
  return {
    cultivation: [
      [detailText("detail.tech_soil"), soil[type]],
      [
        detailText("detail.tech_exposure"),
        sow?.esposizione ||
          (p.sole === "pieno" ? tx("fullSun") : tx("halfShade")),
      ],
      [
        detailText("detail.tech_irrigation"),
        sow?.annaffiatura || waterLabel(p.acqua),
      ],
      [
        detailText("detail.tech_feeding"),
        ro
          ? "Folosește compost matur și evită excesele de îngrășământ."
          : "Usa compost maturo ed evita eccessi di fertilizzante.",
      ],
    ],
    care: [
      [detailText("detail.tech_maintenance"), care[type]],
      [detailText("detail.tech_prevention"), prevention],
      [
        detailText("detail.tech_rotation"),
        ro
          ? "Nu replanta aceeași familie în același loc în ciclul următor."
          : "Non ripiantare la stessa famiglia nello stesso spazio nel ciclo successivo.",
      ],
    ],
    harvest: [
      [detailText("detail.tech_maturity"), harvestValue(p)],
      [detailText("detail.tech_harvest_method"), harvest],
      [detailText("detail.tech_yield"), yieldLabel(p.resa)],
      [
        detailText("detail.tech_storage"),
        ro
          ? "Păstrează numai produse sănătoase, uscate și răcite rapid."
          : "Conserva solo prodotti sani, asciutti e raffreddati rapidamente.",
      ],
    ],
  };
}

// Genera le card HTML delle schede tecniche
function renderConfigTechCards(items) {
  return items
    .map(
      ([title, text]) =>
        `<article class="detail-tech-card"><h4>${title}</h4><p>${text}</p></article>`,
    )
    .join("");
}

const CONFIG_DISEASE_GROUPS = {
  solanaceae: ["late", "alternaria", "botrytis"],
  cucurbits: ["powdery", "downy", "botrytis"],
  brassicas: ["downy", "alternaria", "clubroot"],
  alliums: ["downy", "white_rot", "rust"],
  apiaceae: ["cercospora", "sclerotinia", "powdery"],
  leafy: ["downy", "botrytis", "sclerotinia"],
  chenopods: ["downy", "cercospora", "damping"],
  legumes: ["anthracnose", "rust", "powdery"],
  herbs: ["powdery", "root_rot", "rust"],
  basil: ["basil_downy", "fusarium", "botrytis"],
  strawberry: ["botrytis", "powdery", "root_rot"],
  other: ["powdery", "botrytis", "root_rot"],
};

// Determina il gruppo malattie della pianta per ID

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 4 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function configDiseaseGroup(id) {
  const has = (ids) => ids.includes(id);
  if (
    has([
      "pomodoro",
      "peperone",
      "peperoncino",
      "melanzana",
      "patata",
      "tomatillo",
      "physalis",
    ])
  )
    return "solanaceae";
  if (has(["zucchina", "zucca", "cetriolo", "melone", "anguria", "cucamelon"]))
    return "cucurbits";
  if (
    has([
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
    ])
  )
    return "brassicas";
  if (
    has([
      "cipolla",
      "aglio",
      "porro",
      "scalogno",
      "cipolla_rossa",
      "cipollotto",
      "erba_cipollina",
    ])
  )
    return "alliums";
  if (
    has([
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
    ])
  )
    return "apiaceae";
  if (has(["spinaci", "bietola", "barbabietola", "loboda"])) return "chenopods";
  if (
    has([
      "fagiolino",
      "fagiolo",
      "pisello",
      "fava",
      "soia_edamame",
      "cece",
      "lenticchia",
      "fagiolo_borlotto",
    ])
  )
    return "legumes";
  if (id === "basilico") return "basil";
  if (id === "fragola") return "strawberry";
  const plant = typeof BYID !== "undefined" ? BYID[id] : null;
  const type = plant
    ? plant.tipo || plant.arch
    : (typeof TIPO !== "undefined" && TIPO[id]) || "";
  if (type === "aromatica") return "herbs";
  if (type === "foglia") return "leafy";
  return "other";
}

// Restituisce il catalogo malattie nella lingua corrente
function configDiseaseCatalog() {
  const ro = state.lang === "ro";
  const base = {
    late: [
      "Peronospora",
      "Macchie scure e muffa chiara sotto le foglie.",
      "Rimuovi le parti colpite, evita di bagnare le foglie e arieggia.",
    ],
    alternaria: [
      "Alternariosi",
      "Macchie brune concentriche sulle foglie più vecchie.",
      "Elimina residui e foglie infette, irriga alla base e pratica la rotazione.",
    ],
    botrytis: [
      "Muffa grigia",
      "Tessuti molli ricoperti da una polvere grigia.",
      "Asporta le parti colpite, riduci condensa e umidità e dirada la chioma.",
    ],
    powdery: [
      "Oidio",
      "Patina bianca farinosa e progressivo ingiallimento.",
      "Rimuovi le foglie colpite, migliora l'aria e usa solo prodotti autorizzati.",
    ],
    downy: [
      "Peronospora",
      "Chiazze gialle sopra e muffa grigiastra sotto le foglie.",
      "Irriga al mattino alla base, elimina le foglie malate e arieggia.",
    ],
    clubroot: [
      "Ernia delle crucifere",
      "Radici gonfie e pianta che appassisce nelle ore calde.",
      "Rimuovi la pianta con le radici, migliora drenaggio e rotazione.",
    ],
    white_rot: [
      "Marciume bianco",
      "Ingiallimento e feltro bianco alla base.",
      "Elimina pianta e terreno aderente; non ripiantare alli nello stesso suolo.",
    ],
    rust: [
      "Ruggine",
      "Pustole arancioni o brune sotto le foglie.",
      "Elimina le foglie colpite, arieggia e non eccedere con azoto.",
    ],
    cercospora: [
      "Cercosporiosi",
      "Piccole macchie con centro chiaro e bordo scuro.",
      "Rimuovi residui, non bagnare le foglie e aumenta la distanza.",
    ],
    sclerotinia: [
      "Sclerotinia",
      "Marciume acquoso al colletto e muffa bianca cotonosa.",
      "Rimuovi completamente la pianta e riduci umidità e densità.",
    ],
    damping: [
      "Moria delle piantine",
      "Piantine che collassano con colletto scuro e sottile.",
      "Usa substrato pulito, semina meno fitta e non saturare il terriccio.",
    ],
    anthracnose: [
      "Antracnosi",
      "Lesioni scure e infossate su foglie, steli o baccelli.",
      "Rimuovi le parti malate, usa seme sano e ruota le leguminose.",
    ],
    root_rot: [
      "Marciume radicale",
      "Appassimento con terreno umido e radici brune e molli.",
      "Riduci acqua, migliora drenaggio ed elimina le piante gravi.",
    ],
    basil_downy: [
      "Peronospora del basilico",
      "Ingiallimento tra le nervature e muffa scura sotto le foglie.",
      "Elimina le piante colpite, irriga alla base e arieggia.",
    ],
    fusarium: [
      "Fusariosi",
      "Ingiallimento, avvizzimento e vasi interni bruni.",
      "Rimuovi la pianta, rinnova il substrato e usa varietà resistenti.",
    ],
  };
  if (!ro) return base;
  const translated = {
    late: [
      "Mană",
      "Pete întunecate și puf deschis pe dosul frunzelor.",
      "Îndepărtează părțile afectate, nu uda frunzișul și aerisește.",
    ],
    alternaria: [
      "Alternarioză",
      "Pete brune concentrice pe frunzele bătrâne.",
      "Elimină resturile bolnave, udă la bază și rotește culturile.",
    ],
    botrytis: [
      "Putregai cenușiu",
      "Țesuturi moi acoperite cu pulbere cenușie.",
      "Îndepărtează părțile afectate și reduce condensul și umiditatea.",
    ],
    powdery: [
      "Făinare",
      "Depunere albă făinoasă și îngălbenire.",
      "Elimină frunzele bolnave, aerisește și folosește doar produse autorizate.",
    ],
    downy: [
      "Mană",
      "Pete galbene deasupra și puf cenușiu sub frunze.",
      "Udă dimineața la bază, elimină frunzele bolnave și aerisește.",
    ],
    clubroot: [
      "Hernia rădăcinilor",
      "Rădăcini umflate și ofilire la căldură.",
      "Scoate planta cu rădăcini și îmbunătățește drenajul și rotația.",
    ],
    white_rot: [
      "Putregai alb",
      "Îngălbenire și pâslă albă la bază.",
      "Elimină planta și solul lipit; nu replanta Allium în același loc.",
    ],
    rust: [
      "Rugină",
      "Pustule portocalii sau brune sub frunze.",
      "Elimină frunzele afectate, aerisește și limitează azotul.",
    ],
    cercospora: [
      "Cercosporioză",
      "Pete mici cu centru deschis și margine închisă.",
      "Elimină resturile, nu uda frunzișul și mărește distanța.",
    ],
    sclerotinia: [
      "Sclerotinia",
      "Putregai apos la colet și mucegai alb vată.",
      "Elimină complet planta și redu umiditatea și densitatea.",
    ],
    damping: [
      "Căderea plăntuțelor",
      "Plăntuțe căzute cu colet subțire și închis.",
      "Folosește substrat curat, seamănă rar și nu îmbiba solul.",
    ],
    anthracnose: [
      "Antracnoză",
      "Leziuni întunecate și adâncite pe frunze sau păstăi.",
      "Îndepărtează părțile bolnave, folosește sămânță sănătoasă și rotește.",
    ],
    root_rot: [
      "Putregai radicular",
      "Ofilire în sol umed și rădăcini brune, moi.",
      "Redu udarea, îmbunătățește drenajul și elimină plantele grav afectate.",
    ],
    basil_downy: [
      "Mana busuiocului",
      "Îngălbenire între nervuri și puf închis sub frunze.",
      "Elimină plantele bolnave, udă la bază și aerisește.",
    ],
    fusarium: [
      "Fuzarioză",
      "Îngălbenire, ofilire și vase interne brune.",
      "Elimină planta, schimbă substratul și folosește soiuri rezistente.",
    ],
  };
  return translated;
}

// Filtra le malattie rilevanti per la pianta
function configDiseasesForPlant(p) {
  const catalog = configDiseaseCatalog();
  return CONFIG_DISEASE_GROUPS[configDiseaseGroup(p.id)]
    .map((key) => catalog[key])
    .filter(Boolean);
}

// Genera il blocco HTML delle malattie nella scheda pianta
function renderConfigDiseases(p) {
  const diseases = configDiseasesForPlant(p);
  return `<details class="detail-diseases">
    <summary class="detail-diseases-head"><div><h3>${detailText("detail.diseases_title")}</h3><p>${detailText("detail.diseases_subtitle")}</p></div><span class="detail-diseases-head-actions"><span class="detail-diseases-count">${detailText("detail.diseases_count", { count: diseases.length })}</span><span class="detail-diseases-chevron" aria-hidden="true">▾</span></span></summary>
    <div class="detail-disease-list">${diseases.map((d) => `<details class="detail-disease-card"><summary><span class="detail-disease-marker"></span><span>${d[0]}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${detailText("detail.disease_symptoms")}</b><p>${d[1]}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${detailText("detail.disease_action")}</b><p>${d[2]}</p></div></div></details>`).join("")}</div>
    <p class="detail-treatment-note">${detailText("detail.treatment_note")}</p>
  </details>`;
}

const CONFIG_PEST_GROUPS = {
  solanaceae: ["aphids", "whiteflies", "mites"],
  cucurbits: ["aphids", "whiteflies", "mites"],
  brassicas: ["flea", "caterpillars", "aphids"],
  alliums: ["thrips", "onion_fly", "leafminers"],
  apiaceae: ["carrot_fly", "aphids", "leafminers"],
  leafy: ["flea", "slugs", "aphids"],
  chenopods: ["leafminers", "aphids", "flea"],
  legumes: ["aphids", "weevils", "mites"],
  herbs: ["aphids", "whiteflies", "mites"],
  basil: ["aphids", "thrips", "slugs"],
  strawberry: ["mites", "aphids", "slugs"],
  other: ["aphids", "slugs", "thrips"],
};

// Restituisce il catalogo parassiti nella lingua corrente
function configPestCatalog() {
  if (state.lang === "ro")
    return {
      aphids: [
        "Afide",
        "Colonii pe lăstari, frunze răsucite și secreții lipicioase.",
        "Spală focarele mici, taie vârfurile foarte atacate și folosește săpun moale autorizat dacă persistă.",
      ],
      whiteflies: [
        "Musculița albă",
        "Insecte albe care zboară la atingere și frunze lipicioase, galbene.",
        "Folosește capcane galbene, aspiră adulții dimineața și elimină frunzele grav infestate.",
      ],
      mites: [
        "Acarianul roșu",
        "Puncte galbene și pânze fine sub frunze, mai ales cu aer cald și uscat.",
        "Spală dosul frunzelor, elimină focarele și introdu acarieni prădători dacă sunt disponibili.",
      ],
      flea: [
        "Purici de pământ (altice)",
        "Gândăcei mici, adesea negri, care sar și fac multe găuri rotunde.",
        "Folosește plasă fină pe plantele tinere, elimină buruienile crucifere și menține solul uniform umed.",
      ],
      caterpillars: [
        "Omizi",
        "Găuri neregulate, margini roase și excremente întunecate.",
        "Îndepărtează manual, folosește plasă și doar la atac confirmat Bacillus thuringiensis autorizat.",
      ],
      thrips: [
        "Trips",
        "Dungi argintii, puncte negre și frunze deformate.",
        "Folosește capcane albastre, elimină părțile atacate și evită aerul prea uscat.",
      ],
      onion_fly: [
        "Musca cepei",
        "Îngălbenire și larve albe în bulb sau la bază.",
        "Scoate plantele atacate, folosește plasă fină și rotește culturile de Allium.",
      ],
      leafminers: [
        "Minatori foliari",
        "Galerii deschise și șerpuitoare în frunză.",
        "Elimină frunzele cu galerii înainte de ieșirea larvei și folosește plasă fină.",
      ],
      carrot_fly: [
        "Musca morcovului",
        "Frunziș roșiatic și galerii ruginii în rădăcini.",
        "Protejează cu plasă fină, îndepărtează resturile după rărire și rotește cultura.",
      ],
      slugs: [
        "Limacși și melci",
        "Găuri mari neregulate și urme lucioase de mucus.",
        "Culege seara, elimină ascunzătorile și folosește doar momeli autorizate cu fosfat feric.",
      ],
      weevils: [
        "Gărgărițe",
        "Margini ciupite și semințe sau păstăi perforate.",
        "Îndepărtează adulții și semințele infestate, curăță resturile și rotește cultura.",
      ],
    };
  return {
    aphids: [
      "Afidi",
      "Colonie su germogli, foglie arricciate e melata appiccicosa.",
      "Lava i piccoli focolai, taglia gli apici molto colpiti e usa sapone molle autorizzato se persistono.",
    ],
    whiteflies: [
      "Mosca bianca",
      "Insetti bianchi che volano al tocco e foglie appiccicose e gialle.",
      "Usa trappole gialle, aspira gli adulti al mattino e rimuovi le foglie molto infestate.",
    ],
    mites: [
      "Ragnetto rosso",
      "Puntinatura gialla e ragnatele sottili sotto le foglie, soprattutto con caldo secco.",
      "Lava la pagina inferiore, elimina i focolai e introduci acari predatori se disponibili.",
    ],
    flea: [
      "Altiche",
      "Piccoli coleotteri spesso neri che saltano e producono molti forellini rotondi.",
      "Usa rete fine sulle piante giovani, elimina le infestanti crucifere e mantieni il suolo uniformemente umido.",
    ],
    caterpillars: [
      "Bruchi e cavolaie",
      "Fori irregolari, margini rosicchiati ed escrementi scuri.",
      "Rimuovi a mano, usa rete e solo con attacco confermato Bacillus thuringiensis autorizzato.",
    ],
    thrips: [
      "Tripidi",
      "Striature argentate, puntini neri e foglie deformate.",
      "Usa trappole blu, elimina le parti colpite ed evita aria eccessivamente secca.",
    ],
    onion_fly: [
      "Mosca della cipolla",
      "Ingiallimento e larve bianche nel bulbo o alla base.",
      "Rimuovi le piante attaccate, usa rete fine e ruota le colture di alli.",
    ],
    leafminers: [
      "Minatori fogliari",
      "Gallerie chiare e sinuose scavate nella foglia.",
      "Elimina le foglie minate prima che la larva esca e usa rete fine.",
    ],
    carrot_fly: [
      "Mosca della carota",
      "Foglie rossastre e gallerie color ruggine nelle radici.",
      "Proteggi con rete fine, rimuovi i residui del diradamento e ruota la coltura.",
    ],
    slugs: [
      "Limacce e chiocciole",
      "Grandi fori irregolari e tracce lucide di bava.",
      "Raccogli la sera, elimina i rifugi e usa solo esche autorizzate al fosfato ferrico.",
    ],
    weevils: [
      "Tonchi e oziorrinchi",
      "Margini intaccati e semi o baccelli perforati.",
      "Rimuovi adulti e semi infestati, pulisci i residui e ruota la coltura.",
    ],
  };
}

// Restituisce i prodotti specifici per i parassiti della pianta

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 5 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function configTargetedPestProducts(p) {
  const ro = state.lang === "ro";
  const group = configDiseaseGroup(p.id);
  const plans = ro
    ? {
        solanaceae: {
          aphids: "Săpun potasic pe colonii; flonicamid la atac puternic.",
          whiteflies:
            "Beauveria bassiana pe nimfe; pyriproxyfen pentru întreruperea ciclului.",
          mites:
            "Abamectin pe forme mobile, hexythiazox pe ouă sau Phytoseiulus persimilis.",
        },
        cucurbits: {
          aphids:
            "Flonicamid pentru oprirea hrănirii; săpun potasic pe focare mici.",
          whiteflies: "Beauveria bassiana și săpun potasic pe nimfele expuse.",
          mites:
            "Hexythiazox pe ouă, abamectin pe forme mobile sau Phytoseiulus persimilis.",
        },
        brassicas: {
          flea: "Spinosad ori piretrine pe adulți activi, aplicate devreme pe plante tinere.",
          caterpillars:
            "Bacillus thuringiensis kurstaki pe omizi mici; spinosad pe larve mai mari.",
          aphids: "Flonicamid în rozete; săpun potasic pe coloniile expuse.",
        },
        alliums: {
          thrips:
            "Spinosad în teaca frunzelor; Beauveria bassiana la umiditate adecvată.",
          onion_fly: "Steinernema feltiae în sol umed contra larvelor.",
          leafminers:
            "Spinosad la primele galerii; cyromazine pe larve tinere.",
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae în sol contra larvelor; piretrine pe adulți în zbor.",
          aphids: "Săpun potasic; flonicamid dacă frunzele sunt răsucite.",
          leafminers: "Spinosad la începutul galeriilor.",
        },
        leafy: {
          flea: "Piretrine pe adulți; spinosad dacă paguba continuă.",
          slugs: "Fosfat feric granular pe sol.",
          aphids: "Săpun potasic; piretrine numai pentru colonii persistente.",
        },
        chenopods: {
          leafminers: "Spinosad la primele galerii.",
          aphids: "Săpun potasic; flonicamid dacă frunzele se deformează.",
          flea: "Piretrine pe adulți; spinosad pe atac persistent.",
        },
        legumes: {
          aphids:
            "Flonicamid pe vârfuri și flori; săpun potasic pe focare mici.",
          weevils: "Piretrine pe adulți; Heterorhabditis bacteriophora în sol.",
          mites: "Abamectin sau Phytoseiulus persimilis.",
        },
        herbs: {
          aphids: "Săpun potasic; piretrine numai la atac puternic.",
          whiteflies: "Beauveria bassiana și săpun potasic pe nimfe.",
          mites: "Phytoseiulus persimilis sau ulei horticol ușor sub frunze.",
        },
        basil: {
          aphids: "Săpun potasic pe vârfuri, apoi clătire înainte de consum.",
          thrips: "Spinosad sau Beauveria bassiana în vârfurile tinere.",
          slugs: "Fosfat feric pe sol, fără contact cu frunzele.",
        },
        strawberry: {
          mites: "Phytoseiulus persimilis; bifenazate dacă populația crește.",
          aphids:
            "Săpun potasic înainte de înflorire; flonicamid la atac persistent.",
          slugs: "Fosfat feric între plante, fără contact cu fructele.",
        },
        other: {
          aphids: "Săpun potasic; flonicamid la atac persistent.",
          slugs: "Fosfat feric granular pe sol.",
          thrips: "Spinosad sau Beauveria bassiana.",
        },
      }
    : {
        solanaceae: {
          aphids: "Sapone molle sulle colonie; flonicamid con attacco forte.",
          whiteflies:
            "Beauveria bassiana sulle neanidi; pyriproxyfen per interrompere il ciclo.",
          mites:
            "Abamectina sulle forme mobili, hexythiazox sulle uova o Phytoseiulus persimilis.",
        },
        cucurbits: {
          aphids:
            "Flonicamid per bloccare l'alimentazione; sapone molle sui piccoli focolai.",
          whiteflies:
            "Beauveria bassiana e sapone molle sulle neanidi esposte.",
          mites:
            "Hexythiazox sulle uova, abamectina sulle forme mobili o Phytoseiulus persimilis.",
        },
        brassicas: {
          flea: "Spinosad o piretrine sugli adulti attivi, applicati presto sulle piante giovani.",
          caterpillars:
            "Bacillus thuringiensis kurstaki sui bruchi piccoli; spinosad sulle larve grandi.",
          aphids:
            "Flonicamid nelle rosette; sapone molle sulle colonie esposte.",
        },
        alliums: {
          thrips:
            "Spinosad nella guaina fogliare; Beauveria bassiana con umidità adeguata.",
          onion_fly: "Steinernema feltiae nel terreno umido contro le larve.",
          leafminers:
            "Spinosad alle prime mine; cyromazine sulle larve giovani.",
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae nel terreno contro le larve; piretrine sugli adulti in volo.",
          aphids: "Sapone molle; flonicamid se le foglie sono arricciate.",
          leafminers: "Spinosad all'inizio delle gallerie.",
        },
        leafy: {
          flea: "Piretrine sugli adulti; spinosad se il danno continua.",
          slugs: "Fosfato ferrico granulare sul terreno.",
          aphids: "Sapone molle; piretrine solo per colonie persistenti.",
        },
        chenopods: {
          leafminers: "Spinosad alle prime gallerie.",
          aphids: "Sapone molle; flonicamid se le foglie si deformano.",
          flea: "Piretrine sugli adulti; spinosad su attacco persistente.",
        },
        legumes: {
          aphids:
            "Flonicamid su apici e fiori; sapone molle sui piccoli focolai.",
          weevils:
            "Piretrine sugli adulti; Heterorhabditis bacteriophora nel terreno.",
          mites: "Abamectina o Phytoseiulus persimilis.",
        },
        herbs: {
          aphids: "Sapone molle; piretrine solo con attacco forte.",
          whiteflies: "Beauveria bassiana e sapone molle sulle neanidi.",
          mites:
            "Phytoseiulus persimilis o olio orticolo leggero sotto le foglie.",
        },
        basil: {
          aphids:
            "Sapone molle sui germogli, poi risciacquo prima del consumo.",
          thrips: "Spinosad o Beauveria bassiana nei germogli giovani.",
          slugs: "Fosfato ferrico sul terreno, senza contatto con le foglie.",
        },
        strawberry: {
          mites:
            "Phytoseiulus persimilis; bifenazate se la popolazione cresce.",
          aphids:
            "Sapone molle prima della fioritura; flonicamid su attacco persistente.",
          slugs: "Fosfato ferrico tra le piante, senza contatto con i frutti.",
        },
        other: {
          aphids: "Sapone molle; flonicamid su attacco persistente.",
          slugs: "Fosfato ferrico granulare sul terreno.",
          thrips: "Spinosad o Beauveria bassiana.",
        },
      };
  const overrides = {
    rucola: {
      flea: ro
        ? "Pentru rucola: ulei de neem/azadiractină ca repelent și spinosad dacă găurile continuă pe frunzele noi."
        : "Per la rucola: olio di neem/azadiractina come repellente e spinosad se i fori continuano sulle foglie nuove.",
    },
    pomodoro: {
      whiteflies: ro
        ? "Pentru tomate: Beauveria bassiana pe nimfe, Encarsia formosa pentru control continuu și pyriproxyfen dacă ciclul persistă."
        : "Per il pomodoro: Beauveria bassiana sulle neanidi, Encarsia formosa per il controllo continuo e pyriproxyfen se il ciclo persiste.",
    },
    basilico: {
      thrips: ro
        ? "Pentru busuioc: Beauveria bassiana sau spinosad în vârfuri; evită uleiurile aproape de recoltare."
        : "Per il basilico: Beauveria bassiana o spinosad nei germogli; evita oli vicino alla raccolta.",
    },
    fragola: {
      mites: ro
        ? "Pentru căpșun: Phytoseiulus persimilis la debut; bifenazate dacă apar pânze."
        : "Per la fragola: Phytoseiulus persimilis all'inizio; bifenazate se compaiono ragnatele.",
    },
  };
  return {
    ...(plans.other || {}),
    ...(plans[group] || {}),
    ...(overrides[p.id] || {}),
  };
}

// Genera il blocco HTML dei parassiti nella scheda pianta
function renderConfigPests(p) {
  const catalog = configPestCatalog();
  const products = configTargetedPestProducts(p);
  const keys =
    CONFIG_PEST_GROUPS[configDiseaseGroup(p.id)] || CONFIG_PEST_GROUPS.other;
  const pests = keys.map((key) => catalog[key]).filter(Boolean);
  return `<details class="detail-diseases detail-pests"><summary class="detail-diseases-head"><div><h3>${detailText("detail.pests_title")}</h3><p>${detailText("detail.pests_subtitle")}</p></div><span class="detail-diseases-head-actions"><span class="detail-diseases-count">${detailText("detail.pests_count", { count: pests.length })}</span><span class="detail-diseases-chevron" aria-hidden="true">▾</span></span></summary><div class="detail-disease-list">${pests
    .map((item, index) => {
      const key = keys[index];
      return `<details class="detail-disease-card"><summary><span class="detail-disease-marker"></span><span>${item[0]}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${detailText("detail.pest_signs")}</b><p>${item[1]}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${detailText("detail.pest_action")}</b><p>${item[2]}</p></div><div class="detail-disease-info detail-disease-info--products"><b>${detailText("detail.pest_products")} · ${plantText(p, "nome")}</b><p>${products[key]}</p></div></div></details>`;
    })
    .join(
      "",
    )}</div><p class="detail-treatment-note">${detailText("detail.pest_note")}</p></details>`;
}

// Apertura pannelli
function getPlantDetailReturnScroll(panel) {
  if (!panel) return null;
  const left = Number(panel.dataset.returnScrollLeft);
  const top = Number(panel.dataset.returnScrollTop);
  if (!Number.isFinite(left) || !Number.isFinite(top)) return null;
  return { left, top };
}

// Apre il pannello dettaglio della pianta selezionata
function openPlantDetailPanel(originScroll = null) {
  const panel = document.getElementById("panelPlantDetail");
  if (!panel) return;
  if (!isResponsiveConfiguratorLayout() && panel.hidden) {
    const returnScroll = originScroll || {
      left: window.scrollX,
      top: window.scrollY,
    };
    panel.dataset.returnScrollLeft = String(returnScroll.left);
    panel.dataset.returnScrollTop = String(returnScroll.top);
    document.documentElement.style.overflowAnchor = "none";
  }
  renderPlantDetailPanel();
  panel.hidden = false;
  scrollPlantDetailPanelIntoView("smooth");
}

// Chiude il pannello dettaglio e ripristina la selezione
function closePlantDetailPanel() {
  const panel = document.getElementById("panelPlantDetail");
  const selectedBedIndex = state.selected;
  const desktopReturnScroll = !isResponsiveConfiguratorLayout()
    ? getPlantDetailReturnScroll(panel)
    : null;
  const keepGreenhouseRow =
    isResponsiveConfiguratorLayout() && panel && !panel.hidden;
  cancelPlantDetailScroll();
  cancelPlantDetailReturnScroll();
  if (desktopReturnScroll) {
    // Ferma lo smooth-scroll dell'apertura, se la chiusura è molto rapida.
    cancelPendingPageScroll();
    window.scrollTo({
      left: window.scrollX,
      top: window.scrollY,
      behavior: "instant",
    });
  }
  if (panel) {
    delete panel.dataset.returnScrollLeft;
    delete panel.dataset.returnScrollTop;
  }
  if (panel) panel.hidden = true;
  state.selected = -1;
  render();
  if (desktopReturnScroll && selectedBedIndex >= 0) {
    document
      .querySelector(`.bedhit[data-bed="${selectedBedIndex}"]`)
      ?.focus({ preventScroll: true });
  }
  if (keepGreenhouseRow) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => scrollStageIntoView("auto")),
    );
    document.documentElement.style.removeProperty("overflow-anchor");
  } else {
    if (!desktopReturnScroll)
      document.documentElement.style.removeProperty("overflow-anchor");
    restorePlantDetailScroll(desktopReturnScroll);
  }
}

// Su mobile mostra subito la miniatura disponibile e aggiorna la foto soltanto
// dopo il download e la decodifica della versione di dettaglio.
function upgradePlantDetailHeroImage(image, heroSrc) {
  if (!image || !heroSrc || image.src.endsWith(heroSrc)) return;
  const heroImage = new Image();
  heroImage.decoding = "async";
  heroImage.fetchPriority = "low";
  heroImage.onload = () => {
    const applyHero = () => {
      if (!image.isConnected || image.dataset.heroSrc !== heroSrc) return;
      image.src = heroSrc;
    };
    if (typeof heroImage.decode === "function") {
      heroImage.decode().then(applyHero, applyHero);
    } else {
      applyHero();
    }
  };
  heroImage.src = heroSrc;
}

// Costruisce la scheda dettagliata della pianta selezionata nel catalogo.

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 6 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function renderPlantDetailPanel(initialTab = "overview") {
  const container = document.getElementById("pdpContent");
  if (!container) return;
  if (state.selected < 0 || state.selected >= state.beds.length) {
    container.innerHTML = "";
    return;
  }
  const b = state.beds[state.selected];
  const p = BYID[b.plantId];
  const resaTot = b.count * p.resa;
  // Le dimensioni appartengono al layout calcolato, non al record della coltura:
  // in questo modo seguono sempre il motore di riempimento corrente.
  const bedGeometry = computeLayout().beds[state.selected];
  const bedMeasureFormatter = new Intl.NumberFormat(
    state.lang === "ro" ? "ro-RO" : "it-IT",
    { maximumFractionDigits: 2 },
  );
  const formatBedMeasure = (centimetres) =>
    `${bedMeasureFormatter.format(centimetres / 100)} m`;
  const bedWidth = formatBedMeasure(bedGeometry.w);
  const bedLength = formatBedMeasure(bedGeometry.h);
  // Logica di risoluzione foto condivisa: vedi assets/js/shared/plant-photo.js
  let photoSrc = window.resolvePlantPhoto(p, p.id);
  // Usa la versione ad alta risoluzione per la foto di dettaglio.
  let heroPhotoSrc = photoSrc;
  const heroMatch = /^assets\/img\/photo\/([^/]+)$/.exec(photoSrc);
  if (heroMatch) {
    heroPhotoSrc = `assets/img/photo/large/${heroMatch[1]}`;
  }
  const useProgressiveMobileHero =
    window.matchMedia("(max-width: 680px)").matches;
  const displayedPhotoSrc = useProgressiveMobileHero ? photoSrc : heroPhotoSrc;
  const desc =
    window.SERRA_PLANT_CONTENT?.compactDescription(p, state.lang) ||
    (PLANT_DESC[state.lang] || PLANT_DESC.it)[p.id] ||
    "";
  const months = [...effectiveMonths(p)]
    .sort((a, b) => a - b)
    .map((m) => monthName(m).slice(0, 3))
    .join(", ");
  const amiche = p.amiche.map(plantNameById).filter(Boolean);
  const sow = localizedSowingGuide(p);
  const nota =
    window.SERRA_PLANT_CONTENT?.cultivationNote(p, state.lang) || p.nota || "";
  const distRow = p.d;
  const distBetween = p.dr || p.d;

  const diffLevel = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diffLevel === 1
      ? tx("diffEasy")
      : diffLevel === 2
        ? tx("diffMedium")
        : tx("diffHard");
  const diffClass =
    diffLevel === 1
      ? "diff-easy"
      : diffLevel === 2
        ? "diff-medium"
        : "diff-hard";

  const nemiche = p.nemiche ? p.nemiche.map(plantNameById).filter(Boolean) : [];

  const allMonths = [...effectiveMonths(p)].sort((a, b) => a - b);
  const activeMonthsLabel = allMonths
    .map((m) => monthName(m).slice(0, 3))
    .join(", ");
  const monthLegend =
    state.lang === "ro"
      ? {
          title: tx("sowingZone"),
          available: tx("monthAvailable"),
          selected: tx("monthSelected"),
          outside: tx("monthOutside"),
        }
      : {
          title: tx("sowingZone"),
          available: tx("monthAvailable"),
          selected: tx("monthSelected"),
          outside: tx("monthOutside"),
        };
  const monthSegs = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    const title = `${monthName(i + 1)} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
    return `<div class="pdp-month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}"></div>`;
  }).join("");

  const tipoEntry = CAT_ORDER.find((c) => c.ids.includes(p.id));
  const tipoLabel = tipoEntry ? tx(`vegCat_${tipoEntry.key}`) : "";

  const soleIcon = p.sole === "pieno" ? "☀️" : "🌤️";
  const soleLabel = p.sole === "pieno" ? tx("fullSun") : tx("halfShade");
  const acquaIcon =
    p.acqua === "alta" ? "💧💧💧" : p.acqua === "media" ? "💧💧" : "💧";
  const svgSpacing = spacingInfographicSvg(p);
  const profile = configDetailProfile(p, sow);
  const sowRow = (icon, label, value) =>
    `<div class="detail-sow-row"><span class="detail-sow-row-icon" aria-hidden="true">${icon}</span><span class="detail-sow-row-copy"><b>${label}</b> — ${value}</span></div>`;
  const sowTip = (value) =>
    `<blockquote class="detail-sow-tip"><span class="detail-sow-row-icon" aria-hidden="true">💡</span><span class="detail-sow-row-copy">${value}</span></blockquote>`;

  container.innerHTML = `
    <div class="pdp-hero-wrap">
      <img class="pdp-photo-full" src="${displayedPhotoSrc}" data-hero-src="${heroPhotoSrc}" alt="${plantText(p, "nome")}" decoding="async"
           onerror="if(!this.dataset.fallbackStep){this.dataset.fallbackStep='1';this.src='${photoSrc}';}else{this.src='assets/img/svg/${p.id}.svg';}">
      <div class="pdp-hero-gradient"></div>
      <div class="pdp-hero-meta">
        ${tipoLabel ? `<span class="pdp-hero-type">${tipoLabel}</span>` : ""}
        <span class="pdp-hero-diff ${diffClass}">${diffLabel}</span>
      </div>
      <div class="pdp-hero-overlay">
        <div class="pdp-hero-info">
          <h2 class="pdp-name">${plantText(p, "nome")}</h2>
        </div>
      </div>
    </div>
    <div class="detail-body pdp-detail-body">
      <div class="detail-tabs-shell">
      <div class="detail-tabs-heading"><strong>${detailText("detail.tabs_title")}</strong><span>${detailText("detail.tabs_hint")}</span></div>
      <div class="detail-tabs" role="tablist" aria-label="${detailText("detail.tabs_title")}">
        ${CONFIG_DETAIL_TABS.map((tab, index) => {
          return `<button class="detail-tab${index === 0 ? " active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-detail-tab="${tab}" data-conf-action="set-detail-tab">${configDetailTabIcon(tab)}<span>${detailText(`detail.tab_${tab}`)}</span></button>`;
        }).join("")}
      </div>
      </div>

      <div class="detail-tab-panel active" data-detail-panel="overview">
        <div class="detail-badges"><span class="badge badge--sun">${soleIcon} ${soleLabel}</span><span class="badge badge--water">${acquaIcon} ${waterLabel(p.acqua)}</span></div>
        ${desc ? `<div class="detail-nota">${desc}</div>` : nota ? `<div class="detail-nota">${nota}</div>` : ""}
        <div class="detail-stats">
          <div class="detail-tile detail-tile--harvest"><div class="detail-tile-icon">⏱</div><div class="detail-tile-label">${tx("harvest")}</div><div class="detail-tile-value">${harvestValue(p)}</div></div>
          <div class="detail-tile detail-tile--yield"><div class="detail-tile-icon">⚖</div><div class="detail-tile-label">${tx("yieldPlant")}</div><div class="detail-tile-value">${yieldLabel(p.resa)}</div></div>
          <div class="detail-tile detail-tile--height"><div class="detail-tile-icon">↕</div><div class="detail-tile-label">${tx("height")}</div><div class="detail-tile-value">${heightLabel(p.h || "media")}</div></div>
          <div class="detail-tile detail-tile--quantity"><div class="detail-tile-label">${detailText("detail.quantity_bed")}</div><div class="detail-tile-value">${detailText("detail.plants_count", { count: b.count })}</div></div>
          <div class="detail-tile detail-tile--dimensions"><div class="detail-tile-label">${detailText("detail.bed_dimensions")}</div><div class="detail-bed-measures"><span><b aria-hidden="true">↔</b><small>${detailText("detail.bed_width")}</small><strong>${bedWidth}</strong></span><span><b aria-hidden="true">↕</b><small>${detailText("detail.bed_length")}</small><strong>${bedLength}</strong></span></div></div>
        </div>
      </div>

      <div class="detail-tab-panel" data-detail-panel="cultivation" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.cultivation_title")}</span><small>${detailText("detail.cultivation_subtitle")}</small></div>
        <section class="detail-seasonality"><div class="detail-seasonality-heading"><span class="detail-seasonality-icon" aria-hidden="true">🗓</span><div><b>${detailText("detail.calendar_title")}</b><small>${detailText("detail.calendar_subtitle")}</small></div></div><div class="month-bar"><div class="month-bar-head"><span>${monthLegend.title}</span><b>${activeMonthsLabel}</b></div><div class="month-segments" aria-label="${monthLegend.title}">${Array.from(
          { length: 12 },
          (_, i) => {
            const on = effectiveMonths(p).has(i + 1);
            const cur = i + 1 === state.mese;
            return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}"><span class="month-seg-abbr">${monthName(i + 1).slice(0, 3)}</span></div>`;
          },
        ).join(
          "",
        )}</div><div class="month-bar-legend"><span><i class="month-legend-dot month-legend-dot--active"></i>${monthLegend.available}</span><span><i class="month-legend-dot month-legend-dot--current"></i>${monthLegend.selected}</span></div></div></section>
        ${sow ? `<div class="detail-sow"><div class="detail-sow-body">${sow.method ? sowRow("🌱", tx("sowMethod"), sow.method) : ""}${sow.periodo ? sowRow("📅", detailText("detail.sow_period"), sow.periodo) : ""}${sow.depth ? sowRow("📏", tx("sowDepth"), sow.depth) : ""}${sow.tip || nota ? sowTip(sow.tip || nota) : ""}</div></div>` : ""}
        <div class="detail-spacing"><div class="detail-spacing-header"><span class="detail-tile-label">${window.SERRA_PLANT_CONTENT?.spacingLabel(p, state.lang) || tx("distance")}</span><b class="detail-spacing-val">${spacingValue(p)}</b></div>${svgSpacing ? `<div class="detail-spacing-diagram">${svgSpacing}</div>` : ""}</div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.cultivation)}</div>
      </div>

      <div class="detail-tab-panel" data-detail-panel="care" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.care_title")}</span><small>${detailText("detail.care_subtitle")}</small></div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.care)}</div>
        ${renderConfigDiseases(p)}
        ${renderConfigPests(p)}
        ${amiche.length || nemiche.length ? `<div class="detail-companions">${amiche.length ? `<div class="detail-companions-group"><div class="detail-companions-label">${tx("friends")}</div><div class="companion-list">${amiche.map((n) => `<span class="companion-chip friend">${n}</span>`).join("")}</div></div>` : ""}${nemiche.length ? `<div class="detail-companions-group"><div class="detail-companions-label detail-companions-label--foe">${tx("enemies")}</div><div class="companion-list">${nemiche.map((n) => `<span class="companion-chip foe">${n}</span>`).join("")}</div></div>` : ""}</div>` : ""}
      </div>

      <div class="detail-tab-panel" data-detail-panel="harvest" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.harvest_title")}</span><small>${detailText("detail.harvest_subtitle")}</small></div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.harvest)}</div>
        <div class="detail-nota">${state.lang === "ro" ? `${b.count} plante în parcelă · producție totală estimată ${yieldLabel(resaTot)}` : `${b.count} piante nell'aiuola · resa totale stimata ${yieldLabel(resaTot)}`}</div>
      </div>
    </div>
  `;
  if (useProgressiveMobileHero && heroPhotoSrc !== photoSrc) {
    const heroImage = container.querySelector(".pdp-photo-full");
    // Lascia completare il primo paint con la miniatura prima del download grande.
    window.requestAnimationFrame(() =>
      upgradePlantDetailHeroImage(heroImage, heroPhotoSrc),
    );
  }
  setConfigDetailTab(initialTab);
}

// Abilita annulla e ripristina in base agli snapshot disponibili nello storico.
function updateUndoRedoButtons() {
  const undoBtn = document.getElementById("btnUndo");
  const redoBtn = document.getElementById("btnRedo");
  if (undoBtn)
    undoBtn.disabled = typeof canUndo === "function" ? !canUndo() : true;
  if (redoBtn)
    redoBtn.disabled = typeof canRedo === "function" ? !canRedo() : true;
}

// Avvisi di consociazione e overflow.
function renderWarnings(L) {
  const w = document.getElementById("warnings");
  if (!w) return;
  let out = "";

  const analysis = analyzeCompanions();
  const presentIds = state.beds.map((b) => b.plantId);

  if (state.beds.length >= 2) {
    const ratingLabel = tx("companion.rating_" + analysis.rating);
    out += `<div class="warn companion-score companion-score--${analysis.rating}">
      <span class="i">🧭</span>
      <div class="companion-score-body">
        <div class="companion-score-top"><b>${tx("companion.score_label")}</b><span class="companion-score-val">${analysis.score}/100 · ${ratingLabel}</span></div>
        <div class="companion-score-bar"><span style="width:${analysis.score}%"></span></div>
        <div class="companion-score-scope">${tx("companion.score_scope")}</div>
      </div>
    </div>`;
  }

  analysis.badPairs.forEach((pair) => {
    const a = plantText(pair.a, "nome");
    const b = plantText(pair.b, "nome");
    const sugg = companionSuggestionFor(pair, presentIds);
    let suggHtml = "";
    if (sugg) {
      const key = sugg.offSeason
        ? "companion.suggest_offseason"
        : "companion.suggest";
      suggHtml = `<div class="companion-suggest">💡 ${tx(key, {
        friend: plantText(sugg.friend, "nome"),
        base: plantText(sugg.base, "nome"),
      })}</div>`;
    }
    out += `<div class="warn bad"><span class="i">⚠️</span><div>
        <div>${tx("badCompanion", { a, b })}</div>
        <div class="companion-reason">${tx("companion.bad_reason")}</div>
        ${suggHtml}
      </div></div>`;
  });
  if (L.overflow)
    out += `<div class="warn bad"><span class="i">📏</span><div>${tx("overflowWarning")}</div></div>`;
  if (state.autoPlanNotice)
    out += `<div class="warn tip"><span class="i">ℹ️</span><div>${tx(state.autoPlanNotice)}</div></div>`;
  if (state.manualPlanNotice) {
    const manualBad =
      state.manualPlanNotice === "addNoSpace" ||
      state.manualPlanNotice === "manualCountRejected" ||
      state.manualPlanNotice === "presetDoesNotFit" ||
      state.manualPlanNotice === "lockedGeometryRejected";
    out += `<div class="warn ${manualBad ? "bad" : "tip"}"><span class="i">${manualBad ? "⚠️" : "ℹ️"}</span><div>${tx(state.manualPlanNotice)}</div></div>`;
  }
  if (analysis.goodPairs.length) {
    const ex = analysis.goodPairs
      .slice(0, 2)
      .map((g) => plantText(g.a, "nome") + " + " + plantText(g.b, "nome"))
      .join(", ");
    out += `<div class="warn tip"><span class="i">🤝</span><div>
        <div>${tx("goodCompanions", {
          pairs: `${ex}${analysis.goodPairs.length > 2 ? "…" : ""}`,
        })}</div>
        <div class="companion-reason">${tx("companion.good_reason")}</div>
      </div></div>`;
  }
  w.innerHTML = out;
}

// Aggiorna il riepilogo resa e il pulsante esporta carrello
function renderSummary() {
  const s = document.getElementById("summary"),
    shop = document.getElementById("shop");
  if (state.beds.length === 0) {
    s.innerHTML = tx("addEstimate");
    shop.innerHTML = "";
    const shopTotalEmpty = document.getElementById("shopTotal");
    if (shopTotalEmpty) shopTotalEmpty.hidden = true;
    if (typeof updateOrderGrandTotal === "function") updateOrderGrandTotal();
    const guidedSummary = document.getElementById("guidedSummary");
    if (guidedSummary) guidedSummary.textContent = "";
    const slotEmpty = document.getElementById("cartBtnSlot");
    if (slotEmpty) slotEmpty.innerHTML = "";
    const yieldBadgeEmpty = document.getElementById("yieldToggleBadge");
    if (yieldBadgeEmpty) yieldBadgeEmpty.textContent = "";
    renderMaterials();
    renderPrintSummary();
    return;
  }
  let kg = 0,
    np = 0;
  state.beds.forEach((b) => {
    kg += b.count * BYID[b.plantId].resa;
    np += b.count;
  });
  s.innerHTML = `
    <div class="yield-metrics" aria-label="${tx("summary", {
      plants: np,
      beds: state.beds.length,
      yield: yieldLabel(kg),
    }).replace(/<[^>]+>/g, "")}">
      <div class="yield-metric">
        <strong>${state.beds.length}</strong>
        <span>${tx("yield.varieties")}</span>
      </div>
      <div class="yield-metric">
        <strong>${np}</strong>
        <span>${tx("yield.plants_label")}</span>
      </div>
      <div class="yield-metric yield-metric--accent">
        <strong>${yieldLabel(kg)}</strong>
        <span>${tx("yield.harvest")}</span>
      </div>
    </div>`;
  const guidedSummary = document.getElementById("guidedSummary");
  if (guidedSummary) {
    guidedSummary.textContent = tx("guidedIntroSummary", {
      beds: state.beds.length,
      plants: np,
      yield: yieldLabel(kg),
    });
  }
  let seedsTotalForShop = 0;
  shop.innerHTML = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      const pd = PACK_DATA[b.plantId] || { seeds: 100, price: 2.5 };
      const packs = Math.max(1, Math.ceil(b.count / (pd.seeds ?? 100)));
      const packLabel =
        packs === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: packs });
      const photoSrc = plantPhotoSrc(p, p.id);
      window.preloadPlantPhoto?.(p, p.id);
      const rowSubtotal = packs * pd.price;
      seedsTotalForShop += rowSubtotal;
      return `<li>
        <span class="shop-emoji" role="img" aria-label="${plantText(p, "nome")}">
          <img class="shop-photo" src="${photoSrc}" alt="" decoding="async"
            onerror="this.onerror=null;this.src='assets/img/svg/leaf.svg';this.classList.add('shop-photo--fallback');">
        </span>
        <span class="shop-plant">
          <b>${plantText(p, "nome")}</b>
          <small>${tx("shoppingItem", { count: b.count })}</small>
        </span>
        <span class="shop-side">
          <span class="shop-pack">${packLabel}</span>
          <b class="shop-price">${euro(rowSubtotal)}</b>
        </span>
      </li>`;
    })
    .join("");

  const shopTotal = document.getElementById("shopTotal");
  if (shopTotal) {
    shopTotal.hidden = false;
    shopTotal.innerHTML = `
      <span>${tx("shop.seeds_total")}</span>
      <b>${euro(seedsTotalForShop)}</b>`;
  }
  if (typeof updateOrderGrandTotal === "function") updateOrderGrandTotal();

  const yieldBadge = document.getElementById("yieldToggleBadge");
  if (yieldBadge) {
    yieldBadge.textContent =
      state.beds.length > 0 ? `${state.beds.length} var.` : "";
  }

  const exportBtn = document.createElement("button");
  exportBtn.id = "confCartExportBtn";
  exportBtn.className = "btn btn-success btn-block conf-cart-export-btn";
  const _rawExportLabel = tx("cart.export_btn");
  const _exportLabel = _rawExportLabel.replace(/^🛒\s*/, "");
  exportBtn.innerHTML = `<svg class="conf-cart-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="conf-cart-btn-label">${_exportLabel}</span>`;
  exportBtn.type = "button";
  exportBtn.onclick = exportConfToCart;
  const slot = document.getElementById("cartBtnSlot");
  if (slot) {
    slot.innerHTML = "";
    slot.appendChild(exportBtn);
  }

  renderMaterials();
  renderPrintSummary();
}

// Chiude il menu dropdown di esportazione progetto
function closeProjectExportMenu({ restoreFocus = false } = {}) {
  const menu = document.getElementById("projectExportMenu");
  if (!menu || menu.hidden) return;
  const triggerId = menu.dataset.trigger;
  menu.hidden = true;
  menu.removeAttribute("data-trigger");
  document
    .querySelectorAll('[aria-controls="projectExportMenu"]')
    .forEach((button) => button.setAttribute("aria-expanded", "false"));
  if (restoreFocus && triggerId)
    document.getElementById(triggerId)?.focus({ preventScroll: true });
}

// Apre il menu dropdown di esportazione progetto
function openProjectExportMenu(trigger) {
  const menu = document.getElementById("projectExportMenu");
  if (!menu || !trigger) return;
  const wasOpen = !menu.hidden && menu.dataset.trigger === trigger.id;
  closeProjectExportMenu();
  if (wasOpen) return;
  menu.hidden = false;
  menu.dataset.trigger = trigger.id;
  trigger.setAttribute("aria-expanded", "true");
  const rect = trigger.getBoundingClientRect();
  const menuWidth = Math.min(310, window.innerWidth - 24);
  const left = Math.max(
    12,
    Math.min(window.innerWidth - menuWidth - 12, rect.right - menuWidth),
  );
  const estimatedHeight = 210;
  const openAbove = rect.bottom + estimatedHeight + 12 > window.innerHeight;
  menu.style.left = `${left}px`;
  menu.style.top = `${openAbove ? Math.max(12, rect.top - estimatedHeight - 8) : rect.bottom + 8}px`;
  menu.querySelector("button")?.focus({ preventScroll: true });
}

// Genera il nome file per l'esportazione del progetto
function projectExportFileName(extension) {
  const month = monthName(state.mese)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const base = tx("exportFileName") || "progetto-serra";
  return `${base}-${state.larghezza}x${state.lunghezza}m-${month}.${extension}`
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

// Aggrega le aiuole del progetto per nome e conteggio

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 7 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function aggregatedProjectBeds() {
  const rows = new Map();
  state.beds.forEach((bed) => {
    rows.set(bed.plantId, (rows.get(bed.plantId) || 0) + bed.count);
  });
  return Array.from(rows, ([plantId, count]) => ({
    name: plantText(BYID[plantId], "nome"),
    count,
  }));
}

// Genera il canvas con scena e riepilogo per l'export immagine
async function buildProjectExportCanvas() {
  const svg = document.querySelector("#scene svg");
  if (!svg) throw new Error("Greenhouse scene is not available");
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const serialized = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([serialized], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = svgUrl;
    });
    const viewBox = svg.viewBox.baseVal;
    const sourceWidth = viewBox.width || svg.clientWidth || 1200;
    const sourceHeight = viewBox.height || svg.clientHeight || 800;
    const canvasWidth = 1800;
    const side = 90;
    const headerHeight = 190;
    const mapWidth = canvasWidth - side * 2;
    const mapHeight = Math.round((mapWidth * sourceHeight) / sourceWidth);
    const crops = aggregatedProjectBeds();
    const rowsPerColumn = Math.max(1, Math.ceil(crops.length / 2));
    const summaryHeight = Math.max(245, 126 + rowsPerColumn * 42);
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = headerHeight + mapHeight + summaryHeight + 80;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7f4e9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1f3a26";
    ctx.font = '800 54px "DM Sans", Arial, sans-serif';
    ctx.fillText(tx("print.title"), side, 82);
    ctx.fillStyle = "#617064";
    ctx.font = '500 27px "DM Sans", Arial, sans-serif';
    const zoneKey =
      state.zona === "freddo"
        ? "cold"
        : state.zona === "caldo"
          ? "warm"
          : "temperate";
    const meta = tx("print.greenhouse_info")
      .replace("{w}", state.larghezza)
      .replace("{l}", state.lunghezza)
      .replace("{zone}", tx(zoneKey))
      .replace("{month}", monthName(state.mese));
    ctx.fillText(meta, side, 132);
    ctx.strokeStyle = "#d2dace";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(side, 163);
    ctx.lineTo(canvasWidth - side, 163);
    ctx.stroke();
    ctx.drawImage(image, side, headerHeight, mapWidth, mapHeight);

    const summaryTop = headerHeight + mapHeight + 60;
    ctx.fillStyle = "#1f3a26";
    ctx.font = '800 35px "DM Sans", Arial, sans-serif';
    ctx.fillText(tx("inGreenhouse"), side, summaryTop);
    const totalPlants = crops.reduce((sum, crop) => sum + crop.count, 0);
    ctx.textAlign = "right";
    ctx.font = '700 25px "DM Sans", Arial, sans-serif';
    ctx.fillStyle = "#52705a";
    ctx.fillText(
      `${tx("print.total")}: ${totalPlants}`,
      canvasWidth - side,
      summaryTop,
    );
    ctx.textAlign = "left";
    const columnWidth = (canvasWidth - side * 2 - 70) / 2;
    crops.forEach((crop, index) => {
      const column = Math.floor(index / rowsPerColumn);
      const row = index % rowsPerColumn;
      const x = side + column * (columnWidth + 70);
      const y = summaryTop + 54 + row * 42;
      ctx.fillStyle = "#2c4633";
      ctx.font = '600 25px "DM Sans", Arial, sans-serif';
      ctx.fillText(crop.name, x, y);
      ctx.textAlign = "right";
      ctx.fillStyle = "#6b776d";
      ctx.font = '500 23px "DM Sans", Arial, sans-serif';
      ctx.fillText(String(crop.count), x + columnWidth, y);
      ctx.textAlign = "left";
    });
    return canvas;
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

// Avvia il download di un blob come file
function downloadProjectBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Esporta il progetto come immagine PNG
async function exportProjectPng() {
  const canvas = await buildProjectExportCanvas();
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png", 1),
  );
  if (!blob) throw new Error("PNG generation failed");
  downloadProjectBlob(blob, projectExportFileName("png"));
}

// Genera un PDF dal canvas del progetto
function pdfFromProjectCanvas(canvas) {
  const jpegData = canvas.toDataURL("image/jpeg", 0.92).split(",")[1];
  const raw = atob(jpegData);
  const jpegBytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) jpegBytes[i] = raw.charCodeAt(i);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 24;
  const scale = Math.min(
    (pageWidth - margin * 2) / canvas.width,
    (pageHeight - margin * 2) / canvas.height,
  );
  const imageWidth = canvas.width * scale;
  const imageHeight = canvas.height * scale;
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = (pageHeight - imageHeight) / 2;
  const content = `q\n${imageWidth.toFixed(2)} 0 0 ${imageHeight.toFixed(2)} ${imageX.toFixed(2)} ${imageY.toFixed(2)} cm\n/Im0 Do\nQ`;

  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let byteLength = 0;
  const append = (value) => {
    const bytes = typeof value === "string" ? encoder.encode(value) : value;
    chunks.push(bytes);
    byteLength += bytes.length;
  };
  const object = (number, parts) => {
    offsets[number] = byteLength;
    append(`${number} 0 obj\n`);
    parts.forEach(append);
    append("\nendobj\n");
  };

  append("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  object(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  object(2, ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"]);
  object(3, [
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`,
  ]);
  object(4, [
    `<< /Length ${encoder.encode(content).length} >>\nstream\n`,
    content,
    "\nendstream",
  ]);
  object(5, [
    `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
    jpegBytes,
    "\nendstream",
  ]);

  const xrefOffset = byteLength;
  append("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i += 1) {
    append(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

// Esporta il progetto come file PDF
async function exportProjectPdf() {
  const canvas = await buildProjectExportCanvas();
  const pdf = pdfFromProjectCanvas(canvas);
  downloadProjectBlob(pdf, projectExportFileName("pdf"));
}

// Genera il riepilogo per la stampa

// -----------------------------------------------------------------------------
// Rendering delle interfacce del configuratore — sezione 8 di 8
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function renderPrintSummary() {
  const el = document.getElementById("printSummary");
  if (!el) return;
  const labels = {
    title: tx("print.title"),
    greenhouseInfo: tx("print.greenhouse_info"),
    bedsTitle: tx("inGreenhouse"),
    yieldTitle: tx("print.yield_title"),
    plant: tx("print.plant"),
    qty: tx("print.qty"),
    unitYield: tx("yieldPlant"),
    totalYield: tx("print.total_yield"),
    shopping: tx("print.shopping"),
    total: tx("print.total"),
  };
  if (state.beds.length === 0) {
    el.innerHTML = "";
    return;
  }
  const rows = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      const total = b.count * p.resa;
      return `<tr>
        <td>${plantText(p, "nome")}</td>
        <td>${yieldLabel(p.resa)}</td>
        <td>${yieldLabel(total)}</td>
      </tr>`;
    })
    .join("");
  const totalYield = state.beds.reduce(
    (sum, b) => sum + b.count * BYID[b.plantId].resa,
    0,
  );
  const totalPlants = state.beds.reduce((sum, b) => sum + b.count, 0);
  const shoppingRows = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      return `<li><b>${plantText(p, "nome")}</b>: ${tx("shoppingItem", { count: b.count })}</li>`;
    })
    .join("");
  const zoneKey =
    state.zona === "freddo"
      ? "cold"
      : state.zona === "caldo"
        ? "warm"
        : "temperate";
  el.innerHTML = `<div class="print-heading">
      <h2>${labels.title}</h2>
      <p>${labels.greenhouseInfo
        .replace("{w}", state.larghezza)
        .replace("{l}", state.lunghezza)
        .replace("{zone}", tx(zoneKey))
        .replace("{month}", monthName(state.mese))}</p>
    </div>
    <div class="print-summary-grid">
      <section>
        <h3>${labels.bedsTitle}</h3>
        <table>
          <thead><tr><th>${labels.plant}</th><th>${labels.qty}</th></tr></thead>
          <tbody>${state.beds
            .map(
              (b) =>
                `<tr><td>${plantText(BYID[b.plantId], "nome")}</td><td>${b.count}</td></tr>`,
            )
            .join("")}</tbody>
          <tfoot><tr><td>${labels.total}</td><td>${totalPlants}</td></tr></tfoot>
        </table>
      </section>
      <section>
        <h3>${labels.yieldTitle}</h3>
        <table>
          <thead><tr><th>${labels.plant}</th><th>${labels.unitYield}</th><th>${labels.totalYield}</th></tr></thead>
          <tbody>${rows}</tbody>
          <tfoot><tr><td>${labels.total}</td><td></td><td>${yieldLabel(totalYield)}</td></tr></tfoot>
        </table>
        <h4>${labels.shopping}</h4>
        <ul>${shoppingRows}</ul>
        ${materialsPrintHtml()}
      </section>
    </div>`;
}

// Analisi consociazioni
function analyzeCompanions() {
  const beds = state.beds;
  const ids = beds.map((b) => b.plantId);
  const badPairs = [];
  const goodPairs = [];
  const conflictIds = new Set();
  const seenBad = new Set();
  const seenGood = new Set();
  for (let i = 0; i < beds.length; i++) {
    for (let j = i + 1; j < beds.length; j++) {
      const a = BYID[ids[i]];
      const b = BYID[ids[j]];
      if (!a || !b) continue;
      const key = [a.id, b.id].sort().join("|");
      if (a.nemiche.includes(b.id) || b.nemiche.includes(a.id)) {
        if (!seenBad.has(key)) {
          seenBad.add(key);
          badPairs.push({ a, b });
          conflictIds.add(a.id);
          conflictIds.add(b.id);
        }
      }
      if (a.amiche.includes(b.id) || b.amiche.includes(a.id)) {
        if (!seenGood.has(key)) {
          seenGood.add(key);
          goodPairs.push({ a, b });
        }
      }
    }
  }
  const score = Math.max(
    0,
    Math.min(100, 100 - badPairs.length * 20 + goodPairs.length * 4),
  );
  const rating = score >= 85 ? "great" : score >= 60 ? "good" : "review";
  return { badPairs, goodPairs, conflictIds, score, rating };
}

// Suggerisce una coltura amica per una coppia in conflitto
function companionSuggestionFor(pair, presentIds) {
  const present = new Set(presentIds);
  const month = state.mese;

  for (const base of [pair.a, pair.b]) {
    for (const fid of base.amiche) {
      const fp = BYID[fid];
      if (!fp || present.has(fid)) continue;
      if (Array.isArray(fp.mesi) && fp.mesi.includes(month)) {
        return { friend: fp, base, offSeason: false };
      }
    }
  }

  for (const base of [pair.a, pair.b]) {
    for (const fid of base.amiche) {
      const fp = BYID[fid];
      if (fp && !present.has(fid)) {
        return { friend: fp, base, offSeason: true };
      }
    }
  }
  return null;
}

// Definisce prezzi unitari e funzioni per calcolare i materiali dell'ordine.
const MATERIAL_PRICES = {
  soilBagLiters: 50,
  soilBagPrice: 6.5,
  fertilizerKg: 2.2,
  support: 1.5,
  label: 0.15,
};

const shoppingQtyOverride = {};
// Memorizza selezione e quantità dei materiali extra opzionali dell'ordine.
const MATERIALS_SELECTION_KEY = "ois.cartMaterials";
const shoppingChecked = {};
try {
  Object.assign(
    shoppingChecked,
    JSON.parse(localStorage.getItem(MATERIALS_SELECTION_KEY) || "{}"),
  );
} catch (_) {}

// Salva la selezione dei materiali extra
function saveMaterialsSelection() {
  try {
    localStorage.setItem(
      MATERIALS_SELECTION_KEY,
      JSON.stringify(shoppingChecked),
    );
  } catch (_) {}
}

// Calcola l'area utile delle aiuole in metri quadri
function bedAreaM2() {
  const area = (Number(state.larghezza) || 0) * (Number(state.lunghezza) || 0);
  return Math.max(0, area * 0.6);
}

// Verifica se la pianta richiede sostegno
function isSupportPlant(p) {
  return p.h === "alta" || ["rampicante", "cucurbita"].includes(p.arch);
}

// Formatta un numero come stringa euro
function euro(v) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(v);
}

// Calcola quantità, costo e unità dei materiali extra necessari alla serra.
function computeMaterialLines() {
  const lines = [];
  if (!state.beds.length) return lines;

  const areaBeds = bedAreaM2();

  const soilLiters = Math.round(areaBeds * 200);
  if (soilLiters > 0) {
    const bags = Math.max(
      1,
      Math.ceil(soilLiters / MATERIAL_PRICES.soilBagLiters),
    );
    lines.push({
      id: "terriccio",
      cat: "soil",
      icon: "🟫",
      qty: bags,
      unit: "bags",
      unitPrice: MATERIAL_PRICES.soilBagPrice,
      note: soilLiters + " L",
    });
  }

  const fertKg = Math.max(1, Math.ceil(areaBeds * 0.15));
  if (areaBeds > 0) {
    lines.push({
      id: "concime",
      cat: "fertilizer",
      icon: "🧪",
      qty: fertKg,
      unit: "kg",
      unitPrice: MATERIAL_PRICES.fertilizerKg,
    });
  }

  let supports = 0;
  state.beds.forEach((b) => {
    const p = BYID[b.plantId];
    if (p && isSupportPlant(p)) supports += b.count;
  });
  if (supports > 0) {
    lines.push({
      id: "sostegni",
      cat: "supports",
      icon: "🪵",
      qty: supports,
      unit: "pieces",
      unitPrice: MATERIAL_PRICES.support,
    });
  }

  lines.push({
    id: "etichette",
    cat: "accessories",
    icon: "🏷️",
    qty: state.beds.length,
    unit: "pieces",
    unitPrice: MATERIAL_PRICES.label,
  });

  return lines;
}

// Costruisce le righe selezionate con quantità, prezzi unitari e subtotali.
function materialsWithTotals() {
  const lines = computeMaterialLines().map((line) => {
    const qty =
      shoppingQtyOverride[line.id] != null
        ? shoppingQtyOverride[line.id]
        : line.qty;
    const checked = Boolean(shoppingChecked[line.id]);
    const subtotal = checked ? qty * line.unitPrice : 0;
    return { ...line, qty, checked, subtotal };
  });
  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  return { lines, total };
}

// Restituisce i materiali extra selezionati nel formato usato per l'ordine.
function selectedMaterialItems() {
  const { lines } = materialsWithTotals();
  return lines
    .filter((l) => l.checked && l.qty > 0)
    .map((l) => ({
      id: "mat-" + l.id,
      nome: shoppingCatLabel(l.cat),
      bustine: l.qty,
      prezzo: l.unitPrice,
      icon: l.icon,
      unit: l.unit,
      type: "material",
    }));
}

// Toglie un materiale extra dalla selezione (es. dal pannello carrello)
function unselectMaterial(rawId) {
  const id = rawId.startsWith("mat-") ? rawId.slice(4) : rawId;
  shoppingChecked[id] = false;
  saveMaterialsSelection();
  renderMaterials();
  if (typeof updateConfCartUI === "function") updateConfCartUI();
}

// Restituisce l'etichetta tradotta dell'unità di misura
function shoppingUnitLabel(unit, qty) {
  const key =
    unit === "bags"
      ? "shop.unit_bags"
      : unit === "kg"
        ? "shop.unit_kg"
        : unit === "packs"
          ? qty === 1
            ? "cart.pack_one"
            : "cart.pack_many"
          : "shop.unit_pieces";
  return tx(key, { count: qty });
}

// Restituisce l'etichetta tradotta della categoria materiale
function shoppingCatLabel(cat) {
  return tx("shop.cat_" + cat);
}

// Costo dei semi nel piano attuale (stessa logica dell'esportazione carrello)
function seedsCostTotal() {
  if (!state.beds.length) return 0;
  return state.beds.reduce((sum, b) => {
    const pd = PACK_DATA[b.plantId] || { seeds: 100, price: 2.5 };
    const packs = Math.max(1, Math.ceil(b.count / (pd.seeds ?? 100)));
    return sum + packs * pd.price;
  }, 0);
}

// Aggiorna il totale generale dell'ordine (semi + materiali extra scelti)
function updateOrderGrandTotal() {
  const el = document.getElementById("orderGrandTotal");
  if (!el) return;
  if (!state.beds.length) {
    el.hidden = true;
    return;
  }
  const grand = seedsCostTotal() + materialsWithTotals().total;
  el.hidden = false;
  el.innerHTML = `
    <span>${tx("cart.materials_grand_total")}</span>
    <b>${euro(grand)}</b>`;
}

// Aggiorna la lista della spesa senza modificare lo stato della tendina materiali.
function renderMaterials() {
  const el = document.getElementById("materials");
  if (!el) return;
  if (!state.beds.length) {
    el.innerHTML = "";
    updateOrderGrandTotal();
    return;
  }
  const { lines, total } = materialsWithTotals();
  const selectedCount = lines.filter((l) => l.checked).length;

  let details = el.querySelector(".materials-accordion");
  if (!details) {
    el.innerHTML = `
      <details class="materials-accordion">
        <summary class="materials-summary">
          <span class="materials-summary-main">
            <b>${tx("shop.materials_title")}</b>
            <small>${tx("shop.materials_hint")}</small>
          </span>
          <span class="materials-summary-badge" hidden></span>
        </summary>
        <div class="materials-body"></div>
      </details>`;
    details = el.querySelector(".materials-accordion");
  }
  // Mantiene lo stato di apertura della sezione.

  const badge = details.querySelector(".materials-summary-badge");
  if (badge) {
    badge.hidden = selectedCount === 0;
    badge.textContent = tx("shop.materials_badge", { count: selectedCount });
  }

  const rows = lines
    .map((l) => {
      const noteHtml = l.note ? `<span class="mat-note">${l.note}</span>` : "";
      const toggleText = l.checked ? tx("shop.added") : tx("shop.add");
      return `<li class="mat-row${l.checked ? " is-checked" : ""}">
        <div class="mat-row-head">
          <span class="mat-icon" aria-hidden="true">${l.icon}</span>
          <b class="mat-name">${shoppingCatLabel(l.cat)}</b>
          <label class="mat-toggle">
            <input type="checkbox" data-mat-check="${l.id}" ${
              l.checked ? "checked" : ""
            } aria-label="${tx("shop.add_to_order")} · ${shoppingCatLabel(
              l.cat,
            )}">
            <span class="mat-toggle-text">${toggleText}</span>
          </label>
        </div>
        <div class="mat-row-meta">${shoppingUnitLabel(l.unit, l.qty)} · ${euro(
          l.unitPrice,
        )}/${tx("shop.each")} ${noteHtml}</div>
        <div class="mat-row-foot">
          <span class="mat-qty">
            <input type="number" min="0" step="1" inputmode="numeric"
              value="${l.qty}" data-mat-qty="${l.id}"
              aria-label="${tx("shop.qty_aria")} ${shoppingCatLabel(l.cat)}">
          </span>
          <span class="mat-sub">${euro(l.subtotal)}</span>
        </div>
      </li>`;
    })
    .join("");

  const body = details.querySelector(".materials-body");
  body.innerHTML = `
    <ul class="mat-list">${rows}</ul>
    <div class="mat-total">
      <span>${tx("shop.preventivo_total")}</span>
      <b>${euro(total)}</b>
    </div>
    <p class="mat-disclaimer">${tx("shop.estimate_note")}</p>`;

  body.querySelectorAll("[data-mat-qty]").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.matQty;
      const v = Math.max(0, Math.floor(Number(e.target.value) || 0));
      shoppingQtyOverride[id] = v;
      renderMaterials();
      if (typeof updateConfCartUI === "function") updateConfCartUI();
    });
  });
  body.querySelectorAll("[data-mat-check]").forEach((box) => {
    box.addEventListener("change", (e) => {
      shoppingChecked[e.target.dataset.matCheck] = e.target.checked;
      saveMaterialsSelection();
      renderMaterials();
      if (typeof updateConfCartUI === "function") updateConfCartUI();
    });
  });

  updateOrderGrandTotal();
}

// HTML dei materiali selezionati per la stampa.
function materialsPrintHtml() {
  if (!state.beds.length) return "";
  const { lines, total } = materialsWithTotals();
  const selectedLines = lines.filter((l) => l.checked);
  if (!selectedLines.length) return "";
  const rows = selectedLines
    .map(
      (l) =>
        `<tr><td>${shoppingCatLabel(l.cat)}</td><td>${shoppingUnitLabel(
          l.unit,
          l.qty,
        )}</td><td>${euro(l.subtotal)}</td></tr>`,
    )
    .join("");
  return `<h4>${tx("shop.materials_title")}</h4>
    <table>
      <thead><tr><th>${tx("shop.material")}</th><th>${tx(
        "print.qty",
      )}</th><th>${tx("shop.cost")}</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td>${tx("shop.preventivo_total")}</td><td></td><td>${euro(
        total,
      )}</td></tr></tfoot>
    </table>`;
}

// File generato con npm run build:js: modificare i moduli in conf/engine/.

// -----------------------------------------------------------------------------
// Regole e calcoli del configuratore — sezione 1 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

// Calcola i conteggi di piante e file rispettando spaziatura e dimensioni dell'aiuola.
function countForPlant(p, targetRows = 2) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d;
  const cols = maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
  return Math.max(1, cols * targetRows);
}

// Restituisce il numero di piante per fila
function rowSizeForPlant(p) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d;
  return maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
}

// Restituisce il numero di file ideali in base alla spaziatura
function targetRowsForPlant(p) {
  if (p.d <= 15) return 4;
  if (p.d <= 30) return 3;
  if (p.d <= 60) return 2;
  return 1;
}

const MIN_PLANT_COUNTS = {
  pomodoro: 4,
  peperone: 4,
  peperoncino: 3,
  melanzana: 4,
  zucchina: 2,
  zucca: 1,
  cetriolo: 3,
  melone: 1,
  anguria: 1,
  lattuga: 8,
  radicchio: 6,
  rucola: 12,
  spinaci: 12,
  bietola: 6,
  cavolo: 4,
  verza: 4,
  broccolo: 4,
  cavolfiore: 4,
  cavolonero: 4,
  cavolorapa: 6,
  carota: 24,
  finocchio: 4,
  prezzemolo: 6,
  basilico: 6,
  coriandolo: 8,
  aneto: 4,
  cipolla: 20,
  aglio: 20,
  porro: 12,
  scalogno: 12,
  fagiolino: 8,
  fagiolo: 6,
  pisello: 10,
  fragola: 6,
  sedano: 6,
  ravanello: 20,
  barbabietola: 12,
  cicoria: 8,
  indivia: 6,
  pakchoi: 8,
  cavoletti: 4,
  rapa: 12,
  valerianella: 20,
  rosmarino: 1,
  timo: 4,
  origano: 4,
  salvia: 2,
};

// Restituisce il numero minimo di esemplari per la pianta
function minimumCountForPlant(p) {
  if (!p) return 1;
  if (MIN_PLANT_COUNTS[p.id]) return MIN_PLANT_COUNTS[p.id];
  if (p.d >= 90) return 1;
  if (p.d >= 60) return 2;
  if (p.d >= 40) return 4;
  if (p.d >= 25) return 6;
  if (p.d >= 15) return 10;
  return 12;
}

// Calcola il numero target di varietà in base all'area
function targetVarietyCount(candidatesLength) {
  const area = state.larghezza * state.lunghezza;
  let target = 5;
  if (area >= 30) target = 7;
  if (area >= 55) target = 9;
  if (area >= 80) target = 11;
  return Math.min(candidatesLength, target);
}

// Verifica se la pianta può occupare un'intera fila
function canUseFilaLayout(p) {
  return (
    state.larghezza >= 4.2 &&
    state.lunghezza >= 4.8 &&
    p.arch === "rampicante" &&
    p.h === "alta"
  );
}

// Calcola il numero di piante per layout a fila intera
function countForFilaPlant(p) {
  const Li = state.lunghezza * 100;
  const Sc = p.dr || p.d;
  const filesAcross = maxSlotsForSpan(usableBedWidth() - 2 * BEDPAD, Sc);
  const plantsPerFile = maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, p.d);
  return filesAcross * plantsPerFile;
}

// Restituisce il conteggio predefinito per la pianta
function defaultCount(p) {
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, targetRowsForPlant(p)),
  );
}

// Conteggio iniziale per il piano automatico
function starterCountForAutoPlant(p, useFila = false) {
  if (useFila) return countForFilaPlant(p);
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, Math.min(targetRowsForPlant(p), 2)),
  );
}

// Gestisce la pianta selezionata e gli snapshot necessari alle modifiche reversibili.
function rememberSelection() {
  return state.selected >= 0 && state.selected < state.beds.length
    ? state.beds[state.selected].plantId
    : null;
}

// Ripristina la selezione in base all'ID pianta
function restoreSelection(plantId) {
  state.selected = plantId
    ? state.beds.findIndex((bed) => bed.plantId === plantId)
    : -1;
}

// Valida e normalizza le aiuole caricate dal salvataggio
function normalizeSavedBeds(beds) {
  if (!Array.isArray(beds)) return [];
  const seen = new Set();
  return beds
    .map((bed) => {
      const p = BYID[bed?.plantId];
      const savedLayout = bed?.layout === "fila" ? "fila" : "blocco";

      const layout =
        savedLayout === "fila" && p && !canUseFilaLayout(p)
          ? "blocco"
          : savedLayout;
      return {
        plantId: bed?.plantId,
        count: Math.max(1, Math.round(parseInt(bed?.count) || 1)),
        layout,
        countLocked: Boolean(bed?.countLocked),
        col: Number.isInteger(bed?.col) && bed.col >= 0 ? bed.col : undefined,
      };
    })
    .filter((bed) => {
      if (!BYID[bed.plantId] || seen.has(bed.plantId)) return false;
      seen.add(bed.plantId);
      return true;
    });
}

// Ordina le aiuole per altezza e compatibilità visiva nel piano della serra.
function heightSortValue(h) {
  return state.sudInBasso ? 2 - H_RANK[h] : H_RANK[h];
}

// Ordina le aiuole per altezza e compatibilità
function sortBedsForLayout() {
  state.beds.sort((a, b) => {
    const pa = BYID[a.plantId];
    const pb = BYID[b.plantId];
    return (
      Number(b.layout === "fila") - Number(a.layout === "fila") ||
      heightSortValue(pa.h) - heightSortValue(pb.h) ||
      (pa.acqua === "alta") - (pb.acqua === "alta") ||
      pa.d - pb.d
    );
  });
  if (state.beds.length < 3) return;

  const ordered = [];
  const remaining = state.beds.slice();
  while (remaining.length) {
    const last = ordered.length
      ? BYID[ordered[ordered.length - 1].plantId]
      : null;
    let bestIndex = 0;
    let bestScore = Infinity;
    remaining.forEach((bed, index) => {
      const p = BYID[bed.plantId];
      const conflictsWithPlaced = ordered.reduce(
        (sum, placed) =>
          sum + (areIncompatible(p, BYID[placed.plantId]) ? 1 : 0),
        0,
      );
      const score =
        (last && areIncompatible(p, last) ? 1000 : 0) +
        conflictsWithPlaced * 30 -
        (last && areCompanions(p, last) ? 20 : 0) +
        heightSortValue(p.h) * 4 +
        p.d * 0.01 +
        index * 0.001;
      if (score < bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });
    ordered.push(remaining.splice(bestIndex, 1)[0]);
  }
  state.beds = ordered;
}

// Riduce le quantità quando il piano supera lo spazio disponibile della serra.
function shrinkOverflowToFit(options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  const allowRemove = options.allowRemove !== false;
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const candidates = state.beds
      .map((b, index) => ({ ...b, index, plant: BYID[b.plantId] }))
      .filter((b) => b.layout !== "fila");
    const flexibleCandidates = preserveLockedCounts
      ? candidates.filter((b) => !b.countLocked)
      : candidates;
    if (preserveLockedCounts && flexibleCandidates.length === 0) break;
    const shrinkCandidates = preserveLockedCounts
      ? flexibleCandidates
      : candidates;

    const reducible = shrinkCandidates
      .filter(
        (b) =>
          b.count >
          Math.max(rowSizeForPlant(b.plant), minimumCountForPlant(b.plant)),
      )
      .sort((a, b) => b.count - a.count || b.plant.d - a.plant.d);

    if (reducible.length > 0) {
      const largest = reducible[0];
      const step = rowSizeForPlant(largest.plant);
      const minCount = Math.max(
        rowSizeForPlant(largest.plant),
        minimumCountForPlant(largest.plant),
      );
      state.beds[largest.index].count = Math.max(
        minCount,
        largest.count - step,
      );
    } else if (allowRemove) {
      const toRemove = shrinkCandidates.sort(
        (a, b) => b.plant.d - a.plant.d || b.count - a.count,
      )[0];
      if (!toRemove) break;
      state.beds.splice(toRemove.index, 1);
    } else {
      break;
    }
    guard++;
  }
}

// Espande le aiuole a fila fino alla lunghezza disponibile
function expandFilaBedsToLength(fillToLength = true, options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (preserveLockedCounts && bed.countLocked) return;
    if (bed.layout === "fila" && plant && canUseFilaLayout(plant)) {
      const capacity = countForFilaPlant(plant);
      bed.count = fillToLength ? capacity : Math.min(bed.count, capacity);
    }
  });
}

// Garantisce il conteggio minimo in ogni aiuola
function enforceMinimumBedCounts(options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant || bed.layout === "fila") return;
    if (preserveLockedCounts && bed.countLocked) return;
    const minCount = minimumCountForPlant(plant);
    if (bed.count >= minCount) return;
    const before = bed.count;
    bed.count = minCount;
    if (computeLayout().overflow) bed.count = before;
  });
}

// Azzera i conteggi delle colture per il ricalcolo
function resetSelectedCropCountsForOptimization() {
  let hasFila = false;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const useFila =
      canUseFilaLayout(plant) && !hasFila && bed.layout === "fila";
    if (useFila) hasFila = true;
    bed.layout = useFila ? "fila" : "blocco";
    bed.count = useFila
      ? countForFilaPlant(plant)
      : starterCountForAutoPlant(plant, false);
    bed.countLocked = false;
  });
}

// Normalizza i valori di input delle colture selezionate
function normalizeSelectedCropInputsForOptimization() {
  let hasFila = false;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const useFila =
      canUseFilaLayout(plant) && !hasFila && bed.layout === "fila";
    if (useFila) hasFila = true;
    bed.layout = useFila ? "fila" : "blocco";
    bed.count = Math.max(1, Math.round(parseInt(bed.count) || 1));
    bed.countLocked = Boolean(bed.countLocked);
  });
}

// Ripristina i conteggi manuali se non causano overflow
function restoreManualCountsWhenPossible(manualCounts) {
  state.beds.forEach((bed) => {
    const desired = manualCounts.get(bed.plantId);
    if (!desired || bed.count >= desired) return;
    const before = bed.count;
    bed.count = desired;
    if (computeLayout().overflow) bed.count = before;
  });
}

// Ribilancia il layout manuale senza modificare i conteggi
function rebalanceManualLayoutOnly() {
  const selectedPlant = rememberSelection();
  expandFilaBedsToLength(false, { preserveLockedCounts: true });
  sortBedsForLayout();
  restoreSelection(selectedPlant);
}

// Bilancia automaticamente le aiuole per rispettare blocchi e spazio disponibile.
function flexibleCropReductionCandidates(layout, lockedPlantId) {
  return state.beds
    .map((bed, index) => {
      const plant = BYID[bed.plantId];
      const layoutBed = layout.beds.find((item) => item.idx === index);
      if (
        !plant ||
        bed.plantId === lockedPlantId ||
        bed.countLocked ||
        bed.layout === "fila" ||
        !layoutBed
      ) {
        return null;
      }
      const minCount = Math.max(1, minimumCountForPlant(plant));
      const surplus = bed.count - minCount;
      if (surplus <= 0) return null;
      return { bed, index, plant, layoutBed, floorCount: minCount, surplus };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(b.bed.count > b.floorCount) -
          Number(a.bed.count > a.floorCount) ||
        b.surplus - a.surplus ||
        b.bed.count - a.bed.count ||
        b.layoutBed.h - a.layoutBed.h ||
        b.plant.d - a.plant.d,
    );
}

// Riduce le colture flessibili per ospitare la pianta bloccata
function reduceFlexibleCropsForLockedChange(lockedPlantId) {
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const layout = computeLayout();
    const candidates = flexibleCropReductionCandidates(layout, lockedPlantId);
    if (!candidates.length) break;
    const item = candidates[0];
    const step = Math.max(1, rowSizeForPlant(item.plant));
    const before = item.bed.count;
    item.bed.count = Math.max(
      item.floorCount,
      item.bed.count - Math.min(step, item.surplus),
    );
    if (item.bed.count === before) break;

    rebalanceManualLayoutOnly();
    guard++;
  }
}

// Applica la modifica bloccata e tenta l'adattamento

// -----------------------------------------------------------------------------
// Regole e calcoli del configuratore — sezione 2 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function fitLockedCountChange(lockedPlantId, beforeSnapshot) {
  const hasFlexibleAdjustments = () => {
    const beforeById = new Map(beforeSnapshot.map((bed) => [bed.plantId, bed]));
    return (
      state.beds.some((bed) => {
        if (bed.plantId === lockedPlantId) return false;
        const before = beforeById.get(bed.plantId);
        return (
          !before || before.count !== bed.count || before.layout !== bed.layout
        );
      }) ||
      beforeSnapshot.some(
        (bed) =>
          bed.plantId !== lockedPlantId &&
          !state.beds.some((current) => current.plantId === bed.plantId),
      )
    );
  };
  rebalanceManualLayoutOnly();
  if (computeLayout().overflow) {
    reduceFlexibleCropsForLockedChange(lockedPlantId);
  }
  if (computeLayout().overflow) {
    shrinkOverflowToFit({ preserveLockedCounts: true, allowRemove: false });
    rebalanceManualLayoutOnly();
  }
  if (computeLayout().overflow) {
    restoreBedsSnapshot(beforeSnapshot);
    return "rejected";
  }
  if (!hasFlexibleAdjustments()) return "accepted";
  return "adjusted";
}

// Esegue il ciclo completo di bilanciamento automatico
function autoBalanceLayout(
  keepSelection = true,
  expandToSpace = true,
  options = {},
) {
  const selectedPlant = keepSelection ? rememberSelection() : null;
  const respectDiversityLimit =
    options.respectDiversityLimit === true ||
    (options.respectDiversityLimit !== false &&
      state.autoPlan &&
      state.livello !== "esperto");

  expandFilaBedsToLength(options.fillFilaToLength !== false, {
    preserveLockedCounts: options.preserveLockedCounts === true,
  });
  if (expandToSpace)
    enforceMinimumBedCounts({
      preserveLockedCounts: options.preserveLockedCounts === true,
    });
  sortBedsForLayout();
  rebalanceColumnsFresh();
  shrinkOverflowToFit({
    preserveLockedCounts: options.preserveLockedCounts === true,
    allowRemove: options.allowRemove !== false,
  });
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit,
    });

  sortBedsForLayout();
  rebalanceColumnsFresh();
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit,
    });
  shrinkOverflowToFit({
    preserveLockedCounts: options.preserveLockedCounts === true,
    allowRemove: options.allowRemove !== false,
  });
  restoreSelection(selectedPlant);
}

// Applica modifiche manuali alle colture preservando le scelte bloccate dall'utente.
function addPlant(id) {
  if (state.beds.some((b) => b.plantId === id)) return;
  const p = BYID[id];
  if (!p) return;
  const historyBefore = captureHistorySnapshot();

  const before = {
    beds: cloneBedsSnapshot(),
    autoPlan: state.autoPlan,
  };

  state.beds.push({
    plantId: id,
    count: Math.max(
      1,
      Math.min(defaultCount(p), starterCountForAutoPlant(p, false)),
    ),
    layout: "blocco",
    countLocked: false,
  });
  state.autoPlan = false;
  state.manualPlanNotice = "";
  state.selected = state.beds.findIndex((b) => b.plantId === id);

  // Bilancia l'espansione automatica tra le colture.
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false,
    respectDiversityLimit: true,
  });

  const noSpace =
    !state.beds.some((b) => b.plantId === id) || computeLayout().overflow;
  if (noSpace) {
    restoreBedsSnapshot(before.beds);
    state.autoPlan = before.autoPlan;
    state.manualPlanNotice = "addNoSpace";
    state.selected = -1;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  commitColumnAssignment();
  saveConfig(true);
  render();
  if (noSpace) alert(tx("addNoSpace"));
}

// Verifica se lo spazio liberato va riempito automaticamente
function shouldAutoRefillFreedSpace() {
  return state.livello !== "esperto";
}

// Riempie lo spazio liberato preservando i blocchi
function fillFreedSpacePreservingLocks() {
  clearColumnAssignment();
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false,
  });

  fillColumnTailsWithFiller();
  commitColumnAssignment();
}

// Elimina la pianta dal piano per ID
function removePlantById(id) {
  const index = state.beds.findIndex((b) => b.plantId === id);
  if (index < 0) return;
  recordHistory();
  state.beds.splice(index, 1);
  state.autoPlan = false;
  state.manualPlanNotice = "";
  if (state.selected === index) state.selected = -1;
  else if (state.selected > index) state.selected -= 1;

  const refill = shouldAutoRefillFreedSpace();
  autoBalanceLayout(true, refill, {
    preserveLockedCounts: true,
    expandLockedCounts: false,
  });

  if (refill) fillColumnTailsWithFiller(new Set([id]));
  commitColumnAssignment();
  saveConfig(true);
  render();
}

// Ricalcola il piano dopo un cambio di mese o zona
function refreshForSeasonChange() {
  resetHistory();

  if (
    state.autoPlan ||
    state.livello === "novizio" ||
    state.beds.length === 0
  ) {
    autoFill({ compactPaths: false });
  } else {
    clearColumnAssignment();
    autoBalanceLayout(true, false);
    commitColumnAssignment();
    render();
  }
}

// Dispone le piante selezionate senza modificare i conteggi
function arrangeSelectedPlantsExact() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  const historyBefore = captureHistorySnapshot();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  normalizeSelectedCropInputsForOptimization();
  rebalanceManualLayoutOnly();
  commitColumnAssignment();
  if (bedsSnapshotsMatch(historyBefore.beds, cloneBedsSnapshot())) {
    state.autoPlan = historyBefore.autoPlan;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  saveConfig(true);
  render();
}

// Massimizza le piante selezionate riempiendo la serra
function fillSelectedPlants() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  const historyBefore = captureHistorySnapshot();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  // Preserva le quantità bloccate durante il riempimento.
  const lockedCounts = new Map(
    state.beds
      .filter((bed) => bed.countLocked)
      .map((bed) => [bed.plantId, bed.count]),
  );
  normalizeSelectedCropInputsForOptimization();
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (plant && bed.layout === "fila" && !bed.countLocked) {
      bed.count = countForFilaPlant(plant);
    }
  });
  autoBalanceLayout(true, true, {
    fillFilaToLength: false,
    expandLockedCounts: false,
    preserveLockedCounts: true,
  });
  restoreManualCountsWhenPossible(lockedCounts);
  commitColumnAssignment();
  if (bedsSnapshotsMatch(historyBefore.beds, cloneBedsSnapshot())) {
    state.autoPlan = historyBefore.autoPlan;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  saveConfig(true);
  render();
}

// Conclude la modifica manuale e aggiorna il piano
function finalizeManualCountChange(fitResult, selectedPlant) {
  if (fitResult !== "rejected" && shouldAutoRefillFreedSpace()) {
    fillFreedSpacePreservingLocks();
  }
  state.manualPlanNotice =
    fitResult === "rejected"
      ? "manualCountRejected"
      : fitResult === "adjusted"
        ? "manualCountAdjusted"
        : "";
  restoreSelection(selectedPlant);
  commitColumnAssignment();
  saveConfig(true);
  render();
}

// Modifica il conteggio di una pianta di un delta
function changePlantCount(id, delta) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  const historyBefore = captureHistorySnapshot();
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = Math.max(1, Math.round((parseInt(bed.count) || 1) + delta));
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  if (fitResult === "rejected") state.autoPlan = historyBefore.autoPlan;
  else recordHistorySnapshot(historyBefore);
  finalizeManualCountChange(fitResult, selectedPlant);
}

// Imposta il conteggio esatto di una pianta
function setPlantCount(id, value) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  const historyBefore = captureHistorySnapshot();
  const nextCount = Math.max(1, Math.round(parseInt(value) || 1));
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = nextCount;
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  if (fitResult === "rejected") state.autoPlan = historyBefore.autoPlan;
  else recordHistorySnapshot(historyBefore);
  finalizeManualCountChange(fitResult, selectedPlant);
}

// Calcola larghezza e posizione del camminamento per il piano generato automaticamente.
function compactPathForAutoFill() {
  if (state.larghezza >= 6 && state.lunghezza >= 7)
    return Math.min(state.path, 45);
  if (state.larghezza >= 4.2 && state.lunghezza >= 6)
    return Math.min(state.path, 50);
  return state.path;
}

// Conserva l'ultima geometria manuale valida per poter rifiutare un
// ridimensionamento che non può contenere le quantità bloccate dall'utente.
let lastAcceptedGeometry = {
  larghezza: state.larghezza,
  lunghezza: state.lunghezza,
  path: state.path,
};

function rememberAcceptedGeometry() {
  lastAcceptedGeometry = {
    larghezza: state.larghezza,
    lunghezza: state.lunghezza,
    path: state.path,
  };
}

function restoreAcceptedGeometry() {
  state.larghezza = lastAcceptedGeometry.larghezza;
  state.lunghezza = lastAcceptedGeometry.lunghezza;
  state.path = lastAcceptedGeometry.path;
  syncSizeControls();
}

// Rigenera il piano automatico dopo un cambio di dimensioni
function refreshAutoPlanForGeometry(compactPaths = true) {
  resetHistory();

  if (state.autoPlan || state.livello === "novizio") {
    autoFill({ compactPaths });
    rememberAcceptedGeometry();
    return;
  }

  const bedsBeforeResize = cloneBedsSnapshot();
  clearColumnAssignment();
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false,
  });
  if (computeLayout().overflow) {
    restoreBedsSnapshot(bedsBeforeResize);
    restoreAcceptedGeometry();
    state.manualPlanNotice = "lockedGeometryRejected";
    commitColumnAssignment();
    saveConfig(true);
    render();
    return;
  }
  state.manualPlanNotice = "";
  commitColumnAssignment();
  rememberAcceptedGeometry();
  saveConfig(true);
  render();
}

// Calcola lo spazio sprecato nel layout corrente
function layoutWasteScore(layout = computeLayout()) {
  const target = layout.Li - MARGIN;
  const gaps = layout.columnHeights.map((h) => Math.max(0, target - h));
  const squaredGaps = gaps.reduce((sum, gap) => sum + gap * gap, 0);
  return squaredGaps + Math.max(...gaps, 0) * 25;
}

// Limite massimo di espansione automatica per una pianta
function autoExpansionLimitForPlant(p) {
  const row = Math.max(1, rowSizeForPlant(p));
  const min = minimumCountForPlant(p);
  const baseline = Math.max(starterCountForAutoPlant(p, false), min);

  const area = state.larghezza * state.lunghezza;
  const rowsBase = state.livello === "novizio" ? 6 : 8;
  const rows = rowsBase + Math.floor(area / 10);
  return Math.max(baseline, min * 3, row * rows);
}

// Clona lo stato delle aiuole per undo/confronto
function cloneBedsSnapshot() {
  return state.beds.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col,
  }));
}

// Confronta due snapshot senza dipendere da riferimenti mutabili dello stato.
function bedsSnapshotsMatch(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

// Ripristina lo stato delle aiuole da uno snapshot
function restoreBedsSnapshot(snapshot) {
  state.beds = snapshot.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col,
  }));
}

// Gestisce snapshot e pile annulla-ripristina delle modifiche al progetto.
const HISTORY_LIMIT = 60;
let undoStack = [];
let redoStack = [];

// Cattura lo snapshot completo per lo storico

// -----------------------------------------------------------------------------
// Regole e calcoli del configuratore — sezione 3 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function captureHistorySnapshot() {
  return {
    beds: cloneBedsSnapshot(),
    autoPlan: state.autoPlan,
    activePreset: state.activePreset,
    selected: state.selected,
  };
}

// Applica uno snapshot allo stato corrente
function applyHistorySnapshot(snap) {
  restoreBedsSnapshot(snap.beds);
  state.autoPlan = snap.autoPlan;
  state.activePreset = snap.activePreset;
  state.selected = snap.selected;
}

// Registra uno snapshot valido nello storico.
function recordHistorySnapshot(snapshot) {
  undoStack.push(snapshot);
  if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Aggiunge lo stato attuale allo stack undo
function recordHistory() {
  recordHistorySnapshot(captureHistorySnapshot());
}

// Azzera gli stack undo e redo
function resetHistory() {
  undoStack = [];
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Verifica se esiste un'azione da annullare
function canUndo() {
  return undoStack.length > 0;
}

// Verifica se esiste un'azione da ripristinare
function canRedo() {
  return redoStack.length > 0;
}

// Annulla l'ultima modifica e ridisegna
function undoLastChange() {
  if (!undoStack.length) return;
  redoStack.push(captureHistorySnapshot());
  applyHistorySnapshot(undoStack.pop());
  commitColumnAssignment();
  state.manualPlanNotice = "";
  saveConfig(true);
  render();
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Ripristina l'ultima modifica annullata
function redoLastChange() {
  if (!redoStack.length) return;
  undoStack.push(captureHistorySnapshot());
  applyHistorySnapshot(redoStack.pop());
  commitColumnAssignment();
  state.manualPlanNotice = "";
  saveConfig(true);
  render();
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Genera un piano stagionale privilegiando colture compatibili con i parametri scelti.
function finalizeAutoFillWithOptimizeBaseline() {
  const original = cloneBedsSnapshot();
  const beforeLayout = computeLayout();
  const beforeScore = beforeLayout.overflow
    ? Infinity
    : layoutWasteScore(beforeLayout);

  resetSelectedCropCountsForOptimization();
  autoBalanceLayout(false, true);

  const afterLayout = computeLayout();
  const afterScore = afterLayout.overflow
    ? Infinity
    : layoutWasteScore(afterLayout);
  if (afterScore < beforeScore - 0.1) return;
  restoreBedsSnapshot(original);
}

// Espande le aiuole idonee per utilizzare lo spazio residuo della serra.
function expandAutoFillToSpace(options = {}) {
  const skipLockedCounts = options.skipLockedCounts === true;
  const respectDiversityLimit = options.respectDiversityLimit === true;
  const fillScore = layoutWasteScore;

  let guard = 0;
  while (guard < 900) {
    const currentLayout = computeLayout();
    const currentScore = fillScore(currentLayout);
    let best = null;

    const candidates = state.beds
      .map((bed, index) => {
        const layoutBed = currentLayout.beds.find((item) => item.idx === index);
        const plant = BYID[bed.plantId];
        return { index, bed, plant, layoutBed };
      })
      .filter(
        (item) =>
          item.plant &&
          item.bed.layout !== "fila" &&
          item.layoutBed &&
          (!respectDiversityLimit ||
            item.bed.count < autoExpansionLimitForPlant(item.plant)) &&
          (!skipLockedCounts || !item.bed.countLocked),
      )
      .sort((a, b) => {
        const ah = currentLayout.columnHeights[a.layoutBed.columnIndex] || 0;
        const bh = currentLayout.columnHeights[b.layoutBed.columnIndex] || 0;
        return ah - bh || a.plant.d - b.plant.d || a.index - b.index;
      });

    for (const item of candidates) {
      const before = state.beds[item.index].count;
      const limit = respectDiversityLimit
        ? autoExpansionLimitForPlant(item.plant)
        : Infinity;
      state.beds[item.index].count = Math.min(
        limit,
        state.beds[item.index].count + rowSizeForPlant(item.plant),
      );
      if (state.beds[item.index].count === before) continue;
      const nextLayout = computeLayout();
      if (!nextLayout.overflow) {
        const nextScore = fillScore(nextLayout);
        if (!best || nextScore < best.score) {
          best = {
            index: item.index,
            count: state.beds[item.index].count,
            score: nextScore,
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    guard++;
  }

  let fineGuard = 0;
  while (fineGuard < 300) {
    const currentLayout = computeLayout();
    const currentScore = fillScore(currentLayout);
    let best = null;

    const candidates = state.beds
      .map((bed, index) => {
        const layoutBed = currentLayout.beds.find((item) => item.idx === index);
        const plant = BYID[bed.plantId];
        return { index, bed, plant, layoutBed };
      })
      .filter(
        (item) =>
          item.plant &&
          item.bed.layout !== "fila" &&
          item.layoutBed &&
          (!respectDiversityLimit ||
            item.bed.count < autoExpansionLimitForPlant(item.plant)) &&
          (!skipLockedCounts || !item.bed.countLocked),
      )
      .sort((a, b) => {
        const ah = currentLayout.columnHeights[a.layoutBed.columnIndex] || 0;
        const bh = currentLayout.columnHeights[b.layoutBed.columnIndex] || 0;
        return ah - bh || a.plant.d - b.plant.d || a.index - b.index;
      });

    for (const item of candidates) {
      const before = state.beds[item.index].count;
      state.beds[item.index].count += 1;
      const nextLayout = computeLayout();
      if (!nextLayout.overflow) {
        const nextScore = fillScore(nextLayout);
        if (!best || nextScore < best.score) {
          best = {
            index: item.index,
            count: state.beds[item.index].count,
            score: nextScore,
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    fineGuard++;
  }

  fillVisualPaddingRows({ skipLockedCounts, respectDiversityLimit });
}

// Aggiunge file di padding per riempire visivamente le aiuole
function fillVisualPaddingRows(options = {}) {
  const skipLockedCounts = options.skipLockedCounts === true;
  const respectDiversityLimit = options.respectDiversityLimit === true;
  state.beds.forEach((bed, index) => {
    if (bed.layout === "fila") return;
    if (skipLockedCounts && bed.countLocked) return;
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const step = Math.max(1, rowSizeForPlant(plant));
    let guard = 0;
    while (guard++ < 100) {
      if (
        respectDiversityLimit &&
        bed.count + step > autoExpansionLimitForPlant(plant)
      ) {
        break;
      }
      const before = computeLayout();
      const bedBefore = before.beds.find((b) => b.idx === index);
      if (!bedBefore || before.overflow) break;
      const prevCount = bed.count;
      bed.count += step;
      const after = computeLayout();
      const bedAfter = after.beds.find((b) => b.idx === index);

      if (!after.overflow && bedAfter && bedAfter.h <= bedBefore.h + 0.5) {
        continue;
      }
      bed.count = prevCount;
      break;
    }
  });
}

// Seleziona colture compatte per riempire gli spazi residui tra le aiuole.
const FILLER_CROPS = [
  "ravanello",
  "valerianella",
  "rucola",
  "cipollotto",
  "spinaci",
  "lattuga",
  "carota",
  "rapa",
  "cicoria",
];

const FILLER_MIN_GAP = 60;

// Sceglie la coltura tappabuchi più adatta al gap disponibile
function pickFillerCrop(gap, excludeIds = null) {
  const present = new Set(state.beds.map((b) => b.plantId));
  if (excludeIds) excludeIds.forEach((id) => present.add(id));
  const allPlants = state.beds.map((b) => BYID[b.plantId]).filter(Boolean);
  const seasonalIds = new Set(seminabili().map((p) => p.id));
  const fits = (p) =>
    Math.max(46, visualPlantRadius(p) * 3 + 18) + BED_GAP <= gap + 1;

  const compatible = (p) => !allPlants.some((cp) => areIncompatible(p, cp));

  for (const id of FILLER_CROPS) {
    const p = BYID[id];
    if (!p || present.has(id) || !seasonalIds.has(id)) continue;
    if (!compatible(p) || !fits(p)) continue;
    return p;
  }

  const fallback = seminabili()
    .filter(
      (p) =>
        !present.has(p.id) &&
        p.h !== "alta" &&
        compatible(p) &&
        fits(p) &&
        (state.livello !== "novizio" || !EXOTIC_PLANTS.has(p.id)),
    )
    .sort((a, b) => a.d - b.d);
  return fallback[0] || null;
}

// Riempie gli spazi residui delle colonne.
function fillColumnTailsWithFiller(excludeIds = null) {
  let guard = 0;
  while (guard++ < 40) {
    const L = computeLayout();
    if (L.overflow) break;
    const columnCount = L.columnCount;

    if (state.beds.length < columnCount) break;
    const target = L.Li - MARGIN;
    let shortCol = -1;
    let maxGap = 0;
    L.columnHeights.forEach((h, i) => {
      const gap = target - h;
      if (gap > maxGap) {
        maxGap = gap;
        shortCol = i;
      }
    });
    if (shortCol < 0 || maxGap < FILLER_MIN_GAP) break;
    const filler = pickFillerCrop(maxGap, excludeIds);
    if (!filler) break;
    state.beds.push({
      plantId: filler.id,
      count: 1,
      layout: "blocco",
      countLocked: false,
      col: shortCol,
    });
    if (computeLayout().overflow) {
      state.beds.pop();
      break;
    }
    const bed = state.beds[state.beds.length - 1];
    const step = Math.max(1, rowSizeForPlant(filler));

    let rowGuard = 0;
    while (rowGuard++ < 300) {
      const beforeCount = bed.count;
      bed.count += step;
      if (computeLayout().overflow) {
        bed.count = beforeCount;
        break;
      }
    }
    let fineGuard = 0;
    while (fineGuard++ < 200) {
      const beforeCount = bed.count;
      bed.count += 1;
      if (computeLayout().overflow) {
        bed.count = beforeCount;
        break;
      }
    }
  }
}

const AUTO_PREFERRED = [
  "pomodoro",
  "basilico",
  "lattuga",
  "rucola",
  "carota",
  "zucchina",
  "fagiolino",
  "cetriolo",
  "peperone",
  "prezzemolo",
  "spinaci",
  "ravanello",
  "cipolla",
  "fragola",
  "bietola",
  "timo",
  "origano",
];

// Restituisce il livello di difficoltà della pianta
function autoDifficulty(p) {
  return DIFFICULTY[p.id] || 3;
}

// Calcola il punteggio di priorità per la selezione automatica
function autoCropScore(p) {
  let s = autoDifficulty(p) * 60;

  const pref = AUTO_PREFERRED.indexOf(p.id);
  if (pref >= 0) s -= 130 - pref;

  s -= Math.min(p.resa || 0, 5) * 3;
  s += Math.min(p.gg || 120, 200) * 0.04;
  return s;
}

// Costruisce il pool di candidati per il piano stagionale
function autoCandidatePool() {
  const seasonal = seminabili();
  let pool;
  if (state.livello === "novizio") {
    pool = seasonal.filter((p) => autoDifficulty(p) <= 2);

    if (pool.length < 4) {
      pool = seasonal.filter(
        (p) => autoDifficulty(p) <= 3 && !EXOTIC_PLANTS.has(p.id),
      );
    }
  } else {
    pool = seasonal.slice();
  }
  return pool.sort(
    (a, b) =>
      autoCropScore(a) - autoCropScore(b) ||
      a.nome.localeCompare(b.nome, "it", { sensitivity: "base" }),
  );
}

// Garantisce almeno una pianta nel piano se possibile

// -----------------------------------------------------------------------------
// Regole e calcoli del configuratore — sezione 4 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function ensureMinimalFill(candidates) {
  for (const p of candidates) {
    let best = 0;
    for (let c = minimumCountForPlant(p); c >= 1; c--) {
      state.beds = [
        { plantId: p.id, count: c, layout: "blocco", countLocked: false },
      ];
      if (!computeLayout().overflow) {
        best = c;
        break;
      }
    }
    if (best > 0) {
      state.beds = [
        { plantId: p.id, count: best, layout: "blocco", countLocked: false },
      ];
      return true;
    }
  }
  state.beds = [];
  return false;
}

// Avvia il riempimento automatico
function autoFill(options = {}) {
  const { compactPaths = true } = options;
  state.autoPlan = true;
  state.activePreset = "";
  state.autoPlanNotice = "";
  state.manualPlanNotice = "";
  if (compactPaths) state.path = compactPathForAutoFill();
  syncSizeControls();
  const candidates = autoCandidatePool();
  state.beds = [];
  let filaSlots = Math.max(0, layoutColumns(state.larghezza * 100) - 1);
  const sortedCandidates = candidates.slice();
  const minVarieties = targetVarietyCount(sortedCandidates.length);
  const skippedConflicts = [];
  const addAutoCandidate = (p, allowFila = true) => {
    const useFila = allowFila && filaSlots > 0 && canUseFilaLayout(p);
    state.beds.push({
      plantId: p.id,
      count: 1,
      layout: useFila ? "fila" : "blocco",
      countLocked: false,
    });
    state.beds[state.beds.length - 1].count = useFila
      ? starterCountForAutoPlant(p, true)
      : starterCountForAutoPlant(p, false);
    if (computeLayout().overflow) {
      state.beds.pop();
      return false;
    }
    if (useFila) filaSlots--;
    return true;
  };
  for (const p of sortedCandidates) {
    const conflicts = state.beds.some((bed) =>
      areIncompatible(p, BYID[bed.plantId]),
    );

    if (conflicts) {
      skippedConflicts.push(p);
      continue;
    }
    addAutoCandidate(p);
  }

  const poolIds = new Set(sortedCandidates.map((cp) => cp.id));
  const companionCap = minVarieties + 2;
  for (const bed of state.beds.slice()) {
    if (state.beds.length >= companionCap) break;
    const base = BYID[bed.plantId];
    if (!base) continue;
    for (const fid of base.amiche || []) {
      if (state.beds.length >= companionCap) break;
      if (!poolIds.has(fid)) continue;
      if (state.beds.some((b) => b.plantId === fid)) continue;
      const fp = BYID[fid];
      if (!fp) continue;
      if (state.beds.some((b) => areIncompatible(fp, BYID[b.plantId])))
        continue;
      addAutoCandidate(fp);
    }
  }

  for (const p of skippedConflicts) {
    if (state.beds.length >= minVarieties) break;
    if (state.beds.some((bed) => bed.plantId === p.id)) continue;
    const newConflicts = state.beds.filter((bed) =>
      areIncompatible(p, BYID[bed.plantId]),
    ).length;
    if (newConflicts > 0) continue;
    addAutoCandidate(p);
  }

  if (state.beds.length < Math.ceil(minVarieties / 2)) {
    let acceptedCompromises = 0;
    for (const p of skippedConflicts) {
      if (state.beds.length >= Math.ceil(minVarieties / 2)) break;
      if (state.beds.some((bed) => bed.plantId === p.id)) continue;
      const newConflicts = state.beds.filter((bed) =>
        areIncompatible(p, BYID[bed.plantId]),
      ).length;
      if (newConflicts <= 1 && addAutoCandidate(p)) acceptedCompromises++;
    }
    if (acceptedCompromises > 0) state.autoPlanNotice = "autoPlanCompromise";
  }
  if (state.beds.length === 0 && candidates.length) {
    const p = candidates[0];
    state.beds.push({
      plantId: p.id,
      count: minimumCountForPlant(p),
      layout: "blocco",
      countLocked: false,
    });
    if (computeLayout().overflow) {
      state.beds.pop();
    } else {
      state.beds[0].count = Math.max(
        minimumCountForPlant(p),
        countForPlant(p, 1),
      );
      if (computeLayout().overflow)
        state.beds[0].count = minimumCountForPlant(p);
    }
  }

  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    bed.count =
      bed.layout === "fila"
        ? countForFilaPlant(plant)
        : starterCountForAutoPlant(plant, false);
    bed.countLocked = false;
  });

  autoBalanceLayout(false, true);

  finalizeAutoFillWithOptimizeBaseline();

  if (state.beds.length === 0 && candidates.length)
    ensureMinimalFill(candidates);

  expandAutoFillToSpace({ respectDiversityLimit: false });

  fillColumnTailsWithFiller();
  if (state.beds.length === 0) state.autoPlanNotice = "autoPlanEmptySeason";

  commitColumnAssignment();
  state.selected = -1;
  saveConfig(true);
  render();
}

// Riduce un preset fino a una pianta per varietà, senza cancellare colture.
function shrinkPresetPreservingCrops() {
  let guard = 0;
  while (computeLayout().overflow && guard++ < 1200) {
    const candidates = state.beds
      .map((bed, index) => ({ bed, index, plant: BYID[bed.plantId] }))
      .filter((item) => item.plant && item.bed.count > 1)
      .sort(
        (a, b) =>
          b.bed.count - a.bed.count ||
          b.plant.d - a.plant.d ||
          a.index - b.index,
      );
    if (!candidates.length) break;
    candidates[0].bed.count -= 1;
    sortBedsForLayout();
    rebalanceColumnsFresh();
  }
  return !computeLayout().overflow;
}

// Importa un preset senza eliminare silenziosamente le varietà previste.
function loadPreset(key) {
  if (!PRESETS[key]) return;
  const historyBefore = captureHistorySnapshot();
  const requestedCounts = new Map(PRESETS[key]);
  state.beds = PRESETS[key].map(([id, cnt]) => ({
    plantId: id,
    count: cnt,
    layout: "blocco",
    countLocked: false,
  }));
  state.autoPlan = false;
  state.activePreset = key;
  state.selected = -1;
  state.autoPlanNotice = "";
  state.manualPlanNotice = "";
  autoBalanceLayout(false, false, { allowRemove: false });

  if (!shrinkPresetPreservingCrops()) {
    applyHistorySnapshot(historyBefore);
    state.manualPlanNotice = "presetDoesNotFit";
    commitColumnAssignment();
    saveConfig(true);
    render();
    return false;
  }

  expandAutoFillToSpace({ respectDiversityLimit: false });
  commitColumnAssignment();
  const adapted = state.beds.some(
    (bed) => bed.count !== requestedCounts.get(bed.plantId),
  );
  state.manualPlanNotice = adapted ? "presetAdapted" : "";
  recordHistorySnapshot(historyBefore);
  saveConfig(true);
  render();
  return true;
}

// Esporta il piano corrente nel carrello semi
function exportConfToCart() {
  if (!state.beds.length) return;
  const seen = new Set();
  const items = state.beds
    .filter((b) => {
      if (seen.has(b.plantId)) return false;
      seen.add(b.plantId);
      return true;
    })
    .map((b) => ({
      id: b.plantId,
      bustine: Math.max(
        1,
        Math.ceil(b.count / (PACK_DATA[b.plantId]?.seeds ?? 100)),
      ),
    }));
  /* Il carrello è unico e può già contenere altro: bustine aggiunte dal
     catalogo e piantine prese nel vivaio. Prima qui si faceva un setItem
     secco, che cancellava tutto il resto. Ora le righe del piano si
     sovrappongono a quelle dei semi già presenti (il piano è autorevole sulle
     quantità) e lasciano intatto tutto il resto. */
  try {
    const carrello = window.SerraCart ? window.SerraCart.leggi() : [];
    const altre = carrello.filter(
      (riga) =>
        (window.SerraCart && window.SerraCart.isPiantina(riga)) ||
        !items.some((nuova) => nuova.id === riga.id),
    );
    const unito = [...altre, ...items];
    if (window.SerraCart) window.SerraCart.scrivi(unito);
    else localStorage.setItem("ois.cart", JSON.stringify(unito));
  } catch (_) {
    localStorage.setItem("ois.cart", JSON.stringify(items));
  }
  loadConfCart();
  showConfCartNudge(items.length);
  setTimeout(openConfCart, 500);
}

// Importa le piante del carrello nel piano
function importCartToPlan(options = {}) {
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
  } catch (_) {
    raw = [];
  }
  const ids = raw.map((i) => (typeof i === "string" ? i : i.id));
  const uniqueIds = ids.filter(
    (id, index) => BYID[id] && ids.indexOf(id) === index,
  );
  if (!uniqueIds.length) return false;
  const historyBefore = options.recordHistory ? captureHistorySnapshot() : null;
  state.beds = uniqueIds.map((id) => {
    const plant = BYID[id];
    return {
      plantId: id,
      count: Math.max(
        1,
        Math.min(defaultCount(plant), starterCountForAutoPlant(plant, false)),
      ),
      layout: "blocco",
      countLocked: false,
    };
  });
  state.autoPlan = false;
  state.selected = state.beds.length ? 0 : -1;
  vegFilter = "in";
  // Un carrello già composto corrisponde al percorso Intermedio: il piano è
  // pronto, ma l'utente può personalizzare disposizione e quantità.
  setLivello("intermedio", { mapMode: false });
  autoBalanceLayout(true, true);
  if (historyBefore) recordHistorySnapshot(historyBefore);
  saveConfig(true);
  render();
  setMode("expert", false);
  focusManualPlanningPath();
  return true;
}

// Apre e mette a fuoco il pannello pianificazione manuale
function focusManualPlanningPath() {
  window.setTimeout(() => openCustomizePanelAndFocus(), 120);
}

// Gestisce l'intent di avvio (preset, carrello, progetto)

// -----------------------------------------------------------------------------
// Regole e calcoli del configuratore — sezione 5 di 5
// Assemblato da npm run build:js; il frammento non viene caricato autonomamente.
// -----------------------------------------------------------------------------

function applyBootIntent() {
  if (isFreeProjectBoot()) {
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    vegFilter = "all";
    autoBalanceLayout(true, false);
    saveConfig(true);
    render();
    setMode("expert", false);
    if (!LIVELLI.has(BOOT_PARAMS.get("livello"))) focusManualPlanningPath();
    clearBootParams();
    return true;
  }
  if (shouldImportCart() && importCartToPlan()) {
    clearBootParams();
    return true;
  }
  const preset = requestedBootPreset();
  if (!preset) return false;

  if (isGuidedBoot()) {
    state.larghezza = 3;
    state.lunghezza = 5;
    syncSizeControls();
  }
  loadPreset(preset);
  if (isGuidedBoot()) {
    state.autoPlan = true;
    saveConfig(true);
    render();
  }
  clearBootParams();
  return true;
}

// Popola i selettori dei mesi con etichette localizzate e valore corrente.
function bindConfigStaticActions() {
  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-conf-action]");
    if (!control) return;

    switch (control.dataset.confAction) {
      case "set-language":
        // Il menu nativo dell'header deve cambiare solo a selezione conclusa:
        // un render al primo tap chiuderebbe la tendina su Safari iOS.
        if (control.tagName !== "SELECT") confSetLang(control.dataset.lang);
        break;
      case "open-cart":
        openConfCart();
        break;
      case "open-projects":
        openProjectsModal();
        break;
      case "scroll-greenhouse":
        scrollGreenhouseImageIntoView("smooth");
        break;
      case "close-projects":
        closeProjectsModal();
        break;
      case "create-project":
        createProject();
        break;
      case "close-cart":
        closeConfCart();
        break;
      case "clear-cart":
        clearConfCart();
        break;
      case "import-cart":
        importCartAndClose();
        break;
      case "checkout":
        alertConfCheckout();
        break;
      case "remove-from-cart":
        removeFromConfCart(control.dataset.plantId, control.dataset.variante);
        break;
      case "cart-qty-more":
        changeConfCartQty(control.dataset.plantId, control.dataset.variante, 1);
        break;
      case "cart-qty-less":
        changeConfCartQty(
          control.dataset.plantId,
          control.dataset.variante,
          -1,
        );
        break;
      case "unselect-material":
        unselectMaterial(control.dataset.materialId);
        break;
      case "switch-project":
        switchToProject(control.dataset.projectId);
        break;
      case "rename-project":
        renameProject(control.dataset.projectId);
        break;
      case "duplicate-project":
        duplicateProject(control.dataset.projectId);
        break;
      case "delete-project":
        deleteProject(control.dataset.projectId);
        break;
      case "set-detail-tab":
        setConfigDetailTab(control.dataset.detailTab);
        break;
    }
  });
  document.addEventListener("change", (event) => {
    const control = event.target.closest("[data-conf-action]");
    if (!control) return;
    if (control.dataset.confAction === "set-language")
      confSetLang(control.value);
  });
  document.addEventListener("keydown", (event) => {
    const control = event.target.closest('[data-conf-action="set-detail-tab"]');
    if (control) handleConfigDetailTabKey(event, control);
  });
}

bindConfigStaticActions();

function fillMonths() {
  const months = MONTHS[state.lang] || MONTHS.it;
  const monthHtml = months
    .map((m, i) => `<option value="${i + 1}">${m}</option>`)
    .join("");
  const sel = document.getElementById("inMese");
  sel.innerHTML = monthHtml;
  sel.value = state.mese;
  const selStage = document.getElementById("inMeseStage");
  if (selStage) {
    selStage.innerHTML = monthHtml;
    selStage.value = state.mese;
  }
  const pillLabel = document.getElementById("stageMonthPillLabel");
  if (pillLabel) pillLabel.textContent = months[state.mese - 1] || "";
}

// Registra gli eventi statici dell'interfaccia del configuratore.
function initEvents() {
  const backToTopButton = document.getElementById("backToTop");
  backToTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener(
    "scroll",
    () => backToTopButton?.classList.toggle("visible", window.scrollY > 420),
    { passive: true },
  );

  syncPersonaPickerDisclosure();

  document.querySelectorAll(".mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode, false));
  });
  document.querySelectorAll(".persona-card").forEach((card) => {
    card.addEventListener("click", () => chooseLivello(card.dataset.livello));
  });
  document.getElementById("inLang").addEventListener("change", (e) => {
    state.lang = e.target.value;
    localStorage.setItem("ois.lang", e.target.value);
    applyLanguage();
    saveConfig(true);
    render();
  });
  document.getElementById("startLang")?.addEventListener("change", (e) => {
    state.lang = e.target.value;
    localStorage.setItem("ois.lang", e.target.value);
    applyLanguage();
    saveConfig(false);
    render();
  });
  document.getElementById("inW").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.larghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inL").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.lunghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inWSlider")?.addEventListener("input", (e) => {
    state.larghezza = parseFloat(e.target.value);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inLSlider")?.addEventListener("input", (e) => {
    state.lunghezza = parseFloat(e.target.value);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("startW")?.addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.larghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    saveConfig(false);
    autoBalanceLayout(true, true);
    render();
  });
  document.getElementById("startL")?.addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.lunghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    saveConfig(false);
    autoBalanceLayout(true, true);
    render();
  });
  document.getElementById("inMese").addEventListener("change", (e) => {
    state.mese = parseInt(e.target.value);
    const selStage = document.getElementById("inMeseStage");
    if (selStage) selStage.value = e.target.value;
    const pillLabel = document.getElementById("stageMonthPillLabel");
    if (pillLabel)
      pillLabel.textContent =
        (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inMeseStage")?.addEventListener("change", (e) => {
    state.mese = parseInt(e.target.value);
    document.getElementById("inMese").value = e.target.value;
    const pillLabel = document.getElementById("stageMonthPillLabel");
    if (pillLabel)
      pillLabel.textContent =
        (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inZona").addEventListener("change", (e) => {
    state.zona = e.target.value;
    syncClimateControls();
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inRisc").addEventListener("change", (e) => {
    state.riscaldata = e.target.value === "si";
    syncClimateControls();
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inSole")?.addEventListener("change", (e) => {
    state.sudInBasso = e.target.value === "basso";
    resetHistory();
    syncClimateControls();
    saveConfig(true);
    if (state.autoPlan || state.livello === "novizio") {
      autoFill({ compactPaths: false });
    } else {
      clearColumnAssignment();
      autoBalanceLayout(true, false);
      commitColumnAssignment();
      render();
    }
  });
  document.getElementById("inOverlay").addEventListener("change", (e) => {
    state.overlay = e.target.value;
    syncOverlaySelectLabel();
    render();
  });
  document.getElementById("inPreset").addEventListener("change", (e) => {
    if (e.target.value) {
      if (loadPreset(e.target.value)) setMode("fit", false);
      e.target.value = "";
    }
  });
  // Applica il percorso selezionato aggiornando profilo, pannelli e contenuto.
  function applyPath(val) {
    const v = Math.max(30, Math.min(120, Math.round(val / 5) * 5));
    state.path = v;
    syncSizeControls();
    refreshAutoPlanForGeometry(false);
  }
  document
    .getElementById("inPath")
    .addEventListener("input", (e) => applyPath(parseInt(e.target.value)));
  document
    .getElementById("inPathNum")
    .addEventListener("change", (e) =>
      applyPath(parseInt(e.target.value) || state.path),
    );
  document.getElementById("btnRipristina").addEventListener("click", () => {
    recordHistory();
    saveConfig(true);
    setMode("fit", false);
    autoFill({ compactPaths: false });
    collapseSettingsPanelAfterAutoPlan();
  });
  document
    .getElementById("btnPresetSeasonal")
    ?.addEventListener("click", () => {
      recordHistory();
      saveConfig(true);
      setMode("fit", false);
      autoFill({ compactPaths: false });
    });
  document
    .getElementById("btnArrangeSelected")
    .addEventListener("click", arrangeSelectedPlantsExact);
  document
    .getElementById("btnFillSelected")
    .addEventListener("click", fillSelectedPlants);
  document.getElementById("btnUndo")?.addEventListener("click", undoLastChange);
  document.getElementById("btnRedo")?.addEventListener("click", redoLastChange);

  document.getElementById("btnNoviceRestart")?.addEventListener("click", () => {
    recordHistory();
    autoFill({ compactPaths: false });
    scrollToScene();
  });

  document
    .getElementById("btnExpertSeasonal")
    ?.addEventListener("click", () => {
      recordHistory();
      autoFill({ compactPaths: false });
    });

  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const tag = (e.target?.tagName || "").toLowerCase();
    const isField = tag === "input" || tag === "textarea" || tag === "select";
    const key = e.key.toLowerCase();
    if (key === "z" && !e.shiftKey) {
      if (isField) return;
      e.preventDefault();
      undoLastChange();
    } else if ((key === "z" && e.shiftKey) || key === "y") {
      if (isField) return;
      e.preventDefault();
      redoLastChange();
    }
  });
  document.getElementById("btnClear").addEventListener("click", () => {
    if (state.livello === "novizio") return;
    const msg =
      state.lang === "ro"
        ? "Golești sera? Folosește «Regenerează planul de sezon» pentru a o reface."
        : "Svuoti la serra? Usa «Rigenera piano di stagione» per riportarla com'era.";
    if (!confirm(msg)) return;
    recordHistory();
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    saveConfig(true);
    render();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".step-btn");
    if (!btn) return;
    const targetId = btn.dataset.target;
    const step = parseFloat(btn.dataset.step);
    const input = document.getElementById(targetId);
    if (!input) return;
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const raw = (parseFloat(input.value) || 0) + step;
    const clamped = Math.max(
      isNaN(min) ? -Infinity : min,
      Math.min(isNaN(max) ? Infinity : max, raw),
    );
    input.value = Math.round(clamped * 100) / 100;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  const guidedNovCta = document.getElementById("guidedNovCta");
  if (guidedNovCta) {
    guidedNovCta.addEventListener("click", () => {
      openSettingsPanelAndFocusDimensions();
    });
  }

  document.querySelectorAll(".panel-toggle").forEach((btn) => {
    updatePanelToggle(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const panel = btn.closest(".panel");
      setPanelCollapsed(panel, !panel.classList.contains("is-collapsed"));
    });
  });

  document.querySelectorAll(".panel-title-row, .panel-head").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("button, select, input, label, .stepper")) return;
      const panel = row.closest(".panel");
      const btn = panel.querySelector(".panel-toggle");
      if (btn) btn.click();
    });
  });

  ["btnStampa", "btnStampaMobile"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", (event) => {
      event.stopPropagation();
      openProjectExportMenu(event.currentTarget);
    });
  });
  document
    .getElementById("projectExportMenu")
    ?.addEventListener("click", async (event) => {
      event.stopPropagation();
      const action = event.target.closest("[data-export-action]")?.dataset
        .exportAction;
      if (!action) return;
      closeProjectExportMenu();
      if (action === "pdf") {
        await exportProjectPdf();
      } else if (action === "print") {
        renderPrintSummary();
        window.print();
      } else if (action === "png") {
        await exportProjectPng();
      }
    });
  document.addEventListener("click", () => closeProjectExportMenu());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectExportMenu({ restoreFocus: true });
  });
  window.addEventListener("resize", () => closeProjectExportMenu());
  window.addEventListener("scroll", () => closeProjectExportMenu(), {
    passive: true,
  });
  document.getElementById("pdpBackBtn")?.addEventListener("click", () => {
    closePlantDetailPanel();
  });
  document.getElementById("btnOpenSetup")?.addEventListener("click", () => {
    syncLanguageControls();
    syncClimateControls();
    syncSizeControls();
    setStartModalVisible(true);
  });
  document
    .getElementById("btnEditCropsFromYield")
    ?.addEventListener("click", () => {
      setMode("expert", false);
      openCustomizePanelAndFocus();
    });

  document.getElementById("vegList").addEventListener("click", (e) => {
    const upgradeBtn = e.target.closest("[data-upgrade-level]");
    if (upgradeBtn) {
      chooseLivello(upgradeBtn.dataset.upgradeLevel);
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) addPlant(addBtn.dataset.add);
    const removeBtn = e.target.closest("[data-remove-plant]");
    if (removeBtn) removePlantById(removeBtn.dataset.removePlant);
    const stepBtn = e.target.closest("[data-veg-cnt]");
    if (stepBtn) {
      const id = stepBtn.dataset.vegPlant;
      const delta = parseInt(stepBtn.dataset.vegCnt);
      changePlantCount(id, delta);
    }
  });
  document.getElementById("vegList").addEventListener("change", (e) => {
    const input = e.target.closest("[data-veg-count-input]");
    if (!input || input.value === "") return;
    setPlantCount(input.dataset.vegCountInput, input.value);
  });
  document.getElementById("vegList").addEventListener("keydown", (e) => {
    const input = e.target.closest("[data-veg-count-input]");
    if (!input || e.key !== "Enter" || input.value === "") return;
    e.preventDefault();
    setPlantCount(input.dataset.vegCountInput, input.value);
  });

  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      vegFilter = tab.dataset.filter;
      renderVegList();
    });
  });

  document.getElementById("vegSearchInput")?.addEventListener("input", (e) => {
    vegSearchQuery = e.target.value || "";
    renderVegList();
  });
  document.getElementById("vegSearchClear")?.addEventListener("click", () => {
    vegSearchQuery = "";
    const input = document.getElementById("vegSearchInput");
    if (input) {
      input.value = "";
      input.focus({ preventScroll: true });
    }
    renderVegList();
  });
  document
    .getElementById("vegList")
    ?.addEventListener("scroll", updateVegListScrollAffordance, {
      passive: true,
    });
  // Gestisce debounce
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  window.addEventListener(
    "resize",
    debounce(updateVegListScrollAffordance, 150),
  );

  document.querySelectorAll("#zoneOpts .opt").forEach((o) =>
    o.addEventListener("click", () => {
      document
        .querySelectorAll("#zoneOpts .opt")
        .forEach((x) => x.classList.remove("on"));
      o.classList.add("on");
      state.zona = o.dataset.zone;
      syncClimateControls();
    }),
  );
  document.getElementById("startBtn")?.addEventListener("click", () => {
    state.zona =
      document.querySelector("#zoneOpts .opt.on")?.dataset.zone ?? state.zona;
    state.riscaldata =
      document.getElementById("heatedChk")?.checked ?? state.riscaldata;
    state.larghezza = Math.max(
      1,
      parseFloat(document.getElementById("startW")?.value) || state.larghezza,
    );
    state.lunghezza = Math.max(
      1,
      parseFloat(document.getElementById("startL")?.value) || state.lunghezza,
    );
    syncSizeControls();
    syncClimateControls();
    saveConfig(true);
    setStartModalVisible(false);
    if (!applyBootIntent()) autoFill();
  });
}

// Carica e normalizza lo stato salvato prima del primo rendering.
function applyConfigToState(saved) {
  if (!saved) return;
  if (saved.lang === "it" || saved.lang === "ro") state.lang = saved.lang;
  if (["freddo", "temperato", "caldo"].includes(saved.zona)) {
    state.zona = saved.zona;
  }
  state.riscaldata = Boolean(saved.riscaldata);
  state.sudInBasso = Boolean(saved.sudInBasso);
  const savedW = parseFloat(saved.larghezza);
  const savedL = parseFloat(saved.lunghezza);
  if (Number.isFinite(savedW) && savedW >= 1) state.larghezza = savedW;
  if (Number.isFinite(savedL) && savedL >= 1) state.lunghezza = savedL;
  const savedPath = parseFloat(saved.path);
  if (Number.isFinite(savedPath) && savedPath >= 30) state.path = savedPath;
  const savedMonth = parseInt(saved.mese);
  if (Number.isInteger(savedMonth) && savedMonth >= 1 && savedMonth <= 12) {
    state.mese = savedMonth;
  }
  state.autoPlan = saved.autoPlan !== false;
  state.activePreset = PRESETS[saved.activePreset] ? saved.activePreset : "";
  if (LIVELLI.has(saved.livello)) state.livello = saved.livello;
  state.beds = normalizeSavedBeds(saved.beds);

  // Riproduce esattamente il piano salvato, comprese le colonne assegnate ai
  // riempitori. Ribilancia soltanto salvataggi obsoleti o non più compatibili
  // con la geometria corrente.
  if (computeLayout().overflow) {
    clearColumnAssignment();
    autoBalanceLayout(true, false);
  } else {
    commitColumnAssignment();
  }

  if (typeof resetHistory === "function") resetHistory();
}

// Avvia catalogo, interfaccia e comportamenti necessari al configuratore.
function initConfig() {
  if (typeof ensureProjectsStore === "function") ensureProjectsStore();
  const saved = readSavedConfig();
  let sharedLang = null;
  try {
    sharedLang = localStorage.getItem("ois.lang");
  } catch {}
  const hasSharedLang = sharedLang === "it" || sharedLang === "ro";
  if (saved) applyConfigToState(saved);
  const hasBootPreconfig = applyBootPreconfigToState();
  if (typeof rememberAcceptedGeometry === "function") {
    rememberAcceptedGeometry();
  }
  if (hasSharedLang) state.lang = sharedLang;
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  if (saved && hasSharedLang && saved.lang !== state.lang)
    saveConfig(Boolean(saved.done));

  setStartModalVisible(
    !saved?.done &&
      !hasBootPreconfig &&
      !isGuidedBoot() &&
      !isFreeProjectBoot() &&
      !shouldImportCart(),
  );
}

// Gestisce i dati condivisi tra lista dei semi e carrello dell'ordine.
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

  fava: { seeds: 20, price: 3.0 },
  cece: { seeds: 30, price: 3.0 },
  lenticchia: { seeds: 50, price: 2.8 },
  soia_edamame: { seeds: 30, price: 3.2 },
  fagiolo_borlotto: { seeds: 25, price: 3.0 },

  patata: { seeds: 10, price: 4.5 },
  patata_dolce: { seeds: 5, price: 5.0 },
  pastinaca: { seeds: 200, price: 2.5 },
  radice_prezemolo: { seeds: 200, price: 2.5 },
  sedano_rapa: { seeds: 300, price: 2.6 },
  rafano: { seeds: 50, price: 2.8 },
  cipolla_rossa: { seeds: 200, price: 2.3 },
  cipollotto: { seeds: 200, price: 2.3 },
  daikon: { seeds: 100, price: 2.5 },
  scorzonera: { seeds: 100, price: 2.8 },
  topinambur: { seeds: 10, price: 4.0 },
  cavolo_navone: { seeds: 200, price: 2.5 },

  loboda: { seeds: 100, price: 2.5 },
  stevia_dolce: { seeds: 100, price: 3.2 },
  asparago: { seeds: 20, price: 3.5 },
  carciofo: { seeds: 10, price: 4.0 },
  cardo: { seeds: 20, price: 3.5 },
  crescione: { seeds: 500, price: 2.2 },
  mizuna: { seeds: 300, price: 2.4 },
  senape_foglia: { seeds: 300, price: 2.4 },
  tatsoi: { seeds: 300, price: 2.4 },
  cavolo_cinese: { seeds: 200, price: 2.6 },
  cavolo_rosso: { seeds: 100, price: 2.8 },
  broccolo_rapa: { seeds: 200, price: 2.5 },

  mais_dolce: { seeds: 30, price: 3.5 },
  tomatillo: { seeds: 20, price: 3.5 },
  physalis: { seeds: 20, price: 3.5 },
  cucamelon: { seeds: 15, price: 4.0 },

  erba_cipollina: { seeds: 200, price: 2.8 },
  leustean: { seeds: 100, price: 3.0 },
  dragoncello: { seeds: 100, price: 3.0 },
  menta: { seeds: 200, price: 2.8 },
  maggiorana: { seeds: 300, price: 2.6 },
  camomilla: { seeds: 300, price: 2.4 },
  shiso: { seeds: 100, price: 3.2 },
  broccolo_romanesco: { seeds: 100, price: 2.8 },
  friggitello: { seeds: 30, price: 3.0 },
  agretti: { seeds: 500, price: 3.2 },
  borragine: { seeds: 50, price: 2.6 },
  catalogna: { seeds: 200, price: 2.4 },
  acetosa: { seeds: 300, price: 2.5 },
  leurda: { seeds: 50, price: 3.5 },
  melissa: { seeds: 500, price: 2.8 },
  cerfoglio: { seeds: 500, price: 2.6 },
  cimbru: { seeds: 1000, price: 2.4 },
};
// Formatta un valore in valuta locale
function formatMoney(value) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

let confCart = [];

/* Il carrello è quello unico dell'app (`ois.cart`, gestito da serra-cart.js):
   il configuratore lo legge e lo scrive con le stesse funzioni di home e
   vivaio, così le piantine comprate in vivaio restano piantine anche qui.
   Prima questo file leggeva il grezzo e trattava ogni riga come una bustina:
   le piantine finivano a listino semi con il prezzo di ripiego. */
const confIsPiantina = (riga) =>
  window.SerraCart
    ? window.SerraCart.isPiantina(riga)
    : !!riga && riga.variante === "piantina";
const confQty = (riga) =>
  window.SerraCart
    ? window.SerraCart.quantita(riga)
    : Number(riga.bustine) || 0;
// Le piantine portano il prezzo nella riga; i semi restano a listino locale.
const confUnitPrice = (riga) =>
  confIsPiantina(riga) ? Number(riga.prezzo) || 0 : (PACK_DATA[riga.id]?.price ?? 2.5);

// Gestisce righe, quantità e apertura del carrello del configuratore.
function loadConfCart() {
  if (window.SerraCart) {
    confCart = window.SerraCart.leggi();
  } else {
    try {
      const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
      confCart = raw.map((i) =>
        typeof i === "string" ? { id: i, bustine: 1 } : i,
      );
    } catch (_) {
      confCart = [];
    }
  }
  updateConfCartUI();
}

// Persiste il carrello nel localStorage
function saveConfCart() {
  if (window.SerraCart) {
    window.SerraCart.scrivi(confCart);
    return;
  }
  try {
    localStorage.setItem("ois.cart", JSON.stringify(confCart));
  } catch (_) {}
}

// Aggiorna la visualizzazione del carrello
function updateConfCartUI() {
  // Materiali extra selezionati per l'ordine.
  const materials =
    typeof selectedMaterialItems === "function" ? selectedMaterialItems() : [];

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = confCart.length + materials.length;

  const speciesLine = document.getElementById("cartSpeciesLine");
  if (speciesLine) {
    if (confCart.length > 0) {
      speciesLine.textContent =
        confCart.length === 1
          ? tx("cart.species_one")
          : tx("cart.species_many", { count: confCart.length });
      speciesLine.hidden = false;
    } else {
      speciesLine.hidden = true;
    }
  }

  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");
  const foot = document.getElementById("cartFooter");
  const clearBtn = document.getElementById("cartClearBtn");
  if (!empty || !items || !foot) return;

  if (!confCart.length && !materials.length) {
    empty.hidden = false;
    items.hidden = true;
    foot.hidden = true;
    if (clearBtn) clearBtn.hidden = true;
    return;
  }
  empty.hidden = true;
  items.hidden = false;
  foot.hidden = false;
  if (clearBtn) clearBtn.hidden = false;

  const materialsTotal = materials.reduce(
    (s, m) => s + m.bustine * m.prezzo,
    0,
  );

  /* I materiali extra esistono solo qui: sono l'unica parte del cassetto che
     il modulo condiviso non conosce e che quindi gli si passa già disegnata. */
  const materialRows = materials.length
    ? `<div class="cart-group cart-group--materiali">
        <div class="cart-group-head">
          <span class="cart-group-name"><span aria-hidden="true">🧰</span>${tx("cart.materials_section")}</span>
        </div>
        ${materials
          .map((m) => {
            const qtyLabel = shoppingUnitLabel(m.unit, m.bustine);
            return `<div class="cart-item">
        <span class="cart-item-glyph" aria-hidden="true">${m.icon || "🧰"}</span>
        <span class="cart-item-copy">
          <span class="cart-item-name">${m.nome}</span>
          <span class="cart-item-pack">
            <span>${qtyLabel}</span>
            <b>${formatMoney(m.bustine * m.prezzo)}</b>
          </span>
        </span>
        <!-- Stessa rimozione delle righe di prodotto: parola invece di ✕ e
             stessa casella della griglia, così le due specie di riga del
             cassetto non si comportano in due modi diversi. -->
        <button class="cart-item-remove" data-conf-action="unselect-material" data-material-id="${m.id}" title="${tx("remove")}">${tx("remove")}</button>
      </div>`;
          })
          .join("")}
      </div>`
    : "";

  // Riepilogo, gruppi, note della merce viva e invito incrociato: stessa
  // struttura di home e vivaio, vedi assets/js/serra-cart-ui.js.
  items.innerHTML = window.SerraCartUI
    ? window.SerraCartUI.corpo({
        righe: confCart,
        lang: (document.documentElement.lang || "it").startsWith("ro")
          ? "ro"
          : "it",
        attr: "data-conf-action",
        nome: (id) => (BYID[id] ? plantText(BYID[id], "nome") : ""),
        foto: (id) => {
          const p = BYID[id];
          if (!p) return "";
          // Logica di risoluzione foto condivisa: vedi assets/js/shared/plant-photo.js
          window.preloadPlantPhoto?.(p, id);
          return window.resolvePlantPhoto(p, id) || "";
        },
        nota: (id) => (BYID[id] ? plantText(BYID[id], "nota") || "" : ""),
        prezzoBustina: (id) => PACK_DATA[id]?.price ?? 2.5,
        semiPerBustina: (id) => PACK_DATA[id]?.seeds ?? 100,
        soldi: formatMoney,
        hrefSemi: "index.html#stagione",
        hrefPiantine: "vivaio.html",
        extraHtml: materialRows,
        extraTotale: materialsTotal,
        extraLabel: tx("cart.materials_section"),
      })
    : "";
}

// Rimuove una voce dal carrello. La stessa pianta può esserci due volte, come
// bustina e come piantina: si toglie solo la variante indicata.
function removeFromConfCart(id, variante) {
  const piantina = variante === "piantina";
  // Fotografia di prima: è quello che l'annulla rimetterà a posto.
  const prima = confCart.slice();
  confCart = window.SerraCart
    ? window.SerraCart.rimuovi(confCart, id, piantina)
    : confCart.filter((i) => !(i.id === id && confIsPiantina(i) === piantina));
  saveConfCart();
  updateConfCartUI();
  offriAnnullaConfCart("undo.removed", { nome: plantNameById(id) || id }, prima);
}

/* Stesso annulla della home e del vivaio: il carrello è uno solo e togliere
   una pianta deve costare uguale — cioè niente — da qualunque pagina. */
function offriAnnullaConfCart(chiave, valori, prima) {
  const UI = window.SerraCartUI;
  if (!UI || !UI.annullabile) return;
  const lang = (document.documentElement.lang || "it").startsWith("ro")
    ? "ro"
    : "it";
  UI.annullabile({
    testo: UI.testo(lang, chiave, valori),
    etichetta: UI.testo(lang, "undo.action"),
    onAnnulla: () => {
      confCart = prima.slice();
      saveConfCart();
      updateConfCartUI();
    }
  });
}
/* Quantità dal cassetto: un passo è una bustina per i semi e un vassoio intero
   per le piantine. A zero la riga esce dal carrello. */
function changeConfCartQty(id, variante, direzione) {
  if (!window.SerraCart) return;
  const piantina = variante === "piantina";
  const riga = window.SerraCart.trova(confCart, id, piantina);
  if (!riga) return;
  confCart = window.SerraCart.varia(
    confCart,
    id,
    piantina,
    direzione * window.SerraCart.passo(riga),
  );
  saveConfCart();
  updateConfCartUI();
}
// Svuota l'intero carrello: semi e piantine insieme, come dalle altre sezioni.
function clearConfCart() {
  const prima = confCart.slice();
  confCart = window.SerraCart ? window.SerraCart.svuota() : [];
  if (!window.SerraCart) saveConfCart();
  updateConfCartUI();
  if (prima.length) offriAnnullaConfCart("undo.cleared", null, prima);
}

let confCartScrollLockCount = 0;
let confCartScrollY = 0;

// Blocca la pagina dietro il cassetto anche su Safari mobile, che ignora il
// solo overflow:hidden del body durante lo scorrimento tattile.
function lockConfCartPageScroll() {
  if (confCartScrollLockCount === 0) {
    confCartScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${confCartScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }
  confCartScrollLockCount++;
}

// Ripristina la posizione originale dopo la chiusura del cassetto.
function unlockConfCartPageScroll() {
  confCartScrollLockCount = Math.max(0, confCartScrollLockCount - 1);
  if (confCartScrollLockCount !== 0) return;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo({ top: confCartScrollY, behavior: "instant" });
}

// Apre il pannello carrello
function openConfCart() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay || overlay.classList.contains("open")) return;
  loadConfCart();
  document.getElementById("cartNudge")?.classList.remove("visible");
  lockConfCartPageScroll();
  document.body.classList.add("cart-open");
  overlay.classList.add("open");
}

// Chiude il pannello carrello
function closeConfCart() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay || !overlay.classList.contains("open")) return;
  overlay.classList.remove("open");
  document.body.classList.remove("cart-open");
  unlockConfCartPageScroll();
}

// Importa il carrello nel piano e chiude
function importCartAndClose() {
  closeConfCart();

  importCartToPlan({ recordHistory: true });
}

// Mostra il banner temporaneo del carrello
function showConfCartNudge(count) {
  const nudge = document.getElementById("cartNudge");
  const title = document.getElementById("cartNudgeTitle");
  const meta = document.getElementById("cartNudgeMeta");
  if (!nudge || !title || !meta) return;
  title.textContent = tx("cart.nudge_title");
  meta.textContent =
    count === 1
      ? tx("cart.nudge_meta_one")
      : tx("cart.nudge_meta_many", { count });
  nudge.classList.add("visible");
  clearTimeout(showConfCartNudge._t);
  showConfCartNudge._t = setTimeout(
    () => nudge.classList.remove("visible"),
    3800,
  );
}

// Mostra il riepilogo ordine all'utente
function alertConfCheckout() {
  const materials =
    typeof selectedMaterialItems === "function" ? selectedMaterialItems() : [];
  if (!confCart.length && !materials.length) return;

  // Controlla se l'utente è autenticato
  const user = window.SerraAPI && window.SerraAPI.getCurrentUser();
  if (!user) {
    alert(tx("cart.checkout_login_required"));
    window.location.href = "account.html";
    return;
  }

  /* Le righe entrano nell'ordine con i campi che l'Area Personale già legge
     (`bustine`, `prezzo`). Le piantine conservano `variante` e prezzo proprio:
     prima venivano fatturate al prezzo di una bustina di semi. */
  const seedItems = confCart.map((riga) => {
    const id = riga.id;
    const nome = BYID[id] ? plantText(BYID[id], "nome") : id;
    const qta = confQty(riga);
    const voce = {
      id,
      nome,
      bustine: qta,
      prezzo: confUnitPrice(riga),
    };
    if (confIsPiantina(riga)) {
      voce.variante = "piantina";
      voce.qta = qta;
      voce.unita = riga.unita || "vaso ø7";
      voce.lotto = Number(riga.lotto) || 6;
    }
    return voce;
  });
  // I materiali extra selezionati (facoltativi) entrano nello stesso ordine
  const orderItems = seedItems.concat(materials);
  const seedsTotal =
    Math.round(
      confCart.reduce(
        (s, riga) => s + confUnitPrice(riga) * confQty(riga),
        0,
      ) * 100,
    ) / 100;
  const materialsTotal = materials.reduce(
    (s, m) => s + m.bustine * m.prezzo,
    0,
  );
  const totalVal = seedsTotal + materialsTotal;

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
      // Svuota il carrello e la selezione materiali extra dopo l'acquisto
      confCart = [];
      saveConfCart();
      Object.keys(shoppingChecked).forEach((k) => {
        shoppingChecked[k] = false;
      });
      if (typeof saveMaterialsSelection === "function") {
        saveMaterialsSelection();
      }
      if (typeof renderMaterials === "function") {
        renderMaterials();
      }
      if (typeof updateConfCartUI === "function") {
        updateConfCartUI();
      }
      try {
        sessionStorage.setItem(
          "ois.order_confirmation",
          JSON.stringify({ ...newOrder, source: "configurator" }),
        );
      } catch (error) {
        // Il numero ordine nell'URL permette comunque di recuperare i dati.
      }
      window.location.href = `ordine-confermato.html?order=${encodeURIComponent(newOrder.id)}`;
    });
  });
}

// Sincronizzazione della lingua e del selettore.
function confSetLang(val) {
  const inLang = document.getElementById("inLang");
  if (inLang) {
    inLang.value = normalizeLang(val);
    inLang.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

window.addEventListener("storage", (event) => {
  if (event.key !== "ois.lang") return;
  const nextLang = normalizeLang(event.newValue);
  if (nextLang === state.lang) return;
  state.lang = nextLang;
  applyLanguage();
  saveConfig(true);
  render();
});

window.addEventListener("serra:themechange", () => render());

// Safari iOS può ripristinare il configuratore dalla page cache senza
// rieseguire il bootstrap. In quel caso riallinea l'ingresso guidato dalla
// home allo stato compatto previsto per il profilo Principiante.
window.addEventListener("pageshow", (event) => {
  const bootContext = window.history.state?.serraConfiguratorBoot;
  const navigationType =
    window.performance?.getEntriesByType?.("navigation")?.[0]?.type;
  const restored = event.persisted || navigationType === "back_forward";
  if (
    !restored ||
    bootContext?.source !== "index" ||
    bootContext?.livello !== "novizio"
  ) {
    return;
  }
  window.requestAnimationFrame(() => {
    setPanelCollapsed("panelSettings", true);
    syncPersonaPickerDisclosure();
  });
});

(async () => {
  // Il catalogo necessario al configuratore è già incluso in plants-data.js.
  // La sincronizzazione con eventuali sorgenti esterne prosegue in background,
  // senza trattenere il primo disegno della serra dietro a un timeout di rete.
  window.SerraAPI.bootstrapPlants();

  initConfig();
  initEvents();
  loadConfCart();
  const _bootCfg = readSavedConfig();

  const _bootLivello = BOOT_PARAMS.get("livello");
  const _shouldFocusGuidedIntroOnBoot = LIVELLI.has(_bootLivello);

  if (LIVELLI.has(_bootLivello)) {
    state.livello = _bootLivello;
    const _hasExplicitBootIntent =
      isFreeProjectBoot() ||
      shouldImportCart() ||
      Boolean(requestedBootPreset());
    const _bootIntentApplied = _hasExplicitBootIntent
      ? applyBootIntent()
      : false;

    if (_bootLivello === "esperto") {
      vegFilter = "all-beds";
      state.autoPlan = false;
      setLivello(_bootLivello, { mapMode: false });
      setMode("expert", false);
      syncVegFilterTabs();
      render();
      if (!_shouldFocusGuidedIntroOnBoot) focusManualPlanningPath();
    } else if (_bootLivello === "intermedio") {
      vegFilter = "all";
      state.autoPlan = true;
      setLivello(_bootLivello, { mapMode: false });
      setMode("fit", false);
      syncVegFilterTabs();
      if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
      else render();
      if (!_shouldFocusGuidedIntroOnBoot) focusManualPlanningPath();
    } else {
      vegFilter = "in";
      state.autoPlan = true;
      setLivello(_bootLivello, { mapMode: false });
      setMode("fit", false);
      resetNoviceAdvancedOptions();
      syncVegFilterTabs();

      if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
      else render();
      if (!_shouldFocusGuidedIntroOnBoot) scrollToScene();
    }
    // Rimuove la schermatura iniziale dopo la sincronizzazione del profilo.
    document.documentElement.classList.remove("serra-boot-novizio");
    saveConfig(true);
    clearBootParams();
    // Posiziona l'ingresso dalla home all'inizio del configuratore.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.classList.remove("serra-boot-positioning");
      });
    });
  } else {
    const _bootIntentApplied =
      isGuidedBoot() ||
      isFreeProjectBoot() ||
      shouldImportCart() ||
      _bootCfg?.done
        ? applyBootIntent()
        : false;

    if (_bootIntentApplied && isGuidedBoot()) {
    } else if (!_bootIntentApplied && !_bootCfg) {
      autoFill();
    } else if (
      !_bootIntentApplied &&
      _bootCfg?.done &&
      state.autoPlan &&
      state.beds.length === 0
    ) {
      autoFill();
    } else if (!_bootIntentApplied) {
      render();
    }
    if (BOOT_PARAMS.get("mode") === "expert") {
      state.autoPlan = false;
      clearBootParams();
    }
    setMode(state.autoPlan ? "fit" : "expert", false);

    setLivello(state.livello, { mapMode: false });
    // Mantiene l'ingresso compatto dopo un refresh.
    if (_bootCfg?.livello) setPanelCollapsed("panelSettings", true);
  }
  syncVegFilterTabs();

  updateGuidedIntroDynamic();

  collapseSettingsPanelAfterAutoPlan({
    scroll: !_shouldFocusGuidedIntroOnBoot,
  });

  // Mostra il contenuto dopo la sincronizzazione della lingua.
  document.documentElement.classList.remove("serra-i18n-pending");
})();

// Coordina i passi del percorso guidato e le relative destinazioni nella pagina.
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function cropsJourneyTarget() {
    const isGuidedResponsive =
      typeof isResponsiveConfiguratorLayout === "function" &&
      isResponsiveConfiguratorLayout() &&
      (document.body.classList.contains("livello-novizio") ||
        document.body.classList.contains("livello-intermedio"));
    return isGuidedResponsive
      ? document.getElementById("panelCustomize")
      : document.querySelector(".stage");
  }

  // Apre e mette in evidenza il pannello "Lista semi da acquistare"
  function focusYieldPanel() {
    const panel = document.getElementById("panelYield");
    if (!panel) return;
    if (typeof setPanelCollapsed === "function") {
      setPanelCollapsed(panel, false);
    }
    if (typeof scrollElementBelowHeader === "function") {
      scrollElementBelowHeader(panel, "smooth");
    } else if (panel.scrollIntoView) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    panel.classList.add("is-focus-pulse");
    window.setTimeout(() => panel.classList.remove("is-focus-pulse"), 1600);
  }

  const STEP_ACTIONS = {
    settings: function () {
      if (typeof openSettingsPanelAndFocusDimensions === "function") {
        openSettingsPanelAndFocusDimensions();
      }
      // Destinazione desktop del primo passo.
      if (
        typeof isResponsiveConfiguratorLayout === "function" &&
        !isResponsiveConfiguratorLayout() &&
        typeof scrollElementBelowHeader === "function"
      ) {
        scrollElementBelowHeader(
          document.getElementById("panelSettings"),
          "smooth",
        );
      }
    },
    crops: function () {
      const isResponsive =
        typeof isResponsiveConfiguratorLayout === "function" &&
        isResponsiveConfiguratorLayout();
      const isGuidedResponsive =
        isResponsive &&
        (document.body.classList.contains("livello-novizio") ||
          document.body.classList.contains("livello-intermedio"));

      // Destinazione mobile del secondo passo guidato.
      if (
        isGuidedResponsive &&
        typeof openCustomizePanelAndFocus === "function"
      ) {
        openCustomizePanelAndFocus();
        return;
      }

      if (!isResponsive && typeof openCustomizePanelAndFocus === "function") {
        openCustomizePanelAndFocus();
      }

      // Destinazione della planimetria.
      if (typeof scrollGreenhouseImageIntoView === "function") {
        scrollGreenhouseImageIntoView("smooth");
      }
    },
    yield: focusYieldPanel,
  };

  ready(function () {
    const bar = document.getElementById("journeyContext");
    if (!bar) return;
    const steps = Array.prototype.slice.call(
      bar.querySelectorAll(".journey-context-step"),
    );
    if (!steps.length) return;

    // Aggiorna lo stato di avanzamento del percorso.
    function setActive(step) {
      const idx = steps.indexOf(step);
      steps.forEach(function (s) {
        s.classList.toggle("is-current", s === step);
        if (s === step) s.setAttribute("aria-current", "step");
        else s.removeAttribute("aria-current");
      });
      // Registra il passo visitato.
      step.classList.add("is-visited");
      // Determina il completamento del passo.
      if (step.dataset.journeyStep === "settings") {
        step.classList.add("is-done");
      }
    }

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        setActive(step);
        const action = STEP_ACTIONS[step.dataset.journeyStep];
        if (action) action();
      });
    });

    // Navigazione da tastiera tra i passi.
    bar.addEventListener("keydown", function (e) {
      const idx = steps.indexOf(document.activeElement);
      if (idx === -1) return;
      let next = null;
      if (e.key === "ArrowRight") next = steps[(idx + 1) % steps.length];
      else if (e.key === "ArrowLeft")
        next = steps[(idx - 1 + steps.length) % steps.length];
      else if (e.key === "Home") next = steps[0];
      else if (e.key === "End") next = steps[steps.length - 1];
      if (next) {
        e.preventDefault();
        next.focus();
      }
    });

    // Contatori live delle colture selezionate.
    function syncWizardDoneState() {
      const hasCrops =
        typeof state !== "undefined" &&
        Array.isArray(state.beds) &&
        state.beds.length > 0;
      const count = hasCrops ? String(state.beds.length) : "";
      steps.forEach(function (step) {
        const key = step.dataset.journeyStep;
        if (key === "crops" || key === "yield") {
          step.classList.toggle("is-done", hasCrops);
        }
      });
      bar.dataset.cropCount = count;
    }
    syncWizardDoneState();
    const yieldBadgeSource = document.getElementById("yieldToggleBadge");
    if (yieldBadgeSource && "MutationObserver" in window) {
      new MutationObserver(syncWizardDoneState).observe(yieldBadgeSource, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    if (!("IntersectionObserver" in window)) return;

    const targets = steps
      .map(function (step) {
        return {
          step: step,
          el:
            step.dataset.journeyTarget === "stage"
              ? cropsJourneyTarget()
              : document.getElementById(step.dataset.journeyTarget),
        };
      })
      .filter(function (entry) {
        return Boolean(entry.el);
      });

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        const visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (!visible.length) return;
        const match = targets.find(function (t) {
          return t.el === visible[0].target;
        });
        if (match) setActive(match.step);
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach(function (t) {
      observer.observe(t.el);
    });
    const greenhouseStep = steps.find(function (step) {
      return step.dataset.journeyStep === "crops";
    });
    setActive(greenhouseStep || targets[0].step);
  });

  // Attiva la barra degli strumenti su mobile.
  ready(function () {
    const toggle = document.getElementById("stageToolsToggle");
    const toolbar = document.getElementById("viewToolbar");
    if (!toggle || !toolbar) return;
    toggle.addEventListener("click", function () {
      const isOpen = toolbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Apre le impostazioni dal riepilogo mobile.
  ready(function () {
    const row = document.getElementById("guidedMetaRow");
    if (!row) return;
    function open() {
      if (typeof openSettingsPanelAndFocusDimensions === "function") {
        openSettingsPanelAndFocusDimensions();
      }
    }
    row.addEventListener("click", open);
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  // Azione del profilo novizio verso la lista della spesa.
  ready(function () {
    const cta = document.getElementById("btnNoviceGoToYield");
    if (!cta) return;
    cta.addEventListener("click", focusYieldPanel);
  });

  // Apertura del selettore profilo dal badge.
  ready(function () {
    const trigger = document.getElementById("personaPickerTrigger");
    const panel = document.getElementById("guidedIntro");
    const picker = document.getElementById("personaPickDetails");
    if (!trigger || !panel || !picker) return;

    function syncPicker(open) {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      trigger.classList.toggle("is-open", open);
    }

    trigger.addEventListener("click", function () {
      picker.open = !picker.open;
    });

    picker.addEventListener("toggle", function () {
      syncPicker(picker.open);
    });

    picker.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        picker.open = false;
        trigger.focus();
      }
    });
  });
})();
