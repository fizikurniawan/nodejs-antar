'use strict';
const jwt            = require('jsonwebtoken');

module.exports = function(req, res, next){
  var headers = req.headers || 'Nojwt' , 
    authorization = headers.authorization || 'Nojwt',
    JWT = authorization.split(' ')

  if(headers && authorization && JWT[0] === 'JWT'){
    jwt.verify(JWT[1], 'RESTFULAPIs', function(err, decode){
      if (err) req.user = false;
      req.user = decode;
      next();
    })
  }else{
    req.user = false;
    next();
  }
};
