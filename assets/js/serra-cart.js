/**
 * Carrello unico dell'utente.
 *
 * Semi e piantine vivono nella stessa lista (`ois.cart`), indipendentemente
 * dalla sezione in cui sono stati aggiunti: un solo carrello, un solo ordine.
 *
 * Formati delle righe:
 *   semi      { id, bustine }                       ← formato storico, invariato
 *   piantine  { id, variante:"piantina", qta, bustine, prezzo, unita, lotto }
 *
 * Le righe piantina portano anche `bustine` (uguale a `qta`) perché il codice
 * più vecchio che non conosce le varianti legge quel campo: così mostra una
 * quantità sensata invece di NaN.
 *
 * Espone window.SerraCart. Non disegna nulla: se ne occupano le pagine.
 */
(function (global) {
  "use strict";

  const CHIAVE = "ois.cart";
  const CHIAVE_VECCHIA = "ois.cart.piantine.v1";

  const isPiantina = (riga) => !!riga && riga.variante === "piantina";

  // Normalizza le forme storiche: stringa secca oppure oggetto senza variante.
  function normalizza(riga) {
    if (typeof riga === "string") return { id: riga, bustine: 1 };
    if (!riga || !riga.id) return null;
    if (isPiantina(riga)) {
      const qta = Number(riga.qta) || Number(riga.bustine) || 0;
      return {
        id: riga.id,
        variante: "piantina",
        qta,
        bustine: qta,
        prezzo: Number(riga.prezzo) || 0,
        unita: riga.unita || "vaso ø7",
        lotto: Number(riga.lotto) || 6
      };
    }
    return { id: riga.id, bustine: Number(riga.bustine) || 1 };
  }

  function leggi() {
    let righe = [];
    try {
      const grezzo = JSON.parse(localStorage.getItem(CHIAVE) || "[]");
      if (Array.isArray(grezzo)) righe = grezzo.map(normalizza).filter(Boolean);
    } catch (_) {}

    // Migrazione dal vecchio vassoio separato: si esegue una volta sola.
    try {
      const vecchio = JSON.parse(localStorage.getItem(CHIAVE_VECCHIA) || "null");
      if (Array.isArray(vecchio) && vecchio.length) {
        vecchio.map(normalizza).filter(Boolean).forEach((riga) => {
          const esistente = righe.find(
            (r) => r.id === riga.id && isPiantina(r) === isPiantina(riga)
          );
          if (esistente) esistente.qta = (esistente.qta || 0) + (riga.qta || 0);
          else righe.push(riga);
        });
        localStorage.removeItem(CHIAVE_VECCHIA);
        scrivi(righe);
      }
    } catch (_) {}

    return righe;
  }

  function scrivi(righe) {
    try {
      localStorage.setItem(CHIAVE, JSON.stringify(righe));
    } catch (_) {}
    global.dispatchEvent(new CustomEvent("serra:cart-change"));
  }

  const quantita = (riga) =>
    isPiantina(riga)
      ? Number(riga.qta) || Number(riga.bustine) || 0
      : Number(riga.bustine) || 0;

  // Il prezzo delle piantine viaggia nella riga: la home non deve conoscere
  // il listino del vivaio per mostrare un totale corretto.
  function prezzoUnitario(riga, prezzoBustina) {
    if (isPiantina(riga)) return Number(riga.prezzo) || 0;
    return typeof prezzoBustina === "function"
      ? prezzoBustina(riga.id)
      : Number(prezzoBustina) || 0;
  }

  const totale = (righe, prezzoBustina) =>
    Math.round(
      righe.reduce(
        (somma, riga) =>
          somma + prezzoUnitario(riga, prezzoBustina) * quantita(riga),
        0
      ) * 100
    ) / 100;

  const soloPiantine = (righe) => righe.filter(isPiantina);
  const soloSemi = (righe) => righe.filter((r) => !isPiantina(r));

  // Vassoi interi presenti nel carrello: serve per l'ordine minimo del vivaio.
  const vassoi = (righe) =>
    soloPiantine(righe).reduce(
      (n, r) => n + Math.round(quantita(r) / (r.lotto || 6)),
      0
    );

  global.SerraCart = {
    CHIAVE,
    isPiantina,
    normalizza,
    leggi,
    scrivi,
    quantita,
    prezzoUnitario,
    totale,
    soloPiantine,
    soloSemi,
    vassoi
  };
})(window);
