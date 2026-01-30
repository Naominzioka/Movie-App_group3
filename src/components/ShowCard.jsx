import { useState } from "react";

function ShowCard({ show, addToMyList, myList }) {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(null);

  const isAdded = myList?.some((i) => i.id === show.id);

  // Safe extraction of Archive.org identifier for episodes
  const getEpisodeIdentifier = (url) => {
    // Return null if URL is not provided
    if (!url) return null;
    // Regular expression to match the identifier pattern
    const match = url.match(/archive\.org\/download\/([^\/]+)/);
    // Return the captured identifier or null if no match
    return match ? match[1] : null;
  };

  return (
    <div className="card">
      <img
        src={show.poster}
        alt={show.title}
        onError={(e) => (e.target.src = "/fallback-show.png")}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
      />

      <div style={{ marginTop: "10px", color: "white" }}>
        <h3>{show.title}</h3>
        <p>{show.genre}</p>
        <span>{show.rating} ⭐</span>

        {/* Add to My List */}
        <button
          className="list-btn"
          style={{ marginTop: "10px", backgroundColor: isAdded ? "#f02308ff" : "#1a3a5a", }}
          onClick={() => addToMyList({ ...show, type: "show" })}
        >
          {isAdded ? "Added" : "+ My List"}
        </button>

        {/* Toggle episodes */}
        <button
          onClick={() => setShowEpisodes(!showEpisodes)}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "6px 12px",
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showEpisodes ? "Hide Episodes" : "Show Episodes"}
        </button>

        {/* Episodes list */}
        {showEpisodes && (
          <ul style={{ marginTop: "10px", paddingLeft: "0" }}>
            {show.episodes.map((episode, index) => (
              <li
                key={index}
                onClick={() => setActiveEpisode(episode)}
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  padding: "6px 0",
                  color: activeEpisode?.name === episode.name ? "#c55022ff" : "#93c5fd",
                  fontWeight: activeEpisode?.name === episode.name ? "bold" : "normal",
                }}
              >
                ▶ {episode.name}
              </li>
            ))}
          </ul>
        )}

        {/* Episode video player */}
        {activeEpisode && (
          <div className="player-container" style={{ marginTop: "15px" }}>
            {/* 1. The Button must be at the top of this block */}
            <button
              className="back-button"
              onClick={() => setActiveEpisode(null)}
              style={{ marginBottom: "10px", display: "block" }}
            >
              ← Close Player
            </button>
            <iframe
              src={`https://archive.org/embed/${getEpisodeIdentifier(activeEpisode.url)}`}
              width="100%"
              height="250"
              allowFullScreen
              title={activeEpisode.name}
              style={{ borderRadius: "6px", border: "1px solid #333" }}
            />
            <p style={{ color: "#93c5fd", marginTop: "5px" }}>Playing: {activeEpisode.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowCard;
