import React,{useState,useEffect} from "react";
import SearchInput from "./SearchInput";
import MessageSection from "./MessageSection";
import { SlLogout } from "react-icons/sl";
import useLogout from "../../hooks/useLogout";
import useConversation from "../../zustand/useConversation";


const SideBar =() => {
    const {logout} = useLogout();
    const {selectedConversation} = useConversation();
    const [showSidebar,setShowSidebar] =useState(true);
    useEffect(()=>{
    setShowSidebar(!selectedConversation)
      
    },[selectedConversation])

    return (
        
        <div className={ `${showSidebar ? "block" : "hidden sm:block"} border-r border-slate-500 p-4 flex flex-col `}>
         
            <SearchInput  />
            <div className='divider px-3'></div> 
          
          <div className="overflow-auto max-h-[300px]">
            <MessageSection  />
           </div> 
          
            <div className='divider px-3'></div>

            <div  className="flex "> 
           
            <span className="text-white cursor-pointer "  >Log Out</span>
            < SlLogout  onClick={logout} className="cursor-pointer ml-2  text-white  " size={22} /> 
            </div>
        </div>
    )
}

export default SideBar;