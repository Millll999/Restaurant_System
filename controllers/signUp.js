const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/signup', (req, res) => {
    const { First_Name, Last_Name, Citizen_ID, address, username, password, confirmPassword } = req.body;
    const First_NameRegex = /^[a-zA-Z]+$/;
    const Last_NameRegex = /^[a-zA-Z]+$/;
    const Citizen_IDRegax = /^[a-zA-Z0-9]+$/;
    const addressRegax = /^[a-zA-Z0-9_]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const passwordRegex = /^[a-zA-Z0-9_]+$/;
    const confirmPasswordRegax =  /^[a-zA-Z0-9_]+$/;

    
      if (!First_NameRegex.test(First_Name)) {
        return res.status(400).send('Invalid first name');
      }

      if (!Last_NameRegex.test(Last_Name)) {
        return res.status(400).send('Invalid last name');
      }

      if (!Citizen_IDRegax.test(Citizen_ID)) {
        return res.status(400).send('Invalid citizen ID');
      }

      if (!addressRegax.test(address)) {
        return res.status(400).send('Invalid address');
      }

      if (!usernameRegex.test(username) || !passwordRegex.test(password) || !confirmPasswordRegax.test(confirmPassword)) {
        return res.status(400).send('Invalid username or password');
      }
      
    try {
      if (password !== confirmPassword) {
        return res.send('Passwords do not match');
      }
  
      const insertQuery = 'INSERT INTO customer (First_Name, Last_Name, Citizen_ID, address, username, password) VALUES (?, ?, ?, ?, ?, AES_ENCRYPT(?, SHA1("x910dk-1239ja0-1321238")))';
      connection.execute(insertQuery, [First_Name, Last_Name, Citizen_ID, address, username, password], (inserterr) => {
        if (inserterr) {
          console.error('Database insert error:', inserterr);
          res.send('Error submitting data to the database');
        } else {
          console.log('Data inserted into the database');
          res.redirect('/');
        }
      })
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred. Please try again later.');
    }
  })



  
module.exports = router;