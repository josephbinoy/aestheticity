import connectDB from "@/db/dbConfig";
import User from "@/models/userModel";
import getTokenData from "@/utility/getTokenData";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

await connectDB();

export async function POST(request){
    try{
        const tokenData=getTokenData(request);
        const {imageID}=await request.json();
        await User.updateOne({_id:tokenData.userID},{"$push": { "favorites": new mongoose.Types.ObjectId(imageID) }});  
        return NextResponse.json({message:"Favorited image!"}, {status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:400})
    }
}