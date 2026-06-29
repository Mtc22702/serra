/* =========================================================================
   SEZIONE 09C — Lista della spesa e preventivo dei materiali
   -------------------------------------------------------------------------
   Estende la lista semi esistente con una stima dei materiali (terriccio,
   concime, sostegni, etichette) calcolata in modo trasparente dai dati gia'
   presenti: misure della serra, numero di piante, altezza/portamento.
   Le quantità sono modificabili, le voci già possedute si possono escludere
   e il totale si aggiorna automaticamente.
   Le modifiche manuali e le spunte sono di sessione (non persistite).
   ========================================================================= */

// Prezzi indicativi dei materiali (in euro). Non vincolanti: solo una stima.
const MATERIAL_PRICES = {
  soilBagLiters: 50,
  soilBagPrice: 6.5,
  fertilizerKg: 2.2,
  support: 1.5,
  label: 0.15
};

// Override di sessione: quantita' modificate e voci spuntate dall'utente.
const shoppingQtyOverride = {};
const shoppingChecked = {};

// Area stimata a aiuole (m²): ~60% della serra, il resto camminamenti.
function bedAreaM2() {
  const area = (Number(state.larghezza) || 0) * (Number(state.lunghezza) || 0);
  return Math.max(0, area * 0.6);
}

function isSupportPlant(p) {
  return p.h === "alta" || ["rampicante", "cucurbita"].includes(p.arch);
}

function euro(v) {
  return "€ " + (Math.round(v * 100) / 100).toFixed(2).replace(".", ",");
}

// Calcola le righe materiali (quantita' suggerite, prima degli override).
function computeMaterialLines() {
  const lines = [];
  if (!state.beds.length) return lines;

  // --- Semi: aggregato dalla lista bustine gia' calcolata ---
  let seedPacks = 0;
  let seedCost = 0;
  state.beds.forEach((b) => {
    const data = PACK_DATA[b.plantId];
    const packs = Math.max(1, Math.ceil(b.count / (data?.seeds ?? 100)));
    seedPacks += packs;
    seedCost += packs * (data?.price ?? 2.5);
  });
  if (seedPacks > 0) {
    lines.push({
      id: "semi",
      cat: "seeds",
      icon: "🌱",
      qty: seedPacks,
      unit: "packs",
      unitPrice: seedCost / seedPacks
    });
  }

  const areaBeds = bedAreaM2();

  // --- Terriccio: ~200 L/m² (profondita' aiuola ~20 cm) ---
  const soilLiters = Math.round(areaBeds * 200);
  if (soilLiters > 0) {
    const bags = Math.max(
      1,
      Math.ceil(soilLiters / MATERIAL_PRICES.soilBagLiters)
    );
    lines.push({
      id: "terriccio",
      cat: "soil",
      icon: "🟫",
      qty: bags,
      unit: "bags",
      unitPrice: MATERIAL_PRICES.soilBagPrice,
      note: soilLiters + " L"
    });
  }

  // --- Concime: ~150 g/m² ---
  const fertKg = Math.max(1, Math.ceil(areaBeds * 0.15));
  if (areaBeds > 0) {
    lines.push({
      id: "concime",
      cat: "fertilizer",
      icon: "🧪",
      qty: fertKg,
      unit: "kg",
      unitPrice: MATERIAL_PRICES.fertilizerKg
    });
  }

  // --- Sostegni: piante alte o rampicanti ---
  let supports = 0;
  state.beds.forEach((b) => {
    const p = BYID[b.plantId];
    if (p && isSupportPlant(p)) supports += b.count;
  });
  if (supports > 0) {
    lines.push({
      id: "sostegni",
      cat: "supports",
      icon: "🪵",
      qty: supports,
      unit: "pieces",
      unitPrice: MATERIAL_PRICES.support
    });
  }

  // --- Etichette: una per coltura ---
  lines.push({
    id: "etichette",
    cat: "accessories",
    icon: "🏷️",
    qty: state.beds.length,
    unit: "pieces",
    unitPrice: MATERIAL_PRICES.label
  });

  return lines;
}

