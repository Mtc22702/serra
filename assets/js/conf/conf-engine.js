// Calcola i conteggi di piante e file rispettando spaziatura e dimensioni dell'aiuola.
function countForPlant(p, targetRows = 2) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d;
  const cols = maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
  return Math.max(1, cols * targetRows);
}

// Restituisce il numero di piante per fila
function rowSizeForPlant(p) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d;
  return maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
}

// Restituisce il numero di file ideali in base alla spaziatura
function targetRowsForPlant(p) {
  if (p.d <= 15) return 4;
  if (p.d <= 30) return 3;
  if (p.d <= 60) return 2;
  return 1;
}

const MIN_PLANT_COUNTS = {
  pomodoro: 4,
  peperone: 4,
  peperoncino: 3,
  melanzana: 4,
  zucchina: 2,
  zucca: 1,
  cetriolo: 3,
  melone: 1,
  anguria: 1,
  lattuga: 8,
  radicchio: 6,
  rucola: 12,
  spinaci: 12,
  bietola: 6,
  cavolo: 4,
  verza: 4,
  broccolo: 4,
  cavolfiore: 4,
  cavolonero: 4,
  cavolorapa: 6,
  carota: 24,
  finocchio: 4,
  prezzemolo: 6,
  basilico: 6,
  coriandolo: 8,
  aneto: 4,
  cipolla: 20,
  aglio: 20,
  porro: 12,
  scalogno: 12,
  fagiolino: 8,
  fagiolo: 6,
  pisello: 10,
  fragola: 6,
  sedano: 6,
  ravanello: 20,
  barbabietola: 12,
  cicoria: 8,
  indivia: 6,
  pakchoi: 8,
  cavoletti: 4,
  rapa: 12,
  valerianella: 20,
  rosmarino: 1,
  timo: 4,
  origano: 4,
  salvia: 2
};

// Restituisce il numero minimo di esemplari per la pianta
function minimumCountForPlant(p) {
  if (!p) return 1;
  if (MIN_PLANT_COUNTS[p.id]) return MIN_PLANT_COUNTS[p.id];
  if (p.d >= 90) return 1;
  if (p.d >= 60) return 2;
  if (p.d >= 40) return 4;
  if (p.d >= 25) return 6;
  if (p.d >= 15) return 10;
  return 12;
}

// Calcola il numero target di varietà in base all'area
function targetVarietyCount(candidatesLength) {
  const area = state.larghezza * state.lunghezza;
  let target = 5;
  if (area >= 30) target = 7;
  if (area >= 55) target = 9;
  if (area >= 80) target = 11;
  return Math.min(candidatesLength, target);
}

// Verifica se la pianta può occupare un'intera fila
function canUseFilaLayout(p) {
  return (
    state.larghezza >= 4.2 &&
    state.lunghezza >= 4.8 &&
    p.arch === "rampicante" &&
    p.h === "alta"
  );
}

// Calcola il numero di piante per layout a fila intera
function countForFilaPlant(p) {
  const Li = state.lunghezza * 100;
  const Sc = p.dr || p.d;
  const filesAcross = maxSlotsForSpan(usableBedWidth() - 2 * BEDPAD, Sc);
  const plantsPerFile = maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, p.d);
  return filesAcross * plantsPerFile;
}

// Restituisce il conteggio predefinito per la pianta
function defaultCount(p) {
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, targetRowsForPlant(p))
  );
}

// Conteggio iniziale per il piano automatico
function starterCountForAutoPlant(p, useFila = false) {
  if (useFila) return countForFilaPlant(p);
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, Math.min(targetRowsForPlant(p), 2))
  );
}

// Gestisce la pianta selezionata e gli snapshot necessari alle modifiche reversibili.
function rememberSelection() {
  return state.selected >= 0 && state.selected < state.beds.length
    ? state.beds[state.selected].plantId
    : null;
}

// Ripristina la selezione in base all'ID pianta
function restoreSelection(plantId) {
  state.selected = plantId
    ? state.beds.findIndex((bed) => bed.plantId === plantId)
    : -1;
}

// Valida e normalizza le aiuole caricate dal salvataggio
function normalizeSavedBeds(beds) {
  if (!Array.isArray(beds)) return [];
  const seen = new Set();
  return beds
    .map((bed) => {
      const p = BYID[bed?.plantId];
      const savedLayout = bed?.layout === "fila" ? "fila" : "blocco";

      const layout =
        savedLayout === "fila" && p && !canUseFilaLayout(p)
          ? "blocco"
          : savedLayout;
      return {
        plantId: bed?.plantId,
        count: Math.max(1, Math.round(parseInt(bed?.count) || 1)),
        layout,
        countLocked: Boolean(bed?.countLocked),
        col: Number.isInteger(bed?.col) && bed.col >= 0 ? bed.col : undefined
      };
    })
    .filter((bed) => {
      if (!BYID[bed.plantId] || seen.has(bed.plantId)) return false;
      seen.add(bed.plantId);
      return true;
    });
}

// Ordina le aiuole per altezza e compatibilità visiva nel piano della serra.
function heightSortValue(h) {
  return state.sudInBasso ? 2 - H_RANK[h] : H_RANK[h];
}

