const express = require('express');
const router = express.Router();
const connection = require('../models/database.js');
const sharp = require('sharp');

router.get('/savormenu', (req, res) => {
    const query = 'SELECT Menu_ID, M_Name, img_food FROM menu WHERE Category = 1';
    connection.execute(query, (err, rows) => {
        if (err) {
            console.error('Database query error: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const menuData = rows.map(async (row) => ({
                buttonId: row.Menu_ID,
                buttonLabel: row.M_Name,
                buttonImage: await convertToJpg(row.img_food),
            }));

            Promise.all(menuData)
                .then((menuWithImages) => {
                    res.json(menuWithImages);
                })
                .catch((error) => {
                    console.error('Error converting images:', error);
                    res.status(500).json({ error: 'Error converting images' });
                });
        }
    });
});

async function convertToJpg(imgBuffer) {
    try {
        if (!imgBuffer || imgBuffer.length === 0) {
        }
        // Use sharp to convert the image buffer to JPG format
        const jpgBuffer = await sharp(imgBuffer).toFormat('jpeg').toBuffer();

        // Convert the buffer to a data URL for use in your front-end
        return `data:image/jpeg;base64,${jpgBuffer.toString('base64')}`;
    } catch (error) {

    }
}

module.exports = router;
