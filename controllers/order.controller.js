const orderItemModel = require('../models/order-item.model');
const orderModel = require('../models/order.model');

exports.allOrder = async (req, res)=>{
    let orders = await orderModel.find().populate('user', ['username', 'email']);
    if(!orders)
        return res.status(500).send({sucess : false, message: "There are no orders"})
    else
        return res.status(200).send(orders)
}

exports.addOrder = async (req, res)=>{
    const orderItemsIds =Promise.all(req.body.orderItems.map(async orderItem=>{
        console.log(orderItem);
        let orderItemDoc = new orderItemModel(orderItem);
        orderItemDoc = await orderItemDoc.save();
        return orderItemDoc._id;
    }));
    const orderItemsIdsList = await orderItemsIds;
    console.log('orderItemsIdsList', orderItemsIdsList)
    var order = {
        "orderItems" : orderItemsIdsList,
        "shippingAddress1": req.body.shippingAddress1,
        "shippingAddress2" : req.body.shippingAddress2,
        "city": req.body.city, 
        "zip": req.body.zip,
        "country": req.body.country,
        "phone": req.body.phone,
        "user": req.body.user,
        "totalPrice": req.body.totalPrice    
    }
    order = new orderModel(order);
    order = await order.save();
    if(!order)
        return res.status(500).send({sucess : false, message: "Something went wrong"});
    else
        return res.status(200).send({sucess : true, message: "Order Placed successfully"});
}