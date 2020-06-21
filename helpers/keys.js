const config = require('config');
const { generateKeyPair } = require('crypto');
const util = require('util');

const key = config.get('app.secretKey');
const generateKeyPairPromisified = util.promisify(generateKeyPair);

module.exports = generateKeyPairPromisified(
  'rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: key,
    }
  }
)