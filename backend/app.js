const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const user = require("./routes/userRoute")
const skill = require("./routes/skillRoute")
const project = require("./routes/projectRoute")
const message = require("./routes/messageRoute")
const errorMiddleware = require("./middleware/error")
const cookieParser=require("cookie-parser")
const fileUpload = require("express-fileupload")
const cors=require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use("*",cors({
    origin:true,
    credentials:true
}))



app.use("/api/v1/users",user)
app.use("/api/v1/skills",skill)
app.use("/api/v1/projects",project)
app.use("/api/v1/messages",message)
app.use(errorMiddleware)


module.exports = app

// bMq2WEsJQHP604DQ