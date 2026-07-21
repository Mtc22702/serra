// Popola i selettori dei mesi con etichette localizzate e valore corrente.
function bindConfigStaticActions() {
  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-conf-action]");
    if (!control) return;

    switch (control.dataset.confAction) {
      case "set-language":
        // Il menu nativo dell'header deve cambiare solo a selezione conclusa:
        // un render al primo tap chiuderebbe la tendina su Safari iOS.
        if (control.tagName !== "SELECT") confSetLang(control.dataset.lang);
        break;
      case "open-cart":
        openConfCart();
        break;
      case "open-projects":
        openProjectsModal();
        break;
      case "open-calendar":
        openCalendarModal();
        break;
      case "scroll-greenhouse":
        scrollGreenhouseImageIntoView("smooth");
        break;
      case "close-projects":
        closeProjectsModal();
        break;
      case "create-project":
        createProject();
        break;
      case "close-calendar":
        closeCalendarModal();
        break;
      case "set-calendar-view":
        setCalendarView(control.dataset.view);
        break;
      case "close-cart":
        closeConfCart();
        break;
      case "clear-cart":
        clearConfCart();
        break;
      case "import-cart":
        importCartAndClose();
        break;
      case "checkout":
        alertConfCheckout();
        break;
      case "remove-from-cart":
        removeFromConfCart(control.dataset.plantId);
        break;
      case "unselect-material":
        unselectMaterial(control.dataset.materialId);
        break;
      case "switch-project":
        switchToProject(control.dataset.projectId);
        break;
      case "rename-project":
        renameProject(control.dataset.projectId);
        break;
      case "duplicate-project":
        duplicateProject(control.dataset.projectId);
        break;
      case "delete-project":
        deleteProject(control.dataset.projectId);
        break;
      case "set-calendar-month":
        setCalendarMonth(Number(control.dataset.month));
        break;
      case "set-detail-tab":
        setConfigDetailTab(control.dataset.detailTab);
        break;
    }
  });
  document.addEventListener("change", (event) => {
    const control = event.target.closest("[data-conf-action]");
    if (!control) return;
    if (control.dataset.confAction === "set-language")
      confSetLang(control.value);
    if (control.dataset.confAction === "set-calendar-category")
      setCalendarCategory(control.value);
  });
  document.addEventListener("input", (event) => {
    const control = event.target.closest(
      '[data-conf-action="set-calendar-search"]'
    );
    if (control) setCalendarSearch(control.value);
  });
  document.addEventListener("keydown", (event) => {
    const control = event.target.closest('[data-conf-action="set-detail-tab"]');
    if (control) handleConfigDetailTabKey(event, control);
  });
}

bindConfigStaticActions();

function fillMonths() {
  const months = MONTHS[state.lang] || MONTHS.it;
  const monthHtml = months
    .map((m, i) => `<option value="${i + 1}">${m}</option>`)
    .join("");
  const sel = document.getElementById("inMese");
  sel.innerHTML = monthHtml;
  sel.value = state.mese;
  const selStage = document.getElementById("inMeseStage");
  if (selStage) {
    selStage.innerHTML = monthHtml;
    selStage.value = state.mese;
  }
  const pillLabel = document.getElementById("stageMonthPillLabel");
  if (pillLabel) pillLabel.textContent = months[state.mese - 1] || "";
}

