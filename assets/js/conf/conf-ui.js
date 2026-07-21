// Genera le card delle colture con stato, quantità e azioni disponibili.
function vegCardHTML(p, inb, outOfSeason = false, inConflict = false) {
  const diff = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diff === 1
      ? tx("diffEasy")
      : diff === 2
        ? tx("diffMedium")
        : tx("diffHard");
  const diffClass =
    diff === 1 ? "diff-easy" : diff === 2 ? "diff-medium" : "diff-hard";
  const soleIco = p.sole === "pieno" ? "☀️" : "🌤️";
  const harvestTag = p.gg
    ? `⏱ ${p.gg} ${tx("daysShort")}`
    : `∞ ${tx("perennial")}`;
  const offSeasonBadge = outOfSeason
    ? `<span class="veg-offseason">${tx("offSeason")}</span>`
    : "";
  if (inb) {
    const bed = state.beds.find((b) => b.plantId === p.id);
    const count = bed ? bed.count : 0;
    const locked = Boolean(bed?.countLocked);
    const lockBadge = locked
      ? `<span class="veg-lock-badge">${tx("qtyLocked")}</span>`
      : `<span class="veg-auto-badge">${tx("qtyAuto")}</span>`;
    const conflictBadge = inConflict
      ? `<span class="veg-conflict" title="${tx("companion.conflict_badge")}" aria-label="${tx("companion.conflict_badge")}">⚠️</span>`
      : "";
    return `<div class="veg in ${locked ? "qty-locked" : ""}${inConflict ? " veg--conflict" : ""}">
    <div class="veg-in-main">
      <span class="ico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
      <div class="nm">
        <div class="veg-nameline">
          <span class="veg-name">${plantText(p, "nome")}</span>${offSeasonBadge}${conflictBadge}
        </div>
        <div class="veg-tags">
          <span class="vtag">${soleIco}</span>
          <span class="vtag">${harvestTag}</span>
        </div>
        <span class="veg-diff ${diffClass}">${diffLabel}</span>
      </div>
    </div>
    <div class="veg-qty-panel">
      <div class="veg-qty-topline">
        <span>${tx("qtyLabel")}</span>
        ${lockBadge}
      </div>
      <div class="veg-qty-ctl">
        <button class="veg-step" data-veg-cnt="-1" data-veg-plant="${p.id}" aria-label="${tx("qtyDecrease")}">−</button>
        <input class="veg-qty-input" type="number" min="1" step="1" inputmode="numeric" value="${count}" data-veg-count-input="${p.id}" aria-label="${tx("qtyInputAria")} ${plantText(p, "nome")}">
        <button class="veg-step" data-veg-cnt="1" data-veg-plant="${p.id}" aria-label="${tx("qtyIncrease")}">+</button>
      </div>
    </div>
    <button class="add remove-from-seed" data-remove-plant="${p.id}" title="${tx("remove")}">×</button>
  </div>`;
  }
  return `<div class="veg">
    <span class="ico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
    <div class="nm">
      <div class="veg-nameline">
        <span class="veg-name">${plantText(p, "nome")}</span>${offSeasonBadge}
      </div>
      <div class="veg-tags">
        <span class="vtag">${soleIco}</span>
        <span class="vtag">${harvestTag}</span>
      </div>
      <span class="veg-diff ${diffClass}">${diffLabel}</span>
    </div>
    <button class="add" data-add="${p.id}">+</button>
  </div>`;
}

// Aggiorna la lista colture con filtri e ricerca
function renderVegList() {
  updateVegSearchUI();
  if (state.livello === "novizio" && vegFilter !== "in") {
    vegFilter = "in";
  }
  const sem = seminabili();
  const present = new Set(state.beds.map((b) => b.plantId));

  const subEl = document.getElementById("seminabiliSub");
  const semSet = new Set(sem.map((p) => p.id));
  if (vegFilter === "in") {
    const n = state.beds.length;
    const label = n === 1 ? tx("cropSingular") : tx("cropPlural");
    subEl.innerHTML = tx("filterDescIn", { count: n, label });
  } else if (vegFilter === "all-beds") {
    subEl.innerHTML = tx("filterDescAllBeds", {
      count: PLANTS.length,
      seasonal: sem.length
    });
  } else {
    subEl.innerHTML = tx("filterDescAll", { count: sem.length });
  }

  const countMap = {
    all: sem.length,
    in: state.beds.length,
    "all-beds": PLANTS.length
  };
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === vegFilter);
    const countEl = tab.querySelector(".tab-count");
    if (countEl) countEl.textContent = countMap[tab.dataset.filter] ?? "—";
  });

  let filtered;
  if (vegFilter === "in") {
    filtered = PLANTS.filter((p) => present.has(p.id));
  } else if (vegFilter === "all-beds") {
    filtered = PLANTS;
  } else {
    filtered = sem;
  }

  const totalBeforeSearch = filtered.length;
  const searchNeedle = normalizeVegSearchText(vegSearchQuery);
  if (searchNeedle && state.livello !== "novizio") {
    filtered = filtered.filter((p) => {
      const haystack = [
        plantText(p, "nome"),
        p.id,
        p.nome,
        p.nome_ro,
        p.categoria,
        p.category
      ]
        .map(normalizeVegSearchText)
        .join(" ");
      return haystack.includes(searchNeedle);
    });
    if (subEl) {
      const shown = filtered.length;
      const base = subEl.innerHTML;
      const searchMsg =
        state.lang === "ro"
          ? ` · afisate ${shown} din ${totalBeforeSearch}`
          : ` · mostrate ${shown} di ${totalBeforeSearch}`;
      subEl.innerHTML = `${base}<span class="search-count-note">${searchMsg}</span>`;
    }
  }

  const vl = document.getElementById("vegList");
  if (!filtered.length) {
    const msg =
      searchNeedle && state.livello !== "novizio"
        ? `<div class="empty-note">${tx("vegSearchEmpty")}</div>`
        : vegFilter === "in" || vegFilter === "all-beds"
          ? `<div class="empty-note">${tx("vegNoMore")}</div>`
          : `<div class="empty-note">${tx("noCrops", { month: monthName(state.mese) })}</div>`;
    vl.innerHTML = msg;
    updateVegListScrollAffordance();
    return;
  }

  const locale = state.lang === "ro" ? "ro" : "it";
  filtered.sort((a, b) => {
    if (vegFilter === "all-beds" || vegFilter === "in") {
      const aOut = !semSet.has(a.id);
      const bOut = !semSet.has(b.id);
      if (aOut !== bOut) return aOut ? 1 : -1;
    }
    return plantText(a, "nome").localeCompare(plantText(b, "nome"), locale);
  });
  const noviceUpgrade =
    state.livello === "novizio"
      ? `<div class="novice-crops-note">
          <div>
            <b>${tx("noviceCropsNoteTitle")}</b>
            <span>${tx("noviceCropsNoteText")}</span>
          </div>
          <button type="button" data-upgrade-level="intermedio">${tx("noviceCropsUpgrade")}</button>
        </div>`
      : "";
  const conflictIds = analyzeCompanions().conflictIds;
  vl.innerHTML =
    noviceUpgrade +
    filtered
      .map((p) =>
        vegCardHTML(
          p,
          present.has(p.id),
          !semSet.has(p.id),
          conflictIds.has(p.id)
        )
      )
      .join("");
  updateVegListScrollAffordance();
}

// Mostra o nasconde il suggerimento di scorrimento lista
function updateVegListScrollAffordance() {
  const list = document.getElementById("vegList");
  const wrap = document.getElementById("vegListScrollWrap");
  const hint = document.getElementById("vegScrollHint");
  if (!list || !wrap || !hint) return;
  requestAnimationFrame(() => {
    const scrollable = list.scrollHeight > list.clientHeight + 2;
    const atEnd =
      !scrollable ||
      list.scrollTop + list.clientHeight >= list.scrollHeight - 6;
    hint.hidden = !scrollable;
    wrap.classList.toggle("has-overflow", scrollable);
    wrap.classList.toggle("is-at-end", atEnd);
  });
}

// Abilita o disabilita i pulsanti azione colture
function updateCropActionControls() {
  const hasCrops = state.beds.length > 0;
  const noviceLocked = state.livello === "novizio";
  const arrangeBtn = document.getElementById("btnArrangeSelected");
  const fillBtn = document.getElementById("btnFillSelected");
  const clearBtn = document.getElementById("btnClear");
  if (arrangeBtn) arrangeBtn.disabled = !hasCrops;
  if (fillBtn) fillBtn.disabled = !hasCrops;
  if (clearBtn) {
    clearBtn.disabled = !hasCrops || noviceLocked;
    clearBtn.classList.toggle("is-level-locked", noviceLocked);
    clearBtn.setAttribute("aria-disabled", String(!hasCrops || noviceLocked));
  }
  updateClearGreenhouseCopy();
}

// Aggiorna il testo del pulsante svuota serra
function updateClearGreenhouseCopy() {
  const clearBtn = document.getElementById("btnClear");
  if (!clearBtn) return;
  const noviceLocked = state.livello === "novizio";
  const hint = clearBtn.querySelector(".btn-hint");
  if (hint)
    hint.innerHTML = noviceLocked
      ? tx("clearGreenhouseLockedHint")
      : tx("clearGreenhouseHint");
  clearBtn.title = noviceLocked
    ? tx("clearGreenhouseLockedTitle")
    : tx("clearGreenhouseTitle");
}

// Restituisce la stagione per un dato mese
function getStagione(m) {
  if ([12, 1, 2].includes(m)) return "inverno";
  if ([3, 4, 5].includes(m)) return "primavera";
  if ([6, 7, 8].includes(m)) return "estate";
  return "autunno";
}

// Aggiorna il tag stagione e le icone del footer
function renderFooter() {
  const stag = getStagione(state.mese);
  const sharedDict =
    window.SERRA_I18N?.index?.[state.lang] ||
    window.SERRA_I18N?.index?.it ||
    {};
  const seasonKey = {
    inverno: "winter",
    primavera: "spring",
    estate: "summer",
    autunno: "autumn"
  }[stag];
  const stagLabel = sharedDict["season_name." + seasonKey] || stag;
  const tagEl = document.getElementById("footerSeasonTag");
  if (tagEl) tagEl.innerHTML = stagLabel;

  const rowEl = document.getElementById("footerPlantRow");
  if (rowEl && !rowEl.dataset.built) {
    const icons = PLANTS.map((p) => {
      const emoji = FRUIT_EMOJI[p.id] || "🌱";
      return `<span class="footer-plant-icon"><span class="footer-plant-icon-visual footer-plant-icon-visual--emoji" role="img" aria-label="${p.nome}">${emoji}</span></span>`;
    }).join("");
    rowEl.innerHTML = icons + icons;
    rowEl.dataset.built = "1";
  }
}

// Aggiorna scena, pannelli e riepilogo in base allo stato della configurazione.
let lastRenderedCropSignature = null;
let renderGeneration = 0;
// La prima scena coltivata deve crescere indipendentemente dal punto di
// ingresso: su mobile spesso il configuratore viene riaperto direttamente.
const animateInitialCrops = true;

function cropSignature() {
  return state.beds
    .map((bed) => `${bed.plantId}:${bed.count}`)
    .sort()
    .join("|");
}

