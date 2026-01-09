const Ride = require('../models/Ride');
// Create/Request a ride
exports.create_ride = async (req, res) => {
    try {
        const required = ['rider_id', 'pickup_location', 'drop_location'];

        for (const k of required) {
            if (req.body[k] === undefined) {
                return res.status(400).json({
                    message: `Missing required field : ${k}`
                });
            }
        }
        const ride = await Ride.create({
            rider_id: req.body.rider_id,
            pickup_location: req.body.pickup_location,
            drop_location: req.body.drop_location,
            status: req.body.status
        });

        res.status(201).json(ride);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Get all rides
exports.list_rides = async (req, res) => {
    try {
        const rides = await Ride.findAll();
        res.json(rides);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Get ride by ride_id
exports.get_ride_by_id = async (req, res) => {
    try {
        const ride_id = parseInt(req.params.ride_id, 10);
        if (Number.isNaN(ride_id)) {
            return res.status(400).json({ message: 'Invalid ride_id' });
        }

        const ride = await Ride.findByPk(ride_id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.json(ride);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Accept ride (assign driver)
exports.accept_ride = async (req, res) => {
    try {
        const ride_id = parseInt(req.params.ride_id, 10);
        const { driver_id } = req.body;

        if (Number.isNaN(ride_id)) {
            return res.status(400).json({ message: 'Invalid ride_id' });
        }

        const ride = await Ride.findByPk(ride_id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.status !== 'requested') {
            return res.status(400).json({
                message: 'Only requested rides can be accepted'
            });
        }

        ride.driver_id = driver_id;
        ride.status = 'ongoing';
        ride.start_time = new Date();

        await ride.save();
        res.json(ride);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Complete ride
exports.complete_ride = async (req, res) => {
    try {
        const ride_id = parseInt(req.params.ride_id, 10);
        const { fare } = req.body;

        if (Number.isNaN(ride_id)) {
            return res.status(400).json({ message: 'Invalid ride_id' });
        }

        const ride = await Ride.findByPk(ride_id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.status !== 'ongoing') {
            return res.status(400).json({
                message: 'Only ongoing rides can be completed'
            });
        }

        ride.status = 'completed';
        ride.end_time = new Date();
        ride.fare = fare;

        await ride.save();
        res.json(ride);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Cancel ride
exports.cancel_ride = async (req, res) => {
    try {
        const ride_id = parseInt(req.params.ride_id, 10);

        if (Number.isNaN(ride_id)) {
            return res.status(400).json({ message: 'Invalid ride_id' });
        }

        const ride = await Ride.findByPk(ride_id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.status === 'completed') {
            return res.status(400).json({
                message: 'Completed rides cannot be cancelled'
            });
        }

        ride.status = 'cancelled';
        await ride.save();

        res.json(ride);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
