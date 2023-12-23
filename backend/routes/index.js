const imageRouter = require("./image");
const movieRouter = require("./movie");
const videoRouter = require("./video");

module.exports = (app) => {
  app.use("/health", (req, res) => res.send("success"));

  app.use("/videos", videoRouter);
  app.use("/images", imageRouter);
  app.use("/movies", movieRouter);
};
