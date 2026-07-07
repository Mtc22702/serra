# Report UX/UI mobile — Orto in Serra

Verifica di tutte e tre le pagine (Home, Configuratore, Area riservata) in visuale smartphone (~375-430px), fatta leggendo codice HTML/CSS/JS (non ho un browser reale in questo ambiente, quindi ogni punto è dedotto dal codice e verificato dove possibile). Ogni voce indica file e riga, e quanto sono sicuro della diagnosi.

Le correzioni già fatte in questa conversazione (barra guidata a passi, "Strumenti extra" collassato, tendina materiali extra, foto reali nella lista semi, riga riepilogo compatta) **non sono ripetute qui** — sono state verificate ancora presenti e funzionanti.

---

## Home (index.html)

**Priorità alta**

1. **Banner cookie: testo diverso su mobile, non tradotto.** `index.html:1270-1287`. Il testo desktop (`.cookie-desktop-copy`) usa `data-i18n="cookie.text"` e viene tradotto correttamente; la versione mobile (`.cookie-mobile-copy`, mostrata al posto dell'altra sotto una certa larghezza) non ha nessun `data-i18n` — un utente rumeno che apre il sito da smartphone vede il testo del banner cookie in italiano. Certo.

**Priorità media**

2. **Pulsante menu hamburger sotto la soglia minima di tocco.** `assets/css/index/04-responsive-header-contatti.css:1756-1761`. A ≤660px è 38×38px, sotto i ~44px consigliati per un elemento a cui si tocca spesso. Probabile.
3. **Stessa classe (`.nav-menu-toggle`/pulsante carrello) ridefinita in 4 punti diversi del CSS** con misure diverse (36px, 44px, 52px, 48px) a seconda del breakpoint. Non è un bug visibile di per sé, ma rende fragile qualunque futura modifica: è facile cambiarne una e lasciare le altre disallineate. Certo (duplicazione presente).
4. **Cassetto carrello senza alcuna regola mobile dedicata.** `assets/css/index/03-pannelli-overlay.css` non ha nessun `@media` — il cassetto usa `width:min(390px,100vw)` con padding fisso e senza `env(safe-area-inset-*)`, quindi su iPhone con notch/home-indicator il contenuto può toccare i bordi arrotondati dello schermo. Probabile.
5. **Pulsanti "chiudi"/"svuota" del carrello sotto i 44px** (`.cart-close` 32×32px, `.cart-clear-btn` ~28px di altezza, righe ~1289-1291 e ~1263-1266 dello stesso file), senza override mobile. Certo.
6. **Pulsanti "chiudi" e stepper del foglio di preconfigurazione sotto i 44px.** `assets/css/index/07-preconfigurazione.css:169-171` (chiudi, 32×32px) e `:401-442` (stepper larghezza/lunghezza, 28-32px) — controlli su cui si tocca ripetutamente per regolare le misure. Certo.

**Priorità bassa**

7. **Etichetta "Social" nei contatti non tradotta**, mentre le etichette vicine ("Indirizzo", "Telefono") usano `data-i18n`. `index.html:770`. Certo, impatto minore.
8. Testo di suggerimento nella griglia zone climatiche (0.48rem, es. "gelate occasionali") molto piccolo in una griglia a 3 colonne. Possibile.
9. Fascia mesi scorrevole con sola dissolvenza ai bordi come indizio di scroll, nessuna freccia/etichetta. Possibile che non tutti capiscano che è scorrevole.

---

## Configuratore (configuratore.html)

**Priorità alta**

10. **Riga "Clima" nel pannello impostazioni: 3 campi in una griglia a 2 colonne.** `configuratore.html:560-585` contiene 3 select (Zona, Serra, Sole) dentro `#climateField`, ma `.settings-visual-field--climate` (`assets/css/configuratore/02-pannelli-controlli.css:1056-1058`) definisce solo 2 colonne (`grid-template-columns: minmax(0,1.12fr) minmax(92px,0.88fr)`). Il terzo campo va a capo occupando solo la prima colonna, lasciando una riga sbilanciata con mezza colonna vuota — non c'è nessuna regola mobile che lo corregga. Verificato di persona: il bug esiste in tutte le larghezze, ma si nota di più su una colonna singola (mobile). Certo.

**Priorità media**

11. **Pulsanti "Aggiungi/Aggiunto" e campo quantità nella tendina materiali extra sotto i 44px.** `assets/css/configuratore/05-progetti-calendario.css:899-916` (`.mat-toggle` padding 5px 10px, nessun `min-height`) e `.mat-qty input` (larghezza 62px, padding 3px 6px). A confronto, altri pulsanti dello stesso breakpoint arrivano a 44px — qui restano sui 24-28px, più difficili da toccare con precisione. Certo (misure verificate), l'impatto pratico è probabile.
12. **Testo "cm" accanto allo stepper del camminamento con stile inline hardcoded** (`configuratore.html:554`, font-size 12px via style inline) in una riga già stretta (`grid-template-columns: minmax(68px,1fr) auto auto`). Possibile che con traduzioni rumene più lunghe delle etichette vicine il testo si sovrapponga.

**Priorità bassa**

13. Filtri della lista colture (3 colonne, testo 9.5px) leggibili in italiano ma da verificare con le traduzioni rumene, che tendono a essere più lunghe. Possibile.

---

## Area riservata (account.html)

**Priorità alta**

14. **Segnaposto password non tradotto.** `account.html:281`, `placeholder="Minimo 6 caratteri"` scritto direttamente in italiano, mentre altri campi (es. la ricerca) passano dal meccanismo di traduzione dell'account. Un utente rumeno in registrazione vede questo suggerimento solo in italiano. Certo.
15. **Etichetta categoria pianta (pannello admin) senza stile.** `assets/js/account.js:814` genera `<span class="badge-category">`, ma non esiste nessuna regola `.badge-category` in nessun file CSS del progetto — il tag esce come testo semplice invece che come badge colorato, incoerente con gli altri badge (stato ordine) nella stessa tabella. Certo.

**Priorità media**

16. **Istruzione "Ctrl/Cmd" per le selezioni multiple (pannello admin), inapplicabile su smartphone.** `account.html:835-836, 861, 871` — le select multiple per Mesi/Piante amiche/nemiche istruiscono a tenere premuto Ctrl o Cmd per selezionare più voci, cosa impossibile a schermo tattile; il comportamento reale di una `<select multiple>` su mobile varia molto da browser a browser ed è comunque scomodo con un riquadro alto solo 120px. Certo che l'istruzione sia sbagliata su touch; probabile che l'esperienza reale sia più difficile del previsto.
17. **Codice di tracciamento spedizione forzato su una riga, colore fisso non adattato al tema scuro.** `assets/js/account.js:756`, stile inline con `white-space:nowrap` e `color:#718096`. Sulla vista a "card" mobile (dove le altre celle vanno a capo liberamente) un codice di tracciamento lungo può risultare tagliato invece di andare a capo; il colore grigio fisso non è pensato per lo sfondo scuro del tema notte (contrasto ai limiti). Probabile.
18. **Pulsanti piccoli "Modifica/Elimina" nelle card admin sotto ~44px di altezza.** `account.css:274-278` (`.btn-small`, padding 6px 12px, ~30-34px di altezza) diventano larghezza piena su mobile ma restano bassi, aumentando il rischio di toccare quello sbagliato quando sono impilati vicini. Probabile.

**Priorità bassa**

19. Badge di stato ordine (spedito/in elaborazione/completato/annullato) non hanno una versione dedicata per il tema scuro — nei test sembrano leggibili per coincidenza più che per un contrasto verificato. Possibile, da controllare a vista quando possibile.
20. Etichetta del pulsante "Stampa" ripetuta due volte (testo visibile e `title` identico) — ridondante ma innocuo.

---

## Riepilogo priorità

**Da correggere per primi (bug visibili o traduzioni mancanti):**
- #1 banner cookie mobile non tradotto (RO)
- #10 griglia clima a 3 campi rotta (configuratore)
- #14 placeholder password non tradotto
- #15 badge categoria senza stile (admin)

**Da correggere a seguire (bersagli di tocco piccoli):**
- #5, #6, #11, #18 pulsanti/controlli sotto i 44px in carrello, preconfigurazione, materiali extra, admin

**Da valutare con calma (rifiniture):**
- tutto il resto

Fammi sapere quali vuoi che sistemi per primi — posso partire dai 4 "certi" ad alta priorità.
