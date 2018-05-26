const Sequelize = require('sequelize');
const db = new Sequelize('vacay_planner', 'vacay', 'planner', {
  host: 'localhost',
  dialect: 'postgres'
})

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
  password: Sequelize.STRING
});

const Trip = db.define('trips', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
  tripName: Sequelize.STRING
})

const Restaurant = db.define('restaurants', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  yelpURL: Sequelize.STRING,
  review_count: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  price: Sequelize.STRING,
  restLong: Sequelize.FLOAT,
  restLat: Sequelize.FLOAT
})

const Event = db.define('event', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  eventURL: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  venueName: Sequelize.STRING,
  venueLong: Sequelize.FLOAT,
  VenueLat: Sequelize.FLOAT
});

User.hasMany(Trip, {
  foreignKey: {
    allowNull: false
  }
});

Trip.belongsTo(User, {
  foreignKey: 'userID'
});

Trip.hasMany(Restaurant, {
  foreignKey: {
    name: 'tripID',
    allowNull: false
  }
});

Restaurant.belongsTo(Trip);

Trip.hasMany(Event, {
  foreignKey: {
    name: 'tripID',
    allowNull: false
  }
});

Event.belongsTo(Trip);



var dbHelpers = {
  addUser: (obj) => {

  },

  findUser: (user) => {

  },

  getUserTrips: (user) => {

  },

  newTrip: (eventList, restaurantList) => {

  },

  newRestaurant: (restaurant) => {

  },

  newEvent: (event) => {

  }
}

module.exports = dbHelpers;
