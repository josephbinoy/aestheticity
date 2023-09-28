import connectDB from "@/db/dbConfig";
import bcrypt from "bcrypt";
import User from "@/models/userModel";

// import {NextRequest, NextResponse} from "next/server";

connectDB();

export async function POST(request){
    try {
        //get body of request
        const reqBody=await request.json();
        const {username,password,email}=reqBody;
        //check if username exists
        const user=await User.findOne({username:username});
        if(user){
            return Response.json({error:"Username already exists."},{status:400});
        }

        //if username doesnt exist, proceed with hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new User({
            username:username,
            email:email,
            password:hashedPassword,
        })

        //save new user in DB
        const savedUser=await newUser.save();
        return Response.json({
            message:"User created successfully",
            success:true,
            savedUser:savedUser
        })     
    } 
    catch (error) {
        return Response.json({error:error.message},{status:500});
    }
}



