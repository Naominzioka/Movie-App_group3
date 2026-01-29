import React, { useState } from "react";
import "../App.css";
import { User } from "lucide-react";
import Search from "./Search";

function Header({ user, onGoToLogin, onLogout, onGoToMovies, onGoToMyList, onGoToShows, searchTerm, setSearchTerm }) {

  return (
    <header className="main-header">
      <h1 style={{ color: "#FFFFFF" }}>CINEMA HD</h1>

      <nav>
        <a
          href="#movies"
          onClick={(e) => {
            e.preventDefault();
            onGoToMovies();
            window.scrollTo(0, 0);
          }}
        >
          Movies
        </a>

        <a
          href="#shows"
          onClick={(e) => {
            e.preventDefault();
            onGoToShows();
            window.scrollTo(0, 0);
          }}
        >
          TV Shows
        </a>

        <a
          href="#mylist"
          onClick={(e) => {
            e.preventDefault();
            onGoToMyList();
            window.scrollTo(0, 0);
          }}
        >
          My List
        </a>
      </nav>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="user-menu">
        {user ? (
          <div className="user-info">
            <span className="welcome-text">Hi, {user.name}</span>
            <User size={25} color="#22c55e" />
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <User
            size={25}
            color="white"
            onClick={onGoToLogin}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
