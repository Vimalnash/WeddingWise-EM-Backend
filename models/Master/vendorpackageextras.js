import mongoose from "mongoose";
import { ObjectId } from "bson";

const vendorPackageExraSchema = new mongoose.Schema(
    {
        vendorId: {type: ObjectId, ref:"vendors", required: true},
        eventServiceId:  {type: ObjectId, ref:"eventservices", required: true},
        eventSubServiceId: {type: ObjectId, ref:"eventsubservices", required: true},
        subServiceDescription:  {type: String, required: true},
        subServiceAmount: {type: Number, required: true, trim: true},
    },
    {
        timestamps: true
    }
);


const VENDORPACKAGEEXTRAS = mongoose.model("vendorpackageextras", vendorPackageExraSchema);
export { VENDORPACKAGEEXTRAS }