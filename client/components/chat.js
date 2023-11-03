"use client"
import React, { useEffect, useState } from "react";

export default function Chat({socket, username, room}){
    const[currentMessage, setCurrentMessage] = useState("");
    const[messageList, setMessageList] = useState([]);

    const sendMessage = async () =>{
        if(currentMessage !== ""){
            const messageData= {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                    new Date(Date.now()).getHours() + 
                    ":" +
                    new Date(Date.now()).getMinutes(),
                id: Date.now(),
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            if (!messageList.some((message) => message.id === data.id)) {
                setMessageList((prevList) => [...prevList, data]);
            }
        };
    
        socket.on("receive_message", handleReceiveMessage);
    
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [messageList]);

    return(
        <div>
            <div >
                <br></br>
                <p className="border-solid border-2 border-black">Live Chat</p>
                <br></br>
            </div>
            <div className="flex flex-col ">
                {messageList.map((messageContent) =>{
                    return( 
                    <div id={username===messageContent.author ? "you" : "other"}> 
                        <div>
                            <div class="message-content" className="message-content"> 
                                <p>{messageContent.message}</p>
                            </div>
                            <div class="message-meta" className=" flex flex-row gap-[5px] text-[12px]">
                                <p >{messageContent.time}</p>
                                <p >{messageContent.author}</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Hey..."
                    onChange={(event) =>{
                        setCurrentMessage(event.target.value)
                    }}
                    onKeyDown={(event) =>{
                        event.key === "Enter" && sendMessage()
                    }}
                    className="w-[210px] h-[40px] m-[7px] border-solid border-[2px] p-[5px] text-[16px]"
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}