"use client"
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import { getSenderFull, getSender } from "@/config/ChatLogics";
import ProfileModel from "./ProfileModel";
export default function SingleChat({fetchAgain, setFetchAgain}) {
    const { user, selectedChat, socket, onlineUsers } = useChatState();

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
                  h="93%"
                  borderRadius="lg"
                  overflowY="hidden">
                    {/* {Messages here} */}
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