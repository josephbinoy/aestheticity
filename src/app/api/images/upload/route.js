import connectDB from "@/db/dbConfig";
import Image from "@/models/imageModel";
import User from "@/models/userModel";
import getTokenData from "@/utility/getTokenData";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

await connectDB();

export async function POST(request){
    try{
        const tokenData=getTokenData(request);
        const reqBody=await request.json();
        const newImage=new Image({
            uploader:tokenData.username,
            data:reqBody.imageBinary.data,
            imageFormat:reqBody.imageType
        })
        const savedImage=await newImage.save();
        const imageID=savedImage._id;
        await User.updateOne({_id:tokenData.userID},{"$push": { "uploads": new mongoose.Types.ObjectId(imageID) }})
        // const base64Result=savedImage.image.data.toString('base64');
        // const imageTypeResult=savedImage.image.contentType;
        return NextResponse.json({message:"Uploaded image"}, {status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:400})
    }
}