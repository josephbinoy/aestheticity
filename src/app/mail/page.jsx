"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function Mail(){
    const router=useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [verified, setVerified]=useState(false);
    const [error, setError]=useState(false);

    async function verifyUser(){
        try{
        await axios.post("/api/users/verifyemail", {token:token})
        toast.success("Verification successful");
        setVerified(true);
        router.push('/login');
        }
        catch(error){
            setError(true);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyUser();
    }, []);

    return(
        <>
            {!error&&<h1>{verified?"Verification complete!":"Verification in progress"}</h1>}
            {error&&<h1>Please try again</h1>}
            <Toaster />
        </>
        )
}