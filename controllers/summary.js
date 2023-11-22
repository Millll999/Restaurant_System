const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');


router.get('/summarize', (req, res) => {
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


    const menuQuery = `SELECT m.Menu_ID, m.Order_ID, menu.M_Name, o.total
    FROM mho m
    JOIN menu ON m.Menu_ID = menu.Menu_ID
    JOIN ordering o ON m.Order_ID = o.Order_ID
    WHERE m.Order_ID IN (
        SELECT Order_ID
        FROM ordering
        WHERE Customer_ID = ?
    )`;

    connection.execute(menuQuery, [Customer_ID], (menuErr, menuResult) => {
        if (menuErr) {
            console.error('Database query error:', menuErr);
            return res.status(500).json({ error: 'Error retrieving menu items' });
        }
        const menuItems = menuResult.map(item => ({
            menuName: item.M_Name
        }));
        
        res.json({ menuItems });
    });
});
});

module.exports = router;