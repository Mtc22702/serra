/* =========================================================================
   JS configuratore: progettazione serra, layout aiuole, vista SVG e carrello.
   HTML/CSS/JS puro, nessuna libreria.
   Vista dall'alto in scala reale: aiuole rialzate in terra + camminamenti
   in ghiaia, struttura serra (vetri e telaio) sovrapposta.
   -------------------------------------------------------------------------
   MAPPA DEL FILE (in ordine):
     1.  Costanti di layout (misure reali in cm)
     2.  Catalogo colture (PLANTS) e indice per id (BYID)
     3.  Descrizioni, foto e preset degli orti
     4.  Mappa difficoltà colture (DIFFICULTY)
     5.  Stato del configuratore e gestione profili/persone
     6.  Helper i18n e testi
     7.  Disegno SVG (piantine, scena, struttura serra)
     8.  Geometria del layout (colonne, aiuole, compatibilità)
     9.  Rendering dell'interfaccia (pannelli, scena, riepiloghi)
     10. Riempimento automatico e selezione colture
     11. Collegamento eventi (form, pulsanti, tab)
     12. Carrello del configuratore
     13. Avvio (boot) e sincronizzazione lingua
   ========================================================================= */

/* Costanti layout: misure reali in centimetri e limiti prestazionali. */
const WALL = 12; // spessore telaio serra
const MARGIN = 18; // ghiaia tra muro e prima aiuola
const PATH = 34; // camminamento tra le aiuole
const BED_GAP = 6; // separazione sottile tra colture consecutive nella stessa aiuola lunga
const BEDPAD = 9; // terra di bordo dentro ogni aiuola
const MAX_GLYPH = 900; // tetto piantine disegnate (prestazioni)
const MIN_VISUAL_GLYPH_R = 8; // rende leggibili colture molto fitte (carote, ravanelli)

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

/* Catalogo ortaggi:
   arch = stile grafico della piantina
   d = distanza sulla fila (cm) · dr = distanza tra file (cm, se omesso = d) · h = altezza (bassa/media/alta)
   sole/acqua · giorni alla raccolta · mesi semina in serra (base, zona temperata)
   amiche/nemiche (abbinamenti) · resa kg/pianta · nota principianti · col = palette foglie */
const PLANTS = window.PLANTS;
const BYID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));

// Difficoltà di coltivazione: 1 = facile, 2 = media, 3 = difficile/esotica.
// Mappa completa su tutte le colture del catalogo: è la fonte unica usata
// sia dalle schede pianta sia dall'auto-riempimento.
const DIFFICULTY = {
  // Facili: rapide, tolleranti, ideali per chi inizia.
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
  calendula: 1,
  nasturzio: 1,
  crescione: 1,
  mizuna: 1,
  senape_foglia: 1,
  tatsoi: 1,
  loboda: 1,
  broccolo_rapa: 1,
  // Medie: richiedono un po' di attenzione o tempi più lunghi.
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
  // Difficili o esotiche: lente, delicate, perenni o poco comuni.
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
  gombo: 3,
  tomatillo: 3,
  physalis: 3,
  kiwano: 3,
  cucamelon: 3,
  stevia_dolce: 3,
  shiso: 3
};
const CAT_ORDER = [
  {
    key: "frutti",
    label: "Frutti & ortaggi",
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
      "gombo",
      "tomatillo",
      "physalis",
      "kiwano",
      "cucamelon"
    ]
  },
  {
    key: "foglie",
    label: "Insalate & foglie",
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
      "broccolo_rapa"
    ]
  },
  {
    key: "radici",
    label: "Radici & bulbi",
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
    label: "Aromatiche",
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
      "calendula",
      "nasturzio",
      "shiso"
    ]
  },
  {
    key: "legumi",
    label: "Legumi",
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
    label: "Cavoli & brassiche",
    ids: [
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa",
      "cavoletti",
      "sedano"
    ]
  }
];

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
const PLANT_RO = window.SERRA_I18N?.plants?.ro || {};

/* Descrizioni colture: testo breve per schede e pannelli. */
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
    calendula:
      "Fiore utile nell’orto: attira impollinatori e colora le aiuole.",
    nasturzio: "Fiori e foglie commestibili; utile come pianta esca per afidi.",
    mais_dolce:
      "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi.",
    gombo: "Ama molto caldo; raccogli i baccelli piccoli e teneri.",
    tomatillo:
      "Serve almeno due piante per fruttificare bene; ottimo per salse.",
    physalis: "Frutti dolci in lanterna; in serra matura meglio.",
    kiwano: "Cucurbitacea esotica per serre calde; falla arrampicare.",
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
    shiso: "Aromatica asiatica profumata; bella anche in vaso in serra."
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
    calendula: "Gălbenele",
    nasturzio: "Conduraș",
    mais_dolce: "Porumb dulce",
    gombo: "Bame",
    tomatillo: "Tomatillo",
    physalis: "Physalis",
    kiwano: "Kiwano",
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
    shiso: "Shiso"
  }
};

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
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 30 cm sulla fila e 70 cm tra file.",
    tip: "Richiede gruppi di piante per impollinarsi bene; ideale ai bordi."
  },
  gombo: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 45 cm sulla fila e 70 cm tra file.",
    tip: "Ama molto caldo; raccogli i baccelli piccoli e teneri."
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
  kiwano: {
    method:
      "Semina diretta o in alveolo, poi trapianto quando la pianta è robusta.",
    depth: "0,5-1 cm",
    thin: "Dirada o trapianta a circa 60 cm sulla fila e 100 cm tra file.",
    tip: "Cucurbitacea esotica per serre calde; falla arrampicare."
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
  }
};

/* Foto colture: immagini locali usate nel dettaglio pianta. */
const PLANT_PHOTOS = {
  pomodoro: "assets/img/photo/pomodoro.jpg",
  peperone: "assets/img/photo/peperone.jpg",
  peperoncino: "assets/img/photo/peperoncino.jpg",
  melanzana: "assets/img/photo/melanzana.jpg",
  zucchina: "assets/img/photo/zucchina.jpg",
  zucca: "assets/img/photo/zucca.jpg",
  cetriolo: "assets/img/photo/cetriolo.jpg",
  melone: "assets/img/photo/melone.jpg",
  anguria: "assets/img/photo/anguria.jpg",
  lattuga: "assets/img/photo/lattuga.jpg",
  radicchio: "assets/img/photo/radicchio.jpg",
  rucola: "assets/img/photo/rucola.jpg",
  spinaci: "assets/img/photo/spinaci.jpg",
  bietola: "assets/img/photo/bietola_coste.jpg",
  cavolo: "assets/img/photo/cavolo_cappuccio.jpg",
  verza: "assets/img/photo/verza.jpg",
  broccolo: "assets/img/photo/broccolo.jpg",
  cavolfiore: "assets/img/photo/cavolfiore.jpg",
  cavolonero: "assets/img/photo/cavolo_nero.jpg",
  cavolorapa: "assets/img/photo/cavolo_rapa.jpg",
  carota: "assets/img/photo/carota.jpg",
  finocchio: "assets/img/photo/finocchio.jpg",
  prezzemolo: "assets/img/photo/prezzemolo.jpg",
  basilico: "assets/img/photo/basilico.jpg",
  coriandolo: "assets/img/photo/coriandolo.jpeg",
  aneto: "assets/img/photo/aneto.jpg",
  cipolla: "assets/img/photo/cipolla.jpg",
  aglio: "assets/img/photo/aglio.jpg",
  porro: "assets/img/photo/porro.jpg",
  scalogno: "assets/img/photo/scalogno.jpg",
  fagiolino: "assets/img/photo/fagiolino_nano.jpg",
  fagiolo: "assets/img/photo/fagiolo_rampicante.jpg",
  pisello: "assets/img/photo/pisello.jpg",
  fragola: "assets/img/photo/fragola.jpg",
  sedano: "assets/img/photo/sedano.jpg",
  ravanello: "assets/img/photo/ravanello.jpg",
  barbabietola: "assets/img/photo/barbabietola.jpg",
  cicoria: "assets/img/photo/cicoria.jpg",
  indivia: "assets/img/photo/indivia_scarola.jpg",
  pakchoi: "assets/img/photo/pak_choi.jpg",
  cavoletti: "assets/img/photo/cavoletti_bruxelles.jpg",
  rapa: "assets/img/photo/rapa.jpg",
  valerianella: "assets/img/photo/valerianella.jpg",
  rosmarino: "assets/img/photo/rosmarino.jpg",
  timo: "assets/img/photo/timo.jpg",
  origano: "assets/img/photo/origano.jpeg",
  salvia: "assets/img/photo/salvia.jpg",
  pastinaca: "assets/img/photo/pastinaca.jpg",
  radice_prezemolo: "assets/img/photo/radice_prezemolo.jpg",
  sedano_rapa: "assets/img/photo/sedano_rapa.jpg",
  rafano: "assets/img/photo/rafano.jpg",
  patata: "assets/img/photo/patata.jpg",
  patata_dolce: "assets/img/photo/patata_dolce.jpg",
  cipolla_rossa: "assets/img/photo/cipolla_rossa.jpg",
  cipollotto: "assets/img/photo/cipollotto.jpg",
  erba_cipollina: "assets/img/photo/erba_cipollina.jpg",
  loboda: "assets/img/photo/loboda.jpg",
  stevia_dolce: "assets/img/photo/stevia_dolce.jpg",
  leustean: "assets/img/photo/leustean.jpg",
  dragoncello: "assets/img/photo/dragoncello.jpg",
  menta: "assets/img/photo/menta.jpg",
  maggiorana: "assets/img/photo/maggiorana.jpg",
  camomilla: "assets/img/photo/camomilla.jpg",
  calendula: "assets/img/photo/calendula.jpg",
  nasturzio: "assets/img/photo/nasturzio.jpg",
  mais_dolce: "assets/img/photo/mais_dolce.jpg",
  gombo: "assets/img/photo/gombo.jpg",
  tomatillo: "assets/img/photo/tomatillo.jpg",
  physalis: "assets/img/photo/physalis.jpg",
  kiwano: "assets/img/photo/kiwano.jpg",
  cucamelon: "assets/img/photo/cucamelon.jpg",
  asparago: "assets/img/photo/asparago.jpg",
  carciofo: "assets/img/photo/carciofo.jpg",
  cardo: "assets/img/photo/cardo.jpg",
  crescione: "assets/img/photo/crescione.jpg",
  mizuna: "assets/img/photo/mizuna.jpg",
  senape_foglia: "assets/img/photo/senape_foglia.jpg",
  tatsoi: "assets/img/photo/tatsoi.jpg",
  cavolo_cinese: "assets/img/photo/cavolo_cinese.jpg",
  daikon: "assets/img/photo/daikon.jpg",
  scorzonera: "assets/img/photo/scorzonera.jpg",
  topinambur: "assets/img/photo/topinambur.jpg",
  fava: "assets/img/photo/fava.jpg",
  soia_edamame: "assets/img/photo/soia_edamame.jpg",
  cece: "assets/img/photo/cece.jpg",
  lenticchia: "assets/img/photo/lenticchia.jpg",
  fagiolo_borlotto: "assets/img/photo/fagiolo_borlotto.jpg",
  cavolo_rosso: "assets/img/photo/cavolo_rosso.jpg",
  cavolo_navone: "assets/img/photo/cavolo_navone.jpg",
  broccolo_rapa: "assets/img/photo/broccolo_rapa.jpg",
  shiso: "assets/img/photo/shiso.jpg"
};

