const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');

module.exports = {
  path: '/sign-up',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email(),
    }
  },
  handler: async function (ctx) {
    const { name } = ctx.request.body;

    const user = await Users.findOne({ name });
    ctx.assert(!user, 409, "User already exists");
    const signedUser = await Users.create({ ...ctx.request.body});

    ctx.body = await sign(signedUser);
    ctx.status = 201;
  }
};
