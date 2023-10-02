"use client"

import axios from "axios"
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
        <div className="flex h-screen w-screen">
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                <h1 className="text-3xl">Enter your username or email and we will send you an email with further instructions</h1>
                <form onSubmit={handleForgotPassword} className="flex flex-col justify-evenly items-center h-[400px]">
                    <label className="self-start"></label>
                    <input className="p-4 w-[300px] rounded-lg focus:outline-red-600 text-black" onChange={handleChange} type="text" placeholder="Enter Username or Email" value={userIdentifier} />
                    <button className="bg-slate-500 p-3 rounded-xl hover:bg-slate-200 hover:text-black">Send email</button>
                </form>
                <Toaster />                
        </div>
      </div>
      )
}