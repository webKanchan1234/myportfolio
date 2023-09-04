const mongoose = require("mongoose")


const skillModel = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Please Enter skill"],
        unique:true
    },
    percentage:{
        type:String,
        required:[true,"Please Enter percentage"]
    }
})

module.exports = mongoose.model("Skill",skillModel)