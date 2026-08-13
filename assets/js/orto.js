/**
 * "Il mio orto": diario colturale, attività del giorno e dispensa di ciò che
 * l'utente ha acquistato e non ha ancora messo a dimora.
 *
 * Qui NON si vende nulla: è una sezione di aiuto alla coltivazione per semi e
 * piantine che l'utente possiede già. L'acquisto delle piantine vive nella
 * sezione Vivaio (vivaio.html).
 *
 * Regole di convivenza con il resto dell'applicazione:
 * - non scrive mai nel carrello (`ois.cart`) né negli ordini: li legge soltanto;
 * - non ricalcola prezzi né quantità dei semi: legge db/products.json, che è
 *   generato da PACK_DATA e resta allineato per costruzione;
 * - tema chiaro/scuro: gestito interamente da base.js tramite `.theme-toggle`;
 * - lingua: stesso contratto delle altre pagine (`ois.lang`, evento `storage`),
 *   con dizionario proprio come fa la guida.
 */
(() => {
  const E = window.SerraCareEngine;
  if (!E) return;

  const GARDEN_KEY = "serra.garden.v1";
  // Dispensa: ciò che è stato acquistato e non ancora piantato.
  const INVENTORY_KEY = "serra.inventory.v1";

  /* ============================================================
     Dizionario della pagina (namespace proprio, come guida.js)
     ============================================================ */
  const COPY = {
    it: {
      "page.title": "Il mio orto · Orto in Serra",
      "nav.brand_sub": "Coltiva con un piano",
      "nav.home": "Home",
      "nav.menu_explore": "Esplora",
      "nav.semi": "🌿 Catalogo semi",
      "nav.vivaio": "🪴 Vivaio piantine",
      "nav.orto": "🌱 Il mio orto",
      "nav.configuratore": "📐 Configuratore serra",
      "nav.account": "👤 Area Personale",
      "nav.account_label": "Area Personale",
      "nav.carrello": "Carrello",
      "page.tool_note":
        "Strumento gratuito per i semi e le piantine che hai già. Qui non si compra nulla.",
      "tab.oggi": "Oggi",
      "tab.colture": "Colture",
      "tab.dispensa": "Da piantare",

      "welcome.kicker": "Primo avvio",
      "welcome.title": "Comincia da quello che hai",
      "welcome.text":
        "Dimmi quali semi o piantine possiedi e da quando: penso io a ricordarti cosa fare, giorno per giorno, fino alla raccolta.",
      "welcome.add": "＋ Aggiungi una coltura",
      "welcome.orders": "Importa dai miei ordini",
      "welcome.greenhouse": "Importa dalla mia serra",
      "welcome.nothing": "Non hai ancora semi o piantine?",
      "welcome.shop_seeds": "Catalogo semi",
      "welcome.shop_plugs": "Vivaio piantine",
      "hero.todo_one": "Hai una cosa da fare",
      "hero.todo_many": "Hai {n} cose da fare",
      "hero.todo_none": "Niente di urgente oggi",
      "hero.sub_late":
        "{n} attività aspettano da qualche giorno: nessun dramma, si recuperano.",
      "hero.sub_ok": "Le colture procedono secondo il piano.",
      "hero.stat_colture": "colture",
      "hero.stat_done": "fatte oggi",
      "hero.stat_late": "da recuperare",
      "hero.ring": "giornata",
      "notif.title": "Notifica delle 07:30",
      "notif.text": "Oggi nell'orto: {lista}.",
      "notif.more": " e altre {n} attività",
      "notif.none": "Tutto fatto per oggi. Goditi la serra.",

      "section.late": "Da recuperare",
      "section.today": "Oggi",
      "section.done": "Fatto oggi",
      "task.snooze": "Domani",
      "task.late_days": "in ritardo di {n} giorni",
      "task.late_day": "in ritardo di 1 giorno",
      "task.last_days": "ultima volta {n} giorni fa",
      "task.last_day": "ultima volta 1 giorno fa",
      "today.empty_title": "Nessuna attività per oggi",
      "today.empty_text":
        "Le prossime scadenze di ogni coltura le trovi nella scheda “Colture”.",

      "task.germinazione": "Controlla la germinazione",
      "task.attecchimento": "Assesta la piantina",
      "task.irrigazione": "Annaffia",
      "task.concimazione": "Concima",
      "task.diradamento": "Dirada le piantine",
      "task.trapianto": "Trapianta a dimora",
      "task.tutoraggio": "Metti il sostegno",
      "task.controllo": "Controlla foglie e parassiti",
      "task.potatura": "Cima e pota",
      "task.raccolta": "Raccolta",
      "task.raccolta_scalare": "Raccolta scalare",

      "note.germinazione": "I primi cotiledoni dovrebbero essere fuori.",
      "note.diradamento": "Lascia {d} cm tra una pianta e l'altra.",
      "note.diradamento_radice": "Lascia {d} cm: le radici storte nascono qui.",
      "note.trapianto": "Distanza {d} cm sulla fila, {dr} cm tra le file.",
      "note.attecchimento":
        "Annaffia subito dopo il trapianto e ombreggia per due giorni.",
      "note.tutoraggio_rampicante":
        "Prepara rete o canne prima che si allunghi.",
      "note.irrigazione":
        "Fabbisogno {livello}. In serra controlla il terreno a 3 cm.",
      "note.concimazione": "Fabbisogno nutritivo {livello}.",
      "note.potatura_perenne":
        "Perenne: cima regolarmente per mantenerla compatta.",
      "note.raccolta_scalare": "Taglia le foglie esterne: la pianta ricaccia.",
      "level.bassa": "basso",
      "level.media": "medio",
      "level.alta": "alto",
      "tipo.frutto": "da frutto",
      "tipo.foglia": "da foglia",
      "tipo.radice": "da radice",
      "tipo.legume": "legume",
      "tipo.aromatica": "aromatica",

      "fase.semina": "Semina",
      "fase.germinazione": "Germinazione",
      "fase.crescita": "Crescita",
      "fase.raccolta": "Raccolta",
      "fase.dimora": "A dimora",
      "fase.attecchimento": "Attecchimento",
      "fase.sviluppo": "Sviluppo",
      "fase.impianto": "Impianto",
      "fase.perenne": "Perenne",

      "colture.title": "Le mie colture",
      "colture.sub":
        "Ogni coltura genera da sola il proprio calendario di cura fino alla raccolta.",
      "colture.add": "＋ Aggiungi coltura",
      "colture.import": "Importa dalla mia serra",
      "colture.ics": "Esporta nel calendario (.ics)",
      "colture.stat_active": "colture in corso",
      "colture.stat_plants": "piante seguite",
      "colture.stat_soon": "vicine alla raccolta",
      "colture.phase": "Fase attuale",
      "colture.harvest": "Raccolta stimata",
      "colture.harvest_now": "in corso",
      "colture.harvest_perennial": "perenne",
      "colture.cycle_done": "Ciclo completato",
      "colture.register": "Registra raccolta",
      "colture.remove": "Rimuovi",
      "colture.from_seed": "da seme",
      "colture.from_plant": "da piantina",
      "colture.plants": "{n} piante",
      "colture.empty_title": "Non stai ancora seguendo nulla",
      "colture.empty_text":
        "Aggiungi una coltura, oppure importa in un tocco le aiuole di una serra che hai già progettato.",

      "disp.title": "Da piantare",
      "disp.sub":
        "Semi e piantine che hai già e non hai ancora messo a dimora. Puoi piantarne un po' per volta, scegliendo ogni volta la data.",
      "disp.import": "Importa dai miei ordini",
      "disp.add_manual": "＋ Aggiungi a mano",
      "disp.empty_title": "Non hai nulla in attesa",
      "disp.empty_text":
        "Quando confermi un ordine, semi e piantine compaiono qui pronti da piantare. Puoi anche aggiungerli a mano.",
      "disp.plant_now": "Metti a dimora",
      "disp.archive": "Segna come finita",
      "disp.left": "{n} di {tot} ancora da mettere a dimora",
      "disp.all_planted": "Tutte messe a dimora",
      "disp.packet": "Bustina · {n} semi",
      "disp.plugs": "{n} piantine · vaso ø7",
      "disp.sowings_none": "Non ancora seminata",
      "disp.sowings_one": "1 semina fatta",
      "disp.sowings": "{n} semine fatte",
      "disp.from_order": "Ordine {id} · {data}",
      "disp.from_manual": "Aggiunta a mano",
      "disp.login_hint":
        "Accedi alla tua Area Personale per importare gli acquisti.",

      "plant.title": "Metti a dimora",
      "plant.sub": "Scegli quante piante avviare e quando.",
      "plant.qty": "Quante ne pianti ora",
      "plant.qty_hint_seed": "Quante piante avvii da questa bustina",
      "plant.qty_hint_plug": "Ne hai {n} disponibili",
      "plant.date": "Data di semina / messa a dimora",
      "plant.position": "Posizione (facoltativa)",
      "plant.confirm": "Metti a dimora",

      "dlg.plant_ph": "Scrivi un nome, es. pomodoro",
      "dlg.plant_unknown": "Non trovo questa pianta nel catalogo.",
      "edit.title": "Modifica coltura",
      "edit.confirm": "Salva",
      "edit.note":
        "Cambiando la data, il calendario delle attività viene ricalcolato da capo.",
      "colture.edit": "Modifica",
      "toast.edited": "Coltura aggiornata",
      "dlg.title": "Aggiungi una coltura",
      "dlg.sub": "Da qui parte il calendario di cura fino alla raccolta.",
      "dlg.plant": "Pianta",
      "dlg.origin": "Sei partito da…",
      "dlg.seed": "Semi",
      "dlg.seed_hint": "ciclo completo",
      "dlg.seedling": "Piantina",
      "dlg.seedling_hint": "già cresciuta",
      "dlg.date": "Data di semina / messa a dimora",
      "dlg.qty": "Quante",
      "dlg.position": "Posizione (facoltativa)",
      "dlg.position_ph": "es. Aiuola 2",
      "dlg.confirm": "Aggiungi all'orto",
      "dlg.cancel": "Annulla",

      "toast.added": "{nome} aggiunta al tuo orto",
      "toast.snoozed": "Rimandata a domani",
      "toast.removed": "Coltura rimossa",
      "toast.harvest": "Registrato: diventerà la stima dell'anno prossimo",
      "toast.imported": "{n} colture importate dalla serra",
      "toast.no_greenhouse": "Nessuna serra salvata in questo browser",
      "toast.ics": "{n} attività esportate",
      "toast.imported_orders": "{n} voci importate dai tuoi ordini",
      "toast.no_orders": "Nessun nuovo acquisto da importare",
      "toast.archived": "Archiviata",
      "toast.planted": "{n} × {nome} nel tuo orto",
      "harvest.prompt": "Quanti kg hai raccolto?",
      "cart.aria": "Apri carrello",
      "cart.label": "Carrello",
    },

    ro: {
      "page.title": "Grădina mea · Orto in Serra",
      "nav.brand_sub": "Cultivă cu un plan",
      "nav.home": "Acasă",
      "nav.menu_explore": "Explorează",
      "nav.semi": "🌿 Catalog de semințe",
      "nav.vivaio": "🪴 Pepinieră răsaduri",
      "nav.orto": "🌱 Grădina mea",
      "nav.configuratore": "📐 Configurator seră",
      "nav.account": "👤 Contul Meu",
      "nav.account_label": "Contul Meu",
      "nav.carrello": "Coș",
      "page.tool_note":
        "Instrument gratuit pentru semințele și răsadurile pe care le ai deja. Aici nu se cumpără nimic.",
      "tab.oggi": "Astăzi",
      "tab.colture": "Culturi",
      "tab.dispensa": "De plantat",

      "welcome.kicker": "Prima pornire",
      "welcome.title": "Începe de la ce ai deja",
      "welcome.text":
        "Spune-mi ce semințe sau răsaduri ai și de când: îți amintesc eu ce ai de făcut, zi de zi, până la recoltare.",
      "welcome.add": "＋ Adaugă o cultură",
      "welcome.orders": "Importă din comenzile mele",
      "welcome.greenhouse": "Importă din sera mea",
      "welcome.nothing": "Încă nu ai semințe sau răsaduri?",
      "welcome.shop_seeds": "Catalog semințe",
      "welcome.shop_plugs": "Pepinieră răsaduri",
      "hero.todo_one": "Ai un lucru de făcut",
      "hero.todo_many": "Ai {n} lucruri de făcut",
      "hero.todo_none": "Nimic urgent astăzi",
      "hero.sub_late":
        "{n} activități așteaptă de câteva zile: nicio problemă, se recuperează.",
      "hero.sub_ok": "Culturile merg conform planului.",
      "hero.stat_colture": "culturi",
      "hero.stat_done": "făcute azi",
      "hero.stat_late": "de recuperat",
      "hero.ring": "ziua",
      "notif.title": "Notificare la 07:30",
      "notif.text": "Astăzi în grădină: {lista}.",
      "notif.more": " și încă {n} activități",
      "notif.none": "Totul e făcut pentru azi. Bucură-te de seră.",

      "section.late": "De recuperat",
      "section.today": "Astăzi",
      "section.done": "Făcut azi",
      "task.snooze": "Mâine",
      "task.late_days": "întârziere de {n} zile",
      "task.late_day": "întârziere de o zi",
      "task.last_days": "ultima dată acum {n} zile",
      "task.last_day": "ultima dată acum o zi",
      "today.empty_title": "Nicio activitate pentru azi",
      "today.empty_text":
        "Următoarele termene ale fiecărei culturi le găsești în fila „Culturi”.",

      "task.germinazione": "Verifică germinația",
      "task.attecchimento": "Așază răsadul",
      "task.irrigazione": "Udă",
      "task.concimazione": "Fertilizează",
      "task.diradamento": "Rărește plantele",
      "task.trapianto": "Transplantează la locul definitiv",
      "task.tutoraggio": "Pune suportul",
      "task.controllo": "Verifică frunzele și dăunătorii",
      "task.potatura": "Ciupește și taie",
      "task.raccolta": "Recoltare",
      "task.raccolta_scalare": "Recoltare eșalonată",

      "note.germinazione": "Primele cotiledoane ar trebui să fie afară.",
      "note.diradamento": "Lasă {d} cm între plante.",
      "note.diradamento_radice":
        "Lasă {d} cm: rădăcinile strâmbe de aici pornesc.",
      "note.trapianto": "Distanță {d} cm pe rând, {dr} cm între rânduri.",
      "note.attecchimento":
        "Udă imediat după transplant și umbrește două zile.",
      "note.tutoraggio_rampicante":
        "Pregătește plasa sau aracii înainte să se alungească.",
      "note.irrigazione": "Necesar {livello}. În seră verifică solul la 3 cm.",
      "note.concimazione": "Necesar nutritiv {livello}.",
      "note.potatura_perenne":
        "Perenă: ciupește regulat ca să rămână compactă.",
      "note.raccolta_scalare":
        "Taie frunzele exterioare: planta lăstărește din nou.",
      "level.bassa": "scăzut",
      "level.media": "mediu",
      "level.alta": "ridicat",
      "tipo.frutto": "de fruct",
      "tipo.foglia": "de frunze",
      "tipo.radice": "de rădăcină",
      "tipo.legume": "leguminoasă",
      "tipo.aromatica": "aromatică",

      "fase.semina": "Semănat",
      "fase.germinazione": "Germinație",
      "fase.crescita": "Creștere",
      "fase.raccolta": "Recoltare",
      "fase.dimora": "La locul definitiv",
      "fase.attecchimento": "Prindere",
      "fase.sviluppo": "Dezvoltare",
      "fase.impianto": "Plantare",
      "fase.perenne": "Perenă",

      "colture.title": "Culturile mele",
      "colture.sub":
        "Fiecare cultură își generează singură calendarul de îngrijire până la recoltare.",
      "colture.add": "＋ Adaugă cultură",
      "colture.import": "Importă din sera mea",
      "colture.ics": "Exportă în calendar (.ics)",
      "colture.stat_active": "culturi în curs",
      "colture.stat_plants": "plante urmărite",
      "colture.stat_soon": "aproape de recoltare",
      "colture.phase": "Faza actuală",
      "colture.harvest": "Recoltare estimată",
      "colture.harvest_now": "în curs",
      "colture.harvest_perennial": "perenă",
      "colture.cycle_done": "Ciclu încheiat",
      "colture.register": "Înregistrează recolta",
      "colture.remove": "Elimină",
      "colture.from_seed": "din sămânță",
      "colture.from_plant": "din răsad",
      "colture.plants": "{n} plante",
      "colture.empty_title": "Încă nu urmărești nimic",
      "colture.empty_text":
        "Adaugă o cultură sau importă dintr-o atingere parcelele unei sere deja proiectate.",

      "disp.title": "De plantat",
      "disp.sub":
        "Semințe și răsaduri pe care le ai deja și nu le-ai pus încă în pământ. Poți planta pe rând, alegând de fiecare dată data.",
      "disp.import": "Importă din comenzile mele",
      "disp.add_manual": "＋ Adaugă manual",
      "disp.empty_title": "Nu ai nimic în așteptare",
      "disp.empty_text":
        "Când confirmi o comandă, semințele și răsadurile apar aici gata de plantat. Le poți adăuga și manual.",
      "disp.plant_now": "Pune în pământ",
      "disp.archive": "Marchează ca terminată",
      "disp.left": "{n} din {tot} încă de plantat",
      "disp.all_planted": "Toate plantate",
      "disp.packet": "Plic · {n} semințe",
      "disp.plugs": "{n} răsaduri · ghiveci ø7",
      "disp.sowings_none": "Încă nesemănată",
      "disp.sowings_one": "o semănare făcută",
      "disp.sowings": "{n} semănări făcute",
      "disp.from_order": "Comanda {id} · {data}",
      "disp.from_manual": "Adăugată manual",
      "disp.login_hint":
        "Autentifică-te în Zona Personală pentru a importa achizițiile.",

      "plant.title": "Pune în pământ",
      "plant.sub": "Alege câte plante pornești și când.",
      "plant.qty": "Câte plantezi acum",
      "plant.qty_hint_seed": "Câte plante pornești din acest plic",
      "plant.qty_hint_plug": "Ai {n} disponibile",
      "plant.date": "Data semănatului / plantării",
      "plant.position": "Poziție (opțional)",
      "plant.confirm": "Pune în pământ",

      "dlg.plant_ph": "Scrie un nume, ex. roșie",
      "dlg.plant_unknown": "Nu găsesc această plantă în catalog.",
      "edit.title": "Modifică cultura",
      "edit.confirm": "Salvează",
      "edit.note":
        "Dacă schimbi data, calendarul activităților este recalculat de la zero.",
      "colture.edit": "Modifică",
      "toast.edited": "Cultură actualizată",
      "dlg.title": "Adaugă o cultură",
      "dlg.sub": "De aici pornește calendarul de îngrijire până la recoltare.",
      "dlg.plant": "Plantă",
      "dlg.origin": "Ai pornit de la…",
      "dlg.seed": "Semințe",
      "dlg.seed_hint": "ciclu complet",
      "dlg.seedling": "Răsad",
      "dlg.seedling_hint": "deja crescut",
      "dlg.date": "Data semănatului / plantării",
      "dlg.qty": "Câte",
      "dlg.position": "Poziție (opțional)",
      "dlg.position_ph": "ex. Parcela 2",
      "dlg.confirm": "Adaugă în grădină",
      "dlg.cancel": "Anulează",

      "toast.added": "{nome} adăugată în grădina ta",
      "toast.snoozed": "Amânată pe mâine",
      "toast.removed": "Cultură eliminată",
      "toast.harvest": "Înregistrat: va deveni estimarea de anul viitor",
      "toast.imported": "{n} culturi importate din seră",
      "toast.no_greenhouse": "Nicio seră salvată în acest browser",
      "toast.ics": "{n} activități exportate",
      "toast.imported_orders": "{n} poziții importate din comenzile tale",
      "toast.no_orders": "Nicio achiziție nouă de importat",
      "toast.archived": "Arhivată",
      "toast.planted": "{n} × {nome} în grădina ta",
      "harvest.prompt": "Câte kg ai recoltat?",
      "cart.aria": "Deschide coșul",
      "cart.label": "Coș",
    },
  };

  const ICONE = {
    germinazione: "🌱",
    attecchimento: "🪴",
    irrigazione: "💧",
    concimazione: "🧪",
    diradamento: "✂️",
    trapianto: "🪴",
    tutoraggio: "🎋",
    controllo: "🔍",
    potatura: "✂️",
    raccolta: "🧺",
  };
  const COLORI = {
    germinazione: "#4f9a4a",
    attecchimento: "#2f6b3a",
    irrigazione: "#2f80c8",
    concimazione: "#9a7318",
    diradamento: "#7a5b9c",
    trapianto: "#2f6b3a",
    tutoraggio: "#8a5a2b",
    controllo: "#5c7a63",
    potatura: "#7a5b9c",
    raccolta: "#b5471f",
  };
  // Foto il cui nome file non coincide con l'id della pianta.
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

  /* ============================================================
     Stato
     ============================================================ */
  let lang = "it";
  let view = "oggi";
  let PLANTS = [];
  let PRODUCTS = {};
  const BYID = {};
  let garden = { colture: [], fatti: {}, rinviati: {} };
  let inventory = { voci: [] };
  let vocePendente = null; // voce della dispensa in corso di messa a dimora
  let colturaInModifica = null; // voce della dispensa in corso di messa a dimora

  const app = document.getElementById("ortoApp");
  const toastEl = document.getElementById("ortoToast");

  /* ---------- traduzione ---------- */
  function normalizeLang(value) {
    return value === "ro" ? "ro" : "it";
  }
  function t(key, vars) {
    let value = (COPY[lang] || {})[key] ?? COPY.it[key] ?? key;
    if (vars)
      Object.keys(vars).forEach((k) => {
        value = value.split("{" + k + "}").join(vars[k]);
      });
    return value;
  }
  // Nome e nota della pianta: in romeno arrivano dal dizionario condiviso.
  function plantName(plant) {
    if (lang === "ro")
      return window.SERRA_I18N?.plants?.ro?.[plant.id]?.nome || plant.nome;
    return plant.nome;
  }
  function plantNota(plant) {
    if (lang === "ro")
      return (
        window.SERRA_I18N?.plants?.ro?.[plant.id]?.nota || plant.nota || ""
      );
    return plant.nota || "";
  }
  function nomeMese(m) {
    const mesi = window.SERRA_I18N?.months?.[lang];
    if (mesi && mesi[m - 1]) return mesi[m - 1].toLowerCase();
    return String(m);
  }
  const locale = () => (lang === "ro" ? "ro-RO" : "it-IT");
  const fmtData = (d) =>
    d.toLocaleDateString(locale(), { day: "numeric", month: "long" });
  const fmtBreve = (d) =>
    d.toLocaleDateString(locale(), { day: "numeric", month: "short" });
  const money = (v) =>
    new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR",
    }).format(v);

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

  /* ---------- etichette derivate dal motore ---------- */
  function taskLabel(task) {
    if (task.tipo === "raccolta" && task.scalare)
      return t("task.raccolta_scalare");
    return t("task." + task.tipo);
  }
  function taskNota(task) {
    if (task.notaPianta) return plantNota(BYID[task.plantId]);
    if (!task.notaKey) return "";
    const vars = Object.assign({}, task.notaVars);
    if (vars.livello) vars.livello = t("level." + vars.livello);
    return t(task.notaKey, vars);
  }

  /* ============================================================
     Persistenza del diario (locale; in fase 3 si sincronizza col server)
     ============================================================ */
  function loadGarden() {
    try {
      const raw = JSON.parse(localStorage.getItem(GARDEN_KEY) || "null");
      if (raw && Array.isArray(raw.colture)) garden = raw;
    } catch (_) {}
    garden.fatti = garden.fatti || {};
    garden.rinviati = garden.rinviati || {};
  }
  function saveGarden() {
    try {
      localStorage.setItem(GARDEN_KEY, JSON.stringify(garden));
    } catch (_) {}
  }

  /* ---------- dispensa: acquistato ma non ancora piantato ---------- */
  function loadInventory() {
    try {
      const raw = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "null");
      if (raw && Array.isArray(raw.voci)) inventory = raw;
    } catch (_) {}
    inventory.voci = inventory.voci || [];
  }
  function saveInventory() {
    try {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (_) {}
  }
  // Le piantine si contano, le bustine no: da una bustina si semina più volte.
  const residuo = (voce) =>
    voce.variante === "piantina"
      ? Math.max(0, (voce.qta || 0) - (voce.qtaPiantata || 0))
      : null;

  // Legge gli ordini dell'utente e ne ricava le voci mancanti. Sola lettura.
  async function importaDaOrdini() {
    const utente = window.SerraAPI?.getCurrentUser?.();
    if (!utente) return toast(t("disp.login_hint"));
    let ordini = [];
    try {
      ordini = (await window.SerraAPI.getOrders()) || [];
    } catch (_) {}
    const miei = ordini.filter((o) => o.email === utente.email);
    let aggiunte = 0;
    miei.forEach((ordine) => {
      (ordine.items || []).forEach((item) => {
        if (!BYID[item.id]) return;
        const variante = item.variante === "piantina" ? "piantina" : "seme";
        const id = `${ordine.id}|${item.id}|${variante}`;
        if (inventory.voci.some((v) => v.id === id)) return;
        inventory.voci.push({
          id,
          plantId: item.id,
          variante,
          qta: Number(item.bustine) || 1,
          qtaPiantata: 0,
          semine: 0,
          orderId: ordine.id,
          dataAcquisto: (ordine.date || "").slice(0, 10),
          archiviata: false,
        });
        aggiunte++;
      });
    });
    if (!aggiunte) return toast(t("toast.no_orders"));
    saveInventory();
    render();
    toast(t("toast.imported_orders", { n: aggiunte }));
  }

  // Il distintivo del carrello resta quello dei semi: nessuna somma inventata.
  function updateCartBadge() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;
    try {
      const raw = JSON.parse(localStorage.getItem("ois.cart") || "[]");
      badge.textContent = String(Array.isArray(raw) ? raw.length : 0);
    } catch (_) {
      badge.textContent = "0";
    }
  }

  /* ============================================================
     Selettori derivati
     ============================================================ */
  function tuttiITask() {
    return garden.colture.flatMap((c) => {
      const plant = BYID[c.plantId];
      if (!plant) return [];
      return E.generaAttivita(c, plant, PRODUCTS[c.plantId]).map((task) =>
        Object.assign(task, { pianta: plant, coltura: c }),
      );
    });
  }
  const dataEffettiva = (task) =>
    garden.rinviati[task.id]
      ? E.parseDate(garden.rinviati[task.id])
      : task.data;

  function datiOggi() {
    const oggi = E.startOfToday();
    const aperti = E.comprimiRicorrenti(
      tuttiITask()
        .filter((task) => !garden.fatti[task.id])
        .map((task) => Object.assign({}, task, { quando: dataEffettiva(task) }))
        .filter((task) => task.quando <= oggi),
    );
    return {
      oggi,
      arretrati: aperti.filter((task) => E.diffDays(oggi, task.quando) > 0),
      diOggi: aperti.filter((task) => E.diffDays(oggi, task.quando) === 0),
      fatti: tuttiITask().filter(
        (task) => garden.fatti[task.id] === E.iso(oggi),
      ),
    };
  }

  /* ============================================================
     Viste
     ============================================================ */
  function ringSvg(percentuale) {
    const r = 58;
    const c = 2 * Math.PI * r;
    return `<svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
      <circle cx="66" cy="66" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
      <circle cx="66" cy="66" r="${r}" fill="none" stroke="#a8e6a3" stroke-width="10"
        stroke-linecap="round" stroke-dasharray="${c}"
        stroke-dashoffset="${c - (c * percentuale) / 100}"/>
    </svg>`;
  }

  // Primo avvio: senza colture né dispensa la vista "Oggi" direbbe che va
  // tutto bene quando in realtà non c'è nulla. Meglio chiedere da dove partire.
  function renderBenvenuto() {
    app.innerHTML = `
      <section class="orto-welcome">
        <span class="orto-welcome-ico" aria-hidden="true">🌱</span>
        <p class="orto-welcome-kicker">${t("welcome.kicker")}</p>
        <h2>${t("welcome.title")}</h2>
        <p class="orto-welcome-text">${t("welcome.text")}</p>
        <div class="orto-welcome-actions">
          <button class="orto-btn" type="button" data-orto-action="open-add">${t("welcome.add")}</button>
          <button class="orto-btn orto-btn--ghost" type="button"
            data-orto-action="import-orders">${t("welcome.orders")}</button>
          <button class="orto-btn orto-btn--ghost" type="button"
            data-orto-action="import-greenhouse">${t("welcome.greenhouse")}</button>
        </div>
        <p class="orto-welcome-shop">
          <span>${t("welcome.nothing")}</span>
          <a href="index.html#stagione">${t("welcome.shop_seeds")}</a>
          <span aria-hidden="true">·</span>
          <a href="vivaio.html">${t("welcome.shop_plugs")}</a>
        </p>
      </section>`;
  }

  function renderOggi() {
    if (!garden.colture.length && !inventory.voci.some((v) => !v.archiviata))
      return renderBenvenuto();
    const { oggi, arretrati, diOggi, fatti } = datiOggi();
    const totale = diOggi.length + fatti.length;
    const percentuale = totale
      ? Math.round((fatti.length / totale) * 100)
      : 100;
    const elenco = diOggi
      .slice(0, 2)
      .map(
        (task) =>
          `${taskLabel(task).toLowerCase()} ${plantName(task.pianta).toLowerCase()}`,
      )
      .join(", ");
    const testoNotifica = diOggi.length
      ? t("notif.text", { lista: elenco }) +
        (diOggi.length > 2 ? t("notif.more", { n: diOggi.length - 2 }) : "")
      : t("notif.none");

    app.innerHTML = `
      <section class="orto-hero">
        <div class="orto-hero-inner">
          <div>
            <p class="orto-hero-date">${oggi.toLocaleDateString(locale(), {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}</p>
            <h2>${
              diOggi.length === 0
                ? t("hero.todo_none")
                : diOggi.length === 1
                  ? t("hero.todo_one")
                  : t("hero.todo_many", { n: diOggi.length })
            }</h2>
            <p class="orto-hero-sub">${
              arretrati.length
                ? t("hero.sub_late", { n: arretrati.length })
                : t("hero.sub_ok")
            }</p>
            <div class="orto-hero-stats">
              <span><b>${garden.colture.length}</b><small>${t("hero.stat_colture")}</small></span>
              <span><b>${fatti.length}/${totale}</b><small>${t("hero.stat_done")}</small></span>
              <span><b>${arretrati.length}</b><small>${t("hero.stat_late")}</small></span>
            </div>
          </div>
          <div class="orto-ring-wrap">
            <div class="orto-ring">${ringSvg(percentuale)}
              <span class="orto-ring-txt"><b>${percentuale}%</b><small>${t("hero.ring")}</small></span>
            </div>
            <div class="orto-notif">
              <span class="orto-notif-ico" aria-hidden="true">🔔</span>
              <span><b>${t("notif.title")}</b><p>${escape(testoNotifica)}</p></span>
            </div>
          </div>
        </div>
      </section>

      ${
        arretrati.length
          ? sectionHead(t("section.late"), arretrati.length) +
            arretrati.map((task, i) => taskRow(task, i, true)).join("")
          : ""
      }

      ${sectionHead(t("section.today"), diOggi.length)}
      ${
        diOggi.length
          ? diOggi.map((task, i) => taskRow(task, i)).join("")
          : `<div class="orto-empty"><span class="orto-empty-ico">🌿</span>
              <h4>${t("today.empty_title")}</h4><p>${t("today.empty_text")}</p></div>`
      }

      ${
        fatti.length
          ? sectionHead(t("section.done"), fatti.length) +
            fatti
              .map((task, i) =>
                taskRow(
                  Object.assign({}, task, { quando: task.data }),
                  i,
                  false,
                  true,
                ),
              )
              .join("")
          : ""
      }`;
  }

  const sectionHead = (titolo, n) =>
    `<div class="orto-section-head"><h3>${titolo}</h3>
      <span class="orto-count">${n}</span><span class="orto-rule"></span></div>`;

  function taskRow(task, index, ritardo, fatto) {
    const coltura = task.coltura;
    const plant = task.pianta;
    const giorni = task.quando ? E.diffDays(E.startOfToday(), task.quando) : 0;
    const suffisso = !ritardo
      ? ""
      : E.RICORRENTI[task.tipo]
        ? giorni === 1
          ? t("task.last_day")
          : t("task.last_days", { n: giorni })
        : giorni === 1
          ? t("task.late_day")
          : t("task.late_days", { n: giorni });
    const meta = [coltura?.posizione, taskNota(task), suffisso]
      .filter(Boolean)
      .join(" · ");
    return `
      <article class="orto-task${ritardo ? " is-late" : ""}${fatto ? " is-done" : ""}"
        style="--task-accent:${COLORI[task.tipo] || "#2f6b3a"};animation-delay:${Math.min(index, 8) * 32}ms">
        <button class="orto-check" type="button" data-orto-action="toggle-task"
          data-task-id="${escape(task.id)}" data-on="${fatto ? 1 : 0}"
          aria-pressed="${fatto ? "true" : "false"}"
          aria-label="${escape(taskLabel(task))}"></button>
        <span class="orto-task-ico" aria-hidden="true">${ICONE[task.tipo] || "🌿"}</span>
        <span class="orto-task-body">
          <span class="orto-task-label">${escape(taskLabel(task))} <em>· ${escape(plantName(plant))}</em></span>
          <span class="orto-task-meta">${escape(meta) || "&nbsp;"}</span>
        </span>
        <img class="orto-task-thumb" src="${photoSrc(plant.id)}" alt="" loading="lazy" />
        ${
          fatto
            ? ""
            : `<button class="orto-snooze" type="button" data-orto-action="snooze-task"
                data-task-id="${escape(task.id)}">${t("task.snooze")}</button>`
        }
      </article>`;
  }

  function renderColture() {
    const oggi = E.startOfToday();
    const riepilogo = garden.colture.reduce(
      (acc, c) => {
        const plant = BYID[c.plantId];
        if (!plant) return acc;
        const gg = E.giorniARaccolta(plant, PRODUCTS[c.plantId], c.origine);
        const fine = E.addDays(E.parseDate(c.dataInizio), gg);
        if (gg && fine >= oggi && E.diffDays(fine, oggi) <= 14) acc.vicine++;
        acc.piante += Number(c.quantita) || 0;
        return acc;
      },
      { vicine: 0, piante: 0 },
    );

    app.innerHTML = `
      <div class="orto-view-head">
        <div>
          <h2>${t("colture.title")}</h2>
          <p>${t("colture.sub")}</p>
        </div>
        <button class="orto-btn" type="button" data-orto-action="open-add">${t("colture.add")}</button>
      </div>
      <div class="orto-stats">
        <div class="orto-stat"><span class="orto-stat-ico">🌿</span><span><b>${garden.colture.length}</b><small>${t("colture.stat_active")}</small></span></div>
        <div class="orto-stat"><span class="orto-stat-ico">🪴</span><span><b>${riepilogo.piante}</b><small>${t("colture.stat_plants")}</small></span></div>
        <div class="orto-stat"><span class="orto-stat-ico">🧺</span><span><b>${riepilogo.vicine}</b><small>${t("colture.stat_soon")}</small></span></div>
      </div>
      <div class="orto-toolbar">
        <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button" data-orto-action="import-greenhouse">${t("colture.import")}</button>
        <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button" data-orto-action="export-ics">${t("colture.ics")}</button>
      </div>
      <div class="orto-grid">${
        garden.colture.length
          ? garden.colture.map(colturaCard).join("")
          : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">🌱</span>
              <h4>${t("colture.empty_title")}</h4><p>${t("colture.empty_text")}</p></div>`
      }</div>`;
  }

  function colturaCard(coltura, index) {
    const plant = BYID[coltura.plantId];
    if (!plant) return "";
    const product = PRODUCTS[coltura.plantId];
    const oggi = E.startOfToday();
    const inizio = E.parseDate(coltura.dataInizio);
    const gg = E.giorniARaccolta(plant, product, coltura.origine);
    const trascorsi = Math.max(0, E.diffDays(oggi, inizio));
    const percentuale = gg
      ? Math.min(100, Math.round((trascorsi / gg) * 100))
      : 100;
    const raccolta = gg ? E.addDays(inizio, gg) : null;
    const mancano = gg ? E.diffDays(raccolta, oggi) : null;
    const prossimo = E.generaAttivita(coltura, plant, product)
      .filter((task) => !garden.fatti[task.id] && dataEffettiva(task) >= oggi)
      .sort((a, b) => dataEffettiva(a) - dataEffettiva(b))[0];
    const fasi = E.fasi(coltura, plant, product);
    const attuale =
      fasi.filter((f) => f.at * 100 <= percentuale).pop() || fasi[0];

    return `
      <article class="orto-card" style="animation-delay:${Math.min(index, 8) * 45}ms">
        <div class="orto-card-photo">
          <img class="orto-card-bg" src="${photoSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-badges">
            <span class="orto-chip orto-chip--${coltura.origine === "piantina" ? "piantina" : "seme"}">
              ${coltura.origine === "piantina" ? t("colture.from_plant") : t("colture.from_seed")}</span>
          </span>
          <img class="orto-card-svg" src="${svgSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-card-titles">
            <h3>${escape(plantName(plant))}</h3>
            <small>${t("colture.plants", { n: coltura.quantita })}${
              coltura.posizione ? " · " + escape(coltura.posizione) : ""
            }</small>
          </span>
        </div>
        <div class="orto-card-body">
          <div class="orto-track">
            <i style="width:${percentuale}%"></i>
            <span class="orto-track-cursor" style="left:${Math.min(99, percentuale)}%"></span>
          </div>
          <div class="orto-phase-labels">
            ${fasi
              .map((f) =>
                f.key === attuale.key
                  ? `<span><b>${t(f.key)}</b></span>`
                  : `<span>${t(f.key)}</span>`,
              )
              .join("")}
          </div>
          <div class="orto-meta-row"><span>${t("colture.phase")}</span><b>${t(attuale.key)}</b></div>
          <div class="orto-meta-row"><span>${t("colture.harvest")}</span><b>${
            raccolta
              ? mancano > 0
                ? `${fmtData(raccolta)} · −${mancano} g`
                : t("colture.harvest_now")
              : t("colture.harvest_perennial")
          }</b></div>
          <div class="orto-next">
            <span class="orto-next-ico">${prossimo ? ICONE[prossimo.tipo] || "🌿" : "✓"}</span>
            <span>${
              prossimo
                ? `<b>${escape(taskLabel(prossimo))}</b><br><small>${fmtBreve(dataEffettiva(prossimo))}</small>`
                : `<b>${t("colture.cycle_done")}</b>`
            }</span>
          </div>
          <div class="orto-card-actions">
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="edit-coltura" data-coltura-id="${escape(coltura.id)}">${t("colture.edit")}</button>
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="register-harvest" data-coltura-id="${escape(coltura.id)}">${t("colture.register")}</button>
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="remove-coltura" data-coltura-id="${escape(coltura.id)}">${t("colture.remove")}</button>
          </div>
        </div>
      </article>`;
  }

  function renderDispensa() {
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    );
    app.innerHTML = `
      <div class="orto-view-head">
        <div>
          <h2>${t("disp.title")}</h2>
          <p>${t("disp.sub")}</p>
        </div>
        <div class="orto-toolbar" style="margin:0">
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
            data-orto-action="import-orders">${t("disp.import")}</button>
          <button class="orto-btn orto-btn--sm" type="button"
            data-orto-action="open-add">${t("disp.add_manual")}</button>
        </div>
      </div>
      <div class="orto-grid">${
        attive.length
          ? attive.map(voceCard).join("")
          : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">📦</span>
              <h4>${t("disp.empty_title")}</h4><p>${t("disp.empty_text")}</p></div>`
      }</div>`;
  }

  function voceCard(voce, index) {
    const plant = BYID[voce.plantId];
    const product = PRODUCTS[voce.plantId] || {};
    const piantina = voce.variante === "piantina";
    const rimaste = residuo(voce);
    const unita = piantina
      ? t("disp.plugs", { n: voce.qta })
      : t("disp.packet", { n: product.semi?.semiPerBustina ?? "—" });
    const stato = piantina
      ? rimaste > 0
        ? t("disp.left", { n: rimaste, tot: voce.qta })
        : t("disp.all_planted")
      : voce.semine === 0
        ? t("disp.sowings_none")
        : voce.semine === 1
          ? t("disp.sowings_one")
          : t("disp.sowings", { n: voce.semine });
    const provenienza = voce.orderId
      ? t("disp.from_order", {
          id: escape(voce.orderId),
          data: voce.dataAcquisto
            ? fmtBreve(E.parseDate(voce.dataAcquisto))
            : "—",
        })
      : t("disp.from_manual");
    const percentuale =
      piantina && voce.qta ? ((voce.qtaPiantata || 0) / voce.qta) * 100 : 0;

    return `
      <article class="orto-card" style="animation-delay:${Math.min(index, 8) * 45}ms">
        <div class="orto-card-photo">
          <img class="orto-card-bg" src="${photoSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-badges">
            <span class="orto-chip orto-chip--${piantina ? "piantina" : "seme"}">
              ${piantina ? t("colture.from_plant") : t("colture.from_seed")}</span>
          </span>
          <img class="orto-card-svg" src="${svgSrc(plant.id)}" alt="" loading="lazy" />
          <span class="orto-card-titles">
            <h3>${escape(plantName(plant))}</h3>
            <small>${unita}</small>
          </span>
        </div>
        <div class="orto-card-body">
          ${
            piantina
              ? `<div class="orto-track"><i style="width:${percentuale}%"></i></div>`
              : ""
          }
          <div class="orto-meta-row" style="border-top:0">
            <span>${provenienza}</span><b>${stato}</b>
          </div>
          <div class="orto-card-actions">
            <button class="orto-btn orto-btn--sm" type="button"
              data-orto-action="plant-from-stock" data-voce-id="${escape(voce.id)}"
              ${piantina && rimaste === 0 ? "disabled" : ""}>${t("disp.plant_now")}</button>
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="archive-voce" data-voce-id="${escape(voce.id)}">${t("disp.archive")}</button>
          </div>
        </div>
      </article>`;
  }

  function render() {
    document.querySelectorAll("[data-orto-view]").forEach((button) => {
      const attivo = button.dataset.ortoView === view;
      button.setAttribute("aria-selected", String(attivo));
      button.classList.toggle("is-active", attivo);
    });
    const badge = document.getElementById("ortoTodayBadge");
    if (badge) {
      const n = datiOggi().diOggi.length;
      badge.hidden = !n;
      badge.textContent = String(n);
    }
    if (view === "colture") renderColture();
    else if (view === "dispensa") renderDispensa();
    else renderOggi();
  }

  /* ============================================================
     Lingua — stesso contratto delle altre pagine
     ============================================================ */
  function applyLanguage(value) {
    lang = normalizeLang(value);
    document.documentElement.lang = lang;
    document.title = t("page.title");
    document.querySelectorAll("[data-orto-key]").forEach((el) => {
      const text = t(el.dataset.ortoKey);
      if (text.includes("<")) el.innerHTML = text;
      else el.textContent = text;
    });
    document.querySelectorAll("[data-orto-key-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.ortoKeyAria));
    });
    document.querySelectorAll("[data-orto-key-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.ortoKeyPh));
    });
    // Il pulsante profilo mostra lo stato di accesso, non una voce tradotta.
    window.SerraAPI?.updateNavbarUser?.();
    const select = document.getElementById("ortoLangSelect");
    if (select) select.value = lang;
    try {
      localStorage.setItem("ois.lang", lang);
    } catch (_) {}
    riempiSelectPiante();
    render();
    document.documentElement.classList.remove("serra-i18n-pending");
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const next = normalizeLang(event.newValue);
    if (next !== lang) applyLanguage(next);
  });

  /* ============================================================
     Azioni
     ============================================================ */
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  function aggiungiColtura(plantId, origine, dataInizio, quantita, posizione) {
    garden.colture.unshift({
      id:
        "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      plantId,
      origine: origine === "piantina" ? "piantina" : "seme",
      dataInizio,
      quantita: Math.max(1, Number(quantita) || 1),
      posizione: posizione || "",
      stato: "in_corso",
      eventi: [],
    });
    saveGarden();
  }

  // Elenco dei nomi per il campo con suggerimenti: con 97 varietà un menu a
  // tendina costringe a scorrere, un campo che filtra no.
  let NOME_A_ID = {};
  function riempiSelectPiante() {
    const elenco = document.getElementById("ortoPlantList");
    if (!elenco) return;
    NOME_A_ID = {};
    elenco.innerHTML = PLANTS.map((p) => {
      const nome = plantName(p);
      NOME_A_ID[nome.toLowerCase()] = p.id;
      return `<option value="${escape(nome)}"></option>`;
    }).join("");
  }

  // Accetta il nome esatto oppure un inizio di parola non ambiguo.
  function risolviPianta(valore) {
    const cercato = (valore || "").trim().toLowerCase();
    if (!cercato) return null;
    if (NOME_A_ID[cercato]) return NOME_A_ID[cercato];
    const candidati = Object.keys(NOME_A_ID).filter((n) =>
      n.startsWith(cercato),
    );
    return candidati.length === 1 ? NOME_A_ID[candidati[0]] : null;
  }

  // Legge le aiuole della serra attiva senza modificarle.
  function importaDaSerra() {
    let beds = [];
    try {
      const store = JSON.parse(
        localStorage.getItem("serra.projects.v1") || "null",
      );
      const progetto = store?.projects?.find((p) => p.id === store.activeId);
      beds = progetto?.config?.beds || [];
    } catch (_) {}
    const ids = [
      ...new Set(beds.map((b) => b.plantId).filter((id) => BYID[id])),
    ];
    if (!ids.length) return toast(t("toast.no_greenhouse"));
    const oggi = E.iso(new Date());
    ids.forEach((id) => aggiungiColtura(id, "seme", oggi, 4, ""));
    render();
    toast(t("toast.imported", { n: ids.length }));
  }

  // Promemoria che funziona ovunque, iOS compreso, senza notifiche push.
  function esportaIcs() {
    const oggi = E.startOfToday();
    const tasks = tuttiITask()
      .filter((task) => dataEffettiva(task) >= oggi && !garden.fatti[task.id])
      .slice(0, 200);
    const stamp = (d) => E.iso(d).replace(/-/g, "");
    const eventi = tasks
      .map(
        (task) =>
          `BEGIN:VEVENT\r\nUID:${task.id}@ortoinserra\r\nDTSTART;VALUE=DATE:${stamp(
            dataEffettiva(task),
          )}\r\nSUMMARY:${taskLabel(task)} · ${plantName(task.pianta)}\r\nDESCRIPTION:${(
            taskNota(task) || ""
          ).replace(/[\r\n]+/g, " ")}\r\nEND:VEVENT`,
      )
      .join("\r\n");
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Orto in Serra//IT\r\n${eventi}\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "orto-in-serra.ics";
    link.click();
    URL.revokeObjectURL(url);
    toast(t("toast.ics", { n: tasks.length }));
  }

  document.addEventListener("click", (event) => {
    const viewBtn = event.target.closest("[data-orto-view]");
    if (viewBtn) {
      view = viewBtn.dataset.ortoView;
      return render();
    }
    const trigger = event.target.closest("[data-orto-action]");
    if (!trigger) return;
    const action = trigger.dataset.ortoAction;

    if (action === "toggle-task") {
      const id = trigger.dataset.taskId;
      if (garden.fatti[id]) delete garden.fatti[id];
      else {
        garden.fatti[id] = E.iso(new Date());
        trigger.dataset.on = "1";
      }
      saveGarden();
      return setTimeout(render, 190);
    }
    if (action === "snooze-task") {
      garden.rinviati[trigger.dataset.taskId] = E.iso(
        E.addDays(E.startOfToday(), 1),
      );
      saveGarden();
      toast(t("toast.snoozed"));
      return render();
    }
    if (action === "remove-coltura") {
      garden.colture = garden.colture.filter(
        (c) => c.id !== trigger.dataset.colturaId,
      );
      saveGarden();
      toast(t("toast.removed"));
      return render();
    }
    if (action === "register-harvest") {
      const coltura = garden.colture.find(
        (c) => c.id === trigger.dataset.colturaId,
      );
      const kg = window.prompt(t("harvest.prompt"), "1,5");
      if (kg && coltura) {
        coltura.eventi.push({
          data: E.iso(new Date()),
          tipo: "raccolta",
          quantitaKg: kg,
        });
        coltura.stato = "raccolta";
        saveGarden();
        toast(t("toast.harvest"));
      }
      return render();
    }
    if (action === "import-orders") return importaDaOrdini();
    if (action === "archive-voce") {
      const voce = inventory.voci.find((v) => v.id === trigger.dataset.voceId);
      if (voce) {
        voce.archiviata = true;
        saveInventory();
        toast(t("toast.archived"));
      }
      return render();
    }
    // Messa a dimora parziale: si sceglie quante piante avviare e quando.
    if (action === "plant-from-stock" && !trigger.disabled) {
      vocePendente = inventory.voci.find(
        (v) => v.id === trigger.dataset.voceId,
      );
      if (!vocePendente) return;
      const rimaste = residuo(vocePendente);
      const campo = document.getElementById("ortoPlantQty");
      const nota = document.getElementById("ortoPlantQtyHint");
      const titolo = document.getElementById("ortoPlantWho");
      if (titolo) titolo.textContent = plantName(BYID[vocePendente.plantId]);
      if (campo) {
        campo.value = rimaste ? Math.min(rimaste, 4) : 4;
        if (rimaste) campo.max = rimaste;
        else campo.removeAttribute("max");
      }
      if (nota)
        nota.textContent =
          rimaste === null
            ? t("plant.qty_hint_seed")
            : t("plant.qty_hint_plug", { n: rimaste });
      const data = document.getElementById("ortoPlantDate");
      if (data) data.value = E.iso(new Date());
      document.getElementById("ortoPlantDialog")?.showModal();
      return;
    }
    if (action === "open-add") {
      riempiSelectPiante();
      const campoPianta = document.getElementById("ortoPlantInput");
      if (campoPianta) campoPianta.value = "";
      const errore = document.getElementById("ortoPlantError");
      if (errore) errore.hidden = true;
      const dataInput = document.getElementById("ortoDate");
      if (dataInput) dataInput.value = E.iso(new Date());
      document.getElementById("ortoAddDialog")?.showModal();
      return;
    }
    // Correzione di una coltura già inserita: capita di sbagliare la data.
    if (action === "edit-coltura") {
      const coltura = garden.colture.find(
        (c) => c.id === trigger.dataset.colturaId,
      );
      if (!coltura) return;
      colturaInModifica = coltura.id;
      document.getElementById("ortoEditWho").textContent = plantName(
        BYID[coltura.plantId],
      );
      document.getElementById("ortoEditDate").value = coltura.dataInizio;
      document.getElementById("ortoEditQty").value = coltura.quantita;
      document.getElementById("ortoEditPosition").value =
        coltura.posizione || "";
      const radio = document.querySelector(
        `input[name="ortoEditOrigine"][value="${coltura.origine}"]`,
      );
      if (radio) radio.checked = true;
      document.getElementById("ortoEditDialog")?.showModal();
      return;
    }
    if (action === "import-greenhouse") return importaDaSerra();
    if (action === "export-ics") return esportaIcs();
  });

  document
    .getElementById("ortoAddForm")
    ?.addEventListener("submit", (event) => {
      if (event.submitter && event.submitter.value === "cancel") return;
      const campo = document.getElementById("ortoPlantInput");
      const errore = document.getElementById("ortoPlantError");
      const plantId = risolviPianta(campo.value);
      if (!plantId) {
        // method="dialog": senza preventDefault il dialogo si chiuderebbe comunque.
        event.preventDefault();
        if (errore) {
          errore.textContent = t("dlg.plant_unknown");
          errore.hidden = false;
        }
        campo.focus();
        campo.select();
        return;
      }
      if (errore) errore.hidden = true;
      const origine =
        document.querySelector('input[name="ortoOrigine"]:checked')?.value ||
        "seme";
      aggiungiColtura(
        plantId,
        origine,
        document.getElementById("ortoDate").value,
        document.getElementById("ortoQty").value,
        document.getElementById("ortoPosition").value.trim(),
      );
      const nome = plantName(BYID[plantId]);
      setTimeout(() => {
        view = "colture";
        render();
        toast(t("toast.added", { nome }));
      }, 0);
    });

  /* Salvataggio della modifica. Se cambia la data cambia anche l'identità
     delle attività (id = coltura|tipo|data): le spunte e i rinvii della vecchia
     pianificazione non avrebbero più senso e vengono azzerati per quella sola
     coltura. */
  document
    .getElementById("ortoEditForm")
    ?.addEventListener("submit", (event) => {
      const id = colturaInModifica;
      colturaInModifica = null;
      if ((event.submitter && event.submitter.value === "cancel") || !id)
        return;
      const coltura = garden.colture.find((c) => c.id === id);
      if (!coltura) return;
      const nuovaData =
        document.getElementById("ortoEditDate").value || coltura.dataInizio;
      const nuovaOrigine =
        document.querySelector('input[name="ortoEditOrigine"]:checked')
          ?.value || coltura.origine;
      const cambiaPianificazione =
        nuovaData !== coltura.dataInizio || nuovaOrigine !== coltura.origine;
      coltura.dataInizio = nuovaData;
      coltura.origine = nuovaOrigine;
      coltura.quantita = Math.max(
        1,
        Number(document.getElementById("ortoEditQty").value) ||
          coltura.quantita,
      );
      coltura.posizione = document
        .getElementById("ortoEditPosition")
        .value.trim();
      if (cambiaPianificazione) {
        [garden.fatti, garden.rinviati].forEach((mappa) => {
          Object.keys(mappa).forEach((chiave) => {
            if (chiave.startsWith(id + "|")) delete mappa[chiave];
          });
        });
      }
      saveGarden();
      setTimeout(() => {
        render();
        toast(t("toast.edited"));
      }, 0);
    });

  // Conferma della messa a dimora parziale dalla dispensa.
  document
    .getElementById("ortoPlantForm")
    ?.addEventListener("submit", (event) => {
      if (
        (event.submitter && event.submitter.value === "cancel") ||
        !vocePendente
      ) {
        vocePendente = null;
        return;
      }
      const voce = vocePendente;
      vocePendente = null;
      const rimaste = residuo(voce);
      const richieste = Math.max(
        1,
        Number(document.getElementById("ortoPlantQty").value) || 1,
      );
      const quante =
        rimaste === null ? richieste : Math.min(richieste, rimaste);
      aggiungiColtura(
        voce.plantId,
        voce.variante,
        document.getElementById("ortoPlantDate").value || E.iso(new Date()),
        quante,
        document.getElementById("ortoPlantPosition").value.trim(),
      );
      if (voce.variante === "piantina")
        voce.qtaPiantata = (voce.qtaPiantata || 0) + quante;
      else voce.semine = (voce.semine || 0) + 1;
      saveInventory();
      const nome = plantName(BYID[voce.plantId]);
      setTimeout(() => {
        view = "colture";
        render();
        toast(t("toast.planted", { n: quante, nome }));
      }, 0);
    });

  document
    .getElementById("ortoLangSelect")
    ?.addEventListener("change", (event) => applyLanguage(event.target.value));

  /* ============================================================
     Avvio
     ============================================================ */
  async function boot() {
    // Catalogo: stessa sorgente usata dal resto dell'app, con i suoi fallback.
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

    // Listino: file generato, allineato per costruzione a PACK_DATA.
    let listino = null;
    try {
      listino = (await (await fetch("db/products.json")).json())?.items;
    } catch (_) {}
    PRODUCTS = listino || E.buildProducts(PLANTS, {});

    loadGarden();
    loadInventory();
    updateCartBadge();
    // Un ingresso diretto su #da-piantare (dal pannello utente) apre la dispensa.
    if (location.hash === "#da-piantare") view = "dispensa";
    applyLanguage(localStorage.getItem("ois.lang"));
  }

  boot();
})();
