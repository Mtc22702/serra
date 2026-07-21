// Gestisce autenticazione, cruscotti e azioni dell'area riservata per utenti e amministratori.
(function () {
  let currentUser = null;
  let allUsers = [];
  let allOrders = [];
  let allPlants = [];
  let currentLang = "it";
  let lastDbActive = null;
  let editingOrderId = null;
  let editingOrderItems = [];

  // Dizionario dell'area personale condiviso.
  const ACCOUNT_I18N = window.SERRA_I18N?.account || { it: {}, ro: {} };

  function tAcc(key, vars = {}) {
    const dict = ACCOUNT_I18N[currentLang] || ACCOUNT_I18N.it;
    let val = dict[key] || ACCOUNT_I18N.it[key] || key;
    Object.entries(vars).forEach(([k, replacement]) => {
      val = val.replaceAll(`{${k}}`, replacement);
    });
    return val;
  }

  function locale() {
    return currentLang === "ro" ? "ro-RO" : "it-IT";
  }

  function formatDate(value) {
    return new Date(value).toLocaleDateString(locale(), {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  const STATUS_KEY = {
    "In elaborazione": "status.processing",
    Spedito: "status.shipped",
    Completato: "status.completed",
    Annullato: "status.cancelled"
  };

  const CATEGORY_KEY = {
    foglia: "category.leaf",
    frutto: "category.fruit",
    radice: "category.root",
    aromatica: "category.aromatic",
    legume: "category.legume"
  };

  function statusLabel(status) {
    return tAcc(STATUS_KEY[status] || status);
  }

  function categoryLabel(category) {
    return tAcc(CATEGORY_KEY[category] || category || "category.leaf");
  }

  function plantLabel(plantOrItem) {
    if (!plantOrItem) return "";
    if (currentLang === "ro") {
      const roName = window.SERRA_I18N?.plants?.ro?.[plantOrItem.id]?.nome;
      if (roName) return roName;
    }
    return plantOrItem.nome || plantOrItem.id || "";
  }

  function renderDatabaseStatus(active) {
    const indicator = document.getElementById("dbStatusIndicator");
    const statusText = document.getElementById("dbStatusText");
    const adminServerDetails = document.getElementById("adminServerDetails");

    if (active) {
      if (indicator) indicator.className = "db-status-bar online";
      if (statusText) statusText.innerHTML = tAcc("db.online");
      if (adminServerDetails)
        adminServerDetails.innerHTML = tAcc("db.online_details");
    } else {
      if (indicator) indicator.className = "db-status-bar offline";
      if (statusText) statusText.innerHTML = tAcc("db.offline");
      if (adminServerDetails)
        adminServerDetails.innerHTML = tAcc("db.offline_details");
    }
  }

  function getCartCount() {
    try {
      const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
      return Array.isArray(raw) ? raw.length : 0;
    } catch (_) {
      return 0;
    }
  }

  function updateAccountCartCount() {
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = String(getCartCount());
  }

  window.openCart = function () {
    window.location.href = "index.html?from=configuratore";
  };

  window.setLang = function (lang) {
    currentLang = lang === "ro" || lang === "it" ? lang : "it";
    localStorage.setItem("ois.lang", currentLang);
    applyAccountLanguage();
  };

  function applyAccountLanguage() {
    document.documentElement.lang = currentLang;
    document.title = tAcc("page.title");

    const sel = document.getElementById("langSelect");
    if (sel) sel.value = currentLang;

    document.querySelectorAll("[data-i18n-acc]").forEach((el) => {
      const key = el.getAttribute("data-i18n-acc");
      const val = tAcc(key);
      if (val.includes("<") || val.includes("&")) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-i18n-acc-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-acc-placeholder");
      el.setAttribute("placeholder", tAcc(key));
    });

    document.querySelectorAll("[data-i18n-acc-aria]").forEach((el) => {
      el.setAttribute(
        "aria-label",
        tAcc(el.getAttribute("data-i18n-acc-aria"))
      );
    });

    document.querySelectorAll("[data-i18n-acc-title]").forEach((el) => {
      el.setAttribute("title", tAcc(el.getAttribute("data-i18n-acc-title")));
    });

    updateAccountSelectLabels();
    updateAccountCartCount();

    if (lastDbActive !== null) renderDatabaseStatus(lastDbActive);

    // Aggiorna le viste dinamiche se l'utente è loggato
    if (currentUser) {
      if (currentUser.role === "admin") {
        renderAdminDashboard();
      } else {
        renderUserDashboard();
      }
    }
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const nextLang =
      event.newValue === "ro" || event.newValue === "it"
        ? event.newValue
        : "it";
    if (nextLang === currentLang) return;
    currentLang = nextLang;
    applyAccountLanguage();
  });

  // --- INIZIALIZZAZIONE ---
  function bindAccountEvents() {
    document.addEventListener("click", (event) => {
      const control = event.target.closest("[data-account-action]");
      if (!control) return;

      switch (control.dataset.accountAction) {
        case "set-language":
          // I pulsanti IT/RO sono usati nel menu mobile; il select desktop
          // resta gestito dall'evento `change` qui sotto.
          if (control.tagName !== "SELECT")
            window.setLang(control.dataset.lang);
          break;
        case "open-cart":
          window.openCart();
          break;
        case "switch-auth-tab":
          window.switchAuthTab(control.dataset.tab);
          break;
        case "dismiss-notifications":
          window.handleDismissNotifications();
          break;
        case "logout":
          window.SerraAPI.logout();
          break;
        case "switch-admin-tab":
          window.switchAdminTab(control.dataset.tab);
          break;
        case "open-plant-modal":
          window.openPlantModal(control.dataset.mode);
          break;
        case "reset-catalog":
          window.resetCatalogToDefault();
          break;
        case "export-database":
          window.exportDatabaseJson();
          break;
        case "clear-orders":
          window.handleClearOrders();
          break;
        case "clear-users":
          window.handleClearUsers();
          break;
        case "close-plant-modal":
          window.closePlantModal();
          break;
        case "open-user-project":
          window.openUserProject(control.dataset.projectId);
          break;
        case "print-invoice":
          window.printInvoice(control.dataset.orderId);
          break;
        case "download-plant-manual":
          window.downloadOrderPlantManual(control.dataset.orderId, control);
          break;
        case "edit-order":
          window.openOrderEditModal(control.dataset.orderId);
          break;
        case "cancel-order":
          window.cancelUserOrder(control.dataset.orderId);
          break;
        case "close-order-edit":
          window.closeOrderEditModal();
          break;
        case "order-edit-step":
          window.stepOrderEditQuantity(
            Number(control.dataset.itemIndex),
            Number(control.dataset.delta)
          );
          break;
        case "order-edit-remove":
          window.removeOrderEditItem(Number(control.dataset.itemIndex));
          break;
        case "edit-plant":
          window.openPlantModal("edit", control.dataset.plantId);
          break;
        case "delete-plant":
          window.handleDeletePlant(control.dataset.plantId);
          break;
        case "delete-order":
          window.handleDeleteOrder(control.dataset.orderId);
          break;
        case "delete-user":
          window.handleDeleteUser(control.dataset.email);
          break;
      }
    });
    document.addEventListener("input", (event) => {
      const control = event.target.closest(
        '[data-account-action="filter-plants"]'
      );
      if (control) window.filterAdminPlants();
      const orderQuantity = event.target.closest("[data-order-edit-quantity]");
      if (orderQuantity) {
        window.setOrderEditQuantity(
          Number(orderQuantity.dataset.itemIndex),
          Number(orderQuantity.value)
        );
      }
    });
    document.addEventListener("change", (event) => {
      const control = event.target.closest(
        '[data-account-action="set-language"]'
      );
      if (control) window.setLang(control.value);
      if (
        event.target.id === "profAccountType" ||
        event.target.id === "profShippingSame"
      ) {
        syncProfileFieldVisibility();
      }
      const orderStatus = event.target.closest(
        '[data-account-action="set-order-status"]'
      );
      if (orderStatus)
        window.handleToggleOrderStatus(
          orderStatus.dataset.orderId,
          orderStatus.value
        );
    });
    document.addEventListener("submit", (event) => {
      const form = event.target.closest("[data-account-form]");
      if (!form) return;

      const handlers = {
        login: window.handleLogin,
        register: window.handleRegister,
        "update-profile": window.handleUpdateProfile,
        "update-order": window.handleOrderUpdate,
        "save-plant": window.handleSavePlant
      };
      handlers[form.dataset.accountForm]?.(event);
    });
  }

  async function initAccount() {
    // Inizializza la lingua prima di qualunque testo renderizzato via JS
    const savedLang = localStorage.getItem("ois.lang");
    currentLang = savedLang === "ro" || savedLang === "it" ? savedLang : "it";

    // 1. Rileva connessione al Database Locale
    await checkDatabaseStatus();

    // 2. Carica i dati iniziali dall'API
    allUsers = await window.SerraAPI.getUsers();
    allOrders = await window.SerraAPI.getOrders();
    // Prendi le piante caricate dall'API (se nulle, usa PLANTS di plants-data.js)
    allPlants = (await window.SerraAPI.getPlants()) || window.PLANTS || [];

    // 3. Controlla se c'è un utente loggato
    currentUser = window.SerraAPI.getCurrentUser();

    // 4. Applica lingua ed aggiorna la vista
    applyAccountLanguage();
    renderView();

    // 5. Registra eventi per la foto reale nel modale
    document
      .getElementById("editPlantFoto")
      ?.addEventListener("input", function () {
        updateModalPhotoPreview(
          this.value,
          document.getElementById("editPlantId").value
        );
      });
    document
      .getElementById("editPlantId")
      ?.addEventListener("input", function () {
        const fotoVal = document.getElementById("editPlantFoto").value;
        if (!fotoVal) {
          updateModalPhotoPreview("", this.value);
        }
      });

    // 6. Rendi infinita la striscia degli ortaggi nel footer duplicando gli elementi
    const footerRow = document.getElementById("footerPlantRow");
    if (footerRow) {
      const html = footerRow.innerHTML;
      footerRow.innerHTML = html + html + html + html;
    }
  }

  bindAccountEvents();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccount);
  } else {
    initAccount();
  }

  // Mostra se la pagina usa il server locale oppure i dati statici pubblicati.
  async function checkDatabaseStatus() {
    lastDbActive = await window.SerraAPI.isServerActive();
    renderDatabaseStatus(lastDbActive);
  }

  function updateAccountSelectLabels() {
    const categorySelect = document.getElementById("editPlantCategory");
    if (categorySelect) {
      Array.from(categorySelect.options).forEach((opt) => {
        opt.textContent = categoryLabel(opt.value);
      });
    }

    const monthSelect = document.getElementById("editPlantMonths");
    const months =
      window.SERRA_I18N?.months?.[currentLang] || window.SERRA_I18N?.months?.it;
    if (monthSelect && months) {
      Array.from(monthSelect.options).forEach((opt) => {
        const monthIndex = parseInt(opt.value, 10) - 1;
        opt.textContent = months[monthIndex] || opt.textContent;
      });
    }
  }

  // --- VIEW ROUTER ---
  function renderView() {
    const authSec = document.getElementById("authSection");
    const userDash = document.getElementById("userDashboardSection");
    const adminDash = document.getElementById("adminDashboardSection");

    // Nascondi tutto inizialmente
    authSec.hidden = true;
    userDash.hidden = true;
    adminDash.hidden = true;

    // Aggiorna il bottone utente in navbar
    if (window.SerraAPI.updateNavbarUser) {
      window.SerraAPI.updateNavbarUser();
    }

    if (!currentUser) {
      authSec.hidden = false;
    } else if (currentUser.role === "admin") {
      adminDash.hidden = false;
      renderAdminDashboard();
    } else {
      userDash.hidden = false;
      renderUserDashboard();
    }
  }

  // --- INTERFACCIA UTENTE NORMALE ---
  function localizedNotificationMessage(notification) {
    const storedMessage = String(notification?.message || "");
    const orderId =
      notification?.orderId || storedMessage.match(/ORD-[A-Z0-9-]+/i)?.[0];
    const order = orderId
      ? allOrders.find((entry) => entry.id === orderId)
      : null;
    if (!order) return storedMessage;
    const tracking = order.tracking
      ? tAcc("notification.tracking", { code: order.tracking })
      : "";
    return tAcc("notification.order_status", {
      id: order.id,
      status: statusLabel(order.status),
      tracking
    });
  }

  function renderUserDashboard() {
    // Aggiorna currentUser con i dati più freschi dal DB per le notifiche
    const freshUser = allUsers.find((u) => u.email === currentUser.email);
    if (freshUser) {
      currentUser = freshUser;
    }

    const userNameTitleEl = document.getElementById("userNameTitle");
    userNameTitleEl.textContent = currentUser.nome;
    // Rimuove il placeholder localizzato dal nome utente.
    userNameTitleEl.removeAttribute("data-i18n-acc");
    document.getElementById("userEmailSub").textContent = currentUser.email;

    // Popola campi profilo
    const billingAddress =
      currentUser.billingIndirizzo || currentUser.indirizzo || "";
    const billingCity = currentUser.billingCitta || currentUser.citta || "";
    const billingCap = currentUser.billingCap || currentUser.cap || "";
    const billingCountry = currentUser.billingPaese || "Italia";
    const shippingAddress =
      currentUser.shippingIndirizzo || currentUser.indirizzo || billingAddress;
    const shippingCity =
      currentUser.shippingCitta || currentUser.citta || billingCity;
    const shippingCap = currentUser.shippingCap || currentUser.cap || billingCap;
    const shippingCountry = currentUser.shippingPaese || billingCountry;
    const shippingSame =
      typeof currentUser.shippingSame === "boolean"
        ? currentUser.shippingSame
        : !currentUser.shippingIndirizzo ||
          (shippingAddress === billingAddress &&
            shippingCity === billingCity &&
            shippingCap === billingCap);

    document.getElementById("profNome").value = currentUser.nome || "";
    document.getElementById("profTelefono").value = currentUser.telefono || "";
    document.getElementById("profAccountType").value =
      currentUser.accountType === "company" ? "company" : "private";
    document.getElementById("profRagioneSociale").value =
      currentUser.ragioneSociale || "";
    document.getElementById("profPartitaIva").value =
      currentUser.partitaIva || "";
    document.getElementById("profCodiceFiscale").value =
      currentUser.codiceFiscale || "";
    document.getElementById("profBillingAddress").value = billingAddress;
    document.getElementById("profBillingCity").value = billingCity;
    document.getElementById("profBillingCap").value = billingCap;
    document.getElementById("profBillingCountry").value = billingCountry;
    document.getElementById("profShippingSame").checked = shippingSame;
    document.getElementById("profShippingAddress").value = shippingAddress;
    document.getElementById("profShippingCity").value = shippingCity;
    document.getElementById("profShippingCap").value = shippingCap;
    document.getElementById("profShippingCountry").value = shippingCountry;
    syncProfileFieldVisibility();

    // Gestione banner notifiche
    const unread = (currentUser.notifications || []).filter((n) => !n.read);
    const banner = document.getElementById("notificationBanner");
    const msgEl = document.getElementById("notificationMessage");
    if (banner && msgEl) {
      if (unread.length > 0) {
        msgEl.innerHTML = unread.map(localizedNotificationMessage).join("<br>");
        banner.hidden = false;
      } else {
        banner.hidden = true;
      }
    }

    // Genera le righe dello storico ordini dell'utente autenticato.
    renderUserOrders();
    // Renderizza le serre salvate nel configuratore
    renderUserProjects();
  }

  // Elenco dei progetti salvati nel configuratore.
  function renderUserProjects() {
    const listContainer = document.getElementById("userProjectsList");
    const emptyNote = document.getElementById("emptyProjectsNote");
    const table = document.getElementById("userProjectsTable");
    if (!listContainer || !emptyNote || !table) return;

    let store = null;
    try {
      store = JSON.parse(localStorage.getItem("serra.projects.v1") || "null");
    } catch (_) {
      store = null;
    }
    const projects =
      store && Array.isArray(store.projects) ? store.projects : [];
    const projectsCount = document.getElementById("accountProjectsCount");
    if (projectsCount) projectsCount.textContent = String(projects.length);

    if (!projects.length) {
      emptyNote.hidden = false;
      table.style.display = "none";
      return;
    }

    emptyNote.hidden = true;
    table.style.display = "table";
    listContainer.innerHTML = "";

    const sorted = [...projects].sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    );

    sorted.forEach((p) => {
      const tr = document.createElement("tr");
      const bedsCount = p.config?.beds?.length || 0;
      const isActive = store.activeId === p.id;
      tr.innerHTML = `
        <td data-label="${tAcc("dash.project_name")}"><strong>${escapeHtmlAccount(p.name || "")}</strong>${isActive ? ` <span class="status-badge user">${tAcc("dash.project_active")}</span>` : ""}</td>
        <td data-label="${tAcc("dash.project_beds")}">${bedsCount}</td>
        <td data-label="${tAcc("dash.project_updated")}">${formatDate(p.updatedAt || p.createdAt || Date.now())}</td>
        <td data-label="${tAcc("dash.order_actions")}">
          <button class="btn btn-outline btn-small" data-account-action="open-user-project" data-project-id="${p.id}">${tAcc("dash.project_open_btn")}</button>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

  // Delega all'unica implementazione condivisa: vedi assets/js/shared/escape-html.js
  function escapeHtmlAccount(s) {
    return window.escapeHtml(s);
  }

  // Apertura del progetto selezionato nel configuratore.
  window.openUserProject = function (id) {
    try {
      const store = JSON.parse(
        localStorage.getItem("serra.projects.v1") || "null"
      );
      if (!store || !Array.isArray(store.projects)) {
        window.location.href = "configuratore.html";
        return;
      }
      const target = store.projects.find((p) => p.id === id);
      if (!target) {
        window.location.href = "configuratore.html";
        return;
      }
      store.activeId = id;
      localStorage.setItem("serra.projects.v1", JSON.stringify(store));
      if (target.config) {
        localStorage.setItem("serra.config.v1", JSON.stringify(target.config));
      }
    } catch (_) {}
    window.location.href = "configuratore.html";
  };

  function renderUserOrders() {
    const listContainer = document.getElementById("userOrdersList");
    const emptyNote = document.getElementById("emptyOrdersNote");
    const table = document.getElementById("userOrdersTable");

    // Filtra ordini dell'utente corrente
    const myOrders = allOrders.filter((o) => o.email === currentUser.email);
    const ordersCount = document.getElementById("accountOrdersCount");
    const varietiesCount = document.getElementById("accountVarietiesCount");
    if (ordersCount) ordersCount.textContent = String(myOrders.length);
    if (varietiesCount) {
      const varieties = new Set(
        myOrders.flatMap((order) =>
          (order.items || [])
            .filter((item) => item.type !== "material")
            .map((item) => item.id)
        )
      );
      varietiesCount.textContent = String(varieties.size);
    }

    if (myOrders.length === 0) {
      emptyNote.hidden = false;
      table.style.display = "none";
      return;
    }

    emptyNote.hidden = true;
    table.style.display = "table";
    listContainer.innerHTML = "";

    // Ordina i più recenti in alto
    myOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    myOrders.forEach((order) => {
      const tr = document.createElement("tr");
      const dateStr = formatDate(order.date);
      const statusClass = order.status.toLowerCase().replace(" ", "-");

      // Ordina la lista dei prodotti alfabeticamente
      const sortedItems = [...(order.items || [])].sort((a, b) =>
        plantLabel(a).localeCompare(plantLabel(b), locale())
      );
      const totalUnits = sortedItems.reduce(
        (sum, item) => sum + (Number(item.bustine) || 0),
        0
      );
      const productsSummaryKey = `dash.products_summary_${
        sortedItems.length === 1 ? "one" : "many"
      }_${totalUnits === 1 ? "one" : "many"}`;
      let itemsListHtml = `
        <details class="order-items-disclosure">
          <summary>
            <span class="order-items-summary-icon" aria-hidden="true">⌄</span>
            <span>${tAcc(productsSummaryKey, {
              count: sortedItems.length,
              units: totalUnits
            })}</span>
          </summary>
          <div class="order-items-flex">
      `;
      sortedItems.forEach((it) => {
        const itemName = plantLabel(it);
        const safeItemName = escapeHtmlAccount(itemName);
        itemsListHtml += `
          <span class="order-item-pill" title="${safeItemName}">
            <img src="${escapeHtmlAccount(getPhotoSrc(it.id))}" class="order-item-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" />
            <span class="order-item-name">${safeItemName}</span>
            <span class="order-item-qty">×${it.bustine}</span>
          </span>
        `;
      });
      itemsListHtml += "</div></details>";

      const trackingHtml = order.tracking
        ? `<br><small class="order-tracking-note">${tAcc("dash.tracking_label")} <a href="https://www.google.com/search?q=${encodeURIComponent(order.tracking)}" target="_blank" class="order-tracking-link">${order.tracking}</a></small>`
        : "";
      const managementHtml =
        order.status === "In elaborazione"
          ? `
            <button class="order-compact-action order-compact-action--edit" data-account-action="edit-order" data-order-id="${order.id}">
              <span class="order-compact-action-icon" aria-hidden="true">✎</span>
              <span>${tAcc("order.edit_button")}</span>
            </button>
            <div class="order-cancel-zone">
              <button class="order-cancel-button" data-account-action="cancel-order" data-order-id="${order.id}">
                <span aria-hidden="true">×</span>
                <span>${tAcc("order.cancel_button")}</span>
              </button>
            </div>
          `
          : "";

      tr.innerHTML = `
        <td data-label="${tAcc("dash.order_id")}"><strong>${order.id}</strong></td>
        <td data-label="${tAcc("dash.order_date")}">${dateStr}</td>
        <td data-label="${tAcc("dash.order_items")}">${itemsListHtml}</td>
        <td data-label="${tAcc("dash.order_total")}">€ ${parseFloat(order.total).toFixed(2)}</td>
        <td data-label="${tAcc("dash.order_status")}"><span class="status-badge ${statusClass}">${statusLabel(order.status)}</span>${trackingHtml}</td>
        <td class="order-actions-cell" data-label="${tAcc("dash.order_actions")}">
          <div class="order-actions-panel">
            <div class="order-quick-actions">
              <button class="order-compact-action order-compact-action--manual" data-account-action="download-plant-manual" data-order-id="${order.id}" title="${tAcc("dash.manual_btn_hint")}" aria-label="${tAcc("dash.manual_btn")}">
                <span class="order-compact-action-icon" aria-hidden="true">↓</span>
                <span>${tAcc("dash.manual_btn")}</span>
              </button>
              <button class="order-compact-action order-compact-action--receipt" data-account-action="print-invoice" data-order-id="${order.id}" title="${tAcc("dash.print_btn_hint")}" aria-label="${tAcc("dash.print_btn")}">
                <span class="order-compact-action-icon" aria-hidden="true">▤</span>
                <span>${tAcc("dash.print_btn")}</span>
              </button>
              ${managementHtml}
            </div>
          </div>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

  function orderEditMoney(value) {
    return new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR"
    }).format(Number(value) || 0);
  }

  function orderEditTotal() {
    return editingOrderItems.reduce(
      (sum, item) =>
        sum + (Number(item.prezzo) || 2.5) * (Number(item.bustine) || 0),
      0
    );
  }

  function renderOrderEditItems() {
    const container = document.getElementById("orderEditItems");
    const total = document.getElementById("orderEditTotal");
    if (!container || !total) return;
    container.innerHTML = editingOrderItems
      .map((item, index) => {
        const name = escapeHtmlAccount(plantLabel(item));
        return `
          <div class="order-edit-item">
            <img src="${escapeHtmlAccount(getPhotoSrc(item.id))}" alt="" onerror="this.src='assets/img/svg/logo.svg'" />
            <div class="order-edit-item-copy">
              <strong>${name}</strong>
              <small>${orderEditMoney(item.prezzo || 2.5)} · ${tAcc("order.unit_price")}</small>
            </div>
            <div class="order-edit-stepper" aria-label="${tAcc("order.quantity_for", { name })}">
              <button type="button" data-account-action="order-edit-step" data-item-index="${index}" data-delta="-1" aria-label="${tAcc("order.decrease")}">−</button>
              <input type="number" min="1" max="99" value="${item.bustine}" data-order-edit-quantity data-item-index="${index}" aria-label="${tAcc("order.quantity_for", { name })}" />
              <button type="button" data-account-action="order-edit-step" data-item-index="${index}" data-delta="1" aria-label="${tAcc("order.increase")}">+</button>
            </div>
            <button type="button" class="order-edit-remove" data-account-action="order-edit-remove" data-item-index="${index}" aria-label="${tAcc("order.remove", { name })}">×</button>
          </div>
        `;
      })
      .join("");
    total.textContent = orderEditMoney(orderEditTotal());
  }

  window.openOrderEditModal = function (orderId) {
    const order = allOrders.find(
      (entry) => entry.id === orderId && entry.email === currentUser?.email
    );
    if (!order || order.status !== "In elaborazione") {
      alert(tAcc("order.not_editable"));
      renderUserOrders();
      return;
    }
    editingOrderId = order.id;
    editingOrderItems = (order.items || []).map((item) => ({ ...item }));
    document.getElementById("orderEditError").hidden = true;
    renderOrderEditItems();
    document.getElementById("orderEditModal").hidden = false;
    document.body.classList.add("modal-open");
  };

  window.closeOrderEditModal = function () {
    const modal = document.getElementById("orderEditModal");
    if (modal) modal.hidden = true;
    editingOrderId = null;
    editingOrderItems = [];
    document.body.classList.remove("modal-open");
  };

  window.setOrderEditQuantity = function (index, value) {
    if (!editingOrderItems[index]) return;
    editingOrderItems[index].bustine = Math.min(
      99,
      Math.max(1, Math.round(Number(value) || 1))
    );
    renderOrderEditItems();
  };

  window.stepOrderEditQuantity = function (index, delta) {
    const item = editingOrderItems[index];
    if (!item) return;
    window.setOrderEditQuantity(index, Number(item.bustine) + delta);
  };

  window.removeOrderEditItem = function (index) {
    if (editingOrderItems.length <= 1) {
      const error = document.getElementById("orderEditError");
      error.textContent = tAcc("order.last_item_error");
      error.hidden = false;
      return;
    }
    editingOrderItems.splice(index, 1);
    document.getElementById("orderEditError").hidden = true;
    renderOrderEditItems();
  };

  window.handleOrderUpdate = async function (event) {
    event.preventDefault();
    const latestOrders = await window.SerraAPI.getOrders();
    const order = latestOrders.find(
      (entry) =>
        entry.id === editingOrderId && entry.email === currentUser?.email
    );
    if (!order || order.status !== "In elaborazione") {
      alert(tAcc("order.not_editable"));
      window.closeOrderEditModal();
      renderUserOrders();
      return;
    }
    order.items = editingOrderItems.map((item) => ({ ...item }));
    order.total = orderEditTotal();
    order.updatedAt = new Date().toISOString();
    allOrders = latestOrders;
    await window.SerraAPI.saveOrders(allOrders);
    window.closeOrderEditModal();
    renderUserOrders();
    alert(tAcc("order.updated_success"));
  };

  window.cancelUserOrder = async function (orderId) {
    const latestOrders = await window.SerraAPI.getOrders();
    const order = latestOrders.find(
      (entry) => entry.id === orderId && entry.email === currentUser?.email
    );
    if (!order || order.status !== "In elaborazione") {
      alert(tAcc("order.not_editable"));
      renderUserOrders();
      return;
    }
    if (!confirm(tAcc("order.cancel_confirm", { id: order.id }))) return;
    order.status = "Annullato";
    order.cancelledAt = new Date().toISOString();
    allOrders = latestOrders;
    await window.SerraAPI.saveOrders(allOrders);
    renderUserOrders();
    alert(tAcc("order.cancelled_success"));
  };

  // --- INTERFACCIA AMMINISTRATORE ---
  function renderAdminDashboard() {
    renderAdminPlantsList();
    renderAdminOrdersList();
    renderAdminUsersList();
    updateAdminStats();
  }

  function renderAdminPlantsList(filterText = "") {
    const listContainer = document.getElementById("adminPlantsList");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    const query = filterText.toLowerCase().trim();
    const filtered = allPlants.filter(
      (p) =>
        plantLabel(p).toLocaleLowerCase(currentLang).includes(query) ||
        p.id.toLowerCase().includes(query) ||
        (p.arch || "").toLowerCase().includes(query)
    );

    filtered.forEach((p) => {
      const tr = document.createElement("tr");
      // Recupera prezzo e semi del pacchetto, usando un valore predefinito se mancano.
      const spacing = p.d || p.dr || 50;
      const catLabel = categoryLabel(p.arch || "foglia");
      const packPrice =
        p.prezzo ||
        (window.PACK_DATA && window.PACK_DATA[p.id]
          ? window.PACK_DATA[p.id].price
          : 2.5);
      const packSeeds =
        p.semi ||
        (window.PACK_DATA && window.PACK_DATA[p.id]
          ? window.PACK_DATA[p.id].seeds
          : 100);

      tr.innerHTML = `
        <td data-label="${tAcc("admin.visual")}"><img src="${getPhotoSrc(p.id)}" class="admin-plant-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" /></td>
        <td data-label="${tAcc("admin.table_id")}"><code>${p.id}</code></td>
        <td data-label="${tAcc("admin.table_name")}"><strong>${plantLabel(p)}</strong></td>
        <td data-label="${tAcc("admin.table_cat")}"><span class="badge-category">${catLabel}</span></td>
        <td data-label="${tAcc("admin.table_price")}">€ ${parseFloat(packPrice).toFixed(2)}</td>
        <td data-label="${tAcc("admin.table_qty")}">${packSeeds} ${tAcc("admin.seeds")}</td>
        <td data-label="${tAcc("admin.table_gg")}">${p.gg || 90} ${tAcc("admin.days")}</td>
        <td data-label="${tAcc("admin.table_actions")}">
          <div class="admin-table-actions">
            <button class="btn btn-outline btn-small" data-account-action="edit-plant" data-plant-id="${p.id}">${tAcc("admin.edit")}</button>
            <button class="btn btn-danger btn-small" data-account-action="delete-plant" data-plant-id="${p.id}">${tAcc("admin.delete")}</button>
          </div>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

  window.filterAdminPlants = function () {
    const query = document.getElementById("adminPlantSearch").value;
    renderAdminPlantsList(query);
  };

  function renderAdminOrdersList() {
    const listContainer = document.getElementById("adminOrdersList");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    // Ordina dal più recente in alto
    const sorted = [...allOrders].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    sorted.forEach((order) => {
      const tr = document.createElement("tr");
      const dateStr = formatDate(order.date);
      const statusClass = order.status.toLowerCase().replace(" ", "-");

      let itemsListHtml = '<div class="order-items-flex">';
      // Ordina la lista dei prodotti alfabeticamente
      const sortedItems = [...order.items].sort((a, b) =>
        plantLabel(a).localeCompare(plantLabel(b), locale())
      );
      sortedItems.forEach((it) => {
        const itemName = plantLabel(it);
        itemsListHtml += `
          <span class="order-item-pill" title="${itemName}">
            <img src="${getPhotoSrc(it.id)}" class="order-item-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" />
            <span class="order-item-name">${itemName}</span>
            <span class="order-item-qty">×${it.bustine}</span>
          </span>
        `;
      });
      itemsListHtml += "</div>";

      const statusOptions = [
        "In elaborazione",
        "Spedito",
        "Completato",
        "Annullato"
      ];
      let selectHtml = `<select data-account-action="set-order-status" data-order-id="${order.id}" style="padding: 6px 10px; border-radius: 8px; border: 1px solid var(--border-color, rgba(0,0,0,0.1)); background: var(--bg-input, #fff); color: var(--text-color, #333); font-size: 0.85rem; font-family: var(--font-sans); cursor: pointer;">`;
      statusOptions.forEach((opt) => {
        const selected = order.status === opt ? "selected" : "";
        selectHtml += `<option value="${opt}" ${selected}>${statusLabel(opt)}</option>`;
      });
      selectHtml += `</select>`;

      const trackingHtml = order.tracking
        ? `<br><small class="order-tracking-note">${tAcc("dash.tracking_label")} <strong>${order.tracking}</strong></small>`
        : "";

      tr.innerHTML = `
        <td data-label="${tAcc("dash.order_id")}"><strong>${order.id}</strong></td>
        <td data-label="${tAcc("admin.orders_client")}">
          <strong>${getUserNameByEmail(order.email)}</strong><br>
          <small>${order.email}</small>
        </td>
        <td data-label="${tAcc("dash.order_date")}">${dateStr}</td>
        <td data-label="${tAcc("dash.order_items")}">${itemsListHtml}</td>
        <td data-label="${tAcc("dash.order_total")}">€ ${parseFloat(order.total).toFixed(2)}</td>
        <td data-label="${tAcc("dash.order_status")}"><span class="status-badge ${statusClass}">${statusLabel(order.status)}</span>${trackingHtml}</td>
        <td data-label="${tAcc("dash.order_actions")}">
          <div class="admin-order-actions">
            ${selectHtml}
            <button class="btn btn-outline btn-small" data-account-action="print-invoice" data-order-id="${order.id}" style="padding: 6px 12px; font-size: 0.85rem; font-weight: 500;">${tAcc("dash.print_btn")}</button>
            <button class="btn btn-danger btn-small" data-account-action="delete-order" data-order-id="${order.id}" style="padding: 6px 12px; font-size: 0.85rem; font-weight: 500;">${tAcc("admin.delete")}</button>
          </div>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

  window.handleDeleteOrder = async function (orderId) {
    if (confirm(tAcc("confirm.delete_order", { id: orderId }))) {
      allOrders = allOrders.filter((o) => o.id !== orderId);
      await window.SerraAPI.saveOrders(allOrders);
      renderAdminOrdersList();
      updateAdminStats();
    }
  };

  window.handleDismissNotifications = async function () {
    if (!currentUser) return;
    const freshUser = allUsers.find((u) => u.email === currentUser.email);
    if (freshUser) {
      (freshUser.notifications || []).forEach((n) => (n.read = true));
      await window.SerraAPI.saveUsers(allUsers);
      localStorage.setItem("serra.current_user", JSON.stringify(freshUser));
      currentUser = freshUser;
    }
    const banner = document.getElementById("notificationBanner");
    if (banner) banner.hidden = true;
  };

  function updateAdminStats() {
    const statsText = document.getElementById("adminStatsText");
    if (!statsText) return;
    // Rimuove i placeholder localizzati dai dati caricati.
    statsText.removeAttribute("data-i18n-acc");
    const clientsCount = allUsers.filter((u) => u.role !== "admin").length;
    statsText.innerHTML = `
      • <strong>${tAcc("admin.stats_plants")}:</strong> ${allPlants.length}<br>
      • <strong>${tAcc("admin.stats_clients")}:</strong> ${clientsCount}<br>
      • <strong>${tAcc("admin.stats_orders")}:</strong> ${allOrders.length}
    `;

    renderAdminCharts();
  }

  function renderAdminCharts() {
    const revContainer = document.getElementById("revenueChartContainer");
    const topContainer = document.getElementById("topCropsChartContainer");
    if (!revContainer || !topContainer) return;

    // 1. Ricavi per categoria
    const categoryRevenues = {
      foglia: 0,
      frutto: 0,
      radice: 0,
      aromatica: 0
    };

    allOrders.forEach((order) => {
      if (order.status === "Annullato") return;
      order.items.forEach((it) => {
        // Esclude i materiali extra dal grafico delle colture.
        if (it.type === "material") return;
        const plant = allPlants.find((p) => p.id === it.id);
        const cat = (plant ? plant.arch : null) || "foglia";
        const price = it.prezzo || 2.5;
        const subtotal = it.bustine * price;
        if (categoryRevenues[cat] !== undefined) {
          categoryRevenues[cat] += subtotal;
        } else {
          categoryRevenues.foglia += subtotal; // Categoria predefinita.
        }
      });
    });

    const catLabels = {
      foglia: categoryLabel("foglia"),
      frutto: categoryLabel("frutto"),
      radice: categoryLabel("radice"),
      aromatica: categoryLabel("aromatica")
    };

    const catColors = {
      foglia: "#48bb78", // Green
      frutto: "#ecc94b", // Yellow/Orange
      radice: "#ed8936", // Orange/Brown
      aromatica: "#9f7aea" // Purple
    };

    // Costruisci SVG ricavi
    const revData = Object.entries(categoryRevenues).map(([cat, val]) => ({
      label: catLabels[cat] || cat,
      value: val,
      color: catColors[cat] || "#48bb78"
    }));

    const maxRev = Math.max(...revData.map((d) => d.value), 10);

    let revSvg = `<svg viewBox="0 0 320 180" width="100%" height="100%">`;
    revData.forEach((d, i) => {
      const y = 15 + i * 40;
      const barWidth = maxRev > 0 ? (d.value / maxRev) * 160 : 0;
      revSvg += `
        <!-- Etichetta della categoria -->
        <text x="10" y="${y + 13}" class="chart-label" font-weight="500">${d.label}</text>
        <!-- Barra di sfondo del grafico -->
        <rect x="110" y="${y}" width="160" height="18" rx="4" fill="rgba(0,0,0,0.04)" />
        <!-- Barra proporzionale al valore -->
        <rect x="110" y="${y}" width="${barWidth}" height="18" rx="4" fill="${d.color}" class="chart-bar-rect" />
        <!-- Valore numerico visualizzato -->
        <text x="${115 + barWidth}" y="${y + 13}" class="chart-value">€${d.value.toFixed(1)}</text>
      `;
    });
    revSvg += `</svg>`;
    revContainer.innerHTML = revSvg;

    // 2. Top 5 semi ordinati (materiali extra esclusi: unità diverse)
    const cropCounts = {};
    allOrders.forEach((order) => {
      if (order.status === "Annullato") return;
      order.items.forEach((it) => {
        if (it.type === "material") return;
        const itemName = plantLabel(it);
        cropCounts[itemName] = (cropCounts[itemName] || 0) + it.bustine;
      });
    });

    const topCrops = Object.entries(cropCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ label: name, value: qty }));

    if (topCrops.length === 0) {
      topContainer.innerHTML = `<p style="font-size:0.9rem;color:#718096;text-align:center;margin-top:50px;">${tAcc("admin.no_sales")}</p>`;
      return;
    }

    const maxQty = Math.max(...topCrops.map((d) => d.value), 1);
    let topSvg = `<svg viewBox="0 0 320 200" width="100%" height="100%">`;
    topCrops.forEach((d, i) => {
      const y = 15 + i * 36;
      const barWidth = (d.value / maxQty) * 150;
      // Trunca etichette lunghe
      const shortLabel =
        d.label.length > 12 ? d.label.substring(0, 11) + ".." : d.label;
      topSvg += `
        <!-- Etichetta della coltura -->
        <text x="10" y="${y + 12}" class="chart-label" font-weight="500">${shortLabel}</text>
        <!-- Barra di sfondo del grafico -->
        <rect x="110" y="${y}" width="150" height="16" rx="4" fill="rgba(0,0,0,0.04)" />
        <!-- Barra proporzionale al valore -->
        <rect x="110" y="${y}" width="${barWidth}" height="16" rx="4" fill="#2f6b3a" class="chart-bar-rect" />
        <!-- Valore numerico visualizzato -->
        <text x="${115 + barWidth}" y="${y + 12}" class="chart-value">${d.value} ${currentLang === "ro" ? "plic." : "bust."}</text>
      `;
    });
    topSvg += `</svg>`;
    topContainer.innerHTML = topSvg;
  }

  window.handleClearOrders = async function () {
    if (confirm(tAcc("confirm.clear_orders"))) {
      allOrders = [];
      await window.SerraAPI.saveOrders([]);
      renderAdminOrdersList();
      updateAdminStats();
      alert(tAcc("alert.orders_cleared"));
    }
  };

  window.handleClearUsers = async function () {
    if (confirm(tAcc("confirm.clear_users"))) {
      const adminOnly = allUsers.filter((u) => u.role === "admin");
      allUsers = adminOnly;
      await window.SerraAPI.saveUsers(adminOnly);
      updateAdminStats();
      alert(tAcc("alert.users_cleared"));
    }
  };

  function renderAdminUsersList() {
    const listContainer = document.getElementById("adminUsersList");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    allUsers.forEach((user) => {
      const tr = document.createElement("tr");

      const isSelf = user.email === currentUser.email;
      const deleteBtnHtml = isSelf
        ? `<span class="text-muted" style="font-size: 0.85rem; font-style: italic;">${tAcc("admin.logged_in")}</span>`
        : `<button class="btn btn-danger btn-small" data-account-action="delete-user" data-email="${user.email}" style="padding: 6px 12px;">${tAcc("admin.delete")}</button>`;

      const roleLabel =
        user.role === "admin"
          ? tAcc("auth.test_admin").replace(":", "")
          : tAcc("auth.test_customer").replace(":", "");
      const roleClass = user.role === "admin" ? "admin" : "user";

      tr.innerHTML = `
        <td data-label="${tAcc("admin.users_name")}"><strong>${user.nome}</strong></td>
        <td data-label="${tAcc("admin.users_email")}"><code>${user.email}</code></td>
        <td data-label="${tAcc("admin.users_phone")}">${user.telefono || "-"}</td>
        <td data-label="${tAcc("admin.users_address")}">${user.indirizzo ? `${user.indirizzo}, ${user.cap} ${user.citta}` : "-"}</td>
        <td data-label="${tAcc("admin.users_role")}"><span class="status-badge ${roleClass}">${roleLabel}</span></td>
        <td data-label="${tAcc("admin.table_actions")}">${deleteBtnHtml}</td>
      `;
      listContainer.appendChild(tr);
    });
  }

  window.handleDeleteUser = async function (email) {
    if (confirm(tAcc("confirm.delete_user", { email }))) {
      allUsers = allUsers.filter((u) => u.email !== email);
      await window.SerraAPI.saveUsers(allUsers);
      renderAdminUsersList();
      updateAdminStats();
    }
  };

  function getUserNameByEmail(email) {
    const u = allUsers.find((user) => user.email === email);
    return u ? u.nome : tAcc("customer.guest");
  }

  // --- AZIONI LOGIN / REGISTRAZIONE ---
  window.switchAuthTab = function (tab) {
    document
      .getElementById("tabLogin")
      .classList.toggle("active", tab === "login");
    document
      .getElementById("tabRegister")
      .classList.toggle("active", tab === "register");
    document.getElementById("loginForm").hidden = tab !== "login";
    document.getElementById("registerForm").hidden = tab !== "register";
  };

  window.handleLogin = async function (e) {
    e.preventDefault();
    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const errorEl = document.getElementById("loginError");

    errorEl.hidden = true;

    // Cerca l'utente nel db locale
    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      currentUser = user;
      localStorage.setItem("serra.current_user", JSON.stringify(user));
      renderView();
    } else {
      errorEl.textContent = tAcc("auth.login_error");
      errorEl.hidden = false;
    }
  };

  window.handleRegister = async function (e) {
    e.preventDefault();
    const nome = document.getElementById("regNome").value.trim();
    const email = document
      .getElementById("regEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("regPassword").value;
    const telefono = document.getElementById("regTelefono").value.trim();
    const indirizzo = document.getElementById("regIndirizzo").value.trim();
    const citta = document.getElementById("regCitta").value.trim();
    const cap = document.getElementById("regCap").value.trim();
    const errorEl = document.getElementById("regError");

    errorEl.hidden = true;

    // Controlla se l'email esiste già
    if (allUsers.some((u) => u.email === email)) {
      errorEl.textContent = tAcc("auth.email_exists");
      errorEl.hidden = false;
      return;
    }

    const newUser = {
      email,
      password,
      nome,
      telefono,
      indirizzo,
      citta,
      cap,
      accountType: "private",
      ragioneSociale: "",
      partitaIva: "",
      codiceFiscale: "",
      billingIndirizzo: indirizzo,
      billingCitta: citta,
      billingCap: cap,
      billingPaese: currentLang === "ro" ? "România" : "Italia",
      shippingSame: true,
      shippingIndirizzo: indirizzo,
      shippingCitta: citta,
      shippingCap: cap,
      shippingPaese: currentLang === "ro" ? "România" : "Italia",
      role: "user"
    };

    allUsers.push(newUser);

    // Salva nel database (e in localStorage se offline)
    const success = await window.SerraAPI.saveUsers(allUsers);

    if (success) {
      currentUser = newUser;
      localStorage.setItem("serra.current_user", JSON.stringify(newUser));
      renderView();
    } else {
      errorEl.textContent = tAcc("auth.register_error");
      errorEl.hidden = false;
    }
  };

  window.handleUpdateProfile = async function (e) {
    e.preventDefault();
    const nome = document.getElementById("profNome").value.trim();
    const telefono = document.getElementById("profTelefono").value.trim();
    const accountType = document.getElementById("profAccountType").value;
    const ragioneSociale = document
      .getElementById("profRagioneSociale")
      .value.trim();
    const partitaIva = document.getElementById("profPartitaIva").value.trim();
    const codiceFiscale = document
      .getElementById("profCodiceFiscale")
      .value.trim();
    const billingIndirizzo = document
      .getElementById("profBillingAddress")
      .value.trim();
    const billingCitta = document
      .getElementById("profBillingCity")
      .value.trim();
    const billingCap = document.getElementById("profBillingCap").value.trim();
    const billingPaese = document
      .getElementById("profBillingCountry")
      .value.trim();
    const shippingSame = document.getElementById("profShippingSame").checked;
    const shippingIndirizzo = shippingSame
      ? billingIndirizzo
      : document.getElementById("profShippingAddress").value.trim();
    const shippingCitta = shippingSame
      ? billingCitta
      : document.getElementById("profShippingCity").value.trim();
    const shippingCap = shippingSame
      ? billingCap
      : document.getElementById("profShippingCap").value.trim();
    const shippingPaese = shippingSame
      ? billingPaese
      : document.getElementById("profShippingCountry").value.trim();
    const successEl = document.getElementById("profileSuccess");

    successEl.hidden = true;

    // Trova l'utente corrente in allUsers e aggiorna i campi
    const index = allUsers.findIndex((u) => u.email === currentUser.email);
    if (index !== -1) {
      allUsers[index].nome = nome;
      allUsers[index].telefono = telefono;
      allUsers[index].accountType = accountType;
      allUsers[index].ragioneSociale = ragioneSociale;
      allUsers[index].partitaIva = partitaIva;
      allUsers[index].codiceFiscale = codiceFiscale;
      allUsers[index].billingIndirizzo = billingIndirizzo;
      allUsers[index].billingCitta = billingCitta;
      allUsers[index].billingCap = billingCap;
      allUsers[index].billingPaese = billingPaese;
      allUsers[index].shippingSame = shippingSame;
      allUsers[index].shippingIndirizzo = shippingIndirizzo;
      allUsers[index].shippingCitta = shippingCitta;
      allUsers[index].shippingCap = shippingCap;
      allUsers[index].shippingPaese = shippingPaese;
      // I campi storici continuano a rappresentare l'indirizzo di consegna.
      allUsers[index].indirizzo = shippingIndirizzo;
      allUsers[index].citta = shippingCitta;
      allUsers[index].cap = shippingCap;

      const success = await window.SerraAPI.saveUsers(allUsers);
      if (success) {
        currentUser = allUsers[index];
        localStorage.setItem("serra.current_user", JSON.stringify(currentUser));
        successEl.textContent = tAcc("dash.profile_saved");
        successEl.hidden = false;
        setTimeout(() => (successEl.hidden = true), 3000);
        renderView();
      }
    }
  };

  function syncProfileFieldVisibility() {
    const company =
      document.getElementById("profAccountType")?.value === "company";
    document.querySelectorAll(".company-profile-field").forEach((field) => {
      field.hidden = !company;
      const input = field.querySelector("input");
      if (input) input.required = company;
    });

    const same = document.getElementById("profShippingSame")?.checked ?? true;
    const shippingFields = document.getElementById("shippingAddressFields");
    if (shippingFields) shippingFields.hidden = same;
    [
      "profShippingAddress",
      "profShippingCity",
      "profShippingCap",
      "profShippingCountry"
    ].forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.required = !same;
    });
  }

  // --- AZIONI ADMIN TAB ---
  window.switchAdminTab = function (tab) {
    document
      .getElementById("btnTabAdminPlants")
      .classList.toggle("active", tab === "plants");
    document
      .getElementById("btnTabAdminOrders")
      .classList.toggle("active", tab === "orders");
    document
      .getElementById("btnTabAdminUsers")
      .classList.toggle("active", tab === "users");
    document
      .getElementById("btnTabAdminBackup")
      .classList.toggle("active", tab === "backup");

    document.getElementById("adminTabPlants").hidden = tab !== "plants";
    document.getElementById("adminTabOrders").hidden = tab !== "orders";
    document.getElementById("adminTabUsers").hidden = tab !== "users";
    document.getElementById("adminTabBackup").hidden = tab !== "backup";

    if (tab === "backup") {
      updateAdminStats();
    }
  };

  // Aggiorna lo stato di un ordine dalla sezione amministrativa.
  window.handleToggleOrderStatus = async function (orderId, nextStatus) {
    const index = allOrders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      const order = allOrders[index];
      order.status = nextStatus;

      let trackingMsg = "";
      if (nextStatus === "Spedito") {
        const trackingCode = prompt(tAcc("prompt.tracking"));
        if (trackingCode !== null && trackingCode.trim() !== "") {
          order.tracking = trackingCode.trim();
          trackingMsg = tAcc("notification.tracking", { code: order.tracking });
        }
      }

      await window.SerraAPI.saveOrders(allOrders);

      // Accoda una notifica all'utente associato all'ordine
      const customer = allUsers.find((u) => u.email === order.email);
      if (customer) {
        if (!customer.notifications) customer.notifications = [];
        customer.notifications.push({
          id: Date.now(),
          type: "order_status",
          orderId: order.id,
          message: tAcc("notification.order_status", {
            id: order.id,
            status: statusLabel(nextStatus),
            tracking: trackingMsg
          }),
          read: false,
          date: new Date().toISOString()
        });
        await window.SerraAPI.saveUsers(allUsers);
      }

      renderAdminOrdersList();
    }
  };

  // --- CRUD PIANTE (ADMIN) ---
  window.openPlantModal = function (action, plantId = null) {
    const modal = document.getElementById("plantModal");
    const title = document.getElementById("plantModalTitle");
    const form = document.getElementById("plantForm");
    const actionEl = document.getElementById("editPlantAction");

    form.reset();
    actionEl.value = action;
    modal.hidden = false;

    // Popola le consociazioni
    const selectAmiche = document.getElementById("editPlantAmiche");
    const selectNemiche = document.getElementById("editPlantNemiche");
    if (selectAmiche && selectNemiche) {
      selectAmiche.innerHTML = "";
      selectNemiche.innerHTML = "";
      allPlants.forEach((pOpt) => {
        if (pOpt.id !== plantId) {
          selectAmiche.appendChild(
            new Option(`${plantLabel(pOpt)} (${pOpt.id})`, pOpt.id)
          );
          selectNemiche.appendChild(
            new Option(`${plantLabel(pOpt)} (${pOpt.id})`, pOpt.id)
          );
        }
      });
    }

    // Disabilita inserimento ID se modifica
    document.getElementById("editPlantId").disabled = action === "edit";

    if (action === "edit" && plantId) {
      title.textContent = tAcc("modal.edit_title");
      const p = allPlants.find((x) => x.id === plantId);
      if (p) {
        document.getElementById("editPlantId").value = p.id;
        document.getElementById("editPlantNome").value = p.nome;
        document.getElementById("editPlantCategory").value = p.arch || "foglia";
        document.getElementById("editPlantEmoji").value =
          p.emoji || fruitEmoji(p.id) || "🌿";

        const photoVal = p.foto || "";
        document.getElementById("editPlantFoto").value = photoVal;
        updateModalPhotoPreview(photoVal, p.id);

        const price =
          p.prezzo ||
          (window.PACK_DATA && window.PACK_DATA[p.id]
            ? window.PACK_DATA[p.id].price
            : 2.5);
        const seeds =
          p.semi ||
          (window.PACK_DATA && window.PACK_DATA[p.id]
            ? window.PACK_DATA[p.id].seeds
            : 100);

        document.getElementById("editPlantPrice").value = price;
        document.getElementById("editPlantSeeds").value = seeds;
        document.getElementById("editPlantMaturity").value = p.gg || 90;
        document.getElementById("editPlantSpacing").value = p.d || p.dr || 50;

        // Imposta i mesi selezionati
        const selectMonths = document.getElementById("editPlantMonths");
        Array.from(selectMonths.options).forEach((opt) => {
          opt.selected = p.mesi.includes(parseInt(opt.value));
        });

        // Imposta le consociazioni selezionate
        const pAmiche = p.amiche || [];
        const pNemiche = p.nemiche || [];
        if (selectAmiche && selectNemiche) {
          Array.from(selectAmiche.options).forEach((opt) => {
            opt.selected = pAmiche.includes(opt.value);
          });
          Array.from(selectNemiche.options).forEach((opt) => {
            opt.selected = pNemiche.includes(opt.value);
          });
        }
      }
    } else {
      title.textContent = tAcc("modal.new_title");
      document.getElementById("editPlantId").disabled = false;
      document.getElementById("editPlantFoto").value = "";
      updateModalPhotoPreview("", "");
    }
  };

  window.closePlantModal = function () {
    document.getElementById("plantModal").hidden = true;
  };

  window.handleSavePlant = async function (e) {
    e.preventDefault();
    const action = document.getElementById("editPlantAction").value;
    const id = document
      .getElementById("editPlantId")
      .value.trim()
      .toLowerCase();
    const nome = document.getElementById("editPlantNome").value.trim();
    const arch = document.getElementById("editPlantCategory").value;
    const emoji = document.getElementById("editPlantEmoji").value.trim();
    const foto = document.getElementById("editPlantFoto").value.trim();
    const prezzo = parseFloat(document.getElementById("editPlantPrice").value);
    const semi = parseInt(document.getElementById("editPlantSeeds").value);
    const gg = parseInt(document.getElementById("editPlantMaturity").value);
    const spacing = parseInt(document.getElementById("editPlantSpacing").value);

    // Leggi consociazioni selezionate
    const selectAmiche = document.getElementById("editPlantAmiche");
    const selectNemiche = document.getElementById("editPlantNemiche");
    const amiche = selectAmiche
      ? Array.from(selectAmiche.selectedOptions).map((opt) => opt.value)
      : [];
    const nemiche = selectNemiche
      ? Array.from(selectNemiche.selectedOptions).map((opt) => opt.value)
      : [];

    // Leggi mesi selezionati
    const selectMonths = document.getElementById("editPlantMonths");
    const mesi = Array.from(selectMonths.selectedOptions).map((opt) =>
      parseInt(opt.value)
    );

    if (action === "new") {
      // Controlla se ID esiste già
      if (allPlants.some((p) => p.id === id)) {
        alert(tAcc("alert.plant_exists"));
        return;
      }
      const newPlant = {
        id,
        nome,
        arch,
        emoji,
        foto,
        prezzo,
        semi,
        gg,
        d: spacing,
        dr: Math.round(spacing * 1.5),
        h: spacing > 60 ? "alta" : "bassa",
        sole: "pieno",
        acqua: "media",
        mesi,
        amiche,
        nemiche
      };
      allPlants.push(newPlant);
    } else {
      // Trova e aggiorna
      const index = allPlants.findIndex((p) => p.id === id);
      if (index !== -1) {
        allPlants[index].nome = nome;
        allPlants[index].arch = arch;
        allPlants[index].emoji = emoji;
        allPlants[index].foto = foto;
        allPlants[index].prezzo = prezzo;
        allPlants[index].semi = semi;
        allPlants[index].gg = gg;
        allPlants[index].d = spacing;
        allPlants[index].dr = Math.round(spacing * 1.5);
        allPlants[index].mesi = mesi;
        allPlants[index].amiche = amiche;
        allPlants[index].nemiche = nemiche;
      }
    }

    // Salva tramite API
    await window.SerraAPI.savePlants(allPlants);
    closePlantModal();

    // Aggiorna la vista
    renderAdminPlantsList();
  };

  window.handleDeletePlant = async function (plantId) {
    if (confirm(tAcc("confirm.delete_plant", { id: plantId }))) {
      allPlants = allPlants.filter((p) => p.id !== plantId);
      await window.SerraAPI.savePlants(allPlants);
      renderAdminPlantsList();
    }
  };

  // --- OPERAZIONI BACKUP (ADMIN) ---
  window.resetCatalogToDefault = async function () {
    if (confirm(tAcc("confirm.reset_catalog"))) {
      // Invia array vuoto o resetta tramite rimozione
      localStorage.removeItem("serra.custom_plants");

      const serverActive = await window.SerraAPI.isServerActive();
      if (serverActive) {
        // Ripristina il catalogo del server.
        const originalPlants = window.PLANTS; // this was loaded inside index/configuratore but overridden.
        // Salva un catalogo vuoto per riattivare il catalogo predefinito.
        await window.SerraAPI.savePlants([]);
      }

      alert(tAcc("alert.catalog_reset"));
      window.location.reload();
    }
  };

  window.exportDatabaseJson = function () {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(allPlants, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "orto_in_serra_catalogo.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper per emoji frutti di backup se manca
  function fruitEmoji(plantId) {
    const emojis = {
      pomodoro: "🍅",
      peperone: "🫑",
      peperoncino: "🌶️",
      melanzana: "🍆",
      zucchina: "🥒",
      zucca: "🎃",
      cetriolo: "🥒",
      melone: "🍈",
      anguria: "🍉",
      lattuga: "🥬",
      radicchio: "🥬",
      rucola: "🥬",
      spinaci: "🥬",
      bietola: "🥬",
      cavolo: "🥬",
      verza: "🥬",
      broccolo: "🥦",
      cavolfiore: "🥦",
      cavolonero: "🥬",
      cavolorapa: "🥦",
      carota: "🥕",
      finocchio: "🌿",
      prezzemolo: "🌿",
      basilico: "🌿",
      coriandolo: "🌿",
      aneto: "🌿",
      cipolla: "🧅",
      aglio: "🧄",
      porro: "🧅",
      scalogno: "🧅",
      fagiolino: "🫘",
      fagiolo: "🫘",
      pisello: "🫛",
      fragola: "🍓",
      sedano: "🌿",
      ravanello: "🥬",
      barbabietola: "🌿",
      cicoria: "🥬",
      indivia: "🥬",
      pakchoi: "🥬",
      cavoletti: "🥬",
      rapa: "🌿",
      valerianella: "🥬",
      rosmarino: "🌿",
      timo: "🌿",
      origano: "🌿",
      salvia: "🌿",
      pastinaca: "🥕",
      radice_prezemolo: "🌿",
      sedano_rapa: "🌿",
      rafano: "🌿",
      patata: "🥔",
      patata_dolce: "🍠",
      cipolla_rossa: "🧅",
      cipollotto: "🧅",
      erba_cipollina: "🌿",
      loboda: "🥬",
      stevia_dolce: "🥬",
      leustean: "🌿",
      dragoncello: "🌿",
      menta: "🌿",
      maggiorana: "🌿",
      camomilla: "🌼",
      mais_dolce: "🌽",
      tomatillo: "🍅",
      physalis: "🍒",
      cucamelon: "🥒",
      asparago: "🌿",
      carciofo: "🌿",
      cardo: "🥬",
      crescione: "🥬",
      mizuna: "🥬",
      senape_foglia: "🥬",
      tatsoi: "🥬",
      cavolo_cinese: "🥬",
      daikon: "🥬",
      scorzonera: "🌿",
      topinambur: "🌻",
      fava: "🫘",
      soia_edamame: "🫘",
      cece: "🫘",
      lenticchia: "🫘",
      fagiolo_borlotto: "🫘",
      cavolo_rosso: "🥬",
      cavolo_navone: "🌿",
      broccolo_rapa: "🥬",
      shiso: "🌿",
      broccolo_romanesco: "🥦",
      friggitello: "🫑",
      agretti: "🌿",
      borragine: "🌸",
      catalogna: "🥬",
      acetosa: "🌿",
      leurda: "🧄",
      melissa: "🌿",
      cerfoglio: "🌿",
      cimbru: "🌿"
    };
    return emojis[plantId] || "🌿";
  }

  // Risoluzione condivisa della foto: vedi assets/js/shared/plant-photo.js.
  function getPhotoSrc(id) {
    const plantObj = allPlants.find((p) => p.id === id);
    return window.resolvePlantPhoto(plantObj, id);
  }

  function updateModalPhotoPreview(val, plantId) {
    const previewImg = document.getElementById("editPlantFotoPreview");
    if (!previewImg) return;
    let src = "assets/img/svg/logo.svg";
    if (val) {
      if (
        val.startsWith("http://") ||
        val.startsWith("https://") ||
        val.startsWith("data:")
      ) {
        src = val;
      } else if (val.includes("/")) {
        src = val;
      } else {
        src = `assets/img/photo/${val}`;
      }
    } else if (plantId) {
      src = window.resolvePlantPhoto(null, plantId);
    }
    previewImg.src = src;
  }

  window.downloadOrderPlantManual = async function (orderId, button) {
    const order = allOrders.find((entry) => entry.id === orderId);
    if (!order) {
      alert(tAcc("alert.order_not_found"));
      return;
    }
    const plantIds = new Set(allPlants.map((plant) => plant.id));
    const hasPlants = (order.items || []).some((item) => plantIds.has(item.id));
    if (!hasPlants || !window.SERRA_PLANT_MANUAL) {
      alert(tAcc("manual.no_plants"));
      return;
    }
    const user = allUsers.find((entry) => entry.email === order.email) || currentUser;
    const label = button?.querySelector(".order-action-copy strong");
    const previous = label?.textContent;
    if (button) button.disabled = true;
    if (label) label.textContent = tAcc("manual.preparing");
    try {
      await window.SERRA_PLANT_MANUAL.download({
        order,
        user,
        plants: allPlants,
        lang: currentLang
      });
    } catch (error) {
      console.error("Manual PDF generation failed", error);
      alert(tAcc("manual.error"));
    } finally {
      if (button) button.disabled = false;
      if (label) label.textContent = previous || tAcc("dash.manual_btn");
    }
  };

  window.printInvoice = function (orderId) {
    const order = allOrders.find((o) => o.id === orderId);
    if (!order) {
      alert(tAcc("alert.order_not_found"));
      return;
    }

    // Cerca l'utente per recuperare i dettagli di spedizione
    const user = allUsers.find((u) => u.email === order.email) || {
      nome: tAcc("customer.guest"),
      email: order.email,
      phone: "-",
      indirizzo: "-"
    };
    const billing = order.billing || {
      accountType: user.accountType || "private",
      name: user.ragioneSociale || user.nome,
      address: user.billingIndirizzo || user.indirizzo || "-",
      city: user.billingCitta || user.citta || "",
      cap: user.billingCap || user.cap || "",
      country: user.billingPaese || "Italia",
      vatNumber: user.partitaIva || "",
      taxCode: user.codiceFiscale || ""
    };
    const shipping = order.shipping || {
      name: user.nome,
      phone: user.telefono || "",
      address: user.shippingIndirizzo || user.indirizzo || "-",
      city: user.shippingCitta || user.citta || "",
      cap: user.shippingCap || user.cap || "",
      country: user.shippingPaese || user.billingPaese || "Italia"
    };
    const addressLine = (data) =>
      [data.address, data.cap, data.city, data.country]
        .filter(Boolean)
        .map(escapeHtmlAccount)
        .join(", ");

    const dateStr = formatDate(order.date);

    let tableRowsHtml = "";
    order.items.forEach((it) => {
      const itemPrice = it.prezzo || 2.5;
      const rowSubtotal = parseFloat(itemPrice * it.bustine).toFixed(2);
      tableRowsHtml += `
        <tr>
          <td><strong>${plantLabel(it)}</strong><br><small>${tAcc("invoice.code")}: ${it.id}</small></td>
          <td class="text-right">${it.bustine}</td>
          <td class="text-right">€ ${parseFloat(itemPrice).toFixed(2)}</td>
          <td class="text-right">€ ${rowSubtotal}</td>
        </tr>
      `;
    });

    const printContainer = document.getElementById("invoicePrintContainer");
    if (!printContainer) return;

    printContainer.innerHTML = `
      <div class="invoice-header">
        <div class="invoice-brand">
          <img class="invoice-logo" src="assets/img/svg/logo.svg" alt="Orto in Serra">
          <div>
            <h1 class="invoice-title">Orto in Serra</h1>
            <p class="invoice-subtitle">${tAcc("invoice.subtitle")}</p>
          </div>
        </div>
        <div class="invoice-meta">
          <strong>${tAcc("invoice.title")}</strong><br>
          ${tAcc("invoice.number")}: <strong>${order.id}</strong><br>
          ${tAcc("invoice.date")}: ${dateStr}<br>
          ${tAcc("invoice.status")}: <strong>${statusLabel(order.status).toUpperCase()}</strong>
        </div>
      </div>

      <div class="invoice-details">
        <div class="invoice-block">
          <h4>${tAcc("invoice.sender")}</h4>
          <p><strong>Orto in Serra S.r.l.</strong></p>
          <p>Via delle Serre, 42</p>
          <p>50023 Impruneta (FI)</p>
          <p>P.IVA: 07123456789</p>
          <p>${tAcc("invoice.email")}: info@ortoinserra.it</p>
        </div>
        <div class="invoice-block">
          <h4>${tAcc("invoice.billing")}</h4>
          ${billing.accountType === "company" ? `<div class="invoice-customer-type">${tAcc("invoice.company_customer")}</div>` : ""}
          <p><strong>${escapeHtmlAccount(billing.name || user.nome)}</strong></p>
          <p>${addressLine(billing)}</p>
          ${billing.vatNumber ? `<p>${tAcc("invoice.vat_number")}: ${escapeHtmlAccount(billing.vatNumber)}</p>` : ""}
          ${billing.taxCode ? `<p>${tAcc("invoice.tax_code")}: ${escapeHtmlAccount(billing.taxCode)}</p>` : ""}
          <p>${tAcc("invoice.email")}: ${escapeHtmlAccount(user.email)}</p>
        </div>
        <div class="invoice-block">
          <h4>${tAcc("invoice.shipping")}</h4>
          <p><strong>${escapeHtmlAccount(shipping.name || user.nome)}</strong></p>
          <p>${addressLine(shipping)}</p>
          <p>${tAcc("invoice.phone")}: ${escapeHtmlAccount(shipping.phone || user.telefono || "-")}</p>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>${tAcc("invoice.product")}</th>
            <th class="text-right">${tAcc("invoice.qty")}</th>
            <th class="text-right">${tAcc("invoice.unit_price")}</th>
            <th class="text-right">${tAcc("invoice.subtotal")}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>

      <div class="invoice-summary">
        <div class="invoice-summary-box">
          <div class="invoice-summary-row">
            <span>${tAcc("invoice.taxable")}:</span>
            <span>€ ${parseFloat(order.total / 1.22).toFixed(2)}</span>
          </div>
          <div class="invoice-summary-row">
            <span>${tAcc("invoice.vat")}:</span>
            <span>€ ${parseFloat(order.total - order.total / 1.22).toFixed(2)}</span>
          </div>
          <div class="invoice-summary-row total">
            <span>${tAcc("invoice.total")}:</span>
            <span>€ ${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="invoice-footer">
        <p>${tAcc("invoice.thanks")}</p>
        <p><small>${tAcc("invoice.legal")}</small></p>
      </div>
    `;

    // Esegui la stampa nativa del browser
    window.print();
  };
})();
