const express = require('express');
const axios = require('axios');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    try {
      if (req.session.loginAttempts >= 3) {
        req.session.loginAttempts = 0;
        //Alert
        res.redirect('/re');
      } else {
        const query = 'SELECT * FROM customer WHERE username = ? AND password = ?';
        connection.execute(query, [username, password], (logerr, results) => {
          if (logerr) {
            console.error('Database query error:', err);
            res.status(500).send('Error logging in');
          } else {
            if (results.length > 0) {
              if (results[0].Admin_validation === 1) {
                // User is an admin
                req.session.loginAttempts = 0;
                //Alert
                res.send('Welcome admin');
              } else {
                //Alert
                req.session.userID = username;
                res.redirect('/Home');
              }
            } else {
              req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;
              //Alert
              res.send('Invalid username or password');
            }
          }
        });
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred. Please try again later.');
    }
  });

module.exports = router;