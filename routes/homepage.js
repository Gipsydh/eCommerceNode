const express=require('express')
const{getProductsHome}=require("../controllers/homepage")
const router=express.Router();
router.route('/products').get(getProductsHome)



module.exports=router

