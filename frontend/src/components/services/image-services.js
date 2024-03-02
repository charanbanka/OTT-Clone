import config from "../../config";
import { serviceRequest } from "../../serviceRequest";

const GET_IMAGES_LIST_URL = `${config.baseUrl}/images/getAll`;
const GET_IMAGES_LIST_BY_TYPE_URL = `${config.baseUrl}/images/getbytype`;


export const getImagesApi = async () => {
  let resp = await serviceRequest({
    url: GET_IMAGES_LIST_URL,
    method: "get",
  });
  return resp;
};

export const getImagesByTypeApi = async (data) => {
    let resp = await serviceRequest({
      url: GET_IMAGES_LIST_BY_TYPE_URL,
      method: "post",
      data
    });
    return resp;
  };

export const getImageUrl = (image_id) => {
  return `${config.baseUrl}/images/image/${image_id}`;
};
