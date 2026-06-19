import mongoose from "mongoose";
import Post from "./post.model.js";
import Reel from "./reels.model.js";
import Story from "./story.model.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    },
    follwers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    savePosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    reels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reel'
        }
    ],
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Story'
    },
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }

},
    { timestamps: true })

const User = mongoose.model("User", UserSchema);
export default User