const multer=require("multer")
console.log("multer")
let count=0;
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public/resources")
    },
    filename: (req,file,cb)=>{
       cb(null,`${req.query[0]+"."+count+".jpg"}`)
       if(count<5)
       count++;
       else count=0;
   }
})
const upload=multer({storage:storage})

module.exports={upload}