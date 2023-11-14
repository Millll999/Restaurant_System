const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/adminaddmenu', (req, res) => {
  const {item_name, price, category, username, password} = req.body;
  try{
      const query = 'INSERT INTO `menu`( `M_Name`, `Price`, `Category`) VALUES ( ?, ?, ?) WHERE username = ? AND AES_DECRYPT(password, SHA1("x910dk-1239ja0-1321238")) = ? AND Admin_validation = 1';
      connection.execute(query, [item_name, price, category, username, password], (adminInserterr) => {
          if (adminInserterr) {
              console.error('Database insert error:', adminInserterr);
              res.send('Error submitting data to the database');
            } else {
              console.log('Data inserted into the database');
              res.send('Add Successful');
            }
      })
    } catch (err){
      console.log("Error: ", err);
      res.status(500).send("Try again later");
    }
});

module.exports = router;