'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema ({
  user_id: {
    type: String,
    required: true
  },
  orders: {
    type: Array,
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Orders', OrderSchema);
