import Payment from "../models/Payment.js";

const paymentService = {
  PaymentService: {
    PaymentPort: {
      createPaymentRequest: async function (args) {
        console.log("SOAP Request Received:", args);

        try {
          if (!args.ride_id || !args.amount || !args.method) {
            throw new Error("Missing required fields: ride_id, amount, method");
          }

          const rideId = parseInt(args.ride_id);
          const amount = parseFloat(args.amount);

          if (isNaN(rideId) || rideId <= 0) {
            throw new Error("Invalid ride_id: must be a positive integer");
          }

          if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid amount: must be a positive number");
          }

          const newPayment = await Payment.create({
            ride_id: rideId,
            amount: amount,
            method: args.method,
            status: "completed",
          });

          return {
            transaction_id: "TXN-" + Date.now(),
            status: "SUCCESS",
            message: `Payment of ${amount} processed successfully.`,
          };
        } catch (error) {
          console.error(`SOAP Processing Error:`, error);
          throw {
            Fault: {
              Code: {
                Value: "soap:Sender",
                Subcode: { value: "rpc:BadArguments" },
              },
              Reason: { Text: error.message },
            },
          };
        }
      },
    },
  },
};

export default paymentService;
