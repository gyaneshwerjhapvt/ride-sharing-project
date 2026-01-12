const express = require('express');
const app = express();

require('./models');
const sequelize = require('./config/db');

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/user.routes');
const rating_routes = require('./routes/rating.routes');
const paymentRoutes = require('./routes/payment.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const rideRoutes = require('./routes/ride.routes');

// Use Routes
app.use('/users', userRoutes);
app.use('/ratings', rating_routes);
app.use('/payment', paymentRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/rides', rideRoutes);


// Test DB connection
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database Connected");
    } catch (error) {
        console.error('Startup error:', error.message);
    }
})();

// Start Server
app.listen(3000, () => {
console.log('Server running on port 3000');
});