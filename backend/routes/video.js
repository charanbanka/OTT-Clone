const express = require("express");
const videoRouter = express.Router();
const videoController = require("../controllers/videos-controller");

videoRouter.get("/video/:id", videoController.getVideo);
videoRouter.get("/getAll", videoController.getAllVideos);

module.exports = videoRouter;