function render() {
  const currentRenderGeneration = ++renderGeneration;
  const zoneNames = {
    freddo: tx("cold"),
    temperato: tx("temperate"),
    caldo: tx("warm")
  };
  const zoneValue =
    zoneNames[state.zona] + (state.riscaldata ? ` · ${tx("heatedShort")}` : "");
  const monthValue = monthName(state.mese);
  const areaValue = `${state.larghezza}×${state.lunghezza} m`;
  const tagZonaValue = document.getElementById("tagZonaValue");
  const tagMeseValue = document.getElementById("tagMeseValue");
  const tagAreaValue = document.getElementById("tagAreaValue");
  if (tagZonaValue) tagZonaValue.textContent = zoneValue;
  if (tagMeseValue) tagMeseValue.textContent = monthValue;
  if (tagAreaValue) tagAreaValue.textContent = areaValue;
  const guidedSetupCurrent = document.getElementById("guidedSetupCurrent");
  if (guidedSetupCurrent) {
    guidedSetupCurrent.textContent = `${areaValue} · ${zoneValue} · ${monthValue}`;
  }

  const bmt = document.getElementById("btnMonthTag");
  if (bmt) bmt.textContent = monthName(state.mese);
  updatePresetAppliedUI();

  const currentCropSignature = cropSignature();
  const isInitialPlantRender = lastRenderedCropSignature === null;
  const animatePlantGrowth =
    (isInitialPlantRender &&
      animateInitialCrops &&
      state.beds.length > 0) ||
    (!isInitialPlantRender &&
      currentCropSignature !== lastRenderedCropSignature);
  lastRenderedCropSignature = currentCropSignature;

  const built = buildScene({
    animatePlants: animatePlantGrowth,
    // All'ingresso tutte le piante iniziano subito a crescere: lo stagger resta
    // soltanto per le modifiche successive, quando rende leggibile il cambiamento.
    staggerPlants: !isInitialPlantRender
  });
  const scene = document.getElementById("scene");
  scene.classList.toggle(
    "scene--dense-reveal",
    built.plantAnimationSuppressed
  );
  scene.innerHTML = built.svg;
  bindPlantAssetFallbacks();
  const L = built.layout;
  const used = (L.usedH / 100).toFixed(1);
  const status = L.overflow
    ? tx("tooFull")
    : state.beds.length
      ? tx("organized")
      : tx("emptyStatus");
  document.getElementById("scaleNote").innerHTML = tx("scale", {
    w: state.larghezza,
    l: state.lunghezza,
    used,
    status
  });

  const lg = document.getElementById("legend");
  if (state.overlay === "sole")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#fff2a6,#f5bd2d,#df7f1b)", tx("fullSun")],
      ["linear-gradient(135deg,#d9edf5,#8fb5d1,#5d7fa4)", tx("halfShade")]
    ]);
  else if (state.overlay === "acqua")
    lg.innerHTML = legend([
      ["linear-gradient(135deg,#8ee8ff,#238bd4,#075aa3)", tx("waterHigh")],
      ["linear-gradient(135deg,#c8f0ff,#78bfe6,#3f92c9)", tx("waterMedium")],
      ["linear-gradient(135deg,#eef5e4,#cfdba5,#a8b46d)", tx("waterLow")]
    ]);
  else if (state.overlay === "altezza")
    lg.innerHTML = legend([
      ["linear-gradient(180deg,#0d3d22,#275827)", tx("heightHigh")],
      ["linear-gradient(180deg,#3f8f45,#8fca61)", tx("heightMedium")],
      ["linear-gradient(180deg,#a9d870,#ecf6b5)", tx("heightLow")]
    ]);
  else lg.innerHTML = "";

  const emptyBanner = document.getElementById("stageEmptyBanner");
  document.body.classList.toggle("serra-empty", state.beds.length === 0);
  if (emptyBanner) {
    const b = emptyBanner.querySelector(".seb-copy b");
    const s = emptyBanner.querySelector(".seb-copy span");
    if (b) b.textContent = tx("emptyBannerTitle");

    if (s)
      s.innerHTML = tx(
        state.livello === "novizio"
          ? "emptyBannerCopyNovice"
          : "emptyBannerCopy"
      );
    emptyBanner.hidden = state.beds.length > 0;
  }

  const renderSecondaryInterface = () => {
    if (currentRenderGeneration !== renderGeneration) return;
    renderVegList();
    updateCropActionControls();
    renderBeds();
    renderWarnings(L);
    renderSummary();
    renderFooter();

    // Se la scheda pianta e aperta, riallinea anche i suoi contenuti dinamici.
    // Serve in particolare al cambio lingua, perche le etichette della scheda
    // non fanno parte dei nodi statici aggiornati da applyLanguage().
    const plantDetailPanelElement =
      document.getElementById("panelPlantDetail");
    if (
      plantDetailPanelElement &&
      !plantDetailPanelElement.hidden &&
      state.selected >= 0
    ) {
      const activeDetailTab =
        document.querySelector("#pdpContent [data-detail-tab].active")?.dataset
          .detailTab || "overview";
      renderPlantDetailPanel(activeDetailTab);
    }
  };

  if (isInitialPlantRender) {
    // La prima immagine della serra deve arrivare al browser prima dei pannelli
    // non essenziali. Il timer dentro requestAnimationFrame lascia avvenire un
    // paint completo e riprende subito dopo con catalogo, riepilogo e footer.
    window.requestAnimationFrame(() =>
      window.setTimeout(renderSecondaryInterface, 0)
    );
  } else {
    renderSecondaryInterface();
  }

  document.querySelectorAll(".bedhit").forEach((el) => {
    const openBedDetail = () => {
      const idx = parseInt(el.dataset.bed);
      if (state.selected === idx) {
        state.selected = -1;
        closePlantDetailPanel();
      } else {
        const detailReturnScroll = isResponsiveConfiguratorLayout()
          ? null
          : { left: window.scrollX, top: window.scrollY };
        state.selected = idx;
        render();
        openPlantDetailPanel(detailReturnScroll);
      }
    };
    el.addEventListener("click", openBedDetail);
    el.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openBedDetail();
    });
  });
}

