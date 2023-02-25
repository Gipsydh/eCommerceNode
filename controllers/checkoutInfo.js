const products=require("../models/products")
const orders=require("../models/orders")
const checkoutInfo=async(req,res)=>{
    try {
       
        const resp=await products.find().where('_id').in(req.query.ids)
        return res.status(200).json({resp,userinfo:[req.session.first_name,req.session.last_name,req.session.username]})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"no products can be fetched"})
    }
    
}
const loginInfo=async(req,res)=>{
    if(req.session.username){
        res.status(200).json({msg:"login credentials permitted"})
    }
    else{
        req.status(401).json({msg:"unauthorized"})
    }
}
const placeOrder=async(req,res)=>{
    console.log(req.body)
    await orders.insertMany({
        username:req.session.username,
        userAddress:req.body.userAddress,
        productInfo:req.body.productInfo
    }).then((response)=>{
        return res.status(200).json({msg:"your products has been orderdd"})
    }).catch((error)=>{
        return res.status(400).json({msg:"something wrong happened"})
    })
}
module.exports={
    checkoutInfo,
    loginInfo,
    placeOrder,
}