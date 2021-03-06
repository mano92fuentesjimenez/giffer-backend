const Joi = require('koa-joi-router').Joi;
const giphyGetData = require('../../middlewares/giphyGetData');
const checkAuthenticated = require('../../middlewares/checkAuthenticated');

const path = '/gifs/trending';

module.exports = {
  path,
  method: 'get',
  validate: {
    query: {
      offset: Joi.number().required(),
      limit: Joi.number().required(),
      token: Joi.string(),
    }
  },
  handler: [
    checkAuthenticated(false),
    giphyGetData(path),
    function (ctx) {
      ctx.body = ctx.state.giphyResultData;
    }
  ]
};
