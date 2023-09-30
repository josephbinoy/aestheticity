import connectDB from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

await connectDB();

export async function POST(request){
    try{
        const reqBody= await request.json();
        const token=reqBody.token;
        const curDate=new Date();
        const foundUser=await User.findOne({verifyToken:token, verifyExpiry:{ $gt: curDate }})
        if(!foundUser)
            return NextResponse.json({error:"Verification failed. No such user found" }, {status:400});
        foundUser.isVerified=true;
        foundUser.verifyToken=undefined;
        foundUser.verifyExpiry=undefined;
        await foundUser.save();
        return NextResponse.json({
            message:"User successfully verified",
            success:true
        })
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}      