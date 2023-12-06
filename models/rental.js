// const Joi = require('joi');
// const mongoose = require('mongoose');

// const Rental = mongoose.model('Rental', new mongoose.Schema({
//   customer: { 
//     type: new mongoose.Schema({
//       name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//       },
//       isGold: {
//         type: Boolean,
//         default: false
//       },
//       phone: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//       }      
//     }),  
//     required: true
//   },
//   movie: {
//     type: new mongoose.Schema({
//       title: {
//         type: String,
//         required: true,
//         trim: true, 
//         minlength: 5,
//         maxlength: 255
//       },
//       dailyRentalRate: { 
//         type: Number, 
//         required: true,
//         min: 0,
//         max: 255
//       }   
//     }),
//     required: true
//   },
//   dateOut: { 
//     type: Date, 
//     required: true,
//     default: Date.now
//   },
//   dateReturned: { 
//     type: Date
//   },
//   rentalFee: { 
//     type: Number, 
//     min: 0
//   }
// }));

// function validateRental(rental) {
//   const schema = {
//     customerId: Joi.objectId().required(),
//     movieId: Joi.objectId().required()
//   };

//   return Joi.validate(rental, schema);
// }

// exports.Rental = Rental; 
// exports.validate = validateRental;

const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// Disable automatic index creation
customerSchema.set('autoIndex', false);

// Manually create indexes
customerSchema.index({ phone: 1 }, { unique: true });

const Customer = mongoose.model('Customer', customerSchema);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

// Disable automatic index creation
movieSchema.set('autoIndex', false);

// Manually create indexes
movieSchema.index({ title: 1 }, { unique: true });

const Movie = mongoose.model('Movie', movieSchema);

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true
  },
  movie: {
    type: movieSchema,
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

// Disable automatic index creation
rentalSchema.set('autoIndex', false);

// Manually create indexes
rentalSchema.index({ customer: 1, movie: 1, dateOut: 1 }, { unique: true });

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
