// Aggiorna l'etichetta dei collegamenti alla guida quando cambia la lingua del documento.
(() => {
  // Etichette localizzate usate dai collegamenti che rimandano alla guida.
  const labels = {
    it: "Scopri come usare l'app",
    ro: "Descoperă cum se folosește aplicația"
  };
  // Applica l'etichetta corrispondente alla lingua italiana o romena attiva.
  function apply() {
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    document.querySelectorAll("[data-guide-link-label]").forEach((element) => {
      element.textContent = labels[lang];
    });
  }
  // Esegue l'aggiornamento iniziale e osserva le successive modifiche della lingua.
  apply();
  new MutationObserver(apply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
