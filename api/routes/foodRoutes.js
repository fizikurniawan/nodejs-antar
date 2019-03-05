'use strict';
module.exports = function(app) {
  var food = require('../controllers/foodController.js')

  app.route('/foods')
    .get(food.list_all_foods)
    .post(food.create_food)

  app.route('/foods/:foodId')
    .get(food.detail_food)
    .put(food.update_food)
    .delete(food.delete_food)
}
