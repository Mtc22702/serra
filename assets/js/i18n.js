// Dizionario traduzioni
(function (global) {
  const shared = {
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
        "nav.menu_explore": "Esplora",
        "nav.menu_preferences": "Preferenze",
        "nav.theme": "Tema",
        "nav.theme_hint": "Chiaro / scuro",
        "nav.language": "Lingua",
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
        "catalog.search_note":
          "Digita pomodoro, basilico, lattuga… trova subito la pianta.",
        "catalog.type_label": "Tipo",
        "catalog.type_all": "Tutti",
        "catalog.category_label": "Categorie",
        "catalog.category_hint": "Scegli una famiglia di colture",
        "catalog.sort_label": "Ordina per",
        "catalog.sort_season": "Ordina: Consigliati",
        "catalog.sort_name": "Ordina: Nome A-Z",
        "catalog.sort_fast": "Ordina: Raccolta più veloce",
        "catalog.sort_yield": "Ordina: Resa più alta",
        "catalog.sort_distance": "Ordina: Più compatti",
        "catalog.sort_price": "Ordina: Prezzo più basso",
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
        "catalog.load_more": "Mostra altri {count}",
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
        "cart.checkout": "Completa acquisto",
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
          "Confermando crei un ordine reale (pagamento non online): ti confermiamo disponibilità e prezzo finale. Per completarlo serve accedere alla tua Area Personale.",
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
        "contatti.lbl.social": "Social",
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
        "cookie.mobile_link": "Cookie e privacy",
        "cookie.accept": "Accetta",
        "cookie.reject": "Solo essenziali",
        "hero.kicker_active": "Stagione attiva",
        "hero.headline": "Progetta la serra. Scegli i semi giusti.",
        "hero.sub":
          "40+ varietà filtrate per clima e mese. Aggiungi al carrello e pianta con metodo.",
        "hero.action_catalog": "Sfoglia il catalogo",
        "hero.action_cfg": "Configura la serra",
        "hero.controls_hint": "Com'è il clima fuori dalla tua serra?",
        "hero.path_label": "Scegli il tuo percorso",
        "hero.cfg_badge": "Strumento interattivo",
        "hero.cfg_title": "La tua serra, il tuo percorso",
        "hero.cfg_desc":
          "Parti dal livello che ti rappresenta: la vista dall'alto resta il centro del progetto, dalla prima scelta fino ai semi.",
        "hero.cfg_cta": "Apri il configuratore",
        "hero.cfg_or": "Sei esperto? Acquista direttamente dal catalogo",
        "hero.cfg_personas_label": "Entra come",
        "hero.cfg_novizio": "Principiante",
        "hero.cfg_intermedio": "Intermedio",
        "hero.cfg_esperto": "Esperto",
        "hero.cfg_caption": "Anteprima · vista dall'alto",
        "hero.cfg_levels_title": "Che tipo di coltivatore sei?",
        "hero.cfg_nov_hint":
          "Ti guido dalla prima scelta fino all'acquisto",
        "hero.cfg_int_hint":
          "Parti da un piano pronto e personalizzalo",
        "hero.cfg_exp_hint":
          "Scegli un layout pronto oppure componi liberamente",
        "hero.cfg_choose": "Apri",
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
        "preconfig.sizes_note":
          "Le dimensioni determinano quante aiuole e piante puoi coltivare.",
        "preconfig.width": "Larghezza",
        "preconfig.length": "Lunghezza",
        "preconfig.path_label": "Camminamento tra aiuole",
        "preconfig.climate_label": "2. Clima",
        "preconfig.zona_label": "Zona",
        "preconfig.serra_label": "Serra",
        "preconfig.serra_cold": "Fredda",
        "preconfig.serra_heated": "Riscaldata",
        "preconfig.month_label": "3. Mese di semina",
        "preconfig.cta": "Vai al configuratore",
        "nav.aria_main": "Navigazione principale",
        "nav.account": "👤 Area Personale",
        "footer.tip_default":
          "Annaffia alla base, mai sulle foglie: previeni l'oidio.",
        "cart.aria_open": "Apri carrello",
        "hero.aria_levels": "Scegli il livello",
        "catalog.aria_filters": "Filtri catalogo semi",
        "catalog.aria_climate_filters": "Filtri clima",
        "search.aria_clear": "Cancella ricerca",
        "catalog.aria_scope": "Ambito catalogo",
        "catalog.aria_sort": "Ordina per",
        "catalog.aria_view": "Visualizzazione catalogo",
        "catalog.mobile_filters": "Filtri",
        "catalog.aria_search": "Cerca una pianta nel catalogo",
        "catalog.title_grid": "Vista griglia",
        "catalog.title_compact": "Vista compatta",
        "detail.aria_close": "Chiudi scheda pianta",
        "detail.aria_tabs": "Sezioni della scheda tecnica",
        "backtotop.aria": "Torna all'inizio della pagina",
        "preconfig.aria_close": "Chiudi pannello",
        "footer.motto": "Pianta con cura, raccogli con gioia.",
        "cart.checkout_login_required":
          "Per completare l'acquisto ed inviare la richiesta dei semi, devi prima accedere o registrarti alla tua Area Personale.",
        "cart.order_success":
          "Ordine {id} inviato con successo!\nTrovi lo storico della spedizione nella tua Area Personale."
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
        "nav.menu_explore": "Explorează",
        "nav.menu_preferences": "Preferințe",
        "nav.theme": "Temă",
        "nav.theme_hint": "Luminos / întunecat",
        "nav.language": "Limbă",
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
        "catalog.search_note":
          "Tastează roșii, busuioc, salată… găsești imediat planta.",
        "catalog.type_label": "Tip",
        "catalog.type_all": "Toate",
        "catalog.category_label": "Categorii",
        "catalog.category_hint": "Alege o familie de culturi",
        "catalog.sort_label": "Sortează după",
        "catalog.sort_season": "Sortează: Recomandate",
        "catalog.sort_name": "Sortează: Nume A-Z",
        "catalog.sort_fast": "Sortează: Recoltare rapidă",
        "catalog.sort_yield": "Sortează: Producție mai mare",
        "catalog.sort_distance": "Sortează: Mai compacte",
        "catalog.sort_price": "Sortează: Preț mai mic",
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
        "catalog.load_more": "Arată încă {count}",
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
        "cart.checkout": "Finalizează achiziția",
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
          "Confirmând creezi o comandă reală (fără plată online): îți confirmăm disponibilitatea și prețul final. Pentru a o finaliza trebuie să accesezi Contul tău.",
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
        "contatti.lbl.social": "Social",
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
        "cookie.mobile_link": "Cookie și confidențialitate",
        "cookie.accept": "Accept",
        "cookie.reject": "Doar esențiale",
        "hero.kicker_active": "Sezon activ",
        "hero.headline": "Planifică sera. Alege semințele potrivite.",
        "hero.sub":
          "40+ soiuri filtrate după climă și lună. Adaugă în coș și plantează cu metodă.",
        "hero.action_catalog": "Răsfoiește catalogul",
        "hero.action_cfg": "Configurează sera",
        "hero.controls_hint": "Cum este clima din afara serei tale?",
        "hero.path_label": "Alege traseul tău",
        "hero.cfg_badge": "Instrument interactiv",
        "hero.cfg_title": "Sera ta, traseul tău",
        "hero.cfg_desc":
          "Pornește de la nivelul care ți se potrivește: vederea de sus rămâne centrul proiectului, de la prima alegere până la semințe.",
        "hero.cfg_cta": "Deschide configuratorul",
        "hero.cfg_or": "Ești expert? Cumpără direct din catalog",
        "hero.cfg_personas_label": "Intră ca",
        "hero.cfg_novizio": "Începător",
        "hero.cfg_intermedio": "Intermediar",
        "hero.cfg_esperto": "Expert",
        "hero.cfg_caption": "Previzualizare · vedere de sus",
        "hero.cfg_levels_title": "Ce fel de cultivator ești?",
        "hero.cfg_nov_hint":
          "Te ghidez de la prima alegere până la cumpărare",
        "hero.cfg_int_hint":
          "Pornești de la un plan gata și îl personalizezi",
        "hero.cfg_exp_hint": "Alege un plan gata sau compune liber",
        "hero.cfg_choose": "Deschide",
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
        "detail.quantity_bed": "Cantitate în parcelă",
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
        "detail.sow_water": "Udare",
        "nav.aria_main": "Navigare principală",
        "nav.account": "👤 Contul Meu",
        "footer.tip_default": "Udă la bază, niciodată pe frunze: previne oidiumul.",
        "cart.aria_open": "Deschide coșul",
        "hero.aria_levels": "Alege nivelul",
        "catalog.aria_filters": "Filtre catalog semințe",
        "catalog.aria_climate_filters": "Filtre climă",
        "search.aria_clear": "Șterge căutarea",
        "catalog.aria_scope": "Domeniul catalogului",
        "catalog.aria_sort": "Sortează după",
        "catalog.aria_view": "Afișare catalog",
        "catalog.mobile_filters": "Filtre",
        "catalog.aria_search": "Caută o plantă în catalog",
        "catalog.title_grid": "Vizualizare grilă",
        "catalog.title_compact": "Vizualizare compactă",
        "detail.aria_close": "Închide fișa plantei",
        "detail.aria_tabs": "Secțiuni ale fișei tehnice",
        "backtotop.aria": "Înapoi sus pe pagină",
        "preconfig.aria_close": "Închide panoul",
        "footer.motto": "Plantează cu grijă, culege cu bucurie.",
        "cart.checkout_login_required":
          "Pentru a finaliza achiziția și a trimite cererea de semințe, trebuie mai întâi să te autentifici sau să te înregistrezi în Contul Meu.",
        "cart.order_success":
          "Comanda {id} a fost trimisă cu succes!\nGăsești istoricul livrării în Contul Meu."
      }
    },

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
        "calendar.button": "Calendario",
        "calendar.title": "Calendario di manutenzione",
        "calendar.intro":
          "Semina, trapianto, cura e raccolta stimate mese per mese, adattate alla tua serra.",
        "calendar.empty":
          "Aggiungi colture alla serra per costruire il tuo piano personale.",
        "calendar.empty_title": "Il progetto è ancora vuoto",
        "calendar.explore_all": "Esplora tutte le colture",
        "calendar.view_project": "Il mio progetto",
        "calendar.view_all": "Tutte le colture",
        "calendar.search": "Cerca una pianta",
        "calendar.category": "Categoria",
        "calendar.all_categories": "Tutte le categorie",
        "calendar.sow": "Semina",
        "calendar.transplant": "Trapianto",
        "calendar.care": "Cura",
        "calendar.harvest": "Raccolta",
        "calendar.this_month": "questo mese",
        "calendar.harvestable_short": "raccoglibili",
        "calendar.summary": "{all} raccoglibili · {project} nel tuo progetto",
        "calendar.heated": "serra riscaldata",
        "calendar.unheated": "serra fredda",
        "calendar.continuous": "tutto l'anno",
        "calendar.continuous_harvest": "raccolta continua",
        "calendar.perennial": "pianta perenne",
        "calendar.days": "circa {days} giorni",
        "calendar.sowing_window": "Finestra di semina",
        "calendar.harvest_window": "Periodo di raccolta",
        "calendar.cycle": "Ciclo indicativo",
        "calendar.results": "{count} colture con attività",
        "calendar.harvest_results": "{count} raccoglibili",
        "calendar.no_results_title": "Nessuna coltura trovata",
        "calendar.no_results":
          "Prova un altro mese oppure rimuovi ricerca e filtro.",
        "companion.score_label": "Compatibilità del piano",
        "companion.rating_great": "Ottima",
        "companion.rating_good": "Buona",
        "companion.rating_review": "Da rivedere",
        "companion.bad_reason":
          "Tendono a ostacolarsi: competono per spazio e nutrienti o attirano gli stessi parassiti.",
        "companion.good_reason":
          "Si aiutano a vicenda: migliorano crescita, sapore o tengono lontani i parassiti.",
        "companion.suggest": "Prova invece {friend} (amica di {base}).",
        "companion.suggest_offseason":
          "Valuta {friend} (amica di {base}), da seminare nella sua stagione.",
        "companion.conflict_badge": "Coltura coinvolta in un conflitto",
        "shop.materials_title": "Materiali extra (opzionali)",
        "shop.materials_hint":
          "I semi sono già nella lista sopra. Aggiungi qui solo i materiali extra che ti servono.",
        "shop.preventivo_total": "Totale materiali selezionati",
        "shop.unit_bags": "{count} sacchi",
        "shop.unit_kg": "{count} kg",
        "shop.unit_pieces": "{count} pz",
        "shop.cat_seeds": "Semi",
        "shop.cat_soil": "Terriccio",
        "shop.cat_fertilizer": "Concime",
        "shop.cat_supports": "Sostegni",
        "shop.cat_accessories": "Etichette",
        "shop.have_it": "Ce l'ho già",
        "shop.add_to_order": "Aggiungi all'ordine",
        "shop.add": "Aggiungi",
        "shop.added": "Aggiunto ✓",
        "shop.materials_badge": "{count} selezionati",
        "shop.seeds_total": "Totale semi",
        "shop.qty_aria": "Quantità",
        "shop.each": "cad.",
        "shop.material": "Materiale",
        "shop.cost": "Costo",
        "shop.estimate_note":
          "Quantità stimate da misure e numero di piante, puoi modificarle. I materiali selezionati vengono aggiunti al tuo ordine insieme ai semi.",
        language: "Lingua",
        selected: "Selezionata",
        openSetup: "Riapri configurazione guidata",
        brandTitle: "Orto in Serra",
        brandSub: "Progetta la tua serra vista dall'alto, pianta per pianta",
        guidedAppTitle: "Configuratore Serra",
        guidedAppSub:
          "Progetta il tuo orto pianta per pianta · vista dall'alto",
        guidedSetupTitle: "Impostazioni iniziali",
        guidedSettingsTitle: "Impostazioni iniziali",
        guidedSetupHint:
          "Qui trovi le scelte fatte prima di entrare nel configuratore",
        guidedSetupAction: "Modifica",
        guidedSetupEditData: "Modifica dati",
        guidedSetupCloseAction: "Chiudi",
        workflowHubAria: "Il tuo percorso di acquisto",
        journeyContextAria: "Stato del percorso corrente",
        workflowHelpAria: "Apri la guida per usare il configuratore",
        workflowHelpShort: "Guida",
        workflowEditTitle: "Personalizza il percorso",
        workflowEditHint:
          "Aggiorna i dati della serra o il livello di esperienza",
        stageContextTitle: "Dati della serra",
        guidedSetupOriginHint:
          "Questi dati sono stati usati per creare il progetto iniziale",
        guidedSetupDimensions: "Dimensioni",
        guidedSetupClimate: "Clima",
        guidedSetupMonth: "Mese di semina",
        modalKicker: "Configurazione iniziale",
        modalTitle: "Prima scegli il clima",
        modalCopy:
          "Userò zona e riscaldamento per mostrarti solo le colture adatte al periodo. Potrai cambiarli anche dopo.",
        guidedModalKicker: "Percorso per iniziare",
        guidedModalTitle: "Partiamo da un orto facile",
        guidedModalCopy:
          "Inserisci misure e clima: preparo un primo progetto da principiante con colture semplici, distanze corrette e quantità modificabili.",
        guidedIntroTitle: "Cosa fare ora",
        guidedIntroHint: "Istruzioni · controlla, personalizza, verifica",
        guidedIntroCopy:
          "Imposta i dati reali. Riempi automaticamente oppure scegli le colture. Clicca una pianta nella mappa per aprire la scheda con quantità, resa e consigli.",
        guidedIntroNovTitle: "Cosa fare ora",
        guidedIntroNovHint: "Istruzioni · segui questi 3 passaggi in ordine",
        guidedNovStep1:
          "Controlla <strong>larghezza e lunghezza</strong> della tua serra qui sotto",
        guidedNovStep2:
          "Indica se la serra è <strong>riscaldata</strong> e scegli il tuo clima",
        guidedNovStep3:
          "Seleziona il <strong>mese attuale</strong> per colture giuste",
        guidedNovCta: "Verifica le dimensioni della serra",
        guidedIntroExpTitle: "Cosa fare ora",
        guidedIntroExpHint: "Istruzioni · imposta, scegli, disponi",
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
        vegSearchLabel: "Cerca coltura",
        vegSearchPlaceholder: "Cerca una pianta...",
        vegSearchBadge: '"Cerca qui"',
        vegSearchClear: "Cancella ricerca",
        vegSearchEmpty: "Nessuna coltura trovata.",
        seedListCollapsed: "Lista semi",
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
        settingsTag: "Impostazioni",
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
        sunSide: "Sole",
        sunTop: "In alto",
        sunBottom: "In basso",
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
        stageMonthKicker: "Semina in",
        stageTitle: "Vista dall'alto",
        stageSub: "Clicca un'aiuola per i dettagli di coltivazione.",
        wizardStep1Label: "Serra e clima",
        wizardStep1Hint: "Misure, zona, mese di semina",
        wizardStep2Label: "Le tue colture",
        wizardStep2Hint: "Scegli o modifica le piante",
        wizardStep3Label: "Lista della spesa",
        wizardStep3Hint: "Rivedi i semi e completa",
        noviceGoToYieldLabel: "Vai alla lista della spesa",
        noviceGoToYieldTitle: "Vai alla lista dei semi da acquistare",
        guidedGearAria: "Apri le impostazioni iniziali e modifica dimensioni, clima o mese",
        guidedGearTitle: "Apri le impostazioni iniziali",
        guidedMetaRowAria: "Modifica i dati iniziali della serra: dimensioni, clima e mese",
        guidedTagsAria: "Dati attuali della serra",
        personaCardsAria: "Livello di esperienza",
        wizardBarAria: "Passi del configuratore",
        stepBtnReduceWidthAria: "Riduci larghezza",
        stepBtnReduceLengthAria: "Riduci lunghezza",
        stepBtnReducePathAria: "Riduci camminamento",
        widthSliderAria: "Larghezza slider",
        lengthSliderAria: "Lunghezza slider",
        inSoleAria: "Lato piu soleggiato",
        btnRipristinaTitle:
          "Rigenera da capo il piano automatico con le colture di stagione (sostituisce le modifiche manuali)",
        btnExpertSeasonalTitle:
          "Crea un piano automatico con le colture di stagione, da cui partire e modificare",
        monthAria: "Mese di semina",
        exportProjectAria: "Esporta il progetto",
        vegFiltersAria: "Filtra piante",
        goToSceneAria: "Vai alla vista della serra",
        noviceRestartRowAria: "Ricomincia da capo",
        btnNoviceRestartTitle: "Ricrea l'orto di stagione da capo",
        cropsCustomizeFooterAria: "Azioni sulle colture inserite",
        btnArrangeSelectedTitle:
          "Riordina la mappa senza cambiare le quantità",
        btnFillSelectedTitle:
          "Riempi gli spazi vuoti usando solo le piante già inserite",
        btnClearTitle: "Rimuove tutte le piante dalla serra",
        cropsHistoryRowAria: "Annulla e ripristina",
        btnUndoTitle: "Annulla l'ultima modifica (Ctrl+Z)",
        btnRedoTitle: "Ripristina la modifica annullata (Ctrl+Shift+Z)",
        projectsCloseAria: "Chiudi",
        calendarToolsAria: "Strumenti calendario",
        calendarViewTabsAria: "Vista calendario",
        calendarMonthStripAria: "Mesi",
        noviceGuideTitle: "Segui il tuo piano",
        noviceGuideTag: "Percorso Principiante",
        noviceGuideStep1:
          "Il badge in alto mostra il percorso attivo: toccalo solo se vuoi scegliere un livello diverso.",
        noviceGuideStep2:
          "Usa \"Ricontrolla scelta\" per rivedere le dimensioni, la zona e il mese già scelti.",
        noviceGuideStep3:
          "Controlla il piano dall'alto: puoi aprire un'aiuola per vedere le colture e le quantità proposte.",
        noviceGuideStep4:
          "Quando il piano ti convince, apri la lista dei semi e aggiungi al carrello solo ciò che ti serve.",
        noviceGuideStep5:
          "Vuoi più libertà? Tocca il badge del percorso e passa a Intermedio, senza perdere il contesto.",
        intermediateGuideTitle: "Personalizza il tuo piano",
        intermediateGuideTag: "Percorso Intermedio",
        intermediateGuideStep1:
          "Il badge in alto mostra il percorso attivo: toccalo quando vuoi passare a Principiante o Esperto.",
        intermediateGuideStep2:
          "Usa \"Ricontrolla scelta\" per rivedere le dimensioni, la zona e il mese già scelti.",
        intermediateGuideStep3:
          "Apri \"Colture nella serra\" per aggiungere, togliere o cambiare le quantità del piano.",
        intermediateGuideStep4:
          "Controlla la serra dall'alto: apri un'aiuola per verificare colture, spazio e dettagli.",
        intermediateGuideStep5:
          "Quando il piano è pronto, apri la lista dei semi e aggiungi al carrello solo ciò che vuoi acquistare.",
        expertGuideTitle: "Componi il tuo piano",
        expertGuideTag: "Percorso Esperto",
        expertGuideStep1:
          "Il badge in alto mostra il percorso attivo: toccalo quando vuoi cambiare livello di autonomia.",
        expertGuideStep2:
          "Usa \"Ricontrolla scelta\" per rivedere le dimensioni, la zona e il mese già scelti.",
        expertGuideStep3:
          "La serra parte libera: apri \"Colture nella serra\" per cercare nel catalogo completo e aggiungere piante.",
        expertGuideStep4:
          "Controlla la serra dall'alto e apri un'aiuola per modificare quantità, spazio e dettagli.",
        expertGuideStep5:
          "Quando il progetto è pronto, apri la lista dei semi e aggiungi al carrello ciò che vuoi acquistare.",
        stageToolsExtra: "Strumenti extra",
        viewMode: "Vista",
        viewNatural: "Vista naturale",
        sunMap: "Mappa sole",
        waterMap: "Mappa acqua",
        heightMap: "Altezza piante",
        restoreAutoFill: "Rigenera piano di stagione",
        noviceRestart: "Ricomincia",
        expertSeasonal: "Genera piano di stagione",
        arrangeSelected: "Riordina le aiuole",
        arrangeSelectedHint: "Sistema la disposizione, le quantità restano uguali.",
        arrangeSelectedTitle:
          "Riordina la mappa senza cambiare le quantità scelte",
        fillSelected: "Riempi spazi vuoti",
        fillSelectedHint: "Aggiunge altre piante già scelte per non lasciare spazio libero.",
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
        personaPickLabel: "Percorso scelto",
        personaPickHint: "Apri per cambiare livello di guida e controllo.",
        personaPickAction: "Cambia",
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
          "Premi <strong>Rigenera piano di stagione</strong> per iniziare in automatico, oppure scegli le piante una per una dalla card <strong>Personalizza</strong>.",
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
          "Nessuna pianta ancora — aggiungi con <b>+</b> o usa <em>Rigenera piano di stagione</em>.",
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
        manualCountBelowMin:
          "Ho fatto spazio alla quantità scelta, ma per riuscirci ho ridotto qualche altra coltura sotto la sua quantità consigliata. Valuta se ingrandire la serra.",
        addNoSpace:
          "Non c'è spazio per questa coltura: riduci o rimuovi altre piante, oppure ingrandisci la serra.",
        badCompanion:
          "<b>{a}</b> e <b>{b}</b> non si amano: meglio tenerle lontane o separarle con un'altra coltura.",
        goodCompanions: "Buoni abbinamenti presenti: {pairs}.",
        summary:
          "<b>{plants}</b> piante in <b>{beds}</b> aiuole · raccolto stimato <b>{yield}</b> a fine ciclo.",
        shoppingItem: "{count} piante/sementi",
        clearGreenhouse: "Svuota serra",
        undoAction: "Annulla",
        redoAction: "Ripristina",

        vegCat_frutti: "Frutti & ortaggi",
        vegCat_foglie: "Insalate & foglie",
        vegCat_radici: "Radici & bulbi",
        vegCat_aromatiche: "Aromatiche",
        vegCat_legumi: "Legumi",
        vegCat_cavoli: "Cavoli & brassiche",
        vegCatAltro: "Altro",

        diffEasy: "★&nbsp;Facile",
        diffMedium: "★★&nbsp;Medio",
        diffHard: "★★★&nbsp;Difficile",

        vegInGreenhouse: "✓&nbsp;in serra",
        vegNoMore: "Nessuna pianta in serra per questo mese.",

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
        "cart.materials_section": "Materiali extra",
        "cart.materials_grand_total": "Totale ordine",
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
        "calendar.button": "Calendar",
        "calendar.title": "Calendar de întreținere",
        "calendar.intro":
          "Semănat, transplantare, îngrijire și recoltare estimate lunar, adaptate serei tale.",
        "calendar.empty":
          "Adaugă culturi în seră pentru a construi planul tău personal.",
        "calendar.empty_title": "Proiectul este încă gol",
        "calendar.explore_all": "Explorează toate culturile",
        "calendar.view_project": "Proiectul meu",
        "calendar.view_all": "Toate culturile",
        "calendar.search": "Caută o plantă",
        "calendar.category": "Categorie",
        "calendar.all_categories": "Toate categoriile",
        "calendar.sow": "Semănat",
        "calendar.transplant": "Transplantare",
        "calendar.care": "Îngrijire",
        "calendar.harvest": "Recoltat",
        "calendar.this_month": "luna aceasta",
        "calendar.harvestable_short": "de recoltat",
        "calendar.summary": "{all} de recoltat · {project} în proiectul tău",
        "calendar.heated": "seră încălzită",
        "calendar.unheated": "seră rece",
        "calendar.continuous": "tot anul",
        "calendar.continuous_harvest": "recoltare continuă",
        "calendar.perennial": "plantă perenă",
        "calendar.days": "aprox. {days} zile",
        "calendar.sowing_window": "Perioada de semănat",
        "calendar.harvest_window": "Perioada de recoltare",
        "calendar.cycle": "Ciclu estimativ",
        "calendar.results": "{count} culturi cu activități",
        "calendar.harvest_results": "{count} de recoltat",
        "calendar.no_results_title": "Nicio cultură găsită",
        "calendar.no_results":
          "Încearcă altă lună sau elimină căutarea și filtrul.",
        "companion.score_label": "Compatibilitatea planului",
        "companion.rating_great": "Excelentă",
        "companion.rating_good": "Bună",
        "companion.rating_review": "De revizuit",
        "companion.bad_reason":
          "Tind să se stânjenească: concurează pentru spațiu și nutrienți sau atrag aceiași dăunători.",
        "companion.good_reason":
          "Se ajută reciproc: îmbunătățesc creșterea, gustul sau țin dăunătorii la distanță.",
        "companion.suggest":
          "Încearcă în schimb {friend} (prietenă cu {base}).",
        "companion.suggest_offseason":
          "Ia în calcul {friend} (prietenă cu {base}), de semănat în sezonul ei.",
        "companion.conflict_badge": "Cultură implicată într-un conflict",
        "shop.materials_title": "Materiale extra (opționale)",
        "shop.materials_hint":
          "Semințele sunt deja în lista de mai sus. Adaugă aici doar materialele extra de care ai nevoie.",
        "shop.preventivo_total": "Total materiale selectate",
        "shop.unit_bags": "{count} saci",
        "shop.unit_kg": "{count} kg",
        "shop.unit_pieces": "{count} buc",
        "shop.cat_seeds": "Semințe",
        "shop.cat_soil": "Pământ",
        "shop.cat_fertilizer": "Îngrășământ",
        "shop.cat_supports": "Suporturi",
        "shop.cat_accessories": "Etichete",
        "shop.have_it": "Le am deja",
        "shop.add_to_order": "Adaugă la comandă",
        "shop.add": "Adaugă",
        "shop.added": "Adăugat ✓",
        "shop.materials_badge": "{count} selectate",
        "shop.seeds_total": "Total semințe",
        "shop.qty_aria": "Cantitate",
        "shop.each": "buc",
        "shop.material": "Material",
        "shop.cost": "Cost",
        "shop.estimate_note":
          "Cantități estimate din dimensiuni și numărul de plante, poți să le modifici. Materialele selectate se adaugă la comanda ta, împreună cu semințele.",
        language: "Limbă",
        selected: "Selectată",
        openSetup: "Redeschide configurarea ghidată",
        brandTitle: "Grădină în seră",
        brandSub: "Proiectează sera de sus, plantă cu plantă",
        guidedAppTitle: "Configurator seră",
        guidedAppSub: "Proiectează grădina plantă cu plantă · vedere de sus",
        guidedSetupTitle: "Setări inițiale",
        guidedSettingsTitle: "Setări inițiale",
        guidedSetupHint:
          "Aici găsești alegerile făcute înainte de a intra în configurator",
        guidedSetupAction: "Modifică",
        guidedSetupEditData: "Modifică datele",
        guidedSetupCloseAction: "Închide",
        workflowHubAria: "Traseul tău de cumpărare",
        journeyContextAria: "Starea traseului curent",
        workflowHelpAria: "Deschide ghidul de utilizare al configuratorului",
        workflowHelpShort: "Ghid",
        workflowEditTitle: "Personalizează traseul",
        workflowEditHint:
          "Actualizează datele serei sau nivelul de experiență",
        stageContextTitle: "Datele serei",
        guidedSetupOriginHint:
          "Aceste date au fost folosite pentru proiectul inițial",
        guidedSetupDimensions: "Dimensiuni",
        guidedSetupClimate: "Climă",
        guidedSetupMonth: "Luna semănatului",
        modalKicker: "Configurare inițială",
        modalTitle: "Alege mai întâi clima",
        modalCopy:
          "Folosesc zona și încălzirea ca să îți arăt culturile potrivite perioadei. Le poți schimba și după.",
        guidedModalKicker: "Traseu pentru început",
        guidedModalTitle: "Pornim de la o grădină ușoară",
        guidedModalCopy:
          "Introdu dimensiunile și clima: pregătesc un prim proiect pentru începători, cu culturi simple, distanțe corecte și cantități editabile.",
        guidedIntroTitle: "Ce faci acum",
        guidedIntroHint: "Instrucțiuni · verifică, personalizează, controlează",
        guidedIntroCopy:
          "Setează datele reale. Umple automat sau alege culturile. Apasă pe o plantă din hartă pentru fișa cu cantități, recoltă și sfaturi.",
        guidedIntroNovTitle: "Ce faci acum",
        guidedIntroNovHint: "Instrucțiuni · urmează acești 3 pași în ordine",
        guidedNovStep1:
          "Verifică <strong>lățimea și lungimea</strong> serei tale mai jos",
        guidedNovStep2:
          "Indică dacă sera este <strong>încălzită</strong> și alege clima ta",
        guidedNovStep3:
          "Selectează <strong>luna curentă</strong> pentru culturi potrivite",
        guidedNovCta: "Verifică dimensiunile serei",
        guidedIntroExpTitle: "Ce faci acum",
        guidedIntroExpHint: "Instrucțiuni · setează, alege, aranjează",
        guidedExpStep1:
          "Setează <strong>dimensiunile, clima și luna</strong> pentru catalogul complet",
        guidedExpStep2:
          "Răsfoiește <strong>tot catalogul</strong> și adaugă culturile dorite, chiar și în afara sezonului",
        guidedExpStep3:
          "Aranjează <strong>parcelele</strong> și ajustează cantitățile și aspectul manual",
        guidedIntroEdit: "Personalizează",
        guidedIntroEditHint: "Modifică dimensiuni, plante și layout",
        guidedIntroView: "Vezi proiectul",
        guidedIntroViewHint: "Explorează planul complet",
        guidedIntroBuy: "Cumpără semințele",
        guidedIntroBuyHint: "Mergi la catalog și coș",
        guidedIntroSummary:
          "{beds} soiuri · {plants} plante · aproximativ {yield} recoltă",
        vegScrollHint: "Derulează pentru a vedea toate culturile",
        vegSearchLabel: "Cauta cultura",
        vegSearchPlaceholder: "Cauta o planta...",
        vegSearchBadge: '"Cauta aici"',
        vegSearchClear: "Sterge cautarea",
        vegSearchEmpty: "Nicio cultura gasita.",
        seedListCollapsed: "Lista semințe",
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
        settingsTag: "Setări",
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
        pathWidth: "Lățimea aleii dintre parcele",
        zone: "Zonă",
        greenhouse: "Seră",
        sunSide: "Soare",
        sunTop: "Sus",
        sunBottom: "Jos",
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
        stageMonthKicker: "Seamănă în",
        stageTitle: "Vedere de sus",
        stageSub: "Apasă pe o parcelă pentru detalii de cultivare.",
        wizardStep1Label: "Seră și climă",
        wizardStep1Hint: "Dimensiuni, zonă, luna de semănat",
        wizardStep2Label: "Culturile tale",
        wizardStep2Hint: "Alege sau modifică plantele",
        wizardStep3Label: "Lista de cumpărături",
        wizardStep3Hint: "Verifică semințele și finalizează",
        noviceGoToYieldLabel: "Mergi la lista de cumpărături",
        noviceGoToYieldTitle: "Mergi la lista semințelor de cumpărat",
        guidedGearAria:
          "Deschide setările inițiale și modifică dimensiunile, clima sau luna",
        guidedGearTitle: "Deschide setările inițiale",
        guidedMetaRowAria: "Modifică datele inițiale ale serei: dimensiuni, climă și lună",
        guidedTagsAria: "Datele actuale ale serei",
        personaCardsAria: "Nivel de experiență",
        wizardBarAria: "Pașii configuratorului",
        stepBtnReduceWidthAria: "Redu lățimea",
        stepBtnReduceLengthAria: "Redu lungimea",
        stepBtnReducePathAria: "Redu cărarea",
        widthSliderAria: "Cursor lățime",
        lengthSliderAria: "Cursor lungime",
        inSoleAria: "Latura cea mai însorită",
        btnRipristinaTitle:
          "Regenerează de la zero planul automat cu culturile de sezon (înlocuiește modificările manuale)",
        btnExpertSeasonalTitle:
          "Creează un plan automat cu culturile de sezon, de la care să pornești și să modifici",
        monthAria: "Luna de semănat",
        exportProjectAria: "Exportă proiectul",
        vegFiltersAria: "Filtrează plantele",
        goToSceneAria: "Mergi la vizualizarea serei",
        noviceRestartRowAria: "Reia de la zero",
        btnNoviceRestartTitle: "Recreează grădina de sezon de la zero",
        cropsCustomizeFooterAria: "Acțiuni asupra culturilor adăugate",
        btnArrangeSelectedTitle:
          "Reordonează harta fără a schimba cantitățile",
        btnFillSelectedTitle:
          "Umple spațiile goale folosind doar plantele deja adăugate",
        btnClearTitle: "Elimină toate plantele din seră",
        cropsHistoryRowAria: "Anulează și refă",
        btnUndoTitle: "Anulează ultima modificare (Ctrl+Z)",
        btnRedoTitle: "Reface modificarea anulată (Ctrl+Shift+Z)",
        projectsCloseAria: "Închide",
        calendarToolsAria: "Instrumente calendar",
        calendarViewTabsAria: "Vizualizare calendar",
        calendarMonthStripAria: "Luni",
        noviceGuideTitle: "Urmează-ți planul",
        noviceGuideTag: "Traseu Începător",
        noviceGuideStep1:
          "Insigna de sus arată traseul activ: atinge-o doar dacă vrei să alegi un alt nivel.",
        noviceGuideStep2:
          "Folosește \"Verifică alegerile\" pentru a revizui dimensiunile, zona și luna deja alese.",
        noviceGuideStep3:
          "Verifică planul de sus: poți deschide o parcelă pentru a vedea plantele și cantitățile propuse.",
        noviceGuideStep4:
          "Când planul te mulțumește, deschide lista de semințe și adaugă în coș doar ce ai nevoie.",
        noviceGuideStep5:
          "Vrei mai multă libertate? Atinge insigna traseului și treci la Intermediar, fără să pierzi contextul.",
        intermediateGuideTitle: "Personalizează-ți planul",
        intermediateGuideTag: "Traseu Intermediar",
        intermediateGuideStep1:
          "Insigna de sus arată traseul activ: atinge-o când vrei să treci la Începător sau Expert.",
        intermediateGuideStep2:
          "Folosește \"Verifică alegerile\" pentru a revizui dimensiunile, zona și luna deja alese.",
        intermediateGuideStep3:
          "Deschide \"Culturile din seră\" pentru a adăuga, elimina sau schimba cantitățile din plan.",
        intermediateGuideStep4:
          "Verifică sera de sus: deschide o parcelă pentru plante, spațiu și detalii.",
        intermediateGuideStep5:
          "Când planul este gata, deschide lista de semințe și adaugă în coș doar ce vrei să cumperi.",
        expertGuideTitle: "Compune-ți planul",
        expertGuideTag: "Traseu Expert",
        expertGuideStep1:
          "Insigna de sus arată traseul activ: atinge-o când vrei să schimbi nivelul de autonomie.",
        expertGuideStep2:
          "Folosește \"Verifică alegerile\" pentru a revizui dimensiunile, zona și luna deja alese.",
        expertGuideStep3:
          "Sera pornește liberă: deschide \"Culturile din seră\" pentru catalogul complet și pentru a adăuga plante.",
        expertGuideStep4:
          "Verifică sera de sus și deschide o parcelă pentru a modifica cantitățile, spațiul și detaliile.",
        expertGuideStep5:
          "Când proiectul este gata, deschide lista de semințe și adaugă în coș ce vrei să cumperi.",
        stageToolsExtra: "Instrumente suplimentare",
        viewMode: "Vedere",
        viewNatural: "Vedere naturală",
        sunMap: "Hartă soare",
        waterMap: "Hartă apă",
        heightMap: "Înălțimea plantelor",
        restoreAutoFill: "Regenerează planul de sezon",
        noviceRestart: "Începe din nou",
        expertSeasonal: "Generează planul de sezon",
        arrangeSelected: "Reordonează parcelele",
        arrangeSelectedHint: "Aranjează dispunerea, cantitățile rămân aceleași.",
        arrangeSelectedTitle:
          "Reordonează harta fără să schimbe cantitățile alese",
        fillSelected: "Umple spațiile libere",
        fillSelectedHint: "Adaugă alte plante deja alese ca să nu rămână spații libere.",
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
        personaPickLabel: "Traseu ales",
        personaPickHint: "Deschide ca să schimbi nivelul de ghidaj și control.",
        personaPickAction: "Schimbă",
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
          "Apasă pe o parcelă pentru a vedea <strong>fișa plantei</strong>",
        inGreenhouse: "În seră",
        bedsSub: "Lista parcelelor introduse. Clic pe un rând pentru selecție.",
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
          "Apasă <strong>Regenerează planul de sezon</strong> pentru a porni automat, sau alege plantele una câte una din cardul <strong>Personalizează</strong>.",
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
          "Nicio plantă încă — adaugă cu <b>+</b> sau folosește <em>Regenerează planul de sezon</em>.",
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
          "Pe rând × între rânduri: spațiul minim între plante și între două rânduri din aceeași parcelă.",
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
          "Parcelele depășesc lungimea serei. Redu numărul de plante sau mărește sera (linia roșie = capătul serei).",
        autoPlanCompromise:
          "Am adăugat o cultură mai puțin ideală deoarece luna aceasta există puține alternative compatibile.",
        autoPlanEmptySeason:
          "În această zonă și în această lună nu există culturi potrivite pentru semănat: încearcă altă lună, schimbă zona climatică sau activează încălzirea.",
        manualCountRejected:
          "Această cantitate nu încape în spațiul disponibil: am păstrat valoarea anterioară.",
        manualCountAdjusted:
          "Am făcut loc pentru cantitatea aleasă reducând câteva culturi automate.",
        manualCountBelowMin:
          "Am făcut loc pentru cantitatea aleasă, dar pentru asta am redus câteva culturi sub cantitatea recomandată. Ia în calcul mărirea serei.",
        addNoSpace:
          "Nu este loc pentru această cultură: redu sau elimină alte plante ori mărește sera.",
        badCompanion:
          "<b>{a}</b> și <b>{b}</b> nu se potrivesc: mai bine ține-le la distanță sau separă-le cu altă cultură.",
        goodCompanions: "Asocieri bune prezente: {pairs}.",
        summary:
          "<b>{plants}</b> plante în <b>{beds}</b> parcele · recoltă estimată <b>{yield}</b> la finalul ciclului.",
        shoppingItem: "{count} plante/semințe",
        clearGreenhouse: "Golește sera",
        undoAction: "Anulează",
        redoAction: "Refă",

        vegCat_frutti: "Fructe & legume",
        vegCat_foglie: "Salate & frunze",
        vegCat_radici: "Rădăcini & bulbi",
        vegCat_aromatiche: "Aromatice",
        vegCat_legumi: "Leguminoase",
        vegCat_cavoli: "Verze & brasicacee",
        vegCatAltro: "Altele",

        diffEasy: "★&nbsp;Ușor",
        diffMedium: "★★&nbsp;Mediu",
        diffHard: "★★★&nbsp;Dificil",

        vegInGreenhouse: "✓&nbsp;în seră",
        vegNoMore: "Nicio plantă în seră pentru această lună.",

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
        "cart.materials_section": "Materiale extra",
        "cart.materials_grand_total": "Total comandă",
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
        "preconfig.sizes_note":
          "Dimensiunile determină câte parcele și plante poți cultiva.",
        "preconfig.width": "Lățime",
        "preconfig.length": "Lungime",
        "preconfig.path_label": "Cărare între parcele",
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

  const _uiSources = [shared.configurator, shared.index];
  shared.ui = {
    it: Object.assign({}, ..._uiSources.map((s) => s.it || {})),
    ro: Object.assign({}, ..._uiSources.map((s) => s.ro || {}))
  };
  shared.index = shared.ui;
  shared.configurator = shared.ui;
  global.SERRA_I18N = Object.assign({}, global.SERRA_I18N || {}, shared);
})(window);
