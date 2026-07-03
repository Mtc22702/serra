// Logica interattiva per l'Area Riservata (Cliente & Admin)
(function () {
  let currentUser = null;
  let allUsers = [];
  let allOrders = [];
  let allPlants = [];

  // --- INIZIALIZZAZIONE ---
  async function initAccount() {
    // 1. Rileva connessione al Database Locale
    await checkDatabaseStatus();
    
    // 2. Carica i dati iniziali dall'API
    allUsers = await window.SerraAPI.getUsers();
    allOrders = await window.SerraAPI.getOrders();
    // Prendi le piante caricate dall'API (se nulle, usa PLANTS di plants-data.js)
    allPlants = await window.SerraAPI.getPlants() || window.PLANTS || [];

    // 3. Controlla se c'è un utente loggato
    currentUser = window.SerraAPI.getCurrentUser();
    
    // 4. Mostra la sezione corretta dell'interfaccia
    renderView();

    // 5. Registra eventi per la foto reale nel modale
    document.getElementById("editPlantFoto")?.addEventListener("input", function() {
      updateModalPhotoPreview(this.value, document.getElementById("editPlantId").value);
    });
    document.getElementById("editPlantId")?.addEventListener("input", function() {
      const fotoVal = document.getElementById("editPlantFoto").value;
      if (!fotoVal) {
        updateModalPhotoPreview("", this.value);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccount);
  } else {
    initAccount();
  }

  // Mostra lo stato di connessione al server locale o al fallback di GitHub Pages
  async function checkDatabaseStatus() {
    const indicator = document.getElementById("dbStatusIndicator");
    const statusText = document.getElementById("dbStatusText");
    const adminServerDetails = document.getElementById("adminServerDetails");
    
    const active = await window.SerraAPI.isServerActive();
    
    if (active) {
      if (indicator) indicator.className = "db-status-bar online";
      if (statusText) statusText.innerHTML = "<strong>Connesso al database locale del Mac (Node.js)</strong>. Le modifiche al catalogo saranno salvate direttamente sul disco.";
      if (adminServerDetails) {
        adminServerDetails.innerHTML = "🟢 <strong>Server attivo su http://localhost:3000</strong>.<br>Il catalogo viene letto e scritto direttamente nel file <code>db/plants.json</code> del tuo computer.";
      }
    } else {
      if (indicator) indicator.className = "db-status-bar offline";
      if (statusText) statusText.innerHTML = "<strong>Modalità GitHub Pages (Offline Database)</strong>. Il catalogo piante viene letto dal repository, le scritture verranno salvate in locale su questo dispositivo.";
      if (adminServerDetails) {
        adminServerDetails.innerHTML = "🟡 <strong>Server locale non raggiungibile o protetto (Modalità statica)</strong>.<br>L'app è ospitata online. Le modifiche effettuate sono temporanee sul browser corrente tramite <code>localStorage</code>.";
      }
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
  function renderUserDashboard() {
    // Aggiorna currentUser con i dati più freschi dal DB per le notifiche
    const freshUser = allUsers.find(u => u.email === currentUser.email);
    if (freshUser) {
      currentUser = freshUser;
    }

    document.getElementById("userNameTitle").textContent = currentUser.nome;
    document.getElementById("userEmailSub").textContent = currentUser.email;

    // Popola campi profilo
    document.getElementById("profNome").value = currentUser.nome;
    document.getElementById("profTelefono").value = currentUser.telefono;
    document.getElementById("profIndirizzo").value = currentUser.indirizzo;
    document.getElementById("profCitta").value = currentUser.citta;
    document.getElementById("profCap").value = currentUser.cap;

    // Gestione banner notifiche
    const unread = (currentUser.notifications || []).filter(n => !n.read);
    const banner = document.getElementById("notificationBanner");
    const msgEl = document.getElementById("notificationMessage");
    if (banner && msgEl) {
      if (unread.length > 0) {
        msgEl.innerHTML = unread.map(n => n.message).join("<br>");
        banner.hidden = false;
      } else {
        banner.hidden = true;
      }
    }

    // Renderizza ordini utente
    renderUserOrders();
  }

  function renderUserOrders() {
    const listContainer = document.getElementById("userOrdersList");
    const emptyNote = document.getElementById("emptyOrdersNote");
    const table = document.getElementById("userOrdersTable");

    // Filtra ordini dell'utente corrente
    const myOrders = allOrders.filter(o => o.email === currentUser.email);

    if (myOrders.length === 0) {
      emptyNote.hidden = false;
      table.style.display = "none";
      return;
    }

    emptyNote.hidden = true;
    table.style.display = "table";
    listContainer.innerHTML = "";

    // Ordina i più recenti in alto
    myOrders.sort((a,b) => new Date(b.date) - new Date(a.date));

    myOrders.forEach(order => {
      const tr = document.createElement("tr");
      const dateStr = new Date(order.date).toLocaleDateString("it-IT", {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      const statusClass = order.status.toLowerCase().replace(" ", "-");
      
      let itemsListHtml = '<div class="order-items-flex">';
      // Ordina la lista dei prodotti alfabeticamente
      const sortedItems = [...order.items].sort((a, b) => a.nome.localeCompare(b.nome));
      sortedItems.forEach(it => {
        itemsListHtml += `
          <span class="order-item-pill" title="${it.nome}">
            <img src="${getPhotoSrc(it.id)}" class="order-item-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" />
            <span class="order-item-name">${it.nome}</span>
            <span class="order-item-qty">×${it.bustine}</span>
          </span>
        `;
      });
      itemsListHtml += '</div>';

      const trackingHtml = order.tracking 
        ? `<br><small style="display:block;margin-top:4px;color:#718096;white-space:nowrap;">📦 Tracking: <a href="https://www.google.com/search?q=${encodeURIComponent(order.tracking)}" target="_blank" style="color:var(--c-green,#2f6b3a);text-decoration:underline;font-weight:500;">${order.tracking}</a></small>` 
        : "";

      tr.innerHTML = `
        <td><strong>${order.id}</strong></td>
        <td>${dateStr}</td>
        <td>${itemsListHtml}</td>
        <td>€ ${parseFloat(order.total).toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${order.status}</span>${trackingHtml}</td>
        <td>
          <button class="btn btn-outline btn-small" onclick="printInvoice('${order.id}')" title="Stampa Ricevuta">🖨️ Stampa</button>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

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
    const filtered = allPlants.filter(p => 
      p.nome.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) ||
      (p.arch || "").toLowerCase().includes(query)
    );

    filtered.forEach(p => {
      const tr = document.createElement("tr");
      // Cerca il prezzo e i semi del pacchetto per quella pianta (fallback se non definito)
      const spacing = p.d || p.dr || 50;
      const categoryLabel = p.arch ? p.arch.toUpperCase() : "FOGLIA";
      const packPrice = p.prezzo || (window.PACK_DATA && window.PACK_DATA[p.id] ? window.PACK_DATA[p.id].price : 2.5);
      const packSeeds = p.semi || (window.PACK_DATA && window.PACK_DATA[p.id] ? window.PACK_DATA[p.id].seeds : 100);

      tr.innerHTML = `
        <td><img src="${getPhotoSrc(p.id)}" class="admin-plant-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" /></td>
        <td><code>${p.id}</code></td>
        <td><strong>${p.nome}</strong></td>
        <td><span class="badge-category">${categoryLabel}</span></td>
        <td>€ ${parseFloat(packPrice).toFixed(2)}</td>
        <td>${packSeeds} semi</td>
        <td>${p.gg || 90} giorni</td>
        <td>
          <div class="admin-table-actions">
            <button class="btn btn-outline btn-small" onclick="openPlantModal('edit', '${p.id}')">Modifica</button>
            <button class="btn btn-danger btn-small" onclick="handleDeletePlant('${p.id}')">Elimina</button>
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
    const sorted = [...allOrders].sort((a,b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(order => {
      const tr = document.createElement("tr");
      const dateStr = new Date(order.date).toLocaleDateString("it-IT", {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      const statusClass = order.status.toLowerCase().replace(" ", "-");
      
      let itemsListHtml = '<div class="order-items-flex">';
      // Ordina la lista dei prodotti alfabeticamente
      const sortedItems = [...order.items].sort((a, b) => a.nome.localeCompare(b.nome));
      sortedItems.forEach(it => {
        itemsListHtml += `
          <span class="order-item-pill" title="${it.nome}">
            <img src="${getPhotoSrc(it.id)}" class="order-item-photo" alt="" onerror="this.src='assets/img/svg/logo.svg'" />
            <span class="order-item-name">${it.nome}</span>
            <span class="order-item-qty">×${it.bustine}</span>
          </span>
        `;
      });
      itemsListHtml += '</div>';

      const statusOptions = ["In elaborazione", "Spedito", "Completato", "Annullato"];
      let selectHtml = `<select onchange="handleToggleOrderStatus('${order.id}', this.value)" style="padding: 6px 10px; border-radius: 8px; border: 1px solid var(--border-color, rgba(0,0,0,0.1)); background: var(--bg-input, #fff); color: var(--text-color, #333); font-size: 0.85rem; font-family: var(--font-sans); cursor: pointer;">`;
      statusOptions.forEach(opt => {
        const selected = order.status === opt ? "selected" : "";
        selectHtml += `<option value="${opt}" ${selected}>${opt}</option>`;
      });
      selectHtml += `</select>`;

      const trackingHtml = order.tracking 
        ? `<br><small style="display:block;margin-top:4px;color:#718096;white-space:nowrap;">📦 Tracking: <strong>${order.tracking}</strong></small>` 
        : "";

      tr.innerHTML = `
        <td><strong>${order.id}</strong></td>
        <td>
          <strong>${getUserNameByEmail(order.email)}</strong><br>
          <small>${order.email}</small>
        </td>
        <td>${dateStr}</td>
        <td>${itemsListHtml}</td>
        <td>€ ${parseFloat(order.total).toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${order.status}</span>${trackingHtml}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${selectHtml}
            <button class="btn btn-outline btn-small" onclick="printInvoice('${order.id}')" style="padding: 6px 12px; font-size: 0.85rem; font-weight: 500;">🖨️ Stampa</button>
            <button class="btn btn-danger btn-small" onclick="handleDeleteOrder('${order.id}')" style="padding: 6px 12px; font-size: 0.85rem; font-weight: 500;">Elimina</button>
          </div>
        </td>
      `;
      listContainer.appendChild(tr);
    });
  }

  window.handleDeleteOrder = async function (orderId) {
    if (confirm(`Sei sicuro di voler eliminare definitivamente l'ordine '${orderId}' dal database?`)) {
      allOrders = allOrders.filter(o => o.id !== orderId);
      await window.SerraAPI.saveOrders(allOrders);
      renderAdminOrdersList();
      updateAdminStats();
    }
  };

  window.handleDismissNotifications = async function () {
    if (!currentUser) return;
    const freshUser = allUsers.find(u => u.email === currentUser.email);
    if (freshUser) {
      (freshUser.notifications || []).forEach(n => n.read = true);
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
    const clientsCount = allUsers.filter(u => u.role !== 'admin').length;
    statsText.innerHTML = `
      • <strong>Piante in catalogo:</strong> ${allPlants.length}<br>
      • <strong>Clienti registrati:</strong> ${clientsCount}<br>
      • <strong>Ordini totali ricevuti:</strong> ${allOrders.length}
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
    
    allOrders.forEach(order => {
      if (order.status === "Annullato") return;
      order.items.forEach(it => {
        const plant = allPlants.find(p => p.id === it.id);
        const cat = (plant ? plant.arch : null) || "foglia";
        const price = it.prezzo || 2.5;
        const subtotal = it.bustine * price;
        if (categoryRevenues[cat] !== undefined) {
          categoryRevenues[cat] += subtotal;
        } else {
          categoryRevenues.foglia += subtotal; // fallback
        }
      });
    });
    
    const catLabels = {
      foglia: "Foglia",
      frutto: "Frutto",
      radice: "Radice",
      aromatica: "Aromatica/Fiore"
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
    
    const maxRev = Math.max(...revData.map(d => d.value), 10);
    
    let revSvg = `<svg viewBox="0 0 320 180" width="100%" height="100%">`;
    revData.forEach((d, i) => {
      const y = 15 + i * 40;
      const barWidth = maxRev > 0 ? (d.value / maxRev) * 160 : 0;
      revSvg += `
        <!-- Label -->
        <text x="10" y="${y + 13}" class="chart-label" font-weight="500">${d.label}</text>
        <!-- Background Bar -->
        <rect x="110" y="${y}" width="160" height="18" rx="4" fill="rgba(0,0,0,0.04)" />
        <!-- Value Bar -->
        <rect x="110" y="${y}" width="${barWidth}" height="18" rx="4" fill="${d.color}" class="chart-bar-rect" />
        <!-- Value Text -->
        <text x="${115 + barWidth}" y="${y + 13}" class="chart-value">€${d.value.toFixed(1)}</text>
      `;
    });
    revSvg += `</svg>`;
    revContainer.innerHTML = revSvg;
    
    // 2. Top 5 semi ordinati
    const cropCounts = {};
    allOrders.forEach(order => {
      if (order.status === "Annullato") return;
      order.items.forEach(it => {
        cropCounts[it.nome] = (cropCounts[it.nome] || 0) + it.bustine;
      });
    });
    
    const topCrops = Object.entries(cropCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ label: name, value: qty }));
      
    if (topCrops.length === 0) {
      topContainer.innerHTML = `<p style="font-size:0.9rem;color:#718096;text-align:center;margin-top:50px;">Nessun dato di vendita disponibile.</p>`;
      return;
    }
    
    const maxQty = Math.max(...topCrops.map(d => d.value), 1);
    let topSvg = `<svg viewBox="0 0 320 200" width="100%" height="100%">`;
    topCrops.forEach((d, i) => {
      const y = 15 + i * 36;
      const barWidth = (d.value / maxQty) * 150;
      // Trunca etichette lunghe
      const shortLabel = d.label.length > 12 ? d.label.substring(0, 11) + ".." : d.label;
      topSvg += `
        <!-- Label -->
        <text x="10" y="${y + 12}" class="chart-label" font-weight="500">${shortLabel}</text>
        <!-- Background Bar -->
        <rect x="110" y="${y}" width="150" height="16" rx="4" fill="rgba(0,0,0,0.04)" />
        <!-- Value Bar -->
        <rect x="110" y="${y}" width="${barWidth}" height="16" rx="4" fill="#2f6b3a" class="chart-bar-rect" />
        <!-- Value Text -->
        <text x="${115 + barWidth}" y="${y + 12}" class="chart-value">${d.value} bust.</text>
      `;
    });
    topSvg += `</svg>`;
    topContainer.innerHTML = topSvg;
  }

  window.handleClearOrders = async function () {
    if (confirm("Attenzione! Stai per eliminare TUTTI gli ordini presenti nel database. Questa azione non è reversibile. Procedere?")) {
      allOrders = [];
      await window.SerraAPI.saveOrders([]);
      renderAdminOrdersList();
      updateAdminStats();
      alert("Storico ordini svuotato con successo.");
    }
  };

  window.handleClearUsers = async function () {
    if (confirm("Attenzione! Stai per eliminare tutti i clienti registrati. Rimarrà attivo solo l'account amministratore di default. Procedere?")) {
      const adminOnly = allUsers.filter(u => u.role === 'admin');
      allUsers = adminOnly;
      await window.SerraAPI.saveUsers(adminOnly);
      updateAdminStats();
      alert("Database clienti ripristinato.");
    }
  };

  function renderAdminUsersList() {
    const listContainer = document.getElementById("adminUsersList");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    allUsers.forEach(user => {
      const tr = document.createElement("tr");
      
      const isSelf = user.email === currentUser.email;
      const deleteBtnHtml = isSelf
        ? `<span class="text-muted" style="font-size: 0.85rem; font-style: italic;">Loggato</span>`
        : `<button class="btn btn-danger btn-small" onclick="handleDeleteUser('${user.email}')" style="padding: 6px 12px;">Elimina</button>`;

      const roleLabel = user.role === 'admin' ? 'Amministratore' : 'Cliente';
      const roleClass = user.role === 'admin' ? 'admin' : 'user';

      tr.innerHTML = `
        <td><strong>${user.nome}</strong></td>
        <td><code>${user.email}</code></td>
        <td>${user.telefono || '-'}</td>
        <td>${user.indirizzo ? `${user.indirizzo}, ${user.cap} ${user.citta}` : '-'}</td>
        <td><span class="status-badge ${roleClass}">${roleLabel}</span></td>
        <td>${deleteBtnHtml}</td>
      `;
      listContainer.appendChild(tr);
    });
  }

  window.handleDeleteUser = async function (email) {
    if (confirm(`Sei sicuro di voler eliminare definitivamente l'utente con email '${email}'?\nI suoi ordini rimarranno associati al suo indirizzo come Cliente Occasionale.`)) {
      allUsers = allUsers.filter(u => u.email !== email);
      await window.SerraAPI.saveUsers(allUsers);
      renderAdminUsersList();
      updateAdminStats();
    }
  };

  function getUserNameByEmail(email) {
    const u = allUsers.find(user => user.email === email);
    return u ? u.nome : "Cliente Occasionale";
  }

  // --- AZIONI LOGIN / REGISTRAZIONE ---
  window.switchAuthTab = function (tab) {
    document.getElementById("tabLogin").classList.toggle("active", tab === 'login');
    document.getElementById("tabRegister").classList.toggle("active", tab === 'register');
    document.getElementById("loginForm").hidden = tab !== 'login';
    document.getElementById("registerForm").hidden = tab !== 'register';
  };

  window.handleLogin = async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const errorEl = document.getElementById("loginError");

    errorEl.hidden = true;

    // Cerca l'utente nel db locale
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      currentUser = user;
      localStorage.setItem("serra.current_user", JSON.stringify(user));
      renderView();
    } else {
      errorEl.textContent = "Email o Password non corrette.";
      errorEl.hidden = false;
    }
  };

  window.handleRegister = async function (e) {
    e.preventDefault();
    const nome = document.getElementById("regNome").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const telefono = document.getElementById("regTelefono").value.trim();
    const indirizzo = document.getElementById("regIndirizzo").value.trim();
    const citta = document.getElementById("regCitta").value.trim();
    const cap = document.getElementById("regCap").value.trim();
    const errorEl = document.getElementById("regError");

    errorEl.hidden = true;

    // Controlla se l'email esiste già
    if (allUsers.some(u => u.email === email)) {
      errorEl.textContent = "Questo indirizzo Email è già registrato.";
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
      errorEl.textContent = "Errore durante la registrazione. Riprova.";
      errorEl.hidden = false;
    }
  };

  window.handleUpdateProfile = async function (e) {
    e.preventDefault();
    const nome = document.getElementById("profNome").value.trim();
    const telefono = document.getElementById("profTelefono").value.trim();
    const indirizzo = document.getElementById("profIndirizzo").value.trim();
    const citta = document.getElementById("profCitta").value.trim();
    const cap = document.getElementById("profCap").value.trim();
    const successEl = document.getElementById("profileSuccess");

    successEl.hidden = true;

    // Trova l'utente corrente in allUsers e aggiorna i campi
    const index = allUsers.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      allUsers[index].nome = nome;
      allUsers[index].telefono = telefono;
      allUsers[index].indirizzo = indirizzo;
      allUsers[index].citta = citta;
      allUsers[index].cap = cap;

      const success = await window.SerraAPI.saveUsers(allUsers);
      if (success) {
        currentUser = allUsers[index];
        localStorage.setItem("serra.current_user", JSON.stringify(currentUser));
        successEl.hidden = false;
        setTimeout(() => successEl.hidden = true, 3000);
        renderView();
      }
    }
  };

  // --- AZIONI ADMIN TAB ---
  window.switchAdminTab = function (tab) {
    document.getElementById("btnTabAdminPlants").classList.toggle("active", tab === 'plants');
    document.getElementById("btnTabAdminOrders").classList.toggle("active", tab === 'orders');
    document.getElementById("btnTabAdminUsers").classList.toggle("active", tab === 'users');
    document.getElementById("btnTabAdminBackup").classList.toggle("active", tab === 'backup');
    
    document.getElementById("adminTabPlants").hidden = tab !== 'plants';
    document.getElementById("adminTabOrders").hidden = tab !== 'orders';
    document.getElementById("adminTabUsers").hidden = tab !== 'users';
    document.getElementById("adminTabBackup").hidden = tab !== 'backup';

    if (tab === 'backup') {
      updateAdminStats();
    }
  };

  // Modifica stato ordine (Admin)
  window.handleToggleOrderStatus = async function (orderId, nextStatus) {
    const index = allOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      const order = allOrders[index];
      order.status = nextStatus;
      
      let trackingMsg = "";
      if (nextStatus === "Spedito") {
        const trackingCode = prompt("Inserisci il codice di tracciamento della spedizione (opzionale):");
        if (trackingCode !== null && trackingCode.trim() !== "") {
          order.tracking = trackingCode.trim();
          trackingMsg = ` (Codice tracking: ${order.tracking})`;
        }
      }
      
      await window.SerraAPI.saveOrders(allOrders);
      
      // Accoda una notifica all'utente associato all'ordine
      const customer = allUsers.find(u => u.email === order.email);
      if (customer) {
        if (!customer.notifications) customer.notifications = [];
        customer.notifications.push({
          id: Date.now(),
          message: `Il tuo ordine <strong>${order.id}</strong> è ora nello stato <strong>${nextStatus}</strong>!${trackingMsg}`,
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
      allPlants.forEach(pOpt => {
        if (pOpt.id !== plantId) {
          selectAmiche.appendChild(new Option(`${pOpt.nome} (${pOpt.id})`, pOpt.id));
          selectNemiche.appendChild(new Option(`${pOpt.nome} (${pOpt.id})`, pOpt.id));
        }
      });
    }

    // Disabilita inserimento ID se modifica
    document.getElementById("editPlantId").disabled = action === 'edit';

    if (action === 'edit' && plantId) {
      title.textContent = "Modifica Coltura";
      const p = allPlants.find(x => x.id === plantId);
      if (p) {
        document.getElementById("editPlantId").value = p.id;
        document.getElementById("editPlantNome").value = p.nome;
        document.getElementById("editPlantCategory").value = p.arch || "foglia";
        document.getElementById("editPlantEmoji").value = p.emoji || fruitEmoji(p.id) || "🌿";
        
        const photoVal = p.foto || "";
        document.getElementById("editPlantFoto").value = photoVal;
        updateModalPhotoPreview(photoVal, p.id);
        
        const price = p.prezzo || (window.PACK_DATA && window.PACK_DATA[p.id] ? window.PACK_DATA[p.id].price : 2.5);
        const seeds = p.semi || (window.PACK_DATA && window.PACK_DATA[p.id] ? window.PACK_DATA[p.id].seeds : 100);

        document.getElementById("editPlantPrice").value = price;
        document.getElementById("editPlantSeeds").value = seeds;
        document.getElementById("editPlantMaturity").value = p.gg || 90;
        document.getElementById("editPlantSpacing").value = p.d || p.dr || 50;

        // Imposta i mesi selezionati
        const selectMonths = document.getElementById("editPlantMonths");
        Array.from(selectMonths.options).forEach(opt => {
          opt.selected = p.mesi.includes(parseInt(opt.value));
        });

        // Imposta le consociazioni selezionate
        const pAmiche = p.amiche || [];
        const pNemiche = p.nemiche || [];
        if (selectAmiche && selectNemiche) {
          Array.from(selectAmiche.options).forEach(opt => {
            opt.selected = pAmiche.includes(opt.value);
          });
          Array.from(selectNemiche.options).forEach(opt => {
            opt.selected = pNemiche.includes(opt.value);
          });
        }
      }
    } else {
      title.textContent = "Aggiungi nuova pianta";
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
    const id = document.getElementById("editPlantId").value.trim().toLowerCase();
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
    const amiche = selectAmiche ? Array.from(selectAmiche.selectedOptions).map(opt => opt.value) : [];
    const nemiche = selectNemiche ? Array.from(selectNemiche.selectedOptions).map(opt => opt.value) : [];

    // Leggi mesi selezionati
    const selectMonths = document.getElementById("editPlantMonths");
    const mesi = Array.from(selectMonths.selectedOptions).map(opt => parseInt(opt.value));

    if (action === 'new') {
      // Controlla se ID esiste già
      if (allPlants.some(p => p.id === id)) {
        alert("Una pianta con questo ID esiste già!");
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
      const index = allPlants.findIndex(p => p.id === id);
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
    if (confirm(`Sei sicuro di voler eliminare la pianta '${plantId}' dal catalogo?`)) {
      allPlants = allPlants.filter(p => p.id !== plantId);
      await window.SerraAPI.savePlants(allPlants);
      renderAdminPlantsList();
    }
  };

  // --- OPERAZIONI BACKUP (ADMIN) ---
  window.resetCatalogToDefault = async function () {
    if (confirm("Attenzione! Ripristinando il catalogo di fabbrica, eliminerai tutte le piante inserite o modificate. Procedere?")) {
      // Invia array vuoto o resetta tramite rimozione
      localStorage.removeItem("serra.custom_plants");
      
      const serverActive = await window.SerraAPI.isServerActive();
      if (serverActive) {
        // Se il server è attivo, sovrascriviamo plants.json con l'array iniziale
        // Per farlo, possiamo ricaricare dal file plants-data.js (che è ancora in memoria)
        // Ma per sicurezza, cancelliamo plants.json o inviamo il catalogo iniziale originale di plants-data.js
        const originalPlants = window.PLANTS; // this was loaded inside index/configuratore but overridden.
        // Wait, window.PLANTS was overridden at start! So let's load a default list
        // Se window.PLANTS è già stato modificato all'avvio, possiamo fare un reload pulito
        // Per evitare problemi, basta dire all'utente che il localStorage è stato ripulito e ricaricare la pagina.
        // Se c'era un file sul Mac, per pulirlo basta inviare una richiesta per ripristinare.
        // Scriviamo un array vuoto così rileverà il default
        await window.SerraAPI.savePlants([]);
      }
      
      alert("Catalogo ripristinato. La pagina verrà ricaricata.");
      window.location.reload();
    }
  };

  window.exportDatabaseJson = function () {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allPlants, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "orto_in_serra_catalogo.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper per emoji frutti di backup se manca
  function fruitEmoji(plantId) {
    const emojis = {
      pomodoro: "🍅", peperone: "🫑", peperoncino: "🌶️", melanzana: "🍆",
      zucchina: "🥒", zucca: "🎃", cetriolo: "🥒", melone: "🍈",
      anguria: "🍉", lattuga: "🥬", radicchio: "🥬", rucola: "🌿",
      spinaci: "🥬", bietola: "🥬", cavolo: "🥦", verza: "🥬",
      broccolo: "🥦", cavolfiore: "🥦", finocchio: "🌱", sedano: "🌿",
      prezzemolo: "🌿", basilico: "🌿", aglio: "🧄", cipolla: "🧅",
      porro: "🌱", carota: "🥕", ravanello: "🍒", patata: "🥔",
      fagiolo: "🫘", fagiolino: "🌱", pisello: "🫛", fave: "🌱"
    };
    return emojis[plantId] || "🌿";
  }

  const PHOTO_MAP = {
    bietola: "bietola_coste.webp",
    cavolo: "cavolo_cappuccio.webp",
    cavolonero: "cavolo_nero.webp",
    cavolorapa: "cavolo_rapa.webp",
    cavoletti: "cavoletti_bruxelles.webp",
    coriandolo: "coriandolo.webp",
    fagiolino: "fagiolino_nano.webp",
    fagiolo: "fagiolo_rampicante.webp",
    indivia: "indivia_scarola.webp",
    origano: "origano.webp",
    pakchoi: "pak_choi.webp"
  };

  function getPhotoSrc(id) {
    const plantObj = allPlants.find(p => p.id === id);
    if (plantObj && plantObj.foto) {
      if (plantObj.foto.startsWith("http://") || plantObj.foto.startsWith("https://") || plantObj.foto.startsWith("data:")) {
        return plantObj.foto;
      }
      if (plantObj.foto.includes("/")) {
        return plantObj.foto;
      }
      return `assets/img/photo/${plantObj.foto}`;
    }
    return `assets/img/photo/${PHOTO_MAP[id] || id + ".webp"}`;
  }

  function updateModalPhotoPreview(val, plantId) {
    const previewImg = document.getElementById("editPlantFotoPreview");
    if (!previewImg) return;
    let src = "assets/img/svg/logo.svg";
    if (val) {
      if (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:")) {
        src = val;
      } else if (val.includes("/")) {
        src = val;
      } else {
        src = `assets/img/photo/${val}`;
      }
    } else if (plantId) {
      src = `assets/img/photo/${PHOTO_MAP[plantId] || plantId + ".webp"}`;
    }
    previewImg.src = src;
  }

  window.printInvoice = function (orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
      alert("Ordine non trovato!");
      return;
    }
    
    // Cerca l'utente per recuperare i dettagli di spedizione
    const user = allUsers.find(u => u.email === order.email) || {
      nome: "Cliente Occasionale",
      email: order.email,
      phone: "-",
      indirizzo: "-"
    };
    
    const dateStr = new Date(order.date).toLocaleDateString("it-IT", {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    let tableRowsHtml = "";
    order.items.forEach(it => {
      const itemPrice = it.prezzo || 2.5;
      const rowSubtotal = parseFloat(itemPrice * it.bustine).toFixed(2);
      tableRowsHtml += `
        <tr>
          <td><strong>${it.nome}</strong><br><small>Codice: ${it.id}</small></td>
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
        <div>
          <h1 class="invoice-title">Orto in Serra</h1>
          <p style="margin: 4px 0; color: #777;">Soluzioni Botaniche Professionali</p>
        </div>
        <div class="invoice-meta">
          <strong>RICEVUTA D'ORDINE</strong><br>
          Numero: <strong>${order.id}</strong><br>
          Data: ${dateStr}<br>
          Stato: <strong>${order.status.toUpperCase()}</strong>
        </div>
      </div>
      
      <div class="invoice-details">
        <div class="invoice-block">
          <h4>Mittente</h4>
          <p><strong>Orto in Serra S.r.l.</strong></p>
          <p>Via delle Serre, 42</p>
          <p>50023 Impruneta (FI)</p>
          <p>P.IVA: 07123456789</p>
          <p>Email: info@ortoinserra.it</p>
        </div>
        <div class="invoice-block">
          <h4>Destinatario Spedizione</h4>
          <p><strong>${user.nome}</strong></p>
          <p>Email: ${user.email}</p>
          <p>Tel: ${user.phone || "-"}</p>
          <p>Indirizzo: ${user.indirizzo || "-"}</p>
        </div>
      </div>
      
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Descrizione Prodotto (Semi)</th>
            <th class="text-right">Quantità (Bustine)</th>
            <th class="text-right">Prezzo Unitario</th>
            <th class="text-right">Subtotale</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
      
      <div class="invoice-summary">
        <div class="invoice-summary-box">
          <div class="invoice-summary-row">
            <span>Imponibile:</span>
            <span>€ ${parseFloat(order.total / 1.22).toFixed(2)}</span>
          </div>
          <div class="invoice-summary-row">
            <span>IVA (22%):</span>
            <span>€ ${parseFloat(order.total - (order.total / 1.22)).toFixed(2)}</span>
          </div>
          <div class="invoice-summary-row total">
            <span>Totale Ricevuta:</span>
            <span>€ ${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div class="invoice-footer">
        <p>Grazie per aver acquistato da Orto in Serra! Per qualsiasi domanda scrivi a assistenza@ortoinserra.it</p>
        <p><small>Documento valido come ricevuta d'acquisto telematica. IVA assolta all'origine.</small></p>
      </div>
    `;
    
    // Esegui la stampa nativa del browser
    window.print();
  };
})();
