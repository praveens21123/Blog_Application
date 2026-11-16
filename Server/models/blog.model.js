import mongoose from "mongoose";

const Blog = mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  subTitle:{
    type:String
  },
  poster:{
    type:String,
    require: true
  },
  content:{
    type:String,
    require:true
  },
  ref:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  user:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
      require:true
    },
    name:{
      type:String,
      require:true
    }
  }
})
export default mongoose.model("blog", Blog)