const app = require("./app")
const dotenv = require("dotenv")
const DbConnection = require("./config/database.js")
const cloudinary=require("cloudinary")
//handling uncaught exception
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to handling uncaught exception")
    process.exit(1)
})


dotenv.config({ path: "backend/config/config.env" })

DbConnection();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, 
  });
const server=app.listen(process.env.PORT,()=>{
    console.log((`server is running on ${process.env.PORT}`));
})

//unhandle dRejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandledRejection")

    server.close(()=>{
        process.exit(1)
    })
})