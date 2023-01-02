const jwt=require("jsonwebtoken")
const adminVerify=async(req,res)=>{
    console.log(req.body)
    if(req.body.username==="admin" && req.body.password==="admin"){
        const token = jwt.sign({ username:req.body.username,password:req.body.password }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          })
          req.session.username="admin"
          console.log(req.session.username)
          res.status(200).json({flag:true,msg:"data has received"})
        
    }
    else
    res.status(401).json({flag:false,msg:"wrong info"})

}
const adminLogout=(req,res)=>{
    console.log(req.body)
    if(req.body.logoutflag){
        req.session.username="false"
    }
    res.status(200).json({logoutResp:true})
}
module.exports={adminVerify,adminLogout}