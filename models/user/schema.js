const Schema = require('mongoose').Schema;

module.exports = new Schema({
  name: { type: String, required: true },
  email: { type: String, validate: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
});
