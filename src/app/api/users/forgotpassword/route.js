import connectDB from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import {sendMail} from "@/utility/mailer";

await connectDB();

export async function POST(request){
    try{
        const {userIdentifier}= await request.json();
        let identifierType;
        if(userIdentifier.includes("@"))
            identifierType="email";
        else
            identifierType="username";
        const foundUser=await User.findOne({[identifierType]:userIdentifier})
        if(!foundUser)
            return NextResponse.json({error:"User not found. Try again" }, {status:400});
        const emailID=foundUser.email;
        const userID=foundUser._id.toHexString();
        sendMail(emailID, "RESET", userID);
        return NextResponse.json({
            message:"Email sent successfully",
            success:true
        })

    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}      