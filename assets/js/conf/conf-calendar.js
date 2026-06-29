// Stato calendario
const calendarUi = {
  view: "project",
  month: null,
  search: "",
  category: "all"
};

const CALENDAR_ACTIVITY_ORDER = ["harvest", "sow", "transplant", "care"];

// Recupera una stringa tradotta per il calendario
function calendarText(key, vars) {
  return typeof tx === "function" ? tx(key, vars) : key;
}

// Normalizza un indice di mese in range 1-12
function calendarMonth(value) {
  return ((Number(value) - 1 + 12) % 12) + 1;
}

// Deduplica la lista piante per ID
function calendarUniquePlants(plants) {
  const seen = new Set();
  return plants.filter((plant) => {
    if (!plant || seen.has(plant.id)) return false;
    seen.add(plant.id);
    return true;
  });
}

// Restituisce le piante presenti nel progetto corrente
function calendarProjectPlants() {
  return calendarUniquePlants(
    state.beds.map((bed) => BYID[bed.plantId]).filter(Boolean)
  );
}

// Seleziona il pool di piante in base alla vista attiva
function calendarSourcePlants(view = calendarUi.view) {
  return view === "all" ? PLANTS : calendarProjectPlants();
}

// Restituisce la chiave di categoria della pianta
function calendarCategoryKey(plant) {
  const entry = CAT_ORDER.find((category) => category.ids.includes(plant.id));
  return entry?.key || "foglie";
}

// Traduce la chiave di categoria in etichetta
function calendarCategoryLabel(key) {
  return key === "all"
    ? calendarText("calendar.all_categories")
    : calendarText(`vegCat_${key}`);
}

// Elenca i mesi di semina effettivi della pianta
function calendarSowMonths(plant) {
  if (typeof effectiveMonths === "function") {
    return [...effectiveMonths(plant)].sort((a, b) => a - b);
  }
  return [...new Set(plant.mesi || [])].sort((a, b) => a - b);
}

// Verifica se la pianta è perenne
function calendarIsPerennial(plant) {
  return Number(plant.gg) === 0;
}

// Verifica se la pianta ammette il trapianto
function calendarCanTransplant(plant) {
  if (calendarIsPerennial(plant)) return false;
  const type = TIPO[plant.id] || plant.tipo || "foglia";
  if (type === "radice" || type === "legume") return false;
  return Number(plant.gg) >= 50 && Number(plant.d) >= 20;
}

// Calcola gli offset mensili di raccolta dalla semina
function calendarHarvestOffsets(plant) {
  if (calendarIsPerennial(plant)) return [];
  const central = Math.max(1, Math.round((Number(plant.gg) || 30) / 30));
  return [central, central + 1];
}

// Calcolo attività
function calendarPlantSchedule(plant) {
  const sow = new Set(calendarSowMonths(plant));
  const transplant = new Set();
  const care = new Set();
  const harvest = new Set();

  if (calendarIsPerennial(plant)) {
    for (let month = 1; month <= 12; month += 1) {
      care.add(month);
      harvest.add(month);
    }
  } else {
    const offsets = calendarHarvestOffsets(plant);
    sow.forEach((sowMonth) => {
      if (calendarCanTransplant(plant)) {
        transplant.add(calendarMonth(sowMonth + 1));
      }
      offsets.forEach((offset) =>
        harvest.add(calendarMonth(sowMonth + offset))
      );
      const lastOffset = Math.max(...offsets, 1);
      for (let offset = 1; offset < lastOffset; offset += 1) {
        care.add(calendarMonth(sowMonth + offset));
      }
    });
  }

  return { sow, transplant, care, harvest };
}

// Elenca le attività previste per una pianta in un mese
function calendarActivitiesForMonth(plant, month) {
  const schedule = calendarPlantSchedule(plant);
  return CALENDAR_ACTIVITY_ORDER.filter((activity) =>
    schedule[activity].has(month)
  );
}

// Restituisce icona ed etichetta di un'attività
function calendarActivityMeta(activity) {
  return {
    sow: { icon: "🌱", label: calendarText("calendar.sow") },
    transplant: {
      icon: "↗",
      label: calendarText("calendar.transplant")
    },
    care: { icon: "✦", label: calendarText("calendar.care") },
    harvest: { icon: "🧺", label: calendarText("calendar.harvest") }
  }[activity];
}

// Genera la stringa dei mesi abbreviati
function calendarMonthList(months) {
  const values = [...months].sort((a, b) => a - b);
  if (!values.length) return calendarText("calendar.continuous");
  return values.map((month) => monthName(month).slice(0, 3)).join(", ");
}

// Verifica se la pianta soddisfa i filtri attivi
function calendarMatchesFilters(plant) {
  const query = calendarUi.search.trim().toLocaleLowerCase(state.lang || "it");
  const name = String(plantText(plant, "nome") || "").toLocaleLowerCase(
    state.lang || "it"
  );
  const matchesSearch = !query || name.includes(query);
  const matchesCategory =
    calendarUi.category === "all" ||
    calendarCategoryKey(plant) === calendarUi.category;
  return matchesSearch && matchesCategory;
}