// Attiva il glifo nativo solo se un file SVG esterno non è disponibile.
function bindPlantAssetFallbacks() {
  document
    .querySelectorAll("#scene image[data-plant-asset]")
    .forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          image.previousElementSibling?.removeAttribute("hidden");
          image.remove();
        },
        { once: true }
      );
    });
}
// Genera l'HTML della legenda overlay
function legend(items) {
  return items
    .map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`)
    .join("");
}

// Genera la lista chip delle aiuole
function renderBeds() {
  const bl = document.getElementById("bedsList");
  if (!bl) return;
  if (state.beds.length === 0) {
    bl.innerHTML = `<div class="empty-note">${tx("noBeds")}</div>`;
    return;
  }
  const semSet = new Set(seminabili().map((p) => p.id));
  bl.innerHTML = state.beds
    .map((b, i) => {
      const p = BYID[b.plantId];
      const diff = DIFFICULTY[p.id] || 2;
      const diffLabel =
        diff === 1
          ? tx("diffEasy")
          : diff === 2
            ? tx("diffMedium")
            : tx("diffHard");
      const diffClass =
        diff === 1 ? "diff-easy" : diff === 2 ? "diff-medium" : "diff-hard";
      const offSeasonBadge = !semSet.has(p.id)
        ? `<span class="veg-offseason">${tx("offSeason")}</span>`
        : "";
      return `<div class="bedchip ${i === state.selected ? "sel" : ""}" data-sel="${i}">
      <span class="bedico" role="img" aria-label="${plantText(p, "nome")}">${FRUIT_EMOJI[p.id] || "🌱"}</span>
      <div class="bedchip-body">
        <div class="t">${plantText(p, "nome")}${offSeasonBadge}</div>
        <div class="bedchip-sub">
          <span class="c">${b.count}&nbsp;${tx("piecesShort")}</span>
          <span class="bedchip-dot" aria-hidden="true">·</span>
          <span class="bedchip-gg">${p.gg}&nbsp;${tx("daysShort")}</span>
          <span class="bedchip-dot" aria-hidden="true">·</span>
          <span class="bedchip-diff ${diffClass}">${diffLabel}</span>
        </div>
      </div>
      <button class="del" data-del="${i}" title="${tx("remove")}">✕</button>
    </div>`;
    })
    .join("");
  bl.querySelectorAll("[data-sel]").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target.dataset.del !== undefined) return;
      state.selected = parseInt(el.dataset.sel);
      render();
    })
  );
  bl.querySelectorAll("[data-del]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const i = parseInt(el.dataset.del);
      const plantId = state.beds[i]?.plantId;
      if (plantId) removePlantById(plantId);
    })
  );
}

// Calcola l'offset dello scroll per l'header fisso
function headerScrollOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-h")
    .trim();
  const navHeight = parseFloat(raw) || 66;
  return navHeight + 12;
}

let pendingPageScrollTimer = 0;
let pendingPageScrollFrame = 0;
let pendingPageScrollToken = 0;
let pendingPageScrollFontsTimer = 0;
let plantDetailScrollFrame = 0;
let plantDetailReturnScrollFrame = 0;
let plantDetailReturnScrollTimer = 0;

// Annulla eventuali scroll pagina programmati ma non ancora eseguiti
function cancelPendingPageScroll() {
  pendingPageScrollToken++;
  if (pendingPageScrollTimer) {
    window.clearTimeout(pendingPageScrollTimer);
    pendingPageScrollTimer = 0;
  }
  if (pendingPageScrollFrame) {
    window.cancelAnimationFrame(pendingPageScrollFrame);
    pendingPageScrollFrame = 0;
  }
  if (pendingPageScrollFontsTimer) {
    window.clearTimeout(pendingPageScrollFontsTimer);
    pendingPageScrollFontsTimer = 0;
  }
}

// Esegue lo scroll sotto l'header usando la posizione più aggiornata
function scrollElementBelowHeaderNow(target, behavior = "smooth") {
  if (!target) return;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerScrollOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior
  });
}

// Programma un solo scroll pagina alla volta, evitando scroll concorrenti
function scheduleElementBelowHeader(
  targetOrResolver,
  behavior = "smooth",
  options = {}
) {
  const delay = Math.max(0, options.delay || 0);
  cancelPendingPageScroll();
  const token = ++pendingPageScrollToken;
  const run = () => {
    pendingPageScrollTimer = 0;
    pendingPageScrollFrame = window.requestAnimationFrame(() => {
      pendingPageScrollFrame = 0;
      if (token !== pendingPageScrollToken) return;
      const target =
        typeof targetOrResolver === "function"
          ? targetOrResolver()
          : targetOrResolver;
      scrollElementBelowHeaderNow(target, behavior);
      if (target && typeof options.after === "function") options.after(target);
    });
  };
  const start = () => {
    if (token !== pendingPageScrollToken) return;
    if (delay) pendingPageScrollTimer = window.setTimeout(run, delay);
    else run();
  };
  // Attende i font prima di calcolare la posizione di scroll.
  if (
    options.waitForFonts !== false &&
    document.fonts &&
    document.fonts.ready &&
    document.fonts.status !== "loaded"
  ) {
    let started = false;
    const kick = () => {
      if (started) return;
      started = true;
      pendingPageScrollFontsTimer = 0;
      start();
    };
    document.fonts.ready.then(kick).catch(kick);
    pendingPageScrollFontsTimer = window.setTimeout(kick, 400);
  } else {
    start();
  }
}

// Scrolla un elemento sotto l'header con offset corretto
function scrollElementBelowHeader(target, behavior = "smooth") {
  cancelPendingPageScroll();
  scrollElementBelowHeaderNow(target, behavior);
}

// Verifica se il layout è in modalità mobile
function isResponsiveConfiguratorLayout() {
  return window.matchMedia("(max-width: 1100px)").matches;
}

// Porta in vista il pannello dettaglio pianta
function scrollPlantDetailPanelIntoView(behavior = "smooth") {
  if (plantDetailScrollFrame) {
    window.cancelAnimationFrame(plantDetailScrollFrame);
  }
  plantDetailScrollFrame = window.requestAnimationFrame(() => {
    plantDetailScrollFrame = 0;
    scrollElementBelowHeader(
      document.getElementById("panelPlantDetail"),
      behavior
    );
  });
}

function cancelPlantDetailScroll() {
  if (!plantDetailScrollFrame) return;
  window.cancelAnimationFrame(plantDetailScrollFrame);
  plantDetailScrollFrame = 0;
}

function cancelPlantDetailReturnScroll() {
  if (plantDetailReturnScrollFrame) {
    window.cancelAnimationFrame(plantDetailReturnScrollFrame);
    plantDetailReturnScrollFrame = 0;
  }
  if (!plantDetailReturnScrollTimer) return;
  window.clearTimeout(plantDetailReturnScrollTimer);
  plantDetailReturnScrollTimer = 0;
}

function restorePlantDetailScroll(position) {
  if (!position) return;
  cancelPlantDetailReturnScroll();
  plantDetailReturnScrollFrame = window.requestAnimationFrame(() => {
    plantDetailReturnScrollFrame = window.requestAnimationFrame(() => {
      plantDetailReturnScrollFrame = 0;
      plantDetailReturnScrollTimer = window.setTimeout(() => {
        plantDetailReturnScrollTimer = 0;
        window.scrollTo({
          left: position.left,
          top: position.top,
          behavior: "auto"
        });
        document.documentElement.style.removeProperty("overflow-anchor");
      }, 120);
    });
  });
}

// Porta in vista l'immagine SVG della serra
function scrollGreenhouseImageIntoView(behavior = "auto") {
  const target =
    document.querySelector(".stage .scene-wrap") ||
    document.getElementById("scene") ||
    document.querySelector(".stage");
  scrollElementBelowHeader(target, behavior);
}

// Destinazione di scroll dell'area di lavoro.
function scrollStageIntoView(behavior = "auto") {
  const target =
    document.querySelector(".stage") ||
    document.querySelector(".stage .scene-wrap") ||
    document.getElementById("scene");
  scrollElementBelowHeader(target, behavior);
}

// Chiude il pannello impostazioni dopo l'autocompletamento
function collapseSettingsPanelAfterAutoPlan(options = {}) {
  const { scroll = true } = options;
  const panel = document.getElementById("panelSettings");
  // Esperto non usa autoPlan: non collassare e non scrollare
  if (!panel || !state.autoPlan) return;
  setPanelCollapsed(panel, true);
  // Gestisce lo scroll in base al contesto dell'azione.
  if (!scroll) return;
  scheduleElementBelowHeader(
    () =>
      document.getElementById("journeyContext") ||
      document.querySelector(".stage .scene-wrap") ||
      document.getElementById("scene") ||
      document.querySelector(".stage"),
    "smooth"
  );
}

// Imposta lo stato aperto/chiuso di un pannello
function setPanelCollapsed(panelOrId, collapsed) {
  const panel =
    typeof panelOrId === "string"
      ? document.getElementById(panelOrId)
      : panelOrId;
  if (!panel) return;
  panel.classList.toggle("is-collapsed", Boolean(collapsed));
  const toggle = panel.querySelector(".panel-toggle");
  if (toggle) updatePanelToggle(toggle);
  syncColLeftLayout();
}

// Sincronizza la colonna sinistra con il profilo e i pannelli visibili.
function syncColLeftLayout() {
  const app = document.querySelector(".app");
  if (!app) return;
  const panelSettings = document.getElementById("panelSettings");
  const presetBar = document.getElementById("presetBar");
  const noviceGuide = document.getElementById("noviceGuidePanel");
  const modeSection = panelSettings
    ? panelSettings.closest(".mode-section")
    : null;
  const settingsOpen = Boolean(
    panelSettings && !panelSettings.classList.contains("is-collapsed")
  );
  const presetVisible = Boolean(
    presetBar && getComputedStyle(presetBar).display !== "none"
  );
  const colEmpty = !settingsOpen && !presetVisible;
  const isNovice = state.livello === "novizio";
  const isIntermediate = state.livello === "intermedio";
  const isExpert = state.livello === "esperto";
  // Posiziona la guida in base al profilo.
  const showGuide = (isNovice && colEmpty) || isIntermediate || isExpert;
  if (noviceGuide) noviceGuide.hidden = !showGuide;
  // Esclude dal layout le sezioni vuote del profilo guidato.
  if (modeSection)
    modeSection.style.display = isNovice && showGuide ? "none" : "";
  app.classList.toggle("col-left-collapsed", colEmpty && !showGuide);
}

// Ricrea la guida rapida quando cambiano profilo utente o lingua attiva.
function syncQuickGuide() {
  const prefix =
    state.livello === "esperto"
      ? "expertGuide"
      : state.livello === "intermedio"
        ? "intermediateGuide"
        : "noviceGuide";
  const keys = ["Title", "Tag", "Step1", "Step2", "Step3", "Step4", "Step5"];
  keys.forEach((suffix) => {
    const element = document.getElementById(`quickGuide${suffix}`);
    if (element) element.textContent = tx(`${prefix}${suffix}`);
  });
}

// Apre o chiude il pannello personalizzazione colture
function setCustomizePanelCollapsed(collapsed) {
  setPanelCollapsed("panelCustomize", collapsed);
  updateVegListScrollAffordance();
}

// Adatta il pannello di personalizzazione al profilo utente.
function syncCustomizePanelForLivello() {
  setCustomizePanelCollapsed(state.livello !== "esperto");
}

// Apre il pannello colture e scrolla con evidenziazione
function openCustomizePanelAndFocus(options = {}) {
  const { scroll = true } = options;
  const crops = document.getElementById("panelCustomize");
  if (!crops) return;
  setCustomizePanelCollapsed(false);
  if (!isResponsiveConfiguratorLayout() || !scroll) {
    crops.classList.add("is-focus-pulse");
    window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    return;
  }
  scheduleElementBelowHeader(crops, "smooth", {
    after: () => {
      crops.classList.add("is-focus-pulse");
      window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    }
  });
}

// Apre il pannello impostazioni e mette a fuoco le dimensioni
function openSettingsPanelAndFocusDimensions() {
  const panel = document.getElementById("panelSettings");
  if (!panel) return;
  setPanelCollapsed(panel, false);
  const focusAndHighlight = () => {
    const inW = document.getElementById("inW");
    if (inW) {
      inW.focus({ preventScroll: true });
      panel.classList.add("guided-highlight");
      window.setTimeout(() => panel.classList.remove("guided-highlight"), 1600);
    }
  };
  if (!isResponsiveConfiguratorLayout()) {
    focusAndHighlight();
    return;
  }
  scheduleElementBelowHeader(panel, "smooth", {
    after: focusAndHighlight
  });
}

const CONFIG_DETAIL_TABS = [
  "overview",
  "cultivation",
  "calendar",
  "care",
  "harvest"
];

// Recupera una stringa dalla i18n della home
function detailText(key, vars = {}) {
  const dict = window.SERRA_I18N?.index || {};
  let value = dict[state.lang]?.[key] || dict.it?.[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });
  return value;
}

// Attiva una tab nel pannello dettaglio pianta
function setConfigDetailTab(tab, moveFocus = false) {
  if (!CONFIG_DETAIL_TABS.includes(tab)) tab = "overview";
  document
    .querySelectorAll("#pdpContent [data-detail-tab]")
    .forEach((button) => {
      const active = button.dataset.detailTab === tab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && moveFocus) button.focus({ preventScroll: true });
    });
  document
    .querySelectorAll("#pdpContent [data-detail-panel]")
    .forEach((panel) => {
      const active = panel.dataset.detailPanel === tab;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
      if (active) panel.scrollTo({ top: 0, behavior: "instant" });
    });
}

// Gestisce la navigazione da tastiera tra le tab dettaglio
function handleConfigDetailTabKey(event, control) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = CONFIG_DETAIL_TABS.indexOf(control.dataset.detailTab);
  let next = current;
  if (event.key === "ArrowRight")
    next = (current + 1) % CONFIG_DETAIL_TABS.length;
  if (event.key === "ArrowLeft")
    next =
      (current - 1 + CONFIG_DETAIL_TABS.length) % CONFIG_DETAIL_TABS.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = CONFIG_DETAIL_TABS.length - 1;
  setConfigDetailTab(CONFIG_DETAIL_TABS[next], true);
}

// Genera il SVG dell'icona per una tab dettaglio
function configDetailTabIcon(tab) {
  const paths = {
    overview:
      '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    cultivation:
      '<path d="M12 22V12M12 12C8 12 5 9 5 5c4 0 7 3 7 7zM12 12c4 0 7-3 7-7-4 0-7 3-7 7z"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
    care: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11zM9 12l2 2 4-5"/>',
    harvest: '<path d="M4 10h16l-2 10H6zM8 10l4-7 4 7M9 14v2M15 14v2"/>'
  };
  return `<span class="detail-tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${paths[tab]}</svg></span>`;
}

// Costruisce il profilo tecnico per le schede coltivazione e cura
function configDetailProfile(p, sow) {
  const ro = state.lang === "ro";
  const shared = window.SERRA_PLANT_CONTENT?.detailProfile(p, sow, state.lang);
  if (shared) {
    return {
      cultivation: [
        [detailText("detail.tech_soil"), shared.soil],
        [
          detailText("detail.tech_exposure"),
          shared.exposure || (p.sole === "pieno" ? tx("fullSun") : tx("halfShade"))
        ],
        [detailText("detail.tech_irrigation"), shared.irrigation],
        [detailText("detail.tech_feeding"), shared.feeding]
      ],
      care: [
        [detailText("detail.tech_maintenance"), shared.maintenance],
        [detailText("detail.tech_prevention"), shared.prevention]
      ],
      harvest: [
        [detailText("detail.tech_maturity"), harvestValue(p)],
        [detailText("detail.tech_harvest_method"), shared.harvestMethod],
        [detailText("detail.tech_yield"), yieldLabel(p.resa)],
        [detailText("detail.tech_storage"), shared.storage],
        [detailText("detail.tech_rotation"), shared.rotation]
      ]
    };
  }
  const type =
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia";
  const soil = ro
    ? {
        frutto:
          "Sol profund, fertil și bine drenat, îmbogățit cu compost matur.",
        foglia:
          "Sol afânat, bogat în materie organică și uniform umed, fără băltire.",
        radice:
          "Sol fin, afânat și fără pietre; evită gunoiul de grajd proaspăt.",
        aromatica:
          "Substrat aerat și drenat; fertilizarea excesivă reduce aroma.",
        legume: "Sol drenat și moderat fertil, fără exces de azot."
      }
    : {
        frutto:
          "Terreno profondo, fertile e ben drenato, arricchito con compost maturo.",
        foglia:
          "Terreno soffice, ricco di sostanza organica e uniformemente umido, senza ristagni.",
        radice: "Terreno fine, sciolto e privo di sassi; evita letame fresco.",
        aromatica:
          "Substrato arioso e drenante; concimazioni eccessive riducono l'aroma.",
        legume:
          "Terreno drenato e moderatamente fertile, senza eccessi di azoto."
      };
  const care = ro
    ? {
        frutto:
          "Susține plantele înalte, aerisește frunzișul și elimină frunzele bolnave.",
        foglia:
          "Rărește la timp, menține solul curat și recoltează fără a răni centrul plantei.",
        radice:
          "Rărește devreme și evită lucrările adânci care pot răni rădăcinile.",
        aromatica:
          "Ciupirea vârfurilor menține planta compactă și prelungește producția.",
        legume:
          "Oferă suport soiurilor cățărătoare și recoltează păstăile frecvent."
      }
    : {
        frutto:
          "Sostieni le piante alte, arieggia la chioma e rimuovi le foglie malate.",
        foglia:
          "Dirada per tempo, mantieni il suolo pulito e raccogli senza ferire il cuore.",
        radice:
          "Dirada presto ed evita lavorazioni profonde che possano ferire le radici.",
        aromatica:
          "Cimare gli apici mantiene la pianta compatta e prolunga la produzione.",
        legume:
          "Predisponi sostegni per le varietà rampicanti e raccogli spesso i baccelli."
      };
  const prevention = ro
    ? "Aerisește zilnic, udă dimineața la bază și îndepărtează imediat țesuturile bolnave."
    : "Arieggia ogni giorno, irriga al mattino alla base e rimuovi subito i tessuti malati.";
  const harvest = ro
    ? "Recoltează la maturitate, cu unelte curate, fără a răni planta. Consumă sau răcește produsul cât mai repede."
    : "Raccogli a maturazione con utensili puliti, senza ferire la pianta. Consuma o raffredda il prodotto rapidamente.";
  return {
    cultivation: [
      [detailText("detail.tech_soil"), soil[type]],
      [
        detailText("detail.tech_exposure"),
        sow?.esposizione ||
          (p.sole === "pieno" ? tx("fullSun") : tx("halfShade"))
      ],
      [
        detailText("detail.tech_irrigation"),
        sow?.annaffiatura || waterLabel(p.acqua)
      ],
      [
        detailText("detail.tech_feeding"),
        ro
          ? "Folosește compost matur și evită excesele de îngrășământ."
          : "Usa compost maturo ed evita eccessi di fertilizzante."
      ]
    ],
    care: [
      [detailText("detail.tech_maintenance"), care[type]],
      [detailText("detail.tech_prevention"), prevention],
      [
        detailText("detail.tech_rotation"),
        ro
          ? "Nu replanta aceeași familie în același loc în ciclul următor."
          : "Non ripiantare la stessa famiglia nello stesso spazio nel ciclo successivo."
      ]
    ],
    harvest: [
      [detailText("detail.tech_maturity"), harvestValue(p)],
      [detailText("detail.tech_harvest_method"), harvest],
      [detailText("detail.tech_yield"), yieldLabel(p.resa)],
      [
        detailText("detail.tech_storage"),
        ro
          ? "Păstrează numai produse sănătoase, uscate și răcite rapid."
          : "Conserva solo prodotti sani, asciutti e raffreddati rapidamente."
      ]
    ]
  };
}

