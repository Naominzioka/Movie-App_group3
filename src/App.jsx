import React, { useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import MyList from "./components/MyList";

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
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
}

export default App;
