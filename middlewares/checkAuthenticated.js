const logger = require('../lib/getLogger');
const { verify } = require('../helpers/JWTMethods');

const checkAuthenticated = async (ctx, next) => {
  const { token } = ctx.request.body;
  ctx.state.user = await verify(token).catch((e) => {
    logger.log(e);

    ctx.throw(401, 'Unauthorized');
  });
  return next();
}

module.exports = checkAuthenticated;