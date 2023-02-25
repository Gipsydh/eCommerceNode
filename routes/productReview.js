const express=require('express')
const router=express.Router();
const {productReview}=require("../controllers/productReview")
const {userLoginVerify}=require("../middleware/userLogin")
router.route("/productReview").post(userLoginVerify,productReview)
module.exports=router