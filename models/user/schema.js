const Schema = require('mongoose').Schema;
const { contentRating, languages } = require('./constants')

module.exports = new Schema({
  name: { type: String, required: true },
  email: { type: String, validate: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  contentRating: { type: String, default: 'g', enum: [...contentRating] },
  language: { type: String, default: 'en', enum: [...languages] },
  favoriteGifs: [{ type: String }],
});
