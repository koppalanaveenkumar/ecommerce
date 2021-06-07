const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema(
    {
       name : {
           type : String,
           required : true,
           index : true
       },
       description : {
           type : String,
           required : true
       },
       richDescription : {
           type: String,
           required : true
       },
       image : {
           type: String,
           required : true
       },
       images : {
           type: String
        },
       brand : {
           type : String,
           required : true
       },
       price : {
           type : Number,
           required : true
       },
       category : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "categorie",
           required : true
       },
       countInStock : {
           type : Number,
           required : true,
           min : 1,
           max : 150
        },
       rating : {
           type: Number
       },
       isFeatured : {
           type: Boolean
       },
       dateCreated: {
           type : Date,
           default : Date.now
       }
    }
)
module.exports = mongoose.model('product', productSchema);