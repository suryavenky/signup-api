const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({
    data: 'Welcome to Signup API v.0.1',
  });
});

module.exports = router;
