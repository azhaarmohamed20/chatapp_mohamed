"use client"
import { useState, createContext, useContext, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log(user)
    if (!userInfo) {
      window.location.href = "/";
    }
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser}}>
      {user &&children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
    const { user } = useContext(ChatContext)
    return { user };
  };