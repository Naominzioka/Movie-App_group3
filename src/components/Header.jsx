import React, { useState } from "react";
import "../App.css";
import { User } from "lucide-react";

function Header({ onGoToMovies, onGoToMyList }) {
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
    </header>
  );
}

export default Header;
