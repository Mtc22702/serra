if ("serviceWorker" in navigator) {
  const isLocalDev = window.SERRA_IS_LOCAL_DEV;

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

    const activateUpdate = (worker) => {
      if (!worker) return;
      sessionStorage.removeItem("serra.sw-reloaded");
      worker.postMessage({ type: "SKIP_WAITING" });
    };

    navigator.serviceWorker
      .register(window.serraAsset("./sw.js"), { updateViaCache: "none" })
      .then((registration) => {
        registration.update();
        const controller = navigator.serviceWorker.controller;
        if (!controller) return;
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          if (!event.data || event.data.type !== "VERSION") return;
          if (event.data.version === window.SERRA_APP_VERSION) return;
          activateUpdate(registration.waiting || registration.installing);
        };
        controller.postMessage({ type: "GET_VERSION" }, [channel.port2]);

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              activateUpdate(newWorker);
            }
          });
        });
      })
      .catch(() => {});
  }
}
