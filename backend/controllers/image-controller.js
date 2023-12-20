const imageService = require("../services/image-service");

const getImage = async (req, res) => {
  await imageService.getImageService(req, res);
};

module.exports = { getImage };
