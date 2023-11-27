"use client"
import ChatProvider from '@/context/ChatProvider';
import Image from 'next/image'
import Link from "next/link";
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo) {
      window.location.href = "/chats";
    }
  }, []);

  return (
    
      <div className="flex min-h-screen flex-col items-center p-10 m-auto">
        <h1 className='text-[40px] font-bold'>Chat App</h1>
        <br></br>
        <div className='flex flex-row h-[250px]'>
          <div className='flex flex-row w-[500px] gap-[20px] m-auto'>
            <br></br>
            <p className='text-[25px] font-bold'>This is my Chat App create an account and start chatting</p>
          </div>
          
          <div className='flex flex-col bg-indigo-200 w-[500px] justify-center gap-[20px]'>
            <div className='flex justify-center gap-[20px]'>
              <p className='text-[25px] font-bold'>Create an Account</p>
            </div>
            <div className='flex justify-center text-[25px] gap-[20px] text-center' >
              <Link href="/register" className='rounded-lg bg-indigo-300 w-[100px] h-[40px] text-center items-center'>Login</Link>
              <Link  href="/signin" className='rounded-lg bg-indigo-300 w-[140px] h-[40px] text-center items-center'>Sign in</Link>
            </div>
            
          </div>
        </div>
        
      </div>
    
  )
}