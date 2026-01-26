import React from "react";
import '../App.css'
import { User } from "lucide-react";

function Header() {
    return (
        <header className="main-header">
            <h1 style={{ color: "#1e3a8a" }}>CINEMA HD</h1>
            <nav >
                <a href="#movies">Movies</a>
                <a href="#shows">TV Shows</a>
                <a href="#list">My List</a>
            </nav>
            <button></button>
        </header>
    )
}

export default Header;