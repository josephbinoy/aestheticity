import connectDB from "@/db/dbConfig";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";

connectDB();

export async function POST(request){
    try {
        //get body of request
        const reqBody=await request.json();
        console.log(reqBody);
        const {username,password}=reqBody;
        //check if username exists
        const user=await User.findOne({username:username});
        if(!user){
            return Response.json({error:"Username not found."},{status:400});
        }

        const loginSuccess=await bcrypt.compare(password, user.password);

        if(!loginSuccess)
            return Response.json({error:"Password incorrect"},{status:400});

        const tokenData={
            userID:user._id,
            username:user.username,
            email:user.email
        }

        const token=jwt.sign(tokenData, process.env.JWT_KEY , { expiresIn: '1d' });
        const response=NextResponse.json({message:"Login successful", success:true});
        response.cookies.set('token', token);
        return response;
    } 
    catch (error) {
        return Response.json({error:error.message},{status:500});
    }
}



