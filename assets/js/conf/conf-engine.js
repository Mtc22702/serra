/* =========================================================================
   SEZIONE 10 - Motore quantita, layout manuale e riempimento spazi
   -------------------------------------------------------------------------
   Qui vivono le regole fisiche: quante piante entrano in un'aiuola, quando
   usare layout a fila, come preservare le quantita manuali e come riempire
   gli spazi vuoti senza sovrascrivere le scelte dell'utente.
   ========================================================================= */

/* Calcolo base delle quantita: traduce distanze botaniche in numeri piantabili. */
function countForPlant(p, targetRows = 2) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d; // distanza tra file, usata nella larghezza
  const cols = maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
  return Math.max(1, cols * targetRows);
}

function rowSizeForPlant(p) {
  const bedW = usableBedWidth();
  const Sc = p.dr || p.d; // distanza tra file, usata nella larghezza
  return maxSlotsForSpan(bedW - 2 * BEDPAD, Sc);
}

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

function targetVarietyCount(candidatesLength) {
  const area = state.larghezza * state.lunghezza;
  let target = 5;
  if (area >= 30) target = 7;
  if (area >= 55) target = 9;
  if (area >= 80) target = 11;
  return Math.min(candidatesLength, target);
}

function canUseFilaLayout(p) {
  // Solo piante che arrampicano davvero (rampicante E alta): fagiolo, cetriolo.
  // Fagiolino nano (rampicante, h=media) e pisello (rampicante, h=media) restano in blocco.
  return (
    state.larghezza >= 4.2 &&
    state.lunghezza >= 4.8 &&
    p.arch === "rampicante" &&
    p.h === "alta"
  );
}

function countForFilaPlant(p) {
  const Li = state.lunghezza * 100;
  const Sc = p.dr || p.d; // passo tra file affiancate (X)
  const filesAcross = maxSlotsForSpan(usableBedWidth() - 2 * BEDPAD, Sc);
  const plantsPerFile = maxSlotsForSpan(Li - 2 * MARGIN - 2 * BEDPAD, p.d);
  return filesAcross * plantsPerFile;
}

function defaultCount(p) {
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, targetRowsForPlant(p))
  );
}

function starterCountForAutoPlant(p, useFila = false) {
  if (useFila) return countForFilaPlant(p);
  return Math.max(
    minimumCountForPlant(p),
    countForPlant(p, Math.min(targetRowsForPlant(p), 2))
  );
}

/* Selezione e salvataggio layout: mantiene stabile la pianta evidenziata
   mentre il motore riordina o ricalcola le aiuole. */
function rememberSelection() {
  return state.selected >= 0 && state.selected < state.beds.length
    ? state.beds[state.selected].plantId
    : null;
}

function restoreSelection(plantId) {
  state.selected = plantId
    ? state.beds.findIndex((bed) => bed.plantId === plantId)
    : -1;
}

function normalizeSavedBeds(beds) {
  if (!Array.isArray(beds)) return [];
  const seen = new Set();
  return beds
    .map((bed) => {
      const p = BYID[bed?.plantId];
      const savedLayout = bed?.layout === "fila" ? "fila" : "blocco";
      // Corregge layout salvati errati: se la pianta non è idonea al layout fila, usa blocco
      const layout =
        savedLayout === "fila" && p && !canUseFilaLayout(p)
          ? "blocco"
          : savedLayout;
      return {
        plantId: bed?.plantId,
        count: Math.max(1, Math.round(parseInt(bed?.count) || 1)),
        layout,
        countLocked: Boolean(bed?.countLocked)
      };
    })
    .filter((bed) => {
      if (!BYID[bed.plantId] || seen.has(bed.plantId)) return false;
      seen.add(bed.plantId);
      return true;
    });
}

/* Valore di altezza per l'ordinamento anti-ombra, dipendente dall'orientamento:
   con il sole in alto (default) le piante basse vanno in cima (valore basso),
   con il sole in basso si inverte cosi le alte finiscono in cima e non ombreggiano
   le basse rivolte verso il sole. */
function heightSortValue(h) {
  return state.sudInBasso ? 2 - H_RANK[h] : H_RANK[h];
}

/* Riordino fisico delle aiuole: priorita alle file, poi ombra, acqua,
   distanza e compatibilita tra colture. */
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

/* Riduce piante o rimuove aiuole solo quando il layout non entra nello spazio.
   Con preserveLockedCounts=true non tocca le quantita impostate a mano. */
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

    // Aiuole con più di una fila completa: riducile per prime.
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
      // Tutte le aiuole sono già al minimo: rimuovi quella con ingombro maggiore.
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

