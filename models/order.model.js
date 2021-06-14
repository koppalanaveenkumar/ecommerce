const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'orderitem',
        required: true
    }],
    shippingAddress1: {
        type : String,
        required: true
    },
    shippingAddress2 : {
        type : String,
    },
    city: {
        type : String,
        required: true
    },
    zip: {
        type : String,
        required: true
    },
    country: {
        type : String,
        required: true
    },
    phone: {
        type : String,
        required: true
    },
    status: {
        type : String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type : Number
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    dateOrderd: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('order',orderSchema);



// {
//     "orderItems" : [
//         {
//             "quanquantity": 3,
//             "product" : "60bd2c6e91d890a754409527"
//         },
//         {
//             "quanquantity": 2,
//             "product" : "60bf9448412306acdcf89858"
//         }
//     ],
//     "shippingAddress1": "Flowers Street 45",
//     "shippingAddress2" : "1-B",
//     "city": "AnanAnantapur", 
//     "zip": 515591,
//     "country": "India",
//     "phone": 9059933885,
//     "user": "60bfbf37db1c0d30d8f8d3bc",
//     "totalPrice": 1000
// }