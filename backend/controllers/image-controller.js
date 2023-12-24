const imageService = require("../services/image-service");

const getImage = async (req, res) => {
  await imageService.getImageService(req, res);

};

const getAllImages = async (req, res) => {
  let resp = await imageService.getAllImagesService();
  res.send(resp);
};

module.exports = { getImage, getAllImages };
