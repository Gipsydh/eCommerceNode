const orders=require("../models/orders")
const getSingleOrder=async(req,res)=>{
    
    await orders.find({_id:req.query.id}).then((response)=>{
        return res.status(200).json(response)
    }).catch((err)=>{
        console.log(err)
        res.status(400).json({msg:"something went wrong"})
    })
}
module.exports={getSingleOrder}