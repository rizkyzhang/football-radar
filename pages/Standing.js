import { fetchStandings } from "../api/fetchStandings";

const buildHTML = (standingInfo) => ` 
  <tr>
    <td>${standingInfo.position}</td>
    <td><a href="/teams/${standingInfo.team.id}" class="dynamic-link">${standingInfo.team.name}</NavLink></td>
    <td>${standingInfo.won}</td>
    <td>${standingInfo.lost}</td>
    <td>${standingInfo.draw}</td>
    <td>${standingInfo.points}</td>
  </tr>
`;

const getStandingContent = async (id) => {
  const standings = await fetchStandings(id);
  const standing = await standings.standings[0].table;
  let html = "";

  standing.forEach((standingInfo) => {
    html += buildHTML(standingInfo);
  });

  return `
    <div class="container">
      <div class="card single-card z-depth-3">
        <div class="card-image">
          <img alt="Competition Logo" src="../icons/competitions/${
            standings.competition.code
          }.png">
        </div>
        <div class="card-content">
          <h5 class="truncate">${standings.competition.name}</h5>
          <h6>${standings.competition.area.name}</h6>
          <p>Start: ${standings.season.startDate}</p>
          <p>End: ${standings.season.endDate}</p>
          <p>Last Updated: ${new Date(
            standings.competition.lastUpdated,
          ).toLocaleDateString("id")}</p>
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
