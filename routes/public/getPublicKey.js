const keys = require('../../helpers/keys');

module.exports = {
  path: '/getPublicKey',
  method: 'get',
  handler: async function (ctx, next) {
    const { publicKey } = await keys;
    ctx.body = publicKey;
    next();
  }
};
