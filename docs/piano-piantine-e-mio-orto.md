# Piano tecnico — Piantine in vendita e sezione "Il mio orto"

Documento di progetto per le due funzioni richieste dagli utenti in fase di test:

1. **Piantine** — poter comprare piantine già cresciute, oltre alle bustine di semi.
2. **Il mio orto** — registrare cosa si coltiva e da quando, ricevere un promemoria
   giornaliero e essere accompagnati fino alla raccolta.

Infrastruttura assunta: `server.js` esteso e sempre attivo (Node online).

---

## 0. Punto di partenza (stato attuale del codice)

| Elemento | Dove sta oggi | Implicazione |
|---|---|---|
| Catalogo piante (97 voci) | `db/plants.json` | Contiene già `gg` (giorni a raccolta), `mesi` (finestra di semina), `acqua`, `h` (fabbisogno nutritivo), `sole`, `d`/`dr` (distanze), `tipo`, `nota`. **È sufficiente a generare il calendario di cura senza scrivere 97 protocolli a mano.** |
| Listino | costante `PACK_DATA` **duplicata** in `home.js`, `configuratore.js`, `account.js` | Va estratta in `db/products.json` *prima* di aggiungere le varianti, altrimenti la variante piantina va mantenuta in tre punti. |
| Carrello | `localStorage["ois.cart"]` = `[{id, bustine}]` | Il formato non ha il concetto di variante: serve migrazione retrocompatibile. |
| Progetti serra | `localStorage["serra.projects.v1"]` (beds con `plantId`) | Sorgente ideale per popolare "Il mio orto" con un clic. |
| Persistenza | `SerraAPI` in `base.js`: prova il server, altrimenti `localStorage`, altrimenti file statico | Il pattern esiste già: le nuove risorse vanno aggiunte dentro `SerraAPI` con lo stesso fallback a tre livelli. |
| Ordini | `POST /api/orders` riscrive **l'intero array** | Race condition già presente; con ordini reali di piantine (stock) va sostituito con `POST /api/orders` di un singolo ordine. |
| Service worker | `sw.js` con cache e handler `message` | Nessun listener `push`/`notificationclick`: vanno aggiunti. |
| Auth | `server.js` non ha autenticazione | **Bloccante**: il diario è un dato personale. Serve un token di sessione prima di esporre `/api/garden`. |

---

## 1. Piantine

### 1.1 Principio di modellazione

La piantina **non è un nuovo prodotto**: è una **variante di acquisto della stessa
coltura**. Trattarla come voce separata del catalogo raddoppierebbe le 97 schede,
romperebbe i filtri, gli abbinamenti e il configuratore. Modelliamo quindi
`prodotto = pianta × variante`.

### 1.2 Nuovo file `db/products.json`

```jsonc
{
  "pomodoro": {
    "semi":     { "prezzo": 3.50, "semiPerBustina": 20 },
    "piantina": {
      "prezzo": 1.80,          // a piantina
      "unita": "vaso ø7",
      "lotto": 6,              // venduta a vassoi da 6
      "prezzoLotto": 9.90,
      "mesiDisponibili": [3, 4, 5],
      "stock": 240,
      "vantaggioGiorni": 30,   // giorni risparmiati rispetto al seme
      "altezzaCm": 15
    }
  }
}
```

**Regola di derivazione iniziale** (per non compilare 97 schede a mano; poi si
corregge a mano dove serve):

- `mesiDisponibili` = `plants.mesi` **più** il mese successivo a ciascuno: il
  vivaio vende per tutta la finestra di trapianto, non solo dopo. Con la sola
  traslazione di +1 mese il catalogo di agosto risultava senza nessuna piantina
  disponibile — verificato nel prototipo.
- `vantaggioGiorni` = 30 per `tipo: frutto`, 20 per `foglia` e `brassica`, 25 per `aromatica`.
- **Nessuna variante piantina** per `tipo: radice` (carota, ravanello, pastinaca:
  la radice a fittone non tollera il trapianto) né per la maggior parte dei
  `legume` (si seminano a dimora). È una scelta agronomica corretta e va
  comunicata all'utente con una nota, non nascosta: *"la carota non si trapianta,
  si semina direttamente"*.
