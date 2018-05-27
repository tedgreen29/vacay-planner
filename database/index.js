const Sequelize = require('sequelize');
const db = new Sequelize('vacay_planner', 'vacay', 'planner', {
  host: 'localhost',
  dialect: 'postgres'
})

const testRests = require('../sample_data/sample_restaurants.js');
const testEvents = require('../sample_data/sample_events.js');

//Check for db connection;
db
  .authenticate()
  .then(() => {
    console.log('Connected to vacay-planner');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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
  tripName: {type: Sequelize.STRING/*, allowNull: false*/}
})

const Restaurant = db.define('restaurants', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: {type: Sequelize.STRING, allowNull: false},
  yelpURL: {type: Sequelize.STRING, allowNull: false},
  review_count: {type: Sequelize.INTEGER, allowNull: false},
  rating: {type: Sequelize.INTEGER, allowNull: false},
  price: {type: Sequelize.STRING, allowNull: false},
  restLong: Sequelize.FLOAT,
  restLat: Sequelize.FLOAT,
  categories: Sequelize.JSON
})

const Event = db.define('event', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: {type: Sequelize.STRING, allowNull: false},
  eventURL: {type: Sequelize.STRING, allowNull: false},
  start_date: Sequelize.DATE,
  venueName: {type: Sequelize.STRING/*, allowNull: false*/},
  venueLong: Sequelize.FLOAT,
  VenueLat: Sequelize.FLOAT
});

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

//This long promise chain is required to make sure that all of the associations are setup properly.
User.sync().then(() => Trip.sync().then(() => Restaurant.sync().then(() => Event.sync())));

var dbHelpers = {
  addUser: (obj) => {
    User.findOne({email: user.email}).then((user) => {
      if (user === null) {
        User.create({
          email: obj.email,
          password: obj.password
        })
      } else {
        console.log(`User with email ${obj.email} already exists`);
      }
    });
  },

  findUser: (obj) => {
    User.findOne({email: obj.email})
  },

  getUserTrips: (user) => {

  },

  newTrip: (obj) => {
    //create the Trip
    Trip.create({
      start_date: obj.startDate,
      end_date: obj.end_date,
      name: obj.name
    }).then(trip => {
      //create the Events
      obj.eventList.forEach(event => {
        var tempEvent = Event.define({
          name: event.name,
          eventURL: event.url,
          start_date: event.dates.start.dateTime,
          venueName: event.venues[0].name,
          venueLong: event.venues[0].location.longitude,
          VenueLat: event.venues[0].location.latitude
        })

        tempEvent.setTrip(trip);
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
          categories: restaurant.categories
        })
        tempRest.setTrip(trip);
        tempRest.save();
      })
    })
  },

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
      testTrip.setUser(user);

      // testTrip.getUser().then(user => console.log(user));

      //& save test Trip
      testTrip.save().then(trip => {

        testEvents.forEach(event => {

          //create test Events
          var trueEvent = Event.build({
            name: event.name,
            eventURL: event.url,
            start_date: event.dates.start.dateTime,
            venueName: event._embedded.venues[0].name,
            venueLong: event._embedded.venues[0].location.longitude,
            VenueLat: event._embedded.venues[0].location.latitude
          })

          //associate with trip
          trueEvent.setTrip(trip);

          //save test events
          trueEvent.save();
        });

        testRests.forEach(restaurant => {

          //create test restaurants
          var trueRest = Event.build({
            name: restaurant.name,
            yelpURL: restaurant.url,
            review_count: restaurant.review_count,
            rating: restaurant.rating,
            price: restaurant.price,
            restLong: restaurant.coordinates.longitude,
            restLat: restaurant.coordinates.latitude,
            categories: restaurant.categories
          })

          //associate with trip
          trueRest.setTrip(trip);

          //save test restaurants
          trueRest.save();
        });



      });
    });
  }
}

module.exports = dbHelpers;
