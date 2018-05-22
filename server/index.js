const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database');
const tm = require('../tm/tm.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../client/media'));
app.get('/', (req, res) => {

});

app.post('/', (req, res) => {

});

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

//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
