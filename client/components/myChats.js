"use client"
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, useToast , Text} from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider"
import { useEffect, useState } from "react"
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "@/config/ChatLogics";
import GroupChatModel from "./GroupChatModel";

export default function MyChats(){

    const[loggedUser, setLoggedUser] = useState();
    const {
        setSelectedChat,
        selectedChat,
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
        console.log(chats)
        fetchChats();
    }, []);

    return(
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                MyChats
                <GroupChatModel>
                    <Button
                    d="flex"
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon />}>
                        Group Chat
                    </Button>
                </GroupChatModel>
            </Box>

            <Box
                 d="flex"
                 flexDir="column"
                 p={3}
                 bg="#F8F8F8"
                 w="100%"
                 h="100%"
                 borderRadius="lg"
                 overflowY="hidden"
            >
                {chats ? (
                    <Stack
                        overflowY='scroll'
                    >
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id} 
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs">
                                        <b>{chat.latestMessage.sender.name} : </b>
                                        {chat.latestMessage.content.length > 50
                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                        : chat.latestMessage.content}
                                    </Text>
                                    )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}

            </Box>
        </Box>
    )
}