import React, { useState } from 'react';
import './App.css';

import MoviePlayer from './components/Movies';
import Header from './components/Header';
import TVShows from './components/TvShows';

function App() {
  // This controls which page we are on
  const [page, setPage] = useState("movies");

  return (
    <>
      {/* Header controls navigation */}
      <Header
        onGoToMovies={() => setPage("movies")}
        onGoToShows={() => setPage("shows")}
      />

      {/* Conditional rendering */}
      {page === "movies" && <MoviePlayer />}
      {page === "shows" && <TVShows />}
    </>
  );
}

export default App;
