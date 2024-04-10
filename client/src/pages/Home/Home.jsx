import React from 'react';
import SideBar from "../../components/SideBar/SideBar";
import ChatSection from '../../components/ChatSection/ChatSection';


const Home = () => {
  return (
    <div className="flex  sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-0 ">
      <SideBar  />
      <ChatSection  />
    
    </div>
  )
}

export default Home