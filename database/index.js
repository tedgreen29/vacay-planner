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

// const User = db.define()

module.exports = db;