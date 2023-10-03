"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'flowbite-react';

export default function Page(){
    const router=useRouter();
    const [isLoading, setIsLoading]=useState(false);
    const [user, setUser]=useState({
        username:"",
        password:""
    })

    function handleChange(e){
        const newValue=e.target.value;
        const caller=e.target.name;
        setUser((oldUser)=>({...oldUser, [caller]:newValue}));
    }

    async function loginUser(e){
        try{
            e.preventDefault();
            await axios.post("/api/users/login", user);
            setIsLoading(false);
            router.push("/");
        }
        catch(error){
            console.log(error);
            toast.error("error");
        }
    }

    return (
        <>
        <div className="flex h-[calc(100vh-80px)] w-full ">
        <div className="h-full w-7/12 bg-cover bg-no-repeat" style={{backgroundImage:"url(/1622174147424.gif)"}} ></div>
        <div className="flex-1 flex justify-center items-center">
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                <h1 className="text-3xl mb-4">Welcome back</h1>
                <h1 className="text-3xl">Login now</h1>
                <form onSubmit={loginUser} className="flex flex-col justify-evenly items-center h-[400px]">
                    <label className="self-start -mb-4">Username</label>
                    <input className="p-4 w-[300px] rounded-md text-black focus:border-black focus:ring-black" onChange={handleChange} type="text" placeholder="Enter Username" name="username" value={user.username} />
                    <label className="self-start -mb-4">Password</label>
                    <input className="p-4 w-[300px] rounded-md text-black focus:border-black focus:ring-black" onChange={handleChange} type="password" placeholder="Enter Password" name="password" value={user.password} />
                    <Link className="hover:text-red-500" href="/forgotpassword">Forgot Password?</Link>
                    <Button isProcessing={isLoading?true:false} type="submit" className="rounded-md cursor-pointer" color="dark" onClick={()=>{setIsLoading(true)}}>Log in</Button>
                </form>
                <p>Don't have an account? <Link className="text-red-500 hover:text-red-800" href="/signup">Sign up</Link> now!</p>
                </div>               
        </div>
      </div>
      <Toaster /> 
      </>
      )
}
