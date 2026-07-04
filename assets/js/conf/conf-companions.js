// Analisi consociazioni
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

// Suggerisce una coltura amica per una coppia in conflitto
function companionSuggestionFor(pair, presentIds) {
  const present = new Set(presentIds);
  const month = state.mese;

  for (const base of [pair.a, pair.b]) {
    for (const fid of base.amiche) {
      const fp = BYID[fid];
      if (!fp || present.has(fid)) continue;
      if (Array.isArray(fp.mesi) && fp.mesi.includes(month)) {
        return { friend: fp, base, offSeason: false };
      }
    }
  }

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
