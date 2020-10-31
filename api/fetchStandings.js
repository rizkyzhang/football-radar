const API = "https://api.football-data.org/v2/";
const API_KEY = "03755127bfc449eebb8399d212f3627f";

export const fetchStandings = async (id) => {
  try {
    const response = await fetch(`${API}competitions/${id}/standings`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const standings = await response.json();

    return standings;
  } catch (error) {
    console.error(error);
  }
};
