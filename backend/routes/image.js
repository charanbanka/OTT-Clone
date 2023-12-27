const express = require("express");
const imageRouter = express.Router();
const imageController = require("../controllers/image-controller");

imageRouter.get("/image/:id", imageController.getImage);
imageRouter.get("/getAll", imageController.getAllImages);
imageRouter.post("/image/create", imageController.createImage);
imageRouter.put("/image/update", imageController.updateImage);
imageRouter.delete("/image/delete/:id", imageController.deleteImageById);

module.exports = imageRouter;
