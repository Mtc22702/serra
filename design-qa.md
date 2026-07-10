# Design QA — percorsi Principiante, Intermedio, Esperto

## Source visual truth

- `audit-uiux-2026-07-10/02-catalogo-desktop.png`
- `audit-uiux-2026-07-10/07-home-smartphone.png`
- `audit-uiux-2026-07-10/09-configuratore-smartphone.png`
- Brief aggiornato: mantenere la serra come elemento immersivo principale e conservare scroll intenzionali, differenziati per i tre profili.

## Implementation evidence

- `qa-uiux-2026-07-10/home-desktop.png` — 1440×1000, tema chiaro
- `qa-uiux-2026-07-10/home-tablet.png` — 820×1180, tema chiaro
- `qa-uiux-2026-07-10/home-smartphone.png` — 390×844, tema chiaro
- `qa-uiux-2026-07-10/config-principiante-desktop.png` — 1440×1000
- `qa-uiux-2026-07-10/config-intermedio-tablet.png` — 820×1180
- `qa-uiux-2026-07-10/config-intermedio-smartphone.png` — 390×844
- `qa-uiux-2026-07-10/config-esperto-smartphone.png` — 390×844
- `qa-uiux-2026-07-10/catalogo-smartphone-chiuso.png` e `catalogo-smartphone-aperto.png`

## Full-view comparison evidence

- `qa-uiux-2026-07-10/compare-home-desktop.png`
- `qa-uiux-2026-07-10/compare-home-smartphone.png`
- `qa-uiux-2026-07-10/compare-config-smartphone.png`

## Focused region comparison

Non è stato necessario creare ulteriori crop: nelle comparazioni affiancate la hero, i tre ingressi, il banner di percorso, i controlli del configuratore e la planimetria risultano leggibili alla scala utilizzata.

## Required fidelity surfaces

- Fonts and typography: Fraunces e Outfit preservati; gerarchia coerente con il prodotto. Titoli e descrizioni non risultano troncati ai tre breakpoint.
- Spacing and layout rhythm: la planimetria resta la superficie principale. Desktop e tablet mostrano tutti i percorsi; su smartphone il terzo percorso continua naturalmente sotto la prima schermata senza overflow orizzontale.
- Colors and visual tokens: palette verde/crema e accenti dei tre profili preservati. Il banner usa verde, oro e terracotta come codifica secondaria, accompagnata da testo esplicito.
- Image quality and asset fidelity: anteprima e planimetria originali sono state riutilizzate senza sostituzioni o asset fittizi; la serra è più grande nella hero desktop e resta dominante nel configuratore.
- Copy and content: ogni percorso dichiara risultato e passo successivo; traduzioni italiane e rumene verificate.
- Icons: asset vegetali esistenti preservati; nessuna nuova icona disegnata come placeholder.

## Interaction and accessibility checks

- Principiante: arrivo contestuale sulla serra, CTA “Vai ai semi” apre e porta alla lista acquisto.
- Intermedio: piano automatico visibile, CTA “Personalizza” apre il pannello colture.
- Esperto: serra vuota visibile, CTA “Aggiungi colture” apre e porta al catalogo completo del configuratore.
- Catalogo mobile: pannello filtri chiuso di default e apertura verificata.
- Hero Intermedio: apertura della preconfigurazione con profilo corretto verificata.
- Lingua italiana/rumena verificata.
- Console: nessun errore o warning nella home verificata.
- Zoom browser riabilitato; controlli header mobile a 44 px; campo ricerca e pulsanti aggiunta con nomi accessibili specifici.
- Nessun overflow orizzontale rilevato a 390 e 820 px.

## Comparison history

### Iterazione 1

- [P1] I tre profili erano nascosti dietro una CTA generica e non comunicavano i percorsi logici.
- [P1] Lo scroll del configuratore atterrava sulla planimetria senza spiegare la destinazione.
- [P1] I filtri mobile occupavano una lunga sequenza prima dei risultati.
- [P1] Zoom browser disabilitato e controlli header sotto 44 px.
- [P2] Pulsanti `+` del catalogo privi del nome della coltura.

Fix: profili sempre visibili nella hero, serra ingrandita, banner contestuale dinamico, CTA per il passo successivo, filtri mobile richiudibili, viewport accessibile, target da 44 px e nomi accessibili.

