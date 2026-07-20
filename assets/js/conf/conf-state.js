// Definisce lo stato condiviso della serra, del profilo e dell'interfaccia configuratore.
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

  livello: "intermedio",

  sudInBasso: false
};
const LIVELLI = new Set(["novizio", "intermedio", "esperto"]);
let vegFilter = "all";
let vegSearchQuery = "";
const CONFIG_KEY = "serra.config.v1";
const BOOT_PARAMS = new URLSearchParams(window.location.search);

// Normalizzazione del codice lingua.
function normalizeLang(lang) {
  return lang === "ro" || lang === "it" ? lang : "it";
}

// Legge la configurazione salvata nel localStorage
function readSavedConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
  } catch {
    return null;
  }
}

// Costruisce l'oggetto da salvare nel localStorage
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
      countLocked: Boolean(bed.countLocked),
      // I tappabuchi dipendono dalla colonna scelta dal motore: senza questo
      // dato un refresh può ricomporre le stesse quantità lasciando dei vuoti.
      col: Number.isInteger(bed.col) ? bed.col : undefined
    })),
    done
  };
}

// Persiste lo stato corrente nel localStorage
function saveConfig(done = true) {
  const payload = buildConfigPayload(done);
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(payload));
  } catch {}

  if (typeof syncActiveProjectConfig === "function") {
    syncActiveProjectConfig(payload);
  }
}

// Allinea tutti i selettori della lingua al valore memorizzato nello stato.
function syncLanguageControls() {
  const main = document.getElementById("inLang");
  const modal = document.getElementById("startLang");
  const nav = document.getElementById("navLang");
  if (main) main.value = state.lang;
  if (modal) modal.value = state.lang;
  if (nav) nav.value = state.lang;
}

// Allinea i controlli clima al valore dello stato
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

// Allinea gli input di dimensione al valore dello stato
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

// Mostra o nasconde la modale di configurazione iniziale
function setStartModalVisible(visible) {
  const modal = document.getElementById("startModal");
  if (modal) modal.style.display = visible ? "flex" : "none";
}

// Legge il preset richiesto dai parametri URL
function requestedBootPreset() {
  const preset = BOOT_PARAMS.get("preset") || "";
  return PRESETS[preset] ? preset : "";
}

// Verifica se il boot prevede importazione carrello
function shouldImportCart() {
  return BOOT_PARAMS.get("import") === "cart";
}

// Verifica se il boot è in modalità guidata
function isGuidedBoot() {
  return (
    BOOT_PARAMS.get("guided") === "1" ||
    requestedBootPreset() === "principiante"
  );
}

// Verifica se il boot è per un progetto vuoto libero
function isFreeProjectBoot() {
  return (
    BOOT_PARAMS.get("mode") === "expert" &&
    (BOOT_PARAMS.get("empty") === "1" || BOOT_PARAMS.get("free") === "1")
  );
}

// Rimuove i parametri di boot dall'URL
function clearBootParams() {
  if (!window.history?.replaceState) return;
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + window.location.hash
  );
}

// Aggiorna la pillola mese/zona nell'intro guidata
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
  updateJourneyContext();
}

