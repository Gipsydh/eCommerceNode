const products=require("../models/products")
const companies=require('../models/companies')
const types=require("../models/types")

const getAllProducts=async(req,res)=>{
    const productOutput=await products.find({})
    return res.status(200).json({productOutput})
}
const searchProducts=async(req,res)=>{
    console.log(req.body)
    
    try {
        
        const {name}=req.body;
        console.log(name);
        const resultProducts=await products.find({
            p_name: {$regex:name, $options: 'i'}
        }) 
        return res.status(200).json({resultProducts})
    } catch (error) {
        console.log(error)
    }
}
const editProduct=async(req,res)=>{
    try {
        // const {id}=req.body;
        const {id}=req.body
        const resultProducts=await products.findOne({
            _id: id
        })
        const companiesRet=await companies.find({}); 
        const typesRet=await types.find({})
        return res.status(200).json({singleProductDB:resultProducts,companiesDB:companiesRet,typesDB:typesRet})
    } catch (error) {
        console.log(error)
    }
}
const updateProduct=async(req,res)=>{
    try {
        const id=req.body.id
        const {editedProduct}=req.body
        console.log(editedProduct.p_id)
        const checkProduct=await products.find({p_id:editedProduct.p_id})
        // if(checkProduct.length>=1){
        //     return res.status(200).json({status:false,msg:"this product id is already in use"})
        // }
        const resp=await products.findOneAndUpdate({_id:id},editedProduct)
        return res.status(200).json({status:true,msg:resp})
    } catch (error) {
        console.log(error)
    }
}
const updateImg=async(req,res)=>{
    try {
        res.status(200).json({msg:"positive"})
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    getAllProducts,
    searchProducts,
    editProduct,
    updateProduct,
    updateImg
}