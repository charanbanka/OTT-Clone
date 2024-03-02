import config from "../../config";

export const getVideoUrl = (id) => {
  return `${config.baseUrl}/videos/video/${id}`;
};
