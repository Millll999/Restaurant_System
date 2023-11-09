const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/addorder', (req, res) => {
    const userID = req.session.userID;
    const menuID = req.session.cart;
    const customerQuery = 'SELECT Customer_ID FROM customer WHERE username = ?';
    connection.execute(customerQuery, [userID], (customerErr, customerResult) => {
    if (customerErr) {
        console.error('Database query error:', customerErr);
        return res.status(500).json({ error: 'Error retrieving Customer_ID' });
    }
    if (customerResult.length > 0) {
        const Customer_ID = customerResult[0].Customer_ID;       
        const values = menuID.map(Menu_ID => [Menu_ID, Customer_ID]);
            const insertPromises = values.map(([Menu_ID, Customer_ID]) => {
            return new Promise((resolve, reject) => {
                const mhoQuery = 'INSERT INTO mho (Menu_ID, Order_ID) VALUES (?, ?)';
                connection.query(mhoQuery, [Menu_ID, Customer_ID], (mhoErr, mhoResult) => {
                    if (mhoErr) {
                        reject(mhoErr);
                    } else {
                        resolve();
                    }
                });
            });
        });    
        Promise.all(insertPromises)
            .then(() => {
                res.redirect('/summarize');
            })
            .catch(error => {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Error adding items to cart' });
            });
    }
    
})
})

module.exports = router;