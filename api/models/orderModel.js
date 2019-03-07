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
    required: true,
    validate: v => v == null || v.length > 0
  },
  status: {
    type: Number,
    default: 0
  },
  location:{
    type: Array,
    required: true,
    validate: v => v == null || v.length > 0
  },
  notes:{
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Orders', OrderSchema);
