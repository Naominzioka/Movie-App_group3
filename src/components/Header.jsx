import React, { useState } from "react";
import '../App.css'
import { User, Search as SearchIcon } from "lucide-react";

function Header() {
    const [showAccount, setShowAccount] = useState(false);
    return (
        <div>
            <header className="main-header">
                <h1 style={{ color: "#FFFFFF" }}>CINEMA HD</h1>
                <nav >
                    <a href="#movies">Movies</a>
                    <a href="#shows">TV Shows</a>
                    <a href="#list">My List</a>
                </nav>
                <div className="user-menu">
                    <User size={25} color="white" onClick={() => setShowAccount(!showAccount)} />
                    {showAccount ? (
                        <div className="dropdown-menu">
                            <a href="#account">Account</a>
                            <a href="#settings">Settings</a>
                        </div>
                    ) : null}
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

        </div>

    )
}

export default Header;
