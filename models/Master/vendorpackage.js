import mongoose from "mongoose";
import { ObjectId } from "bson";

const vendorPackageSchema = new mongoose.Schema(
    {
        vendorId: {type: ObjectId, ref:"vendors", required: true},
        eventServiceId:  {type: ObjectId, ref:"eventservices", required: true},
        serviceAmount: {type: Number, required: true, trim: true},
        serviceDescription:  {type: String, required: true},
        serviceApplyStateIds: {type: Array, ref:"states", required: true},
    },
    {
        timestamps: true
    }
);


const VENDORPACKAGE = mongoose.model("vendorpackages", vendorPackageSchema);
export { VENDORPACKAGE }