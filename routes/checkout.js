const express=require('express')
const{checkoutInfo,loginInfo,placeOrder,checkQuantity}=require("../controllers/checkoutInfo")
const {userLoginVerify}=require("../middleware/userLogin")
const router=express.Router();
router.route('/checkoutInfo').get(userLoginVerify,checkoutInfo)
router.route('/loginInfo').get(userLoginVerify,loginInfo)
router.route('/placeOrder').post(userLoginVerify,placeOrder)
router.route("/checkQuantity").get(checkQuantity)


module.exports=router
