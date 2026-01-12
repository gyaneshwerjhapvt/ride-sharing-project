import express from "express";
import * as controller from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/rides/:ride_id", controller.createOrUpdatePayment);
router.get("/rides/:ride_id", controller.getPaymentByRide);

export default router;
