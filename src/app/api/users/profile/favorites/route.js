import getTokenData from "@/utility/getTokenData";
import connectDB from "@/db/dbConfig";
import User from "@/models/userModel"
import { NextResponse } from "next/server";

await connectDB();

export async function POST(request){
    try{
        const {userID}=await request.json();
        const user=await User.findById(userID).populate('favorites');
        if(!user){
            return NextResponse.json({error:"User not found"}, {status:400})
        }     
        return NextResponse.json({
            message:"Retrieved favorite image",
            success:true,
            user:user
        })
    }        
    catch(error){
        return NextResponse.json({error:error.message}, {status:400})
    }
}