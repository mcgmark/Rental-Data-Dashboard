const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');
const jwt = require('jsonwebtoken');



router.post('/register', (req, res) => {
  // use User model to try creating a new user
  // User model extends passport-local-mongoose, so it does duplicate checks and hashes passwords
  User.register(new User({
          username: req.body.username
      }), req.body.password, (err, user) => {
          if (err) {
              console.log(err);
              let errorMessage = 'Registration failed'; // Default error message

            if (err.name === 'UserExistsError') {
                errorMessage = 'Username already exists';
            } else if (err.message) {
                errorMessage = err.message; // Extract the error message from the err object
            }
            return res.status(500).json({ error: errorMessage });
          }
          else {
            console.log("registered");
            // Send a success response back to the Angular app
            res.status(200).json({ message: 'Registration successful' });
          }
      });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    // Log in the user using req.login() method
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      const secretKey = process.env.SESSION_SECRET;
      const token = jwt.sign({ username: user.username }, secretKey);
      return res.status(200).json({ user, message: 'Login successful', token });
    });
  })(req, res, next);
});


router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logout successful'});
  });
});

// GOOGLE CALLBACK here **
router.get('/google', passport.authenticate('google', {scope: ['profile']}), (req,res) => {});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: 'auth/login',
    failureMessage: 'Could not authenticate with Google'
}));

module.exports = router;
