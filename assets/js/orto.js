/* "Il mio orto": diario colturale, attività del giorno e dispensa di ciò che l'utente ha acquistato e non ha ancora messo a dimora. */
(() => {
  const E = window.SerraCareEngine;
  if (!E) return;

  /* Chiavi di persistenza in localStorage. */
  const GARDEN_KEY = "serra.garden.v1";
  const INVENTORY_KEY = "serra.inventory.v1";
  const ORTO_GREENHOUSE_KEY = "serra.orto.greenhouse.v1";

  /* Soglie di comportamento delle viste. */
  const GIORNI_AVANTI = 7; // ampiezza della finestra «Prossimi giorni»
  const GIORNI_RACCOLTA_VICINA = 14; // entro quanti giorni una coltura conta come «vicina alla raccolta»
  const VOCI_PER_RICERCA = 6; // da quante voci in poi compare la barra di ricerca

  const COPY = {
    it: {
      // Titolo della scheda del browser.
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
      "page.eyebrow": "Il tuo assistente di coltivazione",
      "page.seal": "Dalla scelta<br>alla raccolta",
      "page.lead":
        "Aggiungi ciò che possiedi, scegli cosa piantare e segui un piano semplice fino alla raccolta.",
      "tab.oggi": "Oggi",
      "tab.oggi_todo": "da fare adesso",
      // Righe di stato della linguetta «Oggi».
      "tab.oggi_late": "+{n} arretrate",
      "tab.oggi_clear": "tutto a posto",
      "tab.oggi_start": "da iniziare",
      "tab.oggi_ready": "pronto da avviare",
      "tab.piano": "Piantate",
      "tab.piano_note": "{n} colture in corso",
      "tab.piano_note_one": "1 coltura in corso",
      "tab.piano_empty": "nessuna piantata",
      "tab.piante": "Da piantare",
      /* Righe di stato della linguetta «Le mie piante». */
      "tab.piante_stock_one": "1 varietà disponibile",
      "tab.piante_stock": "{n} varietà disponibili",
      "tab.piante_note": "lista vuota",
      "tab.piante_empty": "aggiungi le piante",

      "welcome.kicker": "Configura il tuo orto",
      "welcome.title": "Da dove vuoi aggiungere le piante?",
      "welcome.text":
        "Prima raccogliamo semi e piantine che possiedi. Nel passaggio successivo sceglierai cosa piantare davvero.",
      "welcome.add": "Aggiungi manualmente",
      "welcome.or": "oppure",
      "welcome.orders": "Scegli dagli ordini",
      "welcome.nothing": "Non hai ancora semi o piantine?",
      "welcome.shop_seeds": "Catalogo semi",
      "welcome.shop_plugs": "Vivaio piantine",
      "jump.aria": "Sezioni dell'orto",
      "piante.title": "Da piantare",
      "piante.sub":
        "Semi e piantine che possiedi ma non hai ancora messo in terra.",
      // Invito che sostituisce l'«Oggi» vuoto quando la dispensa è piena.
      "next.title": "Hai {n} piante pronte da mettere a dimora",
      "next.text":
        "«Oggi» si riempie appena pianti qualcosa: da quel momento ti dico cosa fare, giorno per giorno, fino alla raccolta.",
      "next.cta": "Scegli cosa piantare",
      // Vista «Piano»: il percorso di ogni coltura fino alla raccolta.
      "piano.title": "Il piano fino alla raccolta",
      "piano.sub":
        "Ogni coltura con le tappe già fatte e quelle che restano. In ordine di raccolta: prima quello che finisce prima.",
      "piano.empty_title": "Non hai ancora niente in terra",
      "piano.empty_text":
        "Il piano nasce quando pianti: scegli cosa mettere a dimora e qui compare il percorso fino alla raccolta.",
      "piano.empty_cta": "Scegli cosa piantare",
      "piano.harvest_in": "raccolta fra {n} giorni",
      "piano.harvest_one": "raccolta domani",
      "piano.harvest_today": "si raccoglie oggi",
      "piano.harvest_late": "da raccogliere",
      "piano.harvest_perennial": "pianta perenne",
      "piano.done": "ciclo concluso",
      "piano.remaining_one": "1 cosa da fare",
      "piano.remaining": "{n} cose da fare",
      "piano.when_today": "oggi",
      "piano.when_tomorrow": "domani",
      "piano.when_days": "fra {n} giorni",
      "piano.when_late": "in ritardo di {n} g",
      "piano.more": "e altre {n} tappe",
      "piano.open": "Apri la coltura",
      // Vista «Oggi».
      "oggi.one": "Oggi hai una cosa da fare",
      "oggi.many": "Oggi hai {n} cose da fare",
      "oggi.nothing": "Oggi non c'è niente da fare",
      "oggi.to_start": "Il tuo orto sta per partire",
      "oggi.all_done": "Fatto tutto per oggi",
      "oggi.progress": "{n} di {tot} già spuntate.",
      "backlog.title_one": "1 attività arretrata",
      "backlog.title": "{n} attività arretrate",
      "backlog.sub": "Restano da giorni scorsi. Nessun dramma, si recuperano.",
      "backlog.show": "Mostra",
      "backlog.hide": "Nascondi",
      "done.title_one": "1 fatta oggi",
      "done.title": "{n} fatte oggi",
      "week.title": "I prossimi {n} giorni",
      "week.count_one": "1 attività in programma entro una settimana",
      "week.count": "{n} attività in programma entro una settimana",

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
        "Le tue colture non chiedono niente adesso. Apri «Prossimi giorni» per sapere cosa arriva.",
      "today.next_is": "La prossima cosa è <b>{cosa}</b>, {quando}.",
      "agenda.tomorrow": "Domani",

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

      "colture.title": "In terra",
      "colture.sub":
        "Ognuna genera da sola il proprio calendario di cura fino alla raccolta.",
      "colture.crosslink": "Hai {n} voci comprate e non ancora piantate.",
      "colture.crosslink_cta": "Vai a «Le mie piante»",
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
      "colture.remove_card": "Rimuovi pianta",
      "colture.remove_aria": "Rimuovi la coltura di {nome}",
      "colture.from_seed": "da seme",
      "colture.from_plant": "da piantina",
      "colture.plants": "{n} piante",
      "colture.empty_title": "Non stai ancora seguendo nulla",
      "colture.empty_text":
        "Quando scegli «Pianta» nella scheda «Da piantare», la coltura compare qui con il suo calendario.",

      "greenhouse.eyebrow": "Organizza gli spazi",
      "greenhouse.title": "La tua serra",
      "greenhouse.sub":
        "Imposta misure e camminamenti: disponiamo le aiuole usando le piante che hai segnato come piantate.",
      "greenhouse.width": "Larghezza serra",
      "greenhouse.length": "Lunghezza serra",
      "greenhouse.path": "Larghezza camminamenti",
      "greenhouse.meters": "metri",
      "greenhouse.centimeters": "cm",
      "greenhouse.create": "Organizza le aiuole",
      "greenhouse.update": "Aggiorna disposizione",
      "greenhouse.settings": "Misure della serra",
      "greenhouse.edit_settings": "Modifica misure",
      "greenhouse.empty_title": "Pianta qualcosa per progettare la serra",
      "greenhouse.empty_text":
        "Quando una pianta passa qui da «Da piantare», potrai vedere dove collocarla.",
      "greenhouse.beds": "{n} aiuole",
      "greenhouse.path_stat": "camminamenti da {n} cm",
      "greenhouse.north": "Nord",
      "greenhouse.south": "Sud",
      "greenhouse.day": "Giorno",
      "greenhouse.night": "Notte",
      "greenhouse.scene_aria":
        "Vista della serra: modalità {mode}, {n} aiuole",
      "greenhouse.bed": "Aiuola {n}",
      "greenhouse.spacing": "Distanze consigliate",
      "greenhouse.spacing_value": "{d} cm tra le piante · {dr} cm tra le file",
      "greenhouse.layout": "Disposizione dell’aiuola",
      "greenhouse.layout_block": "A blocco",
      "greenhouse.layout_row": "A fila intera",
      "greenhouse.layout_row_hint": "Usa tutta la lunghezza per le rampicanti alte, come nel configuratore.",
      "greenhouse.placed": "{n} piante collocate",
      "greenhouse.unplaced": "{n} da sistemare",
      "greenhouse.warning":
        "Lo spazio non basta per tutte le piante. Aumenta le misure, riduci i camminamenti o coltivane meno.",
      "greenhouse.hint": "Seleziona un'aiuola per leggere i dettagli.",
      "greenhouse.view_title": "Vista dall'alto",
      "greenhouse.view_sub": "Clicca un'aiuola per vedere quantità e distanze.",
      "greenhouse.saved": "Disposizione della serra aggiornata",
      "greenhouse.source_seed": "Da seme",
      "greenhouse.source_plant": "Piantina trapiantata",

      "disp.title": "Non ancora in terra",
      "disp.sub":
        "Semi e piantine che possiedi. Qui non c'è nessun calendario, solo quanto ti resta.",
      "disp.import": "Importa dai miei ordini",
      "disp.add_manual": "＋ Aggiungi a mano",
      "disp.plant_all": "Pianta tutte",
      "disp.filters_aria": "Filtra le piante",
      "disp.filter_all": "Tutte",
      "disp.filter_seed": "Semi",
      "disp.filter_seedling": "Piantine",
      "disp.filter_started": "Già avviate",
      "disp.completed_title": "Tutte già piantate",
      "disp.completed_sub": "{n} voci completate, raccolte qui per non appesantire la lista",
      "disp.clear": "Svuota lista",
      "disp.empty_title": "Non hai nulla in attesa",
      "disp.empty_text":
        "Quando confermi un ordine, semi e piantine compaiono qui pronti da piantare. Puoi anche aggiungerli a mano.",
      "disp.plant_now": "Pianta",
      "disp.plant_again": "Pianta ancora",
      "disp.in_planted": "Presente in Piantate",
      "disp.archive": "Rimuovi dalla lista",
      "disp.archive_planted": "Archivia",
      "disp.archived_title": "Archiviate",
      "disp.archived_sub_one": "1 voce nascosta dalla lista",
      "disp.archived_sub": "{n} voci nascoste dalla lista",
      "disp.restore": "Ripristina",
      "disp.left": "{n} di {tot} ancora da piantare",
      "disp.all_planted": "Tutte piantate",
      "disp.packet": "Bustina · {n} semi",
      "disp.seed_packs_one": "1 bustina · {n} semi acquistati",
      "disp.seed_packs": "{packs} bustine · {n} semi acquistati",
      "disp.seed_manual": "{n} semi disponibili",
      "disp.plugs": "{n} piantine · vaso ø7",
      "disp.sowings_none": "Non ancora seminata",
      "disp.sowings_one": "1 semina fatta",
      "disp.sowings": "{n} semine fatte",
      "disp.group_order": "Ordine {id}",
      "disp.group_manual": "Aggiunte a mano",
      "disp.group_count_one": "1 articolo",
      "disp.group_count": "{n} articoli",
      "disp.search_placeholder": "Cerca per nome…",
      "disp.search_empty_title": "Nessun risultato",
      "disp.search_empty_text": "Nessuna pianta corrisponde a «{q}».",
      "disp.login_hint":
        "Accedi alla tua Area Personale per importare gli acquisti.",

      "import.title": "Scegli cosa importare",
      "import.sub":
        "Apri un ordine e togli la spunta a ciò che non ti serve adesso. Quello che è già in dispensa non si duplica.",
      "import.order": "Ordine {id}",
      "import.items_one": "1 articolo",
      "import.items": "{n} articoli",
      "import.confirm": "Importa",
      "import.confirm_n": "Importa {n} piante",
      "import.tag_seed": "seme",
      "import.tag_plug": "piantina",
      "import.plan_title": "Misure applicate automaticamente",
      "import.plan_text": "Questo ordine è stato progettato per {w} × {l} m, con camminamenti da {path} cm.",
      "import.plan_use": "Usa queste misure nell'Orto",
      "import.plan_use_hint": "Dopo l'importazione potrai modificarle nella scheda Piantate: la serra dell'Orto resterà indipendente dal configuratore.",
      "import.plan_keep": "Mantieni le misure attuali",
      "import.plan_keep_hint": "Le piante verranno ricalcolate nello spazio disponibile.",
      "clear.title": "Svuotare «Da piantare»?",
      "clear.sub":
        "Le voci spariscono da questo elenco. Restano nei tuoi ordini e puoi reimportarle quando vuoi.",
      "clear.confirm": "Svuota",
      "clear_planted.action": "Elimina tutte le piantate",
      "clear_planted.title": "Eliminare tutte le piante piantate?",
      "clear_planted.sub":
        "Verranno eliminate tutte le colture attive e le relative attività. Lo storico dei raccolti resterà intatto. Non si può annullare.",
      "clear_planted.confirm": "Elimina tutte",

      "plant.title": "Pianta ora",
      "plant.sub": "Scegli quante piante avviare e quando.",
      "plant.qty": "Quante ne pianti ora",
      "plant.qty_hint_seed": "Semi realmente disponibili: {n}",
      "plant.qty_hint_plug": "Ne hai {n} disponibili",
      "plant.qty_hint_fit": "{available} disponibili · nella serra ne entrano ancora {fit}",
      "plant.qty_hint_plan": "Il progetto ne prevede {plan} · nella serra ne entrano {fit}",
      "plant.date": "Data di semina / messa a dimora",
      "plant.position": "Posizione (facoltativa)",
      "plant.confirm": "Pianta",

      // Selettore visivo del dialogo «Aggiungi una coltura».
      "dlg.step_plant": "Quale pianta?",
      "dlg.step_when": "Quando e quante",
      "dlg.plant_ph": "Cerca una pianta",
      "dlg.family_all": "Tutte",
      "dlg.family_season": "Di stagione",
      "dlg.family_recent": "Recenti",
      "dlg.family_favorites": "Preferite",
      "dlg.family_aria": "Filtra per famiglia",
      "dlg.plant_list_aria": "Piante disponibili",
      "dlg.in_season": "di stagione",
      "dlg.favorite_add": "Aggiungi ai preferiti",
      "dlg.favorite_remove": "Rimuovi dai preferiti",
      "dlg.no_match": "Nessuna pianta con questo nome. Prova con meno lettere.",
      "dlg.plant_missing": "Scegli prima una pianta dall'elenco qui sopra.",
      "dlg.fit_error": "Nella serra attuale ne entrano al massimo {n}. Riduci la quantità oppure modifica le misure.",
      "dlg.change_plant": "Cambia",
      "dlg.close": "Chiudi",
      "dlg.preview": "{nome} {origine}: raccolta stimata intorno al {data}.",
      "dlg.preview_perenne":
        "{nome} è una perenne: nessuna data di fine, il calendario continua di stagione in stagione.",
      // Striscia «come funziona»: tre passi, uno per linguetta.
      "howto.title": "Come funziona: tre passi, da «Le mie piante» a «Oggi»",
      "howto.close": "Nascondi la spiegazione",
      // Testo dei tre passi.
      "howto.s1t": "Registra cosa hai",
      "howto.s1p":
        "In «Le mie piante»: semi e piantine che possiedi, comprati qui o altrove.",
      "howto.s2t": "Piantali",
      "howto.s2p":
        "Stessa scheda, gruppo sotto: passano «in terra» e ricevono il loro calendario.",
      "howto.s3t": "Segui la giornata",
      "howto.s3p":
        "In «Oggi» trovi solo ciò che serve adesso. È qui che tornerai ogni mattina.",
      // Suggerimento finale, scelto in base allo stato dell'orto.
      "howto.start_empty":
        "<b>Sei qui:</b> passo 1. Aggiungi i semi e le piantine che possiedi, oppure importali da un ordine.",
      "howto.start_stock":
        "<b>Passo 1 fatto:</b> ora premi «Pianta» su ciò che hai e passerà nel gruppo sotto.",
      "howto.start_today":
        "<b>Sei a regime:</b> «Oggi» è la scheda da aprire ogni mattina. A «Le mie piante» si torna solo quando arriva roba nuova.",
      "edit.title": "Modifica coltura",
      "edit.confirm": "Salva",
      "edit.note":
        "Cambiando la data, il calendario delle attività viene ricalcolato da capo.",
      "colture.edit": "Modifica",
      "toast.edited": "Coltura aggiornata",
      "dlg.title": "Aggiungi una coltura",
      "dlg.sub": "Da qui parte il calendario di cura fino alla raccolta.",
      "dlg.title_stock": "Aggiungi alla dispensa",
      "dlg.sub_stock":
        "Semi o piantine che hai già, senza metterli subito in terra.",
      "dlg.origin": "Sei partito da…",
      "dlg.seed": "Semi",
      "dlg.seed_hint": "ciclo completo",
      "dlg.seedling": "Piantina",
      "dlg.seedling_hint": "già cresciuta",
      "dlg.date": "Data di semina / messa a dimora",
      "dlg.qty": "Quante",
      "dlg.step_when_stock": "Quanto ne hai",
      "dlg.position": "Posizione (facoltativa)",
      "dlg.position_ph": "es. Aiuola 2",
      "dlg.confirm": "Aggiungi all'orto",
      "dlg.confirm_stock": "Aggiungi alla dispensa",
      "dlg.preview_stock": "Aggiungerai {nome} alla dispensa.",
      "dlg.cancel": "Annulla",

      "toast.added": "{nome} aggiunta al tuo orto",
      "toast.added_stock": "{nome} aggiunta alla dispensa",
      "toast.snoozed": "Rimandata a domani",
      "toast.removed": "Coltura rimossa",
      "toast.harvest": "Registrato: diventerà la stima dell'anno prossimo",
      "toast.ics": "{n} attività esportate",
      "toast.imported_orders": "{n} voci importate dai tuoi ordini",
      "toast.no_orders": "Nessun nuovo acquisto da importare",
      "toast.no_orders_selected": "Seleziona almeno un ordine",
      "toast.stock_cleared": "Dispensa svuotata",
      "toast.planted_cleared": "Tutte le colture attive sono state eliminate",
      "toast.archived": "Archiviata",
      "toast.undo": "Annulla",
      "toast.restored": "Ripristinata nella lista",
      "toast.planted": "{n} × {nome} nel tuo orto",
      "toast.planted_all": "{types} colture avviate · {n} piante collocate",
      "toast.planted_all_left": "{types} colture avviate · {n} piante collocate · {left} ancora disponibili",
      "toast.no_greenhouse_space": "Non c'è spazio sufficiente: aumenta la serra o riduci le colture già inserite.",
      // Dialoghi delle azioni che non si possono annullare.
      "harvest.title": "Registra la raccolta",
      "harvest.sub": "Diventerà la stima per l'anno prossimo.",
      "harvest.kg": "Quanti kg hai raccolto?",
      "harvest.confirm": "Registra",
      "harvest.history_title": "Raccolte",
      "harvest.history_sub": "{n} colture concluse",
      "harvest.history_date": "Raccolta il {date}",
      "bulk.title": "Piantare tutto ciò che entra?",
      "bulk.sub": "Controlla il riepilogo prima di avviare le colture.",
      "bulk.summary": "{types} colture · {n} piante verranno collocate oggi",
      "bulk.left": "{n} resteranno in Da piantare perché lo spazio non basta.",
      "bulk.all_fit": "Tutte le quantità previste entrano nella serra.",
      "bulk.cancel": "Annulla",
      "bulk.confirm": "Pianta ora",
      "remove.title": "Eliminare questa coltura?",
      "remove.sub":
        "Spariscono anche le attività già svolte. Non si può annullare.",
      "remove.confirm": "Elimina",

      "nav.abbinamenti": "🌿 Abbinamenti",
      "nav.contatti": "✉️ Contatti",
      "footer.motto": "Pianta con cura, raccogli con gioia.",
      "footer.tip_title": "Consiglio del mese",
      "footer.tip_text": "Annaffia alla base, mai sulle foglie: previeni l'oidio.",
      "footer.explore": "Esplora",
      "footer.kit": "📦 Kit del mese",
      "footer.legal": "Legale",
      "footer.privacy": "Privacy Policy",
      "footer.cookie": "Cookie Policy",
      "footer.terms": "Termini di Servizio",
      "footer.support": "Supporto",
      "footer.rights": "© 2026 Orto in Serra · Tutti i diritti riservati",
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
      "page.eyebrow": "Asistentul tău de cultivare",
      "page.seal": "De la alegere<br>la recoltare",
      "page.lead":
        "Adaugă ce ai, alege ce plantezi și urmează un plan simplu până la recoltare.",
      "tab.oggi": "Astăzi",
      "tab.oggi_todo": "de făcut acum",
      "tab.oggi_late": "+{n} întârziate",
      "tab.oggi_clear": "totul în regulă",
      "tab.oggi_start": "de început",
      "tab.oggi_ready": "gata de pornire",
      "tab.piano": "Plantate",
      "tab.piano_note": "{n} culturi în curs",
      "tab.piano_note_one": "o cultură în curs",
      "tab.piano_empty": "nicio plantă",
      "tab.piante": "De plantat",
      "tab.piante_stock_one": "o varietate disponibilă",
      "tab.piante_stock": "{n} varietăți disponibile",
      "tab.piante_note": "listă goală",
      "tab.piante_empty": "adaugă plante",

      "welcome.kicker": "Configurează grădina",
      "welcome.title": "De unde vrei să adaugi plantele?",
      "welcome.text":
        "Mai întâi adunăm semințele și răsadurile pe care le ai. La pasul următor vei alege ce plantezi.",
      "welcome.add": "Adaugă manual",
      "welcome.or": "sau",
      "welcome.orders": "Alege din comenzi",
      "welcome.nothing": "Încă nu ai semințe sau răsaduri?",
      "welcome.shop_seeds": "Catalog semințe",
      "welcome.shop_plugs": "Pepinieră răsaduri",
      "jump.aria": "Secțiunile grădinii",
      "piante.title": "De plantat",
      "piante.sub":
        "Semințele și răsadurile pe care le ai, dar nu le-ai pus încă în pământ.",
      "next.title": "Ai {n} plante gata de pus în pământ",
      "next.text":
        "«Azi» se umple imediat ce plantezi: de atunci îți spun ce ai de făcut, zi de zi, până la recoltare.",
      "next.cta": "Alege ce plantezi",
      "piano.title": "Planul până la recoltare",
      "piano.sub":
        "Fiecare cultură cu etapele făcute și cele rămase, în ordinea recoltării.",
      "piano.empty_title": "Încă nu ai nimic în pământ",
      "piano.empty_text":
        "Planul apare când plantezi: alege ce pui în pământ și aici vezi drumul până la recoltare.",
      "piano.empty_cta": "Alege ce plantezi",
      "piano.harvest_in": "recoltare peste {n} zile",
      "piano.harvest_one": "recoltare mâine",
      "piano.harvest_today": "se recoltează azi",
      "piano.harvest_late": "de recoltat",
      "piano.harvest_perennial": "plantă perenă",
      "piano.done": "ciclu încheiat",
      "piano.remaining_one": "1 lucru de făcut",
      "piano.remaining": "{n} lucruri de făcut",
      "piano.when_today": "azi",
      "piano.when_tomorrow": "mâine",
      "piano.when_days": "peste {n} zile",
      "piano.when_late": "întârziat cu {n} z",
      "piano.more": "și încă {n} etape",
      "piano.open": "Deschide cultura",
      "oggi.one": "Azi ai un lucru de făcut",
      "oggi.many": "Azi ai {n} lucruri de făcut",
      "oggi.nothing": "Azi nu e nimic de făcut",
      "oggi.to_start": "Grădina ta e gata să pornească",
      "oggi.all_done": "Gata tot pentru azi",
      "oggi.progress": "{n} din {tot} deja bifate.",
      "backlog.title_one": "1 activitate întârziată",
      "backlog.title": "{n} activități întârziate",
      "backlog.sub": "Rămase din zilele trecute. Nicio problemă, se recuperează.",
      "backlog.show": "Arată",
      "backlog.hide": "Ascunde",
      "done.title_one": "1 făcută azi",
      "done.title": "{n} făcute azi",
      "week.title": "Următoarele {n} zile",
      "week.count_one": "1 activitate programată în următoarea săptămână",
      "week.count": "{n} activități programate în următoarea săptămână",

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
        "Culturile tale nu cer nimic acum. Deschide „Zilele următoare” ca să vezi ce urmează.",
      "today.next_is": "Următorul lucru e <b>{cosa}</b>, {quando}.",
      "agenda.tomorrow": "Mâine",

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
      // Etichetta breve per la barra delle fasi.
      "fase.dimora": "Plantat",
      "fase.attecchimento": "Prindere",
      "fase.sviluppo": "Dezvoltare",
      "fase.impianto": "Plantare",
      "fase.perenne": "Perenă",

      "colture.title": "În pământ",
      "colture.sub":
        "Fiecare își generează singură calendarul de îngrijire până la recoltare.",
      "colture.crosslink": "Ai {n} poziții cumpărate și încă neplantate.",
      "colture.crosslink_cta": "Mergi la „Plantele mele”",
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
      "colture.remove_card": "Elimină planta",
      "colture.remove_aria": "Elimină cultura de {nome}",
      "colture.from_seed": "din sămânță",
      "colture.from_plant": "din răsad",
      "colture.plants": "{n} plante",
      "colture.empty_title": "Încă nu urmărești nimic",
      "colture.empty_text":
        "Când apeși „Plantează” în secțiunea „De plantat”, cultura apare aici cu propriul calendar.",

      "greenhouse.eyebrow": "Organizează spațiul",
      "greenhouse.title": "Sera ta",
      "greenhouse.sub":
        "Setează dimensiunile și aleile: organizăm straturile folosind plantele marcate ca plantate.",
      "greenhouse.width": "Lățimea serei",
      "greenhouse.length": "Lungimea serei",
      "greenhouse.path": "Lățimea aleilor",
      "greenhouse.meters": "metri",
      "greenhouse.centimeters": "cm",
      "greenhouse.create": "Organizează straturile",
      "greenhouse.update": "Actualizează dispunerea",
      "greenhouse.settings": "Dimensiunile serei",
      "greenhouse.edit_settings": "Modifică dimensiunile",
      "greenhouse.empty_title": "Plantează ceva pentru a proiecta sera",
      "greenhouse.empty_text":
        "Când o plantă ajunge aici din „De plantat”, vei putea vedea unde să o așezi.",
      "greenhouse.beds": "{n} straturi",
      "greenhouse.path_stat": "alei de {n} cm",
      "greenhouse.north": "Nord",
      "greenhouse.south": "Sud",
      "greenhouse.day": "Zi",
      "greenhouse.night": "Noapte",
      "greenhouse.scene_aria":
        "Vederea serei: modul {mode}, {n} straturi",
      "greenhouse.bed": "Stratul {n}",
      "greenhouse.spacing": "Distanțe recomandate",
      "greenhouse.spacing_value": "{d} cm între plante · {dr} cm între rânduri",
      "greenhouse.layout": "Dispunerea stratului",
      "greenhouse.layout_block": "În bloc",
      "greenhouse.layout_row": "Pe rând complet",
      "greenhouse.layout_row_hint": "Folosește toată lungimea pentru plantele cățărătoare înalte, ca în configurator.",
      "greenhouse.placed": "{n} plante așezate",
      "greenhouse.unplaced": "{n} de așezat",
      "greenhouse.warning":
        "Spațiul nu este suficient pentru toate plantele. Mărește dimensiunile, micșorează aleile sau cultivă mai puține.",
      "greenhouse.hint": "Selectează un strat pentru detalii.",
      "greenhouse.view_title": "Vedere de sus",
      "greenhouse.view_sub": "Apasă un strat pentru cantități și distanțe.",
      "greenhouse.saved": "Dispunerea serei a fost actualizată",
      "greenhouse.source_seed": "Din sămânță",
      "greenhouse.source_plant": "Răsad transplantat",

      "disp.title": "Încă neplantate",
      "disp.sub":
        "Semințe și răsaduri pe care le ai. Aici nu există niciun calendar, doar cât ți-a rămas.",
      "disp.import": "Importă din comenzile mele",
      "disp.add_manual": "＋ Adaugă manual",
      "disp.plant_all": "Plantează-le pe toate",
      "disp.filters_aria": "Filtrează plantele",
      "disp.filter_all": "Toate",
      "disp.filter_seed": "Semințe",
      "disp.filter_seedling": "Răsaduri",
      "disp.filter_started": "Deja pornite",
      "disp.completed_title": "Toate deja plantate",
      "disp.completed_sub": "{n} articole finalizate, grupate aici pentru o listă mai simplă",
      "disp.clear": "Golește lista",
      "disp.empty_title": "Nu ai nimic în așteptare",
      "disp.empty_text":
        "Când confirmi o comandă, semințele și răsadurile apar aici gata de plantat. Le poți adăuga și manual.",
      "disp.plant_now": "Pune în pământ",
      "disp.plant_again": "Plantează din nou",
      "disp.in_planted": "Prezentă în Plantate",
      "disp.archive": "Elimină din listă",
      "disp.archive_planted": "Arhivează",
      "disp.archived_title": "Arhivate",
      "disp.archived_sub_one": "un articol ascuns din listă",
      "disp.archived_sub": "{n} articole ascunse din listă",
      "disp.restore": "Restaurează",
      "disp.left": "{n} din {tot} încă de plantat",
      "disp.all_planted": "Toate plantate",
      "disp.packet": "Plic · {n} semințe",
      "disp.seed_packs_one": "1 plic · {n} semințe cumpărate",
      "disp.seed_packs": "{packs} plicuri · {n} semințe cumpărate",
      "disp.seed_manual": "{n} semințe disponibile",
      "disp.plugs": "{n} răsaduri · ghiveci ø7",
      "disp.sowings_none": "Încă nesemănată",
      "disp.sowings_one": "o semănare făcută",
      "disp.sowings": "{n} semănări făcute",
      "disp.group_order": "Comanda {id}",
      "disp.group_manual": "Adăugate manual",
      "disp.group_count_one": "1 articol",
      "disp.group_count": "{n} articole",
      "disp.search_placeholder": "Caută după nume…",
      "disp.search_empty_title": "Niciun rezultat",
      "disp.search_empty_text": "Nicio plantă nu corespunde pentru „{q}”.",
      "disp.login_hint":
        "Autentifică-te în Zona Personală pentru a importa achizițiile.",

      "import.title": "Alege ce imporți",
      "import.sub":
        "Deschide o comandă și debifează ce nu îți trebuie acum. Ce e deja în cămară nu se duplică.",
      "import.order": "Comanda {id}",
      "import.items_one": "1 articol",
      "import.items": "{n} articole",
      "import.confirm": "Importă",
      "import.confirm_n": "Importă {n} plante",
      "import.tag_seed": "sămânță",
      "import.tag_plug": "răsad",
      "import.plan_title": "Dimensiuni aplicate automat",
      "import.plan_text": "Această comandă a fost proiectată pentru {w} × {l} m, cu alei de {path} cm.",
      "import.plan_use": "Folosește aceste dimensiuni în Grădină",
      "import.plan_use_hint": "După import le poți modifica în fila Plantate: sera Grădinii va rămâne independentă de configurator.",
      "import.plan_keep": "Păstrează dimensiunile actuale",
      "import.plan_keep_hint": "Plantele vor fi recalculate în spațiul disponibil.",
      "clear.title": "Golești «De plantat»?",
      "clear.sub":
        "Articolele dispar din această listă. Rămân în comenzile tale și le poți reimporta oricând.",
      "clear.confirm": "Golește",
      "clear_planted.action": "Șterge toate plantele plantate",
      "clear_planted.title": "Ștergi toate plantele plantate?",
      "clear_planted.sub":
        "Vor fi șterse toate culturile active și activitățile lor. Istoricul recoltelor va rămâne intact. Acțiunea nu poate fi anulată.",
      "clear_planted.confirm": "Șterge-le pe toate",

      "plant.title": "Pune în pământ",
      "plant.sub": "Alege câte plante pornești și când.",
      "plant.qty": "Câte plantezi acum",
      "plant.qty_hint_seed": "Semințe disponibile în realitate: {n}",
      "plant.qty_hint_plug": "Ai {n} disponibile",
      "plant.qty_hint_fit": "{available} disponibile · mai încap {fit} în seră",
      "plant.qty_hint_plan": "Proiectul prevede {plan} · în seră încap {fit}",
      "plant.date": "Data semănatului / plantării",
      "plant.position": "Poziție (opțional)",
      "plant.confirm": "Pune în pământ",

      "dlg.step_plant": "Ce plantă?",
      "dlg.step_when": "Când și câte",
      "dlg.plant_ph": "Caută o plantă",
      "dlg.family_all": "Toate",
      "dlg.family_season": "De sezon",
      "dlg.family_recent": "Recente",
      "dlg.family_favorites": "Favorite",
      "dlg.family_aria": "Filtrează după familie",
      "dlg.plant_list_aria": "Plante disponibile",
      "dlg.in_season": "de sezon",
      "dlg.favorite_add": "Adaugă la favorite",
      "dlg.favorite_remove": "Elimină din favorite",
      "dlg.no_match": "Nicio plantă cu acest nume. Încearcă cu mai puține litere.",
      "dlg.plant_missing": "Alege întâi o plantă din lista de mai sus.",
      "dlg.fit_error": "În sera actuală încap cel mult {n}. Redu cantitatea sau modifică dimensiunile.",
      "dlg.change_plant": "Schimbă",
      "dlg.close": "Închide",
      "dlg.preview": "{nome} {origine}: recoltare estimată în jurul datei de {data}.",
      "dlg.preview_perenne":
        "{nome} este o plantă perenă: nu are dată de final, calendarul continuă din sezon în sezon.",
      "howto.title":
        "Cum funcționează: trei pași, de la „Plantele mele” la „Astăzi”",
      "howto.close": "Ascunde explicația",
      "howto.s1t": "Notează ce ai",
      "howto.s1p":
        "În „Plantele mele”: semințe și răsaduri pe care le ai, cumpărate aici sau în altă parte.",
      "howto.s2t": "Plantează-le",
      "howto.s2p":
        "Aceeași filă, grupul de dedesubt: trec „în pământ” și primesc calendarul lor.",
      "howto.s3t": "Urmărește ziua",
      "howto.s3p":
        "În „Astăzi” găsești doar ce trebuie acum. Aici vei reveni în fiecare dimineață.",
      "howto.start_empty":
        "<b>Ești aici:</b> pasul 1. Adaugă semințele și răsadurile pe care le ai sau importă-le dintr-o comandă.",
      "howto.start_stock":
        "<b>Pasul 1 gata:</b> acum apasă „Plantează” pe ce ai și trece în grupul de dedesubt.",
      "howto.start_today":
        "<b>Ești în ritm:</b> „Astăzi” e fila de deschis în fiecare dimineață. La „Plantele mele” revii doar când apare ceva nou.",
      "edit.title": "Modifică cultura",
      "edit.confirm": "Salvează",
      "edit.note":
        "Dacă schimbi data, calendarul activităților este recalculat de la zero.",
      "colture.edit": "Modifică",
      "toast.edited": "Cultură actualizată",
      "dlg.title": "Adaugă o cultură",
      "dlg.sub": "De aici pornește calendarul de îngrijire până la recoltare.",
      "dlg.title_stock": "Adaugă în cămară",
      "dlg.sub_stock":
        "Semințe sau răsaduri pe care le ai deja, fără să le pui imediat în pământ.",
      "dlg.origin": "Ai pornit de la…",
      "dlg.seed": "Semințe",
      "dlg.seed_hint": "ciclu complet",
      "dlg.seedling": "Răsad",
      "dlg.seedling_hint": "deja crescut",
      "dlg.date": "Data semănatului / plantării",
      "dlg.qty": "Câte",
      "dlg.step_when_stock": "Cât ai",
      "dlg.position": "Poziție (opțional)",
      "dlg.position_ph": "ex. Parcela 2",
      "dlg.confirm": "Adaugă în grădină",
      "dlg.confirm_stock": "Adaugă în cămară",
      "dlg.preview_stock": "Vei adăuga {nome} în cămară.",
      "dlg.cancel": "Anulează",

      "toast.added": "{nome} adăugată în grădina ta",
      "toast.added_stock": "{nome} adăugată în cămară",
      "toast.snoozed": "Amânată pe mâine",
      "toast.removed": "Cultură eliminată",
      "toast.harvest": "Înregistrat: va deveni estimarea de anul viitor",
      "toast.ics": "{n} activități exportate",
      "toast.imported_orders": "{n} poziții importate din comenzile tale",
      "toast.no_orders": "Nicio achiziție nouă de importat",
      "toast.no_orders_selected": "Selectează cel puțin o comandă",
      "toast.stock_cleared": "Cămară golită",
      "toast.planted_cleared": "Toate culturile active au fost șterse",
      "toast.archived": "Arhivată",
      "toast.undo": "Anulează",
      "toast.restored": "Restaurată în listă",
      "toast.planted": "{n} × {nome} în grădina ta",
      "toast.planted_all": "{types} culturi pornite · {n} plante așezate",
      "toast.planted_all_left": "{types} culturi pornite · {n} plante așezate · {left} încă disponibile",
      "toast.no_greenhouse_space": "Nu este suficient spațiu: mărește sera sau redu culturile deja introduse.",
      "harvest.title": "Înregistrează recolta",
      "harvest.sub": "Va deveni estimarea pentru anul viitor.",
      "harvest.kg": "Câte kg ai recoltat?",
      "harvest.confirm": "Înregistrează",
      "harvest.history_title": "Recoltate",
      "harvest.history_sub": "{n} culturi încheiate",
      "harvest.history_date": "Recoltat la {date}",
      "bulk.title": "Plantezi tot ce încape?",
      "bulk.sub": "Verifică rezumatul înainte de a porni culturile.",
      "bulk.summary": "{types} culturi · {n} plante vor fi așezate astăzi",
      "bulk.left": "{n} vor rămâne în De plantat deoarece spațiul nu ajunge.",
      "bulk.all_fit": "Toate cantitățile planificate încap în seră.",
      "bulk.cancel": "Anulează",
      "bulk.confirm": "Plantează acum",
      "remove.title": "Ștergi această cultură?",
      "remove.sub": "Dispar și activitățile deja făcute. Nu se poate anula.",
      "remove.confirm": "Șterge",

      "nav.abbinamenti": "🌿 Combinații",
      "nav.contatti": "✉️ Contact",
      "footer.motto": "Plantează cu grijă, culege cu bucurie.",
      "footer.tip_title": "Sfatul lunii",
      "footer.tip_text": "Udă la bază, niciodată pe frunze: previne oidiumul.",
      "footer.explore": "Explorează",
      "footer.kit": "📦 Kit-ul lunii",
      "footer.legal": "Legal",
      "footer.privacy": "Politică de confidențialitate",
      "footer.cookie": "Politică Cookie",
      "footer.terms": "Termeni de serviciu",
      "footer.support": "Suport",
      "footer.rights": "© 2026 Orto in Serra · Toate drepturile rezervate",
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

  /* ============================================================ Stato ============================================================ */
  let lang = "it";
  let view = "oggi";
  /* Stato di apertura dei pannelli ripiegabili, conservato fra i ridisegni. */
  let arretratiAperti = false;
  let settimanaAperta = false;
  let fatteAperte = false;
  let PLANTS = [];
  let PRODUCTS = {};
  const BYID = {};
  let garden = { colture: [], fatti: {}, rinviati: {} };
  let inventory = { voci: [] };
  let ortoGreenhouse = {
    width: 3,
    length: 6,
    path: 50,
    configured: false,
    /* Stato esclusivo della serra dell'Orto. Non contiene né riferimenti né
       scritture verso `serra.config.v1`. */
    beds: {},
  };
  let selectedGreenhouseBed = null;
  let vocePendente = null; // voce della dispensa in corso di messa a dimora
  let stockQuery = ""; // filtro di ricerca nella vista "Da piantare"
  let stockFilter = "all"; // tutte, semi, piantine oppure già avviate
  let bulkPlantPlanPending = null;
  let colturaInModifica = null; // coltura aperta nel dialogo di modifica
  let colturaDaRimuovere = null; // coltura in attesa di conferma di rimozione
  let colturaDaRaccogliere = null; // coltura di cui si sta registrando la resa

  const app = document.getElementById("ortoApp");
  const toastEl = document.getElementById("ortoToast");

  const activeCrops = () =>
    garden.colture.filter((crop) => crop.stato !== "raccolta");
  const harvestedCrops = () =>
    garden.colture.filter((crop) => crop.stato === "raccolta");
  const availableStock = () =>
    inventory.voci.filter(
      (voce) =>
        !voce.archiviata && BYID[voce.plantId] && residuo(voce) > 0,
    );

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

  /* La serra dell'Orto è indipendente da quella del configuratore: condivide
     solo le regole geometriche, non lo stato salvato dall'utente. */
  function loadOrtoGreenhouse() {
    try {
      const raw = JSON.parse(
        localStorage.getItem(ORTO_GREENHOUSE_KEY) || "null",
      );
      if (raw && typeof raw === "object") {
        ortoGreenhouse.width = Math.min(
          20,
          Math.max(1.5, Number(raw.width) || 3),
        );
        ortoGreenhouse.length = Math.min(
          40,
          Math.max(2, Number(raw.length) || 6),
        );
        ortoGreenhouse.path = Math.min(
          120,
          Math.max(30, Number(raw.path) || 50),
        );
        ortoGreenhouse.configured = Boolean(raw.configured);
        ortoGreenhouse.beds =
          raw.beds && typeof raw.beds === "object" && !Array.isArray(raw.beds)
            ? Object.fromEntries(
                Object.entries(raw.beds).map(([id, bed]) => [
                  id,
                  {
                    layout: bed?.layout === "fila" ? "fila" : "blocco",
                    col:
                      Number.isInteger(bed?.col) && bed.col >= 0
                        ? bed.col
                        : undefined,
                  },
                ]),
              )
            : {};
      }
    } catch (_) {}
  }

  function saveOrtoGreenhouse() {
    try {
      localStorage.setItem(
        ORTO_GREENHOUSE_KEY,
        JSON.stringify(ortoGreenhouse),
      );
    } catch (_) {}
  }

  function applyOrtoGreenhousePlan(plan) {
    if (!plan) return false;
    ortoGreenhouse.width = Math.min(
      20,
      Math.max(1.5, Number(plan.width) || 3),
    );
    ortoGreenhouse.length = Math.min(
      40,
      Math.max(2, Number(plan.length) || 6),
    );
    ortoGreenhouse.path = Math.min(
      120,
      Math.max(30, Number(plan.path) || 50),
    );
    ortoGreenhouse.configured = true;
    saveOrtoGreenhouse();
    return true;
  }

  /* Recupera le misure anche per gli ordini importati prima di questa
     versione. Lo fa solo finché la serra dell'Orto non è stata configurata:
     dopo la prima copia, ogni modifica resta autonoma. */
  async function initializeGreenhouseFromImportedOrder() {
    if (ortoGreenhouse.configured) return;
    const orderIds = new Set(
      inventory.voci.map((voce) => voce.orderId).filter(Boolean),
    );
    if (!orderIds.size) return;
    const utente = window.SerraAPI?.getCurrentUser?.();
    if (!utente) return;
    let orders = [];
    try {
      orders = (await window.SerraAPI.getOrders()) || [];
    } catch (_) {
      return;
    }
    const plan = orders
      .filter(
        (order) =>
          order.email === utente.email &&
          orderIds.has(order.id) &&
          order.greenhousePlan,
      )
      .map((order) => order.greenhousePlan)
      .sort(
        (a, b) =>
          Number(b.width) * Number(b.length) -
          Number(a.width) * Number(a.length),
      )[0];
    applyOrtoGreenhousePlan(plan);
  }

  /* ---------- dispensa: acquistato ma non ancora piantato ---------- */
  function loadInventory() {
    try {
      const raw = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "null");
      if (raw && Array.isArray(raw.voci)) inventory = raw;
    } catch (_) {}
    inventory.voci = inventory.voci || [];
    /* Le vecchie importazioni salvavano nelle sementi il numero di bustine.
       La dispensa ora conserva invece le unità reali, lasciando separato il
       numero di confezioni acquistate. */
    inventory.voci.forEach((voce) => {
      if (
        voce.variante !== "piantina" &&
        voce.orderId &&
        voce.quantitaUnita !== "semi"
      ) {
        const packs = Math.max(1, Number(voce.confezioni || voce.qta) || 1);
        const perPack = Math.max(
          1,
          Number(PRODUCTS[voce.plantId]?.semi?.semiPerBustina) || 1,
        );
        voce._legacyPacks = packs;
        voce.confezioni = packs;
        voce.qta = packs * perPack;
        voce.quantitaUnita = "semi";
      }
    });
  }
  function saveInventory() {
    try {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (_) {}
  }
  // Semi e piantine scalano entrambi dalle unità realmente acquistate.
  const residuo = (voce) =>
    Math.max(0, (Number(voce.qta) || 0) - (Number(voce.qtaPiantata) || 0));

  function orderItemQuantity(item) {
    if (item.variante === "piantina")
      return Math.max(1, Number(item.qta) || Number(item.bustine) || 1);
    const packs = Math.max(1, Number(item.bustine) || 1);
    const perPack = Math.max(
      1,
      Number(PRODUCTS[item.id]?.semi?.semiPerBustina) || 1,
    );
    return packs * perPack;
  }

  /* Aggiorna anche le colture nate dal vecchio valore fisso (4) o dal numero
     di bustine, così la serra appena introdotta mostra subito il dato reale. */
  function migrateLegacyGardenQuantities() {
    let inventoryChanged = false;
    let gardenChanged = false;
    inventory.voci.forEach((voce) => {
      if (!voce._legacyPacks) return;
      const candidates = garden.colture.filter(
        (crop) =>
          crop.stato !== "raccolta" &&
          crop.origine === "seme" &&
          crop.plantId === voce.plantId &&
          !crop.sourceStockId &&
          (Number(crop.quantita) === 4 ||
            Number(crop.quantita) === Number(voce._legacyPacks)),
      );
      if (candidates.length === 1 && Number(voce.semine) === 1) {
        candidates[0].quantita = Number(voce.qta);
        candidates[0].sourceStockId = voce.id;
        voce.qtaPiantata = Number(voce.qta);
        gardenChanged = true;
      }
      delete voce._legacyPacks;
      inventoryChanged = true;
    });
    if (inventoryChanged) saveInventory();
    if (gardenChanged) saveGarden();
  }

  /* Ricostruisce i contatori della dispensa partendo dalle colture realmente
     presenti. Ripara anche gli stati obsoleti salvati da versioni precedenti. */
  function reconcileInventoryWithGarden() {
    let gardenChanged = false;
    const before = JSON.stringify(
      inventory.voci.map((voce) => [
        voce.id,
        voce.qtaPiantata,
        voce.semine,
        voce.plannedPlanted,
      ]),
    );
    inventory.voci.forEach((voce) => {
      voce.qtaPiantata = 0;
      voce.semine = 0;
      voce.plannedPlanted = 0;
    });
    garden.colture.forEach((crop) => {
      let remaining = Math.max(1, Number(crop.quantita) || 1);
      const compatible = inventory.voci
        .filter(
          (voce) =>
            voce.plantId === crop.plantId &&
            voce.variante === crop.origine,
        )
        .sort((a, b) => {
          if (a.id === crop.sourceStockId) return -1;
          if (b.id === crop.sourceStockId) return 1;
          return String(b.dataAcquisto || "").localeCompare(
            String(a.dataAcquisto || ""),
          );
        });
      let linked = null;
      compatible.forEach((voce) => {
        if (remaining <= 0) return;
        const available = Math.max(
          0,
          (Number(voce.qta) || 0) - (Number(voce.qtaPiantata) || 0),
        );
        const used = Math.min(remaining, available);
        if (!used) return;
        voce.qtaPiantata += used;
        if (voce.variante === "seme") voce.semine += 1;
        if (voce.plannedQty)
          voce.plannedPlanted = Math.min(
            Number(voce.plannedQty),
            Number(voce.qtaPiantata),
          );
        remaining -= used;
        if (!linked && used === Number(crop.quantita)) linked = voce.id;
      });
      if (!crop.sourceStockId && linked) {
        crop.sourceStockId = linked;
        gardenChanged = true;
      }
    });
    const after = JSON.stringify(
      inventory.voci.map((voce) => [
        voce.id,
        voce.qtaPiantata,
        voce.semine,
        voce.plannedPlanted,
      ]),
    );
    if (before !== after) saveInventory();
    if (gardenChanged) saveGarden();
  }

  let ordiniImportabili = []; // ordini in attesa di conferma nel dialogo di importazione

  function pianoOrdiniSelezionati(orderIds) {
    return ordiniImportabili
      .filter(
        (order) => orderIds.has(order.id) && order.greenhousePlan,
      )
      .map((order) => order.greenhousePlan)
      .sort(
        (a, b) =>
          Number(b.width) * Number(b.length) -
          Number(a.width) * Number(a.length),
      )[0];
  }

  // Legge gli ordini dell'utente e apre il dialogo di scelta.
  async function importaDaOrdini() {
    const utente = window.SerraAPI?.getCurrentUser?.();
    if (!utente) return toast(t("disp.login_hint"));
    let ordini = [];
    try {
      ordini = (await window.SerraAPI.getOrders()) || [];
    } catch (_) {}
    ordiniImportabili = ordini
      .filter((o) => o.email === utente.email)
      .map((ordine) => ({
        id: ordine.id,
        data: (ordine.date || "").slice(0, 10),
        greenhousePlan:
          ordine.greenhousePlan &&
          Array.isArray(ordine.greenhousePlan.beds) &&
          ordine.greenhousePlan.beds.length
            ? ordine.greenhousePlan
            : null,
        nuovi: (ordine.items || []).filter((item) => {
          if (!BYID[item.id]) return false;
          const variante = item.variante === "piantina" ? "piantina" : "seme";
          const id = `${ordine.id}|${item.id}|${variante}`;
          // Una voce archiviata non conta come già presente: resta importabile.
          return !inventory.voci.some((v) => v.id === id && !v.archiviata);
        }),
      }))
      .filter((o) => o.nuovi.length)
      .sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    if (!ordiniImportabili.length) return toast(t("toast.no_orders"));
    renderImportList();
    apriDialogo("ortoImportDialog");
  }

  /* L'elenco di importazione. Prima diceva solo «Ordine ORD-76421 · 21
     articoli» e importava tutto: si sceglieva l'ordine al buio, e chi aveva
     comprato per due stagioni si ritrovava la dispensa piena di roba che non
     avrebbe piantato adesso. Ora ogni ordine si apre e mostra le sue piante,
     spuntate: si tolgono quelle che non interessano. La spunta dell'ordine
     comanda quelle dentro e riflette il loro stato — se ne togli qualcuna
     diventa indeterminata, che è il modo in cui una casella dice «in parte». */
  function renderImportList() {
    const host = document.getElementById("ortoImportList");
    if (!host) return;
    const plannedOrders = ordiniImportabili.filter(
      (order) => order.greenhousePlan,
    );
    const referencePlan = plannedOrders
      .map((order) => order.greenhousePlan)
      .sort(
        (a, b) =>
          Number(b.width) * Number(b.length) -
          Number(a.width) * Number(a.length),
      )[0];
    const ordersHtml = ordiniImportabili
      .map((ordine, i) => {
        const n = ordine.nuovi.length;
        const conteggio =
          n === 1 ? t("import.items_one") : t("import.items", { n });
        const data = ordine.data ? fmtBreve(E.parseDate(ordine.data)) : "—";
        const aperto = i === 0 ? " open" : "";
        return `
          <details class="orto-import-order"${aperto}>
            <summary class="orto-import-summary">
              <label class="orto-import-check" data-orto-stop>
                <input type="checkbox" name="ortoImportOrder"
                  value="${escape(ordine.id)}" checked
                  data-orto-import-all="${escape(ordine.id)}" />
                <span class="orto-import-body">
                  <b>${t("import.order", { id: escape(ordine.id) })}</b>
                  <small>${data} · ${conteggio}${ordine.greenhousePlan ? ` · ${ordine.greenhousePlan.width} × ${ordine.greenhousePlan.length} m` : ""}</small>
                </span>
              </label>
              <span class="orto-import-chevron" aria-hidden="true">⌄</span>
            </summary>
            <div class="orto-import-items">
              ${ordine.nuovi
                .map((item) => {
                  const variante =
                    item.variante === "piantina" ? "piantina" : "seme";
                  const plant = BYID[item.id];
                  const unitaReali = orderItemQuantity(item);
                  return `
                    <label class="orto-import-item">
                      <input type="checkbox" name="ortoImportItem" checked
                        value="${escape(ordine.id + "|" + item.id + "|" + variante)}"
                        data-orto-import-of="${escape(ordine.id)}" />
                      <span class="orto-import-item-name">${escape(plantName(plant))}</span>
                      <span class="orto-import-item-tag">${
                        variante === "piantina"
                          ? t("import.tag_plug")
                          : t("import.tag_seed")
                      } · ${unitaReali}</span>
                    </label>`;
                })
                .join("")}
            </div>
          </details>`;
      })
      .join("");
    const planHtml = referencePlan
      ? `<fieldset class="orto-import-plan" id="ortoImportPlan">
          <legend>${t("import.plan_title")}</legend>
          <p id="ortoImportPlanText">${t("import.plan_text", {
            w: referencePlan.width,
            l: referencePlan.length,
            path: referencePlan.path,
          })}</p>
          <p>${t("import.plan_use_hint")}</p>
        </fieldset>`
      : "";
    host.innerHTML = ordersHtml + planHtml;
    sincronizzaImport();
  }

  /* Tiene allineate le due file di caselle e aggiorna il pulsante, che dice
     quante piante si sta per importare invece di un generico «Importa». */
  function sincronizzaImport() {
    const host = document.getElementById("ortoImportList");
    if (!host) return;
    host.querySelectorAll("[data-orto-import-all]").forEach((padre) => {
      const figli = [
        ...host.querySelectorAll(
          `[data-orto-import-of="${CSS.escape(padre.dataset.ortoImportAll)}"]`,
        ),
      ];
      const spuntati = figli.filter((f) => f.checked).length;
      padre.checked = spuntati > 0;
      padre.indeterminate = spuntati > 0 && spuntati < figli.length;
    });
    const scelte = host.querySelectorAll(
      'input[name="ortoImportItem"]:checked',
    ).length;
    const bottone = document.getElementById("ortoImportConfirm");
    if (bottone) {
      bottone.textContent = scelte
        ? t("import.confirm_n", { n: scelte })
        : t("import.confirm");
      bottone.disabled = !scelte;
    }
    const selectedOrderIds = new Set(
      [...host.querySelectorAll('input[name="ortoImportItem"]:checked')].map(
        (item) => item.value.split("|")[0],
      ),
    );
    const plan = pianoOrdiniSelezionati(selectedOrderIds);
    const panel = document.getElementById("ortoImportPlan");
    if (panel) panel.hidden = !plan;
    const planText = document.getElementById("ortoImportPlanText");
    if (planText && plan)
      planText.textContent = t("import.plan_text", {
        w: plan.width,
        l: plan.length,
        path: plan.path,
      });
  }

  // Distintivo del carrello: conta le voci del carrello semi.
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

  function tuttiITask() {
    return activeCrops().flatMap((c) => {
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

  const isoOggi = () => E.iso(E.startOfToday());

  /* Attività dei prossimi giorni, raggruppate per data. */
  function datiSettimana() {
    const oggi = E.startOfToday();
    const limite = E.addDays(oggi, GIORNI_AVANTI);
    const perGiorno = new Map();
    tuttiITask()
      .filter((task) => !garden.fatti[task.id])
      .map((task) => Object.assign({}, task, { quando: dataEffettiva(task) }))
      .filter((task) => task.quando > oggi && task.quando <= limite)
      .forEach((task) => {
        const iso = E.iso(task.quando);
        if (!perGiorno.has(iso)) perGiorno.set(iso, []);
        perGiorno.get(iso).push(task);
      });
    // Le ricorrenti si comprimono dentro il singolo giorno, non fra giorni.
    return [...perGiorno.entries()]
      .map(([iso, tasks]) => [iso, E.comprimiRicorrenti(tasks)])
      .sort((a, b) => a[0].localeCompare(b[0]));
  }

  /* ============================================================ Viste ============================================================ */

  /* Cambio scheda dal contenuto: riporta in cima solo se la vista cambia. */
  function vaiAllaVista(nuova) {
    const cambia = view !== nuova;
    view = nuova;
    stockQuery = "";
    render();
    const barra = document.getElementById("ortoViewbar");
    if (!cambia || !barra || barra.hidden) return;
    const navbar =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        10,
      ) || 62;
    const y = barra.getBoundingClientRect().top + window.scrollY - navbar - 12;
    if (window.scrollY <= y) return;
    const dolce = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: dolce ? "smooth" : "auto",
    });
  }

  // Schermata di benvenuto: primo avvio, orto ancora vuoto.
  function renderBenvenuto() {
    app.innerHTML = `
      <section class="orto-welcome">
        <div class="orto-welcome-head">
          <p class="orto-welcome-kicker">${t("welcome.kicker")}</p>
          <h2>${t("welcome.title")}</h2>
          <p class="orto-welcome-text">${t("welcome.text")}</p>
        </div>
        <div class="orto-welcome-actions">
          <button class="orto-welcome-choice orto-welcome-choice--primary" type="button"
            data-orto-action="import-orders">
            <span class="orto-welcome-choice-ico" aria-hidden="true">📦</span>
            <span><b>${t("welcome.orders")}</b><small>${lang === "ro" ? "Selectează una sau mai multe comenzi și plantele dorite" : "Seleziona uno o più ordini e le singole piante"}</small></span>
            <span class="orto-welcome-arrow" aria-hidden="true">→</span>
          </button>
          <button class="orto-welcome-choice" type="button" data-orto-action="open-add-stock">
            <span class="orto-welcome-choice-ico" aria-hidden="true">＋</span>
            <span><b>${t("welcome.add")}</b><small>${lang === "ro" ? "Pentru plante cumpărate în altă parte sau pe care le ai deja" : "Per piante acquistate altrove o già in tuo possesso"}</small></span>
            <span class="orto-welcome-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <p class="orto-welcome-shop">
          <span>${t("welcome.nothing")}</span>
          <a href="index.html#stagione">${t("welcome.shop_seeds")}</a>
          <span aria-hidden="true">·</span>
          <a href="vivaio.html">${t("welcome.shop_plugs")}</a>
        </p>
      </section>`;
  }

  /* Pannello ripiegabile delle attività arretrate. */
  function arretratoHtml(arretrati) {
    return `
      <details class="orto-backlog"${arretratiAperti ? " open" : ""}
        data-orto-backlog>
        <summary class="orto-backlog-summary">
          <span class="orto-backlog-ico" aria-hidden="true">⏳</span>
          <span class="orto-backlog-copy">
            <b>${
              arretrati.length === 1
                ? t("backlog.title_one")
                : t("backlog.title", { n: arretrati.length })
            }</b>
            <small>${t("backlog.sub")}</small>
          </span>
          <span class="orto-backlog-toggle" aria-hidden="true">
            <span class="orto-backlog-show">${t("backlog.show")}</span>
            <span class="orto-backlog-hide">${t("backlog.hide")}</span>
          </span>
        </summary>
        <div class="orto-backlog-body">
          ${arretrati.map((task, i) => taskRow(task, i, true)).join("")}
        </div>
      </details>`;
  }

  /* Pannello ripiegabile dei prossimi giorni, raggruppati per data. */
  function settimanaHtml() {
    const giorni = datiSettimana();
    if (!giorni.length) return "";
    const totale = giorni.reduce((n, [, tasks]) => n + tasks.length, 0);
    return `
      <details class="orto-upcoming"${settimanaAperta ? " open" : ""}
        data-orto-upcoming>
        <summary class="orto-upcoming-summary">
          <span class="orto-upcoming-ico" aria-hidden="true">📅</span>
          <span class="orto-upcoming-copy">
            <b>${t("week.title", { n: GIORNI_AVANTI })}</b>
            <small>${
              totale === 1 ? t("week.count_one") : t("week.count", { n: totale })
            }</small>
          </span>
          <span class="orto-backlog-toggle" aria-hidden="true">
            <span class="orto-backlog-show">${t("backlog.show")}</span>
            <span class="orto-backlog-hide">${t("backlog.hide")}</span>
          </span>
        </summary>
        <div class="orto-upcoming-body">
          ${giorni
            .map(([iso, tasks]) => {
              const data = E.parseDate(iso);
              const mancano = E.diffDays(data, E.startOfToday());
              const quando =
                mancano === 1
                  ? t("agenda.tomorrow")
                  : escape(
                      data.toLocaleDateString(locale(), {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      }),
                    );
              return `
              <div class="orto-upcoming-day">
                <p class="orto-upcoming-when">${quando}</p>
                ${tasks.map((task, i) => taskRow(task, i)).join("")}
              </div>`;
            })
            .join("")}
        </div>
      </details>`;
  }

  /* Vista «Oggi»: attività del giorno, con arretrato, svolte e prossimi
     giorni nei rispettivi pannelli ripiegabili. */
  function sezioneOggiHtml() {
    const { oggi, arretrati, diOggi, fatti } = datiOggi();
    const totale = diOggi.length + fatti.length;
    const coltureAttive = activeCrops();
    const inAttesa = availableStock().length;
    if (!coltureAttive.length && !inAttesa) {
      return `
        <section class="orto-sec">
          <div class="orto-sec-head"><h2>${t("tab.oggi")}</h2></div>
          <div class="orto-empty orto-empty--wide">
            <span class="orto-empty-ico" aria-hidden="true">☀️</span>
            <h4>${lang === "ro" ? "Nu există încă activități" : "Non ci sono ancora attività"}</h4>
            <p>${
              lang === "ro"
                ? "Adaugă mai întâi plantele, apoi alege ce plantezi: aici va apărea ce ai de făcut zi de zi."
                : "Prima aggiungi le piante, poi scegli cosa piantare: qui comparirà ciò che devi fare giorno per giorno."
            }</p>
            <div class="orto-empty-actions"><button class="orto-btn" type="button"
              data-orto-action="go-piante">${t("next.cta")}</button></div>
          </div>
        </section>`;
    }
    /* «Oggi non c'è niente da fare» è vero solo se l'orto è avviato. Con la
       dispensa piena e niente in terra non è che non ci sia niente da fare:
       c'è da piantare, ed è quello che dice il blocco qui sotto. Il titolo
       diceva il contrario di ciò che l'invito proponeva. */
    const daAvviare = !coltureAttive.length && inAttesa > 0;

    /* La prima cosa in arrivo, per dirla quando oggi non c'è niente. */
    const prossima = tuttiITask()
      .filter((task) => !garden.fatti[task.id])
      .map((task) => ({ task, quando: dataEffettiva(task) }))
      .filter((s) => s.quando > oggi)
      .sort((a, b) => a.quando - b.quando)
      .map((s) => ({ ...s, giorni: E.diffDays(s.quando, oggi) }))[0];
    const titolo =
      diOggi.length === 0
        ? daAvviare
          ? t("oggi.to_start")
          : fatti.length
            ? t("oggi.all_done")
            : t("oggi.nothing")
        : diOggi.length === 1
          ? t("oggi.one")
          : t("oggi.many", { n: diOggi.length });
    return `
      <section class="orto-sec">
        <div class="orto-sec-head">
          <p class="orto-sec-kicker">${escape(
            oggi.toLocaleDateString(locale(), {
              weekday: "long",
              day: "numeric",
              month: "long",
            }),
          )}</p>
          <h2>${titolo}</h2>
          ${
            fatti.length
              ? `<p class="orto-sec-sub">${t("oggi.progress", {
                  n: fatti.length,
                  tot: totale,
                })}</p>`
              : ""
          }
        </div>
        ${
          /* Rimando a «Le mie piante» quando restano voci non piantate. Se
             non c'è ancora niente in terra non è un rimando fra pari: è il
             passo successivo del percorso, e prende il peso di un invito
             vero invece di una riga di testo sopra una pagina vuota. */
          inAttesa
            ? coltureAttive.length
              ? `<p class="orto-crosslink">
                  <span class="orto-crosslink-ico" aria-hidden="true">📦</span>
                  <span>${t("colture.crosslink", { n: inAttesa })}</span>
                  <button class="orto-link" type="button" data-orto-view="piante">${
                    t("colture.crosslink_cta") + " →"
                  }</button>
                </p>`
              : `<div class="orto-empty orto-empty--wide orto-next-step">
                  <span class="orto-empty-ico">🌱</span>
                  <h4>${t("next.title", { n: inAttesa })}</h4>
                  <p>${t("next.text")}</p>
                  <button class="orto-btn" type="button" data-orto-action="go-piante">${t("next.cta")}</button>
                </div>`
            : ""
        }
        ${arretrati.length ? arretratoHtml(arretrati) : ""}
        ${
          diOggi.length
            ? `<div class="orto-tasklist">${diOggi
                .map((task, i) => taskRow(task, i))
                .join("")}</div>`
            : `<div class="orto-empty"><span class="orto-empty-ico">🌤️</span>
                <h4>${t("today.empty_title")}</h4>
                <p>${
                  /* Rimandava a «Prossimi giorni», che è un pannello chiuso:
                     si diceva all'utente di andare a cercare da un'altra parte
                     la risposta alla domanda che aveva in testa. Chi ha appena
                     seminato vuole sapere adesso che il sistema ha capito —
                     e la risposta è una riga, quindi si scrive qui. */
                  prossima
                    ? t("today.next_is", {
                        cosa: escape(taskLabel(prossima.task)),
                        quando: escape(quandoLabel(prossima.giorni)),
                      })
                    : t("today.empty_text")
                }</p></div>`
        }
        ${
          fatti.length
            ? `<details class="orto-done-group"${fatteAperte ? " open" : ""} data-orto-done>
                <summary class="orto-done-summary">
                  <span aria-hidden="true">✓</span>
                  <b>${
                    fatti.length === 1
                      ? t("done.title_one")
                      : t("done.title", { n: fatti.length })
                  }</b>
                  <span class="orto-backlog-toggle" aria-hidden="true">
                    <span class="orto-backlog-show">${t("backlog.show")}</span>
                    <span class="orto-backlog-hide">${t("backlog.hide")}</span>
                  </span>
                </summary>
                <div class="orto-backlog-body">${fatti
                  .map((task, i) =>
                    taskRow(
                      Object.assign({}, task, { quando: task.data }),
                      i,
                      false,
                      true,
                    ),
                  )
                  .join("")}</div>
              </details>`
            : ""
        }
        ${settimanaHtml()}
      </section>`;
  }

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

  /* Vista «Le mie piante»: gruppo 1 non ancora in terra, gruppo 2 in terra. */

  /* ============================================================
     Vista «Piano»
     ============================================================
     Rispondeva nessuno alla domanda «e poi cosa succede?». C'erano Oggi (le
     cose di adesso) e le mie piante (l'elenco di cosa possiedo), ma il
     percorso di una coltura dalla semina al raccolto non si vedeva da
     nessuna parte, pur essendo interamente calcolato dal motore: settantasei
     attività per coltura, ordinate, già lì.

     Qui ogni coltura è una riga del tempo. L'ordine è quello della raccolta —
     prima ciò che finisce prima — perché è l'ordine in cui uno se ne occupa.
     Le tappe ricorrenti (annaffiare, concimare) non si elencano una per una:
     sarebbero cinquanta righe di «annaffia» e coprirebbero le tre tappe che
     contano davvero (germinazione, diradamento, raccolta). ============ */

  /* Le tappe che segnano il ciclo. Irrigazione e controllo sono il rumore di
     fondo della cura quotidiana: stanno in «Oggi», non nel racconto.

     Il valore dice che tipo di tappa è, e serve a decidere cosa farne quando
     la data è passata:

       "osserva"  succede da sé — la pianta germina, la piantina attecchisce.
                  Sono previsioni, non compiti: passata la data si sono
                  avverate e spariscono. Scriverci «in ritardo di 12 giorni»
                  come faceva la prima versione non vuol dire niente, e
                  suonava come un rimprovero per qualcosa che non si è
                  mancato di fare.
       "fai"      c'è un gesto da compiere. Scaduta, resta in elenco e lo
                  dice — ma solo per una settimana, perché un diradamento di
                  tre settimane fa non si recupera più. */
  const TAPPE_PIANO = {
    germinazione: "osserva",
    attecchimento: "osserva",
    diradamento: "fai",
    trapianto: "fai",
    tutoraggio: "fai",
    concimazione: "fai",
    potatura: "fai",
    raccolta: "fai",
  };

  const GIORNI_RECUPERO = 7;

  const MAX_TAPPE = 5; // oltre, la riga del tempo smette di essere leggibile

  function quandoLabel(giorni) {
    if (giorni < 0) return t("piano.when_late", { n: -giorni });
    if (giorni === 0) return t("piano.when_today");
    if (giorni === 1) return t("piano.when_tomorrow");
    return t("piano.when_days", { n: giorni });
  }

  function pianoColtura(coltura) {
    const plant = BYID[coltura.plantId];
    if (!plant) return null;
    const product = PRODUCTS[coltura.plantId];
    const oggi = E.startOfToday();
    const inizio = E.parseDate(coltura.dataInizio);
    const gg = E.giorniARaccolta(plant, product, coltura.origine);
    const raccolta = gg ? E.addDays(inizio, gg) : null;
    const mancano = raccolta ? E.diffDays(raccolta, oggi) : null;
    const trascorsi = Math.max(0, E.diffDays(oggi, inizio));
    const percentuale = gg
      ? Math.min(100, Math.round((trascorsi / gg) * 100))
      : 100;

    const attivita = E.generaAttivita(coltura, plant, product);
    const tappe = attivita.filter((task) => TAPPE_PIANO[task.tipo]);
    // Una tappa è fatta se l'utente l'ha spuntata o se la sua data è passata:
    // il diradamento di tre settimane fa non è «in ritardo», è alle spalle.
    const conStato = tappe.map((task) => {
      const quando = dataEffettiva(task);
      return {
        task,
        quando,
        giorni: E.diffDays(quando, oggi),
        fatto: !!garden.fatti[task.id],
      };
    });
    /* Cosa resta davvero da fare: il futuro, più il passato recente delle
       sole tappe operative. Un ravanello la cui raccolta era tre giorni fa
       non ha «il ciclo concluso», ha una raccolta da fare. */
    const restanti = conStato.filter((s) => {
      if (s.fatto) return false;
      if (s.giorni >= 0) return true;
      return (
        TAPPE_PIANO[s.task.tipo] === "fai" && s.giorni >= -GIORNI_RECUPERO
      );
    });
    /* Il piede della scheda conta le tappe, non le attività. Contandole tutte
       diceva «57 cose da fare» per una bietola: cinquanta di quelle sono
       annaffiature, che si fanno senza pensarci e vivono in «Oggi». Un numero
       vero ma inservibile, e per giunta scoraggiante — qui interessa quante
       cose segnano ancora il percorso, non quanti gesti separati serviranno. */

    return {
      coltura,
      plant,
      percentuale,
      raccolta,
      mancano,
      daFare: restanti.length,
      restanti,
      fatte: conStato.filter((s) => s.fatto || s.giorni < 0),
    };
  }

  function etichettaRaccolta(p) {
    if (p.mancano === null) return t("piano.harvest_perennial");
    if (p.mancano < 0) return t("piano.harvest_late");
    if (p.mancano === 0) return t("piano.harvest_today");
    if (p.mancano === 1) return t("piano.harvest_one");
    return t("piano.harvest_in", { n: p.mancano });
  }

  function pianoCard(p, index) {
    const mostrate = p.restanti.slice(0, MAX_TAPPE);
    const oltre = p.restanti.length - mostrate.length;
    const urgente = p.mancano !== null && p.mancano <= 7;

    return `
      <article class="orto-piano-card" style="animation-delay:${Math.min(index, 8) * 45}ms">
        <header class="orto-piano-head">
          <img class="orto-piano-thumb" src="${svgSrc(p.plant.id)}" alt="" loading="lazy" />
          <div class="orto-piano-id">
            <h3>${escape(plantName(p.plant))}</h3>
            <small>${t("colture.plants", { n: p.coltura.quantita })}${
              p.coltura.posizione ? " · " + escape(p.coltura.posizione) : ""
            }</small>
          </div>
          <span class="orto-piano-harvest${urgente ? " is-soon" : ""}">
            ${escape(etichettaRaccolta(p))}
          </span>
        </header>

        <div class="orto-track orto-piano-track">
          <i style="width:${p.percentuale}%"></i>
          <span class="orto-track-cursor" style="left:${Math.min(99, p.percentuale)}%"></span>
        </div>

        ${
          p.restanti.length
            ? `<ol class="orto-piano-steps">
                ${mostrate
                  .map(
                    (s) => `
                  <li class="orto-piano-step">
                    <span class="orto-piano-step-ico" aria-hidden="true">${ICONE[s.task.tipo] || "🌿"}</span>
                    <span class="orto-piano-step-name">${escape(taskLabel(s.task))}</span>
                    <span class="orto-piano-step-when${s.giorni <= 1 ? " is-now" : ""}">${escape(quandoLabel(s.giorni))}</span>
                  </li>`,
                  )
                  .join("")}
                ${oltre > 0 ? `<li class="orto-piano-more">${t("piano.more", { n: oltre })}</li>` : ""}
              </ol>`
            : `<p class="orto-piano-done">🧺 ${t("piano.done")}</p>`
        }

        <footer class="orto-piano-foot">
          <span class="orto-piano-count">${
            p.daFare === 1
              ? t("piano.remaining_one")
              : t("piano.remaining", { n: p.daFare })
          }</span>
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
            data-orto-action="edit-coltura" data-coltura-id="${escape(p.coltura.id)}">${t("piano.open")}</button>
        </footer>
      </article>`;
  }

  /* Le tre schede ora corrispondono a tre contenuti distinti. "Da piantare"
     non mescola più le scorte con ciò che è già in coltivazione. */
  function sezioneDaPiantareHtml() {
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    );
    return `
      <section class="orto-sec">
        <div class="orto-sec-head">
          <h2>${t("piante.title")}</h2>
          <p class="orto-sec-sub">${t("piante.sub")}</p>
        </div>
        ${gruppoDaPiantareHtml(attive, "", true)}
        ${archiviateHtml()}
      </section>`;
  }

  /* L'archivio è intenzionalmente secondario e chiuso: mantiene pulita la
     lista principale senza trasformare un clic sbagliato in una perdita. */
  function archiviateHtml() {
    const archiviate = inventory.voci
      .filter((voce) => voce.archiviata && BYID[voce.plantId])
      .sort((a, b) =>
        plantName(BYID[a.plantId]).localeCompare(plantName(BYID[b.plantId])),
      );
    if (!archiviate.length) return "";
    const sottotitolo =
      archiviate.length === 1
        ? t("disp.archived_sub_one")
        : t("disp.archived_sub", { n: archiviate.length });
    return `<details class="orto-stock-archived">
      <summary>
        <span class="orto-stock-archived-icon" aria-hidden="true">▣</span>
        <span><b>${t("disp.archived_title")}</b><small>${sottotitolo}</small></span>
        <i aria-hidden="true">⌄</i>
      </summary>
      <div class="orto-stock-archived-list">
        ${archiviate
          .map((voce) => {
            const plant = BYID[voce.plantId];
            const origine =
              voce.variante === "piantina"
                ? t("colture.from_plant")
                : t("colture.from_seed");
            return `<article class="orto-stock-archived-item">
              <img src="${photoSrc(plant.id)}" alt="" loading="lazy">
              <span><b>${escape(plantName(plant))}</b><small>${origine}</small></span>
              <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                data-orto-action="restore-voce" data-voce-id="${escape(voce.id)}">${t("disp.restore")}</button>
            </article>`;
          })
          .join("")}
      </div>
    </details>`;
  }

  /* ---------- serra visuale dell'Orto ---------- */
  const GREENHOUSE_MARGIN = 7;
  const GREENHOUSE_BED_GAP = 6;
  const GREENHOUSE_BED_PAD = 9;

  function greenhouseColumns(widthCm, bedCount) {
    const suggested = widthCm >= 420 ? 3 : widthCm >= 260 ? 2 : 1;
    return Math.max(1, Math.min(suggested, bedCount || 1));
  }

  function greenhouseCanUseRow(plant) {
    return (
      ortoGreenhouse.width >= 4.2 &&
      ortoGreenhouse.length >= 4.8 &&
      plant?.arch === "rampicante" &&
      plant?.h === "alta"
    );
  }

  /* Mantiene per ogni coltura solo metadati di layout propri dell'Orto.
     Le quantità continuano a provenire dalle colture realmente piantate. */
  function syncOrtoGreenhouseBeds(crops) {
    const current = ortoGreenhouse.beds || {};
    const next = {};
    let rowSlots = Math.max(
      0,
      greenhouseColumns(ortoGreenhouse.width * 100, crops.length) - 1,
    );
    crops.forEach((crop) => {
      const saved = current[crop.id] || {};
      const wantsRow = saved.layout === "fila";
      const canUseRow = greenhouseCanUseRow(crop.plant) && rowSlots > 0;
      const layout = canUseRow && (wantsRow || !current[crop.id])
        ? "fila"
        : "blocco";
      if (layout === "fila") rowSlots--;
      next[crop.id] = {
        layout,
        col: Number.isInteger(saved.col) && saved.col >= 0
          ? saved.col
          : undefined,
      };
    });
    ortoGreenhouse.beds = next;
    return next;
  }

  function greenhouseCrops(extraCrop = null) {
    const groups = new Map();
    const source = extraCrop
      ? [...garden.colture, extraCrop]
      : garden.colture;
    source
      .filter((crop) => crop.stato !== "raccolta" && BYID[crop.plantId])
      .forEach((crop) => {
        const origin = crop.origine === "piantina" ? "piantina" : "seme";
        const groupId = `${crop.plantId}|${origin}`;
        const current = groups.get(groupId) || {
          id: groupId,
          plant: BYID[crop.plantId],
          origin,
          quantity: 0,
        };
        current.quantity += Math.max(1, Number(crop.quantita) || 1);
        groups.set(groupId, current);
      });
    const heightRank = { alta: 0, medio: 1, media: 1, bassa: 2 };
    const remaining = [...groups.values()].sort(
      (a, b) =>
        (heightRank[a.plant.h] ?? 1) - (heightRank[b.plant.h] ?? 1) ||
        Number(a.plant.acqua === "alta") -
          Number(b.plant.acqua === "alta") ||
        (Number(a.plant.d) || 30) - (Number(b.plant.d) || 30),
    );
    const ordered = [];
    while (remaining.length) {
      const last = ordered.at(-1)?.plant || null;
      let bestIndex = 0;
      let bestScore = Infinity;
      remaining.forEach((crop, index) => {
        const conflicts = ordered.reduce(
          (sum, placed) =>
            sum +
            Number(
              greenhouseRelated(crop.plant, placed.plant, "nemiche") ||
                greenhouseRelated(placed.plant, crop.plant, "nemiche"),
            ),
          0,
        );
        const score =
          Number(
            greenhouseRelated(crop.plant, last, "nemiche") ||
              greenhouseRelated(last, crop.plant, "nemiche"),
          ) *
            1000 +
          conflicts * 30 -
          Number(
            greenhouseRelated(crop.plant, last, "amiche") ||
              greenhouseRelated(last, crop.plant, "amiche"),
          ) *
            20 +
          (heightRank[crop.plant.h] ?? 1) * 4 +
          (Number(crop.plant.d) || 30) * 0.01 +
          index * 0.001;
        if (score < bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });
      ordered.push(remaining.splice(bestIndex, 1)[0]);
    }
    return ordered;
  }

  function greenhouseRelated(first, second, field) {
    const values = Array.isArray(first?.[field]) ? first[field] : [];
    return values.includes(second?.id) || values.includes(second?.nome);
  }

  function greenhouseMaxSlots(span, spacing) {
    return Math.max(1, Math.floor(Math.max(0, span) / Math.max(1, spacing)));
  }

  function greenhouseCenteredSlots(start, span, count, spacing) {
    const safeCount = Math.max(1, count);
    if (safeCount === 1) return [start + span / 2];
    const step = Math.max(1, spacing);
    const used = (safeCount - 1) * step;
    const first = start + Math.max(0, (span - used) / 2);
    return Array.from({ length: safeCount }, (_, index) => first + index * step);
  }

  const greenhousePlantRadius = (plant) =>
    Math.max((Number(plant.d) || 30) * 0.55, 8);

  /* Adattamento del calcolo usato dal configuratore: colonne di aiuole,
     camminamenti reali fra le colonne e distanze specifiche delle piante. */
  function computeGreenhouseLayout(extraCrop = null) {
    const widthCm = ortoGreenhouse.width * 100;
    const lengthCm = ortoGreenhouse.length * 100;
    const crops = greenhouseCrops(extraCrop);
    const bedState = syncOrtoGreenhouseBeds(crops);
    const columnCount = greenhouseColumns(widthCm, crops.length);
    const path = ortoGreenhouse.path;
    const bedWidth = Math.max(
      40,
      (widthCm - 2 * GREENHOUSE_MARGIN - (columnCount - 1) * path) /
        columnCount,
    );
    const columns = Array.from({ length: columnCount }, (_, index) => ({
      index,
      x: GREENHOUSE_MARGIN + index * (bedWidth + path),
      y: GREENHOUSE_MARGIN,
      lastPlant: null,
    }));
    const beds = [];
    let unplaced = 0;

    crops.forEach((crop, cropIndex) => {
      const plant = crop.plant;
      const savedBed = bedState[crop.id] || {};
      const spacing = Math.max(10, Number(plant.d) || 30);
      const rowSpacing = Math.max(spacing, Number(plant.dr) || spacing);
      const innerWidth = Math.max(20, bedWidth - 2 * GREENHOUSE_BED_PAD);
      const plantsPerRow = greenhouseMaxSlots(innerWidth, rowSpacing);
      const isRow =
        savedBed.layout === "fila" && greenhouseCanUseRow(plant);
      const rows = isRow
        ? greenhouseMaxSlots(
            lengthCm - 2 * GREENHOUSE_MARGIN - 2 * GREENHOUSE_BED_PAD,
            spacing,
          )
        : Math.max(1, Math.ceil(crop.quantity / plantsPerRow));
      const naturalHeight = isRow
        ? lengthCm - 2 * GREENHOUSE_MARGIN
        : 2 * GREENHOUSE_BED_PAD + rows * spacing;
      const height = isRow
        ? naturalHeight
        : Math.max(
            naturalHeight,
            Math.max(46, greenhousePlantRadius(plant) * 3 + 18),
          );
      let column;
      if (
        Number.isInteger(savedBed.col) &&
        savedBed.col >= 0 &&
        savedBed.col < columnCount
      ) {
        column = columns[savedBed.col];
      } else {
        column = columns.reduce((best, current) => {
        const score = (candidate) => {
          const incompatible =
            greenhouseRelated(plant, candidate.lastPlant, "nemiche") ||
            greenhouseRelated(candidate.lastPlant, plant, "nemiche");
          const companion =
            greenhouseRelated(plant, candidate.lastPlant, "amiche") ||
            greenhouseRelated(candidate.lastPlant, plant, "amiche");
          return (
            candidate.y +
            (incompatible ? path * 3 : 0) -
            (companion ? path * 0.35 : 0)
          );
        };
        return score(current) < score(best) ? current : best;
        });
        savedBed.col = column.index;
      }
      const rowOffset = isRow ? 0 : Math.max(0, (height - naturalHeight) / 2);
      const xSlots = greenhouseCenteredSlots(
        column.x + GREENHOUSE_BED_PAD,
        innerWidth,
        plantsPerRow,
        rowSpacing,
      );
      const ySlots = greenhouseCenteredSlots(
        column.y + GREENHOUSE_BED_PAD + rowOffset,
        Math.max(0, naturalHeight - 2 * GREENHOUSE_BED_PAD),
        rows,
        spacing,
      );
      const positions = [];
      let generated = 0;
      for (let row = 0; row < rows && generated < crop.quantity; row++) {
        for (
          let plantColumn = 0;
          plantColumn < plantsPerRow && generated < crop.quantity;
          plantColumn++
        ) {
          positions.push({ x: xSlots[plantColumn], y: ySlots[row] });
          generated++;
        }
      }
      const visiblePositions = positions.filter(
        (position) =>
          position.y >= GREENHOUSE_MARGIN &&
          position.y <= lengthCm - GREENHOUSE_MARGIN,
      );
      const bedUnplaced = Math.max(0, crop.quantity - visiblePositions.length);
      unplaced += bedUnplaced;
      beds.push({
        id: `${crop.id}-${cropIndex}`,
        stateId: crop.id,
        plant,
        origin: crop.origin,
        quantity: crop.quantity,
        placed: visiblePositions.length,
        unplaced: bedUnplaced,
        spacing,
        rowSpacing,
        x: column.x,
        y: column.y,
        width: bedWidth,
        height,
        cols: plantsPerRow,
        rows,
        positions: visiblePositions,
        columnIndex: column.index,
        layout: isRow ? "fila" : "blocco",
      });
      column.y += height + GREENHOUSE_BED_GAP;
      column.lastPlant = plant;
    });

    /* Come nel configuratore, l'assegnazione alle colonne resta stabile fra
       i rendering; viene però salvata esclusivamente nella chiave dell'Orto. */
    if (!extraCrop) saveOrtoGreenhouse();

    const overflow =
      unplaced > 0 ||
      beds.some((bed) => bed.y + bed.height > lengthCm - GREENHOUSE_MARGIN + 1);
    return {
      widthCm,
      lengthCm,
      bedWidth,
      columnCount,
      beds,
      unplaced,
      overflow,
    };
  }

  /* Quantità massima aggiungibile senza oltrepassare i limiti della serra.
     La ricerca usa una coltura virtuale e non modifica mai il diario reale. */
  function greenhouseFitQuantity(plantId, requested, origin = "seme") {
    const max = Math.max(0, Math.round(Number(requested) || 0));
    if (!max || !BYID[plantId]) return 0;
    let low = 0;
    let high = max;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      const test = computeGreenhouseLayout({
        id: "preview",
        plantId,
        quantita: middle,
        origine: origin === "piantina" ? "piantina" : "seme",
        stato: "in_corso",
      });
      if (test.overflow) high = middle - 1;
      else low = middle;
    }
    return low;
  }

  /* Scena autonoma derivata dalla vista del configuratore. Usa esclusivamente
     il layout dell'Orto e non legge mai `serra.config.v1`. */
  function greenhouseSceneSvg(layout) {
    const wall = 7;
    const pad = 26;
    const totalWidth = layout.widthCm + wall * 2;
    const totalLength = layout.lengthCm + wall * 2;
    const viewWidth = totalWidth + pad * 2;
    const viewHeight = totalLength + pad * 2;
    const originX = pad + wall;
    const originY = pad + wall;
    const night = document.documentElement.dataset.theme === "dark";
    let scene = `<defs>
      <pattern id="ortoSceneSoil" width="38" height="38" patternUnits="userSpaceOnUse"><rect width="38" height="38" fill="#5e4632"/><circle cx="7" cy="9" r="1.7" fill="#38291d"/><circle cx="25" cy="15" r="2.1" fill="#786047"/><circle cx="16" cy="31" r="1.4" fill="#3f2e20"/><circle cx="34" cy="28" r="1.8" fill="#856c50"/></pattern>
      <pattern id="ortoSceneGravel" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="#d8d0bd"/><ellipse cx="7" cy="8" rx="3" ry="1.8" fill="#eee8d9" stroke="#9d9584" stroke-width=".5"/><ellipse cx="23" cy="13" rx="2.6" ry="1.5" fill="#bfb6a3"/><ellipse cx="14" cy="27" rx="3.2" ry="1.7" fill="#e6decc" stroke="#aaa18e" stroke-width=".45"/><ellipse cx="31" cy="30" rx="2" ry="1.2" fill="#b8ae99"/></pattern>
      <pattern id="ortoSceneDirt" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="#c4a55e"/><circle cx="8" cy="7" r="1.5" fill="#876927" opacity=".55"/><circle cx="24" cy="18" r="2" fill="#e1c681" opacity=".6"/><path d="M5 25l6-2M27 7l4 3" stroke="#76551e" stroke-width="1" opacity=".4"/></pattern>
      <pattern id="ortoSceneGrass" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="${night ? "#243b2c" : "#9fb083"}"/><path d="M4 19l2-5m9 13l-1-6m11-8l2-5m3 22l-1-5" stroke="${night ? "#3c6748" : "#668151"}" stroke-width="1.2" opacity=".7"/></pattern>
      <linearGradient id="ortoSceneFrame" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff"/><stop offset=".35" stop-color="#e8eeee"/><stop offset=".7" stop-color="#aebbbb"/><stop offset="1" stop-color="#758585"/></linearGradient>
      <linearGradient id="ortoSceneGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dff5f7" stop-opacity=".03"/><stop offset=".35" stop-color="#fff" stop-opacity=".08"/><stop offset=".72" stop-color="#b7d8df" stop-opacity=".025"/></linearGradient>
      <radialGradient id="ortoSceneLight"><stop stop-color="${night ? "#315842" : "#fff9d9"}" stop-opacity=".16"/><stop offset="1" stop-color="#183d28" stop-opacity=".08"/></radialGradient>
      <linearGradient id="ortoSceneNightGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#071a20" stop-opacity=".16"/><stop offset=".5" stop-color="#0b2021" stop-opacity=".09"/><stop offset="1" stop-color="#020b0d" stop-opacity=".2"/></linearGradient>
      <radialGradient id="ortoSceneLampPool"><stop offset="0" stop-color="#fff4b0" stop-opacity=".72"/><stop offset=".25" stop-color="#ffe58a" stop-opacity=".42"/><stop offset=".62" stop-color="#e9d272" stop-opacity=".16"/><stop offset="1" stop-color="#d5bf62" stop-opacity="0"/></radialGradient>
      <radialGradient id="ortoSceneLampBulb"><stop offset="0" stop-color="#fffde5"/><stop offset=".45" stop-color="#fff3a4"/><stop offset="1" stop-color="#e7b942"/></radialGradient>
      <filter id="ortoSceneShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="9" flood-color="#102b1a" flood-opacity=".34"/></filter>
      <filter id="ortoSceneLampBloom" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="4.5"/></filter>
      <clipPath id="ortoSceneClip"><rect x="${originX}" y="${originY}" width="${layout.widthCm}" height="${layout.lengthCm}" rx="6"/></clipPath>
    </defs>`;
    scene += `<rect width="${viewWidth}" height="${viewHeight}" fill="url(#ortoSceneGrass)"/><rect width="${viewWidth}" height="${viewHeight}" fill="url(#ortoSceneLight)"/>`;
    scene += `<rect x="${pad + 5}" y="${pad + 8}" width="${totalWidth}" height="${totalLength}" rx="11" fill="#102719" opacity=".26" filter="url(#ortoSceneShadow)"/>`;
    scene += `<rect x="${pad}" y="${pad}" width="${totalWidth}" height="${totalLength}" rx="10" fill="#657779" stroke="#42575a" stroke-width="1.3"/><rect x="${pad + 1.5}" y="${pad + 1.5}" width="${totalWidth - 3}" height="${totalLength - 3}" rx="8.5" fill="none" stroke="rgba(240,248,248,.72)" stroke-width=".9"/>`;
    scene += `<g clip-path="url(#ortoSceneClip)"><rect x="${originX}" y="${originY}" width="${layout.widthCm}" height="${layout.lengthCm}" fill="#3a2710"/>`;
    scene += `<rect x="${originX}" y="${originY}" width="${GREENHOUSE_MARGIN}" height="${layout.lengthCm}" fill="url(#ortoSceneDirt)"/><rect x="${originX + layout.widthCm - GREENHOUSE_MARGIN}" y="${originY}" width="${GREENHOUSE_MARGIN}" height="${layout.lengthCm}" fill="url(#ortoSceneDirt)"/><rect x="${originX + GREENHOUSE_MARGIN}" y="${originY}" width="${layout.widthCm - GREENHOUSE_MARGIN * 2}" height="${GREENHOUSE_MARGIN}" fill="url(#ortoSceneDirt)"/><rect x="${originX + GREENHOUSE_MARGIN}" y="${originY + layout.lengthCm - GREENHOUSE_MARGIN}" width="${layout.widthCm - GREENHOUSE_MARGIN * 2}" height="${GREENHOUSE_MARGIN}" fill="url(#ortoSceneDirt)"/>`;
    for (let index = 0; index < layout.columnCount - 1; index++) {
      const pathX =
        GREENHOUSE_MARGIN +
        (index + 1) * layout.bedWidth +
        index * ortoGreenhouse.path;
      scene += `<rect x="${originX + pathX}" y="${originY}" width="${ortoGreenhouse.path}" height="${layout.lengthCm}" fill="url(#ortoSceneGravel)"/>`;
    }
    layout.beds.forEach((bed, index) => {
      const x = originX + bed.x;
      const y = originY + bed.y;
      const selected = bed.id === selectedGreenhouseBed;
      const isSeedling = bed.origin === "piantina";
      const sourceLabel = t(
        isSeedling ? "greenhouse.source_plant" : "greenhouse.source_seed",
      );
      scene += `<g class="orto-scene-bed ${isSeedling ? "is-seedling" : "is-seed"}${selected ? " is-selected" : ""}" data-orto-action="select-greenhouse-bed" data-bed-id="${escape(bed.id)}" role="button" tabindex="0" aria-label="${escape(plantName(bed.plant))}, ${sourceLabel}, ${bed.quantity}"><rect class="orto-scene-bed-soil" x="${x}" y="${y}" width="${bed.width}" height="${bed.height}" fill="url(#ortoSceneSoil)"/>`;
      const slotWidth = Math.max(
        10,
        (bed.width - 2 * GREENHOUSE_BED_PAD) / Math.max(1, bed.cols),
      );
      const slotHeight = Math.max(
        10,
        (bed.height - 2 * GREENHOUSE_BED_PAD) / Math.max(1, bed.rows),
      );
      const radius = Math.min(
        greenhousePlantRadius(bed.plant),
        Math.max(4.5, Math.min(slotWidth, slotHeight) * 0.43),
      );
      bed.positions.forEach((position) => {
        const visualRadius = radius * (isSeedling ? 1 : 0.68);
        const size = visualRadius * 2;
        scene += `<circle class="orto-scene-origin-marker" cx="${originX + position.x}" cy="${originY + position.y}" r="${visualRadius * (isSeedling ? 0.76 : 0.92)}"/>`;
        scene += `<image class="orto-scene-plant" href="${svgSrc(bed.plant.id)}" x="${originX + position.x - visualRadius}" y="${originY + position.y - visualRadius}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
      });
      const label = plantName(bed.plant);
      const fullLabel = `${label} · ${bed.quantity} · ${sourceLabel}`;
      const labelWidth = Math.min(
        Math.max(60, fullLabel.length * 5.4 + 18),
        Math.max(45, bed.width - 8),
      );
      const labelSize = Math.max(
        5.76,
        Math.min(
          11.4,
          Math.min(layout.widthCm, layout.lengthCm) * 0.0192,
          ((bed.width - 28) / Math.max(fullLabel.length * 0.56, 1)) * 1.2,
          bed.height * 0.168,
        ),
      );
      scene += `<rect class="orto-scene-label-bg" x="${x + bed.width / 2 - labelWidth / 2}" y="${y + 4}" width="${labelWidth}" height="19" rx="8"/><text class="orto-scene-label" x="${x + bed.width / 2}" y="${y + 14}" dominant-baseline="middle" text-anchor="middle" font-size="${labelSize}">${escape(fullLabel)}</text></g>`;
    });
    scene += `</g>`;
    const lampX = originX + layout.widthCm / 2;
    const lampYs = [
      originY + layout.lengthCm * 0.19,
      originY + layout.lengthCm * 0.5,
      originY + layout.lengthCm * 0.81,
    ];
    const lampPoolWidth = Math.max(
      38,
      Math.min(layout.widthCm * 0.46, 118),
    );
    const lampPoolHeight = Math.max(
      42,
      Math.min(layout.lengthCm * 0.19, 94),
    );
    if (night) {
      scene += `<g clip-path="url(#ortoSceneClip)" pointer-events="none"><rect x="${originX}" y="${originY}" width="${layout.widthCm}" height="${layout.lengthCm}" fill="url(#ortoSceneNightGlass)"/>`;
      lampYs.forEach((lampY) => {
        scene += `<ellipse class="orto-scene-lamp-pool" cx="${lampX}" cy="${lampY}" rx="${lampPoolWidth}" ry="${lampPoolHeight}" fill="url(#ortoSceneLampPool)" style="mix-blend-mode:screen"/>`;
      });
      scene += `</g>`;
    }
    const bars = Math.max(2, Math.round(layout.widthCm / 60));
    for (let index = 1; index < bars; index++) {
      const x = originX + (layout.widthCm * index) / bars;
      scene += `<line x1="${x}" y1="${originY}" x2="${x}" y2="${originY + layout.lengthCm}" stroke="rgba(255,255,255,.3)" stroke-width=".7" pointer-events="none"/>`;
    }
    const crosses = Math.max(2, Math.round(layout.lengthCm / 60));
    for (let index = 1; index < crosses; index++) {
      const y = originY + (layout.lengthCm * index) / crosses;
      scene += `<line x1="${originX}" y1="${y}" x2="${originX + layout.widthCm}" y2="${y}" stroke="rgba(255,255,255,.25)" stroke-width=".65" pointer-events="none"/>`;
    }
    scene += `<rect x="${originX}" y="${originY}" width="${layout.widthCm}" height="${layout.lengthCm}" rx="4" fill="url(#ortoSceneGlass)" stroke="rgba(37,58,61,.58)" stroke-width="5.5" pointer-events="none"/><rect x="${originX}" y="${originY}" width="${layout.widthCm}" height="${layout.lengthCm}" rx="4" fill="none" stroke="url(#ortoSceneFrame)" stroke-width="3.8" pointer-events="none"/>`;
    const doorWidth = Math.min(layout.widthCm * 0.34, 90);
    const doorX = originX + layout.widthCm / 2 - doorWidth / 2;
    const doorY = originY + layout.lengthCm - 6;
    scene += `<rect x="${doorX}" y="${doorY}" width="${doorWidth}" height="12" rx="2.5" fill="rgba(213,238,241,.92)" stroke="#60787a" stroke-width="1.4"/><line x1="${doorX + doorWidth / 2}" y1="${doorY + 2}" x2="${doorX + doorWidth / 2}" y2="${doorY + 10}" stroke="#60787a" stroke-width="1.2"/>`;
    if (night) {
      lampYs.forEach((lampY) => {
        scene += `<g transform="translate(${lampX} ${lampY})" pointer-events="none"><circle class="orto-scene-lamp-bloom" r="14" fill="#ffe37a" opacity=".24" filter="url(#ortoSceneLampBloom)"/><circle r="7.2" fill="#34413d" stroke="#aab5ae" stroke-width="1.3"/><circle class="orto-scene-lamp-bulb" r="4.6" fill="url(#ortoSceneLampBulb)" stroke="#fff8ce" stroke-width=".8"/><circle cx="-1.4" cy="-1.5" r="1.4" fill="#fff" opacity=".92"/></g>`;
      });
    }
    if (layout.overflow)
      scene += `<line x1="${originX}" y1="${originY + layout.lengthCm}" x2="${originX + layout.widthCm}" y2="${originY + layout.lengthCm}" stroke="#b4452c" stroke-width="4" stroke-dasharray="14 8"/>`;
    scene += `<g transform="translate(${viewWidth - pad - 2} ${viewHeight - pad - 26})"><circle r="15" fill="${night ? "#10231f" : "#fff"}" stroke="${night ? "#e7d98d" : "#d9a441"}" stroke-width="2"/><text x="0" y="5" text-anchor="middle" font-size="16">${night ? "🌙" : "☀️"}</text><text x="0" y="-22" text-anchor="middle" font-family="DM Sans" font-size="9" font-weight="800" fill="${night ? "#e9dfaa" : "#7b6a3a"}">${escape(t(night ? "greenhouse.night" : "greenhouse.south").toUpperCase())}</text></g>`;
    const sceneLabel = t("greenhouse.scene_aria", {
      mode: t(night ? "greenhouse.night" : "greenhouse.day"),
      n: layout.beds.length,
    });
    return `<svg viewBox="0 0 ${viewWidth} ${viewHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escape(sceneLabel)}">${scene}</svg>`;
  }

  function greenhouseHtml() {
    const crops = greenhouseCrops();
    const layout = computeGreenhouseLayout();
    if (!layout.beds.some((bed) => bed.id === selectedGreenhouseBed))
      selectedGreenhouseBed = layout.beds[0]?.id || null;
    const selected = layout.beds.find(
      (bed) => bed.id === selectedGreenhouseBed,
    );

    return `<section class="orto-greenhouse${ortoGreenhouse.configured ? " is-configured" : ""}">
      <div class="orto-greenhouse-head">
        <div>
          <span class="orto-greenhouse-eyebrow">${t("greenhouse.eyebrow")}</span>
          <h3>${t("greenhouse.title")}</h3>
          <p>${t("greenhouse.sub")}</p>
        </div>
      </div>
      <details class="orto-greenhouse-settings"${ortoGreenhouse.configured ? "" : " open"}>
        <summary>
          <span><b>${t("greenhouse.settings")}</b><small>${ortoGreenhouse.width} × ${ortoGreenhouse.length} m · ${t("greenhouse.path_stat", { n: ortoGreenhouse.path })}</small></span>
          <span class="orto-greenhouse-settings-action">${t("greenhouse.edit_settings")} <i aria-hidden="true">⌄</i></span>
        </summary>
        <form class="orto-greenhouse-form" id="ortoGreenhouseForm">
          <label><span>${t("greenhouse.width")}</span><span class="orto-measure-input"><input name="width" type="number" min="1.5" max="20" step="0.1" inputmode="decimal" value="${ortoGreenhouse.width}"><small>${t("greenhouse.meters")}</small></span></label>
          <label><span>${t("greenhouse.length")}</span><span class="orto-measure-input"><input name="length" type="number" min="2" max="40" step="0.1" inputmode="decimal" value="${ortoGreenhouse.length}"><small>${t("greenhouse.meters")}</small></span></label>
          <label><span>${t("greenhouse.path")}</span><span class="orto-measure-input"><input name="path" type="number" min="30" max="120" step="5" inputmode="numeric" value="${ortoGreenhouse.path}"><small>${t("greenhouse.centimeters")}</small></span></label>
          <button class="orto-btn orto-greenhouse-submit" type="submit">${t(ortoGreenhouse.configured ? "greenhouse.update" : "greenhouse.create")}</button>
        </form>
      </details>
      ${
        crops.length
          ? `<div class="orto-greenhouse-workspace">
              <div class="orto-greenhouse-plan">
                <div class="orto-greenhouse-stats">
                  <span>${t("greenhouse.beds", { n: layout.beds.length })}</span>
                  <span>${ortoGreenhouse.width} × ${ortoGreenhouse.length} m</span>
                  <span>${t("greenhouse.path_stat", { n: ortoGreenhouse.path })}</span>
                </div>
                <div class="orto-greenhouse-stage">
                  <div class="orto-greenhouse-stage-head">
                    <div><h4>${t("greenhouse.view_title")}</h4><p>${t("greenhouse.view_sub")}</p></div>
                    <div class="orto-greenhouse-north"><span>↑</span>${t("greenhouse.north")}</div>
                  </div>
                  <div class="orto-greenhouse-scene-wrap">
                    <div class="orto-greenhouse-config-scene">${greenhouseSceneSvg(layout)}</div>
                  </div>
                </div>
              </div>
              <aside class="orto-greenhouse-detail">
                ${
                  selected
                    ? `<div class="orto-greenhouse-detail-title"><span class="orto-greenhouse-detail-plant${selected.origin === "piantina" ? " is-seedling" : " is-seed"}"><img src="${photoSrc(selected.plant.id)}" alt="" loading="lazy"></span><div><small>${t("greenhouse.bed", { n: layout.beds.indexOf(selected) + 1 })}</small><h4>${escape(plantName(selected.plant))}</h4><span class="orto-greenhouse-origin-chip ${selected.origin === "piantina" ? "is-seedling" : "is-seed"}">${t(selected.origin === "piantina" ? "greenhouse.source_plant" : "greenhouse.source_seed")}</span></div></div>
                       <dl><div><dt>${t("greenhouse.spacing")}</dt><dd>${t("greenhouse.spacing_value", { d: selected.spacing, dr: selected.rowSpacing })}</dd></div><div><dt>${t("greenhouse.placed", { n: selected.placed })}</dt><dd>${selected.unplaced ? t("greenhouse.unplaced", { n: selected.unplaced }) : "✓"}</dd></div></dl>
                       <div class="orto-greenhouse-layout-control"><span>${t("greenhouse.layout")}</span><div role="group" aria-label="${t("greenhouse.layout")}"><button type="button" class="${selected.layout === "blocco" ? "is-active" : ""}" data-orto-action="set-greenhouse-layout" data-bed-id="${escape(selected.id)}" data-layout="blocco">${t("greenhouse.layout_block")}</button><button type="button" class="${selected.layout === "fila" ? "is-active" : ""}" data-orto-action="set-greenhouse-layout" data-bed-id="${escape(selected.id)}" data-layout="fila" ${greenhouseCanUseRow(selected.plant) ? "" : "disabled"}>${t("greenhouse.layout_row")}</button></div>${greenhouseCanUseRow(selected.plant) ? `<small>${t("greenhouse.layout_row_hint")}</small>` : ""}</div>`
                    : `<p>${t("greenhouse.hint")}</p>`
                }
                ${layout.overflow ? `<div class="orto-greenhouse-warning"><span>!</span><p>${layout.unplaced ? `<strong>${t("greenhouse.unplaced", { n: layout.unplaced })}</strong>` : ""}${t("greenhouse.warning")}</p></div>` : ""}
              </aside>
            </div>`
          : `<div class="orto-greenhouse-empty"><span>🌱</span><div><h4>${t("greenhouse.empty_title")}</h4><p>${t("greenhouse.empty_text")}</p><button class="orto-btn orto-btn--sm" type="button" data-orto-action="go-piante">${t("next.cta")}</button></div></div>`
      }
    </section>`;
  }

  /* "Piantate" mostra solo le colture attive, con fase, prossima attività e
     raccolta stimata. Il calendario resta dentro ogni scheda, dove serve. */
  function sezionePiantateHtml() {
    return `
      <section class="orto-sec">
        <div class="orto-sec-head">
          <h2>${t("tab.piano")}</h2>
          <p class="orto-sec-sub">${t("colture.sub")}</p>
        </div>
        ${greenhouseHtml()}
        ${gruppoInTerraHtml("", true)}
        ${raccolteHistoryHtml()}
      </section>`;
  }

  const groupHead = (n, titolo, sub, conteggio) => `
    <header class="orto-group-head">
      ${n ? `<span class="orto-group-no" aria-hidden="true">${n}</span>` : ""}
      <div class="orto-group-copy">
        <h3>${titolo}</h3>
        <p>${sub}</p>
      </div>
      ${conteggio ? `<span class="orto-group-count">${conteggio}</span>` : ""}
    </header>`;

  /* Il numero arriva da fuori: i due gruppi si scambiano di posto a seconda
     che l'orto sia partito o no, quindi non possono portarselo scritto. */
  function gruppoInTerraHtml(numero, senzaTestata = false) {
    const oggi = E.startOfToday();
    const colture = activeCrops();
    if (!colture.length && senzaTestata) return "";
    const riepilogo = colture.reduce(
      (acc, c) => {
        const plant = BYID[c.plantId];
        if (!plant) return acc;
        const gg = E.giorniARaccolta(plant, PRODUCTS[c.plantId], c.origine);
        const fine = E.addDays(E.parseDate(c.dataInizio), gg);
        if (gg && fine >= oggi && E.diffDays(fine, oggi) <= GIORNI_RACCOLTA_VICINA) acc.vicine++;
        acc.piante += Number(c.quantita) || 0;
        return acc;
      },
      { vicine: 0, piante: 0 },
    );

    const vuoto = colture.length === 0;

    return `
      <section class="orto-group">
        ${
          senzaTestata
            ? ""
            : groupHead(
                numero,
                t("colture.title"),
                t("colture.sub"),
                colture.length,
              )
        }
        ${
          vuoto
            ? ""
            : `<div class="orto-stats">
          <div class="orto-stat"><span class="orto-stat-ico">🌿</span><span><b>${colture.length}</b><small>${t("colture.stat_active")}</small></span></div>
          <div class="orto-stat"><span class="orto-stat-ico">🪴</span><span><b>${riepilogo.piante}</b><small>${t("colture.stat_plants")}</small></span></div>
          <div class="orto-stat"><span class="orto-stat-ico">🧺</span><span><b>${riepilogo.vicine}</b><small>${t("colture.stat_soon")}</small></span></div>
        </div>
        <div class="orto-toolbar">
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button" data-orto-action="export-ics">${t("colture.ics")}</button>
          <button class="orto-btn orto-btn--danger orto-btn--sm" type="button" data-orto-action="clear-planted">${t("clear_planted.action")}</button>
        </div>`
        }
        <div class="orto-grid">${
          colture.length
            ? colture.map(colturaCard).join("")
            : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">🌱</span>
              <h4>${t("colture.empty_title")}</h4><p>${t("colture.empty_text")}</p>
              <div class="orto-empty-actions"><button class="orto-btn" type="button"
                data-orto-action="go-piante">${t("next.cta")}</button></div></div>`
        }</div>
      </section>`;
  }

  function raccolteHistoryHtml() {
    const raccolte = harvestedCrops().sort((a, b) => {
      const dataRaccolta = (crop) =>
        crop.eventi
          ?.filter((evento) => evento.tipo === "raccolta")
          .at(-1)?.data || crop.dataInizio;
      return String(dataRaccolta(b)).localeCompare(String(dataRaccolta(a)));
    });
    if (!raccolte.length) return "";
    return `<details class="orto-harvest-history">
      <summary>
        <span class="orto-harvest-history-ico" aria-hidden="true">🧺</span>
        <span><b>${t("harvest.history_title")}</b><small>${t("harvest.history_sub", { n: raccolte.length })}</small></span>
        <span class="orto-harvest-history-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="orto-harvest-history-list">
        ${raccolte
          .map((crop) => {
            const plant = BYID[crop.plantId];
            if (!plant) return "";
            const raccolta = crop.eventi
              ?.filter((evento) => evento.tipo === "raccolta")
              .at(-1);
            return `<article class="orto-harvest-history-item">
              <img src="${svgSrc(plant.id)}" alt="" loading="lazy">
              <span><b>${escape(plantName(plant))}</b><small>${t("harvest.history_date", {
                date: fmtBreve(E.parseDate(raccolta?.data || crop.dataInizio)),
              })} · ${t("colture.plants", { n: crop.quantita })}</small></span>
              <button class="orto-remove-btn" type="button"
                data-orto-action="remove-coltura" data-coltura-id="${escape(crop.id)}"
                title="${escape(t("colture.remove"))}"
                aria-label="${escape(t("colture.remove_aria", { nome: plantName(plant) }))}"><span aria-hidden="true">×</span></button>
            </article>`;
          })
          .join("")}
      </div>
    </details>`;
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
    // Raccolta entro una settimana: l'azione principale della scheda cambia.
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
          <!-- Le azioni di cura restano verdi; la rimozione usa la stessa ×
               rossa tenue delle altre liste dell'app. -->
          <div class="orto-card-actions">
            <button class="orto-btn ${raccoltaOra ? "" : "orto-btn--ghost "}orto-btn--sm" type="button"
              data-orto-action="${raccoltaOra ? "register-harvest" : "edit-coltura"}"
              data-coltura-id="${escape(coltura.id)}">${
                raccoltaOra ? t("colture.register") : t("colture.edit")
              }</button>
            <button class="orto-remove-btn orto-card-remove" type="button"
              data-orto-action="remove-coltura" data-coltura-id="${escape(coltura.id)}"
              title="${escape(t("colture.remove"))}"
              aria-label="${escape(t("colture.remove_aria", { nome: plantName(plant) }))}"><span aria-hidden="true">×</span></button>
            <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
              data-orto-action="${raccoltaOra ? "edit-coltura" : "register-harvest"}"
              data-coltura-id="${escape(coltura.id)}">${
                raccoltaOra ? t("colture.edit") : t("colture.register")
              }</button>
          </div>
        </div>
      </article>`;
  }

  /* Gruppo 1: semi e piantine possedute e non ancora piantate. */
  function gruppoDaPiantareHtml(attive, numero, senzaTestata = false) {
    const daPiantare = attive.filter((voce) => residuo(voce) > 0);
    return `
      <section class="orto-group">
        ${
          senzaTestata
            ? ""
            : groupHead(numero, t("disp.title"), t("disp.sub"), attive.length)
        }
        ${
          attive.length
            ? `<div class="orto-toolbar">
                ${daPiantare.length ? `<button class="orto-btn orto-btn--sm orto-btn--plant-all" type="button"
                  data-orto-action="plant-all"><span aria-hidden="true">🌱</span>${t("disp.plant_all")}</button>` : ""}
                <button class="orto-btn orto-btn--sm" type="button"
                  data-orto-action="open-add-stock">${t("disp.add_manual")}</button>
                <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                  data-orto-action="import-orders">${t("disp.import")}</button>
                <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                  data-orto-action="clear-stock">${t("disp.clear")}</button>
              </div>`
            : ""
        }
        ${attive.length ? `<div class="orto-stock-filters" role="group" aria-label="${escape(t("disp.filters_aria"))}">
          ${[
            ["all", "disp.filter_all"],
            ["seme", "disp.filter_seed"],
            ["piantina", "disp.filter_seedling"],
            ["started", "disp.filter_started"],
          ]
            .map(
              ([value, key]) => `<button class="orto-stock-filter${stockFilter === value ? " is-active" : ""}" type="button"
                data-orto-action="set-stock-filter" data-filter="${value}" aria-pressed="${stockFilter === value}">${t(key)}</button>`,
            )
            .join("")}
        </div>` : ""}
        ${
          attive.length > VOCI_PER_RICERCA
            ? `<label class="orto-stock-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" id="ortoStockSearch" autocomplete="off"
                value="${escape(stockQuery)}"
                placeholder="${escape(t("disp.search_placeholder"))}"
                aria-label="${escape(t("disp.search_placeholder"))}" />
            </label>`
            : ""
        }
        <div id="ortoStockResults"></div>
      </section>`;
  }

  /* Raggruppa le voci per provenienza: un ordine per gruppo, più le manuali. */
  function raggruppaVoci(voci) {
    const perOrdine = new Map();
    const manuali = [];
    voci.forEach((voce) => {
      if (voce.orderId) {
        if (!perOrdine.has(voce.orderId)) perOrdine.set(voce.orderId, []);
        perOrdine.get(voce.orderId).push(voce);
      } else manuali.push(voce);
    });
    const perNome = (a, b) =>
      plantName(BYID[a.plantId]).localeCompare(plantName(BYID[b.plantId]));
    const gruppi = [...perOrdine.entries()]
      .map(([orderId, voci]) => ({
        tipo: "ordine",
        orderId,
        data: voci[0].dataAcquisto,
        voci: voci.sort(perNome),
      }))
      .sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    if (manuali.length)
      gruppi.push({ tipo: "manuale", voci: manuali.sort(perNome) });
    return gruppi;
  }

  function stockGroupHtml(gruppo) {
    const n = gruppo.voci.length;
    const conteggio =
      n === 1 ? t("disp.group_count_one") : t("disp.group_count", { n });
    const titolo =
      gruppo.tipo === "ordine"
        ? t("disp.group_order", { id: escape(gruppo.orderId) })
        : t("disp.group_manual");
    const meta =
      gruppo.tipo === "ordine" && gruppo.data
        ? `${fmtBreve(E.parseDate(gruppo.data))} · ${conteggio}`
        : conteggio;
    return `
      <section class="orto-stock-group">
        <header class="orto-stock-group-head">
          <span class="orto-stock-group-ico" aria-hidden="true">${
            gruppo.tipo === "ordine" ? "📦" : "✋"
          }</span>
          <div>
            <h3>${titolo}</h3>
            <p>${meta}</p>
          </div>
        </header>
        <div class="orto-stock-list">${gruppo.voci.map(voceCard).join("")}</div>
      </section>`;
  }

  // Rigenera il solo elenco filtrato, lasciando la barra di ricerca nel DOM.
  function renderStockResults() {
    const host = document.getElementById("ortoStockResults");
    if (!host) return;
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    );
    if (!attive.length) {
      host.innerHTML = `<div class="orto-empty"><span class="orto-empty-ico">📦</span>
        <h4>${t("disp.empty_title")}</h4><p>${t("disp.empty_text")}</p>
        <div class="orto-empty-actions">
          <button class="orto-btn" type="button"
            data-orto-action="import-orders">${t("disp.import")}</button>
          <button class="orto-btn orto-btn--ghost" type="button"
            data-orto-action="open-add-stock">${t("disp.add_manual")}</button>
        </div></div>`;
      return;
    }
    const query = stockQuery.trim().toLowerCase();
    const perFiltro = attive.filter((voce) => {
      if (stockFilter === "seme") return voce.variante !== "piantina";
      if (stockFilter === "piantina") return voce.variante === "piantina";
      if (stockFilter === "started")
        return Number(voce.qtaPiantata) > 0 || Number(voce.semine) > 0;
      return true;
    });
    const filtrate = query
      ? perFiltro.filter((v) =>
          plantName(BYID[v.plantId]).toLowerCase().includes(query),
        )
      : perFiltro;
    if (!filtrate.length) {
      host.innerHTML = `<div class="orto-empty"><span class="orto-empty-ico">⌕</span>
        <h4>${t("disp.search_empty_title")}</h4>
        <p>${t("disp.search_empty_text", { q: escape(stockQuery.trim()) })}</p></div>`;
      return;
    }
    if (stockFilter !== "all") {
      host.innerHTML = raggruppaVoci(filtrate).map(stockGroupHtml).join("");
      return;
    }
    const daPiantare = filtrate.filter((voce) => residuo(voce) > 0);
    const completate = filtrate.filter((voce) => residuo(voce) === 0);
    host.innerHTML = `${raggruppaVoci(daPiantare).map(stockGroupHtml).join("")}
      ${
        completate.length
          ? `<details class="orto-stock-completed">
              <summary><span aria-hidden="true">✓</span><span><b>${t("disp.completed_title")}</b><small>${t("disp.completed_sub", { n: completate.length })}</small></span><i aria-hidden="true">⌄</i></summary>
              <div class="orto-stock-completed-body">${raggruppaVoci(completate).map(stockGroupHtml).join("")}</div>
            </details>`
          : ""
      }`;
  }

  function voceCard(voce, index) {
    const plant = BYID[voce.plantId];
    const piantina = voce.variante === "piantina";
    const rimaste = residuo(voce);
    const esaurita = rimaste === 0;
    const giaPiantata =
      Number(voce.qtaPiantata) > 0 || Number(voce.semine) > 0;
    const unita = piantina
      ? t("disp.plugs", { n: voce.qta })
      : !voce.orderId
        ? t("disp.seed_manual", { n: voce.qta })
        : Number(voce.confezioni) === 1
        ? t("disp.seed_packs_one", { n: voce.qta })
        : t("disp.seed_packs", {
            packs: Number(voce.confezioni) || 1,
            n: voce.qta,
          });
    const stato =
      rimaste > 0
        ? t("disp.left", { n: rimaste, tot: voce.qta })
        : t("disp.all_planted");
    return `
      <article class="orto-stock${giaPiantata ? " is-planted" : ""}${
        esaurita ? " is-empty" : ""
      }"
        style="animation-delay:${Math.min(index, 8) * 40}ms">
        <span class="orto-stock-ico" aria-hidden="true">
          <img src="${photoSrc(plant.id)}" alt="" width="46" height="46" loading="lazy" />
        </span>
        <div class="orto-stock-body">
          <h3 class="orto-stock-name">
            ${escape(plantName(plant))}
            <span class="orto-chip orto-chip--${piantina ? "piantina" : "seme"}">${
              piantina ? t("colture.from_plant") : t("colture.from_seed")
            }</span>
          </h3>
          <!-- La riga forte usa sempre unità reali: semi o piantine. -->
          <p class="orto-stock-count">${stato}</p>
          <p class="orto-stock-meta">${unita}</p>
          ${
            giaPiantata
              ? `<button class="orto-stock-planted-link" type="button"
                  data-orto-action="go-piano">
                  <span class="orto-stock-planted-check" aria-hidden="true">✓</span>
                  <span>${t("disp.in_planted")}</span>
                  <span aria-hidden="true">→</span>
                </button>`
              : ""
          }
        </div>
        <div class="orto-stock-actions">
          <button class="orto-btn orto-btn--sm" type="button"
            data-orto-action="plant-from-stock" data-voce-id="${escape(voce.id)}"
            ${esaurita ? "disabled" : ""}>${
              esaurita
                ? t("disp.all_planted")
                : giaPiantata
                  ? t("disp.plant_again")
                  : t("disp.plant_now")
            }</button>
          <button class="orto-remove-btn orto-stock-archive" type="button"
            data-orto-action="archive-voce" data-voce-id="${escape(voce.id)}"
            title="${escape(t(esaurita ? "disp.archive_planted" : "disp.archive"))}"
            aria-label="${escape(t(esaurita ? "disp.archive_planted" : "disp.archive"))}"><span aria-hidden="true">×</span></button>
        </div>
      </article>`;
  }

  /* Il percorso superiore non è una navigazione: mostra sempre dove si trova
     l'utente nel flusso reale, dall'aggiunta alla cura quotidiana. */
  function syncJourney() {
    const host = document.getElementById("ortoJourney");
    const inAttesa = availableStock().length;
    const haColture = activeCrops().length > 0;
    const stage = haColture ? "care" : inAttesa ? "plant" : "stock";
    document.body.dataset.ortoStage = stage;
    if (!host) return;
    host.querySelectorAll("[data-orto-journey]").forEach((step) => {
      const key = step.dataset.ortoJourney;
      const done =
        (key === "stock" && (inAttesa || haColture)) ||
        (key === "plant" && haColture);
      step.classList.toggle("is-current", key === stage);
      step.classList.toggle("is-done", Boolean(done));
    });
    const hint = document.getElementById("ortoJourneyHint");
    if (!hint) return;
    hint.textContent =
      stage === "stock"
        ? lang === "ro"
          ? "Începe adăugând plantele tale"
          : "Inizia aggiungendo le tue piante"
        : stage === "plant"
          ? lang === "ro"
            ? `${inAttesa} plante gata de plantat`
            : `${inAttesa} piante pronte da piantare`
          : lang === "ro"
            ? "Grădina este activă: verifică activitățile de azi"
            : "Orto attivo: controlla le attività di oggi";
  }

  /* Numero e riga di stato sulle due linguette. */
  function aggiornaSommario() {
    const { diOggi, arretrati } = datiOggi();
    const attive = availableStock().length;
    const coltureAttive = activeCrops().length;
    [
      ["ortoTodayBadge", diOggi.length],
      ["ortoPianoBadge", coltureAttive],
      /* Il distintivo contava dispensa più colture mentre la riga sotto diceva
         solo «21 da piantare»: due numeri diversi per la stessa linguetta.
         Adesso contano la stessa cosa — quante voci ci sono in dispensa —
         perché le colture hanno il loro distintivo su «Piano». */
      ["ortoPianteBadge", attive],
    ].forEach(([id, n]) => {
      const badge = document.getElementById(id);
      if (!badge) return;
      badge.hidden = !n;
      badge.textContent = String(n);
    });
    /* Righe di stato: il badge conta le attività di oggi, la riga aggiunge l'arretrato. */
    [
      [
        "ortoOggiNote",
        arretrati.length
          ? t("tab.oggi_late", { n: arretrati.length })
          : diOggi.length
            ? t("tab.oggi_todo")
            : !coltureAttive
              ? attive
                ? t("tab.oggi_ready")
                : t("tab.oggi_start")
              : t("tab.oggi_clear"),
      ],
      [
        "ortoPianoNote",
        coltureAttive === 1
          ? t("tab.piano_note_one")
          : coltureAttive
            ? t("tab.piano_note", { n: coltureAttive })
            : t("tab.piano_empty"),
      ],
      [
        "ortoPianteNote",
        attive
          ? attive === 1
            ? t("tab.piante_stock_one")
            : t("tab.piante_stock", { n: attive })
          : coltureAttive
            ? t("tab.piante_note")
            : t("tab.piante_empty"),
      ],
    ].forEach(([id, testo]) => {
      const nodo = document.getElementById(id);
      if (nodo) nodo.textContent = testo;
    });
    document
      .getElementById("ortoOggiNote")
      ?.classList.toggle("is-late", arretrati.length > 0);
  }

  function render() {
    syncJourney();
    /* Le tre linguette restano sempre visibili: anche al primo accesso fanno
       capire subito dove si aggiunge, dove si controlla e dove si lavora. */
    const vergine =
      !activeCrops().length &&
      !harvestedCrops().length &&
      !inventory.voci.some((v) => !v.archiviata);
    const barra = document.getElementById("ortoViewbar");
    if (barra) barra.hidden = false;
    // Stato tablist: solo la linguetta attiva resta raggiungibile con Tab.
    const linguette = [...document.querySelectorAll(".orto-tab")];
    linguette.forEach((bottone) => {
      const attivo = bottone.dataset.ortoView === view;
      bottone.setAttribute("aria-selected", String(attivo));
      bottone.classList.toggle("is-active", attivo);
      bottone.tabIndex = attivo ? 0 : -1;
    });
    const attiva = linguette.find((b) => b.dataset.ortoView === view);
    if (attiva) app.setAttribute("aria-labelledby", attiva.id);
    aggiornaSommario();
    if (view === "piante") {
      if (vergine) renderBenvenuto();
      else {
        app.innerHTML = sezioneDaPiantareHtml();
        renderStockResults();
      }
    } else if (view === "piano") {
      app.innerHTML = sezionePiantateHtml();
    } else app.innerHTML = sezioneOggiHtml();
  }

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
    // Il pulsante profilo è aggiornato dalla navbar condivisa.
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
    applyAddDialogMode();
    render();
    document.documentElement.classList.remove("serra-i18n-pending");
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const next = normalizeLang(event.newValue);
    if (next !== lang) applyLanguage(next);
  });

  // Il disegno SVG contiene colori e luci propri: quando cambia il tema va
  // rigenerato, così notte e illuminazione si aggiornano senza ricaricare.
  window.addEventListener("serra:themechange", () => render());

  /* ============================================================ Azioni ============================================================ */
  let toastTimer;
  function toast(message, actionLabel = "", onAction = null) {
    if (!toastEl) return;
    toastEl.replaceChildren();
    const testo = document.createElement("span");
    testo.textContent = message;
    toastEl.appendChild(testo);
    if (actionLabel && typeof onAction === "function") {
      const bottone = document.createElement("button");
      bottone.type = "button";
      bottone.className = "orto-toast-action";
      bottone.textContent = actionLabel;
      bottone.addEventListener("click", () => {
        clearTimeout(toastTimer);
        onAction();
      });
      toastEl.appendChild(bottone);
    }
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => toastEl.classList.remove("is-on"),
      onAction ? 6000 : 2600,
    );
  }

  // Aggiunta manuale alla dispensa: riattiva o somma se la voce esiste già.
  function aggiungiAScorta(plantId, origine, quantita) {
    const variante = origine === "piantina" ? "piantina" : "seme";
    const id = `manuale|${plantId}|${variante}`;
    const qta = Math.max(1, Number(quantita) || 1);
    const esistente = inventory.voci.find((v) => v.id === id);
    if (esistente && !esistente.archiviata) {
      esistente.qta = (Number(esistente.qta) || 0) + qta;
    } else if (esistente) {
      esistente.archiviata = false;
      esistente.qta = qta;
      esistente.qtaPiantata = 0;
      esistente.semine = 0;
    } else {
      inventory.voci.push({
        id,
        plantId,
        variante,
        qta,
        quantitaUnita: variante === "piantina" ? "piantine" : "semi",
        qtaPiantata: 0,
        semine: 0,
        orderId: null,
        dataAcquisto: E.iso(new Date()),
        archiviata: false,
      });
    }
    saveInventory();
  }

  function aggiungiColtura(
    plantId,
    origine,
    dataInizio,
    quantita,
    posizione,
    sourceStockId = null,
  ) {
    const nuova = {
      id:
        "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      plantId,
      origine: origine === "piantina" ? "piantina" : "seme",
      dataInizio,
      quantita: Math.max(1, Number(quantita) || 1),
      posizione: posizione || "",
      sourceStockId,
      stato: "in_corso",
      eventi: [],
    };
    garden.colture.unshift(nuova);
    saveGarden();
    return nuova;
  }

  /* Prepara senza salvare una distribuzione equa: prima un esemplare per
     varietà, poi le quantità residue compatibili con lo spazio. */
  function preparaPianoPiantaTutto() {
    const candidates = inventory.voci
      .filter((voce) => !voce.archiviata && BYID[voce.plantId])
      .map((voce) => {
        const available = residuo(voce);
        const planned = voce.plannedQty
          ? Math.max(
              0,
              Number(voce.plannedQty) -
                (Number(voce.plannedPlanted) || 0),
            )
          : 0;
        return {
          voce,
          desired: Math.min(available, planned > 0 ? planned : available),
          crop: null,
          planted: 0,
        };
      })
      .filter((item) => item.desired > 0);
    const originalCrops = garden.colture;
    garden.colture = originalCrops.map((crop) => ({ ...crop }));
    try {
      candidates.forEach((item, index) => {
        if (
          greenhouseFitQuantity(item.voce.plantId, 1, item.voce.variante) < 1
        )
          return;
        item.crop = {
          id: `bulk-preview-${index}`,
          plantId: item.voce.plantId,
          origine: item.voce.variante,
          quantita: 1,
          dataInizio: E.iso(new Date()),
          stato: "in_corso",
        };
        garden.colture.push(item.crop);
        item.planted = 1;
      });
      candidates.forEach((item) => {
        if (!item.crop || item.desired <= 1) return;
        const extra = greenhouseFitQuantity(
          item.voce.plantId,
          item.desired - 1,
          item.voce.variante,
        );
        item.crop.quantita += extra;
        item.planted += extra;
      });
    } finally {
      garden.colture = originalCrops;
    }
    const planted = candidates.reduce((sum, item) => sum + item.planted, 0);
    const types = candidates.filter((item) => item.planted > 0).length;
    const left = inventory.voci
      .filter((voce) => !voce.archiviata)
      .reduce((sum, voce) => sum + residuo(voce), 0) - planted;
    return { candidates, planted, types, left: Math.max(0, left) };
  }

  function apriConfermaPiantaTutto() {
    const plan = preparaPianoPiantaTutto();
    if (!plan.planted) return toast(t("toast.no_greenhouse_space"));
    bulkPlantPlanPending = plan;
    const summary = document.getElementById("ortoBulkSummary");
    const left = document.getElementById("ortoBulkLeft");
    if (summary)
      summary.textContent = t("bulk.summary", {
        types: plan.types,
        n: plan.planted,
      });
    if (left)
      left.textContent = plan.left
        ? t("bulk.left", { n: plan.left })
        : t("bulk.all_fit");
    apriDialogo("ortoBulkPlantDialog");
  }

  function piantaTuttoDisponibile(plan = bulkPlantPlanPending) {
    bulkPlantPlanPending = null;
    if (!plan?.planted) return;
    const date = E.iso(new Date());
    plan.candidates.forEach((item) => {
      if (!item.planted) return;
      aggiungiColtura(
        item.voce.plantId,
        item.voce.variante,
        date,
        item.planted,
        "",
        item.voce.id,
      );
      item.voce.qtaPiantata =
        (Number(item.voce.qtaPiantata) || 0) + item.planted;
      if (item.voce.plannedQty)
        item.voce.plannedPlanted =
          (Number(item.voce.plannedPlanted) || 0) + item.planted;
      if (item.voce.variante === "seme")
        item.voce.semine = (Number(item.voce.semine) || 0) + 1;
    });
    saveGarden();
    saveInventory();
    render();
    toast(
      t(plan.left ? "toast.planted_all_left" : "toast.planted_all", {
        types: plan.types,
        n: plan.planted,
        left: plan.left,
      }),
    );
  }

  const RECENT_PLANTS_KEY = "serra.orto.recent-plants";
  const FAVORITE_PLANTS_KEY = "serra.orto.favorite-plants";
  let pickerQuery = "";
  let pickerFamily = "stagione";
  let piantaScelta = null;
  let dialogMode = "coltura"; // "coltura" pianta subito, "stock" aggiunge solo alla dispensa

  const diStagione = (plant, mese) => (plant.mesi || []).includes(mese);

  function plantIdsSalvati(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value.filter((id) => BYID[id]) : [];
    } catch (_) {
      return [];
    }
  }

  function salvaPlantIds(key, ids) {
    try {
      localStorage.setItem(key, JSON.stringify(ids.slice(0, 8)));
    } catch (_) {}
  }

  function ricordaPianta(id) {
    salvaPlantIds(RECENT_PLANTS_KEY, [
      id,
      ...plantIdsSalvati(RECENT_PLANTS_KEY).filter((value) => value !== id),
    ]);
  }

  function pianteFiltrate() {
    const mese = new Date().getMonth() + 1;
    const q = pickerQuery.trim().toLowerCase();
    let out = PLANTS.slice();
    if (pickerFamily === "stagione")
      out = out.filter((p) => diStagione(p, mese));
    else if (pickerFamily === "recenti") {
      const recenti = plantIdsSalvati(RECENT_PLANTS_KEY);
      out = out.filter((p) => recenti.includes(p.id));
    } else if (pickerFamily === "preferite") {
      const preferite = plantIdsSalvati(FAVORITE_PLANTS_KEY);
      out = out.filter((p) => preferite.includes(p.id));
    } else if (pickerFamily) out = out.filter((p) => p.tipo === pickerFamily);
    if (q) out = out.filter((p) => plantName(p).toLowerCase().includes(q));
    if (pickerFamily === "recenti" || pickerFamily === "preferite") {
      const order = plantIdsSalvati(
        pickerFamily === "recenti" ? RECENT_PLANTS_KEY : FAVORITE_PLANTS_KEY,
      );
      return out.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }
    return out.sort((a, b) => {
      const sa = diStagione(a, mese) ? 0 : 1;
      const sb = diStagione(b, mese) ? 0 : 1;
      return sa - sb || plantName(a).localeCompare(plantName(b), locale());
    });
  }

  // Elenca solo le famiglie con almeno una pianta disponibile.
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

    const recenti = plantIdsSalvati(RECENT_PLANTS_KEY);
    const preferite = plantIdsSalvati(FAVORITE_PLANTS_KEY);
    chips.innerHTML =
      (inStagione ? chip("stagione", t("dlg.family_season"), inStagione) : "") +
      (recenti.length
        ? chip("recenti", t("dlg.family_recent"), recenti.length)
        : "") +
      (preferite.length
        ? chip("preferite", t("dlg.family_favorites"), preferite.length)
        : "") +
      chip("", t("dlg.family_all"), PLANTS.length) +
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

  // Adatta il dialogo «Aggiungi» alla modalità: coltura oppure dispensa.
  function applyAddDialogMode() {
    const perDispensa = dialogMode === "stock";
    const titolo = document.getElementById("ortoAddTitle");
    if (titolo) titolo.textContent = t(perDispensa ? "dlg.title_stock" : "dlg.title");
    const sottotitolo = document.getElementById("ortoAddSub");
    if (sottotitolo) sottotitolo.textContent = t(perDispensa ? "dlg.sub_stock" : "dlg.sub");
    const stepLabel = document.getElementById("ortoStepWhenLabel");
    if (stepLabel) stepLabel.textContent = t(perDispensa ? "dlg.step_when_stock" : "dlg.step_when");
    const campoData = document.getElementById("ortoDateField");
    if (campoData) campoData.hidden = perDispensa;
    const campoPosizione = document.getElementById("ortoPositionField");
    if (campoPosizione) campoPosizione.hidden = perDispensa;
    const conferma = document.getElementById("ortoAddConfirm");
    if (conferma) conferma.textContent = t(perDispensa ? "dlg.confirm_stock" : "dlg.confirm");
  }

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
    const favorite = document.getElementById("ortoFavoritePlant");
    if (favorite) {
      const active = plantIdsSalvati(FAVORITE_PLANTS_KEY).includes(plant.id);
      favorite.classList.toggle("is-active", active);
      favorite.setAttribute("aria-pressed", String(active));
      const label = t(active ? "dlg.favorite_remove" : "dlg.favorite_add");
      favorite.setAttribute("aria-label", label);
      favorite.title = label;
      favorite.textContent = active ? "★" : "☆";
    }
    aggiornaAnteprima();
  }

  function aggiornaAnteprima() {
    const nodo = document.getElementById("ortoAddPreview");
    if (!nodo) return;
    const plant = piantaScelta ? BYID[piantaScelta] : null;
    if (!plant) return void (nodo.textContent = "");
    if (dialogMode === "stock")
      return void (nodo.textContent = t("dlg.preview_stock", {
        nome: plantName(plant),
      }));
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

  // Esportazione .ics delle attività future.
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

  /* Navigazione da tastiera fra le linguette: frecce, Home e Fine. */
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
    stockQuery = "";
    render();
    linguette[prossimo].focus();
  });

  document.addEventListener("keydown", (event) => {
    const bed = event.target.closest?.(
      '[data-orto-action="select-greenhouse-bed"]',
    );
    if (!bed || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    bed.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  /* Memorizza lo stato di apertura dei pannelli ripiegabili. */
  app?.addEventListener("toggle", (event) => {
    const box = event.target;
    if (!(box instanceof HTMLDetailsElement)) return;
    if (box.hasAttribute("data-orto-backlog")) arretratiAperti = box.open;
    else if (box.hasAttribute("data-orto-upcoming")) settimanaAperta = box.open;
    else if (box.hasAttribute("data-orto-done")) fatteAperte = box.open;
  }, true);

  /* ---------- apertura dei dialoghi ---------- */
  let scrollCongelato = 0;

  function apriDialogo(id) {
    const dialogo = document.getElementById(id);
    if (!dialogo) return null;
    if (!document.body.classList.contains("orto-dialog-open")) {
      scrollCongelato = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("orto-dialog-open");
    }
    if (typeof dialogo.showModal === "function") dialogo.showModal();
    else dialogo.setAttribute("open", "");
    return dialogo;
  }

  function sbloccaPagina() {
    // Lo scorrimento si sblocca solo quando nessun dialogo resta aperto.
    if (document.querySelector("dialog.orto-dialog[open]")) return;
    if (!document.body.classList.contains("orto-dialog-open")) return;
    document.body.classList.remove("orto-dialog-open");
    window.scrollTo(0, scrollCongelato);
  }

  /* Clic sullo sfondo scuro: chiude il dialogo, come in ogni pannello dell'app. */
  document.querySelectorAll("dialog.orto-dialog").forEach((dialogo) => {
    dialogo.addEventListener("click", (event) => {
      if (event.target === dialogo) dialogo.close("cancel");
    });
    // Sblocco alla chiusura, da qualunque via avvenga.
    dialogo.addEventListener("close", sbloccaPagina);
  });

  document.addEventListener("click", (event) => {
    const linguetta = event.target.closest("[data-orto-view]");
    if (linguetta) {
      event.preventDefault();
      // I rimandi nel contenuto riportano in cima; le linguette no.
      if (linguetta.classList.contains("orto-tab")) {
        view = linguetta.dataset.ortoView;
        stockQuery = "";
        render();
      } else vaiAllaVista(linguetta.dataset.ortoView);
      return;
    }
    const trigger = event.target.closest("[data-orto-action]");
    if (!trigger) return;
    const action = trigger.dataset.ortoAction;
    if (action === "set-language") {
      applyLanguage(trigger.dataset.lang);
      return;
    }

    if (action === "go-piante") return vaiAllaVista("piante");
    if (action === "go-piano") return vaiAllaVista("piano");
    if (action === "plant-all") return apriConfermaPiantaTutto();
    if (action === "set-stock-filter") {
      stockFilter = trigger.dataset.filter || "all";
      render();
      return;
    }
    if (action === "select-greenhouse-bed") {
      selectedGreenhouseBed = trigger.dataset.bedId || null;
      return render();
    }
    if (action === "set-greenhouse-layout") {
      const layout = computeGreenhouseLayout();
      const selected = layout.beds.find(
        (bed) => bed.id === trigger.dataset.bedId,
      );
      if (!selected) return;
      const requested = trigger.dataset.layout === "fila" ? "fila" : "blocco";
      ortoGreenhouse.beds[selected.stateId] = {
        ...(ortoGreenhouse.beds[selected.stateId] || {}),
        layout:
          requested === "fila" && greenhouseCanUseRow(selected.plant)
            ? "fila"
            : "blocco",
      };
      saveOrtoGreenhouse();
      return render();
    }

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
      const id = trigger.dataset.taskId;
      const attuale = tuttiITask().find((task) => task.id === id);
      const partenza = attuale ? dataEffettiva(attuale) : E.startOfToday();
      const base = partenza > E.startOfToday() ? partenza : E.startOfToday();
      garden.rinviati[id] = E.iso(E.addDays(base, 1));
      saveGarden();
      toast(t("toast.snoozed"));
      return render();
    }
    // Rimozione di una coltura: richiede conferma.
    if (action === "remove-coltura") {
      const coltura = garden.colture.find(
        (c) => c.id === trigger.dataset.colturaId,
      );
      if (!coltura) return;
      colturaDaRimuovere = coltura.id;
      const chi = document.getElementById("ortoRemoveWho");
      if (chi) chi.textContent = plantName(BYID[coltura.plantId]);
      apriDialogo("ortoRemoveDialog");
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
      apriDialogo("ortoHarvestDialog");
      return;
    }
    if (action === "import-orders") return importaDaOrdini();
    if (action === "clear-stock") return apriDialogo("ortoClearStockDialog");
    if (action === "clear-planted")
      return apriDialogo("ortoClearPlantedDialog");
    if (action === "restore-voce") {
      const voce = inventory.voci.find((v) => v.id === trigger.dataset.voceId);
      if (voce) {
        voce.archiviata = false;
        saveInventory();
        render();
        toast(t("toast.restored"));
      }
      return;
    }
    if (action === "archive-voce") {
      const voce = inventory.voci.find((v) => v.id === trigger.dataset.voceId);
      if (voce) {
        voce.archiviata = true;
        saveInventory();
        const voceId = voce.id;
        render();
        toast(t("toast.archived"), t("toast.undo"), () => {
          const archiviata = inventory.voci.find((v) => v.id === voceId);
          if (!archiviata) return;
          archiviata.archiviata = false;
          saveInventory();
          render();
          toast(t("toast.restored"));
        });
      }
      return;
    }
    // Messa a dimora parziale: il valore iniziale viene dall'acquisto, non da
    // una quantità suggerita uguale per tutte le piante.
    if (action === "plant-from-stock" && !trigger.disabled) {
      vocePendente = inventory.voci.find(
        (v) => v.id === trigger.dataset.voceId,
      );
      if (!vocePendente) return;
      const rimaste = residuo(vocePendente);
      const plannedRemaining = vocePendente.plannedQty
        ? Math.max(
            0,
            Number(vocePendente.plannedQty) -
              (Number(vocePendente.plannedPlanted) || 0),
          )
        : null;
      const fit = greenhouseFitQuantity(
        vocePendente.plantId,
        rimaste,
        vocePendente.variante,
      );
      if (fit < 1) {
        vocePendente = null;
        toast(t("toast.no_greenhouse_space"));
        return;
      }
      const suggested = Math.min(
        fit,
        plannedRemaining === null || plannedRemaining < 1
          ? rimaste
          : plannedRemaining,
      );
      const campo = document.getElementById("ortoPlantQty");
      const nota = document.getElementById("ortoPlantQtyHint");
      const titolo = document.getElementById("ortoPlantWho");
      if (titolo) titolo.textContent = plantName(BYID[vocePendente.plantId]);
      if (campo) {
        campo.value = String(suggested);
        campo.max = String(fit);
      }
      if (nota)
        nota.textContent = plannedRemaining
          ? t("plant.qty_hint_plan", {
              plan: Math.min(plannedRemaining, rimaste),
              fit,
            })
          : t("plant.qty_hint_fit", { available: rimaste, fit });
      const data = document.getElementById("ortoPlantDate");
      if (data) data.value = E.iso(new Date());
      apriDialogo("ortoPlantDialog");
      return;
    }
    // Chiusura esplicita: la ✕ dell'intestazione.
    if (action === "close-dialog") {
      document.getElementById(trigger.dataset.dialog)?.close("cancel");
      return;
    }
    if (action === "pick-family") {
      pickerFamily = trigger.dataset.family || "";
      renderPicker();
      return;
    }
    if (action === "pick-plant") {
      piantaScelta = trigger.dataset.plantId;
      ricordaPianta(piantaScelta);
      mostraSceltaPianta();
      // Il fuoco va sulla scelta dell'origine, non sul campo data.
      document.querySelector('input[name="ortoOrigine"]:checked')?.focus();
      return;
    }
    if (action === "toggle-favorite" && piantaScelta) {
      const ids = plantIdsSalvati(FAVORITE_PLANTS_KEY);
      const active = ids.includes(piantaScelta);
      salvaPlantIds(
        FAVORITE_PLANTS_KEY,
        active
          ? ids.filter((id) => id !== piantaScelta)
          : [piantaScelta, ...ids],
      );
      mostraSceltaPianta();
      renderPicker();
      return;
    }
    if (action === "clear-plant") {
      piantaScelta = null;
      mostraSceltaPianta();
      document.getElementById("ortoPlantSearch")?.focus();
      return;
    }
    if (action === "open-add" || action === "open-add-stock") {
      dialogMode = action === "open-add-stock" ? "stock" : "coltura";
      piantaScelta = null;
      pickerQuery = "";
      pickerFamily = PLANTS.some((p) =>
        diStagione(p, new Date().getMonth() + 1),
      )
        ? "stagione"
        : "";
      const ricerca = document.getElementById("ortoPlantSearch");
      if (ricerca) ricerca.value = "";
      renderPicker();
      mostraSceltaPianta();
      const dataInput = document.getElementById("ortoDate");
      if (dataInput) dataInput.value = E.iso(new Date());
      const quantita = document.getElementById("ortoQty");
      /* Per un inserimento manuale non esiste una quantità acquistata da cui
         partire: proponiamo una sola unità e lasciamo la scelta all'utente. */
      if (quantita) quantita.value = "1";
      const posizione = document.getElementById("ortoPosition");
      if (posizione) posizione.value = "";
      applyAddDialogMode();
      apriDialogo("ortoAddDialog");
      if (window.matchMedia("(min-width: 721px)").matches) ricerca?.focus();
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
      apriDialogo("ortoEditDialog");
      return;
    }
    if (action === "export-ics") return esportaIcs();
  });

  document.getElementById("ortoPlantSearch")?.addEventListener("input", (e) => {
    pickerQuery = e.target.value;
    renderPicker();
  });
  // Ricerca della dispensa, delegata sul contenitore della vista.
  app?.addEventListener("input", (e) => {
    if (e.target.id === "ortoStockSearch") {
      stockQuery = e.target.value;
      renderStockResults();
    }
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
        // Con method="dialog" la chiusura avviene senza preventDefault.
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
      const nome = plantName(BYID[plantId]);
      const modoScorta = dialogMode === "stock";
      if (modoScorta) {
        aggiungiAScorta(plantId, origine, document.getElementById("ortoQty").value);
      } else {
        const requested = Math.max(
          1,
          Number(document.getElementById("ortoQty").value) || 1,
        );
        const fit = greenhouseFitQuantity(plantId, requested, origine);
        if (fit < requested) {
          event.preventDefault();
          if (errore) {
            errore.textContent = t("dlg.fit_error", { n: fit });
            errore.hidden = false;
          }
          return;
        }
        aggiungiColtura(
          plantId,
          origine,
          document.getElementById("ortoDate").value || E.iso(new Date()),
          requested,
          document.getElementById("ortoPosition").value.trim(),
        );
      }
      piantaScelta = null;
      setTimeout(() => {
        // Apre la scheda in cui la voce è appena comparsa.
        vaiAllaVista("piante");
        toast(t(modoScorta ? "toast.added_stock" : "toast.added", { nome }));
      }, 0);
    });

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

  document
    .getElementById("ortoBulkPlantForm")
    ?.addEventListener("submit", (event) => {
      if (event.submitter?.value === "cancel") {
        bulkPlantPlanPending = null;
        return;
      }
      const plan = bulkPlantPlanPending;
      setTimeout(() => piantaTuttoDisponibile(plan), 0);
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
      reconcileInventoryWithGarden();
      setTimeout(() => {
        render();
        toast(t("toast.removed"));
      }, 0);
    });

  /* Le due file di caselle si comandano a vicenda: quella dell'ordine muove
     le sue piante, le piante ridisegnano lo stato dell'ordine. Il `click` sul
     riquadro della spunta non deve aprire o chiudere l'ordine: la casella e
     il pannello sono due comandi diversi nello stesso posto. */
  document.getElementById("ortoImportList")?.addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset.ortoImportAll) {
      const stato = el.checked;
      document
        .querySelectorAll(
          `[data-orto-import-of="${CSS.escape(el.dataset.ortoImportAll)}"]`,
        )
        .forEach((f) => (f.checked = stato));
    }
    sincronizzaImport();
  });
  document.getElementById("ortoImportList")?.addEventListener("click", (e) => {
    if (e.target.closest("[data-orto-stop]")) e.stopPropagation();
  });

  // Importa solo le piante spuntate e le voci non già presenti.
  document
    .getElementById("ortoImportForm")
    ?.addEventListener("submit", (event) => {
      const scelti = ordiniImportabili;
      ordiniImportabili = [];
      if (event.submitter && event.submitter.value === "cancel") return;
      // Adesso conta la spunta della singola pianta: quella dell'ordine è solo
      // il comando che le muove tutte insieme.
      const selezionati = new Set(
        [
          ...document.querySelectorAll('input[name="ortoImportItem"]:checked'),
        ].map((el) => el.value),
      );
      if (!selezionati.size)
        return setTimeout(() => toast(t("toast.no_orders_selected")), 0);
      const selectedOrderIds = new Set(
        [...selezionati].map((value) => value.split("|")[0]),
      );
      let aggiunte = 0;
      scelti
        .forEach((ordine) => {
          ordine.nuovi.forEach((item) => {
            const variante = item.variante === "piantina" ? "piantina" : "seme";
            const id = `${ordine.id}|${item.id}|${variante}`;
            if (!selezionati.has(id)) return;
            // Riattiva una voce archiviata invece di duplicarla.
            const esistente = inventory.voci.find((v) => v.id === id);
            const quantitaReale = orderItemQuantity(item);
            const confezioni = Math.max(1, Number(item.bustine) || 1);
            const plannedQty = Math.max(
              0,
              Number(
                ordine.greenhousePlan?.beds?.find(
                  (bed) => bed.plantId === item.id,
                )?.count,
              ) || 0,
            );
            if (esistente) {
              esistente.archiviata = false;
              esistente.qta = quantitaReale;
              esistente.confezioni = confezioni;
              esistente.quantitaUnita =
                variante === "piantina" ? "piantine" : "semi";
              esistente.plannedQty = plannedQty || null;
              esistente.plannedPlanted =
                Number(esistente.plannedPlanted) || 0;
            } else
              inventory.voci.push({
                id,
                plantId: item.id,
                variante,
                qta: quantitaReale,
                confezioni,
                quantitaUnita:
                  variante === "piantina" ? "piantine" : "semi",
                plannedQty: plannedQty || null,
                plannedPlanted: 0,
                qtaPiantata: 0,
                semine: 0,
                orderId: ordine.id,
                dataAcquisto: ordine.data,
                archiviata: false,
              });
            aggiunte++;
          });
        });
      const plan = scelti
        .filter(
          (order) => selectedOrderIds.has(order.id) && order.greenhousePlan,
        )
        .map((order) => order.greenhousePlan)
        .sort(
          (a, b) =>
            Number(b.width) * Number(b.length) -
            Number(a.width) * Number(a.length),
        )[0];
      applyOrtoGreenhousePlan(plan);
      saveInventory();
      setTimeout(() => {
        /* Dopo l'importazione si andava su «Oggi», che a orto vuoto diceva
           «non c'è niente da fare»: si finiva su una pagina vuota subito dopo
           aver fatto la cosa più impegnativa del percorso. Il passo successivo
           è scegliere cosa piantare, quindi si va lì. */
        vaiAllaVista("piante");
        toast(t("toast.imported_orders", { n: aggiunte }));
      }, 0);
    });

  // Svuotamento: archivia tutte le voci attive della dispensa.
  document
    .getElementById("ortoClearStockForm")
    ?.addEventListener("submit", (event) => {
      if (event.submitter && event.submitter.value === "cancel") return;
      const attive = inventory.voci.filter(
        (v) => !v.archiviata && BYID[v.plantId],
      );
      attive.forEach((v) => (v.archiviata = true));
      saveInventory();
      setTimeout(() => {
        render();
        toast(t("toast.stock_cleared"));
      }, 0);
    });

  // Eliminazione collettiva: rimuove solo le colture ancora attive. I raccolti
  // conclusi restano nello storico e le quantità tornano disponibili in dispensa.
  document
    .getElementById("ortoClearPlantedForm")
    ?.addEventListener("submit", (event) => {
      if (event.submitter && event.submitter.value === "cancel") return;
      const ids = new Set(activeCrops().map((crop) => crop.id));
      garden.colture = garden.colture.filter((crop) => !ids.has(crop.id));
      [garden.fatti, garden.rinviati].forEach((mappa) => {
        Object.keys(mappa).forEach((chiave) => {
          for (const id of ids) {
            if (chiave.startsWith(id + "|")) {
              delete mappa[chiave];
              break;
            }
          }
        });
      });
      saveGarden();
      reconcileInventoryWithGarden();
      setTimeout(() => {
        render();
        toast(t("toast.planted_cleared"));
      }, 0);
    });

  [
    ["ortoAddDialog", () => (piantaScelta = null)],
    ["ortoPlantDialog", () => (vocePendente = null)],
    ["ortoEditDialog", () => (colturaInModifica = null)],
    ["ortoHarvestDialog", () => (colturaDaRaccogliere = null)],
    ["ortoRemoveDialog", () => (colturaDaRimuovere = null)],
    ["ortoImportDialog", () => (ordiniImportabili = [])],
  ].forEach(([id, reset]) => {
    const dialogo = document.getElementById(id);
    if (!dialogo || !reset) return;
    dialogo.addEventListener("close", () => {
      if (dialogo.returnValue !== "ok") reset();
    });
  });

  /* Salvataggio della modifica. */
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
      const fit = greenhouseFitQuantity(
        voce.plantId,
        rimaste,
        voce.variante,
      );
      const quante = Math.min(richieste, rimaste, fit);
      if (quante < 1) {
        setTimeout(() => toast(t("toast.no_greenhouse_space")), 0);
        return;
      }
      aggiungiColtura(
        voce.plantId,
        voce.variante,
        document.getElementById("ortoPlantDate").value || E.iso(new Date()),
        quante,
        document.getElementById("ortoPlantPosition").value.trim(),
        voce.id,
      );
      voce.qtaPiantata = (voce.qtaPiantata || 0) + quante;
      if (voce.plannedQty)
        voce.plannedPlanted =
          (Number(voce.plannedPlanted) || 0) + quante;
      if (voce.variante === "seme") voce.semine = (voce.semine || 0) + 1;
      saveInventory();
      const nome = plantName(BYID[voce.plantId]);
      setTimeout(() => {
        view = "piante";
        render();
        toast(t("toast.planted", { n: quante, nome }));
      }, 0);
    });

  /* Le misure sono dentro una vista ridisegnata dinamicamente, quindi il
     salvataggio usa un listener delegato e non dipende dal primo rendering. */
  document.addEventListener("submit", (event) => {
    if (event.target.id !== "ortoGreenhouseForm") return;
    event.preventDefault();
    const data = new FormData(event.target);
    ortoGreenhouse.width = Math.min(
      20,
      Math.max(1.5, Number(data.get("width")) || 3),
    );
    ortoGreenhouse.length = Math.min(
      40,
      Math.max(2, Number(data.get("length")) || 6),
    );
    ortoGreenhouse.path = Math.min(
      120,
      Math.max(30, Number(data.get("path")) || 50),
    );
    ortoGreenhouse.configured = true;
    /* Con misure diverse ricalcoliamo le colonne, senza toccare le colture e
       senza consultare il salvataggio del configuratore. */
    Object.values(ortoGreenhouse.beds || {}).forEach((bed) => {
      delete bed.col;
    });
    selectedGreenhouseBed = null;
    saveOrtoGreenhouse();
    render();
    toast(t("greenhouse.saved"));
  });

  document
    .getElementById("ortoLangSelect")
    ?.addEventListener("change", (event) => applyLanguage(event.target.value));

  /* ============================================================ Avvio ============================================================ */
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
    migrateLegacyGardenQuantities();
    reconcileInventoryWithGarden();
    loadOrtoGreenhouse();
    await initializeGreenhouseFromImportedOrder();
    updateCartBadge();
    /* Prima che l'orto parta si atterra su «Da piantare»; dopo, «Oggi» resta
       la vista quotidiana predefinita. */
    if (!activeCrops().length) view = "piante";
    // Un ingresso diretto su #da-piantare (dal pannello utente) apre la dispensa.
    if (location.hash === "#da-piantare") view = "piante";
    applyLanguage(localStorage.getItem("ois.lang"));

    // Duplica gli ortaggi del piè di pagina per rendere continua la striscia.
    const footerRow = document.getElementById("footerPlantRow");
    if (footerRow) {
      const html = footerRow.innerHTML;
      footerRow.innerHTML = html + html + html + html;
    }
  }

  boot();
})();
