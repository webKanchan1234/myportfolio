const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")

const Skill = t=require("../models/skillModel")


exports.createSkill = catchAsyncError(async(req,res,next)=>{
    const skill = await Skill.create(req.body)

    res.status(201).json({
        success:true,
        skill
    })
})

exports.allSkills = catchAsyncError(async(req,res,next)=>{
    const skills = await Skill.find()
    res.status(200).json({
        success:true,
        skills
    })
})

exports.getSingleSkill = catchAsyncError(async(req,res,next)=>{
    const skill = await Skill.findById(req.params.id)
    if(!skill){
        return next(new ErrorHandler(`Skill not found with this id: ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        skill
    })
})

exports.updateSkill = catchAsyncError(async(req,res,next)=>{
    let skill = await Skill.findById(req.params.id)
    if(!skill){
        return next(new ErrorHandler(`Skill not found with this id: ${req.params.id}`,400))
    }
    skill = await Skill.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        skill
    })
})


exports.deleteSkill = catchAsyncError(async(req,res,next)=>{
    const skill = await Skill.findById(req.params.id)
    if(!skill){
        return next(new ErrorHandler(`Skill not found with this id: ${req.params.id}`,400))
    }
    await Skill.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success:true,
        message:"Skill deleted successfully"
    })
})