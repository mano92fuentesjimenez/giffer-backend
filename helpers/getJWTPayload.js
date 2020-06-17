module.exports = function(user){
  return { ...user.toJSON() };
};
