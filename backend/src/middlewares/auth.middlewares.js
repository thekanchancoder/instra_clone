
const jwt=require("jsonwebtoken")

async function identifyUser(req,res,next){
    const token=req.cookies.jwt_toket;
if(!token){
    return res.status(401).json({message:"unauthorised"})
}
let decoded=null

    try{
    decoded =jwt.verify(token,process.env.JWT_SECRET)
    } catch(error){
        return res.status(401).json({message:" token invalid"})
    }
req.user=decoded  // ese ham post ke controller m use kr skte h
next()
}

// ye function btata h ki jo user h vo authentication h ya nhi ese ham post ke controller m use kr skte h 
// yaaki ki ye esme hm token ki nikalte h or us token ka use krke  usee verify krte h 
module.exports=identifyUser