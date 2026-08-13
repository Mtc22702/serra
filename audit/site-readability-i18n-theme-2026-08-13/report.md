# Audit leggibilità, lingua e tema — 13 agosto 2026

## Ambito

Pagine verificate a 430 × 932 px: Account, Configuratore, Guida, Il mio orto,
Vivaio e Conferma ordine. Controllati anche cambio lingua IT/RO e tema
chiaro/scuro nelle pagine Guida e Orto.

## Esito

- Nessun overflow orizzontale nelle sei pagine.
- Nessun testo UI visibile sotto 12 px dopo gli interventi.
- Testi operativi principali mantenuti a 14 px o superiori.
- Guida: lingua, titolo pagina, navigazione, carrello, tab e contenuti dei tre
  percorsi sincronizzati in italiano e romeno.
- Orto: lingua, titolo pagina, navigazione, carrello, hero, notifiche, tab e
  contenuti dinamici sincronizzati in italiano e romeno.
- I due controlli tema aggiornano correttamente `data-theme`, contrasto, label
  accessibili e preferenza persistente.
- Le annotazioni interne alla planimetria SVG del Configuratore restano
  proporzionali allo zoom del disegno: non sono micro-copy operativa e
  ingrandirle causerebbe collisioni nella vista dall'alto.

## Verifiche automatiche

- `npm run check:docs`
- `npm run check:js`
- `npm run check:html`

Tutti i controlli sono passati.
