const mongoose=require('mongoose')

const companySchema=new mongoose.Schema({
    c_name:{
        type:String,
        required:[true,'company name cannot be empty']
    },
    

    

})

module.exports=mongoose.model('companies',companySchema)