import express from "express"
import { deleteUser, editUser, getAllUsers, getProfile } from "../controllers/user.controller.js"
import { authentication, restrict } from "../auth/verifyToken.js"

const routes = express.Router()

routes.get("/getallusers", authentication, restrict(["admin"]), getAllUsers)

routes.put("/edituser/:id", authentication, restrict(["user"]), editUser)

routes.get("/getprofile", authentication, restrict(["user", "admin"]), getProfile)

routes.delete("/deleteuser/:id", authentication, restrict(["admin"]), deleteUser)

export default routes;