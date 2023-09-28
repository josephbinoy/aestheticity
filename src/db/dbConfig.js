import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const connection=mongoose.connection;
        connection.on('connected', ()=>{
            console.log("MongoDB successfully connected!");
        })
        connection.on('error', ()=>{
            console.log("Error after connecting");
            process.exit();
        })
    } 
    catch (error) {
        console.log("Failed to connect\n"+error);
    }
}
