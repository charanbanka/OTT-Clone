const Sequelize = require("sequelize");
const db = require("../db");
const uuid = require("uuid");

const Video = require("./videos");
const Image = require("./images");

module.exports = db.define("movies", {
  id: {
    type: Sequelize.UUID,
    defaultValue: function () {
      return uuid.v4();
    },
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING,
  },
  languages: {
    type: Sequelize.STRING,
  },
  views: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
  likes: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
  video_id: {
    type: Sequelize.UUID,
    references: {
      model: Video,
      key: "id",
    },
  },
  image_id: {
    type: Sequelize.UUID,
    references: {
      model: Image,
      key: "id",
    },
  },
});
