import express from "express"
import { createBlog, deleteBlog, editBlog, getAllBlogs, getbyTitle, getSingleBlog } from "../controllers/blog.controller.js"
import { authentication, restrict } from "../auth/verifyToken.js";

const routes = express.Router()

// Get Actions
// http://localhost:2000/api/v1/blog/getallblogs
routes.get("/getallblogs", getAllBlogs)
// http://localhost:2000/api/v1/blog/getsingleblog/{id}
routes.get("/getsingleblog/:id",  getSingleBlog)
// http://localhost:2000/api/v1/blog/getbytitle/{Title}
routes.get("/getbytitle/:title", getbyTitle)

// Post Actions
// http://localhost:2000/api/v1/blog/createblog
routes.post("/createblog", authentication, restrict(["user", "admin"]), createBlog)

// Edit Actions
// http://localhost:2000/api/v1/blog/editBlog/{id}
routes.put("/editBlog/:id", authentication, restrict(["user"]), editBlog)

// Delete Actions
// http://localhost:2000/api/v1/blog/deleteblog/{id} 
routes.delete("/deleteblog/:id", authentication, restrict(["user"]), deleteBlog)

export default routes;