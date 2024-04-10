import React from 'react';
import {useAuthContext} from "../../context/AuthContext.jsx"
import useConversation from '../../zustand/useConversation';
import { formatTime } from '../../utils/formatTime.js';

const TextMessage = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} =useConversation();

  const fromMe = message.senderId === authUser._id;
  
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const formattedTime = formatTime(message.createdAt);

  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// console.log(message)

  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className='w-10 rounded-full'>
                <img className='' src={`${profilePic}`} />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className='chat-footer text-white  text-xs flex gap-1 items-venter '>
          {formattedTime}
        </div>

    </div>
  )
}

export default TextMessage