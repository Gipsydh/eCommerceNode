const users=require("../models/users")
const usersotps=require("../models/usersotp")
const bcrypt=require('bcrypt')
const nodemailer=require("nodemailer")
let OTP=null
let obj=null
const userSignUp=async(req,res)=>{
    try{
        
        
        const check=await users.find({email:req.body.email})
        
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
                    console.log(email)
                    const res1=usersotps.findOne({
                        email:email,
                       
                    }).then((response)=>{
                        try {
                            if(response.OTP){
                                console.log("some")
                                console.log(OTP)
                                console.log(email)
                                usersotps.findOneAndUpdate({
                                    email:email
                                },{ email:email,
                                    OTP:OTP}).then((response)=>{
                                        console.log(response)
                                    })
                            }
                            
                        } catch (error) {
                            usersotps.insertMany({
                                email:email,
                                OTP:OTP
                            })
                        }
                        
                    })
                    
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
            let resp=await sendOTP(req.body.email)
            console.log(resp)
          
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
    let orgOTP=null
    console.log(req.body)
    await usersotps.findOneAndDelete({
        email:req.body.obj.email
    }).then((response)=>{
        try {
            
            orgOTP=response.OTP
        } catch (error) {
            
        }
    })
   
    if(orgOTP!=null && orgOTP==req.body.currOTP){
        obj=req.body.obj
        const salt=await bcrypt.genSalt(10)
        const hashedP=await bcrypt.hash(req.body.obj.password,salt)
        console.log(req.body)
        obj={
            "first_name":req.body.obj.first_name,
            "last_name":req.body.obj.last_name,
            "email":req.body.obj.email,
            "telephone":req.body.obj.telephone,
            "password":hashedP
        }
        await users.insertMany(obj)
        return res.status(200).json(obj)
    }
    else{
        return res.status(401).json({msg:"error"})
    }
    
}
const userSignIn=async(req,res)=>{
    try {
        
        const resp=await users.find({email:req.body.email})
        console.log(resp[0].password)
        console.log(req.body.password)
        if(resp.length===1){
            if(await bcrypt.compare(req.body.password,resp[0].password)){
                return res.status(200).json({msg:"logged in"})
            }
            else{
                return res.status(401).json({msg:"wrong password"})
            }
        }
        else{
            return res.status(404).json({msg:"invalid email id"})
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={userSignUp,userOTP,userSignIn}