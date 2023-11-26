"use client"
import { Box } from "@chakra-ui/react";
import { useChatState } from "../context/ChatProvider";
export default function ChatBox() {
    const { user, selectedChat, socket, onlineUsers } = useChatState();

    return (
        <Box
        d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
        >
            Single Chat
        </Box>
    );
}