/* Gestione delle colture a fila: adatta la lunghezza delle file al layout,
   ma puo preservare le quantita manuali quando richiesto. */
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

/* Minimi agronomici: alza automaticamente conteggi troppo bassi, salvo quelli
   bloccati dall'utente. */
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

/* Normalizzazione delle quantita prima di una nuova ottimizzazione. */
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

/* Normalizza solo input e layout, lasciando intatto il blocco manuale. */
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

/* Dopo un riempimento tenta di ripristinare conteggi manuali se lo spazio lo consente. */
function restoreManualCountsWhenPossible(manualCounts) {
  state.beds.forEach((bed) => {
    const desired = manualCounts.get(bed.plantId);
    if (!desired || bed.count >= desired) return;
    const before = bed.count;
    bed.count = desired;
    if (computeLayout().overflow) bed.count = before;
  });
}

/* Riordina il layout manuale senza espandere automaticamente le colture. */
function rebalanceManualLayoutOnly() {
  const selectedPlant = rememberSelection();
  expandFilaBedsToLength(false, { preserveLockedCounts: true });
  sortBedsForLayout();
  restoreSelection(selectedPlant);
}

function flexibleCropReductionCandidates(layout, lockedPlantId, options = {}) {
  const allowBelowMinimum = options.allowBelowMinimum === true;
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
      const floorCount = allowBelowMinimum ? 1 : minCount;
      const surplus = bed.count - floorCount;
      if (surplus <= 0) return null;
      return { bed, index, plant, layoutBed, floorCount, minCount, surplus };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(b.bed.count > b.minCount) - Number(a.bed.count > a.minCount) ||
        b.surplus - a.surplus ||
        b.bed.count - a.bed.count ||
        b.layoutBed.h - a.layoutBed.h ||
        b.plant.d - a.plant.d
    );
}

/* Segnala se l'ultima riduzione ha dovuto portare qualche coltura sotto il suo
   minimo agronomico per far spazio alla quantita bloccata dall'utente. */
let lastFlexibleReductionBelowMinimum = false;

/* Quando l'utente aumenta una quantita manuale, libera spazio riducendo prima
   le colture automatiche con piu surplus rispetto al loro minimo. */
function reduceFlexibleCropsForLockedChange(lockedPlantId) {
  lastFlexibleReductionBelowMinimum = false;
  let guard = 0;
  while (computeLayout().overflow && guard < 700) {
    const layout = computeLayout();
    let candidates = flexibleCropReductionCandidates(layout, lockedPlantId);
    if (!candidates.length) {
      candidates = flexibleCropReductionCandidates(layout, lockedPlantId, {
        allowBelowMinimum: true
      });
    }
    if (!candidates.length) break;
    const item = candidates[0];
    const step = Math.max(1, rowSizeForPlant(item.plant));
    const before = item.bed.count;
    item.bed.count = Math.max(
      item.floorCount,
      item.bed.count - Math.min(step, item.surplus)
    );
    if (item.bed.count === before) break;
    // Se questa coltura e' finita sotto il suo minimo sano, lo annotiamo per
    // avvisare l'utente in modo trasparente (invece di degradarla in silenzio).
    if (item.bed.count < item.minCount) lastFlexibleReductionBelowMinimum = true;
    rebalanceManualLayoutOnly();
    guard++;
  }
}

/* Applica una modifica manuale e torna indietro solo se fisicamente impossibile. */
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
  lastFlexibleReductionBelowMinimum = false;
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
  return lastFlexibleReductionBelowMinimum ? "adjustedBelowMin" : "adjusted";
}

/* Bilanciamento centrale del layout: usato da auto-riempimento, aggiunte,
   rimozioni e cambio misure. Le opzioni decidono se preservare conteggi manuali. */
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
  // expandFilaBedsToLength va chiamata sempre (non solo quando expandToSpace=true)
  // perché usableBedWidth() dipende da state.beds.length: aggiungendo o rimuovendo
  // una pianta il numero di colonne cambia e il count corretto per le file si aggiorna.
  // Senza questo ricalcolo, il count salvato è quello di una colonna più larga e
  // provoca overflow non appena si aggiunge una seconda pianta in modalità manuale.
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
    preserveLockedCounts: options.preserveLockedCounts === true
  });
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit
    });
  // Riordina per tenere le piante alte dietro a quelle basse (ordine anti-ombra).
  sortBedsForLayout();
  rebalanceColumnsFresh();
  if (expandToSpace)
    expandAutoFillToSpace({
      skipLockedCounts: options.expandLockedCounts === false,
      respectDiversityLimit
    });
  shrinkOverflowToFit({
    preserveLockedCounts: options.preserveLockedCounts === true
  });
  restoreSelection(selectedPlant);
}

