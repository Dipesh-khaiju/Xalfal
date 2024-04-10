import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import {getReceiverSocketId,io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {

      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);

      
    }
    //    await conversation.save();
    
    //    await newMessage.save();
    
    await Promise.all([conversation.save(), newMessage.save()]); // both will run at same time
    // SOcket Io config will go here

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      //io.to() for a specific client
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }


    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in send message controller", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; // ccan  be used only after protecting route

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      model: "Message",
    }); // returns messages instead of ids only

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);

  } 
  
  catch (err) {
    console.log("Error in getMessage controller", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
