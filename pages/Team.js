import { fetchTeam } from "../api/fetchTeam";
import { addData, getSingleData } from "../db.js";

const buildHTML = (player) => {
  return ` 
    <li>
      <div class="collapsible-header">
        <i class="material-icons">person</i>${player.name}
      </div>
      <div class="collapsible-body">
        <p>Name: ${player.name}</p>
        <p>Nationality: ${player.nationality}</p>
        <p>Country of birth: ${player.countryOfBirth}</p>
        <p>Date of birth: ${player.dateOfBirth}</p>
        <p>Position: ${player.position}</p>
        <p>Role: ${player.role}</p>
      </div>
    </li>`;
};

const getTeamContent = async (id) => {
  let html = ``;

  const team = await fetchTeam(id);
  const squad = await team.squad;

  squad.forEach((player) => {
    html += buildHTML(player);
  });

  const string = encodeURIComponent(JSON.stringify(team));
  // console.log(JSON.parse(string));

  return `
        <div class="container">
          <div class="card single-card">
              <div class="card-image">
                <img src=${
                  team.crestUrl
                    ? team.crestUrl.replace(/^http:\/\//i, "https://")
                    : "../logos/not-found.svg"
                }>
              </div>
              <div class="card-content">
                <h5 className="truncate">${team.name}</h5>
                <h6>${team.area.name}</h6>
                <p>Founded: ${team.founded}</p>
                <p>Club Colors: ${team.clubColors}</p>
                <p>Address: ${team.address}</p>
                <p>Email: <a href="mailto:${team.email}"}>${team.email}</a></p>
                <p>Website: <a href=${team.website}>${team.website}</a></p>
              </div>
          </div>

          <ul class="collapsible popout">
            ${html}
          </ul>

          <div data-team=${string} class="fixed-action-btn fav">
            <a  data-team=${string} class="fav btn-floating btn-large red">
              <i data-team=${string} class="fav large material-icons">favorite</i>
            </a>

            </ul>
          </div>
        </div>`;
};

export default getTeamContent;
