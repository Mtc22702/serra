/* "Il mio orto": diario colturale, attività del giorno e dispensa di ciò che l'utente ha acquistato e non ha ancora messo a dimora. */
(() => {
  const E = window.SerraCareEngine;
  if (!E) return;

  const GARDEN_KEY = "serra.garden.v1";
  // Dispensa: ciò che è stato acquistato e non ancora piantato.
  const INVENTORY_KEY = "serra.inventory.v1";
  // Striscia «come funziona»: si chiude una volta e non torna più.
  const HOWTO_KEY = "serra.orto.howto";

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
      "page.lead":
        "Registra cosa hai piantato e ti diciamo cosa fare, settimana per settimana, fino alla raccolta. Funziona anche con piante comprate altrove.",
      "tab.oggi": "Oggi",
      "tab.oggi_todo": "da fare adesso",
      // Il badge conta le attività di oggi: questa riga aggiunge l'arretrato, non lo sostituisce.
      "tab.oggi_late": "+{n} arretrate",
      "tab.oggi_clear": "tutto a posto",
      // Le due righe di stato dicono la differenza fra le due sezioni: una elenca ciò che è già in terra, l'altra ciò che non lo è ancora.
      "tab.colture_note": "già in terra",
      "tab.colture_empty": "ancora niente",
      "tab.dispensa_note": "non ancora in terra",
      "tab.dispensa_empty": "dispensa vuota",
      "tab.colture": "Piantate",
      "tab.dispensa": "Da piantare",

      "welcome.kicker": "Primo avvio",
      "welcome.title": "Comincia da quello che hai",
      "welcome.text":
        "Dimmi quali semi o piantine possiedi: appena li pianti, penso io a ricordarti cosa fare, giorno per giorno, fino alla raccolta.",
      "welcome.add": "＋ Aggiungi a mano",
      "welcome.or": "oppure importa da",
      "welcome.orders": "Importa dai miei ordini",
      "welcome.nothing": "Non hai ancora semi o piantine?",
      "welcome.shop_seeds": "Catalogo semi",
      "welcome.shop_plugs": "Vivaio piantine",
      // Sezione 1: la giornata. Un solo numero nel titolo, il resto ripiegato.
      "jump.aria": "Vai a una sezione della pagina",
      "sec.step1": "Passo 1 · quello che possiedi",
      "sec.step2": "Passo 2 · quello che è in terra",
      "oggi.one": "Oggi hai una cosa da fare",
      "oggi.many": "Oggi hai {n} cose da fare",
      "oggi.nothing": "Oggi non c'è niente da fare",
      "oggi.all_done": "Fatto tutto per oggi",
      "oggi.progress": "{n} di {tot} già spuntate.",
      "backlog.title_one": "1 attività arretrata",
      "backlog.title": "{n} attività arretrate",
      "backlog.sub": "Restano da giorni scorsi. Nessun dramma, si recuperano.",
      "backlog.show": "Mostra",
      "backlog.hide": "Nascondi",
      "done.title_one": "1 fatta oggi",
      "done.title": "{n} fatte oggi",
      "week.title": "Prossimi giorni",
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

      "colture.title": "Piantate",
      "colture.sub":
        "Le piante già piantate. Ognuna genera da sola il proprio calendario di cura fino alla raccolta.",
      "colture.crosslink": "Hai {n} voci comprate e non ancora piantate.",
      "colture.crosslink_cta": "Vai a «Da piantare»",
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
        "Qui compaiono le piante che stai seguendo. Vai su «Da piantare», aggiungi ciò che hai e piantalo: comparirà qui da solo.",

      "disp.title": "Da piantare",
      "disp.sub":
        "Il magazzino: semi e piantine che possiedi e non sono ancora in terra. Qui non c'è nessun calendario, solo quanto ti resta.",
      "disp.crosslink": "Appena pianti qualcosa, compare fra le colture con il suo calendario.",
      "disp.crosslink_cta": "Vai a «Piantate»",
      "disp.import": "Importa dai miei ordini",
      "disp.add_manual": "＋ Aggiungi a mano",
      "disp.clear": "Svuota lista",
      "disp.empty_title": "Non hai nulla in attesa",
      "disp.empty_text":
        "Quando confermi un ordine, semi e piantine compaiono qui pronti da piantare. Puoi anche aggiungerli a mano.",
      "disp.plant_now": "Pianta",
      "disp.archive": "Segna come finita",
      "disp.left": "{n} di {tot} ancora da piantare",
      "disp.all_planted": "Tutte piantate",
      "disp.packet": "Bustina · {n} semi",
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

      "import.title": "Scegli l'ordine da importare",
      "import.sub":
        "Seleziona gli ordini da aggiungere alla dispensa. Quelli già presenti non si duplicano.",
      "import.order": "Ordine {id}",
      "import.items_one": "1 articolo",
      "import.items": "{n} articoli",
      "import.confirm": "Importa",
      "clear.title": "Svuotare «Da piantare»?",
      "clear.sub":
        "Le voci spariscono da questo elenco. Restano nei tuoi ordini e puoi reimportarle quando vuoi.",
      "clear.confirm": "Svuota",

      "plant.title": "Pianta ora",
      "plant.sub": "Scegli quante piante avviare e quando.",
      "plant.qty": "Quante ne pianti ora",
      "plant.qty_hint_seed": "Quante piante avvii da questa bustina",
      "plant.qty_hint_plug": "Ne hai {n} disponibili",
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
      // La riga finale cambia con quello che c'è nell'orto: a chi non ha nulla dice come partire, agli altri dove guardare per primo.
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
      "page.lead":
        "Notează ce ai plantat și îți spunem ce ai de făcut, săptămână de săptămână, până la recoltare. Funcționează și cu plante cumpărate în altă parte.",
      "tab.oggi": "Astăzi",
      "tab.oggi_todo": "de făcut acum",
      "tab.oggi_late": "+{n} întârziate",
      "tab.oggi_clear": "totul în regulă",
      "tab.colture_note": "deja plantate",
      "tab.colture_empty": "încă nimic",
      "tab.dispensa_note": "încă neplantate",
      "tab.dispensa_empty": "cămară goală",
      "tab.colture": "Plantate",
      "tab.dispensa": "De plantat",

      "welcome.kicker": "Prima pornire",
      "welcome.title": "Începe de la ce ai deja",
      "welcome.text":
        "Spune-mi ce semințe sau răsaduri ai: imediat ce le plantezi, îți amintesc eu ce ai de făcut, zi de zi, până la recoltare.",
      "welcome.add": "＋ Adaugă manual",
      "welcome.or": "sau importă din",
      "welcome.orders": "Importă din comenzile mele",
      "welcome.nothing": "Încă nu ai semințe sau răsaduri?",
      "welcome.shop_seeds": "Catalog semințe",
      "welcome.shop_plugs": "Pepinieră răsaduri",
      "jump.aria": "Mergi la o secțiune a paginii",
      "sec.step1": "Pasul 1 · ce ai deja",
      "sec.step2": "Pasul 2 · ce e în pământ",
      "oggi.one": "Azi ai un lucru de făcut",
      "oggi.many": "Azi ai {n} lucruri de făcut",
      "oggi.nothing": "Azi nu e nimic de făcut",
      "oggi.all_done": "Gata tot pentru azi",
      "oggi.progress": "{n} din {tot} deja bifate.",
      "backlog.title_one": "1 activitate întârziată",
      "backlog.title": "{n} activități întârziate",
      "backlog.sub": "Rămase din zilele trecute. Nicio problemă, se recuperează.",
      "backlog.show": "Arată",
      "backlog.hide": "Ascunde",
      "done.title_one": "1 făcută azi",
      "done.title": "{n} făcute azi",
      "week.title": "Zilele următoare",
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
      // Etichetta di una barra a quattro colonne strette: «La locul definitiv» ci andava a capo tre volte.
      "fase.dimora": "Plantat",
      "fase.attecchimento": "Prindere",
      "fase.sviluppo": "Dezvoltare",
      "fase.impianto": "Plantare",
      "fase.perenne": "Perenă",

      "colture.title": "Plantate",
      "colture.sub":
        "Plantele deja puse în pământ. Fiecare își generează singură calendarul de îngrijire până la recoltare.",
      "colture.crosslink": "Ai {n} poziții cumpărate și încă neplantate.",
      "colture.crosslink_cta": "Mergi la „De plantat”",
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
        "Aici apar plantele pe care le urmărești. Mergi la „De plantat”, adaugă ce ai și plantează-l: va apărea aici automat.",

      "disp.title": "De plantat",
      "disp.sub":
        "Depozitul: semințe și răsaduri pe care le ai și care nu sunt încă în pământ. Aici nu există niciun calendar, doar cât ți-a rămas.",
      "disp.crosslink": "Imediat ce plantezi ceva, apare printre culturi cu propriul calendar.",
      "disp.crosslink_cta": "Mergi la „Plantate”",
      "disp.import": "Importă din comenzile mele",
      "disp.add_manual": "＋ Adaugă manual",
      "disp.clear": "Golește lista",
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
      "disp.group_order": "Comanda {id}",
      "disp.group_manual": "Adăugate manual",
      "disp.group_count_one": "1 articol",
      "disp.group_count": "{n} articole",
      "disp.search_placeholder": "Caută după nume…",
      "disp.search_empty_title": "Niciun rezultat",
      "disp.search_empty_text": "Nicio plantă nu corespunde pentru „{q}”.",
      "disp.login_hint":
        "Autentifică-te în Zona Personală pentru a importa achizițiile.",

      "import.title": "Alege comanda de importat",
      "import.sub":
        "Selectează comenzile de adăugat în cămară. Cele deja prezente nu se duplică.",
      "import.order": "Comanda {id}",
      "import.items_one": "1 articol",
      "import.items": "{n} articole",
      "import.confirm": "Importă",
      "clear.title": "Golești «De plantat»?",
      "clear.sub":
        "Articolele dispar din această listă. Rămân în comenzile tale și le poți reimporta oricând.",
      "clear.confirm": "Golește",

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
      "dlg.family_recent": "Recente",
      "dlg.family_favorites": "Favorite",
      "dlg.family_aria": "Filtrează după familie",
      "dlg.plant_list_aria": "Plante disponibile",
      "dlg.in_season": "de sezon",
      "dlg.favorite_add": "Adaugă la favorite",
      "dlg.favorite_remove": "Elimină din favorite",
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
      "toast.archived": "Arhivată",
      "toast.planted": "{n} × {nome} în grădina ta",
      "harvest.title": "Înregistrează recolta",
      "harvest.sub": "Va deveni estimarea pentru anul viitor.",
      "harvest.kg": "Câte kg ai recoltat?",
      "harvest.confirm": "Înregistrează",
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
  /* I pannelli ripiegabili si ridisegnano a ogni azione: senza memoria si
     richiuderebbero sotto le dita di chi ha appena spuntato un'attività. */
  let arretratiAperti = false;
  let settimanaAperta = false;
  let fatteAperte = false;
  let PLANTS = [];
  let PRODUCTS = {};
  const BYID = {};
  let garden = { colture: [], fatti: {}, rinviati: {} };
  let inventory = { voci: [] };
  let vocePendente = null; // voce della dispensa in corso di messa a dimora
  let stockQuery = ""; // filtro di ricerca nella vista "Da piantare"
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

  let ordiniImportabili = []; // ordini in attesa di conferma nel dialogo di importazione

  // Legge gli ordini dell'utente e apre il dialogo di scelta: importare tutto alla cieca
  // riportava dentro anche acquisti vecchi già gestiti nella dispensa.
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
        nuovi: (ordine.items || []).filter((item) => {
          if (!BYID[item.id]) return false;
          const variante = item.variante === "piantina" ? "piantina" : "seme";
          const id = `${ordine.id}|${item.id}|${variante}`;
          // Una voce svuotata resta archiviata in memoria ma non è più "già in dispensa":
          // deve poter tornare importabile, com'è promesso nel dialogo di svuotamento.
          return !inventory.voci.some((v) => v.id === id && !v.archiviata);
        }),
      }))
      .filter((o) => o.nuovi.length)
      .sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    if (!ordiniImportabili.length) return toast(t("toast.no_orders"));
    renderImportList();
    apriDialogo("ortoImportDialog");
  }

  function renderImportList() {
    const host = document.getElementById("ortoImportList");
    if (!host) return;
    host.innerHTML = ordiniImportabili
      .map((ordine, i) => {
        const n = ordine.nuovi.length;
        const conteggio =
          n === 1 ? t("import.items_one") : t("import.items", { n });
        const data = ordine.data
          ? fmtBreve(E.parseDate(ordine.data))
          : "—";
        return `
          <label class="orto-import-row">
            <input type="checkbox" name="ortoImportOrder" value="${escape(ordine.id)}" ${i === 0 ? "checked" : ""} />
            <span class="orto-import-body">
              <b>${t("import.order", { id: escape(ordine.id) })}</b>
              <small>${data} · ${conteggio}</small>
            </span>
          </label>`;
      })
      .join("");
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

  const GIORNI_AVANTI = 7;

  const isoOggi = () => E.iso(E.startOfToday());

  /* I prossimi giorni, raggruppati per data: serve a dare un orizzonte
     senza trasformare la pagina in un calendario da leggere ogni mattina. */
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
    // La compressione va fatta dentro il giorno: fra giorni diversi le
    // ricorrenti sono occorrenze distinte e vanno mostrate entrambe.
    return [...perGiorno.entries()]
      .map(([iso, tasks]) => [iso, E.comprimiRicorrenti(tasks)])
      .sort((a, b) => a[0].localeCompare(b[0]));
  }

  /* ============================================================ Viste ============================================================ */

  /* Lo scorrimento si ferma sotto la navbar fissa, che altrimenti coprirebbe
     il titolo della sezione appena raggiunta. */
  function vaiAllaSezione(sezione) {
    if (!sezione) return;
    const navbar =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        10,
      ) || 62;
    const y =
      sezione.getBoundingClientRect().top + window.scrollY - navbar - 16;
    const dolce = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, y), behavior: dolce ? "smooth" : "auto" });
  }

  // Primo avvio: senza colture né dispensa la vista "Oggi" direbbe che va tutto bene quando in realtà non c'è nulla.
  function renderBenvenuto() {
    app.innerHTML = `
      <section class="orto-welcome">
        <span class="orto-welcome-ico" aria-hidden="true">🌱</span>
        <p class="orto-welcome-kicker">${t("welcome.kicker")}</p>
        <h2>${t("welcome.title")}</h2>
        <p class="orto-welcome-text">${t("welcome.text")}</p>
        <div class="orto-welcome-actions">
          <button class="orto-btn orto-welcome-primary" type="button" data-orto-action="open-add-stock">${t("welcome.add")}</button>
          <p class="orto-welcome-or">${t("welcome.or")}</p>
          <div class="orto-welcome-secondary">
            <button class="orto-btn orto-btn--ghost" type="button"
              data-orto-action="import-orders">${t("welcome.orders")}</button>
          </div>
        </div>
        <p class="orto-welcome-shop">
          <span>${t("welcome.nothing")}</span>
          <a href="index.html#stagione">${t("welcome.shop_seeds")}</a>
          <span aria-hidden="true">·</span>
          <a href="vivaio.html">${t("welcome.shop_plugs")}</a>
        </p>
      </section>`;
  }

  /* L'arretrato resta ripiegato: è la cosa che scoraggia di più a colpo
     d'occhio, e non è mai ciò che si è venuti a fare stamattina. */
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

  /* I prossimi giorni: ripiegati, perché la domanda di stamattina è
     «cosa faccio oggi», non «cosa mi aspetta giovedì». */
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
            <b>${t("week.title")}</b>
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

  /* Prima sezione della pagina: risponde alla sola domanda «cosa faccio
     adesso». Un numero solo nel titolo; arretrato e prossimi giorni stanno
     ripiegati intorno, così non competono con la risposta. */
  function sezioneOggiHtml() {
    const { oggi, arretrati, diOggi, fatti } = datiOggi();
    const totale = diOggi.length + fatti.length;
    const titolo =
      diOggi.length === 0
        ? fatti.length
          ? t("oggi.all_done")
          : t("oggi.nothing")
        : diOggi.length === 1
          ? t("oggi.one")
          : t("oggi.many", { n: diOggi.length });
    return `
      <section class="orto-sec" id="ortoSecOggi" aria-labelledby="ortoSecOggiT">
        <div class="orto-sec-head">
          <p class="orto-sec-kicker">${escape(
            oggi.toLocaleDateString(locale(), {
              weekday: "long",
              day: "numeric",
              month: "long",
            }),
          )}</p>
          <h2 id="ortoSecOggiT">${titolo}</h2>
          ${
            fatti.length
              ? `<p class="orto-sec-sub">${t("oggi.progress", {
                  n: fatti.length,
                  tot: totale,
                })}</p>`
              : ""
          }
        </div>
        ${arretrati.length ? arretratoHtml(arretrati) : ""}
        ${
          diOggi.length
            ? `<div class="orto-tasklist">${diOggi
                .map((task, i) => taskRow(task, i))
                .join("")}</div>`
            : `<div class="orto-empty"><span class="orto-empty-ico">🌤️</span>
                <h4>${t("today.empty_title")}</h4><p>${t("today.empty_text")}</p></div>`
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

  function sezionePianteHtml() {
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

    const inAttesa = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    ).length;

    const vuoto = garden.colture.length === 0;

    return `
      <section class="orto-sec" id="ortoSecPiante" aria-labelledby="ortoSecPianteT">
        <div class="orto-sec-head">
          <p class="orto-sec-kicker"><span aria-hidden="true">🌿</span> ${t("sec.step2")}</p>
          <h2 id="ortoSecPianteT">${t("colture.title")}</h2>
          <p class="orto-sec-sub">${t("colture.sub")}</p>
        </div>
        ${
          vuoto
            ? ""
            : `<div class="orto-stats">
          <div class="orto-stat"><span class="orto-stat-ico">🌿</span><span><b>${garden.colture.length}</b><small>${t("colture.stat_active")}</small></span></div>
          <div class="orto-stat"><span class="orto-stat-ico">🪴</span><span><b>${riepilogo.piante}</b><small>${t("colture.stat_plants")}</small></span></div>
          <div class="orto-stat"><span class="orto-stat-ico">🧺</span><span><b>${riepilogo.vicine}</b><small>${t("colture.stat_soon")}</small></span></div>
        </div>
        <div class="orto-toolbar">
          <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button" data-orto-action="export-ics">${t("colture.ics")}</button>
        </div>`
        }
        ${
          inAttesa
            ? `<p class="orto-crosslink">
              <span class="orto-crosslink-ico" aria-hidden="true">📦</span>
              <span>${t("colture.crosslink", { n: inAttesa })}</span>
              <a class="orto-link" href="#ortoSecDispensa" data-orto-jump="ortoSecDispensa">${
                t("colture.crosslink_cta") + " ↓"
              }</a>
            </p>`
            : ""
        }
        <div class="orto-grid">${
          garden.colture.length
            ? garden.colture.map(colturaCard).join("")
            : `<div class="orto-empty orto-empty--wide"><span class="orto-empty-ico">🌱</span>
              <h4>${t("colture.empty_title")}</h4><p>${t("colture.empty_text")}</p>
              <div class="orto-empty-actions">
                <a class="orto-btn" href="#ortoSecDispensa"
                  data-orto-jump="ortoSecDispensa">${t("colture.crosslink_cta")} ↓</a>
              </div></div>`
        }</div>
      </section>`;
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
    // Raccolta in corso o entro una settimana: è il momento in cui l'azione principale della scheda cambia.
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

  /* La dispensa non è un secondo elenco di colture: è il magazzino di ciò che si possiede e non è ancora in terra. */
  function sezioneDispensaHtml() {
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    );
    return `
      <section class="orto-sec" id="ortoSecDispensa" aria-labelledby="ortoSecDispensaT">
        <div class="orto-sec-head">
          <p class="orto-sec-kicker"><span aria-hidden="true">📦</span> ${t("sec.step1")}</p>
          <h2 id="ortoSecDispensaT">${t("disp.title")}</h2>
          <p class="orto-sec-sub">${t("disp.sub")}</p>
        </div>
        ${
          attive.length
            ? `<div class="orto-toolbar">
                <button class="orto-btn orto-btn--sm" type="button"
                  data-orto-action="open-add-stock">${t("disp.add_manual")}</button>
                <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                  data-orto-action="import-orders">${t("disp.import")}</button>
                <button class="orto-btn orto-btn--ghost orto-btn--sm" type="button"
                  data-orto-action="clear-stock">${t("disp.clear")}</button>
              </div>
              <p class="orto-crosslink">
                <span class="orto-crosslink-ico" aria-hidden="true">🌱</span>
                <span>${t("disp.crosslink")}</span>
                <a class="orto-link" href="#ortoSecPiante" data-orto-jump="ortoSecPiante">${
                  t("disp.crosslink_cta") + " ↑"
                }</a>
              </p>`
            : ""
        }
        ${
          attive.length > 6
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

  /* Raggruppa la dispensa per provenienza: un ordine può portare decine di voci
     tutte insieme, e ripetere "Ordine XY" su ognuna nasconde il fatto che sono
     arrivate in blocco. L'intestazione del gruppo lo dice una volta sola. */
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

  // Rigenera solo l'elenco filtrato: la barra di ricerca resta nel DOM e non perde il fuoco a ogni battitura.
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
    const filtrate = query
      ? attive.filter((v) =>
          plantName(BYID[v.plantId]).toLowerCase().includes(query),
        )
      : attive;
    if (!filtrate.length) {
      host.innerHTML = `<div class="orto-empty"><span class="orto-empty-ico">⌕</span>
        <h4>${t("disp.search_empty_title")}</h4>
        <p>${t("disp.search_empty_text", { q: escape(stockQuery.trim()) })}</p></div>`;
      return;
    }
    host.innerHTML = raggruppaVoci(filtrate).map(stockGroupHtml).join("");
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
          <p class="orto-stock-meta">${unita}</p>
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

  /* La striscia dei tre passi: è una didascalia, non un comando. */
  function syncHowto() {
    const box = document.getElementById("ortoHowto");
    if (!box) return;
    let chiusa = false;
    try {
      chiusa = localStorage.getItem(HOWTO_KEY) === "off";
    } catch (_) {}
    box.hidden = chiusa;
    if (chiusa) return;
    if (!box.dataset.responsiveReady) {
      box.open = false;
      box.dataset.responsiveReady = "true";
    }
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

  /* Il sommario non cambia vista: dice solo a che punto della pagina si è e
     quanto c'è in ognuna delle tre sezioni. */
  function aggiornaSommario() {
    const { diOggi, arretrati } = datiOggi();
    const attive = inventory.voci.filter(
      (v) => !v.archiviata && BYID[v.plantId],
    ).length;
    [
      ["ortoTodayBadge", diOggi.length],
      ["ortoColtureBadge", garden.colture.length],
      ["ortoDispensaBadge", attive],
    ].forEach(([id, n]) => {
      const badge = document.getElementById(id);
      if (!badge) return;
      badge.hidden = !n;
      badge.textContent = String(n);
    });
    /* L'arretrato si somma a quanto c'è oggi invece di sostituirlo: il badge
       dice «oggi», la riga dice «più questi». Due numeri che non si smentiscono. */
    [
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
    ].forEach(([id, testo]) => {
      const nodo = document.getElementById(id);
      if (nodo) nodo.textContent = testo;
    });
    document
      .getElementById("ortoOggiNote")
      ?.classList.toggle("is-late", arretrati.length > 0);
  }

  function render() {
    syncHowto();
    const vergine =
      !garden.colture.length && !inventory.voci.some((v) => !v.archiviata);
    const viewbar = document.getElementById("ortoViewbar");
    // A orto vuoto il sommario indicherebbe tre sezioni che non esistono ancora.
    if (viewbar) viewbar.hidden = vergine;
    if (vergine) {
      renderBenvenuto();
      return;
    }
    aggiornaSommario();
    app.innerHTML =
      sezioneOggiHtml() + sezionePianteHtml() + sezioneDispensaHtml();
    renderStockResults();
    osservaSezioni();
  }

  /* Scrollspy: la voce del sommario si accende quando la sua sezione è
     quella che si sta leggendo. Sostituisce lo stato "linguetta scelta",
     che qui non ha più senso perché le sezioni ci sono tutte insieme. */
  let osservatore = null;
  function osservaSezioni() {
    osservatore?.disconnect();
    const voci = [...document.querySelectorAll("[data-orto-jump]")];
    const sezioni = [...app.querySelectorAll(".orto-sec")];
    if (!voci.length || !sezioni.length || !("IntersectionObserver" in window))
      return;
    const visibili = new Set();
    const accendi = () => {
      // Fra due sezioni visibili vince quella più in alto: è quella che si sta leggendo.
      const attiva = sezioni.find((s) => visibili.has(s.id))?.id;
      voci.forEach((voce) =>
        voce.classList.toggle(
          "is-active",
          Boolean(attiva) && voce.dataset.ortoJump === attiva,
        ),
      );
    };
    osservatore = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibili.add(entry.target.id);
          else visibili.delete(entry.target.id);
        });
        accendi();
      },
      // Il margine alto scarta la fascia coperta dalla navbar fissa.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sezioni.forEach((s) => osservatore.observe(s));
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
    applyAddDialogMode();
    render();
    document.documentElement.classList.remove("serra-i18n-pending");
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== "ois.lang") return;
    const next = normalizeLang(event.newValue);
    if (next !== lang) applyLanguage(next);
  });

  /* ============================================================ Azioni ============================================================ */
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  // Voce aggiunta a mano: stessa logica di riattivazione usata per l'importazione dagli ordini,
  // ma senza un ordine a cui appoggiarsi.
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
        qtaPiantata: 0,
        semine: 0,
        orderId: null,
        dataAcquisto: E.iso(new Date()),
        archiviata: false,
      });
    }
    saveInventory();
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

  // Un filtro che non porta a nulla è peggio di nessun filtro: le famiglie elencate sono solo quelle che hanno almeno una pianta.
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

  // Il dialogo "Aggiungi" serve a due scopi: piantare subito, oppure solo mettere da parte
  // nella dispensa. Cambia titolo, passo 3 e conferma; data e aiuola contano solo se si pianta.
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

  /* I pannelli ripiegabili ricordano se erano aperti: il ridisegno che segue
     ogni spunta non deve richiuderli sotto le dita. */
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
    // Un dialogo può aprirne un altro: si sblocca solo quando non ne resta nessuno aperto.
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
    // La chiusura arriva da cinque strade diverse (✕, Annulla, Esc, sfondo, invio del modulo): lo sblocco sta qui, una volta sola.
    dialogo.addEventListener("close", sbloccaPagina);
  });

  document.addEventListener("click", (event) => {
    // I collegamenti fra sezioni scorrono la pagina: niente cambio di vista, niente salto secco.
    const salto = event.target.closest("[data-orto-jump]");
    if (salto) {
      const meta = document.getElementById(salto.dataset.ortoJump);
      if (meta) {
        event.preventDefault();
        vaiAllaSezione(meta);
      }
      return;
    }
    const trigger = event.target.closest("[data-orto-action]");
    if (!trigger) return;
    const action = trigger.dataset.ortoAction;
    if (action === "set-language") {
      applyLanguage(trigger.dataset.lang);
      return;
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
    // La rimozione porta via anche lo storico: si chiede conferma.
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
      apriDialogo("ortoPlantDialog");
      return;
    }
    // Chiusura esplicita: la ✕ dell'intestazione.
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
    if (action === "pick-family") {
      pickerFamily = trigger.dataset.family || "";
      renderPicker();
      return;
    }
    if (action === "pick-plant") {
      piantaScelta = trigger.dataset.plantId;
      ricordaPianta(piantaScelta);
      mostraSceltaPianta();
      // Il fuoco va sulla scelta successiva, non sulla data: su telefono aprirebbe subito il calendario nascondendo il resto del dialogo.
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
      if (quantita) quantita.value = "4";
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
  // Delegato su app: la barra di ricerca della dispensa viene ricreata solo al cambio vista, mai a ogni battitura.
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
      const nome = plantName(BYID[plantId]);
      const modoScorta = dialogMode === "stock";
      if (modoScorta) {
        aggiungiAScorta(plantId, origine, document.getElementById("ortoQty").value);
      } else {
        aggiungiColtura(
          plantId,
          origine,
          document.getElementById("ortoDate").value || E.iso(new Date()),
          document.getElementById("ortoQty").value,
          document.getElementById("ortoPosition").value.trim(),
        );
      }
      piantaScelta = null;
      setTimeout(() => {
        render();
        // Porta lo sguardo dove la voce è appena comparsa, invece di lasciarla trovare.
        vaiAllaSezione(
          document.getElementById(
            modoScorta ? "ortoSecDispensa" : "ortoSecPiante",
          ),
        );
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

  // Conferma dell'importazione: solo gli ordini spuntati, e solo le voci che non c'erano già.
  document
    .getElementById("ortoImportForm")
    ?.addEventListener("submit", (event) => {
      const scelti = ordiniImportabili;
      ordiniImportabili = [];
      if (event.submitter && event.submitter.value === "cancel") return;
      const selezionati = [
        ...document.querySelectorAll('input[name="ortoImportOrder"]:checked'),
      ].map((el) => el.value);
      if (!selezionati.length) return setTimeout(() => toast(t("toast.no_orders_selected")), 0);
      let aggiunte = 0;
      scelti
        .filter((ordine) => selezionati.includes(ordine.id))
        .forEach((ordine) => {
          ordine.nuovi.forEach((item) => {
            const variante = item.variante === "piantina" ? "piantina" : "seme";
            const id = `${ordine.id}|${item.id}|${variante}`;
            // Una svuotata precedente lascia la voce archiviata: la si riattiva invece di duplicarla.
            const esistente = inventory.voci.find((v) => v.id === id);
            if (esistente) esistente.archiviata = false;
            else
              inventory.voci.push({
                id,
                plantId: item.id,
                variante,
                qta: Number(item.bustine) || 1,
                qtaPiantata: 0,
                semine: 0,
                orderId: ordine.id,
                dataAcquisto: ordine.data,
                archiviata: false,
              });
            aggiunte++;
          });
        });
      saveInventory();
      setTimeout(() => {
        render();
        toast(t("toast.imported_orders", { n: aggiunte }));
      }, 0);
    });

  // Conferma dello svuotamento: archivia tutta la dispensa attiva, come fa "Segna come finita" voce per voce.
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
        render();
        vaiAllaSezione(document.getElementById("ortoSecPiante"));
        toast(t("toast.planted", { n: quante, nome }));
      }, 0);
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
    updateCartBadge();
    applyLanguage(localStorage.getItem("ois.lang"));
    // Un ingresso diretto su #da-piantare (dal pannello utente) scende alla dispensa.
    if (location.hash === "#da-piantare")
      requestAnimationFrame(() =>
        vaiAllaSezione(document.getElementById("ortoSecDispensa")),
      );

    // Rende infinita la striscia degli ortaggi nel piè di pagina duplicando gli elementi.
    const footerRow = document.getElementById("footerPlantRow");
    if (footerRow) {
      const html = footerRow.innerHTML;
      footerRow.innerHTML = html + html + html + html;
    }
  }

  boot();
})();
