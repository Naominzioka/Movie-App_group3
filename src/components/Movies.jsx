import React, { useState } from "react";
import "../App.css";
import useFetchData from "../Hooks/useFetchData"

const Movies = ({ addToMyList, searchTerm , myList}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const {data, loading, error} = useFetchData("/db.json");

  // Safe extraction of Archive.org identifier
  //it extracts the unique identifier from the "API-URL" field of the selected movie object.
  const getArchiveIdentifier = (url) => {
    if (!url) return null;
    // Regular expression to match the identifier pattern
    const match = url.match(/archive\.org\/download\/([^\/]+)/);
    // Return the captured identifier or null if no match
    //match[1] contains the captured identifier from the URL
    return match ? match[1] : null;
  };

  if (loading || error) {
    return (
      <div className="status-screen">
        <h2>{loading ? "Loading movies..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  // Filter movies based on search term
  const filteredMovies = (data?.movies || []).filter((movie) =>
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
            {/* Embed iframe for the movie media */}
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
                    style={{
                      backgroundColor: myList.some((i) => i.id === movie.id) ? "#eb2b1dff" : "#1a3a5a", // green if added
                    }}
                    onClick={() => addToMyList({ ...movie, type: "movie" })}
                  >

                    {myList.some((i) => i.id === movie.id) ? "Added" : "+ My List"}
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
