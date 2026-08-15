# Audit responsive della pagina index

Data: 15 agosto 2026

## Ambito

Pagina `index.html`, con verifica visuale e strutturale a 360, 390, 430, 600,
768, 820 e 1024 px. Sono stati controllati hero, percorsi, catalogo, kit,
contatti, header e modalità scura.

## Problemi confermati

1. Tra 721 e 1040 px le tre card dell'hero venivano impilate a tutta
   larghezza. Il contenuto restava però dimensionato come una card stretta,
   creando grandi aree vuote e una hero alta oltre 1600 px.
2. Il riferimento cache dei CSS della pagina non era stato aggiornato. Il
   browser poteva quindi combinare markup recente e fogli di stile precedenti.
3. I breakpoint delle card non distinguevano adeguatamente tablet e telefono.

## Correzioni

1. Tablet: griglia a due colonne per Progetta e Procurati le piante.
2. Tablet: card Coltiva a tutta larghezza con testo e preview affiancati.
3. Smartphone: ripristino esplicito della colonna singola sotto 720 px.
4. Aggiornamento della versione degli asset CSS in `index.html`.
5. Mantenuti 24 px tra le card su smartphone e assenza di overflow orizzontale.

## Risultato

- 1024 px: hero ridotta da 1618 a 1119 px.
- 768 px: prime due card da 322 px affiancate; card tool compatta sotto.
- 430 e 360 px: colonna singola, CTA intere e nessun overflow.
- Catalogo tablet e smartphone: controlli e card restano dentro la viewport.
- Tema scuro: stessa struttura, senza regressioni visibili.

## Limiti

Le schermate consentono di verificare reflow, gerarchia, contrasto apparente e
dimensione visiva dei controlli. Una dichiarazione completa di conformità WCAG
richiederebbe anche test sistematici con tastiera e tecnologie assistive.
