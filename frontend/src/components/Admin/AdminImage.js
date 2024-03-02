import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";
import { serviceRequest } from "../../serviceRequest";
import "./admin.css";
import constants from "../../constants";
import { getImageUrl } from "../services/image-services";

const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const CREATE_IMAGE_URL = `${config.baseUrl}/images/image/create`;
const UPADTE_IMAGE_URL = `${config.baseUrl}/images/image/update`;
const DELETE_IMAGE_URL = `${config.baseUrl}/images/image/delete`;

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

  const updateImageApi = async () => {
    let resp = await serviceRequest({
      url: UPADTE_IMAGE_URL,
      method: "put",
      data: form,
    });
    console.log("resp");
    if (resp.status == constants.SERVICE_FAILURE) return;
    onClear();
    getImagesListApi();
  };

  const deleteImageApi = async (id) => {
    let resp = await serviceRequest({
      url: `${DELETE_IMAGE_URL}/${id}`,
      method: "delete",
    });

    getImagesListApi();
  };

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form?.id) updateImageApi();
    else createImageApi();
  };

  const onClear = () => {
    setForm(INITIAL_FORM_VALUES);
  };

  const onCancel = () => {
    if (isForm) setForm(INITIAL_FORM_VALUES);
    setIsForm(!isForm);
  };

  const onClickEdit = (image) => {
    setForm(image);
    setIsForm(true);
  };

  const onClickDelete = (image) => {
    alert("Are you sure you want to proceed?");

    deleteImageApi(image.id);
  };

  const imageForm = (
    <form className="movie-form" onSubmit={onSubmit}>
      <div>{form?.id ? "Edit" : "New"} Image</div>
      <div className="form-container">
        <div className="mb-4">
          <label htmlFor="name" className="block">
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
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Content" className="block">
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
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="form-container">
        <div className="mb-4">
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
        <div className="mb-4">
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

  const imageTable = (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sr.No
            </th>
            {/* <th>Id</th> */}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            {/* <th>Path</th> */}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
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
          {images?.length ? (
            images.map((image, idx) => (
              <tr key={image.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {idx + 1}
                </td>
                {/* <td>{image.id}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.content || "-"}
                </td>
                {/* <td>{image.path || "-"}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={getImageUrl(image.id)}
                    alt=""
                    className="h-30 w-40"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.type || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-2"
                    onClick={() => onClickEdit(image)}
                  >
                    Edit
                  </span>
                  <span
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => onClickDelete(image)}
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
                No images available
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
        <div className="text-lg font-bold">Admin Image</div> {/* Title */}
        <div>
          <button
            onClick={onCancel}
            className={`bg-${
              isForm ? "red" : "blue"
            }-500 text-white py-2 px-4 rounded`}
          >
            {isForm ? "Cancel" : "Create"} Image{" "}
            {/* Button to toggle form visibility */}
          </button>
        </div>
      </div>

      {/* Conditional rendering of imageForm */}
      {isForm && <div>{imageForm}</div>}

      {/* Display images table */}
      <div className="movies-table">{imageTable}</div>
    </div>
  );
};

export default AdminImage;
