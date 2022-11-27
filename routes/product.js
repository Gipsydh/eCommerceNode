const express=require('express')
const{getAllProducts,searchProducts,editProduct,updateProduct,updateImg}=require("../controllers/allProducts")
const router=express.Router();
const {upload}=require("../middleware/imageUpload")
router.route('/adminProducts').get(getAllProducts)
router.route('/adminProducts').post(searchProducts)
router.route("/adminEditProduct").post(editProduct);
router.route("/adminEditProduct").patch(updateProduct)
router.route("/adminEditProductImg").post(upload.single('image'),updateImg)
module.exports=router 