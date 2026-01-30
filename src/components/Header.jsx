import React, { useState } from "react";
import "../App.css";
import { User } from "lucide-react";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header({ onGoToMovies, onGoToMyList, onGoToShows, onLogout, searchTerm, setSearchTerm }) {
  const [showAccount, setShowAccount] = useState(false);

  return (
    <header className="main-header">
      <h1 style={{ color: "#FFFFFF" }}>CINEMA HD</h1>

      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/shows">TV Shows</Link>
        <Link to="/mylist">My List</Link>
      </nav>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="user-menu">
        <User
          size={25}
          color="white"
          onClick={() => setShowAccount((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />

        {showAccount && (
          <div className="dropdown-menu">
            <a href="#logout" onClick={(e) => {
              e.preventDefault();
              onLogout(); // This calls the function passed from App.jsx
            }}>Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
