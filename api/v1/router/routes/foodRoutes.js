'use strict';
var food = require('../../controllers/foodController')
var auth = require('../../controllers/userController')
var adminMiddleware = require('../../config/middlewares/adminMiddleware'),
  route = require('express').Router();

route.get('/', auth.loginRequired, food.list_all_foods)
route.post('/', adminMiddleware, food.create_food)

route.get('/:foodId', auth.loginRequired, food.detail_food)
route.put('/:foodId',auth.loginRequired, food.update_food)
route.delete('/:foodId', auth.loginRequired, food.delete_food)

module.exports = route
