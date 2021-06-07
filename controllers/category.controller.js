const categoryModel = require('../models/category.model')

exports.add = async (req, res)=>{
    let document =  new categoryModel(req.body);
    try{
        let doc = await document.save();
        if(doc)
            res.status(201).send({success: true, message: "Category added"});
        else
            res.status(404).send({success: false, message: "Something went wrong"});
    }catch(err){
        return res.status(500).send({success: false, message:err.message});
    }
}
// http://localhost:8089/api/v1.0.0/category/add
// {
//     "name" : "mobiles",
//     "color" : "green",
//     "icon" : "mobile-icon",
//     "image" : "mobile-image"
// }


exports.list = async (req, res)=>{
    try{
        let docs = await categoryModel.find();
        if(docs)
            res.status(201).send({success: true, category: docs});
        else
        res.status(404).send({success: false, message: "Something went wrong"});
    }catch(err){
        return res.status(500).send({success: false, message:err.message});
    }
}

// http://localhost:8089/api/v1.0.0/category/list

exports.getById = async (req, res)=>{
    try{
        let category = await categoryModel.findById({_id : req.params.id});
        if(category){
            res.status(200).send({success: true, category: category});
        }
        else{
            res.status(404).send({success: false, message: "category not found"});
        }
    }catch(err){
        return res.status(500).send({success: false, message: err.message});
    }
}

// http://localhost:8089/api/v1.0.0/category/60bd119348cc3270b4d9bf1e

exports.deleteById = async (req, res)=>{
    try{
        let category = await categoryModel.findByIdAndRemove(req.params.id);
        if(category){
            res.status(200).send({success: true, message: "deleted successfully"});
        }
        else{
            res.status(404).send({success: false, message: "category not found"});
        }
    }catch(err){
        return res.status(500).send({success: false, message: err.message});
    }
}

// http://localhost:8089/api/v1.0.0/category/60bd119348cc3270b4d9bf1e

exports.updateById = async (req, res)=>{
    try{
        let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(category)
            res.status(200).send({success: true, message: "updated successfully"});
        
        else
            res.status(404).send({success: false, message: "category not found"});
        
    }catch(err){
        return res.status(500).send({success: false, message: err.message});
    }
}
// http://localhost:8089/api/v1.0.0/category/60bd11ca48cc3270b4d9bf1f

// {
//     "name": "cookwear",
//     "color": "orange",
//     "icon": "cookwear-icon",
//     "image": "cook-image"
// }