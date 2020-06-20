const Joi = require('koa-joi-router').Joi;
const giphyRequest = require('../../helpers/giphyRequest');

const path = '/gifs/trending';

module.exports = {
  path,
  method: 'get',
  validate: {
    query: {
      offset: Joi.number().required(),
      limit: Joi.number().required(),
    }
  },
  handler: async function (ctx, next) {
    const { query } = ctx.request;

    ctx.body = await giphyRequest(path, query);
    ctx.status = 200;
    next()
  }
};
