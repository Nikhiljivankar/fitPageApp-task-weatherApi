const express = require("express");

const router = express.Router();
const weatherController = require("../controller/weatherController");



router
  .route("/")
//   .get(weatherController.getAll) // getting data from db
  .get(weatherController.history); // getting data from openWeather api

module.exports = router;
