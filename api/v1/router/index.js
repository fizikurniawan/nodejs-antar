'use strict';
var foodRoutes = require('./routes/foodRoutes'),
  userRoutes = require('./routes/userRoutes'),
  orderRoutes = require('./routes/orderRoutes'),
  categoryRoutes = require('./routes/categoryRoutes'),
  route = require('express').Router();

route.use('/foods', foodRoutes);
route.use('/auth', userRoutes);
route.use('/orders', orderRoutes);
route.use('/categories', categoryRoutes);

module.exports = route;


