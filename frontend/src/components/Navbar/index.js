// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/tv-shows">TV Shows</Link> */}
      {/* Add other links as needed */}

      <div className="left-content">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tv-shows">TV Shows</Link>
      </div>
      <div className="right-content">Profile</div>
    </div>
  );
};

export default Navbar;
