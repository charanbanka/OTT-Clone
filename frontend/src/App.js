// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <div>
          <Navbar />
          <div class="main-container">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