/* Preimpostazioni orti: configurazioni pronte caricate dal selettore. */
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
    ["finocchio", 8],
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
    ["cetriolo", 4]
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

/* Stato configuratore: lingua, misure, clima, aiuole e preferenze interfaccia. */
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
  overlay: "",
  selected: -1,
  // Livello/persona dell'utente: "novizio" | "intermedio" | "esperto".
  // Guida quanta UI mostrare e quanto automatizzare il flusso.
  livello: "intermedio"
};
const LIVELLI = new Set(["novizio", "intermedio", "esperto"]);
let vegFilter = "all";
const CONFIG_KEY = "serra.config.v1";
const BOOT_PARAMS = new URLSearchParams(window.location.search);

function normalizeLang(lang) {
  return lang === "ro" || lang === "it" ? lang : "it";
}

function readSavedConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
  } catch {
    return null;
  }
}

function saveConfig(done = true) {
  try {
    localStorage.setItem(
      CONFIG_KEY,
      JSON.stringify({
        lang: state.lang,
        zona: state.zona,
        riscaldata: state.riscaldata,
        larghezza: state.larghezza,
        lunghezza: state.lunghezza,
        path: state.path,
        mese: state.mese,
        autoPlan: state.autoPlan,
        livello: state.livello,
        beds: state.beds.map((bed) => ({
          plantId: bed.plantId,
          count: bed.count,
          layout: bed.layout || "blocco"
        })),
        done
      })
    );
  } catch {
    // localStorage puo non essere disponibile in alcuni contesti incorporati.
  }
}

function syncLanguageControls() {
  const main = document.getElementById("inLang");
  const modal = document.getElementById("startLang");
  const nav = document.getElementById("navLang");
  if (main) main.value = state.lang;
  if (modal) modal.value = state.lang;
  if (nav) nav.value = state.lang;
}

function syncClimateControls() {
  const zone = document.getElementById("inZona");
  const heated = document.getElementById("inRisc");
  const modalHeated = document.getElementById("heatedChk");
  if (zone) zone.value = state.zona;
  if (heated) heated.value = state.riscaldata ? "si" : "no";
  if (modalHeated) modalHeated.checked = state.riscaldata;
  document.querySelectorAll("#zoneOpts .opt").forEach((opt) => {
    opt.classList.toggle("on", opt.dataset.zone === state.zona);
  });
}

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

function setStartModalVisible(visible) {
  const modal = document.getElementById("startModal");
  if (modal) modal.style.display = visible ? "flex" : "none";
}

function requestedBootPreset() {
  const preset = BOOT_PARAMS.get("preset") || "";
  return PRESETS[preset] ? preset : "";
}

function shouldImportCart() {
  return BOOT_PARAMS.get("import") === "cart";
}

function isGuidedBoot() {
  return (
    BOOT_PARAMS.get("guided") === "1" ||
    requestedBootPreset() === "principiante"
  );
}

function isFreeProjectBoot() {
  return (
    BOOT_PARAMS.get("mode") === "expert" &&
    (BOOT_PARAMS.get("empty") === "1" || BOOT_PARAMS.get("free") === "1")
  );
}

function clearBootParams() {
  if (!window.history?.replaceState) return;
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + window.location.hash
  );
}

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
}

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
    section.classList.toggle(
      "is-active",
      sectionMode === next || (next === "expert" && sectionMode === "fit")
    );
  });
  const yieldPanel = document.getElementById("panelYield");
  if (yieldPanel) {
    if (!yieldPanel.classList.contains("is-collapsed")) {
      yieldPanel.classList.add("is-collapsed");
    }
    const toggle = yieldPanel.querySelector(".panel-toggle");
    if (toggle) updatePanelToggle(toggle);
  }
  const fillBtn = document.querySelector(".crops-fill-main-btn");
  if (fillBtn) fillBtn.hidden = next === "expert";

  if (scroll) {
    document.getElementById("guidedIntro")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* Personas: imposta il livello utente, sincronizza UI e mappa la modalità.
   "novizio" e "intermedio" usano la modalità guidata (fit); "esperto" la
   modalità manuale (expert). La differenza tra novizio e intermedio è quanta
   UI avanzata viene mostrata (gestita via classi sul body in CSS). */
function setLivello(liv, { mapMode = true } = {}) {
  const next = LIVELLI.has(liv) ? liv : "intermedio";
  state.livello = next;
  document.body.classList.toggle("livello-novizio", next === "novizio");
  document.body.classList.toggle("livello-intermedio", next === "intermedio");
  document.body.classList.toggle("livello-esperto", next === "esperto");
  document.querySelectorAll(".persona-card").forEach((card) => {
    const on = card.dataset.livello === next;
    card.classList.toggle("is-active", on);
    card.setAttribute("aria-selected", String(on));
  });
  if (mapMode) setMode(next === "esperto" ? "expert" : "fit", false);
}

/* Scelta esplicita da parte dell'utente: imposta il livello e applica il
   comportamento adatto alla persona, poi salva. */
function chooseLivello(liv) {
  const prev = state.livello;
  setLivello(liv);
  if (liv === "esperto") {
    // L'esperto vuole il controllo: catalogo completo, scelta a mano.
    vegFilter = "all-beds";
    state.autoPlan = false;
    syncVegFilterTabs();
    render();
    focusManualPlanningPath();
  } else if (liv === "intermedio") {
    // Punto di partenza pronto, ma libero di personalizzare e andare off-season.
    vegFilter = "all";
    state.autoPlan = true;
    if (!state.beds.length) autoFill();
    else render();
    syncVegFilterTabs();
    focusManualPlanningPath();
  } else {
    // Novizio: serra pronta, solo colture di stagione, percorso lineare al carrello.
    vegFilter = "in";
    state.autoPlan = true;
    autoFill();
    syncVegFilterTabs();
    collapseSettingsPanelAfterAutoPlan();
    scrollToScene();
  }
  saveConfig(true);
  if (prev !== liv) updateGuidedIntroDynamic();
}

/* Allinea i tab del filtro colture allo stato vegFilter corrente. */
function syncVegFilterTabs() {
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === vegFilter);
  });
}

/* Porta l'utente alla vista della serra (usato per il percorso novizio). */
function scrollToScene() {
  window.setTimeout(() => {
    const stage = document.querySelector(".stage");
    if (!stage) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
        "66",
      10
    );
    const top = stage.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: "smooth" });
  }, 120);
}

