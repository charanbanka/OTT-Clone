import React from "react";
import { TiMediaPlay } from "react-icons/ti";
import "./movie.css";
import config from "../../../config";
import VideoPlayer from "../../Video/VideoPlayer";
import { getImageUrl } from "../../services/image-services";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <Link className="movie-container relative" to={`/movie/${movie.id}`}>
      <img
        width="100%"
        height="122px"
        src={getImageUrl(movie.image_id)}
        className="w-full h-auto transition-transform transform hover:scale-105"
        alt={movie.name}
      />
      {/* <div className="overlay absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
        <TiMediaPlay className="text-white text-3xl" />
      </div> */}
    </Link>
  );
};

export default Movie;
