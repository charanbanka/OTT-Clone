const express = require("express");
const imageRouter = express.Router();
const imageController = require("../controllers/image-controller");

imageRouter.get("/image/:id", imageController.getImage);
imageRouter.get("/getAll", imageController.getAllImages);
imageRouter.post("/video/create", imageController.createImage);
imageRouter.put("/video/update", imageController.updateImage);
imageRouter.delete("/video/delete/:id", imageController.deleteImageById);

module.exports = imageRouter;
