import useConversation from "../../zustand/useConversation";
import {useSocketContext} from "../../context/socketContext"



const Conversations = ({conversation}) => {
  const {selectedConversation,setSelectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

  const isSelected = selectedConversation?._id === conversation.id
   return (
    <>
      <div onClick={()=>setSelectedConversation(conversation)} className="flex gap-2 items-center  hover:bg-gradient-to-b from-[#7c7c7c] to-[#505050] rounded p-2 py-1 cursor-pointer">
        <div className={`avatar ${isOnline ? 'online'  : " "}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </div>
        <div className="flex mx-2 flex-col flex-1">
            <div>
                <p className="text-white">
                    {conversation.fullname}
                </p>
            </div>
        </div>
      </div>
    </>
  );
};
export default Conversations;
