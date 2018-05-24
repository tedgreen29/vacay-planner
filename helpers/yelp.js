// const config = require('../config.js');
const request = require('request');

// const key = config.YELP_KEY

module.exports = {
  getRestaurants: (location, callback) => {
    // location = 'san francisco'
    const encodedURI = encodeURI(`https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}`)
    const authStr = 'Bearer '.concat(key);
    console.log(encodedURI)
    const options = {
      url: encodedURI,
      headers: { Authorization: authStr }
    };
    request.get(options, (err, res, body) => {
      err ? console.log('err') : callback(body);
    })
  }
}
