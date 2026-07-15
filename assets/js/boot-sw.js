// Registrazione e aggiornamento del Service Worker.
if ("serviceWorker" in navigator) {
  const isLocalDev =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "0.0.0.0" ||
    location.hostname === "::1" ||
    location.hostname === "";

  if (isLocalDev) {
    const hadController = Boolean(navigator.serviceWorker.controller);
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations.map((registration) => registration.unregister())
        )
      )
      .then(() => ("caches" in window ? caches.keys() : []))
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("serra-"))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => {
        const reloadKey = "serra.dev-cache-reset";
        if (hadController && !sessionStorage.getItem(reloadKey)) {
          sessionStorage.setItem(reloadKey, "1");
          location.reload();
        } else if (!hadController) {
          sessionStorage.removeItem(reloadKey);
        }
      })
      .catch(() => {});
  } else {
    const hadControllerAtBoot = Boolean(navigator.serviceWorker.controller);
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadControllerAtBoot) return;
      if (sessionStorage.getItem("serra.sw-reloaded")) return;
      sessionStorage.setItem("serra.sw-reloaded", "1");
      location.reload();
    });

    navigator.serviceWorker
      .register(window.serraAsset ? serraAsset("./sw.js") : "./sw.js", {
        updateViaCache: "none"
      })
      .then((registration) => {
        registration.update();
        // Consente il refresh alla prossima attivazione del worker.
        registration.addEventListener("updatefound", () => {
          sessionStorage.removeItem("serra.sw-reloaded");
        });
      })
      .catch(() => {});
  }
}
