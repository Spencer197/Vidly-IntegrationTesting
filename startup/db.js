// const winston = require('winston');
// const mongoose = require('mongoose');
// const config = require('config');

// module.exports = function() {
//   const db = config.get('db');//Dynamically read DB connection string as per running environment
//   mongoose.connect(db)//Dynamically connects to DB connection string
//     .then(() => winston.info(`Connected to ${db}...`));//`Template string` dynamically displays DB connection string 
// }

const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');// Dynamically read DB connection string as per running environment

  mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })// Add MongoDB connection options
    .then(() => winston.info(`Connected to ${db}...`))// Template string dynamically displays DB connection string
    .catch((error) => winston.error('Error connecting to MongoDB:', error)); // Handle connection errors
}
