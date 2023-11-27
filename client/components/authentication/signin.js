"use client"

import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

export default function SignIn(){
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
   
    const handleClick = () => setShowPassword(!showPassword)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage('Please enter an email and password');
            setLoading(false);
            return;
          }
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password,
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

          console.log('Signing in with email:', email, 'and password:', password);
          localStorage.setItem("userInfo", JSON.stringify(response));
          // Reset form fields
          window.location.href = '/chats';
        } catch (error) {
          console.error('Error Occurred:', error.message);
        }
      };

    return(  
    <div className="flex min-h-screen flex-col items-center p-10 bg-sky-200">
        <div className='flex text-center bg-white w-full h-[100px] rounded-lg border-[1px]'>
            <h1 className='w-full mt-[40px] mb-[15px] font-bold'>ChatApp</h1>
        </div>
        <br></br>
        <div className='flex flex-col p-10 bg-white w-full h-full rounded-lg border-[1px]' >
            <form className='flex flex-col' onSubmit={handleSubmit}>
                

                <label>Email</label>
                <input 
                value={email}
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                required
                ></input>


                <label>Password</label>
                <input 
                value={password}
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
                type='submit'
                >Submit</button>

                <button 
                className='mt-[15px] w-full bg-red-200'
                onClick={(e) =>{
                    e.preventDefault()
                    setEmail("guest@example.com")
                    setPassword("123456")
                }}
                >Get Guest User Credentials</button>

                {errorMessage && (
                        <div className="fixed bottom-0 right-0 p-4 m-4 max-w-sm bg-red-500 text-white rounded">
                        <p>{errorMessage}</p>
                        </div>
                    )}
                {successMessage && (
                        <div className="fixed bottom-0 right-0 p-4 m-4 max-w-sm bg-green-500 text-white rounded">
                        <p>{successMessage}</p>
                        </div>
                    )}
            </form>
            

            <p className="text-[12px]">Dont have an account</p>
            <Link className="text-[12px]" href="/register">Register</Link>
        </div>
    </div>
    )

}