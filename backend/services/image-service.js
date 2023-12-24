const constants = require("../constants");
const ImageModel = require("../models/images");
const fs = require("fs");

const getImageService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Please provide Image Id!");

    const image = await ImageModel.findOne({ where: { id } });
    const imagePath = image?.path;
    if (!image || !imagePath) throw new Error("Image not found");

    const stats = fs.statSync(imagePath);
    const imageSize = stats.size;

    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Type": "image/jpeg",
      "Content-Length": imageSize,
    };
    console.log("inside*****************************",imagePath)
    const file = fs.createReadStream(imagePath);
    res.writeHead(200, headers);
    file.pipe(res);
  } catch (error) {
    console.log("getImageService - error:", error);
    res.status(500).json({
      status: constants.SERVICE_FAILURE,
      message: error.message,
    });
  }
};

const getAllImagesService = async (req, res) => {
  try {
    let data = await ImageModel.findAll();
    return {
      status: constants.SERVICE_SUCCESS,
      data,
    };
  } catch (error) {
    console.log("getAllImagesService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

module.exports = { getImageService, getAllImagesService };