// Registra gli eventi statici dell'interfaccia del configuratore.
function initEvents() {
  const backToTopButton = document.getElementById("backToTop");
  backToTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener(
    "scroll",
    () => backToTopButton?.classList.toggle("visible", window.scrollY > 420),
    { passive: true }
  );

  syncPersonaPickerDisclosure();

  document.querySelectorAll(".mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode, false));
  });
  document.querySelectorAll(".persona-card").forEach((card) => {
    card.addEventListener("click", () => chooseLivello(card.dataset.livello));
  });
  document.getElementById("inLang").addEventListener("change", (e) => {
    state.lang = e.target.value;
    localStorage.setItem("ois.lang", e.target.value);
    applyLanguage();
    saveConfig(true);
    render();
  });
  document.getElementById("startLang")?.addEventListener("change", (e) => {
    state.lang = e.target.value;
    localStorage.setItem("ois.lang", e.target.value);
    applyLanguage();
    saveConfig(false);
    render();
  });
  document.getElementById("inW").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.larghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inL").addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.lunghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inWSlider")?.addEventListener("input", (e) => {
    state.larghezza = parseFloat(e.target.value);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("inLSlider")?.addEventListener("input", (e) => {
    state.lunghezza = parseFloat(e.target.value);
    syncSizeControls();
    refreshAutoPlanForGeometry(true);
  });
  document.getElementById("startW")?.addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.larghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    saveConfig(false);
    autoBalanceLayout(true, true);
    render();
  });
  document.getElementById("startL")?.addEventListener("input", (e) => {
    if (e.target.value === "") return;
    state.lunghezza = Math.max(1, parseFloat(e.target.value) || 1);
    syncSizeControls();
    saveConfig(false);
    autoBalanceLayout(true, true);
    render();
  });
  document.getElementById("inMese").addEventListener("change", (e) => {
    state.mese = parseInt(e.target.value);
    const selStage = document.getElementById("inMeseStage");
    if (selStage) selStage.value = e.target.value;
    const pillLabel = document.getElementById("stageMonthPillLabel");
    if (pillLabel)
      pillLabel.textContent =
        (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inMeseStage")?.addEventListener("change", (e) => {
    state.mese = parseInt(e.target.value);
    document.getElementById("inMese").value = e.target.value;
    const pillLabel = document.getElementById("stageMonthPillLabel");
    if (pillLabel)
      pillLabel.textContent =
        (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inZona").addEventListener("change", (e) => {
    state.zona = e.target.value;
    syncClimateControls();
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inRisc").addEventListener("change", (e) => {
    state.riscaldata = e.target.value === "si";
    syncClimateControls();
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inSole")?.addEventListener("change", (e) => {
    state.sudInBasso = e.target.value === "basso";
    resetHistory();
    syncClimateControls();
    saveConfig(true);
    if (state.autoPlan || state.livello === "novizio") {
      autoFill({ compactPaths: false });
    } else {
      clearColumnAssignment();
      autoBalanceLayout(true, false);
      commitColumnAssignment();
      render();
    }
  });
  document.getElementById("inOverlay").addEventListener("change", (e) => {
    state.overlay = e.target.value;
    syncOverlaySelectLabel();
    render();
  });
  document.getElementById("inPreset").addEventListener("change", (e) => {
    if (e.target.value) {
      if (loadPreset(e.target.value)) setMode("fit", false);
      e.target.value = "";
    }
  });
  // Applica il percorso selezionato aggiornando profilo, pannelli e contenuto.
  function applyPath(val) {
    const v = Math.max(30, Math.min(120, Math.round(val / 5) * 5));
    state.path = v;
    syncSizeControls();
    refreshAutoPlanForGeometry(false);
  }
  document
    .getElementById("inPath")
    .addEventListener("input", (e) => applyPath(parseInt(e.target.value)));
  document
    .getElementById("inPathNum")
    .addEventListener("change", (e) =>
      applyPath(parseInt(e.target.value) || state.path)
    );
  document.getElementById("btnRipristina").addEventListener("click", () => {
    recordHistory();
    saveConfig(true);
    setMode("fit", false);
    autoFill({ compactPaths: false });
    collapseSettingsPanelAfterAutoPlan();
  });
  document
    .getElementById("btnPresetSeasonal")
    ?.addEventListener("click", () => {
      recordHistory();
      saveConfig(true);
      setMode("fit", false);
      autoFill({ compactPaths: false });
    });
  document
    .getElementById("btnArrangeSelected")
    .addEventListener("click", arrangeSelectedPlantsExact);
  document
    .getElementById("btnFillSelected")
    .addEventListener("click", fillSelectedPlants);
  document.getElementById("btnUndo")?.addEventListener("click", undoLastChange);
  document.getElementById("btnRedo")?.addEventListener("click", redoLastChange);

  document.getElementById("btnNoviceRestart")?.addEventListener("click", () => {
    recordHistory();
    autoFill({ compactPaths: false });
    scrollToScene();
  });

  document
    .getElementById("btnExpertSeasonal")
    ?.addEventListener("click", () => {
      recordHistory();
      autoFill({ compactPaths: false });
    });

  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const tag = (e.target?.tagName || "").toLowerCase();
    const isField = tag === "input" || tag === "textarea" || tag === "select";
    const key = e.key.toLowerCase();
    if (key === "z" && !e.shiftKey) {
      if (isField) return;
      e.preventDefault();
      undoLastChange();
    } else if ((key === "z" && e.shiftKey) || key === "y") {
      if (isField) return;
      e.preventDefault();
      redoLastChange();
    }
  });
  document.getElementById("btnClear").addEventListener("click", () => {
    if (state.livello === "novizio") return;
    const msg =
      state.lang === "ro"
        ? "Golești sera? Folosește «Regenerează planul de sezon» pentru a o reface."
        : "Svuoti la serra? Usa «Rigenera piano di stagione» per riportarla com'era.";
    if (!confirm(msg)) return;
    recordHistory();
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    saveConfig(true);
    render();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".step-btn");
    if (!btn) return;
    const targetId = btn.dataset.target;
    const step = parseFloat(btn.dataset.step);
    const input = document.getElementById(targetId);
    if (!input) return;
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const raw = (parseFloat(input.value) || 0) + step;
    const clamped = Math.max(
      isNaN(min) ? -Infinity : min,
      Math.min(isNaN(max) ? Infinity : max, raw)
    );
    input.value = Math.round(clamped * 100) / 100;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  const guidedNovCta = document.getElementById("guidedNovCta");
  if (guidedNovCta) {
    guidedNovCta.addEventListener("click", () => {
      openSettingsPanelAndFocusDimensions();
    });
  }

  document.querySelectorAll(".panel-toggle").forEach((btn) => {
    updatePanelToggle(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const panel = btn.closest(".panel");
      setPanelCollapsed(panel, !panel.classList.contains("is-collapsed"));
    });
  });

  document.querySelectorAll(".panel-title-row, .panel-head").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("button, select, input, label, .stepper")) return;
      const panel = row.closest(".panel");
      const btn = panel.querySelector(".panel-toggle");
      if (btn) btn.click();
    });
  });

  ["btnStampa", "btnStampaMobile"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", (event) => {
      event.stopPropagation();
      openProjectExportMenu(event.currentTarget);
    });
  });
  document
    .getElementById("projectExportMenu")
    ?.addEventListener("click", async (event) => {
      event.stopPropagation();
      const action = event.target.closest("[data-export-action]")?.dataset
        .exportAction;
      if (!action) return;
      closeProjectExportMenu();
      if (action === "pdf") {
        await exportProjectPdf();
      } else if (action === "print") {
        renderPrintSummary();
        window.print();
      } else if (action === "png") {
        await exportProjectPng();
      }
    });
  document.addEventListener("click", () => closeProjectExportMenu());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectExportMenu({ restoreFocus: true });
  });
  window.addEventListener("resize", () => closeProjectExportMenu());
  window.addEventListener("scroll", () => closeProjectExportMenu(), {
    passive: true
  });
  document.getElementById("pdpBackBtn")?.addEventListener("click", () => {
    closePlantDetailPanel();
  });
  document.getElementById("btnOpenSetup")?.addEventListener("click", () => {
    syncLanguageControls();
    syncClimateControls();
    syncSizeControls();
    setStartModalVisible(true);
  });
  document
    .getElementById("btnEditCropsFromYield")
    ?.addEventListener("click", () => {
      setMode("expert", false);
      openCustomizePanelAndFocus();
    });

  document.getElementById("vegList").addEventListener("click", (e) => {
    const upgradeBtn = e.target.closest("[data-upgrade-level]");
    if (upgradeBtn) {
      chooseLivello(upgradeBtn.dataset.upgradeLevel);
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) addPlant(addBtn.dataset.add);
    const removeBtn = e.target.closest("[data-remove-plant]");
    if (removeBtn) removePlantById(removeBtn.dataset.removePlant);
    const stepBtn = e.target.closest("[data-veg-cnt]");
    if (stepBtn) {
      const id = stepBtn.dataset.vegPlant;
      const delta = parseInt(stepBtn.dataset.vegCnt);
      changePlantCount(id, delta);
    }
  });
  document.getElementById("vegList").addEventListener("change", (e) => {
    const input = e.target.closest("[data-veg-count-input]");
    if (!input || input.value === "") return;
    setPlantCount(input.dataset.vegCountInput, input.value);
  });
  document.getElementById("vegList").addEventListener("keydown", (e) => {
    const input = e.target.closest("[data-veg-count-input]");
    if (!input || e.key !== "Enter" || input.value === "") return;
    e.preventDefault();
    setPlantCount(input.dataset.vegCountInput, input.value);
  });

  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      vegFilter = tab.dataset.filter;
      renderVegList();
    });
  });

  document.getElementById("vegSearchInput")?.addEventListener("input", (e) => {
    vegSearchQuery = e.target.value || "";
    renderVegList();
  });
  document.getElementById("vegSearchClear")?.addEventListener("click", () => {
    vegSearchQuery = "";
    const input = document.getElementById("vegSearchInput");
    if (input) {
      input.value = "";
      input.focus({ preventScroll: true });
    }
    renderVegList();
  });
  document
    .getElementById("vegList")
    ?.addEventListener("scroll", updateVegListScrollAffordance, {
      passive: true
    });
  // Gestisce debounce
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  window.addEventListener(
    "resize",
    debounce(updateVegListScrollAffordance, 150)
  );

  document.querySelectorAll("#zoneOpts .opt").forEach((o) =>
    o.addEventListener("click", () => {
      document
        .querySelectorAll("#zoneOpts .opt")
        .forEach((x) => x.classList.remove("on"));
      o.classList.add("on");
      state.zona = o.dataset.zone;
      syncClimateControls();
    })
  );
  document.getElementById("startBtn")?.addEventListener("click", () => {
    state.zona =
      document.querySelector("#zoneOpts .opt.on")?.dataset.zone ?? state.zona;
    state.riscaldata =
      document.getElementById("heatedChk")?.checked ?? state.riscaldata;
    state.larghezza = Math.max(
      1,
      parseFloat(document.getElementById("startW")?.value) || state.larghezza
    );
    state.lunghezza = Math.max(
      1,
      parseFloat(document.getElementById("startL")?.value) || state.lunghezza
    );
    syncSizeControls();
    syncClimateControls();
    saveConfig(true);
    setStartModalVisible(false);
    if (!applyBootIntent()) autoFill();
  });
}

