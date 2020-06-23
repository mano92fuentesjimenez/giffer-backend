const { verify } = require('../helpers/JWTMethods');

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

  ctx.state.user = await verify(token).catch(() => {
    if(throwIfNotAuthenticated)
      return ctx.throw(401, 'Unauthorized');
    return next();
  });
  return next();
}

module.exports = checkAuthenticated;