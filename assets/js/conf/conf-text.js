// Funzioni di traduzione
// Traduce una chiave con sostituzione variabili
function tx(key, vars = {}) {
  const dict = I18N[state.lang] || I18N.it;
  let value = dict[key] || I18N.it[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

// Restituisce il testo localizzato di un campo pianta
function plantText(plant, field = "nome") {
  if (state.lang === "ro" && PLANT_RO[plant.id]?.[field]) {
    return PLANT_RO[plant.id][field];
  }
  return plant[field];
}

// Restituisce il nome localizzato della pianta per ID
function plantNameById(id) {
  return BYID[id] ? plantText(BYID[id], "nome") : null;
}

// Traduce il livello idrico in etichetta
function waterLabel(value) {
  if (value === "alta") return tx("waterHigh");
  if (value === "bassa") return tx("waterLow");
  return tx("waterMedium");
}

// Traduce l'altezza in etichetta
function heightLabel(value) {
  if (value === "alta") return tx("heightHigh");
  if (value === "bassa") return tx("heightLow");
  return tx("heightMedium");
}

// Formatta la resa in grammi o chilogrammi
function yieldLabel(value) {
  return value < 1
    ? `${(value * 1000).toFixed(0)} g`
    : `${value.toFixed(1)} kg`;
}

// Restituisce la stringa delle distanze di semina
function spacingValue(plant) {
  return plant.dr && plant.dr !== plant.d
    ? `${plant.d}×${plant.dr} cm`
    : `${plant.d} cm`;
}

// Infografiche e diagrammi
// Genera il diagramma SVG delle distanze tra piante
function spacingInfographicSvg(p) {
  const d = p.d;
  const dr = p.dr || p.d;
  if (!d) return "";
  const W = 224;
  const H = 118;
  const R = 7;
  const cx = [34, 78, 122, 166];
  const cy = [45, 89];
  const pid = p.id.replace(/[^a-z]/g, "");
  const rLbl = tx("distanceInRow");
  const bLbl = tx("distanceBetweenRows");
  let seedlings = "";
  for (let r = 0; r < 2; r++) {
    const y = cy[r];
    for (let c = 0; c < 4; c++) {
      const x = cx[c];
      const scale = r ? 0.92 : 1;
      const leaf = r ? "#52b788" : "#2d6a4f";
      const leafDark = r ? "#2f8f5d" : "#1b5e3a";
      seedlings += `<g transform="translate(${x} ${y}) scale(${scale})">
        <ellipse cx="0" cy="9" rx="11" ry="3.2" fill="#1b4332" opacity=".11"/>
        <path d="M0 8 C0 2 0 -3 0 -9" stroke="#2d6a4f" stroke-width="2.1" stroke-linecap="round"/>
        <path d="M0 -5 C-13 -13 -17 -2 -5 1 C-2 0 0 -2 0 -5Z" fill="${leaf}" stroke="${leafDark}" stroke-width=".6"/>
        <path d="M1 -6 C14 -14 18 -2 5 2 C2 0 1 -2 1 -6Z" fill="${leaf}" stroke="${leafDark}" stroke-width=".6"/>
        <path d="M0 -1 C-8 -6 -10 0 -3 3" fill="none" stroke="rgba(255,255,255,.36)" stroke-width=".8" stroke-linecap="round"/>
      </g>`;
    }
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    class="spacing-svg" aria-hidden="true">
  <defs>
    <marker id="sH${pid}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,1 L7,4 L0,7 Z" fill="#1b5e3a"/></marker>
    <marker id="sV${pid}" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M1,0 L4,7 L7,0 Z" fill="#40916c"/></marker>
  </defs>
  <rect x="8" y="23" width="176" height="86" rx="12" fill="var(--spacing-diagram-bg,#f7fbf5)" stroke="rgba(45,106,79,.16)"/>
  <path d="M24 45 H176 M24 89 H176 M34 31 V103 M78 31 V103 M122 31 V103 M166 31 V103" stroke="var(--spacing-diagram-grid,rgba(45,106,79,.14))" stroke-width="1"/>
  ${seedlings}
  <line x1="${cx[0] + R + 3}" y1="${cy[0] - 15}" x2="${cx[1] - R - 3}" y2="${cy[0] - 15}" stroke="#1b5e3a" stroke-width="1.7" marker-start="url(#sH${pid})" marker-end="url(#sH${pid})"/>
  <text x="97" y="8" font-size="8" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="var(--spacing-diagram-text,#16251b)">${rLbl}</text>
  <rect x="67" y="11" width="60" height="18" rx="9" fill="#1b5e3a"/>
  <text x="97" y="24" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${d} cm</text>
  <line x1="198" y1="${cy[0] + R + 3}" x2="198" y2="${cy[1] - R - 3}" stroke="#40916c" stroke-width="1.7" marker-start="url(#sV${pid})" marker-end="url(#sV${pid})"/>
  <text x="206" y="49" font-size="7.5" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="var(--spacing-diagram-text,#16251b)">${bLbl}</text>
  <rect x="184" y="59" width="44" height="18" rx="9" fill="#40916c"/>
  <text x="206" y="72" font-size="10" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" fill="#fff">${dr} cm</text>
</svg>`;
}

// Restituisce la stringa del ciclo di raccolta
function harvestValue(plant) {
  if (!plant.gg) return tx("perennial");
  return `${tx("about")} ${plant.gg} ${tx("daysShort")}`;
}

// Restituisce la guida di semina nella lingua corrente
function localizedSowingGuide(plant) {
  const sow = SOWING_GUIDE[plant.id];
  if (!sow || state.lang !== "ro") return sow;
  const direct = new Set([
    "carota",
    "rucola",
    "spinaci",
    "coriandolo",
    "aneto",
    "fagiolino",
    "fagiolo",
    "pisello",
    "ravanello",
    "barbabietola",
    "rapa",
    "valerianella",
    "daikon",
    "scorzonera",
    "fava",
    "soia_edamame",
    "cece",
    "lenticchia",
    "fagiolo_borlotto",
    "crescione"
  ]);
  const bulbs = new Set([
    "aglio",
    "scalogno",
    "cipolla",
    "cipolla_rossa",
    "cipollotto"
  ]);
  const aromatics = new Set([
    "rosmarino",
    "timo",
    "origano",
    "salvia",
    "erba_cipollina",
    "leustean",
    "dragoncello",
    "menta",
    "maggiorana",
    "camomilla",
    "shiso"
  ]);
  const warm = new Set([
    "pomodoro",
    "peperone",
    "peperoncino",
    "melanzana",
    "zucchina",
    "zucca",
    "cetriolo",
    "melone",
    "anguria",
    "basilico",
    "tomatillo",
    "physalis",
    "cucamelon",
    "mais_dolce",
    "patata_dolce",
    "friggitello"
  ]);
  const name = plantText(plant, "nome").toLowerCase();
  const row = plant.d;
  const between = plant.dr || plant.d;
  let method =
    "Seamănă în alveole sau răsadniță, apoi transplantează plante viguroase în parcelă.";
  if (direct.has(plant.id))
    method = "Seamănă direct în rânduri, în sol fin și ușor umed.";
  if (bulbs.has(plant.id))
    method =
      "Plantează bulbili sau căței sănătoși, apoi păstrează rândurile curate.";
  if (aromatics.has(plant.id))
    method =
      "Cel mai sigur este transplantul de plăntuțe; semănarea este posibilă, dar mai lentă.";
  if (warm.has(plant.id))
    method =
      "Seamănă protejat la cald; în seră transplantează o plăntuță bine formată.";
  if (plant.id === "fragola")
    method =
      "Transplantează plăntuțe sau stoloni înrădăcinați; semănarea din sămânță este lentă.";
  if (plant.id === "patata")
    method =
      "Plantează tuberculi sănătoși și mușuroiește când tulpinile cresc.";
  if (plant.id === "asparago")
    method =
      "Pornește de la coroane sau plăntuțe; cultura este perenă și cere răbdare.";

  let depth = sow.depth
    .replace("Colletto a livello del terreno", "Coletul la nivelul solului")
    .replace(
      "Superficiale, copertura leggerissima",
      "Superficial, acoperire foarte ușoară"
    );
  let thin = `Lasă ${row} cm pe rând și ${between} cm între rânduri.`;
  if (plant.dr === plant.d || !plant.dr) thin = `Lasă ${row} cm între plante.`;

  let tip =
    "Menține umiditatea constantă la pornire și evită aglomerarea plantelor.";
  if (plant.acqua === "alta")
    tip = "Udă regulat, mai ales după transplantare și în zilele calde.";
  if (plant.acqua === "bassa")
    tip = "Evită excesul de apă: are nevoie de sol drenat și aerisit.";
  if (warm.has(plant.id))
    tip = "Așteaptă nopți blânde și evită substratul rece la transplantare.";
  if (direct.has(plant.id))
    tip = "Rărește devreme, ca fiecare plantă să aibă spațiul ei real.";
  if (aromatics.has(plant.id))
    tip = "Ține-o la lumină și nu o acoperi cu culturi mai înalte.";
  if (plant.id === "lattuga")
    tip = "Seamănă puțin și des pentru recolte eșalonate.";
  if (plant.id === "fragola")
    tip = "Nu acoperi inima plantei și mulcește pentru fructe curate.";

  return { method, depth, thin, tip: `${name}: ${tip}` };
}

// Distribuisce gli indici emoji lungo le aiuole a serpente
function emojiSpreadIndexes(itemCount, cols, targetCount) {
  if (!targetCount) return new Set();
  if (itemCount <= targetCount)
    return new Set(Array.from({ length: itemCount }, (_, i) => i));
  const safeCols = Math.max(1, cols);
  const rows = Math.ceil(itemCount / safeCols);
  const snake = [];
  for (let r = 0; r < rows; r++) {
    const start = r * safeCols;
    const end = Math.min(start + safeCols, itemCount);
    if (r % 2 === 0) {
      for (let i = start; i < end; i++) snake.push(i);
    } else {
      for (let i = end - 1; i >= start; i--) snake.push(i);
    }
  }
  const result = new Set();
  for (let k = 0; k < targetCount; k++) {
    result.add(snake[Math.floor(((k + 0.5) * snake.length) / targetCount)]);
  }
  return result;
}

// Restituisce il nome del mese per l'indice dato
function monthName(index) {
  return (MONTHS[state.lang] || MONTHS.it)[index - 1];
}

// Aggiornamento UI
// Aggiorna la barra del preset applicato
function updatePresetAppliedUI() {
  const box = document.getElementById("presetApplied");
  if (!box) return;
  const active = Boolean(state.activePreset && PRESETS[state.activePreset]);
  box.hidden = !active;
  document.getElementById("presetBar")?.classList.toggle("is-applied", active);
  if (!active) return;

  const option = document.querySelector(
    `#inPreset option[value="${state.activePreset}"]`
  );
  const presetName = option?.textContent?.trim() || state.activePreset;
  const title = document.getElementById("presetAppliedTitle");
  const hint = document.getElementById("presetAppliedHint");
  const button = document.getElementById("btnPresetSeasonal");
  if (title) title.textContent = tx("presetApplied", { name: presetName });
  if (hint) hint.textContent = tx("presetAppliedHint");
  if (button) {
    const label = tx("returnSeasonalPlan", { month: monthName(state.mese) });
    button.textContent = label;
    button.setAttribute("aria-label", label);
  }
}

// Imposta il testo tradotto in un elemento DOM
function setText(selector, key) {
  const el = document.querySelector(selector);
  if (el) el.textContent = tx(key);
}

// Imposta il testo tradotto in un'opzione select
function setOptionText(selectId, value, key) {
  const opt = document.querySelector(`#${selectId} option[value="${value}"]`);
  if (opt) opt.textContent = tx(key);
}

// Sincronizza il label della select vista mappa
function syncOverlaySelectLabel() {
  const select = document.getElementById("inOverlay");
  const label = document.getElementById("viewModeValue");
  if (!select || !label) return;
  select.value = state.overlay || "";
  label.textContent =
    select.options[select.selectedIndex]?.textContent || tx("viewNatural");
}

// Aggiorna label e icona del pulsante di apertura pannello
function updatePanelToggle(btn) {
  const panel = btn.closest(".panel");
  const isCollapsed = panel?.classList.contains("is-collapsed");
  const label = btn.querySelector(".panel-toggle-label");
  const icon = btn.querySelector(".panel-toggle-icon");
  const isYield = btn.classList.contains("panel-toggle--yield");
  let labelText;
  if (isYield && isCollapsed) {
    labelText = tx("seedListCollapsed");
  } else {
    const openKey = btn.dataset.openKey || "openPanel";
    labelText = isCollapsed ? tx(openKey) : tx("closePanel");
  }
  if (label) label.textContent = labelText;
  if (icon) icon.textContent = "⌃";
  btn.setAttribute("aria-expanded", String(!isCollapsed));
  btn.setAttribute(
    "aria-label",
    isCollapsed ? tx("openPanelLabel") : tx("closePanelLabel")
  );
}

// Aggiorna tutti i pulsanti pannello in pagina
function updateAllPanelToggles() {
  document.querySelectorAll(".panel-toggle").forEach(updatePanelToggle);
}

// Applicazione lingua
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = tx("title");
  document.querySelectorAll("[data-i18n-conf]").forEach((el) => {
    const key = el.dataset.i18nConf;
    // Prova prima il dizionario del configuratore, poi quello condiviso
    // dell'header/footer (copiato dalla home): alcune chiavi esistono solo
    // nell'uno o nell'altro.
    const translated = I18N[state.lang]?.[key] ?? SITE_I18N[state.lang]?.[key];
    if (!translated) return;
    if (translated.includes("<") || translated.includes("&"))
      el.innerHTML = translated;
    else el.textContent = translated;
  });
  document.querySelectorAll("[data-i18n-conf-aria]").forEach((el) => {
    const translated =
      I18N[state.lang]?.[el.dataset.i18nConfAria] ??
      SITE_I18N[state.lang]?.[el.dataset.i18nConfAria];
    if (translated) el.setAttribute("aria-label", translated);
  });
  document.querySelectorAll("[data-i18n-conf-title]").forEach((el) => {
    const translated = SITE_I18N[state.lang]?.[el.dataset.i18nConfTitle];
    if (translated) el.setAttribute("title", translated);
  });
  syncLanguageControls();
  setText("#mainLangLabel", "language");
  setText("#modalLangLabel", "language");
  setText(".brand h1", "brandTitle");
  setText(".brand p", "brandSub");
  setText("#guidedAppTitle", "guidedAppTitle");
  setText("#guidedAppSub", "guidedAppSub");
  setText(
    ".modal-kicker",
    isGuidedBoot() ? "guidedModalKicker" : "modalKicker"
  );
  setText(
    ".modal .hero h2",
    isGuidedBoot() ? "guidedModalTitle" : "modalTitle"
  );
  setText(".modal .hero p", isGuidedBoot() ? "guidedModalCopy" : "modalCopy");
  setText("#personaPickLabel", "personaPickLabel");
  setText("#personaPickHint", "personaPickHint");
  setText("#personaPickAction", "personaPickAction");
  setText("#personaNovTitle", "personaNovTitle");
  setText("#personaNovLevel", "personaNovLevel");
  setText("#personaNovDesc", "personaNovDesc");
  setText("#personaIntTitle", "personaIntTitle");
  setText("#personaIntLevel", "personaIntLevel");
  setText("#personaIntDesc", "personaIntDesc");
  setText("#personaExpTitle", "personaExpTitle");
  setText("#personaExpLevel", "personaExpLevel");
  setText("#personaExpDesc", "personaExpDesc");
  if (typeof syncPersonaPickerSummary === "function")
    syncPersonaPickerSummary();
  if (typeof syncQuickGuide === "function") syncQuickGuide();
  if (typeof updateJourneyContext === "function") updateJourneyContext();
  setText("#vegScrollHint span:first-child", "vegScrollHint");

  const filterIconMap = { all: "🌿", in: "✓", "all-beds": "⌕" };
  const filterLblMap = {
    all: { it: "Seminabili ora", ro: "De semănat acum" },
    in: { it: "Già aggiunte", ro: "Deja adăugate" },
    "all-beds": { it: "Tutti i semi", ro: "Toate semințele" }
  };
  document.querySelectorAll(".veg-filter-tab").forEach((tab) => {
    const f = tab.dataset.filter;
    const ico = filterIconMap[f] || "🌿";
    const lbl =
      (filterLblMap[f] || filterLblMap.all)[state.lang] ||
      (filterLblMap[f] || filterLblMap.all).it;
    tab.innerHTML = `<span class="tab-ico" aria-hidden="true">${ico}</span><span class="tab-lbl">${lbl}</span><span class="tab-count">—</span>`;
  });
  updateVegSearchUI();
  const modalSteps = document.querySelectorAll(".modal-step");
  if (modalSteps[0]) {
    modalSteps[0].querySelector("b").textContent = tx("modalSizeTitle");
    modalSteps[0].querySelector("small").textContent = tx("modalSizeCopy");
  }
  const modalSizeLabels = document.querySelectorAll(".modal-size-row .fld");
  if (modalSizeLabels[0]) modalSizeLabels[0].textContent = tx("width");
  if (modalSizeLabels[1]) modalSizeLabels[1].textContent = tx("length");
  if (modalSteps[1]) {
    modalSteps[1].querySelector("b").textContent = tx("modalZoneTitle");
    modalSteps[1].querySelector("small").textContent = tx("modalZoneCopy");
  }
  setText('#zoneOpts [data-zone="freddo"] b', "zoneColdTitle");
  setText('#zoneOpts [data-zone="freddo"] small', "zoneColdCopy");
  setText('#zoneOpts [data-zone="temperato"] b', "zoneTempTitle");
  setText('#zoneOpts [data-zone="temperato"] small', "zoneTempCopy");
  setText('#zoneOpts [data-zone="caldo"] b', "zoneWarmTitle");
  setText('#zoneOpts [data-zone="caldo"] small', "zoneWarmCopy");
  document.querySelectorAll("#zoneOpts .opt").forEach((opt) => {
    opt.dataset.selectedLabel = tx("selected");
  });
  if (modalSteps[2]) {
    modalSteps[2].querySelector("b").textContent = tx("modalGreenhouseTitle");
    modalSteps[2].querySelector("small").textContent = tx(
      "modalGreenhouseCopy"
    );
  }
  setText(".checkline span", "heated");
  setText("#startBtn", isGuidedBoot() ? "guidedStart" : "start");
  setText(".disclaimer", "disclaimer");
  setText(".panel-head h2", "settingsTitle");
  setText(".panel-head-tag", "settingsTag");
  setText("#sizesSectionLabel", "sizes");
  setText("#climateSectionLabel", "climate");
  setText("#autoPlanSectionLabel", "quickStart");
  const fld = document.querySelectorAll("#panelSettings .fld");
  if (fld[0]) fld[0].textContent = tx("width");
  if (fld[1]) fld[1].textContent = tx("length");
  if (fld[2]) fld[2].textContent = tx("pathWidth");
  if (fld[3]) fld[3].textContent = tx("zone");
  if (fld[4]) fld[4].textContent = tx("greenhouse");
  setText("#presetBar .fld", "readyLayouts");
  setText("#presetBarHint", "readyLayoutsHint");
  setOptionText("inZona", "freddo", "zoneColdTitle");
  setOptionText("inZona", "temperato", "zoneTempTitle");
  setOptionText("inZona", "caldo", "zoneWarmTitle");
  setOptionText("inRisc", "no", "unheated");
  setOptionText("inRisc", "si", "heatedOption");
  setText("#orientLabel", "sunSide");
  setOptionText("inSole", "alto", "sunTop");
  setOptionText("inSole", "basso", "sunBottom");
  setOptionText("inPreset", "", "presetDefault");
  setOptionText("inPreset", "insalate", "presetInsalate");
  setOptionText("inPreset", "salsa", "presetSalsa");
  setOptionText("inPreset", "principiante", "presetPrincipiante");
  setOptionText("inPreset", "aromatiche", "presetAromatiche");
  setOptionText("inPreset", "estivo", "presetEstivo");
  setOptionText("inPreset", "invernale", "presetInvernale");
  setOptionText("inPreset", "radici", "presetRadici");
  setOptionText("inPreset", "foglie", "presetFoglie");
  setOptionText("inPreset", "brassicacee", "presetBrassicacee");
  setOptionText("inPreset", "primaverile", "presetPrimaverile");
  setOptionText("inPreset", "autunnale", "presetAutunnale");
  setOptionText("inPreset", "legumi", "presetLegumi");
  setOptionText("inPreset", "frutti", "presetFrutti");
  setOptionText("inPreset", "cucurbitacee", "presetCucurbitacee");
  setOptionText("inPreset", "soffritto", "presetSoffritto");
  setOptionText("inPreset", "grigliata", "presetGrigliata");
  setOptionText("inPreset", "famiglia", "presetFamiglia");
  document
    .querySelectorAll("#inPreset optgroup[data-i18n-optgroup]")
    .forEach((og) => {
      og.label = tx(og.dataset.i18nOptgroup);
    });
  updatePresetAppliedUI();
  setText("#btnOpenSetup", "openSetup");
  setText("#sowAtLabel", "sowAt");
  const sowMonthSelect = document.getElementById("inMese");
  if (sowMonthSelect) sowMonthSelect.setAttribute("aria-label", tx("sowMonth"));
  setText(".stage-title", "stageTitle");
  setText(".stage-subtitle", "stageSub");
  setText("#viewModeLabel", "viewMode");
  setOptionText("inOverlay", "", "viewNatural");
  setOptionText("inOverlay", "sole", "sunMap");
  setOptionText("inOverlay", "acqua", "waterMap");
  setOptionText("inOverlay", "altezza", "heightMap");
  syncOverlaySelectLabel();
  setText(".crops-customize-summary-text", "cropsSectionCustomize");
  setText("#panelCustomize h2", "customizeTitle");
  setText("#cropActionsTitle", "cropActionsTitle");
  setText("#cropActionsHint", "cropActionsHint");
  setText("#btnArrangeSelected .btn-label", "arrangeSelected");
  setText("#btnArrangeSelected .btn-hint", "arrangeSelectedHint");
  const arrangeSelectedBtn = document.getElementById("btnArrangeSelected");
  if (arrangeSelectedBtn) arrangeSelectedBtn.title = tx("arrangeSelectedTitle");
  setText("#btnFillSelected .btn-label", "fillSelected");
  setText("#btnFillSelected .btn-hint", "fillSelectedHint");
  const fillSelectedBtn = document.getElementById("btnFillSelected");
  if (fillSelectedBtn) fillSelectedBtn.title = tx("fillSelectedTitle");
  setText("#btnStampa .btn-label", "export");
  const printBtn = document.getElementById("btnStampa");
  if (printBtn) printBtn.title = tx("printTitle");
  const mobilePrintBtn = document.getElementById("btnStampaMobile");
  if (mobilePrintBtn) {
    mobilePrintBtn.title = tx("printTitle");
    mobilePrintBtn.setAttribute("aria-label", tx("printTitle"));
  }
  const exportMenu = document.getElementById("projectExportMenu");
  if (exportMenu) exportMenu.setAttribute("aria-label", tx("exportMenuAria"));
  setText("#exportPdfLabel", "exportPdf");
  setText("#exportPdfHint", "exportPdfHint");
  setText("#exportPrintLabel", "exportPrint");
  setText("#exportPrintHint", "exportPrintHint");
  setText("#exportPngLabel", "exportPng");
  setText("#exportPngHint", "exportPngHint");
  setText(".pdp-header-title", "plantSheetTitle");
  setText("#pdpBackBtn span", "closePlantSheet");
  const pdpBackBtn = document.getElementById("pdpBackBtn");
  if (pdpBackBtn)
    pdpBackBtn.setAttribute("aria-label", tx("closePlantSheetAria"));
  setText(".mobile-go-to-scene span", "goToGreenhouse");
  const mobileGoToScene = document.querySelector(".mobile-go-to-scene");
  if (mobileGoToScene)
    mobileGoToScene.setAttribute("aria-label", tx("goToGreenhouseAria"));
  setText("#btnRipristina .btn-label", "restoreAutoFill");
  setText("#btnClear .btn-label", "clearGreenhouse");
  setText("#btnUndoLabel", "undoAction");
  setText("#btnRedoLabel", "redoAction");
  setText("#btnNoviceRestartLabel", "noviceRestart");
  setText("#btnExpertSeasonalLabel", "expertSeasonal");
  updateClearGreenhouseCopy();
  setText("#panelYield h2", "yieldCost");
  setText("#yieldSub", "yieldSub");
  setText("#yieldEditCropsLabel", "yieldEditCropsLabel");
  setText("#yieldEditCropsHint", "yieldEditCropsHint");
  const yieldEditBtn = document.getElementById("btnEditCropsFromYield");
  if (yieldEditBtn)
    yieldEditBtn.setAttribute("aria-label", tx("yieldEditCropsAria"));
  setText("#modeFitTitle", "modeFitTitle");
  setText("#modeFitHint", "modeFitHint");
  setText("#modeExpertTitle", "modeExpertTitle");
  setText("#modeExpertHint", "modeExpertHint");
  updateAllPanelToggles();
  fillMonths();
}
