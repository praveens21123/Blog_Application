import mongoose from "mongoose"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"

export const getAllUsers = async(req, res, next) => {
    try{
      const users = await userModel.find().select("-password")

      if(!users){
        return res.status(400).json({message:"User not found!", success:false})
      }
      
      return res.status(200).json({message:"Users got successfully!", success:true, users})
    }catch(err){
      return res.status(500).json({message:"Server Issue", success:false})
    }
}

export const editUser = async(req, res, next) => {
    const userId = req.params.id

    try{
      const {name, email, password, phoneNumber} = req.body
      let user = await userModel.findById(userId)

      if(!user){
        return res.status(400).json({message:"Users not found!", success:false})
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const data = {name, email, hashedPassword, phoneNumber}

      const updatedUser = await userModel.findByIdAndUpdate(userId, {$set:data}, {new:true})

      const {password:updatedPassword, ...rest} = updatedUser._doc

      return res.status(200).json({message:"User Edited Successfully", user:{...rest}, success:true})
    }catch(err){
      return res.status(500).json({message:"Server Issue", success:false})
    }
}

export const getProfile = async(req, res, next) => {
  const userId = req.userId

  try{
    // Checks all models
    // if(!mongoose.Types.ObjectId.isValid(userId)){
    //   return res.status(400).json({message:"Invalid ID", success:false})
    // }

    // Checks only userModel
    const isExists = await userModel.exists({_id:userId})    
    if(!isExists){
      return res.status(401).json({message:"Invalid ID", success:false})
    }
    const user = await userModel.findById(userId).select("-password")
    
    return res.status(200).json({message:"Profile Fetched Successfully", user, success:true})

  }catch(err){
    return res.status(500).json({message:"Server Issue", success:false})
  }
}


export const deleteUser = async(req, res, next) => {
    const userId = req.params.id

    try{
      if(!userId){
        return res.status(400).json({message:"UserID is Invalid", success:false})
      }
      await userModel.findByIdAndDelete(userId)
      return res.status(200).json({message:"User Deleted successfully!", success:true})
    }catch(err){
      return res.status(500).json({message:"Server Issue", success:false})
    }
}