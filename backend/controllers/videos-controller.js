const videoService = require("../services/video-service");

const getVideo = async (req, res) => {
  let resp = await videoService.getVideoService(req, res);
  res.send(resp);
};

const getAllVideos = async (req, res) => {
  let resp = await videoService.getAllVideosService();
  res.send(resp);
};

module.exports = { getVideo, getAllVideos };
