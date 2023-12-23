const movieService = require("../services/movie-service");

const getMovieById = async (req, res) => {
  const id = req.params.id;
  const resp = await movieService.getMovieByIdService({ id });
  res.send(resp);
};

const createMovie = async (req, res) => {
  const resp = await movieService.createMovieService(req.body);
  res.send(resp);
};

const updateMovie = async (req, res) => {
  const resp = await movieService.updateMovieService(req.body);
  res.send(resp);
};

const deleteMovieById = async (req, res) => {
  const id = req.params.id;
  const resp = await movieService.deleteMovieByIdService({ id });
  res.send(resp);
};

const getMovieAll = async (req, res) => {
  const resp = await movieService.getMovieAllService();
  res.send(resp);
};

module.exports = {
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovieById,
  getMovieAll,
};
