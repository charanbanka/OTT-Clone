// Home.js
import React, { useState } from "react";
import TopView from "./TopView";
import Movie from "../Movies/Movie";
import "./home.css"

const Home = () => {
  const moviesList= {
    diplay: "flex",
    // flexWrap :"wrap",
    flexDirection: "column",
    margin: "1rem 0 1rem 1rem"
  }
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <TopView />
      <div className="movie-list">
        {[...Array(10)].map((item) => {
          return <Movie key={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
