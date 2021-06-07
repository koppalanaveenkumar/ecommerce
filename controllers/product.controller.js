var productModel = require('../models/product.model');

exports.add = async (req, res)=>{
    let document = new productModel(req.body);
    try{
        let doc = await document.save();
        if(doc)
            res.status(201).send({sucess : true, message : "Product added successfully"});
        else
            res.status(404).send({sucess : false, message : "Something went wrong"})
    }catch(err){
        return res.status(500).send({sucess : false, message : err.message})
    }
}