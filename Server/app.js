import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
// require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"])
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const port = process.env.PORT || 3000

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected");
    
  }catch(err){
    console.log(err);
  }
}
app.use(cors({
  origin:["*", "http://localhost:5173"],
  credentials:true,
  optionsSuccessStatus:200
}))
app.use(cookieParser())
app.use(express.json())

// auth routes
app.use("/api/v1/auth", authRoutes)
// blog routes
app.use("/api/v1/blog", blogRoutes) 
// user routes
app.use("/api/v1/user", userRoutes)

connectDB().then(()=>{
  app.listen( port, ()=>{
    console.log(`Server is running in ${port}`);
  })
}).catch((error)=>{
  console.log(error);
})
