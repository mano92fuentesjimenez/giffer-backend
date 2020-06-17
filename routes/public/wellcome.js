module.exports = {
  path: '/',
  method: 'get',
  handler: async function (ctx, next) {
    ctx.body = 'Hello';
    next();
  }
};
