const STATIC_CACHE = "fbl-radar-static-v1";
const DYNAMIC_CACHE = "fbl-radar-dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/materialize/materialize.min.css",
  "/materialize/materialize.min.js",
  "/api/fetchTeam.js",
  "/api/fetchStandings.js",
  "/api/fetchCompetitions.js",
  "/pages/Home.js",
  "/pages/Team.js",
  "/pages/Standing.js",
  "/pages/Favorite.js",
  "/pages/Merchandise.js",
  "/db.js",
  "/manifest.json",
  "/icons/app/favicon.ico",
  "/icons/app/favicon-16x16.png",
  "/icons/app/favicon-32x32.png",
  "/icons/app/favicon-96x96.png",
  "/icons/app/icon-72x72.png",
  "/icons/app/icon-96x96.png",
  "/icons/app/icon-128x128.png",
  "/icons/app/icon-144x144.png",
  "/icons/app/icon-152x152.png",
  "/icons/app/icon-192x192.png",
  "/icons/app/icon-384x384.png",
  "/icons/app/icon-512x512.png",
  "/icons/teams/CL.png",
  "/icons/teams/EC.png",
  "/icons/teams/PD.png",
  "/icons/teams/PL.png",
  "/icons/teams/SA.png",
  "/icons/teams/WC.png",
  "/icons/teams/BL1.png",
  "/icons/teams/BSA.png",
  "/icons/teams/DED.png",
  "/icons/teams/ELC.png",
  "/icons/teams/FL1.png",
  "/icons/teams/PPL.png",
  "/icons/teams/not-found.svg",
  "/images/mask.jpg",
  "/images/ball1.jpg",
  "/images/ball2.jpg",
  "/images/ball3.jpg",
  "/images/ball4.jpg",
  "/images/shoe1.jpg",
  "/images/shoe2.jpg",
  "/images/shoe3.jpg",
  "/images/shoe4.jpg",
  "/images/shoe5.jpg",
  "/images/shoe6.jpg",
  "/images/shoe7.jpg",
];

self.addEventListener("install", (event) => {
  console.log("Service worker has been installed");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching assets");
        cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()), // new service worker will be immediately activated
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key)),
      )),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (cacheResponse) => cacheResponse
        || fetch(event.request).then((fetchResponse) => caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        })),
    ),
  );
});
