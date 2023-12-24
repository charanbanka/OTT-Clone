const videoService = require("../services/video-service");

const getVideo = async (req, res) => {
  await videoService.getVideoService(req, res);
};

const getAllVideos = async (req, res) => {
  let resp = await videoService.getAllVideosService();
  res.send(resp);
};

const createVideo = async (req, res) => {
  const resp = await videoService.createVideoService(req.body);
  res.send(resp);
};

const updateVideo = async (req, res) => {
  const resp = await videoService.updateVideoService(req.body);
  res.send(resp);
};

const deleteVideoById = async (req, res) => {
  const id = req.params.id;
  const resp = await videoService.deleteVideoByIdService({ id });
  res.send(resp);
};

module.exports = { getVideo, getAllVideos, createVideo, updateVideo, deleteVideoById };
