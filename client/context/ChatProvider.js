"use client"
import { useState, createContext, useContext, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    
    if (!userInfo) {
      window.location.href = "/";
    }
  }, []);

  return (
    <ChatContext.Provider value={{  selectedChat,
      setSelectedChat,
      user,
      setUser,
      notification,
      setNotification,
      chats,
      setChats,}}>
      {user && children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
    const { user } = useContext(ChatContext)
    return { user };
  };