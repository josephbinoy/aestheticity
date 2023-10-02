import mongoose, {Schema} from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    favorites: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'image' 
    }],
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyExpiry:Date
	})

    const User=mongoose.models.user || mongoose.model('user', userSchema);

export default User;