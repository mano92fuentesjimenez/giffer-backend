const router = require('koa-joi-router')();
const publicRoutes = require('./public');
const auth = require('./authorization');
const user = require('./user');
const gifs = require('./gifs');


const publicRouter = router.route(publicRoutes);
const authorizationRouter = router.route(auth);
const userRouter = router.route(user);
const gifsRouter = router.route(gifs);

module.exports = [
  publicRouter.middleware(),
  authorizationRouter.middleware(),
  userRouter.middleware(),
  gifsRouter.middleware(),
];

