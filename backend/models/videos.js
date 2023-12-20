const Sequelize = require("sequelize");
const db = require("../db");
const uuid = require("uuid");

module.exports = db.define("videos", {
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
  type: {
    type: Sequelize.STRING,
  },
  extention: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
});
