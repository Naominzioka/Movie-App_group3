import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import styles from "./Movies.module.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:6001/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  return (
    <>
      <div className={styles.grid}>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}

export default Movies;
