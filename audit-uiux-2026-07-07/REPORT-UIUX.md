# Audit UI/UX Serra - 2026-07-07

## Ambito

Verifica visiva e UX delle pagine principali:

- Home / catalogo: `index.html`
- Configuratore: `configuratore.html?livello=novizio&guided=1`
- Account: `account.html`

Viewport verificati:

- Desktop: 1440 px
- Tablet: 768 px
- Smartphone: 430 px

## Evidenze salvate

- `viewport-home-desktop-top.png`
- `viewport-home-mobile-top.png`
- `viewport-config-desktop-top.png`
- `viewport-config-tablet-top.png`
- `viewport-config-mobile-top.png`
- `state-config-mobile-persona-open.png`
- `state-config-tablet-persona-open.png`
- `viewport-account-desktop-top.png`
- `viewport-account-mobile-top.png`
- `state-home-mobile-menu-open.png`
- `capture-metrics.json`
- `viewport-notes.json`

## Valutazione sintetica

L'app ha una direzione visiva forte e riconoscibile: palette agricola coerente, buon uso di immagini/prodotto reale nel configuratore, bottoni chiari, card leggibili e una navigazione abbastanza consistente tra pagine.

La criticità principale non è la bellezza, ma la densità prima dell'azione: su smartphone ci sono molti livelli prima che l'utente arrivi alla parte operativa. Questo si vede soprattutto nel configuratore, dove guided intro, percorso utente, wizard, pannello serra e vista dall'alto competono nello stesso primo scroll.

## Modello utenti da preservare

L'app è correttamente costruita attorno a tre intenzioni diverse:

- Principiante: sa poco o niente di colture, vuole essere guidato e arrivare con sicurezza all'acquisto dei semi.
- Intermedio: conosce già qualcosa, vuole partire da un piano utile ma poter personalizzare contenuto e quantità nella serra prima dell'acquisto.
- Esperto: vuole controllo pieno, parte da una serra vuota e la riempie a mano, oppure può saltare il configuratore e aggiungere semi direttamente dal catalogo in home.

Questa distinzione va mantenuta, ma resa più immediata: non tre esperienze visivamente pesanti, bensì tre livelli di controllo progressivo.

## Findings prioritari

### 1. Configuratore mobile: guided intro ancora troppo alta

Evidenza: `viewport-config-mobile-top.png`, `state-config-mobile-persona-open.png`

La versione chiusa è migliorata, ma occupa ancora circa 200 px e porta l'utente a leggere titolo, tag, riepilogo, profilo e cambio profilo prima del progetto. Quando il profilo viene aperto, la lista dei tre livelli spinge la parte operativa molto in basso.

Raccomandazione:

- Rendere la guided intro mobile una "summary bar" compatta.
- Tenere in alto solo: titolo breve, 3 chip metrici, profilo attuale.
- Spostare il cambio profilo in una tendina chiusa più leggera.
- Aprire il selettore profilo come righe compatte, non card alte.
- Nascondere descrizioni lunghe nella tendina e mostrare solo nome + micro-hint.

### 2. Configuratore desktop: apertura guidata salta l'intro

Evidenza: `viewport-config-desktop-top.png`

Con `guided=1`, la pagina desktop atterra direttamente sulla serra, con la parte introduttiva già sopra la viewport. È efficiente, ma l'utente perde contesto e non vede subito dove cambiare profilo/misure.

Raccomandazione:

- Su desktop, far atterrare con la guided intro visibile almeno parzialmente.
- In alternativa, mostrare una mini barra sticky "Principiante - 3x5 m - Giugno" sopra la serra.

### 3. Wizard mobile utile, ma troppo competitivo

Evidenza: `viewport-config-mobile-top.png`

La barra a 3 step chiarisce il percorso, però subito dopo una guided intro già informativa diventa ridondante. Il primo viewport contiene due guide: intro profilo e wizard.

Raccomandazione:

- Se la guided intro rimane, rendere il wizard più sottile su mobile.
- Opzione migliore: lasciare il wizard come navigazione sticky, ma ridurre l'intro a puro riepilogo.

### 4. Header mobile molto carico

Evidenza: `viewport-home-mobile-top.png`, `viewport-account-mobile-top.png`

Il gruppo menu, tema, lingua e carrello è funzionale ma pesante. Su 430 px funziona, ma lascia poco respiro e su dispositivi più stretti rischia di diventare dominante.

Raccomandazione:

