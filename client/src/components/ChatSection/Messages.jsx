import React, { useEffect, useRef } from 'react';
import TextMessage from './TextMessage.jsx';
import useGetMessages from '../../hooks/useGetMessages.js';
import {SkeletonTheme} from 'react-loading-skeleton';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import useListenMessages from '../../hooks/useListenMessages.js';

const Messages = () => {
  const { messages,loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
    },100)
  },[messages])
  
  return (
    <div className='px-4  relative flex-1 overflow-auto '>

      {!loading && messages.length > 0 && messages.map((message)=>(
        <div  key ={message._id} ref={lastMessageRef}>
        <TextMessage message={message} />
        </div>
      ))}

    {
      loading ?  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} width={130} />
    </p>
    <div className='absolute right-5 bottom-0 '>
    <p>
      <Skeleton  count={3} width={130}  />
    </p>
    </div>

    </SkeletonTheme> : ""
    }
    {
      !loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the Conversation</p>
      )
    }
   
    </div>
  )
}

export default Messages