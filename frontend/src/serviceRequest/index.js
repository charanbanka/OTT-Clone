import axios from "axios";

export const serviceRequest = async (options) => {
  return axios
    .request(options)
    .then((resp) => {
      console.log("serviceRequest::resp=>", resp);
      return resp.data;
    })
    .catch((err) => {
      console.log("serviceRequest::Error=>", err);
      return err;
    });
};
