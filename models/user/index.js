const userSchema = require('./schema');
const methods = require('./methods');
const indexes = require('./indexes');

methods(userSchema);
indexes(userSchema);

module.exports = userSchema;
