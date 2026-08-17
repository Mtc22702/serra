/* Motore delle cure colturali: da una coltura registrata e dai campi già presenti in db/plants.json ricava fasi, attività ricorrenti e data di raccolta stimata. */
(function (global) {
  "use strict";

  var DAY = 86400000;

  /* ---------- date (locali, senza fuso) ---------- */
  function iso(date) {
    var d = new Date(date);
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }
  function parseDate(value) {
    return new Date(value + "T00:00:00");
  }
  function addDays(date, days) {
    return new Date(date.getTime() + days * DAY);
  }
  function startOfToday() {
    return parseDate(iso(new Date()));
  }
  function diffDays(a, b) {
    return Math.round((a - b) / DAY);
  }

  /* ---------- listino: variante piantina ---------- */
  var VANTAGGIO_GIORNI = {
    frutto: 30,
    foglia: 20,
    aromatica: 25,
    legume: 0,
    radice: 0
  };
  var SENZA_PIANTINA = { radice: true, legume: true };
  var PACK_FALLBACK = { seeds: 100, price: 2.5 };

  function buildProducts(plants, packData) {
    var out = {};
    (plants || []).forEach(function (plant) {
      var pack = (packData && packData[plant.id]) || PACK_FALLBACK;
      var piantina = null;
      if (!SENZA_PIANTINA[plant.tipo] && plant.gg > 0) {
        // Il vivaio vende per tutta la finestra di trapianto: mesi di semina più il mese successivo a ciascuno di essi.
        var mesi = [];
        (plant.mesi || []).forEach(function (m) {
          [m, (m % 12) + 1].forEach(function (v) {
            if (mesi.indexOf(v) === -1) mesi.push(v);
          });
        });
        piantina = {
          prezzo: Math.round((pack.price / 2) * 10) / 10,
          lotto: 6,
          mesiDisponibili: mesi.sort(function (a, b) {
            return a - b;
          }),
          vantaggioGiorni: VANTAGGIO_GIORNI[plant.tipo] || 20
        };
      }
      out[plant.id] = {
        semi: { prezzo: pack.price, semiPerBustina: pack.seeds },
        piantina: piantina
      };
    });
    return out;
  }

  /* ---------- parametri agronomici ---------- */
  var GERMINAZIONE = { frutto: 8, foglia: 5, radice: 7, legume: 6, aromatica: 12 };
  var IRRIGAZIONE = { bassa: 4, media: 2, alta: 1 };
  var CONCIMAZIONE = { alta: 14, media: 21, bassa: 30 };

  // Attività che decadono: se non si annaffia per dieci giorni non si accumulano dieci arretrati, ne resta uno solo.
  var RICORRENTI = { irrigazione: true, concimazione: true, controllo: true, potatura: true };

  // Cadenza di irrigazione corretta sul mese: in estate più fitta, in inverno più rada. In serra la correzione è volutamente prudente.
  function passoIrrigazione(plant, mese) {
    var base = IRRIGAZIONE[plant.acqua] || 2;
    if (mese >= 6 && mese <= 8) base = Math.max(1, base - 1);
    if (mese >= 11 || mese <= 2) base += 2;
    return base;
  }

  // Giorni dalla data di inizio alla raccolta: la piantina parte avvantaggiata.
  function giorniARaccolta(plant, product, origine) {
    if (!plant.gg) return 0; // perenni (rosmarino, timo, origano, salvia)
    var vantaggio =
      origine === "piantina"
        ? (product && product.piantina && product.piantina.vantaggioGiorni) || 20
        : 0;
    return Math.max(15, plant.gg - vantaggio);
  }

  // Genera l'intero ciclo di attività di una coltura.
  function generaAttivita(coltura, plant, product) {
    var start = parseDate(coltura.dataInizio);
    var ggRaccolta = giorniARaccolta(plant, product, coltura.origine);
    var perenne = ggRaccolta === 0;
    var fine = perenne ? 365 : ggRaccolta;
    var tasks = [];

    function push(offset, tipo, extra) {
      if (offset < 0 || offset > fine + 40) return;
      var data = addDays(start, offset);
      var task = {
        id: coltura.id + "|" + tipo + "|" + iso(data),
        colturaId: coltura.id,
        plantId: coltura.plantId,
        data: data,
        tipo: tipo,
        ricorrente: !!RICORRENTI[tipo]
      };
      Object.keys(extra || {}).forEach(function (k) {
        task[k] = extra[k];
      });
      tasks.push(task);
    }

    /* eventi una tantum, dipendenti dall'origine */
    if (coltura.origine === "seme") {
      push(GERMINAZIONE[plant.tipo] || 7, "germinazione", {
        notaKey: "note.germinazione"
      });
      if (plant.tipo === "foglia")
        push(20, "diradamento", {
          notaKey: "note.diradamento",
          notaVars: { d: plant.d }
        });
      if (plant.tipo === "radice")
        push(18, "diradamento", {
          notaKey: "note.diradamento_radice",
          notaVars: { d: plant.d }
        });
      if (plant.tipo === "frutto")
        push(30, "trapianto", {
          notaKey: "note.trapianto",
          notaVars: { d: plant.d, dr: plant.dr || plant.d }
        });
    } else {
      push(0, "attecchimento", { notaKey: "note.attecchimento" });
    }
    if (plant.tipo === "frutto") push(35, "tutoraggio", { notaPianta: true });
    if (plant.arch === "rampicante")
      push(25, "tutoraggio", { notaKey: "note.tutoraggio_rampicante" });

    /* attività ricorrenti */
    var mese = start.getMonth() + 1;
    var passoAcqua = passoIrrigazione(plant, mese);
    for (var g = passoAcqua; g <= fine; g += passoAcqua)
      push(g, "irrigazione", {
        notaKey: "note.irrigazione",
        notaVars: { livello: plant.acqua }
      });
    var passoConcime = CONCIMAZIONE[plant.h] || 21;
    for (var c = passoConcime; c <= fine; c += passoConcime)
      push(c, "concimazione", {
        notaKey: "note.concimazione",
        notaVars: { livello: plant.h }
      });
    for (var k = 7; k <= fine; k += 7) push(k, "controllo", {});

    /* raccolta */
    if (perenne) {
      for (var p = 60; p <= 300; p += 60)
        push(p, "potatura", { notaKey: "note.potatura_perenne" });
    } else if (plant.tipo === "foglia") {
      for (var i = 0; i < 4; i++)
        push(ggRaccolta + i * 7, "raccolta", {
          scalare: i > 0,
          notaKey: "note.raccolta_scalare"
        });
    } else {
      push(ggRaccolta, "raccolta", { notaPianta: true });
    }

    return tasks.sort(function (a, b) {
      return a.data - b.data;
    });
  }

  // Fasi mostrate sulla barra di avanzamento della coltura.
  function fasi(coltura, plant, product) {
    var gg = giorniARaccolta(plant, product, coltura.origine);
    if (!gg) return [{ at: 0, key: "fase.impianto" }, { at: 1, key: "fase.perenne" }];
    var germ = GERMINAZIONE[plant.tipo] || 7;
    return coltura.origine === "piantina"
      ? [
          { at: 0, key: "fase.dimora" },
          { at: 7 / gg, key: "fase.attecchimento" },
          { at: 0.55, key: "fase.sviluppo" },
          { at: 1, key: "fase.raccolta" }
        ]
      : [
          { at: 0, key: "fase.semina" },
          { at: germ / gg, key: "fase.germinazione" },
          { at: 0.5, key: "fase.crescita" },
          { at: 1, key: "fase.raccolta" }
        ];
  }

  function comprimiRicorrenti(tasks) {
    var visti = {};
    var out = [];
    tasks
      .slice()
      .sort(function (a, b) {
        return b.quando - a.quando;
      })
      .forEach(function (t) {
        if (RICORRENTI[t.tipo]) {
          var key = t.colturaId + "|" + t.tipo;
          if (visti[key]) return;
          visti[key] = true;
        }
        out.push(t);
      });
    return out.sort(function (a, b) {
      return a.quando - b.quando;
    });
  }

  global.SerraCareEngine = {
    iso: iso,
    parseDate: parseDate,
    addDays: addDays,
    startOfToday: startOfToday,
    diffDays: diffDays,
    buildProducts: buildProducts,
    giorniARaccolta: giorniARaccolta,
    generaAttivita: generaAttivita,
    comprimiRicorrenti: comprimiRicorrenti,
    fasi: fasi,
    RICORRENTI: RICORRENTI
  };
})(window);
