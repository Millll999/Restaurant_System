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
          WHERE username = ? AND password = ?;`;
          connection.execute(reserve, [ bookingDate, tableID, username, password ], (err) => {
            if (err) {
              console.error('Database query error:', err);
              res.status(500).send('Error making a reservation');
            } else {
              console.log('Reservation made successfully');
              //Alert
              res.send('Reservation made successfully');
            }
          });
        }
      }
    });
    } catch(err){
      console.log("Error: ", err);
      res.status(500).send("Try again later");
    }
  });

module.exports = router;