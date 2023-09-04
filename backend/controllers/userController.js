const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary=require("cloudinary")
// const nodeMailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
// const sendmail = require('sendmail')();
// const { google } = require("googleapis");
// const CLIENT_ID =
//   "576194792614-ismce6butoksjbrtpi0fucq38gi57la8.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_UI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//041HtRPjX0-gXCgYIARAAGAQSNwF-L9IryC_2sLV4wJIReznEO2qn6Xh68yuenWawTb2yYK43GoMYJExHHa1KGejh4IO6I5GmQ88";

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_UI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//creat new user
exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
    folder:"portfolio"
  })
  // console.log(name,email,password)
  const user = await User.create({ name, email, password, role,
    image:{
      public_id:"public id",
      url:"url"
    }
   });
  sendToken(user, 201, res);
});

// get user by id
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not exist", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// get all users
exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("Users not exist", 404));
  }
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    user,
  });
});

//update user
exports.updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("Users not exist", 404));
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("Users not exist", 404));
  }
  await User.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

//sign in
exports.signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  sendToken(user, 200, res);
});

//logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const resetToken = await user.getResetPasswordToken();
  // console.log(resetToken)
  await user.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${url} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


exports.updatePassword=catchAsyncError(async(req,res,next)=>{
  // console.log(req.user)
  const user=await User.findById(req.user._id).select("+password")
  const isPasswordMatch=await user.comparePassword(req.body.oldPassword)
  if(!isPasswordMatch){
    return next(new ErrorHandler("Old password is incorrect",400))
  }
  if(req.body.newPassword!==req.body.confirmPassword){
    return next(new ErrorHandler("Password doesn't match"))
  }
  user.password=req.body.newPassword
  await user.save()
  sendToken(user,200,res)
})