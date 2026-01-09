const Rating = require('../models/Rating');

// post rating
exports.create_rating = async (req, res) => {
    try{
        const required = ['ride_id', 'given_by', 'given_to', 'score'];
        for(const k of required){
            if(req.body[k] === undefined){
                return res.status(400).json({
                    message: `Missing required field : ${k}`
                });
            }
        }

        const rating = await Rating.create(req.body);
        res.status(201).json(rating);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

// get rating
exports.list_ratings = async(req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.json(ratings);
    } catch (error) {
        res.status(400).json({message: err.message});
    }
};

// get rating by ride id
exports.list_ratings_by_ride = async(req, res) => {
    try {
        const ride_id = parseInt(req.params.ride_id, 10);
        if(Number.isNaN(ride_id)) return res.status(400).json({message: 'Invalid ride_id'});
        const ratings = await Rating.findAll({where: {ride_id}});
        res.json(ratings);
    } catch (error) {
        res.status(400).json({message:err.message});
    }
}

// get by user id
exports.list_ratings_by_user = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id, 10);
        if(Number.isNaN(user_id)) return res.status(400).json({message: 'Invalid user_id'});
        const ratings = await Rating.findAll({where: {given_to: user_id}});
        res.json(ratings);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: err.message});
    }
}