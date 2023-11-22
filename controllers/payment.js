const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/payment', (req, res) => {
    const userID = req.session.userID;
    const customerQuery = 'SELECT Customer_ID FROM customer WHERE username = ?';
    
    connection.execute(customerQuery, [userID], (customerErr, customerResult) => {
        if (customerErr) {
            console.error('Database query error:', customerErr);
            return res.status(500).json({ error: 'Error retrieving Customer_ID' });
        }
    
        if (customerResult.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
    
        const Customer_ID = customerResult[0].Customer_ID;
    
        const insertPaymentQuery = `
            INSERT INTO payment (order_ID, amount, Date)
            SELECT Order_ID, total, NOW() FROM ordering WHERE Customer_ID = ?;
        `;
    
        connection.execute(insertPaymentQuery, [Customer_ID], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Database query error:', insertErr);
                return res.status(500).json({ error: 'Error inserting into payment' });
            }
    
            // Payment successfully inserted
            res.redirect('/thank')
        });
    });
});

module.exports = router;