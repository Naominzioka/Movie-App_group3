import React, { useState } from "react";
import '../App.css'
import { User, Search as SearchIcon } from "lucide-react";

function Header({ onGoToMovies, onGoToShows }) {
  const [showAccount, setShowAccount] = useState(false);

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

        <a href="#list">My List</a>
      </nav>

      <div className="user-menu">
        <User
          size={25}
          color="white"
          onClick={() => setShowAccount(!showAccount)}
        />

        {showAccount && (
          <div className="dropdown-menu">
            <a href="#account">Account</a>
            <a href="#settings">Settings</a>
          </div>
        )}
      </div>

      <div className="search-wrapper">
        <SearchIcon className="search-icon-inside" size={18} />
        <input
          type="text"
          placeholder="Search movies, shows..."
          className="search-input-field"
        />
      </div>
    </header>
  );
}

export default Header;
