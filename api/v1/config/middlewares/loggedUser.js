'use strict';
const jwt            = require('jsonwebtoken');

module.exports = function(req, res, next){
  var headers = req.headers || 'Nojwt' , 
    authorization = headers.authorization || 'Nojwt',
    JWT = authorization.split(' '),
    current_time = new Date().getTime()/1000

  if(headers && authorization && JWT[0] === 'JWT'){
    jwt.verify(JWT[1], 'ANTAR-RESTFULAPIs', function(err, decode){
      if (err){
        req.user = false;
      }else{
        req.user = decode;
      }
      next();
    })
  }else{
    req.user = false;
    next();
  }
};
