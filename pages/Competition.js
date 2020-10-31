import { fetchCompetition } from "../api/fetchCompetition";
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

const getCompetitionContent = async (id) => {
  const standings = await getSingleData("standings", id);
  const standing = await standings.standing[0].table;
  let html = ``;

  if (standings && standing) {
    standing.forEach((standingInfo) => {
      html += buildHTML(standingInfo);
    });
  } else {
    const standings = await fetchStandings();
    const standing = await standings.standing[0].table;

    addData("standings", standing);

    standing.forEach((standingInfo) => {
      html += buildHTML(standingInfo);
    });
  }

  return `
        <div class="container">
          <div class="card single-card z-depth-3">
            <div class="card-image">
              <img src="../icons/teams/${standings.competition.code}.png">
            </div>
            <div class="card-content">
              <h5 class="truncate">${standings.competition.name}</h5>
              <h6>${standings.competition.area.name}</h6>
              <p>Start: ${competition.season.startDate}</p>
              <p>End: ${competition.season.endDate}</p>
              <p>Last Updated: ${competition.competition.lastUpdated}</p>
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

export default getCompetitionContent;
