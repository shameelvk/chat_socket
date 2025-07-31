const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/auth.controller');

// @route   POST /register
// @desc    Register a new user
router.post('/register', registerUser);


// @route   POST /login
// @desc    Login user
router.post('/login', login);

module.exports = router;
