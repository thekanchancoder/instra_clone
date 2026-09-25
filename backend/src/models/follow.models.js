const mongoose=require("mongoose")

const followSchema=mongoose.Schema({
    following:{            // ese  
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user must follow someone"]
    },
    followers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user must be followed"]
    }
},{
    timestamps:true
})

const FollowModel=mongoose.model("Follow",followSchema)

module.exports=FollowModel

