const checkAuthenticated = require('../../middlewares/checkAuthenticated');
const Joi = require('koa-joi-router').Joi;

module.exports = {
  path: '/gifs/toggleFavoriteGif',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      gifId: Joi.string().required(),
      token: Joi.string().required(),
    }
  },
  handler: [
    checkAuthenticated(true),
    async function (ctx) {
      const userDoc = ctx.state.user;
      const { gifId } = ctx.request.body;

      const { favoriteGifs } = userDoc;
      const isFavorite = favoriteGifs.find(favoriteGif => favoriteGif === gifId);

      let favorites;
      if(isFavorite)
        favorites = favoriteGifs.filter(favoriteGif => favoriteGif !== gifId);
      else
        favorites = favoriteGifs.concat(gifId);

      userDoc.set('favoriteGifs', favorites);
      await userDoc.save();

      ctx.status = 200;
    }
  ]
};
