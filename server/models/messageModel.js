import mongoose  from "mongoose";
 
const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",   // The id is gonna be from User collection
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",   // The id is gonna be from User collection
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true}); // timestamps fives created at and updated at

const Message = new mongoose.model("Message",messageSchema);

export default Message;