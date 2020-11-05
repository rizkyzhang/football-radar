const API = "https://api.football-data.org/v2/";
const API_KEY = "03755127bfc449eebb8399d212f3627f";

export const fetchTeam = async (id) => {
  try {
    const response = await fetch(`${API}/teams/${id}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      const message = `Fetch error: ${response.status}`;
      throw new Error(message);
    }

    const team = response.json();

    return team;
  } catch (error) {
    console.error(error);
  }
};
