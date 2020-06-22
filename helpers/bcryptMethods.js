const bcrypt = require('bcrypt-nodejs');
const util = require('util');

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hashedPassword) => {
        if(err)
          return reject(err);
        resolve(hashedPassword);
      })
    })
  })
}

module.exports = {
  hash,
  compare: util.promisify(bcrypt.compare),
}