// Determina la sezione iniziale da mostrare in base al profilo scelto.
function updateJourneyContext() {
  const root = document.getElementById("journeyContext");
  const level = document.getElementById("journeyContextLevel");
  const title = document.getElementById("journeyContextTitle");
  const desc = document.getElementById("journeyContextDesc");
  if (!root || !level || !title || !desc) return;
  const ro = state.lang === "ro";
  const content =
    {
      novizio: ro
        ? {
            level: "Traseu Începător",
            title: "Grădina ta este deja pregătită",
            desc: "Verifică planul de sus; când ești gata, mergi la lista de semințe.",
            steps: ["1 · Verifică alegerile", "2 · Verifică", "3 · Cumpără"]
          }
        : {
            level: "Percorso Principiante",
            title: "Il tuo orto è già pronto",
            desc: "Controlla il piano dall'alto; quando sei pronto, passa alla lista dei semi.",
            steps: ["1 · Ricontrolla scelta", "2 · Controlla", "3 · Acquista"]
          },
      intermedio: ro
        ? {
            level: "Traseu Intermediar",
            title: "Planul este gata: acum fă-l al tău",
            desc: "Sera rămâne în centru; modifică plantele și cantitățile.",
            steps: ["1 · Verifică alegerile", "2 · Proiectează", "3 · Cumpără"]
          }
        : {
            level: "Percorso Intermedio",
            title: "Il piano è pronto: ora fallo tuo",
            desc: "La serra resta al centro; modifica colture e quantità quando vuoi.",
            steps: ["1 · Ricontrolla scelta", "2 · Progetta", "3 · Acquista"]
          },
      esperto: ro
        ? {
            level: "Traseu Expert",
            title: "Sera este goală: compune-o liber",
            desc: "Alege din catalogul complet și așază culturile manual.",
            steps: ["1 · Verifică alegerile", "2 · Compune", "3 · Cumpără"]
          }
        : {
            level: "Percorso Esperto",
            title: "La serra è vuota: componila liberamente",
            desc: "Scegli dal catalogo completo e disponi le colture a mano.",
            steps: ["1 · Ricontrolla scelta", "2 · Componi", "3 · Acquista"]
          }
    }[state.livello] || null;
  if (!content) return;
  root.classList.remove(
    "journey-context--novizio",
    "journey-context--intermedio",
    "journey-context--esperto"
  );
  root.classList.add(`journey-context--${state.livello}`);
  level.textContent = content.level;
  title.textContent = content.title;
  desc.textContent = content.desc;
  root.querySelectorAll(".journey-context-step").forEach((step, i) => {
    step.textContent = content.steps[i] || "";
  });
}

// Aggiorna il riepilogo compatto del selettore profilo
function syncPersonaPickerSummary() {
  const active = document.querySelector(".persona-card.is-active");
  const name = document.getElementById("personaCurrentName");
  const desc = document.getElementById("personaCurrentDesc");
  if (!active || !name || !desc) return;
  const activeTitle = active.querySelector(".persona-card-body b");
  const activeLevel = active.querySelector(".persona-level-label");
  const activeDesc = active.querySelector(".persona-card-body small");
  const levelText = (activeLevel?.textContent || "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const titleText = (activeTitle?.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
  name.textContent = levelText || titleText;
  desc.textContent = (activeDesc?.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
}

// Allinea il selettore profilo: chiuso di default su ogni viewport
function syncPersonaPickerDisclosure() {
  const picker = document.getElementById("personaPickDetails");
  if (!picker) return;
  picker.open = false;
  const panel = document.getElementById("guidedIntro");
  const trigger = document.getElementById("personaPickerTrigger");
  if (panel) panel.hidden = true;
  if (trigger) {
    trigger.setAttribute("aria-expanded", "false");
    trigger.classList.remove("is-open");
  }
}

// Applica le regole di interfaccia specifiche per ciascun livello di esperienza.
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
  if (yieldPanel) setPanelCollapsed(yieldPanel, true);
  const fillBtn = document.querySelector(".crops-fill-main-btn");
  if (fillBtn) fillBtn.hidden = next === "expert";

  if (scroll) {
    const guidedIntro = document.getElementById("guidedIntro");
    if (typeof scrollElementBelowHeader === "function") {
      scrollElementBelowHeader(guidedIntro, "smooth");
    } else {
      guidedIntro?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
}

// Applicazione del profilo utente all'interfaccia.
function setLivello(liv, { mapMode = true } = {}) {
  const next = LIVELLI.has(liv) ? liv : "intermedio";
  state.livello = next;
  document.body.classList.toggle("livello-novizio", next === "novizio");
  document.body.classList.toggle("livello-intermedio", next === "intermedio");
  document.body.classList.toggle("livello-esperto", next === "esperto");
  updateVegSearchUI();
  syncCustomizePanelForLivello();
  document.querySelectorAll(".persona-card").forEach((card) => {
    const on = card.dataset.livello === next;
    card.classList.toggle("is-active", on);
    card.setAttribute("aria-selected", String(on));
  });
  syncPersonaPickerSummary();
  updateJourneyContext();
  if (mapMode) setMode(next === "esperto" ? "expert" : "fit", false);
  if (typeof syncQuickGuide === "function") syncQuickGuide();
  if (typeof syncColLeftLayout === "function") syncColLeftLayout();
}

// Cambia il livello utente con conferma se necessario
function chooseLivello(liv) {
  const prev = state.livello;
  // Riporta all'inizio dopo il cambio di profilo.
  const returnToConfiguratorStart = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  };

  // Richiede conferma prima di sostituire il piano esistente.
  if (
    liv === "novizio" &&
    prev !== "novizio" &&
    state.beds.length > 0 &&
    !confirm(tx("confirmNoviceReset"))
  ) {
    return;
  }
  setLivello(liv);

  if (typeof resetHistory === "function") resetHistory();
  if (liv === "esperto") {
    vegFilter = "all-beds";
    state.autoPlan = false;
    syncVegFilterTabs();
    render();
    setPanelCollapsed("panelSettings", true);
    openCustomizePanelAndFocus({ scroll: false });
  } else if (liv === "intermedio") {
    vegFilter = "all";
    const keepsExpertPlan = prev === "esperto" && state.beds.length > 0;
    state.autoPlan = !keepsExpertPlan;
    state.manualPlanNotice = keepsExpertPlan
      ? "manualPlanKeptIntermediate"
      : "";
    if (!state.beds.length) autoFill();
    else render();
    syncVegFilterTabs();
    // Apriamo comunque le colture, senza cambiare la posizione dell'utente.
    openCustomizePanelAndFocus({ scroll: false });
  } else {
    vegFilter = "in";
    state.autoPlan = true;
    resetNoviceAdvancedOptions();
    autoFill({ compactPaths: false });
    syncVegFilterTabs();
    collapseSettingsPanelAfterAutoPlan({ scroll: false });
    setCustomizePanelCollapsed(true);
  }
  saveConfig(true);
  if (prev !== liv) updateGuidedIntroDynamic();
  const picker = document.getElementById("personaPickDetails");
  if (picker) picker.open = false;
  const pickerPanel = document.getElementById("guidedIntro");
  const pickerTrigger = document.getElementById("personaPickerTrigger");
  if (pickerPanel) pickerPanel.hidden = true;
  if (pickerTrigger) {
    pickerTrigger.setAttribute("aria-expanded", "false");
    pickerTrigger.classList.remove("is-open");
  }
  returnToConfiguratorStart();
}

// Allinea le tab filtro colture al filtro attivo
function syncVegFilterTabs() {
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === vegFilter);
  });
}

