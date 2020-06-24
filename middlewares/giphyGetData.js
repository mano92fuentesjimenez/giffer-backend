const config = require('config');
const request = require('superagent');

const apikey = config.get('giphy.apiKey');
const giphyBasePath = config.get('giphy.basePath');
// const mockResponse = require('./giffyResponseMock.json');

module.exports = (path) => async (ctx, next) => {
  const { query } = ctx.request;
  let contentRating,
      language,
      favoriteGifs = [];

  if(ctx.state.user) {
    contentRating = ctx.state.user.contentRating;
    language = ctx.state.user.language;
    favoriteGifs = ctx.state.user.favoriteGifs;
  }

  const { body } = await request.get(`${giphyBasePath}${path}`)
    .query({
      ...query,
      api_key: apikey,
      rating: contentRating || 'g',
      lang: language || 'en'
    });

  if(favoriteGifs)
    body.data.forEach(gif => gif.isFavorite = favoriteGifs.includes(gif.id));

  ctx.state.giphyResultData = body;
  return next();

  // ctx.state.giphyResultData = mockResponse;
  // return next();
}