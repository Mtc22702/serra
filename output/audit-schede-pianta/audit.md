# Audit schede informazioni pianta

Data: 21 luglio 2026

Ambito: schede pianta della pagina index e del configuratore, visuale desktop e smartphone, testi italiani e struttura bilingue italiano/romeno.

## Esito sintetico

La struttura a cinque sezioni è coerente tra le due pagine e funziona bene. Il problema principale è che index e configuratore costruiscono i contenuti con due motori diversi: la home mostra informazioni più ricche ma spesso duplicate, mentre il configuratore usa testi più sintetici e troppo generici per gruppi di piante. Questo crea differenze tra le due schede e frasi non adatte ad alcune colture.

## Problemi prioritari

1. Nella Panoramica della home viene usata una nota tecnica seguita da una frase automatica, invece della descrizione breve condivisa. Il risultato ripete sole, acqua e raccolta già presenti nei badge e nelle statistiche e può produrre frasi grammaticalmente deboli.
2. Il configuratore usa correttamente la descrizione breve, ma la home non usa la stessa fonte.
3. In Coltivazione, spaziatura, esposizione e irrigazione compaiono due volte: prima nell'elenco e poi nelle sezioni tecniche o nel diagramma delle distanze.
4. Nel configuratore l'etichetta fissa “Diradamento/trapianto” non è adatta a tutte le colture. Per l'aglio dovrebbe essere “Distanze d'impianto” o “Sesto d'impianto”.
5. I consigli del configuratore dipendono quasi soltanto dal gruppo generale della pianta. Per questo l'aglio riceve “Dirada presto”; lo stesso rischio riguarda cavoli e brassicacee trattati come semplici foglie, legumi nani trattati come rampicanti e aromatiche che non devono essere cimate.
6. Nella home la card “Problemi da controllare” anticipa e ripete malattie e parassiti già presenti negli accordion dedicati.
7. “Rotazione e fine ciclo” è più coerente nella sezione Raccolta/fine ciclo che nella sezione Cure.

## Struttura consigliata

- Panoramica: descrizione breve, caratteristiche essenziali e dati specifici della pagina.
- Coltivazione / Avvio: metodo, periodo, profondità, germinazione e un solo consiglio operativo.
- Impianto: un'unica rappresentazione delle distanze, con etichetta adattata alla coltura.
- Condizioni di crescita: terreno, luce e microclima, irrigazione pratica, nutrizione.
- Cure: manutenzione specifica, segnali da osservare, malattie, parassiti e consociazioni.
- Raccolta e fine ciclo: maturazione, metodo, resa, conservazione e rotazione.

## Differenze corrette tra le pagine

- Index: prezzo e contenuto della bustina.
- Configuratore: quantità nell'aiuola, dimensioni dell'aiuola e resa prevista.
- Tutte le informazioni agronomiche condivise dovrebbero invece provenire dalla stessa fonte.

## Accessibilità e responsive

La scheda mobile non presenta overflow orizzontale e i cinque tab rimangono utilizzabili. I controlli sono semanticamente organizzati come tab e gli approfondimenti usano elementi espandibili. Restano da misurare formalmente contrasto, ordine di focus, navigazione completa da tastiera e lettura con screen reader.

## Limiti della verifica

La revisione visiva ha usato Pomodoro nella home e Aglio nel configuratore; la revisione del codice ha verificato il comportamento sistemico per tutte le colture. Non costituisce una validazione agronomica o normativa completa dei testi relativi a fitofarmaci, che richiedono un controllo specialistico aggiornato.
