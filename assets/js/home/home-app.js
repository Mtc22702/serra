// Controlli catalogo
function bindHomeStaticActions() {
  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-home-action]");
    if (!control) return;

    switch (control.dataset.homeAction) {
      case "set-language":
        // Il selettore desktop usa l'evento `change`: trattarlo anche al
        // primo tap forza un render e chiude la tendina nativa su iPhone.
        // I pulsanti IT/RO del menu mobile, invece, espongono `data-lang`.
        if (control.tagName !== "SELECT") setLang(control.dataset.lang);
        break;
      case "open-cart":
        openCart();
        break;
      case "back-to-top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "accept-cookies":
        acceptCookies();
        break;
      case "reject-cookies":
        rejectCookies();
        break;
      case "clear-catalog-search":
        clearCatalogSearch();
        break;
      case "set-zone":
        setZone(control.dataset.zone);
        break;
      case "toggle-heated":
        toggleHeated();
        break;
      case "toggle-season-only":
        toggleCatalogSeasonOnly();
        break;
      case "toggle-full-catalog":
        toggleCatalogFull();
        break;
      case "toggle-easy-only":
        toggleCatalogEasyOnly();
        break;
      case "reset-catalog-filters":
        resetCatalogFilters();
        break;
      case "set-catalog-layout":
        setCatalogLayout(control.dataset.layout);
        break;
      case "add-kit":
        addKitToCart();
        break;
      case "add-kit-and-plan":
        addKitAndPlan();
        break;
      case "close-detail":
        closeDetail(control.id === "detailOverlay" ? event : undefined);
        break;
      case "set-detail-tab":
        setDetailTab(control.dataset.tab);
        break;
      case "detail-add-to-cart":
        detailAddToCart();
        break;
      case "close-cart":
        closeCart();
        break;
      case "clear-cart":
        clearCart();
        break;
      case "prepare-cart-import":
        syncCatalogClimateToSharedConfig();
        closeCart();
        break;
      case "checkout":
        alertCheckout();
        break;
      case "set-catalog-category":
        setCatalogCategory(control.dataset.category);
        break;
      case "set-month":
        setMese(Number(control.dataset.month));
        break;
      case "remove-catalog-filter":
        removeCatalogFilter(control.dataset.filterKind);
        break;
      case "show-full-catalog":
        showFullCatalog();
        break;
      case "open-detail":
        openDetail(control.dataset.plantId);
        break;
      case "toggle-cart":
        toggleCart(event, control.dataset.plantId);
        break;
      case "remove-from-cart":
        removeFromCart(control.dataset.plantId);
        break;
      case "load-more-catalog":
        loadMoreCatalogPlants();
        break;
      case "add-pair-to-cart":
        addPairToCart(
          event,
          control.dataset.firstPlantId,
          control.dataset.secondPlantId
        );
        break;
    }
  });

  document.addEventListener("change", (event) => {
    const control = event.target.closest("[data-home-action]");
    if (!control) return;
    if (control.dataset.homeAction === "set-language") setLang(control.value);
    if (control.dataset.homeAction === "set-catalog-type")
      setCatalogType(control.value);
    if (control.dataset.homeAction === "set-catalog-sort")
      setCatalogSort(control.value);
  });

  document.addEventListener("input", (event) => {
    const control = event.target.closest(
      '[data-home-action="set-catalog-search"]'
    );
    if (control) setCatalogSearch(control.value);
  });

  document.addEventListener("keydown", (event) => {
    const control = event.target.closest('[data-home-action="set-detail-tab"]');
    if (control) handleDetailTabKey(event, control);
  });

  document.addEventListener(
    "error",
    (event) => {
      const image = event.target.closest?.(
        "[data-catalog-photo-fallback]"
      );
      if (!image) return;
      image.parentElement.dataset.fallback = "1";
      image.style.display = "none";
    },
    true
  );
}

bindHomeStaticActions();

