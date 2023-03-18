const products=require("../models/products")
const user_review=require("../models/user_review")
const carts=require("../models/carts")

const oneProduct=async(req,res)=>{
    const resultProducts=await products.find({
        _id: req.query.id
    }) 
    const resultReview=await user_review.find({
        p_base_id:req.query.id
    })

    return res.status(200).json({resultProducts:resultProducts,resultReview:resultReview.length})
}
const addToCartDetails=async(req,res)=>{
    const resp=await carts.find({username:req.session.username})
    if(resp.length===0){
        return res.status(200).json({msg:"the cart is empty"})
    }
    else{
        return res.status(200).json({resp})
    }
}
const addToCart=async(req,res)=>{
    console.log(req.body)
    console.log(req.session.username)
    let tuple={}
    tuple.username=req.session.username
    tuple.p_id=req.body.p_id
    tuple.p_name=req.body.p_name
    tuple.p_obj_id=req.body.p_obj_id
    tuple.p_count=req.body.p_count
    const resp=await carts.find({username:req.session.username,p_obj_id:req.body.p_obj_id})
    let filter={}
    if(resp.length>0){

        tuple.p_count=parseInt(tuple.p_count)+parseInt(resp[0].p_count);
        filter={username:req.session.username,p_obj_id:resp[0].p_obj_id}
        await carts.findOneAndUpdate(filter,tuple).then((response)=>{
            return res.status(200).json({msg:"added to cart"})
        }).catch((err)=>{
           return  res.status(404).json({msg:"something wrong happened"})
        })
    }
    else{
        await carts.insertMany(tuple).then((response)=>{
            return res.status(200).json({msg:"added to cart"})
        }).catch((err)=>{
           return  res.status(404).json({msg:"something wrong happened"})
        })
    }

}
const relatedProduct=async(req,res)=>{
    const resultProducts=await products.find({
        p_type:req.query.p_type
    })
    return res.status(200).json(resultProducts)
}
const getSingleProductCart=async(req,res)=>{
    console.log(req.query)
    try {
       const resp= await products.find({p_id:req.query.prodId,_id:req.query.prodObjId})
       console.log(resp)
       return res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({msg:"something"})
}
module.exports={oneProduct,addToCartDetails,addToCart,relatedProduct,getSingleProductCart}