// Carica e normalizza lo stato salvato prima del primo rendering.
function applyConfigToState(saved) {
  if (!saved) return;
  if (saved.lang === "it" || saved.lang === "ro") state.lang = saved.lang;
  if (["freddo", "temperato", "caldo"].includes(saved.zona)) {
    state.zona = saved.zona;
  }
  state.riscaldata = Boolean(saved.riscaldata);
  state.sudInBasso = Boolean(saved.sudInBasso);
  const savedW = parseFloat(saved.larghezza);
  const savedL = parseFloat(saved.lunghezza);
  if (Number.isFinite(savedW) && savedW >= 1) state.larghezza = savedW;
  if (Number.isFinite(savedL) && savedL >= 1) state.lunghezza = savedL;
  const savedPath = parseFloat(saved.path);
  if (Number.isFinite(savedPath) && savedPath >= 30) state.path = savedPath;
  const savedMonth = parseInt(saved.mese);
  if (Number.isInteger(savedMonth) && savedMonth >= 1 && savedMonth <= 12) {
    state.mese = savedMonth;
  }
  state.autoPlan = saved.autoPlan !== false;
  state.activePreset = PRESETS[saved.activePreset] ? saved.activePreset : "";
  if (LIVELLI.has(saved.livello)) state.livello = saved.livello;
  state.beds = normalizeSavedBeds(saved.beds);

  // Riproduce esattamente il piano salvato, comprese le colonne assegnate ai
  // riempitori. Ribilancia soltanto salvataggi obsoleti o non più compatibili
  // con la geometria corrente.
  if (computeLayout().overflow) {
    clearColumnAssignment();
    autoBalanceLayout(true, false);
  } else {
    commitColumnAssignment();
  }

  if (typeof resetHistory === "function") resetHistory();
}

