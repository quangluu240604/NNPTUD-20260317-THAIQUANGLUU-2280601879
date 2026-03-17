const jwt = require('jsonwebtoken');
const { publicKey } = require('./jwtKeys');

function verifyToken(token) {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
  });
}

module.exports = {
  verifyToken,
};

