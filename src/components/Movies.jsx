import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.jsx';

const MoviePlayer = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [data, setData] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("")
    const filteredMovies = data.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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

  const getArchiveIdentifier = (url) => {
    const match = url.match(/archive\.org\/download\/([^\/]+)/);
    return match ? match[1] : null;
  };

  if (loading || error) {
    return (
        <main className="container">
            <Header searchTerm={searchTerm} //pass search state as props so header and search can access data defined here
                setSearchTerm={setSearchTerm}
                onGoToMovies={() => {
                    console.log("Parent received reset signal!");
                    setSelectedMovie(null);
                }} />
            {selectedMovie ? (
                <div className="player-view">
                    <button className="back-button" onClick={() => setSelectedMovie(null)}>← Back</button>

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
        /* ================= MOVIES TAB ================= */
        <section className="gallery">
          <h1>Movies</h1>
          <div className="grid">
            {data.movies.map((movie) => (
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
                  >
                    + My List
                  </button>
                </div>
            ) : (
                <section className="gallery">
                    <h1>Movies</h1>
                    <div className="grid">
                        {filteredMovies.map((movie) => (
                            <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                                <img src={movie.poster} alt={movie.title} />
                                <div className="card-meta">
                                    <h3>{movie.title}</h3>
                                    <span>{movie.rating} ⭐</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default MoviePlayer;