/* Aggiunta manuale dalla tendina colture: non espande colture gia presenti e
   preserva le quantita modificate dall'utente. */
function addPlant(id) {
  if (state.beds.some((b) => b.plantId === id)) return;
  const p = BYID[id];
  if (!p) return;
  recordHistory();
  // Aggiunta manuale sempre a blocco con un conteggio modesto: una pianta a fila
  // occuperebbe un'intera colonna (alta quanto la serra) e, in una serra piena,
  // costringerebbe a rimuovere molte colture. A blocco invece basta restringere
  // un po' le altre per fare spazio.
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
  // expandToSpace=true: dopo aver fatto spazio restringendo le colture flessibili
  // (i conteggi bloccati a mano restano intatti) lo spazio residuo viene riempito,
  // così la serra non si svuota a metà. Con autoPlan ormai false il limite di
  // diversità non si applica e le colture presenti possono crescere a riempire;
  // una coltura viene rimossa solo se è geometricamente inevitabile.
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });
  // Se la serra era piena e non c'era spazio, il bilanciamento ha dovuto togliere
  // la coltura appena aggiunta: avvisa l'utente (avviso rosso nel pannello + popup)
  // invece di farla sparire in silenzio.
  const noSpace = !state.beds.some((b) => b.plantId === id);
  if (noSpace) {
    state.manualPlanNotice = "addNoSpace";
    state.selected = -1;
  }
  commitColumnAssignment();
  saveConfig(true);
  render();
  if (noSpace) alert(tx("addNoSpace"));
}

/* Decisione di prodotto sul riempimento dello spazio liberato da una modifica
   manuale (rimozione di una coltura o riduzione di una quantita): i profili
   guidati (novizio e intermedio) non devono mai restare con terra incolta, quindi
   il vuoto viene ripiantato in automatico espandendo le colture flessibili.
   L'esperto invece mantiene il controllo manuale e riempie con il pulsante
   "Riempi spazi vuoti" quando lo decide lui. */
function shouldAutoRefillFreedSpace() {
  return state.livello !== "esperto";
}

/* Riempie lo spazio liberato espandendo solo le colture flessibili (non bloccate),
   senza toccare le quantita impostate a mano e rispettando le distanze botaniche
   (le distanze restano garantite da computeLayout/centeredSlots: qui si aggiungono
   solo file/piante che ci stanno davvero, mai piante piu fitte del loro passo). */
function fillFreedSpacePreservingLocks() {
  // Re-flusso completo preservando le quantita bloccate. Con la sola
  // expandAutoFillToSpace le colonne restano ancorate: se l'unica coltura di una
  // colonna viene ridotta, lo spazio liberato resta vuoto perche le altre colture
  // sono ancorate ad altre colonne e non possono spostarsi li. autoBalanceLayout
  // (come fa la rimozione) ricalcola le colonne, ridistribuisce le colture rimaste
  // anche nella colonna svuotata e le espande; poi i vuoti residui piu piccoli di
  // una fila si chiudono con le colture tappabuchi.
  clearColumnAssignment();
  autoBalanceLayout(true, true, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });
  // Chiude anche i vuoti residui di fondo colonna con colture tappabuchi, cosi
  // per i profili guidati non resta terra incolta dopo una modifica manuale.
  fillColumnTailsWithFiller();
  commitColumnAssignment();
}

/* Rimozione manuale: per i profili guidati riempie lo spazio liberato (niente
   terra incolta), per l'esperto lo lascia libero al controllo manuale. */
function removePlantById(id) {
  const index = state.beds.findIndex((b) => b.plantId === id);
  if (index < 0) return;
  recordHistory();
  state.beds.splice(index, 1);
  state.autoPlan = false;
  state.manualPlanNotice = "";
  if (state.selected === index) state.selected = -1;
  else if (state.selected > index) state.selected -= 1;
  // expandToSpace dipende dal profilo: guidato riempie il vuoto lasciato dalla
  // coltura rimossa, esperto lo lascia libero (riempimento manuale on demand).
  const refill = shouldAutoRefillFreedSpace();
  autoBalanceLayout(true, refill, {
    preserveLockedCounts: true,
    expandLockedCounts: false
  });
  // Profili guidati: chiudi i vuoti residui con colture tappabuchi (niente terra
  // incolta). L'esperto mantiene il vuoto al suo controllo manuale.
  if (refill) fillColumnTailsWithFiller();
  commitColumnAssignment();
  saveConfig(true);
  render();
}

/* Cambio stagione/misure: se il piano e automatico rigenera, altrimenti conserva
   la scelta manuale e ribilancia solo il necessario. */
