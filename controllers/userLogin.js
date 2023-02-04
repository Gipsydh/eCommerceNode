const users=require("../models/users")
const bcrypt=require('bcrypt')
const nodemailer=require("nodemailer")
let OTP=null
let obj=null
const userSignUp=async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedP=await bcrypt.hash(req.body.password,salt)
        console.log(req.body)
        obj={
            "first_name":req.body.first_name,
            "last_name":req.body.last_name,
            "email":req.body.email,
            "telephone":req.body.telephone,
            "password":hashedP
        }
        
        
        const check=await users.find({email:obj.email})
        if(check.length===0){
            sendOTP=(email)=>{
    
                return new Promise((resolve,reject)=>{
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
                    OTP=Math.floor(100000 + Math.random() * 900000)
                    let mailOptions={
                        from:process.env.OTP_EMAIL,
                        to:email,
                        subject:"Your email confirmation",
                        html:`your confirmation code is:<b>${OTP}</b>`
                    }
                    transporter.sendMail(mailOptions,function(err,success){
                        if(err){
                            console.log(err)
                            resolve(false)
                        }
                        else{
                            console.log("successfully sent")
                            resolve(true)
                        }
                    })
                })
            }
            let resp=await sendOTP(obj.email)
            console.log(resp)
            // if(sendOTP(obj.email)===true){

            //    
            //     return res.status(200).json(obj)
            // }
            // else{
            //     return res.status(401).json({msg:"error"})
            // }
        }
        else{
            res.status(409).json({msg:"this user email is already in use"})
        }
        
    }
    catch(e){
        return res.status(401).json({msg:e})
    }
   
    
}

const userOTP=async(req,res)=>{
    const currOTP=req.body.currOTP
    console.log(currOTP)
    console.log(OTP)
    if(currOTP==OTP){
        await users.insertMany(obj)
        return res.status(200).json(obj)
    }
    else{
        return res.status(401).json({msg:"error"})
    }
    
}
const userSignIn=async(req,res)=>{
    
}
module.exports={userSignUp,userOTP,userSignIn}