function tx(key, vars = {}) {
  const dict = I18N[state.lang] || I18N.it;
  let value = dict[key] || I18N.it[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function plantText(plant, field = "nome") {
  if (state.lang === "ro" && PLANT_RO[plant.id]?.[field]) {
    return PLANT_RO[plant.id][field];
  }
  return plant[field];
}

function plantNameById(id) {
  return BYID[id] ? plantText(BYID[id], "nome") : null;
}

function waterLabel(value) {
  if (value === "alta") return tx("waterHigh");
  if (value === "bassa") return tx("waterLow");
  return tx("waterMedium");
}

function heightLabel(value) {
  if (value === "alta") return tx("heightHigh");
  if (value === "bassa") return tx("heightLow");
  return tx("heightMedium");
}

function yieldLabel(value) {
  return value < 1
    ? `${(value * 1000).toFixed(0)} g`
    : `${value.toFixed(1)} kg`;
}

function spacingValue(plant) {
  return plant.dr && plant.dr !== plant.d
    ? `${plant.d}×${plant.dr} cm`
    : `${plant.d} cm`;
}

function spacingInfographicSvg(p) {
  const d = p.d;
  const dr = p.dr || p.d;
  if (!d) return "";
  const W = 224;
  const H = 118;
  const R = 7;
  const cx = [34, 78, 122, 166];
  const cy = [32, 76];
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

function harvestValue(plant) {
  if (!plant.gg) return tx("perennial");
  return `${tx("about")} ${plant.gg} ${tx("daysShort")}`;
}

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
    "valerianella"
  ]);
  const bulbs = new Set(["aglio", "scalogno", "cipolla"]);
  const aromatics = new Set(["rosmarino", "timo", "origano", "salvia"]);
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
    "basilico"
  ]);
  const name = plantText(plant, "nome").toLowerCase();
  const row = plant.d;
  const between = plant.dr || plant.d;
  let method =
    "Seamănă în alveole sau răsadniță, apoi transplantează plante viguroase în strat.";
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

  let depth = sow.depth
    .replace("Colletto a livello del terreno", "Coletul la nivelul solului")
    .replace(
      "Superficiale, copertura leggerissima",
      "Superficial, acoperire foarte ușoară"
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

function representativePlantIndexes(count, maxItems) {
  const total = Math.max(0, count);
  const take = Math.min(total, maxItems);
  if (!take) return new Set();
  const indexes = new Set();
  for (let k = 0; k < take; k++) {
    indexes.add(Math.min(total - 1, Math.floor(((k + 0.5) * total) / take)));
  }
  return indexes;
}

// Sceglie targetCount indici distribuiti su una griglia 2D.
// Usa un percorso a serpentina per ottenere un motivo a mattoni, non a colonne.
function emojiSpreadIndexes(itemCount, cols, targetCount) {
  if (!targetCount) return new Set();
  if (itemCount <= targetCount)
    return new Set(Array.from({ length: itemCount }, (_, i) => i));
  const safeCols = Math.max(1, cols);
  const rows = Math.ceil(itemCount / safeCols);
  const snake = [];
  for (let r = 0; r < rows; r++) {
    const start = r * safeCols;
    const end = Math.min(start + safeCols, itemCount);
    if (r % 2 === 0) {
      for (let i = start; i < end; i++) snake.push(i);
    } else {
      for (let i = end - 1; i >= start; i--) snake.push(i);
    }
  }
  const result = new Set();
  for (let k = 0; k < targetCount; k++) {
    result.add(snake[Math.floor(((k + 0.5) * snake.length) / targetCount)]);
  }
  return result;
}

function monthName(index) {
  return (MONTHS[state.lang] || MONTHS.it)[index - 1];
}

function setText(selector, key) {
  const el = document.querySelector(selector);
  if (el) el.textContent = tx(key);
}

function setOptionText(selectId, value, key) {
  const opt = document.querySelector(`#${selectId} option[value="${value}"]`);
  if (opt) opt.textContent = tx(key);
}

function syncOverlaySelectLabel() {
  const select = document.getElementById("inOverlay");
  const label = document.getElementById("viewModeValue");
  if (!select || !label) return;
  label.textContent =
    select.options[select.selectedIndex]?.textContent || tx("viewNatural");
}

function updatePanelToggle(btn) {
  const panel = btn.closest(".panel");
  const isCollapsed = panel?.classList.contains("is-collapsed");
  const label = btn.querySelector(".panel-toggle-label");
  const icon = btn.querySelector(".panel-toggle-icon");
  const isYield = btn.classList.contains("panel-toggle--yield");
  let labelText;
  if (isYield && isCollapsed) {
    labelText = state.lang === "ro" ? "Lista semințe" : "Lista semi";
  } else {
    const openKey = btn.dataset.openKey || "openPanel";
    labelText = isCollapsed ? tx(openKey) : tx("closePanel");
  }
  if (label) label.textContent = labelText;
  if (icon) icon.textContent = "⌃";
  btn.setAttribute("aria-expanded", String(!isCollapsed));
  btn.setAttribute(
    "aria-label",
    isCollapsed ? tx("openPanelLabel") : tx("closePanelLabel")
  );
}

function updateAllPanelToggles() {
  document.querySelectorAll(".panel-toggle").forEach(updatePanelToggle);
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = tx("title");
  document.querySelectorAll("[data-i18n-conf]").forEach((el) => {
    const key = el.dataset.i18nConf;
    const translated = SITE_I18N[state.lang]?.[key];
    if (!translated) return;
    if (translated.includes("<") || translated.includes("&"))
      el.innerHTML = translated;
    else el.textContent = translated;
  });
  syncLanguageControls();
  setText("#mainLangLabel", "language");
  setText("#modalLangLabel", "language");
  setText(".brand h1", "brandTitle");
  setText(".brand p", "brandSub");
  setText("#guidedAppTitle", "guidedAppTitle");
  setText("#guidedAppSub", "guidedAppSub");
  setText(
    ".modal-kicker",
    isGuidedBoot() ? "guidedModalKicker" : "modalKicker"
  );
  setText(
    ".modal .hero h2",
    isGuidedBoot() ? "guidedModalTitle" : "modalTitle"
  );
  setText(".modal .hero p", isGuidedBoot() ? "guidedModalCopy" : "modalCopy");
  setText("#guidedIntroTitle", "guidedIntroTitle");
  setText("#personaPickLabel", "personaPickLabel");
  setText("#personaPickHint", "personaPickHint");
  setText("#personaNovTitle", "personaNovTitle");
  setText("#personaNovDesc", "personaNovDesc");
  setText("#personaIntTitle", "personaIntTitle");
  setText("#personaIntDesc", "personaIntDesc");
  setText("#personaExpTitle", "personaExpTitle");
  setText("#personaExpDesc", "personaExpDesc");
  const introSteps = document.querySelectorAll(
    "#guidedIntroSteps li > span:not(.guided-step-num):not(.guided-step-ico)"
  );
  if (introSteps[0]) introSteps[0].innerHTML = tx("howTo1");
  if (introSteps[1]) introSteps[1].innerHTML = tx("howTo2");
  if (introSteps[2]) introSteps[2].innerHTML = tx("howTo3");
  setText("#guidedIntroNovTitle", "guidedIntroNovTitle");
  setText("#guidedNovCtaLabel", "guidedNovCta");
  const introNovSteps = document.querySelectorAll(
    "#guidedIntroNovSteps li > span:not(.guided-step-num):not(.guided-step-ico)"
  );
  if (introNovSteps[0]) introNovSteps[0].innerHTML = tx("guidedNovStep1");
  if (introNovSteps[1]) introNovSteps[1].innerHTML = tx("guidedNovStep2");
  if (introNovSteps[2]) introNovSteps[2].innerHTML = tx("guidedNovStep3");
  setText("#guidedIntroExpTitle", "guidedIntroExpTitle");
  const introExpSteps = document.querySelectorAll(
    "#guidedIntroExpSteps li > span:not(.guided-step-num):not(.guided-step-ico)"
  );
  if (introExpSteps[0]) introExpSteps[0].innerHTML = tx("guidedExpStep1");
  if (introExpSteps[1]) introExpSteps[1].innerHTML = tx("guidedExpStep2");
  if (introExpSteps[2]) introExpSteps[2].innerHTML = tx("guidedExpStep3");
  /* Traduci le tab filtro piante */
  const filterIconMap = { all: "🌿", in: "✓", "all-beds": "⌕" };
  const filterLblMap = {
    all: { it: "Seminabili ora", ro: "De semănat acum" },
    in: { it: "Già aggiunte", ro: "Deja adăugate" },
    "all-beds": { it: "Tutti i semi", ro: "Toate semințele" }
  };
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    const f = tab.dataset.filter;
    const ico = filterIconMap[f] || "🌿";
    const lbl =
      (filterLblMap[f] || filterLblMap.all)[state.lang] ||
      (filterLblMap[f] || filterLblMap.all).it;
    tab.innerHTML = `<span class="tab-ico" aria-hidden="true">${ico}</span><span class="tab-lbl">${lbl}</span><span class="tab-count">—</span>`;
  });
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
      "modalGreenhouseCopy"
    );
  }
  setText(".checkline span", "heated");
  setText("#startBtn", isGuidedBoot() ? "guidedStart" : "start");
  setText(".disclaimer", "disclaimer");
  setText(".panel-head h2", "settingsTitle");
  setText(".panel-head .sub", "settingsSub");
  const labels = document.querySelectorAll(".section-label");
  if (labels[0]) labels[0].textContent = tx("sizes");
  if (labels[1]) labels[1].textContent = tx("climate");
  if (labels[2]) labels[2].textContent = tx("quickStart");
  const fld = document.querySelectorAll("#panelSettings .fld");
  if (fld[0]) fld[0].textContent = tx("width");
  if (fld[1]) fld[1].textContent = tx("length");
  if (fld[2]) fld[2].textContent = tx("pathWidth");
  if (fld[3]) fld[3].textContent = tx("zone");
  if (fld[4]) fld[4].textContent = tx("greenhouse");
  setText("#presetBar .fld", "readyLayouts");
  setOptionText("inZona", "freddo", "zoneColdTitle");
  setOptionText("inZona", "temperato", "zoneTempTitle");
  setOptionText("inZona", "caldo", "zoneWarmTitle");
  setOptionText("inRisc", "no", "unheated");
  setOptionText("inRisc", "si", "heatedOption");
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
  setText("#btnFillSelected .btn-label", "fillSelected");
  setText("#btnFillSelected .btn-hint", "fillSelectedHint");
  const fillSelectedBtn = document.getElementById("btnFillSelected");
  if (fillSelectedBtn) fillSelectedBtn.title = tx("fillSelectedTitle");
  setText("#btnStampa .btn-label", "print");
  const printBtn = document.getElementById("btnStampa");
  if (printBtn) printBtn.title = tx("printTitle");
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
  setText("#btnClear .btn-hint", "clearGreenhouseHint");
  const clearBtn = document.getElementById("btnClear");
  if (clearBtn) clearBtn.title = tx("clearGreenhouseTitle");
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
}

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

