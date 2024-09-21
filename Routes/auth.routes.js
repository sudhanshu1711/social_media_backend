import express from "express"
import { loginUser, logoutUser, registerUser } from "../Controllers/auth.controllers.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js"

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',verifyJWT,logoutUser)
export default router 