const express = require('express');
const categoryRoute = express.Router();

var categoryController = require('../controllers/category.controller');

categoryRoute.post('/add', categoryController.add);
categoryRoute.get('/list', categoryController.list);
categoryRoute.get('/:id', categoryController.getById);
categoryRoute.delete('/:id', categoryController.deleteById);
categoryRoute.put('/:id', categoryController.updateById);

module.exports = categoryRoute;