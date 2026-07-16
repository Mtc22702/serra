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

  // Separa l'icona iniziale dall'etichetta nelle voci "Esplora" del menu, cosi'
  // il CSS puo' dare all'icona un trattamento a riquadro coerente col resto
  // dell'app (senza toccare i dizionari di traduzione ne' i link del footer,
  // che restano fuori da #mainNav). La funzione e' idempotente: puo' essere
  // rieseguita ogni volta che il cambio lingua riscrive il testo dei link.
  function splitIconLabel(raw) {
    const trimmed = raw.trim();
    const spaceIndex = trimmed.indexOf(" ");
    if (spaceIndex <= 0) return null;
    return {
      icon: trimmed.slice(0, spaceIndex),
      label: trimmed.slice(spaceIndex + 1)
    };
  }

  function enhanceNavIcons() {
    menu.querySelectorAll(":scope > a.nav-link").forEach((link) => {
      // Se è già stato diviso in icona+etichetta e nessuno l'ha riscritto nel
      // frattempo (il cambio lingua sostituisce sempre l'intero testo,
      // svuotando questi span), non rielaborarlo: leggere di nuovo il testo
      // da due span già separati (senza lo spazio originale) spezzerebbe la
      // divisione in un punto sbagliato.
      const alreadySplit =
        link.children.length === 2 &&
        link.children[0].classList.contains("nav-link-icon") &&
        link.children[1].classList.contains("nav-link-label");
      if (alreadySplit) return;

      const parts = splitIconLabel(link.textContent);
      if (!parts) return;
      link.textContent = "";
      const iconSpan = document.createElement("span");
      iconSpan.className = "nav-link-icon";
      iconSpan.setAttribute("aria-hidden", "true");
      iconSpan.textContent = parts.icon;
      const labelSpan = document.createElement("span");
      labelSpan.className = "nav-link-label";
      labelSpan.textContent = parts.label;
      link.append(iconSpan, labelSpan);
    });
  }

  enhanceNavIcons();

  // Ripete la separazione ogni volta che il cambio lingua riscrive il testo
  // (si disconnette durante la propria modifica per evitare un loop).
  const navIconObserver = new MutationObserver(() => {
    navIconObserver.disconnect();
    enhanceNavIcons();
    navIconObserver.observe(menu, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
  navIconObserver.observe(menu, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
