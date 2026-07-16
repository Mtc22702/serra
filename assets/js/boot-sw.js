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
    // Non forziamo più un location.reload() quando il nuovo worker prende
    // il controllo (evento "controllerchange"): sw.js chiama skipWaiting()
    // e clients.claim(), quindi l'attivazione può avvenire in QUALSIASI
    // momento, anche a metà di una navigazione o mentre si apre una modale
    // (es. il CTA di guida.html che porta a index.html?preconfig=...). Un
    // reload forzato in quel momento interrompe il flusso: la modale si
    // apre e "sparisce" subito dopo, dando l'impressione di un refresh
    // improvviso (perché è letteralmente un refresh). Le navigazioni sono
    // già network-first, quindi il prossimo caricamento prende comunque
    // l'HTML aggiornato senza bisogno di forzare un reload qui.
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
