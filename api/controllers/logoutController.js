const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  console.log('logging out');
  res.clearCookie('auth-token');
  res.render('login/login');
});

module.exports = router;
