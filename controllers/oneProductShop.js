const products=require("../models/products")

const oneProduct=async(req,res)=>{
    
    const resultProducts=await products.find({
        _id: req.query.id
    }) 
    return res.status(200).json(resultProducts)
}
const relatedProduct=async(req,res)=>{
    const resultProducts=await products.find({
        p_type:req.query.p_type
    })
    return res.status(200).json(resultProducts)
}
module.exports={oneProduct,relatedProduct}