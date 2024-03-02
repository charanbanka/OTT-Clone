import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";

const GET_VIDEOS_LIST_URL = `${config.baseUrl}/videos/getAll`;
const CREATE_VIDEO_URL = `${config.baseUrl}/videos/video/create`;
const UPADTE_VIDEO_URL = `${config.baseUrl}/videos/video/update`;
const DELETE_VIDEO_URL = `${config.baseUrl}/videos/video/delete`;

const INITIAL_FORM_VALUES = {
  name: "",
  content: "",
  path: "",
  type: "",
};

const AdminVideo = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM_VALUES);
  const [isForm, setIsForm] = useState(false);

  const getVideosListApi = async () => {
    let resp = await serviceRequest({
      url: GET_VIDEOS_LIST_URL,
      method: "get",
    });

    setVideos(resp?.data);
  };

  const createVideoApi = async () => {
    let resp = await serviceRequest({
      url: CREATE_VIDEO_URL,
      method: "post",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getVideosListApi();
  };

  const updateVideoApi = async () => {
    let resp = await serviceRequest({
      url: UPADTE_VIDEO_URL,
      method: "put",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getVideosListApi();
  };

  const deleteVideoApi = async (id) => {
    let resp = await serviceRequest({
      url: `${DELETE_VIDEO_URL}/${id}`,
      method: "delete",
    });

    getVideosListApi();
  };

  useEffect(() => {
    getVideosListApi();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form?.id) updateVideoApi();
    createVideoApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const onClickEdit = (video) => {
    setForm(video);
    setIsForm(true);
  };

  const onClickDelete = (video) => {
    alert("Are you sure you want to proceed?");

    deleteVideoApi(video.id);
  };

  const videoForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div className="text-lg font-bold mb-4">New Video</div>

      <div className="form-container mb-4">
        <div>
          <label htmlFor="name" className="block">
            Name<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Video Name"
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
            placeholder="Enter Video Content"
            value={form.content}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="form-container mb-4">
        <div>
          <label htmlFor="path" className="block">
            Path<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="path"
            name="path"
            placeholder="Enter Path..."
            value={form.path}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block">
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter Type..."
            value={form.type}
            onChange={onChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
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

  const videoTable = (
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
              Path
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {videos?.length ? (
            videos.map((video, idx) => (
              <tr key={video.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.content || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.path || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.type || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-2"
                    onClick={() => onClickEdit(video)}
                  >
                    Edit
                  </span>
                  <span
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => onClickDelete(video)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No videos available
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
        <div className="text-lg font-bold">Admin Video</div> {/* Title */}
        <div>
          <button
            onClick={onCancel}
            className={`bg-${
              isForm ? "red" : "blue"
            }-500 text-white py-2 px-4 rounded`}
          >
            {isForm ? "Cancel" : "Create"} Video{" "}
            {/* Button to toggle form visibility */}
          </button>
        </div>
      </div>

      {/* Conditional rendering of imageForm */}
      {isForm && <div>{videoForm}</div>}

      {/* Display images table */}
      <div className="movies-table">{videoTable}</div>
    </div>
  );
};

export default AdminVideo;