// Ordina le aiuole per altezza e compatibilità
function sortBedsForLayout() {
  state.beds.sort((a, b) => {
    const pa = BYID[a.plantId];
    const pb = BYID[b.plantId];
    return (
      Number(b.layout === "fila") - Number(a.layout === "fila") ||
      heightSortValue(pa.h) - heightSortValue(pb.h) ||
      (pa.acqua === "alta") - (pb.acqua === "alta") ||
      pa.d - pb.d
    );
  });
  if (state.beds.length < 3) return;

  const ordered = [];
  const remaining = state.beds.slice();
  while (remaining.length) {
    const last = ordered.length
      ? BYID[ordered[ordered.length - 1].plantId]
      : null;
    let bestIndex = 0;
    let bestScore = Infinity;
    remaining.forEach((bed, index) => {
      const p = BYID[bed.plantId];
      const conflictsWithPlaced = ordered.reduce(
        (sum, placed) =>
          sum + (areIncompatible(p, BYID[placed.plantId]) ? 1 : 0),
        0
      );
      const score =
        (last && areIncompatible(p, last) ? 1000 : 0) +
        conflictsWithPlaced * 30 -
        (last && areCompanions(p, last) ? 20 : 0) +
        heightSortValue(p.h) * 4 +
        p.d * 0.01 +
        index * 0.001;
      if (score < bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });
    ordered.push(remaining.splice(bestIndex, 1)[0]);
  }
  state.beds = ordered;
}

// Riduce le quantità quando il piano supera lo spazio disponibile della serra.
function shrinkOverflowToFit(options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  const allowRemove = options.allowRemove !== false;
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const candidates = state.beds
      .map((b, index) => ({ ...b, index, plant: BYID[b.plantId] }))
      .filter((b) => b.layout !== "fila");
    const flexibleCandidates = preserveLockedCounts
      ? candidates.filter((b) => !b.countLocked)
      : candidates;
    if (preserveLockedCounts && flexibleCandidates.length === 0) break;
    const shrinkCandidates = preserveLockedCounts
      ? flexibleCandidates
      : candidates;

    const reducible = shrinkCandidates
      .filter(
        (b) =>
          b.count >
          Math.max(rowSizeForPlant(b.plant), minimumCountForPlant(b.plant))
      )
      .sort((a, b) => b.count - a.count || b.plant.d - a.plant.d);

    if (reducible.length > 0) {
      const largest = reducible[0];
      const step = rowSizeForPlant(largest.plant);
      const minCount = Math.max(
        rowSizeForPlant(largest.plant),
        minimumCountForPlant(largest.plant)
      );
      state.beds[largest.index].count = Math.max(
        minCount,
        largest.count - step
      );
    } else if (allowRemove) {
      const toRemove = shrinkCandidates.sort(
        (a, b) => b.plant.d - a.plant.d || b.count - a.count
      )[0];
      if (!toRemove) break;
      state.beds.splice(toRemove.index, 1);
    } else {
      break;
    }
    guard++;
  }
}

// Espande le aiuole a fila fino alla lunghezza disponibile
function expandFilaBedsToLength(fillToLength = true, options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (preserveLockedCounts && bed.countLocked) return;
    if (bed.layout === "fila" && plant && canUseFilaLayout(plant)) {
      const capacity = countForFilaPlant(plant);
      bed.count = fillToLength ? capacity : Math.min(bed.count, capacity);
    }
  });
}

// Garantisce il conteggio minimo in ogni aiuola
function enforceMinimumBedCounts(options = {}) {
  const preserveLockedCounts = options.preserveLockedCounts === true;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant || bed.layout === "fila") return;
    if (preserveLockedCounts && bed.countLocked) return;
    const minCount = minimumCountForPlant(plant);
    if (bed.count >= minCount) return;
    const before = bed.count;
    bed.count = minCount;
    if (computeLayout().overflow) bed.count = before;
  });
}

// Azzera i conteggi delle colture per il ricalcolo
function resetSelectedCropCountsForOptimization() {
  let hasFila = false;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const useFila =
      canUseFilaLayout(plant) && !hasFila && bed.layout === "fila";
    if (useFila) hasFila = true;
    bed.layout = useFila ? "fila" : "blocco";
    bed.count = useFila
      ? countForFilaPlant(plant)
      : starterCountForAutoPlant(plant, false);
    bed.countLocked = false;
  });
}

// Normalizza i valori di input delle colture selezionate
function normalizeSelectedCropInputsForOptimization() {
  let hasFila = false;
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const useFila =
      canUseFilaLayout(plant) && !hasFila && bed.layout === "fila";
    if (useFila) hasFila = true;
    bed.layout = useFila ? "fila" : "blocco";
    bed.count = Math.max(1, Math.round(parseInt(bed.count) || 1));
    bed.countLocked = Boolean(bed.countLocked);
  });
}

// Ripristina i conteggi manuali se non causano overflow
function restoreManualCountsWhenPossible(manualCounts) {
  state.beds.forEach((bed) => {
    const desired = manualCounts.get(bed.plantId);
    if (!desired || bed.count >= desired) return;
    const before = bed.count;
    bed.count = desired;
    if (computeLayout().overflow) bed.count = before;
  });
}

// Ribilancia il layout manuale senza modificare i conteggi
function rebalanceManualLayoutOnly() {
  const selectedPlant = rememberSelection();
  expandFilaBedsToLength(false, { preserveLockedCounts: true });
  sortBedsForLayout();
  restoreSelection(selectedPlant);
}

