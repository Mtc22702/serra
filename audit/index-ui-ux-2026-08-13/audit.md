# Audit UI/UX — pagina index

Data: 13 agosto 2026

Viewport verificati: desktop 1440×900, tablet 768×1024, smartphone 390×844.

## Sintesi

La pagina ha una buona qualità visiva e un catalogo efficace, ma nella parte iniziale propone due modelli decisionali consecutivi: prima il livello di esperienza (Principiante, Intermedio, Esperto), poi il punto di partenza (semi, piantine, ciò che si possiede già). Le azioni sono tutte graficamente importanti e l'utente deve decidere due volte prima di arrivare al contenuto.

## Findings prioritari

1. **P0 — Doppia scelta sopra il catalogo.** Hero, guida, tre livelli, percorso alternativo e tre card producono otto accessi in due schermate consecutive. Il problema è di gerarchia, non di numero assoluto di funzioni.
2. **P0 — Hero troppo orientata al configuratore.** Il titolo promette l'intero prodotto, ma il pannello principale porta quasi esclusivamente alla progettazione della serra. Catalogo, vivaio e diario sembrano secondari.
3. **P0 — Mobile: il primo blocco è troppo alto.** A 390×844 non si vede né l'uscita “Non parti da zero?” né la sezione “Tre strade”; la scelta occupa più di una schermata.
4. **P1 — Le tre card funzionano, ma duplicano la decisione.** Vanno mantenute come scorciatoie secondarie oppure assorbite nell'hero, non entrambe con lo stesso peso.
5. **P1 — Tablet: griglia 2+1 sbilanciata.** La terza card lascia una grande area vuota; meglio tre colonne compatte, una riga orizzontale o una card full-width per lo strumento gratuito.
6. **P1 — Header desktop affollato.** Home, navigazione, Area Personale, tema, lingua e carrello competono nello stesso livello. Home può restare, ma va integrata nella navigazione invece di apparire come un'ulteriore CTA.
7. **P1 — Il catalogo è la parte più solida.** Su mobile i filtri collassati, le due colonne e i pulsanti “+” rendono la scansione rapida. Su desktop i filtri sono comprensibili, ma “Mostra” e “Tipo” potrebbero essere raggruppati meglio.
8. **P1 — Sezioni finali molto lunghe su mobile.** Le tre coppie ripetono lo stesso pattern e spingono il kit molto in basso. Mostrare una coppia consigliata e un controllo “Vedi le altre 2” ridurrebbe lo scroll.
9. **P2 — Semantica dei titoli finali.** “Si amano in serra” e “Kit del mese” risultano contenitori generici nel DOM, non heading: va sistemata la gerarchia h2/h3 per navigazione assistiva e scansione.

## Direzione consigliata

- Hero con un'unica azione primaria: **“Progetta il mio orto”** o **“Inizia il percorso guidato”**.
- Link secondario: **“So già cosa mi serve”**, che porta a tre scorciatoie compatte: Semi, Piantine, Il mio orto.
- Spostare Principiante / Intermedio / Esperto nel primo passaggio del configuratore; l'utente sceglie il livello quando ha già deciso di progettare.
- Se si vuole mantenere la scelta in homepage, mostrare Principiante come CTA primaria e Intermedio / Esperto come link secondari nello stesso blocco, non come tre CTA equivalenti.
- Su smartphone ridurre immagine, spazi verticali e copie delle card; rendere visibile almeno l'inizio della scelta successiva nella prima schermata.
- Su tablet usare una composizione 3 colonne compatte oppure 2 card commerciali + una fascia full-width “Hai già semi o piante?”.
- Ridurre la prominenza dei CTA ripetuti nelle sezioni successive e usare disclosure progressive per abbinamenti e kit.

## Evidenze

- `01-desktop-hero.png`: primo livello decisionale.
- `03-desktop-percorsi.png`: secondo livello decisionale.
- `04-desktop-catalogo.png`: catalogo desktop.
- `05-tablet-hero.png` e `06-tablet-percorsi.png`: resa tablet.
- `07-mobile-hero.png`, `08-mobile-percorsi.png`, `09-mobile-catalogo.png`: resa smartphone.
- `10-mobile-menu.png`: menu mobile.
- `11-desktop-abbinamenti.png`, `12-desktop-kit.png`, `13-mobile-abbinamenti.png`, `14-mobile-kit.png`: sezioni finali.

## Limiti della verifica

Audit visivo e strutturale su pagina locale. Non sono stati analizzati dati reali di conversione, session recording o analytics, né eseguito un test completo con screen reader. Non è quindi una certificazione di conformità WCAG.
