'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema ({
  name: {
    type: String,
    required: 'Please insert name of food'
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  photos: {
    type: Array
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Foods', FoodSchema);
