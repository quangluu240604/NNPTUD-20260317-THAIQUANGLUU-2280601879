const jwt = require('jsonwebtoken');
const { privateKey } = require('./jwtKeys');

function signToken(payload, options = {}) {
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
    ...options,
  });
}

module.exports = {
  signToken,
};

