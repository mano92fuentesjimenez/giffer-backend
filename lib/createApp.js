const koa = require('koa');
const routes = require('../routes');
const _ = require('lodash');
const cors = require('@koa/cors');
//create databases connections
require('../models');

function createApp() {
  const app = new koa();

  app.use(cors({ origin: '*' }));
  _.forEach(routes, route => app.use(route));


  return app;
}

module.exports = createApp;
