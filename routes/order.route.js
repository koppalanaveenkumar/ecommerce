const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order.controller')

orderRouter.post('/add',orderController.addOrder)
orderRouter.get('/list',orderController.allOrder);
// orderRouter.get('/list/:id',orderController.getOrdersById);
orderRouter.get('/:id',orderController.getOrderById);
orderRouter.put('/:id',orderController.updateOrderById);
module.exports =orderRouter;