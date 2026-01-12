import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import * as soap from "soap";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./config/db.js";
import userRoutes from "./rest/routes/user.routes.js";
import rideRoutes from "./rest/routes/ride.routes.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import paymentService from "./soap/payment.service.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "SOAPAction"],
    credentials: true,
  })
);

app.use("/api", express.json());
app.use("/graphql", express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);

const startApollo = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  console.log("🚀 GraphQL ready at /graphql");
};

const PORT = 3000;

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database connected and synchronized.");
    await startApollo();

    const httpServer = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const wsdlXml = fs.readFileSync(
        path.join(__dirname, "soap/payment.wsdl"),
        "utf8"
      );

      soap.listen(app, "/soap/payment", paymentService, wsdlXml, function () {
        console.log("🧼 SOAP Server initialized at /soap/payment");
      });
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