function refreshForSeasonChange() {
  // Cambiare mese/clima cambia il contesto: gli snapshot di undo non sarebbero
  // piu coerenti, quindi la cronologia viene azzerata.
  resetHistory();
  // Il novizio è sempre automatico: ogni cambio di mese/zona rigenera il piano
  // (così non resta mai bloccato in un piano manuale senza il pulsante "Riempi").
  if (
    state.autoPlan ||
    state.livello === "novizio" ||
    state.beds.length === 0
  ) {
    autoFill();
  } else {
    // Cambio stagione su piano manuale: le colonne si ridecidono per il nuovo
    // contesto, poi si rifissano.
    clearColumnAssignment();
    autoBalanceLayout(true, false);
    commitColumnAssignment();
    render();
  }
}

/* Pulsante "Sistema senza riempire": riordina le colture scelte senza cambiare
   i conteggi manuali e senza espandere lo spazio vuoto. */
function arrangeSelectedPlantsExact() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  recordHistory();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  normalizeSelectedCropInputsForOptimization();
  rebalanceManualLayoutOnly();
  commitColumnAssignment();
  saveConfig(true);
  render();
}

/* Pulsante "Riempi spazi vuoti": riempie ampliando solo colture automatiche,
   rispettando le quantita impostate a mano. */
function fillSelectedPlants() {
  if (state.beds.length === 0) {
    alert(tx("noSelectedPlants"));
    return;
  }
  recordHistory();
  state.autoPlan = false;
  state.manualPlanNotice = "";
  const manualCounts = new Map(
    state.beds.map((bed) => [bed.plantId, bed.count])
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
  restoreManualCountsWhenPossible(manualCounts);
  // "Riempi spazi vuoti" deve davvero riempire tutto: chiudi anche i vuoti
  // residui di fondo colonna con colture tappabuchi.
  fillColumnTailsWithFiller();
  commitColumnAssignment();
  saveConfig(true);
  render();
}

/* Conclude una modifica manuale di quantita: per i profili guidati ripiana lo
   spazio eventualmente liberato (riduzioni), imposta l'avviso corretto e
   ridisegna. Condiviso da +/- e input numerico per non duplicare la logica. */
function finalizeManualCountChange(fitResult, selectedPlant) {
  // Profili guidati: se la modifica ha liberato spazio (tipico di una riduzione)
  // lo si ripianta subito espandendo le colture flessibili, cosi non resta terra
  // incolta. L'esperto mantiene il vuoto al suo controllo manuale.
  if (fitResult !== "rejected" && shouldAutoRefillFreedSpace()) {
    fillFreedSpacePreservingLocks();
  }
  state.manualPlanNotice =
    fitResult === "rejected"
      ? "manualCountRejected"
      : fitResult === "adjustedBelowMin"
        ? "manualCountBelowMin"
        : fitResult === "adjusted"
          ? "manualCountAdjusted"
          : "";
  restoreSelection(selectedPlant);
  commitColumnAssignment();
  saveConfig(true);
  render();
}

/* Controlli quantita (+/-): ogni modifica diventa manuale e viene protetta. */
function changePlantCount(id, delta) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  recordHistory();
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = Math.max(1, Math.round((parseInt(bed.count) || 1) + delta));
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  finalizeManualCountChange(fitResult, selectedPlant);
}

/* Input numerico e slider quantita: stessa regola dei +/- ma con valore diretto. */
function setPlantCount(id, value) {
  const index = state.beds.findIndex((bed) => bed.plantId === id);
  if (index < 0) return;
  recordHistory();
  const nextCount = Math.max(1, Math.round(parseInt(value) || 1));
  const selectedPlant = rememberSelection();
  const before = cloneBedsSnapshot();
  const bed = state.beds[index];
  bed.count = nextCount;
  bed.countLocked = true;
  state.autoPlan = false;
  const fitResult = fitLockedCountChange(id, before);
  finalizeManualCountChange(fitResult, selectedPlant);
}

/* Utility del piano automatico: percorso compatto, punteggio di spazio vuoto
   e snapshot per confrontare/annullare ottimizzazioni. */
function compactPathForAutoFill() {
  if (state.larghezza >= 6 && state.lunghezza >= 7)
    return Math.min(state.path, 45);
  if (state.larghezza >= 4.2 && state.lunghezza >= 6)
    return Math.min(state.path, 50);
  return state.path;
}

