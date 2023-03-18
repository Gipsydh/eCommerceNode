const express=require('express')
const{getProductsHome,searchProduct}=require("../controllers/homepage")
const router=express.Router();
router.route('/products').get(getProductsHome)
router.route("/searchProduct").get(searchProduct)


module.exports=router

