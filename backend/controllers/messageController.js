const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")

const Message = require("../models/messageModel")


exports.createMessage = catchAsyncError(async(req,res,next)=>{
    const message = await Message.create(req.body)

    res.status(201).json({
        success:true,
        message
    })
})

exports.allmesssage = catchAsyncError(async(req,res,next)=>{
    const messages = await Message.find()
    res.status(200).json({
        success:true,
        messages
    })
})

exports.getSingleMessage = catchAsyncError(async(req,res,next)=>{
    const message = await Message.findById(req.params.id)
    if(!message){
        return next(new ErrorHandler(`Message not found with this id: ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        message
    })
})

exports.updateMessage = catchAsyncError(async(req,res,next)=>{
    let message = await Message.findById(req.params.id)
    if(!message){
        return next(new ErrorHandler(`Message not found with this id: ${req.params.id}`,400))
    }
    message = await Message.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message
    })
})


exports.deleteMessage = catchAsyncError(async(req,res,next)=>{
    const message = await Message.findById(req.params.id)
    if(!message){
        return next(new ErrorHandler(`Message not found with this id: ${req.params.id}`,400))
    }
    await Message.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success:true,
        message:"Message deleted successfully"
    })
})