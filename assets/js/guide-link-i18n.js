(() => {
  const labels = { it: "Scopri come usare l'app", ro: "Descoperă cum se folosește aplicația" };
  function apply() {
    const lang = document.documentElement.lang === "ro" ? "ro" : "it";
    document.querySelectorAll("[data-guide-link-label]").forEach((element) => {
      element.textContent = labels[lang];
    });
  }
  apply();
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
