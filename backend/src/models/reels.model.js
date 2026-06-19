import mongoose, { Schema } from "mongoose";
import User from "./User.model.js";

const reelSchema = new mongoose.Schema.create({
    
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    mediaType:{
        type: String,
        enum:["image", "video"],
        required:true
    },
    media:{
        type:String,
        required:true

    },
    caption:{
        type: String,

    },
    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        }
    ],
     comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        }
    ]

},{timestamps:true})

const Reel=mongoose.model("Reel", reelSchema)

export default Reel