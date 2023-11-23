import Image from 'next/image'
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center p-10">
       <div className='flex flex-col gap-4 justify-center items-center m-auto w-[500px] h-[500px] bg-blue-100 rounded-[50px]'>            
            <h1 className='font-bold'>Register form</h1>    
            <div className=' flex items-center' >
                <form action="/register" method='POST'>
                    <div  className='flex items-center'>
                        <label className='p-[15px] font-bold' for="email-reg" class="form-label">Email</label>
                        <input className='border-solid border-2 border-black' type="text" id="email-reg" name="email"/>                        
                    </div>
                    <div  className='flex items-center'>
                        <label className='p-[15px] font-bold' for="password-reg" class="form-label">Password</label>
                        <input className='border-solid border-2 border-black'  type="password" id="password-reg" name="password"/>
                    </div>
                

                    <button className='bg-black rounded-full w-[100px] text-white' type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}