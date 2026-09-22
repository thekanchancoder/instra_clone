const mongoose=require("mongoose")
require("dotenv").config();

 async function coonectToDB(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connect To DB");
        
    })
 }

 module.exports=coonectToDB