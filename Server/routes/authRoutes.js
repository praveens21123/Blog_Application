import express from "express";
import { login, registration } from "../controllers/auth.controller.js";

const route = express.Router()

// http://localhost:2000/api/v1/auth/register
route.post("/register", registration)
// http://localhost:2000/api/v1/auth/login
route.post("/login", login)

export default route