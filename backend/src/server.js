import express from "express";
import { sequelize } from "./models/index.js";

import userRoutes from "./routes/user.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import ratingRoutes from "./routes/rating.routes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ratings", ratingRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync db: ", err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
