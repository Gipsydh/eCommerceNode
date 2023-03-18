const express=require("express")
const router=express.Router();
const {oneProduct,addToCartDetails,addToCart,relatedProduct,getSingleProductCart}=require("../controllers/oneProductShop")
const {userLoginVerify}=require("../middleware/userLogin")
router.route('/oneProduct').get(oneProduct)
router.route("/addToCartDetails").get(userLoginVerify,addToCartDetails)
router.route('/addToCart').post(userLoginVerify,addToCart)
router.route("/getSingleProductCart").get(userLoginVerify,getSingleProductCart)
router.route('/relatedProduct').get(relatedProduct)
module.exports=router