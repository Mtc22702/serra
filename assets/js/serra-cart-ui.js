/* Il cassetto del carrello, disegnato una volta sola per tutta l'app. */
(function (global) {
  "use strict";

  /* Regole commerciali della merce viva. */
  const CONSEGNA = {
    giornoSpedizione: 1, // lunedì
    anticipoMinimoGiorni: 2, // ordini raccolti fino a due giorni prima
    transitoGiorni: 1, // consegna il giorno dopo la partenza
    vassoiMinimi: 2
  };

  const COPY = {
    it: {
      "sum.packs": "BUSTINE",
      "sum.plugs": "PIANTINE",
      "sum.trays": "VASSOI",
      "group.seeds": "Semi",
      "group.plugs": "Piantine",
      "group.seeds_meta_one": "1 bustina",
      "group.seeds_meta": "{n} bustine",
      "group.plugs_meta_one": "1 vassoio",
      "group.plugs_meta": "{n} vassoi",
      "row.pack_one": "1 bustina",
      "row.pack": "{n} bustine",
      "row.seeds_per_pack": "{n} semi",
      "row.per_pack": " a bustina",
      "row.plugs": "{n} piantine",
      "row.plugs_unit": "vaso ø7",
      "row.per_plug": " a piantina",
      "row.tag_plug": "piantina",
      "row.plugs_hint": "Già cresciuta, pronta da mettere a dimora",
      "qty.label": "Quantità",
      "qty.less_pack": "Togli una bustina",
      "qty.more_pack": "Aggiungi una bustina",
      "qty.less_tray": "Togli un vassoio",
      "qty.more_tray": "Aggiungi un vassoio",
      "row.remove": "Togli dal carrello",
      "row.remove_short": "Rimuovi",
      "undo.removed": "{nome} tolta dal carrello",
      "undo.cleared": "Carrello svuotato",
      "undo.action": "Annulla",
      "note.delivery": "Consegna prevista <b>{data}</b>",
      "note.min_one": "Manca un vassoio all'ordine minimo",
      "note.min": "Mancano {n} vassoi all'ordine minimo",
      "note.together": "Semi e piantine partono con lo stesso ordine.",
      "cross.to_plugs_title": "Vuoi guadagnare settimane?",
      "cross.to_plugs_text":
        "Alcune di queste colture esistono già cresciute: arrivano pronte da mettere a dimora.",
      "cross.to_seeds_title": "Ti servono anche i semi?",
      "cross.to_seeds_text":
        "Le colture che si seminano bene restano più economiche: partono dal catalogo semi.",
      "total.label": "Totale orientativo",
      "total.materials": "Materiali",
      "total.seeds": "Semi e piantine",
      "total.grand": "Totale ordine"
    },
    ro: {
      "sum.packs": "PLICURI",
      "sum.plugs": "RĂSADURI",
      "sum.trays": "TĂVI",
      "group.seeds": "Semințe",
      "group.plugs": "Răsaduri",
      "group.seeds_meta_one": "un plic",
      "group.seeds_meta": "{n} plicuri",
      "group.plugs_meta_one": "o tavă",
      "group.plugs_meta": "{n} tăvi",
      "row.pack_one": "un plic",
      "row.pack": "{n} plicuri",
      "row.seeds_per_pack": "{n} semințe",
      "row.per_pack": " per plic",
      "row.plugs": "{n} răsaduri",
      "row.plugs_unit": "ghiveci ø7",
      "row.per_plug": " per răsad",
      "row.tag_plug": "răsad",
      "row.plugs_hint": "Deja crescut, gata de pus în pământ",
      "qty.label": "Cantitate",
      "qty.less_pack": "Scoate un plic",
      "qty.more_pack": "Adaugă un plic",
      "qty.less_tray": "Scoate o tavă",
      "qty.more_tray": "Adaugă o tavă",
      "row.remove": "Scoate din coș",
      "row.remove_short": "Scoate",
      "undo.removed": "{nome} scos din coș",
      "undo.cleared": "Coș golit",
      "undo.action": "Anulează",
      "note.delivery": "Livrare estimată <b>{data}</b>",
      "note.min_one": "Mai lipsește o tavă până la comanda minimă",
      "note.min": "Mai lipsesc {n} tăvi până la comanda minimă",
      "note.together": "Semințele și răsadurile pleacă în aceeași comandă.",
      "cross.to_plugs_title": "Vrei să câștigi săptămâni?",
      "cross.to_plugs_text":
        "Unele dintre aceste culturi există deja crescute: ajung gata de pus în pământ.",
      "cross.to_seeds_title": "Îți trebuie și semințe?",
      "cross.to_seeds_text":
        "Culturile care se seamănă ușor rămân mai ieftine: pleacă din catalogul de semințe.",
      "total.label": "Total orientativ",
      "total.materials": "Materiale",
      "total.seeds": "Semințe și răsaduri",
      "total.grand": "Total comandă"
    }
  };

  const lingua = (valore) => (String(valore || "it").startsWith("ro") ? "ro" : "it");

  function testo(lang, chiave, vars) {
    const L = lingua(lang);
    let valore = COPY[L][chiave] ?? COPY.it[chiave] ?? chiave;
    if (vars)
      Object.keys(vars).forEach((k) => {
        valore = valore.split("{" + k + "}").join(vars[k]);
      });
    return valore;
  }

  const escape = (valore) =>
    String(valore == null ? "" : valore).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        })[c]
    );

  function prossimaConsegna(oggi) {
    const giorno = oggi ? new Date(oggi) : new Date();
    giorno.setHours(0, 0, 0, 0);
    giorno.setDate(giorno.getDate() + CONSEGNA.anticipoMinimoGiorni);
    for (let i = 0; i < 14; i++) {
      if (giorno.getDay() === CONSEGNA.giornoSpedizione) break;
      giorno.setDate(giorno.getDate() + 1);
    }
    giorno.setDate(giorno.getDate() + CONSEGNA.transitoGiorni);
    return giorno;
  }

  const dataEstesa = (data, lang) =>
    data.toLocaleDateString(lingua(lang) === "ro" ? "ro-RO" : "it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

  const C = () => global.SerraCart;
  const isPiantina = (riga) =>
    C() ? C().isPiantina(riga) : !!riga && riga.variante === "piantina";
  const quantita = (riga) =>
    C()
      ? C().quantita(riga)
      : Number(riga.qta) || Number(riga.bustine) || 0;
  /* Il passo minimo della riga: una bustina per i semi, un vassoio intero per le piantine. */
  const passoRiga = (riga) =>
    C() ? C().passo(riga) : isPiantina(riga) ? Number(riga.lotto) || 6 : 1;

  /* ---------- pezzi del cassetto ---------- */

  // Una riga di prodotto: foto, identità, quantità regolabile, prezzo.
  function rigaHtml(riga, ctx) {
    const id = riga.id;
    const piantina = isPiantina(riga);
    const qta = quantita(riga);
    const prezzo = piantina
      ? Number(riga.prezzo) || 0
      : Number(ctx.prezzoBustina(id)) || 0;
    const nome = ctx.nome(id);
    if (!nome) return "";
    const foto = ctx.foto(id);
    const t = (k, v) => testo(ctx.lang, k, v);

    const dettaglio = piantina
      ? `${t("row.plugs", { n: qta })} · ${t("row.plugs_unit")}`
      : `${qta === 1 ? t("row.pack_one") : t("row.pack", { n: qta })} · ${t(
          "row.seeds_per_pack",
          { n: ctx.semiPerBustina(id) }
        )}`;
    const sottotitolo = piantina ? t("row.plugs_hint") : ctx.nota(id) || "";
    const variante = piantina ? "piantina" : "seme";
    const meno = piantina ? t("qty.less_tray") : t("qty.less_pack");
    const piu = piantina ? t("qty.more_tray") : t("qty.more_pack");
    const bersaglio = `${ctx.attr}="{azione}" data-plant-id="${escape(id)}" data-variante="${variante}"`;

    return `<div class="cart-item${piantina ? " cart-item--piantina" : ""}">
        ${
          foto
            ? `<img src="${escape(foto)}" alt="" loading="lazy" decoding="async" />`
            : `<span class="cart-item-glyph" aria-hidden="true">${piantina ? "🪴" : "🌿"}</span>`
        }
        <span class="cart-item-copy">
          <span class="cart-item-name">${escape(nome)}${
            piantina
              ? ` <em class="cart-item-tag">${t("row.tag_plug")}</em>`
              : ""
          }</span>
          <span class="cart-item-meta">${escape(sottotitolo)}</span>
          <span class="cart-item-pack">
            <span>${dettaglio}</span>
            <b>${ctx.soldi(prezzo)}${piantina ? t("row.per_plug") : t("row.per_pack")}</b>
          </span>
        </span>
        <!-- Rimozione e quantità stanno su una riga propria, ai due capi
             opposti. Prima la ✕ era 18 × 24 px e stava sette pixel sotto al
             «+»: i loro centri distavano 41 px, meno di quanto sia largo un
             polpastrello, quindi un tocco solo li copriva entrambi e quale
             vincesse lo decideva il caso. Adesso fra i due c'è la larghezza
             della riga, e la parola dice cosa succede — la ✕ da sola poteva
             anche voler dire «chiudi». -->
        <button type="button" class="cart-item-remove" ${bersaglio.replace("{azione}", "remove-from-cart")} aria-label="${escape(t("row.remove"))}" title="${escape(t("row.remove"))}">${t("row.remove_short")}</button>
        <span class="cart-item-qty" role="group" aria-label="${escape(t("qty.label"))}">
          <button type="button" class="cart-qty-btn" ${bersaglio.replace("{azione}", "cart-qty-less")} aria-label="${escape(meno)}" title="${escape(meno)}"${qta <= passoRiga(riga) ? " disabled" : ""}>−</button>
          <b class="cart-qty-value">${qta}</b>
          <button type="button" class="cart-qty-btn" ${bersaglio.replace("{azione}", "cart-qty-more")} aria-label="${escape(piu)}" title="${escape(piu)}">+</button>
        </span>
      </div>`;
  }

  /* Riepilogo in cima. */
  function riepilogoHtml(semi, piantine, ctx) {
    const t = (k, v) => testo(ctx.lang, k, v);
    const bustine = semi.reduce((n, r) => n + quantita(r), 0);
    const pezzi = piantine.reduce((n, r) => n + quantita(r), 0);
    const vassoi = C() ? C().vassoi(piantine) : 0;
    const voci = [];
    if (bustine) voci.push({ n: bustine, label: t("sum.packs") });
    if (pezzi) {
      voci.push({ n: pezzi, label: t("sum.plugs") });
      voci.push({ n: vassoi, label: t("sum.trays") });
    }
    if (voci.length < 2) return "";
    return `<div class="cart-summary">${voci
      .map((v) => `<span><b>${v.n}</b><small>${v.label}</small></span>`)
      .join("")}</div>`;
  }

  /* Note della merce viva: seguono le piantine, non la pagina. */
  function notePiantineHtml(piantine, ctx) {
    if (!piantine.length) return "";
    const t = (k, v) => testo(ctx.lang, k, v);
    const vassoi = C() ? C().vassoi(piantine) : 0;
    const mancanti = Math.max(0, CONSEGNA.vassoiMinimi - vassoi);
    const consegna = dataEstesa(prossimaConsegna(), ctx.lang);
    return `<p class="cart-note">
        <span aria-hidden="true">🚚</span>
        <span>${t("note.delivery", { data: consegna })}</span>
      </p>${
        mancanti
          ? `<p class="cart-note cart-note--warn">
        <span aria-hidden="true">⚠️</span>
        <span>${mancanti === 1 ? t("note.min_one") : t("note.min", { n: mancanti })}</span>
      </p>`
          : ""
      }`;
  }

  function crossHtml(semi, piantine, ctx) {
    if (!semi.length === !piantine.length) return "";
    const t = (k) => testo(ctx.lang, k);
    const versoVivaio = semi.length && !piantine.length;
    const href = versoVivaio ? ctx.hrefPiantine : ctx.hrefSemi;
    if (!href) return "";
    return `<a class="cart-cross" href="${escape(href)}" ${ctx.attr}="cross-sell">
        <span class="cart-cross-ico" aria-hidden="true">${versoVivaio ? "🪴" : "🌿"}</span>
        <span class="cart-cross-copy">
          <b>${t(versoVivaio ? "cross.to_plugs_title" : "cross.to_seeds_title")}</b>
          <small>${t(versoVivaio ? "cross.to_plugs_text" : "cross.to_seeds_text")}</small>
        </span>
        <span class="cart-cross-arrow" aria-hidden="true">→</span>
      </a>`;
  }

  // Intestazione di gruppo: serve solo a separare due famiglie compresenti.
  function gruppoHtml(righe, ctx, tipo, doppio) {
    if (!righe.length) return "";
    const t = (k, v) => testo(ctx.lang, k, v);
    const piantine = tipo === "piantine";
    let intestazione = "";
    if (doppio) {
      const n = piantine
        ? C()
          ? C().vassoi(righe)
          : 0
        : righe.reduce((somma, r) => somma + quantita(r), 0);
      const meta =
        n === 1
          ? t(piantine ? "group.plugs_meta_one" : "group.seeds_meta_one")
          : t(piantine ? "group.plugs_meta" : "group.seeds_meta", { n });
      intestazione = `<div class="cart-group-head">
          <span class="cart-group-name"><span aria-hidden="true">${piantine ? "🪴" : "🌿"}</span>${t(
            piantine ? "group.plugs" : "group.seeds"
          )}</span>
          <span class="cart-group-meta">${meta}</span>
        </div>`;
    }
    const corpo = righe.map((r) => rigaHtml(r, ctx)).join("");
    return `<div class="cart-group cart-group--${tipo}">${intestazione}${corpo}${
      piantine ? notePiantineHtml(righe, ctx) : ""
    }</div>`;
  }

  /* Disegna il corpo del cassetto. */
  function corpo(ctx) {
    const righe = Array.isArray(ctx.righe) ? ctx.righe : [];
    const note = righe.filter((r) => ctx.nome(r.id));
    const semi = note.filter((r) => !isPiantina(r));
    const piantine = note.filter(isPiantina);
    const doppio = !!semi.length && !!piantine.length;
    const t = (k, v) => testo(ctx.lang, k, v);

    const totaleProdotti =
      Math.round(
        note.reduce(
          (somma, r) =>
            somma +
            (isPiantina(r)
              ? Number(r.prezzo) || 0
              : Number(ctx.prezzoBustina(r.id)) || 0) *
              quantita(r),
          0
        ) * 100
      ) / 100;
    const extraTotale = Number(ctx.extraTotale) || 0;

    const totaleHtml = extraTotale
      ? `<div class="cart-total-row cart-total-row--sub">
          <span>${t("total.seeds")}</span><b>${ctx.soldi(totaleProdotti)}</b>
        </div>
        <div class="cart-total-row cart-total-row--sub">
          <span>${ctx.extraLabel || t("total.materials")}</span><b>${ctx.soldi(extraTotale)}</b>
        </div>
        <div class="cart-total-row">
          <span>${t("total.grand")}</span><b>${ctx.soldi(totaleProdotti + extraTotale)}</b>
        </div>`
      : `<div class="cart-total-row">
          <span>${t("total.label")}</span><b>${ctx.soldi(totaleProdotti)}</b>
        </div>`;

    return (
      riepilogoHtml(semi, piantine, ctx) +
      gruppoHtml(semi, ctx, "semi", doppio) +
      gruppoHtml(piantine, ctx, "piantine", doppio) +
      (doppio ? `<p class="cart-note">${t("note.together")}</p>` : "") +
      crossHtml(semi, piantine, ctx) +
      (ctx.extraHtml || "") +
      totaleHtml
    );
  }


  let nodo = null;
  let timer = 0;
  let azione = null;

  function chiudi() {
    azione = null;
    clearTimeout(timer);
    if (nodo) nodo.classList.remove("is-on");
  }

  function costruisci() {
    if (nodo) return nodo;
    nodo = global.document.createElement("div");
    nodo.className = "cart-undo";
    nodo.setAttribute("role", "status");
    nodo.innerHTML =
      '<span class="cart-undo-text"></span>' +
      '<button type="button" class="cart-undo-action"></button>';
    nodo.querySelector(".cart-undo-action").addEventListener("click", () => {
      const ripristina = azione;
      chiudi();
      if (ripristina) ripristina();
    });
    // Il tempo si ferma finché l'utente è lì sopra: sta decidendo.
    const sospendi = () => clearTimeout(timer);
    const riprendi = () => {
      if (azione) timer = setTimeout(chiudi, 3200);
    };
    nodo.addEventListener("pointerenter", sospendi);
    nodo.addEventListener("focusin", sospendi);
    nodo.addEventListener("pointerleave", riprendi);
    nodo.addEventListener("focusout", riprendi);
    global.document.body.appendChild(nodo);
    return nodo;
  }

  function annullabile(opzioni) {
    const conf = opzioni || {};
    if (typeof conf.onAnnulla !== "function") return;
    const el = costruisci();
    el.querySelector(".cart-undo-text").textContent = conf.testo || "";
    el.querySelector(".cart-undo-action").textContent =
      conf.etichetta || "Annulla";
    azione = conf.onAnnulla;
    el.classList.add("is-on");
    clearTimeout(timer);
    // Sette secondi: il tempo di accorgersi dell'errore e di arrivarci sopra.
    timer = setTimeout(chiudi, conf.durata || 7000);
  }

  global.SerraCartUI = {
    CONSEGNA,
    COPY,
    testo,
    corpo,
    rigaHtml,
    prossimaConsegna,
    dataEstesa,
    annullabile,
    chiudiAnnulla: chiudi
  };
})(window);
