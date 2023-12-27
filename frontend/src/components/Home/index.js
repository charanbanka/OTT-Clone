// Home.js
import React, { useEffect, useState } from "react";
import TopView from "./TopView";
import Movie from "../Movies/Movie";
import "./home.css";
import { getMoviesApi } from "../services/movie-service";

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
      <TopView />
      <div className="movie-list">
        {/* {[...Array(10)].map((item) => {
          return <Movie key={item} />;
        })} */}
        {movies.map((item)=>{
           return <Movie key={item.id} movie={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
