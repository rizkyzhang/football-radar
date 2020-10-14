if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker is registered"))
    .catch(() => console.log("Service Worker is not registered"));
}