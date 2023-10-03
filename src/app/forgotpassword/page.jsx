"use client"

import axios from "axios"
import { Button } from "flowbite-react";
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export default function Page(){
    const [userIdentifier, setUserIdentifier]=useState("");

    function handleChange(e){
        const newValue=e.target.value;
        setUserIdentifier(newValue);
    }

    async function handleForgotPassword(e){
        try{
            e.preventDefault();
            const response=await axios.post("/api/users/forgotpassword", {userIdentifier});
            toast.success(response.data.message);
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    }

    return (
        <div className="flex h-[calc(100vh-80px)] w-full" style={{backgroundImage:"url(/1610401382868.gif)"}}>
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                <h1 className="text-[40px] text-gray-200 text-center px-20">Enter your username or email and we will send you an email with further instructions</h1>
                <form onSubmit={handleForgotPassword} className="flex flex-col justify-evenly items-center h-[400px]">
                    <label className="self-start"></label>
                    <input className="p-4 w-[300px] rounded-md text-black focus:border-black focus:ring-black" onChange={handleChange} type="text" placeholder="Enter username or email" value={userIdentifier} />
                    <Button color="dark" className="bg-black rounded-md">Send email</Button>
                </form>
                <Toaster />                
        </div>
      </div>
      )
}