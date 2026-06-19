import mongoose from 'mongoose'

const connectDB = async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connectDB successfully");
        
    } catch (error) {
        console.log("connectDB error");
    }
}

export default connectDB