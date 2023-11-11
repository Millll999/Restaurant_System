const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/adminaddmenu', (req, res) => {
const {item_name, price, category, username, password} = req.body;
console.log(req.body);
//try {
    //if (password !== confirmPassword) {
      //return res.send('Passwords do not match');
    //}
    const query = 'INSERT INTO `menu`( `M_Name`, `Price`, `Category`) VALUES ( ?, ?, ?)';
    connection.execute(query, [item_name, price, category], (adminInserterr) => {
        if (adminInserterr) {
            console.error('Database insert error:', adminInserterr);
            res.send('Error submitting data to the database');
          } else {
            console.log('Data inserted into the database');
            res.send('Add Successful');
          }
    })
//} catch(err) {
    //console.error('Error:', err);
    //res.status(500).send('An error occurred. Please try again later.');
 // }
});

module.exports = router;