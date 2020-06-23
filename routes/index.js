const router = require('koa-joi-router')();
const publicRoutes = require('./public');
const auth = require('./authorization');
const user = require('./user');


const publicRouter = router.route(publicRoutes);
const authorizationRouter = router.route(auth);
const userRouter = router.route(user);

module.exports = [
  publicRouter.middleware(),
  authorizationRouter.middleware(),
  userRouter.middleware(),
];

