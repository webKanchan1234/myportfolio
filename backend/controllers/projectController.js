const catchAsyncError = require("../middleware/catchAsyncError")
const Project = require("../models/projectModel")
const ErrorHandler = require("../utils/errorHandler")
const cloudinary = require("cloudinary")


exports.createProject=catchAsyncError(async(req,res,next)=>{
    const {title,description,github,url}=req.body
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"portfolio/projects"
      })

    const project = await Project.create({
        title,
        description,
        github,
        url,
        image:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
    res.status(201).json({
        success:true,
        project
    })
})

exports.allProjects=catchAsyncError(async(req,res,next)=>{
    
    const projects = await Project.find()
    res.status(201).json({
        success:true,
        projects
    })
})

exports.singleProject=catchAsyncError(async(req,res,next)=>{
    const project = await Project.findById(req.params.id)
    if(!project){
        return next(new ErrorHandler(`Project not found with this id: ${req.params.id}`))
    }
    res.status(201).json({
        success:true,
        project
    })
})


exports.updateProject=catchAsyncError(async(req,res,next)=>{
    let project = await Project.findById(req.params.id)
    if(!project){
        return next(new ErrorHandler(`Project not found with this id: ${req.params.id}`))
    }
    project = await Project.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({
        success:true,
        project
    })
})

exports.deleteProject=catchAsyncError(async(req,res,next)=>{
    const project = await Project.findById(req.params.id)
    if(!project){
        return next(new ErrorHandler(`Project not found with this id: ${req.params.id}`))
    }
    await Project.findByIdAndRemove(req.params.id)
    res.status(201).json({
        success:true,
        message:"Project deleted successfully"
    })
})
