const express = require('express');
const productRoute = express.Router();

var productController = require('../controllers/product.controller');

productRoute.post('/add', productController.add);

module.exports = productRoute;