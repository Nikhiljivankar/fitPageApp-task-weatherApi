const express = require("express");

const router = express.Router();
const weatherController = require("../controller/weatherController");

router
  .route("/:location_id")
  .get(weatherController.getByID)

module.exports = router;