// Avvia catalogo, interfaccia e comportamenti necessari al configuratore.
function initConfig() {
  if (typeof ensureProjectsStore === "function") ensureProjectsStore();
  const saved = readSavedConfig();
  const sharedLang = localStorage.getItem("ois.lang");
  const hasSharedLang = sharedLang === "it" || sharedLang === "ro";
  if (saved) applyConfigToState(saved);
  if (typeof rememberAcceptedGeometry === "function") {
    rememberAcceptedGeometry();
  }
  if (hasSharedLang) state.lang = sharedLang;
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  if (saved && hasSharedLang && saved.lang !== state.lang)
    saveConfig(Boolean(saved.done));

  setStartModalVisible(
    !saved?.done &&
      !isGuidedBoot() &&
      !isFreeProjectBoot() &&
      !shouldImportCart()
  );
}

// Gestisce i dati condivisi tra lista dei semi e carrello dell'ordine.
const PACK_DATA = {
  pomodoro: { seeds: 20, price: 3.5 },
  peperone: { seeds: 15, price: 3.2 },
  peperoncino: { seeds: 15, price: 3.2 },
  melanzana: { seeds: 20, price: 3.5 },
  zucchina: { seeds: 10, price: 3.8 },
  zucca: { seeds: 8, price: 3.8 },
  cetriolo: { seeds: 15, price: 3.2 },
  melone: { seeds: 12, price: 3.5 },
  anguria: { seeds: 10, price: 3.8 },
  lattuga: { seeds: 400, price: 2.4 },
  radicchio: { seeds: 300, price: 2.5 },
  rucola: { seeds: 500, price: 2.2 },
  spinaci: { seeds: 200, price: 2.4 },
  bietola: { seeds: 150, price: 2.6 },
  cavolo: { seeds: 100, price: 2.8 },
  verza: { seeds: 100, price: 2.8 },
  broccolo: { seeds: 100, price: 2.8 },
  cavolfiore: { seeds: 100, price: 2.8 },
  cavolonero: { seeds: 100, price: 2.8 },
  cavolorapa: { seeds: 100, price: 2.8 },
  carota: { seeds: 300, price: 2.3 },
  finocchio: { seeds: 200, price: 2.5 },
  prezzemolo: { seeds: 200, price: 2.6 },
  basilico: { seeds: 300, price: 2.6 },
  coriandolo: { seeds: 200, price: 2.6 },
  aneto: { seeds: 200, price: 2.6 },
  cipolla: { seeds: 200, price: 2.3 },
  aglio: { seeds: 50, price: 3.0 },
  porro: { seeds: 200, price: 2.4 },
  scalogno: { seeds: 100, price: 2.8 },
  fagiolino: { seeds: 40, price: 2.8 },
  fagiolo: { seeds: 30, price: 3.0 },
  pisello: { seeds: 50, price: 2.8 },
  fragola: { seeds: 100, price: 3.2 },
  sedano: { seeds: 300, price: 2.6 },
  ravanello: { seeds: 300, price: 2.2 },
  barbabietola: { seeds: 100, price: 2.4 },
  cicoria: { seeds: 300, price: 2.4 },
  indivia: { seeds: 300, price: 2.5 },
  pakchoi: { seeds: 200, price: 2.6 },
  cavoletti: { seeds: 100, price: 2.8 },
  rapa: { seeds: 200, price: 2.3 },
  valerianella: { seeds: 300, price: 2.4 },
  rosmarino: { seeds: 100, price: 3.0 },
  timo: { seeds: 200, price: 2.8 },
  origano: { seeds: 300, price: 2.8 },
  salvia: { seeds: 100, price: 2.8 },

  fava: { seeds: 20, price: 3.0 },
  cece: { seeds: 30, price: 3.0 },
  lenticchia: { seeds: 50, price: 2.8 },
  soia_edamame: { seeds: 30, price: 3.2 },
  fagiolo_borlotto: { seeds: 25, price: 3.0 },

  patata: { seeds: 10, price: 4.5 },
  patata_dolce: { seeds: 5, price: 5.0 },
  pastinaca: { seeds: 200, price: 2.5 },
  radice_prezemolo: { seeds: 200, price: 2.5 },
  sedano_rapa: { seeds: 300, price: 2.6 },
  rafano: { seeds: 50, price: 2.8 },
  cipolla_rossa: { seeds: 200, price: 2.3 },
  cipollotto: { seeds: 200, price: 2.3 },
  daikon: { seeds: 100, price: 2.5 },
  scorzonera: { seeds: 100, price: 2.8 },
  topinambur: { seeds: 10, price: 4.0 },
  cavolo_navone: { seeds: 200, price: 2.5 },

  loboda: { seeds: 100, price: 2.5 },
  stevia_dolce: { seeds: 100, price: 3.2 },
  asparago: { seeds: 20, price: 3.5 },
  carciofo: { seeds: 10, price: 4.0 },
  cardo: { seeds: 20, price: 3.5 },
  crescione: { seeds: 500, price: 2.2 },
  mizuna: { seeds: 300, price: 2.4 },
  senape_foglia: { seeds: 300, price: 2.4 },
  tatsoi: { seeds: 300, price: 2.4 },
  cavolo_cinese: { seeds: 200, price: 2.6 },
  cavolo_rosso: { seeds: 100, price: 2.8 },
  broccolo_rapa: { seeds: 200, price: 2.5 },

  mais_dolce: { seeds: 30, price: 3.5 },
  tomatillo: { seeds: 20, price: 3.5 },
  physalis: { seeds: 20, price: 3.5 },
  cucamelon: { seeds: 15, price: 4.0 },

  erba_cipollina: { seeds: 200, price: 2.8 },
  leustean: { seeds: 100, price: 3.0 },
  dragoncello: { seeds: 100, price: 3.0 },
  menta: { seeds: 200, price: 2.8 },
  maggiorana: { seeds: 300, price: 2.6 },
  camomilla: { seeds: 300, price: 2.4 },
  shiso: { seeds: 100, price: 3.2 },
  broccolo_romanesco: { seeds: 100, price: 2.8 },
  friggitello: { seeds: 30, price: 3.0 },
  agretti: { seeds: 500, price: 3.2 },
  borragine: { seeds: 50, price: 2.6 },
  catalogna: { seeds: 200, price: 2.4 },
  acetosa: { seeds: 300, price: 2.5 },
  leurda: { seeds: 50, price: 3.5 },
  melissa: { seeds: 500, price: 2.8 },
  cerfoglio: { seeds: 500, price: 2.6 },
  cimbru: { seeds: 1000, price: 2.4 }
};
// Formatta un valore in valuta locale
function formatMoney(value) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

