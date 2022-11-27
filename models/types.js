const mongoose=require('mongoose')

const typeSchema=new mongoose.Schema({
    t_name:{
        type:String,
        required:[true,'type name cannot be empty']
    },
    

    

})

module.exports=mongoose.model('types',typeSchema)