- Valutare se tema e lingua possono entrare nel menu mobile.
- Tenere sempre visibili solo menu e carrello.
- Oppure trasformare lingua/tema in un solo pulsante "preferenze".

### 5. Home mobile: CTA buona, cookie banner invasivo

Evidenza: `viewport-home-mobile-top.png`, `state-home-mobile-menu-open.png`

La home mobile comunica bene: headline, preview configuratore e CTA sono chiare. Però il cookie banner occupa una fascia fissa in basso e compete con le CTA del configuratore.

Raccomandazione:

- Rendere il banner cookie mobile meno alto e più separato dal contenuto.
- Usare un pulsante primario più evidente e un link secondario testuale per "Solo essenziali".

### 6. Menu mobile leggibile, ma visivamente pesante

Evidenza: `state-home-mobile-menu-open.png`

Il menu aperto è chiaro e ha target grandi. L'effetto blur sotto è molto presente e, insieme al cookie banner, genera una schermata un po' affollata.

Raccomandazione:

- Ridurre blur/opacità dello sfondo.
- Aggiungere una piccola intestazione o separatore tra navigazione e azioni globali, se tema/lingua vengono spostati nel menu.

### 7. Account: buon layout, ma contenuto demo troppo visibile

Evidenza: `viewport-account-desktop-top.png`, `viewport-account-mobile-top.png`

La pagina account è pulita e leggibile. Il box "Utenti di test pronti" però sembra contenuto tecnico e riduce fiducia in un'esperienza cliente.

Raccomandazione:

- Nasconderlo in produzione.
- Se serve in demo, renderlo collassabile o dietro un badge "Demo".

### 8. Accessibilità: target quasi sempre buoni, ma alcuni controlli restano sotto 44 px

Evidenza: `capture-metrics.json`

La maggior parte dei bottoni principali rispetta target confortevoli. Alcuni controlli secondari, select lingua e social footer, restano sotto 44 px in altezza/larghezza su certi breakpoint.

Raccomandazione:

- Portare controlli interattivi ricorrenti a 44x44 px dove possibile.
- Mantenere focus visibile su summary/dropdown e card profilo.
- Verificare tastiera e screen reader separatamente: dallo screenshot non si può dichiarare piena conformità WCAG.

## Proposta concreta per la guided intro

Su smartphone la card potrebbe diventare:

1. Riga titolo: icona + "Configuratore Serra" + matita/impostazioni.
2. Riga chip scrollabile: clima, mese, dimensioni, raccolto.
3. Riga profilo chiusa: "Principiante - percorso guidato" + "Cambia" + chevron.
4. Tendina aperta: tre righe alte 48-56 px con nome profilo, microcopy di una riga, stato attivo.

Questo eliminerebbe circa 60-120 px nello stato chiuso e oltre 150 px nello stato aperto, mantenendo la stessa funzione.

## Comportamento consigliato per profilo

Principiante:

- Primo messaggio: "Ti preparo una serra pronta e ti porto alla lista semi."
- Configuratore già compilato.
- Personalizzazione minima e sicura: modifica misure, clima, mese, riduci/aumenta quantità, elimina colture.
- CTA principale sempre orientata all'acquisto: "Vedi lista semi" / "Aggiungi semi al carrello".

Intermedio:

- Primo messaggio: "Parti da un piano pronto, poi scegli cosa cambiare."
- Configuratore precompilato ma modificabile.
- Pannello colture più visibile.
- CTA bilanciata: "Personalizza colture" e poi "Vai alla lista semi".

Esperto:

- Primo messaggio: "Parti da una serra vuota o aggiungi semi dal catalogo."
- Configuratore senza riempimento automatico.
- Strumenti manuali e catalogo più esposti.
- CTA primaria: "Aggiungi colture" / "Apri catalogo".

In home, il catalogo diretto dovrebbe essere più chiaramente presentato come strada da esperto o da acquisto rapido, mentre il configuratore resta la strada consigliata per principiante e intermedio.

## Priorità consigliata

1. Compattare guided intro e selettore profilo mobile.
2. Alleggerire header mobile spostando lingua/tema nel menu o in preferenze.
3. Ripensare atterraggio desktop del configuratore guidato.
4. Snellire cookie banner mobile.
5. Nascondere o collassare credenziali demo nell'account.
6. Rifinire target size e focus state dei controlli secondari.

## Limiti

Audit basato su rendering visivo e DOM di base. Non include test completi con screen reader, navigazione da tastiera end-to-end, performance Lighthouse o test utente reale.
