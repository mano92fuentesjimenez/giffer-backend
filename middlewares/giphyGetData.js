const config = require('config');
const request = require('superagent');

const apikey = config.get('giphy.apiKey');
const giphyBasePath = config.get('giphy.basePath');
const mockResponse = require('./giffyResponseMock.json');

module.exports = (path) => async (ctx, next) => {
  // const { query } = ctx.request;
  // let contentRating;
  //
  // if(ctx.state.user)
  //   contentRating = ctx.state.user.contentRating;
  //
  // const { body } = await request.get(`${giphyBasePath}${path}`)
  //   .query({ ...query, api_key: apikey, rating: contentRating || 'g' });
  //
  // ctx.state.giphyResultData = body;
  // return next();

  ctx.state.giphyResultData = mockResponse;
  return next();
}