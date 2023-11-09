const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');

router.get('/savormenu', (req, res) => {
    const query = 'SELECT * FROM menu WHERE Category = 1';
    connection.execute(query, (err, rows) => {
      if (err) {
        console.error('Database query error: ' + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const menuData = rows.map((row) => ({
          buttonId: row.Menu_ID,
          buttonLabel: row.M_Name,
        }))
        res.json(menuData);
      }
    })
  })

module.exports = router;