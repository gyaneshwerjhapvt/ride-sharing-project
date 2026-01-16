import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ride_sharing_db", "root", "Anamika@08", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    allowPublicKeyRetrieval: true,
  }
});

export default sequelize;