- `prezzo` = `prezzoBustina / 2` arrotondato a 0,10 come primo listino.

### 1.3 Carrello con varianti

Nuovo formato di `ois.cart`:

```jsonc
[{ "id": "pomodoro", "variante": "piantina", "qta": 6 }]
```

Migrazione in lettura (una sola funzione, `normalizeCartItem`): un elemento
senza `variante` con campo `bustine` diventa `{variante:"semi", qta:bustine}`.
Nessuna perdita di carrelli esistenti.

Chiave del carrello = `id + variante`: la stessa pianta può stare nel carrello
in entrambe le forme (3 bustine di lattuga + 6 piantine di pomodoro).

### 1.4 Interfaccia

- **Scheda prodotto (modale dettaglio)**: selettore segmentato `Semi | Piantina`
  che aggiorna prezzo, unità, CTA e — elemento chiave per la conversione — la
  riga *"Raccolta stimata: 20 giugno (30 giorni prima)"*.
- **Card catalogo**: badge `Anche piantina` sulle colture disponibili; nuovo chip
  di filtro *"Disponibile come piantina"*.
- **Fuori stagione**: la variante resta visibile ma disabilitata con la data di
  ritorno (*"Piantine da marzo"*) e un `Avvisami`, che raccoglie l'email e
  diventa un canale di remarketing.
- **Carrello e checkout**: le piantine sono merce viva → riga di avviso sulla
  spedizione (consegna in settimana, non spedibile con gelate) e, se il carrello
  è misto, separazione visiva delle due spedizioni.
- **Configuratore**: se una coltura del piano è nel carrello come piantina, la
  sua barra temporale parte dal trapianto invece che dalla semina.

### 1.5 Backend

```
GET  /api/products            → listino completo con stock e disponibilità del mese
POST /api/orders              → crea UN ordine (sostituisce la riscrittura dell'array)
                                verifica stock delle piantine e lo decrementa in transazione
```

Le righe d'ordine passano da `{plantId, bustine}` a
`{plantId, variante, qta, prezzoUnitario, unita}`; da aggiornare anche il
generatore di fattura in `account.js` (usa `PACK_DATA` direttamente).

---

## 2. "Il mio orto"

### 2.1 Modello dati

Nuova risorsa `serra.garden.v1` (localStorage) sincronizzata con
`GET/PUT /api/garden/:userId`:

```jsonc
{
  "colture": [{
    "id": "c_lz3k9",
    "plantId": "pomodoro",
    "origine": "piantina",        // "seme" | "piantina"
    "dataInizio": "2026-04-12",   // semina, oppure messa a dimora
    "quantita": 6,
    "progettoId": "p_ab12",       // opzionale: collega a una serra salvata
    "posizione": "Aiuola 2",
    "stato": "in_corso",          // in_corso | raccolta | terminata | fallita
    "eventi": [
      { "data": "2026-04-20", "tipo": "irrigazione" },
      { "data": "2026-07-02", "tipo": "raccolta", "quantitaKg": 2.4 }
    ],
    "note": [{ "data": "2026-05-03", "testo": "Foglie ingiallite in basso" }]
  }],
  "taskCompletati": { "c_lz3k9:irrigazione:2026-04-20": true },
  "preferenze": { "oraPromemoria": "07:30", "canale": ["push"] }
}
```

Gli eventi sono **append-only**: la storia di una coltura non si riscrive, e a
fine stagione diventa una statistica ("dalla semina alla raccolta: 94 giorni")
che migliora le stime dell'anno successivo.

### 2.2 Motore attività (`assets/js/shared/care-engine.js`)

Funzione pura, senza DOM, testabile:

```js
generaAttivita(coltura, pianta, { dal, al, mese }) → Task[]
```

Tutte le regole si ricavano dai campi **già presenti** in `plants.json`:

