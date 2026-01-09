const express = require('express');
const router = express.Router();
const {
    create_ride,
    list_rides,
    get_ride_by_id,
    accept_ride,
    complete_ride,
    cancel_ride
} = require('../controllers/ride.controller');

// Rider requests a new ride
router.post('/request', create_ride);

// List all rides
router.get('/', list_rides);

// Get ride by ID
router.get('/:ride_id', get_ride_by_id);

// Driver accepts a ride
router.put('/:ride_id/accept', accept_ride);

// Complete a ride (driver marks completed)
router.put('/:ride_id/complete', complete_ride);

// Cancel a ride (rider or driver)
router.put('/:ride_id/cancel', cancel_ride);

module.exports = router;
