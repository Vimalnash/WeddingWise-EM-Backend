import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true, maxlength: 32, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        phone: {type: Number, required: true, unique: true, trim: true},
        password: {type: String, required: true, trim: true},
        isAdmin: {type: Boolean, required: true, default: false}
    },
    {
        timestamps: true
    }
);

const USER = mongoose.model("users", userSchema)
export { USER }