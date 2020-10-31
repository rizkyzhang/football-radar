const API = "https://api.football-data.org/v2/";
const { SNOWPACK_PUBLIC_API_KEY } = import.meta.env;

export const fetchStandings = async (id) => {
  try {
    const response = await fetch(`${API}competitions/${id}/standings`, {
      headers: {
        "X-Auth-Token": SNOWPACK_PUBLIC_API_KEY,
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
