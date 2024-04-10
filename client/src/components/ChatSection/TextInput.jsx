import {BsSend} from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const TextInput = () => {
  const [message,setMessage] = useState();
const {sendMessage,loading} = useSendMessage();
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!message) return; // if message is empty donot run the function

    await sendMessage(message);
    setMessage("");

  }
  return (
    <form onSubmit={handleSubmit} className="px-4 my-3  ">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-3 bg-[#1b1b1b] border-gray-600 text-white"
          placeholder="Enter Message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
            {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};
export default TextInput;
