/* =========================================================================
   SEZIONE 04B — Gestione dei progetti salvati
   -------------------------------------------------------------------------
   Aggiunge a serra.config.v1 più progetti, ciascuno con il proprio layout.
   CONFIG_KEY resta la configurazione di lavoro del progetto attivo, così
   il boot e le ~35 chiamate a saveConfig/readSavedConfig restano invariati.
   Lo store completo vive in localStorage["serra.projects.v1"].
   ========================================================================= */
const PROJECTS_KEY = "serra.projects.v1";

function readProjectsStore() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || "null");
  } catch {
    return null;
  }
}

function writeProjectsStore(store) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(store));
  } catch {
    // localStorage puo non essere disponibile in alcuni contesti incorporati.
  }
}

function genProjectId() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function projectsText(key, vars) {
  // tx() esiste (conf-text.js); fallback prudente se non disponibile.
  return typeof tx === "function" ? tx(key, vars) : key;
}

function projectsDefaultName(n) {
  return projectsText("projects.default_name", { n });
}

function escapeHtmlProjects(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]
  );
}

// Config di un progetto vuoto: serra di default, nessuna coltura, auto-plan off
// cosi' parte davvero vuota e l'utente la pianifica.
function defaultProjectConfig() {
  return {
    lang: state.lang,
    zona: "temperato",
    riscaldata: false,
    larghezza: 3,
    lunghezza: 5,
    path: 60,
    mese: new Date().getMonth() + 1,
    autoPlan: false,
    activePreset: "",
    livello: state.livello,
    beds: [],
    done: true
  };
}

// Crea lo store la prima volta: migra la config esistente come "Progetto 1".
function ensureProjectsStore() {
  let store = readProjectsStore();
  if (store && Array.isArray(store.projects) && store.projects.length) {
    if (!store.projects.some((p) => p.id === store.activeId)) {
      store.activeId = store.projects[0].id;
      writeProjectsStore(store);
    }
    return store;
  }
  const existing = readSavedConfig(); // CONFIG_KEY attuale (puo essere null)
  const id = genProjectId();
  const now = Date.now();
  store = {
    activeId: id,
    projects: [
      {
        id,
        name: projectsDefaultName(1),
        createdAt: now,
        updatedAt: now,
        config: existing || null
      }
    ]
  };
  writeProjectsStore(store);
  return store;
}

function getActiveProject(store) {
  store = store || ensureProjectsStore();
  return (
    store.projects.find((p) => p.id === store.activeId) || store.projects[0]
  );
}

// Chiamata da saveConfig (conf-state.js): allinea il progetto attivo alla
// config di lavoro corrente, senza toccare il resto della lista.
function syncActiveProjectConfig(payload) {
  const store = readProjectsStore();
  if (!store || !Array.isArray(store.projects)) return;
  const active = store.projects.find((p) => p.id === store.activeId);
  if (!active) return;
  active.config = payload;
  active.updatedAt = Date.now();
  writeProjectsStore(store);
}

// Carica un progetto come config di lavoro corrente e aggiorna tutta la UI.
function switchToProject(id) {
  const store = ensureProjectsStore();
  const target = store.projects.find((p) => p.id === id);
  if (!target) return;
  store.activeId = id;
  writeProjectsStore(store);
  const cfg = target.config || defaultProjectConfig();
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch {
    /* no-op */
  }
  applyConfigToState(cfg);
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  render();
  renderProjectsModal();
}

function createProject() {
  saveConfig(true); // fissa lo stato del progetto attivo prima di cambiarlo
  const store = ensureProjectsStore();
  const id = genProjectId();
  const now = Date.now();
  const n = store.projects.length + 1;
  store.projects.push({
    id,
    name: projectsDefaultName(n),
    createdAt: now,
    updatedAt: now,
    config: defaultProjectConfig()
  });
  writeProjectsStore(store);
  switchToProject(id);
}

function duplicateProject(id) {
  saveConfig(true);
  const store = ensureProjectsStore();
  const src = store.projects.find((p) => p.id === id);
  if (!src) return;
  const now = Date.now();
  store.projects.push({
    id: genProjectId(),
    name: (src.name + " " + projectsText("projects.copy_suffix")).slice(0, 60),
    createdAt: now,
    updatedAt: now,
    config: src.config
      ? JSON.parse(JSON.stringify(src.config))
      : defaultProjectConfig()
  });
  writeProjectsStore(store);
  renderProjectsModal();
}

function renameProject(id) {
  const store = ensureProjectsStore();
  const p = store.projects.find((x) => x.id === id);
  if (!p) return;
  const name = window.prompt(projectsText("projects.rename_prompt"), p.name);
  if (name == null) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  p.name = trimmed.slice(0, 60);
  p.updatedAt = Date.now();
  writeProjectsStore(store);
  renderProjectsModal();
}

function deleteProject(id) {
  const store = ensureProjectsStore();
  if (store.projects.length <= 1) {
    window.alert(projectsText("projects.cannot_delete_last"));
    return;
  }
  if (!window.confirm(projectsText("projects.delete_confirm"))) return;
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx < 0) return;
  const wasActive = store.activeId === id;
  store.projects.splice(idx, 1);
  if (wasActive) store.activeId = store.projects[0].id;
  writeProjectsStore(store);
  if (wasActive) switchToProject(store.activeId);
  else renderProjectsModal();
}

/* PANNELLO PROGETTI — apre la finestra e rende disponibili creazione,
   duplicazione, rinomina, selezione ed eliminazione dei progetti salvati. */

function openProjectsModal() {
  ensureProjectsStore();
  renderProjectsModal();
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = false;
    document.body.classList.add("projects-open");
  }
}

function closeProjectsModal() {
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = true;
    document.body.classList.remove("projects-open");
  }
}

function renderProjectsModal() {
  const list = document.getElementById("projectsList");
  if (!list) return;
  const store = ensureProjectsStore();
  const fmtDate = (ts) => {
    try {
      return new Date(ts).toLocaleDateString(
        state.lang === "ro" ? "ro-RO" : "it-IT",
        { day: "2-digit", month: "short", year: "numeric" }
      );
    } catch {
      return "";
    }
  };
  list.innerHTML = store.projects
    .map((p) => {
      const active = p.id === store.activeId;
      const count = p.config?.beds?.length || 0;
      return `<li class="projects-item${active ? " is-active" : ""}">
        <button type="button" class="projects-open-btn" onclick="switchToProject('${p.id}')">
          <span class="projects-item-name">${escapeHtmlProjects(p.name)}${
            active
              ? ` <span class="projects-badge">${projectsText("projects.active")}</span>`
              : ""
          }</span>
          <small class="projects-item-meta">${projectsText(
            "projects.varieties",
            {
              n: count
            }
          )} · ${fmtDate(p.updatedAt)}</small>
        </button>
        <span class="projects-item-actions">
          <button type="button" class="projects-act" title="${projectsText(
            "projects.rename"
          )}" aria-label="${projectsText("projects.rename")}" onclick="renameProject('${p.id}')">✎</button>
          <button type="button" class="projects-act" title="${projectsText(
            "projects.duplicate"
          )}" aria-label="${projectsText("projects.duplicate")}" onclick="duplicateProject('${p.id}')">⧉</button>
          <button type="button" class="projects-act projects-act--danger" title="${projectsText(
            "projects.delete"
          )}" aria-label="${projectsText("projects.delete")}" onclick="deleteProject('${p.id}')">🗑</button>
        </span>
      </li>`;
    })
    .join("");
}
