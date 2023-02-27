const products=require("../models/products")
const orders=require("../models/orders")
const nodemailer=require('nodemailer')
const checkoutInfo=async(req,res)=>{
    try {
       
        const resp=await products.find().where('_id').in(req.query.ids)
        return res.status(200).json({resp,userinfo:[req.session.first_name,req.session.last_name,req.session.username]})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"no products can be fetched"})
    }
    
}
const loginInfo=async(req,res)=>{
   
    
      
    if(req.session.username){
        res.status(200).json({msg:"login credentials permitted"})
    }
    else{
        req.status(401).json({msg:"unauthorized"})
    }
}
const placeOrder=async(req,res)=>{
    let allProductInfo=[]
    for(let i=0;i<req.body.productInfo.length;i++){
        console.log(req.body.productInfo[i][0])
        await products.find({_id:req.body.productInfo[i][0]}).then((response)=>{
            console.log(response)
            let tempObjProd={}
            tempObjProd.p_name=response[0].p_name
            tempObjProd.p_id=response[0].p_id
            tempObjProd.p_price=response[0].p_price
            allProductInfo.push(tempObjProd)
        })
    }   
    await orders.insertMany({
        username:req.session.username,
        userAddress:req.body.userAddress,

        productInfo:req.body.productInfo
    }).then((response)=>{
        console.log(req.body.productInfo)
        
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.OTP_EMAIL,
                pass:process.env.OTP_PASS
            },
            tls: {
                rejectUnauthorized:false
            }
        })
        let senderInfoInner=""
        let totalMailPrice=0
        for(let i=0;i<allProductInfo.length;i++){
            senderInfoInner+=`<td>${allProductInfo[i].p_name}</td>
            <td>${allProductInfo[i].p_id}</td>
            <td>${req.body.productInfo[i][1]}</td>
            <td>${allProductInfo[i].p_price}$</td>
            <td>${allProductInfo[i].p_price*parseInt(req.body.productInfo[i][1])}$</td>`
            totalMailPrice+=allProductInfo[i].p_price*parseInt(req.body.productInfo[i][1])
        }
        let sendInfoOuter=`
        <span style="margin:10px 0;display:block;">Please check your order details for confirmation</span>
        <span style="margin:10px 0;display:block;">If you have any issue with this order details please contact to the owner of the shop</span>

    <table  border="1" style='border-collapse:collapse;' >
       <tr>
            <td>Product Name</td>
            <td>Product Id</td>
            <td>Quantity</td>
            <td>Unit Price</td>
            <td>Total Price</td>
        </tr>
        ${senderInfoInner}
        <tr>
            <td colspan=4>Total</td>
            <td>${totalMailPrice}$</td>
        </tr>
    </table>
    <span style="margin:20px 0;display:block;">Thank you for shopping with us :)</span>
    `
    console.log(req.session.username)
        let mailOptions={
            from:process.env.OTP_EMAIL,
            to:req.session.username,
            subject:"Your order confirmation",
            html:sendInfoOuter
        }
        transporter.sendMail(mailOptions,function(err,success){
            if(err){
                console.log(err)
                
            }
            else{
                return res.status(200).json({msg:"your products has been ordered"})

            }
        })

    }).catch((error)=>{
        return res.status(400).json({msg:"something wrong happened"})
    })
}
const checkQuantity=async(req,res)=>{
    try {
        await products.find({_id:req.query.id}).then((response)=>{
            console.log(response)
            let OUFlist=[]
            for(let i=0;i<response.length;i++){
                if(response[i].p_quantity===0){
                    let tempOUF={}
                    tempOUF.p_id=response[i].p_id
                    tempOUF.p_name=response[i].p_name
                    tempOUF.id=response[i]._id
                    OUFlist.push(tempOUF)
                }
            }
            if(OUFlist.length===0){
                return res.status(200).json({msg:"can be proceed"})
            }
            else{
                return res.status(400).json({msg:"out of stock"})
            }
        })
    } catch (error) {
        
    }
}
module.exports={
    checkoutInfo,
    loginInfo,
    placeOrder,
    checkQuantity
}