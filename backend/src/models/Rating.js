const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define('Rating', {
    rating_id: {type: DataTypes.INTEGER, primaryKey: true},
    ride_id: {type: DataTypes.INTEGER},
    given_by: {type: DataTypes.INTEGER}, // customer ne rating diya
    given_to: {type: DataTypes.INTEGER}, // rider ko rating mila
    score: {type: DataTypes.INTEGER},
    comment: {type: DataTypes.TEXT}
},{
    tableName: 'ratings',
    timestamps: false
});