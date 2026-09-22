const authController=require("../controllers/auth.controllers")
const express=require("express")

const authRouter=express.Router()

// /api/auth/register

authRouter.post("/register",authController.registerController)

// ++++++++ /api/auth/login

authRouter.post("/login",authController.loginController)

module.exports=authRouter