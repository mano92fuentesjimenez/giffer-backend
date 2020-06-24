const { verify } = require('../helpers/JWTMethods');
const { Users } = require('../models');

const checkAuthenticated = (throwIfNotAuthenticated = true) => async (ctx, next) => {
  const { query, body } = ctx.request;

  let token;

  if(query && query.token)
    token = query.token;
  if(body && body.token)
    token = body.token;

  if(!token) {
    if(throwIfNotAuthenticated)
      return ctx.throw(401, 'Unauthorized');
    return next();
  }

  const user = await verify(token).catch(() => {
    if(throwIfNotAuthenticated)
      return ctx.throw(401, 'Unauthorized');
    return next();
  });
  ctx.state.user = await Users.findById(user.id);
  return next();
}

module.exports = checkAuthenticated;