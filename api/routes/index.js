'use strict';

const foodRoutes = require('./foodRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app){
  foodRoutes(app);
  userRoutes(app);
}
