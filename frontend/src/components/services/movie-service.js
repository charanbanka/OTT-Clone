import config from "../../config";
import { serviceRequest } from "../../serviceRequest";

const GET_MOVIES_LIST_URL = `${config.baseUrl}/movies/getAll`;

export const getMoviesApi = async () => {
  let resp = await serviceRequest({
    url: GET_MOVIES_LIST_URL,
    method: "get",
  });
  return resp;
};

