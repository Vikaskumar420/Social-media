import express from "express"
import { logIn, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/sendOtp", sendOtp)
router.post("/verifyOtp", verifyOtp)
router.post("/resetPassword", resetPassword)
router.post("/logout", logOut)



export default router