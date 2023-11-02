"use client"
import Image from 'next/image'
import { useState } from 'react'
import io from 'socket.io-client'
import Link from "next/link";
import Chat from '@/components/chat';

const socket = io.connect("http://localhost:3001")

export default function Chats() {

  const[username, setUsername] = useState("")
  const[room, setRoom] = useState("")
  const[showChat, setShowChat] = useState(false)

  const joinRoom = () =>{
    if(username !== "" && room !== ""){
        socket.emit("join_room", room)
        setShowChat(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='flex gap-[50px] text-[25px]'>
        <h1 className='flex flex-row'>My ChatApp</h1>
        <Link href="/" className='rounded bg-blue-200 justify-center'>Home</Link>
      </div>
      
      {!showChat ? (
      <div className='flex flex-col'>
        <br></br>
        <h4 className='text-center text-[20px]'>Join A Chat</h4>
        <br></br>
        <input 
          type='text' 
          placeholder='John...' 
          onChange={(event) => {
              setUsername(event.target.value)
          }} 
          className='rounded-xl border-2 border-sky-500  placeholder:text-center'>
        </input>
        <br></br>
        <input 
          type='text' 
          placeholder='Room ID' 
          className='rounded-xl border-2 border-sky-500 placeholder:text-center' 
          onChange={(event) => {
              setRoom(event.target.value)
          }} >

        </input>
        <br></br>
        <button className='rounded-xl border-2 border-sky-200 bg-sky-200 font-bold' onClick={joinRoom}>Join a Room</button>
      </div>
      )
      :(
        <Chat socket={socket} username={username} room={room}/>
      )}
      

      

    </main>
  )
}
