import mongoose from "mongoose";

export function connectDatabase(MONGO_URL_LOCAL) {
    try {
        mongoose.connect(MONGO_URL_LOCAL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(`Error Connecting Database - ${error}`)        
    }
}