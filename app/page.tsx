'use client'
import Image from "next/image";
import { PrismaClient } from '@prisma/client';
import { useRef, useState, useTransition } from "react";
import Server from "./server";
import { log } from "console";
import { useRouter } from 'next/navigation'
import { Stats } from "fs";

const prisma = new PrismaClient();

export default function Home() {

  const router = useRouter()

  const [loginData , setLoginData] = useState('Login');
  const [oposty , setOposty] = useState(false);
  const [status , setStatus] = useState(true);
  
  const login =  useRef<HTMLInputElement | null>(null);

  const [transation , startTransition] = useTransition()
  

  const loginFocus = ()=>{
    if (login.current) {
      login.current.value = ''; // Clear input field
      login.current.focus(); // Focus on input field
    }
    setLoginData('Listening')
    setOposty(true);
  }

  const loginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(login.current?.value);
    const dataServer = login.current?.value.toString();
    if (login.current) {
      login.current.value = ''; // Clear input field
      login.current.focus(); // Focus on input field
    }
    startTransition(async () => {
      const returnData = await Server(dataServer);  
      if(returnData !== "false"){
        router.push(`./${returnData}`);
      }
      else{
        setStatus(false);
      } 
    });
  };
    
  return (
    <main className="">
      <div className={`absolute top-0 left-0 h-screen w-screen ${oposty ? `z-20` : `z-0`}`} onClick={loginFocus}></div>
      <div className='h-screen w-screen flex absolute top-0 left-0 bg-white z-10'>
        <div className="navbar fixed top-0 left-0 w-screen shadow-lg">
            <a className="btn btn-ghost text-xl opacity-0">daisyUI</a>
        </div>
        <div className='w-1/2 h-screen flex justify-center flex-col pl-32'>
            <h2 className='text-3xl font-bold text-teal-800 mb-3'>Attendance management platform</h2>
            <h2 className='text-3xl font-bold text-teal-800'> for <span className='text-teal-500'>Educational institutions</span></h2>
            <br />
            <br />
            <p className='text-teal-800 text-lg'>The professor is kindly requested tp place your card on the reader <br /> once you click on login to access your own page</p>
            <br />
            <br />
            <br />
            <br />
            <div className='flex flex-row '>
                <button className='h-12 w-[180px] rounded-full bg-sky-600 mr-6 text-white font-bold bg-gradient-to-r from-teal-500 to-cyan-200 from-20% '
                onClick={loginFocus}>
                    {loginData}
                </button>
                <button className='h-12 w-[180px] rounded-full font-bold text-teal-400  border-2 border-teal-400'>
                  {status === true ? (<span >Learn more</span>) : (<span >user not founf</span>) }
                </button>
            </div>
        </div>
        <div className='w-1/2 h-screen flex justify-center items-center p-12 relative right-6'>
          {
            status === true ?( 
              <img src={'image.svg'} alt={'alt'}/>
            ) : (
              <img src={'error.svg'} alt={'alt'}/>
            )
          }
        </div>
        <form onSubmit={loginForm} className='fixed bottom-[-24px]'>
            <input
                type="text"
                ref={login}
                className='text-red'
            />
            <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
