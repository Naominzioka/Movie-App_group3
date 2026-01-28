import { useState } from "react";

function ShowCard({ show }) {
  // controls whether episodes are visible or hidden
  const [showEpisodes, setShowEpisodes] = useState(false);

  // keeps track of the episode the user clicked
  const [activeEpisode, setActiveEpisode] = useState(null);

  return (
    <div className="card">
      {/* poster image */}
      <img
      src={show.poster}
      alt={show.title}
      onError={(e) => {
        e.target.src = "/fallback-show.png";
      }}
      style={{
        width: "100%",
        height: "300px",
        objectFit: "cover",
        borderRadius: "8px"
        }}
        />


      {/* show info */}
      <div style={{ marginTop: "10px", color: "white" }}>
        <h3>{show.title}</h3>
        <p>{show.genre}</p>
        <span>{show.rating} ⭐</span>

        {/* toggle episodes */}
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
            cursor: "pointer"
          }}
        >
          {showEpisodes ? "Hide Episodes" : "Show Episodes"}
        </button>

        {/* episodes list */}
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
                  color:
                    activeEpisode?.name === episode.name
                      ? "#22c55e"
                      : "#93c5fd",
                  fontWeight:
                    activeEpisode?.name === episode.name
                      ? "bold"
                      : "normal"
                }}
              >
                ▶ {episode.name}
              </li>
            ))}
          </ul>
        )}

        {/* video player */}
        {activeEpisode && (
          <iframe
            src={`https://archive.org/embed/${
              activeEpisode.url.split("/download/")[1].split("/")[0]
            }`}
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
