const API = "https://api.football-data.org/v2/";
const { SNOWPACK_PUBLIC_API_KEY } = import.meta.env;

export const fetchCompetitions = async () => {
  try {
    const response = await fetch(`${API}competitions?plan=TIER_ONE`, {
      headers: {
        "X-Auth-Token": SNOWPACK_PUBLIC_API_KEY,
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
