const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// User registration route
router.post('/register', (req, res) => userController.register(req, res));

// User login route
router.post('/login', (req, res) => userController.login(req, res));

// Fetch user profile route
router.get('/profile', auth, (req, res) => userController.getUserProfile(req, res));

// Update user profile route
router.put('/profile', auth, (req, res) => userController.updateUserProfile(req, res));

module.exports = router;
