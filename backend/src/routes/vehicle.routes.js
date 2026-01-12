import express from "express";
import * as controller from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/create", controller.registerVehicle);
router.get("/drivers/:driver_id", controller.getVehicleByDriverId);

export default router;