let confCart = [];

// Gestisce righe, quantità e apertura del carrello del configuratore.
function loadConfCart() {
  try {
    const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
    confCart = raw.map((i) =>
      typeof i === "string" ? { id: i, bustine: 1 } : i
    );
  } catch (_) {
    confCart = [];
  }
  updateConfCartUI();
}

// Persiste il carrello nel localStorage
function saveConfCart() {
  try {
    localStorage.setItem("ois.cart", JSON.stringify(confCart));
  } catch (_) {}
}

// Aggiorna la visualizzazione del carrello
function updateConfCartUI() {
  // Materiali extra selezionati per l'ordine.
  const materials =
    typeof selectedMaterialItems === "function" ? selectedMaterialItems() : [];

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = confCart.length + materials.length;

  const speciesLine = document.getElementById("cartSpeciesLine");
  if (speciesLine) {
    if (confCart.length > 0) {
      speciesLine.textContent =
        confCart.length === 1
          ? tx("cart.species_one")
          : tx("cart.species_many", { count: confCart.length });
      speciesLine.hidden = false;
    } else {
      speciesLine.hidden = true;
    }
  }

  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");
  const foot = document.getElementById("cartFooter");
  const clearBtn = document.getElementById("cartClearBtn");
  if (!empty || !items || !foot) return;

  if (!confCart.length && !materials.length) {
    empty.hidden = false;
    items.hidden = true;
    foot.hidden = true;
    if (clearBtn) clearBtn.hidden = true;
    return;
  }
  empty.hidden = true;
  items.hidden = false;
  foot.hidden = false;
  if (clearBtn) clearBtn.hidden = false;

  const seedsTotal = confCart.reduce(
    (s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine,
    0
  );
  const materialsTotal = materials.reduce(
    (s, m) => s + m.bustine * m.prezzo,
    0
  );

  const seedRows = confCart
    .map(({ id, bustine }) => {
      const p = BYID[id];
      if (!p) return "";
      // Logica di risoluzione foto condivisa: vedi assets/js/shared/plant-photo.js
      let photo = window.resolvePlantPhoto(p, id);
      window.preloadPlantPhoto?.(p, id);
      const emoji = FRUIT_EMOJI[id] || "🌱";
      const pd = PACK_DATA[id] || { seeds: 100, price: 2.5 };
      const bustLabel =
        bustine === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: bustine });
      const seedLabel = tx("cart.seeds_per_pack", { count: pd.seeds });
      const priceLabel = tx("cart.per_pack");
      return `<div class="cart-item">
        ${
          photo
            ? `<img src="${photo}" alt="${plantText(p, "nome")}" decoding="async" />`
            : `<span style="font-size:2rem;line-height:1;flex-shrink:0">${emoji}</span>`
        }
        <span class="cart-item-copy">
          <span class="cart-item-name">${plantText(p, "nome")}</span>
          <span class="cart-item-meta">${plantText(p, "nota") || ""}</span>
          <span class="cart-item-pack">
            <span>${bustLabel} · ${seedLabel}</span>
            <b>${formatMoney(pd.price)}${priceLabel}</b>
          </span>
        </span>
        <button class="cart-item-remove" data-conf-action="remove-from-cart" data-plant-id="${id}" title="${tx("remove")}">✕</button>
      </div>`;
    })
    .join("");

  const materialsHeading = materials.length
    ? `<div class="cart-section-heading">${tx("cart.materials_section")}</div>`
    : "";
  const materialRows = materials
    .map((m) => {
      const qtyLabel = shoppingUnitLabel(m.unit, m.bustine);
      return `<div class="cart-item">
        <span style="font-size:2rem;line-height:1;flex-shrink:0">${m.icon || "🧰"}</span>
        <span class="cart-item-copy">
          <span class="cart-item-name">${m.nome}</span>
          <span class="cart-item-pack">
            <span>${qtyLabel}</span>
            <b>${formatMoney(m.bustine * m.prezzo)}</b>
          </span>
        </span>
        <button class="cart-item-remove" data-conf-action="unselect-material" data-material-id="${m.id}" title="${tx("remove")}">✕</button>
      </div>`;
    })
    .join("");

  const totalRow = materials.length
    ? `<div class="cart-total-row cart-total-row--sub">
        <span>${tx("cart.total")}</span>
        <b>${formatMoney(seedsTotal)}</b>
      </div>
      <div class="cart-total-row cart-total-row--sub">
        <span>${tx("cart.materials_section")}</span>
        <b>${formatMoney(materialsTotal)}</b>
      </div>
      <div class="cart-total-row">
        <span>${tx("cart.materials_grand_total")}</span>
        <b>${formatMoney(seedsTotal + materialsTotal)}</b>
      </div>`
    : `<div class="cart-total-row">
        <span>${tx("cart.total")}</span>
        <b>${formatMoney(seedsTotal)}</b>
      </div>`;

  items.innerHTML = seedRows + materialsHeading + materialRows + totalRow;
}

