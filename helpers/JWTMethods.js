const config = require('config');
const jsonWebToken = require('jsonwebtoken');
const getJWTPayload = require('./getJWTPayload');
const keys = require('./keys');

const passphrase = config.get('app.secretKey');
const algorithm = 'RS512'

module.exports = {
  sign: function(user) {
    return new Promise(async (resolve, reject) => {
      const { privateKey } = await keys;
      jsonWebToken.sign(getJWTPayload(user), { passphrase, key: privateKey },{ algorithm }, function(err, token){
        if (err)
          return reject(err);
        resolve(token);
      })
    })
  },
  verify: function (token) {
    return new Promise( async (resolve, reject) => {
      const { privateKey } = await keys;
      jsonWebToken.verify(token, privateKey, { algorithms: [algorithm]},function(err, payload){
        if (err)
          return reject(err);
        resolve(payload);
      })
    })
  }
};
