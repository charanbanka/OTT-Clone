// Home.js
import React, { useEffect, useState } from "react";
import TopView from "./TopView";
import Movie from "../Movies/Movie";
import "./home.css";
import { getMoviesApi } from "../services/movie-service";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    let resp = await getMoviesApi();
    setMovies(resp?.data || []);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <div style={{ background: "white", color: "black" }}>
        <HomeSlider />
      </div>
      <div className="mt-8 mx-3">
        <div className="mb-2 flex flex-row justify-between align-center text-2xl">
          <h4>New Releases</h4>
          <h4>See All</h4>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {/* {[...Array(10)].map((item) => {
          return <Movie key={item} />;
        })} */}

          {movies.map((item) => {
            return <Movie key={item.id} movie={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
