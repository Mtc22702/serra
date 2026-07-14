// Prezzi e calcoli
const MATERIAL_PRICES = {
  soilBagLiters: 50,
  soilBagPrice: 6.5,
  fertilizerKg: 2.2,
  support: 1.5,
  label: 0.15
};

const shoppingQtyOverride = {};
// I semi sono già gestiti dalla lista/carrello principale: qui restano solo i
// materiali extra facoltativi (terriccio, concime, sostegni, etichette).
// Selezione utente: quali materiali extra aggiungere all'ordine. Facoltativi
// di default (nessuno pre-selezionato) e persistiti per non perderli tra un
// ricaricamento e l'altro.
const MATERIALS_SELECTION_KEY = "ois.cartMaterials";
const shoppingChecked = {};
try {
  Object.assign(
    shoppingChecked,
    JSON.parse(localStorage.getItem(MATERIALS_SELECTION_KEY) || "{}")
  );
} catch (_) {}

// Salva la selezione dei materiali extra
function saveMaterialsSelection() {
  try {
    localStorage.setItem(
      MATERIALS_SELECTION_KEY,
      JSON.stringify(shoppingChecked)
    );
  } catch (_) {}
}

// Calcola l'area utile delle aiuole in metri quadri
function bedAreaM2() {
  const area = (Number(state.larghezza) || 0) * (Number(state.lunghezza) || 0);
  return Math.max(0, area * 0.6);
}

// Verifica se la pianta richiede sostegno
function isSupportPlant(p) {
  return p.h === "alta" || ["rampicante", "cucurbita"].includes(p.arch);
}

