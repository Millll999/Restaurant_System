const connection = require('../models/database');

function getPriceForMenuItem(Menu_ID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Price FROM menu WHERE Menu_ID = ?';
        connection.execute(query, [Menu_ID], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                reject(err);
            } else {
                if (results.length > 0) {
                    const price = results[0].Price;
                    resolve(price);
                } else {
                    reject(new Error('Menu item not found'));
                }
            }
        });
    });
}

module.exports = { getPriceForMenuItem };