| Attività | Regola | Campo sorgente |
|---|---|---|
| Germinazione attesa | frutto 8 gg · foglia 5 · radice 7 · legume 6 · aromatica 12 | `tipo` |
| Irrigazione | `bassa` ogni 4 gg · `media` 2 · `alta` 1; −1 giorno nei mesi 6-8, +2 nei mesi 11-2 | `acqua` |
| Concimazione | `h: alta` ogni 14 gg · `media` 21 · `bassa` 30, dalla fase di crescita | `h` |
| Diradamento | foglia +20 gg, radice +18 gg (solo da seme) | `tipo`, `origine` |
| Trapianto | frutto/brassica +30 gg (solo da seme) | `tipo`, `origine` |
| Tutoraggio | frutto +35 gg, legume rampicante +25 gg | `tipo`, `arch` |
| Controllo parassiti | ogni 7 gg | — |
| Raccolta | giorno `gg` (− `vantaggioGiorni` se da piantina); per le foglie raccolta scalare ogni 7 gg | `gg` |
| Consiglio della scheda | mostrato come nota fissa nella coltura | `nota` |

Casi limite già presenti nei dati: `gg: 0` (rosmarino, timo, origano, salvia →
perenni, niente data di raccolta ma potature stagionali) e `gg: 730`
(asparago → piano pluriennale). Il motore deve gestirli, non ignorarli.

> **Regola emersa dal prototipo — le ricorrenze non si accumulano.**
> Con tre colture avviate da poche settimane e nessuna attività spuntata, la
> prima versione della vista "Oggi" mostrava **94 attività in ritardo**: un muro
> di colpe che nessuno apre due volte. Le attività ricorrenti (irrigazione,
> concimazione, controllo, potatura) devono **decadere**: di ogni tipo resta
> solo l'occorrenza più recente per coltura, presentata come *"ultima volta 6
> giorni fa"* e non come ritardo. Solo le attività **puntuali** (trapianto,
> diradamento, raccolta) restano davvero in ritardo, perché lì la data conta.
> Con la stessa situazione gli arretrati scendono da 94 a 6, tutti veri.
> Questa regola è già implementata nel prototipo (`comprimiRicorrenti`).

### 2.3 Interfaccia — nuova pagina `orto.html`

Tre viste, con "Oggi" come schermata di ingresso:

- **Oggi** — le attività di oggi e quelle scadute, con spunta, *rimanda a domani*
  e *fatto per tutte*. È la schermata che deve funzionare in 5 secondi al
  mattino: niente grafici, solo caselle.
- **Le mie colture** — griglia con barra di avanzamento verso la raccolta,
  fase corrente, giorni mancanti; da qui si aggiunge una coltura (pianta,
  origine, data, quantità) o si importa in blocco da una serra salvata o da un
  ordine.
- **Diario** — cronologia degli eventi, note, foto, e a fine ciclo il riepilogo
  della resa.

**Non va costruita dentro `home.js`** (già 5.210 righe) né in `configuratore.js`
(10.237): nuova pagina + `assets/js/orto.js` + `assets/css/pages/orto.css`,
con il motore in `shared/` così che anche il configuratore possa usarlo.

### 2.4 Promemoria giornaliero

Con backend attivo, tre livelli complementari:

1. **Web Push** — chiave VAPID, `POST /api/push/subscribe`, cron sul server alle
   07:30 che per ogni utente calcola le attività del giorno e invia una notifica
   sola e aggregata: *"Orto in Serra — oggi: annaffia i pomodori e controlla le
   lattughe (3 attività)"*. Una notifica al giorno, mai una per attività:
   il modo più rapido per farsi disattivare le notifiche è mandarne cinque.
   In `sw.js` servono i listener `push` e `notificationclick` (apre `orto.html#oggi`).
2. **Email** — stesso contenuto, per chi non installa la PWA. Gli indirizzi ci
   sono già in `users.json`.
3. **Export `.ics`** — `GET /api/garden/:userId/calendar.ics`: le attività
   finiscono nel calendario del telefono. Costa poco e funziona ovunque,
   iOS compreso.

Vincolo da comunicare in fase di attivazione: su iOS le notifiche push
funzionano **solo se l'app è stata aggiunta alla schermata Home** (iOS 16.4+).
Il flusso di attivazione deve rilevarlo e mostrare l'istruzione, altrimenti
l'utente attiva i promemoria e non riceve nulla.

### 2.5 Aggancio con gli acquisti

