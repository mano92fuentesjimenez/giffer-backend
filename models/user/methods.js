
module.exports = function applyMethods(userSchema){
  userSchema.methods.checkPassword = function (password) {
    return this.password.toString() === password.toString();
  }
};
