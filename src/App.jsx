import React, { useState, useEffect } from "react";
import "./App.css";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import MyList from "./components/MyList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [activeTab, setActiveTab] = useState("movies");
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? JSON.parse(savedToken) : null;
  });
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);
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

    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Header
            onLogout={handleLogout}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="container">
            <Routes>
              <Route path="/movies" element={
                <Movies
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  addToMyList={addToMyList}
                  myList={myList}
                />
              } />

              <Route path="/shows" element={
                <TVShows
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  addToMyList={addToMyList}
                  myList={myList}
                />
              } />
              <Route path="/mylist" element={
                <MyList
                  myList={myList}
                  removeFromMyList={removeFromMyList}
                />
              } />
              {/* Default route */}
              <Route path="/" element={<Navigate to="/movies" />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );

}

export default App;
