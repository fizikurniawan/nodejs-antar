'use strict';
var foodRoutes = require('./routes/foodRoutes'),
  userRoutes = require('./routes/userRoutes'),
  orderRoutes = require('./routes/orderRoutes'),
  route = require('express').Router();

route.use('/foods', foodRoutes);
route.use('/auth', userRoutes);
route.use('/orders', orderRoutes);

module.exports = route;


