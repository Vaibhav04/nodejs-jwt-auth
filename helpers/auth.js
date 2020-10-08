// Third party module
const JWT = require('jsonwebtoken');

// Config
const { JWT_KEY, JWT_EXP } = require('../config');
const User = require('../models/User');

function isAuthenticated(req, res, next) {
     const token = req.cookies.jwt;
     if (token) {
          JWT.verify(token, JWT_KEY, (async (err, decoded) => {
               if(err) {
                    res.locals.user = null;
                    res.redirect('/auth/login');
               }
               const user = await User.findById(decoded.id).select({username: 1});
               res.locals.user = user;
               next();
          }))
     } else {
          res.locals.user = null;
          res.redirect('/auth/login');
     }
}

// TODO
// function isNotAuthenticated(req, res, next) {
//      if (req.isAuthenticated()) {
//           res.redirect('/welcome');
//      } else {
//           next();
//      }
// }

function handleError(err) {
     const errors = {
          username: '',
          password: '',
          email: '',
     };
     // Email duplicate error
     if (err.code === 11000) {
          errors.email = 'Email is already registered';
          return errors;
     }
     Object.values(err.errors).forEach((err) => {
          const { path, message } = err.properties;
          errors[path] = message;
     });
     return errors;
}
function createToken(id) {
     const jwt = JWT.sign({id}, JWT_KEY, {
          expiresIn: JWT_EXP,
     });
     return jwt;
}

module.exports = {
     isAuthenticated,
     // isNotAuthenticated,
     handleError,
     createToken,
};
