import styles from "./MovieCard.module.css";

function MovieCard({ movie, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={movie.poster} alt={movie.title} />

      <div className={styles.overlay}>
        ▶
      </div>

      <h3>{movie.title}</h3>
    </div>
  );
}

export default MovieCard;
