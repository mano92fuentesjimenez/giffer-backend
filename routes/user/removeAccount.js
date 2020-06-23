const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');

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
    checkAuthenticated,
    async function (ctx) {
      const { id } = ctx.state.user;
      const userDoc = await Users.findById(id);

      await userDoc.remove()
      ctx.status = 200;
    }
  ]
};
