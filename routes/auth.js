const express = require('express');
const router = express.Router();

// Controllers
const {
     getRegisterPage,
     getLoginPage,
     register,
     login,
     logout
} = require('../controllers/auth');

router.get('/register', getRegisterPage);

router.post('/register', register);

router.get('/login', getLoginPage);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;
