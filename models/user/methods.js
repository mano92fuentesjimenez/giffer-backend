const { compare } = require('../../helpers/bcryptMethods');

module.exports = function applyMethods(userSchema){
  userSchema.methods.checkPassword = function (password) {
    return compare(this.password.toString(), password.toString());
  }
};
