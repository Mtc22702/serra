# Architettura del frontend

## Avvio e controlli

```sh
npm run check
```

Il comando rigenera i bundle CSS e controlla la sintassi di tutti gli script
JavaScript. Va eseguito prima di pubblicare una modifica.

## CSS

I file in `assets/css/index`, `assets/css/configuratore` e `assets/css/tema`
sono la sorgente da modificare. I file `assets/css/serra-*.css` sono bundle
generati: non vanno modificati a mano.

Ordine dei livelli:

1. `base`: struttura, componenti e pagine;
2. `dark-theme`: sole varianti di tema;
3. `polish`: eccezioni visive temporanee da ricollocare nel modulo proprietario.

Ogni nuova regola deve essere inserita nel file che possiede il componente.
Non aggiungere override generici in `uiux-polish.css`; se un'eccezione è
necessaria, documentarne il motivo in una riga e pianificarne il ricollocamento.

## JavaScript

`assets/js/shared` contiene utilità senza dipendenze di pagina.
`assets/js/home`, `assets/js/conf` e `assets/js/account.js` contengono la
logica di pagina. Le nuove interazioni vanno registrate con
`addEventListener`; evitare nuovi attributi `onclick`, `onchange` e `onsubmit`
nell'HTML.

Le funzioni che interpolano testo non affidabile in HTML devono usare
`window.escapeHtml`.

## Commenti

Commentare il vincolo tecnico o l'intento non ovvio, non la cronologia della
modifica. Esempio: `/* Stato chiuso del selettore profilo */`.

La motivazione estesa e la storia delle modifiche appartengono ai commit Git.

## Cache

`sw.js` usa la stessa versione di rilascio dichiarata nelle pagine. Quando si
pubblicano nuove risorse, aggiornare entrambe e rigenerare i bundle CSS.

## Risorse immagini

```sh
npm run audit:assets
```

Il report individua le foto non riferite in modo statico da HTML, CSS e
JavaScript. Non elimina file: le immagini del catalogo possono essere scelte
dinamicamente dall'area amministrativa. Prima di una rimozione, verificare il
contenuto del catalogo e le foto caricate dagli utenti.

Le copie `.jpg` sono mantenute come compatibilità per eventuali cataloghi
salvati in precedenza; il frontend usa il formato `.webp` per le risorse
predefinite.
