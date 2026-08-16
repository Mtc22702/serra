/**
 * Guida interattiva: contenuti localizzati e collegamento al percorso scelto.
 * Il file non conserva stato di dominio: legge lingua e tema dalle fondazioni
 * comuni e traduce solo gli elementi marcati nel markup della guida.
 */

// Guida interattiva: applica lingua e collega il livello scelto al configuratore.
(() => {
  const copy = {
    it: {
      "page.title": "Come usare Orto in Serra · Guida",
      "aria.main_nav": "Navigazione principale",
      "aria.cart": "Apri carrello",
      "aria.brand": "Orto in Serra, home",
      "aria.tabs": "Scegli il tuo livello di esperienza",
      "nav.home": "🏠 Home",
      "nav.brand_sub": "Coltiva con un piano",
      "nav.menu_explore": "Esplora",
      "nav.menu_preferences": "Preferenze",
      "nav.semi": "🌿 Catalogo semi",
      "nav.vivaio": "🪴 Vivaio piantine",
      "nav.orto": "🌱 Il mio orto",
      "nav.configuratore": "📐 Configuratore serra",
      "nav.account": "👤 Area Personale",
      "nav.carrello": "Carrello",
      "nav.theme": "Tema",
      "nav.theme_hint": "Chiaro / scuro",
      "nav.language": "Lingua",
      "hero.kicker": "GUIDA ALL'APP",
      "hero.title": "Dal progetto al raccolto, spiegato.",
      "hero.intro":
        "Come si usa l'applicazione, nell'ordine in cui la incontri: progettare la serra, comprare semi e piantine, seguire l'orto fino alla raccolta, regolare account e preferenze.",
      "aria.toc": "Indice della guida",
      "toc.label": "Cosa vuoi fare?",
      "toc.design": "1 · Progettare",
      "toc.buy": "2 · Comprare",
      "toc.grow": "3 · Coltivare",
      "toc.settings": "4 · Account e app",
      "chapter.open": "Mostra capitolo",
      "chapter.close": "Riduci capitolo",
      "hero.picker_title": "Progettare la serra: da dove parti?",
      "hero.picker_hint": "Potrai cambiare percorso in qualsiasi momento.",
      "tab.novizio": "Principiante",
      "tab.novizio_hint": "Ti guido passo passo",
      "tab.intermedio": "Intermedio",
      "tab.intermedio_hint": "Parti da un piano pronto",
      "tab.esperto": "Esperto",
      "tab.esperto_hint": "Componi liberamente",
      "novice.kicker": "PER CHI INIZIA",
      "novice.title": "Principiante: un orto pronto, passo passo",
      "novice.s1t": "Inserisci le condizioni della serra",
      "novice.s1p":
        "Scegli dimensioni, clima e mese. L’app prepara una proposta adatta alla stagione.",
      "novice.s2t": "Controlla la vista dall’alto",
      "novice.s2p":
        "Guarda le aiuole già organizzate: puoi toccare una coltura per vederne quantità e dettagli.",
      "novice.s3t": "Apri la lista dei semi",
      "novice.s3p":
        "Trovi solo ciò che serve al piano. Aggiungi l’occorrente al carrello quando sei soddisfatto.",
      "novice.s4t": "Ricomincia quando cambia la stagione",
      "novice.s4p":
        "Modifica il mese nelle impostazioni iniziali e lascia che la proposta si aggiorni.",
      "novice.cta": "Inizia il percorso guidato",
      "intermediate.kicker": "PER CHI VUOLE PERSONALIZZARE",
      "intermediate.title": "Intermedio: parti da un piano e rendilo tuo",
      "intermediate.s1t": "Parti dal piano di stagione",
      "intermediate.s1p":
        "Ricevi una base già compatibile con clima, mese e spazio disponibile.",
      "intermediate.s2t": "Apri “Colture nella serra”",
      "intermediate.s2p":
        "Aggiungi, togli o modifica le quantità delle varietà che preferisci.",
      "intermediate.s3t": "Controlla compatibilità e spazio",
      "intermediate.s3p":
        "La serra segnala gli abbinamenti e ti aiuta a mantenere il piano ordinato.",
      "intermediate.s4t": "Conferma la lista semi",
      "intermediate.s4p":
        "Quando il piano ti convince, passa alla lista aggiornata per l’acquisto.",
      "intermediate.cta": "Personalizza un piano",
      "expert.kicker": "PER CHI VUOLE DECIDERE TUTTO",
      "expert.title": "Esperto: componi la serra liberamente",
      "expert.s1t": "Scegli un layout o una serra vuota",
      "expert.s1p":
        "Puoi partire da un esempio pronto oppure costruire il piano da zero.",
      "expert.s2t": "Cerca le colture nel catalogo",
      "expert.s2p":
        "Usa “Tutto il catalogo” anche per vedere piante fuori stagione, sempre ben evidenziate.",
      "expert.s3t": "Aggiungi e regola le quantità",
      "expert.s3p":
        "Usa +, − e rimuovi per definire le colture presenti in ogni aiuola.",
      "expert.s4t": "Riordina o riempi gli spazi",
      "expert.s4p":
        "Le azioni di ottimizzazione sistemano il layout senza perdere le tue scelte.",
      "expert.s5t": "Verifica prima di acquistare",
      "expert.s5p":
        "Controlla spazio e compatibilità, poi genera la lista dei semi.",
      "expert.cta": "Apri modalità esperto",
      help: "<b>Puoi cambiare livello in ogni momento.</b> Le impostazioni della serra restano disponibili nel configuratore.",
      // Capitolo 2. Descrive le due pagine di acquisto e il percorso
      // carrello → ordine → «Da piantare». Volutamente senza prezzi né numero
      // di varietà: quei dati vivono nel listino (db/products.json) e nelle
      // schede del catalogo, dove restano aggiornati da soli. Ripeterli qui
      // significherebbe avere due verità e una che invecchia.
      "compare.kicker": "I DUE NEGOZI DELL'APP",
      "compare.title": "Dove si comprano semi e piantine",
      "compare.lead":
        "L'app ha due punti vendita e una sola meccanica: scegli, aggiungi al carrello, confermi l'ordine. Quello che compri ricompare da solo in «Il mio orto», nella scheda «Da piantare».",
      "compare.row_where": "Dove si trova",
      "compare.row_do": "Cosa puoi fare",
      "compare.row_add": "Come si ordina",
      "compare.row_detail": "Se vuoi i dettagli",
      "compare.seme_title": "Catalogo semi",
      "compare.seme_sub":
        "Vive dentro la home, nella sezione dei semi di stagione.",
      "compare.seme_where":
        "Voce «🌿 Catalogo semi» del menu, oppure scorri la home fino alla sezione dei semi.",
      "compare.seme_do":
        "Filtri per mese e per tipo, campo di ricerca, e «Tutto il catalogo» per vedere anche ciò che è fuori stagione.",
      "compare.seme_add":
        "Il pulsante di aggiunta su ogni scheda mette la bustina nel carrello; le quantità si regolano lì.",
      "compare.seme_detail":
        "Aprendo una scheda trovi semina, cure e raccolta di quella pianta: è lì che stanno le informazioni botaniche.",
      "compare.seme_when":
        "<b>Scorciatoia:</b> se hai già progettato una serra, il configuratore genera la lista dei semi che ti servono e la aggiunge al carrello in un passaggio solo.",
      "compare.seme_cta": "Vai al catalogo semi",
      "compare.piantina_title": "Vivaio piantine",
      "compare.piantina_sub":
        "È una pagina a sé, con un vassoio al posto del carrello.",
      "compare.piantina_where":
        "Voce «🪴 Vivaio piantine» del menu, raggiungibile da qualsiasi pagina.",
      "compare.piantina_do":
        "L'elenco mostra solo ciò che ha senso trapiantare nel mese in corso; i filtri in alto lo restringono ancora.",
      "compare.piantina_add":
        "Le piantine finiscono nel vassoio, che resta visibile mentre scegli e mostra sempre il totale.",
      "compare.piantina_detail":
        "Ogni scheda dice quanto tempo fa risparmiare rispetto al seme e quando arriva la consegna.",
      "compare.piantina_when":
        "<b>Il vassoio non si perde:</b> resta salvato anche se chiudi la pagina, e il conteggio compare accanto alla voce di menu finché non confermi.",
      "compare.piantina_cta": "Vai al vivaio piantine",
      "compare.s1t": "Apri il carrello",
      "compare.s1p":
        "L'icona in alto a destra è la stessa in tutta l'app e raccoglie semi e piantine insieme.",
      "compare.s2t": "Controlla e conferma",
      "compare.s2p":
        "Regoli le quantità, compili i dati di consegna e confermi: l'ordine viene archiviato nella tua Area Personale.",
      "compare.s3t": "Ritrovi tutto in «Il mio orto»",
      "compare.s3p":
        "Nella scheda «Da piantare» il pulsante «Importa dai miei ordini» porta dentro le voci, pronte da mettere a dimora.",
      "compare.mix":
        "<b>Un carrello solo.</b> Semi e piantine si ordinano insieme, ma restano distinti in «Il mio orto»: da una bustina puoi seminare più volte, mentre le piantine si contano una a una.",
      // Capitolo 3: i comandi della pagina «Il mio orto», uno per uno.
      "grow.kicker": "LO STRUMENTO GRATUITO",
      "grow.title": "Seguire l'orto fino alla raccolta",
      "grow.lead":
        "«Il mio orto» non vende niente: tiene il conto al posto tuo di cosa hai piantato, di cosa serve oggi e di cosa è rimasto indietro. Funziona anche con piante comprate altrove.",
      "grow.s1t": "Le tre schede in alto",
      "grow.s1p":
        "«Agenda» elenca le attività del giorno e, scorrendo la striscia delle date, anche quelle dei giorni successivi. «Colture» raccoglie le piante che stai seguendo, «Da piantare» ciò che hai comprato e non è ancora in terra. Il numero accanto a ogni nome dice quanto c'è dentro.",
      "grow.s2t": "Registra una coltura",
      "grow.s2p":
        "«＋ Aggiungi coltura» chiede pianta, data, quantità e posizione. Da quei quattro dati l'app costruisce da sola il calendario di cura fino alla raccolta.",
      "grow.s3t": "Spunta o rimanda",
      "grow.s3p":
        "In «Agenda» il quadratino segna l'attività come fatta e «Domani» la sposta di un giorno. Quello che salti resta in vista sotto «Da recuperare».",
      "grow.s4t": "Correggi quando serve",
      "grow.s4p":
        "«Modifica» cambia data, quantità e posizione di una coltura già inserita: il calendario viene ricalcolato da capo.",
      "grow.s5t": "Chiudi il ciclo",
      "grow.s5p":
        "«Registra raccolta» salva i chili raccolti e diventa la stima dell'anno prossimo. «Esporta nel calendario» porta le scadenze sul telefono, anche senza notifiche.",
      "grow.cta": "Apri «Il mio orto»",
      // Capitolo 4: i comandi comuni a tutte le pagine.
      "settings.kicker": "IN OGNI PAGINA",
      "settings.title": "Account, lingua, tema e uso offline",
      "settings.lead":
        "Quattro comandi identici in tutta l'applicazione: stanno nell'intestazione in alto e, sui telefoni, dentro il menu ☰.",
      "settings.s1t": "Area Personale",
      "settings.s1p":
        "Raccoglie i tuoi ordini e i dati di consegna. Serve anche a «Il mio orto»: senza accesso il pulsante «Importa dai miei ordini» non ha niente da leggere.",
      "settings.s2t": "Lingua",
      "settings.s2p":
        "Il selettore IT / RO cambia l'intera applicazione, non solo la pagina aperta, e la scelta resta salvata sul dispositivo.",
      "settings.s3t": "Tema chiaro o scuro",
      "settings.s3p":
        "Il pulsante ☾ / ☀ commuta i colori. Alla prima apertura l'app segue l'impostazione del sistema operativo.",
      "settings.s4t": "Uso offline",
      "settings.s4p":
        "Puoi installare l'app dal browser e riaprirla senza rete: l'ultima versione visitata delle pagine resta disponibile.",
      "settings.note":
        "<b>Dove finiscono i tuoi dati.</b> Carrello, vassoio e «Il mio orto» sono salvati nel browser che stai usando: su un altro dispositivo ripartono vuoti. Gli ordini invece restano nell'Area Personale e li ritrovi ovunque tu acceda.",
    },
    ro: {
      "page.title": "Cum folosești Orto in Serra · Ghid",
      "aria.main_nav": "Navigare principală",
      "aria.cart": "Deschide coșul",
      "aria.brand": "Orto in Serra, pagina principală",
      "aria.tabs": "Alege nivelul tău de experiență",
      "nav.home": "🏠 Acasă",
      "nav.brand_sub": "Cultivă cu un plan",
      "nav.menu_explore": "Explorează",
      "nav.menu_preferences": "Preferințe",
      "nav.semi": "🌿 Catalog semințe",
      "nav.vivaio": "🪴 Răsaduri",
      "nav.orto": "🌱 Grădina mea",
      "nav.configuratore": "📐 Configurator seră",
      "nav.account": "👤 Zona personală",
      "nav.carrello": "Coș",
      "nav.theme": "Temă",
      "nav.theme_hint": "Luminos / întunecat",
      "nav.language": "Limbă",
      "hero.kicker": "GHIDUL APLICAȚIEI",
      "hero.title": "De la proiect la recoltă, explicat.",
      "hero.intro":
        "Cum se folosește aplicația, în ordinea în care o întâlnești: proiectarea serei, cumpărarea semințelor și a răsadurilor, urmărirea grădinii până la recoltă, reglarea contului și a preferințelor.",
      "aria.toc": "Cuprinsul ghidului",
      "toc.label": "Ce vrei să faci?",
      "toc.design": "1 · Proiectează",
      "toc.buy": "2 · Cumpără",
      "toc.grow": "3 · Cultivă",
      "toc.settings": "4 · Cont și aplicație",
      "chapter.open": "Arată capitolul",
      "chapter.close": "Restrânge capitolul",
      "hero.picker_title": "Proiectarea serei: de unde începi?",
      "hero.picker_hint": "Poți schimba traseul în orice moment.",
      "tab.novizio": "Începător",
      "tab.novizio_hint": "Te ghidez pas cu pas",
      "tab.intermedio": "Intermediar",
      "tab.intermedio_hint": "Pornește de la un plan pregătit",
      "tab.esperto": "Expert",
      "tab.esperto_hint": "Compune liber",
      "novice.kicker": "PENTRU CEI LA ÎNCEPUT",
      "novice.title": "Începător: o grădină gata, pas cu pas",
      "novice.s1t": "Introdu condițiile serei",
      "novice.s1p":
        "Alege dimensiunile, clima și luna. Aplicația pregătește o propunere potrivită pentru sezon.",
      "novice.s2t": "Verifică vederea de sus",
      "novice.s2p":
        "Privește parcelele deja organizate: atinge o cultură pentru cantitate și detalii.",
      "novice.s3t": "Deschide lista de semințe",
      "novice.s3p":
        "Găsești doar ce este necesar pentru plan. Adaugă produsele în coș când ești mulțumit.",
      "novice.s4t": "Reîncepe când se schimbă sezonul",
      "novice.s4p":
        "Schimbă luna din setările inițiale și lasă propunerea să se actualizeze.",
      "novice.cta": "Începe traseul ghidat",
      "intermediate.kicker": "PENTRU CEI CARE VOR SĂ PERSONALIZEZE",
      "intermediate.title":
        "Intermediar: pornește de la un plan și fă-l al tău",
      "intermediate.s1t": "Pornește de la planul sezonier",
      "intermediate.s1p":
        "Primești o bază compatibilă cu clima, luna și spațiul disponibil.",
      "intermediate.s2t": "Deschide „Culturile din seră”",
      "intermediate.s2p":
        "Adaugă, elimină sau modifică numărul soiurilor pe care le preferi.",
      "intermediate.s3t": "Verifică compatibilitatea și spațiul",
      "intermediate.s3p":
        "Sera semnalează asocierile și te ajută să păstrezi planul ordonat.",
      "intermediate.s4t": "Confirmă lista de semințe",
      "intermediate.s4p":
        "Când planul te convinge, treci la lista actualizată pentru cumpărături.",
      "intermediate.cta": "Personalizează un plan",
      "expert.kicker": "PENTRU CEI CARE VOR SĂ DECIDĂ TOTUL",
      "expert.title": "Expert: compune sera liber",
      "expert.s1t": "Alege un layout sau o seră goală",
      "expert.s1p":
        "Poți porni de la un exemplu pregătit sau poți construi planul de la zero.",
      "expert.s2t": "Caută culturile în catalog",
      "expert.s2p":
        "Folosește „Tot catalogul” și pentru a vedea plante în afara sezonului, mereu indicate clar.",
      "expert.s3t": "Adaugă și reglează cantitățile",
      "expert.s3p":
        "Folosește +, − și elimină pentru a defini culturile din fiecare parcelă.",
      "expert.s4t": "Rearanjează sau umple spațiile",
      "expert.s4p":
        "Acțiunile de optimizare aranjează layoutul fără să pierzi alegerile făcute.",
      "expert.s5t": "Verifică înainte de cumpărare",
      "expert.s5p":
        "Controlează spațiul și compatibilitatea, apoi generează lista de semințe.",
      "expert.cta": "Deschide modul expert",
      help: "<b>Poți schimba nivelul oricând.</b> Setările serei rămân disponibile în configurator.",
      "compare.kicker": "CELE DOUĂ MAGAZINE ALE APLICAȚIEI",
      "compare.title": "De unde cumperi semințe și răsaduri",
      "compare.lead":
        "Aplicația are două puncte de vânzare și o singură mecanică: alegi, adaugi în coș, confirmi comanda. Ce cumperi reapare singur în „Grădina mea”, în fila „De plantat”.",
      "compare.row_where": "Unde se găsește",
      "compare.row_do": "Ce poți face",
      "compare.row_add": "Cum comanzi",
      "compare.row_detail": "Dacă vrei detalii",
      "compare.seme_title": "Catalogul de semințe",
      "compare.seme_sub":
        "Stă în pagina principală, în secțiunea semințelor de sezon.",
      "compare.seme_where":
        "Opțiunea „🌿 Catalog semințe” din meniu sau derulează pagina principală până la secțiunea semințelor.",
      "compare.seme_do":
        "Filtre după lună și după tip, câmp de căutare și „Tot catalogul” pentru a vedea și ce este în afara sezonului.",
      "compare.seme_add":
        "Butonul de adăugare de pe fiecare fișă pune plicul în coș; cantitățile se reglează acolo.",
      "compare.seme_detail":
        "Deschizând o fișă găsești semănatul, îngrijirile și recolta plantei: acolo stau informațiile botanice.",
      "compare.seme_when":
        "<b>Scurtătură:</b> dacă ai proiectat deja o seră, configuratorul generează lista de semințe necesare și o adaugă în coș dintr-un singur pas.",
      "compare.seme_cta": "Mergi la catalogul de semințe",
      "compare.piantina_title": "Pepiniera de răsaduri",
      "compare.piantina_sub":
        "Este o pagină separată, cu o tavă în loc de coș.",
      "compare.piantina_where":
        "Opțiunea „🪴 Răsaduri” din meniu, accesibilă din orice pagină.",
      "compare.piantina_do":
        "Lista arată doar ce are sens să plantezi în luna curentă; filtrele de sus o restrâng și mai mult.",
      "compare.piantina_add":
        "Răsadurile ajung în tavă, care rămâne vizibilă cât timp alegi și arată mereu totalul.",
      "compare.piantina_detail":
        "Fiecare fișă spune cât timp economisești față de sămânță și când sosește livrarea.",
      "compare.piantina_when":
        "<b>Tava nu se pierde:</b> rămâne salvată și dacă închizi pagina, iar numărul apare lângă opțiunea din meniu până confirmi.",
      "compare.piantina_cta": "Mergi la răsaduri",
      "compare.s1t": "Deschide coșul",
      "compare.s1p":
        "Pictograma din dreapta sus este aceeași în toată aplicația și adună la un loc semințele și răsadurile.",
      "compare.s2t": "Verifică și confirmă",
      "compare.s2p":
        "Reglezi cantitățile, completezi datele de livrare și confirmi: comanda este arhivată în Zona ta personală.",
      "compare.s3t": "Regăsești tot în „Grădina mea”",
      "compare.s3p":
        "În fila „De plantat”, butonul „Importă din comenzile mele” aduce înăuntru pozițiile, gata de plantat.",
      "compare.mix":
        "<b>Un singur coș.</b> Semințele și răsadurile se comandă împreună, dar rămân distincte în „Grădina mea”: dintr-un plic poți semăna de mai multe ori, în timp ce răsadurile se numără unul câte unul.",
      "grow.kicker": "INSTRUMENTUL GRATUIT",
      "grow.title": "Urmărește grădina până la recoltă",
      "grow.lead":
        "„Grădina mea” nu vinde nimic: ține socoteala în locul tău a ceea ce ai plantat, a ce trebuie făcut azi și a ce a rămas în urmă. Merge și cu plante cumpărate din altă parte.",
      "grow.s1t": "Cele trei file de sus",
      "grow.s1p":
        "„Agendă” listează activitățile zilei și, derulând banda datelor, și pe cele din zilele următoare. „Culturi” adună plantele pe care le urmărești, „De plantat” ce ai cumpărat și nu este încă în pământ. Numărul de lângă fiecare nume spune cât e înăuntru.",
      "grow.s2t": "Înregistrează o cultură",
      "grow.s2p":
        "„＋ Adaugă cultură” cere planta, data, cantitatea și poziția. Din aceste patru date aplicația construiește singură calendarul de îngrijire până la recoltă.",
      "grow.s3t": "Bifează sau amână",
      "grow.s3p":
        "În „Agendă”, pătrățelul marchează activitatea ca făcută, iar „Mâine” o mută cu o zi. Ce sari rămâne vizibil sub „De recuperat”.",
      "grow.s4t": "Corectează când e nevoie",
      "grow.s4p":
        "„Modifică” schimbă data, cantitatea și poziția unei culturi deja introduse: calendarul este recalculat de la zero.",
      "grow.s5t": "Închide ciclul",
      "grow.s5p":
        "„Înregistrează recolta” salvează kilogramele strânse și devine estimarea de anul viitor. „Exportă în calendar” duce termenele pe telefon, chiar și fără notificări.",
      "grow.cta": "Deschide „Grădina mea”",
      "settings.kicker": "ÎN FIECARE PAGINĂ",
      "settings.title": "Cont, limbă, temă și folosire offline",
      "settings.lead":
        "Patru comenzi identice în toată aplicația: stau în antetul de sus și, pe telefon, în meniul ☰.",
      "settings.s1t": "Zona personală",
      "settings.s1p":
        "Adună comenzile tale și datele de livrare. Este utilă și pentru „Grădina mea”: fără autentificare, butonul „Importă din comenzile mele” nu are ce citi.",
      "settings.s2t": "Limba",
      "settings.s2p":
        "Selectorul IT / RO schimbă întreaga aplicație, nu doar pagina deschisă, iar alegerea rămâne salvată pe dispozitiv.",
      "settings.s3t": "Temă luminoasă sau întunecată",
      "settings.s3p":
        "Butonul ☾ / ☀ comută culorile. La prima deschidere, aplicația urmează setarea sistemului de operare.",
      "settings.s4t": "Folosire offline",
      "settings.s4p":
        "Poți instala aplicația din browser și o poți redeschide fără rețea: ultima versiune vizitată a paginilor rămâne disponibilă.",
      "settings.note":
        "<b>Unde ajung datele tale.</b> Coșul, tava și „Grădina mea” sunt salvate în browserul pe care îl folosești: pe alt dispozitiv pornesc goale. Comenzile, în schimb, rămân în Zona personală și le regăsești oriunde te autentifici.",
    },
  };
  const tabs = [...document.querySelectorAll(".guide-tab")];
  const routes = [...document.querySelectorAll(".guide-route")];
  const requested = new URLSearchParams(location.search).get("livello");
  const tabMeta = {
    novizio: { icon: "🌱", hint: "tab.novizio_hint" },
    intermedio: { icon: "🌿", hint: "tab.intermedio_hint" },
    esperto: { icon: "🧭", hint: "tab.esperto_hint" },
  };
  // Compatibilità con il markup memorizzato nella cache.
  tabs.forEach((tab) => {
    if (tab.querySelector(".guide-tab-icon")) return;
    const meta = tabMeta[tab.dataset.guide];
    if (!meta) return;
    tab.removeAttribute("data-guide-key");
    tab.innerHTML = `
      <span class="guide-tab-icon" aria-hidden="true">${meta.icon}</span>
      <span class="guide-tab-body">
        <b data-guide-key="tab.${tab.dataset.guide}"></b>
        <small data-guide-key="${meta.hint}"></small>
      </span>
    `;
  });

  /* I capitoli lunghi diventano richiudibili: sul telefono resta visibile la
     mappa della guida, mentre tablet e desktop conservano la lettura estesa. */
  const chapters = [...document.querySelectorAll(".guide-chapter")];
  chapters.forEach((chapter, index) => {
    const head = chapter.querySelector(":scope > .guide-chapter-head");
    if (!head || chapter.querySelector(":scope > .guide-chapter-content")) return;
    const content = document.createElement("div");
    content.className = "guide-chapter-content";
    content.id = `${chapter.id || `guideChapter${index + 2}`}Content`;
    while (head.nextSibling) content.append(head.nextSibling);
    chapter.append(content);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "guide-chapter-toggle";
    button.setAttribute("aria-controls", content.id);
    button.setAttribute("aria-expanded", "true");
    button.dataset.guideKey = "chapter.close";
    head.append(button);

    const isPhone = window.matchMedia("(max-width: 660px)").matches;
    const requestedChapter = location.hash === `#${chapter.id}`;
    if (isPhone && !requestedChapter) {
      content.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.dataset.guideKey = "chapter.open";
    }

    button.addEventListener("click", () => {
      content.hidden = !content.hidden;
      const expanded = !content.hidden;
      button.setAttribute("aria-expanded", String(expanded));
      button.dataset.guideKey = expanded ? "chapter.close" : "chapter.open";
      const lang = document.documentElement.lang === "ro" ? "ro" : "it";
      button.textContent = copy[lang][button.dataset.guideKey];
    });
  });

  document.querySelectorAll(".guide-toc a").forEach((link) => {
    link.addEventListener("click", () => {
      const chapter = document.querySelector(link.getAttribute("href"));
      const content = chapter?.querySelector(":scope > .guide-chapter-content");
      const button = chapter?.querySelector(":scope > .guide-chapter-head .guide-chapter-toggle");
      if (!content || !button) return;
      content.hidden = false;
      button.setAttribute("aria-expanded", "true");
      button.dataset.guideKey = "chapter.close";
      const lang = document.documentElement.lang === "ro" ? "ro" : "it";
      button.textContent = copy[lang]["chapter.close"];
    });
  });

  function applyLanguage(value) {
    const lang = value === "ro" ? "ro" : "it";
    document.documentElement.lang = lang;
    document.title = copy[lang]["page.title"];
    localStorage.setItem("ois.lang", lang);
    document.querySelectorAll("[data-guide-key]").forEach((element) => {
      const value = copy[lang][element.dataset.guideKey];
      if (value) element.innerHTML = value;
    });
    // Le etichette che non sono testo visibile (l'indice della pagina, per
    // esempio) restavano in italiano anche in romeno.
    document.querySelectorAll("[data-guide-key-aria]").forEach((element) => {
      const value = copy[lang][element.dataset.guideKeyAria];
      if (value) element.setAttribute("aria-label", value);
    });
    const languageSelect = document.getElementById("guideLangSelect");
    if (languageSelect) languageSelect.value = lang;
    document
      .getElementById("mainNav")
      ?.setAttribute("aria-label", copy[lang]["aria.main_nav"]);
    document
      .querySelector(".cart-btn")
      ?.setAttribute("aria-label", copy[lang]["aria.cart"]);
    document
      .querySelector(".guide-tabs")
      ?.setAttribute("aria-label", copy[lang]["aria.tabs"]);
    document.querySelectorAll(".lang-switch-opt").forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    // La cortina anti-lampeggio resta finché i testi non sono a posto.
    document.documentElement.classList.remove("serra-i18n-pending");
  }

  /* Stesso contratto delle altre pagine: se la lingua cambia in un'altra
     scheda dell'applicazione, questa si allinea senza ricaricare. Mancava, e
     la guida restava nella lingua con cui era stata aperta. */
  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const next = event.newValue === "ro" ? "ro" : "it";
    if (next !== document.documentElement.lang) applyLanguage(next);
  });

  function selectRoute(level, focus = false) {
    const available = routes.some((route) => route.dataset.route === level);
    const activeLevel = available ? level : "novizio";
    tabs.forEach((tab) => {
      const active = tab.dataset.guide === activeLevel;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    routes.forEach((route) => {
      const active = route.dataset.route === activeLevel;
      route.hidden = !active;
      route.classList.toggle("is-active", active);
    });
    // L'ancora va conservata: dalla home si arriva su #seme-o-piantina e
    // questa riga, riscrivendo l'indirizzo, la cancellava — un ricaricamento
    // riportava in cima alla guida invece che al capitolo giusto.
    history.replaceState(null, "", `?livello=${activeLevel}${location.hash}`);
    if (focus)
      document
        .getElementById(`guide-${activeLevel}`)
        ?.focus({ preventScroll: true });
  }

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => selectRoute(tab.dataset.guide, true)),
  );
  document
    .querySelector(".guide-tabs")
    ?.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex < 0) return;

      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();

      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (currentIndex +
                (event.key === "ArrowRight" ? 1 : -1) +
                tabs.length) %
              tabs.length;
      const nextTab = tabs[nextIndex];
      selectRoute(nextTab.dataset.guide);
      nextTab.focus();
    });
  document
    .getElementById("guideLangSelect")
    ?.addEventListener("change", (event) => applyLanguage(event.target.value));
  document.querySelectorAll(".lang-switch-opt").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
  applyLanguage(localStorage.getItem("ois.lang"));
  selectRoute(requested || "novizio");
})();
