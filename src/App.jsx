import React, { useState } from 'react';
import './App.css';
import MoviePlayer from './components/Movies';
import TVShows from './components/TVShows';

function App() {
  const [myList, setMyList] = useState([]);
  const [activeTab, setActiveTab] = useState("movies");

  const addToMyList = (movie) => {
    setMyList((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromMyList = (id) => {
    setMyList((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="App">
      {activeTab === "movies" || activeTab === "mylist" ? (
        <MoviePlayer
          myList={myList}
          addToMyList={addToMyList}
          removeFromMyList={removeFromMyList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : null}

      {activeTab === "shows" && (
        <TVShows setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;