// Rimuove una voce dal carrello
function removeFromConfCart(id) {
  confCart = confCart.filter((i) => i.id !== id);
  saveConfCart();
  updateConfCartUI();
}
// Svuota l'intero carrello
function clearConfCart() {
  confCart = [];
  saveConfCart();
  updateConfCartUI();
}

// Apre il pannello carrello
function openConfCart() {
  loadConfCart();
  document.getElementById("cartNudge")?.classList.remove("visible");
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}

// Chiude il pannello carrello
function closeConfCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
}

// Importa il carrello nel piano e chiude
function importCartAndClose() {
  closeConfCart();

  importCartToPlan({ recordHistory: true });
}

// Mostra il banner temporaneo del carrello
function showConfCartNudge(count) {
  const nudge = document.getElementById("cartNudge");
  const title = document.getElementById("cartNudgeTitle");
  const meta = document.getElementById("cartNudgeMeta");
  if (!nudge || !title || !meta) return;
  title.textContent = tx("cart.nudge_title");
  meta.textContent =
    count === 1
      ? tx("cart.nudge_meta_one")
      : tx("cart.nudge_meta_many", { count });
  nudge.classList.add("visible");
  clearTimeout(showConfCartNudge._t);
  showConfCartNudge._t = setTimeout(
    () => nudge.classList.remove("visible"),
    3800
  );
}

