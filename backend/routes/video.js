const express = require("express");
const videoRouter = express.Router();
const videoController = require("../controllers/videos-controller");

videoRouter.get("/video/:id", videoController.getVideo);

module.exports = videoRouter;
