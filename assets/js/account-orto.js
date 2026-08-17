/* Ponte tra gli ordini dell'Area Personale e la sezione "Il mio orto". */
(() => {
  const INVENTORY_KEY = "serra.inventory.v1";
  const card = document.getElementById("accountToPlantCard");
  if (!card) return;

  const COPY = {
    it: {
      kicker: "Dagli acquisti all'orto",
      title: "Semi e piantine da piantare",
      hint: "Porta ciò che hai comprato ne “Il mio orto”: sceglierai quante piante avviare e in che data, anche poche per volta.",
      empty:
        "Quando un ordine è confermato, i suoi semi e le sue piantine compaiono qui.",
      order: "Ordine {id}",
      add: "Aggiungi a Il mio orto",
      added: "Già nell'orto",
      open: "Apri Il mio orto",
      unit_seed: "{n} bustine",
      unit_plug: "{n} piantine",
      done: "{n} voci aggiunte: scegli tu quando piantarle"
    },
    ro: {
      kicker: "De la achiziții la grădină",
      title: "Semințe și răsaduri de plantat",
      hint: "Adaugă ce ai cumpărat în „Grădina mea”: vei alege câte plante pornești și la ce dată, chiar și câteva pe rând.",
      empty:
        "Când o comandă este confirmată, semințele și răsadurile ei apar aici.",
      order: "Comanda {id}",
      add: "Adaugă în Grădina mea",
      added: "Deja în grădină",
      open: "Deschide Grădina mea",
      unit_seed: "{n} plicuri",
      unit_plug: "{n} răsaduri",
      done: "{n} poziții adăugate: alegi tu când le plantezi"
    }
  };

  const lang = () =>
    (document.documentElement.lang || "it").startsWith("ro") ? "ro" : "it";
  function t(key, vars) {
    let value = COPY[lang()][key] || COPY.it[key] || key;
    if (vars)
      Object.keys(vars).forEach((k) => {
        value = value.split("{" + k + "}").join(vars[k]);
      });
    return value;
  }
  const escape = (s) =>
    typeof window.escapeHtml === "function"
      ? window.escapeHtml(s)
      : String(s).replace(
          /[&<>"']/g,
          (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
        );

  function readInventory() {
    try {
      const raw = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "null");
      if (raw && Array.isArray(raw.voci)) return raw;
    } catch (_) {}
    return { voci: [] };
  }
  function writeInventory(data) {
    try {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  const voceId = (orderId, itemId, variante) => `${orderId}|${itemId}|${variante}`;
  const variantOf = (item) => (item.variante === "piantina" ? "piantina" : "seme");

  let ordiniUtente = [];

  async function carica() {
    const utente = window.SerraAPI?.getCurrentUser?.();
    if (!utente) {
      card.hidden = true;
      return;
    }
    let ordini = [];
    try {
      ordini = (await window.SerraAPI.getOrders()) || [];
    } catch (_) {
      ordini = [];
    }
    ordiniUtente = ordini
      .filter((o) => o.email === utente.email && (o.items || []).length)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .slice(0, 6);
    disegna();
  }

  function disegna() {
    const inventario = readInventory();
    const presenti = new Set(inventario.voci.map((v) => v.id));

    const righe = ordiniUtente
      .map((ordine) => {
        const items = (ordine.items || []).filter((i) => i && i.id);
        if (!items.length) return "";
        const tutteAggiunte = items.every((i) =>
          presenti.has(voceId(ordine.id, i.id, variantOf(i)))
        );
        const elenco = items
          .map((i) => {
            const q = Number(i.bustine) || 1;
            const unita =
              variantOf(i) === "piantina"
                ? t("unit_plug", { n: q })
                : t("unit_seed", { n: q });
            return `<li><b>${escape(i.nome || i.id)}</b> <span>${unita}</span></li>`;
          })
          .join("");
        return `
          <div class="toplant-order">
            <div class="toplant-order-head">
              <span class="toplant-order-id">${t("order", { id: escape(ordine.id) })}</span>
              <span class="toplant-order-date">${
                ordine.date ? new Date(ordine.date).toLocaleDateString(
                  lang() === "ro" ? "ro-RO" : "it-IT",
                  { day: "numeric", month: "long", year: "numeric" }
                ) : ""
              }</span>
            </div>
            <ul class="toplant-items">${elenco}</ul>
            <button
              class="btn btn-small ${tutteAggiunte ? "btn-outline" : ""}"
              type="button"
              data-toplant-order="${escape(ordine.id)}"
              ${tutteAggiunte ? "disabled" : ""}
            >${tutteAggiunte ? t("added") : t("add")}</button>
          </div>`;
      })
      .join("");

    card.innerHTML = `
      <div class="dashboard-card-heading dashboard-card-heading--row">
        <div>
          <span class="account-section-kicker">${t("kicker")}</span>
          <h3>${t("title")}</h3>
          <p>${t("hint")}</p>
        </div>
        <a class="btn btn-outline btn-small account-card-link" href="orto.html#da-piantare"
          >${t("open")}</a>
      </div>
      ${righe || `<div class="empty-orders-note">${t("empty")}</div>`}`;
    card.hidden = false;
  }

  // Crea le voci mancanti della dispensa: idempotente, non tocca gli ordini.
  function aggiungi(orderId) {
    const ordine = ordiniUtente.find((o) => o.id === orderId);
    if (!ordine) return;
    const inventario = readInventory();
    const presenti = new Set(inventario.voci.map((v) => v.id));
    let aggiunte = 0;
    (ordine.items || []).forEach((item) => {
      const variante = variantOf(item);
      const id = voceId(ordine.id, item.id, variante);
      if (presenti.has(id)) return;
      inventario.voci.push({
        id,
        plantId: item.id,
        variante,
        qta: Number(item.bustine) || 1,
        qtaPiantata: 0,
        semine: 0,
        orderId: ordine.id,
        dataAcquisto: (ordine.date || "").slice(0, 10),
        archiviata: false
      });
      aggiunte++;
    });
    if (!aggiunte) return;
    writeInventory(inventario);
    disegna();
    const nota = document.createElement("div");
    nota.className = "toplant-feedback";
    nota.textContent = t("done", { n: aggiunte });
    card.appendChild(nota);
    setTimeout(() => nota.remove(), 3200);
  }

  card.addEventListener("click", (event) => {
    const button = event.target.closest("[data-toplant-order]");
    if (button && !button.disabled) aggiungi(button.dataset.toplantOrder);
  });

  // account.js aggiorna `lang` sul documento quando l'utente cambia lingua.
  new MutationObserver(() => {
    if (!card.hidden) disegna();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  // La dashboard compare solo dopo l'accesso: si attende che sia visibile.
  const dashboard = document.getElementById("userDashboardSection");
  if (dashboard) {
    new MutationObserver(() => {
      if (!dashboard.hidden) carica();
    }).observe(dashboard, { attributes: true, attributeFilter: ["hidden"] });
    if (!dashboard.hidden) carica();
  }
  setTimeout(carica, 900);
})();
