const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/userController');

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', register);

// @route   POST /api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', login);

module.exports = router;
