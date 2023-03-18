const mongoose=require('mongoose')

const cartsSchema=new mongoose.Schema({
   username:{
    type:String,
    required:[true,"username cannot be empty"]
   },
   p_name:{
      type:String,
      required:[true,"p_name cannot be empty"]
   },
   p_id:{
    type:String,
    required:[true,"p_id cannot be empty"]
   },
   p_obj_id:{
    type:String,
    required:[true,"p_obj_id cannot be empty"]
   },
   p_count:{
    type:Number,
    required:[true,"p_count cannot be empty"]
   },
   
    

    

})

module.exports=mongoose.model('carts',cartsSchema)