Il ciclo si chiude qui: alla conferma di un ordine, `ordine-confermato.html`
propone **"Aggiungi le colture al mio orto"** con la data precompilata (data di
consegna per le piantine, data odierna per i semi). Un tocco, e il diario è
popolato senza inserimento manuale — che è il vero motivo per cui le app di
giardinaggio vengono abbandonate dopo tre giorni.

---

## 3. Fasi di rilascio

| Fase | Contenuto | Perché in quest'ordine |
|---|---|---|
| **0 — Preparazione** | Estrarre `PACK_DATA` in `db/products.json`, `SerraAPI.getProducts()`, autenticazione su `server.js` | Debito che moltiplicherebbe il lavoro di ogni fase successiva |
| **1 — Piantine** | Varianti nel catalogo, carrello, ordine, fattura, stock | Valore immediato, nessuna dipendenza dalla fase 2 |
| **2 — Il mio orto (locale)** | `orto.html`, motore attività, viste Oggi/Colture/Diario, dati solo in `localStorage` | Testabile dagli utenti senza toccare il backend |
| **3 — Promemoria** | Push + cron + email + `.ics`, sincronizzazione `/api/garden` | Ha senso solo con dati reali nel diario |
| **4 — Raffinamento** | Statistiche di resa, stime personalizzate, "ricompra ciò che è andato bene" | Si nutre dei dati raccolti nelle fasi precedenti |

## 4. Rischi da tenere d'occhio

- **Autenticazione assente** su `server.js`: il diario è un dato personale, va
  protetto prima di esporlo. È il punto più critico dell'intero piano.
- **Merce viva**: le piantine hanno resi, mortalità in transito e una finestra
  di spedizione stretta. Serve una politica esplicita prima del primo ordine.
- **Precisione agronomica**: le date generate sono **stime**. Vanno presentate
  come tali ("verso il 20 giugno") e sempre modificabili dall'utente, altrimenti
  la prima previsione sbagliata fa perdere fiducia in tutta la sezione.
- **Fatica di inserimento**: se aggiungere una coltura richiede più di due tocchi,
  la sezione non viene usata. Import da serra e da ordine non sono un extra.
- **Notifiche**: una al giorno, aggregata, disattivabile per singola coltura.

---

*Prototipo navigabile associato: `prototipo/mio-orto.html` — motore attività e
varianti piantina funzionanti sui dati reali di `db/plants.json`.*

---

# 5. Integrazione nell'app — che cosa è stato fatto

Regola applicata: **la funzione è una pagina in più, non una modifica alle
esistenti.** Nessun calcolo di prezzo, quantità, riempimento aiuole o
compatibilità è stato toccato.

## 5.1 File aggiunti

| File | Ruolo |
|---|---|
| `orto.html` | La nuova pagina. Stessa intestazione, tema e selettore lingua delle altre. |
| `assets/js/serra-care-engine.js` | Motore delle cure. **Puro**: niente DOM, niente storage, niente lingua. Restituisce chiavi, non frasi. |
| `assets/js/orto.js` | Controller della pagina, con dizionario IT/RO proprio (stesso schema di `guida.js`). |
| `assets/css/pages/orto.css` | Stili della pagina, tutte le classi prefissate `orto-`. |
| `assets/css/pages/_fondazioni.css` | Le 2.973 righe di token, tema scuro, header e footer che **ogni bundle di pagina duplicava identiche**: ora estratte una volta e incluse in fase di build. Le pagine esistenti non sono state toccate. |
| `db/products.json` | Listino a due varianti, **generato**. |
| `scripts/build-products.mjs` | Lo genera. |

## 5.2 Modifiche a file esistenti — cinque righe in tutto

| File | Modifica | Rischio |
|---|---|---|
| `index.html` | Un `<a>` in più nella navigazione | Nessuno |
| `assets/js/base.js` | Due chiavi nuove: `nav.orto` in `it` e `ro` | Nessuno: nessuna chiave esistente toccata |
| `scripts/build-css.mjs` | Un bundle può indicare più sorgenti (array) | I bundle storici restano stringhe: **output verificato identico byte per byte** |
| `scripts/bump-version.mjs`, `check-html.mjs`, `check-source-documentation.mjs` | `orto.html` aggiunta agli elenchi | La nuova pagina entra sotto le stesse garanzie delle altre |
| `package.json` | Script `build:products` | Nessuno |

