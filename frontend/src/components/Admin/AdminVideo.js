import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";

const GET_VIDEOS_LIST_URL = `${config.baseUrl}/videos/getAll`;
const CREATE_VIDEO_URL = `${config.baseUrl}/videos/video/create`;

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

  useEffect(() => {
    getVideosListApi();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createVideoApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const onEdit = (item) => {
    setIsForm(true);
    setForm(item);
  };

  const onDelete = () => {};

  const videoForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div>New Video</div>
      <div className="form-container">
        <div>
          <label for="name">
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
            placeholder="Enter Video Content"
            value={form.content}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="form-container">
        <div>
          <label for="path">
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
          />
        </div>
        <div>
          <label for="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter Type..."
            value={form.type}
            onChange={onChange}
          />
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

  const videoTable = (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Content</th>
            <th>Path</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, idx) => {
            return (
              <tr key={video.id}>
                <td>{idx + 1}</td>
                <td>{video.name || "-"}</td>
                <td>{video.content || "-"}</td>
                <td>{video.path || "-"}</td>
                <td>{video.type || "-"}</td>
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
        <div>AdminVideo</div>
        <div>
          <button onClick={onCancel}>
            {isForm ? "Cancel" : "Create"} Video
          </button>
        </div>
      </div>
      {isForm && <div>{videoForm} </div>}
      <div className="movies-table">{videoTable}</div>
    </div>
  );
};

export default AdminVideo;
