const express=require("express")
const multer=require("multer") // ye express ko takt deta h file ko read krne ki 
const upload=multer({storage:multer.memoryStorage()})  // memory store esliye use kr rhe  h kyuki ye temprery storage h 
const PostRoutes=express.Router()

const postController=require("../controllers/post.controllers")

// /api/post/

PostRoutes.post("/",upload.single("image"),postController.createPostController)  // post bnayenge


module.exports=PostRoutes