// Applica gli override di sessione e calcola subtotali e totale.
function materialsWithTotals() {
  const lines = computeMaterialLines().map((line) => {
    const qty =
      shoppingQtyOverride[line.id] != null
        ? shoppingQtyOverride[line.id]
        : line.qty;
    const checked = Boolean(shoppingChecked[line.id]);
    const subtotal = checked ? 0 : qty * line.unitPrice;
    return { ...line, qty, checked, subtotal };
  });
  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  return { lines, total };
}

function shoppingUnitLabel(unit, qty) {
  const key =
    unit === "bags"
      ? "shop.unit_bags"
      : unit === "kg"
        ? "shop.unit_kg"
        : unit === "packs"
          ? qty === 1
            ? "cart.pack_one"
            : "cart.pack_many"
          : "shop.unit_pieces";
  return tx(key, { count: qty });
}

function shoppingCatLabel(cat) {
  return tx("shop.cat_" + cat);
}

function renderMaterials() {
  const el = document.getElementById("materials");
  if (!el) return;
  if (!state.beds.length) {
    el.innerHTML = "";
    return;
  }
  const { lines, total } = materialsWithTotals();
  const rows = lines
    .map((l) => {
      const noteHtml = l.note ? `<span class="mat-note">${l.note}</span>` : "";
      return `<li class="mat-row${l.checked ? " is-checked" : ""}">
        <label class="mat-check">
          <input type="checkbox" data-mat-check="${l.id}" ${
            l.checked ? "checked" : ""
          } aria-label="${tx("shop.have_it")}">
        </label>
        <span class="mat-icon" aria-hidden="true">${l.icon}</span>
        <span class="mat-main">
          <b>${shoppingCatLabel(l.cat)}</b>
          <small>${shoppingUnitLabel(l.unit, l.qty)} · ${euro(
            l.unitPrice
          )}/${tx("shop.each")} ${noteHtml}</small>
        </span>
        <span class="mat-qty">
          <input type="number" min="0" step="1" inputmode="numeric"
            value="${l.qty}" data-mat-qty="${l.id}"
            aria-label="${tx("shop.qty_aria")} ${shoppingCatLabel(l.cat)}">
        </span>
        <span class="mat-sub">${euro(l.subtotal)}</span>
      </li>`;
    })
    .join("");
  el.innerHTML = `
    <div class="mat-head">
      <b>${tx("shop.materials_title")}</b>
      <small>${tx("shop.materials_hint")}</small>
    </div>
    <ul class="mat-list">${rows}</ul>
    <div class="mat-total">
      <span>${tx("shop.preventivo_total")}</span>
      <b>${euro(total)}</b>
    </div>
    <p class="mat-disclaimer">${tx("shop.estimate_note")}</p>`;

  el.querySelectorAll("[data-mat-qty]").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.matQty;
      const v = Math.max(0, Math.floor(Number(e.target.value) || 0));
      shoppingQtyOverride[id] = v;
      renderMaterials();
    });
  });
  el.querySelectorAll("[data-mat-check]").forEach((box) => {
    box.addEventListener("change", (e) => {
      shoppingChecked[e.target.dataset.matCheck] = e.target.checked;
      renderMaterials();
    });
  });
}

// Tabella materiali per la stampa/PDF (vuota se non ci sono colture).
function materialsPrintHtml() {
  if (!state.beds.length) return "";
  const { lines, total } = materialsWithTotals();
  const rows = lines
    .map(
      (l) =>
        `<tr><td>${shoppingCatLabel(l.cat)}</td><td>${shoppingUnitLabel(
          l.unit,
          l.qty
        )}</td><td>${euro(l.subtotal)}</td></tr>`
    )
    .join("");
  return `<h4>${tx("shop.materials_title")}</h4>
    <table>
      <thead><tr><th>${tx("shop.material")}</th><th>${tx(
        "print.qty"
      )}</th><th>${tx("shop.cost")}</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td>${tx("shop.preventivo_total")}</td><td></td><td>${euro(
        total
      )}</td></tr></tfoot>
    </table>`;
}