## 5.3 Il carrello dei semi resta esattamente com'era

Le pagine esistenti leggono `ois.cart` così:

```js
raw.map((i) => (typeof i === "string" ? { id: i, bustine: 1 } : i))
```

Aggiungere una riga `{id, variante:"piantina", qta:6}` avrebbe prodotto
`bustine: undefined` e quindi un totale **NaN**. Per questo le piantine vivono
in una chiave separata, `ois.cart.piantine.v1`: le pagine esistenti continuano a
leggere esattamente ciò che leggevano prima, e nulla può rompersi.

Il conteggio sul distintivo somma le due liste **solo in `orto.html`**. Verifica
eseguita con otto semi in carrello: 8 righe, totale 19,90 €, nessun `NaN`,
console pulita su home e configuratore.

## 5.4 Prezzi: una sola fonte di verità, senza toccare il codice

`PACK_DATA` resta dov'è, dentro `home.js`. `npm run build:products` lo **legge
dal sorgente** e genera `db/products.json`, che la nuova pagina consuma. Il
blocco `semi` viene rigenerato a ogni build; il blocco `piantina` (prezzi, mesi,
scorte) viene conservato tra un'esecuzione e l'altra, così le correzioni
editoriali non si perdono. Divergenza impossibile per costruzione, e nessuna
modifica alle pagine esistenti.

## 5.5 Tema e lingua

- **Tema**: `base.js` intercetta da solo i clic su `.theme-toggle` ed emette
  `serra:themechange`. La pagina non contiene una riga di codice sul tema: le
  serve solo il markup del pulsante. Le varianti scure stanno nel layer
  `dark-theme` con `html[data-theme="dark"]`, come nel resto dell'app.
- **Lingua**: stesso contratto delle altre pagine — `ois.lang`, evento `storage`
  per la sincronia tra schede, e blocco anti-lampeggio `serra-i18n-pending`.
  I **nomi e le note delle piante in romeno** arrivano da
  `SERRA_I18N.plants.ro`, i mesi da `SERRA_I18N.months`: la nuova pagina non
  ritraduce nulla di ciò che l'app traduce già. Date e valuta seguono la lingua
  (`ro-RO` / `it-IT`).
- Il motore restituisce **chiavi** (`tipo`, `notaKey`, `notaVars`): è il
  controller a tradurle. Aggiungere una lingua significa aggiungere un blocco al
  dizionario, non toccare l'agronomia.

## 5.6 Due trappole trovate durante l'integrazione

1. **`<nav>` è già impegnato.** In `base.css` il selettore di tag `nav` è la
   navigazione principale `position: fixed`. Un secondo `<nav>` per le viste
   interne ne ereditava il posizionamento e copriva l'intestazione. Le viste
   usano un `div role="tablist"`.
2. **Il tema scuro non vive in `base.css`.** I token scuri (`--bg: #091410` e
   compagni) stanno nel preambolo che ogni bundle di pagina duplica. Una pagina
   nuova senza quel preambolo resta chiara pur avendo i componenti scuri. Da qui
   l'estrazione in `_fondazioni.css`.
3. **`serra-configuratore.css` era stato modificato a mano.** Il bundle
   distribuito conteneva **328 righe assenti dal sorgente** `pages/configuratore.css`
   — badge della guida rapida, modale dei progetti — segno di una modifica fatta
   direttamente sul file generato. Qualunque `npm run build:css` le avrebbe
   cancellate. Sono state riportate nel sorgente e la rigenerazione ora produce
   un bundle **identico byte per byte** a quello in uso; gli altri quattro
   bundle erano già allineati. Da tenere a mente: i file `assets/css/serra-*.css`
   sono generati, si modifica solo `pages/`.

## 5.7 Assetto definitivo: due sezioni distinte

Scelta compiuta dopo il primo giro di prove: **si vende in un posto, si coltiva
in un altro.**

