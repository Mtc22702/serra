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
        "La guida copre i tre momenti dell'app: disegnare la serra, decidere se partire dal seme o dalla piantina, seguire l'orto fino alla raccolta.",
      "aria.toc": "Indice della guida",
      "toc.design": "1 · Progettare la serra",
      "toc.buy": "2 · Seme o piantina?",
      "toc.grow": "3 · Seguire l'orto",
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
      // Capitolo 2. I numeri arrivano dal catalogo (db/products.json) e vanno
      // ricontrollati se cambiano listino o disponibilità: 97 varietà a seme,
      // 64 anche in piantina, bustina più economica 2,20 €, piantine 1,10–1,90 €.
      "compare.kicker": "PROCURARSI LE PIANTE",
      "compare.title": "Seme o piantina?",
      "compare.lead":
        "Stessa pianta, due punti di partenza. Il seme costa poco e ha tutta la scelta; la piantina fa risparmiare tre settimane e le cure più delicate. Sotto, la differenza in numeri.",
      "compare.row_cost": "Quanto costa",
      "compare.row_time": "Quando raccogli",
      "compare.row_choice": "Quanta scelta",
      "compare.row_care": "Cosa ti chiede",
      "compare.seme_title": "Dal seme",
      "compare.seme_sub": "Una bustina, molte piante, e la semina la fai tu.",
      "compare.seme_cost":
        "Da 2,20 € la bustina, con 100 semi in media: pochi centesimi a pianta.",
      "compare.seme_time":
        "Ciclo completo: alla raccolta arrivi tre o quattro settimane dopo la piantina.",
      "compare.seme_choice":
        "Tutte le 97 varietà del catalogo, in qualsiasi mese.",
      "compare.seme_care":
        "Semenzaio, luce e temperatura costanti nelle prime settimane: è la fase in cui si perde qualche piantina.",
      "compare.seme_when":
        "<b>Scegli il seme se</b> hai tempo davanti, vuoi varietà che in vivaio non esistono o ti interessa proprio la semina.",
      "compare.seme_cta": "Vai al catalogo semi",
      "compare.piantina_title": "Dalla piantina",
      "compare.piantina_sub": "Già cresciuta in vaso, pronta da trapiantare.",
      "compare.piantina_cost":
        "Da 1,10 a 1,90 € a piantina, in vassoi da sei; l'ordine parte da due vassoi.",
      "compare.piantina_time":
        "Da venti a trenta giorni prima: la parte lenta l'ha già fatta il vivaio.",
      "compare.piantina_choice":
        "64 varietà, e solo nei mesi in cui il trapianto ha senso.",
      "compare.piantina_care":
        "Di essere in casa alla consegna, entro 48 ore, e di trapiantare nei giorni successivi.",
      "compare.piantina_when":
        "<b>Scegli la piantina se</b> sei in ritardo sulla stagione, è la tua prima serra o vuoi poche piante di specie difficili.",
      "compare.piantina_cta": "Vai al vivaio piantine",
      "compare.mix":
        "<b>Si possono mescolare.</b> Molti orti partono dalla piantina per pomodori, peperoni e melanzane — le specie che dal seme richiedono più cure — e dal seme per insalate, ravanelli e aromatiche, che germinano in pochi giorni.",
      // Capitolo 3.
      "grow.kicker": "DOPO LA SEMINA",
      "grow.title": "Seguire l'orto fino alla raccolta",
      "grow.lead":
        "«Il mio orto» è lo strumento gratuito che tiene il conto al posto tuo: cosa hai piantato, cosa serve questa settimana, cosa è in ritardo. Funziona anche con piante comprate altrove.",
      "grow.s1t": "Registra cosa hai piantato",
      "grow.s1p":
        "Dagli ordini arriva già tutto; il resto lo aggiungi a mano, anche se viene da un altro vivaio.",
      "grow.s2t": "Guarda la settimana",
      "grow.s2p":
        "Acqua, concime e raccolta compaiono nel giorno giusto. Quello che salti resta in vista come da recuperare.",
      "grow.s3t": "Segna la raccolta",
      "grow.s3p":
        "Quando chiudi una coltura, lo spazio torna libero nel piano e la stagione successiva riparte da lì.",
      "grow.cta": "Apri «Il mio orto»",
    },
    ro: {
      "page.title": "Cum folosești Orto in Serra · Ghid",
      "aria.main_nav": "Navigare principală",
      "aria.cart": "Deschide coșul",
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
        "Ghidul acoperă cele trei momente ale aplicației: proiectarea serei, alegerea între sămânță și răsad, urmărirea grădinii până la recoltă.",
      "aria.toc": "Cuprinsul ghidului",
      "toc.design": "1 · Proiectarea serei",
      "toc.buy": "2 · Sămânță sau răsad?",
      "toc.grow": "3 · Urmărirea grădinii",
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
      "compare.kicker": "CUM ÎȚI IEI PLANTELE",
      "compare.title": "Sămânță sau răsad?",
      "compare.lead":
        "Aceeași plantă, două puncte de plecare. Sămânța costă puțin și îți dă toată gama; răsadul îți economisește trei săptămâni și îngrijirile cele mai delicate. Mai jos, diferența în cifre.",
      "compare.row_cost": "Cât costă",
      "compare.row_time": "Când recoltezi",
      "compare.row_choice": "Câtă varietate",
      "compare.row_care": "Ce îți cere",
      "compare.seme_title": "De la sămânță",
      "compare.seme_sub": "Un plic, multe plante, iar semănatul îl faci tu.",
      "compare.seme_cost":
        "De la 2,20 € plicul, cu 100 de semințe în medie: câțiva cenți de plantă.",
      "compare.seme_time":
        "Ciclu complet: ajungi la recoltă cu trei-patru săptămâni după răsad.",
      "compare.seme_choice":
        "Toate cele 97 de soiuri din catalog, în orice lună.",
      "compare.seme_care":
        "Răsadniță, lumină și temperatură constante în primele săptămâni: aici se pierd câteva fire.",
      "compare.seme_when":
        "<b>Alege sămânța dacă</b> ai timp înainte, vrei soiuri care nu există ca răsad sau te interesează chiar semănatul.",
      "compare.seme_cta": "Mergi la catalogul de semințe",
      "compare.piantina_title": "De la răsad",
      "compare.piantina_sub": "Deja crescut în ghiveci, gata de plantat.",
      "compare.piantina_cost":
        "De la 1,10 la 1,90 € răsadul, în tăvi de șase; comanda pornește de la două tăvi.",
      "compare.piantina_time":
        "Cu douăzeci până la treizeci de zile mai devreme: partea lentă a făcut-o pepiniera.",
      "compare.piantina_choice":
        "64 de soiuri, și doar în lunile în care plantarea are sens.",
      "compare.piantina_care":
        "Să fii acasă la livrare, în 48 de ore, și să plantezi în zilele următoare.",
      "compare.piantina_when":
        "<b>Alege răsadul dacă</b> ești în întârziere față de sezon, e prima ta seră sau vrei puține plante din specii pretențioase.",
      "compare.piantina_cta": "Mergi la răsaduri",
      "compare.mix":
        "<b>Se pot combina.</b> Multe grădini pornesc de la răsad pentru roșii, ardei și vinete — speciile care din sămânță cer cea mai multă grijă — și de la sămânță pentru salate, ridichi și plante aromatice, care răsar în câteva zile.",
      "grow.kicker": "DUPĂ SEMĂNAT",
      "grow.title": "Urmărește grădina până la recoltă",
      "grow.lead":
        "„Grădina mea” este instrumentul gratuit care ține socoteala în locul tău: ce ai plantat, ce trebuie făcut săptămâna asta, ce a rămas în urmă. Merge și cu plante cumpărate din altă parte.",
      "grow.s1t": "Înregistrează ce ai plantat",
      "grow.s1p":
        "Din comenzi vine deja totul; restul adaugi manual, chiar dacă vine de la altă pepinieră.",
      "grow.s2t": "Uită-te la săptămână",
      "grow.s2p":
        "Apa, îngrășământul și recolta apar în ziua potrivită. Ce sari rămâne vizibil, de recuperat.",
      "grow.s3t": "Marchează recolta",
      "grow.s3p":
        "Când închizi o cultură, spațiul se eliberează în plan și sezonul următor pornește de acolo.",
      "grow.cta": "Deschide „Grădina mea”",
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
  }

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
