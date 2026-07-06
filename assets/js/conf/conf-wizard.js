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

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        const action = STEP_ACTIONS[step.dataset.wizardStep];
        if (action) action();
      });
    });

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

    function setActive(step) {
      steps.forEach(function (s) {
        s.classList.toggle("is-current", s === step);
        s.setAttribute("aria-current", s === step ? "step" : "false");
      });
    }

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
})();
