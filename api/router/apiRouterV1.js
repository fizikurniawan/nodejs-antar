'use strict';
var foodRoutes = require('./routes/foodRoutes'),
  userRoutes = require('./routes/userRoutes'),
  route = require('express').Router();

route.use('/foods', foodRoutes);
route.use('/auth', userRoutes);

module.exports = route;


