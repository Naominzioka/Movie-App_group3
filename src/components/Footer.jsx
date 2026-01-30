import React from "react";
import "../App.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p>© {year} CINEMA HD. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
