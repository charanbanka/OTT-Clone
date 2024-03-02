import React, { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../services/image-services";
import { getVideoUrl } from "../services/video-service";
import { useParams } from "react-router-dom";
import { getMovieByIdApi } from "../services/movie-service";

const MoviePlayer = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status
  const { id } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let resp = await getMovieByIdApi(id);
        setMovie(resp?.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setTimeout(() => {
          setLoading(false); // Set loading to false when movie data is fetched
        }, [1000]);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });

  console.log("id=", id, movie);
  return (
    <div className="flex justify-center items-center bg-gray-900 text-white w-100">
      {loading ? ( // Display loader if loading is true
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className=" w-full px-8">
          <video
            ref={videoRef}
            width="100%"
            height="90%"
            controls
            autoPlay={false}
            poster={getImageUrl(movie?.image_id)}
            muted
          >
            <source src={getVideoUrl(movie.video_id)} type="video/mp4"></source>
            Your browser doesn't support the video
          </video>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;
