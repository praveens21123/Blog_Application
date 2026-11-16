import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign({id:user._id, name:user.name},process.env.JWT_Secret_Code, {expiresIn:"5d"})
}

export const registration = async(req, res, next) => {
  const {name, email, phoneNumber, password, role} = req.body
  
  try{
    let user = await User.findOne({email:email})

    if(user){
     return res.status(400).json({message:"User already exist!", success:false})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
      name,
      email,
      phoneNumber,
      role,
      password:hashedPassword
    })
    await user.save()
    return res.status(200).json({message:"User registered successfully!", success:true})
  }catch(err){
     res.status(500).json({message:"Server Issue",success:false})
  }
}

export const login = async(req, res, next) => {
    const {email} = req.body

    try{
      let user = await User.findOne({email:email})

      if(!user){
        return res.status(400).json({message:"User not exists",success:false})
      }
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

      if(!isPasswordMatch){
        return res.status(400).json({message:"Invalid Password", success:false})
      }

      const token = generateToken(user)

      const {password, ...rest} = user._doc

      return res.status(200).json({message:"User logged-in successfully", success:true, data:{...rest}, token})

    }catch(err){
      return res.status(500).json({message:"Server Issue", success:false})
    }
}