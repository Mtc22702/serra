window.addEventListener(
  "scroll",
  function () {
    var btn = document.getElementById("backToTop");
    if (btn) btn.classList.toggle("visible", window.scrollY > 420);
  },
  { passive: true }
);
