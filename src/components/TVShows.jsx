import React, { useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";

function TVShows({ setActiveTab }) {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch TV shows from db.json
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
      <div className="status-screen">
        <h2>{loading ? "Loading TV shows..." : `Error: ${error}`}</h2>
      </div>
    );
  }

  // Filter shows based on search
  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      {/* Reusing the same header so UI stays consistent */}
      <Header
        onGoToMovies={() => setActiveTab("movies")}
        onGoToMyList={() => setActiveTab("mylist")}
        onGoToShows={() => setActiveTab("shows")}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* EPISODE PLAYER VIEW */}
      {selectedEpisode ? (
        <div className="player-view">
          <button className="back-button" onClick={() => setSelectedEpisode(null)}>
            ← Back to Episodes
          </button>

          <div className="video-box">
            <iframe
              src={`https://archive.org/embed/${selectedEpisode.url.split("/download/")[1].split("/")[0]}`}
              width="100%"
              height="480"
              allowFullScreen
              title={selectedEpisode.name}
            />
          </div>

          <h2>{selectedEpisode.name}</h2>
        </div>
      ) : selectedShow ? (
        /* EPISODE LIST VIEW */
        <>
          <button className="back-button" onClick={() => setSelectedShow(null)}>
            ← Back to Shows
          </button>

          <h1>{selectedShow.title}</h1>

          <div className="grid">
            {selectedShow.episodes.map((episode, index) => (
              <div key={index} className="card">
                <div className="card-meta">
                  <h3>{episode.name}</h3>

                  <button
                    className="list-btn"
                    onClick={() => setSelectedEpisode(episode)}
                  >
                    ▶ Play Episode
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* SHOWS GRID VIEW */
        <>
          <h1>TV Shows</h1>

          {filteredShows.length === 0 ? (
            <p>No shows found matching "{searchTerm}"</p>
          ) : (
            <div className="grid">
              {filteredShows.map((show) => (
                <div key={show.id} className="card">
                  <img
                    src={show.poster}
                    alt={show.title}
                    onClick={() => setSelectedShow(show)}
                  />

                  <div className="card-meta">
                    <h3>{show.title}</h3>
                    <span>{show.rating} ⭐</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default TVShows;