// Bilancia automaticamente le aiuole per rispettare blocchi e spazio disponibile.
function flexibleCropReductionCandidates(layout, lockedPlantId) {
  return state.beds
    .map((bed, index) => {
      const plant = BYID[bed.plantId];
      const layoutBed = layout.beds.find((item) => item.idx === index);
      if (
        !plant ||
        bed.plantId === lockedPlantId ||
        bed.countLocked ||
        bed.layout === "fila" ||
        !layoutBed
      ) {
        return null;
      }
      const minCount = Math.max(1, minimumCountForPlant(plant));
      const surplus = bed.count - minCount;
      if (surplus <= 0) return null;
      return { bed, index, plant, layoutBed, floorCount: minCount, surplus };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(b.bed.count > b.floorCount) -
          Number(a.bed.count > a.floorCount) ||
        b.surplus - a.surplus ||
        b.bed.count - a.bed.count ||
        b.layoutBed.h - a.layoutBed.h ||
        b.plant.d - a.plant.d
    );
}

// Riduce le colture flessibili per ospitare la pianta bloccata
function reduceFlexibleCropsForLockedChange(lockedPlantId) {
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const layout = computeLayout();
    const candidates = flexibleCropReductionCandidates(layout, lockedPlantId);
    if (!candidates.length) break;
    const item = candidates[0];
    const step = Math.max(1, rowSizeForPlant(item.plant));
    const before = item.bed.count;
    item.bed.count = Math.max(
      item.floorCount,
      item.bed.count - Math.min(step, item.surplus)
    );
    if (item.bed.count === before) break;

    rebalanceManualLayoutOnly();
    guard++;
  }
}

// Applica la modifica bloccata e tenta l'adattamento
function fitLockedCountChange(lockedPlantId, beforeSnapshot) {
  const hasFlexibleAdjustments = () => {
    const beforeById = new Map(beforeSnapshot.map((bed) => [bed.plantId, bed]));
    return (
      state.beds.some((bed) => {
        if (bed.plantId === lockedPlantId) return false;
        const before = beforeById.get(bed.plantId);
        return (
          !before || before.count !== bed.count || before.layout !== bed.layout
        );
      }) ||
      beforeSnapshot.some(
        (bed) =>
          bed.plantId !== lockedPlantId &&
          !state.beds.some((current) => current.plantId === bed.plantId)
      )
    );
  };
  rebalanceManualLayoutOnly();
  if (computeLayout().overflow) {
    reduceFlexibleCropsForLockedChange(lockedPlantId);
  }
  if (computeLayout().overflow) {
    shrinkOverflowToFit({ preserveLockedCounts: true, allowRemove: false });
    rebalanceManualLayoutOnly();
  }
  if (computeLayout().overflow) {
    restoreBedsSnapshot(beforeSnapshot);
    return "rejected";
  }
  if (!hasFlexibleAdjustments()) return "accepted";
  return "adjusted";
}

// Esegue il ciclo completo di bilanciamento automatico
function autoBalanceLayout(
  keepSelection = true,
  expandToSpace = true,
  options = {}
) {
  const selectedPlant = keepSelection ? rememberSelection() : null;
  const respectDiversityLimit =
    options.respectDiversityLimit === true ||
    (options.respectDiversityLimit !== false &&
      state.autoPlan &&
      state.livello !== "esperto");

  expandFilaBedsToLength(options.fillFilaToLength !== false, {
    preserveLockedCounts: options.preserveLockedCounts === true
  });
  if (expandToSpace)
    enforceMinimumBedCounts({
      preserveLockedCounts: options.preserveLockedCounts === true
    });
  sortBedsForLayout();
  rebalanceColumnsFresh();
  shrinkOverflowToFit({
    preserveLockedCounts: options.preserveLockedCounts === true,
    allowRemove: options.allowRemove !== false
  });
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit
    });

  sortBedsForLayout();
  rebalanceColumnsFresh();
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit
    });
  shrinkOverflowToFit({
    preserveLockedCounts: options.preserveLockedCounts === true,
    allowRemove: options.allowRemove !== false
  });
  restoreSelection(selectedPlant);
}

// Applica modifiche manuali alle colture preservando le scelte bloccate dall'utente.
function addPlant(id) {
  if (state.beds.some((b) => b.plantId === id)) return;
  const p = BYID[id];
  if (!p) return;
  const historyBefore = captureHistorySnapshot();

  const before = {
    beds: cloneBedsSnapshot(),
    autoPlan: state.autoPlan
  };

  state.beds.push({
    plantId: id,
    count: Math.max(
      1,
      Math.min(defaultCount(p), starterCountForAutoPlant(p, false))
    ),
    layout: "blocco",
    countLocked: false
  });
  state.autoPlan = false;
  state.manualPlanNotice = "";
  state.selected = state.beds.findIndex((b) => b.plantId === id);

  // Bilancia l'espansione automatica tra le colture.
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false,
    respectDiversityLimit: true
  });

  const noSpace =
    !state.beds.some((b) => b.plantId === id) || computeLayout().overflow;
  if (noSpace) {
    restoreBedsSnapshot(before.beds);
    state.autoPlan = before.autoPlan;
    state.manualPlanNotice = "addNoSpace";
    state.selected = -1;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  commitColumnAssignment();
  saveConfig(true);
  render();
  if (noSpace) alert(tx("addNoSpace"));
}

// Verifica se lo spazio liberato va riempito automaticamente
function shouldAutoRefillFreedSpace() {
  return state.livello !== "esperto";
}

// Riempie lo spazio liberato preservando i blocchi
function fillFreedSpacePreservingLocks() {
  clearColumnAssignment();
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });

  fillColumnTailsWithFiller();
  commitColumnAssignment();
}

// Elimina la pianta dal piano per ID
function removePlantById(id) {
  const index = state.beds.findIndex((b) => b.plantId === id);
  if (index < 0) return;
  recordHistory();
  state.beds.splice(index, 1);
  state.autoPlan = false;
  state.manualPlanNotice = "";
  if (state.selected === index) state.selected = -1;
  else if (state.selected > index) state.selected -= 1;

  const refill = shouldAutoRefillFreedSpace();
  autoBalanceLayout(true, refill, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });

  if (refill) fillColumnTailsWithFiller(new Set([id]));
  commitColumnAssignment();
  saveConfig(true);
  render();
}