### Iterazione 2

- [P1] Il primo banner desktop era troppo largo per la colonna della serra e la CTA risultava compressa.
- [P2] La prima composizione della hero desktop era più alta del necessario.

Fix: banner disposto su due righe con avanzamento a tutta larghezza; hero ridotta a 528 px, mantenendo la planimetria come area dominante.

### Iterazione 3 — navigazione unificata

- [P1] Journey Bar e Wizard Bar ripetevano la stessa progressione, sottraendo spazio alla serra e creando due riferimenti concorrenti.
- [P1] La Journey Bar iniziale mostrava l'avanzamento ma non permetteva di raggiungere direttamente le tre fasi.

Fix: Wizard Bar rimossa; i tre passaggi sono diventati pulsanti nella Journey Bar, con stato attivo sincronizzato allo scroll e navigazione verso impostazioni, serra/colture e lista semi. La barra resta compatta e sticky all'interno della sola area serra.

Verifica: percorso Intermedio a 1440×1000, Principiante a 390×844 ed Esperto a 820×1180; CTA e tre passaggi portano alle destinazioni corrette, nessun overflow orizzontale e nessun errore in console.

### Iterazione 4 — impostazioni iniziali

- [P1] “Le tue scelte / Alegerile tale” non comunicava chiaramente che il controllo riapriva i dati inseriti prima del configuratore.
- [P1] Il contenuto aperto mescolava parametri iniziali e stima del raccolto; clima, mese e dimensioni erano pillole senza etichette.
- [P2] Su smartphone il selettore del percorso nascondeva la propria etichetta, rendendo meno chiaro il secondo blocco del pannello.

Fix: rinominato il controllo “Impostazioni iniziali / Setări inițiale”, aggiunti riepilogo dinamico e CTA “Modifica”; nel pannello aperto i dati sono organizzati in tre card etichettate e separati dal “Percorso scelto”. Il testo spiega che sono le scelte fatte prima di entrare nel configuratore.

Evidenza iniziale: `audit-settings-2026-07-10/01-closed-desktop.png`, `audit-settings-2026-07-10/02-open-desktop.png`.

Verifica finale: `qa-settings-2026-07-10/01-open-desktop.png`, `02-closed-desktop.png`, `03-closed-mobile.png`, `04-open-mobile.png`, `05-open-mobile-ro.png`, `06-closed-tablet.png`, `07-open-tablet.png`; confronto affiancato `compare-open-desktop.png`. Nessun overflow a 390/820 px, italiano e rumeno verificati, azione “Modifica dati” funzionante e nessun errore in console.

### Iterazione 5 — persona card della hero

- [P1] In light mode i titoli “Începător / Intermediar / Expert” erano verde scuro sopra card verdi trasparenti, con contrasto insufficiente.
- [P1] Le card mobili erano alte circa 51 px e titolo, descrizione e freccia avevano una gerarchia troppo debole.
- [P2] La sola freccia non rendeva esplicita l'azione associata a ogni percorso.

Fix: card ad alto contrasto con superficie chiara e tinta specifica per profilo in light mode; superfici profonde, bordi colorati e testo chiaro in dark mode. Titoli portati a 16 px su mobile, descrizioni più leggibili, icone ingrandite e CTA “Apri / Deschide” sempre visibile. Il gruppo dei livelli ha ora un contenitore proprio e target da almeno 66 px.

Evidenza iniziale: `audit-persona-2026-07-10/01-mobile-light.png`, `02-mobile-dark.png`.

Verifica finale: `qa-persona-2026-07-10/01-mobile-dark-ro.png`, `02-mobile-light-ro.png`, `03-desktop-light-ro.png`, `04-tablet-light-ro.png`; confronto `compare-mobile-light.png`. Nessun overflow a 430/820/1440 px e nessun errore in console.

### Verifica finale

- Nessun P0/P1/P2 residuo nelle viste e interazioni verificate.
- P3: su 390×844 il terzo percorso è parzialmente sotto la prima schermata; è accettato perché preserva la grande anteprima immersiva richiesta e rimane raggiungibile con uno scroll naturale minimo.

final result: passed
