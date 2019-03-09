'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
  name: {
    type: String,
    required: 'Please insert name of food'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Categories', CategorySchema);

