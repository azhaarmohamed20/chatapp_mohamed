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
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
    }

    useEffect(() =>{
        socket.on("receive_message", (data)=>{
            setMessageList((list) => [...list, data])
        })
    }, [socket])

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
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}