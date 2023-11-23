import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-10 m-auto">
      <h1 className='text-[18px]'>Chat App</h1>
      <br></br>
      <Link href="/chat" className='rounded bg-gray-300 justify-center' >Chat</Link>
      <br></br>
      <div className='flex flex-row'>
        <div className='flex flex-row w-[500px] gap-[20px]'>
          <br></br>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloremque totam inventore! Aliquam id adipisci, dicta, numquam reprehenderit animi saepe minus amet veritatis, iusto odio laboriosam. Quae illum officiis necessitatibus.</p>
        </div>
        
        <div className='flex flex-col bg-gray-400 w-[500px] justify-center gap-[20px]'>
          <div className='flex justify-center gap-[20px]'>
            <p>Create a Account</p>
          </div>
          <div className='flex justify-center gap-[20px]' >
            <Link href="/register" className='rounded-none bg-gray-200 items-center'>Login</Link>
            <Link  href="/signup" className='rounded-none bg-gray-200 items-center'>Sign Up</Link>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}