function setZone(z) {
  state.zona = z;
  render();
}
// Alterna la serra riscaldata
function toggleHeated() {
  state.riscaldata = !state.riscaldata;
  catalog.climatePreferenceTouched = true;
  render();
}
// Imposta il mese attivo
function setMese(m) {
  state.mese = m;
  render();
}
// Allinea i controlli del catalogo
function syncCatalogControls() {
  const search = document.getElementById("catalogSearch");
  const hint = document.getElementById("catalogHint");
  const filterToggle = document.getElementById("catalogFilterToggle");
  const filterTools = document.getElementById("catalogFilterTools");
  const type = document.getElementById("catalogType");
  const sort = document.getElementById("catalogSort");
  const season = document.getElementById("catalogSeasonOnly");
  const allToggle = document.getElementById("catalogAllToggle");
  const easy = document.getElementById("catalogEasyOnly");
  if (search && search !== document.activeElement)
    search.value = catalog.search;
  // Su smartphone, durante la ricerca togliamo il suggerimento dal flusso:
  // i risultati restano così raggiungibili anche con la tastiera aperta.
  const hasSearchTerm = Boolean(catalog.search.trim());
  if (hint)
    hint.classList.toggle("catalog-mobile-hidden-while-searching", hasSearchTerm);
  if (filterToggle) {
    filterToggle.classList.toggle(
      "catalog-mobile-hidden-while-searching",
      hasSearchTerm
    );
    filterToggle.hidden = hasSearchTerm;
  }
  if (filterTools) {
    filterTools.classList.toggle(
      "catalog-mobile-hidden-while-searching",
      hasSearchTerm
    );
    filterTools.hidden = hasSearchTerm;
  }
  if (type && type !== document.activeElement) type.value = catalog.type;
  if (sort && sort !== document.activeElement) sort.value = catalog.sort;
  if (season) {
    season.classList.toggle("active", catalog.seasonOnly);
    season.setAttribute("aria-pressed", String(catalog.seasonOnly));
    const semCount = seminabili().length;
    const seasonCountEl = season.querySelector(".chip-count");
    if (seasonCountEl) seasonCountEl.textContent = semCount;
  }
  if (allToggle) {
    allToggle.classList.toggle("active", !catalog.seasonOnly);
    allToggle.setAttribute("aria-pressed", String(!catalog.seasonOnly));
    const allCountEl = allToggle.querySelector(".chip-count");
    if (allCountEl) allCountEl.textContent = PLANTS.length;
  }
  if (easy) {
    easy.classList.toggle("active", catalog.easyOnly);
    easy.setAttribute("aria-pressed", String(catalog.easyOnly));
    const easyBase = catalog.seasonOnly ? seminabili() : PLANTS;
    const easyCount = easyBase.filter((p) => EASY_IDS.has(p.id)).length;
    const easyCountEl = easy.querySelector(".chip-count");
    if (easyCountEl) easyCountEl.textContent = easyCount;
  }
  const anyExtra =
    catalog.search ||
    catalog.type ||
    catalog.easyOnly ||
    !catalog.seasonOnly ||
    catalog.sort !== "season";
  const resetBtn = document.getElementById("catalogReset");
  if (resetBtn) resetBtn.hidden = !anyExtra;
}
// Aggiorna il testo di ricerca usato per filtrare le colture del catalogo.
function setCatalogSearch(value) {
  catalog.search = value;
  render();
  updateCatalogSearchSuggestions();
}
// Nasconde i suggerimenti della ricerca quando il campo non è più attivo.
function hideCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (list) {
    list.hidden = true;
    list.innerHTML = "";
  }
  if (input) input.setAttribute("aria-expanded", "false");
}
// Applica un suggerimento selezionato al campo di ricerca del catalogo.
function selectCatalogSearchSuggestion(name) {
  catalog.search = name;
  const input = document.getElementById("catalogSearch");
  if (input) input.value = name;
  render();
  hideCatalogSearchSuggestions();
}
// Genera i suggerimenti coerenti con il testo inserito nella ricerca catalogo.
function updateCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (!list || !input) return;
  const term = normalizeSearch(catalog.search);
  if (!term) {
    hideCatalogSearchSuggestions();
    return;
  }
  const seen = new Set();
  const names = [];
  for (const p of PLANTS) {
    const name = plantName(p.id);
    const key = normalizeSearch(name);
    if (!key.includes(term) || seen.has(key)) continue;
    seen.add(key);
    names.push(name);
    if (names.length >= 8) break;
  }
  if (!names.length) {
    hideCatalogSearchSuggestions();
    return;
  }
  list.innerHTML = names
    .map(
      (name) =>
        `<li role="option"><button type="button" data-name="${escapeHtml(name)}">${escapeHtml(name)}</button></li>`
    )
    .join("");
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
}
// escapeHtml è ora definita una sola volta in assets/js/shared/escape-html.js
(function setupCatalogSearchSuggestionsClick() {
  document.addEventListener("mousedown", (e) => {
    const btn = e.target.closest("#catalogSearchSuggestions button[data-name]");
    if (!btn) return;
    selectCatalogSearchSuggestion(btn.dataset.name);
  });
})();
(function setupDisabledImportGuard() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("#confImportBtn.disabled");
    if (!link) return;
    e.preventDefault();
  });
})();
// Cancella il testo di ricerca e ripristina i risultati del catalogo.
function clearCatalogSearch() {
  catalog.search = "";
  const input = document.getElementById("catalogSearch");
  if (input) {
    input.value = "";
    input.focus({ preventScroll: true });
  }
  render();
}
// Rimuove un filtro attivo dal catalogo e aggiorna l'elenco risultante.
function removeCatalogFilter(kind) {
  if (kind === "scope") catalog.seasonOnly = true;
  else if (kind === "search") {
    catalog.search = "";
    const input = document.getElementById("catalogSearch");
    if (input) input.value = "";
  } else if (kind === "type") catalog.type = "";
  else if (kind === "easy") catalog.easyOnly = false;
  else if (kind === "sort") catalog.sort = "season";
  render();
}
// Imposta la categoria di colture usata come filtro del catalogo.
function setCatalogType(value) {
  catalog.type = value;
  render();
}
// Attiva o disattiva il filtro delle colture adatte al mese selezionato.
function toggleCatalogSeasonOnly() {
  catalog.seasonOnly = !catalog.seasonOnly;
  render();
}
// Attiva o disattiva la visualizzazione completa delle colture disponibili.
function toggleCatalogFull() {
  catalog.seasonOnly = false;
  render();
}
// Attiva o disattiva il filtro delle colture consigliate ai principianti.
function toggleCatalogEasyOnly() {
  catalog.easyOnly = !catalog.easyOnly;
  catalog.easyOnlyTouched = true;
  render();
}
// Imposta il criterio con cui ordinare le colture mostrate nel catalogo.
function setCatalogSort(value) {
  catalog.sort = value || "season";
  render();
}
// Imposta la categoria evidenziata nella barra rapida del catalogo.
function setCatalogCategory(type) {
  catalog.type = type || "";
  render();
}
// Genera la barra orizzontale delle categorie disponibili nel catalogo.
function renderCatalogCategoryRail(base) {
  const rail = document.getElementById("catalogCategoryRail");
  if (!rail) return;
  const categories = [
    { type: "", count: base.length, icon: "🌿", label: t("catalog.type_all") }
  ].concat(
    catalogTypeCounts(base).map(({ type, count }) => ({
      type,
      count,
      icon:
        {
          frutto: "🍅",
          foglia: "🥬",
          radice: "🥕",
          legume: "🫘",
          aromatica: "🌿"
        }[type] || "🌱",
      label: typeLabel(type)
    }))
  );
  rail.innerHTML = categories
    .map(
      (
        cat
      ) => `<button class="catalog-category-chip${catalog.type === cat.type ? " active" : ""}" type="button" data-home-action="set-catalog-category" data-category="${cat.type}" aria-pressed="${catalog.type === cat.type}">
    <span class="category-ico" aria-hidden="true">${cat.icon}</span>
    <span class="category-label">${cat.label}</span>
    <span class="category-count">${cat.count}</span>
  </button>`
    )
    .join("");
}
// Aggiorna i dati di sintesi relativi ai risultati del catalogo filtrato.
function renderCatalogInsights(plants, base) {
  const box = document.getElementById("catalogInsights");
  if (!box) return;
  const cartCount = cart.length;
  const fastCount = plants.filter((p) => p.gg && p.gg <= 45).length;
  const compactCount = plants.filter((p) => plantDistanceValue(p) <= 25).length;
  const seasonalCount = base.filter((p) =>
    effectiveMonths(p).has(state.mese)
  ).length;
  box.innerHTML = `
    <span><b>${plants.length}</b> ${t("catalog.results")}</span>
    <span><b>${seasonalCount}</b> ${t("catalog.insight_seasonal")}</span>
    <span><b>${fastCount}</b> ${t("catalog.insight_fast")}</span>
    <span><b>${compactCount}</b> ${t("catalog.insight_compact")}</span>
    <span><b>${cartCount}</b> ${t("catalog.insight_cart")}</span>`;
}
// Passa alla visualizzazione completa del catalogo rimuovendo i limiti iniziali.
function showFullCatalog() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.seasonOnly = false;
  catalog.sort = "season";
  const input = document.getElementById("catalogSearch");
  if (input) input.value = "";
  hideCatalogSearchSuggestions();
  render();
}
// Ripristina il catalogo consigliato, senza lasciare filtri nascosti.
function resetCatalogFilters() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.easyOnlyTouched = false;
  catalog.seasonOnly = true;
  catalog.sort = "season";
  const input = document.getElementById("catalogSearch");
  if (input) input.value = "";
  hideCatalogSearchSuggestions();
  render();
}

// Preferenze utente
function savePrefs() {
  localStorage.setItem("ois.cart", JSON.stringify(cart));
  localStorage.setItem(
    "ois.prefs",
    JSON.stringify({
      zona: state.zona,
      riscaldata: state.riscaldata,
      climatePreferenceTouched: catalog.climatePreferenceTouched,
      mese: state.mese,
      easyOnly: catalog.easyOnly,
      easyOnlyTouched: catalog.easyOnlyTouched
    })
  );
}
// Trasferisce le preferenze del catalogo alla configurazione condivisa.
function syncCatalogClimateToSharedConfig() {
  try {
    const existing =
      JSON.parse(localStorage.getItem("serra.config.v1") || "{}") || {};
    localStorage.setItem(
      "serra.config.v1",
      JSON.stringify({
        ...existing,
        zona: state.zona,
        riscaldata: state.riscaldata
      })
    );
  } catch (_) {}
}

// Carica le preferenze di catalogo e configurazione salvate nel browser.
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem("ois.prefs") || "{}");
    if (p.zona) state.zona = p.zona;
    // Le preferenze delle versioni precedenti non possono accendere il
    // riscaldamento di default. Ripristiniamo il valore solo se l'utente lo
    // ha scelto esplicitamente nel catalogo.
    if (p.climatePreferenceTouched === true) {
      state.riscaldata = Boolean(p.riscaldata);
      catalog.climatePreferenceTouched = true;
    }
    // La configurazione condivisa non imposta più il filtro iniziale del
    // catalogo: il comportamento predefinito resta sempre “spento”.
    try {
      const shared = JSON.parse(
        localStorage.getItem("serra.config.v1") || "null"
      );
      if (shared?.zona) state.zona = shared.zona;
      // Mantiene disattivato il filtro iniziale delle colture facili.
      if (p.easyOnlyTouched) {
        catalog.easyOnly = Boolean(p.easyOnly);
      }
    } catch (_) {}
    // Il mese corrente viene ignorato in fase di caricamento per rimanere allineato con la data reale
    const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
    cart = raw.map((i) => (typeof i === "string" ? { id: i, bustine: 1 } : i));
  } catch (_) {}
}

