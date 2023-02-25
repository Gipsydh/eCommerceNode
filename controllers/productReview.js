const user_reviews=require("../models/user_review")
const products=require("../models/products")
const productReview=async(req,res)=>{
    console.log(req.body)
    try {
        await user_reviews.insertMany({
            p_base_id:req.body.prod_base_id,
            user_email:req.session.username,
            user_name:req.body.custName,
            user_review_details:req.body.custReviewDetails,
            user_rating_count:req.body.ratingCount

        })
        user_reviews.aggregate([
            {"$match": {"p_base_id":req.body.prod_base_id}},
            {$group:{_id:null,avgCount:{$avg:'$user_rating_count'}}}
        ]).exec(function(err,result){
            if(err) throw err;
            products.updateOne({_id:req.body.prod_base_id},{$set:{p_rating:result[0].avgCount}},function(err,res){
                console.log(res)
            })
        })
        return res.status(200).json({msg:"Your review is successfully added"})
        
    } catch (err) {
        console.log(err)
        return res.status(400).json({msg:"some of the fields are not provided"})
    }

}
module.exports={productReview}