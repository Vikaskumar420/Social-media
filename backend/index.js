import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRouter from "./src/routes/auth.routes.js"
import userRouter from "./src/routes/user.routes.js"
import postRouter from "./src/routes/post.routes.js"
import loopRouter from "./src/routes/loop.routes.js"
import storyRouter from "./src/routes/story.routes.js"
import messageRouter from "./src/routes/message.routes.js"
import { app, server } from "./socket.js"
dotenv.config()



const port = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/loop", loopRouter)
app.use("/api/story", storyRouter)
app.use("/api/message", messageRouter)


server.listen(port, () => {
  connectDB()
  console.log("server start on port: 3000");

})

