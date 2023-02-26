const jwt=require("jsonwebtoken")
const adminVerify=async(req,res)=>{
    console.log(req.body)
    if(req.body.username==="admin" && req.body.password==="admin"){
        
          req.session.adminUsername="admin"
          res.status(200).json({flag:true,msg:"data has received"})
        
    }
    else
    res.status(401).json({flag:false,msg:"wrong info"})

}
const adminLogout=(req,res)=>{
    console.log(req.body)
    if(req.body.logoutflag){
        req.session.adminUsername="false"
    }
    res.status(200).json({logoutResp:true})
}
module.exports={adminVerify,adminLogout}