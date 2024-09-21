import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/app.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authroute from "./Routes/auth.routes.js"
import userroute from "./Routes/user.routes.js"
import postroute from "./Routes/post.routes.js"

const app=express()

app.use(express.json({limit:'30GB',extended:true}))
app.use(express.urlencoded({limit:'30GB',extended:true}))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!! ", err);
})

app.use('/api/v1/auth',authroute)
app.use('/api/v1/user',userroute)
app.use('/api/v1/post',postroute)