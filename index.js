import Router from "vanilla-router";
import { addData, deleteSingleData, getSingleData } from "./db";

import getHomeContent from "./pages/Home";
import getStandingContent from "./pages/Standing";
import getTeamContent from "./pages/Team";
import getFavoriteContent from "./pages/Favorite";
import getMerchandiseContent from "./pages/Merchandise";

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
    .catch((error) => console.log("Service worker is not registered", error));
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

if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.error("Service worker is not supported in this browser");
}

const app = document.querySelector(".app");
const links = document.querySelectorAll("a");

const router = new Router({
  mode: "hash",
  page404(path) {
    console.log(`"/${path}" Page not found`);
  },
});

router.add("", async () => {
  app.innerHTML = `
    <div class="container preloader-style">   
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = await getHomeContent();
  app.innerHTML = content;
});

router.add("standings/(:num)", async (id) => {
  app.innerHTML = `
    <div class="container preloader-style">   
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = await getStandingContent(+id);
  app.innerHTML = content;
});

router.add("teams/(:num)", async (id) => {
  app.innerHTML = `
    <div class="container preloader-style">   
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = await getTeamContent(+id);
  app.innerHTML = content;
});

router.add("favorite", async () => {
  app.innerHTML = `
    <div class="container preloader-style">   
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = await getFavoriteContent();
  app.innerHTML = content;
});

router.add("merchandise", () => {
  app.innerHTML = `
    <div class="container preloader-style">   
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = getMerchandiseContent();
  app.innerHTML = content;
});

router.addUriListener();
router.check();

document.addEventListener("DOMContentLoaded", () => {
  const sidenav = document.querySelector(".sidenav");
  M.Sidenav.init(sidenav);

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      M.Sidenav.getInstance(sidenav).close();
      router.navigateTo(event.target.getAttribute("href"));
    });
  });
});

app.addEventListener("click", async (event) => {
  const collapsible = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsible);

  if (event.target.classList.contains("favorite-btn")) {
    const teamId = +window.location.href.split("/")[4];
    const teamIDB = await getSingleData("favorite", teamId);
    const teamDecodedDataset = JSON.parse(
      decodeURIComponent(event.target.dataset.team),
    );

    if (!teamIDB) {
      addData("favorite", teamDecodedDataset);

      M.toast({
        html: `${teamDecodedDataset.name} has been added to the favorite page`,
      });
    } else {
      M.toast({
        html: `${teamDecodedDataset.name} has already been added to the favorite page`,
      });
    }
  }

  if (event.target.classList.contains("delete-btn")) {
    const teamDecodedDataset = await JSON.parse(
      decodeURIComponent(event.target.dataset.team),
    );
    const teamId = await teamDecodedDataset.id;

    if (teamId) {
      deleteSingleData("favorite", teamId);

      M.toast({
        html: `${teamDecodedDataset.name} has been deleted from the favorite page`,
      });

      window.location.reload(); // Refresh page
    }
  }

  if (event.target.classList.contains("dynamic-link")) {
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});
