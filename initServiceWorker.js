const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const registerServiceWorker = () => {
  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => console.log("Service worker is registered", registration))
    .catch((error) => console.error("Service worker is not registered", error));
};

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Permission is denied");
        return;
      }

      if (result === "default") {
        console.log("User close the dialog box");
        return;
      }

      console.log("Permission is granted");
    });
  }

  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BC2772s1DVR40hrwya7iXEm_-Kry8Ion-DPqATHLk3l2pfF7RrB94kurlbBE4TilI1QnIWEqGKKloIOpVVNYeLw",
          ),
        })
        .then((subscribe) => {
          console.log("Subscribe is successful");
          console.log(`Endpoint: ${subscribe.endpoint}`);
          console.log(
            `p256dh key: ${btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh")),
              ),
            )}`,
          );
          console.log(
            `auth key: ${btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth")),
              ),
            )}`,
          );
        })
        .catch((error) => console.error(`Subscribe is unsuccessful: ${error.message}`));
    });
  }
};

const initServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
  } else {
    console.error("Service worker is not supported in this browser");
  }
}

export default initServiceWorker;
