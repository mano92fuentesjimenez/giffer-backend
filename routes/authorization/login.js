const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');

module.exports = {
  path: '/log-in',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
  handler: async function (ctx) {
    const { name, password, email } = ctx.request.body;

    const [userByName, userByEmail] = await Promise.all([
      Users.findOne({ name }),
      Users.findOne({ email: name }),
    ])
    const user = userByName || userByEmail;
    ctx.assert(user, 404, "User not found");

    const samePassword = await user.checkPassword(password);
    ctx.assert(samePassword, 403, "Incorrect password supplied");

    ctx.body = await sign(user);
    ctx.status = 200;
  }
};
