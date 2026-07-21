// Testi editoriali brevi e note agronomiche condivisi tra catalogo,
// configuratore e manuali post-acquisto.
(function (root) {
  const GROUPS = {
    it: {
      frutto: "Ortaggio da frutto, colorato e versatile nelle preparazioni fresche e cotte.",
      foglia: "Ortaggio da foglia fresco e versatile, adatto a raccolte e ricette di stagione.",
      radice: "Ortaggio da radice o bulbo, apprezzato per il gusto deciso e la grande versatilità.",
      legume: "Legume nutriente e saporito, protagonista di piatti semplici e completi.",
      aromatica: "Pianta aromatica dal profumo riconoscibile, ideale per dare carattere alle ricette."
    },
    ro: {
      frutto: "Legumă cu fructe colorate și versatile, potrivită pentru preparate proaspete sau gătite.",
      foglia: "Legumă cu frunze fragede și versatile, potrivită pentru recolte și rețete de sezon.",
      radice: "Legumă cu rădăcină sau bulb, apreciată pentru gustul distinct și versatilitate.",
      legume: "Leguminoasă hrănitoare și gustoasă, potrivită pentru preparate simple și consistente.",
      aromatica: "Plantă aromatică cu parfum distinct, ideală pentru a da personalitate rețetelor."
    }
  };

  const SPECIAL = {
    it: {
      pomodoro: "Frutto estivo succoso e aromatico, disponibile in molte varietà da insalata e da salsa.",
      peperone: "Frutto dolce e croccante, disponibile in colori e forme diverse.",
      peperoncino: "Capsicum dal carattere piccante, con intensità, colori e forme molto diverse.",
      melanzana: "Ortaggio estivo dalla polpa morbida, protagonista di molti piatti mediterranei.",
      zucchina: "Ortaggio estivo delicato e versatile, apprezzato anche per i suoi fiori commestibili.",
      zucca: "Frutto autunnale dalla polpa dolce e vellutata, ottimo in ricette dolci e salate.",
      cetriolo: "Frutto fresco, croccante e ricco d'acqua, ideale per insalate e conserve.",
      melone: "Frutto estivo dolce e profumato, disponibile in numerose varietà.",
      anguria: "Grande frutto estivo dalla polpa dolce, fresca e ricca d'acqua.",
      fragola: "Piccolo frutto rosso, profumato e dolce, tra i più amati della bella stagione.",
      lattuga: "Insalata tenera e leggera, disponibile in cespi, colori e consistenze differenti.",
      rucola: "Foglia dal gusto vivace e leggermente piccante, ottima fresca.",
      spinaci: "Foglia verde tenera e nutriente, versatile sia cruda sia cotta.",
      radicchio: "Cicoria dal colore intenso e dal piacevole gusto amarognolo.",
      cavolonero: "Kale toscano dalle foglie scure e bollose, dal sapore intenso.",
      broccolo_romanesco: "Brassicacea dalla caratteristica testa verde a spirale, scenografica e saporita.",
      carota: "Radice dolce e croccante, disponibile in diverse forme e colori.",
      ravanello: "Piccola radice croccante dal gusto fresco e leggermente piccante.",
      aglio: "Bulbo aromatico composto da spicchi, essenziale in moltissime cucine.",
      patata: "Tubero nutriente e versatile, base di innumerevoli ricette tradizionali.",
      patata_dolce: "Tubero dalla polpa dolce e colorata, morbido e versatile in cucina.",
      fagiolo: "Legume ricco e sostanzioso, consumato fresco oppure secco.",
      fagiolino: "Legume dal baccello tenero e croccante, dal sapore delicato.",
      pisello: "Legume dolce e tenero, apprezzato fresco e in numerose ricette.",
      basilico: "Aromatica mediterranea dal profumo fresco e inconfondibile, simbolo della cucina italiana.",
      rosmarino: "Arbusto mediterraneo sempreverde dal profumo intenso e resinoso.",
      menta: "Aromatica fresca e balsamica, ideale in bevande, salse e piatti estivi.",
      camomilla: "Pianta dai piccoli fiori profumati, tradizionalmente usati per infusi delicati.",
      borragine: "Pianta dalle foglie morbide e dai fiori azzurri commestibili.",
      physalis: "Piccolo frutto dorato racchiuso in un calice simile a una lanterna.",
      cucamelon: "Minuscolo frutto croccante, simile a un'anguria e dal gusto agrumato.",
      tomatillo: "Frutto verde avvolto in un calice cartaceo, tipico della cucina messicana.",
      shiso: "Aromatica asiatica dalle foglie decorative e dal profumo complesso.",
      topinambur: "Pianta vigorosa dai fiori gialli e dai tuberi dal gusto delicato.",
      asparago: "Ortaggio perenne dai giovani germogli teneri e dal sapore raffinato.",
      carciofo: "Grande pianta mediterranea con capolini carnosi e un gusto inconfondibile."
    },
    ro: {
      pomodoro: "Fruct de vară suculent și aromat, disponibil în multe soiuri pentru salate și sosuri.",
      peperone: "Fruct dulce și crocant, disponibil în culori și forme variate.",
      peperoncino: "Capsicum cu gust picant, în intensități, culori și forme foarte diferite.",
      melanzana: "Legumă de vară cu miez fin, prezentă în multe preparate mediteraneene.",
      zucchina: "Legumă de vară delicată și versatilă, apreciată inclusiv pentru florile comestibile.",
      zucca: "Fruct de toamnă cu miez dulce și catifelat, potrivit pentru rețete dulci și sărate.",
      cetriolo: "Fruct proaspăt, crocant și bogat în apă, ideal pentru salate și murături.",
      melone: "Fruct de vară dulce și parfumat, disponibil în numeroase soiuri.",
      anguria: "Fruct mare de vară, cu miez dulce, răcoritor și bogat în apă.",
      fragola: "Fruct mic, roșu, parfumat și dulce, foarte iubit în sezonul cald.",
      lattuga: "Salată fragedă și ușoară, disponibilă în forme, culori și texturi diferite.",
      rucola: "Frunză cu gust vioi și ușor picant, excelentă consumată proaspătă.",
      spinaci: "Frunză verde, fragedă și hrănitoare, versatilă crudă sau gătită.",
      radicchio: "Cicoare cu o culoare intensă și un gust plăcut, ușor amărui.",
      cavolonero: "Kale toscan cu frunze întunecate și reliefate, cu gust intens.",
      broccolo_romanesco: "Brasicacee cu inflorescență verde spiralată, spectaculoasă și gustoasă.",
      carota: "Rădăcină dulce și crocantă, disponibilă în forme și culori diferite.",
      ravanello: "Rădăcină mică și crocantă, cu gust proaspăt și ușor picant.",
      aglio: "Bulb aromatic format din căței, esențial în numeroase bucătării.",
      patata: "Tubercul hrănitor și versatil, baza multor rețete tradiționale.",
      patata_dolce: "Tubercul cu miez dulce și colorat, fin și versatil în bucătărie.",
      fagiolo: "Leguminoasă consistentă și hrănitoare, consumată proaspătă sau uscată.",
      fagiolino: "Leguminoasă cu păstaie fragedă și crocantă, cu gust delicat.",
      pisello: "Leguminoasă dulce și fragedă, apreciată proaspătă și în multe rețete.",
      basilico: "Aromatică mediteraneeană cu parfum proaspăt și inconfundabil, simbol al bucătăriei italiene.",
      rosmarino: "Arbust mediteraneean veșnic verde, cu parfum intens și rășinos.",
      menta: "Aromatică proaspătă și balsamică, ideală în băuturi, sosuri și preparate de vară.",
      camomilla: "Plantă cu flori mici și parfumate, folosite tradițional pentru infuzii delicate.",
      borragine: "Plantă cu frunze moi și flori albastre comestibile.",
      physalis: "Fruct mic și auriu, învelit într-un caliciu asemănător unui felinar.",
      cucamelon: "Fruct minuscul și crocant, asemănător unui pepene verde, cu gust citric.",
      tomatillo: "Fruct verde învelit într-un caliciu fin, specific bucătăriei mexicane.",
      shiso: "Aromatică asiatică cu frunze decorative și parfum complex.",
      topinambur: "Plantă viguroasă cu flori galbene și tuberculi cu gust delicat.",
      asparago: "Legumă perenă cu lăstari fragezi și gust rafinat.",
      carciofo: "Plantă mediteraneeană mare, cu inflorescențe cărnoase și gust inconfundabil."
    }
  };

  const CROP_GROUPS = {
    fruitVine: ["pomodoro", "peperone", "peperoncino", "melanzana", "tomatillo", "physalis", "friggitello"],
    cucurbit: ["zucchina", "zucca", "cetriolo", "melone", "anguria", "cucamelon"],
    leafyCut: ["lattuga", "rucola", "spinaci", "bietola", "cicoria", "indivia", "valerianella", "loboda", "crescione", "mizuna", "senape_foglia", "tatsoi", "catalogna", "acetosa", "agretti"],
    brassica: ["cavolo", "verza", "broccolo", "cavolfiore", "cavolonero", "cavolorapa", "pakchoi", "cavoletti", "cavolo_cinese", "cavolo_rosso", "cavolo_navone", "broccolo_rapa", "broccolo_romanesco"],
    directRoot: ["carota", "ravanello", "barbabietola", "rapa", "pastinaca", "radice_prezemolo", "sedano_rapa", "rafano", "daikon", "scorzonera"],
    allium: ["cipolla", "aglio", "porro", "scalogno", "cipolla_rossa", "cipollotto", "erba_cipollina", "leurda"],
    tuber: ["patata", "patata_dolce", "topinambur"],
    climbingLegume: ["fagiolo", "pisello", "fagiolo_borlotto"],
    bushLegume: ["fagiolino", "fava", "soia_edamame", "cece", "lenticchia"],
    woodyHerb: ["rosmarino", "timo", "origano", "salvia", "dragoncello", "maggiorana", "menta", "melissa", "cimbru"],
    annualHerb: ["prezzemolo", "basilico", "coriandolo", "aneto", "stevia_dolce", "leustean", "shiso", "cerfoglio"],
    flowerHerb: ["camomilla", "borragine"],
    perennial: ["asparago", "carciofo", "cardo"]
  };

  const GROUP_BY_ID = Object.entries(CROP_GROUPS).reduce((result, [group, ids]) => {
    ids.forEach((id) => { result[id] = group; });
    return result;
  }, {});

  const DETAIL = {
    it: {
      defaults: {
        frutto: ["Terreno profondo, fertile e ben drenato, arricchito con compost maturo.", "Irriga a fondo e alla base, lasciando asciugare leggermente la superficie tra un intervento e l'altro.", "Incorpora compost prima dell'impianto; dalla fioritura evita eccessi di azoto.", "Mantieni la chioma ariosa, elimina le parti danneggiate e controlla i sostegni."],
        foglia: ["Terreno soffice, ricco di sostanza organica e uniformemente umido, senza ristagni.", "Irriga con regolarità alla base: gli sbalzi idrici rendono le foglie meno tenere.", "Usa compost maturo prima della semina; aggiungi azoto solo se la crescita rallenta.", "Mantieni il terreno pulito e raccogli senza danneggiare il punto di crescita."],
        radice: ["Terreno fine, sciolto e privo di sassi; evita letame fresco e ristagni.", "Mantieni un'umidità regolare, senza saturare il terreno né alternare secco e bagnato.", "Fertilizza con moderazione: troppo azoto favorisce le foglie a scapito della parte raccolta.", "Tieni il suolo libero dalle infestanti ed evita lavorazioni profonde vicino alla pianta."],
        aromatica: ["Substrato arioso e drenante; per le aromatiche mediterranee evita terreni troppo ricchi.", "Bagna alla base quando lo strato superficiale è asciutto, senza lasciare ristagni.", "Concima poco: un eccesso di azoto riduce aroma e robustezza dei tessuti.", "Raccogli con tagli puliti e rispetta il portamento naturale della pianta."],
        legume: ["Terreno drenato e moderatamente fertile; evita concimazioni ricche di azoto.", "Mantieni l'umidità costante soprattutto durante fioritura e formazione dei baccelli.", "Di norma basta compost maturo: le leguminose non richiedono molto azoto.", "Mantieni la base ariosa e raccogli al momento adatto alla varietà."]
      },
      groups: {
        fruitVine: { care: "Lega le varietà alte, arieggia la chioma e rimuovi le foglie malate; raccogli con regolarità.", harvest: "Stacca i frutti quando hanno colore e consistenza tipici della varietà, usando forbici pulite se il peduncolo è tenace." },
        cucurbit: { care: "Guida i tralci senza piegarli, lascia spazio alle foglie e controlla l'allegagione dei primi fiori.", water: "Bagna in profondità alla base, evitando foglie e colletto; aumenta gradualmente durante l'ingrossamento dei frutti.", harvest: "Raccogli i frutti teneri con taglio netto; per zucche e meloni attendi i segnali di piena maturazione della varietà." },
        leafyCut: { care: "Raccogli le foglie esterne o effettua tagli puliti, lasciando integro il centro per favorire la ricrescita.", harvest: "Raccogli al mattino le foglie turgide, con tagli puliti e senza danneggiare il centro della pianta.", storage: "Raffredda subito le foglie e conservale in frigorifero in un contenitore aerato." },
        brassica: { care: "Proteggi il cuore e le infiorescenze, elimina le foglie danneggiate e controlla la pagina inferiore.", soil: "Terreno fertile, profondo e ben drenato, con compost maturo e umidità uniforme.", harvest: "Taglia cespo, testa o infiorescenza quando è ben formata e ancora compatta, lasciando integre le parti utili a eventuali ricacci." },
        directRoot: { care: "Dirada solo se necessario, quando le piantine sono giovani, e non lavorare in profondità vicino alle radici.", harvest: "Estrai con terreno leggermente umido quando la radice ha raggiunto il diametro desiderato, senza attendere che diventi fibrosa.", storage: "Elimina le foglie e conserva le radici sane, non lavate, al fresco e al buio." },
        allium: { care: "Controlla le infestanti con lavorazioni superficiali e mantieni il colletto asciutto e aerato.", soil: "Terreno sciolto e drenante; evita letame fresco e ristagni vicino ai bulbi.", water: "Bagna con moderazione alla base e riduci l'acqua quando bulbi o spicchi si avvicinano alla maturazione.", harvest: "Estrai i bulbi quando le foglie iniziano a ingiallire e piegarsi, lavorando con terreno asciutto.", storage: "Lascia asciugare bulbi e tuniche in un luogo ombreggiato e ventilato, poi conserva al fresco e all'asciutto." },
        tuber: { care: "Rincalza quando necessario, proteggi i tuberi dalla luce ed evita lavorazioni che possano danneggiarli.", soil: "Terreno profondo, soffice e drenante, privo di zolle compatte.", harvest: "Solleva i tuberi con terreno asciutto, partendo lontano dal fusto per non ferirli.", storage: "Fai asciugare la superficie e conserva soltanto tuberi integri, al buio e in ambiente ventilato." },
        climbingLegume: { care: "Predisponi sostegni solidi prima che i tralci si allunghino e raccogli i baccelli con delicatezza.", harvest: "Raccogli spesso i baccelli giovani; per il seme secco attendi che siano completamente maturi." },
        bushLegume: { care: "Mantieni la base libera e ariosa; non servono sostegni salvo varietà molto vigorose.", harvest: "Raccogli i baccelli senza tirare i rami; per ceci e lenticchie attendi la completa maturazione del seme." },
        woodyHerb: { care: "Esegui tagli leggeri sopra la parte verde, evitando potature drastiche sul legno vecchio.", harvest: "Preleva rametti sani con tagli leggeri, preferibilmente al mattino e prima della piena fioritura.", storage: "Usa fresca oppure essicca lentamente all'ombra in un luogo ventilato." },
        annualHerb: { care: "Raccogli gli apici con tagli puliti; elimina i fiori solo per prolungare la produzione di foglie.", harvest: "Taglia foglie e apici sani al mattino, senza asportare più di un terzo della pianta alla volta.", storage: "Usa fresca, congela le foglie pulite oppure essiccale all'ombra se la specie lo consente." },
        flowerHerb: { care: "Lascia sviluppare i fiori e raccoglili asciutti, appena aperti, senza cimare gli steli produttivi.", harvest: "Raccogli i fiori asciutti, appena aperti, nelle ore fresche della mattina.", storage: "Essicca i fiori in strato sottile, all'ombra, e conservali asciutti al riparo dalla luce." },
        perennial: { care: "Non forzare la raccolta sulle piante giovani; elimina le parti secche e lascia spazio allo sviluppo pluriennale." }
      },
      prevention: "Arieggia ogni giorno, irriga al mattino alla base e rimuovi subito i tessuti malati.",
      harvest: "Raccogli a maturazione con utensili puliti, senza ferire la pianta o la parte destinata al consumo.",
      storage: "Conserva soltanto prodotti sani e asciutti; raffredda rapidamente quelli deperibili.",
      rotation: "Dopo la raccolta elimina i residui e non ripiantare la stessa famiglia botanica nello stesso spazio nel ciclo successivo.",
      labels: ["Distanze dopo il diradamento", "Distanze di trapianto", "Distanze d'impianto"]
    },
    ro: {
      defaults: {
        frutto: ["Sol profund, fertil și bine drenat, îmbogățit cu compost matur.", "Udă profund la bază, lăsând suprafața să se usuce ușor între udări.", "Încorporează compost înainte de plantare; după înflorire evită excesul de azot.", "Menține frunzișul aerisit, elimină părțile deteriorate și verifică susținerile."],
        foglia: ["Sol afânat, bogat în materie organică și uniform umed, fără băltire.", "Udă regulat la bază: variațiile mari de umiditate reduc frăgezimea frunzelor.", "Folosește compost matur înainte de semănat; adaugă azot doar dacă dezvoltarea încetinește.", "Menține solul curat și recoltează fără a răni punctul de creștere."],
        radice: ["Sol fin, afânat și fără pietre; evită gunoiul de grajd proaspăt și băltirea.", "Menține umiditatea constantă, fără să saturezi solul și fără alternanțe bruște.", "Fertilizează moderat: prea mult azot favorizează frunzele în detrimentul părții recoltate.", "Îndepărtează buruienile și evită lucrările adânci lângă plantă."],
        aromatica: ["Substrat aerat și drenat; pentru aromaticele mediteraneene evită solul prea bogat.", "Udă la bază când stratul superficial s-a uscat, fără apă stagnantă.", "Fertilizează puțin: excesul de azot reduce aroma și rezistența țesuturilor.", "Recoltează prin tăieri curate, respectând forma naturală a plantei."],
        legume: ["Sol drenat și moderat fertil; evită îngrășămintele bogate în azot.", "Menține umiditatea constantă mai ales în timpul înfloririi și formării păstăilor.", "De regulă este suficient compostul matur; leguminoasele nu cer mult azot.", "Menține baza aerisită și recoltează la momentul potrivit soiului."]
      },
      groups: {
        fruitVine: { care: "Leagă soiurile înalte, aerisește frunzișul și elimină frunzele bolnave; recoltează regulat.", harvest: "Culege fructele când au culoarea și consistența tipice soiului; folosește foarfecă dacă pedunculul este tare." },
        cucurbit: { care: "Ghidează vrejurile fără să le îndoi, lasă spațiu frunzelor și urmărește legarea primelor flori.", water: "Udă profund la bază, evitând frunzele și coletul; mărește treptat cantitatea când fructele cresc.", harvest: "Culege fructele fragede printr-o tăiere curată; pentru dovleci și pepeni așteaptă semnele maturității depline." },
        leafyCut: { care: "Recoltează frunzele exterioare sau taie curat, păstrând centrul intact pentru regenerare.", harvest: "Recoltează dimineața frunzele turgescente, fără a răni centrul plantei.", storage: "Răcește imediat frunzele și păstrează-le la frigider într-un recipient aerisit." },
        brassica: { care: "Protejează centrul și inflorescențele, elimină frunzele deteriorate și verifică dosul frunzelor.", soil: "Sol fertil, profund și bine drenat, cu compost matur și umiditate uniformă.", harvest: "Taie căpățâna sau inflorescența când este bine formată și încă compactă." },
        directRoot: { care: "Rărește numai dacă este necesar, cât plantele sunt tinere, și evită lucrările adânci lângă rădăcini.", harvest: "Extrage din sol ușor umed când rădăcina a ajuns la dimensiunea dorită, înainte să devină fibroasă.", storage: "Îndepărtează frunzele și păstrează rădăcinile sănătoase, nespălate, la rece și întuneric." },
        allium: { care: "Controlează buruienile superficial și menține coletul uscat și bine aerisit.", soil: "Sol afânat și drenat, fără gunoi de grajd proaspăt; evită băltirea lângă bulbi.", water: "Udă moderat la bază și redu apa când bulbii sau cățeii se apropie de maturitate.", harvest: "Scoate bulbii când frunzele încep să se îngălbenească și să se aplece, pe sol uscat.", storage: "Lasă bulbii să se usuce la umbră, într-un loc aerisit, apoi păstrează-i la rece și uscat." },
        tuber: { care: "Mușuroiește când este necesar, protejează tuberculii de lumină și evită să-i rănești.", soil: "Sol profund, afânat și drenat, fără bulgări compacți.", harvest: "Ridică tuberculii din sol uscat, începând la distanță de tulpină pentru a nu-i răni.", storage: "Lasă suprafața să se usuce și păstrează doar tuberculii integri, la întuneric și aerisit." },
        climbingLegume: { care: "Instalează susțineri solide înainte ca lăstarii să se alungească și recoltează cu grijă.", harvest: "Culege des păstăile tinere; pentru semințe uscate așteaptă maturitatea completă." },
        bushLegume: { care: "Menține baza curată și aerisită; susținerea nu este necesară decât la soiurile viguroase.", harvest: "Culege păstăile fără a trage ramurile; pentru năut și linte așteaptă maturarea completă a semințelor." },
        woodyHerb: { care: "Taie ușor deasupra părții verzi și evită tăierile drastice în lemnul bătrân.", harvest: "Taie ușor ramuri sănătoase, preferabil dimineața și înainte de înflorirea deplină.", storage: "Folosește proaspătă sau usucă lent la umbră, într-un loc aerisit." },
        annualHerb: { care: "Recoltează vârfurile curat; elimină florile doar pentru a prelungi producția de frunze.", harvest: "Taie dimineața frunze și vârfuri sănătoase, fără a lua mai mult de o treime din plantă.", storage: "Folosește proaspătă, congelează frunzele sau usucă-le la umbră dacă specia permite." },
        flowerHerb: { care: "Lasă florile să se dezvolte și recoltează-le uscate, imediat după deschidere, fără să ciupești tulpinile.", harvest: "Culege florile uscate, imediat după deschidere, în orele răcoroase ale dimineții.", storage: "Usucă florile într-un strat subțire, la umbră, și păstrează-le ferite de lumină." },
        perennial: { care: "Nu forța recoltarea plantelor tinere; elimină părțile uscate și lasă loc dezvoltării perene." }
      },
      prevention: "Aerisește zilnic, udă dimineața la bază și îndepărtează imediat țesuturile bolnave.",
      harvest: "Recoltează la maturitate cu unelte curate, fără a răni planta sau partea destinată consumului.",
      storage: "Păstrează doar produse sănătoase și uscate; răcește rapid produsele perisabile.",
      rotation: "După recoltare elimină resturile și nu replanta aceeași familie în același loc în ciclul următor.",
      labels: ["Distanțe după rărire", "Distanțe de transplantare", "Distanțe de plantare"]
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
    const note = code === "ro"
      ? root.SERRA_I18N?.plants?.ro?.[plant.id]?.nota || plant.nota || ""
      : plant.nota || "";
    const name = localizedName(plant, code).trim().toLocaleLowerCase(code);
    const separator = note.indexOf(":");
    if (separator > 0 && note.slice(0, separator).trim().toLocaleLowerCase(code) === name) {
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
    if (["fruitVine", "cucurbit", "brassica"].includes(group)) return copy.labels[1];
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
