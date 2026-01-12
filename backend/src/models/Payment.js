const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define(
  "Payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ride_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    method: {
      type: DataTypes.ENUM("cash", "credit_card", "wallet", "upi"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "payment",
    timestamps: false
  }
);

module.exports = Payment;
