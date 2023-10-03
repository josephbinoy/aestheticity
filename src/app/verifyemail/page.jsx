"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'flowbite-react';

export default function Page(){
    const router=useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [verified, setVerified]=useState(false);
    const [error, setError]=useState(false);

    async function verifyUser(){
        try{
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true);
            router.push('/login');
        }
        catch(error){
            setError(true);
            toast.error(error.response.data.error)
        }
    }

    useEffect(()=>{
        verifyUser();
    }, []);

    return(
        <>
        <div className="h-[calc(100vh-80px)] w-full bg-black">
            {!error&&verified?"Verification complete!":
            <div className="mx-auto">
                <hi className="text-[50px] text-white inline mx-10">
                Verification in progress. You will be redirected shortly.
                </hi>
                <Spinner className="fill-black" size="xl"/>
            </div>}
            {error&&<h1 className="text-[50px] text-white">There was an error during verification, please try again</h1>}
            <Toaster />
        </div>
        </>
        )
}