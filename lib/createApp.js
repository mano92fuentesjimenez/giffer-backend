const koa = require('koa');
const routes = require('../routes');
const _ = require('lodash');
//create databases connections
require('../models');

function createApp() {
  const app = new koa();

  _.forEach(routes, route => app.use(route));

  return app;
}

module.exports = createApp;