function glyph(plant, r, rng) {
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

/* Layout serra: calcolo semine, compatibilità, aiuole e scena SVG. */
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
      // In zona fredda la finestra utile si avvicina ai mesi piu miti:
      // semine primaverili ritardate, semine autunnali anticipate.
      set.add(m <= 7 ? m + 1 : m - 1);
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
    const col = columns.reduce((best, current) => {
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
  return [...representativePlantIndexes(bed.positions.length, maxItems)]
    .sort((a, b) => a - b)
    .map((sourceIndex) => ({
      pos: bed.positions[sourceIndex],
      sourceIndex
    }));
}

function fitLabelSize(text, width, height) {
  const maxByWidth = (width - 14) / Math.max(text.length * 0.55, 1);
  const maxByHeight = Math.max(8, height * 0.18);
  return Math.max(5, Math.min(13, maxByWidth, maxByHeight));
}

function buildScene() {
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
    <pattern id="soil" width="46" height="46" patternUnits="userSpaceOnUse">
      <rect width="46" height="46" fill="#5e4632"/>
      <rect width="46" height="46" fill="url(#soilGrad)"/>
      ${soilSpecks()}
    </pattern>
    <radialGradient id="soilGrad" cx="40%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#6f553d"/><stop offset="100%" stop-color="#4a3829"/>
    </radialGradient>
    <pattern id="gravel" width="34" height="34" patternUnits="userSpaceOnUse">
      <rect width="34" height="34" fill="#d6cdb9"/>${gravelSpecks()}
    </pattern>
    <pattern id="grass" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#9fb083"/>${grassSpecks()}
    </pattern>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9c6a3c"/><stop offset="50%" stop-color="#7c5230"/><stop offset="100%" stop-color="#5f3e23"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".0"/>
      <stop offset="42%" stop-color="#ffffff" stop-opacity=".22"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity=".05"/>
      <stop offset="100%" stop-color="#cfe0e6" stop-opacity=".10"/>
    </linearGradient>
    <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfdfd"/><stop offset="100%" stop-color="#c9d3d3"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#1f3a26" flood-opacity="0.28"/></filter>
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
  // --- ombra serra ---
  g += `<rect x="${PAD + 6}" y="${PAD + 10}" width="${totW}" height="${totH}" rx="12" fill="#1f3a26" opacity="0.22"/>`;
  // --- telaio esterno ---
  g += `<rect x="${PAD}" y="${PAD}" width="${totW}" height="${totH}" rx="12" fill="url(#frame)" stroke="#aeb9b9" stroke-width="2"/>`;
  // --- interno: terra scura di base ---
  g += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" rx="6" fill="#3a2710"/>`;

  // --- AIUOLE E CAMMINAMENTI (dentro clip) ---
  g += `<g clip-path="url(#interiorClip)">`;

  // --- camminamenti con piastrelle ---
  // margini laterali
  g += `<rect x="${ox}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#dirtPath)"/>`;
  g += `<rect x="${ox + Wi - MARGIN}" y="${oy}" width="${MARGIN}" height="${Li}" fill="url(#dirtPath)"/>`;
  // margini superiore e inferiore
  g += `<rect x="${ox + MARGIN}" y="${oy}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#dirtPath)"/>`;
  g += `<rect x="${ox + MARGIN}" y="${oy + Li - MARGIN}" width="${Wi - 2 * MARGIN}" height="${MARGIN}" fill="url(#dirtPath)"/>`;
  // corridoi verticali tra colonne
  for (let i = 0; i < L.columnCount - 1; i++) {
    const pX = MARGIN + (i + 1) * L.bedW + i * state.path;
    g += `<rect x="${ox + pX}" y="${oy}" width="${state.path}" height="${Li}" fill="url(#dirtPath)"/>`;
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
        g += `<rect x="${ox + sorted[i].x}" y="${oy + gapY}" width="${sorted[i].w}" height="${gapH}" fill="url(#dirtPath)"/>`;
    }
  });

  if (L.beds.length === 0) {
    g += `<text x="${ox + Wi / 2}" y="${oy + Li / 2}" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${Math.min(Wi, Li) * 0.06}" fill="#8c8470">${tx("emptyGreenhouse")}</text>`;
  }
  let drawn = 0;
  L.beds.forEach((bed) => {
    const bx = ox + bed.x,
      by = oy + bed.y;
    // bordo legno aiuola rialzata
    g += `<g class="bedhit" data-bed="${bed.idx}">`;
    g += `<rect class="bed-border" x="${bx - 6}" y="${by - 6}" width="${bed.w + 12}" height="${bed.h + 12}" rx="7" fill="url(#wood)" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;
    g += `<rect x="${bx}" y="${by}" width="${bed.w}" height="${bed.h}" rx="3" fill="url(#soil)"/>`;
    // piantine
    const r = visualPlantRadius(bed.plant);
    const maxBudget = Math.max(
      6,
      Math.floor(MAX_GLYPH / Math.max(L.beds.length, 1))
    );
    const bedGlyphBudget = Math.min(bed.count, maxBudget);
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
      if (fe && emojiIndexes.has(i)) {
        const fs = Math.max(rr * 1.2, 8);
        pendingEmoji.push(
          `<text x="${ox + pos.x}" y="${oy + pos.y}" text-anchor="middle" dominant-baseline="central" font-size="${fs}" style="pointer-events:none;user-select:none">${fe}</text>`
        );
      }
    });
    const label = plantText(bed.plant, "nome");
    const labelSize = fitLabelSize(label, bed.w, bed.h);
    const labelY = by + Math.max(18, labelSize + 8);
    const labelW = Math.min(
      bed.w - 10,
      Math.max(44, label.length * labelSize * 0.58 + 18)
    );
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
    g += `<rect x="${bx + bed.w / 2 - labelW / 2}" y="${labelY - labelSize - 8}" width="${labelW}" height="${labelSize + 13}" rx="${Math.min(8, (labelSize + 13) / 2)}" fill="rgba(255,253,246,.94)" stroke="rgba(31,58,38,.35)" stroke-width=".8"/>`;
    g += `<text x="${bx + bed.w / 2}" y="${labelY - 3}" text-anchor="middle" font-family="Outfit,sans-serif" font-size="${labelSize}" font-weight="800" fill="#1f3a26" stroke="rgba(255,253,246,.9)" stroke-width="1.8" paint-order="stroke">${label}</text>`;
    g += `</g>`;
    // sovrapposizione analitica
    if (state.overlay) {
      g += overlayShape(bed, bx, by);
    }
  });
  g += `</g>`; // fine clip

  // --- linea "fine serra" se c'è sforamento ---
  if (L.overflow) {
    g += `<line x1="${ox}" y1="${oy + Li}" x2="${ox + Wi}" y2="${oy + Li}" stroke="#b4452c" stroke-width="4" stroke-dasharray="14 8"/>`;
  }

  // --- STRUTTURA SERRA sovrapposta (vetri + telaio) ---
  g += glassStructure(ox, oy, Wi, Li, PAD, totW, totH);

  // --- bussola sole ---
  g += `<g transform="translate(${vbW - PAD - 2} ${PAD + 18})" opacity="0.9">
        <circle r="15" fill="#fff" stroke="#d9a441" stroke-width="2"/>
        <text x="0" y="5" text-anchor="middle" font-size="16">☀️</text>
        <text x="0" y="30" text-anchor="middle" font-family="Outfit" font-size="9" fill="#7b6a3a">${tx("compassSouth")}</text>
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
  // barre vetro leggere: danno struttura senza coprire ortaggi o nomi
  const bars = Math.max(2, Math.round(Wi / 60));
  for (let i = 1; i < bars; i++) {
    const x = ox + (Wi * i) / bars;
    s += `<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy + Li}" stroke="rgba(255,255,255,.28)" stroke-width="1.5" pointer-events="none"/>`;
  }
  // traversi orizzontali
  const cross = Math.max(2, Math.round(Li / 60));
  for (let i = 1; i < cross; i++) {
    const y = oy + (Li * i) / cross;
    s += `<line x1="${ox}" y1="${y}" x2="${ox + Wi}" y2="${y}" stroke="rgba(255,255,255,.18)" stroke-width="1.2" pointer-events="none"/>`;
  }
  // riflesso luminoso diagonale
  s += `<polygon points="${ox},${oy} ${ox + Wi * 0.34},${oy} ${ox},${oy + Li * 0.5}" fill="rgba(255,255,255,.10)" pointer-events="none"/>`;
  // telaio perimetrale interno
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="none" stroke="url(#frame)" stroke-width="${WALL}" pointer-events="none"/>`;
  s += `<rect x="${ox}" y="${oy}" width="${Wi}" height="${Li}" fill="none" stroke="#aeb9b9" stroke-width="1.5" pointer-events="none"/>`;
  // porta in basso al centro
  const doorX = ox + Wi / 2;
  const dw = Math.min(Wi * 0.34, 90);
  const doorY = oy + Li - WALL / 2 - 2;
  const doorH = WALL + 8;
  s += `<rect x="${doorX - dw / 2}" y="${doorY}" width="${dw}" height="${doorH}" rx="3" fill="#e7ad55" stroke="#b07f30" stroke-width="1.5" pointer-events="none"/>`;
  s += `<text x="${doorX}" y="${doorY + doorH / 2 + 3.5}" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="700" fill="#5f3e23" pointer-events="none">${tx("greenhouseEntrance")}</text>`;
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
  for (let i = 0; i < 14; i++) {
    const g = 170 + Math.floor(r() * 60);
    s += `<circle cx="${r() * 34}" cy="${r() * 34}" r="${1.5 + r() * 2.2}" fill="rgb(${g},${g - 8},${g - 22})"/>`;
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

/* Render interfaccia: liste colture, scena, pannelli, footer, riepiloghi e stampa. */
function vegCardHTML(p, inb, outOfSeason = false) {
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
    return `<div class="veg in">
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
    <div class="veg-qty-ctl">
      <button class="veg-step" data-veg-cnt="-1" data-veg-plant="${p.id}" aria-label="Riduci quantità">−</button>
      <span class="veg-qty-num">${count}</span>
      <button class="veg-step" data-veg-cnt="1" data-veg-plant="${p.id}" aria-label="Aumenta quantità">+</button>
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

function renderVegList() {
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
      seasonal: sem.length
    });
  } else {
    subEl.innerHTML = tx("filterDescAll", { count: sem.length });
  }

  const countMap = {
    all: sem.length,
    in: state.beds.length,
    "all-beds": PLANTS.length
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

  const vl = document.getElementById("vegList");
  if (!filtered.length) {
    const msg =
      vegFilter === "in" || vegFilter === "all-beds"
        ? `<div class="empty-note">${tx("vegNoMore")}</div>`
        : `<div class="empty-note">${tx("noCrops", { month: monthName(state.mese) })}</div>`;
    vl.innerHTML = msg;
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
  vl.innerHTML = filtered
    .map((p) => vegCardHTML(p, present.has(p.id), !semSet.has(p.id)))
    .join("");
}

function updateCropActionControls() {
  const hasCrops = state.beds.length > 0;
  const fillBtn = document.getElementById("btnFillSelected");
  const clearBtn = document.getElementById("btnClear");
  if (fillBtn) fillBtn.disabled = !hasCrops;
  if (clearBtn) clearBtn.disabled = !hasCrops;
}

function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}

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
    autunno: "autumn"
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

function render() {
  // tag intestazione
  const zoneNames = {
    freddo: tx("cold"),
    temperato: tx("temperate"),
    caldo: tx("warm")
  };
  document.getElementById("tagZona").textContent =
    `🌡️ ${zoneNames[state.zona]}` +
    (state.riscaldata ? ` · ${tx("heatedShort")}` : "");
  document.getElementById("tagMese").textContent =
    `📅 ${monthName(state.mese)}`;
  document.getElementById("tagArea").textContent =
    `📐 ${state.larghezza}×${state.lunghezza} m`;
  // badge mese sul pulsante "Riempi la serra"
  const bmt = document.getElementById("btnMonthTag");
  if (bmt) bmt.textContent = monthName(state.mese);
  // lista seminabili
  renderVegList();
  updateCropActionControls();

  // scena
  const built = buildScene();
  document.getElementById("scene").innerHTML = built.svg;
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
    status
  });

  // legenda della sovrapposizione
  const lg = document.getElementById("legend");
  if (state.overlay === "sole")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#fff2a6,#f5bd2d,#df7f1b)", tx("fullSun")],
      ["linear-gradient(135deg,#d9edf5,#8fb5d1,#5d7fa4)", tx("halfShade")]
    ]);
  else if (state.overlay === "acqua")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#8ee8ff,#238bd4,#075aa3)", tx("waterHigh")],
      ["linear-gradient(135deg,#c8f0ff,#78bfe6,#3f92c9)", tx("waterMedium")],
      ["linear-gradient(135deg,#eef5e4,#cfdba5,#a8b46d)", tx("waterLow")]
    ]);
  else if (state.overlay === "altezza")
    lg.innerHTML = legend([
      ["linear-gradient(180deg,#0d3d22,#275827)", tx("heightHigh")],
      ["linear-gradient(180deg,#3f8f45,#8fca61)", tx("heightMedium")],
      ["linear-gradient(180deg,#a9d870,#ecf6b5)", tx("heightLow")]
    ]);
  else lg.innerHTML = "";

  // mostra/nasconde il banner "serra vuota"
  const emptyBanner = document.getElementById("stageEmptyBanner");
  if (emptyBanner) {
    const b = emptyBanner.querySelector(".seb-copy b");
    const s = emptyBanner.querySelector(".seb-copy span");
    if (b) b.textContent = tx("emptyBannerTitle");
    if (s) s.innerHTML = tx("emptyBannerCopy");
    emptyBanner.hidden = state.beds.length > 0;
  }

  renderBeds();
  renderWarnings(L);
  renderSummary();
  renderFooter();

  // clic sulle aiuole
  document.querySelectorAll(".bedhit").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.dataset.bed);
      if (state.selected === idx) {
        state.selected = -1;
        closePlantDetailPanel();
      } else {
        state.selected = idx;
        render();
        openPlantDetailPanel();
      }
    });
  });
}
function legend(items) {
  return items
    .map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`)
    .join("");
}

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
    })
  );
  bl.querySelectorAll("[data-del]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const i = parseInt(el.dataset.del);
      state.beds.splice(i, 1);
      state.autoPlan = false;
      if (state.selected >= state.beds.length) state.selected = -1;
      autoBalanceLayout(true, false);
      saveConfig(true);
      render();
    })
  );
}

function headerScrollOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-h")
    .trim();
  const navHeight = parseFloat(raw) || 66;
  return navHeight + 12;
}

function scrollElementBelowHeader(target, behavior = "smooth") {
  if (!target) return;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerScrollOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior
  });
}

function isResponsiveConfiguratorLayout() {
  return window.matchMedia("(max-width: 1080px)").matches;
}

function scrollPlantDetailPanelIntoView(behavior = "smooth") {
  scrollElementBelowHeader(
    document.getElementById("panelPlantDetail"),
    behavior
  );
}

function scrollGreenhouseImageIntoView(behavior = "auto") {
  const target =
    document.querySelector(".stage .scene-wrap") ||
    document.getElementById("scene") ||
    document.querySelector(".stage");
  scrollElementBelowHeader(target, behavior);
}

function collapseSettingsPanelAfterAutoPlan() {
  const panel = document.getElementById("panelSettings");
  if (!panel || !isResponsiveConfiguratorLayout()) return;
  panel.classList.add("is-collapsed");
  updateAllPanelToggles();
  requestAnimationFrame(() => scrollGreenhouseImageIntoView("smooth"));
}

/* All'ingresso dalla homepage con una persona già scelta (mobile/tablet),
   porta lo scroll all'inizio del blocco "Come funziona" specifico per quel
   livello, invece di lasciare il testo tagliato dall'header. */
function scrollToGuidedIntroForLivello(liv) {
  if (!isResponsiveConfiguratorLayout()) return;
  const selectors = {
    novizio: ".guided-intro-novizio",
    intermedio: ".guided-intro-intermedio",
    esperto: ".guided-intro-esperto"
  };
  const sel = selectors[liv];
  if (!sel) return;
  window.setTimeout(() => {
    const target = document.querySelector(sel);
    if (target) scrollElementBelowHeader(target, "smooth");
  }, 200);
}

function openSettingsPanelAndFocusDimensions() {
  const panel = document.getElementById("panelSettings");
  if (!panel) return;
  panel.classList.remove("is-collapsed");
  updateAllPanelToggles();
  requestAnimationFrame(() => {
    scrollElementBelowHeader(panel, "smooth");
    const inW = document.getElementById("inW");
    if (inW) {
      inW.focus({ preventScroll: true });
      panel.classList.add("guided-highlight");
      window.setTimeout(() => panel.classList.remove("guided-highlight"), 1600);
    }
  });
}

function openPlantDetailPanel() {
  const panel = document.getElementById("panelPlantDetail");
  const settings = document.getElementById("panelSettings");
  if (!panel) return;
  renderPlantDetailPanel();
  panel.hidden = false;
  if (settings) settings.classList.add("is-collapsed");
  updateAllPanelToggles();
  requestAnimationFrame(() => scrollPlantDetailPanelIntoView("smooth"));
}

function closePlantDetailPanel() {
  const panel = document.getElementById("panelPlantDetail");
  const settings = document.getElementById("panelSettings");
  const keepGreenhouseRow =
    isResponsiveConfiguratorLayout() && panel && !panel.hidden;
  if (panel) panel.hidden = true;
  if (settings) settings.classList.remove("is-collapsed");
  updateAllPanelToggles();
  state.selected = -1;
  render();
  if (keepGreenhouseRow) {
    requestAnimationFrame(() => scrollGreenhouseImageIntoView("auto"));
  }
}

function renderPlantDetailPanel() {
  const container = document.getElementById("pdpContent");
  if (!container) return;
  if (state.selected < 0 || state.selected >= state.beds.length) {
    container.innerHTML = "";
    return;
  }
  const b = state.beds[state.selected];
  const p = BYID[b.plantId];
  const resaTot = b.count * p.resa;
  const photoSrc = PLANT_PHOTOS[p.id] || `assets/img/svg/${p.id}.svg`;
  const desc = (PLANT_DESC[state.lang] || PLANT_DESC.it)[p.id] || "";
  const months = [...effectiveMonths(p)]
    .sort((a, b) => a - b)
    .map((m) => monthName(m).slice(0, 3))
    .join(", ");
  const amiche = p.amiche.map(plantNameById).filter(Boolean);
  const sow = localizedSowingGuide(p);
  const nota = p.nota || "";
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

  // abbinamenti
  const nemiche = p.nemiche ? p.nemiche.map(plantNameById).filter(Boolean) : [];

  // segmenti della barra mesi
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
          outside: tx("monthOutside")
        }
      : {
          title: tx("sowingZone"),
          available: tx("monthAvailable"),
          selected: tx("monthSelected"),
          outside: tx("monthOutside")
        };
  const monthSegs = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    const title = `${monthName(i + 1)} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
    return `<div class="pdp-month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}"></div>`;
  }).join("");

  // tipo
  const tipoEntry = CAT_ORDER.find((c) => c.ids.includes(p.id));
  const tipoLabel = tipoEntry ? tx(`vegCat_${tipoEntry.key}`) : "";

  const soleIcon = p.sole === "pieno" ? "☀️" : "🌤️";
  const soleLabel = p.sole === "pieno" ? tx("fullSun") : tx("halfShade");
  const acquaIcon =
    p.acqua === "alta" ? "💧💧💧" : p.acqua === "media" ? "💧💧" : "💧";
  const svgSpacing = spacingInfographicSvg(p);

  container.innerHTML = `
    <div class="pdp-hero-wrap">
      <img class="pdp-photo-full" src="${photoSrc}" alt="${plantText(p, "nome")}"
           onerror="this.src='assets/img/svg/${p.id}.svg'">
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
      <div class="detail-badges">
        <span class="badge badge--sun">${soleIcon} ${soleLabel}</span>
        <span class="badge badge--water">${acquaIcon} ${waterLabel(p.acqua)}</span>
        ${tipoLabel ? `<span class="badge badge--type" style="background:rgba(45,106,79,.1);color:#1b4332">${tipoLabel}</span>` : ""}
      </div>
      ${desc ? `<div class="detail-nota">${desc}</div>` : nota ? `<div class="detail-nota">${nota}</div>` : ""}
      <div class="detail-spacing">
        <div class="detail-spacing-header">
          <span class="detail-tile-label">${tx("distance")}</span>
          <b class="detail-spacing-val">${spacingValue(p)}</b>
        </div>
        ${svgSpacing ? `<div class="detail-spacing-diagram">${svgSpacing}</div>` : ""}
      </div>
      <div class="detail-stats">
        <div class="detail-tile detail-tile--harvest">
          <div class="detail-tile-icon">⏱</div>
          <div class="detail-tile-label">${tx("harvest")}</div>
          <div class="detail-tile-value">${harvestValue(p)}</div>
          ${p.gg ? `<div class="detail-tile-sub">${tx("detailHarvestSub")}</div>` : ""}
        </div>
        <div class="detail-tile detail-tile--yield">
          <div class="detail-tile-icon">⚖</div>
          <div class="detail-tile-label">${tx("yieldPlant")}</div>
          <div class="detail-tile-value">${yieldLabel(p.resa)}</div>
          <div class="detail-tile-sub">${tx("detailYieldSub")}</div>
        </div>
        <div class="detail-tile detail-tile--height">
          <div class="detail-tile-icon">↕</div>
          <div class="detail-tile-label">${tx("height")}</div>
          <div class="detail-tile-value">${heightLabel(p.h || "media")}</div>
        </div>
        <div class="detail-tile" style="border-top:3px solid #b7e4c7">
          <div class="detail-tile-icon">💧</div>
          <div class="detail-tile-label">${tx("water")}</div>
          <div class="detail-tile-value">${waterLabel(p.acqua)}</div>
        </div>
      </div>
      ${
        months || allMonths.length
          ? `
      <div class="month-bar">
        <div class="month-bar-head">
          <span>${monthLegend.title}</span>
          <b>${activeMonthsLabel}</b>
        </div>
        <div class="month-segments" aria-label="${monthLegend.title}">
          ${Array.from({ length: 12 }, (_, i) => {
            const on = effectiveMonths(p).has(i + 1);
            const cur = i + 1 === state.mese;
            const title = `${monthName(i + 1)} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
            return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}">
              <span class="month-seg-abbr">${monthName(i + 1).slice(0, 3)}</span>
            </div>`;
          }).join("")}
        </div>
        <div class="month-bar-legend" aria-hidden="true">
          <span><i class="month-legend-dot month-legend-dot--active"></i>${monthLegend.available}</span>
          <span><i class="month-legend-dot month-legend-dot--current"></i>${monthLegend.selected}</span>
        </div>
      </div>`
          : ""
      }
      ${
        amiche.length || nemiche.length
          ? `
      <div class="detail-companions">
        ${
          amiche.length
            ? `
        <div class="detail-companions-group">
          <div class="detail-companions-label">💚 ${tx("friends")}</div>
          <div class="companion-list">${amiche.map((n) => `<span class="companion-chip friend">${n}</span>`).join("")}</div>
        </div>`
            : ""
        }
        ${
          nemiche.length
            ? `
        <div class="detail-companions-group">
          <div class="detail-companions-label detail-companions-label--foe">⚠️ ${tx("enemies")}</div>
          <div class="companion-list">${nemiche.map((n) => `<span class="companion-chip foe">${n}</span>`).join("")}</div>
        </div>`
            : ""
        }
      </div>`
          : ""
      }
      ${
        sow
          ? `
      <details class="detail-sow">
        <summary class="detail-sow-header">
          <span>${tx("howToSow")}</span>
          <span class="detail-sow-icon">+</span>
        </summary>
        <div class="detail-sow-body">
          ${sow.method ? `<div class="detail-sow-row"><b>🌱 ${tx("sowMethod")}</b> — ${sow.method}</div>` : ""}
          ${sow.depth ? `<div class="detail-sow-row"><b>📏 ${tx("sowDepth")}</b> — ${sow.depth}</div>` : ""}
          ${sow.thin ? `<div class="detail-sow-row"><b>📐 ${tx("sowThin")}</b> — ${sow.thin}</div>` : ""}
          ${sow.tip || nota ? `<blockquote class="detail-sow-tip">💡&nbsp;${sow.tip || nota}</blockquote>` : ""}
        </div>
      </details>`
          : nota
            ? `
      <details class="detail-sow">
        <summary class="detail-sow-header">
          <span>${tx("howToSow")}</span>
          <span class="detail-sow-icon">+</span>
        </summary>
        <div class="detail-sow-body">
          <blockquote class="detail-sow-tip">💡&nbsp;${nota}</blockquote>
        </div>
      </details>`
            : ""
      }
    </div>
  `;
}

