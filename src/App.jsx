import React, { useState, useEffect } from "react";
import "./App.css";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import MyList from "./components/MyList";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const [activeTab, setActiveTab] = useState("movies");
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("cinema_list");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cinema_user");
    // If found, turn the string back into an object; otherwise, stay null
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    if (user) {
      // Save the object as a string
      localStorage.setItem("cinema_user", JSON.stringify(user));
    } else {
      // Clean up if the user logs out
      localStorage.removeItem("cinema_user");
    }
  }, [user]); // The [user] dependency array is key!

  useEffect(() => {
    localStorage.setItem("cinema_list", JSON.stringify(myList));
  }, [myList]); // This runs every time myList changes

  const handleLogin = (name, email) => {
    setUser({ name: name, email: email });
    setActiveTab("movies");
  }
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
        user={user}
        onLogin={handleLogin}
        onLogout={() => setUser(null)}
        onGoToMovies={() => setActiveTab("movies")}
        onGoToShows={() => setActiveTab("shows")}
        onGoToMyList={() => {
          // If there is no user, send them to login; otherwise, go to the list
          if (!user) {
            setActiveTab("login");
          } else {
            setActiveTab("mylist");
          }
        }}
        onGoToLogin={() => setActiveTab("login")}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {activeTab === "movies" && (
        <Movies
          user={user}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
          addToMyList={addToMyList}
        />
      )}

      {activeTab === "shows" && (
        <TVShows
          user={user}
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
      {activeTab === "login" && (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
