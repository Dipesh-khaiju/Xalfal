import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast"

const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;

    const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation)
      setSearch("");
    }
    else{
      toast.error("No user Found");
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search"  value={search}
          onChange={(e) => setSearch(e.target.value)} />   
      </label>
      <button type="submit" className="btn btn-circle outline-none  ">
        <FcSearch className="outline-none" size={30}/>
      </button>
    </form>
  );
};

export default SearchInput;