// Formatta un numero come stringa euro
function euro(v) {
  return new Intl.NumberFormat(state.lang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(v);
}

// Calcolo materiali extra (facoltativi, non comprende i semi: quelli sono
// nella lista/carrello principale sopra questa sezione)
function computeMaterialLines() {
  const lines = [];
  if (!state.beds.length) return lines;

  const areaBeds = bedAreaM2();

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

// Calcola le righe materiali con quantità e totali.
// Facoltativi di default: solo i materiali selezionati (checked = true)
// contano nel totale e finiscono nell'ordine.
function materialsWithTotals() {
  const lines = computeMaterialLines().map((line) => {
    const qty =
      shoppingQtyOverride[line.id] != null
        ? shoppingQtyOverride[line.id]
        : line.qty;
    const checked = Boolean(shoppingChecked[line.id]);
    const subtotal = checked ? qty * line.unitPrice : 0;
    return { ...line, qty, checked, subtotal };
  });
  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  return { lines, total };
}

// Materiali extra selezionati dall'utente, pronti per finire nell'ordine
// (usati sia dal pannello carrello che dalla creazione dell'ordine finale)
function selectedMaterialItems() {
  const { lines } = materialsWithTotals();
  return lines
    .filter((l) => l.checked && l.qty > 0)
    .map((l) => ({
      id: "mat-" + l.id,
      nome: shoppingCatLabel(l.cat),
      bustine: l.qty,
      prezzo: l.unitPrice,
      icon: l.icon,
      unit: l.unit,
      type: "material"
    }));
}

// Costo totale dei materiali extra attualmente selezionati
function selectedMaterialsTotal() {
  return selectedMaterialItems().reduce(
    (sum, item) => sum + item.bustine * item.prezzo,
    0
  );
}

// Toglie un materiale extra dalla selezione (es. dal pannello carrello)
function unselectMaterial(rawId) {
  const id = rawId.startsWith("mat-") ? rawId.slice(4) : rawId;
  shoppingChecked[id] = false;
  saveMaterialsSelection();
  renderMaterials();
  if (typeof updateConfCartUI === "function") updateConfCartUI();
}

// Restituisce l'etichetta tradotta dell'unità di misura
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

// Restituisce l'etichetta tradotta della categoria materiale
function shoppingCatLabel(cat) {
  return tx("shop.cat_" + cat);
}

// Costo dei semi nel piano attuale (stessa logica dell'esportazione carrello)
function seedsCostTotal() {
  if (!state.beds.length) return 0;
  return state.beds.reduce((sum, b) => {
    const pd = PACK_DATA[b.plantId] || { seeds: 100, price: 2.5 };
    const packs = Math.max(1, Math.ceil(b.count / (pd.seeds ?? 100)));
    return sum + packs * pd.price;
  }, 0);
}

// Aggiorna il totale generale dell'ordine (semi + materiali extra scelti)
function updateOrderGrandTotal() {
  const el = document.getElementById("orderGrandTotal");
  if (!el) return;
  if (!state.beds.length) {
    el.hidden = true;
    return;
  }
  const grand = seedsCostTotal() + materialsWithTotals().total;
  el.hidden = false;
  el.innerHTML = `
    <span>${tx("cart.materials_grand_total")}</span>
    <b>${euro(grand)}</b>`;
}

// Rendering lista spesa. La tendina "materiali extra" resta la stessa
// istanza tra un render e l'altro, così non si richiude da sola mentre
// l'utente ci sta lavorando dentro (spunta/quantità).
function renderMaterials() {
  const el = document.getElementById("materials");
  if (!el) return;
  if (!state.beds.length) {
    el.innerHTML = "";
    updateOrderGrandTotal();
    return;
  }
  const { lines, total } = materialsWithTotals();
  const selectedCount = lines.filter((l) => l.checked).length;

  let details = el.querySelector(".materials-accordion");
  if (!details) {
    el.innerHTML = `
      <details class="materials-accordion">
        <summary class="materials-summary">
          <span class="materials-summary-main">
            <b>${tx("shop.materials_title")}</b>
            <small>${tx("shop.materials_hint")}</small>
          </span>
          <span class="materials-summary-badge" hidden></span>
        </summary>
        <div class="materials-body"></div>
      </details>`;
    details = el.querySelector(".materials-accordion");
  }
  // Chiusa di default: si apre solo se l'utente clicca. Non la tocchiamo mai
  // qui, così un re-render (cambio quantità, spunta, ecc.) non la richiude
  // né la riapre da sola.

  const badge = details.querySelector(".materials-summary-badge");
  if (badge) {
    badge.hidden = selectedCount === 0;
    badge.textContent = tx("shop.materials_badge", { count: selectedCount });
  }

  const rows = lines
    .map((l) => {
      const noteHtml = l.note ? `<span class="mat-note">${l.note}</span>` : "";
      const toggleText = l.checked ? tx("shop.added") : tx("shop.add");
      return `<li class="mat-row${l.checked ? " is-checked" : ""}">
        <div class="mat-row-head">
          <span class="mat-icon" aria-hidden="true">${l.icon}</span>
          <b class="mat-name">${shoppingCatLabel(l.cat)}</b>
          <label class="mat-toggle">
            <input type="checkbox" data-mat-check="${l.id}" ${
              l.checked ? "checked" : ""
            } aria-label="${tx("shop.add_to_order")} · ${shoppingCatLabel(
              l.cat
            )}">
            <span class="mat-toggle-text">${toggleText}</span>
          </label>
        </div>
        <div class="mat-row-meta">${shoppingUnitLabel(l.unit, l.qty)} · ${euro(
          l.unitPrice
        )}/${tx("shop.each")} ${noteHtml}</div>
        <div class="mat-row-foot">
          <span class="mat-qty">
            <input type="number" min="0" step="1" inputmode="numeric"
              value="${l.qty}" data-mat-qty="${l.id}"
              aria-label="${tx("shop.qty_aria")} ${shoppingCatLabel(l.cat)}">
          </span>
          <span class="mat-sub">${euro(l.subtotal)}</span>
        </div>
      </li>`;
    })
    .join("");

  const body = details.querySelector(".materials-body");
  body.innerHTML = `
    <ul class="mat-list">${rows}</ul>
    <div class="mat-total">
      <span>${tx("shop.preventivo_total")}</span>
      <b>${euro(total)}</b>
    </div>
    <p class="mat-disclaimer">${tx("shop.estimate_note")}</p>`;

  body.querySelectorAll("[data-mat-qty]").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.matQty;
      const v = Math.max(0, Math.floor(Number(e.target.value) || 0));
      shoppingQtyOverride[id] = v;
      renderMaterials();
      if (typeof updateConfCartUI === "function") updateConfCartUI();
    });
  });
  body.querySelectorAll("[data-mat-check]").forEach((box) => {
    box.addEventListener("change", (e) => {
      shoppingChecked[e.target.dataset.matCheck] = e.target.checked;
      saveMaterialsSelection();
      renderMaterials();
      if (typeof updateConfCartUI === "function") updateConfCartUI();
    });
  });

  updateOrderGrandTotal();
}

// Genera l'HTML della lista materiali per la stampa (solo quelli scelti,
// visto che sono facoltativi)
function materialsPrintHtml() {
  if (!state.beds.length) return "";
  const { lines, total } = materialsWithTotals();
  const selectedLines = lines.filter((l) => l.checked);
  if (!selectedLines.length) return "";
  const rows = selectedLines
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
