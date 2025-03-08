const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Fetch user profile route
router.get('/profile', auth, userController.getUserProfile);

// Update user profile route
router.put('/profile', auth, userController.updateUserProfile);

module.exports = router;
