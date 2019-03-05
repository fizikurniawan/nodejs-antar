'use strict';


module.exports = function(app) {
  var user = require('../controllers/userController.js')

  app.route('/auth/register')
    .post(user.register)

  app.route('/auth/sign_in')
    .post(user.sign_in)

}
