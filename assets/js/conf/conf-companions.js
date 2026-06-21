/* =========================================================================
   SEZIONE 09b - Analisi consociazioni (amiche/nemiche) potenziata
   -------------------------------------------------------------------------
   Logica pura sopra i dati amiche/nemiche gia' presenti: calcola coppie
   compatibili/incompatibili, un punteggio di compatibilita' del piano,
   le colture coinvolte in conflitti (per evidenziarle) e suggerisce una
   coltura amica alternativa, seminabile nel mese corrente, per sciogliere
   un conflitto. Nessun dato botanico nuovo: motivazioni generiche e oneste.
   ========================================================================= */

// Analizza le aiuole correnti e restituisce coppie, conflitti e punteggio.
function analyzeCompanions() {
  const beds = state.beds;
  const ids = beds.map((b) => b.plantId);
  const badPairs = [];
  const goodPairs = [];
  const conflictIds = new Set();
  const seenBad = new Set();
  const seenGood = new Set();
  for (let i = 0; i < beds.length; i++) {
    for (let j = i + 1; j < beds.length; j++) {
      const a = BYID[ids[i]];
      const b = BYID[ids[j]];
      if (!a || !b) continue;
      const key = [a.id, b.id].sort().join("|");
      if (a.nemiche.includes(b.id) || b.nemiche.includes(a.id)) {
        if (!seenBad.has(key)) {
          seenBad.add(key);
          badPairs.push({ a, b });
          conflictIds.add(a.id);
          conflictIds.add(b.id);
        }
      }
      if (a.amiche.includes(b.id) || b.amiche.includes(a.id)) {
        if (!seenGood.has(key)) {
          seenGood.add(key);
          goodPairs.push({ a, b });
        }
      }
    }
  }
  const score = Math.max(
    0,
    Math.min(100, 100 - badPairs.length * 20 + goodPairs.length * 4)
  );
  const rating = score >= 85 ? "great" : score >= 60 ? "good" : "review";
  return { badPairs, goodPairs, conflictIds, score, rating };
}

// Suggerisce un'amica di una delle due colture in conflitto, non gia' presente
// e (se possibile) seminabile nel mese corrente.
function companionSuggestionFor(pair, presentIds) {
  const present = new Set(presentIds);
  const month = state.mese;
  // Prima scelta: amica seminabile ora.
  for (const base of [pair.a, pair.b]) {
    for (const fid of base.amiche) {
      const fp = BYID[fid];
      if (!fp || present.has(fid)) continue;
      if (Array.isArray(fp.mesi) && fp.mesi.includes(month)) {
        return { friend: fp, base, offSeason: false };
      }
    }
  }
  // Fallback: una qualsiasi amica non presente (anche fuori stagione ora).
  for (const base of [pair.a, pair.b]) {
    for (const fid of base.amiche) {
      const fp = BYID[fid];
      if (fp && !present.has(fid)) {
        return { friend: fp, base, offSeason: true };
      }
    }
  }
  return null;
}
