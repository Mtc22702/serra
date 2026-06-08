/* Menu mobile condiviso: apre/chiude la navigazione e sincronizza ARIA. */
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-menu-toggle");
  const menu = document.getElementById("mainNav");
  if (!header || !toggle || !menu) return;

  /* Stato menu: classe sul body e attributi accessibili del pulsante. */
  const closeMenu = () => {
    document.body.classList.remove("nav-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri menu");
  };

  const openMenu = () => {
    document.body.classList.add("nav-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Chiudi menu");
  };

  /* Chiusure rapide: link, Escape, click esterno e ritorno desktop. */
  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-menu-open")) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("nav-menu-open")) return;
    if (header.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
