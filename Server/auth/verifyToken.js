import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

export const authentication = (req, res, next) => {
    const authToken = req.headers.authorization  //"Bearer bxbvvjbdjvjddjbkjdbkbd"

    if(!authToken || !authToken.startsWith("Bearer")){
      return res.status(401).json({message:"Authentication Failed!", success:false})
    }

    try{
      const token = authToken.split(" ")[1] // bxbvvjbdjvjddjbkjdbkbd
      const decoded = jwt.verify(token, process.env.JWT_Secret_Code)
      console.log(decoded);
      
      if(!decoded){
        return res.status(401).json({message:"Invalid Token", success:false})
      }
      req.userId = decoded.id
      next()
    }catch(err){
     return res.status(500).json({message:"Server Issue",success:false})
    }
    
}

export const restrict = (roles) =>  async(req, res, next) => {
  try{
    const userId = req.userId
    const user = await userModel.findById(userId)

    if(!user){
      return res.status(401).json({message:"User Not Found!", success:false})
    }
    const userRole = user.role

    if(userRole == "user" && roles.includes("user")){
      next()
    }else if(userRole == "admin" && roles.includes("admin")){
      next()
    } else{
      return res.status(401).json({message:"You don't have access for this route!", success:false})
    }
  }catch(err){
     res.status(500).json({message:"Server Issue",success:false})
  }

}
