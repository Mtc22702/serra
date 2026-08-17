/* Offline: precache minimo e strategie di rete/cache per l'intera applicazione. */
const CACHE_VERSION = "20260816-203216dddd48";
const RELEASE_EPOCH = 3;
const CACHE = `serra-${CACHE_VERSION}`;

const PRECACHE = [
  "./",
  "./manifest.json",
  "./assets/img/icons/orto-in-serra-180-v2.png",
  "./assets/img/icons/orto-in-serra-192-v2.png",
  "./assets/img/icons/orto-in-serra-512-v2.png",
  "./assets/img/svg/logo.svg"
];

/* Installa il Service Worker e precarica le risorse necessarie al funzionamento offline. */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(
        PRECACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("[sw] precache fallita per", url, err);
          })
        )
      )
    )
  );
  self.skipWaiting();
});

/* Attiva il nuovo worker e rimuove le cache create da versioni precedenti. */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

/* Riceve i messaggi inviati dalla pagina, ad esempio per aggiornare il worker. */
self.addEventListener("message", (e) => {
  if (!e.data) return;
  if (e.data.type === "GET_VERSION") {
    e.source?.postMessage({ type: "VERSION", version: CACHE_VERSION });
  } else if (e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/* Seleziona la strategia di cache per ogni richiesta intercettata dal worker. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const isLocalDev =
    self.location.hostname === "localhost" ||
    self.location.hostname === "127.0.0.1" ||
    self.location.hostname === "0.0.0.0" ||
    self.location.hostname === "::1";

  if (isLocalDev) {
    e.respondWith(fetch(e.request, { cache: "no-store" }));
    return;
  }

  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then((response) => {
          const copy = response.clone();
          e.waitUntil(
            caches.open(CACHE).then((cache) => cache.put(e.request, copy))
          );
          return response;
        })
        .catch(() =>
          caches
            .match(e.request, { ignoreSearch: true })
            .then((cached) => cached || caches.match("./"))
        )
    );
    return;
  }

  const requestUrl = new URL(e.request.url);
  const isCurrentReleaseAsset =
    requestUrl.origin === self.location.origin &&
    requestUrl.searchParams.get("v") === CACHE_VERSION &&
    /\.(?:css|js)$/i.test(requestUrl.pathname);

  // CSS e JavaScript con l'impronta della release sono immutabili: la stessa URL identifica sempre lo stesso contenuto.
  if (isCurrentReleaseAsset) {
    let cacheWrite = Promise.resolve();
    const releaseResponse = caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          cacheWrite = caches
            .open(CACHE)
            .then((cache) => cache.put(e.request, copy));
        }
        return response;
      });
    });
    e.respondWith(releaseResponse);
    e.waitUntil(releaseResponse.then(() => cacheWrite).catch(() => {}));
    return;
  }

  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((response) => {
        const copy = response.clone();
        e.waitUntil(
          caches.open(CACHE).then((cache) => cache.put(e.request, copy))
        );
        return response;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
