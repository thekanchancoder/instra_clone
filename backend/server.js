require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const app=require("./src/app")
const coonectToDB=require("./src/config/database")
coonectToDB()


app.listen(3000,()=>{
    console.log("server is running on port number 3000");
    
})
