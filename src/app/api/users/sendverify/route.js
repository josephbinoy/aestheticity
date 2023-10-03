import { sendMail } from "@/utility/mailer";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
    const {userID, email}=await request.json();
    if(email&&userID)
        sendMail(email, "VERIFY", userID)
    return NextResponse.json({message:"Sent email", success:true})
    }
    catch(error){
        return NextResponse.json({error:"Error while sending email"}, {status:400})
    }
}