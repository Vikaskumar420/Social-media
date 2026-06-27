import express from "express"
import { logIn, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/sendOtp", sendOtp)
router.post("/verifyOtp", verifyOtp)
router.post("/resetPassword", resetPassword)
router.get("/logout", logOut)



export default router