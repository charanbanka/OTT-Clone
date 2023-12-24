import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";

const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const CREATE_IMAGE_URL = `${config.baseUrl}/images/image/create`;

const INITIAL_FORM_VALUES = {
  name: "",
  content: "",
  path: "",
  type: "",
};

const AdminImage = () => {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM_VALUES);
  const [isForm, setIsForm] = useState(false);

  const getImagesListApi = async () => {
    let resp = await serviceRequest({
      url: GET_IMAGES_LIST_URL,
      method: "get",
    });

    setImages(resp?.data);
  };

  const createImageApi = async () => {
    let resp = await serviceRequest({
      url: CREATE_IMAGE_URL,
      method: "post",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getImagesListApi();
  };

  useEffect(() => {
    getImagesListApi();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createImageApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const imageForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div>New Image</div>
      <div className="form-container">
        <div>
          <label for="name">
            Name<span className="text-red">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Image Name"
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
            placeholder="Enter Image Content"
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

  const imageTable = (
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
          {images.map((image, idx) => {
            return (
              <tr key={image.id}>
                <td>{idx + 1}</td>
                <td>{image.name || "-"}</td>
                <td>{image.content || "-"}</td>
                <td>{image.path || "-"}</td>
                <td>{image.type || "-"}</td>
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
        <div>AdminImage</div>
        <div>
          <button onClick={onCancel}>
            {isForm ? "Cancel" : "Create"} Image
          </button>
        </div>
      </div>
      {isForm && <div>{imageForm} </div>}
      <div className="movies-table">{imageTable}</div>
    </div>
  );
};

export default AdminImage;
