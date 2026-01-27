//This ShowCard component handles UI +interaction
import { useState } from "react";

function ShowCard({ show }) {
    const [showEpisodes, setShowEpisodes] = useState(false);
    
    return (
      <div
        style={{
          display: "flex",
          gap: "16px",
          border: "1px solid #444",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "16px",
          backgroundColor: "#111"
        }}
      >
        {/* Poster */}
        <img
          src={show.poster}
          alt={show.title}
          style={{
            width: "120px",
            borderRadius: "6px",
            objectFit: "cover"
          }}
        />
  
        {/* Info */}
        <div>
          <h3>{show.title}</h3>
          <p><strong>Genre:</strong> {show.genre}</p>
          <p><strong>Rating:</strong> {show.rating}</p>
          <p>{show.description}</p>

          {/*Toggle button*/}
          <button
          onClick= {()=> setShowEpisodes(!showEpisodes)}
          style={{
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
{/*episodes list*/ }

{showEpisodes && (
    <ul style={{ marginTop: "10px" }}>
      {show.episodes.map((episode, index) => (
        <li key={index}>
          {episode.name}
        </li>
      ))}
    </ul>
  )}
        </div>
      </div>
    );
  }
  
  export default ShowCard;
  