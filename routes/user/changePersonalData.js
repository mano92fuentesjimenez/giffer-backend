const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const lodash = require('lodash');
const Joi = require('koa-joi-router').Joi;
const { Users } = require('../../models');
const { sign } = require('../../helpers/JWTMethods');
const { hash } = require('../../helpers/bcryptMethods');

module.exports = {
  path: '/user',
  method: 'put',
  validate: {
    type: 'json',
    body: {
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      token: Joi.string().required(),
    }
  },
  handler: [
    checkAuthenticated,
    async function (ctx) {
      const changes = {
        ...lodash.omit(ctx.request.body, ['token']),
      };
      const { id } = ctx.state.user;
      const userDoc = await Users.findById(id);

      if (changes.password)
        changes.password = await hash(changes.password);

      await userDoc.update(changes);
      ctx.body = await sign(
        await Users.findById(id),
      );
    }
  ]
};
