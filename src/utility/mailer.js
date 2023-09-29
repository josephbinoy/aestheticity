import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcrypt"
// import connectDB from "@/db/dbConfig";
// connectDB();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

export async function sendMail(emailID, emailType, userID){
    try{
        const hashedToken = await bcrypt.hash(userID, 10);
        const curDate=Date.now();
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userID, {verifyToken:hashedToken, verifyExpiry:curDate+3600000});
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userID, {forgotPasswordToken:hashedToken, forgotPasswordExpiry:curDate+3600000});
        }
        const mailOptions={
              from: 'support@aestheticity.com',
              to: emailID,
              subject: `${emailType?"Verify account":"Reset password"}`,
              html: `<b>Click the button to ${emailType==="VERIFY"?"verify your account":"reset your password"} </b><br><br>
                      <button><a href="${process.env.domain}/mail?token=${hashedToken}">Click here</a></button>`
          }
        await transport.sendMail(mailOptions);
    }
    catch(error){
        throw new Error(error.message);
    }
}