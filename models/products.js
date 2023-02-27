const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    p_name:{
        type:String,
        required:[true,'product name cannot be empty']
    },
    p_id:{
        type:String,
    },
    p_type:{
        type:String
    },
    p_price:{
        type:Number,
        required:[true,'product must have price']
    },
    p_rating:{
        type:Number,
        default:4.5,
    },
    p_createdAt:{
        type:Date,
        default:Date.now(),
    },
    p_company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'
        }
    },
    p_outOfStock:{
        type:Boolean,
        default:false,
    },
    p_discPrice:{
        type:Number,
        default:0,

    },
    p_description:{
        type:String,
    },
    p_trending:{
        type:Boolean,
        default:false
    },
    p_new:{
        type:Boolean,
        default:false,
    },
    p_quantity:{
        type:Number,
        required:[true,"product quantity cannot be empty"],
        default:0
    }

    

})

module.exports=mongoose.model('products',productSchema)