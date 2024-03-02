import React, { useEffect, useState } from "react";
import Movie from "../Movies/Movie";
import "./home.css";
import { getMoviesApi } from "../services/movie-service";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies data
    const fetchMovies = async () => {
      try {
        const resp = await getMoviesApi();
        setMovies(resp?.data || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="pb-4">
      <div className="bg-white">
        <HomeSlider />
      </div>
      <div className="mt-8">
        <div className="mb-2 flex justify-between items-center text-2xl">
          <h4 className="font-semibold">New Releases</h4>
          <h4 className="text-blue-500 cursor-pointer">See All</h4>
        </div>

        <div className="flex flex-wrap gap-3">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
