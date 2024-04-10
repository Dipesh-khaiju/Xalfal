import {Server} from "socket.io"
import http from "http";
import express from "express";
import cors from "cors";

const app =express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]  
    }
})

export const getReceiverSocketId =(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap = {};
 
io.on('connection',(socket)=>{
    console.log("a user is conneected",socket.id);
    const userId = socket.handshake.query.userId;

    if(userId != 'undefined'){
        userSocketMap[userId] = socket.id;
    }

        //io.emit() is used to send event to all connected clients
        io.emit("getOnlineUsers",Object.keys(userSocketMap))

    //socket.on() is use d to listen to events and it can be used both on serevr and client side
    socket.on('disconnect',()=>{
        console.log("User Disconnected",socket.id);
       delete userSocketMap[userId];
       io.emit("getOnlineUsers",Object.keys(userSocketMap))

    });
})





export {app,io,server}