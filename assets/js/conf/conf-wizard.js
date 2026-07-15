// Coordina i passi del percorso guidato e le relative destinazioni nella pagina.
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function cropsJourneyTarget() {
    const isGuidedResponsive =
      typeof isResponsiveConfiguratorLayout === "function" &&
      isResponsiveConfiguratorLayout() &&
      (document.body.classList.contains("livello-novizio") ||
        document.body.classList.contains("livello-intermedio"));
    return isGuidedResponsive
      ? document.getElementById("panelCustomize")
      : document.querySelector(".stage");
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
      // Destinazione desktop del primo passo.
      if (
        typeof isResponsiveConfiguratorLayout === "function" &&
        !isResponsiveConfiguratorLayout() &&
        typeof scrollElementBelowHeader === "function"
      ) {
        scrollElementBelowHeader(
          document.getElementById("panelSettings"),
          "smooth"
        );
      }
    },
    crops: function () {
      const isResponsive =
        typeof isResponsiveConfiguratorLayout === "function" &&
        isResponsiveConfiguratorLayout();
      const isGuidedResponsive =
        isResponsive &&
        (document.body.classList.contains("livello-novizio") ||
          document.body.classList.contains("livello-intermedio"));

      // Destinazione mobile del secondo passo guidato.
      if (
        isGuidedResponsive &&
        typeof openCustomizePanelAndFocus === "function"
      ) {
        openCustomizePanelAndFocus();
        return;
      }

      if (!isResponsive && typeof openCustomizePanelAndFocus === "function") {
        openCustomizePanelAndFocus();
      }

      // Destinazione della planimetria.
      if (typeof scrollGreenhouseImageIntoView === "function") {
        scrollGreenhouseImageIntoView("smooth");
      }
    },
    yield: focusYieldPanel
  };

  ready(function () {
    const bar = document.getElementById("journeyContext");
    if (!bar) return;
    const steps = Array.prototype.slice.call(
      bar.querySelectorAll(".journey-context-step")
    );
    if (!steps.length) return;

    // Aggiorna lo stato di avanzamento del percorso.
    function setActive(step) {
      const idx = steps.indexOf(step);
      steps.forEach(function (s) {
        s.classList.toggle("is-current", s === step);
        if (s === step) s.setAttribute("aria-current", "step");
        else s.removeAttribute("aria-current");
      });
      // Registra il passo visitato.
      step.classList.add("is-visited");
      // Determina il completamento del passo.
      if (step.dataset.journeyStep === "settings") {
        step.classList.add("is-done");
      }
    }

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        setActive(step);
        const action = STEP_ACTIONS[step.dataset.journeyStep];
        if (action) action();
      });
    });

    // Navigazione da tastiera tra i passi.
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

    // Contatori live delle colture selezionate.
    function syncWizardDoneState() {
      const hasCrops =
        typeof state !== "undefined" &&
        Array.isArray(state.beds) &&
        state.beds.length > 0;
      const count = hasCrops ? String(state.beds.length) : "";
      steps.forEach(function (step) {
        const key = step.dataset.journeyStep;
        if (key === "crops" || key === "yield") {
          step.classList.toggle("is-done", hasCrops);
        }
      });
      bar.dataset.cropCount = count;
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
          el:
            step.dataset.journeyTarget === "stage"
              ? cropsJourneyTarget()
              : document.getElementById(step.dataset.journeyTarget)
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
    const greenhouseStep = steps.find(function (step) {
      return step.dataset.journeyStep === "crops";
    });
    setActive(greenhouseStep || targets[0].step);
  });

  // Attiva la barra degli strumenti su mobile.
  ready(function () {
    const toggle = document.getElementById("stageToolsToggle");
    const toolbar = document.getElementById("viewToolbar");
    if (!toggle || !toolbar) return;
    toggle.addEventListener("click", function () {
      const isOpen = toolbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Apre le impostazioni dal riepilogo mobile.
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

  // Azione del profilo novizio verso la lista della spesa.
  ready(function () {
    const cta = document.getElementById("btnNoviceGoToYield");
    if (!cta) return;
    cta.addEventListener("click", focusYieldPanel);
  });

  // Apertura del selettore profilo dal badge.
  ready(function () {
    const trigger = document.getElementById("personaPickerTrigger");
    const panel = document.getElementById("guidedIntro");
    const picker = document.getElementById("personaPickDetails");
    if (!trigger || !panel || !picker) return;

    function syncPicker(open) {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      trigger.classList.toggle("is-open", open);
    }

    trigger.addEventListener("click", function () {
      picker.open = !picker.open;
    });

    picker.addEventListener("toggle", function () {
      syncPicker(picker.open);
    });

    picker.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        picker.open = false;
        trigger.focus();
      }
    });
  });
})();
