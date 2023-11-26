"use client"
import SideDrawer from '@/components/SideDrawer';
import MyChats from '@/components/myChats';
import ChatBox from '@/components/ChatBox';
import { ChatProvider, useChatState } from '@/context/ChatProvider';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import { useState } from 'react';

const ChatsPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
  
    <ChatProvider>
      <ChakraProvider>
        <div className="flex flex-col bg-sky-200">
          <CSSReset />
          <SideDrawer />
          <div className='flex justify-between w-full h-[91.5vh] p-[10px]'>
            <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        </div>
      </ChakraProvider>
    </ChatProvider>
  
  );
};

export default ChatsPage;