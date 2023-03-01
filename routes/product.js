const express=require('express')
const{getAllProducts,searchProducts,editProduct,updateProduct,updateImg}=require("../controllers/allProducts")
const {adminVerify,adminLogout}=require("../controllers/adminVerify")
const adminLoginVerify=require("../middleware/adminLogin")
const router=express.Router();
const {upload}=require("../middleware/imageUpload")
router.route('/adminVerify').post(adminVerify)
router.route("/adminLogout").post(adminLogout)
router.route('/adminProducts').get(adminLoginVerify,getAllProducts)
router.route('/adminProducts').post(adminLoginVerify,searchProducts)
router.route("/adminEditProduct").post(adminLoginVerify,editProduct);
router.route("/adminEditProduct").patch(adminLoginVerify,updateProduct)
router.route("/adminEditProductImg").patch(upload.array('image'),updateImg)
module.exports=router 