// Ricalcola il piano dopo un cambio di mese o zona
function refreshForSeasonChange() {
  resetHistory();

  if (
    state.autoPlan ||
    state.livello === "novizio" ||
    state.beds.length === 0
  ) {
    autoFill({ compactPaths: false });
  } else {
    clearColumnAssignment();
    autoBalanceLayout(true, false);
    commitColumnAssignment();
    render();
  }
}

// Dispone le piante selezionate senza modificare i conteggi
function arrangeSelectedPlantsExact() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  const historyBefore = captureHistorySnapshot();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  normalizeSelectedCropInputsForOptimization();
  rebalanceManualLayoutOnly();
  commitColumnAssignment();
  if (bedsSnapshotsMatch(historyBefore.beds, cloneBedsSnapshot())) {
    state.autoPlan = historyBefore.autoPlan;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  saveConfig(true);
  render();
}

// Massimizza le piante selezionate riempiendo la serra
function fillSelectedPlants() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  const historyBefore = captureHistorySnapshot();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  // Preserva le quantità bloccate durante il riempimento.
  const lockedCounts = new Map(
    state.beds
      .filter((bed) => bed.countLocked)
      .map((bed) => [bed.plantId, bed.count])
  );
  normalizeSelectedCropInputsForOptimization();
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (plant && bed.layout === "fila" && !bed.countLocked) {
      bed.count = countForFilaPlant(plant);
    }
  });
  autoBalanceLayout(true, true, {
    fillFilaToLength: false,
    expandLockedCounts: false,
    preserveLockedCounts: true
  });
  restoreManualCountsWhenPossible(lockedCounts);
  commitColumnAssignment();
  if (bedsSnapshotsMatch(historyBefore.beds, cloneBedsSnapshot())) {
    state.autoPlan = historyBefore.autoPlan;
  } else {
    recordHistorySnapshot(historyBefore);
  }
  saveConfig(true);
  render();
}

// Conclude la modifica manuale e aggiorna il piano
function finalizeManualCountChange(fitResult, selectedPlant) {
  if (fitResult !== "rejected" && shouldAutoRefillFreedSpace()) {
    fillFreedSpacePreservingLocks();
  }
  state.manualPlanNotice =
    fitResult === "rejected"
      ? "manualCountRejected"
      : fitResult === "adjusted"
        ? "manualCountAdjusted"
        : "";
  restoreSelection(selectedPlant);
  commitColumnAssignment();
  saveConfig(true);
  render();
}

// Modifica il conteggio di una pianta di un delta
function changePlantCount(id, delta) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  const historyBefore = captureHistorySnapshot();
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = Math.max(1, Math.round((parseInt(bed.count) || 1) + delta));
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  if (fitResult === "rejected") state.autoPlan = historyBefore.autoPlan;
  else recordHistorySnapshot(historyBefore);
  finalizeManualCountChange(fitResult, selectedPlant);
}

// Imposta il conteggio esatto di una pianta
function setPlantCount(id, value) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  const historyBefore = captureHistorySnapshot();
  const nextCount = Math.max(1, Math.round(parseInt(value) || 1));
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = nextCount;
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  if (fitResult === "rejected") state.autoPlan = historyBefore.autoPlan;
  else recordHistorySnapshot(historyBefore);
  finalizeManualCountChange(fitResult, selectedPlant);
}

// Calcola larghezza e posizione del camminamento per il piano generato automaticamente.
function compactPathForAutoFill() {
  if (state.larghezza >= 6 && state.lunghezza >= 7)
    return Math.min(state.path, 45);
  if (state.larghezza >= 4.2 && state.lunghezza >= 6)
    return Math.min(state.path, 50);
  return state.path;
}

// Conserva l'ultima geometria manuale valida per poter rifiutare un
// ridimensionamento che non può contenere le quantità bloccate dall'utente.
let lastAcceptedGeometry = {
  larghezza: state.larghezza,
  lunghezza: state.lunghezza,
  path: state.path
};

function rememberAcceptedGeometry() {
  lastAcceptedGeometry = {
    larghezza: state.larghezza,
    lunghezza: state.lunghezza,
    path: state.path
  };
}

function restoreAcceptedGeometry() {
  state.larghezza = lastAcceptedGeometry.larghezza;
  state.lunghezza = lastAcceptedGeometry.lunghezza;
  state.path = lastAcceptedGeometry.path;
  syncSizeControls();
}

// Rigenera il piano automatico dopo un cambio di dimensioni
function refreshAutoPlanForGeometry(compactPaths = true) {
  resetHistory();

  if (state.autoPlan || state.livello === "novizio") {
    autoFill({ compactPaths });
    rememberAcceptedGeometry();
    return;
  }

  const bedsBeforeResize = cloneBedsSnapshot();
  clearColumnAssignment();
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });
  if (computeLayout().overflow) {
    restoreBedsSnapshot(bedsBeforeResize);
    restoreAcceptedGeometry();
    state.manualPlanNotice = "lockedGeometryRejected";
    commitColumnAssignment();
    saveConfig(true);
    render();
    return;
  }
  state.manualPlanNotice = "";
  commitColumnAssignment();
  rememberAcceptedGeometry();
  saveConfig(true);
  render();
}

// Calcola lo spazio sprecato nel layout corrente
function layoutWasteScore(layout = computeLayout()) {
  const target = layout.Li - MARGIN;
  const gaps = layout.columnHeights.map((h) => Math.max(0, target - h));
  const squaredGaps = gaps.reduce((sum, gap) => sum + gap * gap, 0);
  return squaredGaps + Math.max(...gaps, 0) * 25;
}

