import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "@/config/ChatLogics";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { useChatState } from "@/context/ChatProvider";
import { useEffect, useRef } from "react";

export default function ScrollableChat({messages}){
    const {user} = useChatState();
    const chatContainerRef = useRef(null);

    useEffect(() => {
      // Scroll to the bottom of the chat container when a new message appears
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);
    
      


    return(
        <div
        ref={chatContainerRef}
        style={{ maxHeight: "800px", overflowY: "auto" }}>
            <ScrollableFeed>
                {messages && messages.map((m, i) => (
                    <div className="flex" key={m._id}>
                         {(isSameSender(messages, m, i, user.data._id) ||
                            isLastMessage(messages, i, user.data._id)) && (
                            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                <Avatar
                                mt="7px"
                                mr={1}
                                size="sm"
                                cursor="pointer"
                                name={m.sender.name}
                                src={m.sender.pic}
                                />
                            </Tooltip>
                            )}


                            
                        <span
                            style={{
                                backgroundColor: `${
                                m.sender._id === user.data._id ? "#A2CBFE" : "#86EFAC"
                                }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                                marginTop: isSameUser(messages, m, i, user.data._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                            >
                            {m.content}
                        </span>
                            
                    </div>
                ))}
            </ScrollableFeed>
        </div>
    )
}