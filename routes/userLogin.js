const express=require('express')
const router=express.Router();
const {userSignUp,userOTP,userSignIn,currStatus,userLogOut}=require("../controllers/userLogin")
router.route("/signUp").post(userSignUp)
router.route("/signIn/verifyOTP").post(userOTP)
router.route("/signIn").post(userSignIn)
router.route("/currStatus").get(currStatus)
router.route("/userLogOut").get(userLogOut)
module.exports=router