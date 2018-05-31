const express = require('express');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const bcrypt = require('bcrypt-nodejs')


const db = require('../database');
const tm = require('../helpers/tm');
const yelp = require('../helpers/yelp');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: 'thisthingissupersecretandunguessable', // should be a large unguessable string
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: {
    // path: '/api', // cookie will only be sent to requests under '/api'
    maxAge: 60 * 60 * 1000, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false
  }
}));

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
  if (req.session.email !== null) {
    db.getUserTrips({email: req.session.email}, (obj) => res.status(200).end(JSON.stringify(obj)))
  } else {
    console.log('must be logged in to get trips')
  }
});

app.get('/trips/:id', (req, res) => {
  db.getTripItems(req.params.id, (obj) => res.status(200).end(JSON.stringify(obj)));
});

app.post('/trips', (req, res) => {

  /*
    sampleObject = {
      trip: {
        startDate: date,
        endDate: date,
        name: string
      },
      eventList: [
        {ticketmaster event},
        {ticketmaster event},
        ...
      ],
      restaurantList: [
        {yelp restaurant},
        {yelp restaurant},
        ...
      ]
    }
  */
  if (req.session.email){
    // db.newTrip(req.session.email, obj)
    // res.status(200).end('successfully added trip')

    db.newTrip(req.body)
    res.status(200).end('successfully added trip')


  }
})

app.post('/login', (req, res) => {
  let email = req.body.email;
  let enteredPassword = req.body.email;

  db.findUser(req.body, found => {
    if (found) {
      let salt = found.dataValues.salt;
      bcrypt.hash(enteredPassword, salt, null, (err, encryptedPass) => {
        if (found.dataValues.password === encryptedPass) {
          req.session.user = found.dataValues.email;
          delete req.session.password;
          res.send(found.dataValues.email)
        } else {
          res.status(500).send('incorrect password').redirect('signup');
        }
      })
    } else {
      console.log('User Doesn\'t Exist');
    }
  })
})

app.post('/signup', (req, res) => {
  let email = req.body.email;
  let enteredPassword = req.body.email;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(enteredPassword, salt, null, (err, hashedPass) => {
      db.addUser({
        email: req.body.email,
        password: hashedPass,
        salt: salt
      }, (addedUser, err) => {
        if (addedUser) {
          req.session.user = found.dataValues.email;
          delete req.session.password;
          res.end(addedUser)
        } else if (err) {
          res.status(500).end('User already exists');
        }
      })
    })
  })
})

app.post('/logout', (req, res) => {
  req.session.reset();
})

app.listen(process.env.PORT !== undefined ? process.env.PORT : PORT, () => {
  console.log(`listening on port ${PORT}`);
});
