const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/deleteUser', (req, res) => {
    const { username, password } = req.body;

    // Check if there are any records in the ordering table for the given customer
    const checkOrderingQuery = 'SELECT 1 FROM `ordering` o JOIN `customer` c ON o.Customer_ID = c.Customer_ID WHERE c.username = ?';

    connection.execute(checkOrderingQuery, [username], (checkOrderingErr, checkOrderingResult) => {
        if (checkOrderingErr) {
            console.error('Database query error: ' + checkOrderingErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (checkOrderingResult.length > 0) {
            // There are records in the ordering table for the given customer
            return res.status(403).json({ error: 'Cannot delete user with active orders or reservations' });
        }

        // If no active orders, proceed with user deletion
        const deleteUserQuery = 'DELETE FROM `customer` WHERE username = ? AND AES_DECRYPT(password, SHA1("x910dk-1239ja0-1321238")) = ?';

        connection.execute(deleteUserQuery, [username, password], (deleteErr, result) => {
            if (deleteErr) {
                console.error('Database query error: ' + deleteErr.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows > 0) {
                return res.json({ message: 'User deleted successfully' });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        });
    });
});

module.exports = router;
