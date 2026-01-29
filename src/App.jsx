import React, { useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import MyList from "./components/MyList";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState("movies");
  const [myList, setMyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Add item to My List (movies or TV shows)
  const addToMyList = (item) => {
    setMyList((prevList) => {
      const exists = prevList.some((i) => i.id === item.id);
      if (exists) return prevList;
      return [...prevList, item];
    });
  };

  // Remove item from My List
  const removeFromMyList = (id) => {
    setMyList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (

    <>
    <Header
        onGoToMovies={() => setActiveTab("movies")}
        onGoToShows={() => setActiveTab("shows")}
        onGoToMyList={() => setActiveTab("mylist")}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {activeTab === "movies" && (
        <Movies
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
          addToMyList={addToMyList}
        />
      )}

      {activeTab === "shows" && (
        <TVShows
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
          addToMyList={addToMyList}
        />
      )}

      {activeTab === "mylist" && (
        <MyList
          myList={myList}
          removeFromMyList={removeFromMyList}
          onBack={() => setActiveTab("movies")}
        />
      )}
    </>
  );
}

export default App;
