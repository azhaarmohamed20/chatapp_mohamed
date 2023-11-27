"use client"
import { Box, FormControl, IconButton, Spinner, Text , Input, useToast} from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider";
import { ArrowBackIcon, TriangleDownIcon } from "@chakra-ui/icons";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import { getSenderFull, getSender } from "@/config/ChatLogics";
import ProfileModel from "./ProfileModel";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";


export default function SingleChat({fetchAgain, setFetchAgain}) {
    const { user, selectedChat, socket, onlineUsers } = useChatState();

    const[messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const toast = useToast();

    const sendMessage = async (event) => {
        if(event.key === "Enter" && newMessage) {

            try {
                
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.data.token}`,
                    },
                };


                const {data} = await axios.post('http://localhost:5000/api/message', {
                    content: newMessage ,   
                    chatId: selectedChat._id,
                }, 
                config
                )
            
                console.log(data)
                setNewMessage("")
                setMessages([...messages, data])

            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
            }

        }
    }

    const fetchMessages = async () => {
        if(!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            };
            
            setLoading(true)

            const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config)
            console.log(messages)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [selectedChat])

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }


    return (
        <>
        { selectedChat ? (
            <>
                <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                d="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center"
                >
                    <IconButton
                    d={{base: "flex", md: "none"}}
                    icon={<ArrowBackIcon/>}
                    onClick={() => setSelectedChat("")}
                    />
                            {!selectedChat.isGroupChat ? (
                                <>
                                {getSender(user, selectedChat.users)}

                                <ProfileModel user={getSenderFull(user, selectedChat.users)}/>
                                </>
                            ):(
                                <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModel 
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                                </>
                            )}
                </Text>
                <Box
                  d="flex"
                  flexDir="column"
                  justifyContent="flex-end"
                  p={3}
                  bg="#E8E8E8"
                  w="auto"
                  h="auto"
                  borderRadius="lg"
                  overflowY="hidden">
                    { loading ? (
                        <Spinner
                        size="xl"
                        w={20}
                        h={20}
                        alignSelf="center"
                        margin="auto"
                        />
                    ) : (
                        <div className="flex flex-col overflow-y-scroll scrollbar-widht-none">
                            <ScrollableChat messages = {messages} />
                        </div>
                    )}

                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input
                         variant="filled"
                         bg="#E0E0E0"
                         placeholder="Enter a message.."
                         value={newMessage}
                         onChange={typingHandler}
                        />


                    </FormControl>
                </Box>
            </>
        ): (
            <Box d="flex" alignItems="center" justifyContent="center" h="auto" textAlign={"center"} m={"auto"}>
                <Text fontSize="3xl" pb={3}>Click on a User to start chatting</Text>
            </Box>
        )}
        </>
    );
}