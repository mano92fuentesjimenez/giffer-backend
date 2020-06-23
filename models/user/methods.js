const { compare } = require('../../helpers/bcryptMethods');

module.exports = function applyMethods(userSchema){
  userSchema.methods.checkPassword = function (password) {
    return compare(password.toString(), this.password.toString());
  }
  userSchema.methods.sanitize = function () {
    const user = this.toJSON();
    user.id = user._id;

    delete user._id;
    delete user.password;
    delete user.__v;
    delete user.iat;

    return user;
  }
};
