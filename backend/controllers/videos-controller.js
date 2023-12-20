const videoService = require("../services/video-service");

const getVideo = async (req, res) => {
  await videoService.getVideoService(req, res);
};

module.exports = { getVideo };
