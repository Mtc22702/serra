# Design QA — leggibilità e azioni secondarie della home

## Target e stato

- Source visual truth: `/var/folders/zn/y4859qxj2tv5j7hqkv36dj1r0000gn/T/TemporaryItems/NSIRD_screencaptureui_T90qmR/Screenshot 2026-08-13 alle 19.36.59.png`
- Source normalizzata: `audit/index-readability-2026-08-13/source-mobile-content.png`
- Confronto affiancato: `audit/index-readability-2026-08-13/comparison-source-vs-final.png`
- Implementazione mobile: `audit/index-readability-2026-08-13/after/mobile-430x932-final.png`
- Implementazione tablet: `audit/index-readability-2026-08-13/after/tablet-768x1024-final.png`
- Implementazione desktop: `audit/index-readability-2026-08-13/after/desktop-1366x900-final.png`
- Viewport verificati: `430 × 932`, `768 × 1024` e `1366 × 900 CSS px`.
- Screenshot mobile effettivo: `415 × 899 px` a densità `1×`, per l'area utile del browser.
- Source originale: `3644 × 2368 px` a densità `2×`; il contenuto del viewport DevTools è stato ritagliato e normalizzato a `415 × 899 px` per il confronto.
- Stato: tema chiaro, hero stabile dopo il completamento dell'animazione, carrello vuoto.

## Findings e iterazioni

| Priorità | Evidenza iniziale | Correzione | Evidenza finale |
| --- | --- | --- | --- |
| P1 | “Scopri come funziona” misurava circa `11.5 px` e sembrava un link accessorio poco cliccabile. | Trasformato in pulsante secondario contornato, testo `14 px`, icona più chiara e area touch di `49 px`. | Azione leggibile e riconoscibile, senza competere con il CTA giallo. |
| P1 | “Sai già cosa ti serve?” misurava circa `10.9 px` e aveva un'area verticale di circa `39 px`. | Trasformato in controllo secondario a tutta larghezza, testo `14 px`, fondo distinto e freccia contenuta in un bersaglio circolare. | Area touch finale `52 px`; relazione con le scelte rapide immediata. |
| P1 | Nell'index erano presenti testi informativi e azioni tra circa `9` e `11.8 px`, soprattutto su mobile e tablet. | Definita una scala minima: `12 px` per badge e micro-etichette, `13 px` per benefici, `14 px` per azioni e testi descrittivi. I micro-testi decorativi del plastico sono rimossi sul telefono. | Audit computato: nessun testo visibile sotto `12 px` nei tre viewport. |
| P2 | Aumentando i testi, alcune aree dense potevano introdurre overflow orizzontale. | Adeguati font e spaziature per catalogo, card, footer e filtri senza aumentare larghezze rigide. | `scrollWidth` coincide con `clientWidth` a `430`, `768` e `1366 px`. |

## Verifica delle superfici di fedeltà

- **Tipografia:** Fraunces e DM Sans restano invariati; gerarchia principale preservata. Azioni secondarie ora a `14 px`; nessuna etichetta visibile scende sotto `12 px`.
- **Spaziatura e layout:** il CTA giallo resta l'unica azione primaria; i due controlli secondari sono separati ma raccolti nello stesso flusso. Nessun troncamento o overflow ai breakpoint verificati.
- **Colori e token:** mantenuti verde profondo, giallo del CTA e superfici traslucide; i nuovi bordi usano la palette esistente e conservano il contrasto in tema scuro.
- **Qualità degli asset:** logo, illustrazione della serra e icone esistenti non sono stati sostituiti. I micro-testi decorativi non leggibili del plastico sono nascosti solo su smartphone, senza degradare l'illustrazione.
- **Copy:** testi, destinazioni e significato delle azioni restano invariati.

Il confronto focalizzato coincide con la hero, perché i due controlli modificati e la loro gerarchia sono chiaramente leggibili nel confronto affiancato. La verifica tipografica dell'intera pagina è stata completata tramite dimensioni computate nei tre viewport.

## Verifica funzionale

- “Scopri come funziona” conserva la destinazione `guida.html`.
- “Sai già cosa ti serve?” conserva la destinazione `#percorsi`.
- Stati hover e focus-visible presenti per entrambi i controlli.
- Nessun errore JavaScript in console.
- Build CSS e controlli HTML/JavaScript superati.

## Follow-up polish

- Nessun P0, P1 o P2 residuo. Eventuali ulteriori modifiche sarebbero solo regolazioni estetiche P3.

final result: passed
