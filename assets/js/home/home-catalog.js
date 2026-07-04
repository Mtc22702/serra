// Stato della pagina
let state = {
  zona: "temperato",
  riscaldata: false,
  mese: new Date().getMonth() + 1
};
let catalog = {
  search: "",
  type: "",
  seasonOnly: false,
  easyOnly: false,
  sort: "season",
  layout: localStorage.getItem("serra.catalog.layout") || "grid"
};
let cart = [];
let currentDetail = null;
let detailScrollY = 0;
let detailTouchY = null;
const BYID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));
const EASY_IDS = new Set([
  "lattuga",
  "rucola",
  "ravanello",
  "basilico",
  "zucchina",
  "fagiolino",
  "carota",
  "spinaci",
  "prezzemolo",
  "valerianella"
]);
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
  salvia: { seeds: 100, price: 2.8 }
};

// Logica catalogo
function effectiveMonths(plant) {
  const set = new Set(plant.mesi);
  if (state.riscaldata || state.zona === "caldo") {
    plant.mesi.forEach((m) => {
      set.add(m === 1 ? 12 : m - 1);
      set.add(m === 12 ? 1 : m + 1);
    });
  } else if (state.zona === "freddo") {
    set.clear();
    plant.mesi.forEach((m) => {
      if (m >= 2 && m <= 11) set.add(m);
    });
  }
  return set;
}
// Filtra le piante seminabili nel mese corrente
function seminabili() {
  return PLANTS.filter((p) => effectiveMonths(p).has(state.mese));
}
// Recupera il tipo della pianta
function typeOfPlant(p) {
  return (
    p.tipo || p.arch || (typeof TIPO !== "undefined" && TIPO[p.id]) || "foglia"
  );
}
// Recupera la distanza di coltivazione
function plantDistanceValue(p) {
  const spacing = PLANT_SPACING[p.id] || {};
  return Number(spacing.d || spacing.dr || 999);
}
// Calcola il punteggio di ordinamento catalogo
function catalogSortScore(p) {
  const seasonal = effectiveMonths(p).has(state.mese) ? 0 : 1;
  const easy = EASY_IDS.has(p.id) ? 0 : 1;
  return seasonal * 10000 + easy * 1000 + (p.gg || 365);
}
// Ordina le piante del catalogo
function sortCatalogPlants(plants) {
  const list = [...plants];
  const byName = (a, b) =>
    plantName(a.id).localeCompare(
      plantName(b.id),
      currentLang === "ro" ? "ro" : "it",
      { sensitivity: "base" }
    );
  if (catalog.sort === "name") return list.sort(byName);
  if (catalog.sort === "fast")
    return list.sort((a, b) => (a.gg || 9999) - (b.gg || 9999) || byName(a, b));
  if (catalog.sort === "yield")
    return list.sort((a, b) => (b.resa || 0) - (a.resa || 0) || byName(a, b));
  if (catalog.sort === "distance")
    return list.sort(
      (a, b) => plantDistanceValue(a) - plantDistanceValue(b) || byName(a, b)
    );
  if (catalog.sort === "price")
    return list.sort(
      (a, b) => packPrice(a.id) - packPrice(b.id) || byName(a, b)
    );
  return list.sort(
    (a, b) => catalogSortScore(a) - catalogSortScore(b) || byName(a, b)
  );
}
// Conta le piante per tipo
function catalogTypeCounts(base) {
  return ["frutto", "foglia", "radice", "legume", "aromatica"].map((type) => ({
    type,
    count: base.filter((p) => typeOfPlant(p) === type).length
  }));
}
// Normalizza il testo di ricerca
function normalizeSearch(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
// Filtra le piante del catalogo
function filteredCatalogPlants() {
  const term = normalizeSearch(catalog.search);
  const base = catalog.seasonOnly ? seminabili() : PLANTS;
  const filtered = base.filter((p) => {
    const tipo = typeOfPlant(p);
    if (catalog.type && tipo !== catalog.type) return false;
    if (catalog.easyOnly && !EASY_IDS.has(p.id)) return false;
    if (!term) return true;
    const haystack = normalizeSearch(
      [plantName(p.id), p.nome, typeLabel(tipo), plantNote(p)].join(" ")
    );
    return haystack.includes(term);
  });
  return sortCatalogPlants(filtered);
}
// Restituisce il nome localizzato della pianta
function plantName(id) {
  return PLANT_RO[id]?.nome && currentLang === "ro"
    ? PLANT_RO[id].nome
    : BYID[id]?.nome || id;
}
// Restituisce la nota localizzata della pianta
function plantNote(p) {
  return PLANT_RO[p.id]?.nota && currentLang === "ro"
    ? PLANT_RO[p.id].nota
    : p.nota;
}
// Restituisce la guida di semina localizzata
function localizedSowingGuide(plant) {
  if (currentLang !== "ro") return SOWING_GUIDE[plant.id];
  if (SOWING_GUIDE_RO[plant.id]) return SOWING_GUIDE_RO[plant.id];

  const spacing = PLANT_SPACING[plant.id] || {};
  const row = spacing.d || plant.d || 30;
  const between = spacing.dr || plant.dr || row;
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

  let method =
    "Seamănă în alveole sau răsadniță, apoi transplantează plante viguroase în strat.";
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

  let depth = "0,5-1 cm";
  if (bulbs.has(plant.id) || plant.id === "patata") depth = "3-5 cm";
  if (warm.has(plant.id)) depth = "1-2 cm";
  if (aromatics.has(plant.id))
    depth = "superficial, cu acoperire foarte ușoară";

  const thin =
    spacing.dr && spacing.dr !== spacing.d
      ? `Lasă ${row} cm pe rând și ${between} cm între rânduri.`
      : `Lasă ${row} cm între plante.`;
  const tip =
    plantNote(plant) ||
    "Menține umiditatea constantă la pornire și evită aglomerarea plantelor.";

  return { method, depth, thin, tip };
}
// Restituisce il titolo del kit
function kitTitle(month) {
  return currentLang === "ro"
    ? t(`kit.title_${month}`) || KITS[month].titolo
    : KITS[month].titolo;
}
// Restituisce l'etichetta del tipo
function typeLabel(type) {
  return t(`type.${type}`);
}
// Traduce una chiave con variabili
function tv(key, vars = {}) {
  let value = t(key);
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}
// Restituisce il prezzo della bustina
function packPrice(id) {
  return PACK_DATA[id]?.price ?? 2.5;
}
// Restituisce i semi per bustina
function seedsPerPack(id) {
  return PACK_DATA[id]?.seeds ?? 100;
}
// Verifica se la pianta è nel carrello
function inCart(id) {
  return cart.some((i) => i.id === id);
}
// Formatta il valore in euro
function money(value) {
  return new Intl.NumberFormat(currentLang === "ro" ? "ro-RO" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
// Restituisce l'etichetta della zona
function zoneLabel(zone) {
  return t(`zone.${zone}`);
}
// Restituisce l'etichetta della serra
function greenhouseLabel() {
  return state.riscaldata ? t("greenhouse.heated") : t("greenhouse.cold");
}
// Restituisce l'etichetta azione carrello
function cartActionLabel(inCart) {
  return inCart ? t("cart.in_cart") : t("cart.add");
}
// Restituisce l'etichetta carrello dettaglio
function detailCartLabel(inCart) {
  return inCart ? t("cart.remove_from_cart") : t("cart.add_to_cart");
}
// Restituisce l'etichetta dei giorni
function daysLabel(plant, full = false) {
  if (plant.gg === 0) return t("plant.perennial");
  return full
    ? t("plant.days_harvest").replace("{days}", plant.gg)
    : `${plant.gg} ${t("plant.days_short")}`;
}
// Restituisce l'etichetta delle distanze
function spacingLabel(plant) {
  const spacing = PLANT_SPACING[plant.id];
  if (!spacing) return "—";
  return spacing.dr && spacing.dr !== spacing.d
    ? `${spacing.d}×${spacing.dr} cm`
    : `${spacing.d} cm`;
}
// Restituisce l'etichetta della resa
function yieldLabel(plant) {
  return plant.resa >= 1
    ? `${plant.resa} kg`
    : `${Math.round(plant.resa * 1000)} g`;
}
// Restituisce l'etichetta esposizione
function sunLabel(plant) {
  return plant.sole === "pieno" ? t("plant.full_sun") : t("plant.half_shade");
}
// Genera l'infografica delle distanze
function spacingInfographic(p) {
  const sp = PLANT_SPACING[p.id] || {};
  const d = sp.d;
  const dr = sp.dr || sp.d;
  if (!d) return "";
  const W = 224;
  const H = 118;
  const R = 7;
  const cx = [34, 78, 122, 166];
  const cy = [45, 89];
  const pid = p.id.replace(/[^a-z]/g, "");
  const rLbl = t("detail.in_row");
  const bLbl = t("detail.between_rows");

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
// Applica dynamic static text
function applyDynamicStaticText() {
  const heatedBtn = document.getElementById("heroHeatedBtn");
  const heatedLabel = document.getElementById("heroHeatedLabel");
  if (heatedLabel)
    heatedLabel.textContent = state.riscaldata
      ? t("hero.heated_on")
      : t("hero.heated_off");
  if (heatedBtn)
    heatedBtn.setAttribute("aria-pressed", String(state.riscaldata));
  const catalogHeatedLabel = document.getElementById("catalogHeatedLabel");
  const catalogHeatedBtn = document.getElementById("catalogHeatedBtn");
  if (catalogHeatedLabel)
    catalogHeatedLabel.textContent = state.riscaldata
      ? t("hero.heated_on")
      : t("hero.heated_off");
  if (catalogHeatedBtn)
    catalogHeatedBtn.setAttribute("aria-pressed", String(state.riscaldata));
  const zoneNote = {
    freddo: "hero.filter_note_zone_cold",
    temperato: "hero.filter_note_zone_temp",
    caldo: "hero.filter_note_zone_warm"
  }[state.zona];
  const noteText = state.riscaldata
    ? t("hero.filter_note_heated")
    : t(zoneNote);
  const note = document.getElementById("heroFilterNote");
  if (note) note.textContent = noteText;
  const catalogNote = document.getElementById("catalogFilterNote");
  if (catalogNote) catalogNote.textContent = noteText;
}

// Rendering hero
function renderHero() {
  const stag = getStagione(state.mese);

  document.getElementById("hero").style.setProperty("--hero-bg", HERO_BG[stag]);
  document.getElementById("heroKicker").textContent = HERO_KICKER[stag];
  document.getElementById("heroMonth").textContent = NOMI_MESI[state.mese - 1];
  document.getElementById("heroTagline").textContent =
    STAGIONE_QUOTE[state.mese];
  document.querySelectorAll(".hero-zone-btn").forEach((b) => {
    const selected = b.dataset.zone === state.zona;
    b.classList.toggle("active", selected);
    b.setAttribute("aria-pressed", String(selected));
  });
  document
    .getElementById("heroHeatedBtn")
    ?.classList.toggle("active", state.riscaldata);
  document
    .getElementById("catalogHeatedBtn")
    ?.classList.toggle("active", state.riscaldata);
  applyDynamicStaticText();

  const plants = diversePlants(seminabili(), 8);
  const positions = [
    { top: "8%", right: "3%", size: 160, opacity: 0.2, dur: 7, delay: 0 },
    { top: "22%", right: "15%", size: 92, opacity: 0.16, dur: 5.5, delay: 1.4 },
    { top: "62%", right: "2%", size: 118, opacity: 0.18, dur: 8, delay: 2.7 },
    { top: "80%", right: "20%", size: 78, opacity: 0.15, dur: 6, delay: 0.6 },
    { top: "10%", left: "2%", size: 78, opacity: 0.16, dur: 5, delay: 3.3 },
    { top: "48%", left: "5%", size: 104, opacity: 0.18, dur: 7.5, delay: 1.1 },
    { top: "78%", left: "12%", size: 86, opacity: 0.16, dur: 6.5, delay: 4.1 },
    { top: "30%", left: "22%", size: 66, opacity: 0.14, dur: 9, delay: 2.0 }
  ];
  const wrap = document.getElementById("heroBgPlants");
  let previousEmoji = "";
  wrap.innerHTML = plants
    .map((p, i) => {
      const pos = positions[i] || positions[0];
      const posStyle = pos.right
        ? `top:${pos.top};right:${pos.right}`
        : `top:${pos.top};left:${pos.left}`;
      const visual = mixedPlantVisual(
        p,
        "hero-bg-plant-visual",
        i,
        previousEmoji
      );
      previousEmoji = fruitEmoji(p.id);
      return `<span class="hero-bg-plant" aria-hidden="true"
      style="${posStyle};font-size:${pos.size}px;opacity:${pos.opacity};--dur:${pos.dur}s;--delay:${pos.delay}s;">${visual}</span>`;
    })
    .join("");
}

// Renderizza calendar strip
function renderCalendarStrip() {
  const strip = document.getElementById("monthStrip");
  const help = document.getElementById("monthStripHelp");
  if (!strip) return;
  const planteLabel = currentLang === "ro" ? "plante" : "piante";
  const sowingLabel = currentLang === "ro" ? "de semănat" : "seminabili";
  const chooseLabel = currentLang === "ro" ? "alege luna" : "scegli mese";
  const selectedLabel =
    currentLang === "ro" ? "lună selectată" : "mese selezionato";
  const selectedCount = PLANTS.filter((p) =>
    effectiveMonths(p).has(state.mese)
  ).length;
  if (help) {
    help.textContent =
      currentLang === "ro"
        ? `${NOMI_MESI[state.mese - 1]} · ${selectedCount} plante potrivite`
        : `${NOMI_MESI[state.mese - 1]} · ${selectedCount} piante adatte`;
  }
  strip.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const count = PLANTS.filter((p) => effectiveMonths(p).has(m)).length;
    const active = m === state.mese ? " active" : "";
    return `<button class="month-tile${active}" onclick="setMese(${m})" aria-label="${NOMI_MESI[i]}: ${count} ${planteLabel} ${sowingLabel}" aria-pressed="${m === state.mese}">
      <span class="month-tile-name">${NOMI_MESI[i]}</span>
      <span class="month-tile-meta"><span class="month-tile-count">${count}</span> <span class="month-tile-label">${planteLabel} ${sowingLabel}</span></span>
      <span class="month-tile-action">${m === state.mese ? selectedLabel : chooseLabel}</span>
    </button>`;
  }).join("");
  centerActiveMonth(strip);
}

// Centra il mese attivo
function centerActiveMonth(strip) {
  const activeMonth = strip?.querySelector(".month-tile.active");
  if (!activeMonth) return;
  requestAnimationFrame(() => {
    const target =
      activeMonth.offsetLeft -
      (strip.clientWidth - activeMonth.offsetWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, target),
      behavior: "auto"
    });
  });
}

