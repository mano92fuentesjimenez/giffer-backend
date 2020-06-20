const logger = require('../lib/getLogger');

module.exports = (ctx, next) => {

  logger.log(`404: Not found: ${ctx.request.url}`);
  next();
}