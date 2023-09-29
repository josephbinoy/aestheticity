import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URL;

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    console.log("connectDB was called");
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    console.log("Before attempting connection");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("After establishing connection");
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

// import mongoose from "mongoose";

// export default async function connectDB() {
//     try {
//         console.log("before mongoose.connect")
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log(mongoose.connection.base.connections.length);
//         console.log("after mongoose.connect")
//         const connection=mongoose.connection;
//         connection.on('connected', ()=>{
//             console.log("MongoDB successfully connected!");
//         })
//         connection.on('error', ()=>{
//             console.log("Error after connecting");
//             process.exit();
//         })
//     } 
//     catch (error) {
//         console.log("Failed to connect\n"+error);
//     }
// }
