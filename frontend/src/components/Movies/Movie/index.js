import React from "react";
import { TiMediaPlay } from "react-icons/ti";
import "./movie.css";
// import play from "../../../../public/images/icons8-play-30.png"

const Movie = () => {
  const backgroundImageUrl =
    "http://localhost:8000/images/image/44dfb8a6-344d-4ef6-8ca7-0bf8620ba5c3";
  const styles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // minHeight: "700px", // Set the desired height
    // Add more styling as needed
    // width: "100%",
    borderRadius: "3%",
  };
  return (
    <div className="movie-container">
      <img
        width="100%"
        height="100%"
        src={backgroundImageUrl}
        className="movie-container-image"
      />
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
