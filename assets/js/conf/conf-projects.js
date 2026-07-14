// Store progetti
const PROJECTS_KEY = "serra.projects.v1";

// Legge lo store progetti dal localStorage
function readProjectsStore() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || "null");
  } catch {
    return null;
  }
}

// Persiste lo store progetti nel localStorage
function writeProjectsStore(store) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(store));
  } catch {}
}

// Genera un ID univoco per un nuovo progetto
function genProjectId() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Recupera una stringa tradotta per i progetti
function projectsText(key, vars) {
  return typeof tx === "function" ? tx(key, vars) : key;
}

// Genera il nome predefinito per il progetto numero n
function projectsDefaultName(n) {
  return projectsText("projects.default_name", { n });
}

// Delega all'unica implementazione condivisa: vedi assets/js/shared/escape-html.js
function escapeHtmlProjects(s) {
  return window.escapeHtml(s);
}

// Restituisce la configurazione di default per un nuovo progetto
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

// Gestione store
function ensureProjectsStore() {
  let store = readProjectsStore();
  if (store && Array.isArray(store.projects) && store.projects.length) {
    if (!store.projects.some((p) => p.id === store.activeId)) {
      store.activeId = store.projects[0].id;
      writeProjectsStore(store);
    }
    return store;
  }
  const existing = readSavedConfig();
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

// Restituisce il progetto attivo dallo store
function getActiveProject(store) {
  store = store || ensureProjectsStore();
  return (
    store.projects.find((p) => p.id === store.activeId) || store.projects[0]
  );
}

// Sincronizza la configurazione del progetto attivo
function syncActiveProjectConfig(payload) {
  const store = readProjectsStore();
  if (!store || !Array.isArray(store.projects)) return;
  const active = store.projects.find((p) => p.id === store.activeId);
  if (!active) return;
  active.config = payload;
  active.updatedAt = Date.now();
  writeProjectsStore(store);
}

// Operazioni progetto
// Attiva il progetto selezionato e ricarica la configurazione
function switchToProject(id) {
  const store = ensureProjectsStore();
  const target = store.projects.find((p) => p.id === id);
  if (!target) return;
  store.activeId = id;
  writeProjectsStore(store);
  const cfg = target.config || defaultProjectConfig();
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch {}
  applyConfigToState(cfg);
  applyLanguage();
  syncSizeControls();
  syncClimateControls();
  render();
  renderProjectsModal();
}

// Crea un nuovo progetto vuoto e lo attiva
function createProject() {
  saveConfig(true);
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

// Crea una copia del progetto specificato
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

// Rinomina il progetto tramite prompt utente
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

// Elimina il progetto dopo conferma utente
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

// Modale progetti
// Apre la modale di gestione progetti
function openProjectsModal() {
  ensureProjectsStore();
  renderProjectsModal();
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = false;
    document.body.classList.add("projects-open");
  }
}

// Chiude la modale di gestione progetti
function closeProjectsModal() {
  const m = document.getElementById("projectsModal");
  if (m) {
    m.hidden = true;
    document.body.classList.remove("projects-open");
  }
}

// Genera l'HTML della lista progetti nella modale
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
