import "./MovieDetails.css";

function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal">
      <div className="content">
        <button onClick={onClose}>✕</button>

        <h2>{movie.title}</h2>

        <div className="video">
          <iframe
            src={movie.video}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
