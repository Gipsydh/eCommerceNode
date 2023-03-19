const express=require('express')
const{getSingleOrder}=require("../controllers/orderInfo")
const {userLoginVerify}=require("../middleware/userLogin")

const router=express.Router();

router.route("/getOrderInfo").get(userLoginVerify,getSingleOrder)
module.exports=router 