// Filtra e ordina le piante con attività nel mese
function calendarFilteredEntries(plants, month) {
  return plants
    .filter(calendarMatchesFilters)
    .map((plant) => ({
      plant,
      activities: calendarActivitiesForMonth(plant, month)
    }))
    .filter((entry) => entry.activities.length)
    .sort((a, b) => {
      const aHarvest = a.activities.includes("harvest") ? 0 : 1;
      const bHarvest = b.activities.includes("harvest") ? 0 : 1;
      return (
        aHarvest - bHarvest ||
        plantText(a.plant, "nome").localeCompare(
          plantText(b.plant, "nome"),
          state.lang || "it"
        )
      );
    });
}

// Rendering calendario
function calendarRenderCategories() {
  const select = document.getElementById("calendarCategory");
  if (!select) return;
  const current = calendarUi.category;
  select.innerHTML = [
    `<option value="all">${escapeHtmlProjects(
      calendarText("calendar.all_categories")
    )}</option>`,
    ...CAT_ORDER.map(
      (category) =>
        `<option value="${category.key}">${escapeHtmlProjects(
          calendarCategoryLabel(category.key)
        )}</option>`
    )
  ].join("");
  select.value = CAT_ORDER.some((category) => category.key === current)
    ? current
    : "all";
  calendarUi.category = select.value;
}

// Renderizza calendar render tabs
function calendarRenderTabs() {
  document.querySelectorAll("[data-calendar-view]").forEach((button) => {
    const active = button.dataset.calendarView === calendarUi.view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  const projectTab = document.getElementById("calendarViewProject");
  const allTab = document.getElementById("calendarViewAll");
  if (projectTab)
    projectTab.textContent = calendarText("calendar.view_project");
  if (allTab) allTab.textContent = calendarText("calendar.view_all");
}

// Renderizza calendar render month strip
function calendarRenderMonthStrip() {
  const strip = document.getElementById("calendarMonthStrip");
  if (!strip) return;
  const allPlants = PLANTS;
  strip.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const harvestCount = allPlants.filter((plant) =>
      calendarPlantSchedule(plant).harvest.has(month)
    ).length;
    const selected = month === calendarUi.month;
    const current = month === state.mese;
    const label = monthName(month);
    return `<button class="calendar-month-btn${selected ? " is-selected" : ""}${
      current ? " is-current" : ""
    }" type="button" role="tab" aria-selected="${selected}" aria-label="${escapeHtmlProjects(
      `${label}: ${harvestCount} ${calendarText("calendar.harvestable_short")}`
    )}" data-calendar-month="${month}" onclick="setCalendarMonth(${month})">
      <span class="calendar-month-abbr">${escapeHtmlProjects(label.slice(0, 3))}</span>
      <span class="calendar-month-count">${harvestCount}</span>
    </button>`;
  }).join("");
}

// Renderizza calendar render summary
function calendarRenderSummary() {
  const summary = document.getElementById("calendarSummary");
  if (!summary) return;
  const month = calendarUi.month;
  const allHarvest = PLANTS.filter((plant) =>
    calendarPlantSchedule(plant).harvest.has(month)
  ).length;
  const projectPlants = calendarProjectPlants();
  const projectHarvest = projectPlants.filter((plant) =>
    calendarPlantSchedule(plant).harvest.has(month)
  ).length;
  const zone =
    state.lang === "ro"
      ? {
          freddo: "zonă rece",
          temperato: "zonă temperată",
          caldo: "zonă caldă"
        }
      : {
          freddo: "zona fredda",
          temperato: "zona temperata",
          caldo: "zona calda"
        };
  summary.innerHTML = `<div>
      <b>${escapeHtmlProjects(monthName(month))}</b>
      <span>${calendarText("calendar.summary", {
        all: allHarvest,
        project: projectHarvest
      })}</span>
    </div>
    <small>${escapeHtmlProjects(zone[state.zona] || state.zona)} · ${calendarText(
      state.riscaldata ? "calendar.heated" : "calendar.unheated"
    )}</small>`;
}

// Genera i badge HTML delle attività
function calendarActivityBadges(activities) {
  return activities
    .map((activity) => {
      const meta = calendarActivityMeta(activity);
      return `<span class="cal-activity cal-activity--${activity}"><span aria-hidden="true">${meta.icon}</span>${escapeHtmlProjects(
        meta.label
      )}</span>`;
    })
    .join("");
}

