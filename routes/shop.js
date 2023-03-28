const express=require('express')
const router=express.Router();
const {getAllProducts,getProductCompany,getSortedProducts}=require("../controllers/shop")
router.route("/getAllProducts").get(getAllProducts)
router.route("/getProductCompany").get(getProductCompany)
router.route("/getSortedProducts").get(getSortedProducts)
module.exports=router