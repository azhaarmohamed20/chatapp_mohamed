"use client"
import SideDrawer from '@/components/SideDrawer';
import MyChats from '@/components/myChats';
import ChatBox from '@/components/ChatBox';
import Image from 'next/image'
import Link from "next/link";
import { useEffect } from 'react';
import { ChatState } from '@/context/ChatProvider';

const ChatsPage = () =>{
  
  const { user } = ChatState()

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-10 bg-sky-200">
       {user && <SideDrawer/>}
       <div>
        {user && <MyChats />}
        {user && <ChatBox />}

       </div>
    </div>
  )
}
export default ChatsPage;