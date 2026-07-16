/* Definisce versione e risorse statiche da memorizzare nella cache dell'applicazione. */
const CACHE_VERSION = "2026-07-16-sw-cache-fix";
const CACHE = `serra-${CACHE_VERSION}`;

const PRECACHE = [
  "./",
  "./index.html",
  "./configuratore.html",
  "./guida.html",
  "./manifest.json",
  "./assets/css/serra-home.css",
  "./assets/js/theme.js",
  "./assets/js/boot-sw.js",
  "./assets/js/nav.js",
  "./assets/js/guide.js",
  "./assets/js/guide-link-i18n.js",
  "./assets/js/i18n.js",
  "./assets/js/plants-data.js",
  "./assets/js/shared/plant-photo.js",
  "./assets/js/shared/escape-html.js",
  "./assets/js/home/home-data.js",
  "./assets/js/home/home-catalog.js",
  "./assets/js/home/home-cart.js",
  "./assets/js/home/home-app.js",
  "./assets/js/conf/conf-data.js",
  "./assets/js/conf/conf-state.js",
  "./assets/js/conf/conf-projects.js",
  "./assets/js/conf/conf-text.js",
  "./assets/js/conf/conf-draw.js",
  "./assets/js/conf/conf-ui.js",
  "./assets/js/conf/conf-companions.js",
  "./assets/js/conf/conf-shopping.js",
  "./assets/js/conf/conf-engine.js",
  "./assets/js/conf/conf-calendar.js",
  "./assets/js/conf/conf-app.js",
  "./assets/js/conf/conf-wizard.js",
  "./assets/img/icons/logo-180.png",
  "./assets/img/icons/logo-192.png",
  "./assets/img/icons/logo-512.png",
  "./assets/img/svg/camminamento-pattern.svg",
  "./assets/img/svg/misure-pattern.svg",
  "./assets/img/svg/clima-pattern.svg",
  "./assets/img/svg/acetosa.svg",
  "./assets/img/svg/agretti.svg",
  "./assets/img/svg/borragine.svg",
  "./assets/img/svg/broccolo_romanesco.svg",
  "./assets/img/svg/catalogna.svg",
  "./assets/img/svg/cerfoglio.svg",
  "./assets/img/svg/cimbru.svg",
  "./assets/img/svg/friggitello.svg",
  "./assets/img/svg/leurda.svg",
  "./assets/img/svg/melissa.svg",
  "./assets/img/svg/aglio.svg",
  "./assets/img/svg/aneto.svg",
  "./assets/img/svg/anguria.svg",
  "./assets/img/svg/barbabietola.svg",
  "./assets/img/svg/basilico.svg",
  "./assets/img/svg/bietola.svg",
  "./assets/img/svg/broccolo.svg",
  "./assets/img/svg/carota.svg",
  "./assets/img/svg/cavolfiore.svg",
  "./assets/img/svg/cavolo.svg",
  "./assets/img/svg/cavolonero.svg",
  "./assets/img/svg/cavolorapa.svg",
  "./assets/img/svg/cetriolo.svg",
  "./assets/img/svg/cicoria.svg",
  "./assets/img/svg/cipolla.svg",
  "./assets/img/svg/coriandolo.svg",
  "./assets/img/svg/cavoletti.svg",
  "./assets/img/svg/fagiolino.svg",
  "./assets/img/svg/fagiolo.svg",
  "./assets/img/svg/finocchio.svg",
  "./assets/img/svg/fragola.svg",
  "./assets/img/svg/indivia.svg",
  "./assets/img/svg/lattuga.svg",
  "./assets/img/svg/leaf.svg",
  "./assets/img/svg/logo.svg",
  "./assets/img/svg/melanzana.svg",
  "./assets/img/svg/melone.svg",
  "./assets/img/svg/origano.svg",
  "./assets/img/svg/peperoncino.svg",
  "./assets/img/svg/peperone.svg",
  "./assets/img/svg/pakchoi.svg",
  "./assets/img/svg/pisello.svg",
  "./assets/img/svg/pomodoro.svg",
  "./assets/img/svg/porro.svg",
  "./assets/img/svg/prezzemolo.svg",
  "./assets/img/svg/radicchio.svg",
  "./assets/img/svg/rapa.svg",
  "./assets/img/svg/ravanello.svg",
  "./assets/img/svg/rosmarino.svg",
  "./assets/img/svg/rucola.svg",
  "./assets/img/svg/salvia.svg",
  "./assets/img/svg/scalogno.svg",
  "./assets/img/svg/sedano.svg",
  "./assets/img/svg/spinaci.svg",
  "./assets/img/svg/timo.svg",
  "./assets/img/svg/valerianella.svg",
  "./assets/img/svg/verza.svg",
  "./assets/img/svg/zucca.svg",
  "./assets/img/svg/zucchina.svg"
];

/* Installa il Service Worker e precarica le risorse necessarie al funzionamento offline. */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
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

  // Per le pagine HTML prova prima la rete e usa la cache in caso di errore.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
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

  const destination = e.request.destination;
  const needsFreshCopy =
    destination === "style" ||
    destination === "script" ||
    destination === "manifest";

  // Per script e fogli di stile prova prima la rete, cosi' gli aggiornamenti
  // arrivano subito; usa la cache (ignorando la query di versione) solo se offline.
  if (needsFreshCopy) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          return response;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
    return;
  }

  // Per immagini e font usa la cache prima della rete per limitare richieste ripetute.
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
