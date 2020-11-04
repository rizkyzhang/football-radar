importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js",
);

if (workbox) {
  console.log("Workbox is successfully loaded :)");
} else {
  console.log("Workbox didn't load :(");
}

const { registerRoute } = workbox.routing;
const { precacheAndRoute } = workbox.precaching;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/materialize/materialize.min.css",
  "/materialize/materialize.min.js",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/initServiceWorker.js",
  "/db.js",
  "/api/fetchTeam.js",
  "/api/fetchStandings.js",
  "/api/fetchCompetitions.js",
  "/pages/Home.js",
  "/pages/Team.js",
  "/pages/Standing.js",
  "/pages/Favorite.js",
  "/pages/Merchandise.js",
  "/web_modules/vanilla-router.js",
  "/web_modules/idb.js",
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
  "/icons/competitions/CL.png",
  "/icons/competitions/EC.png",
  "/icons/competitions/PD.png",
  "/icons/competitions/PL.png",
  "/icons/competitions/SA.png",
  "/icons/competitions/WC.png",
  "/icons/competitions/BL1.png",
  "/icons/competitions/BSA.png",
  "/icons/competitions/DED.png",
  "/icons/competitions/ELC.png",
  "/icons/competitions/FL1.png",
  "/icons/competitions/PPL.png",
  "/icons/competitions/not-found.svg",
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

precacheAndRoute(
  STATIC_ASSETS.map((STATIC_ASSET) => ({
    url: STATIC_ASSET,
    revision: "1",
  })),
);

registerRoute(
  ({ url }) => url.origin === "https://api.football-data.org",
  new StaleWhileRevalidate({
    cacheName: "football-data-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === "https://crests.football-data.org",
  new CacheFirst({
    cacheName: "team-logo",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

self.addEventListener("notificationclick", (event) => {
  if (!event.action) {
    return;
  }

  switch (event.action) {
  case "cool":
    console.log("User choose cool");
    break;
  case "nope":
    console.log("User choose nope");
    break;
  default:
    console.log(`Unknown action: ${event.action}`);
    break;
  }
});

self.addEventListener("push", (event) => {
  const body = event.data ? event.data.text() : "No payload detected";

  const options = {
    body,
    icon: "./icons/app/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "cool",
        title: "cool",
      },
      {
        action: "nope",
        title: "nope",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  );
});
