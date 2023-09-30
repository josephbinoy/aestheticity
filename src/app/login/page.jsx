"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage(){
    const router=useRouter();
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
            const response=await axios.post("/api/users/login", user);
            console.log(response.data);
            router.push("/profile");
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <div className="flex h-screen w-screen">
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                <h1 className="text-3xl">Hi! Login Now!</h1>
                <form onSubmit={loginUser} className="flex flex-col justify-evenly items-center h-[400px]">
                    <label className="self-start">Username</label>
                    <input className="p-4 w-[300px] rounded-lg focus:outline-red-600 text-black" onChange={handleChange} type="text" placeholder="Enter Username" name="username" value={user.username} />
                    <label className="self-start">Password</label>
                    <input className="p-4 w-[300px] rounded-lg focus:outline-red-600 text-black" onChange={handleChange} type="password" placeholder="Enter Password" name="password" value={user.password} />
                    <Link className="hover:text-red-500" href="/forgotpassword">Forgot Password?</Link>
                    <button className="bg-slate-500 p-3 rounded-xl hover:bg-slate-200 hover:text-black">Log in</button>
                </form>
                <p>Don't have an account? <Link className="hover:text-red-500" href="/signup">Sign up now!</Link></p>
                <Toaster />                
        </div>
      </div>
      )
}
