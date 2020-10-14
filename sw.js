const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const assets = [
  "/",
  "/index.html",
  "/styles/materialize.min.css",
  "/scripts/materialize.min.js",
  "/scripts/index.js",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys.then(keys => {
      return Promise.all(
        keys
        .filter(key => key !== STATIC_CACHE)
        .map(key => caches.delete(key))
    )})
  );
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request).then(fetchResponse => {
        return caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
})