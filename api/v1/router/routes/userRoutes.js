'use strict';
var user = require('../../controllers/userController'),
  route = require('express').Router();


route.post('/register', user.register);
route.post('/sign_in', user.sign_in);
route.get('/send', user.send);
route.get('/confirmation', user.emailConfirmation);
route.post('/resend', user.resendVerification);
route.post('/change-password', user.changePassword)
module.exports = route;
