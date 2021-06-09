const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken')
var userController = require('../controllers/user.controller');

var authMiddleware = (req, res, next) => {
    if(req.headers.authorization){
        var token = req.headers.authorization.split(' ')[1];
        if(token != "null" && token != undefined){
            try{
            var payload = jwt.verify(token, process.env.JWT_SECRET);
            
            if(payload.subject == req.body._id){
                next();
            }
            else{
                res.status(401).send("unauthorization access")
            }
        } 
        catch(err){
            res.status(401).send({error: err.message});
        }
    }
        else{
            res.status(401).send("unauthorization access")
        }
    }
    else{
        res.status(401).send("unauthorization access")
    }

}


userRouter.get('/register',userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/changePassword', authMiddleware,userController.changePassword);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.patch('/updateRole', authMiddleware,userController.updateRole);
module.exports = userRouter;