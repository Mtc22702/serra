/**
 * Conferma ordine: recupera il riepilogo temporaneo, lo localizza e lo rende.
 * Legge i dati dalla sessione senza modificare il carrello o lo stato ordini;
 * base.js fornisce tema, API e strumenti condivisi della pagina.
 */

// Pagina di conferma ordine: riepilogo immediato, lingua e recupero dati.
(() => {
  "use strict";

  const SESSION_KEY = "ois.order_confirmation";
  const translations = {
    it: {
      page_title: "Ordine confermato · Orto in Serra",
      brand_sub: "Coltiva con un piano",
      theme_dark: "Attiva modalità scura",
      theme_light: "Attiva modalità chiara",
      eyebrow: "Ordine ricevuto",
      title: "Grazie, il tuo orto può iniziare.",
      lead: "Abbiamo ricevuto il tuo ordine e lo stiamo preparando con cura. Troverai aggiornamenti, ricevuta e manuali di coltivazione nella tua area personale.",
      order_number: "Numero ordine",
      account_cta: "Vai alla tua area personale",
      catalog_cta: "Torna al catalogo",
      summary_title: "Riepilogo ordine",
      status: "In elaborazione",
      date: "Data",
      articles: "Articoli",
      item_one: "1 articolo",
      item_many: "{count} articoli",
      quantity: "Qtà {count}",
      extra_items: "+ altri {count}",
      total: "Totale",
      next_title: "Cosa succede adesso?",
      next_text:
        "Puoi seguire l’ordine dalla tua area personale. Quando sarà disponibile, troverai anche il manuale personalizzato con indicazioni per semina, trapianto e cura delle piante acquistate.",
      footer: "Orto in Serra · Dalla pianificazione al raccolto",
      generic_id: "Confermato",
      no_items: "Il riepilogo completo è disponibile nella tua area personale."
    },
    ro: {
      page_title: "Comandă confirmată · Orto in Serra",
      brand_sub: "Cultivă după un plan",
      theme_dark: "Activează modul întunecat",
      theme_light: "Activează modul luminos",
      eyebrow: "Comandă primită",
      title: "Îți mulțumim, grădina ta poate începe.",
      lead: "Am primit comanda și o pregătim cu grijă. În contul tău vei găsi actualizările, chitanța și ghidurile de cultivare.",
      order_number: "Numărul comenzii",
      account_cta: "Mergi în contul personal",
      catalog_cta: "Înapoi la catalog",
      summary_title: "Rezumatul comenzii",
      status: "În procesare",
      date: "Data",
      articles: "Produse",
      item_one: "1 produs",
      item_many: "{count} produse",
      quantity: "Cant. {count}",
      extra_items: "+ încă {count}",
      total: "Total",
      next_title: "Ce urmează?",
      next_text:
        "Poți urmări comanda din contul personal. Când va fi disponibil, vei găsi și ghidul personalizat pentru semănarea, transplantarea și îngrijirea plantelor cumpărate.",
      footer: "Orto in Serra · De la planificare la recoltă",
      generic_id: "Confirmată",
      no_items: "Rezumatul complet este disponibil în contul tău personal."
    }
  };

  let lang = normalizeLang(localStorage.getItem("ois.lang"));
  let order = readSessionOrder();

  function normalizeLang(value) {
    return value === "ro" ? "ro" : "it";
  }

  function tr(key, params = {}) {
    let value = translations[lang][key] || translations.it[key] || key;
    Object.entries(params).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
  }

  function readSessionOrder() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    } catch (error) {
      return null;
    }
  }

  function requestedOrderId() {
    return new URLSearchParams(window.location.search).get("order") || "";
  }

  function formatMoney(value) {
    return new Intl.NumberFormat(lang === "ro" ? "ro-RO" : "it-IT", {
      style: "currency",
      currency: "EUR"
    }).format(Number(value) || 0);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat(lang === "ro" ? "ro-RO" : "it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function itemCount(items) {
    return (items || []).reduce(
      (total, item) => total + Math.max(0, Number(item.bustine) || 0),
      0
    );
  }

  function applyLanguage(nextLang, persist = false) {
    lang = normalizeLang(nextLang);
    if (persist) localStorage.setItem("ois.lang", lang);
    document.documentElement.lang = lang;
    document.title = tr("page_title");

    document.querySelectorAll("[data-confirm-i18n]").forEach((element) => {
      element.textContent = tr(element.dataset.confirmI18n);
    });
    document
      .querySelectorAll('[data-confirm-action="set-language"]')
      .forEach((button) => {
        const active = button.dataset.lang === lang;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    syncThemeLabel();
    renderOrder();
  }

  function syncThemeLabel() {
    const button = document.querySelector(".confirmation-theme");
    if (!button) return;
    const dark = document.documentElement.dataset.theme === "dark";
    const label = tr(dark ? "theme_light" : "theme_dark");
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function renderOrder() {
    const id = order?.id || requestedOrderId() || tr("generic_id");
    const items = Array.isArray(order?.items) ? order.items : [];
    const count = itemCount(items);
    const list = document.getElementById("confirmationItems");

    document.getElementById("confirmationOrderId").textContent = id;
    document.getElementById("confirmationDate").textContent = order?.date
      ? formatDate(order.date)
      : "—";
    document.getElementById("confirmationItemCount").textContent =
      count === 1 ? tr("item_one") : tr("item_many", { count });
    document.getElementById("confirmationTotal").textContent = order
      ? formatMoney(order.total)
      : "—";

    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("li");
      empty.className = "confirmation-item confirmation-item--empty";
      empty.textContent = tr("no_items");
      list.append(empty);
    } else {
      items.slice(0, 4).forEach((item) => {
        const row = document.createElement("li");
        row.className = "confirmation-item";
        const name = document.createElement("span");
        name.className = "confirmation-item-name";
        name.textContent = item.nome || item.name || item.id || "—";
        const quantity = document.createElement("span");
        quantity.className = "confirmation-item-qty";
        quantity.textContent = tr("quantity", { count: item.bustine || 1 });
        row.append(name, quantity);
        list.append(row);
      });
      if (items.length > 4) {
        const more = document.createElement("li");
        more.className = "confirmation-item confirmation-item--more";
        more.textContent = tr("extra_items", { count: items.length - 4 });
        list.append(more);
      }
    }

    document.body.classList.remove("confirmation-loading");
  }

  async function recoverOrder() {
    const wantedId = requestedOrderId();
    if (order?.id && (!wantedId || order.id === wantedId)) return;
    if (!wantedId || !window.SerraAPI) return;
    try {
      const orders = await window.SerraAPI.getOrders();
      const currentUser = window.SerraAPI.getCurrentUser();
      const found = (orders || []).find(
        (candidate) =>
          candidate.id === wantedId &&
          (!currentUser || candidate.email === currentUser.email)
      );
      if (found) {
        order = found;
        renderOrder();
      }
    } catch (error) {
      // La conferma generica resta pienamente utilizzabile se il recupero fallisce.
    }
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest(
      '[data-confirm-action="set-language"]'
    );
    if (languageButton) applyLanguage(languageButton.dataset.lang, true);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "ois.lang") applyLanguage(event.newValue, false);
  });
  window.addEventListener("serra:themechange", syncThemeLabel);

  applyLanguage(lang, false);
  recoverOrder();
})();
