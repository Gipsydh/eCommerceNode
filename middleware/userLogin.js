userLoginVerify=(req,res,next)=>{
    if(req.session.username){
        next()
    }
    else{
        return res.status(401).json({msg:"unauthrized"})
    }
}
module.exports=userLoginVerify