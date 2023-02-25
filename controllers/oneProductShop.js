const products=require("../models/products")
const user_review=require("../models/user_review")

const oneProduct=async(req,res)=>{
    const resultProducts=await products.find({
        _id: req.query.id
    }) 
    const resultReview=await user_review.find({
        p_base_id:req.query.id
    })

    return res.status(200).json({resultProducts:resultProducts,resultReview:resultReview.length})
}
const relatedProduct=async(req,res)=>{
    const resultProducts=await products.find({
        p_type:req.query.p_type
    })
    return res.status(200).json(resultProducts)
}
module.exports={oneProduct,relatedProduct}