// Limite massimo di espansione automatica per una pianta
function autoExpansionLimitForPlant(p) {
  const row = Math.max(1, rowSizeForPlant(p));
  const min = minimumCountForPlant(p);
  const baseline = Math.max(starterCountForAutoPlant(p, false), min);

  const area = state.larghezza * state.lunghezza;
  const rowsBase = state.livello === "novizio" ? 6 : 8;
  const rows = rowsBase + Math.floor(area / 10);
  return Math.max(baseline, min * 3, row * rows);
}

// Clona lo stato delle aiuole per undo/confronto
function cloneBedsSnapshot() {
  return state.beds.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col
  }));
}

// Confronta due snapshot senza dipendere da riferimenti mutabili dello stato.
function bedsSnapshotsMatch(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

// Ripristina lo stato delle aiuole da uno snapshot
function restoreBedsSnapshot(snapshot) {
  state.beds = snapshot.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col
  }));
}

// Gestisce snapshot e pile annulla-ripristina delle modifiche al progetto.
const HISTORY_LIMIT = 60;
let undoStack = [];
let redoStack = [];

// Cattura lo snapshot completo per lo storico
function captureHistorySnapshot() {
  return {
    beds: cloneBedsSnapshot(),
    autoPlan: state.autoPlan,
    activePreset: state.activePreset,
    selected: state.selected
  };
}

// Applica uno snapshot allo stato corrente
function applyHistorySnapshot(snap) {
  restoreBedsSnapshot(snap.beds);
  state.autoPlan = snap.autoPlan;
  state.activePreset = snap.activePreset;
  state.selected = snap.selected;
}

