const express = require("express");
const videoRouter = express.Router();
const videoController = require("../controllers/videos-controller");

videoRouter.get("/video/:id", videoController.getVideo);
videoRouter.get("/getAll", videoController.getAllVideos);
videoRouter.post("/video/create", videoController.createVideo);
videoRouter.put("/video/update", videoController.updateVideo);
videoRouter.delete("/video/delete/:id", videoController.deleteVideoById);

module.exports = videoRouter;
