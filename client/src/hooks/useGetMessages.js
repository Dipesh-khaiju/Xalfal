import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios"; // Import axios

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://xalfal-app.onrender.com/api/messages/${selectedConversation._id}`);
                const data = res.data;

                if (data.error) {
                    throw new Error(data.error);
                }
                await setMessages(data);
            } catch (e) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
