/* Traduzioni condivise: testi interfaccia e nomi piante per home/configuratore. */
(function (global) {
  const shared = {
    /* Nomi mese: usati da calendario, hero e selettori. */
    months: {
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
        "Dicembre"
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
        "Decembrie"
      ]
    },
    monthAbbr: {
      it: [
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
      ],
      ro: [
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
      ]
    },
    /* Piante: localizzazione dei campi botanici mostrati nelle card. */
    plants: {
      ro: {
        pomodoro: {
          nome: "Roșie",
          nota: "Are nevoie de susținere și soare plin. Îndepărtează lăstarii laterali."
        },
        peperone: {
          nome: "Ardei gras",
          nota: "Iubește căldura. Fertilizează când începe fructificarea."
        },
        peperoncino: {
          nome: "Ardei iute",
          nota: "Rustic și productiv. Suportă bine seceta."
        },
        melanzana: {
          nome: "Vânătă",
          nota: "Are nevoie de multă căldură și udări regulate."
        },
        zucchina: {
          nome: "Dovlecel",
          nota: "Crește repede și ocupă mult spațiu. Recoltează des."
        },
        zucca: {
          nome: "Dovleac",
          nota: "Se întinde mult: lasă-i spațiu sau condu-l pe suport."
        },
        cetriolo: {
          nome: "Castravete",
          nota: "Condu-l pe plasă: fructele rămân mai curate și mai drepte."
        },
        melone: {
          nome: "Pepene galben",
          nota: "Vrea mult soare și mai puțină apă spre coacere."
        },
        anguria: {
          nome: "Pepene verde",
          nota: "Ocupă mult spațiu: o plantă poate umple jumătate dintr-o seră mică."
        },
        lattuga: {
          nome: "Salată verde",
          nota: "Foarte ușoară și rapidă. Seamănă puține plante odată."
        },
        radicchio: {
          nome: "Radicchio",
          nota: "Frigul îl face mai roșu și mai dulce."
        },
        rucola: {
          nome: "Rucola",
          nota: "Gata în câteva săptămâni. Se taie și crește din nou."
        },
        spinaci: {
          nome: "Spanac",
          nota: "Iubește răcoarea; vara intră repede în floare."
        },
        bietola: {
          nome: "Mangold",
          nota: "Generos: recoltează frunzele exterioare treptat."
        },
        cavolo: {
          nome: "Varză albă",
          nota: "Are nevoie de spațiu și sol bogat. Atenție la omizi."
        },
        verza: {
          nome: "Varză creață",
          nota: "Rezistă la îngheț; e mai gustoasă după primele brume."
        },
        broccolo: {
          nome: "Broccoli",
          nota: "După căpățâna centrală produce mulți lăstari laterali."
        },
        cavolfiore: {
          nome: "Conopidă",
          nota: "Îndoaie frunzele peste căpățână ca să rămână albă."
        },
        cavolonero: {
          nome: "Varză kale neagră",
          nota: "Rustică: se recoltează frunză cu frunză timp de luni întregi."
        },
        cavolorapa: {
          nome: "Gulie",
          nota: "Se mănâncă tulpina îngroșată: recoltează când e tânără."
        },
        carota: {
          nome: "Morcov",
          nota: "Seamănă des și rărește. Sol afânat, fără pietre."
        },
        finocchio: {
          nome: "Fenicul",
          nota: "Nu se potrivește cu multe plante: ține-l separat."
        },
        prezzemolo: {
          nome: "Pătrunjel",
          nota: "Pornește lent; apoi taie des pe tot parcursul anului."
        },
        basilico: {
          nome: "Busuioc",
          nota: "Ciuppește florile pentru frunze mereu fragede."
        },
        coriandolo: {
          nome: "Coriandru",
          nota: "Înflorește la căldură: seamănă eșalonat la fiecare 2 săptămâni."
        },
        aneto: {
          nome: "Mărar",
          nota: "Ajută verzele și atrage insecte utile."
        },
        cipolla: {
          nome: "Ceapă",
          nota: "Puțină apă la finalul ciclului. Ține la distanță mulți dăunători."
        },
        aglio: {
          nome: "Usturoi",
          nota: "Se plantează în căței toamna și se recoltează vara."
        },
        porro: {
          nome: "Praz",
          nota: "Mușuroiește pământul în jur pentru o tulpină albă mai lungă."
        },
        scalogno: {
          nome: "Șalotă",
          nota: "Ca ceapa, dar mai delicată; foarte bună pentru începători."
        },
        fagiolino: {
          nome: "Fasole pitică",
          nota: "Nu are nevoie de suport. Îmbunătățește solul cu azot."
        },
        fagiolo: {
          nome: "Fasole urcătoare",
          nota: "Are nevoie de araci sau plasă: poate urca până la 2 metri."
        },
        pisello: {
          nome: "Mazăre",
          nota: "Iubește răcoarea: se seamănă toamna sau la final de iarnă."
        },
        fragola: {
          nome: "Căpșun",
          nota: "Peren: produce mai mulți ani și face stoloni."
        },
        sedano: {
          nome: "Țelină",
          nota: "Are nevoie de multă apă și sol bogat."
        },
        ravanello: {
          nome: "Ridiche",
          nota: "Cea mai rapidă: gata în 3-4 săptămâni. Ideală cu copiii."
        },
        barbabietola: {
          nome: "Sfeclă roșie",
          nota: "Se mănâncă rădăcina și frunzele. Rărește plantele tinere."
        },
        cicoria: {
          nome: "Cicoare",
          nota: "Rustică și gustoasă. Recoltează frunzele exterioare sau căpățâna tânără."
        },
        indivia: {
          nome: "Andivă / Escarolă",
          nota: "Iubește răcoarea. Leagă căpățâna dacă vrei frunze interioare mai deschise."
        },
        pakchoi: {
          nome: "Pak choi",
          nota: "Crește repede pe vreme răcoroasă. Recoltează frunze baby sau căpățâni mici."
        },
        cavoletti: {
          nome: "Varză de Bruxelles",
          nota: "Are nevoie de timp și răcoare: ciupește vârful când mugurii încep să se formeze."
        },
        rapa: {
          nome: "Nap",
          nota: "Rădăcină rapidă de sezon rece. Rărește devreme ca să se îngroașe."
        },
        valerianella: {
          nome: "Valerianelă",
          nota: "Perfectă pentru sera rece: formează rozete mici și fragede toamna și iarna."
        },
        rosmarino: {
          nome: "Rozmarin",
          nota: "Peren și rustic: foarte puțină apă, trăiește ani întregi."
        },
        timo: {
          nome: "Cimbru",
          nota: "Târâtor și parfumat; iubește uscăciunea."
        },
        origano: {
          nome: "Oregano",
          nota: "Peren: se usucă foarte bine pentru iarnă."
        },
        salvia: {
          nome: "Salvie",
          nota: "Tufă perenă cu frunze catifelate."
        },
        pastinaca: {
          nome: "Păstârnac",
          nota: "Devine mai dulce după frig; seamănă direct în sol afânat și adânc."
        },
        radice_prezemolo: {
          nome: "Pătrunjel rădăcină",
          nota: "Cultură tradițională: rădăcină albă aromată pentru supe și ciorbe."
        },
        sedano_rapa: {
          nome: "Țelină rădăcină",
          nota: "Rădăcină rotundă și parfumată; cere apă constantă și sol bogat."
        },
        rafano: {
          nome: "Hrean",
          nota: "Rădăcină picantă foarte folosită în România; controlează-l, este viguros."
        },
        patata: {
          nome: "Cartof",
          nota: "În seră grăbește recolta; mușuroiește când tulpinile cresc."
        },
        patata_dolce: {
          nome: "Cartof dulce",
          nota: "Iubește căldura stabilă și solul ușor; potrivit pentru seră caldă."
        },
        cipolla_rossa: {
          nome: "Ceapă roșie",
          nota: "Bulb dulce și colorat; bun pentru recoltări eșalonate."
        },
        cipollotto: {
          nome: "Ceapă verde",
          nota: "Gata rapid; recoltează-l tânăr înainte să se îngroașe."
        },
        erba_cipollina: {
          nome: "Chives / Cepșoară",
          nota: "Aromatică perenă; taie des pentru frunze fragede."
        },
        loboda: {
          nome: "Lobodă",
          nota: "Frunză tradițională pentru ciorbe; crește bine pe vreme răcoroasă."
        },
        stevia_dolce: {
          nome: "Ștevie",
          nota: "Plantă acrișoară pentru ciorbe de primăvară; recoltează frunze tinere."
        },
        leustean: {
          nome: "Leuștean",
          nota: "Aroma clasică a ciorbelor românești; peren și viguros."
        },
        dragoncello: {
          nome: "Tarhon",
          nota: "Aromatic fin pentru oțeturi și conserve; evită băltirea."
        },
        menta: {
          nome: "Mentă",
          nota: "Foarte viguroasă: mai bine în ghiveci sau zonă controlată."
        },
        maggiorana: {
          nome: "Măghiran",
          nota: "Aromatică delicată; iubește căldura, lumina și solul drenat."
        },
        camomilla: {
          nome: "Mușețel",
          nota: "Flori pentru ceai; atrage insecte utile și parfumează sera."
        },
        mais_dolce: {
          nome: "Porumb dulce",
          nota: "Are nevoie de grupuri de plante pentru polenizare bună; ideal pe margini."
        },
        tomatillo: {
          nome: "Tomatillo",
          nota: "Are nevoie de cel puțin două plante pentru fructificare bună; excelent pentru sosuri."
        },
        physalis: {
          nome: "Physalis",
          nota: "Fructe dulci în înveliș ca o lanternă; în seră se coace mai bine."
        },
        cucamelon: {
          nome: "Cucamelon",
          nota: "Fructe mici și crocante; productiv pe plasă în seră."
        },
        asparago: {
          nome: "Sparanghel",
          nota: "Peren: cere răbdare, dar produce mulți ani."
        },
        carciofo: {
          nome: "Anghinare",
          nota: "Cultură mare și decorativă; protejează de ger puternic."
        },
        cardo: {
          nome: "Cardon",
          nota: "Rudă cu anghinarea; albește pețiolurile înainte de recoltă."
        },
        crescione: {
          nome: "Năsturel",
          nota: "Crește rapid și cere umiditate constantă; perfect pentru tăieri repetate."
        },
        mizuna: {
          nome: "Mizuna",
          nota: "Muștar japonez ușor; frunze zimțate pentru mixuri de salată."
        },
        senape_foglia: {
          nome: "Muștar frunze",
          nota: "Frunze picante; seamănă pe răcoare ca să eviți înflorirea rapidă."
        },
        tatsoi: {
          nome: "Tatsoi",
          nota: "Rozetă compactă, foarte rezistentă la frig."
        },
        cavolo_cinese: {
          nome: "Varză chinezească",
          nota: "Formează căpățână fragedă; protejează de căldură și stres hidric."
        },
        daikon: {
          nome: "Daikon",
          nota: "Ridiche lungă: sol adânc și recoltare înainte să devină lemnoasă."
        },
        scorzonera: {
          nome: "Scorțonera",
          nota: "Rădăcină neagră lungă; cere sol ușor și adânc."
        },
        topinambur: {
          nome: "Topinambur",
          nota: "Tubercul rustic și productiv; delimitează spațiul deoarece se extinde."
        },
        fava: {
          nome: "Bob",
          nota: "Leguminoasă timpurie, rezistentă la răcoare; îmbunătățește solul."
        },
        soia_edamame: {
          nome: "Soia edamame",
          nota: "Recoltează păstăile verzi când boabele sunt pline, dar fragede."
        },
        cece: {
          nome: "Năut",
          nota: "Iubește uscăciunea și căldura; nu uda excesiv în seră."
        },
        lenticchia: {
          nome: "Linte",
          nota: "Leguminoasă mică și rustică; potrivită pentru margini mai uscate."
        },
        fagiolo_borlotto: {
          nome: "Fasole pestriță",
          nota: "Pentru păstăi proaspete sau boabe; folosește araci solizi."
        },
        cavolo_rosso: {
          nome: "Varză roșie",
          nota: "Căpățână compactă și colorată; excelentă pentru recolte de toamnă."
        },
        cavolo_navone: {
          nome: "Gulie furajeră / Nap",
          nota: "Rădăcină mare și rustică; utilă pentru toamnă și iarnă."
        },
        broccolo_rapa: {
          nome: "Rapini",
          nota: "Recoltează vârfurile și frunzele înainte de înflorire completă."
        },
        shiso: {
          nome: "Shiso",
          nota: "Aromatică asiatică parfumată; frumoasă și în ghiveci în seră."
        },
        broccolo_romanesco: {
          nome: "Broccoli romanesc",
          nota: "Varietate de broccoli cu capul spiralat caracteristic. Gust delicat și ornamental."
        },
        friggitello: {
          nome: "Ardei friggitello",
          nota: "Ardei dulce alungit tipic din centrul și sudul Italiei. Excelent la prăjit."
        },
        agretti: {
          nome: "Agretti",
          nota: "Legumă primăvăratică italiană cu tulpini subțiri și cărnoase. Se mănâncă fiartă cu ulei de măsline."
        },
        borragine: {
          nome: "Borago",
          nota: "Flori și frunze comestibile albastre. Atrage albinele; excelentă lângă roșii și castraveți."
        },
        catalogna: {
          nome: "Catalogna",
          nota: "Cicoare romană: puntarellele centrale se mănâncă crude cu anșoa și usturoi."
        },
        acetosa: {
          nome: "Macriș",
          nota: "Frunze acide cu gust de lămâie, excelente în borș. Perenă: revine în fiecare an."
        },
        leurda: {
          nome: "Leurdă",
          nota: "Usturoi sălbatic cu frunze comestibile. Tipic bucătăriei românești de primăvară."
        },
        melissa: {
          nome: "Melisă / Roiniță",
          nota: "Aromată perenă cu parfum de lămâie. Excelentă pentru ceaiuri și în bucătărie."
        },
        cerfoglio: {
          nome: "Hasmațuchi",
          nota: "Aromată delicată cu gust între pătrunjel și anason. Se folosește doar proaspătă."
        },
        cimbru: {
          nome: "Cimbru",
          nota: "Cea mai folosită aromă în bucătăria românească: indispensabilă pentru fasole, murături și sarmale."
        }
      }
    },
    /* Home: navigazione, catalogo, carrello, contatti e cookie. */
    index: {
      it: {
        "page.title": "Orto in Serra · Coltiva con intelligenza",
        "nav.home": "🏠 Home",
        "nav.stagione": "🌿 Catalogo completo",
        "nav.catalog_all": "🌿 Catalogo completo",
        "nav.abbinamenti": "🤝 Abbinamenti",
        "nav.configuratore": "📐 Configuratore",
        "nav.contatti": "✉️ Contatti",
        "nav.carrello": "Carrello",
        "hero.zone_label": "Scegli la tua zona climatica",
        "hero.greenhouse_label": "Tipo di Serra",
        "hero.zone_cold": "❄️Zona Climatica Fredda",
        "hero.zone_temp": "🌤️Zona Climatica Temperata",
        "hero.zone_warm": "☀️Zona Climatica Calda",
        "hero.zone_cold_label": "Fredda",
        "hero.zone_temp_label": "Temperata",
        "hero.zone_warm_label": "Calda",
        "hero.zone_cold_hint": "inverni rigidi",
        "hero.zone_temp_hint": "gelate occasionali",
        "hero.zone_warm_hint": "inverni miti",
        "hero.heated_off": "Riscaldamento spento",
        "hero.heated_on": "🔥 Riscaldamento attivo",
        "hero.filter_note_cold":
          "Riscaldamento spento: selezione adatta a una serra protetta ma non riscaldata.",
        "hero.filter_note_zone_cold":
          "Zona fredda: gelate frequenti e inverno rigido. Senza riscaldamento non proponiamo semine a dicembre e gennaio.",
        "hero.filter_note_zone_temp":
          "Zona temperata: stagioni definite e gelate occasionali. Usiamo i normali mesi di semina in serra.",
        "hero.filter_note_zone_warm":
          "Zona calda: inverno mite o quasi senza gelo. La finestra di semina si estende di circa un mese prima e dopo.",
        "hero.filter_note_heated":
          "Serra riscaldata: la finestra di semina si estende di circa un mese prima e dopo, qualunque sia la zona scelta.",
        "hero.cta_plants": "Crea il mio orto guidato",
        "hero.cta_config": "Sfoglia i semi adatti",
        "hero.scroll": "scorri",
        "path.kicker": "Scegli il percorso",
        "path.heading": "Da dove vuoi iniziare?",
        "path.lead":
          "Tre ingressi diversi, pensati per decisioni importanti: un piano guidato, una tela libera o il catalogo dei semi adatti alla tua stagione.",
        "path.auto_badge": "Consigliato",
        "path.auto_kicker": "Piano automatico",
        "path.auto_title": "Guidami passo passo",
        "path.auto_desc":
          "Ti preparo subito un orto completo per il mese corrente. Poi puoi modificare misure, clima e piante quando vuoi.",
        "path.auto_benefit_1": "Scelte già ordinate",
        "path.auto_benefit_2": "Adatto al mese e al clima",
        "path.auto_benefit_3": "Modificabile in ogni momento",
        "path.auto_action": "Crea il mio orto",
        "path.free_kicker": "Configuratore",
        "path.free_label": "Progetto libero",
        "path.free_hint": "Scegli misure, colture e disposizione senza guida.",
        "path.free_action": "Apri",
        "path.mid_label": "Guidato e personalizzabile",
        "path.mid_hint": "Parti pronto, poi modifica le colture",
        "path.semi_kicker": "Catalogo semi",
        "path.semi_title": "Sfoglia i semi di stagione",
        "path.semi_desc":
          "Sfoglia il catalogo filtrato per mese e clima. Aggiungi i semi al carrello e importali nel configuratore.",
        "path.semi_action": "Vai al catalogo",
        "path.note":
          "Puoi sempre cambiare percorso: il configuratore conserva le scelte e ti lascia rientrare nel flusso quando vuoi.",
        "calendar.kicker": "L'anno in serra",
        "calendar.heading": "Quante piante puoi seminare ogni mese",
        "companions.kicker": "Botanica relazionale",
        "companions.heading": "Si amano in serra",
        "companions.copy":
          "Piante che crescono meglio vicine: benefici reciproci, parassiti allontanati, resa più alta.",
        "companions.empty":
          "Nessun abbinamento disponibile per questa combinazione di mese e zona.",
        "companions.reason_1": "Si proteggono a vicenda dagli afidi",
        "companions.reason_2": "Ottimizzano l'uso dello spazio in radice",
        "companions.reason_3": "Attraggono impollinatori utili",
        "companions.badge_1": "✅&nbsp;Abbinamento classico",
        "companions.badge_2": "✅&nbsp;Abbinamento consigliato",
        "companions.badge_3": "✅&nbsp;Abbinamento sinergico",
        "companions.add_pair": "+ Aggiungi la coppia",
        "companions.in_cart_pair": "✓&nbsp;Coppia nel carrello",
        "companions.summary": "{count} coppie adatte a {month}",
        "companions.pair_number": "Coppia {number}",
        "kit.kicker": "Già compatibili tra loro",
        "kit.heading": "Kit del mese · {month}",
        "kit.desc":
          "{count} varietà già compatibili tra loro, perfette per iniziare questo mese.",
        "kit.add_all": "+ Aggiungi tutto al carrello",
        "kit.compat": "Verificato: nessuna incompatibilità nel kit",
        "kit.plan_link": "Aggiungi kit e pianifica",
        "kit.title_1": "Kit Invernale",
        "kit.title_2": "Kit Primaverile Precoce",
        "kit.title_3": "Kit di Primavera",
        "kit.title_4": "Kit di Primavera",
        "kit.title_5": "Kit di Maggio",
        "kit.title_6": "Kit Estivo in Serra",
        "kit.title_7": "Kit d'Estate",
        "kit.title_8": "Kit Fine Estate",
        "kit.title_9": "Kit Autunnale",
        "kit.title_10": "Kit d'Autunno",
        "kit.title_11": "Kit Autunno-Inverno",
        "kit.title_12": "Kit Invernale",
        "conf.kicker": "Percorso guidato",
        "conf.title": "Pianifica la tua serra dall'alto",
        "conf.desc":
          "Inserisci misure, mese e zona: il configuratore ti mostra cosa seminare, dove metterlo e quanti semi preparare. Puoi partire da un piano facile e cambiarlo quando vuoi.",
        "conf.open": "Apri il configuratore guidato",
        "conf.import": "Importa i semi e pianifica",
        "conf.import_label": "Hai già dei semi nel carrello?",
        "conf.cart_hint_empty": "Aggiungi prima dei semi al carrello.",
        "conf.feature_measures": "Misure reali",
        "conf.feature_spacing": "Spaziatura",
        "conf.feature_compat": "Compatibilità",
        "conf.feature_print": "Stampa",
        "season.title": "{count} piante per {month}",
        "season.meta": "Zona {zone} · Serra {greenhouse}",
        "season.empty":
          "Nessuna pianta da seminare questo mese.<br>Prova ad attivare la serra riscaldata.",
        "catalog.kicker": "Cosa piantare",
        "catalog.lead":
          "Parti dal mese, dal clima e dallo spazio reale della serra. Il catalogo mette in evidenza le colture più adatte ora, con dati pratici per scegliere senza tentativi.",
        "catalog.action_search": "Cerca una coltura",
        "catalog.action_import": "Importa nel configuratore",
        "catalog.stat_varieties": "varietà",
        "catalog.stat_zones": "zone clima",
        "catalog.stat_months": "mesi filtrati",
        "catalog.stat_cart": "nel carrello",
        "catalog.quickfilter_label": "Sfoglia per tipo",
        "catalog.quickfilter_hint":
          "Clicca per filtrare il catalogo istantaneamente",
        "catalog.type_frutto": "Frutti",
        "catalog.type_foglia": "Foglie",
        "catalog.type_radice": "Radici",
        "catalog.type_legume": "Legumi",
        "catalog.type_aromatica": "Aromatiche",
        "catalog.card_kicker": "Checklist rapida",
        "catalog.card_title": "Prima di aggiungere semi",
        "catalog.card_subtitle": "Controlla questi quattro segnali",
        "catalog.card_tip":
          "Apri la scheda di una pianta per vedere subito se è il momento giusto per seminarla.",
        "catalog.feature_sowing_title": "Finestra di semina",
        "catalog.feature_sowing_sub": "adatta al mese selezionato",
        "catalog.feature_climate_title": "Compatibilità clima",
        "catalog.feature_climate_sub": "freddo, temperato o caldo",
        "catalog.feature_space_title": "Ingombro reale",
        "catalog.feature_space_sub": "distanze utili in serra",
        "catalog.feature_easy_title": "Facilità di cura",
        "catalog.feature_easy_sub": "ideale se parti da zero",
        "catalog.search_label": "Cerca seme",
        "catalog.search_placeholder": "Pomodoro, basilico, lattuga...",
        "catalog.clima_label": "Clima",
        "catalog.filter_type_label": "Tipo",
        "catalog.filter_type_hint": "Scegli una famiglia",
        "catalog.filter_search_label": "Ricerca",
        "catalog.filter_search_hint": "Affina i risultati",
        "catalog.search_badge": "Cerca qui",
        "catalog.search_note": "Digita pomodoro, basilico, lattuga… trova subito la pianta.",
        "catalog.type_label": "Tipo",
        "catalog.type_all": "Tutti",
        "catalog.category_label": "Categorie",
        "catalog.category_hint": "Scegli una famiglia di colture",
        "catalog.sort_label": "Ordina per",
        "catalog.sort_season": "Consigliati",
        "catalog.sort_name": "Nome A-Z",
        "catalog.sort_fast": "Raccolta più veloce",
        "catalog.sort_yield": "Resa più alta",
        "catalog.sort_distance": "Più compatti",
        "catalog.sort_price": "Prezzo più basso",
        "catalog.insight_seasonal": "adatti ora",
        "catalog.insight_fast": "rapidi",
        "catalog.insight_compact": "compatti",
        "catalog.insight_cart": "nel carrello",
        "catalog.season_only": "Solo adatti adesso",
        "catalog.off_season": "Fuori stagione",
        "catalog.easy_only": "Facili per iniziare",
        "catalog.filter_all_plants": "Tutto il catalogo",
        "catalog.results": "risultati",
        "catalog.reset": "Azzera filtri",
        "catalog.reset_short": "Azzera tutto",
        "catalog.seeds": "semi",
        "catalog.show_all": "Mostra tutto il catalogo",
        "catalog.remove_filter": "Rimuovi filtro",
        "catalog.clear_search": "Cancella ricerca",
        "catalog.hint_before": "Tocca una pianta per i dettagli · usa",
        "catalog.hint_after": "per aggiungerla al carrello direttamente",
        "catalog.empty":
          "Nessun seme trovato con questi filtri. Prova a togliere un filtro o cambiare mese.",
        "catalog.search_all":
          "La ricerca include tutto il catalogo. Alcuni risultati potrebbero non essere adatti alla semina in {month}.",
        "catalog.count_all": "{count} semi nel catalogo",
        "catalog.count_filtered": "{shown} di {total} semi mostrati",
        "zone.freddo": "fredda",
        "zone.temperato": "temperata",
        "zone.caldo": "calda",
        "greenhouse.cold": "fredda",
        "greenhouse.heated": "riscaldata",
        "type.frutto": "frutto",
        "type.foglia": "foglia",
        "type.radice": "radice",
        "type.legume": "legume",
        "type.aromatica": "aromatica",
        "plant.perennial": "perenne",
        "plant.days_short": "gg",
        "plant.days_harvest": "{days} giorni al raccolto",
        "plant.full_sun": "sole pieno",
        "plant.half_shade": "semiombra",
        "plant.water": "acqua",
        "plant.sun": "sole",
        "plant.height": "altezza",
        "plant.distance": "distanza",
        "plant.harvest_days": "giorni al raccolto",
        "plant.yield": "resa/pianta",
        "water.alta": "alta",
        "water.media": "media",
        "water.bassa": "bassa",
        "height.alta": "alta",
        "height.media": "media",
        "height.bassa": "bassa",
        "detail.sowing_months": "Mesi di semina",
        "detail.month_available": "Mesi adatti",
        "detail.month_selected": "Mese selezionato",
        "detail.month_outside": "Fuori finestra",
        "detail.friends": "Si abbina con",
        "detail.enemies": "Tieni lontano da",
        "cart.title": "Il tuo carrello",
        "cart.empty": "Nessun seme ancora.<br>Aggiungi le piante di stagione!",
        "cart.payment_soon": "Pagamento online in arrivo",
        "cart.plan": "Pianifica o modifica la disposizione in serra",
        "cart.plan_hint": "Apri il configuratore con i semi scelti",
        "cart.species_one": "1 specie",
        "cart.species_many": "{count} specie",
        "cart.checkout": "Invia richiesta semi",
        "cart.alert":
          "Vorrei ricevere disponibilità e prezzo finale per questi semi:",
        "cart.add": "+ Aggiungi",
        "cart.add_plain": "Aggiungi",
        "cart.in_cart": "✓&nbsp;Nel carrello",
        "cart.clear": "Svuota",
        "cart.remove": "Rimuovi",
        "cart.add_to_cart": "+ Aggiungi al carrello",
        "cart.remove_from_cart": "✕ Rimuovi dal carrello",
        "cart.view": "Vedi carrello",
        "cart.added_title": "{name} aggiunto",
        "cart.added_meta": "{count} semi nel carrello",
        "cart.removed_title": "{name} rimosso",
        "cart.removed_meta": "{count} semi nel carrello",
        "cart.pack": "1 bustina",
        "cart.estimate": "Totale indicativo",
        "cart.request_note":
          "Pagamento non ancora online: invia la lista e ti confermiamo disponibilità e prezzo finale.",
        "cart.mail_subject": "Richiesta semi Orto in Serra",
        "cart.pack_many": "{count} bustine",
        "cart.seeds_per_pack": "{count} semi/busta",
        "cart.per_pack": "/busta",
        "conf.cart_hint_one": "1 seme pronto da importare",
        "conf.cart_hint_many": "{count} semi pronti da importare",
        "cart.empty_conf":
          "Nessun seme ancora.<br>Pianifica la serra e aggiungi i semi!",
        "season_name.winter": "🌨️  Inverno",
        "season_name.spring": "🌸  Primavera",
        "season_name.summer": "☀️  Estate",
        "season_name.autumn": "🍂  Autunno",
        "contatti.kicker": "Parlaci",
        "contatti.heading": "Contattaci",
        "contatti.lbl.indirizzo": "Indirizzo",
        "contatti.lbl.telefono": "Telefono",
        "contatti.lbl.email": "Email",
        "contatti.lbl.orari": "Orari",
        "contatti.val.orari": "Lun – Ven: 9:00 – 18:00<br>Sabato: 9:00 – 13:00",
        "contatti.map_note": "Mappa disponibile prossimamente",
        "footer.consiglio_kicker": "Consiglio del mese",
        "footer.esplora": "Esplora",
        "footer.kit": "📦 Kit del mese",
        "footer.legale": "Legale",
        "footer.privacy": "Privacy Policy",
        "footer.cookie": "Cookie Policy",
        "footer.termini": "Termini di Servizio",
        "footer.accessibilita": "Accessibilità",
        "footer.supporto_title": "Supporto",
        "footer.rights": "Tutti i diritti riservati",
        "footer.disclaimer":
          "Le distanze, i periodi di semina e gli abbinamenti sono stime pratiche. Varietà, microclima e tecnica individuale possono cambiare il risultato.",
        "cookie.text":
          "Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico del sito. Consulta la nostra",
        "cookie.policy": "Cookie Policy",
        "cookie.text2": "per saperne di più.",
        "cookie.accept": "Accetta",
        "cookie.reject": "Solo essenziali",
        "hero.kicker_active": "Stagione attiva",
        "hero.headline": "Semi freschi per la tua serra.",
        "hero.sub":
          "40+ varietà filtrate per clima e mese. Aggiungi al carrello e pianta con metodo.",
        "hero.action_catalog": "Sfoglia il catalogo",
        "hero.action_cfg": "Configura la serra",
        "hero.controls_hint": "Com'è il clima fuori dalla tua serra?",
        "hero.path_label": "Scegli il tuo percorso",
        "hero.cfg_badge": "Strumento interattivo",
        "hero.cfg_title": "Progetta la tua serra, vista dall'alto",
        "hero.cfg_desc":
          "Misure reali, clima e colture disposte aiuola per aiuola. Vedi com'è prima ancora di seminare.",
        "hero.cfg_cta": "Apri il configuratore",
        "hero.cfg_or": "oppure sfoglia il catalogo semi",
        "hero.cfg_personas_label": "Entra come",
        "hero.cfg_novizio": "Principiante",
        "hero.cfg_intermedio": "Intermedio",
        "hero.cfg_esperto": "Esperto",
        "hero.cfg_caption": "Anteprima · vista dall'alto",
        "hero.cfg_levels_title": "Che tipo di coltivatore sei?",
        "hero.cfg_nov_hint": "Orto pronto, guidato passo passo",
        "hero.cfg_int_hint": "Guidato, ma personalizzabile",
        "hero.cfg_exp_hint": "Catalogo completo, scelta libera",
        "nav.brand_sub": "Coltiva con un piano",
        "detail.how_to_sow": "Come si semina",
        "detail.spacing_label": "Spaziatura",
        "detail.in_row": "sulla fila",
        "detail.between_rows": "tra le file",
        "detail.diff_easy": "★ Facile",
        "detail.diff_medium": "★★ Medio",
        "detail.diff_hard": "★★★ Difficile",
        "detail.difficulty": "Difficoltà",
        "detail.price_pack": "Prezzo / bustina",
        "detail.seeds_pack": "Semi / bustina",
        "detail.height_range": "Altezza",
        "detail.water_needs": "Acqua",
        "detail.in_greenhouse": "In serra",
        "detail.overview": "Panoramica",
        "detail.practical_note": "Nota pratica",
        "detail.tab_overview": "Panoramica",
        "detail.tab_cultivation": "Coltivazione",
        "detail.tab_calendar": "Calendario",
        "detail.tab_care": "Cure",
        "detail.tab_harvest": "Raccolta",
        "detail.tabs_title": "Sezioni della scheda",
        "detail.tabs_hint": "Seleziona una voce per cambiare contenuto",
        "detail.cultivation_title": "Guida alla coltivazione",
        "detail.cultivation_subtitle": "Dalla semina alla pianta adulta",
        "detail.calendar_title": "Calendario stagionale",
        "detail.calendar_subtitle": "Adattato a zona climatica e riscaldamento",
        "detail.care_title": "Cure e problemi comuni",
        "detail.care_subtitle": "Prevenzione, manutenzione e consociazioni",
        "detail.harvest_title": "Raccolta e utilizzo",
        "detail.harvest_subtitle": "Quando raccogliere e come conservare",
        "detail.tech_soil": "Terreno e substrato",
        "detail.tech_exposure": "Luce e microclima",
        "detail.tech_irrigation": "Irrigazione pratica",
        "detail.tech_feeding": "Concimazione",
        "detail.tech_maintenance": "Manutenzione della pianta",
        "detail.tech_problems": "Problemi da controllare",
        "detail.tech_prevention": "Prevenzione in serra",
        "detail.tech_rotation": "Rotazione e fine ciclo",
        "detail.tech_maturity": "Tempi di maturazione",
        "detail.tech_harvest_method": "Come raccogliere",
        "detail.tech_yield": "Resa indicativa",
        "detail.tech_storage": "Conservazione",
        "detail.diseases_title": "Malattie comuni",
        "detail.diseases_subtitle":
          "Riconosci i sintomi e intervieni in modo mirato",
        "detail.diseases_count": "{count} patologie",
        "detail.disease_symptoms": "Sintomi da osservare",
        "detail.disease_action": "Cosa fare",
        "detail.treatment_note":
          "Prima di usare un prodotto fitosanitario, verifica che sia autorizzato per la coltura e segui sempre l'etichetta.",
        "detail.quantity_bed": "Quantità nell'aiuola",
        "detail.plants_count": "{count} piante",
        "detail.pests_title": "Insetti e parassiti",
        "detail.pests_subtitle":
          "Riconosci il danno prima di scegliere l'intervento",
        "detail.pests_count": "{count} parassiti",
        "detail.pest_signs": "Segni da osservare",
        "detail.pest_action": "Come intervenire",
        "detail.pest_products": "Prodotti fitosanitari",
        "detail.pest_note":
          "Controlla anche la pagina inferiore delle foglie. Se non riconosci il parassita, fotografa insetto e danno prima di trattare.",
        "detail.sow_method": "Metodo",
        "detail.sow_depth": "Profondità",
        "detail.sow_thin": "Spaziatura",
        "detail.sow_period": "Periodo di semina",
        "detail.sow_temp": "Temperatura di germinazione",
        "detail.sow_germ": "Tempo di germinazione",
        "detail.sow_exposure": "Esposizione",
        "detail.sow_water": "Irrigazione",
        "preconfig.title": "La tua serra",
        "preconfig.tag": "Imposta i parametri",
        "preconfig.sizes_label": "1. Misure interne",
        "preconfig.sizes_badge": "Fondamentale",
        "preconfig.sizes_note": "Le dimensioni determinano quante aiuole e piante puoi coltivare.",
        "preconfig.width": "Larghezza",
        "preconfig.length": "Lunghezza",
        "preconfig.path_label": "Camminamento tra aiuole",
        "preconfig.climate_label": "2. Clima",
        "preconfig.zona_label": "Zona",
        "preconfig.serra_label": "Serra",
        "preconfig.serra_cold": "Fredda",
        "preconfig.serra_heated": "Riscaldata",
        "preconfig.month_label": "3. Mese di semina",
        "preconfig.cta": "Vai al configuratore"
      },
      ro: {
        "page.title": "Grădină în seră · Cultivă inteligent",
        "nav.home": "🏠 Acasă",
        "nav.stagione": "🌿 Catalog complet",
        "nav.catalog_all": "🌿 Catalog complet",
        "nav.abbinamenti": "🤝 Combinații",
        "nav.configuratore": "📐 Configurator",
        "nav.contatti": "✉️ Contact",
        "nav.carrello": "Coș",
        "hero.zone_label": "Alegeți zona dvs. climatică",
        "hero.greenhouse_label": "Tip de Seră",
        "hero.zone_cold": "❄️Zona climatică Rece",
        "hero.zone_temp": "🌤️Zona climatică Temperată",
        "hero.zone_warm": "☀️Zona climatică Caldă",
        "hero.zone_cold_label": "Rece",
        "hero.zone_temp_label": "Temperată",
        "hero.zone_warm_label": "Caldă",
        "hero.zone_cold_hint": "ierni aspre",
        "hero.zone_temp_hint": "înghețuri ocazionale",
        "hero.zone_warm_hint": "ierni blânde",
        "hero.heated_off": "Încălzire oprită",
        "hero.heated_on": "🔥 Încălzire activă",
        "hero.filter_note_cold":
          "Încălzire oprită: selecție pentru seră protejată, dar neîncălzită.",
        "hero.filter_note_zone_cold":
          "Zonă rece: înghețuri frecvente și iarnă aspră. Fără încălzire nu recomandăm semănarea în decembrie și ianuarie.",
        "hero.filter_note_zone_temp":
          "Zonă temperată: anotimpuri distincte și înghețuri ocazionale. Folosim lunile obișnuite de semănat în seră.",
        "hero.filter_note_zone_warm":
          "Zonă caldă: iarnă blândă sau aproape fără îngheț. Perioada de semănat se extinde cu aproximativ o lună înainte și după.",
        "hero.filter_note_heated":
          "Seră încălzită: perioada de semănat se extinde cu aproximativ o lună înainte și după, indiferent de zona aleasă.",
        "hero.cta_plants": "Creează grădina mea ghidată",
        "hero.cta_config": "Vezi semințele potrivite",
        "hero.scroll": "derulează",
        "path.kicker": "Alege traseul",
        "path.heading": "De unde vrei să începi?",
        "path.lead":
          "Trei intrări diferite, gândite pentru decizii importante: un plan ghidat, o planșă liberă sau catalogul semințelor potrivite sezonului tău.",
        "path.auto_badge": "Recomandat",
        "path.auto_kicker": "Plan automat",
        "path.auto_title": "Ghidează-mă pas cu pas",
        "path.auto_desc":
          "Îți pregătesc imediat o grădină completă pentru luna curentă. Poți modifica dimensiuni, climă și plante oricând.",
        "path.auto_benefit_1": "Alegeri deja ordonate",
        "path.auto_benefit_2": "Potrivit lunii și climei",
        "path.auto_benefit_3": "Editabil oricând",
        "path.auto_action": "Creează grădina mea",
        "path.free_kicker": "Configurator",
        "path.free_label": "Proiect liber",
        "path.free_hint": "Alege dimensiuni, culturi și aranjare fără ghid.",
        "path.free_action": "Deschide",
        "path.mid_label": "Ghidat și personalizabil",
        "path.mid_hint": "Pornești gata, apoi modifici culturile",
        "path.semi_kicker": "Catalog semințe",
        "path.semi_title": "Răsfoiește semințele de sezon",
        "path.semi_desc":
          "Răsfoiește catalogul filtrat după lună și climă. Adaugă semințele în coș și importă-le în configurator.",
        "path.semi_action": "Vezi catalogul",
        "path.note":
          "Poți schimba oricând traseul: configuratorul păstrează alegerile și te lasă să revii în flux când vrei.",
        "calendar.kicker": "Anul în seră",
        "calendar.heading": "Câte plante poți semăna în fiecare lună",
        "companions.kicker": "Botanică relațională",
        "companions.heading": "Se potrivesc în seră",
        "companions.copy":
          "Plante care cresc mai bine împreună: beneficii reciproce, mai puțini dăunători, recoltă mai bună.",
        "companions.empty":
          "Nu există combinații disponibile pentru această lună și zonă.",
        "companions.reason_1": "Se protejează reciproc de afide",
        "companions.reason_2": "Folosesc mai eficient spațiul la rădăcină",
        "companions.reason_3": "Atrag polenizatori utili",
        "companions.badge_1": "✅&nbsp;Combinație clasică",
        "companions.badge_2": "✅&nbsp;Combinație recomandată",
        "companions.badge_3": "✅&nbsp;Combinație sinergică",
        "companions.add_pair": "+ Adaugă perechea",
        "companions.in_cart_pair": "✓&nbsp;Perechea este în coș",
        "companions.summary": "{count} perechi potrivite pentru {month}",
        "companions.pair_number": "Perechea {number}",
        "kit.kicker": "Deja compatibile între ele",
        "kit.heading": "Kit-ul lunii · {month}",
        "kit.desc":
          "{count} soiuri compatibile între ele, perfecte pentru început luna aceasta.",
        "kit.add_all": "+ Adaugă tot în coș",
        "kit.compat": "Verificat: nicio incompatibilitate în kit",
        "kit.plan_link": "Adaugă kitul și planifică",
        "kit.title_1": "Kit de iarnă",
        "kit.title_2": "Kit timpuriu de primăvară",
        "kit.title_3": "Kit de primăvară",
        "kit.title_4": "Kit de primăvară",
        "kit.title_5": "Kit de mai",
        "kit.title_6": "Kit estival în seră",
        "kit.title_7": "Kit de vară",
        "kit.title_8": "Kit de sfârșit de vară",
        "kit.title_9": "Kit de toamnă",
        "kit.title_10": "Kit de toamnă",
        "kit.title_11": "Kit toamnă-iarnă",
        "kit.title_12": "Kit de iarnă",
        "conf.kicker": "Traseu ghidat",
        "conf.title": "Planifică sera de sus",
        "conf.desc":
          "Introdu dimensiunile, luna și zona: configuratorul îți arată ce să semeni, unde să pui plantele și câte semințe să pregătești. Poți porni de la un plan ușor și îl poți schimba oricând.",
        "conf.open": "Deschide configuratorul ghidat",
        "conf.import": "Importă semințele și planifică",
        "conf.import_label": "Ai deja semințe în coș?",
        "conf.cart_hint_empty": "Adaugă mai întâi semințe în coș.",
        "conf.feature_measures": "Dimensiuni reale",
        "conf.feature_spacing": "Spațiere",
        "conf.feature_compat": "Compatibilitate",
        "conf.feature_print": "Tipărire",
        "season.title": "{count} plante pentru {month}",
        "season.meta": "Zonă {zone} · Seră {greenhouse}",
        "season.empty":
          "Nicio plantă de semănat luna aceasta.<br>Încearcă să activezi sera încălzită.",
        "catalog.kicker": "Ce să plantezi",
        "catalog.lead":
          "Pornește de la lună, climă și spațiul real al serei. Catalogul evidențiază culturile potrivite acum, cu date practice pentru alegeri fără încercări la întâmplare.",
        "catalog.action_search": "Caută o cultură",
        "catalog.action_import": "Importă în configurator",
        "catalog.stat_varieties": "soiuri",
        "catalog.stat_zones": "zone climatice",
        "catalog.stat_months": "luni filtrate",
        "catalog.stat_cart": "în coș",
        "catalog.quickfilter_label": "Răsfoiește după tip",
        "catalog.quickfilter_hint": "Apasă pentru a filtra catalogul instant",
        "catalog.type_frutto": "Fructe",
        "catalog.type_foglia": "Frunze",
        "catalog.type_radice": "Rădăcini",
        "catalog.type_legume": "Leguminoase",
        "catalog.type_aromatica": "Aromatice",
        "catalog.card_kicker": "Verificare rapidă",
        "catalog.card_title": "Înainte să adaugi semințe",
        "catalog.card_subtitle": "Verifică aceste patru semnale",
        "catalog.card_tip":
          "Deschide fișa unei plante pentru a vedea imediat dacă este momentul potrivit pentru semănat.",
        "catalog.feature_sowing_title": "Fereastră de semănare",
        "catalog.feature_sowing_sub": "potrivită lunii selectate",
        "catalog.feature_climate_title": "Compatibilitate climă",
        "catalog.feature_climate_sub": "rece, temperată sau caldă",
        "catalog.feature_space_title": "Spațiu real ocupat",
        "catalog.feature_space_sub": "distanțe utile în seră",
        "catalog.feature_easy_title": "Ușurință la îngrijire",
        "catalog.feature_easy_sub": "ideală dacă pornești de la zero",
        "catalog.search_label": "Caută sămânță",
        "catalog.search_placeholder": "Roșii, busuioc, salată...",
        "catalog.clima_label": "Climă",
        "catalog.filter_type_label": "Tip",
        "catalog.filter_type_hint": "Alege o familie",
        "catalog.filter_search_label": "Căutare",
        "catalog.filter_search_hint": "Rafinează rezultatele",
        "catalog.search_badge": "Caută aici",
        "catalog.search_note": "Tastează roșii, busuioc, salată… găsești imediat planta.",
        "catalog.type_label": "Tip",
        "catalog.type_all": "Toate",
        "catalog.category_label": "Categorii",
        "catalog.category_hint": "Alege o familie de culturi",
        "catalog.sort_label": "Sortează după",
        "catalog.sort_season": "Recomandate",
        "catalog.sort_name": "Nume A-Z",
        "catalog.sort_fast": "Recoltare rapidă",
        "catalog.sort_yield": "Producție mai mare",
        "catalog.sort_distance": "Mai compacte",
        "catalog.sort_price": "Preț mai mic",
        "catalog.insight_seasonal": "potrivite acum",
        "catalog.insight_fast": "rapide",
        "catalog.insight_compact": "compacte",
        "catalog.insight_cart": "în coș",
        "catalog.season_only": "Doar potrivite acum",
        "catalog.off_season": "În afara sezonului",
        "catalog.easy_only": "Ușoare pentru început",
        "catalog.filter_all_plants": "Tot catalogul",
        "catalog.results": "rezultate",
        "catalog.reset": "Resetează filtrele",
        "catalog.reset_short": "Resetează tot",
        "catalog.seeds": "semințe",
        "catalog.show_all": "Arată tot catalogul",
        "catalog.remove_filter": "Elimină filtrul",
        "catalog.clear_search": "Șterge căutarea",
        "catalog.hint_before": "Atinge o plantă pentru detalii · folosește",
        "catalog.hint_after": "pentru a o adăuga direct în coș",
        "catalog.empty":
          "Nu am găsit semințe cu aceste filtre. Scoate un filtru sau schimbă luna.",
        "catalog.search_all":
          "Căutarea include întregul catalog. Unele rezultate pot să nu fie potrivite pentru semănat în {month}.",
        "catalog.count_all": "{count} semințe în catalog",
        "catalog.count_filtered": "{shown} din {total} semințe afișate",
        "zone.freddo": "rece",
        "zone.temperato": "temperată",
        "zone.caldo": "caldă",
        "greenhouse.cold": "rece",
        "greenhouse.heated": "încălzită",
        "type.frutto": "fruct",
        "type.foglia": "frunze",
        "type.radice": "rădăcină",
        "type.legume": "leguminoasă",
        "type.aromatica": "aromatică",
        "plant.perennial": "perenă",
        "plant.days_short": "zile",
        "plant.days_harvest": "{days} zile până la recoltă",
        "plant.full_sun": "soare plin",
        "plant.half_shade": "semiumbră",
        "plant.water": "apă",
        "plant.sun": "soare",
        "plant.height": "înălțime",
        "plant.distance": "distanță",
        "plant.harvest_days": "zile până la recoltă",
        "plant.yield": "recoltă/plantă",
        "water.alta": "multă",
        "water.media": "medie",
        "water.bassa": "puțină",
        "height.alta": "înaltă",
        "height.media": "medie",
        "height.bassa": "joasă",
        "detail.sowing_months": "Luni de semănare",
        "detail.month_available": "Luni potrivite",
        "detail.month_selected": "Lună selectată",
        "detail.month_outside": "În afara ferestrei",
        "detail.friends": "Se potrivește cu",
        "detail.enemies": "Ține departe de",
        "cart.title": "Coșul tău",
        "cart.empty": "Încă nu ai semințe.<br>Adaugă plantele de sezon!",
        "cart.payment_soon": "Plata online vine în curând",
        "cart.plan": "Planifică sau modifică așezarea în seră",
        "cart.plan_hint": "Deschide configuratorul cu semințele alese",
        "cart.species_one": "1 specie",
        "cart.species_many": "{count} specii",
        "cart.checkout": "Trimite cererea",
        "cart.alert":
          "Aș dori disponibilitatea și prețul final pentru aceste semințe:",
        "cart.add": "+ Adaugă",
        "cart.add_plain": "Adaugă",
        "cart.in_cart": "✓&nbsp;În coș",
        "cart.clear": "Golește",
        "cart.remove": "Elimină",
        "cart.add_to_cart": "+ Adaugă în coș",
        "cart.remove_from_cart": "✕ Elimină din coș",
        "cart.view": "Vezi coșul",
        "cart.added_title": "{name} adăugat",
        "cart.added_meta": "{count} semințe în coș",
        "cart.removed_title": "{name} eliminat",
        "cart.removed_meta": "{count} semințe în coș",
        "cart.pack": "1 plic",
        "cart.estimate": "Total orientativ",
        "cart.request_note":
          "Plata nu este încă online: trimite lista și îți confirmăm disponibilitatea și prețul final.",
        "cart.mail_subject": "Cerere semințe Orto in Serra",
        "cart.pack_many": "{count} plicuri",
        "cart.seeds_per_pack": "{count} semințe/plic",
        "cart.per_pack": "/plic",
        "conf.cart_hint_one": "1 sămânță gata de importat",
        "conf.cart_hint_many": "{count} semințe gata de importat",
        "cart.empty_conf":
          "Încă nu ai semințe.<br>Planifică sera și adaugă semințele!",
        "season_name.winter": "🌨️&nbsp;Iarnă",
        "season_name.spring": "🌸&nbsp;Primăvară",
        "season_name.summer": "☀️&nbsp;Vară",
        "season_name.autumn": "🍂&nbsp;Toamnă",
        "contatti.kicker": "Scrie-ne",
        "contatti.heading": "Contact",
        "contatti.lbl.indirizzo": "Adresă",
        "contatti.lbl.telefono": "Telefon",
        "contatti.lbl.email": "Email",
        "contatti.lbl.orari": "Program",
        "contatti.val.orari":
          "Lun – Vin: 9:00 – 18:00<br>Sâmbătă: 9:00 – 13:00",
        "contatti.map_note": "Hartă disponibilă în curând",
        "footer.consiglio_kicker": "Sfatul lunii",
        "footer.esplora": "Explorează",
        "footer.kit": "📦 Kit-ul lunii",
        "footer.legale": "Legal",
        "footer.privacy": "Politică de confidențialitate",
        "footer.cookie": "Politică Cookie",
        "footer.termini": "Termeni de serviciu",
        "footer.accessibilita": "Accesibilitate",
        "footer.supporto_title": "Suport",
        "footer.rights": "Toate drepturile rezervate",
        "footer.disclaimer":
          "Distanțele, perioadele de semănat și combinațiile sunt estimări practice. Varietatea, microclimatul și tehnica individuală pot schimba rezultatul.",
        "cookie.text":
          "Folosim cookie-uri pentru a îmbunătăți experiența de navigare și a analiza traficul site-ului. Consultați",
        "cookie.policy": "Politica Cookie",
        "cookie.text2": "pentru mai multe informații.",
        "cookie.accept": "Accept",
        "cookie.reject": "Doar esențiale",
        "hero.kicker_active": "Sezon activ",
        "hero.headline": "Semințe proaspete pentru sera ta.",
        "hero.sub":
          "40+ soiuri filtrate după climă și lună. Adaugă în coș și plantează cu metodă.",
        "hero.action_catalog": "Răsfoiește catalogul",
        "hero.action_cfg": "Configurează sera",
        "hero.controls_hint": "Cum este clima din afara serei tale?",
        "hero.path_label": "Alege traseul tău",
        "hero.cfg_badge": "Instrument interactiv",
        "hero.cfg_title": "Proiectează-ți sera, văzută de sus",
        "hero.cfg_desc":
          "Dimensiuni reale, climă și culturi aranjate strat cu strat. Vezi cum arată înainte să semeni.",
        "hero.cfg_cta": "Deschide configuratorul",
        "hero.cfg_or": "sau răsfoiește catalogul de semințe",
        "hero.cfg_personas_label": "Intră ca",
        "hero.cfg_novizio": "Începător",
        "hero.cfg_intermedio": "Intermediar",
        "hero.cfg_esperto": "Expert",
        "hero.cfg_caption": "Previzualizare · vedere de sus",
        "hero.cfg_levels_title": "Ce fel de cultivator ești?",
        "hero.cfg_nov_hint": "Grădină gata, ghidat pas cu pas",
        "hero.cfg_int_hint": "Ghidat, dar personalizabil",
        "hero.cfg_exp_hint": "Catalog complet, alegere liberă",
        "nav.brand_sub": "Cultivă cu un plan",
        "detail.how_to_sow": "Cum se seamănă",
        "detail.spacing_label": "Spațiere",
        "detail.in_row": "pe rând",
        "detail.between_rows": "între rânduri",
        "detail.diff_easy": "★ Ușor",
        "detail.diff_medium": "★★ Mediu",
        "detail.diff_hard": "★★★ Dificil",
        "detail.difficulty": "Dificultate",
        "detail.price_pack": "Preț / plic",
        "detail.seeds_pack": "Semințe / plic",
        "detail.height_range": "Înălțime",
        "detail.water_needs": "Apă",
        "detail.in_greenhouse": "În seră",
        "detail.overview": "Prezentare",
        "detail.practical_note": "Notă practică",
        "detail.tab_overview": "Prezentare",
        "detail.tab_cultivation": "Cultivare",
        "detail.tab_calendar": "Calendar",
        "detail.tab_care": "Îngrijire",
        "detail.tab_harvest": "Recoltare",
        "detail.tabs_title": "Secțiunile fișei",
        "detail.tabs_hint": "Alege o opțiune pentru a schimba conținutul",
        "detail.cultivation_title": "Ghid de cultivare",
        "detail.cultivation_subtitle": "De la semănare la planta matură",
        "detail.calendar_title": "Calendar sezonier",
        "detail.calendar_subtitle": "Adaptat zonei climatice și încălzirii",
        "detail.care_title": "Îngrijire și probleme comune",
        "detail.care_subtitle": "Prevenție, întreținere și asocieri",
        "detail.harvest_title": "Recoltare și utilizare",
        "detail.harvest_subtitle": "Când se recoltează și cum se păstrează",
        "detail.tech_soil": "Sol și substrat",
        "detail.tech_exposure": "Lumină și microclimat",
        "detail.tech_irrigation": "Udare practică",
        "detail.tech_feeding": "Fertilizare",
        "detail.tech_maintenance": "Întreținerea plantei",
        "detail.tech_problems": "Probleme de urmărit",
        "detail.tech_prevention": "Prevenție în seră",
        "detail.tech_rotation": "Rotație și final de ciclu",
        "detail.tech_maturity": "Timp de maturare",
        "detail.tech_harvest_method": "Cum se recoltează",
        "detail.tech_yield": "Producție orientativă",
        "detail.tech_storage": "Păstrare",
        "detail.diseases_title": "Boli comune",
        "detail.diseases_subtitle": "Recunoaște simptomele și intervino țintit",
        "detail.diseases_count": "{count} boli",
        "detail.disease_symptoms": "Simptome de urmărit",
        "detail.disease_action": "Ce trebuie făcut",
        "detail.treatment_note":
          "Înainte de a folosi un produs fitosanitar, verifică dacă este autorizat pentru cultură și respectă întotdeauna eticheta.",
        "detail.quantity_bed": "Cantitate în strat",
        "detail.plants_count": "{count} plante",
        "detail.pests_title": "Insecte și dăunători",
        "detail.pests_subtitle":
          "Recunoaște paguba înainte de a alege intervenția",
        "detail.pests_count": "{count} dăunători",
        "detail.pest_signs": "Semne de urmărit",
        "detail.pest_action": "Cum se intervine",
        "detail.pest_products": "Produse fitosanitare",
        "detail.pest_note":
          "Verifică și dosul frunzelor. Dacă nu recunoști dăunătorul, fotografiază insecta și paguba înainte de tratament.",
        "detail.sow_method": "Metodă",
        "detail.sow_depth": "Adâncime",
        "detail.sow_thin": "Spațiere",
        "detail.sow_period": "Perioada de semănat",
        "detail.sow_temp": "Temperatura de germinare",
        "detail.sow_germ": "Timp de germinare",
        "detail.sow_exposure": "Expunere",
        "detail.sow_water": "Udare"
      }
    },
    /* Configuratore: pannelli, controlli, carrello e messaggi tecnici. */
    configurator: {
      it: {
        title: "Orto in Serra · Progetta la tua serra dall'alto",
        "projects.button": "I miei progetti",
        "projects.title": "I miei progetti",
        "projects.intro":
          "Ogni progetto conserva il suo layout, le misure e il mese. Apri, duplica, rinomina o elimina.",
        "projects.new": "Nuovo progetto",
        "projects.default_name": "Progetto {n}",
        "projects.copy_suffix": "(copia)",
        "projects.active": "attivo",
        "projects.varieties": "{n} colture",
        "projects.rename": "Rinomina",
        "projects.duplicate": "Duplica",
        "projects.delete": "Elimina",
        "projects.rename_prompt": "Nome del progetto:",
        "projects.delete_confirm":
          "Eliminare questo progetto? L'azione non è reversibile.",
        "projects.cannot_delete_last": "Non puoi eliminare l'unico progetto.",
        language: "Lingua",
        selected: "Selezionata",
        openSetup: "Riapri configurazione guidata",
        brandTitle: "Orto in Serra",
        brandSub: "Progetta la tua serra vista dall'alto, pianta per pianta",
        guidedAppTitle: "Configuratore Serra",
        guidedAppSub:
          "Progetta il tuo orto pianta per pianta · vista dall'alto",
        modalKicker: "Configurazione iniziale",
        modalTitle: "Prima scegli il clima",
        modalCopy:
          "Userò zona e riscaldamento per mostrarti solo le colture adatte al periodo. Potrai cambiarli anche dopo.",
        guidedModalKicker: "Percorso per iniziare",
        guidedModalTitle: "Partiamo da un orto facile",
        guidedModalCopy:
          "Inserisci misure e clima: preparo un primo progetto da principiante con colture semplici, distanze corrette e quantità modificabili.",
        guidedIntroTitle: "Personalizza il tuo orto",
        guidedIntroCopy:
          "Imposta i dati reali. Riempi automaticamente oppure scegli le colture. Clicca una pianta nella mappa per aprire la scheda con quantità, resa e consigli.",
        guidedIntroNovTitle: "Prepara la tua serra",
        guidedNovStep1:
          "Controlla <strong>larghezza e lunghezza</strong> della tua serra qui sotto",
        guidedNovStep2:
          "Indica se la serra è <strong>riscaldata</strong> e scegli il tuo clima",
        guidedNovStep3:
          "Seleziona il <strong>mese attuale</strong> per colture giuste",
        guidedNovCta: "Verifica le dimensioni della serra",
        guidedIntroExpTitle: "Componi la serra a mano",
        guidedExpStep1:
          "Imposta <strong>misure, clima e mese</strong> per il catalogo completo",
        guidedExpStep2:
          "Sfoglia <strong>tutto il catalogo</strong> e aggiungi le colture che vuoi, anche fuori stagione",
        guidedExpStep3:
          "Disponi le <strong>aiuole</strong> e regola quantità e layout a mano",
        guidedIntroEdit: "Personalizza",
        guidedIntroEditHint: "Modifica misure, piante e layout",
        guidedIntroView: "Vedi il progetto",
        guidedIntroViewHint: "Esplora il piano completo",
        guidedIntroBuy: "Acquista i semi",
        guidedIntroBuyHint: "Vai al catalogo e al carrello",
        guidedIntroSummary:
          "{beds} varietà · {plants} piante · circa {yield} di raccolto",
        vegScrollHint: "Scorri per vedere tutte le colture",
        modalSizeTitle: "Dimensioni serra",
        modalSizeCopy: "Inserisci le misure interne: resteranno salvate.",
        modalZoneTitle: "Zona climatica",
        modalZoneCopy: "Scegli l'opzione più vicina al tuo giardino.",
        zoneColdTitle: "Zona fredda",
        zoneColdCopy: "Nord, montagna, inverni rigidi. Stagione più corta.",
        zoneTempTitle: "Zona temperata",
        zoneTempCopy: "Pianura, collina, gran parte d'Italia.",
        zoneWarmTitle: "Zona calda",
        zoneWarmCopy: "Sud, coste, inverni miti. Stagione più lunga.",
        modalGreenhouseTitle: "Tipo di serra",
        modalGreenhouseCopy:
          "Spunta se puoi mantenere temperature miti in inverno.",
        heated: "Serra riscaldata",
        start: "Crea il primo progetto",
        guidedStart: "Crea il mio orto guidato",
        disclaimer:
          "Le distanze, i periodi di semina e gli abbinamenti sono stime pratiche: varietà, microclima e tecnica possono cambiare il risultato.",
        settingsTitle: "La tua serra",
        settingsSub:
          "Questi dati guidano sia il piano automatico sia la scelta manuale delle colture.",
        openPanel: "Apri",
        closePanel: "Chiudi",
        openPanelLabel: "Apri la tendina",
        closePanelLabel: "Chiudi la tendina",
        openCropsPanel: "Scegli le piante",
        sizes: "1. Misure interne",
        climate: "2. Clima",
        quickStart: "3. Piano automatico",
        width: "Larghezza",
        length: "Lunghezza",
        sowMonth: "Mese di semina",
        pathWidth: "Camminamento tra aiuole",
        zone: "Zona",
        greenhouse: "Serra",
        readyLayouts: "Layout già pronti",
        readyLayoutsHint: "Scegli una disposizione completa da cui partire",
        presetApplied: "{name} applicato",
        presetAppliedHint:
          "Puoi modificarlo oppure tornare alle colture consigliate per il mese scelto.",
        returnSeasonalPlan: "Torna al piano di {month}",
        presetDefault: "Scegli un esempio",
        presetInsalate: "Insalate facili tutto l'anno",
        presetSalsa: "Tutto per la salsa di pomodoro",
        presetPrincipiante: "Orto del principiante",
        presetAromatiche: "Angolo aromatiche",
        presetEstivo: "Orto estivo abbondante",
        presetInvernale: "Serra invernale verde",
        presetRadici: "Radici e bulbi facili",
        presetFoglie: "Taglio continuo di foglie",
        presetBrassicacee: "Cavoli da serra fresca",
        presetPrimaverile: "Orto di primavera",
        presetAutunnale: "Orto d'autunno",
        presetLegumi: "Legumi da baccello",
        presetFrutti: "Ortaggi da frutto",
        presetCucurbitacee: "Zucche e cetrioli",
        presetSoffritto: "Base per soffritto",
        presetGrigliata: "Verdure da grigliare",
        presetFamiglia: "Buono per la famiglia",
        catPresetSeason: "Per stagione",
        catPresetType: "Per tipo di coltura",
        catPresetGoal: "Per obiettivo",
        autoFill: "Auto riempi",
        autoFillCopy: "Sceglie colture di stagione e riempie lo spazio.",
        helper:
          "Usa <b>Auto riempi</b> quando vuoi partire da zero. Dopo ogni modifica il layout si sistema automaticamente.",
        sowAt: "Semina",
        stageTitle: "Vista dall'alto",
        stageSub: "Clicca un'aiuola per i dettagli di coltivazione.",
        viewMode: "Vista",
        viewNatural: "Vista naturale",
        sunMap: "Mappa sole",
        waterMap: "Mappa acqua",
        heightMap: "Altezza piante",
        restoreAutoFill: "Riempi la serra",
        arrangeSelected: "Sistema senza riempire",
        arrangeSelectedHint: "Riordina le aiuole e non cambia i numeri.",
        arrangeSelectedTitle:
          "Riordina la mappa senza cambiare le quantità scelte",
        fillSelected: "Riempi spazi vuoti",
        fillSelectedHint: "Aumenta solo le colture automatiche.",
        cropActionsTitle: "Azioni sulle colture inserite",
        cropActionsHint:
          "Prima regola le quantità, poi scegli se conservarle o riempire gli spazi vuoti.",
        cropsSectionCustomize: "⚙ Personalizza",
        customizeTitle: "Colture nella serra",
        customizeSub:
          "Aggiungi o togli colture. Il filtro In serra mostra solo quelle già presenti nel progetto.",
        noviceCropsNoteTitle: "Vuoi aggiungere nuove piante?",
        noviceCropsNoteText:
          "In modalità Principiante puoi regolare o rimuovere quelle già scelte. Per aggiungerne altre passa a Intermedio.",
        noviceCropsUpgrade: "Passa a Intermedio",
        modeFitTitle: "Piano automatico",
        modeFitHint: "Imposta misure e clima — la serra si riempie da sola",
        modeExpertTitle: "Scegli le colture",
        modeExpertHint: "Aggiungi o rimuovi le piante una a una",
        personaPickLabel: "Da dove vuoi partire?",
        personaPickHint:
          "Scegli il percorso più adatto a te — puoi cambiarlo quando vuoi.",
        personaNovTitle: "Sono alle prime armi",
        personaNovLevel: "(Principiante)",
        personaNovDesc:
          "Ti guido passo passo: clima, serra e un orto pronto fino al carrello",
        personaIntTitle: "Ho un po' di esperienza",
        personaIntLevel: "(Intermedio)",
        personaIntDesc:
          "Parti guidato, poi personalizza le colture e aggiungi semi fuori stagione",
        personaExpTitle: "So già cosa voglio",
        personaExpLevel: "(Esperto)",
        personaExpDesc:
          "Sfoglia tutto il catalogo, di stagione o no, e componi la serra a mano",
        fillSelectedTitle:
          "Riempie lo spazio libero aumentando le colture non modificate e rispettando le quantità cambiate a mano",
        qtyLabel: "Quantità",
        qtyLocked: "manuale",
        qtyAuto: "auto",
        qtyDecrease: "Riduci quantità",
        qtyIncrease: "Aumenta quantità",
        qtyInputAria: "Scrivi quantità per",
        qtySliderAria: "Regola quantità per",
        clearGreenhouseHint: "Rimuove tutte le colture dal progetto.",
        clearGreenhouseLockedHint:
          "Disponibile solo in modalità Intermedio o Esperto.",
        clearGreenhouseTitle: "Rimuove tutte le piante dalla serra",
        clearGreenhouseLockedTitle:
          "Per svuotare la serra passa a Intermedio o Esperto",
        goToGreenhouse: "Vai alla serra",
        goToGreenhouseAria: "Vai alla vista della serra",
        plantSheetTitle: "Scheda pianta",
        closePlantSheet: "Chiudi",
        closePlantSheetAria: "Chiudi scheda pianta",
        printTitle: "Esporta il progetto corrente",
        export: "Esporta",
        exportMenuAria: "Esporta il progetto",
        exportPdf: "Scarica PDF",
        exportPdfHint: "Progetto completo in formato A4",
        exportPrint: "Stampa",
        exportPrintHint: "Apri le opzioni di stampa del browser",
        exportPng: "Scarica immagine PNG",
        exportPngHint: "Immagine completa pronta da condividere",
        exportFileName: "progetto-serra",
        noSelectedPlants:
          "Prima aggiungi una o più piante con il pulsante <b>+</b> nella card <em>Personalizza</em>: poi questo pulsante ottimizzerà la serra solo con quelle.",
        print: "Stampa",
        noSelection: "Dettagli coltura",
        plantInfoHint:
          "Clicca una coltura nella mappa centrale per vedere qui quantità, resa, distanza, acqua, sole e raccolta.",
        noSelectionCopy:
          "Aggiungi un ortaggio dalla card Personalizza, poi toccalo nella serra per vedere come coltivarlo.",
        howTo1:
          "Controlla <strong>misure e clima</strong>: la serra è già pronta per te",
        howTo2:
          "Personalizza le <strong>colture</strong>, anche <em>fuori stagione</em>",
        howTo3:
          "Clicca un'aiuola per vedere la <strong>scheda della pianta</strong>",
        inGreenhouse: "Nella serra",
        bedsSub:
          "Elenco delle aiuole inserite. Clicca una riga per selezionarla.",
        yieldCost: "Lista semi da acquistare",
        yieldSub:
          "Semi necessari e raccolto previsto per realizzare questo progetto.",
        yieldEditCropsLabel: "Modifica colture",
        yieldEditCropsHint:
          "Apri “Scegli le colture” per aggiungere o rimuovere piante.",
        yieldEditCropsAria: "Modifica le colture della serra",
        tagZone: "Zona",
        tagMonth: "Mese",
        tagGreenhouse: "Serra",
        cold: "fredda",
        temperate: "temperata",
        warm: "calda",
        heatedShort: "riscaldata",
        unheated: "Fredda",
        heatedOption: "Riscaldata",
        suitableCrops:
          "<b>{count}</b> piante adatte questo mese — tocca <b>+</b> per aggiungere, <b>×</b> per rimuovere",
        filterDescAll:
          "🌿&nbsp;<b>{count}</b> colture seminabili questo mese per la tua zona — tocca <b>+</b> per aggiungere",
        filterDescIn:
          "✓&nbsp;<b>{count}</b> {label} nella tua serra — <b>−/+</b> quantità · <b>×</b> rimuovi",
        filterDescAllBeds:
          "⌕&nbsp;<b>{count}</b> semi nel catalogo completo · <b>{seasonal}</b> adatti al mese selezionato",
        cropSingular: "coltura",
        cropPlural: "colture",
        offSeason: "fuori stagione",
        noCrops:
          "Nessun ortaggio tipico da seminare in <b>{month}</b> per questa zona. Prova un altro mese, oppure attiva la serra riscaldata.",
        fullSun: "pieno sole",
        halfShade: "mezz'ombra",
        waterHigh: "Molta acqua",
        waterMedium: "Media",
        waterLow: "Poca",
        heightHigh: "Alte",
        heightMedium: "Medie",
        heightLow: "Basse",
        emptyGreenhouse: "Serra vuota",
        emptyBannerTitle: "La serra è vuota",
        emptyBannerCopy:
          "Premi <strong>Riempi la serra</strong> per iniziare in automatico, oppure scegli le piante una per una dalla card <strong>Personalizza</strong>.",
        emptyBannerCopyNovice:
          "La serra si riempie da sola: cambia <strong>mese</strong>, <strong>zona</strong> o <strong>misure</strong> e ti prepariamo subito un nuovo orto di stagione.",
        confirmNoviceReset:
          "In modalità Principiante l'orto viene rigenerato in automatico e le modifiche manuali andranno perse. Vuoi continuare?",
        svgLabel: "Serra vista dall'alto",
        compassSouth: "SUD",
        nightLabel: "NOTTE",
        greenhouseEntrance: "ingresso",
        tooFull: "troppo piena: il layout automatico ha raggiunto il limite",
        organized: "spazio organizzato correttamente",
        emptyStatus: "vuota",
        scale: "Serra {w}×{l} m · usati {used} m su {l} m · {status}",
        noBeds:
          "Nessuna pianta ancora — aggiungi con <b>+</b> o usa <em>Riempi la serra</em>.",
        addEstimate: "Aggiungi piante alla serra per vedere la stima di resa.",
        daysShort: "gg",
        about: "circa",
        piecesShort: "pz",
        plants: "piante",
        estimated: "stimati",
        distance: "Distanza",
        distanceInRow: "fila",
        distanceBetweenRows: "tra file",
        height: "Altezza",
        sun: "Sole",
        water: "Acqua",
        harvest: "Raccolta",
        yieldPlant: "Resa/pianta",
        distanceHelp:
          "Sulla fila × tra le file: spazio minimo tra una pianta e l'altra e tra due file della stessa aiuola.",
        harvestHelp:
          "Giorni indicativi dal trapianto o dalla semina diretta; cambiano con temperatura, varietà e gestione.",
        perennial: "perenne",
        sowingZone: "Semina (questa zona)",
        monthAvailable: "Mesi adatti",
        monthSelected: "Mese selezionato",
        monthOutside: "Fuori finestra",
        howToSow: "Come si semina",
        sowMethod: "Metodo",
        sowDepth: "Profondità",
        sowThin: "Diradamento/trapianto",
        sowTip: "Nota pratica",
        detailHarvestSub: "giorni dal trapianto",
        detailYieldSub: "per pianta",
        friends: "Amiche",
        enemies: "Nemiche",
        removePlant: "Rimuovi dalla serra",
        remove: "Rimuovi",
        overflowWarning:
          "Le aiuole superano la lunghezza della serra. Riduci il numero di piante o ingrandisci la serra (linea rossa = fine serra).",
        autoPlanCompromise:
          "Ho aggiunto una coltura meno ideale perché in questo mese ci sono poche alternative compatibili.",
        autoPlanEmptySeason:
          "In questa zona e in questo mese non ci sono colture adatte alla semina: prova un altro mese, cambia zona climatica oppure attiva il riscaldamento.",
        manualCountRejected:
          "Questa quantità non entra nello spazio disponibile: ho mantenuto il valore precedente.",
        manualCountAdjusted:
          "Ho fatto spazio alla quantità scelta riducendo alcune colture automatiche.",
        addNoSpace:
          "Non c'è spazio per questa coltura: riduci o rimuovi altre piante, oppure ingrandisci la serra.",
        badCompanion:
          "<b>{a}</b> e <b>{b}</b> non si amano: meglio tenerle lontane o separarle con un'altra coltura.",
        goodCompanions: "Buoni abbinamenti presenti: {pairs}.",
        summary:
          "<b>{plants}</b> piante in <b>{beds}</b> aiuole · raccolto stimato <b>{yield}</b> a fine ciclo.",
        shoppingItem: "{count} piante/sementi",
        clearGreenhouse: "Svuota serra",
        /* Categorie piante nella tendina Personalizza */
        vegCat_frutti: "Frutti & ortaggi",
        vegCat_foglie: "Insalate & foglie",
        vegCat_radici: "Radici & bulbi",
        vegCat_aromatiche: "Aromatiche",
        vegCat_legumi: "Legumi",
        vegCat_cavoli: "Cavoli & brassiche",
        vegCatAltro: "Altro",
        /* Difficoltà */
        diffEasy: "★&nbsp;Facile",
        diffMedium: "★★&nbsp;Medio",
        diffHard: "★★★&nbsp;Difficile",
        /* Badge e messaggi lista piante */
        vegInGreenhouse: "✓&nbsp;in serra",
        vegNoMore: "Nessuna pianta in serra per questo mese.",
        /* Filtri tab */
        filterAll: "🌿&nbsp;Seminabili ora",
        filterAllBeds: "📋&nbsp;Piano completo",
        filterEasy: "⭐&nbsp;Facili",
        filterIn: "✓&nbsp;Già aggiunte",
        "yield.varieties": "varietà",
        "yield.plants_label": "piante",
        "yield.harvest": "raccolto stimato",
        "cart.pack_one": "1 bustina",
        "cart.pack_many": "{count} bustine",
        "cart.seeds_per_pack": "{count} semi/busta",
        "cart.per_pack": "busta",
        "cart.total": "Totale stimato",
        "cart.export_btn": "🛒 Aggiungi i semi al carrello",
        "cart.nudge_title": "Semi aggiunti al carrello",
        "cart.nudge_meta_one": "1 varietà aggiunta",
        "cart.nudge_meta_many": "{count} varietà aggiunte",
        "print.title": "Progetto serra",
        "print.greenhouse_info": "Serra {w}×{l} m · {zone} · {month}",
        "print.yield_title": "Resa e spesa",
        "print.plant": "Pianta",
        "print.qty": "Quantità",
        "print.total_yield": "Resa totale",
        "print.shopping": "Da preparare",
        "print.total": "Totale stimato",
        "cart.checkout_msg":
          "Il pagamento online non è ancora attivo.\n\nScrivici a info@ortoinserra.it o chiamaci al +39 055 987 0123 con la tua lista:\n{lines}\n\nTotale: {total}"
      },
      ro: {
        title: "Grădină în seră · Proiectează sera de sus",
        "projects.button": "Proiectele mele",
        "projects.title": "Proiectele mele",
        "projects.intro":
          "Fiecare proiect își păstrează aranjamentul, dimensiunile și luna. Deschide, duplică, redenumește sau șterge.",
        "projects.new": "Proiect nou",
        "projects.default_name": "Proiect {n}",
        "projects.copy_suffix": "(copie)",
        "projects.active": "activ",
        "projects.varieties": "{n} culturi",
        "projects.rename": "Redenumește",
        "projects.duplicate": "Duplică",
        "projects.delete": "Șterge",
        "projects.rename_prompt": "Numele proiectului:",
        "projects.delete_confirm":
          "Ștergi acest proiect? Acțiunea este ireversibilă.",
        "projects.cannot_delete_last": "Nu poți șterge singurul proiect.",
        language: "Limbă",
        selected: "Selectată",
        openSetup: "Redeschide configurarea ghidată",
        brandTitle: "Grădină în seră",
        brandSub: "Proiectează sera de sus, plantă cu plantă",
        guidedAppTitle: "Configurator seră",
        guidedAppSub: "Proiectează grădina plantă cu plantă · vedere de sus",
        modalKicker: "Configurare inițială",
        modalTitle: "Alege mai întâi clima",
        modalCopy:
          "Folosesc zona și încălzirea ca să îți arăt culturile potrivite perioadei. Le poți schimba și după.",
        guidedModalKicker: "Traseu pentru început",
        guidedModalTitle: "Pornim de la o grădină ușoară",
        guidedModalCopy:
          "Introdu dimensiunile și clima: pregătesc un prim proiect pentru începători, cu culturi simple, distanțe corecte și cantități editabile.",
        guidedIntroTitle: "Personalizează-ți grădina",
        guidedIntroCopy:
          "Setează datele reale. Umple automat sau alege culturile. Apasă pe o plantă din hartă pentru fișa cu cantități, recoltă și sfaturi.",
        guidedIntroNovTitle: "Pregătește-ți sera",
        guidedNovStep1:
          "Verifică <strong>lățimea și lungimea</strong> serei tale mai jos",
        guidedNovStep2:
          "Indică dacă sera este <strong>încălzită</strong> și alege clima ta",
        guidedNovStep3:
          "Selectează <strong>luna curentă</strong> pentru culturi potrivite",
        guidedNovCta: "Verifică dimensiunile serei",
        guidedIntroExpTitle: "Compune sera manual",
        guidedExpStep1:
          "Setează <strong>dimensiunile, clima și luna</strong> pentru catalogul complet",
        guidedExpStep2:
          "Răsfoiește <strong>tot catalogul</strong> și adaugă culturile dorite, chiar și în afara sezonului",
        guidedExpStep3:
          "Aranjează <strong>straturile</strong> și ajustează cantitățile și aspectul manual",
        guidedIntroEdit: "Personalizează",
        guidedIntroEditHint: "Modifică dimensiuni, plante și layout",
        guidedIntroView: "Vezi proiectul",
        guidedIntroViewHint: "Explorează planul complet",
        guidedIntroBuy: "Cumpără semințele",
        guidedIntroBuyHint: "Mergi la catalog și coș",
        guidedIntroSummary:
          "{beds} soiuri · {plants} plante · aproximativ {yield} recoltă",
        vegScrollHint: "Derulează pentru a vedea toate culturile",
        modalSizeTitle: "Dimensiunile serei",
        modalSizeCopy: "Introdu dimensiunile interioare: vor rămâne salvate.",
        modalZoneTitle: "Zonă climatică",
        modalZoneCopy: "Alege opțiunea cea mai apropiată de grădina ta.",
        zoneColdTitle: "Zonă rece",
        zoneColdCopy: "Nord, munte, ierni aspre. Sezon mai scurt.",
        zoneTempTitle: "Zonă temperată",
        zoneTempCopy: "Câmpie, deal, cea mai mare parte a Italiei.",
        zoneWarmTitle: "Zonă caldă",
        zoneWarmCopy: "Sud, coastă, ierni blânde. Sezon mai lung.",
        modalGreenhouseTitle: "Tipul serei",
        modalGreenhouseCopy:
          "Bifează dacă poți menține temperaturi blânde iarna.",
        heated: "Seră încălzită",
        start: "Creează primul proiect",
        guidedStart: "Creează grădina mea ghidată",
        disclaimer:
          "Distanțele, perioadele de semănare și asocierile sunt estimări practice: soiul, microclimatul și tehnica pot schimba rezultatul.",
        settingsTitle: "Sera ta",
        settingsSub:
          "Aceste date ghidează atât planul automat, cât și alegerea manuală a culturilor.",
        openPanel: "Deschide",
        closePanel: "Închide",
        openPanelLabel: "Deschide secțiunea",
        closePanelLabel: "Închide secțiunea",
        openCropsPanel: "Alege plantele",
        sizes: "1. Dimensiuni interioare",
        climate: "2. Climă",
        quickStart: "3. Plan automat",
        width: "Lățime",
        length: "Lungime",
        sowMonth: "Luna de semănare",
        pathWidth: "Lățimea aleii dintre straturi",
        zone: "Zonă",
        greenhouse: "Seră",
        readyLayouts: "Planuri pregătite",
        readyLayoutsHint: "Alege un plan complet de la care să pornești",
        presetApplied: "{name} aplicat",
        presetAppliedHint:
          "Îl poți modifica sau poți reveni la culturile recomandate pentru luna aleasă.",
        returnSeasonalPlan: "Revino la planul pentru {month}",
        presetDefault: "Alege un exemplu",
        presetInsalate: "Salate ușoare tot anul",
        presetSalsa: "Totul pentru sos de roșii",
        presetPrincipiante: "Grădina începătorului",
        presetAromatiche: "Colț de plante aromatice",
        presetEstivo: "Grădină de vară bogată",
        presetInvernale: "Seră verde de iarnă",
        presetRadici: "Rădăcini și bulbi ușori",
        presetFoglie: "Frunze pentru tăieri repetate",
        presetBrassicacee: "Verze pentru seră răcoroasă",
        presetPrimaverile: "Grădină de primăvară",
        presetAutunnale: "Grădină de toamnă",
        presetLegumi: "Leguminoase de păstaie",
        presetFrutti: "Legume-fruct",
        presetCucurbitacee: "Dovleci și castraveți",
        presetSoffritto: "Bază pentru sote",
        presetGrigliata: "Legume pentru grătar",
        presetFamiglia: "Bun pentru familie",
        catPresetSeason: "După sezon",
        catPresetType: "După tipul culturii",
        catPresetGoal: "După obiectiv",
        autoFill: "Umple automat",
        autoFillCopy: "Alege culturi de sezon și umple spațiul.",
        helper:
          "Folosește <b>Umple automat</b> când pornești de la zero. După fiecare modificare, planul se aranjează automat.",
        sowAt: "Semănare",
        stageTitle: "Vedere de sus",
        stageSub: "Apasă pe un strat pentru detalii de cultivare.",
        viewMode: "Vedere",
        viewNatural: "Vedere naturală",
        sunMap: "Hartă soare",
        waterMap: "Hartă apă",
        heightMap: "Înălțimea plantelor",
        restoreAutoFill: "Umple sera",
        arrangeSelected: "Aranjează fără umplere",
        arrangeSelectedHint: "Reordonează straturile fără să schimbe numerele.",
        arrangeSelectedTitle:
          "Reordonează harta fără să schimbe cantitățile alese",
        fillSelected: "Umple spațiile libere",
        fillSelectedHint: "Mărește doar culturile automate.",
        cropActionsTitle: "Acțiuni pentru culturile adăugate",
        cropActionsHint:
          "Mai întâi reglează cantitățile, apoi alege dacă le păstrezi sau umpli spațiile libere.",
        cropsSectionCustomize: "⚙ Personalizează",
        customizeTitle: "Culturi în seră",
        customizeSub:
          "Adaugă sau elimină culturi. Filtrul În seră arată doar plantele deja prezente în proiect.",
        noviceCropsNoteTitle: "Vrei să adaugi plante noi?",
        noviceCropsNoteText:
          "În modul Începător poți regla sau elimina plantele deja alese. Pentru a adăuga altele, treci la Intermediar.",
        noviceCropsUpgrade: "Treci la Intermediar",
        modeFitTitle: "Plan automat",
        modeFitHint: "Setează dimensiunile și clima — sera se umple automat",
        modeExpertTitle: "Alege culturile",
        modeExpertHint: "Adaugă sau elimină plantele una câte una",
        personaPickLabel: "De unde vrei să începi?",
        personaPickHint:
          "Alege parcursul potrivit pentru tine — îl poți schimba oricând.",
        personaNovTitle: "Sunt la început",
        personaNovLevel: "(Începător)",
        personaNovDesc:
          "Te ghidez pas cu pas: climă, seră și o grădină gata până la coș",
        personaIntTitle: "Am ceva experiență",
        personaIntLevel: "(Intermediar)",
        personaIntDesc:
          "Pornești ghidat, apoi personalizezi culturile și adaugi semințe în afara sezonului",
        personaExpTitle: "Știu deja ce vreau",
        personaExpLevel: "(Expert)",
        personaExpDesc:
          "Răsfoiește tot catalogul, de sezon sau nu, și compune sera manual",
        fillSelectedTitle:
          "Umple spațiul liber mărind culturile nemodificate și respectând cantitățile schimbate manual",
        qtyLabel: "Cantitate",
        qtyLocked: "manual",
        qtyAuto: "auto",
        qtyDecrease: "Scade cantitatea",
        qtyIncrease: "Mărește cantitatea",
        qtyInputAria: "Scrie cantitatea pentru",
        qtySliderAria: "Reglează cantitatea pentru",
        clearGreenhouseHint: "Elimină toate culturile din proiect.",
        clearGreenhouseLockedHint:
          "Disponibil doar în modul Intermediar sau Expert.",
        clearGreenhouseTitle: "Elimină toate plantele din seră",
        clearGreenhouseLockedTitle:
          "Pentru a goli sera, treci la Intermediar sau Expert",
        goToGreenhouse: "Mergi la seră",
        goToGreenhouseAria: "Mergi la vederea serei",
        plantSheetTitle: "Fișa plantei",
        closePlantSheet: "Închide",
        closePlantSheetAria: "Închide fișa plantei",
        printTitle: "Exportă proiectul curent",
        export: "Exportă",
        exportMenuAria: "Exportă proiectul",
        exportPdf: "Descarcă PDF",
        exportPdfHint: "Proiect complet în format A4",
        exportPrint: "Tipărește",
        exportPrintHint: "Deschide opțiunile de tipărire ale browserului",
        exportPng: "Descarcă imaginea PNG",
        exportPngHint: "Imagine completă, gata de distribuit",
        exportFileName: "proiect-sera",
        noSelectedPlants:
          "Adaugă mai întâi una sau mai multe plante cu butonul <b>+</b> din cardul <em>Personalizează</em>: apoi acest buton va optimiza sera doar cu acelea.",
        print: "Tipărește",
        noSelection: "Detalii cultură",
        plantInfoHint:
          "Apasă pe o cultură din harta centrală pentru a vedea aici cantitate, recoltă, distanță, apă, soare și recoltare.",
        noSelectionCopy:
          "Adaugă o cultură din cardul Personalizează, apoi apasă pe ea în seră pentru detalii.",
        howTo1:
          "Verifică <strong>dimensiunile și clima</strong>: sera este deja pregătită pentru tine",
        howTo2:
          "Personalizează <strong>culturile</strong>, chiar și <em>în afara sezonului</em>",
        howTo3:
          "Apasă pe un strat pentru a vedea <strong>fișa plantei</strong>",
        inGreenhouse: "În seră",
        bedsSub: "Lista straturilor inserate. Clic pe un rând pentru selecție.",
        yieldCost: "Semințe de cumpărat",
        yieldSub:
          "Semințele necesare și recolta estimată pentru realizarea acestui proiect.",
        yieldEditCropsLabel: "Modifică culturile",
        yieldEditCropsHint:
          "Deschide „Alege culturile” pentru a adăuga sau elimina plante.",
        yieldEditCropsAria: "Modifică culturile din seră",
        tagZone: "Zonă",
        tagMonth: "Lună",
        tagGreenhouse: "Seră",
        cold: "rece",
        temperate: "temperată",
        warm: "caldă",
        heatedShort: "încălzită",
        unheated: "Rece",
        heatedOption: "Încălzită",
        suitableCrops:
          "<b>{count}</b> plante potrivite luna aceasta — apasă <b>+</b> pentru a adăuga, <b>×</b> pentru a elimina",
        filterDescAll:
          "🌿&nbsp;<b>{count}</b> culturi de semănat luna aceasta în zona ta — apasă <b>+</b> pentru a adăuga",
        filterDescIn:
          "✓&nbsp;<b>{count}</b> {label} în sera ta — <b>−/+</b> cantitate · <b>×</b> elimină",
        filterDescAllBeds:
          "⌕&nbsp;<b>{count}</b> semințe în catalogul complet · <b>{seasonal}</b> potrivite pentru luna selectată",
        cropSingular: "cultură",
        cropPlural: "culturi",
        offSeason: "în afara sezonului",
        noCrops:
          "Nu există culturi tipice de semănat în <b>{month}</b> pentru această zonă. Încearcă altă lună sau activează sera încălzită.",
        fullSun: "soare plin",
        halfShade: "semiumbră",
        waterHigh: "Multă apă",
        waterMedium: "Mediu",
        waterLow: "Puțină",
        heightHigh: "Înalte",
        heightMedium: "Medii",
        heightLow: "Joase",
        emptyGreenhouse: "Seră goală",
        emptyBannerTitle: "Sera este goală",
        emptyBannerCopy:
          "Apasă <strong>Umple sera</strong> pentru a porni automat, sau alege plantele una câte una din cardul <strong>Personalizează</strong>.",
        emptyBannerCopyNovice:
          "Sera se umple singură: schimbă <strong>luna</strong>, <strong>zona</strong> sau <strong>dimensiunile</strong> și îți pregătim imediat o grădină de sezon.",
        confirmNoviceReset:
          "În modul Începător grădina este regenerată automat și modificările manuale se vor pierde. Vrei să continui?",
        svgLabel: "Seră văzută de sus",
        compassSouth: "SUD",
        nightLabel: "NOAPTE",
        greenhouseEntrance: "intrare",
        tooFull: "prea plină: planul automat a atins limita",
        organized: "spațiu organizat corect",
        emptyStatus: "goală",
        scale: "Seră {w}×{l} m · folosiți {used} m din {l} m · {status}",
        noBeds:
          "Nicio plantă încă — adaugă cu <b>+</b> sau folosește <em>Umple sera</em>.",
        addEstimate: "Adaugă plante în seră pentru a vedea estimarea recoltei.",
        daysShort: "zile",
        about: "aprox.",
        piecesShort: "buc",
        plants: "plante",
        estimated: "estimate",
        distance: "Distanță",
        distanceInRow: "pe rând",
        distanceBetweenRows: "între rânduri",
        height: "Înălțime",
        sun: "Soare",
        water: "Apă",
        harvest: "Recoltare",
        yieldPlant: "Recoltă/plantă",
        distanceHelp:
          "Pe rând × între rânduri: spațiul minim între plante și între două rânduri din același strat.",
        harvestHelp:
          "Zile orientative de la transplantare sau semănare directă; variază cu temperatura, soiul și îngrijirea.",
        perennial: "perenă",
        sowingZone: "Semănare (zona aceasta)",
        monthAvailable: "Luni potrivite",
        monthSelected: "Lună selectată",
        monthOutside: "În afara ferestrei",
        howToSow: "Cum se seamănă",
        sowMethod: "Metodă",
        sowDepth: "Adâncime",
        sowThin: "Rărire/transplantare",
        sowTip: "Notă practică",
        detailHarvestSub: "zile de la transplantare",
        detailYieldSub: "per plantă",
        friends: "Compatibile",
        enemies: "Incompatibile",
        removePlant: "Elimină din seră",
        remove: "Elimină",
        overflowWarning:
          "Straturile depășesc lungimea serei. Redu numărul de plante sau mărește sera (linia roșie = capătul serei).",
        autoPlanCompromise:
          "Am adăugat o cultură mai puțin ideală deoarece luna aceasta există puține alternative compatibile.",
        autoPlanEmptySeason:
          "În această zonă și în această lună nu există culturi potrivite pentru semănat: încearcă altă lună, schimbă zona climatică sau activează încălzirea.",
        manualCountRejected:
          "Această cantitate nu încape în spațiul disponibil: am păstrat valoarea anterioară.",
        manualCountAdjusted:
          "Am făcut loc pentru cantitatea aleasă reducând câteva culturi automate.",
        addNoSpace:
          "Nu este loc pentru această cultură: redu sau elimină alte plante ori mărește sera.",
        badCompanion:
          "<b>{a}</b> și <b>{b}</b> nu se potrivesc: mai bine ține-le la distanță sau separă-le cu altă cultură.",
        goodCompanions: "Asocieri bune prezente: {pairs}.",
        summary:
          "<b>{plants}</b> plante în <b>{beds}</b> straturi · recoltă estimată <b>{yield}</b> la finalul ciclului.",
        shoppingItem: "{count} plante/semințe",
        clearGreenhouse: "Golește sera",
        /* Categorie piante nella sezione Personalizza */
        vegCat_frutti: "Fructe & legume",
        vegCat_foglie: "Salate & frunze",
        vegCat_radici: "Rădăcini & bulbi",
        vegCat_aromatiche: "Aromatice",
        vegCat_legumi: "Leguminoase",
        vegCat_cavoli: "Verze & brasicacee",
        vegCatAltro: "Altele",
        /* Difficoltà */
        diffEasy: "★&nbsp;Ușor",
        diffMedium: "★★&nbsp;Mediu",
        diffHard: "★★★&nbsp;Dificil",
        /* Badge e messaggi della lista piante */
        vegInGreenhouse: "✓&nbsp;în seră",
        vegNoMore: "Nicio plantă în seră pentru această lună.",
        /* Filtri tab */
        filterAll: "🌿&nbsp;De semănat acum",
        filterAllBeds: "📋&nbsp;Plan complet",
        filterEasy: "⭐&nbsp;Ușoare",
        filterIn: "✓&nbsp;Deja adăugate",
        "yield.varieties": "soiuri",
        "yield.plants_label": "plante",
        "yield.harvest": "recoltă estimată",
        "cart.pack_one": "1 pungă",
        "cart.pack_many": "{count} pungi",
        "cart.seeds_per_pack": "{count} sem./pungă",
        "cart.per_pack": "pungă",
        "cart.total": "Total estimat",
        "cart.export_btn": "🛒 Adaugă semințele în coș",
        "cart.nudge_title": "Semințe adăugate în coș",
        "cart.nudge_meta_one": "1 soi adăugat",
        "cart.nudge_meta_many": "{count} soiuri adăugate",
        "print.title": "Plan seră",
        "print.greenhouse_info": "Seră {w}×{l} m · {zone} · {month}",
        "print.yield_title": "Recoltă și cumpărături",
        "print.plant": "Plantă",
        "print.qty": "Cantitate",
        "print.total_yield": "Recoltă totală",
        "print.shopping": "De pregătit",
        "print.total": "Total estimat",
        "cart.checkout_msg":
          "Nu există plată online momentan.\n\nScrie-ne la info@ortoinserra.it sau sună la +39 055 987 0123 cu lista ta:\n{lines}\n\nTotal: {total}",
        "preconfig.title": "Sera ta",
        "preconfig.tag": "Setează parametrii",
        "preconfig.sizes_label": "1. Dimensiuni interne",
        "preconfig.sizes_badge": "Esențial",
        "preconfig.sizes_note": "Dimensiunile determină câte straturi și plante poți cultiva.",
        "preconfig.width": "Lățime",
        "preconfig.length": "Lungime",
        "preconfig.path_label": "Cărare între straturi",
        "preconfig.climate_label": "2. Climă",
        "preconfig.zona_label": "Zonă",
        "preconfig.serra_label": "Seră",
        "preconfig.serra_cold": "Rece",
        "preconfig.serra_heated": "Încălzită",
        "preconfig.month_label": "3. Luna de semănat",
        "preconfig.cta": "Mergi la configurator"
      }
    }
  };
  /* Unificazione traduzioni UI: home e configuratore leggono da un UNICO
     dizionario. I blocchi "index" e "configurator" qui sopra restano solo come
     sorgente organizzata per area, ma vengono fusi in una sola mappa per lingua:
     ogni chiave diventa disponibile in tutta l'app, senza più duplicati.
     In caso di chiave presente in entrambi i blocchi vince "index" (storefront),
     così il carrello mostra lo stesso testo nelle due pagine. */
  const _uiSources = [shared.configurator, shared.index];
  shared.ui = {
    it: Object.assign({}, ..._uiSources.map((s) => s.it || {})),
    ro: Object.assign({}, ..._uiSources.map((s) => s.ro || {}))
  };
  /* Alias retro-compatibili: qualsiasi riferimento a .index o .configurator
     risolve ora sullo stesso dizionario unificato. */
  shared.index = shared.ui;
  shared.configurator = shared.ui;
  global.SERRA_I18N = Object.assign({}, global.SERRA_I18N || {}, shared);
})(window);
