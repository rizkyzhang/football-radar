const API = "https://api.football-data.org/v2/";
const API_KEY = "03755127bfc449eebb8399d212f3627f";

export const fetchCompetitions = async () => {
  try {
    const response = await fetch(`${API}competitions?plan=TIER_ONE`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const competitions = await response.json();

    return competitions;
  } catch (error) {
    console.error(error);
  }
};
