import Router from "vanilla-router";
import { addData, getSingleData } from "./db";
import getHomeContent from "./pages/Home";
import getStandingContent from "./pages/Standing";
import getTeamContent from "./pages/Team";
const app = document.querySelector(".app");
const links = document.querySelectorAll("a");

const router = new Router({
  mode: "hash",
  page404(path) {
    console.log(`"/${path}" Page not found`);
  },
});

router.add("favorite", () => (app.innerHTML = "<h1>Favorite</h1>"));

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

router.addUriListener();
router.check();

document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) =>
        console.log("Service worker is registered", registration)
      )
      .catch((error) => console.log("Service worker is not registered", error));
  } else {
    console.log("Service Worker is not supported in this browser");
  }

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

  if (event.target.classList.contains("fav")) {
    const teamId = +window.location.href.split("/")[4];
    const team = await getSingleData("favorite", teamId);
    console.log(team);

    if (!team) {
      addData(
        "favorite",
        JSON.parse(decodeURIComponent(event.target.dataset.team))
      );
    }
  }

  if (event.target.classList.contains("dynamic-link")) {
    event.preventDefault();
    router.navigateTo(event.target.getAttribute("href"));
  }
});
