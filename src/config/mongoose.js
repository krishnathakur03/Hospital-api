import mongoose from "mongoose";

const url = process.env.DB_URL; 

// function for connecting mongodb using mongoose
export const connectToMongoose = async ()=>{
    try {
        await mongoose.connect(url)
        console.log("MongoDB connected using mongoose");
    } catch (error) {
        console.log(error);
        throw new error ('Failed to connect MongoDB')
    }
    
}