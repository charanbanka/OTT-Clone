const imageService = require("../services/image-service");

const getImage = async (req, res) => {
  await imageService.getImageService(req, res);
};

const getAllImages = async (req, res) => {
  let resp = await imageService.getAllImagesService();
  res.send(resp);
};

const createImage = async (req, res) => {
  const resp = await imageService.createImageService(req.body);
  res.send(resp);
};

const updateImage = async (req, res) => {
  const resp = await imageService.updateImageService(req.body);
  res.send(resp);
};

const deleteImageById = async (req, res) => {
  const id = req.params.id;
  const resp = await imageService.deleteImageByIdService({ id });
  res.send(resp);
};

module.exports = { getImage, getAllImages, createImage, updateImage,deleteImageById };
