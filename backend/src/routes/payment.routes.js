const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");


router.post(
  "/rides/:rideId/",
  paymentController.createOrUpdatePayment
);


router.get(
  "/rides/:rideId/",
  paymentController.getPaymentByRide
);

module.exports = router;
