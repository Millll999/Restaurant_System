const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.post('/admindropmenu', (req, res) => {
    const { menuName, category, username, password } = req.body;
    try {
        const query = 'DELETE FROM `menu` WHERE `M_Name` = ? AND `Category` = ? AND EXISTS (SELECT 1 FROM `customer` WHERE `username` = ? AND AES_DECRYPT(`password`, SHA1("x910dk-1239ja0-1321238")) = ? AND `Admin_validation` = 1);';
        connection.execute(query, [menuName, category, username, password], (adminDeleteErr) => {
            if (adminDeleteErr) {
                console.error('Database delete error:', adminDeleteErr);
                res.send('Error deleting data from the database');
            } else {
                console.log('Data deleted from the database');
                res.send('Delete Successful');
            }
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Try again later');
    }
});

module.exports = router;