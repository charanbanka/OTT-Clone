import React from "react";
import { TiMediaPlay } from "react-icons/ti";
import "./movie.css";
import config from "../../../config";
import VideoPlayer from "../../Video/VideoPlayer";
// import play from "../../../../public/images/icons8-play-30.png"

const Movie = ({ movie }) => {
  const getImageUrl = (id) => {
    return `${config.baseUrl}/images/image/${id}`;
  };

  const getVideoUrl = (id) => {
    return `${config.baseUrl}/videos/video/${id}`;
  };

  return (
    <div className="movie-container">
      <img
        width="100%"
        height="100%"
        src={getImageUrl(movie.image_id)}
        className="movie-container-image"
      />
      <div className="movie-container-video">
        <VideoPlayer id={movie.video_id} />
      </div>
      <div className="movie-content">
        <div className="media-icons">
          <div className="circle-icon">
            <TiMediaPlay color="white" />
          </div>
          <div>
            <TiMediaPlay color="white" />
          </div>
          <div>
            <TiMediaPlay color="white" />
          </div>
        </div>
        <div>96%</div>
        <div>Intimate</div>
      </div>
    </div>
  );
};

export default Movie;
