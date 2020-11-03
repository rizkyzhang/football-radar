import { getAllData } from "../db";

const buildHTML = (team) => {
  const teamEncodedDataset = encodeURIComponent(JSON.stringify(team));

  return `
    <div class="col s12 m6 l4">
      <div class="card hoverable z-depth-2">
        <div class="card-image">
          <img style="height:300px;" class="padded" src=${
            team.crestUrl
              ? team.crestUrl.replace(/^http:\/\//i, "https://")
              : "../logos/not-found.svg"
          }>
        </div>
        <div class="card-content">
          <h5 class="truncate">${team.name}</h5>
          <h6>${team.area.name}</h6>
        </div>
        <div class="card-action">
          <a href="/teams/${team.id}"
             class="dynamic-link full-width btn blue lighten-1 waves-effect waves-light"
             style="margin-bottom:0.5rem;"
          >
            Detail
          </a>

          <button data-team=${teamEncodedDataset} class="delete-btn full-width btn red lighten-1 waves-effect waves-light">Delete</button>
        </div>
      </div>
    </div>
  `;
};

const getFavoriteContent = async () => {
  const favorite = await getAllData("favorite");
  let html = "";

  if (favorite.length > 0) {
    favorite.forEach((team) => {
      html += buildHTML(team);
    });

    return `
      <div class="container">
        <div class="row">
          ${html}
        </div>
      </div>
    `;
  }

  return `
    <div class="container">
      <h3>Nothing to see here :(</h3>
    </div>
  `;
};

export default getFavoriteContent;