| Sezione | Che cos'è | Chiave dati |
|---|---|---|
| **Catalogo semi** (`index.html`) | Invariato. Continua a vendere bustine. | `ois.cart` |
| **Vivaio** (`vivaio.html`) | Nuova sezione: solo piantine già cresciute, disponibili nel mese corrente, vendute a vassoi da sei. | `ois.cart.piantine.v1` |
| **Il mio orto** (`orto.html`) | Aiuto alla coltivazione per ciò che l'utente **possiede già**. Nessun pulsante d'acquisto. | `serra.garden.v1`, `serra.inventory.v1` |

Perché il Vivaio è separato e non una variante dentro il catalogo: la merce è
viva. Ha una finestra stagionale stretta, un lotto minimo, una logistica
diversa (spedizione a inizio settimana, sospesa con le gelate) e va potuta
spegnere fuori stagione senza toccare il catalogo dei semi. Tenerla separata
rende esplicito tutto questo. Il prezzo da pagare — la stessa pianta compare in
due posti — si attenua con i rimandi incrociati già presenti in entrambe le
pagine.

### La dispensa: comprare venti e piantarne cinque

Fra acquisto e semina c'è un passaggio che le app di giardinaggio di solito
saltano: **quello che hai comprato non lo pianti tutto lo stesso giorno.**

1. L'ordine viene confermato (semi o piantine, indifferente).
2. In Area Personale compare il modulo *"Semi e piantine da piantare"*: un tocco
   e le righe dell'ordine entrano nella dispensa (`serra.inventory.v1`).
   L'operazione è idempotente — un ordine già importato mostra "Già nell'orto".
3. Ne *Il mio orto*, scheda **Da piantare**, ogni voce ha "Metti a dimora":
   si sceglie **quante** e **in che data**. Da venti piantine se ne mettono
   cinque oggi: la scheda mostra "15 di 20 ancora da mettere a dimora" e le
   cinque piantate diventano una coltura con il proprio calendario.
4. Le bustine di semi non si contano allo stesso modo: da una bustina si semina
   più volte, quindi restano disponibili e registrano il numero di semine
   finché non le si archivia con "Segna come finita".

Il legame regge anche senza ordini: "Aggiungi a mano" resta per chi ha semi
comprati altrove.

**Nessun ordine viene modificato:** il modulo dell'Area Personale
(`assets/js/account-orto.js`) è un file a sé caricato dopo `account.js`, legge
`SerraAPI.getOrders()` e scrive solo la propria chiave. Il checkout del Vivaio
crea ordini con i campi che l'Area Personale già legge (`bustine`, `prezzo`) più
`variante: "piantina"`, che le pagine vecchie ignorano senza accorgersene: la
ricevuta, la pagina di conferma e lo storico ordini funzionano invariati.

## 5.8 Intestazione: un solo modello per tutte le pagine

Con l'arrivo di Vivaio e Il mio orto ogni pagina si era portata dietro il
proprio elenco di voci: la home diceva "Semi", il Vivaio "Catalogo semi", il
Configuratore aveva ancora sette voci del vecchio impianto (Home, Abbinamenti,
Kit del mese, Contatti). Il risultato era un'intestazione diversa a ogni clic.

Il modello è ora unico su `index`, `configuratore`, `account`, `orto` e
`vivaio`:

- **Sinistra** — marchio.
- **Centro: dove vado.** Solo le quattro strade dell'app, stesse etichette,
  stesse icone, stesso ordine: 🌿 Catalogo semi · 🪴 Vivaio piantine ·
  🌱 Il mio orto (distintivo *gratis*) · 📐 Configuratore serra. Abbinamenti,
  Kit del mese e Contatti vivono nel piè di pagina.
- **Destra: le mie cose.** Tre blocchi e non cinque controlli sparsi: il
  pulsante profilo (`.nav-account-btn`), il gruppo preferenze
  (`.nav-prefs`, che raccoglie tema e lingua sotto un solo contorno) e il
  carrello.

Dettagli che vale la pena ricordare:

- Il profilo esiste due volte nel DOM: come voce di `#mainNav` (usata dal menu
  mobile, dove c'è spazio per l'etichetta estesa) e come pulsante nel cluster
  destro. Le regole in `base.css` ne mostrano una sola per volta — la voce di
  elenco sparisce sopra i 900px, il pulsante sotto.
