const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/adminaddmenu', (req, res) => {
  const {item_name, price, category, username, password} = req.body;
    // Check if the user has admin privileges
        // Check if the username and password match in the customer table
        const userQuery = 'SELECT * FROM `customer` WHERE `username` = ? AND AES_DECRYPT(`password`, SHA1("x910dk-1239ja0-1321238")) = ? AND `Admin_validation` = 1';

        connection.execute(userQuery, [username, password], (userError, userResults) => {
            if (userError) {
                console.error('Database query error:', userError);
                return res.status(500).json({ error: 'Error checking user credentials' });
            }

            // Check if a user with the provided credentials exists
            if (userResults.length === 1) {
                // User has admin privileges, perform the insertion
                const insertQuery = 'INSERT INTO `menu` (`M_Name`, `Price`, `Category`) VALUES (?, ?, ?)';
                const insertValues = [item_name, price, category];

                connection.execute(insertQuery, insertValues, (insertError, insertResults) => {
                    if (insertError) {
                        console.error('Database query error:', insertError);
                        return res.status(500).json({ error: 'Error inserting menu item' });
                    }
                    console.log('Menu item added successfully:', insertResults);
                    res.redirect('/admin');
                });
            } else {
                // User does not have admin privileges
                return res.status(403).json({ error: 'User does not have admin privileges' });
            }
        });
})

module.exports = router;