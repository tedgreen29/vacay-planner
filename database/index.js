const Sequelize = require('sequelize');

const testRests = require('../sample_data/sample_restaurants.js');
const testEvents = require('../sample_data/sample_events.js');

if (process.env.DATABASE_URL !== undefined) {
  var db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging:  true
  })

} else {
  var db = new Sequelize('vacay_planner', 'vacay', 'planner', {
    host: 'localhost',
    dialect: 'postgres'
  })
}

// Check for db connection

db
  .authenticate()
  .then(() => {
    console.log('Connected to vacay-planner');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// The following 4 functions create the
// Database Table Schemas

const User = db.define('users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  email: {type: Sequelize.STRING, unique: true},
  password: {type: Sequelize.STRING, allowNull: false}/*,
  salt: {type: Sequelize.STRING, allowNull: false}*/
});

const Trip = db.define('trips', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
  tripName: {type: Sequelize.STRING, allowNull: false}
})

const Restaurant = db.define('restaurants', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: {type: Sequelize.STRING, allowNull: false},
  yelpURL: {type: Sequelize.STRING, allowNull: false},
  review_count: {type: Sequelize.INTEGER, allowNull: false},
  rating: {type: Sequelize.INTEGER, allowNull: false},
  price: {type: Sequelize.STRING},
  restLong: Sequelize.FLOAT,
  restLat: Sequelize.FLOAT,
  categories: Sequelize.JSON,
  image_url: Sequelize.STRING,
  display_address: Sequelize.JSON
})

const Event = db.define('event', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: {type: Sequelize.STRING, allowNull: false},
  eventURL: {type: Sequelize.STRING},
  eventImg: Sequelize.STRING,
  start_date: Sequelize.DATE,
  venueName: {type: Sequelize.STRING/*, allowNull: false*/},
  venueLong: Sequelize.FLOAT,
  venueLat: Sequelize.FLOAT,
  venueAddress: Sequelize.STRING
});


// This sets up Associations between different tables/models,
// and gives us nifty helper functions; like setters and getters.

User.hasMany(Trip, {
  foreignKey: {
    allowNull: false
  }
});

Trip.belongsTo(User, {
  allowNull: false
});

Trip.hasMany(Restaurant, {
  foreignKey: {
    allowNull: false
  }
});

Restaurant.belongsTo(Trip);

Trip.hasMany(Event, {
  foreignKey: {
    allowNull: false
  }
});

Event.belongsTo(Trip);

// This long promise chain is required to make sure
// that all of the associations are setup properly.

User.sync().then(() => Trip.sync().then(() => Restaurant.sync().then(() => Event.sync())));

// These are all of the functions that are
// being exported to the server file.

var dbHelpers = {

  // This function adds a new user if one is passed as an object
  // and is
  addUser: (obj) => {
    User.findOne({email: obj.email}).then(user => {
      if (user === null || user === []) {
        User.create({
          email: obj.email,
          password: obj.password
        })
      } else {
        console.log(`User with email ${obj.email} already exists`);
      }
    });
  },

  // This will find a user and pass it to a callback,
  // which is needed for authentication to work
  findUser: (obj, cb) => {
    User.findOne({email: obj.email}).then(user => cb(user))
  },

  // This will find a given user's Trips
  // and all associated Events & Restaurants
  // and then pass that whole thing
  // to a callback
  getUserTrips: (obj, cb) => {
    var output = [];

    User.findOne({where: {email: obj.email}})
    .then( user => {

      //find all user Trips
      user.getTrips().then(userTrips => {

        //for each trip, create an output object
        userTrips.forEach(userTrip => {
          var counter = 0;
          var small = {
            trip: userTrip,
            events: [],
            restaurants: []
          }

          //then find all events and add to output object
          userTrip.getEvents()
          .then( tripEvents => small.events = tripEvents).then( () => {
            userTrip.getRestaurants()
            .then( tripRestaurants => small.restaurants = tripRestaurants)
              .then(() => output.push(small)).then( () => {
                counter += 1;
                if (counter === userTrips.length) {
                  cb(output);
                }
              })
          })
        })
      })
    })
  },

  // This will create a new Trip
  // and save all associated Events
  // & Restaurants to the Database
  newTrip: (obj) => {

    User.findOne({where: obj.user}).then(user => {


      //create the Trip
      user.createTrip({
        start_date: obj.trip.startDate,
        end_date: obj.trip.end_date,
        name: obj.trip.name
      }).then(trip => {

        //create the Events
        obj.eventList.forEach(event => {
          var tempEvent = Event.define({
            name: event.name,
            eventURL: event.url,
            eventImg: event.images[0].url,
            start_date: event.dates.start.dateTime,
            venueName: event._embedded.venues[0].name,
            venueLong: event._embedded.venues[0].location.longitude,
            venueLat: event._embedded.venues[0].location.latitude,
            venueAddress: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode} ${event._embedded.venues[0].postalCode}`
          })

          tempEvent.setTrip(trip, {save: false});
          tempEvent.save();
        })

        //create the Restaurants
        obj.restaurantList.forEach(restaurant => {
          var tempRest = Restaurant.define({
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
          })
          tempRest.setTrip(trip, {save: false});
          tempRest.save();
        })
      })
    })
  },

  //////////////////////////////////////////////////////////
  //                 Test data use Only                   //
  //////////////////////////////////////////////////////////

  createDummyData: () => {
    //create test user
    var testUser = User.build({
      email: 'ted.green@test.com',
      password: 'abc123'
    });

    //save test user
    testUser.save().then(user => {

      //create test trip
      var testTrip = Trip.build({
          tripName: 'Cool Runnings',
          start_date: new Date(),
          end_date: new Date()
      });

      //associate with user
      testTrip.setUser(user, {save: false});

      // testTrip.getUser().then(user => console.log(user));

      //& save test Trip
      testTrip.save().then(trip => {

        testEvents.forEach(event => {

          //create test Events
          var trueEvent = Event.build({
            name: event.name,
            eventURL: event.url,
            eventImg: event.images[0].url,
            start_date: event.dates.start.dateTime,
            venueName: event._embedded.venues[0].name,
            venueLong: event._embedded.venues[0].location.longitude,
            venueLat: event._embedded.venues[0].location.latitude,
            venueAddress: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode} ${event._embedded.venues[0].postalCode}`
          })

          //associate with trip
          trueEvent.setTrip(trip, {save: false});

          //save test events
          trueEvent.save();
        });

        testRests.forEach(restaurant => {

          //create test restaurants
          var trueRest = Restaurant.build({
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
          })

          //associate with trip
          trueRest.setTrip(trip, {save: false});

          //save test restaurants
          trueRest.save();
        });
      });
    });
  },


  //////////////////////////////////////////////////////////
  //                       End                            //
  //////////////////////////////////////////////////////////

  // This function clears the contents of the Tables within
  // the Database without removing the schemas
  clearTables: () => {
    Event.findAll().then(events => events.forEach(event => event.destroy()));
    Restaurant.findAll().then(restaurants => restaurants.forEach(restaurant => restaurant.destroy()));
    Trip.findAll().then(trips => trips.forEach(trip => trip.destroy()));
    User.findAll().then(users => users.forEach(user => user.destroy()));
  },

  // This function Drops all tables. If used, server needs
  // to be restarted to recreate the database tables again
  dropTables: () => {
    return db.drop();
  }
}

module.exports = dbHelpers;
