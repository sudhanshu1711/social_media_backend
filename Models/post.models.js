import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId :{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    likes : [],
    image:{
        type:String
    }
},{
    timestamps:true
})

export const Post = mongoose.model("Post",postSchema)