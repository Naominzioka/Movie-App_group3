import React, { useState } from 'react';
import './App.css'
import MoviePlayer from './components/Movies';

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
      <MoviePlayer
        myList={myList}
        addToMyList={addToMyList}
        removeFromMyList={removeFromMyList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;