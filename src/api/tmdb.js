const BASE_URL = "http://localhost:6001"; 

export const fetchMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movies`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
