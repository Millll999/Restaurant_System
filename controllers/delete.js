const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/deleterUser', (req, res) => {
    const { username, password } = req.body;
    const query = 'DELETE FROM `customer` WHERE username = ? AND password = ?'

    connection.execute(query, [username, password], (delerr, result)=> {
        if (delerr) {
            console.error('Database query error: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else {
            if (result.affectedRows > 0) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    })
})

module.exports = router;