function renderWarnings(L) {
  const w = document.getElementById("warnings");
  if (!w) return;
  let out = "";
  // incompatibilità
  const ids = state.beds.map((b) => b.plantId);
  const seen = new Set(),
    pairs = [];
  for (let i = 0; i < state.beds.length; i++)
    for (let j = i + 1; j < state.beds.length; j++) {
      const a = BYID[ids[i]],
        b = BYID[ids[j]];
      if (a.nemiche.includes(b.id) || b.nemiche.includes(a.id)) {
        const key = [a.id, b.id].sort().join("|");
        if (!seen.has(key)) {
          seen.add(key);
          pairs.push([plantText(a, "nome"), plantText(b, "nome")]);
        }
      }
    }
  pairs.forEach(([a, b]) => {
    out += `<div class="warn bad"><span class="i">⚠️</span><div>${tx("badCompanion", { a, b })}</div></div>`;
  });
  if (L.overflow)
    out += `<div class="warn bad"><span class="i">📏</span><div>${tx("overflowWarning")}</div></div>`;
  // suggerimenti amiche presenti
  const goodPairs = [];
  const seen2 = new Set();
  for (let i = 0; i < state.beds.length; i++)
    for (let j = i + 1; j < state.beds.length; j++) {
      const a = BYID[ids[i]],
        b = BYID[ids[j]];
      if (a.amiche.includes(b.id) || b.amiche.includes(a.id)) {
        const key = [a.id, b.id].sort().join("|");
        if (!seen2.has(key)) {
          seen2.add(key);
          goodPairs.push([plantText(a, "nome"), plantText(b, "nome")]);
        }
      }
    }
  if (goodPairs.length) {
    const ex = goodPairs
      .slice(0, 2)
      .map(([a, b]) => a + " + " + b)
      .join(", ");
    out += `<div class="warn tip"><span class="i">🤝</span><div>${tx(
      "goodCompanions",
      {
        pairs: `${ex}${goodPairs.length > 2 ? "…" : ""}`
      }
    )}</div></div>`;
  }
  w.innerHTML = out;
}

