const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto=require("crypto")

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"please enter your name"],
  },
  email: {
    type: String,
    required: [true,"Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true,"Please enter your password"],
    select: false,
  },
  image: {
    public_id: {
      type: String,
    //   required: true,
    },
    url: {
      type: String,
    //   required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userModel.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
})

userModel.methods.createToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}

userModel.methods.comparePassword =async function (password) {
  return await bcrypt.compare(password, this.password);
};

userModel.methods.getResetPasswordToken=function(){
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire=Date.now()+15*60*1000
  return resetToken
}

module.exports = mongoose.model("User",userModel);