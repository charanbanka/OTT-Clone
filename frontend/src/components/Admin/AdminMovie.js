import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";

const GET_VIDEOS_LIST_URL = `${config.baseUrl}/videos/getAll`;
const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const GET_MOVIES_LIST_URL = `${config.baseUrl}/movies/getAll`;

const AdminMovie = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const getMoviesApi = async () => {
    let resp = await serviceRequest({
      url: GET_MOVIES_LIST_URL,
      method: "get",
    });
    setMovies(resp?.data);
  };

  const getVideosListApi = async () => {
    let resp = await serviceRequest({
      url: GET_VIDEOS_LIST_URL,
      method: "get",
    });

    setVideos(resp?.data);
  };

  const getImagesListApi = async () => {
    let resp = await serviceRequest({
      url: GET_IMAGES_LIST_URL,
      method: "get",
    });

    setImages(resp?.data);
  };

  useEffect(() => {
    getImagesListApi();
    getVideosListApi();
    getMoviesApi();
  }, []);

  return (
    <div>
      AdminMovie
      <div>createform</div>
      <div className="movies-table">
        
      </div>
    </div>
  );
};

export default AdminMovie;