function renderSummary() {
  const s = document.getElementById("summary"),
    shop = document.getElementById("shop");
  if (state.beds.length === 0) {
    s.innerHTML = tx("addEstimate");
    shop.innerHTML = "";
    const guidedSummary = document.getElementById("guidedSummary");
    if (guidedSummary) guidedSummary.textContent = "";
    const slotEmpty = document.getElementById("cartBtnSlot");
    if (slotEmpty) slotEmpty.innerHTML = "";
    const yieldBadgeEmpty = document.getElementById("yieldToggleBadge");
    if (yieldBadgeEmpty) yieldBadgeEmpty.textContent = "";
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
      yield: yieldLabel(kg)
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
      yield: yieldLabel(kg)
    });
  }
  shop.innerHTML = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      const packs = Math.max(
        1,
        Math.ceil(b.count / (PACK_DATA[b.plantId]?.seeds ?? 100))
      );
      const packLabel =
        packs === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: packs });
      const emoji = FRUIT_EMOJI[p.id] || "🌱";
      return `<li>
        <span class="shop-emoji" role="img" aria-hidden="true">${emoji}</span>
        <span class="shop-plant">
          <b>${plantText(p, "nome")}</b>
          <small>${tx("shoppingItem", { count: b.count })}</small>
        </span>
        <span class="shop-pack">${packLabel}</span>
      </li>`;
    })
    .join("");

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

  renderPrintSummary();
}

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
    total: tx("print.total")
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
    0
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
                `<tr><td>${plantText(BYID[b.plantId], "nome")}</td><td>${b.count}</td></tr>`
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
      </section>
    </div>`;
}

/* Riempimento automatico: inserimento e ottimizzazione delle colture. */
function countForPlant(p, targetRows = 2) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d; // distanza tra file, usata nella larghezza
  const cols = maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
  return Math.max(1, cols * targetRows);
}

function rowSizeForPlant(p) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d; // distanza tra file, usata nella larghezza
  return maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
}

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
  salvia: 2
};

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

function targetVarietyCount(candidatesLength) {
  const area = state.larghezza * state.lunghezza;
  let target = 5;
  if (area >= 30) target = 7;
  if (area >= 55) target = 9;
  if (area >= 80) target = 11;
  return Math.min(candidatesLength, target);
}

function canUseFilaLayout(p) {
  // Solo piante che arrampicano davvero (rampicante E alta): fagiolo, cetriolo.
  // Fagiolino nano (rampicante, h=media) e pisello (rampicante, h=media) restano in blocco.
  return (
    state.larghezza >= 4.2 &&
    state.lunghezza >= 4.8 &&
    p.arch === "rampicante" &&
    p.h === "alta"
  );
}

function countForFilaPlant(p) {
  const Li = state.lunghezza * 100;
  const Sc = p.dr || p.d; // passo tra file affiancate (X)
  const filesAcross = maxSlotsForSpan(usableBedWidth() - 2 * BEDPAD, Sc);
  const plantsPerFile = maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, p.d);
  return filesAcross * plantsPerFile;
}

function defaultCount(p) {
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, targetRowsForPlant(p))
  );
}

function starterCountForAutoPlant(p, useFila = false) {
  if (useFila) return countForFilaPlant(p);
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, Math.min(targetRowsForPlant(p), 2))
  );
}

function rememberSelection() {
  return state.selected >= 0 && state.selected < state.beds.length
    ? state.beds[state.selected].plantId
    : null;
}

function restoreSelection(plantId) {
  state.selected = plantId
    ? state.beds.findIndex((bed) => bed.plantId === plantId)
    : -1;
}

function normalizeSavedBeds(beds) {
  if (!Array.isArray(beds)) return [];
  const seen = new Set();
  return beds
    .map((bed) => {
      const p = BYID[bed?.plantId];
      const savedLayout = bed?.layout === "fila" ? "fila" : "blocco";
      // Corregge layout salvati errati: se la pianta non è idonea al layout fila, usa blocco
      const layout =
        savedLayout === "fila" && p && !canUseFilaLayout(p)
          ? "blocco"
          : savedLayout;
      return {
        plantId: bed?.plantId,
        count: Math.max(1, Math.round(parseInt(bed?.count) || 1)),
        layout
      };
    })
    .filter((bed) => {
      if (!BYID[bed.plantId] || seen.has(bed.plantId)) return false;
      seen.add(bed.plantId);
      return true;
    });
}

function sortBedsForLayout() {
  state.beds.sort((a, b) => {
    const pa = BYID[a.plantId];
    const pb = BYID[b.plantId];
    return (
      Number(b.layout === "fila") - Number(a.layout === "fila") ||
      H_RANK[pa.h] - H_RANK[pb.h] ||
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
        0
      );
      const score =
        (last && areIncompatible(p, last) ? 1000 : 0) +
        conflictsWithPlaced * 30 -
        (last && areCompanions(p, last) ? 12 : 0) +
        H_RANK[p.h] * 4 +
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

function shrinkOverflowToFit() {
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const candidates = state.beds
      .map((b, index) => ({ ...b, index, plant: BYID[b.plantId] }))
      .filter((b) => b.layout !== "fila");

    // Aiuole con più di una fila completa: riducile per prime.
    const reducible = candidates
      .filter(
        (b) =>
          b.count >
          Math.max(rowSizeForPlant(b.plant), minimumCountForPlant(b.plant))
      )
      .sort((a, b) => b.count - a.count || b.plant.d - a.plant.d);

    if (reducible.length > 0) {
      const largest = reducible[0];
      const step = rowSizeForPlant(largest.plant);
      const minCount = Math.max(
        rowSizeForPlant(largest.plant),
        minimumCountForPlant(largest.plant)
      );
      state.beds[largest.index].count = Math.max(
        minCount,
        largest.count - step
      );
    } else {
      // Tutte le aiuole sono già al minimo: rimuovi quella con ingombro maggiore.
      const toRemove = candidates.sort(
        (a, b) => b.plant.d - a.plant.d || b.count - a.count
      )[0];
      if (!toRemove) break;
      state.beds.splice(toRemove.index, 1);
    }
    guard++;
  }
}

function expandFilaBedsToLength() {
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (bed.layout === "fila" && plant && canUseFilaLayout(plant)) {
      bed.count = countForFilaPlant(plant);
    }
  });
}

function enforceMinimumBedCounts() {
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant || bed.layout === "fila") return;
    const minCount = minimumCountForPlant(plant);
    if (bed.count >= minCount) return;
    const before = bed.count;
    bed.count = minCount;
    if (computeLayout().overflow) bed.count = before;
  });
}

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
  });
}

function autoBalanceLayout(keepSelection = true, expandToSpace = true) {
  const selectedPlant = keepSelection ? rememberSelection() : null;
  // expandFilaBedsToLength va chiamata sempre (non solo quando expandToSpace=true)
  // perché usableBedWidth() dipende da state.beds.length: aggiungendo o rimuovendo
  // una pianta il numero di colonne cambia e il count corretto per le file si aggiorna.
  // Senza questo ricalcolo, il count salvato è quello di una colonna più larga e
  // provoca overflow non appena si aggiunge una seconda pianta in modalità manuale.
  expandFilaBedsToLength();
  if (expandToSpace) enforceMinimumBedCounts();
  sortBedsForLayout();
  shrinkOverflowToFit();
  if (expandToSpace) expandAutoFillToSpace();
  // Riordina per tenere le piante alte dietro a quelle basse (ordine anti-ombra).
  sortBedsForLayout();
  if (expandToSpace) expandAutoFillToSpace();
  shrinkOverflowToFit();
  restoreSelection(selectedPlant);
}

function addPlant(id) {
  if (state.beds.some((b) => b.plantId === id)) return;
  const p = BYID[id];
  if (!p) return;
  const useFila =
    canUseFilaLayout(p) && !state.beds.some((bed) => bed.layout === "fila");
  state.beds.push({
    plantId: id,
    count: useFila ? countForFilaPlant(p) : defaultCount(p),
    layout: useFila ? "fila" : "blocco"
  });
  state.autoPlan = false;
  state.selected = state.beds.findIndex((b) => b.plantId === id);
  // expandToSpace=false: in modalità manuale il sistema non espande le piante
  // esistenti né applica i conteggi minimi forzati — altrimenti enforceMinimumBedCounts
  // + expandAutoFillToSpace riempiono lo spazio, shrinkOverflowToFit rimuove
  // una pianta già presente e l'utente vede una sostituzione invece di un'aggiunta.
  autoBalanceLayout(true, false);
  saveConfig(true);
  render();
}

function removePlantById(id) {
  const index = state.beds.findIndex((b) => b.plantId === id);
  if (index < 0) return;
  state.beds.splice(index, 1);
  state.autoPlan = false;
  if (state.selected === index) state.selected = -1;
  else if (state.selected > index) state.selected -= 1;
  // expandToSpace=false: rimuovere una pianta non deve far espandere le piante rimanenti,
  // simmetricamente a addPlant che usa lo stesso flag.
  autoBalanceLayout(true, false);
  saveConfig(true);
  render();
}

function refreshForSeasonChange() {
  if (state.autoPlan || state.beds.length === 0) {
    autoFill();
  } else {
    autoBalanceLayout(true, false);
    render();
  }
}

function fillSelectedPlants() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  state.autoPlan = false;
  resetSelectedCropCountsForOptimization();
  autoBalanceLayout(true, true);
  saveConfig(true);
  render();
}

function compactPathForAutoFill() {
  if (state.larghezza >= 6 && state.lunghezza >= 7)
    return Math.min(state.path, 45);
  if (state.larghezza >= 4.2 && state.lunghezza >= 6)
    return Math.min(state.path, 50);
  return state.path;
}

function refreshAutoPlanForGeometry(compactPaths = true) {
  if (state.autoPlan) {
    autoFill({ compactPaths });
    return;
  }
  saveConfig(true);
  autoBalanceLayout(true, true);
  render();
}

function layoutWasteScore(layout = computeLayout()) {
  const target = layout.Li - MARGIN;
  const gaps = layout.columnHeights.map((h) => Math.max(0, target - h));
  const squaredGaps = gaps.reduce((sum, gap) => sum + gap * gap, 0);
  return squaredGaps + Math.max(...gaps, 0) * 25;
}

function cloneBedsSnapshot() {
  return state.beds.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout
  }));
}

function restoreBedsSnapshot(snapshot) {
  state.beds = snapshot.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout
  }));
}

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

function expandAutoFillToSpace() {
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
        (item) => item.plant && item.bed.layout !== "fila" && item.layoutBed
      )
      .sort((a, b) => {
        const ah = currentLayout.columnHeights[a.layoutBed.columnIndex] || 0;
        const bh = currentLayout.columnHeights[b.layoutBed.columnIndex] || 0;
        return ah - bh || a.plant.d - b.plant.d || a.index - b.index;
      });

    for (const item of candidates) {
      const before = state.beds[item.index].count;
      state.beds[item.index].count += rowSizeForPlant(item.plant);
      const nextLayout = computeLayout();
      if (!nextLayout.overflow) {
        const nextScore = fillScore(nextLayout);
        if (!best || nextScore < best.score) {
          best = {
            index: item.index,
            count: state.beds[item.index].count,
            score: nextScore
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    guard++;
  }

  // Phase 2: fine-tuning with +1 plant at a time to fill the last sub-row gap.
  // The main loop above can only add a full row (rowSizeForPlant plants) at once.
  // If the remaining gap is smaller than one row's height, the main loop stops
  // and leaves empty soil. This pass fills that leftover space one plant at a time.
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
        (item) => item.plant && item.bed.layout !== "fila" && item.layoutBed
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
            score: nextScore
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    fineGuard++;
  }
}

/* ======================================================================
   SELEZIONE AUTOMATICA DELLE COLTURE (auto-riempimento)
   La scelta è consapevole del profilo utente (state.livello) e usa come
   unica fonte di verità la mappa DIFFICULTY (1=facile, 2=media, 3=difficile/
   esotica), completa su tutte le colture:
   - novizio  → solo colture facili/medie (difficoltà ≤ 2);
   - intermedio/esperto → tutto il catalogo stagionale, con le colture
     difficili ed esotiche spinte in fondo alla lista.
   ====================================================================== */

// Ortaggi comuni e gratificanti: hanno priorità a parità di difficoltà.
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
  "origano"
];

// Difficoltà di una coltura (1-3); fallback prudente a 3 se non classificata.
function autoDifficulty(p) {
  return DIFFICULTY[p.id] || 3;
}

// Punteggio di selezione: più basso = scelto prima.
function autoCropScore(p) {
  // Le colture facili vengono prima, le esotiche/difficili per ultime.
  let s = autoDifficulty(p) * 60;
  // I grandi classici hanno una spinta in più, nel loro ordine.
  const pref = AUTO_PREFERRED.indexOf(p.id);
  if (pref >= 0) s -= 130 - pref;
  // Qualità: premia resa alta e raccolta veloce.
  s -= Math.min(p.resa || 0, 5) * 3;
  s += Math.min(p.gg || 120, 200) * 0.04;
  return s;
}

// Pool di candidati ordinato, filtrato in base al profilo utente.
function autoCandidatePool() {
  const seasonal = seminabili();
  let pool;
  if (state.livello === "novizio") {
    // Solo colture facili o medie esplicitamente classificate (≤ 2).
    pool = seasonal.filter((p) => autoDifficulty(p) <= 2);
    // In stagioni povere allarga fino alle difficili (≤ 3), mai alle esotiche.
    if (pool.length < 4) pool = seasonal.filter((p) => autoDifficulty(p) <= 3);
  } else {
    pool = seasonal.slice();
  }
  return pool.sort(
    (a, b) =>
      autoCropScore(a) - autoCropScore(b) ||
      a.nome.localeCompare(b.nome, "it", { sensitivity: "base" })
  );
}

function autoFill(options = {}) {
  const { compactPaths = true } = options;
  state.autoPlan = true;
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
      layout: useFila ? "fila" : "blocco"
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
      areIncompatible(p, BYID[bed.plantId])
    );
    const hasCompatibleAlternative = sortedCandidates.some(
      (candidate) =>
        candidate.id !== p.id &&
        !state.beds.some((bed) => bed.plantId === candidate.id) &&
        !state.beds.some((bed) => areIncompatible(candidate, BYID[bed.plantId]))
    );
    if (conflicts && hasCompatibleAlternative) {
      skippedConflicts.push(p);
      continue;
    }
    addAutoCandidate(p);
  }
  // Secondo passaggio: aggiunge piante saltate solo se non creano nuove
  // incompatibilità con le piante già inserite. In questo modo la serra
  // viene riempita da expandAutoFillToSpace (più esemplari delle colture
  // compatibili già presenti) anziché da piante che non si amano.
  // Se dopo questo passaggio ci sono ancora meno varietà del target,
  // viene fatto un terzo tentativo accettando al massimo 1 conflitto per
  // pianta (caso di stagioni con pool molto ristretto).
  for (const p of skippedConflicts) {
    if (state.beds.length >= minVarieties) break;
    if (state.beds.some((bed) => bed.plantId === p.id)) continue;
    const newConflicts = state.beds.filter((bed) =>
      areIncompatible(p, BYID[bed.plantId])
    ).length;
    if (newConflicts > 0) continue; // salta: creerebbe incompatibilità
    addAutoCandidate(p);
  }
  // Terzo passaggio di emergenza: se le varietà sono ancora pochissime
  // (meno della metà del target), accetta piante con al massimo 1 conflitto
  // per non lasciare serre grandi quasi vuote.
  if (state.beds.length < Math.ceil(minVarieties / 2)) {
    for (const p of skippedConflicts) {
      if (state.beds.length >= Math.ceil(minVarieties / 2)) break;
      if (state.beds.some((bed) => bed.plantId === p.id)) continue;
      const newConflicts = state.beds.filter((bed) =>
        areIncompatible(p, BYID[bed.plantId])
      ).length;
      if (newConflicts <= 1) addAutoCandidate(p);
    }
  }
  if (state.beds.length === 0 && candidates.length) {
    const p = candidates[0];
    state.beds.push({
      plantId: p.id,
      count: minimumCountForPlant(p),
      layout: "blocco"
    });
    if (computeLayout().overflow) {
      state.beds.pop();
    } else {
      state.beds[0].count = Math.max(
        minimumCountForPlant(p),
        countForPlant(p, 1)
      );
      if (computeLayout().overflow)
        state.beds[0].count = minimumCountForPlant(p);
    }
  }
  // Ricalcola i conteggi iniziali con il layout a colonne definitivo.
  // Durante la selezione ogni pianta viene aggiunta una alla volta: le prime
  // usano usableBedWidth() monocolonna (più larga) e ottengono conteggi gonfiati.
  // Ora che state.beds è completo il numero di colonne è stabile; azzerare i
  // conteggi allo starter corretto lascia a expandAutoFillToSpace il compito
  // di riempire lo spazio in modo uniforme — esattamente come fa fillSelectedPlants.
  // Nota: non usiamo resetSelectedCropCountsForOptimization() perché quella
  // funzione permette una sola aiuola fila (!hasFila), mentre autoFill può
  // piazzarne fino a filaSlots (layoutColumns - 1). Il layout assegnato da
  // addAutoCandidate viene preservato; si ricalcola solo il conteggio.
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    bed.count =
      bed.layout === "fila"
        ? countForFilaPlant(plant)
        : starterCountForAutoPlant(plant, false);
  });
  // Usa la stessa sequenza di autoBalanceLayout(true, true) usata da "ottimizza colture":
  // expandFilaBedsToLength → enforceMinimumBedCounts → sort → shrink → expand → sort
  // → expand → shrink. Questo gestisce tutti i casi edge (overflow da companion bonds,
  // conteggi minimi, piante fila) in modo identico al pulsante ottimizza.
  autoBalanceLayout(false, true);
  // Allinea il primo piano automatico alla stessa base usata dal pulsante
  // "Ottimizza colture scelte". In alcuni ingressi guidati i conteggi iniziali
  // restavano troppo bassi e lasciavano terra libera; questo secondo passaggio
  // viene tenuto solo se migliora davvero il riempimento e non crea overflow.
  finalizeAutoFillWithOptimizeBaseline();
  state.selected = -1;
  saveConfig(true);
  render();
}
function loadPreset(key) {
  if (!PRESETS[key]) return;
  state.beds = PRESETS[key].map(([id, cnt]) => ({
    plantId: id,
    count: cnt,
    layout: "blocco"
  }));
  state.autoPlan = false;
  autoBalanceLayout(false, true);
  saveConfig(true);
  render();
}

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
        Math.ceil(b.count / (PACK_DATA[b.plantId]?.seeds ?? 100))
      )
    }));
  try {
    localStorage.setItem("ois.cart", JSON.stringify(items));
  } catch (_) {}
  loadConfCart();
  showConfCartNudge(items.length);
  setTimeout(openConfCart, 500);
}

function importCartToPlan() {
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
  } catch (_) {
    raw = [];
  }
  const ids = raw.map((i) => (typeof i === "string" ? i : i.id));
  const uniqueIds = ids.filter(
    (id, index) => BYID[id] && ids.indexOf(id) === index
  );
  if (!uniqueIds.length) return false;
  let hasFila = false;
  state.beds = uniqueIds.map((id) => {
    const plant = BYID[id];
    const useFila = canUseFilaLayout(plant) && !hasFila;
    if (useFila) hasFila = true;
    return {
      plantId: id,
      count: useFila ? countForFilaPlant(plant) : defaultCount(plant),
      layout: useFila ? "fila" : "blocco"
    };
  });
  state.autoPlan = false;
  state.selected = state.beds.length ? 0 : -1;
  vegFilter = "in";
  autoBalanceLayout(true, true);
  saveConfig(true);
  render();
  setMode("expert", false);
  focusManualPlanningPath();
  return true;
}

function focusManualPlanningPath() {
  window.setTimeout(() => {
    const crops = document.getElementById("panelCustomize");
    if (crops) {
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-h"
        ) || "66",
        10
      );
      const top =
        crops.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: "smooth" });
      crops.classList.add("is-focus-pulse");
      window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    }
  }, 120);
}

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
    focusManualPlanningPath();
    clearBootParams();
    return true;
  }
  if (shouldImportCart() && importCartToPlan()) {
    clearBootParams();
    return true;
  }
  const preset = requestedBootPreset();
  if (!preset) return false;
  // Per l'avvio guidato, ripristina la serra alla misura predefinita 3x5 m così le piante
  // del preset ci stanno sempre e il messaggio "ti ho preparato un orto" è vero.
  if (isGuidedBoot()) {
    state.larghezza = 3;
    state.lunghezza = 5;
    syncSizeControls();
  }
  loadPreset(preset);
  if (isGuidedBoot()) state.autoPlan = true;
  clearBootParams();
  return true;
}

/* Eventi: collegamento di form, pulsanti, tab, filtri e azioni sulla scena. */
function fillMonths() {
  const sel = document.getElementById("inMese");
  sel.innerHTML = (MONTHS[state.lang] || MONTHS.it)
    .map((m, i) => `<option value="${i + 1}">${m}</option>`)
    .join("");
  sel.value = state.mese;
}

function initEvents() {
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
  document.getElementById("inOverlay").addEventListener("change", (e) => {
    state.overlay = e.target.value;
    syncOverlaySelectLabel();
    render();
  });
  document.getElementById("inPreset").addEventListener("change", (e) => {
    if (e.target.value) {
      loadPreset(e.target.value);
      setMode("expert", false);
      e.target.value = "";
    }
  });
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
      applyPath(parseInt(e.target.value) || state.path)
    );
  document.getElementById("btnRipristina").addEventListener("click", () => {
    saveConfig(true);
    setMode("fit", false);
    autoFill();
    collapseSettingsPanelAfterAutoPlan();
  });
  document
    .getElementById("btnFillSelected")
    .addEventListener("click", fillSelectedPlants);
  document.getElementById("btnClear").addEventListener("click", () => {
    const msg =
      state.lang === "ro"
        ? "Golești sera? Folosește «Umple sera» pentru a o reface."
        : "Svuoti la serra? Usa «Riempi la serra» per riportarla com'era.";
    if (!confirm(msg)) return;
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    saveConfig(true);
    render();
  });
  // Controlli +/-
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
      Math.min(isNaN(max) ? Infinity : max, raw)
    );
    input.value = Math.round(clamped * 100) / 100;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // CTA del percorso novizio: apre/evidenzia il pannello "La tua serra"
  const guidedNovCta = document.getElementById("guidedNovCta");
  if (guidedNovCta) {
    guidedNovCta.addEventListener("click", () => {
      openSettingsPanelAndFocusDimensions();
    });
  }

  // Pulsante accordion del pannello
  document.querySelectorAll(".panel-toggle").forEach((btn) => {
    updatePanelToggle(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const panel = btn.closest(".panel");
      panel.classList.toggle("is-collapsed");
      updatePanelToggle(btn);
    });
  });

  // Clic sull'intestazione del pannello (riga intera cliccabile)
  document.querySelectorAll(".panel-title-row, .panel-head").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("button, select, input, label, .stepper")) return;
      const panel = row.closest(".panel");
      const btn = panel.querySelector(".panel-toggle");
      if (btn) btn.click();
    });
  });

  // Le impostazioni restano aperte nelle modalità che le usano: sono il primo
  // controllo utile per chi adatta o personalizza la serra.
  document.getElementById("btnStampa").addEventListener("click", () => {
    renderPrintSummary();
    window.print();
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
      const crops = document.getElementById("panelCustomize");
      if (crops) {
        window.requestAnimationFrame(() => {
          const navH = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-h"
            ) || "66",
            10
          );
          const top =
            crops.getBoundingClientRect().top + window.scrollY - navH - 12;
          window.scrollTo({ top, behavior: "smooth" });
          crops.classList.add("is-focus-pulse");
          window.setTimeout(
            () => crops.classList.remove("is-focus-pulse"),
            1600
          );
        });
      }
    });
  // delega su lista seminabili
  document.getElementById("vegList").addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) addPlant(addBtn.dataset.add);
    const removeBtn = e.target.closest("[data-remove-plant]");
    if (removeBtn) removePlantById(removeBtn.dataset.removePlant);
    const stepBtn = e.target.closest("[data-veg-cnt]");
    if (stepBtn) {
      const id = stepBtn.dataset.vegPlant;
      const delta = parseInt(stepBtn.dataset.vegCnt);
      const bed = state.beds.find((b) => b.plantId === id);
      if (bed) {
        bed.count = Math.max(1, bed.count + delta);
        state.autoPlan = false;
        autoBalanceLayout(true, false);
        saveConfig(true);
        render();
      }
    }
  });

  // filtri piante
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      vegFilter = tab.dataset.filter;
      renderVegList();
    });
  });

  // modale avvio
  document.querySelectorAll("#zoneOpts .opt").forEach((o) =>
    o.addEventListener("click", () => {
      document
        .querySelectorAll("#zoneOpts .opt")
        .forEach((x) => x.classList.remove("on"));
      o.classList.add("on");
      state.zona = o.dataset.zone;
      syncClimateControls();
    })
  );
  document.getElementById("startBtn")?.addEventListener("click", () => {
    state.zona =
      document.querySelector("#zoneOpts .opt.on")?.dataset.zone ?? state.zona;
    state.riscaldata =
      document.getElementById("heatedChk")?.checked ?? state.riscaldata;
    state.larghezza = Math.max(
      1,
      parseFloat(document.getElementById("startW")?.value) || state.larghezza
    );
    state.lunghezza = Math.max(
      1,
      parseFloat(document.getElementById("startL")?.value) || state.lunghezza
    );
    syncSizeControls();
    syncClimateControls();
    saveConfig(true);
    setStartModalVisible(false);
    if (!applyBootIntent()) autoFill();
  });
}

function initConfig() {
  const saved = readSavedConfig();
  const sharedLang = localStorage.getItem("ois.lang");
  const hasSharedLang = sharedLang === "it" || sharedLang === "ro";
  if (saved) {
    if (saved.lang === "it" || saved.lang === "ro") state.lang = saved.lang;
    if (["freddo", "temperato", "caldo"].includes(saved.zona)) {
      state.zona = saved.zona;
    }
    state.riscaldata = Boolean(saved.riscaldata);
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
    if (LIVELLI.has(saved.livello)) state.livello = saved.livello;
    state.beds = normalizeSavedBeds(saved.beds);
    autoBalanceLayout(true, false);
  }
  if (hasSharedLang) state.lang = sharedLang;
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  if (saved && hasSharedLang && saved.lang !== state.lang)
    saveConfig(Boolean(saved.done));
  setStartModalVisible(!saved?.done && !isGuidedBoot() && !isFreeProjectBoot());
}

/* Carrello configuratore: usa localStorage["ois.cart"] condiviso con la homepage. */
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
  // Legumi
  fava: { seeds: 20, price: 3.0 },
  cece: { seeds: 30, price: 3.0 },
  lenticchia: { seeds: 50, price: 2.8 },
  soia_edamame: { seeds: 30, price: 3.2 },
  fagiolo_borlotto: { seeds: 25, price: 3.0 },
  // Radici e bulbi
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
  // Foglie e insalate
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
  // Frutti esotici
  mais_dolce: { seeds: 30, price: 3.5 },
  gombo: { seeds: 20, price: 3.8 },
  tomatillo: { seeds: 20, price: 3.5 },
  physalis: { seeds: 20, price: 3.5 },
  kiwano: { seeds: 10, price: 4.0 },
  cucamelon: { seeds: 15, price: 4.0 },
  // Aromatiche e fiori
  erba_cipollina: { seeds: 200, price: 2.8 },
  leustean: { seeds: 100, price: 3.0 },
  dragoncello: { seeds: 100, price: 3.0 },
  menta: { seeds: 200, price: 2.8 },
  maggiorana: { seeds: 300, price: 2.6 },
  camomilla: { seeds: 300, price: 2.4 },
  calendula: { seeds: 100, price: 2.4 },
  nasturzio: { seeds: 50, price: 2.8 },
  shiso: { seeds: 100, price: 3.2 }
};
function formatMoney(value) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

let confCart = [];

function loadConfCart() {
  try {
    const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
    confCart = raw.map((i) =>
      typeof i === "string" ? { id: i, bustine: 1 } : i
    );
  } catch (_) {
    confCart = [];
  }
  updateConfCartUI();
}

function saveConfCart() {
  try {
    localStorage.setItem("ois.cart", JSON.stringify(confCart));
  } catch (_) {}
}

function updateConfCartUI() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = confCart.length;

  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");
  const foot = document.getElementById("cartFooter");
  const clearBtn = document.getElementById("cartClearBtn");
  if (!empty || !items || !foot) return;

  if (!confCart.length) {
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

  items.innerHTML =
    confCart
      .map(({ id, bustine }) => {
        const p = BYID[id];
        if (!p) return "";
        const photo = PLANT_PHOTOS[id] || "";
        const emoji = FRUIT_EMOJI[id] || "🌱";
        const pd = PACK_DATA[id] || { seeds: 100, price: 2.5 };
        const bustLabel =
          bustine === 1
            ? tx("cart.pack_one")
            : tx("cart.pack_many", { count: bustine });
        const seedLabel = tx("cart.seeds_per_pack", { count: pd.seeds });
        const priceLabel = tx("cart.per_pack");
        return `<div class="cart-item">
        ${
          photo
            ? `<img src="${photo}" alt="${plantText(p, "nome")}" loading="lazy" />`
            : `<span style="font-size:2rem;line-height:1;flex-shrink:0">${emoji}</span>`
        }
        <span class="cart-item-copy">
          <span class="cart-item-name">${plantText(p, "nome")}</span>
          <span class="cart-item-meta">${plantText(p, "nota") || ""}</span>
          <span class="cart-item-pack">
            <span>${bustLabel} · ${seedLabel}</span>
            <b>${formatMoney(pd.price)}/${priceLabel}</b>
          </span>
        </span>
        <button class="cart-item-remove" onclick="removeFromConfCart('${id}')" title="${tx("remove")}">✕</button>
      </div>`;
      })
      .join("") +
    `<div class="cart-total-row">
      <span>${tx("cart.total")}</span>
      <b>${formatMoney(confCart.reduce((s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine, 0))}</b>
    </div>`;
}

function removeFromConfCart(id) {
  confCart = confCart.filter((i) => i.id !== id);
  saveConfCart();
  updateConfCartUI();
  const existingBtn = document.getElementById("confCartExportBtn");
  if (existingBtn) existingBtn.remove();
}
function clearConfCart() {
  confCart = [];
  saveConfCart();
  updateConfCartUI();
  const existingBtn = document.getElementById("confCartExportBtn");
  if (existingBtn) existingBtn.remove();
}

function openConfCart() {
  loadConfCart();
  document.getElementById("cartNudge")?.classList.remove("visible");
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeConfCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
}

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
    3800
  );
}

function alertConfCheckout() {
  const lines = confCart
    .map(({ id, bustine }) => {
      const nome = BYID[id] ? plantText(BYID[id], "nome") : id;
      const pd = PACK_DATA[id] || { price: 2.5 };
      const b =
        bustine === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: bustine });
      return `- ${nome}: ${b} × ${formatMoney(pd.price)} = ${formatMoney(bustine * pd.price)}`;
    })
    .join("\n");
  const total = formatMoney(
    confCart.reduce(
      (s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine,
      0
    )
  );
  alert(tx("cart.checkout_msg", { lines, total }));
}

/* Lingua nav: sincronizza selettore header e localStorage condiviso. */
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

initConfig();
initEvents();
loadConfCart();
const _bootCfg = readSavedConfig();
// Livello/persona richiesto dalla homepage (es. ?livello=novizio).
const _bootLivello = BOOT_PARAMS.get("livello");

if (LIVELLI.has(_bootLivello)) {
  // Ingresso dalla homepage con persona già scelta: applica esattamente lo
  // stesso comportamento del pulsante livello dentro il configuratore, così
  // novizio/intermedio/esperto riempiono la serra in modo coerente.
  state.livello = _bootLivello;
  chooseLivello(_bootLivello);
  clearBootParams();
  scrollToGuidedIntroForLivello(_bootLivello);
} else {
  const _bootIntentApplied =
    isGuidedBoot() || isFreeProjectBoot() || _bootCfg?.done
      ? applyBootIntent()
      : false;

  if (_bootIntentApplied && isGuidedBoot()) {
    // Arrivo dalla homepage "Crea il mio orto guidato": intento iniziale già applicato.
  } else if (!_bootIntentApplied && !_bootCfg) {
    // Prima visita: riempimento automatico.
    autoFill();
  } else if (
    !_bootIntentApplied &&
    _bootCfg?.done &&
    state.autoPlan &&
    state.beds.length === 0
  ) {
    // Utente di ritorno con piano automatico ma serra vuota, per esempio dopo cambio mese.
    autoFill();
  } else if (!_bootIntentApplied) {
    render();
  }
  if (BOOT_PARAMS.get("mode") === "expert") {
    state.autoPlan = false;
    clearBootParams();
  }
  setMode(state.autoPlan ? "fit" : "expert", false);
  // Sincronizza classi body e card attiva senza forzare la modalità (già decisa).
  setLivello(state.livello, { mapMode: false });
}
syncVegFilterTabs();
/* Avvio finale: intro sempre visibile e prima renderizzazione. */
updateGuidedIntroDynamic();
