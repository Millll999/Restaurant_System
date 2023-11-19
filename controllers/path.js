const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Login.html');
    res.sendFile(filePath);
});
router.get('/Home', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Home.html');
    res.sendFile(filePath);
});
router.get('/sign', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'SignUp.html');
    res.sendFile(filePath);
});
router.get('/re', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Forgot.html');
    res.sendFile(filePath);
});
router.get('/cate', (req,res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Category.html');
    res.sendFile(filePath);
});
router.get('/reserve', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Book.html');
    res.sendFile(filePath);
});
router.get('/savor', (req, res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Savory.html');
    res.sendFile(filePath);  
});
router.get('/dessert', (req, res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Dessert.html');
    res.sendFile(filePath);
});
router.get('/drink', (req, res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Drink.html');
    res.sendFile(filePath);
});
router.get('/delete', (req, res) => {
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Delete.html');
    res.sendFile(filePath);
});
router.get('/summarizing', (req, res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'OrderSum.html');
    res.sendFile(filePath);
});
router.get('/adminadd', (req, res) =>{
    const filePath = path.join('C:', 'Users', 'Natchapol', 'Desktop', 'Fresh_Bowl', 'views', 'Add.html');
    res.sendFile(filePath);
});

module.exports = router;