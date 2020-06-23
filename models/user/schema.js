const Schema = require('mongoose').Schema;
const { contentRating } = require('./constants')

module.exports = new Schema({
  name: { type: String, required: true },
  email: { type: String, validate: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  contentRating: { type: String, default: 'g', enum: contentRating },
});