// Genera le card HTML delle schede tecniche
function renderConfigTechCards(items) {
  return items
    .map(
      ([title, text]) =>
        `<article class="detail-tech-card"><h4>${title}</h4><p>${text}</p></article>`
    )
    .join("");
}

const CONFIG_DISEASE_GROUPS = {
  solanaceae: ["late", "alternaria", "botrytis"],
  cucurbits: ["powdery", "downy", "botrytis"],
  brassicas: ["downy", "alternaria", "clubroot"],
  alliums: ["downy", "white_rot", "rust"],
  apiaceae: ["cercospora", "sclerotinia", "powdery"],
  leafy: ["downy", "botrytis", "sclerotinia"],
  chenopods: ["downy", "cercospora", "damping"],
  legumes: ["anthracnose", "rust", "powdery"],
  herbs: ["powdery", "root_rot", "rust"],
  basil: ["basil_downy", "fusarium", "botrytis"],
  strawberry: ["botrytis", "powdery", "root_rot"],
  other: ["powdery", "botrytis", "root_rot"]
};

// Determina il gruppo malattie della pianta per ID
function configDiseaseGroup(id) {
  const has = (ids) => ids.includes(id);
  if (
    has([
      "pomodoro",
      "peperone",
      "peperoncino",
      "melanzana",
      "patata",
      "tomatillo",
      "physalis"
    ])
  )
    return "solanaceae";
  if (has(["zucchina", "zucca", "cetriolo", "melone", "anguria", "cucamelon"]))
    return "cucurbits";
  if (
    has([
      "rucola",
      "cavolo",
      "verza",
      "broccolo",
      "cavolfiore",
      "cavolonero",
      "cavolorapa",
      "ravanello",
      "rafano",
      "pakchoi",
      "cavoletti",
      "rapa",
      "mizuna",
      "senape_foglia",
      "tatsoi",
      "cavolo_cinese",
      "daikon",
      "cavolo_rosso",
      "cavolo_navone",
      "broccolo_rapa"
    ])
  )
    return "brassicas";
  if (
    has([
      "cipolla",
      "aglio",
      "porro",
      "scalogno",
      "cipolla_rossa",
      "cipollotto",
      "erba_cipollina"
    ])
  )
    return "alliums";
  if (
    has([
      "carota",
      "finocchio",
      "prezzemolo",
      "coriandolo",
      "aneto",
      "sedano",
      "pastinaca",
      "radice_prezemolo",
      "sedano_rapa",
      "leustean"
    ])
  )
    return "apiaceae";
  if (has(["spinaci", "bietola", "barbabietola", "loboda"])) return "chenopods";
  if (
    has([
      "fagiolino",
      "fagiolo",
      "pisello",
      "fava",
      "soia_edamame",
      "cece",
      "lenticchia",
      "fagiolo_borlotto"
    ])
  )
    return "legumes";
  if (id === "basilico") return "basil";
  if (id === "fragola") return "strawberry";
  const plant = typeof BYID !== "undefined" ? BYID[id] : null;
  const type = plant
    ? plant.tipo || plant.arch
    : (typeof TIPO !== "undefined" && TIPO[id]) || "";
  if (type === "aromatica") return "herbs";
  if (type === "foglia") return "leafy";
  return "other";
}

// Restituisce il catalogo malattie nella lingua corrente
function configDiseaseCatalog() {
  const ro = state.lang === "ro";
  const base = {
    late: [
      "Peronospora",
      "Macchie scure e muffa chiara sotto le foglie.",
      "Rimuovi le parti colpite, evita di bagnare le foglie e arieggia."
    ],
    alternaria: [
      "Alternariosi",
      "Macchie brune concentriche sulle foglie più vecchie.",
      "Elimina residui e foglie infette, irriga alla base e pratica la rotazione."
    ],
    botrytis: [
      "Muffa grigia",
      "Tessuti molli ricoperti da una polvere grigia.",
      "Asporta le parti colpite, riduci condensa e umidità e dirada la chioma."
    ],
    powdery: [
      "Oidio",
      "Patina bianca farinosa e progressivo ingiallimento.",
      "Rimuovi le foglie colpite, migliora l'aria e usa solo prodotti autorizzati."
    ],
    downy: [
      "Peronospora",
      "Chiazze gialle sopra e muffa grigiastra sotto le foglie.",
      "Irriga al mattino alla base, elimina le foglie malate e arieggia."
    ],
    clubroot: [
      "Ernia delle crucifere",
      "Radici gonfie e pianta che appassisce nelle ore calde.",
      "Rimuovi la pianta con le radici, migliora drenaggio e rotazione."
    ],
    white_rot: [
      "Marciume bianco",
      "Ingiallimento e feltro bianco alla base.",
      "Elimina pianta e terreno aderente; non ripiantare alli nello stesso suolo."
    ],
    rust: [
      "Ruggine",
      "Pustole arancioni o brune sotto le foglie.",
      "Elimina le foglie colpite, arieggia e non eccedere con azoto."
    ],
    cercospora: [
      "Cercosporiosi",
      "Piccole macchie con centro chiaro e bordo scuro.",
      "Rimuovi residui, non bagnare le foglie e aumenta la distanza."
    ],
    sclerotinia: [
      "Sclerotinia",
      "Marciume acquoso al colletto e muffa bianca cotonosa.",
      "Rimuovi completamente la pianta e riduci umidità e densità."
    ],
    damping: [
      "Moria delle piantine",
      "Piantine che collassano con colletto scuro e sottile.",
      "Usa substrato pulito, semina meno fitta e non saturare il terriccio."
    ],
    anthracnose: [
      "Antracnosi",
      "Lesioni scure e infossate su foglie, steli o baccelli.",
      "Rimuovi le parti malate, usa seme sano e ruota le leguminose."
    ],
    root_rot: [
      "Marciume radicale",
      "Appassimento con terreno umido e radici brune e molli.",
      "Riduci acqua, migliora drenaggio ed elimina le piante gravi."
    ],
    basil_downy: [
      "Peronospora del basilico",
      "Ingiallimento tra le nervature e muffa scura sotto le foglie.",
      "Elimina le piante colpite, irriga alla base e arieggia."
    ],
    fusarium: [
      "Fusariosi",
      "Ingiallimento, avvizzimento e vasi interni bruni.",
      "Rimuovi la pianta, rinnova il substrato e usa varietà resistenti."
    ]
  };
  if (!ro) return base;
  const translated = {
    late: [
      "Mană",
      "Pete întunecate și puf deschis pe dosul frunzelor.",
      "Îndepărtează părțile afectate, nu uda frunzișul și aerisește."
    ],
    alternaria: [
      "Alternarioză",
      "Pete brune concentrice pe frunzele bătrâne.",
      "Elimină resturile bolnave, udă la bază și rotește culturile."
    ],
    botrytis: [
      "Putregai cenușiu",
      "Țesuturi moi acoperite cu pulbere cenușie.",
      "Îndepărtează părțile afectate și reduce condensul și umiditatea."
    ],
    powdery: [
      "Făinare",
      "Depunere albă făinoasă și îngălbenire.",
      "Elimină frunzele bolnave, aerisește și folosește doar produse autorizate."
    ],
    downy: [
      "Mană",
      "Pete galbene deasupra și puf cenușiu sub frunze.",
      "Udă dimineața la bază, elimină frunzele bolnave și aerisește."
    ],
    clubroot: [
      "Hernia rădăcinilor",
      "Rădăcini umflate și ofilire la căldură.",
      "Scoate planta cu rădăcini și îmbunătățește drenajul și rotația."
    ],
    white_rot: [
      "Putregai alb",
      "Îngălbenire și pâslă albă la bază.",
      "Elimină planta și solul lipit; nu replanta Allium în același loc."
    ],
    rust: [
      "Rugină",
      "Pustule portocalii sau brune sub frunze.",
      "Elimină frunzele afectate, aerisește și limitează azotul."
    ],
    cercospora: [
      "Cercosporioză",
      "Pete mici cu centru deschis și margine închisă.",
      "Elimină resturile, nu uda frunzișul și mărește distanța."
    ],
    sclerotinia: [
      "Sclerotinia",
      "Putregai apos la colet și mucegai alb vată.",
      "Elimină complet planta și redu umiditatea și densitatea."
    ],
    damping: [
      "Căderea plăntuțelor",
      "Plăntuțe căzute cu colet subțire și închis.",
      "Folosește substrat curat, seamănă rar și nu îmbiba solul."
    ],
    anthracnose: [
      "Antracnoză",
      "Leziuni întunecate și adâncite pe frunze sau păstăi.",
      "Îndepărtează părțile bolnave, folosește sămânță sănătoasă și rotește."
    ],
    root_rot: [
      "Putregai radicular",
      "Ofilire în sol umed și rădăcini brune, moi.",
      "Redu udarea, îmbunătățește drenajul și elimină plantele grav afectate."
    ],
    basil_downy: [
      "Mana busuiocului",
      "Îngălbenire între nervuri și puf închis sub frunze.",
      "Elimină plantele bolnave, udă la bază și aerisește."
    ],
    fusarium: [
      "Fuzarioză",
      "Îngălbenire, ofilire și vase interne brune.",
      "Elimină planta, schimbă substratul și folosește soiuri rezistente."
    ]
  };
  return translated;
}

// Filtra le malattie rilevanti per la pianta
function configDiseasesForPlant(p) {
  const catalog = configDiseaseCatalog();
  return CONFIG_DISEASE_GROUPS[configDiseaseGroup(p.id)]
    .map((key) => catalog[key])
    .filter(Boolean);
}

// Genera il blocco HTML delle malattie nella scheda pianta
function renderConfigDiseases(p) {
  const diseases = configDiseasesForPlant(p);
  return `<details class="detail-diseases">
    <summary class="detail-diseases-head"><div><h3>${detailText("detail.diseases_title")}</h3><p>${detailText("detail.diseases_subtitle")}</p></div><span class="detail-diseases-head-actions"><span class="detail-diseases-count">${detailText("detail.diseases_count", { count: diseases.length })}</span><span class="detail-diseases-chevron" aria-hidden="true">▾</span></span></summary>
    <div class="detail-disease-list">${diseases.map((d) => `<details class="detail-disease-card"><summary><span class="detail-disease-marker"></span><span>${d[0]}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${detailText("detail.disease_symptoms")}</b><p>${d[1]}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${detailText("detail.disease_action")}</b><p>${d[2]}</p></div></div></details>`).join("")}</div>
    <p class="detail-treatment-note">${detailText("detail.treatment_note")}</p>
  </details>`;
}

const CONFIG_PEST_GROUPS = {
  solanaceae: ["aphids", "whiteflies", "mites"],
  cucurbits: ["aphids", "whiteflies", "mites"],
  brassicas: ["flea", "caterpillars", "aphids"],
  alliums: ["thrips", "onion_fly", "leafminers"],
  apiaceae: ["carrot_fly", "aphids", "leafminers"],
  leafy: ["flea", "slugs", "aphids"],
  chenopods: ["leafminers", "aphids", "flea"],
  legumes: ["aphids", "weevils", "mites"],
  herbs: ["aphids", "whiteflies", "mites"],
  basil: ["aphids", "thrips", "slugs"],
  strawberry: ["mites", "aphids", "slugs"],
  other: ["aphids", "slugs", "thrips"]
};

