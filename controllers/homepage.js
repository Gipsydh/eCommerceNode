const products=require("../models/products")
const getProductsHome=async(req,res)=>{
    const productOutput=await products.find({});
    return res.status(200).json({productOutput})
}
const searchProduct=async(req,res)=>{
    await products.find({p_name:{$regex:req.query.prodName, $options: 'i'}}).then((response)=>{
        return res.status(200).json(response)
    }).catch((err)=>{
        return res.status(400).json(err)
    })
}
module.exports={
    getProductsHome,searchProduct
}