// Gestione tema
(function () {
  "use strict";

  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Legge il tema corrente
  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  // Allinea controls
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

  // Imposta theme
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

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-toggle");
    if (!button) return;
    setTheme(currentTheme() === "dark" ? "light" : "dark", true);
  });

  media.addEventListener?.("change", (event) => {
    if (!localStorage.getItem("serra-theme"))
      setTheme(event.matches ? "dark" : "light", false);
  });

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", syncControls);
  else syncControls();
  new MutationObserver(syncControls).observe(root, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
