
const adminLoginVerify=(req,res,next)=>{
    console.log(req.session.username)
    if(req.session.username==="admin"){
        next()
    }    
    else{
        res.status(401).json({error:"unverified user"})
    }
}

module.exports=adminLoginVerify