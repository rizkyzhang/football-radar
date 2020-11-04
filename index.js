import Router from "vanilla-router";
import { addData, deleteSingleData, getSingleData } from "./db";

import initServiceWorker from "./initServiceWorker";
import getHomeContent from "./pages/Home";
import getStandingContent from "./pages/Standing";
import getTeamContent from "./pages/Team";
import getFavoriteContent from "./pages/Favorite";
import getMerchandiseContent from "./pages/Merchandise";

const app = document.querySelector(".app");
const navLinks = document.querySelectorAll(".nav-link");

const router = new Router({
  mode: "hash",
  page404(path) {
    console.log(`"/${path}" Page not found`);
  },
});

const loadingCircle = `
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

router.add("", async () => {
  app.innerHTML = loadingCircle;

  const content = await getHomeContent();
  app.innerHTML = content;
});

router.add("standings/(:num)", async (id) => {
  app.innerHTML = loadingCircle;

  const content = await getStandingContent(+id);
  app.innerHTML = content;
});

router.add("teams/(:num)", async (id) => {
  app.innerHTML = loadingCircle;

  const content = await getTeamContent(+id);
  app.innerHTML = content;
});

router.add("favorite", async () => {
  app.innerHTML = loadingCircle;

  const content = await getFavoriteContent();
  app.innerHTML = content;
});

router.add("merchandise", () => {
  app.innerHTML = loadingCircle;

  const content = getMerchandiseContent();
  app.innerHTML = content;
});

router.addUriListener();
router.check();

document.addEventListener("DOMContentLoaded", () => {
  initServiceWorker();

  const sidenav = document.querySelector(".sidenav");
  M.Sidenav.init(sidenav);

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (event) => {
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
    }

    window.location.reload();
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

      window.location.reload();
    }
  }

  if (event.target.classList.contains("dynamic-link")) {
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});