// Genera la card HTML di una pianta nel calendario
function calendarPlantCard(entry) {
  const { plant, activities } = entry;
  const schedule = calendarPlantSchedule(plant);
  const name = plantText(plant, "nome");
  const note = plantText(plant, "nota") || plant.nota || "";
  const category = calendarCategoryLabel(calendarCategoryKey(plant));
  const harvestValue = calendarIsPerennial(plant)
    ? calendarText("calendar.continuous_harvest")
    : calendarMonthList(schedule.harvest);
  const days = calendarIsPerennial(plant)
    ? calendarText("calendar.perennial")
    : calendarText("calendar.days", { days: plant.gg });
  return `<details class="cal-plant-card">
    <summary>
      <span class="cal-plant-main">
        <b>${escapeHtmlProjects(name)}</b>
        <small>${escapeHtmlProjects(category)}</small>
      </span>
      <span class="cal-plant-activities">${calendarActivityBadges(activities)}</span>
      <span class="cal-expand" aria-hidden="true">⌄</span>
    </summary>
    <div class="cal-plant-detail">
      <dl>
        <div><dt>${calendarText("calendar.sowing_window")}</dt><dd>${escapeHtmlProjects(
          calendarMonthList(schedule.sow)
        )}</dd></div>
        <div><dt>${calendarText("calendar.harvest_window")}</dt><dd>${escapeHtmlProjects(
          harvestValue
        )}</dd></div>
        <div><dt>${calendarText("calendar.cycle")}</dt><dd>${escapeHtmlProjects(
          days
        )}</dd></div>
      </dl>
      ${note ? `<p>${escapeHtmlProjects(note)}</p>` : ""}
    </div>
  </details>`;
}

// Renderizza calendar render content
function calendarRenderContent() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;
  const source = calendarSourcePlants();
  const entries = calendarFilteredEntries(source, calendarUi.month);
  if (!source.length && calendarUi.view === "project") {
    grid.innerHTML = `<div class="cal-empty-state"><b>${calendarText(
      "calendar.empty_title"
    )}</b><span>${calendarText("calendar.empty")}</span><button type="button" onclick="setCalendarView('all')">${calendarText(
      "calendar.explore_all"
    )}</button></div>`;
    return;
  }
  if (!entries.length) {
    grid.innerHTML = `<div class="cal-empty-state"><b>${calendarText(
      "calendar.no_results_title"
    )}</b><span>${calendarText("calendar.no_results")}</span></div>`;
    return;
  }
  const harvestCount = entries.filter((entry) =>
    entry.activities.includes("harvest")
  ).length;
  grid.innerHTML = `<div class="cal-results-head"><span>${calendarText(
    "calendar.results",
    { count: entries.length }
  )}</span><strong>${calendarText("calendar.harvest_results", {
    count: harvestCount
  })}</strong></div>${entries.map(calendarPlantCard).join("")}`;
}

// Aggiorna tutti i componenti della modale calendario
function renderCalendarModal(options = {}) {
  calendarUi.month = calendarUi.month || state.mese;
  const title = document.getElementById("calendarModalTitle");
  const intro = document.getElementById("calendarIntro");
  const subtitle = document.getElementById("calendarSubtitle");
  const search = document.getElementById("calendarSearch");
  const searchLabel = document.getElementById("calendarSearchLabel");
  const categoryLabel = document.getElementById("calendarCategoryLabel");
  if (title) title.textContent = calendarText("calendar.title");
  if (intro) intro.textContent = calendarText("calendar.intro");
  if (subtitle) {
    subtitle.textContent =
      typeof getActiveProject === "function" ? getActiveProject().name : "";
  }
  if (search) {
    search.placeholder = calendarText("calendar.search");
    if (search.value !== calendarUi.search) search.value = calendarUi.search;
  }
  if (searchLabel) searchLabel.textContent = calendarText("calendar.search");
  if (categoryLabel)
    categoryLabel.textContent = calendarText("calendar.category");
  calendarRenderTabs();
  calendarRenderCategories();
  calendarRenderMonthStrip();
  calendarRenderSummary();
  calendarRenderContent();

  if (options.scrollMonth) {
    requestAnimationFrame(() => {
      document
        .querySelector(`[data-calendar-month="${calendarUi.month}"]`)
        ?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
    });
  }
}

// Cambia la vista del calendario (progetto / tutto)
function setCalendarView(view) {
  if (view !== "project" && view !== "all") return;
  calendarUi.view = view;
  renderCalendarModal();
}

// Seleziona il mese attivo nel calendario
function setCalendarMonth(month) {
  calendarUi.month = calendarMonth(month);
  renderCalendarModal({ scrollMonth: true });
}

// Aggiorna il filtro di ricerca nel calendario
function setCalendarSearch(value) {
  calendarUi.search = String(value || "");
  calendarRenderContent();
}

// Aggiorna il filtro di categoria nel calendario
function setCalendarCategory(value) {
  calendarUi.category = value || "all";
  calendarRenderContent();
}

// Apertura e chiusura
function openCalendarModal() {
  calendarUi.month = state.mese;
  renderCalendarModal({ scrollMonth: true });
  const modal = document.getElementById("calendarModal");
  if (modal) {
    modal.hidden = false;
    document.body.classList.add("calendar-open");
  }
}

// Chiude calendar modal
function closeCalendarModal() {
  const modal = document.getElementById("calendarModal");
  if (modal) {
    modal.hidden = true;
    document.body.classList.remove("calendar-open");
  }
}