// Azzera le opzioni avanzate non disponibili al novizio
function resetNoviceAdvancedOptions() {
  state.overlay = "";
  syncSizeControls();
  syncOverlaySelectLabel();
}

// Normalizza il testo per la ricerca (lowercase, senza accenti)
function normalizeVegSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Aggiorna visibilità e testo del campo ricerca colture
function updateVegSearchUI() {
  const wrap = document.getElementById("vegSearchWrap");
  const input = document.getElementById("vegSearchInput");
  const clear = document.getElementById("vegSearchClear");
  const visible = state.livello === "intermedio" || state.livello === "esperto";
  if (wrap) wrap.hidden = !visible;
  if (!visible) vegSearchQuery = "";
  if (input) {
    input.value = vegSearchQuery;
    input.placeholder = tx("vegSearchPlaceholder");
  }
  const label = document.querySelector('label[for="vegSearchInput"]');
  if (label) {
    label.textContent = tx("vegSearchLabel");
    document.documentElement.style.setProperty(
      "--veg-search-badge",
      tx("vegSearchBadge")
    );
  }
  if (clear) {
    clear.hidden = !vegSearchQuery;
    clear.title = tx("vegSearchClear");
    clear.setAttribute("aria-label", clear.title);
  }
}

// Scrolla fino alla scena della serra
function scrollToLivelloLanding(livello = state.livello, options = {}) {
  const { behavior = "smooth", delay = 120, waitForFonts = true } = options;
  const resolveTarget = () => {
    // Mostra i layout pronti come punto di ingresso esperto.
    if (livello === "esperto") {
      return (
        document.getElementById("presetBar") ||
        document.getElementById("panelCustomize") ||
        document.getElementById("journeyContext") ||
        document.querySelector(".stage")
      );
    }
    if (livello === "intermedio") {
      return (
        document.getElementById("presetBar") ||
        document.getElementById("journeyContext") ||
        document.querySelector(".stage")
      );
    }
    return (
      document.getElementById("journeyContext") ||
      document.querySelector(".stage")
    );
  };
  if (typeof scheduleElementBelowHeader === "function") {
    scheduleElementBelowHeader(resolveTarget, behavior, {
      delay,
      waitForFonts
    });
    return;
  }
  window.setTimeout(() => {
    const target = resolveTarget();
    if (!target) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h") ||
        "66",
      10
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior });
  }, delay);
}

// Mantiene la compatibilità delle azioni che usano la destinazione contestuale.
function scrollToScene() {
  scrollToLivelloLanding(state.livello);
}
