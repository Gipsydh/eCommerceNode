
const adminLoginVerify=(req,res,next)=>{
    if(req.session.adminUsername==="admin"){
        next()
    }    
    else{
        res.status(401).json({error:"unverified user"})
    }
}

module.exports=adminLoginVerify