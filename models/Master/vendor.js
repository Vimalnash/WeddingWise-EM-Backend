import mongoose from "mongoose";
import { ObjectId } from "bson";

const vendorSchema = new mongoose.Schema(
    {
        eventServiceId: {type: ObjectId, ref: "eventservices"},
        vendorName: {type: String, required: true, unique: true, maxlength: 256, trim: true},
        address: {type: String, required: true, trim:true},
        stateId: {type: ObjectId, ref: "states", required: true},
        cityId: {type: ObjectId, ref: "cities", required: true},
        gstNo: {type: String, unique: true, trim: true, default: null},

        userName: {type: String, required: true, maxlength: 32, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        phone: {type: Number, required: true, unique: true, trim: true},
        password: {type: String, required: true, trim: true},
        
        isAdminApproved: {type: Boolean, required: true, default: true },
        approvedDate: {type: String, required: true, default: null},
        isActive: {type: Boolean, required: true, default: true},
        rating: {type: Number}
    },
    {
        timestamps: true
    }
);

const VENDOR = mongoose.model("vendors", vendorSchema);
export { VENDOR }