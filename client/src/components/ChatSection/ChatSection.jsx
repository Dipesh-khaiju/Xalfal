import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import TextInput from "./TextInput";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

const ChatSection = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const HeaderProfile = selectedConversation?.profilePic;
  const isSmallScreen = useMediaQuery({ maxWidth: 640 }); // Change the value as needed

  useEffect(() => {
    setIsChatVisible(!!selectedConversation);
  }, [selectedConversation]);

  const handleBackClick = () => {
    setSelectedConversation(null);
  };

  return (
    <>
      <div className={`md:min-w-[500px] min-w-[340px] md:max-w-[550px] max-h-[550px] min-h-[450px] flex flex-col`}>
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="bg-[#1b1b1b] flex px-4 py-2 items-center rounded mx-1 mb-2">
              <RiArrowGoBackFill
                className="cursor-pointer mr-2 "
                size={25}
                onClick={handleBackClick}
              />

              <div className="w-10 rounded-full mx-2">
                <img className="" src={`${HeaderProfile}`} alt="Profile" />
              </div>
              <span className="text-white text-2xl font-bold">
                {selectedConversation.fullname}
              </span>
            </div>
            {isChatVisible && (
              <>
                <Messages />
                <TextInput />
              </>
            )}
          </>
        ) : (
          !isSmallScreen && <NoChatSelected authUser={authUser} />
        )}
      </div>
    </>
  );
};

export default ChatSection;

const NoChatSelected = ({ authUser }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full `}>
      <div className="px-4 text-center  text-gray-200  flex flex-col items-center gap-2">
        <p className="sm:text-xl md:text-3xl">Welcome to Xalfal 🙋‍♂️ </p>
        <span>
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">
              {authUser.username}
            </h1>
            <h1
              className="absolute top-0 left-0 text-4xl md:text-6xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 text-shadow-lg"
              style={{
                textShadow:
                  "0 0 10px #a6a6a6, 0 0 20px #a6a6a6, 0 0 30px #a6a6a6, 0 0 40px #a6a6a6",
              }}
            >
              {authUser.username}
            </h1>
          </div>
        </span>
        <p className="sm:text-md md:text-xl">
          Select a chat to start messaging.
        </p>
      </div>
    </div>
  );
};
