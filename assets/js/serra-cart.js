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
 *
 * Oltre a leggere e scrivere, espone le tre operazioni che l'utente si aspetta
 * ovunque: togliere una singola riga (`rimuovi`), cambiarne la quantità
 * (`imposta` / `varia`) e svuotare tutto (`svuota`). Vivono qui, e non nelle
 * pagine, perché prima ogni sezione le reimplementava a modo suo: il vivaio
 * "svuotava" solo le piantine e il configuratore rimuoveva per solo `id`,
 * cancellando anche la piantina omonima.
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

  /* ---------- operazioni sulle righe ----------
     Semi e piantine possono coesistere con lo stesso `id`: ogni operazione
     identifica la riga con la coppia (id, variante), mai con il solo id.
     Le funzioni restituiscono sempre un nuovo array e non scrivono da sole:
     la pagina decide quando persistere, così può aggiornare la sua UI una
     volta sola. */

  const stessaRiga = (riga, id, piantina) =>
    riga.id === id && isPiantina(riga) === !!piantina;

  const trova = (righe, id, piantina) =>
    righe.find((r) => stessaRiga(r, id, piantina)) || null;

  const rimuovi = (righe, id, piantina) =>
    righe.filter((r) => !stessaRiga(r, id, piantina));

  // Il passo di quantità: le piantine viaggiano a vassoi interi, i semi a
  // bustine singole. Serve sia agli incrementi sia al minimo consentito.
  const passo = (riga) => (isPiantina(riga) ? Number(riga.lotto) || 6 : 1);

  // Imposta la quantità assoluta di una riga. A zero (o meno) la riga esce dal
  // carrello: è la stessa cosa che togliere il prodotto, quindi non serve un
  // percorso separato.
  function imposta(righe, id, piantina, nuovaQta) {
    const riga = trova(righe, id, piantina);
    if (!riga) return righe.slice();
    const qta = Math.max(0, Math.round(Number(nuovaQta) || 0));
    if (qta === 0) return rimuovi(righe, id, piantina);
    return righe.map((r) => {
      if (!stessaRiga(r, id, piantina)) return r;
      return isPiantina(r)
        ? { ...r, qta, bustine: qta }
        : { ...r, bustine: qta };
    });
  }

  // Variazione relativa: `delta` è già espresso in unità di prodotto, quindi
  // chi chiama passa `passo(riga)` per muoversi di un vassoio alla volta.
  const varia = (righe, id, piantina, delta) => {
    const riga = trova(righe, id, piantina);
    if (!riga) return righe.slice();
    return imposta(righe, id, piantina, quantita(riga) + Number(delta || 0));
  };

  // Un solo carrello, un solo svuotamento: qualunque sezione lo chiami, la
  // lista resta vuota per tutta l'app.
  function svuota() {
    scrivi([]);
    return [];
  }

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
    vassoi,
    stessaRiga,
    trova,
    rimuovi,
    passo,
    imposta,
    varia,
    svuota
  };
})(window);
