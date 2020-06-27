const jwt = require('jsonwebtoken');

function generateToken(claims) {
  return jwt.sign(claims, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
}

function verifyToken(req, res, next) {
  console.log('verifying token');
  const token = req.cookies['auth-token'] || '';

  if (token == '') {
    console.log('No valid token - invalid user');
    res.redirect('/');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log('verifying');
    next();
  } catch (err) {
    console.log('Something went wrong invalid token' + err);
    res;
  }
}

function isTokenValid(req, res) {
  console.log('checking token validity');
  const token = req.cookies['auth-token'] || '';

  if (token == '') {
    console.log('No valid token - fresh user');
    return false;
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  verifyToken,
  isTokenValid,
  generateToken,
};
