import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Search from "./Search";

const Movies = ({ addToMyList, setActiveTab, searchTerm, setSearchTerm }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [data, setData] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe extraction of Archive.org identifier
  const getArchiveIdentifier = (url) => {
    if (!url) return null;
    const match = url.match(/archive\.org\/download\/([^\/]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading || error) {
    return (
      <div className="status-screen">
        <h2>{loading ? "Loading movies..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  const filteredMovies = data.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      

      {selectedMovie ? (
        <div className="player-view">
          <button
            className="back-button"
            onClick={() => setSelectedMovie(null)}
          >
            ← Back
          </button>

          <div className="video-box">
            <iframe
              src={`https://archive.org/embed/${getArchiveIdentifier(
                selectedMovie["API-URL"]
              )}`}
              width="100%"
              height="480"
              allowFullScreen
              title={selectedMovie.title}
            />
          </div>

          <div className="movie-details">
            <h2>
              {selectedMovie.title} ({selectedMovie.year})
            </h2>
            <p>
              <strong>Genre:</strong> {selectedMovie.genre}
            </p>
            <p>{selectedMovie.description}</p>
          </div>
        </div>
      ) : (
        <section className="gallery">
          <h1>Movies</h1>
          <div className="grid">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onClick={() => setSelectedMovie(movie)}
                />
                <div className="card-meta">
                  <h3>{movie.title}</h3>
                  <span>{movie.rating} ⭐</span>
                  <button
                    className="list-btn"
                    onClick={() => addToMyList({ ...movie, type: "movie" })}
                  >
                    + My List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Movies;
