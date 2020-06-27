const express = require('express');
const router = express.Router();
const { generateToken } = require('../services/tokenService');
const { validateUser } = require('../repositories/userRepository');

router.post('/', async (req, res) => {
  validateUser(req.body.email, req.body.password).then((user) => {
    if (user != false) {
      const role = user[0].role || 'employee';
      var claims = { _id: user[0]._id, role };
      var accessToken = generateToken(claims);
      res.status(200).json({
        data: { email: user[0].email, role: user[0].role },
        accessToken,
      });
    } else {
      res.status(401).json({
        error:
          'Invalid user or password, try to with correct username and password',
      });
    }
    // TODO: handle error scenarios
  });
  console.log('cookie created successfully');
});

module.exports = router;
