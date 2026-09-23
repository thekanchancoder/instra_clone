const PostModel=require("../models/post.models")
const ImageKit =require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
   
    
})

async function createPostController(req,res){
console.log(req.body,req.file)

const file=await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),"file"), // ye code file ko server se imagekit {cloud storage provider} tk pahuchata h
    fileName:"test "
})
res.send(file)
}

module.exports={
    createPostController
}