'use strict';
var jwt = require('jsonwebtoken'),
  User = require('../../models/userModel')

module.exports = function(req, res, next){
  if(req.user){
    User.findOne({email: req.user.email}, function(err, user){
      if(user.is_active == 2){
        next();
      }else{
        res.status(403).json({message: 'Unauthorized User!'});
      }
    })
  }
};
