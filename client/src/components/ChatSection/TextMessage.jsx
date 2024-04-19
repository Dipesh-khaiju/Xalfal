import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx"
import useConversation from '../../zustand/useConversation';
import { formatTime } from '../../utils/formatTime.js';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations.js"
import { useSocketContext } from '../../context/socketContext.jsx';

const TextMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const senderId = message.senderId;
  const receiverId = message.receiverId;
  const fromMe = senderId === authUser._id;

  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const formattedTime = formatTime(message.createdAt);

  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const [seen, setSeen] = useState(message.seen);

  useEffect(() => {
    const lastMsgIsFromOtherUser = senderId !== authUser._id;
    if (lastMsgIsFromOtherUser && selectedConversation) {
      socket.emit("markMessageAsSeen", {
        conversationId: selectedConversation._id,
        sentId: receiverId
      });
    }
  }, [socket, message, selectedConversation, authUser._id, receiverId]);

  useEffect(() => {
    const handleMessagesSeen = ({ conversationId }) => {
      if (selectedConversation && selectedConversation._id === conversationId && message.senderId === authUser._id) {
        setSeen(true);
      }
    };
  
    socket.on("messagesSeen", handleMessagesSeen);
  
    return () => {
      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [socket, message, selectedConversation, authUser._id]);
  

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className='w-10 rounded-full'>
          <img className='' src={`${profilePic}`} alt="Profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white flex items-center justify-center ${bubbleBgColor}`}>
        {message.message} {fromMe ? <IoCheckmarkDoneOutline className={`ml-2 ${seen ? 'text-black' : 'text-white'}`} size={18}/> : "" }
      </div>
      <div className='chat-footer text-white  text-xs flex gap-1 items-venter '>
        {formattedTime}
      </div>
    </div>
  );
};

export default TextMessage;
