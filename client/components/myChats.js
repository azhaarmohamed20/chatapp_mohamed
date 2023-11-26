"use client"
import { useToast } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider"
import { useState } from "react"

export default function MyChats(){

    const[loggedUser, setLoggedUser] = useState();
    const {
        setSelectedChat,
        user,
        chats,
        setChats,
      } = useChatState();

    const toast = useToast();

    const fetchChats = async () => {
        // console.log(user._id);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          const { data } = await axios.get("/api/chat", config);
          setChats(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the chats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      };

    return(
        <div>
            <h2>A Chat</h2>
        </div>
    )
}