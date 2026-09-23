const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
       default:""
    },
    img_url:{
        type:String,
        required:[true,"img_url is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user id is required"]
    }
})


const PostModel=mongoose.model("Post",postSchema)

module.exports=PostModel