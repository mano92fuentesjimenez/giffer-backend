
module.exports = function applyIndexes(userSchem) {
  userSchem.index({ email: 1, name: 1 });
};
