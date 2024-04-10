import {app,server,io} from "./socket/socket.js"
import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// https://xalfal-app.onrender.com hosted backend url
import mongoConnect from "./db/conn.js";


const port = process.env.PORT || 3000;

dotenv.config();

//middlewares
app.use(express.json()); // to parse icoming req from req.body
app.use(cookieParser()); // to access the cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.send("home page");
});


server.listen(port,()=>{
    mongoConnect();
    console.log(`Listening on port ${port}`)
})