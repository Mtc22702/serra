# Serra - scheda rapida per analisi future

Questo file serve a ridurre token nelle prossime sessioni: leggilo prima di aprire qualsiasi file sorgente. Contiene la mappa operativa del progetto e le regole pratiche da rispettare.

## Scopo del progetto

`serra` è una web app statica **multi-pagina**, in italiano e rumeno, per pianificare un orto in serra. L'utente naviga da una landing page editoriale al configuratore grafico; lì sceglie dimensioni, mese, zona climatica e serra fredda/riscaldata e l'app propone colture adatte, calcola aiuole, resa stimata, abbinamenti e visualizzazioni tematiche.

Non usa framework o librerie: solo HTML, CSS, JavaScript e SVG locali.

## Struttura delle pagine

| Pagina | Scopo |
|---|---|
| `index.html` | Landing editoriale: stagione, abbinamenti, kit, contatti, nav verso configuratore |
| `configuratore.html` | App grafica: modale avvio, stage SVG, pannelli colture, impostazioni, stampa |
| `PIANO_ECOMMERCE.html` | Bozza/planning interno, non parte della UX utente |
| `__print_verify.html` | Utility per verifica stampa, non parte della UX utente |

## File principali e responsabilità

- `assets/js/version.js`: unica fonte di verità della versione (`const SERRA_VERSION`). Caricato per primo da entrambe le pagine.
- `assets/js/i18n.js`: testi condivisi tra le due pagine (mesi, nomi piante in rumeno, stringhe configuratore). Espone `window.SERRA_I18N` tramite IIFE.
- `assets/js/index.js`: tutta la logica della landing (`index.html`). Contiene la propria copia di `PLANTS`, `BYID`, `KITS`, `TIPO`, `TIPO_STYLE`, `PHOTO_MAP`, `cart`, rendering sezioni, carrello, dettaglio pianta, cookie banner, form contatti, i18n locale.
- `assets/js/script.js`: tutta la logica del configuratore (`configuratore.html`). Contiene la propria copia di `PLANTS`, stato `state`, disegno SVG, calcolo layout aiuole, rendering pannelli, eventi, preset, persistenza.
- `assets/css/index.css`: stile della landing page.
- `assets/css/style.css`: stile del configuratore. Layout desktop a 3 colonne; sotto `1080px` diventa layout mobile; sotto `640px` compatta stage e controlli.
- `sw.js`: service worker con precache degli asset principali.
- `manifest.json`: PWA manifest.
- `assets/img/svg/*.svg`: icone colture e logo (asset statici da precacheare se aggiunti).
- `assets/img/photo/*.jpg`: foto reali delle colture, usate nel configuratore tramite `PLANT_PHOTOS`.

## Versioning e cache busting

`version.js` esporta `SERRA_VERSION` (es. `"20260604-47"`). Entrambe le pagine fanno:

```js
window.SERRA_ASSET_VERSION = SERRA_VERSION;
```

e usano quel valore nei `?v=` dei link CSS/JS e nelle `<link>` `href` del manifest e apple-touch-icon.

`configuratore.html` inietta il CSS via `document.write` con cache busting. `index.html` ha il link diretto.

Quando aggiungi o modifichi asset: **aggiorna solo `SERRA_VERSION` in `version.js`** (e `VERSION` in `sw.js` se cambi file precachati).

## Stato e persistenza (configuratore)

Lo stato runtime vive in `state` dentro `assets/js/script.js`:

- `lang`: `"it"` o `"ro"`.
- `zona`: `"freddo"`, `"temperato"`, `"caldo"`.
- `riscaldata`: `boolean` (non la stringa `"si"`/`"no"` di versioni precedenti).
- `larghezza`, `lunghezza`: metri interni della serra.
- `path`: larghezza camminamento in cm (default 60).
- `mese`: indice mese 1-12 (non 0-11).
- `beds`: aiuole/colture inserite.
- `overlay`: `""`, `"sole"`, `"acqua"`, `"altezza"`.
- `selected`: id numerico della coltura selezionata, `-1` se nessuna.

