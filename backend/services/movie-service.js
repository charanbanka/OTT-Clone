const constants = require("../constants");
const movieModel = require("../models/movies");

const getMovieByIdService = async (reqInfo) => {
  try {
    const id = reqInfo?.id;
    if (!id) throw new Error("Id not found");
    const data = await movieModel.findOne({ where: { id } });

    return {
      status: constants.SERVICE_SUCCESS,
      data,
    };
  } catch (error) {
    console.log("getMovieByIdService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

const getMovieAllService = async (reqInfo) => {
  try {
    const data = await movieModel.findAll();

    return {
      status: constants.SERVICE_SUCCESS,
      data,
    };
  } catch (error) {
    console.log("getMovieAllService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

const createMovieService = async (reqInfo) => {
  try {
    const data = await movieModel.create(reqInfo);

    return {
      status: constants.SERVICE_SUCCESS,
      message: "Success",
    };
  } catch (error) {
    console.log("createMovieService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

const updateMovieService = async (reqInfo) => {
  try {
    const id = reqInfo?.id;
    if (!id) throw new Error("Id not found");
    const data = await movieModel.update(reqInfo, { where: { id } });

    return {
      status: constants.SERVICE_SUCCESS,
      message: "Success",
    };
  } catch (error) {
    console.log("updateMovieService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

const deleteMovieByIdService = async (reqInfo) => {
  try {
    const id = reqInfo?.id;
    if (!id) throw new Error("Id not found");

    const data = await movieModel.destroy({ where: { id } });

    return {
      status: constants.SERVICE_SUCCESS,
      message: "Success",
    };
  } catch (error) {
    console.log("deleteMovieByIdService=>", error);
    return {
      status: constants.SERVICE_FAILURE,
      message: error?.message,
    };
  }
};

module.exports = {
  getMovieByIdService,
  createMovieService,
  updateMovieService,
  deleteMovieByIdService,
  getMovieAllService,
};
