const config = require('config');
const request = require('superagent');
const { SEARCH_TYPES, EMPTY_RESPONSE } = require('../constants');
const apikey = config.get('giphy.apiKey');
const giphyBasePath = config.get('giphy.basePath');

module.exports = (path, type) => async (ctx, next) => {
  const { query } = ctx.request;
  let contentRating,
      language,
      favoriteGifs = [];

  if(ctx.state.user) {
    contentRating = ctx.state.user.contentRating;
    language = ctx.state.user.language;
    favoriteGifs = ctx.state.user.favoriteGifs;
  }

  let body;

  if(type === SEARCH_TYPES.FAVORITES){
    if(favoriteGifs.length === 0)
      body = EMPTY_RESPONSE;
    else {
      const response = await request.get(`${giphyBasePath}/gifs`)
        .query({
          api_key: apikey,
          ids: favoriteGifs.join(','),
        });
      body = response.body;
    }
  }
  else {
    const response = await request.get(`${giphyBasePath}${path}`)
      .query({
        ...query,
        api_key: apikey,
        rating: contentRating || 'g',
        lang: language || 'en'
      });
    body = response.body;
  }

  if(favoriteGifs)
    body.data.forEach(gif => gif.isFavorite = favoriteGifs.includes(gif.id));

  ctx.state.giphyResultData = body;
  return next();
}