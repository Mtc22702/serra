/* ==========================================================================
   TEMA CHIARO E SCURO
   --------------------------------------------------------------------------
   Determina il tema attivo, aggiorna i controlli accessibili e salva la scelta
   dell'utente. Se non esiste una preferenza, segue il tema del sistema operativo.
   ========================================================================== */
(function () {
  "use strict";

  /* RIFERIMENTI — pagina, colore del browser e preferenza del sistema. */
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  /* LETTURA — ricava il tema applicato all'elemento radice della pagina. */
  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  /* SINCRONIZZAZIONE — aggiorna pulsanti, ARIA e colore dell'interfaccia browser. */
  function syncControls() {
    const dark = currentTheme() === "dark";
    const ro = (root.lang || "it").toLowerCase().startsWith("ro");
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute(
        "aria-label",
        ro
          ? dark
            ? "Activează modul luminos"
            : "Activează modul întunecat"
          : dark
            ? "Attiva modalità chiara"
            : "Attiva modalità scura"
      );
      button.title = ro
        ? dark
          ? "Mod luminos"
          : "Mod întunecat"
        : dark
          ? "Modalità chiara"
          : "Modalità scura";
    });
    if (themeMeta) themeMeta.content = dark ? "#0b1814" : "#2f6b3a";
  }

  /* Applica il tema, lo salva opzionalmente e notifica il resto dell'app. */
  function setTheme(theme, persist) {
    root.dataset.theme = theme === "dark" ? "dark" : "light";
    if (persist) localStorage.setItem("serra-theme", root.dataset.theme);
    syncControls();
    window.dispatchEvent(
      new CustomEvent("serra:themechange", {
        detail: { theme: root.dataset.theme }
      })
    );
  }

  /* Evento clic: alterna il tema al tocco di qualsiasi pulsante toggle. */
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-toggle");
    if (!button) return;
    setTheme(currentTheme() === "dark" ? "light" : "dark", true);
  });

  /* Evento sistema: segue il tema OS solo se l'utente non ha scelto manualmente. */
  media.addEventListener?.("change", (event) => {
    if (!localStorage.getItem("serra-theme"))
      setTheme(event.matches ? "dark" : "light", false);
  });

  /* Inizializzazione: sincronizza i controlli e osserva i cambi di lingua. */
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", syncControls);
  else syncControls();
  new MutationObserver(syncControls).observe(root, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
