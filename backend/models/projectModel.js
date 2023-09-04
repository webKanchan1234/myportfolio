const mongoose=require("mongoose")

const projectModel = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter title"]
    },
    description:{
        type:String,
        required:[true,"Please enter description"]
    },
    github:{
        type:String,
        required:[true,"Please enter github Url"]
    },
    url:{
        type:String,
        required:[true,"Please enter live url link"]
    },
    image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
})

module.exports = mongoose.model("Project",projectModel)