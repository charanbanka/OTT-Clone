import config from "../../config";
import { serviceRequest } from "../../serviceRequest";

const GET_MOVIES_LIST_URL = `${config.baseUrl}/movies/getAll`;
const GET_MOVIE_BY_ID_LIST_URL = `${config.baseUrl}/movies/movie`;


export const getMoviesApi = async () => {
  let resp = await serviceRequest({
    url: GET_MOVIES_LIST_URL,
    method: "get",
  });
  return resp;
};

export const getMovieByIdApi = async (id) => {
  let resp = await serviceRequest({
    url: `${GET_MOVIE_BY_ID_LIST_URL}/${id}`,
    method: "get",
  });
  return resp;
};

