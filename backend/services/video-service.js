const constants = require("../constants");
const VideoModel = require("../models/videos");
const fs = require("fs");

const getVideoService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return {
        status: constants.SERVICE_FAILURE,
        message: "Please provide Video Id!",
      };

    const video = await VideoModel.findOne({ where: { id } });
    const filepath = video?.path;
    if (!video || !filepath)
      return {
        status: constants.SERVICE_FAILURE,
        message: "File not found",
      };

    const stats = fs.statSync(filepath);
    const fileSize = stats.size;

    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0]);
      const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;

      const chunchSize = end - start + 1;
      const file = fs.createReadStream(filepath, { start, end });
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunchSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, headers);
      file.pipe(res);
    } else {
      const headers = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, headers);
      fs.createReadStream(filepath).pipe(res);
    }
  } catch (error) {
    console.log("getVideoService - error:", error);
    res.status(500).json({
      status: constants.SERVICE_FAILURE,
      message: error.message,
    });
  }
};

const getAllVideosService = async () => {
  try {
    let data = await VideoModel.findAll();
    return {
      status: constants.SERVICE_SUCCESS,
      data,
    };
  } catch (error) {
    console.log("getAllVideosService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

module.exports = { getVideoService, getAllVideosService };
