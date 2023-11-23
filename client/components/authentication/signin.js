"use client"

import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';

export default function SignIn(){
    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
   
    const handleClick = () => setShowPassword(!showPassword)
    const submitHandler=()=> {}

    return(  
    <div className="flex min-h-screen flex-col items-center p-10 bg-sky-200">
        <div className='flex text-center bg-white w-full h-[100px] rounded-lg border-[1px]'>
            <h1 className='w-full mt-[40px] mb-[15px] font-bold'>ChatApp</h1>
        </div>
        <br></br>
        <div className='flex flex-col p-10 bg-white w-full h-full rounded-lg border-[1px]' >
            <form className='flex flex-col'>
                
                <label>Name</label>
                <input 
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Enter your name'
                onChange={(e) => setName(e.target.value)}
                required
                ></input>

                <label>Email</label>
                <input 
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                required
                ></input>


                <label>Password</label>
                <input 
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Enter your Password'
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword?'text':'password'}
                required
                ></input>
                <label
                onClick={handleClick}
                class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer text-center " for="toggle">{showPassword?'hide':'show'}</label>
                <br></br>


                
            
                
                <button 
                className='mt-[15px] w-full bg-blue-200'
                oncClick={submitHandler}
                >Submit</button>
            </form>
            

            <p className="text-[12px]">Dont have an account</p>
            <Link className="text-[12px]" href="/register">Register</Link>
        </div>
    </div>
    )

}