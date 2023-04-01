const mongoose=require('mongoose')

const countrySchema=new mongoose.Schema({
    country:{
        type:String,
        required:[true,'country name cannot be empty']
    },
    alpha2Code:{
        type:String   
    },
    alpha3Code:{
        type:String
    },
    numberCode:{
        type:String
    },
    states:{
        type:Array
    }
    

    

})

module.exports=mongoose.model('countryLists',countrySchema)