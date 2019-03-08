'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var today = new Date();
//var tomorrow = new Date();

var TokenSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now(),
    expires: 43200
  }
});

module.exports = mongoose.model('Tokens', TokenSchema);



