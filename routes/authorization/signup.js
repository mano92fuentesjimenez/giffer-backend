const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');
const { hash } = require('../../helpers/bcryptMethods');

module.exports = {
  path: '/sign-up',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  },
  handler: async function (ctx) {
    const { name, email, password } = ctx.request.body;

    const [userName, userFromEmail] = await Promise.all([
      Users.findOne({ name }),
      Users.findOne({ email })
    ]) ;

    ctx.assert(!userName, 409, "User already exists");
    ctx.assert(!userFromEmail, 409, "Email already taken");

    const hashedPassword = await hash(password);

    const signedUser = await Users.create({
      ...ctx.request.body,
      password: hashedPassword,
    });

    ctx.body = await sign(signedUser);
    ctx.status = 201;
  }
};
