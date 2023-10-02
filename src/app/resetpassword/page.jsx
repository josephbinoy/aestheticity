"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast,{ Toaster } from "react-hot-toast";
import axios from "axios";

export default function Page(){
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router=useRouter();
    const [newPass, setNewPass]=useState({
        password:"",
        confirmPassword:""
    })
    const [allowReset, setAllowReset]=useState(false);

    function handleChange(e){
        const newValue=e.target.value;
        const caller=e.target.name;
        setNewPass((oldPass)=>({...oldPass, [caller]:newValue}));
    }

    async function resetPass(e){
        e.preventDefault();
        try{
            let response="";
            if(allowReset){
                response=await axios.post("/api/users/resetpassword", {password:newPass.password,token});
                toast.success(response.data.message);
                router.push("/login");
            }
            else
                toast.error("Passwords don't match");
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    }

    useEffect(()=>{
        if(newPass.password!==""&&newPass.password===newPass.confirmPassword)
            setAllowReset(true);
    }, [newPass])

    return (
        <div className="flex h-screen w-screen">
            <div className="flex h-[500px] w-fit m-auto flex-col justify-evenly items-center">
                <h1 className="text-3xl">Set your new password</h1>
                <form onSubmit={resetPass} className="flex flex-col justify-evenly items-center h-[400px]">
                    <label className="self-start">Password</label>
                    <input className="p-4 w-[300px] rounded-lg focus:outline-red-600 text-black" onChange={handleChange} type="password" name="password" value={newPass.password} />
                    <label className="self-start">Confirm Password</label>
                    <input className="p-4 w-[300px] rounded-lg focus:outline-red-600 text-black" onChange={handleChange} type="password" name="confirmPassword" value={newPass.confirmPassword} />
                    <button className="bg-slate-500 p-3 rounded-xl hover:bg-slate-200 hover:text-black">Reset Password</button>
                </form>
                <Toaster />                
        </div>
      </div>
      )
}