// Controlli catalogo
function setZone(z) {
  state.zona = z;
  render();
}
// Alterna la serra riscaldata
function toggleHeated() {
  state.riscaldata = !state.riscaldata;
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
  const type = document.getElementById("catalogType");
  const sort = document.getElementById("catalogSort");
  const season = document.getElementById("catalogSeasonOnly");
  const allToggle = document.getElementById("catalogAllToggle");
  const easy = document.getElementById("catalogEasyOnly");
  if (search && search !== document.activeElement)
    search.value = catalog.search;
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
// Imposta catalog search
function setCatalogSearch(value) {
  catalog.search = value;
  render();
  updateCatalogSearchSuggestions();
}
// Nasconde catalog search suggestions
function hideCatalogSearchSuggestions() {
  const list = document.getElementById("catalogSearchSuggestions");
  const input = document.getElementById("catalogSearch");
  if (list) {
    list.hidden = true;
    list.innerHTML = "";
  }
  if (input) input.setAttribute("aria-expanded", "false");
}
// Seleziona catalog search suggestion
function selectCatalogSearchSuggestion(name) {
  catalog.search = name;
  const input = document.getElementById("catalogSearch");
  if (input) input.value = name;
  render();
  hideCatalogSearchSuggestions();
}
// Aggiorna catalog search suggestions
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
// Esegue l'escape HTML
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
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
// Pulisce catalog search
function clearCatalogSearch() {
  catalog.search = "";
  const input = document.getElementById("catalogSearch");
  if (input) {
    input.value = "";
    input.focus({ preventScroll: true });
  }
  render();
}
// Rimuove catalog filter
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
// Imposta catalog type
function setCatalogType(value) {
  catalog.type = value;
  render();
}
// Alterna catalog season only
function toggleCatalogSeasonOnly() {
  catalog.seasonOnly = !catalog.seasonOnly;
  render();
}
// Alterna catalog full
function toggleCatalogFull() {
  catalog.seasonOnly = false;
  render();
}
// Alterna catalog easy only
function toggleCatalogEasyOnly() {
  catalog.easyOnly = !catalog.easyOnly;
  render();
}
// Imposta catalog sort
function setCatalogSort(value) {
  catalog.sort = value || "season";
  render();
}
// Imposta catalog category
function setCatalogCategory(type) {
  catalog.type = type || "";
  render();
}
// Renderizza catalog category rail
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
      ) => `<button class="catalog-category-chip${catalog.type === cat.type ? " active" : ""}" type="button" onclick="setCatalogCategory('${cat.type}')" aria-pressed="${catalog.type === cat.type}">
    <span class="category-ico" aria-hidden="true">${cat.icon}</span>
    <span class="category-label">${cat.label}</span>
    <span class="category-count">${cat.count}</span>
  </button>`
    )
    .join("");
}
// Renderizza catalog insights
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
// Mostra full catalog
function showFullCatalog() {
  catalog.search = "";
  catalog.type = "";
  catalog.easyOnly = false;
  catalog.seasonOnly = false;
  catalog.sort = "season";
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
      mese: state.mese
    })
  );
}
// Carica prefs
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem("ois.prefs") || "{}");
    if (p.zona) state.zona = p.zona;
    if (p.riscaldata !== undefined) state.riscaldata = p.riscaldata;
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

// Normalizza lang
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
  const sel = document.getElementById("langSelect");
  if (sel) sel.value = lang;

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

  localStorage.setItem("ois.lang", lang);
  render();
  if (
    currentDetail &&
    document.getElementById("detailOverlay")?.classList.contains("open")
  ) {
    openDetail(currentDetail, true);
  }
}

// Imposta lang
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
    if (btn) btn.classList.toggle("visible", window.scrollY > 420);
  },
  { passive: true }
);

