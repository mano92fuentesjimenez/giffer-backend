const config = require('config');
const jsonWebToken = require('jsonwebtoken');
const getJWTPayload = require('./getJWTPayload');

const secretKey = config.get('app.secretKey');

module.exports = {
  sign: function(user) {
    return new Promise((resolve, reject) => {
      jsonWebToken.sign(getJWTPayload(user), secretKey, function(err, token){
        if (err)
          return reject(err);
        resolve(token);
      })
    })
  },
  verify: function (token) {
    return new Promise(((resolve, reject) => {
      jsonWebToken.verify(token, secretKey, function(err, payload){
        if (err)
          return reject(err);
        resolve(payload);
      })
    }))
  }
};
