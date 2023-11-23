"use client"
import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';

export default function Login(){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [pic, setPic] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () => setShowPassword(!showPassword)

    const postDetails = (pics) => {}

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


                <label>Confirm Password</label>
                <input 
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Confirm your Password'
                onChange={(e) => setConfirmpassword(e.target.value)}
                type='password'
                required
                
                ></input>
                <label
                onClick={handleClick}
                class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer text-center " for="toggle">{showPassword?'hide':'show'}</label>
                <br></br>
            
                <label>Profile Picture</label>
                <input 
                type='file'
                accept='image/*'
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Confirm your Password'
                onChange={(e) => postDetails(e.target.files[0])}
                required
                ></input>

                <button 
                className='mt-[15px] w-full bg-blue-200'
                oncClick={submitHandler}
                >Submit</button>
            </form>

            <br></br>
            <p className="text-[12px]">Already have a account Sign In</p>
            <Link className="text-[12px]" href="/signin">Sign In</Link>
        </div>
    </div>
    )

}