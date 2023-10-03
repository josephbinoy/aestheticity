import connectDB from "@/db/dbConfig";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import {sendMail} from "@/utility/mailer";
import {NextResponse} from "next/server";

await connectDB();

export async function POST(request){
    try {
        //get body of request
        const reqBody=await request.json();
        console.log("request for signup received", reqBody)
        const {username,password,email}=reqBody;
        //check if username exists
        const user=await User.findOne({username:username});
        if(user){
            return NextResponse.json({error:"Username already exists."},{status:400});
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

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser:savedUser
        })     
    } 
    catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}



