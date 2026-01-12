const  Payment  = require("../models/Payment");
const Ride = require("../models/Ride");

exports.createOrUpdatePayment = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { amount, method, status } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.status !== "completed") {
      return res.status(400).json({
        message: "Payment allowed only after ride completion"
      });
    }

    const existingPayment = await Payment.findOne({
      where: { ride_id: rideId }
    });

    if (existingPayment) {
      await existingPayment.update({
        amount,
        method,
        status,
        payment_date: new Date()
      });

      return res.status(200).json({
        message: "Payment updated",
        payment: existingPayment
      });
    }

    const payment = await Payment.create({
      ride_id: rideId,
      amount,
      method,
      status
    });

    return res.status(201).json({
      message: "Payment created",
      payment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment processing failed" });
  }
};

// Get payment by ride
 
exports.getPaymentByRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const payment = await Payment.findOne({
      where: { ride_id: rideId }
    });

    if (!payment) {
      return res.status(404).json({
        message: "No payment found for this ride"
      });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching payment" });
  }
};
