/* Definisce versione e risorse statiche da memorizzare nella cache dell'applicazione. */
const CACHE_VERSION = "20260720-2ac0e4293146";
// Incrementato a ogni rilascio forzato: assicura una nuova impronta della
// cache anche quando la modifica è principalmente grafica o di distribuzione.
const RELEASE_EPOCH = 2;
const CACHE = `serra-${CACHE_VERSION}`;

const PRECACHE = [
  "./",
  "./manifest.json",
  "./assets/img/icons/logo-180.png",
  "./assets/img/icons/logo-192.png",
  "./assets/img/icons/logo-512.png",
  "./assets/img/svg/logo.svg"
];

/* Installa il Service Worker e precarica le risorse necessarie al funzionamento offline.
   Usa cache.add() singolarmente invece di cache.addAll(): con addAll(), se
   anche una sola URL della lista fallisce (file rinominato, non ancora
   generato, 404 momentaneo), l'INTERA installazione viene rifiutata e il
   nuovo worker resta bloccato in stato "waiting" per sempre — l'utente
   rimane sulla versione vecchia a tempo indeterminato, esattamente il
   sintomo di "a volte resta la cache vecchia". Con singoli cache.add() una
   risorsa mancante viene solo segnalata in console, senza bloccare le altre. */
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

  // Per le pagine HTML prova prima la rete e usa la cache in caso di errore.
  // { cache: "no-store" } forza il bypass della cache HTTP del browser: senza
  // questa opzione, fetch() può restituire silenziosamente una risposta HTTP
  // già in cache (per via di intestazioni cache-control o euristiche del
  // browser), vanificando la strategia "prima la rete" in modo imprevedibile
  // — è la causa più probabile del "a volte resta la cache vecchia, a volte
  // no" segnalato: dipendeva da quando la cache HTTP del browser, non quella
  // del Service Worker, decideva di rispondere lei senza andare in rete.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then((response) => {
          const copy = response.clone();
          // e.waitUntil() mantiene vivo il worker finché la scrittura in
          // cache non è completata: senza, il browser può terminare il
          // worker subito dopo aver restituito la risposta e la promise
          // "orfana" di cache.put() viene interrotta a metà, lasciando la
          // cache non aggiornata in modo incostante.
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

  // Ogni asset viene richiesto prima alla rete: dopo un push GitHub Pages
  // l'iPhone riceve sempre CSS, JavaScript e immagini correnti, anche se chi
  // pubblica ha dimenticato di aggiornare il parametro ?v=. La cache rimane
  // esclusivamente un fallback quando il dispositivo è offline.
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
