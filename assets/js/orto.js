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
  // Striscia «come funziona»: si chiude una volta e non torna più.
  const HOWTO_KEY = "serra.orto.howto";

  /* ============================================================
     Dizionario della pagina (namespace proprio, come guida.js)
     ============================================================ */
  const COPY = {
    it: {
      // Titolo della scheda del browser. Sta su una chiave distinta da
      // "page.title": quella è l'intestazione visibile della pagina e, avendo
      // lo stesso nome, sovrascriveva questa lasciando la scheda senza il
      // nome dell'applicazione.
      "doc.title": "Il mio orto · Orto in Serra",
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
      "nav.main_aria": "Navigazione principale",
      "nav.cart_aria": "Apri carrello",
      "page.title": "Il mio orto",
      "page.lead":
        "Registra cosa hai piantato e ti diciamo cosa fare, settimana per settimana, fino alla raccolta. Funziona anche con piante comprate altrove.",
      "tab.oggi": "Agenda",
      // La linguetta si chiama Agenda perché non mostra più solo oggi: la
      // riga di stato continua però a parlare della giornata in corso, che
      // resta la ragione per cui la si apre.
      "tab.oggi_todo": "da fare adesso",
      "tab.oggi_late": "{n} in ritardo",
      "tab.oggi_clear": "tutto a posto",
      // Le due righe di stato dicono la differenza fra le due schede: una
      // elenca ciò che è già in terra, l'altra ciò che non lo è ancora.
      "tab.colture_note": "già in terra",
      "tab.colture_empty": "ancora niente",
      "tab.dispensa_note": "non ancora in terra",
      "tab.dispensa_empty": "dispensa vuota",
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
      "hero.ring": "svolte",
      "hero.ring_aria": "{n} attività svolte su {tot} previste per oggi",

      "section.late": "Da recuperare",
      "section.today": "Oggi",
      "section.done": "Fatto oggi",
      "task.snooze": "Domani",
      "task.mark": "Segna come fatta",
      "task.unmark": "Togli la spunta",
      "task.mark_aria": "Segna come fatta: {cosa}, {nome}",
      "task.unmark_aria": "Togli la spunta: {cosa}, {nome}",
      "task.late_days": "in ritardo di {n} giorni",
      "task.late_day": "in ritardo di 1 giorno",
      "task.last_days": "ultima volta {n} giorni fa",
      "task.last_day": "ultima volta 1 giorno fa",
      "today.empty_title": "Nessuna attività per oggi",
      "today.empty_text":
        "Scorri la striscia dei giorni per vedere cosa arriva, oppure apri “Colture” per il quadro completo.",
      "today.empty_cta": "Vedi le colture",

      // Agenda: la striscia dei giorni e la giornata scelta.
      "agenda.strip_aria": "Scegli il giorno da vedere",
      "agenda.day_aria": "{data}: {n} attività da fare",
      "agenda.tomorrow": "Domani",
      "agenda.in_days": "Fra {n} giorni",
      "agenda.day_free": "Niente in programma per questo giorno.",
      "agenda.day_one": "Una cosa in programma.",
      "agenda.day_many": "{n} cose in programma.",
      "agenda.planned": "In programma",
      "agenda.back_today": "Torna a oggi",
      "agenda.free_title": "Giornata libera",
      "agenda.free_text":
        "Nessuna delle tue colture chiede qualcosa in questa data. Scorri la striscia per trovare il prossimo impegno.",

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
        "Le piante già messe a dimora. Ognuna genera da sola il proprio calendario di cura fino alla raccolta.",
      "colture.crosslink": "Hai {n} voci comprate e non ancora piantate.",
      "colture.crosslink_cta": "Vai a «Da piantare»",
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
      "colture.remove_aria": "Rimuovi la coltura di {nome}",
      "colture.from_seed": "da seme",
      "colture.from_plant": "da piantina",
      "colture.plants": "{n} piante",
      "colture.empty_title": "Non stai ancora seguendo nulla",
      "colture.empty_text":
        "Aggiungi una coltura, importa le aiuole di una serra che hai già progettato, oppure parti da ciò che hai in «Da piantare».",

      "disp.title": "Da piantare",
      "disp.sub":
        "Il magazzino: semi e piantine che possiedi e non sono ancora in terra. Qui non c'è nessun calendario, solo quanto ti resta.",
      "disp.crosslink": "Appena pianti qualcosa, compare fra le colture con il suo calendario.",
      "disp.crosslink_cta": "Vai a «Colture»",
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

      // Selettore visivo del dialogo «Aggiungi una coltura».
      "dlg.step_plant": "Quale pianta?",
      "dlg.step_when": "Quando e quante",
      "dlg.plant_ph": "Cerca una pianta",
      "dlg.family_all": "Tutte",
      "dlg.family_season": "Di stagione",
      "dlg.family_aria": "Filtra per famiglia",
      "dlg.plant_list_aria": "Piante disponibili",
      "dlg.in_season": "di stagione",
      "dlg.no_match": "Nessuna pianta con questo nome. Prova con meno lettere.",
      "dlg.plant_missing": "Scegli prima una pianta dall'elenco qui sopra.",
      "dlg.change_plant": "Cambia",
      "dlg.close": "Chiudi",
      "dlg.preview": "{nome} {origine}: raccolta stimata intorno al {data}.",
      "dlg.preview_perenne":
        "{nome} è una perenne: nessuna data di fine, il calendario continua di stagione in stagione.",
      // Striscia «come funziona»: tre passi, uno per linguetta.
      "howto.title": "Come funziona, in tre passi",
      "howto.close": "Nascondi la spiegazione",
      "howto.s1t": "Registra cosa hai",
      "howto.s1p": "Semi e piantine, comprati qui o altrove.",
      "howto.s2t": "Segui la giornata",
      "howto.s2p": "Le attività del giorno, e con un tocco anche dei successivi.",
      "howto.s3t": "Arriva alla raccolta",
      "howto.s3p": "Ogni coltura ha il suo calendario fino alla fine.",
      // La riga finale cambia con quello che c'è nell'orto: a chi non ha nulla
      // dice come partire, agli altri dove guardare per primo.
      "howto.start_empty":
        "<b>Da dove si comincia:</b> aggiungi la prima coltura qui sotto, oppure importa quello che hai già comprato.",
      "howto.start_stock":
        "<b>Da dove si comincia:</b> apri «Da piantare» e metti a dimora ciò che hai già.",
      "howto.start_today":
        "<b>Da dove si comincia:</b> «Agenda» è la linguetta da guardare ogni mattina; la striscia dei giorni dice anche cosa arriva dopo.",
      "edit.title": "Modifica coltura",
      "edit.confirm": "Salva",
      "edit.note":
        "Cambiando la data, il calendario delle attività viene ricalcolato da capo.",
      "colture.edit": "Modifica",
      "toast.edited": "Coltura aggiornata",
      "dlg.title": "Aggiungi una coltura",
      "dlg.sub": "Da qui parte il calendario di cura fino alla raccolta.",
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
      // Dialoghi delle azioni che non si possono annullare.
      "harvest.title": "Registra la raccolta",
      "harvest.sub": "Diventerà la stima per l'anno prossimo.",
      "harvest.kg": "Quanti kg hai raccolto?",
      "harvest.confirm": "Registra",
      "remove.title": "Eliminare questa coltura?",
      "remove.sub":
        "Spariscono anche le attività già svolte. Non si può annullare.",
      "remove.confirm": "Elimina",
    },

    ro: {
      "doc.title": "Grădina mea · Orto in Serra",
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
      "nav.main_aria": "Navigare principală",
      "nav.cart_aria": "Deschide coșul",
      "page.title": "Grădina mea",
      "page.lead":
        "Notează ce ai plantat și îți spunem ce ai de făcut, săptămână de săptămână, până la recoltare. Funcționează și cu plante cumpărate în altă parte.",
      "tab.oggi": "Agendă",
      "tab.oggi_todo": "de făcut acum",
      "tab.oggi_late": "{n} întârziate",
      "tab.oggi_clear": "totul în regulă",
      "tab.colture_note": "deja plantate",
      "tab.colture_empty": "încă nimic",
      "tab.dispensa_note": "încă neplantate",
      "tab.dispensa_empty": "cămară goală",
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
      "hero.ring": "făcute",
      "hero.ring_aria": "{n} activități făcute din {tot} prevăzute pentru azi",

      "section.late": "De recuperat",
      "section.today": "Astăzi",
      "section.done": "Făcut azi",
      "task.snooze": "Mâine",
      "task.mark": "Marchează ca făcută",
      "task.unmark": "Scoate bifa",
      "task.mark_aria": "Marchează ca făcută: {cosa}, {nome}",
      "task.unmark_aria": "Scoate bifa: {cosa}, {nome}",
      "task.late_days": "întârziere de {n} zile",
      "task.late_day": "întârziere de o zi",
      "task.last_days": "ultima dată acum {n} zile",
      "task.last_day": "ultima dată acum o zi",
      "today.empty_title": "Nicio activitate pentru azi",
      "today.empty_text":
        "Derulează banda zilelor ca să vezi ce urmează sau deschide „Culturi” pentru imaginea completă.",
      "today.empty_cta": "Vezi culturile",

      "agenda.strip_aria": "Alege ziua pe care vrei să o vezi",
      "agenda.day_aria": "{data}: {n} activități de făcut",
      "agenda.tomorrow": "Mâine",
      "agenda.in_days": "Peste {n} zile",
      "agenda.day_free": "Nimic programat pentru această zi.",
      "agenda.day_one": "Un lucru programat.",
      "agenda.day_many": "{n} lucruri programate.",
      "agenda.planned": "Programate",
      "agenda.back_today": "Înapoi la azi",
      "agenda.free_title": "Zi liberă",
      "agenda.free_text":
        "Niciuna dintre culturile tale nu cere ceva la această dată. Derulează banda pentru a găsi următoarea sarcină.",

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
      // Etichetta di una barra a quattro colonne strette: «La locul definitiv»
      // ci andava a capo tre volte.
      "fase.dimora": "Plantat",
      "fase.attecchimento": "Prindere",
      "fase.sviluppo": "Dezvoltare",
      "fase.impianto": "Plantare",
      "fase.perenne": "Perenă",

      "colture.title": "Culturile mele",
      "colture.sub":
        "Plantele deja puse în pământ. Fiecare își generează singură calendarul de îngrijire până la recoltare.",
      "colture.crosslink": "Ai {n} poziții cumpărate și încă neplantate.",
      "colture.crosslink_cta": "Mergi la „De plantat”",
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
      "colture.remove_aria": "Elimină cultura de {nome}",
      "colture.from_seed": "din sămânță",
      "colture.from_plant": "din răsad",
      "colture.plants": "{n} plante",
      "colture.empty_title": "Încă nu urmărești nimic",
      "colture.empty_text":
        "Adaugă o cultură, importă parcelele unei sere deja proiectate sau pornește de la ce ai în „De plantat”.",

      "disp.title": "De plantat",
      "disp.sub":
        "Depozitul: semințe și răsaduri pe care le ai și care nu sunt încă în pământ. Aici nu există niciun calendar, doar cât ți-a rămas.",
      "disp.crosslink": "Imediat ce plantezi ceva, apare printre culturi cu propriul calendar.",
      "disp.crosslink_cta": "Mergi la „Culturi”",
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

      "dlg.step_plant": "Ce plantă?",
      "dlg.step_when": "Când și câte",
      "dlg.plant_ph": "Caută o plantă",
      "dlg.family_all": "Toate",
      "dlg.family_season": "De sezon",
      "dlg.family_aria": "Filtrează după familie",
      "dlg.plant_list_aria": "Plante disponibile",
      "dlg.in_season": "de sezon",
      "dlg.no_match": "Nicio plantă cu acest nume. Încearcă cu mai puține litere.",
      "dlg.plant_missing": "Alege întâi o plantă din lista de mai sus.",
      "dlg.change_plant": "Schimbă",
      "dlg.close": "Închide",
      "dlg.preview": "{nome} {origine}: recoltare estimată în jurul datei de {data}.",
      "dlg.preview_perenne":
        "{nome} este o plantă perenă: nu are dată de final, calendarul continuă din sezon în sezon.",
      "howto.title": "Cum funcționează, în trei pași",
      "howto.close": "Ascunde explicația",
      "howto.s1t": "Notează ce ai",
      "howto.s1p": "Semințe și răsaduri, cumpărate aici sau în altă parte.",
      "howto.s2t": "Urmărește ziua",
      "howto.s2p": "Activitățile zilei și, cu o atingere, și ale zilelor următoare.",
      "howto.s3t": "Ajungi la recoltă",
      "howto.s3p": "Fiecare cultură are calendarul ei până la final.",
      "howto.start_empty":
        "<b>De unde începi:</b> adaugă prima cultură mai jos sau importă ce ai cumpărat deja.",
      "howto.start_stock":
        "<b>De unde începi:</b> deschide „De plantat” și pune în pământ ce ai deja.",
      "howto.start_today":
        "<b>De unde începi:</b> „Agendă” este fila de urmărit în fiecare dimineață; banda zilelor arată și ce urmează.",
      "edit.title": "Modifică cultura",
      "edit.confirm": "Salvează",
      "edit.note":
        "Dacă schimbi data, calendarul activităților este recalculat de la zero.",
      "colture.edit": "Modifică",
      "toast.edited": "Cultură actualizată",
      "dlg.title": "Adaugă o cultură",
      "dlg.sub": "De aici pornește calendarul de îngrijire până la recoltare.",
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
      "harvest.title": "Înregistrează recolta",
      "harvest.sub": "Va deveni estimarea pentru anul viitor.",
      "harvest.kg": "Câte kg ai recoltat?",
      "harvest.confirm": "Înregistrează",
      "remove.title": "Ștergi această cultură?",
      "remove.sub": "Dispar și activitățile deja făcute. Nu se poate anula.",
      "remove.confirm": "Șterge",
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
  let colturaInModifica = null; // coltura aperta nel dialogo di modifica
  let colturaDaRimuovere = null; // coltura in attesa di conferma di rimozione
  let colturaDaRaccogliere = null; // coltura di cui si sta registrando la resa

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
     Agenda: la giornata scelta, non solo quella di oggi
     ============================================================
     La vista rispondeva a una domanda sola — «cosa devo fare adesso» — e per
     sapere cosa sarebbe successo giovedì bisognava aprire le colture una per
     una e leggere la prossima scadenza di ciascuna. Il motore genera già tutto
     il calendario di ogni coltura fino alla raccolta: qui viene solo indicizzato
     per giorno.
     Il giorno scelto vive in memoria e non viene salvato: riaprendo la pagina si
     riparte da oggi, che è quasi sempre la domanda giusta. */
  const GIORNI_AVANTI = 20;
  let giornoScelto = null; // ISO; null significa «oggi»

  const isoOggi = () => E.iso(E.startOfToday());
  const isoScelto = () => giornoScelto || isoOggi();

  // Finestra della striscia: da oggi in avanti. All'indietro non serve, perché
  // ciò che è rimasto indietro compare comunque fra gli arretrati di oggi.
  function giorniAgenda() {
    const inizio = E.startOfToday();
    const giorni = [];
    for (let i = 0; i <= GIORNI_AVANTI; i++) giorni.push(E.iso(E.addDays(inizio, i)));
    // Un giorno scelto fuori finestra (si può arrivarci solo da un rinvio)
    // resta comunque raggiungibile.
    if (giornoScelto && !giorni.includes(giornoScelto)) {
      giorni.push(giornoScelto);
      giorni.sort();
    }
    return giorni;
  }

  /* Una sola passata su tutte le attività: chiamare il motore una volta per
     ciascuno dei ventun giorni della striscia significherebbe rigenerare il
     calendario di ogni coltura ventun volte a ogni ridisegno. */
  function indicizzaPerGiorno(giorni) {
    const indice = {};
    giorni.forEach((g) => (indice[g] = { previste: [], fatte: [] }));
    tuttiITask().forEach((task) => {
      const svolta = garden.fatti[task.id];
      if (svolta) {
        if (indice[svolta]) indice[svolta].fatte.push(task);
        return;
      }
      const quando = E.iso(dataEffettiva(task));
      if (indice[quando])
        indice[quando].previste.push(
          Object.assign({}, task, { quando: dataEffettiva(task) }),
        );
    });
    return indice;
  }

  /* ============================================================
     Viste
     ============================================================ */
  function ringSvg(percentuale) {
    const r = 58;
    const c = 2 * Math.PI * r;
    /* Due cerchi sovrapposti: la traccia tenue dice quanto è lunga la giornata,
       l'arco verde quanto ne è stato fatto. Senza la traccia, a zero per cento
       non resterebbe nulla intorno al numero. */
    /* I colori stanno nel CSS (.orto-ring-track/.orto-ring-arc): erano scritti
       qui in bianco e verde chiarissimo, tarati sulla vecchia fascia verde
       scura, e sulla carta chiara l'anello spariva. */
    return `<svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
      <circle class="orto-ring-track" cx="66" cy="66" r="${r}" fill="none" stroke-width="10"/>
      <circle class="orto-ring-arc" cx="66" cy="66" r="${r}" fill="none" stroke-width="10"
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

  /* La striscia dei giorni: una data per pulsante, con il numero di attività
     ancora da fare. È la parte che risponde alla domanda «e giovedì?» senza
     aprire nulla. Scorre in orizzontale e il giorno scelto è sempre portato in
     vista da JavaScript dopo il disegno. */
  function stripGiorniHtml(giorni, indice) {
    const oggi = isoOggi();
    const scelto = isoScelto();
    return `
      <div class="orto-daystrip" role="tablist"
        aria-label="${escape(t("agenda.strip_aria"))}">
        ${giorni
          .map((iso) => {
            const data = E.parseDate(iso);
            const n = indice[iso].previste.length;
            const attivo = iso === scelto;
            return `
            <button type="button" class="orto-day${attivo ? " is-selected" : ""}${
              iso === oggi ? " is-today" : ""
            }" role="tab" aria-selected="${attivo}" tabindex="${attivo ? 0 : -1}"
              data-orto-action="pick-day" data-day="${iso}"
              aria-label="${escape(
                t("agenda.day_aria", {
                  data: data.toLocaleDateString(locale(), {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }),
                  n,
                }),
              )}">
              <span class="orto-day-dow" aria-hidden="true">${escape(
                data.toLocaleDateString(locale(), { weekday: "short" }),
              )}</span>
              <span class="orto-day-num" aria-hidden="true">${data.getDate()}</span>
              <span class="orto-day-dot${n ? "" : " is-empty"}" aria-hidden="true">${
                n || ""
              }</span>
            </button>`;
          })
          .join("")}
      </div>`;
  }

  function renderAgenda() {
    if (!garden.colture.length && !inventory.voci.some((v) => !v.archiviata))
      return renderBenvenuto();

    const giorni = giorniAgenda();
    const indice = indicizzaPerGiorno(giorni);
    const scelto = isoScelto();
    const oggiIso = isoOggi();
    const strip = stripGiorniHtml(giorni, indice);

    // Un giorno diverso da oggi non ha arretrati né anello: gli arretrati sono
    // per definizione di oggi, e la percentuale di una giornata non ancora
    // cominciata direbbe sempre zero.
    if (scelto !== oggiIso) {
      const data = E.parseDate(scelto);
      const previste = indice[scelto].previste;
      const fatte = indice[scelto].fatte;
      const mancano = E.diffDays(data, E.startOfToday());
      app.innerHTML = `
        ${strip}
        <section class="orto-dayhead">
          <div>
            <p class="orto-dayhead-when">${
              mancano === 1
                ? t("agenda.tomorrow")
                : t("agenda.in_days", { n: mancano })
            }</p>
            <h2>${escape(
              data.toLocaleDateString(locale(), {
                weekday: "long",
                day: "numeric",
                month: "long",
              }),
            )}</h2>
            <p class="orto-dayhead-sub">${
              previste.length === 0
                ? t("agenda.day_free")
                : previste.length === 1
                  ? t("agenda.day_one")
                  : t("agenda.day_many", { n: previste.length })
            }</p>
          </div>
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
            data-orto-action="pick-day" data-day="${oggiIso}">${t("agenda.back_today")}</button>
        </section>

        ${
          previste.length
            ? sectionHead(t("agenda.planned"), previste.length) +
              previste.map((task, i) => taskRow(task, i)).join("")
            : `<div class="orto-empty"><span class="orto-empty-ico">🌤️</span>
                <h4>${t("agenda.free_title")}</h4><p>${t("agenda.free_text")}</p></div>`
        }

        ${
          fatte.length
            ? sectionHead(t("section.done"), fatte.length) +
              fatte
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
      return;
    }

    const { oggi, arretrati, diOggi, fatti } = datiOggi();
    const totale = diOggi.length + fatti.length;
    const percentuale = totale
      ? Math.round((fatti.length / totale) * 100)
      : 100;
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
          <!-- Il riquadro delle notifiche elencava a parole le stesse
               attività che stanno subito sotto: tolto. Resta l'anello, che
               è l'unico dato che l'elenco non dà a colpo d'occhio. -->
          <!-- L'anello diceva «giornata», che non spiega cosa stia contando.
               Ora l'etichetta nomina la cosa misurata e la stessa frase è
               disponibile per chi non vede il grafico. -->
          <div class="orto-ring-wrap">
            <div class="orto-ring" role="img"
              aria-label="${escape(t("hero.ring_aria", { n: fatti.length, tot: totale }))}">
              ${ringSvg(percentuale)}
              <span class="orto-ring-txt" aria-hidden="true"><b>${percentuale}%</b><small>${t("hero.ring")}</small></span>
            </div>
          </div>
        </div>
      </section>

      ${strip}

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
              <h4>${t("today.empty_title")}</h4><p>${t("today.empty_text")}</p>
              <div class="orto-empty-actions">
                <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                  data-orto-view="colture">${t("today.empty_cta")}</button>
              </div></div>`
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
          title="${escape(t(fatto ? "task.unmark" : "task.mark"))}"
          aria-label="${escape(
            t(fatto ? "task.unmark_aria" : "task.mark_aria", {
              cosa: taskLabel(task),
              nome: plantName(plant),
            }),
          )}"></button>
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

    // Voci comprate e non ancora piantate: se ce ne sono, questa vista lo dice
    // e ci porta, invece di lasciare due elenchi che si ignorano.
    const inAttesa = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    ).length;

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
      ${
        inAttesa
          ? `<p class="orto-crosslink">
              <span class="orto-crosslink-ico" aria-hidden="true">📦</span>
              <span>${t("colture.crosslink", { n: inAttesa })}</span>
              <button class="orto-link" type="button" data-orto-view="dispensa">${
                t("colture.crosslink_cta") + " →"
              }</button>
            </p>`
          : ""
      }
      <div class="orto-grid">${
        garden.colture.length
          ? garden.colture.map(colturaCard).join("")
          : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">🌱</span>
              <h4>${t("colture.empty_title")}</h4><p>${t("colture.empty_text")}</p>
              <div class="orto-empty-actions">
                <button class="orto-btn" type="button" data-orto-action="open-add">${t("colture.add")}</button>
                <button class="orto-btn orto-btn--ghost" type="button"
                  data-orto-action="import-greenhouse">${t("colture.import")}</button>
              </div></div>`
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
    // Raccolta in corso o entro una settimana: è il momento in cui l'azione
    // principale della scheda cambia.
    const raccoltaOra = mancano === null || mancano <= 7;

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
          <!-- Le tre azioni avevano lo stesso peso, compresa quella che
               cancella. Ora la principale è quella che serve adesso — a raccolta
               vicina è «Registra raccolta» — e l'eliminazione è un'icona, che si
               trova quando la si cerca senza invitare a premerla. -->
          <div class="orto-card-actions">
            <button class="orto-btn ${raccoltaOra ? "" : "orto-btn--ghost "}orto-btn--sm" type="button"
              data-orto-action="${raccoltaOra ? "register-harvest" : "edit-coltura"}"
              data-coltura-id="${escape(coltura.id)}">${
                raccoltaOra ? t("colture.register") : t("colture.edit")
              }</button>
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="${raccoltaOra ? "edit-coltura" : "register-harvest"}"
              data-coltura-id="${escape(coltura.id)}">${
                raccoltaOra ? t("colture.edit") : t("colture.register")
              }</button>
            <button class="orto-icon-btn" type="button"
              data-orto-action="remove-coltura" data-coltura-id="${escape(coltura.id)}"
              title="${escape(t("colture.remove"))}"
              aria-label="${escape(t("colture.remove_aria", { nome: plantName(plant) }))}">
              <span aria-hidden="true">🗑</span></button>
          </div>
        </div>
      </article>`;
  }

  /* La dispensa non è un secondo elenco di colture: è il magazzino di ciò che
     si possiede e non è ancora in terra. Prima le due viste usavano la stessa
     scheda — foto grande, distintivo, barra di avanzamento — e a colpo d'occhio
     sembravano fare la stessa cosa. Qui le voci sono righe da inventario: niente
     foto, niente barra di crescita, in evidenza la quantità che resta. */
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
      ${
        attive.length
          ? `<p class="orto-crosslink">
              <span class="orto-crosslink-ico" aria-hidden="true">🌱</span>
              <span>${t("disp.crosslink")}</span>
              <button class="orto-link" type="button" data-orto-view="colture">${
                t("disp.crosslink_cta") + " →"
              }</button>
            </p>`
          : ""
      }
      ${
        attive.length
          ? `<div class="orto-stock-list">${attive.map(voceCard).join("")}</div>`
          : `<div class="orto-empty"><span class="orto-empty-ico">📦</span>
              <h4>${t("disp.empty_title")}</h4><p>${t("disp.empty_text")}</p>
              <div class="orto-empty-actions">
                <button class="orto-btn" type="button"
                  data-orto-action="import-orders">${t("disp.import")}</button>
                <button class="orto-btn orto-btn--ghost" type="button"
                  data-orto-action="open-add">${t("disp.add_manual")}</button>
              </div></div>`
      }`;
  }

  function voceCard(voce, index) {
    const plant = BYID[voce.plantId];
    const product = PRODUCTS[voce.plantId] || {};
    const piantina = voce.variante === "piantina";
    const rimaste = residuo(voce);
    const esaurita = piantina && rimaste === 0;
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

    return `
      <article class="orto-stock${esaurita ? " is-empty" : ""}"
        style="animation-delay:${Math.min(index, 8) * 40}ms">
        <span class="orto-stock-ico" aria-hidden="true">
          <img src="${svgSrc(plant.id)}" alt="" width="34" height="34" loading="lazy" />
        </span>
        <div class="orto-stock-body">
          <h3 class="orto-stock-name">
            ${escape(plantName(plant))}
            <span class="orto-chip orto-chip--${piantina ? "piantina" : "seme"}">${
              piantina ? t("colture.from_plant") : t("colture.from_seed")
            }</span>
          </h3>
          <!-- Le piantine si contano una a una, le bustine no: la riga forte è
               «quante restano» per le prime e «quante semine» per le seconde. -->
          <p class="orto-stock-count">${stato}</p>
          <p class="orto-stock-meta">${unita} · ${provenienza}</p>
        </div>
        <div class="orto-stock-actions">
          <button class="orto-btn orto-btn--sm" type="button"
            data-orto-action="plant-from-stock" data-voce-id="${escape(voce.id)}"
            ${esaurita ? "disabled" : ""}>${t("disp.plant_now")}</button>
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
            data-orto-action="archive-voce" data-voce-id="${escape(voce.id)}">${t("disp.archive")}</button>
        </div>
      </article>`;
  }

  /* La striscia dei tre passi: è una didascalia, non un comando. Evidenzia il
     passo corrispondente alla vista aperta — così dice anche dove ci si trova —
     e chiude con la riga che suggerisce da quale linguetta cominciare, scelta
     in base a cosa c'è davvero nell'orto di chi guarda. */
  function syncHowto() {
    const box = document.getElementById("ortoHowto");
    if (!box) return;
    let chiusa = false;
    try {
      chiusa = localStorage.getItem(HOWTO_KEY) === "off";
    } catch (_) {}
    box.hidden = chiusa;
    if (chiusa) return;
    box.querySelectorAll("[data-orto-step]").forEach((passo) => {
      passo.classList.toggle("is-current", passo.dataset.ortoStep === view);
    });
    const suggerimento = document.getElementById("ortoHowtoHint");
    if (!suggerimento) return;
    const inAttesa = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    ).length;
    const chiave = !garden.colture.length && !inAttesa
      ? "howto.start_empty"
      : inAttesa
        ? "howto.start_stock"
        : "howto.start_today";
    suggerimento.innerHTML = t(chiave);
  }

  function render() {
    // Le linguette sono un tablist: una sola resta raggiungibile con Tab, le
    // altre con le frecce. Prima erano tutte nel giro di tabulazione e nessuna
    // rispondeva alla tastiera direzionale.
    const linguette = [...document.querySelectorAll(".orto-tab")];
    linguette.forEach((button) => {
      const attivo = button.dataset.ortoView === view;
      button.setAttribute("aria-selected", String(attivo));
      button.classList.toggle("is-active", attivo);
      button.tabIndex = attivo ? 0 : -1;
    });
    const attiva = linguette.find((b) => b.dataset.ortoView === view);
    if (attiva && app) app.setAttribute("aria-labelledby", attiva.id);
    // Il pannello ricorda quale vista sta mostrando anche fuori dalle linguette
    // (la striscia dei passi ci porta senza passare da lì).
    syncHowto();
    /* Ogni linguetta porta il proprio numero e una riga di stato. Prima il
       conteggio c'era solo su «Oggi»: le altre due non lasciavano capire se
       dentro ci fosse qualcosa, e si aprivano alla cieca. */
    const { diOggi, arretrati } = datiOggi();
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    ).length;
    const conteggi = [
      ["ortoTodayBadge", diOggi.length],
      ["ortoColtureBadge", garden.colture.length],
      ["ortoDispensaBadge", attive],
    ];
    conteggi.forEach(([id, n]) => {
      const badge = document.getElementById(id);
      if (!badge) return;
      badge.hidden = !n;
      badge.textContent = String(n);
    });
    const note = [
      [
        "ortoOggiNote",
        arretrati.length
          ? t("tab.oggi_late", { n: arretrati.length })
          : diOggi.length
            ? t("tab.oggi_todo")
            : t("tab.oggi_clear"),
      ],
      [
        "ortoColtureNote",
        garden.colture.length ? t("tab.colture_note") : t("tab.colture_empty"),
      ],
      [
        "ortoDispensaNote",
        attive ? t("tab.dispensa_note") : t("tab.dispensa_empty"),
      ],
    ];
    note.forEach(([id, testo]) => {
      const nodo = document.getElementById(id);
      if (nodo) nodo.textContent = testo;
    });
    document
      .getElementById("ortoOggiNote")
      ?.classList.toggle("is-late", arretrati.length > 0);
    if (view === "colture") renderColture();
    else if (view === "dispensa") renderDispensa();
    else renderAgenda();
    // La striscia parte da oggi ma può essere scorsa: dopo ogni ridisegno il
    // giorno scelto torna al centro, altrimenti selezionandone uno lontano si
    // perderebbe di vista.
    const giornoAttivo = app?.querySelector(".orto-day.is-selected");
    if (giornoAttivo?.scrollIntoView)
      giornoAttivo.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "instant",
      });
  }

  /* ============================================================
     Lingua — stesso contratto delle altre pagine
     ============================================================ */
  function applyLanguage(value) {
    lang = normalizeLang(value);
    document.documentElement.lang = lang;
    document.title = t("doc.title");
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
    document
      .getElementById("mainNav")
      ?.setAttribute("aria-label", t("nav.main_aria"));
    document
      .querySelector(".cart-btn")
      ?.setAttribute("aria-label", t("nav.cart_aria"));
    document.querySelectorAll(".lang-switch-opt").forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    try {
      localStorage.setItem("ois.lang", lang);
    } catch (_) {}
    renderPicker();
    if (piantaScelta) mostraSceltaPianta();
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

  /* ============================================================
     Selettore della pianta (dialogo «Aggiungi una coltura»)
     ============================================================
     Qui c'era un campo di testo con un `datalist`: bisognava sapere in anticipo
     il nome di una delle 97 piante, e chi non lo sapeva restava fermo davanti a
     un campo vuoto. Ora si sceglie guardando: ricerca, famiglie, foto, e le
     piante che si seminano in questo mese messe in cima. Stesse tre leve del
     vivaio e del catalogo semi, così il gesto è già noto. */
  let pickerQuery = "";
  let pickerFamily = ""; // "" tutte · "stagione" · altrimenti un tipo
  let piantaScelta = null;

  const diStagione = (plant, mese) => (plant.mesi || []).includes(mese);

  function pianteFiltrate() {
    const mese = new Date().getMonth() + 1;
    const q = pickerQuery.trim().toLowerCase();
    let out = PLANTS.slice();
    if (pickerFamily === "stagione")
      out = out.filter((p) => diStagione(p, mese));
    else if (pickerFamily) out = out.filter((p) => p.tipo === pickerFamily);
    if (q) out = out.filter((p) => plantName(p).toLowerCase().includes(q));
    // Senza una ricerca in corso le piante di stagione vengono per prime: è
    // quasi sempre quello che si sta cercando in questo momento dell'anno.
    return out.sort((a, b) => {
      const sa = diStagione(a, mese) ? 0 : 1;
      const sb = diStagione(b, mese) ? 0 : 1;
      return sa - sb || plantName(a).localeCompare(plantName(b), locale());
    });
  }

  // Un filtro che non porta a nulla è peggio di nessun filtro: le famiglie
  // elencate sono solo quelle che hanno almeno una pianta.
  function famigliePicker() {
    const conta = {};
    PLANTS.forEach((p) => (conta[p.tipo] = (conta[p.tipo] || 0) + 1));
    return Object.keys(conta)
      .sort((a, b) => conta[b] - conta[a])
      .map((tipo) => ({ tipo, n: conta[tipo] }));
  }

  function renderPicker() {
    const chips = document.getElementById("ortoPlantChips");
    const grid = document.getElementById("ortoPlantGrid");
    const vuoto = document.getElementById("ortoPlantNone");
    if (!chips || !grid) return;
    const mese = new Date().getMonth() + 1;
    const inStagione = PLANTS.filter((p) => diStagione(p, mese)).length;

    const chip = (valore, etichetta, n) =>
      `<button type="button" class="orto-chipfilter${
        pickerFamily === valore ? " is-active" : ""
      }" data-orto-action="pick-family" data-family="${escape(valore)}"
        aria-pressed="${pickerFamily === valore}">
        <span>${escape(etichetta)}</span><small>${n}</small></button>`;

    chips.innerHTML =
      chip("", t("dlg.family_all"), PLANTS.length) +
      (inStagione ? chip("stagione", t("dlg.family_season"), inStagione) : "") +
      famigliePicker()
        .map(({ tipo, n }) => chip(tipo, t("tipo." + tipo), n))
        .join("");

    const elenco = pianteFiltrate();
    grid.innerHTML = elenco
      .map(
        (p) => `
        <button type="button" class="orto-pick" role="option" aria-selected="false"
          data-orto-action="pick-plant" data-plant-id="${escape(p.id)}">
          <img src="${photoSrc(p.id)}" alt="" loading="lazy" width="64" height="64" />
          <span class="orto-pick-name">${escape(plantName(p))}</span>
          ${
            diStagione(p, mese)
              ? `<span class="orto-pick-tag">${t("dlg.in_season")}</span>`
              : ""
          }
        </button>`,
      )
      .join("");
    if (vuoto) {
      vuoto.hidden = elenco.length > 0;
      vuoto.textContent = t("dlg.no_match");
    }
  }

  // Aggiorna il dialogo dopo la scelta: il riepilogo prende il posto della
  // griglia e compaiono i passi 2 e 3, che prima chiedevano data e quantità
  // di una pianta che non era ancora stata nominata.
  function mostraSceltaPianta() {
    const picker = document.getElementById("ortoPicker");
    const scelta = document.getElementById("ortoPicked");
    const dettagli = document.getElementById("ortoAddDetails");
    const conferma = document.getElementById("ortoAddConfirm");
    const errore = document.getElementById("ortoPlantError");
    const plant = piantaScelta ? BYID[piantaScelta] : null;
    if (picker) picker.hidden = !!plant;
    if (scelta) scelta.hidden = !plant;
    if (dettagli) dettagli.hidden = !plant;
    if (conferma) conferma.disabled = !plant;
    if (errore && plant) errore.hidden = true;
    if (!plant) return;
    const img = document.getElementById("ortoPickedImg");
    if (img) {
      img.src = photoSrc(plant.id);
      img.alt = "";
    }
    const nome = document.getElementById("ortoPickedName");
    if (nome) nome.textContent = plantName(plant);
    const nota = document.getElementById("ortoPickedNote");
    if (nota) nota.textContent = plantNota(plant) || t("tipo." + plant.tipo);
    aggiornaAnteprima();
  }

  /* L'anteprima dice cosa succederà prima di confermare: quando si raccoglie è
     la sola cosa che l'utente non può dedurre da solo, e cambia con l'origine e
     con la data. */
  function aggiornaAnteprima() {
    const nodo = document.getElementById("ortoAddPreview");
    if (!nodo) return;
    const plant = piantaScelta ? BYID[piantaScelta] : null;
    if (!plant) return void (nodo.textContent = "");
    const origine =
      document.querySelector('input[name="ortoOrigine"]:checked')?.value ||
      "seme";
    const valore = document.getElementById("ortoDate")?.value;
    const inizio = valore ? E.parseDate(valore) : E.startOfToday();
    const gg = E.giorniARaccolta(plant, PRODUCTS[plant.id], origine);
    nodo.textContent = gg
      ? t("dlg.preview", {
          nome: plantName(plant),
          origine:
            origine === "piantina"
              ? t("colture.from_plant")
              : t("colture.from_seed"),
          data: fmtData(E.addDays(inizio, gg)),
        })
      : t("dlg.preview_perenne", { nome: plantName(plant) });
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

  /* Frecce, Home e Fine sulle linguette: il comportamento che ci si aspetta da
     un tablist e che qui mancava del tutto. */
  document.querySelector(".orto-tabs")?.addEventListener("keydown", (event) => {
    const linguette = [...document.querySelectorAll(".orto-tab")];
    const corrente = linguette.indexOf(document.activeElement);
    if (corrente < 0) return;
    const tasti = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!tasti.includes(event.key)) return;
    event.preventDefault();
    const prossimo =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? linguette.length - 1
          : (corrente +
              (event.key === "ArrowRight" ? 1 : -1) +
              linguette.length) %
            linguette.length;
    view = linguette[prossimo].dataset.ortoView;
    render();
    linguette[prossimo].focus();
  });

  /* Frecce sulla striscia dei giorni: stesso contratto delle linguette. */
  document.addEventListener("keydown", (event) => {
    const giorno = event.target.closest?.(".orto-day");
    if (!giorno) return;
    const tasti = ["ArrowLeft", "ArrowRight", "Home"];
    if (!tasti.includes(event.key)) return;
    event.preventDefault();
    const giorni = [...document.querySelectorAll(".orto-day")];
    const corrente = giorni.indexOf(giorno);
    const prossimo =
      event.key === "Home"
        ? 0
        : Math.min(
            giorni.length - 1,
            Math.max(0, corrente + (event.key === "ArrowRight" ? 1 : -1)),
          );
    const scelto = giorni[prossimo]?.dataset.day;
    if (!scelto) return;
    giornoScelto = scelto === isoOggi() ? null : scelto;
    render();
    document.querySelector(".orto-day.is-selected")?.focus();
  });

  /* Clic sullo sfondo scuro: chiude il dialogo, come in ogni pannello dell'app.
     Il bersaglio dell'evento è il <dialog> stesso solo quando si tocca fuori
     dal riquadro, perché il contenuto sta tutto dentro elementi figli. */
  document.querySelectorAll("dialog.orto-dialog").forEach((dialogo) => {
    dialogo.addEventListener("click", (event) => {
      if (event.target === dialogo) dialogo.close("cancel");
    });
  });

  document.addEventListener("click", (event) => {
    const viewBtn = event.target.closest("[data-orto-view]");
    if (viewBtn) {
      view = viewBtn.dataset.ortoView;
      render();
      // Chi arriva dalla striscia dei passi non ha il fuoco sulle linguette:
      // portarlo sul pannello evita di ripartire dall'inizio della pagina.
      if (!viewBtn.classList.contains("orto-tab"))
        app?.focus({ preventScroll: true });
      return;
    }
    const trigger = event.target.closest("[data-orto-action]");
    if (!trigger) return;
    const action = trigger.dataset.ortoAction;
    // Lingua dal menu mobile: sotto i 660px il selettore dell'intestazione è
    // nascosto e questi due pulsanti sono l'unico modo per cambiarla.
    if (action === "set-language") {
      applyLanguage(trigger.dataset.lang);
      return;
    }

    if (action === "toggle-task") {
      const id = trigger.dataset.taskId;
      if (garden.fatti[id]) delete garden.fatti[id];
      else {
        // Si spunta il giorno che si sta guardando: se sto sistemando la
        // giornata di giovedì, l'attività risulta fatta giovedì e non oggi,
        // altrimenti sparirebbe dalla lista che sto compilando.
        garden.fatti[id] = view === "oggi" ? isoScelto() : E.iso(new Date());
        trigger.dataset.on = "1";
      }
      saveGarden();
      return setTimeout(render, 190);
    }
    if (action === "snooze-task") {
      // Rimanda di un giorno rispetto alla data dell'attività, non rispetto a
      // oggi: nell'agenda si rinvia anche qualcosa che è in programma fra una
      // settimana, e spostarla a domani non avrebbe senso.
      const id = trigger.dataset.taskId;
      const attuale = tuttiITask().find((task) => task.id === id);
      const partenza = attuale ? dataEffettiva(attuale) : E.startOfToday();
      const base = partenza > E.startOfToday() ? partenza : E.startOfToday();
      garden.rinviati[id] = E.iso(E.addDays(base, 1));
      saveGarden();
      toast(t("toast.snoozed"));
      return render();
    }
    // La rimozione porta via anche lo storico: si chiede conferma.
    if (action === "remove-coltura") {
      const coltura = garden.colture.find(
        (c) => c.id === trigger.dataset.colturaId,
      );
      if (!coltura) return;
      colturaDaRimuovere = coltura.id;
      const chi = document.getElementById("ortoRemoveWho");
      if (chi) chi.textContent = plantName(BYID[coltura.plantId]);
      document.getElementById("ortoRemoveDialog")?.showModal();
      return;
    }
    if (action === "register-harvest") {
      const coltura = garden.colture.find(
        (c) => c.id === trigger.dataset.colturaId,
      );
      if (!coltura) return;
      colturaDaRaccogliere = coltura.id;
      const chi = document.getElementById("ortoHarvestWho");
      if (chi) chi.textContent = plantName(BYID[coltura.plantId]);
      const kg = document.getElementById("ortoHarvestKg");
      if (kg) kg.value = "1";
      document.getElementById("ortoHarvestDialog")?.showModal();
      return;
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
    // Chiusura esplicita: la ✕ dell'intestazione. Passa da close("cancel")
    // così i gestori di chiusura azzerano lo stato in sospeso come farebbe Esc.
    if (action === "close-dialog") {
      document.getElementById(trigger.dataset.dialog)?.close("cancel");
      return;
    }
    if (action === "dismiss-howto") {
      try {
        localStorage.setItem(HOWTO_KEY, "off");
      } catch (_) {}
      syncHowto();
      return;
    }
    if (action === "pick-day") {
      giornoScelto =
        trigger.dataset.day === isoOggi() ? null : trigger.dataset.day;
      return render();
    }
    if (action === "pick-family") {
      pickerFamily = trigger.dataset.family || "";
      renderPicker();
      return;
    }
    if (action === "pick-plant") {
      piantaScelta = trigger.dataset.plantId;
      mostraSceltaPianta();
      // Il fuoco va sulla scelta successiva, non sulla data: su telefono
      // aprirebbe subito il calendario nascondendo il resto del dialogo.
      document.querySelector('input[name="ortoOrigine"]:checked')?.focus();
      return;
    }
    if (action === "clear-plant") {
      piantaScelta = null;
      mostraSceltaPianta();
      document.getElementById("ortoPlantSearch")?.focus();
      return;
    }
    if (action === "open-add") {
      piantaScelta = null;
      pickerQuery = "";
      pickerFamily = "";
      const ricerca = document.getElementById("ortoPlantSearch");
      if (ricerca) ricerca.value = "";
      renderPicker();
      mostraSceltaPianta();
      const dataInput = document.getElementById("ortoDate");
      if (dataInput) dataInput.value = E.iso(new Date());
      const quantita = document.getElementById("ortoQty");
      if (quantita) quantita.value = "4";
      const posizione = document.getElementById("ortoPosition");
      if (posizione) posizione.value = "";
      document.getElementById("ortoAddDialog")?.showModal();
      // Su schermo largo la tastiera è già pronta per filtrare; su telefono
      // il fuoco su un campo di ricerca non apre nulla di invasivo.
      ricerca?.focus();
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

  // Ricerca e cambi di opzione dentro il dialogo: la griglia si filtra mentre
  // si digita, l'anteprima si aggiorna a ogni scelta.
  document.getElementById("ortoPlantSearch")?.addEventListener("input", (e) => {
    pickerQuery = e.target.value;
    renderPicker();
  });
  document.getElementById("ortoAddForm")?.addEventListener("change", (e) => {
    if (e.target.name === "ortoOrigine" || e.target.id === "ortoDate")
      aggiornaAnteprima();
  });

  document
    .getElementById("ortoAddForm")
    ?.addEventListener("submit", (event) => {
      if (event.submitter && event.submitter.value === "cancel") return;
      const errore = document.getElementById("ortoPlantError");
      if (!piantaScelta || !BYID[piantaScelta]) {
        // method="dialog": senza preventDefault il dialogo si chiuderebbe comunque.
        event.preventDefault();
        if (errore) {
          errore.textContent = t("dlg.plant_missing");
          errore.hidden = false;
        }
        document.getElementById("ortoPlantSearch")?.focus();
        return;
      }
      if (errore) errore.hidden = true;
      const plantId = piantaScelta;
      const origine =
        document.querySelector('input[name="ortoOrigine"]:checked')?.value ||
        "seme";
      aggiungiColtura(
        plantId,
        origine,
        document.getElementById("ortoDate").value || E.iso(new Date()),
        document.getElementById("ortoQty").value,
        document.getElementById("ortoPosition").value.trim(),
      );
      const nome = plantName(BYID[plantId]);
      piantaScelta = null;
      setTimeout(() => {
        view = "colture";
        render();
        toast(t("toast.added", { nome }));
      }, 0);
    });

  // Conferma della raccolta: la resa registrata diventa la stima dell'anno
  // successivo, quindi va salvata sulla coltura giusta anche se nel frattempo
  // la vista è cambiata.
  document
    .getElementById("ortoHarvestForm")
    ?.addEventListener("submit", (event) => {
      const id = colturaDaRaccogliere;
      colturaDaRaccogliere = null;
      if ((event.submitter && event.submitter.value === "cancel") || !id)
        return;
      const coltura = garden.colture.find((c) => c.id === id);
      if (!coltura) return;
      const kg = document.getElementById("ortoHarvestKg").value;
      coltura.eventi.push({
        data: E.iso(new Date()),
        tipo: "raccolta",
        quantitaKg: kg,
      });
      coltura.stato = "raccolta";
      saveGarden();
      setTimeout(() => {
        render();
        toast(t("toast.harvest"));
      }, 0);
    });

  // Conferma della rimozione.
  document
    .getElementById("ortoRemoveForm")
    ?.addEventListener("submit", (event) => {
      const id = colturaDaRimuovere;
      colturaDaRimuovere = null;
      if ((event.submitter && event.submitter.value === "cancel") || !id)
        return;
      garden.colture = garden.colture.filter((c) => c.id !== id);
      saveGarden();
      setTimeout(() => {
        render();
        toast(t("toast.removed"));
      }, 0);
    });

  /* Chiusura con Esc o cliccando fuori: il dialogo si chiude senza passare
     dall'invio, quindi lo stato in sospeso va azzerato a mano. Senza questo,
     una coltura scelta e poi abbandonata restava in memoria. */
  [
    ["ortoAddDialog", () => (piantaScelta = null)],
    ["ortoPlantDialog", () => (vocePendente = null)],
    ["ortoEditDialog", () => (colturaInModifica = null)],
    ["ortoHarvestDialog", () => (colturaDaRaccogliere = null)],
    ["ortoRemoveDialog", () => (colturaDaRimuovere = null)],
  ].forEach(([id, reset]) => {
    const dialogo = document.getElementById(id);
    if (!dialogo || !reset) return;
    dialogo.addEventListener("close", () => {
      if (dialogo.returnValue !== "ok") reset();
    });
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
