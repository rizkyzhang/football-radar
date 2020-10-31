const API = "https://api.football-data.org/v2/";
const { SNOWPACK_PUBLIC_API_KEY } = import.meta.env;

export const fetchTeam = async (id) => {
  try {
    const response = await fetch(`${API}/teams/${id}`, {
      headers: {
        "X-Auth-Token": SNOWPACK_PUBLIC_API_KEY,
      },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const team = response.json();

    return team;
  } catch (error) {
    console.error(error);
  }
};