La persistenza usa `localStorage` con chiave `serra.config.v1`, gestita da `readSavedConfig()` e `saveConfig()`.

## Dati colture

Il catalogo `PLANTS` è **duplicato** in `index.js` (per la landing) e `script.js` (per il configuratore). Se aggiungi una pianta, aggiornala in entrambi i file.

Ogni coltura ha:

- `id`, `nome`, `arch` (stile grafico del glifo SVG)
- `d`: distanza tra piante in cm
- `h`: `"bassa"`, `"media"`, `"alta"`
- `sole`, `acqua`
- `gg`: giorni raccolta, `0` per perenni/aromatiche
- `mesi`: mesi base per zona temperata (indice 0-11)
- `amiche`, `nemiche`
- `resa`
- `nota`
- `col`: palette colori usata dal renderer SVG

Se aggiungi una pianta aggiorna anche:

- `PLANT_RO` / `window.SERRA_I18N.plants.ro` in `i18n.js`
- `FRUIT_EMOJI` in `script.js`
- `PLANT_PHOTOS` in `script.js` (foto opzionale)
- `PLANT_DESC` in `script.js` (descrizione pannello)
- eventuali `PRESETS` in `script.js`
- asset SVG se serve
- `sw.js` se aggiungi file in `assets/img/`

## Funzioni chiave in `script.js` (configuratore)

**Bootstrap**
- `initConfig()`: carica config salvata, applica lingua, mostra modale se primo avvio.
- `initEvents()`: collega tutti gli event listener; contiene `applyPath()` per il camminamento.

**i18n**
- `tx(key, vars)`, `plantText(plant, field)`, `plantNameById(id)`: helper testi.
- `applyLanguage()`: aggiorna tutti i testi statici e label quando cambia lingua.
- `syncLanguageControls()`, `syncClimateControls()`, `syncSizeControls()`: allineano i controlli UI allo stato.
  - **Nota**: `syncSizeControls()` salta l'elemento attivo (`document.activeElement`) per non sovrascrivere l'input mentre l'utente digita.

**Layout aiuole**
- `layoutColumns(Wi)`, `usableBedWidth()`, `computeLayout()`: geometria in centimetri reali.
- `autoBalanceLayout()`, `shrinkOverflowToFit()`, `sortBedsForLayout()`: aggiustano quantità e ordine.
- `smartLayout()`, `riordina()`: riorganizzazione intelligente delle aiuole.
- `expandAutoFillToSpace()`, `autoFill()`, `loadPreset(key)`: riempimento automatico e preset.
- Layout `"fila"`: usato per piante che occupano una colonna intera (attivo solo se serra ≥ 480 cm di lunghezza e più colonne).

**Rendering SVG**
- `buildScene()`: costruisce la scena SVG completa.
- `glassStructure()`, `soilSpecks()`, `gravelSpecks()`, `dirtPathSpecks()`, `grassSpecks()`: elementi visivi della serra.
- `glyph(plant, r, rng)`: disegna una singola piantina.
- `overlayStyleForPlant()`, `overlayShape()`: overlay tematici (sole/acqua/altezza).

**Rendering pannelli**
- `render()`: punto centrale di aggiornamento UI.
- `renderBeds()`, `renderDetail()`, `renderWarnings()`, `renderSummary()`, `renderPrintSummary()`: pannelli laterali, dettagli, avvisi, riepilogo e stampa.
- `updatePanelToggle()`, `updateAllPanelToggles()`: gestione pannelli collassabili.

**Gestione colture**
- `addPlant(id)`, `removePlantById(id)`: aggiungono/rimuovono colture dallo stato.
- `rememberSelection()`, `restoreSelection(plantId)`: mantengono la selezione durante il re-render.
- `effectiveMonths(plant)`, `seminabili()`: filtrano le colture per mese, zona e riscaldamento.

## Funzioni chiave in `index.js` (landing)

