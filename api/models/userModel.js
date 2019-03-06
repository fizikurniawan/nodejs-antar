'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique:true,
    lowercase: true,
    trim: true,
    required: true,
    dropDups: true
  },
  hash_password: {
    type: String,
    required: true,
    select: false
  },
  is_active: {
    type: Number,
    required: true,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  }

});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Users', UserSchema);
