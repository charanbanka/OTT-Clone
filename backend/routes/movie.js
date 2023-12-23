const express = require("express");
const movieRouter = express.Router();
const movieController = require("../controllers/movie-controller");

movieRouter.get("/movie/:id", movieController.getMovieById);
movieRouter.post("/movie/create", movieController.createMovie);
movieRouter.put("/movie/update", movieController.updateMovie);
movieRouter.delete("/movie/delete/:id", movieController.deleteMovieById);
movieRouter.get("/getAll", movieController.getMovieAll);

module.exports = movieRouter;
