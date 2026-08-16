/**
 * Vivaio: la sezione dove si acquistano le piantine già cresciute.
 *
 * È una sezione a sé perché la merce è viva: disponibilità stagionale,
 * spedizione a inizio settimana, lotti da sei. Il carrello però è **unico**
 * (`ois.cart`, gestito da serra-cart.js): semi e piantine stanno insieme e
 * partono in un solo ordine.
 *
 * All'ordine, le righe entrano nello storico esistente con i campi che
 * l'Area Personale già legge (`bustine`, `prezzo`) più `variante: "piantina"`,
 * che le pagine vecchie ignorano senza accorgersene.
 *
 * Tema e lingua: stessi contratti delle altre pagine.
 */
(() => {
  const E = window.SerraCareEngine;
  if (!E) return;

  // Carrello unico dell'utente: la lista è la stessa del catalogo semi.
  const C = () => window.SerraCart;

  /* Regole commerciali della merce viva: le piantine partono a inizio settimana
     e viaggiano solo a vassoi interi, quindi sotto una certa soglia la
     spedizione non regge. Vivono in serra-cart-ui.js perché valgono per
     l'ordine, non per questa pagina: chi compone il carrello dalla home deve
     leggere lo stesso vincolo. Qui c'è solo il ripiego se il modulo manca. */
  const CONSEGNA = window.SerraCartUI?.CONSEGNA || {
    giornoSpedizione: 1, // lunedì
    anticipoMinimoGiorni: 2, // ordini raccolti fino a due giorni prima
    transitoGiorni: 1, // consegna il giorno dopo la partenza
    vassoiMinimi: 2,
  };

  const COPY = {
    it: {
      "page.title": "Vivaio · Piantine pronte da trapiantare",
      "nav.brand_sub": "Coltiva con un piano",
      "nav.home": "🏠 Home",
      "nav.menu_explore": "Esplora",
      "nav.menu_preferences": "Preferenze",
      "nav.theme": "Tema",
      "nav.theme_hint": "Chiaro / scuro",
      "nav.language": "Lingua",
      "nav.semi": "🌿 Catalogo semi",
      "nav.vivaio": "🪴 Vivaio piantine",
      "nav.orto": "🌱 Il mio orto",
      "nav.configuratore": "📐 Configuratore serra",
      "nav.account": "👤 Area Personale",
      "nav.account_label": "Area Personale",
      "nav.carrello": "Carrello",
      "hero.kicker": "VIVAIO",
      "hero.title": "Piantine pronte da mettere a dimora",
      "hero.lead":
        "Non tutte le colture si seminano: alcune arrivano già cresciute e ti fanno guadagnare settimane. Qui trovi solo ciò che è pronto adesso.",
      "hero.count": "varietà pronte in questo momento",
      "hero.count_month": "varietà pronte a {mese}",
      "hero.month": "disponibili {mese}",
      "hero.lot_value": "{n} piantine",
      "hero.lot_label": "per vassoio · minimo {n} vassoi",
      "search.placeholder": "Cerca una piantina…",
      "search.none": "Nessuna piantina corrisponde a “{q}”.",
      "filters.aria": "Filtri del vivaio",
      "filters.toggle": "Filtri e ordinamento",
      "filters.family": "Famiglia",
      "filters.all": "Tutte",
      "filters.sort_aria": "Ordina le piantine",
      "filters.sort_consigliati": "Ordina: consigliate",
      "filters.sort_nome": "Ordina: nome A-Z",
      "filters.sort_veloce": "Ordina: raccolta più vicina",
      "filters.sort_risparmio": "Ordina: più tempo guadagnato",
      "filters.sort_prezzo": "Ordina: prezzo più basso",
      "filters.reset": "Azzera filtri",
      "filters.count_one": "1 varietà",
      "filters.count": "{n} varietà",
      "filters.of_total": "su {n} disponibili questo mese",
      "filters.none": "Nessun risultato con questi filtri.",
      "cart.qty_less": "Togli un vassoio",
      "cart.qty_more": "Aggiungi un vassoio",
      "cart.delivery": "Consegna prevista <b>{data}</b>",
      "cart.min_missing_one": "Manca un vassoio all'ordine minimo",
      "cart.min_missing": "Mancano {n} vassoi all'ordine minimo",
      "hero.delivery": "prossima partenza",
      "hero.art_alt":
        "Piantina con il pane di terra, pronta da estrarre dall'alveolo e mettere a dimora",
      "hero.shipping":
        "Merce viva: spedizione a inizio settimana, sospesa in caso di gelate.",
      "hero.cta": "Vedi le piantine disponibili",
      "hero.visual_label": "Pronte al trapianto",
      "cat.per_plant": "a piantina · vaso ø7",
      "cat.per_tray": "al vassoio · {n} piantine",
      "cat.each": "{prezzo} a piantina · vaso ø7",
      "cat.price_summary": "{n} piantine · {prezzo} cad.",
      "cat.hint_tray": "Si acquista a vassoio intero",
      "cat.lot": "vassoio da {n}",
      "cat.cycle": "{tipo} · ciclo {n} giorni",
      "cat.days_earlier": "−{n} giorni",
      "cat.harvest_earlier":
        "Raccolta verso il <b>{data}</b>, circa <b>{n} giorni prima</b> rispetto alla semina.",
      "cat.add": "＋ Aggiungi vassoio",
      "cat.plugs_in": "{n} piantine",
      "cat.remove": "Togli",
      "cat.min_tray": "Il vassoio non si divide: si parte da 6 piantine",
      "cat.in_cart": "Nel carrello",
      "cat.tray_one": "1 vassoio",
      "cat.trays": "{n} vassoi",
      "empty.title": "Nessuna piantina disponibile questo mese",
      "empty.text":
        "Le piantine seguono la stagione. Torna tra qualche settimana, oppure parti dai semi nel catalogo.",
      "empty.cta": "Vai al catalogo dei semi",
      "cart.title": "Il tuo carrello",
      "cart.vars": "{n} var.",
      "cart.edit": "Continua a scegliere",
      "cart.empty": "Il carrello è vuoto.",
      "cart.empty_hint":
        "Le piantine viaggiano a vassoi interi: il minimo è 2 vassoi.",
      "cart.checkout": "Completa acquisto",
      "cart.clear": "Svuota",
      "cart.open": "Vedi il carrello",
      "cart.note":
        "Ordine senza pagamento online: ti confermiamo disponibilità e data di consegna.",
      "cart.login": "Accedi per completare l'ordine",
      "toast.added": "{n} piantine di {nome} nel carrello",
      "toast.removed": "Rimossa",
      "toast.cleared": "Carrello svuotato",
      "toast.order_error": "Non è stato possibile registrare l'ordine",
      "seeds.link": "Cerchi i semi? Vai al catalogo",
    },
    ro: {
      "page.title": "Pepinieră · Răsaduri gata de plantat",
      "nav.brand_sub": "Cultivă cu un plan",
      "nav.home": "🏠 Acasă",
      "nav.menu_explore": "Explorează",
      "nav.menu_preferences": "Preferințe",
      "nav.theme": "Temă",
      "nav.theme_hint": "Deschisă / închisă",
      "nav.language": "Limbă",
      "nav.semi": "🌿 Catalog de semințe",
      "nav.vivaio": "🪴 Pepinieră răsaduri",
      "nav.orto": "🌱 Grădina mea",
      "nav.configuratore": "📐 Configurator seră",
      "nav.account": "👤 Contul Meu",
      "nav.account_label": "Contul Meu",
      "nav.carrello": "Coș",
      "hero.kicker": "PEPINIERĂ",
      "hero.title": "Răsaduri gata de pus în pământ",
      "hero.lead":
        "Nu toate culturile se seamănă: unele ajung deja crescute și îți câștigă săptămâni. Aici găsești doar ce este gata acum.",

      "hero.count": "soiuri gata chiar acum",
      "hero.count_month": "soiuri gata în {mese}",
      "hero.month": "disponibile în {mese}",
      "hero.lot_value": "{n} răsaduri",
      "hero.lot_label": "pe tavă · minimum {n} tăvi",
      "search.placeholder": "Caută un răsad…",
      "search.none": "Niciun răsad nu corespunde cu „{q}”.",
      "filters.aria": "Filtre pepinieră",
      "filters.toggle": "Filtre și ordonare",
      "filters.family": "Familie",
      "filters.all": "Toate",
      "filters.sort_aria": "Ordonează răsadurile",
      "filters.sort_consigliati": "Ordonare: recomandate",
      "filters.sort_nome": "Ordonare: nume A-Z",
      "filters.sort_veloce": "Ordonare: recoltă mai apropiată",
      "filters.sort_risparmio": "Ordonare: cel mai mult timp câștigat",
      "filters.sort_prezzo": "Ordonare: preț mai mic",
      "filters.reset": "Șterge filtrele",
      "filters.count_one": "1 soi",
      "filters.count": "{n} soiuri",
      "filters.of_total": "din {n} disponibile luna aceasta",
      "filters.none": "Niciun rezultat cu aceste filtre.",
      "cart.qty_less": "Scoate o tavă",
      "cart.qty_more": "Adaugă o tavă",
      "cart.delivery": "Livrare estimată <b>{data}</b>",
      "cart.min_missing_one": "Mai lipsește o tavă până la comanda minimă",
      "cart.min_missing": "Mai lipsesc {n} tăvi până la comanda minimă",
      "hero.delivery": "următoarea expediere",
      "hero.art_alt":
        "Răsad cu bulgărele de pământ, gata de scos din alveolă și pus în pământ",
      "hero.shipping":
        "Marfă vie: livrare la început de săptămână, suspendată în caz de îngheț.",
      "hero.cta": "Vezi răsadurile disponibile",
      "hero.visual_label": "Gata de transplantat",
      "cat.per_plant": "per răsad · ghiveci ø7",
      "cat.per_tray": "pe tavă · {n} răsaduri",
      "cat.each": "{prezzo} pe răsad · ghiveci ø7",
      "cat.price_summary": "{n} răsaduri · {prezzo} buc.",
      "cat.hint_tray": "Se cumpără la tavă întreagă",
      "cat.lot": "tavă de {n}",
      "cat.cycle": "{tipo} · ciclu {n} zile",
      "cat.days_earlier": "−{n} zile",
      "cat.harvest_earlier":
        "Recoltare în jur de <b>{data}</b>, cu circa <b>{n} zile mai devreme</b> față de semănat.",
      "cat.add": "＋ Adaugă tavă",
      "cat.plugs_in": "{n} răsaduri",
      "cat.remove": "Scoate",
      "cat.min_tray": "Tava nu se împarte: se pornește de la 6 răsaduri",
      "cat.in_cart": "În coș",
      "cat.tray_one": "o tavă",
      "cat.trays": "{n} tăvi",
      "empty.title": "Niciun răsad disponibil luna aceasta",
      "empty.text":
        "Răsadurile urmează sezonul. Revino peste câteva săptămâni sau pornește de la semințe din catalog.",
      "empty.cta": "Mergi la catalogul de semințe",
      "cart.title": "Coșul tău",
      "cart.vars": "{n} soiuri",
      "cart.edit": "Continuă să alegi",
      "cart.empty": "Coșul este gol.",
      "cart.empty_hint":
        "Răsadurile călătoresc în tăvi întregi: minimul este de 2 tăvi.",
      "cart.checkout": "Finalizează achiziția",
      "cart.clear": "Golește",
      "cart.open": "Vezi coșul",
      "cart.note":
        "Comandă fără plată online: îți confirmăm disponibilitatea și data livrării.",
      "cart.login": "Autentifică-te pentru a finaliza comanda",
      "toast.added": "{n} răsaduri de {nome} în coș",
      "toast.removed": "Eliminat",
      "toast.cleared": "Coș golit",
      "toast.order_error": "Comanda nu a putut fi înregistrată",
      "seeds.link": "Cauți semințe? Mergi la catalog",
    },
  };

  const PHOTO_FIX = {
    bietola: "bietola_coste",
    cavolo: "cavolo_cappuccio",
    cavolonero: "cavolo_nero",
    cavolorapa: "cavolo_rapa",
    fagiolino: "fagiolino_nano",
    fagiolo: "fagiolo_rampicante",
    indivia: "indivia_scarola",
    pakchoi: "pak_choi",
    cavoletti: "cavoletti_bruxelles",
  };
  const TIPI = {
    it: {
      frutto: "da frutto",
      foglia: "da foglia",
      radice: "da radice",
      legume: "legume",
      aromatica: "aromatica",
    },
    ro: {
      frutto: "de fruct",
      foglia: "de frunze",
      radice: "de rădăcină",
      legume: "leguminoasă",
      aromatica: "aromatică",
    },
  };

  let lang = "it";
  let PLANTS = [];
  let PRODUCTS = {};
  const BYID = {};
  let cart = [];
  let filtro = "";
  // Filtri del listino: famiglia botanica e criterio d'ordinamento, come nel
  // catalogo dei semi in home. Restano in memoria per la sessione.
  let tipoAttivo = "";
  let ordine = "consigliati";

  const app = document.getElementById("vivaioApp");
  const toastEl = document.getElementById("vivaioToast");

  const normalizeLang = (v) => (v === "ro" ? "ro" : "it");
  function t(key, vars) {
    let value = (COPY[lang] || {})[key] ?? COPY.it[key] ?? key;
    if (vars)
      Object.keys(vars).forEach((k) => {
        value = value.split("{" + k + "}").join(vars[k]);
      });
    return value;
  }
  const plantName = (p) =>
    lang === "ro"
      ? window.SERRA_I18N?.plants?.ro?.[p.id]?.nome || p.nome
      : p.nome;
  const nomeMese = (m) =>
    (window.SERRA_I18N?.months?.[lang]?.[m - 1] || String(m)).toLowerCase();
  const locale = () => (lang === "ro" ? "ro-RO" : "it-IT");
  const money = (v) =>
    new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR",
    }).format(v);
  const fmtData = (d) =>
    d.toLocaleDateString(locale(), { day: "numeric", month: "long" });
  const photoSrc = (id) => `assets/img/photo/${PHOTO_FIX[id] || id}.webp`;
  const svgSrc = (id) => `assets/img/svg/${id}.svg`;
  const escape = (s) =>
    typeof window.escapeHtml === "function"
      ? window.escapeHtml(s)
      : String(s).replace(
          /[&<>"']/g,
          (c) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[c],
        );

  /* ---------- carrello unico, condiviso con il catalogo semi ---------- */
  function loadCart() {
    cart = C() ? C().leggi() : [];
  }
  function saveCart() {
    if (C()) C().scrivi(cart);
  }
  const piantine = () => (C() ? C().soloPiantine(cart) : []);
  const qtaInCarrello = (id) => piantine().find((i) => i.id === id)?.qta || 0;

  /* Il conteggio delle bustine, il totale e l'elenco del cassetto li fa ora il
     modulo condiviso (serra-cart-ui.js): qui restano solo i numeri che servono
     alla pagina fuori dal carrello — la hero e la barra di stato. */

  // Prima partenza utile: il primo giorno di spedizione che rispetti il
  // preavviso minimo. La consegna è il giorno dopo la partenza.
  const prossimaConsegna = () =>
    window.SerraCartUI
      ? window.SerraCartUI.prossimaConsegna()
      : E.addDays(
          E.startOfToday(),
          CONSEGNA.anticipoMinimoGiorni + CONSEGNA.transitoGiorni,
        );
  const fmtGiorno = (d) =>
    d.toLocaleDateString(locale(), {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const vassoiInCarrello = () => (C() ? C().vassoi(cart) : 0);

  /* ---------- viste ---------- */
  function disponibili() {
    const mese = new Date().getMonth() + 1;
    return PLANTS.filter(
      (p) =>
        p.gg > 0 && PRODUCTS[p.id]?.piantina?.mesiDisponibili?.includes(mese),
    );
  }

  // Tre leve, nello stesso ordine del catalogo semi: cerca, filtra, ordina.
  function filtrate(lista) {
    const q = filtro.trim().toLowerCase();
    let out = lista;
    if (tipoAttivo) out = out.filter((p) => p.tipo === tipoAttivo);
    if (q) out = out.filter((p) => plantName(p).toLowerCase().includes(q));
    return ordinate(out);
  }

  const prezzoDi = (p) => Number(PRODUCTS[p.id]?.piantina?.prezzo) || 0;
  const giorniDi = (p) => E.giorniARaccolta(p, PRODUCTS[p.id], "piantina");

  function ordinate(lista) {
    const copia = lista.slice();
    if (ordine === "nome")
      return copia.sort((a, b) =>
        plantName(a).localeCompare(plantName(b), locale()),
      );
    if (ordine === "veloce")
      return copia.sort((a, b) => giorniDi(a) - giorniDi(b));
    if (ordine === "risparmio")
      return copia.sort((a, b) => b.gg - giorniDi(b) - (a.gg - giorniDi(a)));
    if (ordine === "prezzo")
      return copia.sort((a, b) => prezzoDi(a) - prezzoDi(b));
    return copia; // consigliate: l'ordine del catalogo
  }

  // Famiglie presenti davvero questo mese: un filtro che non porta a nulla
  // è peggio che nessun filtro.
  function famiglie(lista) {
    const conta = {};
    lista.forEach((p) => {
      conta[p.tipo] = (conta[p.tipo] || 0) + 1;
    });
    return Object.keys(conta)
      .sort((a, b) => conta[b] - conta[a])
      .map((tipo) => ({ tipo, n: conta[tipo] }));
  }

  const filtriAttivi = () =>
    !!tipoAttivo || !!filtro.trim() || ordine !== "consigliati";

  function barraFiltriHtml(lista, visibili) {
    const opzioni = ["consigliati", "nome", "veloce", "risparmio", "prezzo"]
      .map(
        (v) =>
          `<option value="${v}"${v === ordine ? " selected" : ""}>${escape(
            t("filters.sort_" + v),
          )}</option>`,
      )
      .join("");
    const chip = (tipo, etichetta, n) =>
      `<button type="button" class="viv-chip${
        tipoAttivo === tipo ? " is-active" : ""
      }" data-viv-action="set-type" data-type="${tipo}"
        aria-pressed="${tipoAttivo === tipo}">
        <span>${escape(etichetta)}</span><small>${n}</small></button>`;
    return `
      <details class="viv-filter-shell" open>
        <summary class="viv-filter-summary">
          <span>${escape(t("filters.toggle"))}</span>
          <b>${escape(
            visibili.length === 1
              ? t("filters.count_one")
              : t("filters.count", { n: visibili.length }),
          )}</b>
          <span class="viv-filter-chevron" aria-hidden="true">⌄</span>
        </summary>
      <section class="viv-toolbar" aria-label="${escape(t("filters.aria"))}">
        <div class="viv-toolbar-row">
          <label class="viv-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" id="vivSearch" value="${escape(filtro)}"
              placeholder="${escape(t("search.placeholder"))}"
              aria-label="${escape(t("search.placeholder"))}" />
          </label>
          <select class="viv-sort" id="vivSort"
            aria-label="${escape(t("filters.sort_aria"))}">${opzioni}</select>
        </div>
        <div class="viv-chiprail" role="group"
          aria-label="${escape(t("filters.family"))}">
          ${chip("", t("filters.all"), lista.length)}
          ${famiglie(lista)
            .map(({ tipo, n }) => chip(tipo, TIPI[lang][tipo] || tipo, n))
            .join("")}
        </div>
        <div class="viv-results">
          <span role="status" aria-live="polite">
            <b>${
              visibili.length === 1
                ? t("filters.count_one")
                : t("filters.count", { n: visibili.length })
            }</b>
            ${
              visibili.length !== lista.length
                ? escape(t("filters.of_total", { n: lista.length }))
                : ""
            }
          </span>
          ${
            filtriAttivi()
              ? `<button type="button" class="viv-reset" data-viv-action="reset-filters">${escape(
                  t("filters.reset"),
                )}</button>`
              : ""
          }
        </div>
      </section>
      </details>`;
  }

  function render() {
    const mese = new Date().getMonth() + 1;
    const lista = disponibili();
    const visibili = filtrate(lista);
    app.innerHTML = `
      <section class="orto-hero viv-hero" aria-labelledby="vivHeroTitle">
        <div class="orto-hero-inner">
          <div class="viv-hero-copy">
            <p class="orto-hero-date">${t("hero.kicker")}</p>
            <h1 id="vivHeroTitle">${t("hero.title")}</h1>
            <p class="orto-hero-sub">${t("hero.lead")}</p>
            <a class="viv-hero-cta" href="#vivaioCatalog">
              <span>${t("hero.cta")}</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div class="viv-hero-visual">
            <span class="viv-visual-label">${t("hero.visual_label")}</span>
            ${illustrazionePiantina()}
            <p class="viv-shipping">
              <span class="orto-notif-ico" aria-hidden="true">🚚</span>
              <span>${t("hero.shipping")}</span>
            </p>
          </div>
        </div>
        <!-- I tre dati decisivi restano sempre completi: il CSS permette il
             ritorno a capo e non applica ellissi nelle viste strette. -->
        <div class="orto-hero-stats" aria-label="Informazioni di acquisto">
          <div class="viv-hero-stat">
            <span class="viv-stat-icon" aria-hidden="true">🌿</span>
            <span class="viv-stat-copy">
              <b>${lista.length}</b>
              <small>${t("hero.count_month", {
                mese: nomeMese(mese),
              })}</small>
            </span>
          </div>
          <div class="viv-hero-stat">
            <span class="viv-stat-icon" aria-hidden="true">📅</span>
            <span class="viv-stat-copy">
              <b>${fmtGiorno(prossimaConsegna())
                .split(" ")
                .slice(0, 3)
                .join(" ")}</b>
              <small>${t("hero.delivery")}</small>
            </span>
          </div>
          <div class="viv-hero-stat">
            <span class="viv-stat-icon" aria-hidden="true">🪴</span>
            <span class="viv-stat-copy">
              <b>${t("hero.lot_value", { n: 6 })}</b>
              <small>${t("hero.lot_label", {
                n: CONSEGNA.vassoiMinimi,
              })}</small>
            </span>
          </div>
        </div>
      </section>

      <div class="viv-listing" id="vivaioCatalog">
        ${lista.length ? barraFiltriHtml(lista, visibili) : ""}
        ${barraStatoHtml()}
        <div class="orto-grid viv-grid">${
          !lista.length
            ? `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">🌱</span>
                <h4>${t("empty.title")}</h4><p>${t("empty.text")}</p>
                <p><a class="orto-btn orto-btn--ghost orto-btn--sm" href="index.html#stagione">${t("empty.cta")}</a></p></div>`
            : visibili.length
              ? visibili.map(card).join("")
              : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">⌕</span>
                  <h4>${escape(
                    filtro.trim()
                      ? t("search.none", { q: filtro })
                      : t("filters.none"),
                  )}</h4>
                  <p><button type="button" class="orto-btn orto-btn--ghost orto-btn--sm"
                    data-viv-action="reset-filters">${escape(t("filters.reset"))}</button></p></div>`
        }</div>
      </div>`;

    disegnaCarrello();

    const input = document.getElementById("vivSearch");
    if (input && document.activeElement !== input && filtro) {
      input.focus();
      input.setSelectionRange(filtro.length, filtro.length);
    }
  }

  function card(plant, index) {
    const product = PRODUCTS[plant.id];
    const piantina = product.piantina;
    const lotto = piantina.lotto || 6;
    const ggPiantina = E.giorniARaccolta(plant, product, "piantina");
    const raccolta = E.addDays(E.startOfToday(), ggPiantina);
    const risparmio = plant.gg - ggPiantina;
    const inCarrello = qtaInCarrello(plant.id);
    const prezzoVassoio = Math.round(piantina.prezzo * lotto * 100) / 100;
    return `
      <article class="orto-card" style="animation-delay:${Math.min(index, 10) * 35}ms">
        <div class="orto-card-photo">
          <img class="orto-card-bg" src="${photoSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-badges">
            <span class="orto-chip orto-chip--piantina">${t("cat.lot", { n: lotto })}</span>
          </span>
          <span class="viv-save-photo">${t("cat.days_earlier", { n: risparmio })}</span>
          <img class="orto-card-svg" src="${svgSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-card-titles">
            <h3>${escape(plantName(plant))}</h3>
            <small>${t("cat.cycle", {
              tipo: TIPI[lang][plant.tipo] || plant.tipo,
              n: plant.gg,
            })}</small>
          </span>
        </div>
        <div class="orto-card-body">
          <!-- Prezzo pagato e confronto unitario stanno sulla stessa riga:
               si legge più in fretta e non si ripete il formato del lotto. -->
          <div class="orto-price-row viv-price-row">
            <span class="orto-price">${money(prezzoVassoio)}</span>
            <small class="viv-unit">${t("cat.price_summary", {
              n: lotto,
              prezzo: money(piantina.prezzo),
            })}</small>
          </div>
          <div class="orto-note">${t("cat.harvest_earlier", {
            data: fmtData(raccolta),
            n: risparmio,
          })}</div>
          <div class="viv-card-actions">
            ${
              inCarrello
                ? `<div class="viv-qty" role="group" aria-label="${escape(
                    plantName(plant),
                  )}">
                     <button type="button" class="viv-qty-btn"
                       data-viv-action="less" data-plant="${plant.id}"
                       ${inCarrello <= lotto ? "disabled" : ""}
                       aria-label="${escape(t("cart.qty_less"))}"
                       title="${escape(
                         inCarrello <= lotto
                           ? t("cat.min_tray")
                           : t("cart.qty_less"),
                       )}">−</button>
                     <span class="viv-qty-value">
                       <b>${
                         inCarrello / lotto === 1
                           ? t("cat.tray_one")
                           : t("cat.trays", {
                               n: Math.round(inCarrello / lotto),
                             })
                       }</b>
                       <small>${t("cat.plugs_in", { n: inCarrello })}</small>
                     </span>
                     <button type="button" class="viv-qty-btn"
                       data-viv-action="add" data-plant="${plant.id}"
                       aria-label="${escape(t("cart.qty_more"))}"
                       title="${escape(t("cart.qty_more"))}">＋</button>
                   </div>
                   <div class="viv-card-foot">
                     <span class="viv-in-cart">✓ ${t("cat.in_cart")}</span>
                     <button type="button" class="viv-remove"
                       data-viv-action="remove" data-plant="${plant.id}">${t("cat.remove")}</button>
                   </div>`
                : `<button class="orto-btn orto-btn--block" type="button"
                     data-viv-action="add" data-plant="${plant.id}"
                     aria-label="${escape(t("cat.add"))} ${escape(plantName(plant))}">${t("cat.add")}</button>`
            }
        </div>
      </article>`;
  }

  /* Con il carrello a scomparsa le regole della merce viva (minimo, consegna)
     resterebbero nascoste fino alla fine: questa barra le tiene sotto gli occhi
     mentre si sceglie. */
  /* Illustrazione della hero: una piantina con il pane di terra, cioè il
     "răsad" — pronta da estrarre dall'alveolo e mettere a dimora. Disegnata a
     mano in SVG per restare nitida a ogni dimensione e seguire il tema.
     L'animazione è lieve e si spegne con prefers-reduced-motion. */
  // Illustrazione della hero: una piantina sollevata dall'alveolo, con il pane
  // di terra e le radici in vista. È il disegno che spiega in un colpo d'occhio
  // che qui non si vendono semi ma piante già pronte da mettere a dimora.
  function illustrazionePiantina() {
    return `
      <svg class="viv-hero-art" viewBox="0 0 260 230" role="img"
        aria-label="${escape(t("hero.art_alt"))}">
        <defs>
          <linearGradient id="vivTerra" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#a87443" />
            <stop offset="52%" stop-color="#725033" />
            <stop offset="100%" stop-color="#3f2b20" />
          </linearGradient>
          <linearGradient id="vivFoglia" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#c7f5a8" />
            <stop offset="45%" stop-color="#72d17a" />
            <stop offset="100%" stop-color="#2b8d50" />
          </linearGradient>
          <linearGradient id="vivFogliaScura" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#91e08d" />
            <stop offset="100%" stop-color="#247244" />
          </linearGradient>
          <linearGradient id="vivVassoio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#49624c" />
            <stop offset="100%" stop-color="#1d3024" />
          </linearGradient>
          <filter id="vivOmbra" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="8"
              flood-color="#0a2415" flood-opacity=".32" />
          </filter>
        </defs>
        <!-- Niente alone né riflessi dietro la piantina: il disco chiaro e i
             due puntini disegnavano forme sul verde della scheda e attiravano
             l'occhio più del soggetto. Resta solo il vassoio con la piantina. -->

        <!-- Vassoio in prospettiva: l'alveolo centrale vuoto rende evidente
             che il răsad è già stato estratto ed è pronto al trapianto. -->
        <g class="viv-art-tray" filter="url(#vivOmbra)">
          <ellipse cx="130" cy="205" rx="93" ry="11" fill="rgba(7,26,15,.3)" />
          <path d="M28 167 L232 167 L216 202 Q130 218 44 202 Z"
            fill="url(#vivVassoio)" />
          <path d="M28 167 Q130 147 232 167 Q130 190 28 167 Z"
            fill="#5c755d" />
          <path d="M34 166 Q130 151 226 166 Q130 181 34 166 Z"
            fill="#263a2b" />
          <g fill="#7b5738">
            <ellipse cx="66" cy="166" rx="20" ry="7" />
            <ellipse cx="194" cy="166" rx="20" ry="7" />
          </g>
          <g fill="#17251b">
            <ellipse cx="108" cy="166" rx="18" ry="6" />
            <ellipse cx="152" cy="166" rx="18" ry="6" />
          </g>
          <path d="M46 179 Q130 194 214 179" fill="none"
            stroke="rgba(255,255,255,.12)" stroke-width="3" />
        </g>

        <ellipse class="viv-art-soil" cx="130" cy="159" rx="22" ry="7"
          fill="rgba(8,22,13,.62)" />

        <!-- Pane di terra compatto con radici chiare ben visibili. -->
        <g class="viv-art-plug" filter="url(#vivOmbra)">
          <path d="M103 103 Q130 94 157 103 L150 151 Q130 164 110 151 Z"
            fill="url(#vivTerra)" />
          <ellipse cx="130" cy="103" rx="27" ry="9" fill="#a77849" />
          <ellipse cx="130" cy="104" rx="17" ry="5" fill="#4b3324" opacity=".55" />
          <g class="viv-art-roots" fill="none" stroke="#f2dfb7"
            stroke-width="2" stroke-linecap="round" opacity=".78">
            <path d="M111 114 Q126 120 149 113" />
            <path d="M110 126 Q130 134 151 124" />
            <path d="M116 108 Q120 130 115 146" />
            <path d="M137 108 Q133 126 142 150" />
            <path d="M126 116 Q128 139 126 157" />
          </g>
        </g>

        <!-- Foglie asimmetriche, venature e fusto curvo danno al răsad una
             silhouette più naturale e leggibile anche a dimensioni ridotte. -->
        <g class="viv-art-plant">
          <path d="M130 106 C128 89 132 70 131 50" fill="none"
            stroke="#4ca95c" stroke-width="5" stroke-linecap="round" />
          <path d="M130 83 C113 73 98 65 82 57" fill="none"
            stroke="#4ca95c" stroke-width="3" stroke-linecap="round" />
          <path d="M132 72 C149 62 164 53 177 42" fill="none"
            stroke="#4ca95c" stroke-width="3" stroke-linecap="round" />
          <g class="viv-art-leaf viv-art-leaf--l">
            <path d="M126 82 C102 82 81 71 71 52 C93 43 119 56 126 82 Z"
              fill="url(#vivFogliaScura)" />
            <path d="M77 55 Q102 63 123 78" fill="none"
              stroke="rgba(229,255,211,.52)" stroke-width="1.6" />
          </g>
          <g class="viv-art-leaf viv-art-leaf--r">
            <path d="M134 72 C143 47 163 33 187 31 C190 53 170 73 134 72 Z"
              fill="url(#vivFoglia)" />
            <path d="M181 36 Q155 51 138 68" fill="none"
              stroke="rgba(239,255,221,.62)" stroke-width="1.7" />
          </g>
          <g class="viv-art-leaf viv-art-leaf--top">
            <path d="M131 57 C116 42 115 25 126 13 C143 24 145 43 131 57 Z"
              fill="url(#vivFoglia)" />
            <path d="M128 18 Q132 37 131 53" fill="none"
              stroke="rgba(239,255,221,.62)" stroke-width="1.6" />
          </g>
          <g class="viv-art-leaf viv-art-leaf--small">
            <path d="M129 94 C113 93 102 86 98 75 C113 72 126 80 129 94 Z"
              fill="url(#vivFoglia)" />
          </g>
        </g>
      </svg>`;
  }

  function barraStatoHtml() {
    const vassoi = vassoiInCarrello();
    if (!vassoi) return "";
    const mancanti = Math.max(0, CONSEGNA.vassoiMinimi - vassoi);
    return `<div class="viv-statusbar${mancanti ? " is-warning" : ""}">
        <span class="viv-statusbar-main">
          <b>${
            vassoi === 1 ? t("cat.tray_one") : t("cat.trays", { n: vassoi })
          }</b>
          <span>·</span>
          <span>${t("cart.delivery", { data: fmtGiorno(prossimaConsegna()) })}</span>
        </span>
        ${
          mancanti
            ? `<span class="viv-statusbar-warn">${
                mancanti === 1
                  ? t("cart.min_missing_one")
                  : t("cart.min_missing", { n: mancanti })
              }</span>`
            : ""
        }
        <button class="orto-btn orto-btn--sm" type="button" data-viv-action="show-cart">${t(
          "cart.open",
        )}</button>
      </div>`;
  }

  /* Il corpo del cassetto lo disegna il modulo condiviso: riepilogo, gruppi,
     note della merce viva e invito incrociato sono gli stessi di home e
     configuratore. Qui restano solo i dati che il vivaio conosce — catalogo,
     foto, listino delle bustine — e le regole di apertura del pannello. */
  function disegnaCarrello() {
    const elenco = document.getElementById("vivaioCartItems");
    const vuoto = document.getElementById("vivaioCartEmpty");
    const piede = document.getElementById("vivaioCartFooter");
    const pieno = cart.some((i) => BYID[i.id]);

    if (vuoto) vuoto.hidden = pieno;
    if (elenco) elenco.hidden = !pieno;
    if (piede) piede.hidden = !pieno;

    if (elenco && pieno && window.SerraCartUI) {
      elenco.innerHTML = window.SerraCartUI.corpo({
        righe: cart,
        lang,
        attr: "data-viv-action",
        nome: (id) => (BYID[id] ? plantName(BYID[id]) : ""),
        foto: (id) => photoSrc(id),
        nota: (id) => BYID[id]?.nota || "",
        prezzoBustina: (id) => PRODUCTS[id]?.semi?.prezzo || 0,
        semiPerBustina: (id) => PRODUCTS[id]?.semi?.semiPerBustina || 100,
        soldi: money,
        // Il catalogo semi vive nella home; le piantine sono il listino di
        // questa stessa pagina, quindi basta scorrere fin lì.
        hrefSemi: "index.html#stagione",
        hrefPiantine: "#vivaioCatalog",
      });
    }

    /* Sotto l'ordine minimo di vassoi la spedizione della merce viva non
       regge: il pulsante resta visibile ma inerte, e il motivo è scritto
       accanto alle righe delle piantine. */
    const compra = document.getElementById("vivaioCheckoutBtn");
    if (compra) {
      const sotto = piantine().length && vassoiInCarrello() < CONSEGNA.vassoiMinimi;
      compra.disabled = !!sotto;
    }

    const riga = document.getElementById("vivaioCartLine");
    if (riga) {
      const n = cart.length;
      riga.hidden = !n;
      riga.textContent = n ? t("cart.vars", { n }) : "";
    }
    // Il pulsante svuota l'intero carrello: resta visibile finché c'è una
    // riga qualsiasi, non solo una piantina.
    const svuota = document.querySelector(".cart-clear-btn");
    if (svuota) svuota.hidden = !cart.length;
  }

  function apriCarrello() {
    const overlay = document.getElementById("vivaioCartOverlay");
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.classList.add("cart-open");
    overlay.querySelector(".cart-close")?.focus({ preventScroll: true });
  }

  function chiudiCarrello() {
    document.getElementById("vivaioCartOverlay")?.classList.remove("open");
    document.body.classList.remove("cart-open");
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") chiudiCarrello();
  });

  /* ---------- lingua ---------- */
  function applyLanguage(value) {
    lang = normalizeLang(value);
    document.documentElement.lang = lang;
    document.title = t("page.title");
    document.querySelectorAll("[data-viv-key]").forEach((el) => {
      el.textContent = t(el.dataset.vivKey);
    });
    document.querySelectorAll("[data-viv-key-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.vivKeyAria));
    });
    // Il pulsante profilo mostra lo stato di accesso, non una voce tradotta.
    window.SerraAPI?.updateNavbarUser?.();
    const select = document.getElementById("vivaioLangSelect");
    if (select) select.value = lang;
    try {
      localStorage.setItem("ois.lang", lang);
    } catch (_) {}
    render();
    document.documentElement.classList.remove("serra-i18n-pending");
  }
  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const next = normalizeLang(event.newValue);
    if (next !== lang) applyLanguage(next);
  });

  /* ---------- azioni ---------- */
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  const nomePer = (id) => (BYID[id] ? plantName(BYID[id]) : "");

  /* Stesso annulla della home e del configuratore: sta nel modulo condiviso
     del carrello, così le tre pagine non ne fanno tre versioni diverse. */
  function offriAnnulla(chiave, valori, prima) {
    const UI = window.SerraCartUI;
    if (!UI || !UI.annullabile) return;
    UI.annullabile({
      testo: UI.testo(lang, chiave, valori),
      etichetta: UI.testo(lang, "undo.action"),
      onAnnulla: () => {
        cart = prima.slice();
        saveCart();
        render();
      }
    });
  }

  // Crea un ordine con le stesse chiavi che l'Area Personale già legge.
  async function checkout() {
    const utente = window.SerraAPI?.getCurrentUser?.();
    if (!utente) {
      toast(t("cart.login"));
      setTimeout(() => (window.location.href = "account.html"), 900);
      return;
    }
    /* Un carrello, un ordine: partono insieme bustine e piantine. Le righe
       usano i campi che l'Area Personale già legge (bustine, prezzo). */
    const items = cart
      .filter((i) => BYID[i.id])
      .map((i) => {
        const piantina = C().isPiantina(i);
        const riga = {
          id: i.id,
          nome: plantName(BYID[i.id]),
          bustine: C().quantita(i),
          prezzo: piantina
            ? Number(i.prezzo) || 0
            : PRODUCTS[i.id]?.semi?.prezzo || 0,
        };
        if (piantina) {
          riga.variante = "piantina";
          riga.unita = i.unita || "vaso ø7";
        }
        return riga;
      });
    if (!items.length) return;
    const ordine = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      email: utente.email,
      date: new Date().toISOString(),
      items,
      total:
        Math.round(
          items.reduce((s2, r) => s2 + r.prezzo * r.bustine, 0) * 100,
        ) / 100,
      status: "In elaborazione",
      origine: "vivaio",
      billing: {
        accountType: utente.accountType || "private",
        name: utente.ragioneSociale || utente.nome,
        address: utente.billingIndirizzo || utente.indirizzo || "",
        city: utente.billingCitta || utente.citta || "",
        cap: utente.billingCap || utente.cap || "",
      },
      shipping: {
        name: utente.nome,
        phone: utente.telefono || "",
        address: utente.shippingIndirizzo || utente.indirizzo || "",
        city: utente.shippingCitta || utente.citta || "",
        cap: utente.shippingCap || utente.cap || "",
      },
    };
    try {
      const ordini = (await window.SerraAPI.getOrders()) || [];
      ordini.push(ordine);
      await window.SerraAPI.saveOrders(ordini);
    } catch (_) {
      return toast(t("toast.order_error"));
    }
    cart = [];
    saveCart();
    try {
      sessionStorage.setItem(
        "ois.order_confirmation",
        JSON.stringify({ ...ordine, source: "vivaio" }),
      );
    } catch (_) {}
    window.location.href = "ordine-confermato.html";
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-viv-action]");
    if (!trigger) return;
    const action = trigger.dataset.vivAction;
    // `data-plant` sulle schede del listino, `data-plant-id` sulle righe del
    // cassetto condiviso: entrambe indicano la stessa pianta.
    const id = trigger.dataset.plant || trigger.dataset.plantId;
    // Lingua dal menu mobile: sotto i 660px il selettore dell'intestazione è
    // nascosto e questi due pulsanti sono l'unico modo per cambiarla.
    if (action === "set-language") {
      applyLanguage(trigger.dataset.lang);
      return;
    }
    if (action === "add") {
      const prodotto = PRODUCTS[id]?.piantina || {};
      const lotto = prodotto.lotto || 6;
      const found = piantine().find((i) => i.id === id);
      if (found) {
        found.qta += lotto;
        found.bustine = found.qta;
      } else {
        // Il prezzo viaggia nella riga: la home mostra il totale senza dover
        // conoscere il listino del vivaio.
        cart.push({
          id,
          variante: "piantina",
          qta: lotto,
          bustine: lotto,
          prezzo: prodotto.prezzo || 0,
          unita: prodotto.unita || "vaso ø7",
          lotto,
        });
      }
      saveCart();
      render();
      return toast(t("toast.added", { n: lotto, nome: plantName(BYID[id]) }));
    }
    if (action === "less") {
      const lotto = PRODUCTS[id]?.piantina?.lotto || 6;
      cart = C().varia(cart, id, true, -lotto);
      saveCart();
      render();
      return;
    }
    /* Righe del cassetto condiviso: stessi nomi d'azione di home e
       configuratore. Il passo è una bustina per i semi e un vassoio intero per
       le piantine, perché è così che i due prodotti viaggiano davvero. */
    if (action === "cart-qty-more" || action === "cart-qty-less") {
      const piantina = trigger.dataset.variante === "piantina";
      const riga = C().trova(cart, id, piantina);
      if (!riga) return;
      const verso = action === "cart-qty-more" ? 1 : -1;
      cart = C().varia(cart, id, piantina, verso * C().passo(riga));
      saveCart();
      render();
      return;
    }
    if (action === "remove" || action === "remove-from-cart") {
      // Dal listino si toglie sempre la piantina; dal cassetto, la variante
      // scritta nella riga.
      const piantina =
        action === "remove" || trigger.dataset.variante === "piantina";
      // Fotografia di prima: è quello che l'annulla rimetterà a posto.
      const prima = cart.slice();
      cart = C().rimuovi(cart, id, piantina);
      saveCart();
      render();
      // Il messaggio semplice diceva «Rimossa» e basta: adesso porta con sé
      // il modo per tornare indietro, come nelle altre due pagine.
      return offriAnnulla("undo.removed", { nome: nomePer(id) }, prima);
    }
    // Il carrello è unico: "Svuota" lo svuota davvero, semi compresi. Per
    // togliere solo una parte ci sono i pulsanti riga per riga.
    if (action === "clear") {
      const prima = cart.slice();
      cart = C().svuota();
      render();
      if (prima.length) offriAnnulla("undo.cleared", null, prima);
      return;
    }
    if (action === "set-type") {
      const tipo = trigger.dataset.type || "";
      tipoAttivo = tipoAttivo === tipo ? "" : tipo;
      render();
      return;
    }
    if (action === "reset-filters") {
      tipoAttivo = "";
      filtro = "";
      ordine = "consigliati";
      render();
      return;
    }
    // L'invito incrociato verso le piantine punta al listino di questa pagina:
    // il cassetto lo coprirebbe, quindi si chiude e lascia scorrere.
    if (action === "cross-sell") {
      chiudiCarrello();
      return;
    }
    if (action === "edit-list") {
      chiudiCarrello();
      document.getElementById("vivSearch")?.focus({ preventScroll: true });
      return;
    }
    if (action === "show-cart") {
      event.preventDefault();
      apriCarrello();
      return;
    }
    if (action === "close-cart") {
      chiudiCarrello();
      return;
    }
    if (action === "checkout") {
      if (trigger.disabled) return;
      return checkout();
    }
  });

  // La ricerca filtra mentre si digita, senza ricaricare la pagina.
  document.addEventListener("input", (event) => {
    if (event.target.id !== "vivSearch") return;
    filtro = event.target.value;
    render();
  });

  // L'ordinamento vive nel corpo ridisegnato a ogni render: delega sul
  // documento, come per i clic.
  document.addEventListener("change", (event) => {
    if (event.target.id !== "vivSort") return;
    ordine = event.target.value;
    render();
  });

  document
    .getElementById("vivaioLangSelect")
    ?.addEventListener("change", (event) => applyLanguage(event.target.value));

  /* ---------- avvio ---------- */
  (async function boot() {
    let plants = null;
    try {
      plants = await window.SerraAPI?.getPlants?.();
    } catch (_) {}
    if (!plants) {
      try {
        plants = await (await fetch("db/plants.json")).json();
      } catch (_) {
        plants = [];
      }
    }
    PLANTS = plants || [];
    PLANTS.forEach((p) => (BYID[p.id] = p));
    let listino = null;
    try {
      listino = (await (await fetch("db/products.json")).json())?.items;
    } catch (_) {}
    PRODUCTS = listino || E.buildProducts(PLANTS, {});
    loadCart();
    applyLanguage(localStorage.getItem("ois.lang"));
  })();
})();
