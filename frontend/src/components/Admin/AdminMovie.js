import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";

const GET_VIDEOS_LIST_URL = `${config.baseUrl}/videos/getAll`;
const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const GET_MOVIES_LIST_URL = `${config.baseUrl}/movies/getAll`;
const CREATE_MOVIE_URL = `${config.baseUrl}/movies/movie/create`;

const INITIAL_FORM_VALUES = {
  name: "",
  content: "",
  languages: [],
  video_id: "",
  image_id: "",
};

const AdminMovie = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM_VALUES);
  const [isForm, setIsForm] = useState(false);

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

  const createMovieApi = async () => {
    let resp = await serviceRequest({
      url: CREATE_MOVIE_URL,
      method: "post",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getMoviesApi();
  };

  useEffect(() => {
    getImagesListApi();
    getVideosListApi();
    getMoviesApi();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createMovieApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const movieForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div>New Movie</div>
      <div className="form-container">
        <div>
          <label for="name">
            Name<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Movie Name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label for="Content">
            Content<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="Content"
            name="content"
            placeholder="Enter Movie Content"
            value={form.content}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="form-container">
        <div>
          <label for="image_id">
            Select Image<span className="text-red">*</span>:
          </label>

          <select
            name="image_id"
            id="image_id"
            placeholder="Select Image..."
            value={form.image_id}
            onChange={onChange}
            required
          >
            <option value="" className="text-gray cursor-pointer">
              Select Image...
            </option>
            {images?.map((image) => {
              return (
                <option value={image.id} className="cursor-pointer">
                  {" "}
                  {image.name}{" "}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label for="video_id">
            Select Video<span className="text-red">*</span>:
          </label>

          <select
            name="video_id"
            id="video_id"
            placeholder="Select Video..."
            value={form.video_id}
            onChange={onChange}
            required
          >
            <option value="" className="text-gray cursor-pointer">
              Select Video...
            </option>
            {videos?.map((video) => {
              return (
                <option value={video.id} className="cursor-pointer">
                  {" "}
                  {video.name}{" "}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="form-container">
        <div>
          <label for="languages">Languages:</label>
          <input
            type="text"
            id="languages"
            name="languages"
            placeholder="Enter Languages..."
            value={form.languages}
            onChange={onChange}
            required
          />
          <span style={{ padding: 0, margin: 0 }} className="text-gray">
            movie1,movie2,..
          </span>
        </div>
      </div>
      <div className="form-container">
        <button type="button" className="btn-warning" onClick={onClear}>
          Clear
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );

  const movietable = (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Content</th>
            <th>Languages</th>
            <th>Image</th>
            <th>Video</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, idx) => {
            return (
              <tr key={movie.id}>
                <td>{idx + 1}</td>
                <td>{movie.name || "-"}</td>
                <td>{movie.content || "-"}</td>
                <td>{movie.languages || "-"}</td>
                <td>{movie.image_id || "-"}</td>
                <td>{movie.video_id || "-"}</td>
                <td>
                  <span className="edit">Edit</span>
                  <span className="delete">Delete</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-movie">
      <div className="admin-movie-header">
        <div>AdminMovie</div>
        <div>
          <button onClick={onCancel}>
            {isForm ? "Cancel" : "Create"} Movie
          </button>
        </div>
      </div>
      {isForm && <div>{movieForm} </div>}
      <div className="movies-table">{movietable}</div>
    </div>
  );
};

export default AdminMovie;
