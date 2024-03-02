import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";
import { getImageUrl } from "../services/image-services";
import VideoPlayer from "../Video/VideoPlayer";

const GET_VIDEOS_LIST_URL = `${config.baseUrl}/videos/getAll`;
const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const GET_MOVIES_LIST_URL = `${config.baseUrl}/movies/getAll`;
const CREATE_MOVIE_URL = `${config.baseUrl}/movies/movie/create`;
const UPDATE_MOVIE_URL = `${config.baseUrl}/movies/movie/update`;
const DELETE_MOVIE_URL = `${config.baseUrl}/movies/movie/delete`;

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

  const updateMovieApi = async () => {
    let resp = await serviceRequest({
      url: UPDATE_MOVIE_URL,
      method: "put",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getMoviesApi();
  };

  const deleteMovieApi = async (id) => {
    let resp = await serviceRequest({
      url: `${DELETE_MOVIE_URL}/${id}`,
      method: "delete",
    });

    getMoviesApi();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form?.id) updateMovieApi();
    else createMovieApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const onClickEdit = (movie) => {
    setForm(movie);
    setIsForm(true);
  };

  const onClickDelete = (movie) => {
    alert("Are you sure you want to proceed?");

    deleteMovieApi(movie.id);
  };

  const movieForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div className="text-lg font-bold mb-4">New Movie</div>

      <div className="form-container mb-4">
        <div>
          <label htmlFor="name" className="block">
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
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block">
            Content<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="Enter Movie Content"
            value={form.content}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="form-container mb-4">
        <div>
          <label htmlFor="image_id" className="block">
            Select Image<span className="text-red">*</span>:
          </label>
          <select
            name="image_id"
            id="image_id"
            value={form.image_id}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select Image...
            </option>
            {images?.map((image) => (
              <option key={image.id} value={image.id}>
                {image.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="video_id" className="block">
            Select Video<span className="text-red">*</span>:
          </label>
          <select
            name="video_id"
            id="video_id"
            value={form.video_id}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select Video...
            </option>
            {videos?.map((video) => (
              <option key={video.id} value={video.id}>
                {video.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-container mb-4">
        <div>
          <label htmlFor="languages" className="block">
            Languages:
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            placeholder="Enter Languages..."
            value={form.languages}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <span className="text-sm text-gray-500">
            Separate languages with commas (e.g., English, Spanish)
          </span>
        </div>
      </div>

      <div className="form-container">
        <button
          type="button"
          className="btn-warning mr-4 py-2 px-4"
          onClick={onClear}
        >
          Clear
        </button>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white">
          Submit
        </button>
      </div>
    </form>
  );

  const movietable = (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sr.No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Languages
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Video
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movies?.length ? (
            movies?.map((movie, idx) => (
              <tr key={movie.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {movie.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {movie.content || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {movie.languages || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {movie.image_id || "-"} */}
                  <img
                    src={getImageUrl(movie.image_id)}
                    alt=""
                    className="h-30 w-40"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 h-40 w-40">
                  {/* {movie.video_id || "-"} */}
                  
                  {/* {video.path || "-"} */}
                  <VideoPlayer id={movie.video_id} />
                
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-2"
                    onClick={() => onClickEdit(movie)}
                  >
                    Edit
                  </span>
                  <span
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => onClickDelete(movie)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No movies available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-movie bg-white shadow-md rounded-md p-4">
      {/* AdminImage header section */}
      <div className="admin-movie-header flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Admin Movie</div> {/* Title */}
        <div>
          <button
            onClick={onCancel}
            className={`bg-${
              isForm ? "red" : "blue"
            }-500 text-white py-2 px-4 rounded`}
          >
            {isForm ? "Cancel" : "Create"} Movie{" "}
            {/* Button to toggle form visibility */}
          </button>
        </div>
      </div>

      {/* Conditional rendering of imageForm */}
      {isForm && <div>{movieForm}</div>}

      {/* Display images table */}
      <div className="movies-table">{movietable}</div>
    </div>
  );
};

export default AdminMovie;
