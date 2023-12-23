const express = require("express");
const imageRouter = express.Router();
const imageController = require("../controllers/image-controller");

imageRouter.get("/image/:id", imageController.getImage);
imageRouter.get("/getAll", imageController.getAllImages);

module.exports = imageRouter;
