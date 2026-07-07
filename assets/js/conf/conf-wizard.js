// Barra guidata a passi: navigazione rapida fra le 3 fasi del configuratore
// (Impostazioni -> Colture -> Lista semi) e messa in evidenza del passo attivo
// durante lo scorrimento. Non modifica lo stato dell'app: richiama solo le
// funzioni di apertura/scorrimento già esistenti in conf-ui.js / conf-app.js.
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // Apre e mette in evidenza il pannello "Lista semi da acquistare"
  function focusYieldPanel() {
    const panel = document.getElementById("panelYield");
    if (!panel) return;
    if (typeof setPanelCollapsed === "function") {
      setPanelCollapsed(panel, false);
    }
    if (typeof scrollElementBelowHeader === "function") {
      scrollElementBelowHeader(panel, "smooth");
    } else if (panel.scrollIntoView) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    panel.classList.add("is-focus-pulse");
    window.setTimeout(() => panel.classList.remove("is-focus-pulse"), 1600);
  }

  const STEP_ACTIONS = {
    settings: function () {
      if (typeof openSettingsPanelAndFocusDimensions === "function") {
        openSettingsPanelAndFocusDimensions();
      }
    },
    crops: function () {
      if (typeof openCustomizePanelAndFocus === "function") {
        openCustomizePanelAndFocus();
      } else if (typeof scrollGreenhouseImageIntoView === "function") {
        scrollGreenhouseImageIntoView("smooth");
      }
    },
    yield: focusYieldPanel
  };

  ready(function () {
    const bar = document.getElementById("wizardBar");
    if (!bar) return;
    const steps = Array.prototype.slice.call(
      bar.querySelectorAll(".wizard-step")
    );
    if (!steps.length) return;

    // Segna il passo come già visitato/attivo e aggiorna la rail di
    // avanzamento in fondo alla barra. Richiamata sia dal click (per un
    // riscontro immediato, prima ancora che lo scroll arrivi a destinazione)
    // sia dall'IntersectionObserver mentre si scorre la pagina.
    function setActive(step) {
      const idx = steps.indexOf(step);
      steps.forEach(function (s) {
        s.classList.toggle("is-current", s === step);
        s.setAttribute("aria-current", s === step ? "step" : "false");
      });
      // Segna il passo come già visitato scorrendo/cliccando: solo un
      // rinforzo visivo di avanzamento, nessun blocco/sblocco funzionale.
      step.classList.add("is-visited");
      // "Serra e clima" ha sempre valori validi di default: averlo visitato
      // basta per considerarlo completato (spunta). Colture/lista semi usano
      // invece uno stato reale, sincronizzato da syncWizardDoneState().
      if (step.dataset.wizardStep === "settings") {
        step.classList.add("is-done");
      }
      if (idx > -1) {
        bar.style.setProperty(
          "--wizard-progress",
          ((idx + 1) / steps.length) * 100 + "%"
        );
      }
    }

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        setActive(step);
        const action = STEP_ACTIONS[step.dataset.wizardStep];
        if (action) action();
      });
    });

    // Navigazione da tastiera fra i passi (frecce/Home/End), oltre al normale
    // tab-stop per singolo bottone: comodo per chi scorre la barra senza
    // mouse, senza cambiare il comportamento di clic/scroll già esistente.
    bar.addEventListener("keydown", function (e) {
      const idx = steps.indexOf(document.activeElement);
      if (idx === -1) return;
      let next = null;
      if (e.key === "ArrowRight") next = steps[(idx + 1) % steps.length];
      else if (e.key === "ArrowLeft")
        next = steps[(idx - 1 + steps.length) % steps.length];
      else if (e.key === "Home") next = steps[0];
      else if (e.key === "End") next = steps[steps.length - 1];
      if (next) {
        e.preventDefault();
        next.focus();
      }
    });

    // Contatore live sui passi 2/3: mostra il numero di varietà già in serra
    // rispecchiando lo stato reale (state.beds), non solo lo scroll/click.
    // Osserva il badge del pannello "Lista semi" (già aggiornato dal motore
    // ad ogni render) solo come segnale di "qualcosa è cambiato": il valore
    // mostrato qui viene comunque letto direttamente da state.beds.length.
    function syncWizardDoneState() {
      const hasCrops =
        typeof state !== "undefined" &&
        Array.isArray(state.beds) &&
        state.beds.length > 0;
      const count = hasCrops ? String(state.beds.length) : "";
      steps.forEach(function (step) {
        const key = step.dataset.wizardStep;
        if (key === "crops" || key === "yield") {
          step.classList.toggle("is-done", hasCrops);
        }
      });
      const cropsBadge = document.getElementById("wizardCropsBadge");
      const yieldBadge = document.getElementById("wizardYieldBadge");
      if (cropsBadge) cropsBadge.textContent = count;
      if (yieldBadge) yieldBadge.textContent = count;
    }
    syncWizardDoneState();
    const yieldBadgeSource = document.getElementById("yieldToggleBadge");
    if (yieldBadgeSource && "MutationObserver" in window) {
      new MutationObserver(syncWizardDoneState).observe(yieldBadgeSource, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    if (!("IntersectionObserver" in window)) return;

    const targets = steps
      .map(function (step) {
        return {
          step: step,
          el: document.getElementById(step.dataset.wizardTarget)
        };
      })
      .filter(function (entry) {
        return Boolean(entry.el);
      });

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        const visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (!visible.length) return;
        const match = targets.find(function (t) {
          return t.el === visible[0].target;
        });
        if (match) setActive(match.step);
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    targets.forEach(function (t) {
      observer.observe(t.el);
    });
    setActive(targets[0].step);
  });

  // Pulsante "Strumenti extra": su tablet/smartphone la toolbar della vista
  // (selettore vista, progetti, calendario, esporta) resta chiusa finché
  // l'utente non la apre esplicitamente, per non affollare lo schermo prima
  // di arrivare alla vista della serra. Su desktop il pulsante è inerte e la
  // toolbar resta sempre visibile (gestito via CSS).
  ready(function () {
    const toggle = document.getElementById("stageToolsToggle");
    const toolbar = document.getElementById("viewToolbar");
    if (!toggle || !toolbar) return;
    toggle.addEventListener("click", function () {
      const isOpen = toolbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Riga riepilogo (zona/mese/misure): tutta la riga apre le impostazioni,
  // così su smartphone non serve tenere il blocco esteso sempre visibile.
  ready(function () {
    const row = document.getElementById("guidedMetaRow");
    if (!row) return;
    function open() {
      if (typeof openSettingsPanelAndFocusDimensions === "function") {
        openSettingsPanelAndFocusDimensions();
      }
    }
    row.addEventListener("click", open);
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  // CTA unica del novizio verso la lista della spesa: stessa azione già
  // usata dallo step 3 della barra guidata, richiamata da un solo bottone
  // così il novizio ha un'unica azione "in avanti" da seguire.
  ready(function () {
    const cta = document.getElementById("btnNoviceGoToYield");
    if (!cta) return;
    cta.addEventListener("click", focusYieldPanel);
  });

  // Ingranaggio accanto al titolo "Configuratore Serra": apre/chiude
  // "Le tue scelte" senza che sembri un primo passo obbligato. L'evento
  // nativo "toggle" tiene sincronizzato il bottone sia che l'apertura
  // avvenga da qui sia da un clic diretto sul riepilogo (quando è aperto).
  ready(function () {
    const gear = document.getElementById("guidedIntroGear");
    const details = document.getElementById("guidedIntro");
    if (!gear || !details) return;
    gear.addEventListener("click", function () {
      details.open = !details.open;
    });
    details.addEventListener("toggle", function () {
      gear.setAttribute("aria-expanded", String(details.open));
      if (details.open) {
        if (typeof scrollElementBelowHeader === "function") {
          scrollElementBelowHeader(details, "smooth");
        } else {
          details.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();
