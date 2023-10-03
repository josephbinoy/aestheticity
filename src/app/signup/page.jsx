"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'flowbite-react';

export default function Page(){
    const router=useRouter();
    const [isLoading, setIsLoading]=useState(false);
    const [allowSubmit, setAllowSubmit]=useState(false);
    const [user, setUser]=useState({
        username:"",
        email:"",
        password:""
    })

    function handleChange(e){
        const newValue=e.target.value;
        const caller=e.target.name;
        setUser((oldUser)=>({...oldUser, [caller]:newValue}));
    }

    async function signUpUser(){
        try {
            const response=await axios.post("/api/users/signup", user);
            setIsLoading(false);
            toast.success(response.data.message);
            router.push('/login');
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    useEffect(()=>{
        if(user.username&&user.email.includes("@")&&user.password)
            setAllowSubmit(true)
        else
            setAllowSubmit(false)}, [user]);

    return (
        <>
        <div className="flex h-[calc(100vh-80px)] w-full ">
        <div className="h-full w-7/12 bg-cover bg-no-repeat" style={{backgroundImage:"url(/croppedZufRTFhEKdolaTEa.gif)"}} ></div>
        <div className="flex-1 flex justify-center items-center">
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                        <h1 className="text-3xl">Hi! Sign Up Now</h1>
                        <form onSubmit={(e)=>{e.preventDefault();signUpUser();}} className="flex flex-col justify-evenly items-center h-[400px]">
                            <label className="self-start -mb-3">Username</label>
                            <input className="text-black p-4 w-[300px] rounded-md focus:outline-0 focus:border-black focus:ring-black" onChange={handleChange} type="text" placeholder="Enter Username" name="username" value={user.username} />
                            <label className="self-start -mb-3">Email</label>
                            <input className="text-black p-4 w-[300px] rounded-md focus:border-black focus:ring-black" onChange={handleChange} type="email" placeholder="Enter Email" name="email" value={user.email} />
                            <label className="self-start -mb-3">Password</label>
                            <input className="text-black p-4 w-[300px] rounded-md focus:border-black focus:ring-black" onChange={handleChange} type="password" placeholder="Enter Password" name="password" value={user.password} />
                            {allowSubmit?<Button isProcessing={isLoading?true:false}  onClick={()=>{setIsLoading(true)}} type="submit" color="dark" className="rounded-md">Sign up</Button>:<button type="button" className="cursor-default p-3 bg-gray-200 rounded-md text-gray-400">Enter details</button>}
                        </form>
                <p>Don't have an account? <Link className="text-red-500 hover:text-red-800" href="/login">Log in</Link> now!</p>
                </div>               
        </div>
        </div>
        <Toaster />
</>
      )
        
}




{/* <div className="flex h-screen w-screen">
<div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
    <h1 className="text-3xl">Hi! Sign Up Now!</h1>
    <form onSubmit={(e)=>{e.preventDefault();signUpUser();}} className="flex flex-col justify-evenly items-center h-[400px]">
        <label className="self-start">Username</label>
        <input className="text-black p-4 w-[300px] rounded-lg focus:outline-red-600" onChange={handleChange} type="text" placeholder="Enter Username" name="username" value={user.username} />
        <label className="self-start">Email</label>
        <input className="text-black p-4 w-[300px] rounded-lg focus:outline-red-600" onChange={handleChange} type="email" placeholder="Enter Email" name="email" value={user.email} />
        <label className="self-start">Password</label>
        <input className="text-black p-4 w-[300px] rounded-lg focus:outline-red-600" onChange={handleChange} type="password" placeholder="Enter Password" name="password" value={user.password} />
        <button type="submit" className="bg-slate-500 p-3 rounded-xl hover:bg-slate-200 hover:text-black">
        {allowSubmit?"Sign Up":"X"}</button>
        <Toaster />
    </form>
    <p>Already have an account? <Link className="hover:text-red-500" href="/login">Log in</Link> now</p>
    
</div>
</div> */}