import { app, server, io } from "./socket/socket.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";


import mongoConnect from "./db/conn.js";

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  // Include credentials (cookies, authorization headers, etc.) in the CORS request
  }));

app.use(express.json()); // to parse incoming req from req.body
app.use(cookieParser()); // to access the cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// Set the correct MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
      res.type("application/javascript");
  }
  next();
});

app.use(express.static(path.join(__dirname,"../client/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../","client","dist","index.html"))
})

app.get("/", (req, res) => {
  res.send("home page");
});

server.listen(port, () => {
  mongoConnect();
  console.log(`Listening on port ${port}`);
});
