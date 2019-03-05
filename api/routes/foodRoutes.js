'use strict';
module.exports = function(app) {
  var food = require('../controllers/foodController')
  var auth = require('../controllers/userController')

  app.route('/foods')
    .get(auth.loginRequired, food.list_all_foods)
    .post(auth.loginRequired, food.create_food)

  app.route('/foods/:foodId')
    .get(auth.loginRequired, food.detail_food)
    .put(auth.loginRequired, food.update_food)
    .delete(auth.loginRequired, food.delete_food)
}
