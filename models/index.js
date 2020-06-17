const mongoose = require('mongoose');
const config = require('config');
const logger = require('../lib/getLogger');

const uri = config.get('mongoose.uri');

mongoose.connect(uri);

mongoose.connection.on('error', (err) => { logger.error(err) });
mongoose.connection.once('open', ()=> { logger.log('Connection with mongoDB established') });

module.exports = {
  Users: mongoose.model('User', require('./user')),
};


