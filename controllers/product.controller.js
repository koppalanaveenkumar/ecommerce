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

exports.list = async (req, res)=>{
    try{
        let docs = await productModel.find();
        if(docs)
        res.status(201).send({sucess : true, message : docs});
        else
        res.status(401).send({sucess : false, message : "Something went wrong"})
    } catch(err){
        return res.status(500).send({sucess : false, message :err.message})
    }
}

exports.getById = async (req, res)=>{
    try{
        let product = await productModel.findById({_id: req.params.id});
        if(product)
        res.status(201).send({sucess : true, product : product});
        else
        res.status(401).send({sucess : false, message : "Not found Product"})
    } catch(err){
        return res.status(500).send({sucess : false, message :err.message})
    }
}

exports.deleteById = async (req, res) =>{
    try{
        let product = await productModel.findByIdAndRemove(req.params.id);
        if(product)
            res.status(200).send({sucess: true, message : "Deleted Successfully"});
        else
        res.status(401).send({sucess: false, message: "Product not found"});
    }catch(err){
        return res.status(500).send({sucess: false, message: err.message});
    }
}

exports.updateById = async (req, res) =>{
    try{
        let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(product)
            res.status(200).send({sucess: true, message:"Updated sucessfully"});
        else
        res.status(404).send({sucess: false, message: "Product not found"});
    }catch(err){
        return res.status(500).send({sucess: false, message: err.message});
    }
}


// 
// {
//     "name" : "Redmi Note 7 Pro (Red, 64 GB)  (4 GB RAM)",
//     "description" : "Whether it’s work or entertainment, the Redmi Note 7 Pro challenges all odds and provides a truly immersive and enriched smartphone experience. Its 2.0 GHz Qualcomm Snapdragon 675 processor makes multitasking easy and it also comes with a (48 MP + 5 MP) dual-rear camera and a 13 MP front camera which let you click truly beautiful pictures. What’s more, the Face Unlock features makes unlocking this phone a piece of cake.",
//     "richDescription" : "It's time to go big with the Redmi Note 7 Pro's 16-cm (6.3) FHD+ Dot Notch display. Powered by a 2.0 GHz Qualcomm Snapdragon 675 processor and 4 GB of RAM, this smartphone lets you experience the next level of performance and control. With a (48 MP + 5 MP) dual-rear camera, a 13 MP front camera, and features such as Face Unlock and 4K Video Recording, the Redmi Note 7 Pro truly puts a new spin on your smartphone experience.",
//     "image": "https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/3/u/t/mi-redmi-note-7-pro-na-original-imafe4bddnr7n5vb.jpeg?q=70" ,
//     "images" : "[https://rukminim1.flixcart.com/image/832/832/k0lbdzk0pkrrdj/mobile/5/8/h/mi-redmi-note-7-pro-mzb7463in-original-imafgdhwqs9zgd8u.jpeg?q=70, https://rukminim1.flixcart.com/image/832/832/jsw3yq80/mobile/3/u/t/mi-redmi-note-7-pro-na-original-imafed5fknhbfpbq.jpeg?q=70, https://rukminim1.flixcart.com/image/832/832/jskofww0/mobile/3/u/t/mi-redmi-note-7-pro-na-original-imafe4bcgtuvkadh.jpeg?q=70]",
//     "brand" : "RedMI",
//     "price" : 15999,
//     "category" : "60bd23c548dd907edcd38a3a",
//     "countInStock" : 100,
//     "rating" : 4,
//     "isFeatured" : true
// }