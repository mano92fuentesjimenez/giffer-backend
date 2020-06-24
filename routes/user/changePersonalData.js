const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const lodash = require('lodash');
const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');
const { hash } = require('../../helpers/bcryptMethods');
const { contentRating, languages } = require('../../models/user/constants');

module.exports = {
  path: '/user',
  method: 'put',
  validate: {
    type: 'json',
    body: {
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      contentRating: Joi.string().valid(...contentRating),
      language: Joi.string().valid(...languages),
      token: Joi.string().required(),
    }
  },
  handler: [
    checkAuthenticated(true),
    async function (ctx) {
      const changes = {
        ...lodash.omit(ctx.request.body, ['token']),
      };
      const userDoc = ctx.state.user;

      if (changes.password)
        changes.password = await hash(changes.password);

      if (changes.name) {
        const userFromName = await Users.findOne({ name: changes.name });
        ctx.assert(!userFromName, 409, "User already exists");
      }

      if (changes.email) {
        const userFromEmail = await Users.findOne({ email: changes.email });
        ctx.assert(!userFromEmail, 409, "Email already taken");
      }

      await userDoc.update(changes);
      ctx.body = await sign(
        await Users.findById(userDoc.id),
      );
    }
  ]
};
