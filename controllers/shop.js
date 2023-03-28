const products=require("../models/products")
const companies=require("../models/companies")
const getAllProducts=async(req,res)=>{
    // console.log(req.session.payload)
    // console.log(req.query.pageId)
    await products.find({}).limit(10).skip((parseInt(req.query.pageId)-1)*10).then((response)=>{
        products.find({}).then((respLen)=>{
            return res.status(200).json({response,totalProd:respLen.length,payloadSession:req.session.payload})

        })
    })
}
const getProductCompany=async(req,res)=>{
    await companies.find({}).then((response)=>{
        return res.status(200).json(response)
    })
}
const getSortedProducts=async(req,res)=>{

    const payload=JSON.parse(req.query.payload)
    req.session.payload=payload
    console.log(payload.pageId)
    const checkPayload={}
    if(payload.selectedCompany.length===0){
        checkPayload.p_price={$gte:payload.minPrice,$lte:payload.maxPrice}
    }
    else{
        
            checkPayload.p_price={$gte:payload.minPrice,$lte:payload.maxPrice},
           
            checkPayload.p_company={$in: payload.selectedCompany}
        
    }
    await products.find(checkPayload).then((respLen)=>{

        products.find(checkPayload).skip((parseInt(payload.pageId)-1)*parseInt(payload.productPageLength)).sort(JSON.parse(`{${payload.productSort}}`)).limit(parseInt(payload.productPageLength)).then((response)=>{
           
            return res.status(200).json({response,length:respLen.length,totalProduct:respLen.length,payloadSession:req.session.payload})
        })
    })
    // console.log(resp)
}
module.exports={getAllProducts,getProductCompany,getSortedProducts}