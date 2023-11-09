const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/addToCart', (req, res) => {
    const { Menu_ID } = req.body;
    const query = 'INSERT INTO mho (Menu_ID) VALUES (?)';
    connection.execute(query, [Menu_ID], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Error adding item to cart' });
        } else {
            if (!req.session.cart) {
                req.session.cart = [];
            }
            req.session.cart.push(Menu_ID);
            res.json({ message: 'Item added to cart' });
        }
    });
});
module.exports = router;