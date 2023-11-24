"use client"
import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

export default function Registration(){

    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [pic, setPic] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    

    const handleClick = () => setShowPassword(!showPassword)

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setPic(file);
      };
      async function registerUser(event) {
        event.preventDefault();
        if (!name || !email || !password || !confirmpassword) {
          setErrorMessage('Please enter all fields');
          setLoading(false);
          return;
        }
        if(password !== confirmpassword){
          setErrorMessage('Passwords do not match');
          setLoading(false)
          return
        }
        try {
          const response = await axios.post('http://localhost:5000/api/user', {
            name,
            email,
            password,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = response.data;
          localStorage.setItem("userInfo", JSON.stringify(response));

          console.log('Registration Successful:', data);
          
          // Reset form fields
          setName('');
          setEmail('');
          setPassword('');
          window.location.href = '/chats';
        } catch (error) {
          console.error('Error Occurred:', error.message);
        }
      }

    return(
    <div className="flex min-h-screen flex-col items-center p-10 bg-sky-200">
        <div className='flex text-center bg-white w-full h-[100px] rounded-lg border-[1px]'>
            <h1 className='w-full mt-[40px] mb-[15px] font-bold'>ChatApp</h1>
        </div>
        <br></br>
        <div className='flex flex-col p-10 bg-white w-full h-full rounded-lg border-[1px]' >

            <form className='flex flex-col' onSubmit={registerUser}>
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
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer text-center " htmlFor="toggle">{showPassword?'hide':'show'}</label>
                <br></br>


                <label>Confirm Password</label>
                <input 
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Confirm your Password'
                onChange={(e) => setConfirmpassword(e.target.value)}
                type={showPassword?'text':'password'}
                required
                ></input>
                <label
                onClick={handleClick}
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer text-center " htmlFor="toggle">{showPassword?'hide':'show'}</label>
                <br></br>
            
                <label>Profile Picture</label>
                <input 
                type='file'
                accept='image/*'
                className='border-solid border-black border-[2px] text-center' 
                placeholder='Confirm your Password'
                onChange={handleFileUpload}
                ></input>

                <button 
                className='mt-[15px] w-full bg-blue-200'
                type='submit'
                disabled={loading}
                >Submit</button>

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

            <br></br>
            <p className="text-[12px]">Already have a account Sign In</p>
            <Link className="text-[12px]" href="/signin">Sign In</Link>
        </div>
    </div>
    )

}