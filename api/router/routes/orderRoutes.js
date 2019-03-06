'use strict';
var order = require('../../controllers/orderController'),
  auth = require('../../controllers/userController'),
  adminMiddleware = require('../../config/middlewares/adminMiddleware'),
  route = require('express').Router();

route.get('/', auth.loginRequired, order.list_all_orders)
route.post('/', auth.loginRequired, order.create_order)
route.get('/ongoing', auth.loginRequired, order.list_ongoing)
route.get('/success', auth.loginRequired, order.list_success)
route.get('/:orderId', auth.loginRequired, order.detail_order)

//admin only
route.put('/:orderId', adminMiddleware, order.change_status_order)

module.exports = route

