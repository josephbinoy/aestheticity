import mongoose, {Schema} from "mongoose";

const ImageSchema=new mongoose.Schema({
    uploader:{ 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    image:{
        data: Buffer,
        contentType: String
    },
	})

    const Image=mongoose.models.image ||mongoose.model('image', ImageSchema);

export default Image;