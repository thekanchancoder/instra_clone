const express=require("express")
const multer=require("multer") // ye express ko takt deta h file ko read krne ki 
const upload=multer({storage:multer.memoryStorage()})  // memory store esliye use kr rhe  h kyuki ye temprery storage h 
const PostRoutes=express.Router()

const postController=require("../controllers/post.controllers")
const identifyUser=require("../middlewares/auth.middlewares")

// /api/post/

PostRoutes.post("/",identifyUser,upload.single("image"),postController.createPostController)  // post bnayenge


PostRoutes.get("/",identifyUser,postController.getPostController)

/* 
GET /api/post/details/:postId
ye return kregi us user ki detail ko or ye bhi check kregi ki jis user ne request ki h bo bahi user h jisne post create ki h

*/
PostRoutes.get("/details/:postId",identifyUser,postController.getPostDetailsController)

module.exports=PostRoutes