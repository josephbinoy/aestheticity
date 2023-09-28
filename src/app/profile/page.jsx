"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function customUserProfile(){
    const router=useRouter();
    const [displayDetails, setDisplayDetails]=useState("No data");
    async function logOutUser(){
        try {
            const response =await axios.get("/api/users/logout")
            console.log(response);
            router.push("/login");
        } catch (error) {
            console.log(error)
            toast.error("Logout Unsuccessful");
        }
    }

    async function getUserDetails(){
        try {
            const response =await axios.get("/api/users/getuser")
            console.log(response);
            if(response.data.success)
                setDisplayDetails(response.data.data.email+" "+response.data.data.username);

        } catch (error) {
            console.log(error)
            toast.error("Could not get user details");
        }
    }

    return(
        <>
            <h1 className="text-4xl">Welcome to profile root page</h1>
            <button onClick={logOutUser} className="h-30 w-60 bg-blue-500 hover:bg-blue-700 font-bold p-3 m-3">Log out</button>
            <button onClick={getUserDetails} className="h-30 w-60 bg-yellow-500 hover:bg-yellow-700 font-bold p-3 m-3">Get user details</button>
            <h1>{displayDetails}</h1>
        </>
    )
}