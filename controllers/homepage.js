const products=require("../models/products")
const getProductsHome=async(req,res)=>{
    const productOutput=await products.find({});
    return res.status(200).json({productOutput})
}

module.exports={
    getProductsHome
}