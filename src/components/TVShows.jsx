import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";

function TVShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setShows(data.shows); // pull shows from db.json
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load shows:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ color: "white", marginTop: "100px" }}>Loading TV Shows...</h2>;
  }

  return (
    <main className="container">
      <h1>TV Shows</h1>

      <div className="grid">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </main>
  );
}

export default TVShows;
