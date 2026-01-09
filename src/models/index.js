const sequelize = require('../config/db');
require('./Rating');

const Payment = require('./Payment');
const Ride = require('./Ride');

module.exports = {sequelize, Payment, Ride};