(async () => {
  try {
    const customPlants = await window.SerraAPI.getPlants();
    if (customPlants) {
      window.PLANTS = customPlants;
      customPlants.forEach((p) => {
        if (p.arch && window.TIPO) window.TIPO[p.id] = p.arch;
      });
    }
  } catch (e) {
    console.error("Errore nel caricamento del catalogo piante:", e);
  }

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
    render();
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
  }
  initCookieBanner();
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
    { p: PLANTS[0], x: 5, y: 5, w: 92, h: 68, cols: 2, rows: 2, r: 11 },
    { p: PLANTS[1], x: 5, y: 81, w: 92, h: 74, cols: 2, rows: 3, r: 9 },
    { p: PLANTS[2], x: 105, y: 5, w: 110, h: 50, cols: 3, rows: 2, r: 8 },
    { p: PLANTS[3], x: 105, y: 63, w: 110, h: 92, cols: 3, rows: 4, r: 7 }
  ];

  // Calcola le posizioni delle piante nell'aiuola
  function bedPlantPositions(bed) {
    const pts = [];
    for (let row = 0; row < bed.rows; row++) {
      for (let col = 0; col < bed.cols; col++) {
        pts.push({
          cx: bed.x + (bed.w / (bed.cols + 1)) * (col + 1),
          cy: bed.y + (bed.h / (bed.rows + 1)) * (row + 1)
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
  // Disegna l'icona di raccolta
  function harvestVector(plant, size) {
    const s = size,
      c = plant.col || {};
    const finish = (content) =>
      `<g style="pointer-events:none;filter:drop-shadow(0 ${s * 0.13}px ${s * 0.1}px rgba(18,28,15,.5))"><ellipse cy="${s * 0.34}" rx="${s * 0.36}" ry="${s * 0.11}" fill="#10190d" opacity=".32"/><g transform="translate(0 ${s * 0.075})" opacity=".48" style="filter:brightness(.42) saturate(1.15)">${content}</g><g>${content}</g><ellipse cx="${-s * 0.13}" cy="${-s * 0.16}" rx="${s * 0.052}" ry="${s * 0.11}" fill="#fff" opacity=".5"/><ellipse cx="${s * 0.12}" cy="${s * 0.17}" rx="${s * 0.11}" ry="${s * 0.055}" fill="#10190d" opacity=".18"/></g>`;
    if (plant.id === "carota")
      return finish(
        `<path d="M0 ${-s * 0.3} C${s * 0.3} ${-s * 0.23} ${s * 0.23} ${s * 0.2} 0 ${s * 0.48} C${-s * 0.23} ${s * 0.2} ${-s * 0.3} ${-s * 0.23} 0 ${-s * 0.3}Z" fill="url(#harvestOrange)" stroke="#854c35" stroke-width="${s * 0.045}"/><path d="M0 ${-s * 0.27} q${s * 0.08} ${-s * 0.2} ${s * 0.25} ${-s * 0.22} M0 ${-s * 0.27} q${-s * 0.08} ${-s * 0.2} ${-s * 0.25} ${-s * 0.22}" fill="none" stroke="#4b843f" stroke-width="${s * 0.1}" stroke-linecap="round"/>`
      );
    if (plant.id === "pomodoro")
      return finish(
        `<circle r="${s * 0.36}" fill="url(#harvestRed)" stroke="#893a31" stroke-width="${s * 0.05}"/><ellipse cx="${-s * 0.11}" cy="${-s * 0.12}" rx="${s * 0.07}" ry="${s * 0.12}" fill="#fff" opacity=".42"/><path d="M0 ${-s * 0.31} l${s * 0.2} ${-s * 0.1} l${-s * 0.16} ${s * 0.2} l${-s * 0.18} ${-s * 0.18}Z" fill="#356c35"/>`
      );
    return finish(
      `<g transform="rotate(-32)"><ellipse cy="${-s * 0.14}" rx="${s * 0.17}" ry="${s * 0.38}" fill="url(#harvestGreen)" stroke="#3d6f3a" stroke-width="${s * 0.045}"/></g><g transform="rotate(32)"><ellipse cy="${-s * 0.14}" rx="${s * 0.17}" ry="${s * 0.38}" fill="url(#harvestGreen)" stroke="#3d6f3a" stroke-width="${s * 0.045}"/></g>`
    );
  }
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
  // Genera la forma foglia palmata
  function _palmatePath(r) {
    let d = "M0 0 ";
    for (let k = -2; k <= 2; k++) {
      const a = k * 0.5,
        lx = Math.sin(a) * r,
        ly = -Math.cos(a) * r;
      d += `Q ${Math.sin(a - 0.2) * r * 0.6} ${-Math.cos(a - 0.2) * r * 0.6} ${lx} ${ly} Q ${Math.sin(a + 0.2) * r * 0.6} ${-Math.cos(a + 0.2) * r * 0.6} 0 0 `;
    }
    return d + "Z";
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
      <radialGradient id="harvestOrange" cx="30%" cy="22%" r="80%"><stop offset="0" stop-color="#ffd06c"/><stop offset=".32" stop-color="#ed8a35"/><stop offset=".74" stop-color="#bd5528"/><stop offset="1" stop-color="#74301f"/></radialGradient>`;
    BEDS.forEach((_, i) => {
      defs += `<linearGradient id="hbg${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="rgba(98,74,52,0.58)"/>
        <stop offset="65%"  stop-color="rgba(78,58,40,0.84)"/>
        <stop offset="100%" stop-color="rgba(58,43,28,0.94)"/>
      </linearGradient>`;
    });
    defs += `</defs>`;
    let s = "";

    s += `<rect x="100" y="5" width="5" height="150" rx="2" fill="rgba(210,200,180,0.18)"/>`;
    BEDS.forEach((b, i) => {
      s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="7"
              fill="url(#hbg${i})" stroke="rgba(255,255,255,0.17)" stroke-width="0.8"/>`;
    });
    svg.innerHTML = defs + s;
  }

  // Aggiunge una pianta alla mappa
  function addPlant(cx, cy, plant, r, seed) {
    const rng = makeRng(seed);
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.opacity = "0";
    g.style.transition =
      "opacity 0.4s ease, transform 0.48s cubic-bezier(0.34,1.56,0.64,1)";
    g.style.transformOrigin = "center";
    g.style.transform = `translate(${cx}px,${cy}px) scale(0)`;
    const label =
      r >= 9 && shouldShowHarvestVector(plant)
        ? `<text y="0" text-anchor="middle" dominant-baseline="central" font-size="${Math.max(r * 1.2, 8) * 0.8}" style="pointer-events:none;user-select:none;font-family:system-ui">${plant.emoji}</text>`
        : "";
    g.innerHTML = glyph(plant, r, rng) + label;
    svg.appendChild(g);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        g.style.opacity = "1";
        g.style.transform = `translate(${cx}px,${cy}px) scale(1)`;
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

    let delay = 180;
    BEDS.forEach((bed, bi) => {
      const pts = bedPlantPositions(bed);

      const step = bed.p.name === "Basilico" ? 140 : 260;
      pts.forEach((pt, pi) => {
        const d = delay;
        t(() => addPlant(pt.cx, pt.cy, bed.p, bed.r, bi * 100 + pi), d);
        delay += step;
      });
      delay += 100;
    });

    const panelIn = delay + 300;
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
          mese
        })
      );
    } catch {}
    return { w, l, path, zona, riscaldata, mese };
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
    el.textContent = `${w}×${l} m · cam. ${path} cm · ${zonaLabel}${heated ? " · " + heatedLabel : ""} · ${monthName}`;
  }

  // Allinea il selettore serra riscaldata
  function syncPcRiscSelect(heated) {
    const sel = document.getElementById("pcRisc");
    if (sel) sel.value = heated ? "si" : "no";
  }

  // Imposta la serra riscaldata
  function setPcHeated(active) {
    syncPcRiscSelect(active);
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
      "preconfig.climate_label": "2. Clima",
      "preconfig.zona_label": "Zona",
      "preconfig.serra_label": "Serra",
      "preconfig.serra_cold": "Fredda",
      "preconfig.serra_heated": "Riscaldata",
      "preconfig.month_label": "3. Mese di semina",
      "preconfig.cta": "Vai al configuratore",
      "hero.cfg_levels_title": "Che tipo di coltivatore sei?",
      "hero.cfg_novizio": "Principiante",
      "hero.cfg_nov_hint": "Orto pronto, guidato passo passo",
      "hero.cfg_intermedio": "Intermedio",
      "hero.cfg_int_hint": "Guidato, ma personalizzabile",
      "hero.cfg_esperto": "Esperto",
      "hero.cfg_exp_hint": "Catalogo completo, scelta libera",
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
        "Dimensiunile determină câte straturi și plante poți cultiva.",
      "preconfig.width": "Lățime",
      "preconfig.length": "Lungime",
      "preconfig.path_label": "Cărare între straturi",
      "preconfig.climate_label": "2. Climă",
      "preconfig.zona_label": "Zonă",
      "preconfig.serra_label": "Seră",
      "preconfig.serra_cold": "Rece",
      "preconfig.serra_heated": "Încălzită",
      "preconfig.month_label": "3. Luna de semănat",
      "preconfig.cta": "Mergi la configurator",
      "hero.cfg_levels_title": "Ce fel de cultivator ești?",
      "hero.cfg_novizio": "Începător",
      "hero.cfg_nov_hint": "Grădină gata, ghidat pas cu pas",
      "hero.cfg_intermedio": "Intermediar",
      "hero.cfg_int_hint": "Ghidat, dar personalizabil",
      "hero.cfg_esperto": "Expert",
      "hero.cfg_exp_hint": "Catalog complet, alegere liberă",
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
      cta.href = active.dataset.url;
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
    // Mostra sempre di default il mese corrente reale all'apertura della modale di preconfigurazione
    const mese = new Date().getMonth() + 1;

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

    const urlParams = new URL(targetUrl, location.href).searchParams;
    const livello = urlParams.get("livello");
    const personaSection = document.getElementById("preconfigPersonaSection");
    const hasLivello = Boolean(livello);

    if (personaSection) personaSection.hidden = hasLivello;

    document
      .querySelectorAll("#preconfigPersonaSection .pc-persona-card")
      .forEach((btn) => {
        const isActive = hasLivello ? btn.dataset.livello === livello : false;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

    const cta = document.getElementById("preconfigCta");
    if (cta && hasLivello) {
      cta.href = targetUrl;
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
    document.body.style.overflow = "hidden";
  }

  // Chiude la scheda pre-configurazione
  function closePreconfigSheet() {
    const overlay = document.getElementById("preconfigOverlay");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    const onEnd = () => {
      overlay.setAttribute("hidden", "");
      document.body.style.overflow = "";
    };
    overlay.addEventListener("transitionend", onEnd, { once: true });
  }

  function initHomeApp() {
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
      .getElementById("pcZona")
      ?.addEventListener("change", updatePreconfigSummary);
    document
      .getElementById("pcRisc")
      ?.addEventListener("change", updatePreconfigSummary);

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
      ?.addEventListener("click", function () {
        savePreconfigToStorage();
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

    if (document.getElementById("map") && typeof L !== "undefined") {
      try {
        const map = L.map("map", { scrollWheelZoom: false }).setView(
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
      } catch (err) {
        console.error("Errore nel caricamento della mappa Leaflet:", err);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeApp);
  } else {
    initHomeApp();
  }
})();
