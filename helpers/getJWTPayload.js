module.exports = function(user){
  return { ...user.sanitize() };
};
