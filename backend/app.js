require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const config = require("./config");
const router = require("./routes");
const constants = require("./constants");

const app = express();

const corsOptions = {
  origin: config.allowOrigin,
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

router(app);

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log("errorHandler - err:", err);

  res.json({
    status: constants.SERVICE_FAILURE,
    statusCode: 500,
    message: constants.GENERAL_ERROR_MESSAGE,
  });
}

module.exports = app;
