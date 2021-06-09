const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Email validation
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new Schema(
    {
        username : {
            type: String,
            minLength: 5,
            maxLength: 20,
            required: true,
            unique: true
        },
        password : {
            type: String,
            minLength: 5,
            maxLength: 1000,
            required: true,
        },
        email : {
            type: String,
            unique : true,
            required : true,
            validate : [validateEmail, 'email id is not approprite']
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

module.exports = mongoose.model('user', userSchema);