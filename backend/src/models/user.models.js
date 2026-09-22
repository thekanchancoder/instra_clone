const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username is already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    bio:{
        type:String,
    },
    profile_picture:{
        type:String,
        default:"https://ik.imagekit.io/vewy0hjmjb/image.io.webp"
    },
})

const userModel=new mongoose.model("User",userSchema);

module.exports=userModel
