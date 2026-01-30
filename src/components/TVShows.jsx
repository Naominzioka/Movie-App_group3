
import ShowCard from "./ShowCard";
import useFetchData from "../Hooks/useFetchData";
import "../App.css";
import { useNavigate } from "react-router-dom";

function TVShows({ addToMyList, searchTerm, myList }) {
  const navigate = useNavigate();
  const { data, loading, error } = useFetchData("/db.json");

  if (loading || error) {
    return (
      <div style={{ color: "white", marginTop: "100px" }}>
        <h2>{loading ? "Loading TV Shows..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  const filteredShows = (data?.shows || []).filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        style={{ marginTop: "20px" }}
      >
        ← Back
      </button>

      <h1>TV Shows</h1>
      <div className="grid">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} addToMyList={addToMyList} myList={myList} />
        ))}
      </div>
    </main>
  );
}

export default TVShows;
