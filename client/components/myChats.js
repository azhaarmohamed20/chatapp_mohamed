"use client"
import { useToast } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider"
import { useEffect, useState } from "react"
import axios from "axios";

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
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
            },
          };
          const { data } = await axios.get(`http://localhost:5000/api/chat`, config);
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

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, []);

    return(
        <div>
            <h2>A Chat</h2>
        </div>
    )
}