// Testi localizzati
const NOMI_MESI_RO = [
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
];
const ABBR_MESI_RO = [
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
];
const STAGIONE_QUOTE_RO = {
  1: "Planifică cu grijă, pământul așteaptă răbdător.",
  2: "Februarie înșală: înăuntrul serei viața renaște.",
  3: "Martie zboară — seamănă acum, culege peste luni.",
  4: "Aprilie e inima grădinii: totul poate porni.",
  5: "Mai abundent: fă loc pentru tot ce crește.",
  6: "Vara a sosit. Udă, taie, savurează.",
  7: "Iulie arde — umbra serei e un dar.",
  8: "Sfârșitul verii: gândește-te deja la toamnă.",
  9: "Septembrie e noul martie: ciclul reîncepe.",
  10: "Octombrie dulce: rădăcinile și bulbii prind formă.",
  11: "Noiembrie încetinește totul — dar nu și sera.",
  12: "Decembrie rece, dar înăuntru crește încă ceva."
};
const HERO_KICKER_RO = {
  inverno: "❄️ Seră rece activă",
  primavera: "🌸 Sezon în floare",
  estate: "🌞 Vară deplină în seră",
  autunno: "🍂 Recoltă de toamnă"
};
const TIP_MESE_RO = {
  1: "Pregătește solul și verifică acoperișul: e momentul de planificat.",
  2: "Începe să semeni roșii în răsadniță pentru a le transplanta în aprilie.",
  3: "Tratează preventiv cu cupru lichid împotriva bolilor fungice.",
  4: "Instalează plase anti-afide: prevenția e mai bună decât tratamentul.",
  5: "Elimină lăstarii laterali de la roșii în fiecare săptămână.",
  6: "Udă la bază, niciodată pe frunze: previne oidiumul.",
  7: "Mulcește cu paie pentru a reține umiditatea solului.",
  8: "Seamănă imediat cicoarea și salata pentru recoltele de toamnă.",
  9: "Plantează căței de usturoi: vor fi gata în iunie.",
  10: "Scoate plantele epuizate și adaugă compost pentru anul următor.",
  11: "Protejează aromaticele perene cu un strat de mulci.",
  12: "Planifică rotația culturilor: nu pune aceeași familie în același loc."
};

const NOMI_MESI_IT = [...NOMI_MESI];
const ABBR_MESI_IT = [...ABBR_MESI];
const STAGIONE_QUOTE_IT = { ...STAGIONE_QUOTE };
const HERO_KICKER_IT = { ...HERO_KICKER };
const TIP_MESE_IT = { ...TIP_MESE };

const PLANT_RO = window.SERRA_I18N?.plants?.ro || {};
const T = window.SERRA_I18N?.index || { it: {}, ro: {} };

let currentLang = "it";

// Normalizza il codice della lingua prima di usarlo nei dizionari condivisi.
function normalizeLang(lang) {
  return lang === "ro" || lang === "it" ? lang : "it";
}

// Gestisce t
function t(key) {
  return (T[currentLang] || {})[key] || T.it[key] || key;
}

// Applicazione lingua
function applyLang(lang) {
  lang = normalizeLang(lang);
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t("page.title");
  document.querySelectorAll("[data-lang-select]").forEach((sel) => {
    sel.value = lang;
  });

  if (lang === "ro") {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_RO);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_RO);
    Object.keys(STAGIONE_QUOTE_RO).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_RO[k])
    );
    Object.keys(HERO_KICKER_RO).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_RO[k])
    );
    Object.keys(TIP_MESE_RO).forEach((k) => (TIP_MESE[k] = TIP_MESE_RO[k]));
  } else {
    NOMI_MESI.splice(0, 12, ...NOMI_MESI_IT);
    ABBR_MESI.splice(0, 12, ...ABBR_MESI_IT);
    Object.keys(STAGIONE_QUOTE_IT).forEach(
      (k) => (STAGIONE_QUOTE[k] = STAGIONE_QUOTE_IT[k])
    );
    Object.keys(HERO_KICKER_IT).forEach(
      (k) => (HERO_KICKER[k] = HERO_KICKER_IT[k])
    );
    Object.keys(TIP_MESE_IT).forEach((k) => (TIP_MESE[k] = TIP_MESE_IT[k]));
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val.includes("<") || val.includes("&")) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });

  localStorage.setItem("ois.lang", lang);
  render();
  if (
    currentDetail &&
    document.getElementById("detailOverlay")?.classList.contains("open")
  ) {
    openDetail(currentDetail, true);
  }
}

// Applica la lingua scelta alla pagina e la memorizza nelle preferenze locali.
function setLang(lang) {
  applyLang(normalizeLang(lang));
}

window.addEventListener("storage", (event) => {
  if (event.key !== "ois.lang") return;
  const nextLang = normalizeLang(event.newValue);
  if (nextLang === currentLang) return;
  applyLang(nextLang);
});

// Cookie e navigazione
function initCookieBanner() {
  if (localStorage.getItem("ois.cookie")) return;
  setTimeout(() => {
    const b = document.getElementById("cookieBanner");
    if (b) b.classList.add("visible");
  }, 1400);
}
// Accetta i cookie
function acceptCookies() {
  localStorage.setItem("ois.cookie", "accepted");
  document.getElementById("cookieBanner").classList.remove("visible");
}
// Rifiuta i cookie
function rejectCookies() {
  localStorage.setItem("ois.cookie", "essential");
  document.getElementById("cookieBanner").classList.remove("visible");
}

window.addEventListener(
  "scroll",
  function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    // Su telefono il pulsante fluttuante non deve coprire le prime card del
    // catalogo: compare solo quando il ritorno in cima è davvero utile.
    const mobile = window.matchMedia("(max-width: 660px)").matches;
    btn.classList.toggle("visible", window.scrollY > (mobile ? 1800 : 420));
    syncMobileCatalogDock();
  },
  { passive: true }
);

(async () => {
  // Bootstrap del catalogo piante: logica condivisa in assets/js/api.js
  await window.SerraAPI.bootstrapPlants();

  loadPrefs();
  if (new URLSearchParams(window.location.search).get("catalog") === "all") {
    toggleCatalogFull();
  }
  if (
    new URLSearchParams(window.location.search).get("from") === "configuratore"
  ) {
    history.replaceState(null, "", window.location.pathname);
    setTimeout(openCart, 320);
  }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) window.scrollTo(0, 0);
  const _initLang = localStorage.getItem("ois.lang") || "it";
  if (_initLang !== "it") {
    applyLang(_initLang);
  } else {
    // Applica prima le etichette statiche e poi lo stato dinamico. In caso
    // contrario la traduzione iniziale riscriveva “Riscaldamento spento” dopo
    // il rendering, anche quando le preferenze indicavano una serra riscaldata.
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val.includes("<") || val.includes("&")) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute(
        "placeholder",
        t(el.getAttribute("data-i18n-placeholder"))
      );
    });
    render();
  }
  initCookieBanner();
  // Mostra il contenuto dopo la sincronizzazione della lingua.
  document.documentElement.classList.remove("serra-i18n-pending");
})();

// Scroll con offset
function scrollElementBelowNav(target, behavior = "smooth") {
  if (!target) return;
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
      "76",
    10
  );
  const top = target.getBoundingClientRect().top + window.scrollY - navH - 28;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

// Scorrimento morbido generico per tutti i link di navigazione della homepage
document
  .querySelectorAll(
    'a[href^="#"]:not([href="#"]):not([href="#catalogSearch"]), a[href^="index.html#"]:not([href="index.html#"])'
  )
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (!hash) return;
      let target = document.getElementById(hash.slice(1));
      if (!target) return;
      const kicker = target.querySelector(".section-kicker, .stagione-kicker");
      if (kicker) target = kicker;
      e.preventDefault();
      history.replaceState(null, "", hash);
      scrollElementBelowNav(target);
    });
  });

(function () {
  const searchLabel = document.querySelector(".catalog-search--pro");
  const searchInput = document.getElementById("catalogSearch");
  if (!searchLabel || !searchInput) return;

  // Richiama l'attenzione sulla ricerca
  function triggerSearchAttention(focus) {
    searchLabel.classList.add("catalog-search--attention");
    searchLabel.addEventListener("animationend", function handler() {
      searchLabel.classList.remove("catalog-search--attention");
      searchLabel.removeEventListener("animationend", handler);
    });
    if (focus && window.innerWidth > 660) {
      searchInput.focus({ preventScroll: true });
    }
  }

  var searchObserver = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        setTimeout(function () {
          triggerSearchAttention(true);
        }, 300);
        searchObserver.disconnect();
      }
    },
    { threshold: 0.85 }
  );

  searchObserver.observe(searchLabel);

  var catalogLink = document.querySelector(".hero-cfg-catalog-link");
  if (catalogLink) {
    catalogLink.addEventListener("click", function () {
      setTimeout(function () {
        triggerSearchAttention(true);
      }, 600);
    });
  }
})();

