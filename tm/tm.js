const request = require('request-promise');
const key = require('./tm.config.js');

const tm = (options, cb) => {
  console.log(options)
  request.get({
    method: 'GET',
    uri: 'https://app.ticketmaster.com/discovery/v2/events.json',
    qs: {
      startDateTime: options.startDate,
      endDateTime: options.endDate,
      city: options.city,
      stateCode: options.stateCode,
      size: options.size,
      apikey: key
    },
    json: true
  })
  .then((data) => cb(data._embedded.events[0]))
  .catch((xhr, status, err) => console.log(err))
};

module.exports = tm;