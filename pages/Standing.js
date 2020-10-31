import { fetchStandings } from "../api/fetchStandings";
import { addData, getSingleData } from "../db";

const buildHTML = (standingInfo) => {
  return ` 
    <tr>
      <td>${standingInfo.position}</td>
      <td><a class="dynamic-link" href="/teams/${standingInfo.team.id}">${standingInfo.team.name}</NavLink></td>
      <td>${standingInfo.won}</td>
      <td>${standingInfo.lost}</td>
      <td>${standingInfo.draw}</td>
      <td>${standingInfo.points}</td>
    </tr>
  `;
};

const getStandingContent = async (id) => {
  let html = ``;

  const standings = await fetchStandings(id);
  let standing = await standings.standings[0].table;

  standing.forEach((standingInfo) => {
    html += buildHTML(standingInfo);
  });

  return `
        <div class="container">
          <div class="card single-card z-depth-3">
            <div class="card-image">
              <img src="../icons/teams/${standings.competition.code}.png">
            </div>
            <div class="card-content">
              <h5 class="truncate">${standings.competition.name}</h5>
              <h6>${standings.competition.area.name}</h6>
              <p>Start: ${standings.season.startDate}</p>
              <p>End: ${standings.season.endDate}</p>
              <p>Last Updated: ${standings.competition.lastUpdated}</p>
            </div>
          </div>

          <table class="responsive-table centered striped z-depth-4">        
            <thead>
              <tr>
                <th data-field="rank">Rank</th>
                <th data-field="team">Team</th>
                <th data-field="won">Won</th>
                <th data-field="lost">Lost</th>
                <th data-field="draw">Draw</th>
                <th data-field="points">Points</th>
              </tr>
            </thead>
            <tbody>
              ${html}
            </tbody>
          </table>
        </div>`;
};

export default getStandingContent;
