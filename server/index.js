const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database');
const tm = require('../helpers/tm');
const yelp = require('../helpers/yelp');

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

/////////////////////////////////////////////////////////////////////
//              These functions are to setup Test Data             //
/////////////////////////////////////////////////////////////////////

app.get('/filltestdata', (req, res) => {
  db.createDummyData();
  res.status(200).end('Created Data')
})

app.get('/cleardb', (req, res) => {
  db.clearTables();
  res.status(200).end('Tables clear, but still exist')
})

app.get('/dropdb', (req, res) => {
  db.dropTables();
  res.status(200).end('Tables deleted, restart server to recreate')
})

/////////////////////////////////////////////////////////////////////
//                            End                                  //
/////////////////////////////////////////////////////////////////////


// Get events from Ticketmaster API
app.get('/events', (req, res) => {
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

// Get restaurants from Yelp API
app.get('/restaurants/:location', (req, res) => {
  console.log(req.params.location);
  yelp.getRestaurants(req.params.location, data => {
    parsedData = JSON.parse(data);
    // console.log('parsedData', parsedData);
    res.status(200).send((parsedData));
  }, req.params.location)
});

// Get saved trips from database for a registered user
app.get('/trips', (req, res) => {
  db.getUserTrips({email: 'ted.green@test.com'}, (obj) => res.status(200).end(JSON.stringify(obj)));
})

app.post('/trips', (req, res) => {

  /*
    sampleObject = {
      user: {email: something},
      trip: {
        start_date: date,
        end_date: date,
        name: string
      },
      eventList: [
        {
          name: event.name,
          eventURL: event.url,
          eventImg: event.images[0].url,
          start_date: event.dates.start.dateTime,
          venueName: event._embedded.venues[0].name,
          venueLong: event._embedded.venues[0].location.longitude,
          venueLat: event._embedded.venues[0].location.latitude,
          venueAddress: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode} ${event._embedded.venues[0].postalCode}`
        }
      ],
      restaurantList: [
        {
          name: restaurant.name,
            yelpURL: restaurant.url,
            review_count: restaurant.review_count,
            rating: restaurant.rating,
            price: restaurant.price,
            restLong: restaurant.coordinates.longitude,
            restLat: restaurant.coordinates.latitude,
            categories: restaurant.categories,
            display_address: restaurant.location.display_address,
            image_url: restaurant.image_url
        }
      ]
    }
  */

  db.newTrip(obj)
  res.status(200).end('successfully added trip')
})

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});