// Mostra il riepilogo ordine all'utente
function alertConfCheckout() {
  const materials =
    typeof selectedMaterialItems === "function" ? selectedMaterialItems() : [];
  if (!confCart.length && !materials.length) return;

  // Controlla se l'utente è autenticato
  const user = window.SerraAPI && window.SerraAPI.getCurrentUser();
  if (!user) {
    alert(tx("cart.checkout_login_required"));
    window.location.href = "account.html";
    return;
  }

  const seedItems = confCart.map(({ id, bustine }) => {
    const nome = BYID[id] ? plantText(BYID[id], "nome") : id;
    const price = PACK_DATA[id]?.price ?? 2.5;
    return {
      id,
      nome,
      bustine,
      prezzo: price
    };
  });
  // I materiali extra selezionati (facoltativi) entrano nello stesso ordine
  const orderItems = seedItems.concat(materials);
  const seedsTotal = confCart.reduce(
    (s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine,
    0
  );
  const materialsTotal = materials.reduce(
    (s, m) => s + m.bustine * m.prezzo,
    0
  );
  const totalVal = seedsTotal + materialsTotal;

  window.SerraAPI.getOrders().then((orders) => {
    const newOrder = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      email: user.email,
      date: new Date().toISOString(),
      items: orderItems,
      total: totalVal,
      status: "In elaborazione"
    };
    orders.push(newOrder);
    window.SerraAPI.saveOrders(orders).then(() => {
      // Svuota il carrello e la selezione materiali extra dopo l'acquisto
      confCart = [];
      saveConfCart();
      Object.keys(shoppingChecked).forEach((k) => {
        shoppingChecked[k] = false;
      });
      if (typeof saveMaterialsSelection === "function") {
        saveMaterialsSelection();
      }
      if (typeof renderMaterials === "function") {
        renderMaterials();
      }
      if (typeof updateConfCartUI === "function") {
        updateConfCartUI();
      }
      alert(tx("cart.order_success", { id: newOrder.id }));
      window.location.href = "account.html";
    });
  });
}

