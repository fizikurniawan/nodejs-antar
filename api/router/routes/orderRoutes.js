'use strict';
var order = require('../../controllers/orderController'),
  auth = require('../../controllers/userController'),
  adminMiddleware = require('../../config/middlewares/adminMiddleware'),
  route = require('express').Router();

route.get('/', auth.loginRequired, order.list_all_orders)
route.post('/', auth.loginRequired, order.create_order)
route.get('/:orderId', auth.loginRequired, order.detail_order)
route.put('/:orderId', adminMiddleware, order.change_status_order)

module.exports = route

