const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  const secretKey = process.env.SESSION_SECRET; // Use your secret key here

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Token is valid, set the user object on the request for future use
    req.user = decodedToken;
    next();
  });

}

module.exports = isAuthenticated;
