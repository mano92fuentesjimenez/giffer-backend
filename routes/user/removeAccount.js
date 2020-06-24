const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const Joi = require('koa-joi-router').Joi;

module.exports = {
  path: '/user/remove',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      token: Joi.string().required(),
    }
  },
  handler: [
    checkAuthenticated(true),
    async function (ctx) {
      const userDoc = ctx.state.user;

      await userDoc.remove()
      ctx.status = 200;
    }
  ]
};
