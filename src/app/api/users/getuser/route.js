import getTokenData from "@/utility/getTokenData";
import connectDB from "@/db/dbConfig";
import User from "@/models/userModel"
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request){
    try{
        let user;
        const tokenData=getTokenData(request);
        if(tokenData){
            const userID=tokenData.userID;
            user=await User.findById(userID);
            if(user){
                return NextResponse.json({
                    message:"Token Verified and User Found",
                    success:true,
                    data:user
                })
            }
        }
        return NextResponse.json({error:"User details not found"}, {status:400})
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:400})
    }
}