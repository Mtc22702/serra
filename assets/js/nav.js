// Navigazione mobile
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-menu-toggle");
  const menu = document.getElementById("mainNav");
  if (!header || !toggle || !menu) return;

  const isRo = () =>
    (document.documentElement.lang || "it").toLowerCase().startsWith("ro");

  const closeMenu = () => {
    document.body.classList.remove("nav-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", isRo() ? "Deschide meniul" : "Apri menu");
  };

  const openMenu = () => {
    document.body.classList.add("nav-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", isRo() ? "Închide meniul" : "Chiudi menu");
  };

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

  // Gestisce debounce
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 900) closeMenu();
    }, 150)
  );

  // Riallinea l'etichetta del bottone quando cambia la lingua della pagina
  new MutationObserver(() => {
    const open = document.body.classList.contains("nav-menu-open");
    toggle.setAttribute(
      "aria-label",
      isRo() ? (open ? "Închide meniul" : "Deschide meniul") : open ? "Chiudi menu" : "Apri menu"
    );
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
