const express = require("express");

const router = express.Router();
const locationController = require("../controller/locationController");

router
  .route("/")
  .post(locationController.Create)
  .get(locationController.GetAll);

router
  .route("/:id")
  .get(locationController.getByID)
  .patch(locationController.Update) // we can use put here
  .delete(locationController.deleteLocation);

module.exports = router;
