# Review UI/UX e grafica — Orto in Serra

Data: 10 luglio 2026

## Perimetro

- Home e accesso al catalogo
- Catalogo semi
- Configuratore
- Viewport: desktop 1440×1000, tablet 820×1180, smartphone 390×844
- Tema verificato: chiaro

## Verdetto

La base grafica è solida e riconoscibile: verde/crema, fotografie delle colture, serif editoriale e superfici morbide costruiscono un'identità coerente. Il principale limite è la gerarchia dell'esperienza: la home propone molti percorsi contemporaneamente e il configuratore, soprattutto su tablet e smartphone, mostra subito una serra molto alta nascondendo titolo, progressione e controlli.

## Passi osservati

1. Home desktop — buona, con qualche sovraccarico nella navigazione.
2. Consenso cookie desktop — discreto, ma visivamente dominante.
3. Catalogo desktop — buono e denso; leggibilità e azioni possono essere più esplicite.
4. Configuratore desktop — critico all'ingresso per lo scroll automatico.
5. Home tablet — buona, ma troppo lunga prima del catalogo.
6. Configuratore tablet — critico: la serra occupa quasi tutta la prima schermata.
7. Home smartphone — buona identità, ma header compresso e hero molto alto.
8. Menu smartphone — buono e chiaro; da verificare focus e blocco dello scroll.
9. Catalogo smartphone — discreto; i filtri occupano troppo spazio verticale.
10. Configuratore smartphone — critico: manca il contesto iniziale e la planimetria domina la schermata.

## Miglioramenti prioritari

### P0 — da correggere prima

1. Eliminare lo scroll automatico del configuratore. Dopo circa mezzo secondo la pagina passa da `scrollY ≈ 0` a 355–388 px e nasconde titolo, passaggi e impostazioni. L'utente deve entrare dall'inizio della pagina; un eventuale “Vai al piano” deve essere esplicito.
2. Rendere il configuratore mobile più compatto. La planimetria dovrebbe occupare al massimo 55–65svh, con una modalità “Apri a tutto schermo / Zoom” per i dettagli. Prima della serra mostrare mese, dimensioni, stato del piano e azione successiva.
3. Ripristinare lo zoom del browser: rimuovere `maximum-scale=1.0` e `user-scalable=no` dal meta viewport.
4. Dare nomi accessibili alle azioni ripetute. I pulsanti `+` del catalogo devono diventare, per esempio, “Aggiungi Carota al carrello”; il campo di ricerca deve avere un'etichetta accessibile visibile o associata.
5. Portare i controlli touch dell'header ad almeno 44×44 px. Sullo smartphone hamburger, tema, lingua e carrello misurano circa 38–40 px di altezza.

### P1 — miglioramenti ad alto impatto

6. Semplificare la navigazione desktop. Sette voci più tema, lingua e carrello creano una barra affollata. Raggruppare Catalogo, Abbinamenti e Kit sotto “Scopri”; mantenere Configuratore come voce primaria.
7. Accorciare la home responsive. Su tablet e smartphone il blocco del configuratore occupa quasi un'intera schermata e spinge il catalogo troppo in basso. Ridurre spaziatura verticale, altezza dell'anteprima e testo descrittivo.
8. Rendere inequivocabile la scelta iniziale: “Progetta la serra” come CTA primaria e “Sfoglia i semi” come secondaria. Evitare due pulsanti con peso quasi equivalente.
9. Trasformare i filtri mobile in una barra compatta e persistente: “Filtri (1)”, “Ordina”, chip attivi e apertura in bottom sheet. La sequenza Clima → Tipo → Ricerca è chiara, ma troppo lunga su 390 px.
10. Aumentare la leggibilità del catalogo desktop. Conservare le due colonne, ma alzare corpo testo e metadati, dare più respiro alle righe e rendere prezzo + azione un gruppo più evidente.
11. Uniformare le icone. Le emoji danno calore, ma insieme a icone lineari e pittogrammi producono stili diversi. Usare una sola libreria per navigazione e comandi; lasciare le emoji alle categorie botaniche.
12. Ridurre il peso del banner cookie: testo più breve, pulsanti allineati e contrasto verificato; su mobile usare una card compatta senza coprire l'azione principale.

### P2 — rifiniture

13. Ridurre la decorazione vegetale dietro ai testi su schermi piccoli: è piacevole, ma può rendere il contrasto instabile.
14. Rendere più evidente lo stato selezionato nei filtri senza affidarsi solo al colore, aggiungendo check o bordo più marcato.
15. Nel menu mobile inserire una CTA finale “Apri il configuratore” e separare le azioni di account dalle sezioni editoriali.

## Punti di forza da preservare

- Identità cromatica coerente e adatta al prodotto.
- Fraunces + Outfit: gerarchia tipografica distintiva e calda.
- Fotografie reali delle colture e planimetria del configuratore: aumentano comprensione e fiducia.
- Menu mobile leggibile, con overlay chiaro e stato aperto ben riconoscibile.
- Feedback di stato nel catalogo: conteggio risultati, chip attivi, ordinamento e scelta griglia/compatta.

## Accessibilità: rischi e limiti

- Lo zoom disabilitato è un problema confermato nel markup.
- Target touch sotto 44 px e nomi `+` ripetuti sono rischi confermati dalle viste e dalla struttura accessibile.
- Contrasto di verdi chiari, testo su immagini, navigazione da tastiera, focus trap del menu, lettura con screen reader e comportamento al 200–400% di zoom richiedono test dedicati; non è possibile dichiarare conformità WCAG dalle sole schermate.

## Evidenze

- `02-catalogo-desktop.png`: home desktop stabile e banner cookie
- `04-catalogo-desktop.png`: catalogo desktop
- `03-configuratore-desktop.png`: configuratore desktop dopo lo scroll automatico
- `05-home-tablet.png`: home tablet
- `06-configuratore-tablet.png`: configuratore tablet
- `07-home-smartphone.png`: home smartphone
- `08-menu-smartphone.png`: menu smartphone aperto
- `09-configuratore-smartphone.png`: configuratore smartphone
- `10-catalogo-smartphone.png`: catalogo smartphone
