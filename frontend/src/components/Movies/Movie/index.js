import React from "react";
import "./movie.css";

const Movie = () => {
  const backgroundImageUrl =
    "http://localhost:8000/images/image/44dfb8a6-344d-4ef6-8ca7-0bf8620ba5c1";
  const styles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // minHeight: "700px", // Set the desired height
    // Add more styling as needed
    // width: "100%",
  };
  return (
    <div className="movie-container">
      <img width="100%" height="100%" src={backgroundImageUrl}  />
    </div>
  );
};

export default Movie;