function refreshAutoPlanForGeometry(compactPaths = true) {
  // Cambiare misure/camminamento cambia il contesto: azzera la cronologia undo.
  resetHistory();
  // Come sopra: per il novizio il cambio misure rigenera sempre il piano.
  if (state.autoPlan || state.livello === "novizio") {
    autoFill({ compactPaths });
    return;
  }
  saveConfig(true);
  // Cambio misure su piano manuale: il numero di colonne può cambiare, quindi
  // si ridecidono le colonne e poi si rifissano.
  clearColumnAssignment();
  autoBalanceLayout(true, true);
  commitColumnAssignment();
  render();
}

function layoutWasteScore(layout = computeLayout()) {
  const target = layout.Li - MARGIN;
  const gaps = layout.columnHeights.map((h) => Math.max(0, target - h));
  const squaredGaps = gaps.reduce((sum, gap) => sum + gap * gap, 0);
  return squaredGaps + Math.max(...gaps, 0) * 25;
}

function autoExpansionLimitForPlant(p) {
  const row = Math.max(1, rowSizeForPlant(p));
  const min = minimumCountForPlant(p);
  const baseline = Math.max(starterCountForAutoPlant(p, false), min);
  // Il tetto di espansione per coltura cresce con l'area della serra: serre grandi
  // verrebbero altrimenti lasciate con terra incolta perche ogni coltura toccava
  // troppo presto il proprio massimo, e il riempitore non aveva piu candidati da
  // far crescere. Il novizio parte da un tetto base piu basso (orto piu gestibile)
  // ma anche per lui scala con la superficie reale.
  const area = state.larghezza * state.lunghezza;
  const rowsBase = state.livello === "novizio" ? 6 : 8;
  const rows = rowsBase + Math.floor(area / 10);
  return Math.max(baseline, min * 3, row * rows);
}

function cloneBedsSnapshot() {
  return state.beds.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col
  }));
}

function restoreBedsSnapshot(snapshot) {
  state.beds = snapshot.map((bed) => ({
    plantId: bed.plantId,
    count: bed.count,
    layout: bed.layout,
    countLocked: Boolean(bed.countLocked),
    col: bed.col
  }));
}

/* =========================================================================
   Cronologia annulla/ripristina (undo/redo)
   -------------------------------------------------------------------------
   Pila di snapshot del piano colturale. recordHistory() va chiamata PRIMA di
   una modifica manuale alle aiuole (aggiunta, rimozione, quantita, riempi,
   sistema, preset, riempi/svuota serra). La cronologia vale all'interno di un
   contesto stabile: cambiare misure, mese, clima, orientamento o profilo la
   azzera (resetHistory), perche quegli snapshot non sarebbero piu coerenti.
   ========================================================================= */
const HISTORY_LIMIT = 60;
let undoStack = [];
let redoStack = [];

function captureHistorySnapshot() {
  return {
    beds: cloneBedsSnapshot(),
    autoPlan: state.autoPlan,
    activePreset: state.activePreset,
    selected: state.selected
  };
}

function applyHistorySnapshot(snap) {
  restoreBedsSnapshot(snap.beds);
  state.autoPlan = snap.autoPlan;
  state.activePreset = snap.activePreset;
  state.selected = snap.selected;
}

function recordHistory() {
  undoStack.push(captureHistorySnapshot());
  if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

function resetHistory() {
  undoStack = [];
  redoStack = [];
  if (typeof updateUndoRedoButtons === "function") updateUndoRedoButtons();
}

function canUndo() {
  return undoStack.length > 0;
}

function canRedo() {
  return redoStack.length > 0;
}

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

/* Espansione controllata: aumenta conteggi dove migliora il riempimento.
   Con skipLockedCounts=true ignora le quantita manuali. */
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

  // Phase 2: fine-tuning with +1 plant at a time to fill the last sub-row gap.
  // The main loop above can only add a full row (rowSizeForPlant plants) at once.
  // If the remaining gap is smaller than one row's height, the main loop stops
  // and leaves empty soil. This pass fills that leftover space one plant at a time.
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

  // Phase 3: riempi la terra incolta DENTRO le aiuole. Un'aiuola con poche piante
  // viene disegnata piu alta del necessario per leggibilita (minVisualBedH): resta
  // spazio verticale vuoto al suo interno che le fasi 1-2 non toccano, perche
  // aggiungere file qui non cambia l'altezza della colonna (e quindi nemmeno il
  // punteggio di vuoto fra colonne). Qui aggiungiamo file intere SOLO se entrano
  // in quell'altezza gia riservata: la colonna non cresce (niente overflow) e il
  // passo tra le file resta quello botanico (p.d), perche le posizioni sono sempre
  // distribuite da centeredSlots al passo corretto.
  fillVisualPaddingRows({ skipLockedCounts, respectDiversityLimit });
}

