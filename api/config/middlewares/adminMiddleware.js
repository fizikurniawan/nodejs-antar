'use strict';
const jwt            = require('jsonwebtoken')

module.exports = function(req, res, next){
  if(req.user){
    if(req.user.is_active == 2){
      next();
    }else{
      res.status(403).json({message: 'Unauthorized User!'})
    }
  }
};