// Restituisce il catalogo parassiti nella lingua corrente
function configPestCatalog() {
  if (state.lang === "ro")
    return {
      aphids: [
        "Afide",
        "Colonii pe lăstari, frunze răsucite și secreții lipicioase.",
        "Spală focarele mici, taie vârfurile foarte atacate și folosește săpun moale autorizat dacă persistă."
      ],
      whiteflies: [
        "Musculița albă",
        "Insecte albe care zboară la atingere și frunze lipicioase, galbene.",
        "Folosește capcane galbene, aspiră adulții dimineața și elimină frunzele grav infestate."
      ],
      mites: [
        "Acarianul roșu",
        "Puncte galbene și pânze fine sub frunze, mai ales cu aer cald și uscat.",
        "Spală dosul frunzelor, elimină focarele și introdu acarieni prădători dacă sunt disponibili."
      ],
      flea: [
        "Purici de pământ (altice)",
        "Gândăcei mici, adesea negri, care sar și fac multe găuri rotunde.",
        "Folosește plasă fină pe plantele tinere, elimină buruienile crucifere și menține solul uniform umed."
      ],
      caterpillars: [
        "Omizi",
        "Găuri neregulate, margini roase și excremente întunecate.",
        "Îndepărtează manual, folosește plasă și doar la atac confirmat Bacillus thuringiensis autorizat."
      ],
      thrips: [
        "Trips",
        "Dungi argintii, puncte negre și frunze deformate.",
        "Folosește capcane albastre, elimină părțile atacate și evită aerul prea uscat."
      ],
      onion_fly: [
        "Musca cepei",
        "Îngălbenire și larve albe în bulb sau la bază.",
        "Scoate plantele atacate, folosește plasă fină și rotește culturile de Allium."
      ],
      leafminers: [
        "Minatori foliari",
        "Galerii deschise și șerpuitoare în frunză.",
        "Elimină frunzele cu galerii înainte de ieșirea larvei și folosește plasă fină."
      ],
      carrot_fly: [
        "Musca morcovului",
        "Frunziș roșiatic și galerii ruginii în rădăcini.",
        "Protejează cu plasă fină, îndepărtează resturile după rărire și rotește cultura."
      ],
      slugs: [
        "Limacși și melci",
        "Găuri mari neregulate și urme lucioase de mucus.",
        "Culege seara, elimină ascunzătorile și folosește doar momeli autorizate cu fosfat feric."
      ],
      weevils: [
        "Gărgărițe",
        "Margini ciupite și semințe sau păstăi perforate.",
        "Îndepărtează adulții și semințele infestate, curăță resturile și rotește cultura."
      ]
    };
  return {
    aphids: [
      "Afidi",
      "Colonie su germogli, foglie arricciate e melata appiccicosa.",
      "Lava i piccoli focolai, taglia gli apici molto colpiti e usa sapone molle autorizzato se persistono."
    ],
    whiteflies: [
      "Mosca bianca",
      "Insetti bianchi che volano al tocco e foglie appiccicose e gialle.",
      "Usa trappole gialle, aspira gli adulti al mattino e rimuovi le foglie molto infestate."
    ],
    mites: [
      "Ragnetto rosso",
      "Puntinatura gialla e ragnatele sottili sotto le foglie, soprattutto con caldo secco.",
      "Lava la pagina inferiore, elimina i focolai e introduci acari predatori se disponibili."
    ],
    flea: [
      "Altiche",
      "Piccoli coleotteri spesso neri che saltano e producono molti forellini rotondi.",
      "Usa rete fine sulle piante giovani, elimina le infestanti crucifere e mantieni il suolo uniformemente umido."
    ],
    caterpillars: [
      "Bruchi e cavolaie",
      "Fori irregolari, margini rosicchiati ed escrementi scuri.",
      "Rimuovi a mano, usa rete e solo con attacco confermato Bacillus thuringiensis autorizzato."
    ],
    thrips: [
      "Tripidi",
      "Striature argentate, puntini neri e foglie deformate.",
      "Usa trappole blu, elimina le parti colpite ed evita aria eccessivamente secca."
    ],
    onion_fly: [
      "Mosca della cipolla",
      "Ingiallimento e larve bianche nel bulbo o alla base.",
      "Rimuovi le piante attaccate, usa rete fine e ruota le colture di alli."
    ],
    leafminers: [
      "Minatori fogliari",
      "Gallerie chiare e sinuose scavate nella foglia.",
      "Elimina le foglie minate prima che la larva esca e usa rete fine."
    ],
    carrot_fly: [
      "Mosca della carota",
      "Foglie rossastre e gallerie color ruggine nelle radici.",
      "Proteggi con rete fine, rimuovi i residui del diradamento e ruota la coltura."
    ],
    slugs: [
      "Limacce e chiocciole",
      "Grandi fori irregolari e tracce lucide di bava.",
      "Raccogli la sera, elimina i rifugi e usa solo esche autorizzate al fosfato ferrico."
    ],
    weevils: [
      "Tonchi e oziorrinchi",
      "Margini intaccati e semi o baccelli perforati.",
      "Rimuovi adulti e semi infestati, pulisci i residui e ruota la coltura."
    ]
  };
}

// Restituisce i prodotti specifici per i parassiti della pianta
function configTargetedPestProducts(p) {
  const ro = state.lang === "ro";
  const group = configDiseaseGroup(p.id);
  const plans = ro
    ? {
        solanaceae: {
          aphids: "Săpun potasic pe colonii; flonicamid la atac puternic.",
          whiteflies:
            "Beauveria bassiana pe nimfe; pyriproxyfen pentru întreruperea ciclului.",
          mites:
            "Abamectin pe forme mobile, hexythiazox pe ouă sau Phytoseiulus persimilis."
        },
        cucurbits: {
          aphids:
            "Flonicamid pentru oprirea hrănirii; săpun potasic pe focare mici.",
          whiteflies: "Beauveria bassiana și săpun potasic pe nimfele expuse.",
          mites:
            "Hexythiazox pe ouă, abamectin pe forme mobile sau Phytoseiulus persimilis."
        },
        brassicas: {
          flea: "Spinosad ori piretrine pe adulți activi, aplicate devreme pe plante tinere.",
          caterpillars:
            "Bacillus thuringiensis kurstaki pe omizi mici; spinosad pe larve mai mari.",
          aphids: "Flonicamid în rozete; săpun potasic pe coloniile expuse."
        },
        alliums: {
          thrips:
            "Spinosad în teaca frunzelor; Beauveria bassiana la umiditate adecvată.",
          onion_fly: "Steinernema feltiae în sol umed contra larvelor.",
          leafminers: "Spinosad la primele galerii; cyromazine pe larve tinere."
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae în sol contra larvelor; piretrine pe adulți în zbor.",
          aphids: "Săpun potasic; flonicamid dacă frunzele sunt răsucite.",
          leafminers: "Spinosad la începutul galeriilor."
        },
        leafy: {
          flea: "Piretrine pe adulți; spinosad dacă paguba continuă.",
          slugs: "Fosfat feric granular pe sol.",
          aphids: "Săpun potasic; piretrine numai pentru colonii persistente."
        },
        chenopods: {
          leafminers: "Spinosad la primele galerii.",
          aphids: "Săpun potasic; flonicamid dacă frunzele se deformează.",
          flea: "Piretrine pe adulți; spinosad pe atac persistent."
        },
        legumes: {
          aphids:
            "Flonicamid pe vârfuri și flori; săpun potasic pe focare mici.",
          weevils: "Piretrine pe adulți; Heterorhabditis bacteriophora în sol.",
          mites: "Abamectin sau Phytoseiulus persimilis."
        },
        herbs: {
          aphids: "Săpun potasic; piretrine numai la atac puternic.",
          whiteflies: "Beauveria bassiana și săpun potasic pe nimfe.",
          mites: "Phytoseiulus persimilis sau ulei horticol ușor sub frunze."
        },
        basil: {
          aphids: "Săpun potasic pe vârfuri, apoi clătire înainte de consum.",
          thrips: "Spinosad sau Beauveria bassiana în vârfurile tinere.",
          slugs: "Fosfat feric pe sol, fără contact cu frunzele."
        },
        strawberry: {
          mites: "Phytoseiulus persimilis; bifenazate dacă populația crește.",
          aphids:
            "Săpun potasic înainte de înflorire; flonicamid la atac persistent.",
          slugs: "Fosfat feric între plante, fără contact cu fructele."
        },
        other: {
          aphids: "Săpun potasic; flonicamid la atac persistent.",
          slugs: "Fosfat feric granular pe sol.",
          thrips: "Spinosad sau Beauveria bassiana."
        }
      }
    : {
        solanaceae: {
          aphids: "Sapone molle sulle colonie; flonicamid con attacco forte.",
          whiteflies:
            "Beauveria bassiana sulle neanidi; pyriproxyfen per interrompere il ciclo.",
          mites:
            "Abamectina sulle forme mobili, hexythiazox sulle uova o Phytoseiulus persimilis."
        },
        cucurbits: {
          aphids:
            "Flonicamid per bloccare l'alimentazione; sapone molle sui piccoli focolai.",
          whiteflies:
            "Beauveria bassiana e sapone molle sulle neanidi esposte.",
          mites:
            "Hexythiazox sulle uova, abamectina sulle forme mobili o Phytoseiulus persimilis."
        },
        brassicas: {
          flea: "Spinosad o piretrine sugli adulti attivi, applicati presto sulle piante giovani.",
          caterpillars:
            "Bacillus thuringiensis kurstaki sui bruchi piccoli; spinosad sulle larve grandi.",
          aphids:
            "Flonicamid nelle rosette; sapone molle sulle colonie esposte."
        },
        alliums: {
          thrips:
            "Spinosad nella guaina fogliare; Beauveria bassiana con umidità adeguata.",
          onion_fly: "Steinernema feltiae nel terreno umido contro le larve.",
          leafminers:
            "Spinosad alle prime mine; cyromazine sulle larve giovani."
        },
        apiaceae: {
          carrot_fly:
            "Steinernema feltiae nel terreno contro le larve; piretrine sugli adulti in volo.",
          aphids: "Sapone molle; flonicamid se le foglie sono arricciate.",
          leafminers: "Spinosad all'inizio delle gallerie."
        },
        leafy: {
          flea: "Piretrine sugli adulti; spinosad se il danno continua.",
          slugs: "Fosfato ferrico granulare sul terreno.",
          aphids: "Sapone molle; piretrine solo per colonie persistenti."
        },
        chenopods: {
          leafminers: "Spinosad alle prime gallerie.",
          aphids: "Sapone molle; flonicamid se le foglie si deformano.",
          flea: "Piretrine sugli adulti; spinosad su attacco persistente."
        },
        legumes: {
          aphids:
            "Flonicamid su apici e fiori; sapone molle sui piccoli focolai.",
          weevils:
            "Piretrine sugli adulti; Heterorhabditis bacteriophora nel terreno.",
          mites: "Abamectina o Phytoseiulus persimilis."
        },
        herbs: {
          aphids: "Sapone molle; piretrine solo con attacco forte.",
          whiteflies: "Beauveria bassiana e sapone molle sulle neanidi.",
          mites:
            "Phytoseiulus persimilis o olio orticolo leggero sotto le foglie."
        },
        basil: {
          aphids:
            "Sapone molle sui germogli, poi risciacquo prima del consumo.",
          thrips: "Spinosad o Beauveria bassiana nei germogli giovani.",
          slugs: "Fosfato ferrico sul terreno, senza contatto con le foglie."
        },
        strawberry: {
          mites:
            "Phytoseiulus persimilis; bifenazate se la popolazione cresce.",
          aphids:
            "Sapone molle prima della fioritura; flonicamid su attacco persistente.",
          slugs: "Fosfato ferrico tra le piante, senza contatto con i frutti."
        },
        other: {
          aphids: "Sapone molle; flonicamid su attacco persistente.",
          slugs: "Fosfato ferrico granulare sul terreno.",
          thrips: "Spinosad o Beauveria bassiana."
        }
      };
  const overrides = {
    rucola: {
      flea: ro
        ? "Pentru rucola: ulei de neem/azadiractină ca repelent și spinosad dacă găurile continuă pe frunzele noi."
        : "Per la rucola: olio di neem/azadiractina come repellente e spinosad se i fori continuano sulle foglie nuove."
    },
    pomodoro: {
      whiteflies: ro
        ? "Pentru tomate: Beauveria bassiana pe nimfe, Encarsia formosa pentru control continuu și pyriproxyfen dacă ciclul persistă."
        : "Per il pomodoro: Beauveria bassiana sulle neanidi, Encarsia formosa per il controllo continuo e pyriproxyfen se il ciclo persiste."
    },
    basilico: {
      thrips: ro
        ? "Pentru busuioc: Beauveria bassiana sau spinosad în vârfuri; evită uleiurile aproape de recoltare."
        : "Per il basilico: Beauveria bassiana o spinosad nei germogli; evita oli vicino alla raccolta."
    },
    fragola: {
      mites: ro
        ? "Pentru căpșun: Phytoseiulus persimilis la debut; bifenazate dacă apar pânze."
        : "Per la fragola: Phytoseiulus persimilis all'inizio; bifenazate se compaiono ragnatele."
    }
  };
  return {
    ...(plans.other || {}),
    ...(plans[group] || {}),
    ...(overrides[p.id] || {})
  };
}