// Alterna cfg levels
function toggleCfgLevels() {
  const panel = document.getElementById("cfgLevels");
  const btn = document.getElementById("cfgOpenBtn");
  if (!panel || !btn) return;
  const willOpen = panel.hasAttribute("hidden");
  if (willOpen) {
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", "true");
    const first = panel.querySelector(".hero-cfg-level");
    if (first) first.focus({ preventScroll: true });

    requestAnimationFrame(() => {
      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 66;
      const card = document.querySelector(".hero-cfg");
      const target = card || btn;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  } else {
    panel.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
  }
}

// Rendering catalogo
function renderEditorialPlants() {
  const seasonal = seminabili();
  const plants = filteredCatalogPlants();
  const filtersActive =
    Boolean(catalog.search || catalog.type || catalog.easyOnly) ||
    catalog.seasonOnly;
  syncCatalogControls();
  const catalogStatus = document.getElementById("catalogStatus");
  if (catalogStatus) {
    const pills = [];
    if (!catalog.seasonOnly)
      pills.push({ kind: "scope", label: t("catalog.filter_all_plants") });
    if (catalog.search)
      pills.push({ kind: "search", label: `"${catalog.search}"` });
    if (catalog.type)
      pills.push({ kind: "type", label: typeLabel(catalog.type) });
    if (catalog.easyOnly)
      pills.push({ kind: "easy", label: t("catalog.easy_only") });
    if (catalog.sort && catalog.sort !== "season")
      pills.push({ kind: "sort", label: t(`catalog.sort_${catalog.sort}`) });
    catalogStatus.hidden = !pills.length;
    if (pills.length) {
      const remove = t("catalog.remove_filter");
      catalogStatus.innerHTML =
        `<span class="catalog-status-count">${plants.length} ${t("catalog.results")}</span>` +
        `<span class="catalog-status-pills">` +
        pills
          .map(
            (p) =>
              `<button class="catalog-filter-pill" type="button" onclick="removeCatalogFilter('${p.kind}')" aria-label="${remove}: ${p.label}"><span class="pill-text">${p.label}</span><span class="pill-x" aria-hidden="true">✕</span></button>`
          )
          .join("") +
        `</span>` +
        `<button class="catalog-clear-all" type="button" onclick="showFullCatalog()">${t("catalog.reset_short")}</button>`;
    }
  }
  if (catalog.seasonOnly) {
    document.getElementById("stagioneTitle").innerHTML = t("season.title")
      .replace(
        "{count}",
        `<span class="stagione-count">${plants.length}</span>`
      )
      .replace("{month}", NOMI_MESI[state.mese - 1]);
  } else {
    document.getElementById("stagioneTitle").innerHTML = tv(
      "catalog.count_all",
      {
        count: `<span class="stagione-count">${plants.length}</span>`
      }
    );
  }
  const baseMeta = t("season.meta")
    .replace("{zone}", zoneLabel(state.zona))
    .replace("{greenhouse}", greenhouseLabel());
  document.getElementById("stagioneMeta").textContent = filtersActive
    ? `${baseMeta} · ${tv("catalog.count_filtered", {
        shown: plants.length,
        total: catalog.seasonOnly ? seasonal.length : PLANTS.length
      })}`
    : baseMeta;

  renderCatalogCategoryRail(catalog.seasonOnly ? seasonal : PLANTS);
  renderCatalogInsights(plants, catalog.seasonOnly ? seasonal : PLANTS);

  if (!plants.length) {
    document.getElementById("editorialPlants").innerHTML =
      `<div class="empty-state"><div class="empty-icon">🌱</div><p>${filtersActive ? t("catalog.empty") : t("season.empty")}</p>${filtersActive ? `<button class="empty-cta" type="button" onclick="showFullCatalog()">${t("catalog.show_all")}</button>` : ""}</div>`;
    document.getElementById("compactPlants").innerHTML = "";
    return;
  }

  const btnGrid = document.getElementById("layoutBtnGrid");
  const btnCompact = document.getElementById("layoutBtnCompact");
  if (btnGrid && btnCompact) {
    if (catalog.layout === "compact") {
      btnGrid.classList.remove("active");
      btnGrid.setAttribute("aria-pressed", "false");
      btnCompact.classList.add("active");
      btnCompact.setAttribute("aria-pressed", "true");
    } else {
      btnGrid.classList.add("active");
      btnGrid.setAttribute("aria-pressed", "true");
      btnCompact.classList.remove("active");
      btnCompact.setAttribute("aria-pressed", "false");
    }
  }

  const seasonSet = new Set(seasonal.map((p) => p.id));
  const offSeasonBadge = `<span class="off-season-badge">${t("catalog.off_season")}</span>`;

  if (catalog.layout === "compact") {
    document.getElementById("editorialPlants").innerHTML = "";
    document.getElementById("compactPlants").classList.add("compact-list-view");
    document.getElementById("compactPlants").innerHTML = plants
      .map((p) => {
        const tipo = typeOfPlant(p);
        const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
        const inC = inCart(p.id);
        const emoji = fruitEmoji(p.id);
        const waterIcon = ACQUA_ICON[p.acqua] || "💧";
        const sunIcon = p.sole === "pieno" ? "☀️" : "🌤️";
        return `<div class="plant-card-super-compact${inC ? " in-cart" : ""}" id="card-${p.id}" onclick="openDetail('${p.id}')">
          <span class="super-compact-thumb" aria-hidden="true">
            <img src="${photoSrc(p.id)}" alt="" loading="lazy" onerror="this.parentElement.dataset.fallback='1';this.style.display='none'" />
            <span class="super-compact-thumb-emoji">${emoji}</span>
          </span>
          <span class="super-compact-body">
            <span class="super-compact-top">
              <span class="super-compact-name">${plantName(p.id)}</span>
              <span class="super-compact-price">${money(packPrice(p.id))}</span>
            </span>
            <span class="super-compact-bottom">
              <span class="super-compact-badge" data-plant-type="${tipo}" style="${ts}">${typeLabel(tipo)}</span>
              <span class="super-compact-fact">⏱&nbsp;${daysLabel(p)}</span>
              <span class="super-compact-yield">⚖&nbsp;${yieldLabel(p)}</span>
              <span class="super-compact-meta" aria-hidden="true">${waterIcon}&thinsp;${sunIcon}</span>
              ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
            </span>
          </span>
          <button class="super-compact-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')" title="${inC ? t("cart.remove") : t("cart.add_plain")}">${inC ? "✓" : "+"}</button>
        </div>`;
      })
      .join("");
  } else {
    document
      .getElementById("compactPlants")
      .classList.remove("compact-list-view");
    const featured = plants.slice(0, 3);
    const rest = plants.slice(3);

    const editHTML = `<div class="plant-catalog-top">
      ${featured
        .map((p) => {
          const tipo = typeOfPlant(p);
          const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
          const inC = inCart(p.id);
          return `<div class="plant-card-top${inC ? " in-cart" : ""}" id="card-${p.id}" onclick="openDetail('${p.id}')">
          <div class="top-photo">
            <img src="${photoSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" />
            <span class="photo-type-tag" data-plant-type="${tipo}" style="${ts}">${typeLabel(tipo)}</span>
            <span class="photo-cart-check">✓</span>
          </div>
          <div class="top-body">
            <div class="top-nameline">
              <div class="top-name">${plantName(p.id)}</div>
              ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
            </div>
            <div class="top-facts-row">
              <span class="top-fact">⏱&nbsp;${daysLabel(p)}</span>
              <span class="top-fact">↔&nbsp;${spacingLabel(p)}</span>
              <span class="top-fact">⚖&nbsp;${yieldLabel(p)}</span>
            </div>
            <div class="top-buy-row">
              <span class="top-price">
                <b>${money(packPrice(p.id))}</b>
                <small>${seedsPerPack(p.id)} ${t("catalog.seeds")}</small>
              </span>
              <button class="top-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')">
                ${cartActionLabel(inC)}
              </button>
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>`;
    document.getElementById("editorialPlants").innerHTML = editHTML;

    document.getElementById("compactPlants").innerHTML = rest
      .map((p) => {
        const tipo = typeOfPlant(p);
        const ts = TIPO_STYLE[tipo] || TIPO_STYLE.foglia;
        const inC = inCart(p.id);
        return `<div class="plant-card-compact${inC ? " in-cart" : ""}" id="card-${p.id}" onclick="openDetail('${p.id}')">
          <div class="compact-thumb"><img src="${photoSrc(p.id)}" alt="${plantName(p.id)}" loading="lazy" /></div>
          <div class="compact-info">
            <div class="compact-name-row">
              <span class="compact-name">${plantName(p.id)}</span>
              <span class="compact-badge" data-plant-type="${tipo}" style="${ts}">${typeLabel(tipo)}</span>
              ${!seasonSet.has(p.id) ? offSeasonBadge : ""}
            </div>
            <p class="compact-note">${plantNote(p)}</p>
            <div class="compact-facts-row compact-facts-row--pro">
              <span>⏱&nbsp;${daysLabel(p)}</span>
              <span>↔&nbsp;${spacingLabel(p)}</span>
              <span>⚖&nbsp;${yieldLabel(p)}</span>
            </div>
          </div>
          <div class="compact-buy">
            <span class="compact-price">${money(packPrice(p.id))}</span>
            <button class="compact-add-btn${inC ? " added" : ""}" onclick="toggleCart(event,'${p.id}')" title="${inC ? t("cart.remove") : t("cart.add_plain")}">${inC ? "✓" : "+"}</button>
          </div>
        </div>`;
      })
      .join("");
  }
}

// Imposta catalog layout
function setCatalogLayout(layout) {
  catalog.layout = layout;
  localStorage.setItem("serra.catalog.layout", layout);
  renderEditorialPlants();
}

// Abbinamenti
function renderAbbinamenti() {
  const available = new Set(seminabili().map((p) => p.id));
  const pairs = [];
  const seen = new Set();
  for (const plant of seminabili()) {
    for (const fid of plant.amiche) {
      if (!available.has(fid)) continue;
      const key = [plant.id, fid].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([plant.id, fid]);
      if (pairs.length >= 3) break;
    }
    if (pairs.length >= 3) break;
  }
  const summary = document.getElementById("companionsSummary");
  if (summary) {
    summary.textContent = tv("companions.summary", {
      count: pairs.length,
      month: NOMI_MESI[state.mese - 1]
    });
  }
  if (!pairs.length) {
    document.getElementById("abbinamenti-grid").innerHTML =
      `<div class="abbinamenti-empty" style="grid-column:1/-1">${t("companions.empty")}</div>`;
    return;
  }
  const ABBINAMENTO_REASONS = [
    [t("companions.reason_1"), t("companions.badge_1")],
    [t("companions.reason_2"), t("companions.badge_2")],
    [t("companions.reason_3"), t("companions.badge_3")]
  ];
  document.getElementById("abbinamenti-grid").innerHTML = pairs
    .map(([aId, bId], i) => {
      const a = BYID[aId];
      const b = BYID[bId];
      const [reason, badge] = ABBINAMENTO_REASONS[i] || ABBINAMENTO_REASONS[0];
      const pairInCart = inCart(aId) && inCart(bId);
      return `<div class="abbinamento-card${pairInCart ? " in-cart" : ""}">
      <div class="abbin-card-topline"><span>${tv("companions.pair_number", { number: i + 1 })}</span><span>${badge}</span></div>
      <div class="abbinamento-photos">
        <div class="abbin-photo"><img src="${photoSrc(aId)}" alt="${plantName(aId)}" /></div>
        <div class="abbin-heart">💚</div>
        <div class="abbin-photo"><img src="${photoSrc(bId)}" alt="${plantName(bId)}" /></div>
      </div>
      <div class="abbin-names">${plantName(aId)} + ${plantName(bId)}</div>
      <div class="abbin-reason">${reason}</div>
      <div class="abbin-badge">${badge}</div>
      <button class="abbin-add-btn${pairInCart ? " added" : ""}" onclick="addPairToCart(event,'${aId}','${bId}')">
        ${pairInCart ? t("companions.in_cart_pair") : t("companions.add_pair")}
      </button>
    </div>`;
    })
    .join("");
}

// Kit del mese
function renderKit() {
  const kit = KITS[state.mese];
  if (!kit) return;
  const avail = kit.ids.filter(
    (id) => BYID[id] && effectiveMonths(BYID[id]).has(state.mese)
  );
  if (!avail.length) return;
  document.getElementById("kitHeading").textContent = t("kit.heading").replace(
    "{month}",
    NOMI_MESI[state.mese - 1]
  );
  document.getElementById("kitTitle").textContent = kitTitle(state.mese);
  document.getElementById("kitDesc").textContent = t("kit.desc").replace(
    "{count}",
    avail.length
  );
  const kitMetaRow = document.getElementById("kitMetaRow");
  if (kitMetaRow) {
    const fastCount = avail.filter(
      (id) => BYID[id]?.gg && BYID[id].gg <= 45
    ).length;
    const easyCount = avail.filter((id) => EASY_IDS.has(id)).length;
    kitMetaRow.innerHTML = `
      <span><b>${avail.length}</b> ${t("catalog.seeds")}</span>
      <span><b>${easyCount}</b> ${t("catalog.easy_only")}</span>
      <span><b>${fastCount}</b> ${t("catalog.insight_fast")}</span>
    `;
  }
  document.getElementById("kitCompatText").textContent = t("kit.compat");
  document.getElementById("kitPhotos").innerHTML = avail
    .map((id) => {
      const p = BYID[id];
      return `<div class="kit-photo">
      <img src="${photoSrc(id)}" alt="${plantName(id)}" loading="lazy" />
      <div class="kit-photo-lbl">${plantName(id)}</div>
    </div>`;
    })
    .join("");
}

// Footer
function renderFooter() {
  document.getElementById("footerTip").textContent = TIP_MESE[state.mese];
  const stag = getStagione(state.mese);
  const stagLabel = {
    inverno: t("season_name.winter"),
    primavera: t("season_name.spring"),
    estate: t("season_name.summer"),
    autunno: t("season_name.autumn")
  }[stag];
  const footerSeasonTag = document.getElementById("footerSeasonTag");
  if (footerSeasonTag) footerSeasonTag.innerHTML = stagLabel;

  let previousEmoji = "";
  const icons = nonRepeatingPlantOrder(PLANTS)
    .map((p, i) => {
      const visual = mixedPlantVisual(
        p,
        "footer-plant-icon-visual",
        i,
        previousEmoji
      );
      previousEmoji = fruitEmoji(p.id);
      return `<span class="footer-plant-icon">${visual}</span>`;
    })
    .join("");
  document.getElementById("footerPlantRow").innerHTML = icons + icons;
}

// Aggiornamento generale
function render() {
  renderHero();
  renderCalendarStrip();
  renderEditorialPlants();
  renderAbbinamenti();
  renderKit();
  renderFooter();
  updateCartUI();
  savePrefs();
}
