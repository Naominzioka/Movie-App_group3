import { useState } from "react";

function ShowCard({ show, addToMyList }) {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(null);

  const getEpisodeIdentifier = (url) => {
    if (!url) return null;
    const match = url.match(/archive\.org\/download\/([^\/]+)/);
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
          style={{ marginTop: "10px" }}
          onClick={() => addToMyList({ ...show, type: "show" })}
        >
          + My List
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
                  color: activeEpisode?.name === episode.name ? "#22c55e" : "#93c5fd",
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
          <iframe
            src={`https://archive.org/embed/${getEpisodeIdentifier(activeEpisode.url)}`}
            width="100%"
            height="200"
            allowFullScreen
            title={activeEpisode.name}
            style={{ marginTop: "10px", borderRadius: "6px" }}
          />
        )}
      </div>
    </div>
  );
}

export default ShowCard;