/* Riempie lo spazio vuoto interno alle aiuole disegnate piu alte del necessario
   (padding di leggibilita), aggiungendo file complete che entrano senza far
   crescere l'altezza dell'aiuola. Sicura per definizione: non crea overflow,
   rispetta le distanze e salta le quantita bloccate e le colture a fila. */
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
      // Accetta la fila solo se e' entrata nello spazio gia disegnato: l'altezza
      // dell'aiuola non e' aumentata e non e' comparso overflow. Altrimenti annulla.
      if (!after.overflow && bedAfter && bedAfter.h <= bedBefore.h + 0.5) {
        continue;
      }
      bed.count = prevCount;
      break;
    }
  });
}

/* Colture "tappabuchi": basse, a passo stretto e a crescita rapida. Servono a
   chiudere i vuoti residui in fondo alle colonne, piu corti di una fila della
   coltura gia presente (caso geometricamente inevitabile con una sola coltura).
   Ordinate dalla piu fitta/versatile alla meno: la prima compatibile e in
   stagione che entra nel vuoto vince. */
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
// Vuoto minimo (px) sotto al quale non conviene inserire un'aiuola filler.
const FILLER_MIN_GAP = 60;

/* Sceglie una coltura tappabuchi: bassa, in stagione, non gia presente, non in
   conflitto con le colture della colonna da riempire e la cui aiuola minima
   entra nel vuoto disponibile. Restituisce null se nessuna e' adatta. */
