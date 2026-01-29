import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import Header from "./Header";

function TVShows({ addToMyList, setActiveTab, searchTerm, setSearchTerm }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setShows(data.shows || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading || error) {
    return (
      <div style={{ color: "white", marginTop: "100px" }}>
        <h2>{loading ? "Loading TV Shows..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
     

      <h1>TV Shows</h1>
      <div className="grid">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} addToMyList={addToMyList} />
        ))}
      </div>
    </main>
  );
}

export default TVShows;