// Genera il blocco HTML dei parassiti nella scheda pianta
function renderConfigPests(p) {
  const catalog = configPestCatalog();
  const products = configTargetedPestProducts(p);
  const keys =
    CONFIG_PEST_GROUPS[configDiseaseGroup(p.id)] || CONFIG_PEST_GROUPS.other;
  const pests = keys.map((key) => catalog[key]).filter(Boolean);
  return `<details class="detail-diseases detail-pests"><summary class="detail-diseases-head"><div><h3>${detailText("detail.pests_title")}</h3><p>${detailText("detail.pests_subtitle")}</p></div><span class="detail-diseases-head-actions"><span class="detail-diseases-count">${detailText("detail.pests_count", { count: pests.length })}</span><span class="detail-diseases-chevron" aria-hidden="true">▾</span></span></summary><div class="detail-disease-list">${pests
    .map((item, index) => {
      const key = keys[index];
      return `<details class="detail-disease-card"><summary><span class="detail-disease-marker"></span><span>${item[0]}</span><span class="detail-disease-toggle" aria-hidden="true">⌄</span></summary><div class="detail-disease-body"><div class="detail-disease-info"><b>${detailText("detail.pest_signs")}</b><p>${item[1]}</p></div><div class="detail-disease-info detail-disease-info--action"><b>${detailText("detail.pest_action")}</b><p>${item[2]}</p></div><div class="detail-disease-info detail-disease-info--products"><b>${detailText("detail.pest_products")} · ${plantText(p, "nome")}</b><p>${products[key]}</p></div></div></details>`;
    })
    .join(
      ""
    )}</div><p class="detail-treatment-note">${detailText("detail.pest_note")}</p></details>`;
}

// Apertura pannelli
function getPlantDetailReturnScroll(panel) {
  if (!panel) return null;
  const left = Number(panel.dataset.returnScrollLeft);
  const top = Number(panel.dataset.returnScrollTop);
  if (!Number.isFinite(left) || !Number.isFinite(top)) return null;
  return { left, top };
}

// Apre il pannello dettaglio della pianta selezionata
function openPlantDetailPanel(originScroll = null) {
  const panel = document.getElementById("panelPlantDetail");
  const settings = document.getElementById("panelSettings");
  if (!panel) return;
  if (!isResponsiveConfiguratorLayout() && panel.hidden) {
    const returnScroll = originScroll || {
      left: window.scrollX,
      top: window.scrollY
    };
    panel.dataset.returnScrollLeft = String(returnScroll.left);
    panel.dataset.returnScrollTop = String(returnScroll.top);
    document.documentElement.style.overflowAnchor = "none";
  }
  renderPlantDetailPanel();
  panel.hidden = false;
  if (settings && isResponsiveConfiguratorLayout())
    setPanelCollapsed(settings, true);
  scrollPlantDetailPanelIntoView("smooth");
}

// Chiude il pannello dettaglio e ripristina la selezione
function closePlantDetailPanel() {
  const panel = document.getElementById("panelPlantDetail");
  const settings = document.getElementById("panelSettings");
  const selectedBedIndex = state.selected;
  const desktopReturnScroll = !isResponsiveConfiguratorLayout()
    ? getPlantDetailReturnScroll(panel)
    : null;
  const keepGreenhouseRow =
    isResponsiveConfiguratorLayout() && panel && !panel.hidden;
  cancelPlantDetailScroll();
  cancelPlantDetailReturnScroll();
  if (desktopReturnScroll) {
    // Ferma lo smooth-scroll dell'apertura, se la chiusura è molto rapida.
    cancelPendingPageScroll();
    window.scrollTo({
      left: window.scrollX,
      top: window.scrollY,
      behavior: "instant"
    });
  }
  if (panel) {
    delete panel.dataset.returnScrollLeft;
    delete panel.dataset.returnScrollTop;
  }
  if (panel) panel.hidden = true;
  if (settings && isResponsiveConfiguratorLayout())
    setPanelCollapsed(settings, false);
  state.selected = -1;
  render();
  if (desktopReturnScroll && selectedBedIndex >= 0) {
    document
      .querySelector(`.bedhit[data-bed="${selectedBedIndex}"]`)
      ?.focus({ preventScroll: true });
  }
  if (keepGreenhouseRow) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => scrollStageIntoView("auto"))
    );
    document.documentElement.style.removeProperty("overflow-anchor");
  } else {
    if (!desktopReturnScroll)
      document.documentElement.style.removeProperty("overflow-anchor");
    restorePlantDetailScroll(desktopReturnScroll);
  }
}

