const mongoose=require('mongoose')

const ordersSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username cannot be empty"]
    },
    userAddress:{
        type:Object,
        required:[true,"address cannot be empty"]
    },
    productInfo:{
        type:Array,
        required:[true,"product info cannot be empty"]
    },
    
    

    

})

module.exports=mongoose.model('orders',ordersSchema)