const initialSectionHash = window.location.hash;
const initialSectionTargets = {
  "#stagione":
    document.querySelector("#stagione .stagione-kicker") ||
    document.getElementById("stagione"),
  "#abbinamenti": document.getElementById("abbinamenti"),
  "#kit": document.getElementById("kit"),
  "#contatti": document.getElementById("contatti")
};
const initialSectionTarget = initialSectionTargets[initialSectionHash];
if (initialSectionTarget) {
  window.setTimeout(() => {
    scrollElementBelowNav(initialSectionTarget, "auto");
  }, 80);
}

const catalogSearchLink = document.querySelector(
  '.catalog-pro-primary-action[href="#catalogSearch"]'
);
if (catalogSearchLink) {
  catalogSearchLink.addEventListener("click", (e) => {
    const input = document.getElementById("catalogSearch");
    const target = input?.closest(".catalog-search--pro") || input;
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, "", "#catalogSearch");
    scrollElementBelowNav(target);
    window.setTimeout(() => input?.focus({ preventScroll: true }), 350);
  });
}

// Animazione serra
(function initGreenhouseAnim() {
  const svg = document.getElementById("hcgSvg");
  const peek = document.getElementById("hcgPeek");
  const inner = document.getElementById("hcgPeekInner");
  if (!svg || !peek || !inner) return;

  const EMOJI_MAP = {
    pomodoro: "🍅",
    carota: "🥕",
    lattuga: "🥬",
    basilico: "🌿"
  };
  const QTY_MAP = { pomodoro: 4, carota: 6, lattuga: 6, basilico: 12 };
  const PLANT_IDS = ["pomodoro", "carota", "lattuga", "basilico"];
  const plantById = Object.fromEntries(
    (window.PLANTS || []).map((p) => [p.id, p])
  );
  const PLANTS = PLANT_IDS.map((id) => ({
    ...plantById[id],
    emoji: EMOJI_MAP[id],
    qty: QTY_MAP[id]
  })).filter((p) => p.id);

  const BEDS = [
    { p: PLANTS[0], x: 20, y: 19, w: 75, h: 56, cols: 2, rows: 2, r: 11 },
    { p: PLANTS[1], x: 20, y: 82, w: 75, h: 59, cols: 2, rows: 3, r: 9 },
    { p: PLANTS[2], x: 111, y: 19, w: 89, h: 43, cols: 3, rows: 2, r: 8 },
    { p: PLANTS[3], x: 111, y: 69, w: 89, h: 72, cols: 3, rows: 4, r: 7 }
  ];

  // Calcola le posizioni delle piante nell'aiuola
  function bedPlantPositions(bed) {
    const pts = [];
    // I punti non sono più compressi al centro: mantengono un margine sicuro
    // dal bordo, ma sfruttano più superficie dell'aiuola tra una pianta e l'altra.
    const insetX = Math.min(12, bed.w * 0.16);
    const insetY = Math.min(11, bed.h * 0.17);
    const usableW = Math.max(0, bed.w - insetX * 2);
    const usableH = Math.max(0, bed.h - insetY * 2);
    const spacingBoost = 0.35;
    for (let row = 0; row < bed.rows; row++) {
      for (let col = 0; col < bed.cols; col++) {
        const baseX = (bed.w * (col + 1)) / (bed.cols + 1);
        const baseY = (bed.h * (row + 1)) / (bed.rows + 1);
        const expandedX =
          bed.cols === 1 ? bed.w / 2 : insetX + (usableW * col) / (bed.cols - 1);
        const expandedY =
          bed.rows === 1 ? bed.h / 2 : insetY + (usableH * row) / (bed.rows - 1);
        pts.push({
          cx: bed.x + baseX + (expandedX - baseX) * spacingBoost,
          cy: bed.y + baseY + (expandedY - baseY) * spacingBoost
        });
      }
    }
    return pts;
  }

  // Genera numeri casuali deterministici
  function makeRng(seed) {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    };
  }
  const _shade = "rgba(0,0,0,.13)";
  const _laterPlantSvgIds = new Set([
    "broccolo_romanesco",
    "friggitello",
    "agretti",
    "borragine",
    "catalogna",
    "acetosa",
    "leurda",
    "melissa",
    "cerfoglio",
    "cimbru"
  ]);
  // Verifica se mostrare l'icona di raccolta
  function shouldShowHarvestVector(plant) {
    if (["frutto", "radice", "legume"].includes(plant.tipo)) return true;
    return new Set([
      "broccolo",
      "cavolfiore",
      "cavolo",
      "verza",
      "cavolorapa",
      "cavoletti",
      "cavolo_rosso",
      "cavolo_navone",
      "carciofo",
      "asparago",
      "finocchio"
    ]).has(plant.id);
  }
  // Genera la forma foglia semplice
  function _leafPath(len, wid) {
    return `M0 0 C ${wid} ${-len * 0.16},${wid * 0.55} ${-len * 0.85},0 ${-len} C ${-wid * 0.55} ${-len * 0.85},${-wid} ${-len * 0.16},0 0 Z`;
  }
  // Genera la forma foglia lobata
  function _lobedLeafPath(len, wid) {
    return `M0 0 Q ${wid * 0.4} ${-len * 0.1} ${wid * 0.5} ${-len * 0.25} Q ${wid * 0.15} ${-len * 0.3} ${wid * 0.55} ${-len * 0.45} Q ${wid * 0.1} ${-len * 0.5} ${wid * 0.45} ${-len * 0.7} Q ${wid * 0.05} ${-len * 0.75} 0 ${-len} Q ${-wid * 0.05} ${-len * 0.75} ${-wid * 0.45} ${-len * 0.7} Q ${-wid * 0.1} ${-len * 0.5} ${-wid * 0.55} ${-len * 0.45} Q ${-wid * 0.15} ${-len * 0.3} ${-wid * 0.5} ${-len * 0.25} Q ${-wid * 0.4} ${-len * 0.1} 0 0 Z`;
  }
  // Disegna il glifo vegetale
  function glyph(plant, r, rng) {
    if (_laterPlantSvgIds.has(plant?.id)) {
      const size = r * 2;
      const src = window.serraAsset(`assets/img/svg/${plant.id}.svg`);
      return `<image href="${src}" x="${-r}" y="${-r}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>`;
    }
    const c = plant.col || { l1: "#4f8f3a", l2: "#3d7a2c" };
    const sh = `<ellipse cx="${r * 0.08}" cy="${r * 0.12}" rx="${r * 0.95}" ry="${r * 0.85}" fill="${_shade}"/>`;
    let s = "";
    switch (plant.arch) {
      case "rosetta": {
        s += sh;
        const N = 10 + Math.floor(rng() * 4);
        for (let ring = 0; ring < 2; ring++) {
          const f = ring ? 0.62 : 1,
            n = ring ? 7 : N;
          for (let i = 0; i < n; i++) {
            const a = (i / n) * 360 + (ring ? 20 : 0) + rng() * 14,
              len = r * f * (0.85 + rng() * 0.25),
              wid = len * 0.5;
            const col = ring ? c.l1 : i % 2 ? c.l2 : c.l1;
            s += `<g transform="rotate(${a})"><path d="${_leafPath(len, wid)}" fill="${col}"/><path d="M0 0 L0 ${-len * 0.9}" stroke="rgba(0,0,0,.10)" stroke-width="${len * 0.03}" fill="none"/></g>`;
          }
        }
        s += `<circle r="${r * 0.16}" fill="${c.fr || c.l1}"/>`;
        break;
      }
      case "frastagliata": {
        s += sh;
        const N = 9 + Math.floor(rng() * 4);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 20,
            len = r * (0.8 + rng() * 0.3),
            wid = len * 0.45;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        s += `<circle r="${r * 0.1}" fill="${c.l2}"/>`;
        break;
      }
      case "cespuglio": {
        s += sh;
        const N = 14 + Math.floor(rng() * 6);
        for (let i = 0; i < N; i++) {
          const a = rng() * 360,
            dist = rng() * r * 0.55,
            len = r * (0.4 + rng() * 0.3),
            wid = len * 0.62;
          const x = Math.cos((a * Math.PI) / 180) * dist,
            y = Math.sin((a * Math.PI) / 180) * dist;
          s += `<g transform="translate(${x} ${y}) rotate(${rng() * 360})"><path d="${_leafPath(len, wid)}" fill="${i % 2 ? c.l1 : c.l2}"/></g>`;
        }
        break;
      }
      case "frutto": {
        s += sh;
        const N = 8 + Math.floor(rng() * 3);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 16,
            len = r * (0.9 + rng() * 0.2),
            wid = len * 0.5;
          s += `<g transform="rotate(${a})"><path d="${_lobedLeafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        const fr = c.fr || "#e2452f",
          nf = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < nf; i++) {
          const a = rng() * 360,
            dist = r * (0.2 + rng() * 0.4),
            x = Math.cos(a) * dist,
            y = Math.sin(a) * dist,
            fr2 = r * 0.17 * (0.8 + rng() * 0.4);
          s += `<circle cx="${x}" cy="${y}" r="${fr2}" fill="${fr}"/><circle cx="${x - fr2 * 0.3}" cy="${y - fr2 * 0.3}" r="${fr2 * 0.35}" fill="rgba(255,255,255,.5)"/>`;
        }
        break;
      }
      case "piumosa": {
        s += `<ellipse cx="${r * 0.06}" cy="${r * 0.1}" rx="${r * 0.8}" ry="${r * 0.75}" fill="${_shade}"/>`;
        const N = 7 + Math.floor(rng() * 4);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 20,
            len = r * (0.8 + rng() * 0.3);
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
      default: {
        s += sh;
        const N = 9 + Math.floor(rng() * 3);
        for (let i = 0; i < N; i++) {
          const a = (i / N) * 360 + rng() * 14,
            len = r * (0.82 + rng() * 0.22),
            wid = len * 0.52;
          s += `<g transform="rotate(${a})"><path d="${_leafPath(len, wid)}" fill="${i % 2 ? c.l2 : c.l1}"/></g>`;
        }
        s += `<circle r="${r * 0.13}" fill="${c.l1}"/>`;
      }
    }
    return `<g>${s}</g>`;
  }

  // Costruisce la mappa dimostrativa
  function buildMap() {
    let defs = `<defs>
      <radialGradient id="harvestRed" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ff9a82"/><stop offset=".28" stop-color="#e84e3d"/><stop offset=".72" stop-color="#b52e2b"/><stop offset="1" stop-color="#651f25"/></radialGradient>
      <radialGradient id="harvestGreen" cx="28%" cy="22%" r="82%"><stop offset="0" stop-color="#b9db75"/><stop offset=".3" stop-color="#6fa34d"/><stop offset=".72" stop-color="#3f743b"/><stop offset="1" stop-color="#21472d"/></radialGradient>
      <radialGradient id="harvestOrange" cx="30%" cy="22%" r="80%"><stop offset="0" stop-color="#ffd06c"/><stop offset=".32" stop-color="#ed8a35"/><stop offset=".74" stop-color="#bd5528"/><stop offset="1" stop-color="#74301f"/></radialGradient>
      <linearGradient id="hcgSoil" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#795b3e"/><stop offset=".62" stop-color="#5d422d"/><stop offset="1" stop-color="#442d1e"/></linearGradient>
      <linearGradient id="hcgDirt" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9a7446"/><stop offset="1" stop-color="#684827"/></linearGradient>
      <linearGradient id="hcgPathBase" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#817866"/><stop offset=".16" stop-color="#c9c0a7"/><stop offset=".52" stop-color="#e0d7bd"/><stop offset=".84" stop-color="#b8af97"/><stop offset="1" stop-color="#756c5a"/></linearGradient>
      <clipPath id="hcgInteriorClip"><rect x="14" y="12" width="192" height="136" rx="5.5"/></clipPath>
      <pattern id="hcgGrass" width="15" height="15" patternUnits="userSpaceOnUse"><rect width="15" height="15" fill="#1d4d30"/><path d="M2 14L4 8M9 14l1-5M13 14l-2-3" stroke="#4f843c" stroke-width=".7" opacity=".7"/></pattern>
      <pattern id="hcgGravel" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#aaa28d"/><circle cx="3" cy="3" r="1.2" fill="#ded7c2"/><circle cx="9" cy="7" r="1.3" fill="#817967"/><circle cx="5" cy="10" r=".9" fill="#c3bba4"/></pattern>
      <pattern id="hcgSoilSpecks" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r=".9" fill="rgba(230,202,158,.2)"/><circle cx="12" cy="9" r="1.15" fill="rgba(31,20,12,.22)"/><circle cx="8" cy="15" r=".65" fill="rgba(238,214,170,.14)"/></pattern>`;
    defs += `</defs>`;
    let s = `<rect width="220" height="160" fill="url(#hcgGrass)"/>`;
    s += `<rect x="13" y="14" width="194" height="137" rx="10" fill="#102719" opacity=".3"/>`;
    s += `<rect x="10" y="8" width="200" height="144" rx="10" fill="#657779" stroke="#183b3e" stroke-width="3.4"/>`;
    s += `<rect x="11.6" y="9.6" width="196.8" height="140.8" rx="8.4" fill="none" stroke="rgba(244,253,252,.9)" stroke-width="1.15"/>`;
    s += `<rect x="13.5" y="11.5" width="193" height="137" rx="6.5" fill="#3a2710" stroke="rgba(35,66,67,.88)" stroke-width="1.2"/>`;
    s += `<g clip-path="url(#hcgInteriorClip)">`;
    s += `<rect x="14" y="12" width="192" height="136" fill="url(#hcgDirt)"/>`;
    // Camminamento: bordo leggermente incassato, ghiaia con profondità e
    // ciottoli irregolari, distinto dal terreno senza creare recinti.
    s += `<rect x="95.8" y="12" width="14.4" height="136" fill="rgba(47,33,19,.3)"/>`;
    s += `<rect x="97" y="12" width="12" height="136" fill="url(#hcgPathBase)"/>`;
    s += `<rect x="97.7" y="12" width="10.6" height="136" fill="url(#hcgGravel)" opacity=".8"/>`;
    s += `<path d="M98.2 13V147 M107.8 13V147" fill="none" stroke="rgba(255,255,242,.42)" stroke-width=".55"/>`;
    BEDS.forEach((b) => {
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#hcgSoil)"/>`;
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#hcgSoilSpecks)" opacity=".62"/>`;
    });
    s += `</g>`;
    svg.innerHTML = defs + s;
  }

  // Aggiunge una pianta alla mappa
  function addPlant(cx, cy, plant, r, seed) {
    const rng = makeRng(seed);
    const visualR = r;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    // Il punto resta fissato nello spazio della serra: a crescere è soltanto
    // il contenuto interno, mai la posizione della pianta.
    g.setAttribute("transform", `translate(${cx} ${cy})`);
    g.style.opacity = "0";
    g.style.transition = "opacity 0.22s ease";
    const label =
      r >= 9 && shouldShowHarvestVector(plant)
        ? `<text class="hcg-harvest-reveal" y="${-visualR * 0.28}" text-anchor="middle" dominant-baseline="central" font-size="${Math.max(visualR * 1.2, 8) * 0.8}" style="pointer-events:none;user-select:none;font-family:system-ui">${plant.emoji}</text>`
        : "";
    g.innerHTML = `<g class="hcg-plant-grow">
      <ellipse class="hcg-plant-soil-bloom" cx="0" cy="${visualR * 0.1}" rx="${visualR * 0.64}" ry="${visualR * 0.24}"/>
      ${glyph(plant, visualR, rng)}
      <path class="hcg-plant-leaf-sheen" d="M${-visualR * 0.3} ${-visualR * 0.08} Q0 ${-visualR * 0.42} ${visualR * 0.28} ${-visualR * 0.2}" stroke-width="${Math.max(0.45, visualR * 0.04)}"/>
      ${label}
    </g>`;
    svg.appendChild(g);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        g.style.opacity = "1";
      })
    );
  }

  // Costruisce il pannello riepilogo
  function buildPanel() {
    inner.innerHTML = PLANTS.map(
      (p) =>
        `<div class="hcg-card">
        <span class="hcg-card-ico">${p.emoji}</span>
        <div class="hcg-card-info">
          <span class="hcg-card-name">${p.nome || p.name}</span>
          <span class="hcg-card-meta">${p.sole === "pieno" ? "☀️" : "🌤️"} · ${p.gg} gg</span>
        </div>
        <span class="hcg-card-qty">${p.qty} pz</span>
      </div>`
    ).join("");
  }

  let timers = [];
  // Registra un timer animazione
  function t(fn, ms) {
    timers.push(setTimeout(fn, ms));
  }
  // Pulisce i timer animazione
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  // Avvia il ciclo animato
  function runCycle() {
    clearTimers();
    buildMap();
    peek.classList.remove("hcg-peek--in");
    inner
      .querySelectorAll(".hcg-card")
      .forEach((c) => c.classList.remove("hcg-card--in"));

    let delay = 120;
    BEDS.forEach((bed, bi) => {
      const pts = bedPlantPositions(bed);

      const step = bed.p.id === "basilico" ? 75 : 120;
      pts.forEach((pt, pi) => {
        const d = delay;
        t(() => addPlant(pt.cx, pt.cy, bed.p, bed.r, bi * 100 + pi), d);
        delay += step;
      });
      delay += 60;
    });

    const panelIn = delay + 180;
    t(() => {
      peek.classList.add("hcg-peek--in");
      inner
        .querySelectorAll(".hcg-card")
        .forEach((c, i) =>
          setTimeout(() => c.classList.add("hcg-card--in"), i * 110)
        );
    }, panelIn);

    t(
      () => {
        peek.classList.remove("hcg-peek--in");
        inner
          .querySelectorAll(".hcg-card")
          .forEach((c) => c.classList.remove("hcg-card--in"));
        t(runCycle, 500);
      },
      panelIn + 600 + 2600
    );
  }

  buildPanel();
  buildMap();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        runCycle();
      }
    },
    { threshold: 0.2 }
  );
  const container = document.querySelector(".hcg");
  if (container) observer.observe(container);
})();

