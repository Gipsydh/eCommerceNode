const mongoose=require('mongoose')

const user_review_schema=new mongoose.Schema({
    p_base_id:{
        type:String,
        required:[true,'type name cannot be empty']
    },
    user_email:{
        type:String,
        required:[true,"uesrname cannot be null"]
    },
    user_name:{
        type:String,
        required:[true,'type name cannot be empty']
    },
    user_review_details:{
        type:String,
        required:[true,'type name cannot be empty']
    },
    user_rating_count:{
        type:Number,
        required:[true,"this field cannot be empty"]
    }
    

    

})

module.exports=mongoose.model('user_reviews',user_review_schema)