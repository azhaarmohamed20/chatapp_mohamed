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

  const joinRoom = () =>{
    if(username !== "" && room !== ""){
        socket.emit("join_room", room)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>My ChatApp</h1>
      <Link href="/" className='rounded bg-gray-300 justify-center'>Home</Link>
      <h4>Join A Chat</h4>
      <input 
        type='text' 
        placeholder='John...' 
        onChange={(event) => {
            setUsername(event.target.value)
        }} 
        className='border-solid border-2 border-sky-500'>
      </input>
      <br></br>
      <input 
        type='text' 
        placeholder='Room ID' 
        className='border-solid border-2 border-sky-500' 
        onChange={(event) => {
            setRoom(event.target.value)
        }} >

      </input>
      <br></br>
      <button className='border-solid border-2 border-sky-500' onClick={joinRoom}>Join a Room</button>

      <Chat socket={socket} username={username} room={room}/>

    </main>
  )
}
