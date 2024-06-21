import mongoose from "mongoose";
import { ObjectId } from "bson";

const vendorRatingSchema = new mongoose.Schema(
    {
        vendorId: {type: ObjectId, ref: "vendors"},
        userId: {type: ObjectId, ref: "users"},
        rating: {type: Number},
    },
    {
        timestamps: true
    }
);

const VENDORRATING = mongoose.model("vendorratings", vendorRatingSchema);
export { VENDORRATING }