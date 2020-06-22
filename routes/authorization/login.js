const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');

module.exports = {
  path: '/log-in',
  method: 'get',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
  handler: async function (ctx) {
    const { name, password } = ctx.request.body;

    const user = await Users.findOne({ name });
    const samePassword = await user.checkPassword(password);

    ctx.assert(user, 404, "User not found");
    ctx.assert(samePassword, 403, "Incorrect password supplied");

    ctx.body = await sign(user);
    ctx.status = 200;
  }
};