function pickFillerCrop(columnPlantIds, gap) {
  const present = new Set(state.beds.map((b) => b.plantId));
  const colPlants = columnPlantIds.map((id) => BYID[id]).filter(Boolean);
  const seasonalIds = new Set(seminabili().map((p) => p.id));
  const fits = (p) =>
    Math.max(46, visualPlantRadius(p) * 3 + 18) + BED_GAP <= gap + 1;
  const compatible = (p) => !colPlants.some((cp) => areIncompatible(p, cp));
  // 1) Preferenza: lista curata di tappabuchi rapide, se di stagione.
  for (const id of FILLER_CROPS) {
    const p = BYID[id];
    if (!p || present.has(id) || !seasonalIds.has(id)) continue;
    if (!compatible(p) || !fits(p)) continue;
    return p;
  }
  // 2) Fallback: qualsiasi coltura di stagione adatta come tappabuchi (bassa,
  //    compatibile, non gia presente, che entra nel vuoto), a passo piu stretto
  //    per primo. Serve nei mesi in cui le filler curate (colture fresche) non
  //    sono seminabili, es. piena estate. Per il novizio si evitano le esotiche.
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

/* Chiude i vuoti residui di fondo colonna inserendo colture tappabuchi ancorate
   alla colonna piu corta e cresciute fino a riempire lo spazio (mai overflow,
   distanze sempre rispettate da computeLayout). Richiede che tutte le colonne
   siano gia occupate, cosi la larghezza delle aiuole non cambia aggiungendone.
   E' l'ultimo passo dei flussi che vogliono la serra piena: e' l'unico modo per
   coprire un vuoto piu piccolo di una fila della coltura gia presente. */
function fillColumnTailsWithFiller() {
  let guard = 0;
  while (guard++ < 40) {
    const L = computeLayout();
    if (L.overflow) break;
    const columnCount = L.columnCount;
    // Se mancano aiuole per riempire tutte le colonne, aggiungerne cambierebbe
    // la larghezza (usableBedWidth dipende dal numero di colonne attive): in quel
    // caso lasciamo fare a expandAutoFillToSpace, non al filler.
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
    const colPlantIds = L.beds
      .filter((b) => b.columnIndex === shortCol)
      .map((b) => b.plant.id);
    const filler = pickFillerCrop(colPlantIds, maxGap);
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
    // Cresce a file intere finche entra, poi rifinisce una pianta alla volta
    // l'ultima sotto-fila: cosi il vuoto viene chiuso quasi del tutto.
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

/* =========================================================================
   SEZIONE 11 - Auto-riempimento stagionale
   -------------------------------------------------------------------------
   La scelta è consapevole del profilo utente (state.livello) e usa come
   unica fonte di verità la mappa DIFFICULTY (1=facile, 2=media, 3=difficile/
   esotica), completa su tutte le colture:
   - novizio  → solo colture facili/medie (difficoltà ≤ 2);
   - intermedio/esperto → tutto il catalogo stagionale, con le colture
     difficili ed esotiche spinte in fondo alla lista.
   ========================================================================= */

// Ortaggi comuni e gratificanti: hanno priorità a parità di difficoltà.
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

// Difficoltà di una coltura (1-3); fallback prudente a 3 se non classificata.
function autoDifficulty(p) {
  return DIFFICULTY[p.id] || 3;
}

// Punteggio di selezione: più basso = scelto prima.
function autoCropScore(p) {
  // Le colture facili vengono prima, le esotiche/difficili per ultime.
  let s = autoDifficulty(p) * 60;
  // I grandi classici hanno una spinta in più, nel loro ordine.
  const pref = AUTO_PREFERRED.indexOf(p.id);
  if (pref >= 0) s -= 130 - pref;
  // Qualità: premia resa alta e raccolta veloce.
  s -= Math.min(p.resa || 0, 5) * 3;
  s += Math.min(p.gg || 120, 200) * 0.04;
  return s;
}

// Pool di candidati ordinato, filtrato in base al profilo utente.
function autoCandidatePool() {
  const seasonal = seminabili();
  let pool;
  if (state.livello === "novizio") {
    // Solo colture facili o medie esplicitamente classificate (≤ 2).
    pool = seasonal.filter((p) => autoDifficulty(p) <= 2);
    // In stagioni povere allarga fino alle difficili, ma mai alle esotiche.
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

/* Rete di sicurezza per serre molto piccole: piazza la migliore candidata al
   massimo numero di piante che entra fisicamente (anche sotto il minimo
   agronomico, fino a 1), provando i candidati in ordine di punteggio. Evita che
   una serra minuscola resti completamente vuota quando c'e spazio per qualcosa. */
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
    const hasCompatibleAlternative = sortedCandidates.some(
      (candidate) =>
        candidate.id !== p.id &&
        !state.beds.some((bed) => bed.plantId === candidate.id) &&
        !state.beds.some((bed) => areIncompatible(candidate, BYID[bed.plantId]))
    );
    if (conflicts && hasCompatibleAlternative) {
      skippedConflicts.push(p);
      continue;
    }
    addAutoCandidate(p);
  }
  // Passo consociativo attivo: arricchisce il piano con le AMICHE delle colture
  // gia scelte (es. pomodoro→basilico, carota→cipolla) se di stagione, ammesse
  // dal profilo (presenti nel pool), non gia inserite e compatibili con tutte.
  // Cosi il piano nasce con buone consociazioni reali invece di riempirsi solo di
  // altri esemplari della stessa coltura. Limitato a poche aggiunte bonus.
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
      if (state.beds.some((b) => areIncompatible(fp, BYID[b.plantId]))) continue;
      addAutoCandidate(fp);
    }
  }
  // Secondo passaggio: aggiunge piante saltate solo se non creano nuove
  // incompatibilità con le piante già inserite. In questo modo la serra
  // viene riempita da expandAutoFillToSpace (più esemplari delle colture
  // compatibili già presenti) anziché da piante che non si amano.
  // Se dopo questo passaggio ci sono ancora meno varietà del target,
  // viene fatto un terzo tentativo accettando al massimo 1 conflitto per
  // pianta (caso di stagioni con pool molto ristretto).
  for (const p of skippedConflicts) {
    if (state.beds.length >= minVarieties) break;
    if (state.beds.some((bed) => bed.plantId === p.id)) continue;
    const newConflicts = state.beds.filter((bed) =>
      areIncompatible(p, BYID[bed.plantId])
    ).length;
    if (newConflicts > 0) continue; // salta: creerebbe incompatibilità
    addAutoCandidate(p);
  }
  // Terzo passaggio di emergenza: se le varietà sono ancora pochissime
  // (meno della metà del target), accetta piante con al massimo 1 conflitto
  // per non lasciare serre grandi quasi vuote.
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
  // Ricalcola i conteggi iniziali con il layout a colonne definitivo.
  // Durante la selezione ogni pianta viene aggiunta una alla volta: le prime
  // usano usableBedWidth() monocolonna (più larga) e ottengono conteggi gonfiati.
  // Ora che state.beds è completo il numero di colonne è stabile; azzerare i
  // conteggi allo starter corretto lascia a expandAutoFillToSpace il compito
  // di riempire lo spazio in modo uniforme — esattamente come fa fillSelectedPlants.
  // Nota: non usiamo resetSelectedCropCountsForOptimization() perché quella
  // funzione permette una sola aiuola fila (!hasFila), mentre autoFill può
  // piazzarne fino a filaSlots (layoutColumns - 1). Il layout assegnato da
  // addAutoCandidate viene preservato; si ricalcola solo il conteggio.
  state.beds.forEach((bed) => {
    const plant = BYID[bed.plantId];
    if (!plant) return;
    bed.count =
      bed.layout === "fila"
        ? countForFilaPlant(plant)
        : starterCountForAutoPlant(plant, false);
    bed.countLocked = false;
  });
  // Usa la stessa sequenza di autoBalanceLayout(true, true) usata da "ottimizza colture":
  // expandFilaBedsToLength → enforceMinimumBedCounts → sort → shrink → expand → sort
  // → expand → shrink. Questo gestisce tutti i casi edge (overflow da companion bonds,
  // conteggi minimi, piante fila) in modo identico al pulsante ottimizza.
  autoBalanceLayout(false, true);
  // Allinea il primo piano automatico alla stessa base usata dal pulsante
  // "Ottimizza colture scelte". In alcuni ingressi guidati i conteggi iniziali
  // restavano troppo bassi e lasciavano terra libera; questo secondo passaggio
  // viene tenuto solo se migliora davvero il riempimento e non crea overflow.
  finalizeAutoFillWithOptimizeBaseline();
  // Se nessuna coltura e' entrata ai conteggi minimi (serra molto piccola) prova
  // la rete di sicurezza; se non c'e' proprio nulla da seminare in questa zona/mese
  // segnala il motivo invece di lasciare la serra vuota senza spiegazioni.
  if (state.beds.length === 0 && candidates.length)
    ensureMinimalFill(candidates);
  // Top-off: quando le varieta disponibili sono poche (es. profilo novizio in
  // mesi poveri) le colture toccano il loro tetto di diversita e restano vuoti.
  // Qui, senza limite di diversita, facciamo crescere le colture gia presenti per
  // riempire la terra rimasta libera, cosi la serra non resta mai mezza vuota.
  expandAutoFillToSpace({ respectDiversityLimit: false });
  // Chiude i vuoti residui di fondo colonna (piu corti di una fila della coltura
  // presente) con colture tappabuchi: e' l'ultimo tassello del "niente terra
  // incolta" che l'espansione da sola non puo coprire.
  fillColumnTailsWithFiller();
  if (state.beds.length === 0) state.autoPlanNotice = "autoPlanEmptySeason";
  // Fissa le colonne decise dal piano automatico: le modifiche manuali successive
  // partiranno da questa disposizione senza rimescolarla.
  commitColumnAssignment();
  state.selected = -1;
  saveConfig(true);
  render();
}
/* =========================================================================
   SEZIONE 12 - Preset, import/export e intenti di avvio
   -------------------------------------------------------------------------
   Carica layout pronti, esporta le colture nel carrello condiviso e interpreta
   parametri URL provenienti dalla homepage o da percorsi guidati.
   ========================================================================= */
function loadPreset(key) {
  if (!PRESETS[key]) return;
  recordHistory();
  state.beds = PRESETS[key].map(([id, cnt]) => ({
    plantId: id,
    count: cnt,
    layout: "blocco",
    countLocked: false
  }));
  state.autoPlan = false;
  state.activePreset = key;
  autoBalanceLayout(false, true);
  // Il bilanciamento puo dover ridurre alcune aiuole per eliminare un overflow
  // e lasciare, come effetto finale, una colonna molto piu corta delle altre.
  // Completa quindi il preset aumentando solo le colture gia previste, senza
  // introdurne di nuove e senza superare lo spazio realmente disponibile.
  expandAutoFillToSpace({ respectDiversityLimit: false });
  fillColumnTailsWithFiller();
  commitColumnAssignment();
  saveConfig(true);
  render();
}

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

function importCartToPlan() {
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
  state.beds = uniqueIds.map((id) => {
    const plant = BYID[id];
    return {
      plantId: id,
      count: Math.max(1, Math.min(defaultCount(plant), starterCountForAutoPlant(plant, false))),
      layout: "blocco",
      countLocked: false
    };
  });
  state.autoPlan = false;
  state.selected = state.beds.length ? 0 : -1;
  vegFilter = "in";
  autoBalanceLayout(true, true);
  saveConfig(true);
  render();
  setMode("expert", false);
  focusManualPlanningPath();
  return true;
}

function focusManualPlanningPath() {
  window.setTimeout(() => {
    const crops = document.getElementById("panelCustomize");
    if (crops) {
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
      window.setTimeout(() => crops.classList.remove("is-focus-pulse"), 1600);
    }
  }, 120);
}

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
    focusManualPlanningPath();
    clearBootParams();
    return true;
  }
  if (shouldImportCart() && importCartToPlan()) {
    clearBootParams();
    return true;
  }
  const preset = requestedBootPreset();
  if (!preset) return false;
  // Per l'avvio guidato, ripristina la serra alla misura predefinita 3x5 m così le piante
  // del preset ci stanno sempre e il messaggio "ti ho preparato un orto" è vero.
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

