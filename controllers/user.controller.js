const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const emailService = require('../services/EmailService');

const bcrypt = require('bcrypt');
dotenv.config();
// Register
exports.register = async (req, res)=>{
    var user = {
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password,10),
        email : req.body.email
    }
    let document = new userModel(user);
    try{
        let doc = await document.save();
        if(doc)
            res.status(201).send({sucess : true, message: "Sucess"});
        else
            res.status(404).send({sucess : false, message: "Something wrong"});
    }catch(err){
        res.status(500).send({sucess : false, message: err.message});
    }
}

// Login

exports.login = async(req, res)=>{
    try{
        let user = await userModel.findOne({username: req.body.username});
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                var payload = {subject : user._id}
                var token = jwt.sign(payload,process.env.JWT_SECRET);
                res.status(200).send({sucess : true, token: token, _id: user._id,message: "Login Sucess"});
            }
            else{
                res.status(401).send({sucess : false, message: "Password incorrect"});
            }
        }
        else{
            res.status(401).send({sucess : false, message: "User not found"});
        }
    }catch(err){
        res.status(500).send({sucess : false, message: err.message});
    }
}

// Change Password

exports.changePassword = async(req, res) => {
    try{
        let user = await userModel.findOne({username: req.body.username});
        if(user)
            if(bcrypt.compareSync(req.body.currentPassword, user.password)){
               let updateUser = await userModel.findOneAndUpdate({username: req.body.username}, {password: bcrypt.hashSync(req.body.newPassword, 10)}, {new:true});
               if(updateUser){
                   if(bcrypt.compareSync(req.body.newPassword, updateUser.password)){
                       res.status(200).send({sucess : true, message: "Password Changed"})
                   }
                   else{
                       res.status(500).send({sucess : false, message: "Something went wrong"});
                   }
               }
               else{
                   res.status(401).send({sucess: false, message: "Failed in updated password"})
               }
            }
            else{
                res.status(401).send({sucess : false, message: "current password incorrect"})
            }
        
        else
            res.status(404).send({sucess : false, message: "user not found"})

    }catch(err){
        return res.status(500).send({sucess : false, message: err.message})
    }
}

exports.forgotPassword = async(req, res) => {
    try{
        let user = await userModel.findOne({email: req.body.email});
        if(user){
                emailService.sendEmail({
                    to: req.body.email,
                    subject: "Email Reset",
                    html : `
                    <a href="https://www.facebook.com">Password reset link</a>
                    `
                })
                res.status(200).send({sucess : true, message: "Password reset link has been shared your mail"});
            }
            else{
                res.status(401).send({sucess : false, message: "Email not found"});
            }
    } catch(err){
            res.status(500).send({sucess : false, message: err.message});
        }
}

