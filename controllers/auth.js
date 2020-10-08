// Models
const User = require('../models/User');

// Helpers
const { handleError, createToken } = require('../helpers/auth');

// Config
const { JWT_EXP } = require('../config');

const getRegisterPage = (req, res) => {
     res.render('register');
};

const register = async (req, res) => {
     const { username, email, password } = req.body;
     try {
          const newUser = new User({
               username,
               email,
               password,
          });
          const user = await newUser.save();
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: JWT_EXP * 3000 });
          res.json(201, { user: user._id });
     } catch (err) {
          const errors = handleError(err);
          res.json(400, { errors });
     }
};

const getLoginPage = (req, res) => {
     res.render('login');
};

const login = async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await User.login(email, password);
          const token = createToken(user._id);
          res.cookie('jwt', token, {
               httpOnly: true,
               maxAge: JWT_EXP * 3000,
          });
          res.json(200, { user:user._id });
     } catch (error) {
          res.json(200, { errors: error.message });
     }
};

const logout = (req, res) => {
     res.cookie("jwt", "", {maxAge: 1});
     res.redirect('/auth/login');
}

module.exports = {
     getRegisterPage,
     register,
     getLoginPage,
     login,
     logout
};
