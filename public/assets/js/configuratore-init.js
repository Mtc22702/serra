(function() {
  if (new URLSearchParams(window.location.search).get("livello") === "novizio") {
    const panel = document.getElementById("panelSettings");
    if (panel) panel.classList.add("is-collapsed");
  }
})();
