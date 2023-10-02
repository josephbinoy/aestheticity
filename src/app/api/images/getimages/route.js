import connectDB from "@/db/dbConfig";
import Image from "@/models/imageModel";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(){
    try{
        const allImages=await Image.find();
        // console.log(allImages[0].image.data.toString('base64'))
        return NextResponse.json({
            message:"Images retrieved successfully",
            images:allImages,
            success:true
        })
    }
    catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}      