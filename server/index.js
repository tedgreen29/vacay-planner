const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database');
const tm = require('../tm/tm.js');
const helper = require('../helpers/yelp');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const homePath = __dirname + '/../client/dist';
app.use(express.static(homePath));

app.use('/media', express.static(__dirname + '/../client/media'));

app.use('/foodandevents', express.static(homePath));
app.use('/login', express.static(homePath));
app.use('/signup', express.static(homePath));

app.get('/ticketmaster', (req, res) => {
  var testDate1 = new Date('30 May 2018 00:00 UTC').toISOString().split('.')[0]+'Z';
  var testDate2 = new Date('30 October 2018 00:00 UTC').toISOString().split('.')[0]+'Z';

  console.log(testDate1);
  console.log(testDate2);

  var test = {
    city: 'San Francisco',
    startDate: testDate1,
    endDate: testDate2,
    stateCode: 'CA',
    size: 10
  };

  tm(test, (stringified) => res.end(JSON.stringify(stringified)));


});

// Get restaurant list
app.get('/restaurants/:location', (req, res) => {
  console.log(req.params.location);
  helper.getRestaurants(req.params.location, data => {
    parsedData = JSON.parse(data);
    // console.log('parsedData', parsedData);
    res.status(200).send((data));
  }, req.params.location)
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
