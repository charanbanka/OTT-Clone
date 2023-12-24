const videoService = require("../services/video-service");

const getVideo = async (req, res) => {
  await videoService.getVideoService(req, res);
};

const getAllVideos = async (req, res) => {
  let resp = await videoService.getAllVideosService();
  res.send(resp);
};

module.exports = { getVideo, getAllVideos };
