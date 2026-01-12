import { Payment, Ride } from "../models/index.js";

export const createOrUpdatePayment = async (req, res) => {
  try {
    const { ride_id } = req.params;
    const { amount, method, status } = req.body;

    const ride = await Ride.findByPk(ride_id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Ride must be completed before payment" });
    }

    let payment = await Payment.findOne({ where: { ride_id } });

    if (payment) {
      await payment.update({
        amount,
        method,
        status,
        payment_date: new Date(),
      });
      return res.status(200).json({ message: "Payment updated", payment });
    }

    payment = await Payment.create({ ride_id, amount, method, status });
    return res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaymentByRide = async (req, res) => {
  try {
    const { ride_id } = req.params;
    const payment = await Payment.findOne({ where: { ride_id } });

    if (!payment) return res.status(404).json({ message: "No payment found" });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
