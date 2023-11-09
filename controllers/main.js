const express = require('express');
const router = express.Router();


router.post('/mainpage', (req, res) => {
    res.redirect('/cate')
  });

module.exports = router;