// Utility condivisa per l'escape dei caratteri HTML speciali.
// Prima di questa modifica la stessa logica esisteva in 3 copie identiche
// rinominate apposta per evitare collisioni tra script (escapeHtml in
// home-app.js, escapeHtmlProjects in conf-projects.js, escapeHtmlAccount
// in account.js). Ora tutte e tre delegano a questa unica implementazione.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
}
