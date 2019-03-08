'use strict';
var user = require('../../controllers/userController'),
  route = require('express').Router();


route.post('/register', user.register);
route.post('/sign_in', user.sign_in);
route.get('/send', user.send)
module.exports = route;
