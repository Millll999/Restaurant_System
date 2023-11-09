const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/addToCart', (req, res) => {
    const { Menu_ID } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(Menu_ID);

    res.json({ message: 'Item added to cart' });
});

module.exports = router;