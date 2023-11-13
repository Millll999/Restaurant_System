const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/addorder', (req, res) => {
    const userID = req.session.userID;
    const menuID = req.session.cart;

    // Get Customer_ID
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

        // Insert into ordering when clicking cart icon
        const orderQuery = 'INSERT INTO ordering (Customer_ID) VALUES (?)';
        connection.execute(orderQuery, [Customer_ID], (orderErr, orderResult) => {
            if (orderErr) {
                console.error('Database query error:', orderErr);
                return res.status(500).json({ error: 'Error inserting into ordering' });
            }

            // Insert into mho when clicking cart icon
            const mhoQuery = 'INSERT INTO mho (Menu_ID, Order_ID) VALUES ?';
            const values = menuID.map(Menu_ID => [Menu_ID, orderResult.insertId]);
            connection.query(mhoQuery, [values], (mhoErr) => {
                if (mhoErr) {
                    console.error('Database query error:', mhoErr);
                    return res.status(500).json({ error: 'Error adding items to cart' });
                }
                //Empty session after click cart icon
                req.session.cart = [];
                res.redirect('/summarize');
            })
        })
    })
})

module.exports = router;