// Registra uno snapshot valido nello storico.
function recordHistorySnapshot(snapshot) {
  undoStack.push(snapshot);
  if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Aggiunge lo stato attuale allo stack undo
function recordHistory() {
  recordHistorySnapshot(captureHistorySnapshot());
}

// Azzera gli stack undo e redo
function resetHistory() {
  undoStack = [];
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Verifica se esiste un'azione da annullare
function canUndo() {
  return undoStack.length > 0;
}

// Verifica se esiste un'azione da ripristinare
function canRedo() {
  return redoStack.length > 0;
}

// Annulla l'ultima modifica e ridisegna
function undoLastChange() {
  if (!undoStack.length) return;
  redoStack.push(captureHistorySnapshot());
  applyHistorySnapshot(undoStack.pop());
  commitColumnAssignment();
  state.manualPlanNotice = "";
  saveConfig(true);
  render();
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Ripristina l'ultima modifica annullata
function redoLastChange() {
  if (!redoStack.length) return;
  undoStack.push(captureHistorySnapshot());
  applyHistorySnapshot(redoStack.pop());
  commitColumnAssignment();
  state.manualPlanNotice = "";
  saveConfig(true);
  render();
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

// Genera un piano stagionale privilegiando colture compatibili con i parametri scelti.
function finalizeAutoFillWithOptimizeBaseline() {
  const original = cloneBedsSnapshot();
  const beforeLayout = computeLayout();
  const beforeScore = beforeLayout.overflow
    ? Infinity
    : layoutWasteScore(beforeLayout);

  resetSelectedCropCountsForOptimization();
  autoBalanceLayout(false, true);

  const afterLayout = computeLayout();
  const afterScore = afterLayout.overflow
    ? Infinity
    : layoutWasteScore(afterLayout);
  if (afterScore < beforeScore - 0.1) return;
  restoreBedsSnapshot(original);
}

// Espande le aiuole idonee per utilizzare lo spazio residuo della serra.
function expandAutoFillToSpace(options = {}) {
  const skipLockedCounts = options.skipLockedCounts === true;
  const respectDiversityLimit = options.respectDiversityLimit === true;
  const fillScore = layoutWasteScore;

  let guard = 0;
  while (guard < 900) {
    const currentLayout = computeLayout();
    const currentScore = fillScore(currentLayout);
    let best = null;

    const candidates = state.beds
      .map((bed, index) => {
        const layoutBed = currentLayout.beds.find((item) => item.idx === index);
        const plant = BYID[bed.plantId];
        return { index, bed, plant, layoutBed };
      })
      .filter(
        (item) =>
          item.plant &&
          item.bed.layout !== "fila" &&
          item.layoutBed &&
          (!respectDiversityLimit ||
            item.bed.count < autoExpansionLimitForPlant(item.plant)) &&
          (!skipLockedCounts || !item.bed.countLocked)
      )
      .sort((a, b) => {
        const ah = currentLayout.columnHeights[a.layoutBed.columnIndex] || 0;
        const bh = currentLayout.columnHeights[b.layoutBed.columnIndex] || 0;
        return ah - bh || a.plant.d - b.plant.d || a.index - b.index;
      });

    for (const item of candidates) {
      const before = state.beds[item.index].count;
      const limit = respectDiversityLimit
        ? autoExpansionLimitForPlant(item.plant)
        : Infinity;
      state.beds[item.index].count = Math.min(
        limit,
        state.beds[item.index].count + rowSizeForPlant(item.plant)
      );
      if (state.beds[item.index].count === before) continue;
      const nextLayout = computeLayout();
      if (!nextLayout.overflow) {
        const nextScore = fillScore(nextLayout);
        if (!best || nextScore < best.score) {
          best = {
            index: item.index,
            count: state.beds[item.index].count,
            score: nextScore
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    guard++;
  }

  let fineGuard = 0;
  while (fineGuard < 300) {
    const currentLayout = computeLayout();
    const currentScore = fillScore(currentLayout);
    let best = null;

    const candidates = state.beds
      .map((bed, index) => {
        const layoutBed = currentLayout.beds.find((item) => item.idx === index);
        const plant = BYID[bed.plantId];
        return { index, bed, plant, layoutBed };
      })
      .filter(
        (item) =>
          item.plant &&
          item.bed.layout !== "fila" &&
          item.layoutBed &&
          (!respectDiversityLimit ||
            item.bed.count < autoExpansionLimitForPlant(item.plant)) &&
          (!skipLockedCounts || !item.bed.countLocked)
      )
      .sort((a, b) => {
        const ah = currentLayout.columnHeights[a.layoutBed.columnIndex] || 0;
        const bh = currentLayout.columnHeights[b.layoutBed.columnIndex] || 0;
        return ah - bh || a.plant.d - b.plant.d || a.index - b.index;
      });

    for (const item of candidates) {
      const before = state.beds[item.index].count;
      state.beds[item.index].count += 1;
      const nextLayout = computeLayout();
      if (!nextLayout.overflow) {
        const nextScore = fillScore(nextLayout);
        if (!best || nextScore < best.score) {
          best = {
            index: item.index,
            count: state.beds[item.index].count,
            score: nextScore
          };
        }
      }
      state.beds[item.index].count = before;
    }

    if (!best || best.score >= currentScore - 0.1) break;
    state.beds[best.index].count = best.count;
    fineGuard++;
  }

  fillVisualPaddingRows({ skipLockedCounts, respectDiversityLimit });
}

// Aggiunge file di padding per riempire visivamente le aiuole
function fillVisualPaddingRows(options = {}) {
  const skipLockedCounts = options.skipLockedCounts === true;
  const respectDiversityLimit = options.respectDiversityLimit === true;
  state.beds.forEach((bed, index) => {
    if (bed.layout === "fila") return;
    if (skipLockedCounts && bed.countLocked) return;
    const plant = BYID[bed.plantId];
    if (!plant) return;
    const step = Math.max(1, rowSizeForPlant(plant));
    let guard = 0;
    while (guard++ < 100) {
      if (
        respectDiversityLimit &&
        bed.count + step > autoExpansionLimitForPlant(plant)
      ) {
        break;
      }
      const before = computeLayout();
      const bedBefore = before.beds.find((b) => b.idx === index);
      if (!bedBefore || before.overflow) break;
      const prevCount = bed.count;
      bed.count += step;
      const after = computeLayout();
      const bedAfter = after.beds.find((b) => b.idx === index);

      if (!after.overflow && bedAfter && bedAfter.h <= bedBefore.h + 0.5) {
        continue;
      }
      bed.count = prevCount;
      break;
    }
  });
}

// Seleziona colture compatte per riempire gli spazi residui tra le aiuole.
const FILLER_CROPS = [
  "ravanello",
  "valerianella",
  "rucola",
  "cipollotto",
  "spinaci",
  "lattuga",
  "carota",
  "rapa",
  "cicoria"
];

const FILLER_MIN_GAP = 60;

// Sceglie la coltura tappabuchi più adatta al gap disponibile
function pickFillerCrop(gap, excludeIds = null) {
  const present = new Set(state.beds.map((b) => b.plantId));
  if (excludeIds) excludeIds.forEach((id) => present.add(id));
  const allPlants = state.beds.map((b) => BYID[b.plantId]).filter(Boolean);
  const seasonalIds = new Set(seminabili().map((p) => p.id));
  const fits = (p) =>
    Math.max(46, visualPlantRadius(p) * 3 + 18) + BED_GAP <= gap + 1;

  const compatible = (p) => !allPlants.some((cp) => areIncompatible(p, cp));

  for (const id of FILLER_CROPS) {
    const p = BYID[id];
    if (!p || present.has(id) || !seasonalIds.has(id)) continue;
    if (!compatible(p) || !fits(p)) continue;
    return p;
  }

  const fallback = seminabili()
    .filter(
      (p) =>
        !present.has(p.id) &&
        p.h !== "alta" &&
        compatible(p) &&
        fits(p) &&
        (state.livello !== "novizio" || !EXOTIC_PLANTS.has(p.id))
    )
    .sort((a, b) => a.d - b.d);
  return fallback[0] || null;
}

// Riempie gli spazi residui delle colonne.
function fillColumnTailsWithFiller(excludeIds = null) {
  let guard = 0;
  while (guard++ < 40) {
    const L = computeLayout();
    if (L.overflow) break;
    const columnCount = L.columnCount;

    if (state.beds.length < columnCount) break;
    const target = L.Li - MARGIN;
    let shortCol = -1;
    let maxGap = 0;
    L.columnHeights.forEach((h, i) => {
      const gap = target - h;
      if (gap > maxGap) {
        maxGap = gap;
        shortCol = i;
      }
    });
    if (shortCol < 0 || maxGap < FILLER_MIN_GAP) break;
    const filler = pickFillerCrop(maxGap, excludeIds);
    if (!filler) break;
    state.beds.push({
      plantId: filler.id,
      count: 1,
      layout: "blocco",
      countLocked: false,
      col: shortCol
    });
    if (computeLayout().overflow) {
      state.beds.pop();
      break;
    }
    const bed = state.beds[state.beds.length - 1];
    const step = Math.max(1, rowSizeForPlant(filler));

    let rowGuard = 0;
    while (rowGuard++ < 300) {
      const beforeCount = bed.count;
      bed.count += step;
      if (computeLayout().overflow) {
        bed.count = beforeCount;
        break;
      }
    }
    let fineGuard = 0;
    while (fineGuard++ < 200) {
      const beforeCount = bed.count;
      bed.count += 1;
      if (computeLayout().overflow) {
        bed.count = beforeCount;
        break;
      }
    }
  }
}

const AUTO_PREFERRED = [
  "pomodoro",
  "basilico",
  "lattuga",
  "rucola",
  "carota",
  "zucchina",
  "fagiolino",
  "cetriolo",
  "peperone",
  "prezzemolo",
  "spinaci",
  "ravanello",
  "cipolla",
  "fragola",
  "bietola",
  "timo",
  "origano"
];

// Restituisce il livello di difficoltà della pianta
function autoDifficulty(p) {
  return DIFFICULTY[p.id] || 3;
}

// Calcola il punteggio di priorità per la selezione automatica
function autoCropScore(p) {
  let s = autoDifficulty(p) * 60;

  const pref = AUTO_PREFERRED.indexOf(p.id);
  if (pref >= 0) s -= 130 - pref;

  s -= Math.min(p.resa || 0, 5) * 3;
  s += Math.min(p.gg || 120, 200) * 0.04;
  return s;
}

// Costruisce il pool di candidati per il piano stagionale
function autoCandidatePool() {
  const seasonal = seminabili();
  let pool;
  if (state.livello === "novizio") {
    pool = seasonal.filter((p) => autoDifficulty(p) <= 2);

    if (pool.length < 4) {
      pool = seasonal.filter(
        (p) => autoDifficulty(p) <= 3 && !EXOTIC_PLANTS.has(p.id)
      );
    }
  } else {
    pool = seasonal.slice();
  }
  return pool.sort(
    (a, b) =>
      autoCropScore(a) - autoCropScore(b) ||
      a.nome.localeCompare(b.nome, "it", { sensitivity: "base" })
  );
}

// Garantisce almeno una pianta nel piano se possibile
function ensureMinimalFill(candidates) {
  for (const p of candidates) {
    let best = 0;
    for (let c = minimumCountForPlant(p); c >= 1; c--) {
      state.beds = [
        { plantId: p.id, count: c, layout: "blocco", countLocked: false }
      ];
      if (!computeLayout().overflow) {
        best = c;
        break;
      }
    }
    if (best > 0) {
      state.beds = [
        { plantId: p.id, count: best, layout: "blocco", countLocked: false }
      ];
      return true;
    }
  }
  state.beds = [];
  return false;
}

// Avvia il riempimento automatico
function autoFill(options = {}) {
  const { compactPaths = true } = options;
  state.autoPlan = true;
  state.activePreset = "";
  state.autoPlanNotice = "";
  state.manualPlanNotice = "";
  if (compactPaths) state.path = compactPathForAutoFill();
  syncSizeControls();
  const candidates = autoCandidatePool();
  state.beds = [];
  let filaSlots = Math.max(0, layoutColumns(state.larghezza * 100) - 1);
  const sortedCandidates = candidates.slice();
  const minVarieties = targetVarietyCount(sortedCandidates.length);
  const skippedConflicts = [];
  const addAutoCandidate = (p, allowFila = true) => {
    const useFila = allowFila && filaSlots > 0 && canUseFilaLayout(p);
    state.beds.push({
      plantId: p.id,
      count: 1,
      layout: useFila ? "fila" : "blocco",
      countLocked: false
    });
    state.beds[state.beds.length - 1].count = useFila
      ? starterCountForAutoPlant(p, true)
      : starterCountForAutoPlant(p, false);
    if (computeLayout().overflow) {
      state.beds.pop();
      return false;
    }
    if (useFila) filaSlots--;
    return true;
  };
  for (const p of sortedCandidates) {
    const conflicts = state.beds.some((bed) =>
      areIncompatible(p, BYID[bed.plantId])
    );

    if (conflicts) {
      skippedConflicts.push(p);
      continue;
    }
    addAutoCandidate(p);
  }

  const poolIds = new Set(sortedCandidates.map((cp) => cp.id));
  const companionCap = minVarieties + 2;
  for (const bed of state.beds.slice()) {
    if (state.beds.length >= companionCap) break;
    const base = BYID[bed.plantId];
    if (!base) continue;
    for (const fid of base.amiche || []) {
      if (state.beds.length >= companionCap) break;
      if (!poolIds.has(fid)) continue;
      if (state.beds.some((b) => b.plantId === fid)) continue;
      const fp = BYID[fid];
      if (!fp) continue;
      if (state.beds.some((b) => areIncompatible(fp, BYID[b.plantId])))
        continue;
      addAutoCandidate(fp);
    }
  }

  for (const p of skippedConflicts) {
    if (state.beds.length >= minVarieties) break;
    if (state.beds.some((bed) => bed.plantId === p.id)) continue;
    const newConflicts = state.beds.filter((bed) =>
      areIncompatible(p, BYID[bed.plantId])
    ).length;
    if (newConflicts > 0) continue;
    addAutoCandidate(p);
  }

  if (state.beds.length < Math.ceil(minVarieties / 2)) {
    let acceptedCompromises = 0;
    for (const p of skippedConflicts) {
      if (state.beds.length >= Math.ceil(minVarieties / 2)) break;
      if (state.beds.some((bed) => bed.plantId === p.id)) continue;
      const newConflicts = state.beds.filter((bed) =>
        areIncompatible(p, BYID[bed.plantId])
      ).length;
      if (newConflicts <= 1 && addAutoCandidate(p)) acceptedCompromises++;
    }
    if (acceptedCompromises > 0) state.autoPlanNotice = "autoPlanCompromise";
  }
  if (state.beds.length === 0 && candidates.length) {
    const p = candidates[0];
    state.beds.push({
      plantId: p.id,
      count: minimumCountForPlant(p),
      layout: "blocco",
      countLocked: false
    });
    if (computeLayout().overflow) {
      state.beds.pop();
    } else {
      state.beds[0].count = Math.max(
        minimumCountForPlant(p),
        countForPlant(p, 1)
      );
      if (computeLayout().overflow)
        state.beds[0].count = minimumCountForPlant(p);
    }
  }

  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    bed.count =
      bed.layout === "fila"
        ? countForFilaPlant(plant)
        : starterCountForAutoPlant(plant, false);
    bed.countLocked = false;
  });

  autoBalanceLayout(false, true);

  finalizeAutoFillWithOptimizeBaseline();

  if (state.beds.length === 0 && candidates.length)
    ensureMinimalFill(candidates);

  expandAutoFillToSpace({ respectDiversityLimit: false });

  fillColumnTailsWithFiller();
  if (state.beds.length === 0) state.autoPlanNotice = "autoPlanEmptySeason";

  commitColumnAssignment();
  state.selected = -1;
  saveConfig(true);
  render();
}

// Riduce un preset fino a una pianta per varietà, senza cancellare colture.
function shrinkPresetPreservingCrops() {
  let guard = 0;
  while (computeLayout().overflow && guard++ < 1200) {
    const candidates = state.beds
      .map((bed, index) => ({ bed, index, plant: BYID[bed.plantId] }))
      .filter((item) => item.plant && item.bed.count > 1)
      .sort(
        (a, b) =>
          b.bed.count - a.bed.count ||
          b.plant.d - a.plant.d ||
          a.index - b.index
      );
    if (!candidates.length) break;
    candidates[0].bed.count -= 1;
    sortBedsForLayout();
    rebalanceColumnsFresh();
  }
  return !computeLayout().overflow;
}

// Importa un preset senza eliminare silenziosamente le varietà previste.
function loadPreset(key) {
  if (!PRESETS[key]) return;
  const historyBefore = captureHistorySnapshot();
  const requestedCounts = new Map(PRESETS[key]);
  state.beds = PRESETS[key].map(([id, cnt]) => ({
    plantId: id,
    count: cnt,
    layout: "blocco",
    countLocked: false
  }));
  state.autoPlan = false;
  state.activePreset = key;
  state.selected = -1;
  state.autoPlanNotice = "";
  state.manualPlanNotice = "";
  autoBalanceLayout(false, false, { allowRemove: false });

  if (!shrinkPresetPreservingCrops()) {
    applyHistorySnapshot(historyBefore);
    state.manualPlanNotice = "presetDoesNotFit";
    commitColumnAssignment();
    saveConfig(true);
    render();
    return false;
  }

  expandAutoFillToSpace({ respectDiversityLimit: false });
  commitColumnAssignment();
  const adapted = state.beds.some(
    (bed) => bed.count !== requestedCounts.get(bed.plantId)
  );
  state.manualPlanNotice = adapted ? "presetAdapted" : "";
  recordHistorySnapshot(historyBefore);
  saveConfig(true);
  render();
  return true;
}

// Esporta il piano corrente nel carrello semi
function exportConfToCart() {
  if (!state.beds.length) return;
  const seen = new Set();
  const items = state.beds
    .filter((b) => {
      if (seen.has(b.plantId)) return false;
      seen.add(b.plantId);
      return true;
    })
    .map((b) => ({
      id: b.plantId,
      bustine: Math.max(
        1,
        Math.ceil(b.count / (PACK_DATA[b.plantId]?.seeds ?? 100))
      )
    }));
  try {
    localStorage.setItem("ois.cart", JSON.stringify(items));
  } catch (_) {}
  loadConfCart();
  showConfCartNudge(items.length);
  setTimeout(openConfCart, 500);
}

// Importa le piante del carrello nel piano
function importCartToPlan(options = {}) {
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
  } catch (_) {
    raw = [];
  }
  const ids = raw.map((i) => (typeof i === "string" ? i : i.id));
  const uniqueIds = ids.filter(
    (id, index) => BYID[id] && ids.indexOf(id) === index
  );
  if (!uniqueIds.length) return false;
  const historyBefore = options.recordHistory ? captureHistorySnapshot() : null;
  state.beds = uniqueIds.map((id) => {
    const plant = BYID[id];
    return {
      plantId: id,
      count: Math.max(
        1,
        Math.min(defaultCount(plant), starterCountForAutoPlant(plant, false))
      ),
      layout: "blocco",
      countLocked: false
    };
  });
  state.autoPlan = false;
  state.selected = state.beds.length ? 0 : -1;
  vegFilter = "in";
  // Un carrello già composto corrisponde al percorso Intermedio: il piano è
  // pronto, ma l'utente può personalizzare disposizione e quantità.
  setLivello("intermedio", { mapMode: false });
  autoBalanceLayout(true, true);
  if (historyBefore) recordHistorySnapshot(historyBefore);
  saveConfig(true);
  render();
  setMode("expert", false);
  focusManualPlanningPath();
  return true;
}

// Apre e mette a fuoco il pannello pianificazione manuale
function focusManualPlanningPath() {
  window.setTimeout(() => openCustomizePanelAndFocus(), 120);
}

// Gestisce l'intent di avvio (preset, carrello, progetto)
function applyBootIntent() {
  if (isFreeProjectBoot()) {
    state.beds = [];
    state.autoPlan = false;
    state.selected = -1;
    vegFilter = "all";
    autoBalanceLayout(true, false);
    saveConfig(true);
    render();
    setMode("expert", false);
    if (!LIVELLI.has(BOOT_PARAMS.get("livello"))) focusManualPlanningPath();
    clearBootParams();
    return true;
  }
  if (shouldImportCart() && importCartToPlan()) {
    clearBootParams();
    return true;
  }
  const preset = requestedBootPreset();
  if (!preset) return false;

  if (isGuidedBoot()) {
    state.larghezza = 3;
    state.lunghezza = 5;
    syncSizeControls();
  }
  loadPreset(preset);
  if (isGuidedBoot()) {
    state.autoPlan = true;
    saveConfig(true);
    render();
  }
  clearBootParams();
  return true;
}
