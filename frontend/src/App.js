import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import "./App.css";
import Admin from "./components/Admin";

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Router>
        <div>
          <Navbar />
          <div className="mx-6 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
