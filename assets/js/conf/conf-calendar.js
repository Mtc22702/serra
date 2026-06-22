/* =========================================================================
   SEZIONE 11B — Calendario di manutenzione
   -------------------------------------------------------------------------
   Genera un piano annuale delle attività di semina e raccolta a partire dalle
   colture presenti nel progetto attivo, usando i dati già disponibili:
     - p.mesi : mesi di semina (1-12)
     - p.gg   : giorni medi alla raccolta
   Nessun dato nuovo richiesto. Vista mensile con evidenza del mese corrente.
   ========================================================================= */

function calendarText(key, vars) {
  return typeof tx === "function" ? tx(key, vars) : key;
}

/* TEMPI DI RACCOLTA — converte i giorni medi in mesi di calendario. */
function monthsToHarvest(gg) {
  const days = Number(gg) || 30;
  return Math.max(1, Math.round(days / 30));
}

/* PIANO ANNUALE — distribuisce le attività del progetto nei dodici mesi. */
function buildCalendarMonths() {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    semina: [],
    raccolta: []
  }));
  const seen = new Set();
  state.beds.forEach((bed) => {
    const p = BYID[bed.plantId];
    if (!p) return;
    const sowMonths = Array.isArray(p.mesi) && p.mesi.length ? p.mesi : [];
    const mth = monthsToHarvest(p.gg);
    sowMonths.forEach((m) => {
      if (m < 1 || m > 12) return;
      const semKey = `s|${p.id}|${m}`;
      if (!seen.has(semKey)) {
        seen.add(semKey);
        months[m - 1].semina.push(p);
      }
      const hm = ((m - 1 + mth) % 12) + 1;
      const harKey = `h|${p.id}|${hm}`;
      if (!seen.has(harKey)) {
        seen.add(harKey);
        months[hm - 1].raccolta.push(p);
      }
    });
  });
  return months;
}

function calendarTaskChips(plants, kind) {
  if (!plants.length) return "";
  const icon = kind === "semina" ? "🌱" : "🧺";
  const label =
    kind === "semina"
      ? calendarText("calendar.sow")
      : calendarText("calendar.harvest");
  const chips = plants
    .map(
      (p) =>
        `<span class="cal-chip cal-chip--${kind}">${escapeHtmlProjects(
          plantText(p, "nome")
        )}</span>`
    )
    .join("");
  return `<div class="cal-task">
      <div class="cal-task-label"><span aria-hidden="true">${icon}</span> ${label}</div>
      <div class="cal-chips">${chips}</div>
    </div>`;
}

function renderCalendarModal() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;
  const subtitle = document.getElementById("calendarSubtitle");
  if (subtitle) {
    const activeName =
      typeof getActiveProject === "function"
        ? getActiveProject().name
        : "";
    subtitle.textContent = activeName;
  }
  if (!state.beds.length) {
    grid.innerHTML = `<p class="cal-empty">${calendarText(
      "calendar.empty"
    )}</p>`;
    return;
  }
  const months = buildCalendarMonths();
  grid.innerHTML = months
    .map((mb) => {
      const isNow = mb.month === state.mese;
      const total = mb.semina.length + mb.raccolta.length;
      const body =
        total === 0
          ? `<p class="cal-month-empty">—</p>`
          : calendarTaskChips(mb.semina, "semina") +
            calendarTaskChips(mb.raccolta, "raccolta");
      return `<div class="cal-month${isNow ? " is-now" : ""}">
        <div class="cal-month-head">
          <span class="cal-month-name">${monthName(mb.month)}</span>
          ${
            isNow
              ? `<span class="cal-now-badge">${calendarText(
                  "calendar.this_month"
                )}</span>`
              : ""
          }
        </div>
        <div class="cal-month-body">${body}</div>
      </div>`;
    })
    .join("");
}

function openCalendarModal() {
  renderCalendarModal();
  const m = document.getElementById("calendarModal");
  if (m) {
    m.hidden = false;
    document.body.classList.add("calendar-open");
  }
}

function closeCalendarModal() {
  const m = document.getElementById("calendarModal");
  if (m) {
    m.hidden = true;
    document.body.classList.remove("calendar-open");
  }
}
