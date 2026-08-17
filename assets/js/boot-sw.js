/* Bootstrap offline: registra il Service Worker in produzione e lo rimuove in locale. */
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
    navigator.serviceWorker
      .register(window.serraAsset ? serraAsset("./sw.js") : "./sw.js", {
        updateViaCache: "none"
      })
      .then((registration) => {
        registration.update();
      })
      .catch(() => {});
  }
}
