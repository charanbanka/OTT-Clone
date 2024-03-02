import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <Link to="/" className="mr-4 hover:text-gray-300">
            Home
          </Link>
          <Link to="/movies" className="mr-4 hover:text-gray-300">
            Movies
          </Link>
          <Link to="/tv-shows" className="mr-4 hover:text-gray-300">
            TV Shows
          </Link>
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        </div>
        <div>Profile</div>
      </div>
    </div>
  );
};

export default Navbar;
