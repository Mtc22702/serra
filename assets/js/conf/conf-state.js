/* =========================================================================
   SEZIONE 04 — Stato globale, salvataggio e controlli di base
   -------------------------------------------------------------------------
   Stato applicativo unico del configuratore, persistenza in localStorage e
   funzioni che tengono allineati input, slider, clima e lingua.
   ========================================================================= */
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
  // Livello/persona dell'utente: "novizio" | "intermedio" | "esperto".
  // Guida quanta UI mostrare e quanto automatizzare il flusso.
  livello: "intermedio",
  // Orientamento al sole: false = lato piu soleggiato (sud) in alto nella mappa
  // (default), true = sud in basso. Determina da che parte vanno le piante alte
  // per non fare ombra a quelle basse (anti-ombra).
  sudInBasso: false
};
const LIVELLI = new Set(["novizio", "intermedio", "esperto"]);
let vegFilter = "all";
let vegSearchQuery = "";
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

// Costruisce l'oggetto di configurazione corrente (stessa forma storica).
// Estratto da saveConfig per poterlo riusare nel layer multi-progetto.
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
      countLocked: Boolean(bed.countLocked)
    })),
    done
  };
}

function saveConfig(done = true) {
  const payload = buildConfigPayload(done);
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(payload));
  } catch {
    // localStorage puo non essere disponibile in alcuni contesti incorporati.
  }
  // Mantiene allineato il progetto attivo del layer multi-progetto
  // (conf-projects.js, caricato dopo questo file: chiamata a runtime).
  if (typeof syncActiveProjectConfig === "function") {
    syncActiveProjectConfig(payload);
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
    const showGuidedCustomize =
      next === "fit" &&
      (state.livello === "novizio" || state.livello === "intermedio") &&
      sectionMode === "expert";
    section.classList.toggle(
      "is-active",
      sectionMode === next ||
        showGuidedCustomize ||
        (next === "expert" && sectionMode === "fit")
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

/* =========================================================================
   SEZIONE 05 — Profili utente, modalità e percorso guidato
   -------------------------------------------------------------------------
   Gestisce i tre profili visibili all'utente: Principiante, Pratico, Esperto.
   Il valore interno resta "novizio" | "intermedio" | "esperto" per non
   rompere salvataggi, URL e logiche gia esistenti.

   "novizio" e "intermedio" usano la modalità guidata (fit); "esperto" la
   modalità manuale (expert). La differenza tra novizio e intermedio è quanta
   UI avanzata viene mostrata (gestita via classi sul body in CSS).
   ========================================================================= */
function setLivello(liv, { mapMode = true } = {}) {
  const next = LIVELLI.has(liv) ? liv : "intermedio";
  state.livello = next;
  document.body.classList.toggle("livello-novizio", next === "novizio");
  document.body.classList.toggle("livello-intermedio", next === "intermedio");
  document.body.classList.toggle("livello-esperto", next === "esperto");
  updateVegSearchUI();
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
  // Passare a Principiante rigenera l'orto in automatico: se c'è un piano costruito
  // a mano (non automatico) chiedi conferma per non cancellarlo per sbaglio.
  if (
    liv === "novizio" &&
    prev !== "novizio" &&
    !state.autoPlan &&
    state.beds.length > 0 &&
    !confirm(tx("confirmNoviceReset"))
  ) {
    return;
  }
  setLivello(liv);
  // Cambiare profilo riconfigura il flusso: azzera la cronologia undo.
  if (typeof resetHistory === "function") resetHistory();
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
    resetNoviceAdvancedOptions();
    autoFill();
    syncVegFilterTabs();
    if (isResponsiveConfiguratorLayout()) collapseSettingsPanelAfterAutoPlan();
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

function resetNoviceAdvancedOptions() {
  state.overlay = "";
  syncSizeControls();
  syncOverlaySelectLabel();
}

function normalizeVegSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function updateVegSearchUI() {
  const wrap = document.getElementById("vegSearchWrap");
  const input = document.getElementById("vegSearchInput");
  const clear = document.getElementById("vegSearchClear");
  const visible = state.livello === "intermedio" || state.livello === "esperto";
  if (wrap) wrap.hidden = !visible;
  if (!visible) vegSearchQuery = "";
  if (input) {
    input.value = vegSearchQuery;
    input.placeholder =
      state.lang === "ro" ? "Cauta o planta..." : "Cerca una pianta...";
  }
  const label = document.querySelector('label[for="vegSearchInput"]');
  if (label) {
    label.textContent = state.lang === "ro" ? "Cauta cultura" : "Cerca coltura";
    document.documentElement.style.setProperty(
      "--veg-search-badge",
      state.lang === "ro" ? '"Cauta aici"' : '"Cerca qui"'
    );
  }
  if (clear) {
    clear.hidden = !vegSearchQuery;
    clear.title = state.lang === "ro" ? "Sterge cautarea" : "Cancella ricerca";
    clear.setAttribute("aria-label", clear.title);
  }
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