// Sincronizzazione della lingua e del selettore.
function confSetLang(val) {
  const inLang = document.getElementById("inLang");
  if (inLang) {
    inLang.value = normalizeLang(val);
    inLang.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

window.addEventListener("storage", (event) => {
  if (event.key !== "ois.lang") return;
  const nextLang = normalizeLang(event.newValue);
  if (nextLang === state.lang) return;
  state.lang = nextLang;
  applyLanguage();
  saveConfig(true);
  render();
});

window.addEventListener("serra:themechange", () => render());

// Safari iOS può ripristinare il configuratore dalla page cache senza
// rieseguire il bootstrap. In quel caso riallinea l'ingresso guidato dalla
// home allo stato compatto previsto per il profilo Principiante.
window.addEventListener("pageshow", (event) => {
  const bootContext = window.history.state?.serraConfiguratorBoot;
  const navigationType = window.performance
    ?.getEntriesByType?.("navigation")?.[0]?.type;
  const restored = event.persisted || navigationType === "back_forward";
  if (
    !restored ||
    bootContext?.source !== "index" ||
    bootContext?.livello !== "novizio"
  ) {
    return;
  }
  window.requestAnimationFrame(() => {
    setPanelCollapsed("panelSettings", true);
    syncPersonaPickerDisclosure();
  });
});

(async () => {
  // Il catalogo necessario al configuratore è già incluso in plants-data.js.
  // La sincronizzazione con eventuali sorgenti esterne prosegue in background,
  // senza trattenere il primo disegno della serra dietro a un timeout di rete.
  window.SerraAPI.bootstrapPlants();

  initConfig();
  initEvents();
  loadConfCart();
  const _bootCfg = readSavedConfig();

  const _bootLivello = BOOT_PARAMS.get("livello");
  const _shouldFocusGuidedIntroOnBoot = LIVELLI.has(_bootLivello);

  if (LIVELLI.has(_bootLivello)) {
    state.livello = _bootLivello;
    const _hasExplicitBootIntent =
      isFreeProjectBoot() ||
      shouldImportCart() ||
      Boolean(requestedBootPreset());
    const _bootIntentApplied = _hasExplicitBootIntent
      ? applyBootIntent()
      : false;

    if (_bootLivello === "esperto") {
      vegFilter = "all-beds";
      state.autoPlan = false;
      setLivello(_bootLivello, { mapMode: false });
      setMode("expert", false);
      syncVegFilterTabs();
      render();
      if (!_shouldFocusGuidedIntroOnBoot) focusManualPlanningPath();
    } else if (_bootLivello === "intermedio") {
      vegFilter = "all";
      state.autoPlan = true;
      setLivello(_bootLivello, { mapMode: false });
      setMode("fit", false);
      syncVegFilterTabs();
      if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
      else render();
      if (!_shouldFocusGuidedIntroOnBoot) focusManualPlanningPath();
    } else {
      vegFilter = "in";
      state.autoPlan = true;
      setLivello(_bootLivello, { mapMode: false });
      setMode("fit", false);
      resetNoviceAdvancedOptions();
      syncVegFilterTabs();

      if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
      else render();
      if (!_shouldFocusGuidedIntroOnBoot) scrollToScene();
    }
    // Rimuove la schermatura iniziale dopo la sincronizzazione del profilo.
    document.documentElement.classList.remove("serra-boot-novizio");
    saveConfig(true);
    clearBootParams();
    // Posiziona l'ingresso dalla home all'inizio del configuratore.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.classList.remove("serra-boot-positioning");
      });
    });
  } else {
    const _bootIntentApplied =
      isGuidedBoot() ||
      isFreeProjectBoot() ||
      shouldImportCart() ||
      _bootCfg?.done
        ? applyBootIntent()
        : false;

    if (_bootIntentApplied && isGuidedBoot()) {
    } else if (!_bootIntentApplied && !_bootCfg) {
      autoFill();
    } else if (
      !_bootIntentApplied &&
      _bootCfg?.done &&
      state.autoPlan &&
      state.beds.length === 0
    ) {
      autoFill();
    } else if (!_bootIntentApplied) {
      render();
    }
    if (BOOT_PARAMS.get("mode") === "expert") {
      state.autoPlan = false;
      clearBootParams();
    }
    setMode(state.autoPlan ? "fit" : "expert", false);

    setLivello(state.livello, { mapMode: false });
    // Mantiene l'ingresso compatto dopo un refresh.
    if (_bootCfg?.livello) setPanelCollapsed("panelSettings", true);
  }
  syncVegFilterTabs();

  updateGuidedIntroDynamic();

  collapseSettingsPanelAfterAutoPlan({
    scroll: !_shouldFocusGuidedIntroOnBoot
  });

  // Mostra il contenuto dopo la sincronizzazione della lingua.
  document.documentElement.classList.remove("serra-i18n-pending");
})();
