const multer=require("multer")
console.log("multer")
let count=0;
let tempProd=""
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public/resources")
    },
    filename: (req,file,cb)=>{
        console.log("tempProd")
        if(tempProd!="" && tempProd!=req.query[0]){
            count=0;
        }
        if(count>=5){
            count=0;
        }
        if(count<5){
            
            console.log(count);
            cb(null,`${req.query[0]+"."+count+".jpg"}`)
            count++;
        }
        
        tempProd=req.query[0];
   }
})
const upload=multer({storage:storage})

module.exports={upload}