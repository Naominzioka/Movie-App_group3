import React from "react";
import "../App.css";

const MyList = ({ myList, removeFromMyList, onBack }) => {
  return (
    <section className="gallery">
      {/* Back button */}
      <button
        className="back-button"
        style={{ marginBottom: "20px" }}
        onClick={onBack}
      >
        ← Back
      </button>

      <h1>My List</h1>

      {myList.length === 0 ? (
        <p>No movies or shows added yet.</p>
      ) : (
        <div className="grid">
          {myList.map((item) => (
            <div key={`${item.type}-${item.id}`} className="card">
              {/* Poster */}
              <img src={item.poster} alt={item.title} />

              <div className="card-meta">
                <h3>{item.title}</h3>
                {/* Optional: show type */}
                <p style={{ fontSize: "0.9em", color: "#aaa" }}>
                  {item.type === "show" ? "TV Show" : "Movie"}
                </p>

                {/* Remove button */}
                <button
                  className="list-btn remove"
                  onClick={() => removeFromMyList(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyList;
