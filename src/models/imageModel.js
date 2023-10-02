import mongoose, {Schema} from "mongoose";

const ImageSchema=new mongoose.Schema({
    uploader:String,
    data: Buffer,
    imageFormat: String
	})

const Image=mongoose.models.image ||mongoose.model('image', ImageSchema);

export default Image;