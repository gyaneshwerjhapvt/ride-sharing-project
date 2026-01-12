const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");

router.post(
  "/create",
  vehicleController.registerVehicle
);

router.get(
  "/drivers/:driverId/",
  vehicleController.getVehicleByDriverId
);

module.exports = router;