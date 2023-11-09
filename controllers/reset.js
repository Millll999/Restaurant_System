const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/reset-password', (req, res) =>{
    const { new_password, username } = req.body;
    try{
    const reset = 'UPDATE customer SET password = ? WHERE username = ?';
    connection.execute(reset, [new_password, username], (err)=>{
      if (err) {
        console.error('Password update query error:', err);
        res.send('Error updating password');
      } else {
        console.log('Password updated successfully');
        res.redirect('/');
      }
    });
    }catch(err){
      console.error('Error:', err);
      res.status(500).send('An error occurred. Please try again later.');
    }
  })

module.exports = router; 