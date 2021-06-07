const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
exports.connectToDB = () =>{
    mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
        if(err){
            console.log("error in collection" + err.message);
        }
        else{
            console.log("Connected Database")
        }
    })
};
