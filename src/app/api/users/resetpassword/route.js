import connectDB from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

await connectDB();

export async function POST(request){
    try{
        const {password, token}= await request.json();
        const curDate=new Date();
        const foundUser=await User.findOne({forgotPasswordToken:token, forgotPasswordExpiry:{ $gt: curDate }})
        if(!foundUser)
            return NextResponse.json({error:"User not found." }, {status:400});
        const hashedPassword = await bcrypt.hash(password, 10);
        foundUser.password=hashedPassword;
        foundUser.forgotPasswordToken=undefined;
        foundUser.forgotPasswordExpiry=undefined;
        await foundUser.save();
        return NextResponse.json({
            message:"Password reset successfully",
            success:true
        })
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}      