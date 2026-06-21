/* =========================================================================
   SEZIONE 13 - Eventi UI e inizializzazione configuratore
   -------------------------------------------------------------------------
   Collega form, pulsanti, tab, filtri, controlli quantita, pannelli e azioni
   sulla scena. La funzione initConfig subito dopo recupera lo stato salvato.
   ========================================================================= */
function fillMonths() {
  const months = MONTHS[state.lang] || MONTHS.it;
  const monthHtml = months.map((m, i) => `<option value="${i + 1}">${m}</option>`).join("");
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

function initEvents() {
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
    if (pillLabel) pillLabel.textContent = (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
    saveConfig(true);
    refreshForSeasonChange();
  });
  document.getElementById("inMeseStage")?.addEventListener("change", (e) => {
    state.mese = parseInt(e.target.value);
    document.getElementById("inMese").value = e.target.value;
    const pillLabel = document.getElementById("stageMonthPillLabel");
    if (pillLabel) pillLabel.textContent = (MONTHS[state.lang] || MONTHS.it)[state.mese - 1] || "";
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
  document.getElementById("inOverlay").addEventListener("change", (e) => {
    state.overlay = e.target.value;
    syncOverlaySelectLabel();
    render();
  });
  document.getElementById("inPreset").addEventListener("change", (e) => {
    if (e.target.value) {
      loadPreset(e.target.value);
      setMode("fit", false);
      e.target.value = "";
    }
  });
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
    saveConfig(true);
    setMode("fit", false);
    autoFill();
    collapseSettingsPanelAfterAutoPlan();
  });
  document
    .getElementById("btnPresetSeasonal")
    ?.addEventListener("click", () => {
      saveConfig(true);
      setMode("fit", false);
      autoFill();
    });
  document
    .getElementById("btnArrangeSelected")
    .addEventListener("click", arrangeSelectedPlantsExact);
  document
    .getElementById("btnFillSelected")
    .addEventListener("click", fillSelectedPlants);
  document.getElementById("btnClear").addEventListener("click", () => {
    if (state.livello === "novizio") return;
    const msg =
      state.lang === "ro"
        ? "Golești sera? Folosește «Umple sera» pentru a o reface."
        : "Svuoti la serra? Usa «Riempi la serra» per riportarla com'era.";
    if (!confirm(msg)) return;
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    saveConfig(true);
    render();
  });
  // Controlli +/-
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

  // CTA del percorso novizio: apre/evidenzia il pannello "La tua serra"
  const guidedNovCta = document.getElementById("guidedNovCta");
  if (guidedNovCta) {
    guidedNovCta.addEventListener("click", () => {
      openSettingsPanelAndFocusDimensions();
    });
  }

  // Pulsante accordion del pannello
  document.querySelectorAll(".panel-toggle").forEach((btn) => {
    updatePanelToggle(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const panel = btn.closest(".panel");
      panel.classList.toggle("is-collapsed");
      updatePanelToggle(btn);
    });
  });

  // Clic sull'intestazione del pannello (riga intera cliccabile)
  document.querySelectorAll(".panel-title-row, .panel-head").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("button, select, input, label, .stepper")) return;
      const panel = row.closest(".panel");
      const btn = panel.querySelector(".panel-toggle");
      if (btn) btn.click();
    });
  });

  // Le impostazioni restano aperte nelle modalità che le usano: sono il primo
  // controllo utile per chi adatta o personalizza la serra.
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
      const action = event.target.closest("[data-export-action]")?.dataset.exportAction;
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
  window.addEventListener("scroll", () => closeProjectExportMenu(), { passive: true });
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
      const crops = document.getElementById("panelCustomize");
      if (crops) {
        window.requestAnimationFrame(() => {
          const navH = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-h"
            ) || "66",
            10
          );
          const top =
            crops.getBoundingClientRect().top + window.scrollY - navH - 12;
          window.scrollTo({ top, behavior: "smooth" });
          crops.classList.add("is-focus-pulse");
          window.setTimeout(
            () => crops.classList.remove("is-focus-pulse"),
            1600
          );
        });
      }
    });
  // delega su lista seminabili
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

  // filtri piante
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
      input.focus();
    }
    renderVegList();
  });
  document
    .getElementById("vegList")
    ?.addEventListener("scroll", updateVegListScrollAffordance, {
      passive: true
    });
  window.addEventListener("resize", updateVegListScrollAffordance);

  // modale avvio
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

/* Inizializzazione dello stato: carica localStorage, lingua condivisa,
   dimensioni, mese, profilo e aiuole salvate. */
