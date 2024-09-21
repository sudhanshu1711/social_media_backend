import express from "express"
import { deleteUser, followUser, getUser, unfollowUser, updateUser } from "../Controllers/user.controllers.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = express.Router()

router.get('/:id',getUser)
router.patch("/update-account",verifyJWT, updateUser)
router.delete('/:id',deleteUser)
router.put("/:id/follow",followUser)
router.put("/:id/unfollow",unfollowUser)
export default router