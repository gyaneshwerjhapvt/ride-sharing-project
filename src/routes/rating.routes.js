const router = require('express').Router();

const{
    create_rating,
    list_ratings,
    list_ratings_by_user,
    list_ratings_by_ride,
} = require('../controllers/rating.controller');

router.post('/', create_rating);
router.get('/', list_ratings);
router.get('/ride/', list_ratings_by_ride);
router.get('/user/:user_id', list_ratings_by_user)

module.exports = router;