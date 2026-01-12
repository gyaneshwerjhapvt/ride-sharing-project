const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserById
} = require('../controllers/user.controller.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);

module.exports = router;
