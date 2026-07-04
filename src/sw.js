/* Configurazione e risorse in cache (iniettate dinamicamente da Vite) */
const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];
const PRECACHE = PRECACHE_MANIFEST.map(entry => './' + entry.url);

const CACHE_VERSION = "2026-07-04-vite";
const CACHE = `serra-${CACHE_VERSION}`;

/* Installazione del Service Worker */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

/* Attivazione e pulizia cache */
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

/* Messaggi dalla pagina */
self.addEventListener("message", (e) => {
  if (!e.data) return;
  if (e.data.type === "GET_VERSION") {
    e.source?.postMessage({ type: "VERSION", version: CACHE_VERSION });
  } else if (e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/* Gestione delle richieste di rete */
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

  // Navigazione: strategia network-first
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(e.request).then((cached) => cached || caches.match("./"))
        )
    );
    return;
  }

  const destination = e.request.destination;
  const needsFreshCopy =
    destination === "style" ||
    destination === "script" ||
    destination === "manifest";

  // Script e stili: strategia cache-first
  if (needsFreshCopy) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached;
        return fetch(e.request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          return response;
        });
      })
    );
    return;
  }

  // Immagini e font: strategia cache-first
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
    )
  );
});