// Costruisce la scheda dettagliata della pianta selezionata nel catalogo.
function renderPlantDetailPanel(initialTab = "overview") {
  const container = document.getElementById("pdpContent");
  if (!container) return;
  if (state.selected < 0 || state.selected >= state.beds.length) {
    container.innerHTML = "";
    return;
  }
  const b = state.beds[state.selected];
  const p = BYID[b.plantId];
  const resaTot = b.count * p.resa;
  // Le dimensioni appartengono al layout calcolato, non al record della coltura:
  // in questo modo seguono sempre il motore di riempimento corrente.
  const bedGeometry = computeLayout().beds[state.selected];
  const bedMeasureFormatter = new Intl.NumberFormat(
    state.lang === "ro" ? "ro-RO" : "it-IT",
    { maximumFractionDigits: 2 }
  );
  const formatBedMeasure = (centimetres) =>
    `${bedMeasureFormatter.format(centimetres / 100)} m`;
  const bedWidth = formatBedMeasure(bedGeometry.w);
  const bedLength = formatBedMeasure(bedGeometry.h);
  // Logica di risoluzione foto condivisa: vedi assets/js/shared/plant-photo.js
  let photoSrc = window.resolvePlantPhoto(p, p.id);
  // Usa la versione ad alta risoluzione per la foto di dettaglio.
  let heroPhotoSrc = photoSrc;
  const heroMatch = /^assets\/img\/photo\/([^/]+)$/.exec(photoSrc);
  if (heroMatch) {
    heroPhotoSrc = `assets/img/photo/large/${heroMatch[1]}`;
  }
  const desc =
    window.SERRA_PLANT_CONTENT?.compactDescription(p, state.lang) ||
    (PLANT_DESC[state.lang] || PLANT_DESC.it)[p.id] ||
    "";
  const months = [...effectiveMonths(p)]
    .sort((a, b) => a - b)
    .map((m) => monthName(m).slice(0, 3))
    .join(", ");
  const amiche = p.amiche.map(plantNameById).filter(Boolean);
  const sow = localizedSowingGuide(p);
  const nota =
    window.SERRA_PLANT_CONTENT?.cultivationNote(p, state.lang) || p.nota || "";
  const distRow = p.d;
  const distBetween = p.dr || p.d;

  const diffLevel = DIFFICULTY[p.id] || 2;
  const diffLabel =
    diffLevel === 1
      ? tx("diffEasy")
      : diffLevel === 2
        ? tx("diffMedium")
        : tx("diffHard");
  const diffClass =
    diffLevel === 1
      ? "diff-easy"
      : diffLevel === 2
        ? "diff-medium"
        : "diff-hard";

  const nemiche = p.nemiche ? p.nemiche.map(plantNameById).filter(Boolean) : [];

  const allMonths = [...effectiveMonths(p)].sort((a, b) => a - b);
  const activeMonthsLabel = allMonths
    .map((m) => monthName(m).slice(0, 3))
    .join(", ");
  const monthLegend =
    state.lang === "ro"
      ? {
          title: tx("sowingZone"),
          available: tx("monthAvailable"),
          selected: tx("monthSelected"),
          outside: tx("monthOutside")
        }
      : {
          title: tx("sowingZone"),
          available: tx("monthAvailable"),
          selected: tx("monthSelected"),
          outside: tx("monthOutside")
        };
  const monthSegs = Array.from({ length: 12 }, (_, i) => {
    const on = effectiveMonths(p).has(i + 1);
    const cur = i + 1 === state.mese;
    const title = `${monthName(i + 1)} · ${on ? monthLegend.available : monthLegend.outside}${cur ? ` · ${monthLegend.selected}` : ""}`;
    return `<div class="pdp-month-seg${on ? " active" : ""}${cur ? " current" : ""}" title="${title}" aria-label="${title}"></div>`;
  }).join("");

  const tipoEntry = CAT_ORDER.find((c) => c.ids.includes(p.id));
  const tipoLabel = tipoEntry ? tx(`vegCat_${tipoEntry.key}`) : "";

  const soleIcon = p.sole === "pieno" ? "☀️" : "🌤️";
  const soleLabel = p.sole === "pieno" ? tx("fullSun") : tx("halfShade");
  const acquaIcon =
    p.acqua === "alta" ? "💧💧💧" : p.acqua === "media" ? "💧💧" : "💧";
  const svgSpacing = spacingInfographicSvg(p);
  const profile = configDetailProfile(p, sow);
  const sowRow = (icon, label, value) =>
    `<div class="detail-sow-row"><span class="detail-sow-row-icon" aria-hidden="true">${icon}</span><span class="detail-sow-row-copy"><b>${label}</b> — ${value}</span></div>`;
  const sowTip = (value) =>
    `<blockquote class="detail-sow-tip"><span class="detail-sow-row-icon" aria-hidden="true">💡</span><span class="detail-sow-row-copy">${value}</span></blockquote>`;

  container.innerHTML = `
    <div class="pdp-hero-wrap">
      <img class="pdp-photo-full" src="${heroPhotoSrc}" alt="${plantText(p, "nome")}"
           onerror="if(!this.dataset.fallbackStep){this.dataset.fallbackStep='1';this.src='${photoSrc}';}else{this.src='assets/img/svg/${p.id}.svg';}">
      <div class="pdp-hero-gradient"></div>
      <div class="pdp-hero-meta">
        ${tipoLabel ? `<span class="pdp-hero-type">${tipoLabel}</span>` : ""}
        <span class="pdp-hero-diff ${diffClass}">${diffLabel}</span>
      </div>
      <div class="pdp-hero-overlay">
        <div class="pdp-hero-info">
          <h2 class="pdp-name">${plantText(p, "nome")}</h2>
        </div>
      </div>
    </div>
    <div class="detail-body pdp-detail-body">
      <div class="detail-tabs-shell">
      <div class="detail-tabs-heading"><strong>${detailText("detail.tabs_title")}</strong><span>${detailText("detail.tabs_hint")}</span></div>
      <div class="detail-tabs" role="tablist" aria-label="${detailText("detail.tabs_title")}">
        ${CONFIG_DETAIL_TABS.map((tab, index) => {
          return `<button class="detail-tab${index === 0 ? " active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-detail-tab="${tab}" data-conf-action="set-detail-tab">${configDetailTabIcon(tab)}<span>${detailText(`detail.tab_${tab}`)}</span></button>`;
        }).join("")}
      </div>
      </div>

      <div class="detail-tab-panel active" data-detail-panel="overview">
        <div class="detail-badges"><span class="badge badge--sun">${soleIcon} ${soleLabel}</span><span class="badge badge--water">${acquaIcon} ${waterLabel(p.acqua)}</span></div>
        ${desc ? `<div class="detail-nota">${desc}</div>` : nota ? `<div class="detail-nota">${nota}</div>` : ""}
        <div class="detail-stats">
          <div class="detail-tile detail-tile--harvest"><div class="detail-tile-icon">⏱</div><div class="detail-tile-label">${tx("harvest")}</div><div class="detail-tile-value">${harvestValue(p)}</div></div>
          <div class="detail-tile detail-tile--yield"><div class="detail-tile-icon">⚖</div><div class="detail-tile-label">${tx("yieldPlant")}</div><div class="detail-tile-value">${yieldLabel(p.resa)}</div></div>
          <div class="detail-tile detail-tile--height"><div class="detail-tile-icon">↕</div><div class="detail-tile-label">${tx("height")}</div><div class="detail-tile-value">${heightLabel(p.h || "media")}</div></div>
          <div class="detail-tile detail-tile--quantity"><div class="detail-tile-label">${detailText("detail.quantity_bed")}</div><div class="detail-tile-value">${detailText("detail.plants_count", { count: b.count })}</div></div>
          <div class="detail-tile detail-tile--dimensions"><div class="detail-tile-label">${detailText("detail.bed_dimensions")}</div><div class="detail-bed-measures"><span><b aria-hidden="true">↔</b><small>${detailText("detail.bed_width")}</small><strong>${bedWidth}</strong></span><span><b aria-hidden="true">↕</b><small>${detailText("detail.bed_length")}</small><strong>${bedLength}</strong></span></div></div>
        </div>
      </div>

      <div class="detail-tab-panel" data-detail-panel="cultivation" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.cultivation_title")}</span><small>${detailText("detail.cultivation_subtitle")}</small></div>
        ${sow ? `<div class="detail-sow"><div class="detail-sow-body">${sow.method ? sowRow("🌱", tx("sowMethod"), sow.method) : ""}${sow.periodo ? sowRow("📅", detailText("detail.sow_period"), sow.periodo) : ""}${sow.depth ? sowRow("📏", tx("sowDepth"), sow.depth) : ""}${sow.tip || nota ? sowTip(sow.tip || nota) : ""}</div></div>` : ""}
        <div class="detail-spacing"><div class="detail-spacing-header"><span class="detail-tile-label">${window.SERRA_PLANT_CONTENT?.spacingLabel(p, state.lang) || tx("distance")}</span><b class="detail-spacing-val">${spacingValue(p)}</b></div>${svgSpacing ? `<div class="detail-spacing-diagram">${svgSpacing}</div>` : ""}</div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.cultivation)}</div>
      </div>

      <div class="detail-tab-panel" data-detail-panel="calendar" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.calendar_title")}</span><small>${detailText("detail.calendar_subtitle")}</small></div>
        <div class="month-bar"><div class="month-bar-head"><span>${monthLegend.title}</span><b>${activeMonthsLabel}</b></div><div class="month-segments" aria-label="${monthLegend.title}">${Array.from(
          { length: 12 },
          (_, i) => {
            const on = effectiveMonths(p).has(i + 1);
            const cur = i + 1 === state.mese;
            return `<div class="month-seg${on ? " active" : ""}${cur ? " current" : ""}"><span class="month-seg-abbr">${monthName(i + 1).slice(0, 3)}</span></div>`;
          }
        ).join(
          ""
        )}</div><div class="month-bar-legend"><span><i class="month-legend-dot month-legend-dot--active"></i>${monthLegend.available}</span><span><i class="month-legend-dot month-legend-dot--current"></i>${monthLegend.selected}</span></div></div>
      </div>

      <div class="detail-tab-panel" data-detail-panel="care" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.care_title")}</span><small>${detailText("detail.care_subtitle")}</small></div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.care)}</div>
        ${renderConfigDiseases(p)}
        ${renderConfigPests(p)}
        ${amiche.length || nemiche.length ? `<div class="detail-companions">${amiche.length ? `<div class="detail-companions-group"><div class="detail-companions-label">${tx("friends")}</div><div class="companion-list">${amiche.map((n) => `<span class="companion-chip friend">${n}</span>`).join("")}</div></div>` : ""}${nemiche.length ? `<div class="detail-companions-group"><div class="detail-companions-label detail-companions-label--foe">${tx("enemies")}</div><div class="companion-list">${nemiche.map((n) => `<span class="companion-chip foe">${n}</span>`).join("")}</div></div>` : ""}</div>` : ""}
      </div>

      <div class="detail-tab-panel" data-detail-panel="harvest" hidden>
        <div class="detail-section-heading"><span>${detailText("detail.harvest_title")}</span><small>${detailText("detail.harvest_subtitle")}</small></div>
        <div class="detail-tech-grid">${renderConfigTechCards(profile.harvest)}</div>
        <div class="detail-nota">${state.lang === "ro" ? `${b.count} plante în parcelă · producție totală estimată ${yieldLabel(resaTot)}` : `${b.count} piante nell'aiuola · resa totale stimata ${yieldLabel(resaTot)}`}</div>
      </div>
    </div>
  `;
  setConfigDetailTab(initialTab);
}

// Abilita annulla e ripristina in base agli snapshot disponibili nello storico.
function updateUndoRedoButtons() {
  const undoBtn = document.getElementById("btnUndo");
  const redoBtn = document.getElementById("btnRedo");
  if (undoBtn)
    undoBtn.disabled = typeof canUndo === "function" ? !canUndo() : true;
  if (redoBtn)
    redoBtn.disabled = typeof canRedo === "function" ? !canRedo() : true;
}

// Avvisi di consociazione e overflow.
function renderWarnings(L) {
  const w = document.getElementById("warnings");
  if (!w) return;
  let out = "";

  const analysis = analyzeCompanions();
  const presentIds = state.beds.map((b) => b.plantId);

  if (state.beds.length >= 2) {
    const ratingLabel = tx("companion.rating_" + analysis.rating);
    out += `<div class="warn companion-score companion-score--${analysis.rating}">
      <span class="i">🧭</span>
      <div class="companion-score-body">
        <div class="companion-score-top"><b>${tx("companion.score_label")}</b><span class="companion-score-val">${analysis.score}/100 · ${ratingLabel}</span></div>
        <div class="companion-score-bar"><span style="width:${analysis.score}%"></span></div>
        <div class="companion-score-scope">${tx("companion.score_scope")}</div>
      </div>
    </div>`;
  }

  analysis.badPairs.forEach((pair) => {
    const a = plantText(pair.a, "nome");
    const b = plantText(pair.b, "nome");
    const sugg = companionSuggestionFor(pair, presentIds);
    let suggHtml = "";
    if (sugg) {
      const key = sugg.offSeason
        ? "companion.suggest_offseason"
        : "companion.suggest";
      suggHtml = `<div class="companion-suggest">💡 ${tx(key, {
        friend: plantText(sugg.friend, "nome"),
        base: plantText(sugg.base, "nome")
      })}</div>`;
    }
    out += `<div class="warn bad"><span class="i">⚠️</span><div>
        <div>${tx("badCompanion", { a, b })}</div>
        <div class="companion-reason">${tx("companion.bad_reason")}</div>
        ${suggHtml}
      </div></div>`;
  });
  if (L.overflow)
    out += `<div class="warn bad"><span class="i">📏</span><div>${tx("overflowWarning")}</div></div>`;
  if (state.autoPlanNotice)
    out += `<div class="warn tip"><span class="i">ℹ️</span><div>${tx(state.autoPlanNotice)}</div></div>`;
  if (state.manualPlanNotice) {
    const manualBad =
      state.manualPlanNotice === "addNoSpace" ||
      state.manualPlanNotice === "manualCountRejected" ||
      state.manualPlanNotice === "presetDoesNotFit" ||
      state.manualPlanNotice === "lockedGeometryRejected";
    out += `<div class="warn ${manualBad ? "bad" : "tip"}"><span class="i">${manualBad ? "⚠️" : "ℹ️"}</span><div>${tx(state.manualPlanNotice)}</div></div>`;
  }
  if (analysis.goodPairs.length) {
    const ex = analysis.goodPairs
      .slice(0, 2)
      .map((g) => plantText(g.a, "nome") + " + " + plantText(g.b, "nome"))
      .join(", ");
    out += `<div class="warn tip"><span class="i">🤝</span><div>
        <div>${tx("goodCompanions", {
          pairs: `${ex}${analysis.goodPairs.length > 2 ? "…" : ""}`
        })}</div>
        <div class="companion-reason">${tx("companion.good_reason")}</div>
      </div></div>`;
  }
  w.innerHTML = out;
}

// Aggiorna il riepilogo resa e il pulsante esporta carrello
function renderSummary() {
  const s = document.getElementById("summary"),
    shop = document.getElementById("shop");
  if (state.beds.length === 0) {
    s.innerHTML = tx("addEstimate");
    shop.innerHTML = "";
    const shopTotalEmpty = document.getElementById("shopTotal");
    if (shopTotalEmpty) shopTotalEmpty.hidden = true;
    if (typeof updateOrderGrandTotal === "function") updateOrderGrandTotal();
    const guidedSummary = document.getElementById("guidedSummary");
    if (guidedSummary) guidedSummary.textContent = "";
    const slotEmpty = document.getElementById("cartBtnSlot");
    if (slotEmpty) slotEmpty.innerHTML = "";
    const yieldBadgeEmpty = document.getElementById("yieldToggleBadge");
    if (yieldBadgeEmpty) yieldBadgeEmpty.textContent = "";
    renderMaterials();
    renderPrintSummary();
    return;
  }
  let kg = 0,
    np = 0;
  state.beds.forEach((b) => {
    kg += b.count * BYID[b.plantId].resa;
    np += b.count;
  });
  s.innerHTML = `
    <div class="yield-metrics" aria-label="${tx("summary", {
      plants: np,
      beds: state.beds.length,
      yield: yieldLabel(kg)
    }).replace(/<[^>]+>/g, "")}">
      <div class="yield-metric">
        <strong>${state.beds.length}</strong>
        <span>${tx("yield.varieties")}</span>
      </div>
      <div class="yield-metric">
        <strong>${np}</strong>
        <span>${tx("yield.plants_label")}</span>
      </div>
      <div class="yield-metric yield-metric--accent">
        <strong>${yieldLabel(kg)}</strong>
        <span>${tx("yield.harvest")}</span>
      </div>
    </div>`;
  const guidedSummary = document.getElementById("guidedSummary");
  if (guidedSummary) {
    guidedSummary.textContent = tx("guidedIntroSummary", {
      beds: state.beds.length,
      plants: np,
      yield: yieldLabel(kg)
    });
  }
  let seedsTotalForShop = 0;
  shop.innerHTML = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      const pd = PACK_DATA[b.plantId] || { seeds: 100, price: 2.5 };
      const packs = Math.max(1, Math.ceil(b.count / (pd.seeds ?? 100)));
      const packLabel =
        packs === 1
          ? tx("cart.pack_one")
          : tx("cart.pack_many", { count: packs });
      const photoSrc = plantPhotoSrc(p, p.id);
      window.preloadPlantPhoto?.(p, p.id);
      const rowSubtotal = packs * pd.price;
      seedsTotalForShop += rowSubtotal;
      return `<li>
        <span class="shop-emoji" role="img" aria-label="${plantText(p, "nome")}">
          <img class="shop-photo" src="${photoSrc}" alt="" decoding="async"
            onerror="this.onerror=null;this.src='assets/img/svg/leaf.svg';this.classList.add('shop-photo--fallback');">
        </span>
        <span class="shop-plant">
          <b>${plantText(p, "nome")}</b>
          <small>${tx("shoppingItem", { count: b.count })}</small>
        </span>
        <span class="shop-side">
          <span class="shop-pack">${packLabel}</span>
          <b class="shop-price">${euro(rowSubtotal)}</b>
        </span>
      </li>`;
    })
    .join("");

  const shopTotal = document.getElementById("shopTotal");
  if (shopTotal) {
    shopTotal.hidden = false;
    shopTotal.innerHTML = `
      <span>${tx("shop.seeds_total")}</span>
      <b>${euro(seedsTotalForShop)}</b>`;
  }
  if (typeof updateOrderGrandTotal === "function") updateOrderGrandTotal();

  const yieldBadge = document.getElementById("yieldToggleBadge");
  if (yieldBadge) {
    yieldBadge.textContent =
      state.beds.length > 0 ? `${state.beds.length} var.` : "";
  }

  const exportBtn = document.createElement("button");
  exportBtn.id = "confCartExportBtn";
  exportBtn.className = "btn btn-success btn-block conf-cart-export-btn";
  const _rawExportLabel = tx("cart.export_btn");
  const _exportLabel = _rawExportLabel.replace(/^🛒\s*/, "");
  exportBtn.innerHTML = `<svg class="conf-cart-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="conf-cart-btn-label">${_exportLabel}</span>`;
  exportBtn.type = "button";
  exportBtn.onclick = exportConfToCart;
  const slot = document.getElementById("cartBtnSlot");
  if (slot) {
    slot.innerHTML = "";
    slot.appendChild(exportBtn);
  }

  renderMaterials();
  renderPrintSummary();
}

