const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true 
    },

    make: {
      type: DataTypes.STRING,
      allowNull: false
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false
    },

    plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    color: {
      type: DataTypes.STRING
    },

    year: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: "vehicle",
    timestamps: false
  }
);

module.exports = Vehicle;