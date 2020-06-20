const config = require('config');
const request = require('superagent');

const apikey = config.get('giphy.apiKey');
const giphyBasePath = config.get('giphy.basePath');
const mockResponse = require('./giffyResponseMock.json');

module.exports = async (path, query) => {
  // const d = await request.get(`${giphyBasePath}/gifs/trending`)
  //   .query({ ...query, api_key: apikey });
  //
  // return d.body;

  return Promise.resolve(mockResponse);
}