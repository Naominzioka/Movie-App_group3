import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.jsx';

const MoviePlayer = ({
  myList,
  addToMyList,
  removeFromMyList,
  activeTab,
  setActiveTab,
}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [data, setData] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((jsonData) => {
        // Remove duplicates from the loaded data
        const uniqueMovies = jsonData.movies.reduce((acc, movie) => {
          if (!acc.find(m => m.id === movie.id)) {
            acc.push(movie);
          }
          return acc;
        }, []);

        setData({ ...jsonData, movies: uniqueMovies });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getArchiveIdentifier = (url) => {
    const match = url?.match(/archive\.org\/download\/([^\/]+)/);
    return match ? match[1] : null;
  };

  // Filter movies based on search term
  const filteredMovies = data.movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter myList based on search term
  const filteredMyList = myList.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || error) {
    return (
      <div className="status-screen">
        <h2>{loading ? "Loading movies..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  return (
    <main className="container">
      <Header
        onGoToMovies={() => {
          setActiveTab("movies");
          setSelectedMovie(null);
        }}
        onGoToMyList={() => {
          setActiveTab("mylist");
          setSelectedMovie(null);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/*  PLAYER VIEW  */}
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
      ) : activeTab === "movies" ? (
        /*  MOVIES TAB  */
        <section className="gallery">
          <h1>Movies</h1>
          {filteredMovies.length === 0 ? (
            <p>No movies found matching "{searchTerm}"</p>
          ) : (
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
                      onClick={() => addToMyList(movie)}
                      disabled={myList.find(m => m.id === movie.id)}
                    >
                      {myList.find(m => m.id === movie.id) ? '✓ In List' : '+ My List'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        /*  MY LIST TAB  */
        <section className="gallery">
          <button
            className="back-button"
            style={{ marginBottom: "20px" }}
            onClick={() => setActiveTab("movies")}
          >
            ← Back to Movies
          </button>

          <h1>My List</h1>

          {myList.length === 0 ? (
            <p>No movies added yet.</p>
          ) : filteredMyList.length === 0 ? (
            <p>No movies in your list match "{searchTerm}"</p>
          ) : (
            <div className="grid">
              {filteredMyList.map((movie) => (
                <div key={movie.id} className="card">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    onClick={() => setSelectedMovie(movie)}
                  />

                  <div className="card-meta">
                    <h3>{movie.title}</h3>

                    <button
                      className="list-btn remove"
                      onClick={() => removeFromMyList(movie.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default MoviePlayer;