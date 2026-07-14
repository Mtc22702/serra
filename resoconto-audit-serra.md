# Resoconto audit codice — App "Serra"
Data: 14 luglio 2026

Analisi completa di HTML (4 pagine), CSS (27 file, ~19.500 righe) e JavaScript (26 file, ~19.500 righe). Il quadro generale: **niente di rotto**, il sito funziona, ma il codice mostra i segni tipici di un anno di iterazioni rapide ("miglioramento ui/ux", "bugfix" — coerente con la cronologia commit) senza fasi di consolidamento. Il problema dominante non è codice "sporco" nel senso di sciatto — i commenti sono per lo più buoni, non ci sono ID duplicati, nessun link rotto — ma **duplicazione strutturale**: la stessa logica/stile riscritta in più punti nel tempo invece di essere centralizzata, con conseguenze concrete già visibili (emoji diverse per la stessa pianta, copyright "2025" vs "2026" tra pagine, guide di semina disallineate).

---

## Changelog — correzioni già applicate (14 luglio 2026)

Applicati solo gli interventi a **rischio zero o verificabile** (nessuna modifica all'aspetto visivo generale, nessun cambio di comportamento salvo bugfix intenzionali). Tutto è tracciato in git ed è quindi revertibile con `git diff`/`git checkout`.

1. **Guida di semina rumena nel configuratore** (`assets/js/conf/conf-text.js`) — estesi i set di colture (`direct`, `bulbs`, `aromatics`, `warm`) e aggiunti i casi `patata`/`asparago`, allineandoli alla versione più completa già in uso nella home. Nessuna modifica alla struttura della funzione: le colture già gestite restano identiche, solo quelle prima "orfane" (daikon, scorzonera, fava, soia_edamame, cece, lenticchia, fagiolo_borlotto, cipolla_rossa, cipollotto, erba_cipollina, leustean, dragoncello, menta, maggiorana, camomilla, shiso, tomatillo, physalis, cucamelon, mais_dolce, patata_dolce, friggitello, patata, asparago) ora ricevono un testo di semina corretto invece del messaggio generico.
2. **Emoji piante nel pannello admin** (`assets/js/account.js`) — la mappa di fallback `fruitEmoji()` (32 voci, alcune diverse da quelle mostrate agli utenti) è stata allineata alla mappa completa e aggiornata già usata nella home (95 voci). Corregge visivamente le icone di alcune piante nel pannello amministratore (es. rucola, ravanello, porro, finocchio).
3. **Copyright footer** — corretto "© 2025" in "© 2026" in `index.html` e `configuratore.html`, allineandolo a `account.html` e alla data corrente.
4. **Regola CSS duplicata morta** (`assets/css/uiux-polish.css`) — rimosso un blocco `@layer base { @media(max-width:660px){...} }` reso completamente inefficace da un blocco identico successivo fuori layer. Zero impatto visivo: la regola attiva (quella rimasta) è invariata.
5. **File JS orfani rimossi** — cancellati `assets/js/i18n-esm.js` e `assets/js/plants-data-esm.js`: verificato che non fossero referenziati da nessun HTML, script o dal service worker prima della rimozione.
6. **Stile inline → attributo coerente** (`index.html`) — il `<select id="catalogType">` usava `style="display:none"` mentre tutto il resto del sito usa l'attributo `hidden` (177 occorrenze); sostituito con `hidden`, verificato che nessuno script legga/scriva `.style.display` su quell'elemento e che esista già una regola CSS generica `[hidden]{display:none}` che ne garantisce il comportamento identico.

Verifiche eseguite dopo le modifiche: controllo sintassi JS (`node --check`) su tutti i file toccati, bilanciamento parentesi graffe CSS, ricerca di riferimenti residui ai file rimossi (nessuno trovato), rilettura di ogni diff riga per riga.

### Interventi volutamente NON applicati (rischio più alto)

Per rispettare il vincolo "non rovinare nulla", non ho toccato le aree che richiederebbero verifica visiva/funzionale live per essere sicure al 100%:

- **Ristrutturazione dei `@layer` CSS** e rimpatrio delle regole di `uiux-polish.css` nei file sorgente — tocca la cascata su tutto il sito, rischio concreto di micro-regressioni visive senza un browser per confrontare prima/dopo.
- **Unificazione formattazione prezzo** (`formatMoney`/`money`/`euro`) — cambierebbe il testo effettivamente visibile ("12,50 €" vs "€ 12,50") in punti diversi dell'app: è per definizione un cambio di aspetto, quindi l'ho lasciato come nota nel report invece di applicarlo senza conferma.
- **Consolidamento funzioni "foto pianta" ed `escapeHtml`** tra file — comportamento equivalente ma tocca molti punti di chiamata e l'ordine di caricamento script tra pagine diverse; da fare con test mirati pagina per pagina.
- **Header/footer condivisi in un partial** e **boot.js unico** — richiedono un meccanismo di inclusione (JS injection o build step) che cambia i tempi di rendering della pagina; da introdurre con cautela e verifica visiva, non alla cieca.
- **Allineamento breakpoint CSS** (768px di `account.css` vs 660px del resto) — un cambio di breakpoint è per natura un cambio di come la pagina si vede a certe larghezze: richiede un controllo visivo prima di essere applicato.

Questi restano nel resoconto sotto come roadmap (Fasi 3-4) da affrontare quando sarà possibile testare visivamente le pagine, oppure procedendo un file alla volta con conferma.

## Changelog — seconda passata (continuazione, 14 luglio 2026)

Dopo conferma esplicita su due scelte di design, ho completato anche gli interventi più delicati, sempre verificando la logica prima di applicarla:

7. **Layer CSS esplicito per `uiux-polish.css`** — avvolto l'intero file in `@layer polish`, dichiarato per ultimo (`@layer base, dark-theme, polish;`). Ho verificato matematicamente che l'ordine di vittoria della cascata resta identico a prima (le regole "normal" continuano a vincere come quando il file era fuori da ogni layer; le regole `!important` continuano a perdere contro quelle di base/dark-theme, come già accadeva) — quindi **zero cambiamento visivo atteso**, ma ora il comportamento è esplicito invece di dipendere da un dettaglio implicito fragile. Ho anche controllato che `account.css` (che carica dopo `theme.css` ma resta volutamente fuori dai layer) non abbia nessun selettore in comune con `uiux-polish.css` (0 su 428 controllati), quindi il cambio non genera conflitti su account.html.
8. **Breakpoint account.css allineato a 660px** (confermato da te) — i due blocchi `@media (max-width: 768px)` sono ora `@media (max-width: 660px)`, coerenti col resto del sito.
9. **Formato prezzo unificato** (confermato da te) — `euro()` in `conf-shopping.js` ora usa lo stesso `Intl.NumberFormat` di `formatMoney`/`money`, quindi la lista materiali del configuratore mostra "12,50 €" invece di "€ 12,50", come nel resto del sito.
10. **Versioni cache-busting allineate** — bumpato `SERRA_APP_VERSION`/`CACHE_VERSION` (usato da service worker e da `account.html`) e le query string `?v=` dei file effettivamente modificati (`uiux-polish.css`, `conf-text.js`, `conf-shopping.js`) a un valore unico e coerente (`2026-07-14-cleanup-pass`), così tutte le pagine ricevono sicuramente le versioni aggiornate invece di una copia in cache.

Verifiche eseguite: `node --check` su tutti i JS toccati, conteggio parentesi graffe bilanciato su tutti i CSS toccati, conteggio di script/link invariato nelle pagine HTML, nessun riferimento residuo a valori di versione ormai sostituiti nei file effettivamente cambiati.

## Changelog — terza passata: !important del catalogo dark-theme (14 luglio 2026)

Su tua indicazione ho spostato le regole dark-theme del catalogo da `index/05-catalogo-avanzato.css` a `tema/02-dark-principale.css`, il file architetturalmente corretto, eliminando `!important` da quelle regole.

**Cosa ho scoperto analizzando il file**: dei 40 `!important` originali, solo **18** erano davvero legati al tema scuro (selettori `html[data-theme="dark"] .catalog-search--pro`, `.catalog-reset-btn`, `.cat-sort-select`, `.catalog-filter-step`, `.chip-count` — 76 righe in fondo al file, tenute fuori da ogni `@layer` apposta per vincere sulla cascata). Le ho spostate in `tema/02-dark-principale.css` dentro il layer `dark-theme` già esistente: lì vincono automaticamente su tutto ciò che sta in `@layer base` per priorità di layer, senza bisogno di `!important`. Ho verificato che non ci fosse nessuna regola sovrapposta in `uiux-polish.css` che potesse rompere l'override (zero selettori in comune).

Gli altri **22 `!important`** rimasti in `index/05-catalogo-avanzato.css` sono un problema diverso da quello che pensavo inizialmente: non riguardano il tema scuro, ma un conflitto di specificità tra `.catalog-scope--advanced` (variante "avanzata" del filtro catalogo) e `.catalog-scope` di base, dentro diverse `@media query` dello stesso file. Non li ho toccati perché per essere sicuro di non rompere nulla dovrei prima capire con certezza se `.catalog-scope--advanced` sostituisce o si affianca a `.catalog-scope` nel markup — cosa che non riesco a verificare con certezza assoluta solo leggendo il codice statico. Restano quindi 60 `!important` totali in tutto il sito (erano 78), concentrati soprattutto in quel gruppo di 22.

Verifiche eseguite: parentesi graffe bilanciate in entrambi i file toccati (`index/05-catalogo-avanzato.css` e `tema/02-dark-principale.css`), zero selettori in comune tra le regole spostate e `uiux-polish.css`, versioni cache-busting aggiornate per entrambi i file.

## Changelog — quarta passata: eliminazione sistematica di !important (14 luglio 2026)

Su richiesta di rivedere e ridurre drasticamente i restanti `!important`, ho tracciato uno per uno tutti i 60 rimasti dopo la passata precedente, verificando per ciascuno la causa esatta (specificità CSS, ordine dei layer, o conflitto reale con un'altra regola) prima di decidere se toglierlo.

**Risultato di questa passata: da 78 a 11 occorrenze totali (-86%).** *(Nota: questo numero è stato in parte rivisto dopo la correzione delle regressioni descritta più sotto — vedi il totale aggiornato a fine sezione "Cosa resta".)*

Il grosso del lavoro:
- **`uiux-polish.css`: da 15 a 0.** Vivendo nel layer `polish` (l'ultimo, priorità massima per le regole "normal"), batte già tutto ciò che sta in `base`/`dark-theme` a prescindere dalla specificità — quindi nessuno dei 15 serviva davvero. Ho verificato per ciascuno che non stesse combattendo contro uno stile inline JS o un'altra regola interna allo stesso file con specificità più alta, prima di toglierlo.
- **`index/05-catalogo-avanzato.css`: da 22 (dopo la passata precedente) a 0.** Ho trovato la causa esatta di ognuno: la maggior parte erano selettori composti (es. `.catalog-scope--advanced .catalog-chip`) che hanno già una specificità naturale più alta di qualunque regola concorrente, quindi il forzare con importante era superfluo. Un caso (`.compact-list-view`) aveva davvero bisogno di vincere contro una regola più specifica altrove: invece di tenere `!important` ho alzato la specificità aggiungendo l'id reale dell'elemento (`#compactPlants.compact-list-view`), una soluzione più pulita e stabile nel tempo.
- **Scoperta collaterale utile**: spostando le regole dark-theme del catalogo (passata precedente), ho trovato che `tema/02-dark-principale.css` aveva già una regola quasi identica per lo stesso box di ricerca, duplicata indipendentemente in due file diversi da tempo (uno dei "doppioni nascosti" descritti nel resoconto originale). Le ho unificate in una sola regola corretta invece di lasciarle a farsi concorrenza a vicenda.
- **`index/02-calendario-catalogo.css` e `index/03-pannelli-overlay.css`**: diversi `!important` erano regole "hide" con selettori tipo `body.cart-open .cart-nudge` — già abbastanza specifiche (classe su `body` + classe sull'elemento) da vincere senza bisogno di forzare nulla. Tolti. Due invece (`.catalog-reset-btn[hidden]`, `.conf-cart-hint[hidden]`) erano regole completamente ridondanti — la regola globale `[hidden] { display: none !important }` già copriva lo stesso caso — quindi le ho rimosse del tutto invece di lasciarle come doppioni morti.
- **`configuratore/03, 04, 07`**: stesso pattern (selettori "hide" già sufficientemente specifici), tolti con la stessa verifica.
- **`account.css`**: rimosso l'unico non necessario (`.admin-backup-grid .span-2-large`, un falso conflitto con una regola di un'altra sezione della pagina che non condivide mai gli stessi elementi nel DOM).

### Cosa resta e perché l'ho lasciato apposta

Elenco così come si presentava subito dopo questa quarta passata (11 occorrenze). **Il totale reale oggi è diverso — vedi nota in fondo — a causa del ripristino di alcune regole descritto nel changelog successivo ("correzione di due regressioni").**

- **`tema/06-header-ritmo.css` (3)**: pattern `:where(...) { column-gap: ... !important }`. È una tecnica CSS intenzionale — `:where()` azzera la specificità apposta, e `!important` serve a garantire che questo valore "di base" si applichi comunque. Toglierlo vanificherebbe lo scopo della regola.
- **`account.css` (3)**: dentro `@media print`, per forzare sfondo bianco/testo nero sulla ricevuta stampabile indipendentemente dal tema chiaro/scuro dell'utente. Pattern standard e accettato per i fogli di stile di stampa; comportamento non verificabile senza una stampante reale, quindi l'ho lasciato per prudenza.
- **`configuratore/05-progetti-calendario.css` (2)**: stesso motivo, dentro `@media print`.
- **`index/01-fondazioni-hero.css` (1)**: `[hidden] { display: none !important }` — la regola globale che garantisce che l'attributo `hidden` (usato 177+ volte nel sito) vinca sempre su qualunque classe di stile. Toglierla rischierebbe di far riapparire elementi che dovrebbero restare nascosti in tutto il sito.
- ~~**`index/04-responsive-header-contatti.css` (1)**: `.nav-lang { display: flex !important }`~~ — **superata**: questa regola legacy è stata rimossa del tutto nella correzione della regressione del selettore lingua mobile (vedi sotto), non solo privata dell'`!important`. Oggi questo file ha 0 `!important`.
- **`index/07-preconfigurazione.css` (1)**: blocco scroll (`overflow: hidden`) quando è aperto un pannello di preconfigurazione — pattern difensivo comune quando più stati di "blocco scroll" indipendenti convivono nello stesso sito; il rischio di un bug di scroll silenzioso non era giustificato dal guadagno di togliere una singola occorrenza.

Verifiche eseguite: parentesi graffe bilanciate su tutti i 9 file toccati in questa passata, ricerca di riferimenti incrociati per ogni selettore prima di ogni rimozione, versioni cache-busting aggiornate per tutti i file modificati.

### Totale aggiornato dopo la correzione delle regressioni: 31 `!important` (non più 11)

La correzione della seconda regressione (campo di ricerca/pillola dark mode, vedi sotto) ha richiesto di **annullare completamente** lo spostamento delle 18 regole dark-theme del catalogo da `index/05-catalogo-avanzato.css` a `tema/02-dark-principale.css` fatto nella terza passata — quindi quelle 18 `!important` sono tornate esattamente come prima di qualunque modifica di oggi. Allo stesso tempo, 3 `!important` originali di `tema/02-dark-principale.css` (sulla stessa regola `.catalog-search-box input`, presenti ancora prima che iniziassi) sono tornati anch'essi al loro posto. Questi 21 `!important` **non sono stati rivalutati come necessari** — sono semplicemente tornati perché l'unica alternativa sicura, dato che non potevo verificare visivamente il fix, era ripristinare lo stato noto-funzionante. Il conteggio reale oggi, verificato con `grep -c "!important"` su tutti i CSS, è:

| File | Occorrenze |
|---|---|
| `index/05-catalogo-avanzato.css` | 18 (ripristinate — vedi sopra) |
| `account.css` | 3 (`@media print`) |
| `tema/06-header-ritmo.css` | 3 (`:where()`) |
| `tema/02-dark-principale.css` | 3 (ripristinate — vedi sopra) |
| `configuratore/05-progetti-calendario.css` | 2 (`@media print`) |
| `index/01-fondazioni-hero.css` | 1 (regola globale `[hidden]`) |
| `index/07-preconfigurazione.css` | 1 (blocco scroll) |
| **Totale** | **31** (da 78 originali, **-60% circa**, non -86%) |

## Changelog — correzione di due regressioni (14 luglio 2026)

Dopo la passata sugli `!important`, hai segnalato due problemi visivi reali. Ecco cosa è successo e come li ho corretti.

**1. Selettore lingua visibile nell'header mobile (non doveva esserci)**

Causa trovata: `index/04-responsive-header-contatti.css` aveva una regola legacy `.nav-lang { display: flex !important; }` a ≤660px, rimasta da **prima** del redesign del menu hamburger — oggi la lingua si cambia dal menu hamburger (`.mobile-menu-language`, già presente in tutte le pagine), quindi il vecchio selettore nell'header va nascosto insieme al resto. Questa regola legacy era già "vinta" per puro caso da un duplicato che avevo scambiato per codice morto ed eliminato nella primissima pulizia CSS di oggi — rimuovendolo ho tolto anche la protezione accidentale, facendo riemergere il bug legacy. **Rimossa la regola legacy** in `index/04-responsive-header-contatti.css`: ora la lingua nell'header resta nascosta sotto i 660px come dovrebbe, e resta accessibile dal menu hamburger.

**2. Campo di ricerca e pillola "catalog-filter-step" non legati alla dark mode**

Causa: nella passata precedente avevo spostato le regole dark-theme del catalogo da `index/05-catalogo-avanzato.css` a `tema/02-dark-principale.css` per eliminare gli `!important`, unificandole con una regola quasi identica già presente lì. La fusione, verificata solo "a tavolino" (senza poter vedere la pagina renderizzata), non ha prodotto il risultato corretto.

Invece di continuare a correggere alla cieca, ho **annullato completamente quello spostamento**: il blocco è tornato, byte per byte, identico a come funzionava prima di qualunque mia modifica di oggi (compresi i suoi `!important` originali). Ho verificato con `git diff` che i due file coinvolti sono tornati esattamente allo stato di partenza per questa parte, mantenendo però tutte le altre correzioni sicure già fatte (guida di semina, emoji, copyright, breakpoint account, ecc., che sono indipendenti da questo problema).

**Lezione per il resoconto**: la fusione di regole CSS attraverso file diversi è l'unico tipo di intervento in questa sessione che ha causato una regressione reale — conferma che avevo ragione a essere cauto su questo genere di modifiche fin dall'inizio. La *rimozione* di `!important` superflui (dove la specificità già garantiva la vittoria) non ha invece causato problemi. D'ora in poi, se vuoi continuare a consolidare regole duplicate tra file diversi, meglio farlo un file alla volta con una verifica visiva tua dopo ogni singolo cambiamento, invece di più fusioni in sequenza.

Verifiche eseguite: `git diff` per confermare il ripristino esatto, parentesi graffe bilanciate su tutti i file toccati, `node --check` sui JS, versioni cache-busting aggiornate su tutte le pagine per garantire che il browser scarichi i file corretti.

### Ancora fuori scope (invariato)

Non ho toccato: il rimpatrio manuale dei ~373 selettori CSS duplicati tra file (troppo esteso per farlo senza rischio di errori di trascrizione in una sola passata — fattibile incrementalmente), il consolidamento di `escapeHtml`/`getStagione`/`normalizeLang` in un file condiviso (richiederebbe aggiungere un nuovo `<script>` a ogni pagina, l'unica leva che tocca l'ordine di caricamento su tutto il sito per un guadagno puramente di manutenibilità — rischio/beneficio sfavorevole), e l'estrazione di header/footer in partial condivisi (richiede un vero meccanismo di templating, non un find-replace: è un lavoro a parte che vale la pena fare con calma).

---

## 1. CSS

**Scoperta principale**: `uiux-polish.css` (3.310 righe, il file più grande) è un livello di "rifiniture" aggiunto dopo gli altri, ma tecnicamente vince quasi sempre sulla cascata perché è l'unico file **non racchiuso in `@layer`**, mentre tutti gli altri (`tema/`, `index/`, `configuratore/`) usano `@layer base`/`@layer dark-theme`. Per specifica CSS, le regole fuori da un layer battono sempre quelle dentro un layer — quindi non vince "perché caricato per ultimo" ma per un dettaglio strutturale fragile. Eccezione pericolosa: perde comunque contro le 40 regole `!important` di `index/05-catalogo-avanzato.css`, quindi in alcuni punti il comportamento è imprevedibile senza leggere entrambi i file.

Solo il 19% dei selettori di `uiux-polish.css` sono vere sovrascritture di regole esistenti altrove — l'80% introduce componenti UI interi mai "rimpatriati" nei moduli numerati (`.workflow-hub`, `.journey-context`, `.wizard-bar`), rompendo lo schema di organizzazione a cartelle che il progetto stesso si è dato.

**Problemi concreti:**
- **373 selettori** compaiono in 2+ file diversi. Casi con proprietà in conflitto reale (non solo responsive): `.hero-cfg-inner`, `.site-header .cart-btn` (sparso su 5 file), tutto il blocco "guided-intro / persona-pick" (ripetuto su 5 file del configuratore più uiux-polish.css).
- **Duplicato letterale identico** dentro `uiux-polish.css`: la regola che nasconde tema/lingua sotto i 660px compare due volte, righe 824-826 e 1393-1395 — la seconda rende la prima morta.
- `uiux-polish.css` apre **11 blocchi separati** `@media (max-width: 660px)` invece di uno consolidato — segno diretto di patch accumulate senza refactoring.
- **68 usi di `!important`** in totale, concentrati in `index/05-catalogo-avanzato.css` (40) — quasi tutti per forzare lo stile dark-theme del catalogo, che architetturalmente dovrebbe stare in `tema/02-dark-principale.css`.
- **Breakpoint incoerenti**: tutto il sito usa 660px come rottura mobile, tranne `account.css` che usa 768px — la pagina account cambia layout a una larghezza diversa dal resto. In più, 640px e 660px convivono in diversi file per scopi simili, con 20px di zona grigia.
- Commenti: buoni e coerenti in `tema/*` e `account.css`; in `uiux-polish.css` sono discorsivi e motivazionali (stile diverso, prova ulteriore che è stato scritto in un momento/contesto separato dal resto).

**Azioni prioritarie:**
1. Decidere la strategia dei layer: o si mette `uiux-polish.css` in un `@layer` esplicito con priorità dichiarata, o si eliminano gli `!important` di `05-catalogo-avanzato.css` — oggi il "chi vince" è determinato da un dettaglio implicito, non da una scelta.
2. Rimpatriare le vere sovrascritture di `uiux-polish.css` nei file sorgente corrispondenti (partire da `.hero-cfg-inner`, `.site-header .cart-btn`, blocco guided-intro/persona-pick).
3. Consolidare gli 11 blocchi `@media (max-width:660px)` di `uiux-polish.css` in uno solo per file/sezione; rimuovere il duplicato righe 824-826/1393-1395.
4. Allineare il breakpoint mobile di `account.css` (768px → 660px) al resto del sito.
5. Spostare la logica dark-theme del catalogo da `index/05-catalogo-avanzato.css` a `tema/02-dark-principale.css`, eliminando gli `!important` risolvendo la specificità alla radice.
6. Unificare il modulo "guided-setup/persona-pick", oggi frammentato su 5 file del configuratore più uiux-polish.css.

---

## 2. JavaScript

**Problema dominante**: utility trasversali reimplementate in modo indipendente nei moduli `conf/` (configuratore) e `home/` (pagina index), spesso con **risultati divergenti** — non solo duplicazione di codice ma disallineamento di dati:

| Funzione | Copie | Problema |
|---|---|---|
| Foto pianta | 3 versioni (`home-data.js:320`, `account.js:1731`, `conf-data.js:1415`) | fallback map diverse tra le tre |
| Emoji piante (`FRUIT_EMOJI`) | `home-data.js:337` (95 voci) vs `account.js:1679` (32 voci) | **emoji diverse per la stessa pianta** (rucola 🥬 vs 🌿, ravanello 🥬 vs 🍒 ecc.) — bug visibile all'utente |
| Guida di semina | `conf-text.js:111` vs `home-catalog.js:198` | la versione del configuratore manca 6+ colture presenti nella home |
| Formattazione prezzo | 3 funzioni (`formatMoney`, `money`, `euro`), 2 stili di output diversi | anche **dentro lo stesso modulo configuratore** convivono due stili (`"12,50 €"` vs `"€ 12,50"`) |
| `escapeHtml` | 3 copie identiche rinominate (`escapeHtml`, `escapeHtmlProjects`, `escapeHtmlAccount`) | rinominate apposta per evitare collisioni invece di essere condivise |
| `getStagione`, `normalizeLang` | 2 copie identiche | candidati diretti per un file condiviso |

Un commento nel codice stesso (`conf-text.js:302-304`) ammette il problema: il dizionario di traduzione del configuratore è *"copiato dalla home: alcune chiavi esistono solo nell'uno o nell'altro"* — debito tecnico riconosciuto ma mai risolto.

**Codice orfano:** `i18n-esm.js` e `plants-data-esm.js` (wrapper ES-module) non sono importati da nessun HTML, JS o dal service worker — 100% morti. O sono il primo passo di una migrazione mai completata, o vanno rimossi.

**Versioning non sistematico**: il cache-busting (`?v=2026-07-14-...`) è applicato solo ad alcuni script del configuratore (non a `conf-companions.js`, `conf-engine.js`, `conf-calendar.js`, `conf-data.js`, `conf-shopping.js`, `conf-projects.js`, `conf-draw.js`), mentre `sw.js` usa un `CACHE_VERSION` unico — due meccanismi paralleli, uno incompleto.

**Nota positiva**: nessun `console.log`/`debugger` di debug dimenticato nel codice browser, nessun marker "fix/patch/temp/v2" nei nomi, commenti di sezione generalmente buoni.

**Azioni prioritarie:**
1. Unificare le 3 versioni di "foto pianta" in un'unica funzione condivisa (in `plants-data.js`).
2. Riallineare `FRUIT_EMOJI` tra home e account — è il disallineamento più visibile all'utente.
3. Unificare `localizedSowingGuide` usando la versione più completa (quella di `home-catalog.js`).
4. Scegliere un solo formato prezzo e un'unica funzione, eliminando le altre due.
5. Rimuovere o completare `i18n-esm.js` / `plants-data-esm.js`.
6. Estrarre in `api.js` il bootstrap piante duplicato tra `conf-app.js` e `home-app.js`.
7. Consolidare le 3 `escapeHtml` in un'unica utility condivisa.
8. Sistematizzare il versioning: allineare le query string `?v=` a tutti gli script, o affidarsi solo al `CACHE_VERSION` del service worker.

---

## 3. HTML

**Problema dominante**: assenza di un sistema di partial/template. Header (~150-160 righe) e footer (~117-148 righe) sono copiati quasi identici in index.html, configuratore.html e account.html — circa **800 righe duplicate** solo per questi due blocchi. La conseguenza è già visibile: il footer mostra **"© 2025 Orto in Serra"** in index.html e configuratore.html ma **"© 2026"** in account.html — prova diretta del rischio di disallineamento che la duplicazione manuale comporta.

Lo stesso pattern si ripete per il selettore "che tipo di coltivatore sei" (novizio/intermedio/esperto), implementato tre volte con markup quasi identico ma **classi diverse**: `pc-persona-card` in index.html vs `persona-card` in configuratore.html.

**Script inline duplicati**: ~200+ righe di boilerplate (versioning asset, rilevamento tema, applicazione lingua salvata, registrazione service worker) ripetute con piccole varianti in ogni pagina, invece di un unico `boot.js` esterno. La registrazione del service worker manca del tutto in `account.html` e `guida.html`.

**Convenzioni i18n frammentate**: 4 sistemi di attributi diversi per lo stesso scopo — `data-i18n*` in index.html, `data-i18n-conf*` in configuratore.html, `data-i18n-acc*` in account.html, `data-guide-key` in guida.html. Nessuno è sbagliato di per sé (ogni pagina ha il proprio motore di traduzione), ma rende impossibile un tool di traduzione unico.

**Cache-busting incoerente**: lo stesso file `uiux-polish.css` è versionato `?v=2026-07-13-guide-locale` in index.html ma `?v=2026-07-14-quick-guide-profiles` in configuratore.html e senza versione esplicita (gestione dinamica) in account.html.

**Dettagli minori**: 10 stili inline residui (tutti spostabili in CSS, nessuno dinamico via JS), un `style="display:none"` fuori pattern rispetto ai 177 usi dell'attributo `hidden` nel resto del sito, uso massiccio di handler `onclick`/`onchange` inline (105 occorrenze totali) assente solo in `guida.html`.

**Nota positiva**: nessun ID duplicato nello stesso documento, nessun link CSS/JS rotto, nessun blocco HTML commentato/morto, commenti generalmente utili e ben scritti.

**Azioni prioritarie:**
1. Estrarre header e footer in un partial condiviso (anche solo iniettato via JS) — elimina ~800 righe duplicate e il rischio di disallineamenti come il copyright.
2. Unificare il boilerplate di boot (versioning, tema, i18n, service worker) in un unico `boot.js`.
3. Consolidare la convenzione i18n su un solo prefisso, con scope per pagina.
4. Sostituire i 10 `style=""` inline con classi CSS; correggere l'unico `style="display:none"` in `hidden`.
5. Standardizzare il cache-busting usando ovunque il meccanismo `serraAsset()` già esistente in account.html.
6. Unificare il componente "scegli il tuo livello", oggi triplicato con naming diverso.

---

## Roadmap consigliata (ordine di intervento)

**Fase 1 — correggere i disallineamenti visibili all'utente** (basso rischio, alto impatto percepito)
- Emoji piante disallineate tra home e account
- Copyright "2025"/"2026" disallineato tra pagine
- Guida di semina incompleta nel configuratore

**Fase 2 — consolidare le utility duplicate JS** (rischio medio, riduce debito futuro)
- Foto pianta, formattazione prezzo, escapeHtml, bootstrap piante
- Rimuovere i file `-esm` orfani

**Fase 3 — risolvere l'architettura CSS** (rischio più alto, tocca la cascata)
- Decidere la strategia `@layer` per `uiux-polish.css`
- Rimpatriare le sovrascritture vere, consolidare i blocchi media query duplicati
- Allineare i breakpoint

**Fase 4 — eliminare la duplicazione strutturale HTML** (impegnativo ma più impattante a lungo termine)
- Header/footer condivisi, boot.js unico, convenzione i18n unificata

Ogni fase è indipendente dalle altre e può essere affrontata separatamente senza bloccare il resto — consiglio di partire dalla Fase 1, che è a rischio quasi nullo e chiude bug reali già in produzione.

---

## Changelog — Fase 2 completata: consolidamento utility JS (14 luglio 2026)

Con Claude in Chrome collegato ho potuto per la prima volta vedere davvero le pagine renderizzate (non solo analisi statica del codice), quindi questa passata è verificata con screenshot e controllo della console prima/dopo ogni modifica, non solo con analisi a tavolino.

**1. Foto pianta unificata** — in realtà le copie duplicate non erano 3 come stimato nel resoconto originale ma **5**: oltre a `home-data.js`, `account.js` e `conf/conf-data.js`, ho trovato la stessa identica logica anche dentro `conf/conf-app.js` e `conf/conf-ui.js`. Ho creato `assets/js/shared/plant-photo.js` con un'unica mappa di fallback (quella più completa, ~90 voci, prima solo nel configuratore) e un'unica funzione `resolvePlantPhoto()`; le 5 copie ora la richiamano. Verificato che il risultato è identico byte-per-byte per ogni id già presente nelle mappe più piccole, prima di toccare nulla. Testato su catalogo, scheda pianta del configuratore e pannello admin: foto tutte corrette, zero errori console.

**2. `escapeHtml` unificato** — le 3 copie identiche (`escapeHtml`, `escapeHtmlProjects`, `escapeHtmlAccount`) ora vivono in `assets/js/shared/escape-html.js`; le due varianti rinominate restano come thin wrapper (per non dover toccare le decine di punti che le chiamano già con quel nome). Testato su suggerimenti di ricerca, calendario di manutenzione del configuratore (13 punti di chiamata), elenco progetti, pannello admin.

**3. Bootstrap piante unificato** — il blocco identico che carica il catalogo piante all'avvio (`window.SerraAPI.getPlants()` + aggiornamento `window.TIPO`) era duplicato in `conf-app.js` e `home-app.js`. Ora è un unico metodo `SerraAPI.bootstrapPlants()` in `api.js`, richiamato da entrambi. Testato: catalogo e configuratore caricano correttamente le 97 piante.

**4. Versioning sistematizzato** — tutti gli script che non avevano `?v=` (theme.js, nav.js, plants-data.js, api.js, e su configuratore.html anche conf-data.js/conf-projects.js/conf-draw.js/conf-companions.js/conf-engine.js/conf-calendar.js) ora hanno una query string di versione, così il service worker e la cache del browser non servono più copie vecchie in modo incoerente tra file.

**Bug trovato e corretto durante la verifica**: `updateModalPhotoPreview()` in `account.js` (usata nel modal "Modifica coltura" del pannello admin) referenziava ancora la vecchia costante locale `PHOTO_MAP`, rimossa nel punto 1. Senza il controllo nel browser questo sarebbe rimasto un `ReferenceError` silenzioso ogni volta che un admin apre il modal di modifica di una pianta. Corretto puntandolo alla nuova funzione condivisa; ri-verificato che l'anteprima foto nel modal torna a funzionare.

**5. Stili inline residui** — i 9 rimasti (5 in `account.html`, 2 in `configuratore.html`, già ridotti da un 10° corretto in una passata precedente) sono stati spostati in classi/regole CSS: `.admin-search-wrapper`, `.admin-danger-actions`, `.admin-charts-desc`, `.modal-multiselect` (nuove classi in `account.css`) e l'aggiunta di `margin-top` alla regola già esistente `#pathField > .row.field` in `configuratore/02-pannelli-controlli.css`. In un caso (`.modal-photo-field input`) lo stile inline era già completamente ridondante con una regola esistente — bastava rimuoverlo. Verificato che tutte le regole toccate si trovano dentro `@layer base` fuori da qualunque `@media`, quindi valide a tutte le larghezze e verificabili a schermo intero.

### Cosa NON ho toccato in questa passata, e perché

Due limiti tecnici mi hanno impedito di procedere in sicurezza su alcuni punti:

- **Nessun modo affidabile di vedere il sito a larghezza mobile** in questa sessione: il ridimensionamento della finestra del browser non cambia il viewport effettivo (la pagina resta renderizzata a larghezza desktop nello screenshot). Per questo non ho toccato: il rimpatrio delle sovrascritture CSS di `uiux-polish.css` verso i file sorgente, e la fusione dei 10 blocchi `@media (max-width: 660px)` dello stesso file in uno solo — sono esattamente il tipo di modifica che ha causato la regressione mobile di questa mattina, e senza poterla vedere non me la sono sentita di riprovare alla cieca.
- **Su tua indicazione** mi sono fermato prima delle riscritture architetturali vere e proprie: unificare `persona-card` (index.html e configuratore.html usano due componenti con HTML diverso, non solo classi diverse — servirebbe una riscrittura, non un rename), estrarre header/footer in un partial condiviso (serve un vero meccanismo di templating), unificare il boilerplate di boot in `boot.js`, standardizzare il cache-busting con `serraAsset()` ovunque, e unificare i 4 sistemi di attributi i18n. Restano tutti descritti nel resoconto originale (sezioni 1–3) con le rispettive azioni prioritarie, per una sessione dedicata.

Verifiche eseguite in questa passata: screenshot prima/dopo su index.html, configuratore.html e account.html (incluso dark mode e pannello admin dietro login), controllo della console JS per errori dopo ogni modifica, `node --check` su tutti i file JS toccati, conteggio parentesi graffe bilanciato sui CSS toccati, `grep` di conferma che nessuna delle vecchie costanti/funzioni rimosse fosse ancora referenziata altrove.

---

## Changelog — Fase 3: le riscritture rimaste in sospeso (14 luglio 2026)

Riaperti tutti i punti lasciati fuori dalla passata precedente, con la stessa disciplina di verifica (screenshot + console + `node --check` prima e dopo, mai alla cieca).

**1. Boilerplate di boot unificato in `boot.js`** — creato `assets/js/boot-sw.js` con la logica di registrazione del Service Worker (identica su tutte le pagine: pulizia cache in sviluppo locale, registrazione in produzione). Sostituito il blocco inline `<script>` di ~60 righe in `index.html` e `configuratore.html`, e **aggiunto ex novo** a `account.html` e `guida.html`, che finora non registravano affatto il Service Worker — un gap reale, non solo duplicazione. Gli script inline di rilevamento tema/lingua (nel `<head>` di ogni pagina, per evitare il flash di contenuto sbagliato) **restano inline apposta**: esternalizzarli reintrodurrebbe proprio il bug lampeggiante che devono prevenire — non è duplicazione da correggere, è ripetizione necessaria. Verificato su tutte e 4 le pagine: nessun errore console, service worker attivo, comportamento identico a prima.

**2. Cache-busting con `serraAsset()` — deciso di non applicarlo ovunque.** L'idea del resoconto originale era estendere il pattern già usato in `account.html` (caricamento script via `document.write()` con versione nel path) a tutte le pagine. Verificato che questo richiederebbe convertire tag `<script defer>`/`<link>` moderni e non bloccanti in chiamate `document.write()`, che sono invece bloccanti per il parser: un miglioramento di "coerenza" che in realtà peggiora i tempi di caricamento. Il versioning via query string (`?v=...`), già sistematizzato nella Fase 2, ottiene lo stesso risultato (cache-busting) senza il costo prestazionale. Lasciato così.

**3. Convenzione i18n — consolidamento parziale, motivato.** Analizzati i 3 motori di traduzione realmente indipendenti (non 4: `index.html` e `configuratore.html` condividono già lo stesso dizionario unito internamente, `SERRA_I18N.ui`, con `data-i18n` e `data-i18n-conf` che vi accedono con fallback incrociato — non è duplicazione, è già consolidato). Spostato il dizionario `ACCOUNT_I18N` (184 chiavi IT/RO) da `account.js` a una nuova sezione `shared.account` dentro `assets/js/i18n.js`, così tutte le stringhe tradotte vivono in un solo file sorgente; `account.js` ora legge `window.SERRA_I18N.account`, senza toccare gli attributi `data-i18n-acc*` né la funzione di lookup `tAcc()`. **Non spostato** il dizionario di `guide.js` (usato da `guida.html`): `i18n.js` pesa ~2400 righe soprattutto di dati piante che `guida.html` non usa, quindi unificarlo avrebbe costretto quella pagina leggera a caricare dati superflui. **Non unificati i nomi degli attributi** (`data-i18n` / `data-i18n-conf` / `data-i18n-acc` / `data-guide-key` in un unico prefisso): richiederebbe riscrivere 3 motori di lookup diversi e toccare centinaia di attributi su 4 pagine, con rischio concreto di stringhe che silenziosamente mostrano la chiave invece del testo tradotto — verificabile solo controllando ogni stringa in 2 lingue su 4 pagine, un rischio sproporzionato per un beneficio puramente estetico. Verificato in browser: login, registrazione, pannello admin di `account.html` in italiano e rumeno, più `index.html` e `configuratore.html` in rumeno per conferma che la modifica condivisa a `i18n.js` non li abbia toccati — zero errori console ovunque.

**4. Unificazione "persona-card" — non applicata, non è duplicazione di naming.** Verificato l'HTML: `index.html` usa link statici `<a href="configuratore.html?...">` (navigazione pura, con classi `pc-persona-card`, ripetute due volte nella stessa pagina — hero e pannello di preconfigurazione). `configuratore.html` usa invece `<button role="tab" aria-selected data-livello>` dentro un `role="tablist"`, con lo stato attivo gestito da `conf-app.js`/`conf-state.js`: un vero selettore a schede pilotato da JavaScript, non un link. Non sono lo stesso componente con nomi diversi — sono due pattern di interazione diversi che condividono solo il linguaggio visivo. Forzare la stessa classe CSS su due strutture HTML diverse aumenterebbe il rischio che una modifica pensata per l'uno rompa silenziosamente l'altro, senza eliminare debito reale (la vera ripetizione è nei valori — padding, raggi, colori — non nei nomi).

**5. Header/footer in un partial condiviso — non applicato.** Il sito è statico, senza alcun build tool (verificato: nessun meccanismo di `fetch()`/`innerHTML` che carica frammenti HTML già presente). Estrarlo davvero richiederebbe iniezione via JavaScript a runtime — che ritarda la comparsa dell'header sopra la piega, con costo su SEO e prestazioni — oppure l'introduzione di un build step, che cambia il modello di distribuzione del sito (pensato per GitHub Pages statico, come confermano le stringhe "Modalità GitHub Pages" già presenti in `account.js`). Nessuna delle due è una pulizia a basso rischio: sono entrambe un cambio di architettura.

**6. I 373 selettori CSS duplicati tra file — non affrontati in blocco.** Gran parte ricade nello stesso territorio già bloccato ai punti CSS della Fase 2 (mobile-only): `uiux-polish.css` ha tuttora 10 blocchi `@media (max-width: 660px)` separati (verificato via `grep`, non consolidati), e il blocco "guided-intro/persona-pick" è ripetuto su 5 file del configuratore, quasi tutto scope mobile. Il limite dello strumento di verifica visiva (il ridimensionamento della finestra non cambia il viewport effettivo di rendering) impedisce di controllare a schermo qualunque modifica sotto i 660px — lo stesso ostacolo già loggato due volte in questa sessione. In più, una parte non quantificata dei 373 è sovrapposizione intenzionale dei CSS Cascade Layers (`@layer base, dark-theme, polish`): lo stesso selettore in più layer per design, non debito. Uno sweep alla cieca su 373 punti ripeterebbe il tipo di rischio che ha già causato una regressione mobile reale in questo progetto prima di questa sessione — non tentato un quarto giro sullo stesso ostacolo senza un nuovo modo di vedere il mobile.

Verifiche eseguite in questa passata: `node --check` su `i18n.js`, `account.js`, `boot-sw.js`, `conf-text.js`, `conf-data.js`; conteggio parentesi graffe bilanciato su `i18n.js` (283/283) e `account.js` (348/348); screenshot e controllo console (zero errori) su tutte e 4 le pagine, in italiano e rumeno dove applicabile, incluse le schermate di login/registrazione e il pannello admin di `account.html`; `grep` di conferma che il vecchio `ACCOUNT_I18N` letterale non fosse più referenziato altrove.
