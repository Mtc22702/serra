// Gestisce apertura, chiusura e accessibilità del menu di navigazione mobile.
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-menu-toggle");
  const menu = document.getElementById("mainNav");
  if (!header || !toggle || !menu) return;

  const isRo = () =>
    (document.documentElement.lang || "it").toLowerCase().startsWith("ro");

  // Blocca lo scorrimento della pagina mentre un pannello mobile è aperto.
  let lockedScrollY = 0;

  const closeMenu = () => {
    const wasOpen = document.body.classList.contains("nav-menu-open");
    document.body.classList.remove("nav-menu-open");
    if (wasOpen) {
      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);
    }
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", isRo() ? "Deschide meniul" : "Apri menu");
  };

  const openMenu = () => {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add("nav-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute(
      "aria-label",
      isRo() ? "Închide meniul" : "Chiudi menu"
    );
  };

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-menu-open")) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-placeholder-link]");
    if (link) event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("nav-menu-open")) return;
    if (header.contains(event.target)) return;
    closeMenu();
  });

  // Riduce le esecuzioni ripetute durante il ridimensionamento della finestra.
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

  // Aggiorna l'etichetta del pulsante menu quando cambia la lingua della pagina.
  new MutationObserver(() => {
    const open = document.body.classList.contains("nav-menu-open");
    toggle.setAttribute(
      "aria-label",
      isRo()
        ? open
          ? "Închide meniul"
          : "Deschide meniul"
        : open
          ? "Chiudi menu"
          : "Apri menu"
    );
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
