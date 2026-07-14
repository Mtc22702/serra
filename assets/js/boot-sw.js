// Registrazione del Service Worker, condivisa da tutte le pagine.
// Prima di questa modifica questa stessa logica era duplicata identica in
// index.html e configuratore.html, e mancava del tutto in account.html e
// guida.html (quindi chi visitava solo quelle due pagine non riceveva mai
// gli aggiornamenti della cache offline). Ora è un unico file caricato da
// tutte e 4 le pagine.
//
// Nota: la logica di rilevamento tema e lingua salvata resta invece inline
// in ogni pagina (non qui) perché deve girare in modo sincrono PRIMA del
// primo paint per evitare il flash di tema/lingua sbagliati — spostarla in
// un file esterno reintrodurrebbe esattamente quel problema.
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
        // sw.js chiama self.skipWaiting() senza condizioni: il nuovo
        // worker si attiva da sé, non serve chiederglielo da qui. Ci
        // limitiamo a "sbloccare" il listener sopra quando arriva
        // davvero una nuova versione, così un secondo aggiornamento
        // nella stessa sessione può ricaricare di nuovo la pagina.
        registration.addEventListener("updatefound", () => {
          sessionStorage.removeItem("serra.sw-reloaded");
        });
      })
      .catch(() => {});
  }
}
