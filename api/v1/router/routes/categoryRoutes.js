'use strict';

var category = require('../../controllers/categoryController'),
  route = require('express').Router(),
  isLogged = require('../../config/middlewares/loggedUser'),
  adminMiddleware = require('../../config/middlewares/adminMiddleware');

route.get('/', isLogged, category.list_all_categories);
route.post('/', adminMiddleware, category.create_category);
route.get('/:categoryId', adminMiddleware, category.detail_category);
route.put('/:categoryId', adminMiddleware, category.update_category);
route.delete('/:categoryId', adminMiddleware, category.delete_category);

module.exports = route
