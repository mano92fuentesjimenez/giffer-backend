const router = require('koa-joi-router')();
const publicRoutes = require('./public');
const auth = require('./authorization');


const publicRouter = router.route(publicRoutes);

const authorizationRouter = router.route(auth);

module.exports = [
  publicRouter.middleware(),
  authorizationRouter.middleware(),
];

