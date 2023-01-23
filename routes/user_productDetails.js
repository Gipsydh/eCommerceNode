const express=require("express")
const router=express.Router();
const {oneProduct,relatedProduct}=require("../controllers/oneProductShop")
router.route('/oneProduct').get(oneProduct)
router.route('/relatedProduct').get(relatedProduct)
module.exports=router