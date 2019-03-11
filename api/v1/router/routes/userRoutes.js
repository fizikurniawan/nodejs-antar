'use strict';
var user = require('../../controllers/userController'),
  route = require('express').Router();


route.post('/register', user.register);
route.post('/sign_in', user.sign_in);
route.get('/confirmation', user.emailConfirmation);
route.post('/resend', user.resendVerification);
route.post('/change-password', user.changePassword)
route.post('/reset-password', user.resetPassword)
module.exports = route;
