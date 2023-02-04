const express=require('express')
const router=express.Router();
const {userSignUp,userOTP,userSignIn}=require("../controllers/userLogin")
router.route("/signUp").post(userSignUp)
router.route("/signIn/verifyOTP").post(userOTP)
router.route("/signIn").post(userSignIn)
module.exports=router