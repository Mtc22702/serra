# Audit UI/UX — Orto, Vivaio e Guida

Data: 16 agosto 2026  
Formato principale: smartphone 390 × 844 px  
Modalità: audit combinato UX, grafica e rischi di accessibilità visibili

## Evidenze

1. `01-orto-mobile-start.png` — stato iniziale dell'Orto.
2. `02-orto-mobile-modal.png` — selezione della coltura.
3. `03-vivaio-mobile-start.png` — introduzione del Vivaio.
4. `04-vivaio-mobile-catalog.png` — filtri e prima scheda prodotto.
5. `05-guida-mobile-start.png` — apertura della Guida.
6. `06-guida-mobile-content.png` — percorso Principiante.

## Valutazione sintetica

L'identità è già forte e coerente: palette naturale, titoli editoriali, superfici morbide e fotografie credibili. I problemi principali non sono di stile, ma di priorità: l'Orto nasconde l'azione più importante sotto contenuti introduttivi, il Vivaio dedica quasi un'intera schermata all'introduzione prima dei prodotti, la Guida sovrappone un indice fisso al contenuto e concentra troppe informazioni nella stessa pagina.

## Priorità

### P0 — Correggere l'indice della Guida

La regola globale `nav { position: fixed; }` rende fisso anche `.guide-toc`. Su smartphone l'indice copre il contenuto e mostra solo una parte delle quattro destinazioni. Limitare la regola alla navigazione dell'header e lasciare l'indice nel flusso; in alternativa trasformarlo in un unico controllo compatto e sticky.

### P1 — Portare l'azione primaria dell'Orto sopra la piega

Nel primo utilizzo, spiegazione in tre passi e grande stato vuoto precedono “Aggiungi una coltura”. Ridurre la spiegazione a una riga espandibile e mostrare subito un pulsante primario. Conservare la barra inferiore, ma semplificare stato e microtesti per evitare etichette su tre righe.

### P1 — Alleggerire la selezione delle 97 colture

Nella modale, chip orizzontali parzialmente tagliati e una griglia molto lunga aumentano la fatica. Rendere evidente lo scorrimento dei filtri, proporre prima “Di stagione” e “Recenti”, separare ricerca e filtri avanzati e mostrare un riepilogo della pianta selezionata prima della conferma.

### P1 — Accorciare l'ingresso del Vivaio

Su smartphone il catalogo comincia dopo quasi una schermata completa. Conservare titolo e valore principale, ma condensare statistiche e avviso di spedizione. Portare ricerca e prima scheda prodotto più in alto.

### P2 — Ridurre la ripetizione nelle schede del Vivaio

“Vassoio da 6”, prezzo per piantina, data di raccolta, giorni risparmiati e vincolo del vassoio sono utili, ma ripetuti in molti blocchi. Riunire prezzo e quantità in una sola riga, trasformare il vantaggio in un badge e spostare le informazioni secondarie in un'espansione “Dettagli”.

### P2 — Trasformare la Guida in un percorso orientato al compito

La selezione Principiante/Intermedio/Esperto è chiara, ma viene seguita da una pagina molto lunga che ripete concetti. Aprire con “Cosa vuoi fare?” — progettare, comprare, coltivare, gestire account — e mantenere il livello come filtro secondario. Usare capitoli comprimibili e un indicatore di avanzamento.

### P2 — Uniformare icone e microtesti

Le tre pagine mescolano fotografie, illustrazioni curate ed emoji di sistema. Adottare una sola famiglia di icone per azioni e stati. Ridurre inoltre testi secondari sotto 12–13 px e mantenere i controlli interattivi ad almeno 44 px.

## Punti di forza

- Linguaggio visivo coerente e riconoscibile.
- Gerarchia tipografica generalmente forte.
- CTA del Vivaio chiare e adatte al tocco.
- Strutture semantiche solide: titoli ordinati, tab con ruoli e nomi accessibili.
- Buona comunicazione di stagionalità, quantità e vantaggio temporale.
- Navigazione inferiore dell'Orto utile per tornare rapidamente alle tre aree.

## Limiti

Le schermate permettono di valutare gerarchia, reflow e chiarezza, ma non dimostrano conformità WCAG completa. Restano da provare VoiceOver su iPhone, navigazione da tastiera completa, contrasto numerico dei token e comportamento con zoom testo al 200%.
