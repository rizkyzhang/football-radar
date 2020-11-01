import { fetchTeam } from "../api/fetchTeam";

const buildHTML = (player) => ` 
    <li>
      <div class="collapsible-header">
        <i class="material-icons">person</i>${player.name}
      </div>
      <div class="collapsible-body">
        <p>Name: ${player.name}</p>
        <p>Nationality: ${player.nationality}</p>
        <p>Country of birth: ${player.countryOfBirth}</p>
        <p>Date of birth: ${new Date(player.dateOfBirth).toLocaleDateString(
          "id",
        )}</p>
        <p>Position: ${player.position}</p>
        <p>Role: ${player.role}</p>
      </div>
    </li>`;

const getTeamContent = async (id) => {
  const team = await fetchTeam(id);
  const squad = await team.squad;
  let html = "";

  squad.forEach((player) => {
    html += buildHTML(player);
  });

  const teamEncodedDataset = encodeURIComponent(JSON.stringify(team));

  return `
    <div class="container">
      <div class="card single-card">
          <div class="card-image">
            <img src=${
              team.crestUrl
                ? team.crestUrl.replace(/^http:\/\//i, "https://")
                : "../icons/teams/not-found.svg"
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

      <div data-team=${teamEncodedDataset} class="favorite-btn fixed-action-btn">
        <a data-team=${teamEncodedDataset} class="favorite-btn btn-floating btn-large red lighten-1 pulse">
          <i data-team=${teamEncodedDataset} class="favorite-btn large material-icons">favorite</i>
        </a>
      </div>
    </div>`;
};

export default getTeamContent;
