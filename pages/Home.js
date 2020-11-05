import { fetchCompetitions } from "../api/fetchCompetitions";

const buildHTML = (competition) => ` 
    <div class="col s12 m6 l4">
      <div class="card hoverable z-depth-2">
        <div class="card-image">
            <img alt="Competition Logo" class="padded" src="../icons/competitions/${competition.code}.png" />
        </div>
        <div class="card-content">
            <h5 class="truncate">${competition.name}</h5>
            <h6>${competition.area.name}</h6>
            <p>Start: ${competition.currentSeason.startDate}</p>
            <p>End: ${competition.currentSeason.endDate}</p>
        </div>
        <div class="card-action">
            <a href="/standings/${competition.id}" class="dynamic-link full-width btn blue lighten-1 waves-effect waves-light">Detail</a>
        </div>
      </div>
    </div>
  `;

const getHomeContent = async () => {
  const { competitions } = await fetchCompetitions();
  let html = "";

  competitions.forEach((competition) => {
    html += buildHTML(competition);
  });

  return `
    <div class="container">
      <div class="row">
        ${html}
      </div>
    </div>
  `;
};

export default getHomeContent;
