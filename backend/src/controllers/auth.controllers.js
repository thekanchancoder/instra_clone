
const userModel=require("../models/user.models")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function registerController (req,res){
   const {username,email,password,bio,profile_picture}=req.body

const isUserAlReadyExists=await userModel.findOne({
    $or:[{email},{username}]  // or operator use kiya h kyuki mujhe ek baar hi database ko call krna h baar baar nhi

})

if(isUserAlReadyExists){
    return res.status(409).json({
        message:"user already exists"+(isUserAlReadyExists.email===email?"  email already exists":" username already exists")
    })
}

const hash= await bcrypt.hash(password,10)

const User =await userModel.create({
    username,
    email,
    bio,
    profile_picture,
    password:hash
    
})



const token=jwt.sign({
    _id:User._id
},process.env.JWT_SECRET,{
    expiresIn:"1d"
})

const cookie=res.cookie("jwt_toket",token)


if (User) {
    return res.status(201).json({
        message:"user registered successfully",
        User:{
            username:User.username,
            email:User.email,
            profile_picture:User.profile_picture,
            bio:User.bio
            
        }
    
    })
}

}


async function loginController (req,res){
    const {username,password,email}=req.body

    const isUserAlReadyExists=await userModel.findOne({
        $or:[{email:email},{username:username}]
    })

    if(!isUserAlReadyExists){
        return res.status(404).json({
            message:"user not found"
        })
    }



    const isPasswordCorrect= await bcrypt.compare(password,isUserAlReadyExists.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"incorrect password"
        })
    }


    const token=jwt.sign({
        _id:isUserAlReadyExists._id
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    const cookie=res.cookie("jwt_toket",token)

   
        res.status(200).json({
            message:"user logged in successfully",
            User:{
                username:isUserAlReadyExists.username,
                email:isUserAlReadyExists.email,
                profile_picture:isUserAlReadyExists.profile_picture,
                bio:isUserAlReadyExists.bio
                
            }
        
        })
    
}

module.exports={
    registerController,
    loginController
}