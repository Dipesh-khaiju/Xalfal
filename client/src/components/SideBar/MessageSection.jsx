import Conversations from "./Conversations";
import useGetConversations from "../../hooks/useGetConversations"
const MessageSection = ()=>{

const {loading,conversations} =  useGetConversations();
// console.log("hi",conversations);
    return (
        <div className="py-2 flex flex-col ">
       { conversations.map((conversation)=>(
            <Conversations 
            key={conversation._id}
            conversation={conversation}
             
            />
        ))}


           {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
            
        </div>
    )
}
export default MessageSection;