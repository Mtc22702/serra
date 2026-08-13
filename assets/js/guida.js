/**
 * Guida interattiva: contenuti localizzati e collegamento al percorso scelto.
 * Il file non conserva stato di dominio: legge lingua e tema dalle fondazioni
 * comuni e traduce solo gli elementi marcati nel markup della guida.
 */

// Guida interattiva: applica lingua e collega il livello scelto al configuratore.
(() => {
  const copy = {
    it: {
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
      "hero.title": "Impara a progettare la tua serra.",
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
      help: "<b>Puoi cambiare livello in ogni momento.</b> Le impostazioni della serra restano disponibili nel configuratore."
    },
    ro: {
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
      "hero.title": "Învață să îți proiectezi sera.",
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
      help: "<b>Poți schimba nivelul oricând.</b> Setările serei rămân disponibile în configurator."
    }
  };
  const tabs = [...document.querySelectorAll(".guide-tab")];
  const routes = [...document.querySelectorAll(".guide-route")];
  const requested = new URLSearchParams(location.search).get("livello");
  const tabMeta = {
    novizio: { icon: "🌱", hint: "tab.novizio_hint" },
    intermedio: { icon: "🌿", hint: "tab.intermedio_hint" },
    esperto: { icon: "🧭", hint: "tab.esperto_hint" }
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
    localStorage.setItem("ois.lang", lang);
    document.querySelectorAll("[data-guide-key]").forEach((element) => {
      const value = copy[lang][element.dataset.guideKey];
      if (value) element.innerHTML = value;
    });
    const languageSelect = document.getElementById("guideLangSelect");
    if (languageSelect) languageSelect.value = lang;
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
    history.replaceState(null, "", `?livello=${activeLevel}`);
    if (focus)
      document
        .getElementById(`guide-${activeLevel}`)
        ?.focus({ preventScroll: true });
  }

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => selectRoute(tab.dataset.guide, true))
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