// Pre-configurazione
(function () {
  const CONFIG_KEY = "serra.config.v1";

  // Legge la configurazione salvata
  function readSavedCfg() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
    } catch {
      return null;
    }
  }

  // Salva la pre-configurazione
  function savePreconfigToStorage() {
    const w = Math.min(
      12,
      Math.max(1, parseFloat(document.getElementById("pcW")?.value) || 3)
    );
    const l = Math.min(
      30,
      Math.max(1, parseFloat(document.getElementById("pcL")?.value) || 5)
    );
    const path = Math.min(
      120,
      Math.max(30, parseInt(document.getElementById("pcPathNum")?.value) || 60)
    );
    const zona = document.getElementById("pcZona")?.value ?? "temperato";
    const riscaldata = document.getElementById("pcRisc")?.value === "si";
    const mese =
      parseInt(document.getElementById("pcMese")?.value) ||
      new Date().getMonth() + 1;
    const existing = readSavedCfg() || {};
    const activePersona = document.querySelector(
      "#preconfigPersonaSection .pc-persona-card.is-active"
    );
    try {
      localStorage.setItem(
        CONFIG_KEY,
        JSON.stringify({
          ...existing,
          larghezza: w,
          lunghezza: l,
          path,
          zona,
          riscaldata,
          mese,
          livello:
            activePersona?.dataset.livello || existing.livello || "novizio"
        })
      );
    } catch {}
    return { w, l, path, zona, riscaldata, mese };
  }

  // Inserisce la pre-configurazione anche nell'URL di ingresso. Il
  // localStorage resta la memoria persistente, mentre questi parametri
  // garantiscono il passaggio alla pagina successiva anche quando il browser
  // blocca, svuota o isola la memoria locale durante la navigazione.
  function buildPreconfigTargetUrl(targetUrl, config) {
    const url = new URL(targetUrl, location.href);
    url.searchParams.set("preconfig", "1");
    url.searchParams.set("w", String(config.w));
    url.searchParams.set("l", String(config.l));
    url.searchParams.set("path", String(config.path));
    url.searchParams.set("zona", config.zona);
    url.searchParams.set("risc", config.riscaldata ? "1" : "0");
    url.searchParams.set("mese", String(config.mese));
    return url.href;
  }

  // Allinea lo slider della pre-configurazione
  function syncPcSlider(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    if (input && slider) slider.value = input.value;
  }

  // Allinea l'input dallo slider
  function syncPcInputFromSlider(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);
    if (slider && input) input.value = slider.value;
  }

  // Allinea il camminamento pre-configurato
  function syncPcPath(source) {
    const slider = document.getElementById("pcPath");
    const num = document.getElementById("pcPathNum");
    if (!slider || !num) return;
    const raw = parseInt(source === "slider" ? slider.value : num.value) || 60;
    const snapped = Math.round(Math.min(120, Math.max(30, raw)) / 5) * 5;
    slider.value = snapped;
    num.value = snapped;
    updatePreconfigSummary();
  }

  // Aggiorna il riepilogo pre-configurazione
  function updatePreconfigSummary() {
    const el = document.getElementById("preconfigSummary");
    if (!el) return;
    const w = parseFloat(document.getElementById("pcW")?.value) || 3;
    const l = parseFloat(document.getElementById("pcL")?.value) || 5;
    const path = parseInt(document.getElementById("pcPathNum")?.value) || 60;
    const zona = document.getElementById("pcZona")?.value ?? "temperato";
    const heated = document.getElementById("pcRisc")?.value === "si";
    const mese =
      parseInt(document.getElementById("pcMese")?.value) ||
      new Date().getMonth() + 1;
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    const months =
      (window.SERRA_I18N &&
        window.SERRA_I18N.months &&
        window.SERRA_I18N.months[lang]) ||
      [];
    const monthName = months[mese - 1] || mese;
    const zonaLabel =
      pcT(
        "hero.zone_" +
          (zona === "freddo"
            ? "cold"
            : zona === "temperato"
              ? "temp"
              : "warm") +
          "_label"
      ) || zona;
    const heatedLabel = pcT("preconfig.serra_heated") || "🔥";
    const pathAbbr = pcT("preconfig.path_abbr");
    el.textContent = `${w}×${l} m · ${pathAbbr} ${path} cm · ${zonaLabel}${heated ? " · " + heatedLabel : ""} · ${monthName}`;
  }

  // Allinea il selettore serra riscaldata
  function syncPcRiscSelect(heated) {
    const sel = document.getElementById("pcRisc");
    if (!sel) return;
    sel.value = heated ? "si" : "no";
    sel.classList.toggle("is-heated", Boolean(heated));
  }

  var PC_MONTHS = {
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
  };

  // Popola i mesi della pre-configurazione
  function populatePcMonths() {
    const sel = document.getElementById("pcMese");
    if (!sel) return;
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    const months = PC_MONTHS[lang] || PC_MONTHS.it;
    const currentVal = sel.value;
    sel.innerHTML = "";
    months.forEach(function (m, i) {
      const opt = document.createElement("option");
      opt.value = i + 1;
      opt.textContent = m;
      sel.appendChild(opt);
    });
    if (currentVal) sel.value = currentVal;
  }

  var PC_TR = {
    it: {
      "preconfig.title": "La tua serra",
      "preconfig.tag": "Imposta i parametri",
      "preconfig.intro_note":
        "Un avvio rapido: bastano pochi dati per aprire il configuratore già pronto. Nulla è definitivo, potrai cambiare tutto in qualsiasi momento nella pagina successiva.",
      "preconfig.sizes_label": "1. Misure interne",
      "preconfig.sizes_badge": "Fondamentale",
      "preconfig.sizes_note":
        "Le dimensioni determinano quante aiuole e piante puoi coltivare.",
      "preconfig.width": "Larghezza",
      "preconfig.length": "Lunghezza",
      "preconfig.path_label": "Camminamento tra aiuole",
      "preconfig.path_abbr": "cam.",
      "preconfig.climate_label": "2. Clima",
      "preconfig.zona_label": "Zona",
      "preconfig.serra_label": "Serra",
      "preconfig.serra_cold": "Fredda",
      "preconfig.serra_heated": "Riscaldata",
      "preconfig.month_label": "3. Mese di semina",
      "preconfig.cta": "Vai al configuratore",
      "preconfig.account_choice_title": "Vuoi riprendere la tua configurazione?",
      "preconfig.account_choice_text":
        "La configurazione attuale è già al sicuro. Puoi continuare senza modifiche oppure aggiornare i parametri della serra.",
      "preconfig.account_choice_continue": "Riprendi configurazione",
      "preconfig.account_choice_edit": "Modifica i parametri",
      "preconfig.choose_persona_alert":
        "Scegli prima che tipo di coltivatore sei.",
      "hero.cfg_levels_title": "Che tipo di coltivatore sei?",
      "hero.cfg_novizio": "Principiante",
      "hero.cfg_nov_hint": "Ti guido dalla prima scelta fino all'acquisto",
      "hero.cfg_intermedio": "Intermedio",
      "hero.cfg_int_hint": "Parti da un piano pronto e personalizzalo",
      "hero.cfg_esperto": "Esperto",
      "hero.cfg_exp_hint": "Scegli un layout pronto oppure componi liberamente",
      "hero.zone_cold_label": "Fredda",
      "hero.zone_temp_label": "Temperata",
      "hero.zone_warm_label": "Calda"
    },
    ro: {
      "preconfig.title": "Sera ta",
      "preconfig.tag": "Setează parametrii",
      "preconfig.intro_note":
        "Un început rapid: e nevoie doar de câteva date pentru a deschide configuratorul deja pregătit. Nimic nu este definitiv, poți schimba totul oricând pe pagina următoare.",
      "preconfig.sizes_label": "1. Dimensiuni interne",
      "preconfig.sizes_badge": "Esențial",
      "preconfig.sizes_note":
        "Dimensiunile determină câte parcele și plante poți cultiva.",
      "preconfig.width": "Lățime",
      "preconfig.length": "Lungime",
      "preconfig.path_label": "Cărare între parcele",
      "preconfig.path_abbr": "căr.",
      "preconfig.climate_label": "2. Climă",
      "preconfig.zona_label": "Zonă",
      "preconfig.serra_label": "Seră",
      "preconfig.serra_cold": "Rece",
      "preconfig.serra_heated": "Încălzită",
      "preconfig.month_label": "3. Luna de semănat",
      "preconfig.cta": "Mergi la configurator",
      "preconfig.account_choice_title": "Vrei să reiei configurarea?",
      "preconfig.account_choice_text":
        "Configurarea actuală este deja în siguranță. Poți continua fără modificări sau poți actualiza parametrii serei.",
      "preconfig.account_choice_continue": "Reia configurarea",
      "preconfig.account_choice_edit": "Modifică parametrii",
      "preconfig.choose_persona_alert":
        "Alege mai întâi ce tip de cultivator ești.",
      "hero.cfg_levels_title": "Ce fel de cultivator ești?",
      "hero.cfg_novizio": "Începător",
      "hero.cfg_nov_hint": "Te ghidez de la prima alegere până la cumpărare",
      "hero.cfg_intermedio": "Intermediar",
      "hero.cfg_int_hint": "Pornești de la un plan gata și îl personalizezi",
      "hero.cfg_esperto": "Expert",
      "hero.cfg_exp_hint": "Alege un plan gata sau compune liber",
      "hero.zone_cold_label": "Rece",
      "hero.zone_temp_label": "Temperată",
      "hero.zone_warm_label": "Caldă"
    }
  };

  // Traduce una chiave della pre-configurazione
  function pcT(key) {
    var lang = document.documentElement.lang === "ro" ? "ro" : "it";
    return (
      (PC_TR[lang] && PC_TR[lang][key]) || (PC_TR.it && PC_TR.it[key]) || key
    );
  }

  // Applica la lingua alla pre-configurazione
  function applyPreconfigLang() {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    overlay.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const val = pcT(key);
      if (val && val !== key) {
        if (val.indexOf("<") !== -1 || val.indexOf("&") !== -1)
          el.innerHTML = val;
        else el.textContent = val;
      }
    });
    populatePcMonths();
  }

  // Aggiorna la CTA pre-configurazione
  function updatePreconfigCta() {
    const active = document.querySelector(
      "#preconfigPersonaSection .pc-persona-card.is-active"
    );
    const cta = document.getElementById("preconfigCta");
    if (!cta) return;
    if (active) {
      const target = new URL(active.dataset.url, location.href);
      const source = document.getElementById("preconfigOverlay")?.dataset.source;
      if (source) target.searchParams.set("source", source);
      cta.href = target.href;
      cta.classList.remove("preconfig-cta--disabled");
      cta.removeAttribute("aria-disabled");
    } else {
      cta.href = "#";
      cta.classList.add("preconfig-cta--disabled");
      cta.setAttribute("aria-disabled", "true");
    }
  }

  // Apre la scheda pre-configurazione
  function openPreconfigSheet(targetUrl) {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    applyPreconfigLang();

    const saved = readSavedCfg();
    const w = saved?.larghezza ?? 3;
    const l = saved?.lunghezza ?? 5;
    const zona = saved?.zona ?? "temperato";
    const riscaldata = Boolean(saved?.riscaldata);
    // Ripristina il mese salvato o usa quello corrente.
    const mese = saved?.mese ?? new Date().getMonth() + 1;

    const path = saved?.path ?? 60;
    const pcW = document.getElementById("pcW");
    const pcL = document.getElementById("pcL");
    if (pcW) pcW.value = w;
    if (pcL) pcL.value = l;
    syncPcSlider("pcW", "pcWSlider");
    syncPcSlider("pcL", "pcLSlider");
    const pcPath = document.getElementById("pcPath");
    const pcPathNum = document.getElementById("pcPathNum");
    if (pcPath) pcPath.value = path;
    if (pcPathNum) pcPathNum.value = path;
    const pcZona = document.getElementById("pcZona");
    if (pcZona) pcZona.value = zona;
    syncPcRiscSelect(riscaldata);
    const pcMese = document.getElementById("pcMese");
    if (pcMese) pcMese.value = mese;
    updatePreconfigSummary();

    const target = new URL(targetUrl, location.href);
    const urlParams = target.searchParams;
    // Il pannello può essere aperto anche dall'area personale: conserva la
    // provenienza senza duplicare la UI della home.
    overlay.dataset.source = urlParams.get("source") || "index";
    const isSafeResumeEntry =
      overlay.dataset.source === "account" || urlParams.get("resume") === "1";
    const accountChoice = document.getElementById("preconfigAccountChoice");
    const preconfigBody = overlay.querySelector(".preconfig-body");
    const preconfigFooter = overlay.querySelector(".preconfig-footer");
    if (accountChoice) accountChoice.hidden = !isSafeResumeEntry;
    if (preconfigBody) preconfigBody.hidden = isSafeResumeEntry;
    if (preconfigFooter) preconfigFooter.hidden = isSafeResumeEntry;
    const continueLink = document.getElementById("preconfigAccountContinue");
    if (continueLink) {
      continueLink.href = `configuratore.html?source=${encodeURIComponent(overlay.dataset.source)}`;
    }
    const livello = urlParams.get("livello");
    const validLevels = ["novizio", "intermedio", "esperto"];
    const selectedLivello = validLevels.includes(livello) ? livello : null;
    const personaSection = document.getElementById("preconfigPersonaSection");
    const hasLivello = Boolean(livello);

    if (personaSection) personaSection.hidden = hasLivello;

    document
      .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
      .forEach((btn) => {
        const isActive = btn.dataset.livello === selectedLivello;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

    const cta = document.getElementById("preconfigCta");
    if (cta && hasLivello) {
      cta.href = target.href;
      cta.classList.remove("preconfig-cta--disabled");
      cta.removeAttribute("aria-disabled");
    } else {
      updatePreconfigCta();
    }

    overlay.removeAttribute("hidden");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("is-open");

        setTimeout(function () {
          const dimsCard = overlay.querySelector(".preconfig-vfield--primary");
          if (!dimsCard) return;
          dimsCard.classList.remove("dims-attention");
          void dimsCard.offsetWidth;
          dimsCard.classList.add("dims-attention");
          dimsCard.addEventListener(
            "animationend",
            function () {
              dimsCard.classList.remove("dims-attention");
            },
            { once: true }
          );
        }, 280);
      });
    });
    document.documentElement.classList.add("preconfig-open");
    document.body.classList.add("preconfig-open");
  }

  // Chiude la scheda pre-configurazione
  function closePreconfigSheet() {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    // Su iOS il popup nativo di una select può interrompere una transizione:
    // assicuriamo comunque la conclusione della chiusura del pannello.
    let closed = false;
    const onEnd = () => {
      if (closed) return;
      closed = true;
      overlay.setAttribute("hidden", "");
      document.documentElement.classList.remove("preconfig-open");
      document.body.classList.remove("preconfig-open");
    };
    overlay.addEventListener("transitionend", onEnd, { once: true });
    window.setTimeout(onEnd, 450);
  }

  function initHomeApp() {
    document
      .getElementById("catalogFilterToggle")
      ?.addEventListener("click", toggleCatalogFilters);

    document
      .querySelectorAll(".hero-cfg-level, .nav-link--configuratore")
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          openPreconfigSheet(this.href);
        });
      });

    document
      .getElementById("preconfigBackdrop")
      ?.addEventListener("click", closePreconfigSheet);
    document
      .getElementById("preconfigClose")
      ?.addEventListener("click", closePreconfigSheet);

    document
      .getElementById("preconfigAccountEdit")
      ?.addEventListener("click", () => {
        const overlay = document.getElementById("preconfigOverlay");
        if (!overlay) return;
        document.getElementById("preconfigAccountChoice")?.setAttribute("hidden", "");
        overlay.querySelector(".preconfig-body")?.removeAttribute("hidden");
        overlay.querySelector(".preconfig-footer")?.removeAttribute("hidden");
        overlay.dataset.source = "account";
        updatePreconfigSummary();
      });

    // Il foglio non deve mai trasformare un tap su un controllo nativo in un
    // tap sul backdrop: questo evita la chiusura immediata dei menu a tendina
    // su Safari iOS.
    document
      .getElementById("preconfigSheet")
      ?.addEventListener("click", (event) => event.stopPropagation());

    document
      .getElementById("pcZona")
      ?.addEventListener("change", updatePreconfigSummary);
    document
      .getElementById("pcRisc")
      ?.addEventListener("change", (event) => {
        event.currentTarget.classList.toggle(
          "is-heated",
          event.currentTarget.value === "si"
        );
        updatePreconfigSummary();
      });

    document
      .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          document
            .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
            .forEach((b) => {
              b.classList.remove("is-active");
              b.setAttribute("aria-pressed", "false");
            });
          this.classList.add("is-active");
          this.setAttribute("aria-pressed", "true");
          updatePreconfigCta();
        });
      });

    document.querySelectorAll(".preconfig-step-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = document.getElementById(this.dataset.target);
        if (!input) return;
        const step = parseFloat(this.dataset.step);
        const min = parseFloat(input.min) || 1;
        const max = parseFloat(input.max) || 40;
        const val =
          Math.round(
            Math.min(
              max,
              Math.max(min, (parseFloat(input.value) || 0) + step)
            ) * 10
          ) / 10;
        input.value = val;
        updatePreconfigSummary();
      });
    });

    document.getElementById("pcWSlider")?.addEventListener("input", () => {
      syncPcInputFromSlider("pcWSlider", "pcW");
      updatePreconfigSummary();
    });
    document.getElementById("pcLSlider")?.addEventListener("input", () => {
      syncPcInputFromSlider("pcLSlider", "pcL");
      updatePreconfigSummary();
    });
    document
      .getElementById("pcW")
      ?.addEventListener("input", () => syncPcSlider("pcW", "pcWSlider"));
    document
      .getElementById("pcL")
      ?.addEventListener("input", () => syncPcSlider("pcL", "pcLSlider"));

    document
      .getElementById("pcPath")
      ?.addEventListener("input", () => syncPcPath("slider"));
    document
      .getElementById("pcPathNum")
      ?.addEventListener("change", () => syncPcPath("num"));

    ["pcW", "pcL", "pcMese"].forEach((id) => {
      document
        .getElementById(id)
        ?.addEventListener("change", updatePreconfigSummary);
    });

    document
      .getElementById("preconfigCta")
      ?.addEventListener("click", function (event) {
        if (this.classList.contains("preconfig-cta--disabled")) {
          event.preventDefault();
          window.alert(
            pcT("preconfig.choose_persona_alert") ||
              "Scegli prima che tipo di coltivatore sei."
          );
          return;
        }
        const config = savePreconfigToStorage();
        // Aggiornando l'href prima dell'azione predefinita conserviamo anche
        // apertura in una nuova scheda e comandi standard del browser.
        this.href = buildPreconfigTargetUrl(this.href, config);
      });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !document.getElementById("preconfigOverlay")?.hasAttribute("hidden")
      ) {
        closePreconfigSheet();
      }
    });

    new MutationObserver(() => {
      applyPreconfigLang();
      updatePreconfigSummary();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    const requestedPreconfig = new URLSearchParams(location.search).get("preconfig");
    const guidePreconfigTargets = {
      novizio: "configuratore.html?livello=novizio&guided=1&source=index",
      intermedio: "configuratore.html?livello=intermedio&guided=1&source=index",
      esperto:
        "configuratore.html?livello=esperto&mode=expert&empty=1&source=index"
    };
    const guidePreconfigTarget =
      guidePreconfigTargets[requestedPreconfig] ||
      (requestedPreconfig === "account" ? "configuratore.html?source=account" : null);
    if (guidePreconfigTarget) {
      history.replaceState(null, "", location.pathname);
      requestAnimationFrame(() => openPreconfigSheet(guidePreconfigTarget));
    }

    setupLazyContactMap();
  }

  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (window.__serraLeafletPromise) return window.__serraLeafletPromise;

    window.__serraLeafletPromise = new Promise((resolve, reject) => {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

      let stylesheetReady = false;
      let scriptReady = false;
      const finish = () => {
        if (!stylesheetReady || !scriptReady) return;
        if (window.L) resolve();
        else reject(new Error("Leaflet non disponibile"));
      };
      stylesheet.onload = () => {
        stylesheetReady = true;
        finish();
      };
      stylesheet.onerror = reject;
      script.onload = () => {
        scriptReady = true;
        finish();
      };
      script.onerror = reject;

      document.head.append(stylesheet);
      document.head.append(script);
    });
    return window.__serraLeafletPromise;
  }

  function setupLazyContactMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const createMap = () => {
      if (mapElement.dataset.leafletReady) return;
      mapElement.dataset.leafletReady = "true";
      loadLeaflet()
        .then(() => {
          const map = L.map(mapElement, { scrollWheelZoom: false }).setView(
            [43.6853, 11.2547],
            15
          );
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          L.marker([43.6853, 11.2547])
            .addTo(map)
            .bindPopup(
              "<b>Orto in Serra</b><br>Via delle Serre, 42<br>50023 Impruneta (FI)"
            )
            .openPopup();
        })
        .catch((err) => {
          mapElement.dataset.leafletReady = "";
          console.error("Errore nel caricamento della mappa Leaflet:", err);
        });
    };

    if (!("IntersectionObserver" in window)) {
      createMap();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        createMap();
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(mapElement);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeApp);
  } else {
    initHomeApp();
  }
})();
