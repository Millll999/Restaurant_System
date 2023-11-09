const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/signup', (req, res) => {
    const { First_Name, Last_Name, Citizen_ID, address, username, password, confirmPassword } = req.body;
  
    try {
      if (password !== confirmPassword) {
        return res.send('Passwords do not match');
      }
  
      const insertQuery = 'INSERT INTO customer (First_Name, Last_Name, Citizen_ID, address, username, password) VALUES (?, ?, ?, ?, ?, ?)';
  
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