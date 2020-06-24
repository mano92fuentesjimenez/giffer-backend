Backend project for Giffer

Current Features:
 * Internationalization using the GiphyApi
 * User logging and user configurations
 * Change user data and user credentials
 * Search gifs with a string
 * Search latest trending gifs
 * Filter all gifs search endpoints by using content rating
 * Select a set of gifs as favorites
 * Filter gifs by favorite
 * Authentication using jsonwebtoken's sign, verify methods using a RSA encryption algorithm
 * Store user password using bcrypt hash method.

Project structure:
   * config -- Contains the configuration for each environment
   * helpers -- Useful helpers  for all the app
   * constants -- Constants useful for all the app
   * lib -- Object creators the app like createApp and createLogger
   * middlewares -- Useful middlewares reusable in all the app
   * models -- contains the mongoose model definitions as schema, indexes and methods for documents
   * routes -- contains all the routes of the project
 
For used technologies: Please see package.json

For run, just do ```yarn``` and later ```yarn start```

If run with ```yarn start```, it needs a mongodb instance running on port 27017, if you need to change how is connected to mongodb you can rewrite /config/default.json , the configuration for mongodb connection is gotten from there
 
