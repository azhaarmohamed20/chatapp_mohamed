"use client"
import { Box } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider";
import SingleChat from "./SingeChat";
export default function ChatBox({fetchAgain, setFetchAgain}) {
    const { user, selectedChat, socket, onlineUsers } = useChatState();

    return (
        <Box
        d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        textAlign={"center"}
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </Box>
    );
}