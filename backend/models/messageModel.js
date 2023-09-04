const mongoose=require("mongoose")

const messageModel = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    mobile:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your name"]
    },
    subject:{
        type:String,
        required:[true,"Please enter your subject"]
    },
    message:{
        type:String,
        required:[true,"Please enter your message"]
    }
})

module.exports = mongoose.model("Message",messageModel)