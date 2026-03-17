const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, '..', 'keys');
const privateKeyPath = path.join(keysDir, 'jwt_private.pem');
const publicKeyPath = path.join(keysDir, 'jwt_public.pem');

if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

let privateKey;
let publicKey;

if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
  privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  publicKey = fs.readFileSync(publicKeyPath, 'utf8');
} else {
  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  privateKey = keyPair.privateKey;
  publicKey = keyPair.publicKey;

  fs.writeFileSync(privateKeyPath, privateKey, { encoding: 'utf8', flag: 'w' });
  fs.writeFileSync(publicKeyPath, publicKey, { encoding: 'utf8', flag: 'w' });
}

module.exports = {
  privateKey,
  publicKey,
};

