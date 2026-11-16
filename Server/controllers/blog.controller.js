import mongoose from "mongoose"
import blogModel from "../models/blog.model.js"
import userModel from "../models/user.model.js"


// http://localhost:2000/api/v1/blog/createblog  <== Post
export const createBlog = async(req, res, next) => {
  try{
    const {title, subTitle, poster, content, ref} = req.body

    const userId = req.userId
    const user = await userModel.findById(userId)
    
    if(!user){
      return res.status(401).json({message:"User not found", success:false})
    }

    let blog = new blogModel({
      title,
      subTitle,
      content,
      poster,
      user:{
        id:userId,
        name:user.name
      }
    })

    await blog.save()
    return res.status(200).json({message:"Blog Created successfully!", success:true})
    
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
} 

// http://localhost:2000/api/v1/blog/getallblogs  <== Get
export const getAllBlogs = async(req, res, next) => {
  try{
    const blogs = await blogModel.find()
    return res.status(200).json({message:"All blogs fetched!", data: blogs, success:true})
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}

// http://localhost:2000/api/v1/blog/getsingleblog/{id}  <== Get
export const getSingleBlog = async(req, res, next) => {
  try{
    const blogId = req.params.id

    // if(!mongoose.Types.ObjectId.isValid(blogId)){
    //   return res.status(401).json({message:"Invalid ID", success:false})
    // }
    const isExists = await blogModel.exists({_id: blogId})
    if(!isExists){
      return res.status(401).json({message:"Invalid ID", success:false})
    }
    const blog = await blogModel.find({_id:blogId})

    return res.status(200).json({message:"Single blog fetched!", blog:blog[0], success:true})
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}

// http://localhost:2000/api/v1/blog/getbytitle/{title}  <== Get
export const getbyTitle = async(req, res, next) => {
  try{
    const title = req.params.title 
    const blogs = await blogModel.find({title:title})
    
    if(blogs.length == 0){
      return res.status(401).json({message:"No Blogs from this title", success:false})
    }
    return res.status(200).json({message:"Single blog fetched!", blogs, success:true})
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}

// http://localhost:2000/api/v1/blog/editblog/{id}  <== Put
export const editBlog = async(req, res, next) => {
  try{
    const blogId = req.params.id
    // const {title, subTitle, content, poster} = req.body

    // if(!mongoose.Types.ObjectId.isValid(blogId)){

    // }
    const isExists = await blogModel.exists({_id:blogId})    
    if(!isExists){
      return res.status(401).json({message:"Invalid ID", success:false})
    }
    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, {$set:req.body}, {new:true})

    return res.status(200).json({message:"Blog Updated!", newBlog:updatedBlog, success:true})
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}

// http://localhost:2000/api/v1/blog/deleteblog/{id}  <== Delete
export const deleteBlog = async(req, res, next) => {
  try{
    const blogId = req.params.id
    const isExists = await blogModel.exists({_id:blogId})
    if(!isExists){
      return res.status(401).json({message:"Invalid ID", success:false})
    }
    await blogModel.findByIdAndDelete(blogId) 
    return res.status(200).json({message:"Blog Deleted!",success:true})
  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}

