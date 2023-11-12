const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/make-reservation', (req, res) =>{
    try{
    const { bookingDate, tableID, username, password } = req.body;
    const checkTableQuery = 'SELECT COUNT(*) AS count FROM reservation WHERE tableID = ?';
    connection.execute(checkTableQuery, [tableID], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Database query error:', checkErr);
        res.status(500).send('Error checking table availability');
      } else {
        const tableCount = checkResults[0].count;
        if (tableCount > 0) {
          //Alert
          res.status(500).send('Table is already reserved');
        }else {
          const reserve = ` INSERT INTO reservation (bookingDate, tableID, customer_ID) 
          SELECT ?, ?, customer.customer_ID FROM customer 
          WHERE username = ? AND AES_DECRYPT(password, SHA1("x910dk-1239ja0-1321238")) = ?;`;
          connection.execute(reserve, [ bookingDate, tableID, username, password ], (err, results) => {
            if (err) {
              console.error('Database query error:', err);
              res.status(500).send('Error making a reservation');
            }else {
              // Check if any rows were affected by the query
              if (results.affectedRows === 0) {
                // No rows affected means invalid username or password
                res.status(401).send('Invalid username or password');
              } else {
                console.log('Reservation made successfully');
                //Alert
                res.send('Reservation made successfully');
              }  
            }
          })
        }
      }
    });
    } catch(err){
      console.log("Error: ", err);
      res.status(500).send("Try again later");
    }
  });

module.exports = router;