// Chiude il menu dropdown di esportazione progetto
function closeProjectExportMenu({ restoreFocus = false } = {}) {
  const menu = document.getElementById("projectExportMenu");
  if (!menu || menu.hidden) return;
  const triggerId = menu.dataset.trigger;
  menu.hidden = true;
  menu.removeAttribute("data-trigger");
  document
    .querySelectorAll('[aria-controls="projectExportMenu"]')
    .forEach((button) => button.setAttribute("aria-expanded", "false"));
  if (restoreFocus && triggerId)
    document.getElementById(triggerId)?.focus({ preventScroll: true });
}

// Apre il menu dropdown di esportazione progetto
function openProjectExportMenu(trigger) {
  const menu = document.getElementById("projectExportMenu");
  if (!menu || !trigger) return;
  const wasOpen = !menu.hidden && menu.dataset.trigger === trigger.id;
  closeProjectExportMenu();
  if (wasOpen) return;
  menu.hidden = false;
  menu.dataset.trigger = trigger.id;
  trigger.setAttribute("aria-expanded", "true");
  const rect = trigger.getBoundingClientRect();
  const menuWidth = Math.min(310, window.innerWidth - 24);
  const left = Math.max(
    12,
    Math.min(window.innerWidth - menuWidth - 12, rect.right - menuWidth)
  );
  const estimatedHeight = 210;
  const openAbove = rect.bottom + estimatedHeight + 12 > window.innerHeight;
  menu.style.left = `${left}px`;
  menu.style.top = `${openAbove ? Math.max(12, rect.top - estimatedHeight - 8) : rect.bottom + 8}px`;
  menu.querySelector("button")?.focus({ preventScroll: true });
}

// Genera il nome file per l'esportazione del progetto
function projectExportFileName(extension) {
  const month = monthName(state.mese)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const base = tx("exportFileName") || "progetto-serra";
  return `${base}-${state.larghezza}x${state.lunghezza}m-${month}.${extension}`
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

// Aggrega le aiuole del progetto per nome e conteggio
function aggregatedProjectBeds() {
  const rows = new Map();
  state.beds.forEach((bed) => {
    rows.set(bed.plantId, (rows.get(bed.plantId) || 0) + bed.count);
  });
  return Array.from(rows, ([plantId, count]) => ({
    name: plantText(BYID[plantId], "nome"),
    count
  }));
}

// Genera il canvas con scena e riepilogo per l'export immagine
async function buildProjectExportCanvas() {
  const svg = document.querySelector("#scene svg");
  if (!svg) throw new Error("Greenhouse scene is not available");
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const serialized = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([serialized], {
    type: "image/svg+xml;charset=utf-8"
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = svgUrl;
    });
    const viewBox = svg.viewBox.baseVal;
    const sourceWidth = viewBox.width || svg.clientWidth || 1200;
    const sourceHeight = viewBox.height || svg.clientHeight || 800;
    const canvasWidth = 1800;
    const side = 90;
    const headerHeight = 190;
    const mapWidth = canvasWidth - side * 2;
    const mapHeight = Math.round((mapWidth * sourceHeight) / sourceWidth);
    const crops = aggregatedProjectBeds();
    const rowsPerColumn = Math.max(1, Math.ceil(crops.length / 2));
    const summaryHeight = Math.max(245, 126 + rowsPerColumn * 42);
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = headerHeight + mapHeight + summaryHeight + 80;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7f4e9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1f3a26";
    ctx.font = '800 54px "DM Sans", Arial, sans-serif';
    ctx.fillText(tx("print.title"), side, 82);
    ctx.fillStyle = "#617064";
    ctx.font = '500 27px "DM Sans", Arial, sans-serif';
    const zoneKey =
      state.zona === "freddo"
        ? "cold"
        : state.zona === "caldo"
          ? "warm"
          : "temperate";
    const meta = tx("print.greenhouse_info")
      .replace("{w}", state.larghezza)
      .replace("{l}", state.lunghezza)
      .replace("{zone}", tx(zoneKey))
      .replace("{month}", monthName(state.mese));
    ctx.fillText(meta, side, 132);
    ctx.strokeStyle = "#d2dace";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(side, 163);
    ctx.lineTo(canvasWidth - side, 163);
    ctx.stroke();
    ctx.drawImage(image, side, headerHeight, mapWidth, mapHeight);

    const summaryTop = headerHeight + mapHeight + 60;
    ctx.fillStyle = "#1f3a26";
    ctx.font = '800 35px "DM Sans", Arial, sans-serif';
    ctx.fillText(tx("inGreenhouse"), side, summaryTop);
    const totalPlants = crops.reduce((sum, crop) => sum + crop.count, 0);
    ctx.textAlign = "right";
    ctx.font = '700 25px "DM Sans", Arial, sans-serif';
    ctx.fillStyle = "#52705a";
    ctx.fillText(
      `${tx("print.total")}: ${totalPlants}`,
      canvasWidth - side,
      summaryTop
    );
    ctx.textAlign = "left";
    const columnWidth = (canvasWidth - side * 2 - 70) / 2;
    crops.forEach((crop, index) => {
      const column = Math.floor(index / rowsPerColumn);
      const row = index % rowsPerColumn;
      const x = side + column * (columnWidth + 70);
      const y = summaryTop + 54 + row * 42;
      ctx.fillStyle = "#2c4633";
      ctx.font = '600 25px "DM Sans", Arial, sans-serif';
      ctx.fillText(crop.name, x, y);
      ctx.textAlign = "right";
      ctx.fillStyle = "#6b776d";
      ctx.font = '500 23px "DM Sans", Arial, sans-serif';
      ctx.fillText(String(crop.count), x + columnWidth, y);
      ctx.textAlign = "left";
    });
    return canvas;
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

// Avvia il download di un blob come file
function downloadProjectBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Esporta il progetto come immagine PNG
async function exportProjectPng() {
  const canvas = await buildProjectExportCanvas();
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png", 1)
  );
  if (!blob) throw new Error("PNG generation failed");
  downloadProjectBlob(blob, projectExportFileName("png"));
}

// Genera un PDF dal canvas del progetto
function pdfFromProjectCanvas(canvas) {
  const jpegData = canvas.toDataURL("image/jpeg", 0.92).split(",")[1];
  const raw = atob(jpegData);
  const jpegBytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) jpegBytes[i] = raw.charCodeAt(i);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 24;
  const scale = Math.min(
    (pageWidth - margin * 2) / canvas.width,
    (pageHeight - margin * 2) / canvas.height
  );
  const imageWidth = canvas.width * scale;
  const imageHeight = canvas.height * scale;
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = (pageHeight - imageHeight) / 2;
  const content = `q\n${imageWidth.toFixed(2)} 0 0 ${imageHeight.toFixed(2)} ${imageX.toFixed(2)} ${imageY.toFixed(2)} cm\n/Im0 Do\nQ`;

  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let byteLength = 0;
  const append = (value) => {
    const bytes = typeof value === "string" ? encoder.encode(value) : value;
    chunks.push(bytes);
    byteLength += bytes.length;
  };
  const object = (number, parts) => {
    offsets[number] = byteLength;
    append(`${number} 0 obj\n`);
    parts.forEach(append);
    append("\nendobj\n");
  };

  append("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  object(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  object(2, ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"]);
  object(3, [
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`
  ]);
  object(4, [
    `<< /Length ${encoder.encode(content).length} >>\nstream\n`,
    content,
    "\nendstream"
  ]);
  object(5, [
    `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
    jpegBytes,
    "\nendstream"
  ]);

  const xrefOffset = byteLength;
  append("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i += 1) {
    append(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

// Esporta il progetto come file PDF
async function exportProjectPdf() {
  const canvas = await buildProjectExportCanvas();
  const pdf = pdfFromProjectCanvas(canvas);
  downloadProjectBlob(pdf, projectExportFileName("pdf"));
}

// Genera il riepilogo per la stampa
function renderPrintSummary() {
  const el = document.getElementById("printSummary");
  if (!el) return;
  const labels = {
    title: tx("print.title"),
    greenhouseInfo: tx("print.greenhouse_info"),
    bedsTitle: tx("inGreenhouse"),
    yieldTitle: tx("print.yield_title"),
    plant: tx("print.plant"),
    qty: tx("print.qty"),
    unitYield: tx("yieldPlant"),
    totalYield: tx("print.total_yield"),
    shopping: tx("print.shopping"),
    total: tx("print.total")
  };
  if (state.beds.length === 0) {
    el.innerHTML = "";
    return;
  }
  const rows = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      const total = b.count * p.resa;
      return `<tr>
        <td>${plantText(p, "nome")}</td>
        <td>${yieldLabel(p.resa)}</td>
        <td>${yieldLabel(total)}</td>
      </tr>`;
    })
    .join("");
  const totalYield = state.beds.reduce(
    (sum, b) => sum + b.count * BYID[b.plantId].resa,
    0
  );
  const totalPlants = state.beds.reduce((sum, b) => sum + b.count, 0);
  const shoppingRows = state.beds
    .map((b) => {
      const p = BYID[b.plantId];
      return `<li><b>${plantText(p, "nome")}</b>: ${tx("shoppingItem", { count: b.count })}</li>`;
    })
    .join("");
  const zoneKey =
    state.zona === "freddo"
      ? "cold"
      : state.zona === "caldo"
        ? "warm"
        : "temperate";
  el.innerHTML = `<div class="print-heading">
      <h2>${labels.title}</h2>
      <p>${labels.greenhouseInfo
        .replace("{w}", state.larghezza)
        .replace("{l}", state.lunghezza)
        .replace("{zone}", tx(zoneKey))
        .replace("{month}", monthName(state.mese))}</p>
    </div>
    <div class="print-summary-grid">
      <section>
        <h3>${labels.bedsTitle}</h3>
        <table>
          <thead><tr><th>${labels.plant}</th><th>${labels.qty}</th></tr></thead>
          <tbody>${state.beds
            .map(
              (b) =>
                `<tr><td>${plantText(BYID[b.plantId], "nome")}</td><td>${b.count}</td></tr>`
            )
            .join("")}</tbody>
          <tfoot><tr><td>${labels.total}</td><td>${totalPlants}</td></tr></tfoot>
        </table>
      </section>
      <section>
        <h3>${labels.yieldTitle}</h3>
        <table>
          <thead><tr><th>${labels.plant}</th><th>${labels.unitYield}</th><th>${labels.totalYield}</th></tr></thead>
          <tbody>${rows}</tbody>
          <tfoot><tr><td>${labels.total}</td><td></td><td>${yieldLabel(totalYield)}</td></tr></tfoot>
        </table>
        <h4>${labels.shopping}</h4>
        <ul>${shoppingRows}</ul>
        ${materialsPrintHtml()}
      </section>
    </div>`;
}
