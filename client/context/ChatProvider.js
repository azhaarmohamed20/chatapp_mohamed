"use client"
import { useState } from 'react';
const { createContext, useContext, useEffect} = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        if (!userInfo){
            window.location.href = "/";
        }
      }, []);
    
    return (
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}




export default ChatProvider;