const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const giphyGetData = require('../../middlewares/giphyGetData');
const Joi = require('koa-joi-router').Joi;
const { SEARCH_TYPES } = require('../../constants');

module.exports = {
  path: '/gifs/searchFavorite',
  method: 'get',
  validate: {
    query: {
      token: Joi.string().required(),
    }
  },
  handler: [
    checkAuthenticated(true),
    giphyGetData(null, SEARCH_TYPES.FAVORITES),
    async function (ctx) {
      ctx.body = ctx.state.giphyResultData;
    }
  ]
};
