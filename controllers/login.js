const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const passwordRegex = /^[a-zA-Z0-9_]+$/; // Adjust as needed

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    return res.status(400).send('Invalid special charecter');
  }

  try {
    if (req.session.loginAttempts >= 3) {
      req.session.loginAttempts = 0;
      //Alert
      res.redirect('/re');
    } else {
      const query = 'SELECT username, AES_DECRYPT(password, SHA1("x910dk-1239ja0-1321238")) AS decrypted_password, Admin_validation FROM customer WHERE username = ?';
      connection.execute(query, [username], (logerr, results) => {
        if (logerr) {
          console.error('Database query error:', logerr);
          res.status(500).send('Error logging in');
        } else {
          if (results.length > 0) {
            const user = results[0];
            if (user.Admin_validation === 1) {
              // User is an admin
              req.session.loginAttempts = 0;
              //Alert
              res.redirect('/admin');
            } else {
              const decryptedPassword = user.decrypted_password.toString();
              const enteredPassword = password;
              req.session.userID = username;
              if (enteredPassword === decryptedPassword) {
                res.redirect('/Home');
              } else {
                req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;
                //Alert
                res.send('Invalid password');
              }
            }
          } else {
            req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;
            res.send('Invalid username');
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