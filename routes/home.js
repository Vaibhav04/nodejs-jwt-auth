const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

// Controller
const { getHomePage, getWelcomePage } = require('../controllers/home');

router.get('/', getHomePage);

router.get('/welcome', isAuthenticated, getWelcomePage);

module.exports = router;