- `render()`: aggiorna tutte le sezioni della landing.
- `renderHero()`, `renderCalendarStrip()`, `renderEditorialPlants()`, `renderAbbinamenti()`, `renderKit()`, `renderFooter()`: sezioni specifiche.
- `toggleCart()`, `addPairToCart()`, `addKitToCart()`, `removeFromCart()`, `updateCartUI()`: gestione carrello.
- `openDetail(id)`, `closeDetail()`: modale dettaglio pianta.
- `setZone()`, `toggleHeated()`, `setMese()`: aggiornano le preferenze.
- `savePrefs()`, `loadPrefs()`: persistenza preferenze landing su `localStorage`.
- `applyLang(lang)`, `setLang(lang)`, `t(key)`: i18n della landing.
- `initCookieBanner()`, `acceptCookies()`, `rejectCookies()`: banner cookie GDPR.
- `submitContactForm(e)`: gestione form contatti.

## Regole di modifica

1. Mantieni il progetto senza build step: niente dipendenze se non richieste.
2. Dopo modifiche a qualsiasi file, aggiorna `SERRA_VERSION` in `version.js` e `VERSION` in `sw.js`.
3. Se tocchi un testo visibile, aggiorna sia le stringhe `it` sia `ro` (in `i18n.js` per testi condivisi, nei rispettivi file JS per testi specifici di pagina).
4. Se aggiungi controlli HTML al configuratore, collega eventi in `initEvents()` e traduzioni in `applyLanguage()`.
5. Se cambi layout o dimensioni, controlla desktop, tablet e mobile: stage SVG e pannelli non devono sovrapporsi.
6. Le formule di layout ragionano in centimetri reali; evita conversioni casuali in pixel fuori dalle funzioni dedicate.
7. Non duplicare dati coltura nel DOM: la fonte autorevole è `PLANTS` (ma ricorda che esiste in due copie JS).
8. I campi input numerici che chiamano `syncSizeControls()` devono restituire subito se `e.target.value === ""` per non bloccare la digitazione su mobile.

## Verifica rapida consigliata

```sh
cd serra
python3 -m http.server 4184
```

- Landing: `http://127.0.0.1:4184/index.html`
- Configuratore: `http://127.0.0.1:4184/configuratore.html`

Check manuali minimi sul configuratore:

- primo avvio con modale iniziale (zona + dimensioni)
- cambio lingua IT/RO
- cambio mese / zona / riscaldata
- stepper `+`/`−` su larghezza e lunghezza
- digitazione diretta dimensioni (anche su mobile: cancella e riscrivi)
- `Auto riempi`, aggiunta/rimozione coltura
- preset da `inPreset`
- overlay sole/acqua/altezza
- pannelli collassabili
- stampa
- refresh dopo aggiornamento versione (cache busting)

Check manuali minimi sulla landing:

- cambio mese, zona, serra riscaldata
- aggiunta pianta al carrello
- apertura dettaglio pianta
- sezione abbinamenti e kit
- form contatti
- cambio lingua

Check sintattico JS:

```sh
node --check assets/js/script.js
node --check assets/js/index.js
node --check assets/js/i18n.js
```

## Lettura minima per task comuni

- **Solo stile/responsive configuratore**: `style.css` intorno alle classi coinvolte e `@media`.
- **Solo stile/responsive landing**: `index.css` intorno alle classi coinvolte.
- **Testi o lingua**: `i18n.js` → `applyLanguage()` in `script.js` → `applyLang()` in `index.js`.
- **Nuova coltura**: `PLANTS` in entrambi i file JS + `FRUIT_EMOJI`, `PLANT_PHOTOS`, `PLANT_DESC`, `PRESETS` in `script.js` + `i18n.js` per traduzioni.
- **Layout aiuole**: `computeLayout()`, `autoBalanceLayout()`, `shrinkOverflowToFit()`, `buildScene()` in `script.js`.
- **PWA/cache**: `version.js` → `VERSION` in `sw.js` → link `?v=` in entrambe le pagine HTML.
- **Nuova sezione landing**: aggiungi funzione `render*()` in `index.js`, markup in `index.html`, stile in `index.css`.
