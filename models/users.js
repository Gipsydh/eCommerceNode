const mongoose=require('mongoose')
const usersSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'user first name cannot be empty']

    },
    last_name:{
        type:String,
        required:[true,'user last name cannot be empty']

    },
    email:{
        type:String,
        required:[true,"email cannot be empty"]
    },
    telephone:{
        type:String,
        required:[true,"telephone cannot be empty"]
    },
    password:{
        type:String,
        required:[true,"password cannot be empty"]

    }

})

module.exports=mongoose.model('users',usersSchema)