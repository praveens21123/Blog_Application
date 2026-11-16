import mongoose from "mongoose";

const User = mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  phoneNumber:{
    type:Number,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    enum:["user","admin", "manager"],
    default:"user"
  }
})

export default mongoose.model("user", User)