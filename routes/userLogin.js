const express=require('express')
const router=express.Router();
const {userSignUp,userOTP,userSignIn,currStatus,userLogOut,updateUserInfo,getCurrUserInfo,updateUserPassword,getUserOrder}=require("../controllers/userLogin")
const {userLoginVerify}=require('../middleware/userLogin')
router.route("/signUp").post(userSignUp)
router.route("/signIn/verifyOTP").post(userOTP)
router.route("/signIn").post(userSignIn)
router.route("/currStatus").get(currStatus)
router.route("/userLogOut").get(userLogOut)
router.route("/updateUserInfo").patch(userLoginVerify,updateUserInfo)
router.route("/getCurrUserInfo").get(userLoginVerify,getCurrUserInfo)
router.route("/updateUserPassword").post(userLoginVerify,updateUserPassword)
router.route("/getUserOrder").get(userLoginVerify,getUserOrder)
module.exports=router