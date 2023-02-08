const mongoose=require('mongoose')
const usersOTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"cannot be empty"]
    },
    OTP:{
        type:Number,
        required:[true,"cannot be empty"]

    }

})

module.exports=mongoose.model('usersotps',usersOTPSchema)