// Applica un oggetto di configurazione salvato allo stato corrente.
// Estratto da initConfig per riuso nello switch tra progetti (conf-projects.js).
function applyConfigToState(saved) {
  if (!saved) return;
  if (saved.lang === "it" || saved.lang === "ro") state.lang = saved.lang;
  if (["freddo", "temperato", "caldo"].includes(saved.zona)) {
    state.zona = saved.zona;
  }
  state.riscaldata = Boolean(saved.riscaldata);
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
  autoBalanceLayout(true, false);
}

function initConfig() {
  // Inizializza/migra lo store multi-progetto prima di leggere la config.
  if (typeof ensureProjectsStore === "function") ensureProjectsStore();
  const saved = readSavedConfig();
  const sharedLang = localStorage.getItem("ois.lang");
  const hasSharedLang = sharedLang === "it" || sharedLang === "ro";
  if (saved) applyConfigToState(saved);
  if (hasSharedLang) state.lang = sharedLang;
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  if (saved && hasSharedLang && saved.lang !== state.lang)
    saveConfig(Boolean(saved.done));
  setStartModalVisible(!saved?.done && !isGuidedBoot() && !isFreeProjectBoot());
}

/* =========================================================================
   SEZIONE 14 - Carrello configuratore
   -------------------------------------------------------------------------
   Usa localStorage["ois.cart"] condiviso con la homepage. Calcola bustine,
   prezzi, badge, overlay carrello e messaggi di checkout.
   ========================================================================= */
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
  // Legumi
  fava: { seeds: 20, price: 3.0 },
  cece: { seeds: 30, price: 3.0 },
  lenticchia: { seeds: 50, price: 2.8 },
  soia_edamame: { seeds: 30, price: 3.2 },
  fagiolo_borlotto: { seeds: 25, price: 3.0 },
  // Radici e bulbi
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
  // Foglie e insalate
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
  // Frutti esotici
  mais_dolce: { seeds: 30, price: 3.5 },
  tomatillo: { seeds: 20, price: 3.5 },
  physalis: { seeds: 20, price: 3.5 },
  cucamelon: { seeds: 15, price: 4.0 },
  // Aromatiche e fiori
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
function formatMoney(value) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

let confCart = [];

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

function saveConfCart() {
  try {
    localStorage.setItem("ois.cart", JSON.stringify(confCart));
  } catch (_) {}
}