- L'etichetta del pulsante profilo la scrive `SerraAPI.updateNavbarUser()`
  (`Accedi` / `Ciao, Nome`), non il dizionario: per questo ogni pagina la
  richiama in fondo alla propria funzione di traduzione.
- Sotto i 900px `.nav-prefs` diventa `display: contents`: i controlli tornano
  singoli e tutte le regole mobili già scritte continuano a valere invariate.
- Sotto i 660px tema e lingua **spariscono dall'intestazione**: vivono nella
  sezione "Preferenze" del menu a tendina, dove c'è spazio per etichetta e
  descrizione. In alto restano solo le tre cose che servono con il pollice —
  menu a sinistra, marchio al centro, carrello a destra. Le pagine Orto e
  Vivaio non avevano quel blocco nel menu (i suoi stili stavano solo nei
  pacchetti di home/account/configuratore): ora è in `_fondazioni.css`,
  insieme alla disposizione mobile dell'intestazione, così le cinque pagine
  sono identiche. La guida fa eccezione perché non ha il menu a tendina: lì i
  due controlli restano in alto.

## 5.9 Vivaio: prezzi, strumenti del listino, hero

- **Prezzo.** L'unità d'acquisto è il vassoio, quindi in evidenza c'è il prezzo
  del vassoio (`7,20 €`, "al vassoio · 6 piantine") e sotto, in un'etichetta
  più piccola, il prezzo unitario che serve solo a confrontare
  (`1,20 € a piantina · vaso ø7`).
- **Strumenti.** Sopra la griglia c'è una barra con ricerca, ordinamento
  (consigliate, nome, raccolta più vicina, tempo guadagnato, prezzo), filtri per
  famiglia botanica con il conteggio e la riga dei risultati con "Azzera
  filtri". Le famiglie mostrate sono solo quelle davvero disponibili nel mese.
- **Hero.** Le tre statistiche rispondono alle domande che uno si fa prima di
  scegliere: quante varietà ci sono, quando parte la spedizione, come si compra
  (vassoio da 6, minimo due). L'illustrazione mostra la piantina sollevata
  dall'alveolo del vassoio, con il pane di terra e le radici in vista.

## 5.10 Le illustrazioni mancanti delle piante

Il sintomo: in alcune schede del Vivaio il disegno della pianta non si vedeva.
Le cause erano due, e nessuna delle due era un file mancante.

1. **Quarantaquattro segnaposto.** In `assets/img/svg` convivevano le
   illustrazioni vere e la stessa foglia bianca di `leaf.svg` copiata decine di
   volte (238 byte esatti, identici). Su una foto chiara il segnaposto bianco
   era invisibile. Ora `npm run build:svg`
   (`scripts/build-plant-svg.mjs`) genera un disegno vero per ognuna: rosette,
   cespugli, radici, bulbi, baccelli, frutti e fiori composti con gli stessi
   mattoni delle illustrazioni esistenti (disco di terra, ombra, foglie a
   raggiera in due tonalità). Lo script **non tocca** i file già disegnati e
   usa un caso pseudo-casuale con seme derivato dal nome della pianta, così
   due esecuzioni producono byte identici.
2. **Contrasto.** Anche alcune illustrazioni vere sono chiarissime per natura
   (cavolfiore, cipollotto, sedano rapa) e sparivano su una foto luminosa.
   `.orto-card-svg` ha ora un dischetto scuro sfocato con un contorno chiaro:
   il disegno resta leggibile su qualunque foto, senza modificare i disegni.

Se in futuro si aggiunge una pianta nuova senza illustrazione, basta copiarci
`leaf.svg`, aggiungere la ricetta in `RICETTE` e lanciare `npm run build:svg`.

## 5.11 Cosa resta da fare

- Scorte reali delle piantine: oggi `stock` è `null` (non gestito) e la
  disponibilità dipende solo dal mese. Serve prima del primo ordine vero.
- Far leggere `db/products.json` anche a `home.js`, `configuratore.js` e
  `account.js`, eliminando le tre copie di `PACK_DATA`.
- Autenticazione su `server.js` prima di sincronizzare il diario: resta il
  prerequisito della fase 3.
