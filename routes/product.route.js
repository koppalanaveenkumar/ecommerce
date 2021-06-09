const express = require('express');
const productRoute = express.Router();

var productController = require('../controllers/product.controller');

productRoute.post('/add', productController.add);
productRoute.get('/list', productController.list);
productRoute.get('/getById/:id', productController.getById);
productRoute.delete('/deleteById/:id', productController.deleteById);
productRoute.put('/updateById/:id', productController.updateById);
module.exports = productRoute;