function updateConfCartUI() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = confCart.length;

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

  if (!confCart.length) {
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

  items.innerHTML =
    confCart
      .map(({ id, bustine }) => {
        const p = BYID[id];
        if (!p) return "";
        const photo = PLANT_PHOTOS[id] || "";
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
            ? `<img src="${photo}" alt="${plantText(p, "nome")}" loading="lazy" />`
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
        <button class="cart-item-remove" onclick="removeFromConfCart('${id}')" title="${tx("remove")}">✕</button>
      </div>`;
      })
      .join("") +
    `<div class="cart-total-row">
      <span>${tx("cart.total")}</span>
      <b>${formatMoney(confCart.reduce((s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine, 0))}</b>
    </div>`;
}

function removeFromConfCart(id) {
  confCart = confCart.filter((i) => i.id !== id);
  saveConfCart();
  updateConfCartUI();
  const existingBtn = document.getElementById("confCartExportBtn");
  if (existingBtn) existingBtn.remove();
}
function clearConfCart() {
  confCart = [];
  saveConfCart();
  updateConfCartUI();
  const existingBtn = document.getElementById("confCartExportBtn");
  if (existingBtn) existingBtn.remove();
}

function openConfCart() {
  loadConfCart();
  document.getElementById("cartNudge")?.classList.remove("visible");
  document.body.classList.add("cart-open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeConfCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("cart-open");
}

function importCartAndClose() {
  closeConfCart();
  // importCartToPlan() applica già il piano e fa lo scroll alla pianificazione.
  importCartToPlan();
}

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

function alertConfCheckout() {
  const lines = confCart
    .map(({ id, bustine }) => {
      const nome = BYID[id] ? plantText(BYID[id], "nome") : id;
      const pd = PACK_DATA[id] || { price: 2.5 };
      const b =
        bustine === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: bustine });
      return `- ${nome}: ${b} × ${formatMoney(pd.price)} = ${formatMoney(bustine * pd.price)}`;
    })
    .join("\n");
  const total = formatMoney(
    confCart.reduce(
      (s, { id, bustine }) => s + (PACK_DATA[id]?.price ?? 2.5) * bustine,
      0
    )
  );
  alert(tx("cart.checkout_msg", { lines, total }));
}

/* =========================================================================
   SEZIONE 15 - Avvio finale e sincronizzazione lingua
   -------------------------------------------------------------------------
   Sincronizza la lingua tra tab/pagine, esegue init, interpreta i parametri
   URL finali e produce il primo render del configuratore.
   ========================================================================= */

/* Lingua nav: sincronizza selettore header e localStorage condiviso. */
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

// Il cambio tema aggiorna subito la serra: giorno in light mode, notte in dark mode.
window.addEventListener("serra:themechange", () => render());

initConfig();
initEvents();
loadConfCart();
const _bootCfg = readSavedConfig();
// Livello/persona richiesto dalla homepage (es. ?livello=novizio).
const _bootLivello = BOOT_PARAMS.get("livello");

if (LIVELLI.has(_bootLivello)) {
  // Ingresso dalla homepage con persona già scelta: applica esattamente lo
  // stesso comportamento del pulsante livello dentro il configuratore, ma prima
  // rispetta intenti espliciti come preset=principiante o empty=1.
  state.livello = _bootLivello;
  const _hasExplicitBootIntent =
    isFreeProjectBoot() || shouldImportCart() || Boolean(requestedBootPreset());
  const _bootIntentApplied = _hasExplicitBootIntent ? applyBootIntent() : false;

  if (_bootLivello === "esperto") {
    vegFilter = "all-beds";
    state.autoPlan = false;
    setLivello(_bootLivello, { mapMode: false });
    setMode("expert", false);
    syncVegFilterTabs();
    render();
    focusManualPlanningPath();
  } else if (_bootLivello === "intermedio") {
    vegFilter = "all";
    state.autoPlan = true;
    setLivello(_bootLivello, { mapMode: false });
    setMode("fit", false);
    syncVegFilterTabs();
    if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
    else render();
    focusManualPlanningPath();
  } else {
    vegFilter = "in";
    state.autoPlan = true;
    setLivello(_bootLivello, { mapMode: false });
    setMode("fit", false);
    resetNoviceAdvancedOptions();
    syncVegFilterTabs();
    // Ingresso guidato del novizio: usa l'auto-riempimento STAGIONALE (coerente col
    // mese), non un preset fisso che potrebbe essere fuori stagione. Come per
    // l'intermedio, con guided=1 si rigenera sempre il piano di stagione.
    if (!_bootIntentApplied || BOOT_PARAMS.get("guided") === "1") autoFill();
    else render();
    scrollToScene();
  }
  saveConfig(true);
  clearBootParams();
  scrollToGuidedIntroForLivello(_bootLivello);
} else {
  const _bootIntentApplied =
    isGuidedBoot() || isFreeProjectBoot() || _bootCfg?.done
      ? applyBootIntent()
      : false;

  if (_bootIntentApplied && isGuidedBoot()) {
    // Arrivo dalla homepage "Crea il mio orto guidato": intento iniziale già applicato.
  } else if (!_bootIntentApplied && !_bootCfg) {
    // Prima visita: riempimento automatico.
    autoFill();
  } else if (
    !_bootIntentApplied &&
    _bootCfg?.done &&
    state.autoPlan &&
    state.beds.length === 0
  ) {
    // Utente di ritorno con piano automatico ma serra vuota, per esempio dopo cambio mese.
    autoFill();
  } else if (!_bootIntentApplied) {
    render();
  }
  if (BOOT_PARAMS.get("mode") === "expert") {
    state.autoPlan = false;
    clearBootParams();
  }
  setMode(state.autoPlan ? "fit" : "expert", false);
  // Sincronizza classi body e card attiva senza forzare la modalità (già decisa).
  setLivello(state.livello, { mapMode: false });
}
syncVegFilterTabs();
/* Chiusura boot: aggiorna i testi dinamici del percorso guidato. */
updateGuidedIntroDynamic();
/* Di default il pannello "La tua serra" è chiuso in tutte le modalità su mobile/tablet. */
collapseSettingsPanelAfterAutoPlan();
/* Su desktop, il principiante trova il pannello aperto per orientarsi subito. */
if (state.livello === "novizio" && !isResponsiveConfiguratorLayout()) {
  const _novPanel = document.getElementById("panelSettings");
  if (_novPanel) {
    _novPanel.classList.remove("is-collapsed");
    updateAllPanelToggles();
  }
}
