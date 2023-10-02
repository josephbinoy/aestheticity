import mongoose from "mongoose";
import connectDB from "@/db/dbConfig";
import Image from "@/models/imageModel";
import getTokenData from "@/utility/getTokenData";
import { NextResponse } from "next/server";

await connectDB();

export async function POST(request){
    try{
        const tokenData=getTokenData(request);
        const reqBody=await request.json();
        const newImage=new Image({
            uploader:new mongoose.Types.ObjectId(tokenData.userID),
            image:{
                data:reqBody.imageBinary.data,
                contentType:reqBody.imageType
            }
        })
        await newImage.save();
        // const base64Result=savedImage.image.data.toString('base64');
        // const imageTypeResult=savedImage.image.contentType;
        return NextResponse.json({message:"Uploaded image"}, {status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:400})
    }
}